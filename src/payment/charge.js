// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
const { context, propagation, trace, metrics, SpanStatusCode } = require('@opentelemetry/api');
const { ATTR_ERROR_TYPE } = require('@opentelemetry/semantic-conventions');
const crypto = require('crypto');
const cardValidator = require('simple-card-validator');
const { v4: uuidv4 } = require('uuid');

const { OpenFeature } = require('@openfeature/server-sdk');
const { FlagdProvider } = require('@openfeature/flagd-provider');
const flagProvider = new FlagdProvider();

const logger = require('./logger');
const { normalizeNumber, identifyNetwork, passesLuhn, acceptedNetworkNames } = require('./card-networks');
const tracer = trace.getTracer('payment');
const meter = metrics.getMeter('payment');
const transactionsCounter = meter.createCounter('demo.payment.transactions', {
  unit: '{transaction}',
});

const LOYALTY_LEVEL = ['platinum', 'gold', 'silver', 'bronze'];

// Secret key for the card fingerprint written to the audit log. Set it per
// environment; without one, a random key is used for this process.
const CARD_HASH_KEY = process.env.PAYMENT_CARD_HASH_SALT || crypto.randomBytes(32).toString('hex');

/** Return a stable, non-reversible fingerprint of a card number for audit logging */
function cardFingerprint(number) {
  return crypto.createHmac('sha256', CARD_HASH_KEY).update(normalizeNumber(number)).digest('hex');
}

/** Return random element from given array */
function random(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

module.exports.charge = async request => {
  const span = tracer.startSpan('charge');

  try {
    const baggage = propagation.getBaggage(context.active());
    const syntheticRequest = baggage?.getEntry('synthetic_request')?.value === 'true';

    if (syntheticRequest) {
      span.setAttribute('user_agent.synthetic.type', 'test');
    }

    await OpenFeature.setProviderAndWait(flagProvider);

    const numberVariant = await OpenFeature.getClient().getNumberValue("paymentFailure", 0);
    const emitRawPii = await OpenFeature.getClient().getBooleanValue("emitRawPii", false);

    if (numberVariant > 0) {
      // n% chance to fail with demo.user_context.loyalty_level=gold
      if (Math.random() < numberVariant) {
        span.setAttributes({'demo.user_context.loyalty_level': 'gold' });

        throw new Error('Payment request failed. Invalid token. demo.user_context.loyalty_level=gold');
      }
    }

    const {
      creditCardNumber: number,
      creditCardCvv: cvv,
      creditCardExpirationYear: year,
      creditCardExpirationMonth: month
    } = request.creditCard;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const digits = normalizeNumber(number);
    const lastFourDigits = digits.slice(-4);
    const cardHash = cardFingerprint(number);
    const transactionId = uuidv4();

    const card = cardValidator(digits);
    const { card_type: cardType } = card.getCardDetails();
    const network = identifyNetwork(digits);
    const valid = passesLuhn(digits);

    const loyalty_level = random(LOYALTY_LEVEL);

    span.setAttributes({
      'demo.payment.card_type': cardType,
      'demo.payment.card_valid': valid,
      'demo.payment.card_hash': cardHash,
      'demo.payment.card_network': network?.id ?? 'unknown',
      'demo.user_context.loyalty_level': loyalty_level,
      ...(emitRawPii && {
        'demo.payment.card_number': number,
        'demo.payment.card_cvv': cvv
      })
    });

    span.addEvent('card.identified', { 'demo.payment.card_network': network?.id ?? 'unknown' });

    if (!network) {
      throw new Error(`Sorry, we cannot process ${cardType || 'this type of'} cards. We accept ${acceptedNetworkNames()}.`);
    }

    if (!valid) {
      throw new Error(`The ${network.name} card number ending ${lastFourDigits} is not valid. Please check it and try again.`);
    }

    if ((currentYear * 12 + currentMonth) > (year * 12 + month)) {
      throw new Error(`The ${network.name} card ending ${lastFourDigits} expired on ${month}/${year}.`);
    }

    span.addEvent('card.validated', { 'demo.payment.card_network': network.id });

    // Do not charge synthetic requests.
    if (syntheticRequest) {
      span.setAttribute('demo.payment.charged', false);
    } else {
      span.setAttribute('demo.payment.charged', true);
    }

    const enduserId = baggage?.getEntry('enduser.id')?.value;
    if (enduserId) {
      span.setAttribute('enduser.id', enduserId);
    }

    const { units, nanos, currencyCode } = request.amount;
    logger.info({ transactionId, cardType, cardNetwork: network.id, lastFourDigits, cardHash, amount: { units, nanos, currencyCode }, loyalty_level }, 'Transaction complete.');
    transactionsCounter.add(1, { 'demo.payment.currency': currencyCode });

    return { transactionId };
  } catch (err) {
    span.recordException(err);
    span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
    span.setAttribute(ATTR_ERROR_TYPE, err.name || 'Error');

    throw err;
  } finally {
    span.end();
  }
};
