// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { IFlagdFlag, flagSelect, readFlags, setFlag } from '../../utils/Cypress';

type Flags = Record<string, IFlagdFlag>;

interface ITiming {
  interval: number | '';
  min: number;
  max: number;
  concurrency?: number;
  seed?: number | string;
}

const SCHEDULED_FLAGS = ['cartFailure', 'adFailure', 'adHighCpu', 'paymentUnreachable'];

// LiveView only handles clicks once its socket has connected.
const visitLive = (path: string) => {
  cy.visit(path);
  cy.get('.phx-connected').should('exist');
};

const field = (label: string) => cy.contains('label', label).find('input');

const setField = (label: string, value: number | string | undefined) => {
  field(label).clear();
  if (value !== undefined && value !== '') field(label).type(String(value));
};

const fillTiming = ({ interval, min, max, concurrency = 1, seed }: ITiming) => {
  setField('Interval (seconds)', interval);
  setField('Minimum duration (seconds)', min);
  setField('Maximum duration (seconds)', max);
  setField('Flags at once (per interval)', concurrency);
  setField('Seed (optional, for reproducible patterns)', seed);
};

const flagCheckboxes = () => cy.get('#scheduler-form input[type="checkbox"]');

const variantBoxes = (flag: string) => flagCheckboxes().filter(`[name="variants[${flag}][]"]`);

const variantBox = (flag: string, variant: string) => variantBoxes(flag).filter(`[value="${variant}"]`);

const closeFlash = () => cy.get('button[aria-label="close"]').click({ multiple: true, force: true });

// Lets the server-side validation answer where the browser's own number constraints would block the submit.
const disableBrowserValidation = () =>
  cy.document().then(doc => doc.getElementById('scheduler-form')?.setAttribute('novalidate', 'novalidate'));

const selectOnly = (...choices: [string, string][]) => {
  cy.contains('button', /^\s*None\s*$/).click();
  flagCheckboxes().filter(':checked').should('have.length', 0);
  choices.forEach(([flag, variant]) => variantBox(flag, variant).check());
};

const start = () => cy.contains('button', /^\s*(Start|Restart)\s*$/).click();

const stopIfRunning = () => {
  visitLive('/feature/scheduler');
  cy.contains(/Scheduler (running|stopped)/)
    .invoke('text')
    .then(status => {
      if (status.includes('running')) {
        cy.contains('button', 'Stop').click();
        cy.contains('Scheduler stopped');
      }
    });
};

// The variant a flag is set to, reading productCatalogFailure's on/off from its targeting rule.
const activeVariant = (flags: Flags, name: string) =>
  name === 'productCatalogFailure' ? String(flags[name].targeting?.if[1]) : flags[name].defaultVariant;

const sampleFlags = (durationMs: number, intervalMs: number) => {
  const samples: Flags[] = [];
  const take = (until: number): Cypress.Chainable<Flags[]> =>
    readFlags().then(flags => {
      samples.push(flags);
      if (Date.now() >= until) return cy.wrap(samples);
      return cy.wait(intervalMs).then(() => take(until));
    });
  return cy.then(() => take(Date.now() + durationMs));
};

// First flag=variant that differs from the resting configuration, polled every 200 ms.
const firstActivation = (resting: Flags, timeoutMs: number) => {
  const look = (until: number): Cypress.Chainable<string> =>
    readFlags().then(flags => {
      const changed = Object.keys(flags).find(name => activeVariant(flags, name) !== activeVariant(resting, name));
      if (changed) return cy.wrap(`${changed}=${activeVariant(flags, changed)}`);
      expect(Date.now(), 'an activation within the timeout').to.be.lessThan(until);
      return cy.wait(200).then(() => look(until));
    });
  return cy.then(() => look(Date.now() + timeoutMs));
};

