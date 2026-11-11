// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

// Walks a user journey step by step. A failed check is recorded with its step and
// the journey goes on; finish() fails the test with every recorded failure. A
// command that fails outright (an element that never appears) fails the test at
// once, its message prefixed with the step it happened in.
export class Journey {
  private failures: string[] = [];
  private current = '';

  constructor() {
    cy.on('fail', err => {
      err.message = `[${this.current}] ${err.message}`;
      throw err;
    });
  }

  step(name: string, body: () => void) {
    cy.then(() => {
      this.current = name;
    });
    cy.log(`**${name}**`);
    body();
  }

  fail(description: string) {
    this.failures.push(`[${this.current}] ${description}`);
  }

  // Polls read() against the page until ok() holds or the timeout passes; records a
  // failure instead of failing the test when it never does.
  expectSoon<T>(
    description: string,
    read: ($body: JQuery<HTMLElement>) => T,
    ok: (value: T) => boolean,
    timeout = 10000
  ): Cypress.Chainable<T> {
    let deadline = 0;
    const poll = (): Cypress.Chainable<T> =>
      cy.document({ log: false }).then(doc => {
        const value = read(Cypress.$(doc.body));
        if (ok(value)) return cy.wrap(value, { log: false });
        if (Date.now() > deadline) {
          this.fail(`${description}: got ${JSON.stringify(value)}`);
          return cy.wrap(value, { log: false });
        }
        return cy.wait(250, { log: false }).then(poll);
      });
    return cy
      .then(() => {
        deadline = Date.now() + timeout;
      })
      .then(poll);
  }

  finish() {
    cy.then(() => {
      this.current = 'outcome';
      if (this.failures.length) {
        throw new Error(`Journey checks failed:\n${this.failures.join('\n')}`);
      }
    });
  }
}
