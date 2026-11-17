// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { FLAGD_RESOLVE_URL, readFlags, waitForFlagVariant, writeFlags } from '../../utils/CypressFlagd';

// The scheduler's log lines are read from the flagd-ui container through the containerLogs
// task, so these specs need the docker CLI and socket of the host that runs the demo.

type FlagDocument = Cypress.ObjectLike & { flags: Record<string, { defaultVariant: string; targeting?: unknown }> };

const field = (label: string) => cy.contains('label', label).find('input');
// Variant checkboxes are form fields named variants[<flag>][] with the variant as value.
const flagBoxes = (flag: string) => cy.get(`input[name="variants[${flag}][]"]`);
const allVariantBoxes = () => cy.get('input[name^="variants["]');
const toggleAll = (flag: string) => cy.get(`button[phx-value-flag="${flag}"]`);

const setTiming = (interval: number, min: number, max: number) => {
  field('Interval (seconds)').clear().type(`${interval}`);
  field('Minimum duration (seconds)').clear().type(`${min}`);
  field('Maximum duration (seconds)').clear().type(`${max}`);
};

const setSeed = (seed?: number) => {
  field('Seed (optional, for reproducible patterns)').clear();
  if (seed !== undefined) field('Seed (optional, for reproducible patterns)').type(`${seed}`);
};

const selectOnly = (flag: string, variants: string[]) => {
  cy.contains('button', 'None').click();
  flagBoxes(flag).check(variants);
};

const start = () => cy.contains('button', /^\s*(Start|Restart)\s*$/).click();

const flagdUiLogSince = (since: string) => cy.task<string>('containerLogs', { container: 'flagd-ui', since });

// flagd picks up a flag file change a moment after flagd-ui writes it.
const resolveBooleanUntil = (flagKey: string, value: boolean, timeoutMs = 5000, startedAt = Date.now()) =>
  cy.request('POST', `${FLAGD_RESOLVE_URL}/ResolveBoolean`, { flagKey, context: {} }).then(({ body }): unknown => {
    if (body.value === value || Date.now() - startedAt > timeoutMs) {
      expect(body.value, `${flagKey} resolved value`).to.eq(value);
      return cy.wrap(body);
    }
    return cy.wait(500).then(() => resolveBooleanUntil(flagKey, value, timeoutMs, startedAt));
  });

const runningSeed = () =>
  cy
    .contains('dt', 'Seed')
    .next()
    .invoke('text')
    .then(text => text.trim());

const changedFlags = (document: FlagDocument, original: FlagDocument) =>
  Object.keys(original.flags).filter(
    name =>
      document.flags[name].defaultVariant !== original.flags[name].defaultVariant ||
      JSON.stringify(document.flags[name].targeting) !== JSON.stringify(original.flags[name].targeting)
  );

// Polls the flag document once a second for `seconds`, collecting adFailure's variant with a timestamp.
const sampleVariants = (flag: string, seconds: number, samples: { at: number; variant: string }[] = []) =>
  readFlags().then((document): unknown => {
    samples.push({ at: Date.now(), variant: document.flags[flag].defaultVariant });
    if (samples.length >= seconds) return cy.wrap(samples);
    return cy.wait(1000).then(() => sampleVariants(flag, seconds, samples));
  });

