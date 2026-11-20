// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

// Span attributes and events for a charge, shared by the gRPC handler and the
// charge itself so dashboards see the same names everywhere.

const OUTCOME_APPROVED = 'approved';
const OUTCOME_DECLINED = 'declined';

/** A Money value as a decimal string with two places, e.g. "489.02". */
function formatAmount(amount) {
  // proto3 leaves zero fields out, so a whole amount has no nanos
  return (Number(amount.units ?? 0) + (amount.nanos ?? 0) / 1000000000).toFixed(2);
}

/** The attributes that describe what is being charged. */
function amountAttributes(amount) {
  return {
    'demo.payment.amount': formatAmount(amount),
    'demo.payment.currency': amount.currencyCode,
  };
}

/** Records the outcome of a charge on the span, with an event for it. */
function recordOutcome(span, outcome, attributes = {}) {
  span?.setAttribute('demo.payment.outcome', outcome);
  span?.addEvent(`charge.${outcome}`, attributes);
}

module.exports = {
  OUTCOME_APPROVED,
  OUTCOME_DECLINED,
  formatAmount,
  amountAttributes,
  recordOutcome,
};
