// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { proxyOrigin, sessionUserId } from '../helpers/demo';
import { getElementByField } from '../../utils/Cypress';
import { CypressFields } from '../../utils/enums/CypressFields';

interface JaegerSpan {
  operationName: string;
  processID: string;
  tags: { key: string; value: unknown }[];
}
interface JaegerTrace {
  spans: JaegerSpan[];
  processes: Record<string, { serviceName: string }>;
}

const tagsOf = (span: JaegerSpan) => Object.fromEntries(span.tags.map(t => [t.key, t.value]));

const browserSpans = (traces: JaegerTrace[]) =>
  traces.flatMap(t => t.spans.filter(s => t.processes[s.processID].serviceName === 'frontend-web'));

const frontendWebTraces = (tags?: Record<string, string>) =>
  cy
    .request({
      url: `${proxyOrigin()}/jaeger/ui/api/traces`,
      qs: { service: 'frontend-web', lookback: '10m', limit: 50, ...(tags ? { tags: JSON.stringify(tags) } : {}) },
    })
    .its('body.data');

/* Poll Jaeger until the session's browser spans include one matching the predicate. */
const waitForSessionSpans = (
  sessionId: string,
  predicate: (spans: JaegerSpan[]) => boolean,
  attempts = 18
): Cypress.Chainable<JaegerSpan[]> =>
  frontendWebTraces({ 'session.id': sessionId }).then((traces: JaegerTrace[]) => {
    const found = browserSpans(traces || []);
    if (predicate(found) || attempts <= 1) return cy.wrap(found);
    return cy.wait(5000).then(() => waitForSessionSpans(sessionId, predicate, attempts - 1));
  });

const isProductsFetch = (span: JaegerSpan) => {
  const tags = tagsOf(span);
  return (
    tags['otel.scope.name'] === '@opentelemetry/instrumentation-fetch' &&
    /\/api\/products(\?|$)/.test(String(tags['url.full']))
  );
};

describe('Browser spans', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/products*').as('getProducts');
    cy.visit('/');
    cy.wait('@getProducts');
    getElementByField(CypressFields.ProductCard).first().click();
    getElementByField(CypressFields.ProductDetail).should('be.visible');
  });

  it('tags every frontend-web span with enduser.id equal to its session.id', () => {
    sessionUserId().then(sessionId => {
      waitForSessionSpans(sessionId, spans => spans.length > 0).then(spans => {
        expect(spans.length, 'browser spans of this session').to.be.greaterThan(0);
        spans.forEach(span => {
          const tags = tagsOf(span);
          expect(tags['session.id'], `session.id of ${span.operationName}`).to.eq(sessionId);
          expect(tags['enduser.id'], `enduser.id of ${span.operationName}`).to.eq(tags['session.id']);
        });
      });
      frontendWebTraces().then((traces: JaegerTrace[]) => {
        const spans = browserSpans(traces || []);
        expect(spans.length).to.be.greaterThan(0);
        spans.forEach(span => {
          const tags = tagsOf(span);
          expect(tags['session.id'], `session.id of ${span.operationName}`).to.be.a('string').and.have.length.above(0);
          expect(tags['enduser.id'], `enduser.id of ${span.operationName}`).to.eq(tags['session.id']);
        });
      });
    });
  });

  it('marks a real browser fetch span with demo.synthetic_request false and no app.synthetic_request', () => {
    sessionUserId().then(sessionId => {
      waitForSessionSpans(sessionId, spans => spans.some(isProductsFetch)).then(spans => {
        const fetches = spans.filter(isProductsFetch);
        expect(fetches.length, 'GET /api/products fetch spans of this session').to.be.greaterThan(0);
        fetches.forEach(span => {
          const tags = tagsOf(span);
          expect(tags['demo.synthetic_request']).to.eq('false');
          expect(tags).not.to.have.property('app.synthetic_request');
        });
      });
    });
  });
});

export {};
