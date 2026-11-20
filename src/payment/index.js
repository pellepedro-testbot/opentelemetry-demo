// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const health = require('grpc-js-health-check')
const opentelemetry = require('@opentelemetry/api')
const { ATTR_ERROR_TYPE } = require('@opentelemetry/semantic-conventions')

const charge = require('./charge')
const logger = require('./logger')
const { OUTCOME_APPROVED, OUTCOME_DECLINED, amountAttributes, recordOutcome } = require('./telemetry')

async function chargeServiceHandler(call, callback) {
  const span = opentelemetry.trace.getActiveSpan();

  try {
    const amount = call.request.amount
    span?.setAttributes(amountAttributes(amount))
    span?.addEvent('charge.received')
    logger.info("Charge request received.")

    const response = await charge.charge(call.request)
    recordOutcome(span, OUTCOME_APPROVED, { 'demo.payment.transaction.id': response.transactionId })
    callback(null, response)

  } catch (err) {
    logger.warn({ err })

    recordOutcome(span, OUTCOME_DECLINED, { 'exception.message': err.message })
    span?.setStatus({ code: opentelemetry.SpanStatusCode.ERROR, message: err.message })
    span?.setAttribute(ATTR_ERROR_TYPE, err.name || 'Error')
    callback(err)
  }
}

async function closeGracefully(signal) {
  server.forceShutdown()
  process.kill(process.pid, signal)
}

const otelDemoPackage = grpc.loadPackageDefinition(protoLoader.loadSync('demo.proto'))
const server = new grpc.Server()

server.addService(health.service, new health.Implementation({
  '': health.servingStatus.SERVING
}))

server.addService(otelDemoPackage.oteldemo.PaymentService.service, { charge: chargeServiceHandler })


let ip = "0.0.0.0";

const ipv6_enabled = process.env.IPV6_ENABLED;

if (ipv6_enabled == "true") {
  ip = "[::]";
  logger.info(`Overwriting Localhost IP: ${ip}`)
}

const address = ip + `:${process.env['PAYMENT_PORT']}`;

server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    return logger.error({ err })
  }

  server.start()
  logger.info(`payment gRPC server started on ${address}`)
})

process.once('SIGINT', closeGracefully)
process.once('SIGTERM', closeGracefully)
