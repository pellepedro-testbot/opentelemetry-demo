// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { readFlags, setFlagDefaultVariant } from '../../utils/CypressStoreApi';
import { createJourney } from '../../utils/CypressJourney';

const field = (label: string) => cy.contains('label', label).find('input');

const fillTiming = ({ interval, min, max, seed }: { interval: number; min: number; max: number; seed?: number }) => {
  const values: [string, string][] = [
    ['Interval (seconds)', String(interval)],
    ['Minimum duration (seconds)', String(min)],
    ['Maximum duration (seconds)', String(max)],
    ['Seed (optional', seed === undefined ? '' : String(seed)],
  ];
  values.forEach(([label, value]) => {
    field(label).clear();
    if (value) field(label).type(value);
  });
  values.forEach(([label, value]) => field(label).should('have.value', value));
};

const selectOnlyAdFailure = () => {
  cy.contains('button', /^\s*None\s*$/).click();
  cy.contains('label', /^\s*adFailure\s*$/)
    .find('input[type="checkbox"]')
    .check();
  cy.contains('label', /^\s*adFailure\s*$/)
    .find('input[type="checkbox"]')
    .should('be.checked');
};

const openScheduler = () => {
  cy.visit('/feature/scheduler');
  cy.get('[data-phx-main].phx-connected').should('exist');
};

const adFailureVariant = () => readFlags().then(({ flags }) => flags.adFailure.defaultVariant as string);

/** Polls /feature/api/read until adFailure has the variant; yields the milliseconds it took. */
const waitForAdFailure = (variant: string, timeout: number) => {
  let started = 0;
  const poll = (): Cypress.Chainable<number> =>
    adFailureVariant().then(current => {
      if (current === variant) return cy.wrap(Date.now() - started);
      if (Date.now() - started > timeout) {
        throw new Error(`adFailure stayed '${current}' for ${timeout} ms, expected '${variant}'`);
      }
      return cy.wait(250, { log: false }).then(poll);
    });
  return cy.then(() => {
    started = Date.now();
  }).then(poll);
};

const stopSchedulerIfRunning = () => {
  cy.visit('/feature/scheduler');
  cy.get('[data-phx-main].phx-connected').should('exist');
  cy.get('body').then($body => {
    const stop = $body.find('button').filter((_, el) => el.textContent?.trim() === 'Stop');
    if (stop.length) cy.wrap(stop).click();
  });
  setFlagDefaultVariant('adFailure', 'off');
};

