// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { Journey } from '../../utils/CypressJourney';

const FLAGD_READ_URL = '/feature/api/read';
const FLAGD_WRITE_URL = '/feature/api/write';
const SCHEDULER_URL = '/feature/scheduler';

// Matches an element whose whole text, apart from surrounding whitespace, is the given text.
const exactly = (text: string) => new RegExp(`^\\s*${text}\\s*$`);

type Flags = Record<string, { defaultVariant: string }>;

const readFlags = () => cy.request({ url: FLAGD_READ_URL, log: false }).then(({ body }) => body.flags as Flags);

const defaultVariants = (flags: Flags) =>
  Object.fromEntries(Object.entries(flags).map(([name, flag]) => [name, flag.defaultVariant]));

const fieldLabelled = (label: string) => cy.contains('label', label).find('input');

const fill = (label: string, value: string) => fieldLabelled(label).clear().type(value);

const cartFailureVariant = (variant: string) => cy.get(`input[name="variants[cartFailure][]"][value="${variant}"]`);

const configure = (interval: string, min: string, max: string) => {
  fill('Interval (seconds)', interval);
  fill('Minimum duration (seconds)', min);
  fill('Maximum duration (seconds)', max);
  fill('Flags at once (per interval)', '1');
  fill('Seed (optional, for reproducible patterns)', '42');
  cy.contains('button', exactly('None')).click();
  cartFailureVariant('100%').check();
};

const start = () => cy.contains('button', exactly('(Start|Restart)')).click();

const stopIfRunning = () => {
  cy.visit(SCHEDULER_URL);
  cy.contains('p', exactly('Scheduler (running|stopped)')).then($status => {
    if ($status.text().trim() === 'Scheduler running') {
      cy.contains('button', exactly('Stop')).click();
      cy.contains('p', exactly('Scheduler stopped')).should('be.visible');
    }
  });
};

// Reads the cartFailure variant every 500ms for the given time.
const sampleCartFailure = (durationMs: number) => {
  const samples: { at: number; variant: string }[] = [];
  let startedAt = 0;
  const sample = (): Cypress.Chainable<{ at: number; variant: string }[]> =>
    readFlags().then(flags => {
      samples.push({ at: Date.now() - startedAt, variant: flags.cartFailure.defaultVariant });
      if (Date.now() - startedAt >= durationMs) return cy.wrap(samples, { log: false });
      return cy.wait(500, { log: false }).then(sample);
    });
  return cy
    .then(() => {
      startedAt = Date.now();
    })
    .then(sample);
};

const waitForCartFailure = (variant: string, timeoutMs: number) => {
  let deadline = 0;
  const poll = (): Cypress.Chainable<boolean> =>
    readFlags().then(flags => {
      if (flags.cartFailure.defaultVariant === variant) return cy.wrap(true, { log: false });
      if (Date.now() > deadline) return cy.wrap(false, { log: false });
      return cy.wait(500, { log: false }).then(poll);
    });
  return cy
    .then(() => {
      deadline = Date.now() + timeoutMs;
    })
    .then(poll);
};

const restoreCartFailure = () =>
  cy.request(FLAGD_READ_URL).then(({ body }) => {
    body.flags.cartFailure.defaultVariant = 'off';
    cy.request('POST', FLAGD_WRITE_URL, { data: body });
  });

