// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { proxyOrigin, readFlags, resolveFlag, setFlag } from '../helpers/demo';

// Log checks read the flagd-ui container's output and a fresh scheduler needs flagd-ui
// restarted, so this spec needs the docker CLI and socket where Cypress runs.
const flagdUiLogsSince = (since: string) =>
  cy.task<string>('dockerLogs', { container: 'flagd-ui', since }, { timeout: 30000 });

/* The scheduler keeps its last configuration until flagd-ui restarts. */
const restartFlagdUi = () => {
  cy.task('dockerRestart', 'flagd-ui', { timeout: 120000 });
  const waitUp = (left: number): void => {
    cy.request({ url: `${proxyOrigin()}/feature/scheduler`, failOnStatusCode: false, timeout: 10000 }).then(
      ({ status }) => {
        if (status === 200) return;
        expect(left, 'flagd-ui back up').to.be.greaterThan(0);
        cy.wait(2000).then(() => waitUp(left - 1));
      }
    );
  };
  waitUp(45);
};

const PRESENTATION = 'Presentation (60s / 10-20s)';

const openScheduler = () => {
  cy.visit(`${proxyOrigin()}/feature/scheduler`);
  cy.get('[data-phx-main]').should('have.class', 'phx-connected');
};

const field = (name: string) => cy.get(`#scheduler-form [name="${name}"]`);
const setField = (name: string, value: string | number) => field(name).clear().type(String(value));
const button = (text: string) => cy.contains(new RegExp(`^\\s*${text.replace(/[()/]/g, '\\$&')}\\s*$`));
const flash = () => cy.get('#flash-info');

const stopIfRunning = () => {
  openScheduler();
  cy.document().then(doc => {
    if ((doc.body.textContent || '').includes('Scheduler running')) {
      button('Stop').click();
      cy.contains('Scheduler stopped').should('exist');
    }
  });
};

const selectOnlyAdFailure = () => {
  button('None').click();
  cy.get('[name="variants[adFailure][]"]').should('not.be.checked').check();
  cy.get('[name="variants[adFailure][]"]').should('be.checked');
};

const startAdFailureOnly = (extra: { seed?: number; concurrency?: number } = {}) => {
  selectOnlyAdFailure();
  button(PRESENTATION).click();
  field('interval_seconds').should('have.value', '60');
  if (extra.seed !== undefined) setField('seed', extra.seed);
  setField('concurrency', extra.concurrency ?? 1);
  button('Start').click();
  cy.contains('Scheduler running').should('exist');
};

const adFailureVariant = () => readFlags().then(body => body.flags.adFailure.defaultVariant as string);

/* Resolve adFailure through flagd, giving it a few seconds to load a changed flag file. */
const resolveAdFailure = (expected: boolean, attempts = 5): Cypress.Chainable<boolean> =>
  resolveFlag('Boolean', 'adFailure').then(({ body }) => {
    if (body.value === expected || attempts <= 1) return cy.wrap(body.value as boolean);
    return cy.wait(1000).then(() => resolveAdFailure(expected, attempts - 1));
  });

/* Poll the stored adFailure variant until it equals the expected one. */
const waitForAdFailure = (variant: string, seconds: number): Cypress.Chainable<number> => {
  const started = Date.now();
  const poll = (left: number): Cypress.Chainable<number> =>
    adFailureVariant().then(current => {
      if (current === variant) return cy.wrap(Date.now() - started);
      expect(left, `adFailure reaching ${variant} within ${seconds}s`).to.be.greaterThan(0);
      return cy.wait(1000).then(() => poll(left - 1));
    });
  return poll(seconds);
};

