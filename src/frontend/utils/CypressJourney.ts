// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

type TReader = ($body: JQuery<HTMLElement>) => unknown;
type TPredicate = (actual: unknown) => boolean;

export interface IJourney {
  step(title: string, body: () => void): void;
  check(label: string, read: TReader, expected: unknown, matches?: TPredicate, timeout?: number): void;
  record(label: string, ok: boolean, detail: string): void;
  finish(): void;
}

const show = (value: unknown) => JSON.stringify(value);

/**
 * Walks a user journey step by step. A failed check is recorded against its step and the
 * journey carries on, so one defect does not hide the next; finish() fails the test with
 * every recorded failure.
 */
export const createJourney = (): IJourney => {
  const failures: string[] = [];
  let current = '';

  const record = (label: string, ok: boolean, detail: string) => {
    if (!ok) failures.push(`${current} - ${label}: ${detail}`);
  };

  const check = (
    label: string,
    read: TReader,
    expected: unknown,
    matches: TPredicate = actual => actual === expected,
    timeout = 10000
  ) => {
    let deadline = 0;
    const attempt = (): void => {
      if (!deadline) deadline = Date.now() + timeout;
      cy.get('body', { log: false }).then($body => {
        const actual = read($body);
        if (matches(actual)) {
          cy.log(`${label}: ${show(actual)}`);
          return;
        }
        if (Date.now() < deadline) {
          cy.wait(250, { log: false }).then(attempt);
          return;
        }
        cy.log(`FAILED ${label}: expected ${show(expected)}, got ${show(actual)}`);
        record(label, false, `expected ${show(expected)}, got ${show(actual)}`);
      });
    };
    cy.then(attempt);
  };

  return {
    step(title, body) {
      cy.then(() => {
        current = title;
        cy.log(`**${title}**`);
      });
      body();
    },
    check,
    record,
    finish() {
      cy.then(() => {
        expect(failures, 'journey checks that failed').to.deep.equal([]);
      });
    },
  };
};