describe('Flag scheduler', () => {
  afterEach(stopSchedulerIfRunning);

  it('is reachable from the flag dashboard navbar', () => {
    cy.visit('/feature/');
    cy.contains('a', 'Scheduler').click();
    cy.location('pathname').should('eq', '/feature/scheduler');
    cy.contains('label', 'Interval (seconds)').should('be.visible');
  });

  it('refuses a maximum duration longer than the interval', () => {
    openScheduler();
    selectOnlyAdFailure();
    fillTiming({ interval: 5, min: 1, max: 10 });
    cy.contains('button', /^\s*Start\s*$/).click();
    cy.contains('Maximum duration must fit within the interval').should('be.visible');
    cy.contains('Scheduler stopped').should('be.visible');
    adFailureVariant().should('eq', 'off');
  });

  it('activates the picked flag for the hold and reports the seed', () => {
    openScheduler();
    selectOnlyAdFailure();
    fillTiming({ interval: 10, min: 3, max: 3, seed: 42 });
    cy.contains('button', /^\s*Start\s*$/).click();
    cy.contains('Scheduler started').should('be.visible');
    cy.contains('Scheduler running').should('be.visible');
    cy.contains('dt', 'Seed').next('dd').should('have.text', '42');
    waitForAdFailure('on', 15000);
    waitForAdFailure('off', 6000).should('be.greaterThan', 1500);
  });

  it('reverts the held flag when stopped and shows a generated seed', () => {
    openScheduler();
    selectOnlyAdFailure();
    fillTiming({ interval: 10, min: 8, max: 8 });
    cy.contains('button', /^\s*Start\s*$/).click();
    cy.contains('Scheduler running').should('be.visible');
    cy.contains('dt', 'Seed')
      .next('dd')
      .invoke('text')
      .should('match', /^\s*-?\d+\s*$/);
    waitForAdFailure('on', 15000);
    cy.contains(/adFailure = on/).should('be.visible');
    cy.contains('button', /^\s*Stop\s*$/).click();
    cy.contains('Scheduler stopped').should('be.visible');
    adFailureVariant().should('eq', 'off');
  });

  it('schedules failure scenarios from the feature flag UI', () => {
    const journey = createJourney();
    const pageText = ($b: JQuery<HTMLElement>) => $b.text().replace(/\s+/g, ' ');

    journey.step('Step 1: open the scheduler from the navbar', () => {
      cy.visit('/feature/');
      cy.contains('a', 'Scheduler').click();
      cy.location('pathname').should('eq', '/feature/scheduler');
      cy.get('[data-phx-main].phx-connected').should('exist');
      journey.check('interval field', $b => $b.find('label:contains("Interval (seconds)")').length, 1);
    });

    journey.step('Step 2: start with a maximum longer than the interval', () => {
      fillTiming({ interval: 5, min: 1, max: 10 });
      cy.contains('button', /^\s*Start\s*$/).click();
      journey.check('validation message', $b => pageText($b).includes('Maximum duration must fit within the interval'), true);
      adFailureVariant().then(variant => journey.record('adFailure unchanged', variant === 'off', `got ${variant}`));
    });

    journey.step('Step 3: start adFailure every 10s for 3s with seed 42', () => {
      selectOnlyAdFailure();
      fillTiming({ interval: 10, min: 3, max: 3, seed: 42 });
      cy.contains('button', /^\s*Start\s*$/).click();
      journey.check('started notice', $b => pageText($b).includes('Scheduler started'), true);
      journey.check('running state', $b => pageText($b).includes('Scheduler running'), true);
      journey.check('seed shown', $b => $b.find('dt:contains("Seed")').next('dd').text().trim(), '42');
      waitForAdFailure('on', 15000);
      waitForAdFailure('off', 6000).then(ms => journey.record('adFailure held about 3s', ms > 1500, `reverted after ${ms} ms`));
    });

    journey.step('Step 4: restart with an 8s hold and no seed, then stop while held', () => {
      fillTiming({ interval: 10, min: 8, max: 8 });
      cy.contains('button', /^\s*Restart\s*$/).click();
      journey.check('generated seed shown', $b => /^-?\d+$/.test($b.find('dt:contains("Seed")').next('dd').text().trim()), true);
      waitForAdFailure('on', 15000);
      journey.check('active flag shown', $b => /adFailure = on \(\d+s left\)/.test(pageText($b)), true);
      cy.contains('button', /^\s*Stop\s*$/).click();
      journey.check('stopped notice', $b => pageText($b).includes('Scheduler stopped'), true);
      adFailureVariant().then(variant => journey.record('adFailure reverted on stop', variant === 'off', `got ${variant}`));
    });

    journey.step('Step 5: reload', () => {
      cy.reload();
      cy.get('[data-phx-main].phx-connected').should('exist');
      journey.check('idle state', $b => $b.find('span').filter((_, el) => el.textContent?.trim() === 'Idle').length, 1);
      journey.check('nothing active', $b => pageText($b).includes('Currently active'), false);
      adFailureVariant().then(variant => journey.record('adFailure off after reload', variant === 'off', `got ${variant}`));
    });

    cy.contains('Scheduler stopped').should('be.visible');
    cy.contains('span', /^\s*Idle\s*$/).should('be.visible');
    adFailureVariant().should('eq', 'off');

    journey.finish();
  });
});

export {};