describe('Flag scheduler', () => {
  let since: string;

  beforeEach(() => {
    since = new Date(Date.now() - 2000).toISOString();
    stopIfRunning();
    setFlag('adFailure', 'off');
    openScheduler();
  });

  afterEach(() => {
    stopIfRunning();
    setFlag('adFailure', 'off');
  });

  describe('on a fresh flagd-ui', () => {
    beforeEach(() => {
      restartFlagdUi();
      since = new Date(Date.now() - 2000).toISOString();
      openScheduler();
    });

    it('schedules failure flags with the flag scheduler', () => {
      cy.log('step 1: open the flag dashboard and its Scheduler tab');
      cy.visit(`${proxyOrigin()}/feature/`);
      cy.contains(/^\s*Scheduler\s*$/).click();
      cy.location('pathname').should('eq', '/feature/scheduler');
      cy.get('[data-phx-main]').should('have.class', 'phx-connected');
      cy.contains('Scheduler stopped').should('be.visible');
      cy.contains(/^\s*Idle\s*$/).should('be.visible');
      button('Start').should('be.visible');
      field('interval_seconds').should('have.value', '900');
      field('min_duration_seconds').should('have.value', '60');
      field('max_duration_seconds').should('have.value', '180');
      field('concurrency').should('have.value', '1');
      [PRESENTATION, 'Frequent (15m / 1-3m)', 'Hourly (1h / 5-15m)'].forEach(p => button(p).should('be.visible'));
      cy.get('[phx-value-flag="cartFailure"]').should('contain', 'toggle all');
      cy.get('[name="variants[cartFailure][]"]').then($i =>
        expect([...$i].map(i => (i as HTMLInputElement).value)).to.deep.equal([
          '10%',
          '100%',
          '25%',
          '50%',
          '75%',
          '90%',
        ])
      );
      cy.get('[name="variants[adFailure][]"]').should('have.length', 1).and('have.value', 'on');

      cy.log('step 2: invalid settings are refused');
      setField('max_duration_seconds', 1000);
      button('Start').click();
      cy.contains('Maximum duration must fit within the interval').should('be.visible');
      setField('max_duration_seconds', 30);
      button('Start').click();
      cy.contains('Maximum duration must be greater than or equal to the minimum duration').should('be.visible');
      setField('max_duration_seconds', 180);
      button('None').click();
      button('Start').click();
      cy.contains('Select at least one flag variant to schedule').should('be.visible');
      cy.contains('Scheduler stopped').should('be.visible');

      cy.log('step 3: the Presentation preset');
      button(PRESENTATION).click();
      field('interval_seconds').should('have.value', '60');
      field('min_duration_seconds').should('have.value', '10');
      field('max_duration_seconds').should('have.value', '20');

      cy.log('step 4: start with only adFailure and seed 42');
      cy.get('[name="variants[adFailure][]"]').check();
      setField('seed', 42);
      button('Start').click();
      cy.contains('Scheduler running').should('be.visible');
      cy.contains(/^\s*Active\s*$/).should('be.visible');
      flash().should('contain', 'Scheduler started');
      cy.contains(/Interval\s*\d+/).should('be.visible');
      cy.contains(/Seed\s*42\b/).should('be.visible');
      cy.contains(/Currently active \(\d of 1\)/).should('be.visible');
      button('Restart').should('be.visible');
      button('Stop').should('be.visible');
      cy.request(`${proxyOrigin()}/feature/scheduler`).its('body').should('contain', 'Scheduler running');
      flagdUiLogsSince(since).should('contain', 'Flag scheduler started with seed 42');

      cy.log('step 5: adFailure is held on, then reverted');
      waitForAdFailure('on', 60);
      resolveAdFailure(true).should('eq', true);
      flagdUiLogsSince(since).then(out => {
        const m = out.match(/Flag scheduler set adFailure to on for (\d+)ms/);
        expect(m, 'set log line').to.not.equal(null);
        expect(Number(m?.[1])).to.be.within(10000, 20000);
      });
      waitForAdFailure('off', 25);
      flagdUiLogsSince(since).should('contain', 'Flag scheduler reverted adFailure to off');
      cy.contains('Recent activations').should('be.visible');
      cy.contains(/adFailure = on[\s\S]*UTC[\s\S]* for /).should('be.visible');

      cy.log('step 6: Stop while adFailure is held');
      waitForAdFailure('on', 65);
      button('Stop').click();
      adFailureVariant().should('eq', 'off');
      flagdUiLogsSince(since).should('contain', 'Flag scheduler stopped');
      flash().should('contain', 'Scheduler stopped');
      cy.contains(/^\s*Scheduler stopped\s*$/).should('be.visible');

      cy.log('outcome');
      cy.contains(/adFailure = on/).should('be.visible');
      readFlags().its('flags.adFailure.defaultVariant').should('eq', 'off');
    });

    it('shows a stopped scheduler with the Idle badge and a Start button', () => {
      cy.contains(/^\s*Scheduler stopped\s*$/).should('be.visible');
      cy.contains(/^\s*Idle\s*$/).should('be.visible');
      button('Start').should('be.visible');
    });

    it('pre-fills the form with 900, 60, 180 and 1', () => {
      field('interval_seconds').should('have.value', '900');
      field('min_duration_seconds').should('have.value', '60');
      field('max_duration_seconds').should('have.value', '180');
      field('concurrency').should('have.value', '1');
    });
  });

  it('offers the three presets and Presentation sets 60, 10 and 20 seconds', () => {
    [PRESENTATION, 'Frequent (15m / 1-3m)', 'Hourly (1h / 5-15m)'].forEach(p => button(p).should('be.visible'));
    button(PRESENTATION).click();
    field('interval_seconds').should('have.value', '60');
    field('min_duration_seconds').should('have.value', '10');
    field('max_duration_seconds').should('have.value', '20');
  });

  it('lists cartFailure with toggle all and one checkbox per non-default variant', () => {
    cy.get('[phx-value-flag="cartFailure"]').invoke('text').invoke('trim').should('eq', 'toggle all');
    cy.get('[name="variants[cartFailure][]"]').then($i =>
      expect([...$i].map(i => (i as HTMLInputElement).value)).to.deep.equal(['10%', '100%', '25%', '50%', '75%', '90%'])
    );
    cy.get('[name="variants[cartFailure][]"][value="off"]').should('not.exist');
  });

  it('lists adFailure as a single checkbox with value on', () => {
    cy.get('[name="variants[adFailure][]"]').should('have.length', 1).and('have.value', 'on');
    cy.get('[phx-value-flag="adFailure"]').should('not.exist');
  });

  it('starts with the Presentation preset and shows the running state', () => {
    startAdFailureOnly();
    cy.contains(/^\s*Scheduler running\s*$/).should('be.visible');
    cy.contains(/^\s*Active\s*$/).should('be.visible');
    cy.contains(/Interval\s*\d+/).should('be.visible');
    cy.contains(/Seed\s*-?\d+/).should('be.visible');
    cy.contains(/Currently active \(\d of 1\)/).should('be.visible');
    button('Restart').should('be.visible');
    button('Stop').should('be.visible');
    flash().should('contain', 'Scheduler started');
  });

  it('refuses a maximum duration longer than the interval', () => {
    setField('interval_seconds', 900);
    setField('max_duration_seconds', 1000);
    button('Start').click();
    cy.contains('Maximum duration must fit within the interval').should('be.visible');
    cy.contains(/^\s*Scheduler stopped\s*$/).should('be.visible');
  });

  it('refuses a maximum duration below the minimum duration', () => {
    setField('min_duration_seconds', 60);
    setField('max_duration_seconds', 30);
    button('Start').click();
    cy.contains('Maximum duration must be greater than or equal to the minimum duration').should('be.visible');
    cy.contains(/^\s*Scheduler stopped\s*$/).should('be.visible');
  });

  it('refuses to start with no flag variant selected', () => {
    button('None').click();
    button('Start').click();
    cy.contains('Select at least one flag variant to schedule').should('be.visible');
    cy.contains(/^\s*Scheduler stopped\s*$/).should('be.visible');
  });

  it('shares the running state with every viewer', () => {
    startAdFailureOnly();
    cy.request(`${proxyOrigin()}/feature/scheduler`).its('body').should('contain', 'Scheduler running');
  });

  it('holds adFailure on for 10 to 20 seconds within a minute', () => {
    startAdFailureOnly();
    waitForAdFailure('on', 60);
    flagdUiLogsSince(since).then(out => {
      const m = out.match(/Flag scheduler set adFailure to on for (\d+)ms/);
      expect(m, 'set log line').to.not.equal(null);
      expect(Number(m?.[1])).to.be.within(10000, 20000);
    });
    readFlags().its('flags.adFailure.defaultVariant').should('eq', 'on');
  });

  it('resolves adFailure to true while the scheduler holds it on', () => {
    startAdFailureOnly();
    waitForAdFailure('on', 60);
    resolveAdFailure(true).should('eq', true);
  });

  it('reverts adFailure when the hold ends and lists it under Recent activations', () => {
    startAdFailureOnly();
    waitForAdFailure('on', 60);
    waitForAdFailure('off', 25);
    flagdUiLogsSince(since).should('contain', 'Flag scheduler reverted adFailure to off');
    cy.contains('Recent activations').should('be.visible');
    cy.contains(/adFailure = on[\s\S]*\d{2}:\d{2}:\d{2} UTC for \S+/).should('be.visible');
  });

  it('reverts a held flag at once when stopped', () => {
    startAdFailureOnly();
    waitForAdFailure('on', 60);
    button('Stop').click();
    adFailureVariant().should('eq', 'off');
    flagdUiLogsSince(since).should('contain', 'Flag scheduler stopped');
    flash().should('contain', 'Scheduler stopped');
    cy.contains(/^\s*Scheduler stopped\s*$/).should('be.visible');
  });

  it('starts with seed 42 and shows it', () => {
    startAdFailureOnly({ seed: 42 });
    cy.contains(/Seed\s*42\b/).should('be.visible');
    flagdUiLogsSince(since).should('contain', 'Flag scheduler started with seed 42');
  });

  it('warns when more concurrent flags are asked for than are selected', () => {
    startAdFailureOnly({ concurrency: 2 });
    flagdUiLogsSince(since).should(
      'contain',
      'Flag scheduler was asked for 2 concurrent flags but only 1 are selected'
    );
  });
});

export {};