describe('Flag scheduler', () => {
  beforeEach(() => {
    stopIfRunning();
  });

  afterEach(() => {
    stopIfRunning();
    SCHEDULED_FLAGS.forEach(flag => setFlag(flag, 'off'));
  });

  it('starts a schedule for cartFailure 10% and stops it', () => {
    cy.log('Step 1: open the Scheduler tab');
    visitLive('/feature');
    cy.contains(/^\s*Scheduler\s*$/).click();
    cy.location('pathname').should('eq', '/feature/scheduler');
    cy.contains('Scheduler stopped').should('be.visible');
    cy.contains('Idle').should('be.visible');
    [
      'Interval (seconds)',
      'Minimum duration (seconds)',
      'Maximum duration (seconds)',
      'Flags at once (per interval)',
      'Seed (optional, for reproducible patterns)',
    ].forEach(label => field(label).should('exist'));

    cy.log('Step 2: look at the Flags list');
    variantBoxes('cartFailure')
      .should('have.length', 6)
      .then($boxes => {
        expect(
          $boxes
            .toArray()
            .map(box => (box as HTMLInputElement).value)
            .sort()
        ).to.deep.eq(['10%', '100%', '25%', '50%', '75%', '90%'].sort());
      });
    variantBox('adFailure', 'on').should('exist');
    variantBoxes('emitRawPii').should('have.length', 0);

    cy.log('Step 3: a maximum duration longer than the interval is refused');
    fillTiming({ interval: 60, min: 10, max: 120 });
    start();
    cy.contains('Maximum duration must fit within the interval').should('be.visible');
    cy.contains('Scheduler stopped').should('be.visible');

    cy.log('Step 4: start a 4 s schedule for cartFailure 10%');
    readFlags().then(resting => {
      fillTiming({ interval: 4, min: 1, max: 2, concurrency: 1 });
      selectOnly(['cartFailure', '10%']);
      start();
      cy.contains('Scheduler started').should('be.visible');
      cy.contains('Scheduler running').should('be.visible');
      cy.contains('Active').should('be.visible');
      cy.contains(/Seed\s*-?\d+/).should('be.visible');
      cy.contains('dt', 'Interval').should('be.visible');

      cy.log('Step 5: the flag is activated, then reverted');
      sampleFlags(7000, 250).then(samples => {
        const values = samples.map(flags => flags.cartFailure.defaultVariant);
        const firstOn = values.indexOf('10%');
        expect(firstOn, `cartFailure values ${values.join(',')}`).to.be.greaterThan(-1);
        expect(values.slice(firstOn), `cartFailure values ${values.join(',')}`).to.include('off');
        samples.forEach(flags =>
          Object.keys(resting)
            .filter(name => name !== 'cartFailure')
            .forEach(name => expect(flags[name], name).to.deep.eq(resting[name]))
        );
      });
      cy.contains('Recent activations').should('be.visible');
      cy.contains('cartFailure = 10%').should('be.visible');
    });

    cy.log('Step 6: stop the scheduler');
    cy.contains('button', 'Stop').click();
    cy.contains('Scheduler stopped').should('be.visible');

    cy.log('Step 7: back on the Basic tab cartFailure is off');
    closeFlash();
    cy.contains(/^\s*Basic\s*$/).click();
    flagSelect('cartFailure').should('have.value', 'off');
    readFlags().its('cartFailure.defaultVariant').should('eq', 'off');
  });

  it('reverts a held flag as soon as the scheduler is stopped', () => {
    visitLive('/feature/scheduler');
    fillTiming({ interval: 60, min: 30, max: 30, concurrency: 1, seed: 7 });
    selectOnly(['adFailure', 'on']);
    start();
    cy.contains('Scheduler running').should('be.visible');
    const waitForOn = (until: number): Cypress.Chainable<boolean> =>
      readFlags().then(flags => {
        if (flags.adFailure.defaultVariant === 'on') return cy.wrap(true);
        expect(Date.now(), 'adFailure activated within 40 s').to.be.lessThan(until);
        return cy.wait(250).then(() => waitForOn(until));
      });
    cy.then(() => waitForOn(Date.now() + 40000));
    cy.contains('button', 'Stop').click();
    cy.contains('[role="alert"]', 'Scheduler stopped').should('be.visible');
    cy.contains('p', 'Scheduler stopped').should('be.visible');
    cy.contains('Idle').should('be.visible');
    readFlags().its('adFailure.defaultVariant').should('eq', 'off');
  });

  it('refuses invalid schedules without changing any flag', () => {
    visitLive('/feature/scheduler');
    readFlags().then(before => {
      const cases: [ITiming, [string, string][], string][] = [
        [
          { interval: '', min: 10, max: 20 },
          [['cartFailure', '10%']],
          'Interval must be a whole number of seconds greater than zero',
        ],
        [
          { interval: 0, min: 10, max: 20 },
          [['cartFailure', '10%']],
          'Interval must be a whole number of seconds greater than zero',
        ],
        [
          { interval: 60, min: 30, max: 20 },
          [['cartFailure', '10%']],
          'Maximum duration must be greater than or equal to the minimum duration',
        ],
        [
          { interval: 60, min: 10, max: 20, concurrency: 0 },
          [['cartFailure', '10%']],
          'Flags at once must be a whole number greater than zero',
        ],
        [{ interval: 60, min: 10, max: 20, seed: '1.5' }, [['cartFailure', '10%']], 'Seed must be a whole number'],
        [{ interval: 60, min: 10, max: 20 }, [], 'Select at least one flag variant to schedule'],
      ];
      cases.forEach(([timing, choices, message]) => {
        fillTiming(timing);
        selectOnly(...choices);
        disableBrowserValidation();
        start();
        cy.contains(message).should('be.visible');
        cy.contains('Scheduler stopped').should('be.visible');
      });
      readFlags().should('deep.eq', before);
    });
  });

  it('activates several flags at once and reverts all of them', () => {
    visitLive('/feature/scheduler');
    fillTiming({ interval: 4, min: 2, max: 2, concurrency: 3 });
    selectOnly(['adFailure', 'on'], ['adHighCpu', 'on'], ['paymentUnreachable', 'on']);
    start();
    cy.contains('Scheduler running').should('be.visible');
    sampleFlags(5000, 200).then(samples => {
      const states = samples.map(flags =>
        ['adFailure', 'adHighCpu', 'paymentUnreachable'].map(name => flags[name].defaultVariant)
      );
      const allOn = states.findIndex(state => state.every(variant => variant === 'on'));
      expect(allOn, JSON.stringify(states)).to.be.greaterThan(-1);
      expect(
        states.slice(allOn).some(state => state.every(variant => variant === 'off')),
        JSON.stringify(states)
      ).to.eq(true);
    });
  });

  it('repeats the same first activation for the same seed', () => {
    const timing = { interval: 4, min: 1, max: 1, concurrency: 1, seed: 42 };
    visitLive('/feature/scheduler');
    readFlags().then(resting => {
      fillTiming(timing);
      cy.contains('button', /^\s*All\s*$/).click();
      start();
      cy.contains(/Seed\s*42\b/).should('be.visible');
      firstActivation(resting, 8000).then(first => {
        cy.contains('button', 'Stop').click();
        cy.contains('Scheduler stopped').should('be.visible');
        readFlags().should('deep.eq', resting);

        fillTiming(timing);
        cy.contains('button', /^\s*All\s*$/).click();
        start();
        cy.contains(/Seed\s*42\b/).should('be.visible');
        firstActivation(resting, 8000).should('eq', first);
      });
    });
  });

  it('holds productCatalogFailure through its targeting rule and reverts it', () => {
    visitLive('/feature/scheduler');
    fillTiming({ interval: 6, min: 3, max: 3, concurrency: 1 });
    selectOnly(['productCatalogFailure', 'on']);
    start();
    cy.contains('Scheduler running').should('be.visible');

    const statuses: number[] = [];
    const defaultVariants: string[] = [];
    const watch = (until: number, sawOn: boolean): Cypress.Chainable<boolean> =>
      readFlags().then(flags => {
        defaultVariants.push(flags.productCatalogFailure.defaultVariant);
        const on = activeVariant(flags, 'productCatalogFailure') === 'on';
        if (sawOn && !on) return cy.wrap(true);
        if (Date.now() >= until) return cy.wrap(false);
        const next = () => cy.wait(300).then(() => watch(until, sawOn || on));
        if (!on) return next();
        return cy
          .request({ url: '/api/products/OLJCESPC7Z?currencyCode=USD', failOnStatusCode: false })
          .then(({ status }) => statuses.push(status))
          .then(next);
      });
    cy.then(() => watch(Date.now() + 15000, false)).then(reverted => {
      expect(reverted, 'productCatalogFailure activated then reverted').to.eq(true);
      expect(statuses, 'OLJCESPC7Z statuses while held').to.include(500);
      expect(defaultVariants.every(variant => variant === 'off')).to.eq(true);
    });
    cy.request('/api/products/0PUK6V6EV0?currencyCode=USD').its('status').should('eq', 200);
    cy.contains('button', 'Stop').click();
    readFlags().its('productCatalogFailure.targeting.if.1').should('eq', 'off');
    cy.wait(4000);
    cy.request('/api/products/OLJCESPC7Z?currencyCode=USD').its('status').should('eq', 200);
  });

  it('updates the Basic dashboard while the scheduler changes a flag', () => {
    visitLive('/feature/scheduler');
    fillTiming({ interval: 4, min: 2, max: 2, concurrency: 1 });
    selectOnly(['cartFailure', '10%']);
    start();
    cy.contains('Scheduler running').should('be.visible');
    closeFlash();
    cy.contains(/^\s*Basic\s*$/).click();
    cy.location('pathname').should('match', /^\/feature\/?$/);
    flagSelect('cartFailure', { timeout: 10000 }).should('have.value', '10%');
    flagSelect('cartFailure', { timeout: 10000 }).should('have.value', 'off');
  });
});

export {};