describe('Flag scheduler', () => {
  let original: FlagDocument;

  before(() => {
    readFlags().then(document => {
      original = document as FlagDocument;
    });
  });

  afterEach(() => {
    cy.visit('/feature/scheduler');
    // Let the LiveView socket connect, so the Stop click reaches the server.
    cy.wait(1000);
    cy.contains('button', /^\s*(Start|Stop)\s*$/).then($button => {
      if ($button.text().trim() === 'Stop') cy.wrap($button).click();
    });
    cy.contains('Scheduler stopped', { timeout: 10000 });
    cy.then(() => writeFlags(original));
  });

  it('refuses to start with invalid settings and says why', () => {
    cy.log('Step 1: open the scheduler from the dashboard');
    cy.visit('/feature/');
    cy.contains('nav a', 'Scheduler').click();
    cy.contains('Scheduler stopped').should('be.visible');
    cy.contains('Idle').should('be.visible');
    field('Interval (seconds)').should('have.value', '900');
    field('Minimum duration (seconds)').should('have.value', '60');
    field('Maximum duration (seconds)').should('have.value', '180');
    field('Flags at once (per interval)').should('have.value', '1');
    ['Presentation (60s / 10-20s)', 'Frequent (15m / 1-3m)', 'Hourly (1h / 5-15m)'].forEach(label =>
      cy.contains('button', label).should('be.visible')
    );
    flagBoxes('cartFailure').filter(':checked').should('have.length', 6);
    allVariantBoxes().not(':checked').should('have.length', 0);

    cy.log('Step 2: apply the Presentation preset');
    cy.contains('button', 'Presentation (60s / 10-20s)').click();
    field('Interval (seconds)').should('have.value', '60');
    field('Minimum duration (seconds)').should('have.value', '10');
    field('Maximum duration (seconds)').should('have.value', '20');

    cy.log("Step 3: toggle all of cartFailure's variants off and on");
    toggleAll('cartFailure').should('contain', 'toggle all').click();
    flagBoxes('cartFailure').filter(':checked').should('have.length', 0);
    toggleAll('cartFailure').click();
    flagBoxes('cartFailure').filter(':checked').should('have.length', 6);

    cy.log('Step 4: start with nothing selected');
    cy.contains('button', 'None').click();
    start();
    cy.contains('Select at least one flag variant to schedule').should('be.visible');
    cy.contains('Scheduler stopped').should('be.visible');

    cy.log('Step 5: start with a hold longer than the interval');
    cy.contains('button', 'All').click();
    setTiming(10, 20, 30);
    start();
    cy.contains('Maximum duration must fit within the interval').should('be.visible');
    cy.contains('Scheduler stopped').should('be.visible');

    cy.log('Step 6: start with a maximum below the minimum');
    setTiming(60, 30, 20);
    start();
    cy.contains('Maximum duration must be greater than or equal to the minimum duration').should('be.visible');
    cy.contains('Scheduler stopped').should('be.visible');
  });

  it('runs adFailure on a seed, lists the activation and stops it', () => {
    let since = '';

    cy.log('Step 1: open the scheduler');
    cy.visit('/feature/');
    cy.contains('nav a', 'Scheduler').click();
    cy.location('pathname').should('eq', '/feature/scheduler');

    cy.log('Step 2: start adFailure alone with seed 7');
    selectOnly('adFailure', ['on']);
    setTiming(10, 10, 10);
    setSeed(7);
    cy.then(() => {
      since = new Date().toISOString();
    });
    start();
    cy.contains('Scheduler running').should('be.visible');
    cy.contains('Active').should('be.visible');
    cy.contains('[role="alert"]', 'Scheduler started').should('be.visible');
    runningSeed().should('eq', '7');
    cy.contains('button', 'Restart').should('be.visible');
    cy.contains('button', 'Stop').should('be.visible');

    cy.log('Step 3: adFailure is on');
    waitForFlagVariant('adFailure', 'on', 5000);
    resolveBooleanUntil('adFailure', true).its('variant').should('eq', 'on');

    cy.log('Step 4: the first hold ends');
    cy.contains('Recent activations', { timeout: 20000 }).should('be.visible');
    cy.contains(/adFailure = on/).should('be.visible');
    cy.contains(/\d\d:\d\d:\d\d UTC for 10s/).should('be.visible');
    cy.then(() =>
      flagdUiLogSince(since).should(log => {
        expect(log).to.contain('Flag scheduler set adFailure to on for 10000ms');
        expect(log).to.contain('Flag scheduler reverted adFailure to off');
      })
    );

    cy.log('Step 5: stop while adFailure is held');
    waitForFlagVariant('adFailure', 'on', 12000);
    cy.contains('button', 'Stop').click();
    cy.contains('Scheduler stopped').should('be.visible');
    cy.contains('[role="alert"]', 'Scheduler stopped').should('be.visible');
    waitForFlagVariant('adFailure', 'off', 2000);
    cy.then(() => flagdUiLogSince(since).should('contain', 'Flag scheduler stopped'));
  });

  it('picks a whole-number seed when none is given and logs it', () => {
    let since = '';
    cy.visit('/feature/scheduler');
    selectOnly('adFailure', ['on']);
    setTiming(60, 10, 10);
    setSeed();
    cy.then(() => {
      since = new Date().toISOString();
    });
    start();
    cy.contains('Scheduler running').should('be.visible');
    runningSeed()
      .should('match', /^\d+$/)
      .then(seed => flagdUiLogSince(since).should('contain', `Flag scheduler started with seed ${seed}`));
  });

  it('returns a flag to its default variant when its hold ends', () => {
    cy.visit('/feature/scheduler');
    selectOnly('adFailure', ['on']);
    setTiming(20, 10, 10);
    start();
    cy.contains('Scheduler running').should('be.visible');
    sampleVariants('adFailure', 30).then(samples => {
      const list = samples as unknown as { at: number; variant: string }[];
      const firstOn = list.find(sample => sample.variant === 'on');
      expect(firstOn, 'adFailure turned on').to.exist;
      const backOff = list.find(sample => sample.at > firstOn!.at && sample.variant === 'off');
      expect(backOff, `adFailure back to off in ${JSON.stringify(list)}`).to.exist;
      const heldSeconds = (backOff!.at - firstOn!.at) / 1000;
      expect(heldSeconds).to.be.within(8, 13);
    });
  });

  it('only activates the selected cartFailure rates', () => {
    cy.visit('/feature/scheduler');
    selectOnly('cartFailure', ['10%', '25%']);
    setTiming(10, 10, 10);
    start();
    cy.contains('Scheduler running').should('be.visible');
    sampleVariants('cartFailure', 25).then(samples => {
      const seen = new Set((samples as unknown as { variant: string }[]).map(sample => sample.variant));
      seen.delete('off');
      expect(seen.size, 'a rate was activated').to.be.greaterThan(0);
      [...seen].forEach(variant => expect(['10%', '25%']).to.include(variant));
    });
  });

  it('holds three different flags at once and restores them all on stop', () => {
    cy.visit('/feature/scheduler');
    cy.contains('button', 'All').click();
    setTiming(60, 60, 60);
    field('Flags at once (per interval)').clear().type('3');
    start();
    cy.contains('Currently active (3 of 3)', { timeout: 10000 }).should('be.visible');
    readFlags().then(document => {
      expect(changedFlags(document as FlagDocument, original)).to.have.length(3);
    });

    cy.contains('button', 'Stop').click();
    cy.contains('Scheduler stopped').should('be.visible');
    readFlags().then(document => {
      expect(changedFlags(document as FlagDocument, original)).to.deep.eq([]);
    });
  });

  it('warns when more flags at once are asked for than are selected', () => {
    let since = '';
    cy.visit('/feature/scheduler');
    selectOnly('adFailure', ['on']);
    setTiming(60, 10, 10);
    field('Flags at once (per interval)').clear().type('2');
    cy.then(() => {
      since = new Date().toISOString();
    });
    start();
    cy.contains('Scheduler running').should('be.visible');
    cy.then(() =>
      flagdUiLogSince(since).should(
        'contain',
        'Flag scheduler was asked for 2 concurrent flags but only 1 are selected'
      )
    );
  });

  it('shows when nothing is held and when the next activation comes', () => {
    cy.visit('/feature/scheduler');
    selectOnly('adFailure', ['on']);
    setTiming(60, 10, 10);
    field('Flags at once (per interval)').clear().type('1');
    start();
    cy.contains('Scheduler running').should('be.visible');
    cy.contains('Currently active (0 of 1)', { timeout: 20000 }).should('be.visible');
    cy.contains(/nothing — next in \S+/).should('be.visible');
  });

  it('activates the same flag and variant first for the same seed', () => {
    const firstActivation = () => {
      let since = '';
      cy.visit('/feature/scheduler');
      cy.contains('button', 'All').click();
      setTiming(10, 10, 10);
      field('Flags at once (per interval)').clear().type('1');
      setSeed(1234);
      cy.then(() => {
        since = new Date().toISOString();
      });
      start();
      cy.contains('Scheduler running').should('be.visible');
      cy.wait(3000);
      return cy
        .then(() => flagdUiLogSince(since))
        .then(log => {
          const match = log.match(/Flag scheduler set (\S+) to (\S+) for/);
          expect(match, 'first activation line').to.not.be.null;
          cy.contains('button', 'Stop').click();
          cy.contains('Scheduler stopped');
          return cy.wrap(`${match![1]}=${match![2]}`);
        });
    };

    firstActivation().then(first => {
      firstActivation().should('eq', first);
    });
  });
});

export {};
