// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createStepLogger, readFlags, setFlagDefaultVariant } from '../../utils/Cypress';

const step = createStepLogger();

const waitForLiveView = () =>
  cy.window().its('liveSocket', { timeout: 15000 }).invoke('isConnected').should('eq', true);

const adFailureControl = () => cy.get('select[name="adFailure"]', { timeout: 10000 });

const visitLive = (url: string) => {
  cy.visit(url);
  waitForLiveView();
};

const navigate = (name: string) => {
  cy.contains('nav a', name).click();
  waitForLiveView();
};

const dismissFlash = (message: string) => {
  cy.contains('[role="alert"]', message).should('be.visible').click();
  cy.contains('[role="alert"]', message).should('not.exist');
};

const timingInput = (label: string) => cy.contains('label', label).find('input');

const setTiming = (label: string, value: number) => timingInput(label).clear().type(String(value));

const flagCheckbox = (flag: string) => cy.contains('label', flag).find('input[type="checkbox"]');

type Sample = { defaultVariant: string; targeted?: string };

const sampleFlag = (
  flag: string,
  durationMs: number,
  samples: Sample[] = [],
  started = Date.now()
): Cypress.Chainable<Sample[]> =>
  readFlags().then(config => {
    const { defaultVariant, targeting } = config.flags[flag];
    samples.push({ defaultVariant, targeted: targeting?.if?.[1] });
    if (Date.now() - started >= durationMs) {
      return cy.wrap(samples);
    }
    return cy.wait(500).then(() => sampleFlag(flag, durationMs, samples, started));
  });

const wentOnThenOff = (values: (string | undefined)[]) => {
  const firstOn = values.indexOf('on');
  return firstOn >= 0 && values.slice(firstOn).includes('off');
};

const stopSchedulerIfRunning = () => {
  visitLive('/feature/scheduler');
  cy.contains(/Scheduler (running|stopped)/)
    .invoke('text')
    .then(status => {
      if (status.includes('running')) {
        cy.contains('button', 'Stop').click();
        cy.contains('Scheduler stopped').should('be.visible');
      }
    });
};

describe('Release 3.1.0 flag scheduler', () => {
  before(() => {
    stopSchedulerIfRunning();
  });

  after(() => {
    stopSchedulerIfRunning();
    setFlagDefaultVariant('adFailure', 'off');
  });

  it('schedules a failure flag to come and go, then stops', () => {
    step('Step 1: open the flag configurator', () => {
      visitLive('/feature');
      cy.contains('adFailure').should('be.visible');
    });

    step('Step 2: open the scheduler from the navbar', () => {
      navigate('Scheduler');
      cy.location('pathname').should('eq', '/feature/scheduler');
      cy.contains('Scheduler stopped').should('be.visible');
    });

    step('Step 3: a maximum duration longer than the interval is refused', () => {
      setTiming('Interval (seconds)', 10);
      setTiming('Minimum duration (seconds)', 2);
      setTiming('Maximum duration (seconds)', 20);
      cy.contains('button', 'Start').click();
      cy.contains('Maximum duration must fit within the interval').should('be.visible');
      cy.contains('Scheduler stopped').should('be.visible');
    });

    step('Step 4: start with adFailure only', () => {
      setTiming('Interval (seconds)', 5);
      setTiming('Maximum duration (seconds)', 3);
      cy.contains('button', 'None').click();
      flagCheckbox('adFailure').check();
      cy.contains('button', 'Start').click();
      cy.contains('Scheduler running').should('be.visible');
      dismissFlash('Scheduler started');
    });

    step('Step 5: adFailure is switched on and back off within the interval', () => {
      cy.contains('adFailure = on', { timeout: 10000 }).should('be.visible');
      sampleFlag('adFailure', 12000).then(samples => {
        const variants = samples.map(s => s.defaultVariant);
        expect(wentOnThenOff(variants), `adFailure over 12s: ${variants.join(',')}`).to.eq(true);
      });
    });

    step('Step 6: the Basic dashboard follows the scheduler without a reload', () => {
      navigate('Basic');
      cy.location('pathname').should('eq', '/feature/');
      adFailureControl().should('have.value', 'on');
      adFailureControl().should('have.value', 'off');
      adFailureControl().should('have.value', 'on');
    });

    step('Step 7: stop the scheduler', () => {
      navigate('Scheduler');
      cy.location('pathname').should('eq', '/feature/scheduler');
      cy.contains('button', 'Stop').click();
      cy.contains('Scheduler stopped').should('be.visible');
      dismissFlash('Scheduler stopped');
    });

    step('Step 8: adFailure is back at off on the dashboard', () => {
      navigate('Basic');
      cy.location('pathname').should('eq', '/feature/');
      readFlags().its('flags.adFailure.defaultVariant').should('eq', 'off');
      adFailureControl().should('have.value', 'off');
    });
  });

  it('holds and reverts a flag that uses a targeting rule', () => {
    stopSchedulerIfRunning();
    setTiming('Interval (seconds)', 5);
    setTiming('Minimum duration (seconds)', 2);
    setTiming('Maximum duration (seconds)', 3);
    cy.contains('button', 'None').click();
    flagCheckbox('productCatalogFailure').check();
    cy.contains('button', 'Start').click();
    cy.contains('Scheduler running').should('be.visible');

    sampleFlag('productCatalogFailure', 12000).then(samples => {
      const targeted = samples.map(s => s.targeted);
      expect(wentOnThenOff(targeted), `targeting.if[1] over 12s: ${targeted.join(',')}`).to.eq(true);
      expect(samples.map(s => s.defaultVariant)).to.deep.eq(samples.map(() => 'off'));
    });

    cy.contains('button', 'Stop').click();
    cy.contains('Scheduler stopped').should('be.visible');
    readFlags().then(config => {
      const { defaultVariant, targeting } = config.flags.productCatalogFailure;
      expect(defaultVariant).to.eq('off');
      expect(targeting.if[1]).to.eq('off');
    });
  });
});

export {};