describe('Flag scheduler', () => {
  beforeEach(() => stopIfRunning());

  afterEach(() => {
    stopIfRunning();
    restoreCartFailure();
  });

  it('refuses invalid configurations with their message', () => {
    readFlags().then(before => {
      cy.visit(SCHEDULER_URL);
      configure('60', '2', '120');
      start();
      cy.contains('Maximum duration must fit within the interval').should('be.visible');
      cy.contains('p', exactly('Scheduler stopped')).should('be.visible');

      configure('60', '0', '2');
      start();
      cy.get('body').then($body => {
        const input = $body.find(
          'label:contains("Minimum duration (seconds)") input'
        )[0] as unknown as HTMLInputElement;
        const shown = $body.text().includes('Minimum duration must');
        expect(shown || !input.checkValidity(), 'minimum below 1 second refused with a message').to.eq(true);
      });
      cy.contains('p', exactly('Scheduler stopped')).should('be.visible');

      configure('60', '2', '2');
      cy.contains('button', exactly('None')).click();
      start();
      cy.contains('Select at least one flag variant to schedule').should('be.visible');
      cy.contains('p', exactly('Scheduler stopped')).should('be.visible');

      readFlags().then(after => expect(defaultVariants(after)).to.deep.eq(defaultVariants(before)));
    });
  });

  it('activates a selected flag variant within the interval and reverts it after the hold', () => {
    readFlags().then(before => {
      cy.visit(SCHEDULER_URL);
      configure('4', '2', '2');
      start();
      cy.contains('p', exactly('Scheduler running')).should('be.visible');

      sampleCartFailure(8000).then(samples => {
        const firstOn = samples.findIndex(s => s.variant === '100%');
        expect(firstOn, `cartFailure samples ${JSON.stringify(samples)}`).to.be.greaterThan(-1);
        expect(samples[firstOn].at, 'activated within the 4s interval').to.be.at.most(4500);
        const revert = samples.slice(firstOn).find(s => s.variant === 'off');
        expect(revert, 'reverted to off after the hold').to.not.eq(undefined);
        expect(revert!.at - samples[firstOn].at, 'held about 2s').to.be.within(1000, 4000);
      });

      cy.contains('button', exactly('Stop')).click();
      cy.contains('p', exactly('Scheduler stopped')).should('be.visible');
      cy.wait(1000);
      readFlags().then(after => expect(defaultVariants(after)).to.deep.eq(defaultVariants(before)));
    });
  });

  it('reverts the flag it holds when stopped', () => {
    cy.visit(SCHEDULER_URL);
    configure('60', '50', '50');
    start();
    cy.contains('p', exactly('Scheduler running')).should('be.visible');
    waitForCartFailure('100%', 65000).then(active => expect(active, 'cartFailure activated').to.eq(true));

    cy.contains('button', exactly('Stop')).click();
    cy.contains('p', exactly('Scheduler stopped')).should('be.visible');
    waitForCartFailure('off', 2000).then(reverted => expect(reverted, 'cartFailure back to off').to.eq(true));
  });

  it('schedules a failure scenario from the feature flag UI', () => {
    const journey = new Journey();
    const samples: string[] = [];

    journey.step('1. open the scheduler from the navbar', () => {
      cy.visit('/feature/');
      cy.contains('nav a', exactly('Scheduler')).click();
      cy.location('pathname').should('eq', SCHEDULER_URL);
      cy.contains('p', exactly('Scheduler stopped')).should('be.visible');
    });

    journey.step('2. start with a maximum duration longer than the interval', () => {
      fill('Interval (seconds)', '60');
      fill('Maximum duration (seconds)', '120');
      start();
      journey.expectSoon(
        'refused with "Maximum duration must fit within the interval"',
        $body => $body.text(),
        text => text.includes('Maximum duration must fit within the interval') && text.includes('Scheduler stopped')
      );
    });

    journey.step('3. schedule cartFailure 100% every 4 seconds', () => {
      cy.get('input[name^="variants[emitRawPii]"]').should('not.exist');
      configure('4', '2', '2');
      start();
      cy.contains('p', exactly('Scheduler running')).should('be.visible');
      journey.expectSoon(
        'shows one active flag cartFailure = 100%',
        $body => $body.text(),
        text => text.includes('Currently active (1 of 1)') && text.includes('cartFailure = 100%')
      );
      sampleCartFailure(8000).then(sampled => {
        samples.push(...sampled.map(s => s.variant));
        if (!samples.includes('100%') || !samples.includes('off')) {
          journey.fail(`cartFailure did not flip between 100% and off: ${samples.join(',')}`);
        }
      });
    });

    journey.step('4. stop the scheduler', () => {
      cy.contains('button', exactly('Stop')).click();
      cy.contains('p', exactly('Scheduler stopped')).should('be.visible');
      waitForCartFailure('off', 2000).then(off => {
        if (!off) journey.fail('cartFailure is not back to off after Stop');
      });
    });

    journey.finish();
  });
});

export {};
