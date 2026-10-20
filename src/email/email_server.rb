# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

require "fileutils"
require "ostruct"
require "time"
require "tmpdir"
require "pony"
require "sinatra"
require "open_feature/sdk"
require "openfeature/flagd/provider"

require "opentelemetry/sdk"
require "opentelemetry-logs-sdk"
require "opentelemetry-metrics-sdk"
require "opentelemetry/exporter/otlp"
require "opentelemetry-exporter-otlp-logs"
require "opentelemetry-exporter-otlp-metrics"
require "opentelemetry/instrumentation/sinatra"

set :port, ENV["EMAIL_PORT"]

# Initialize OpenFeature SDK with flagd provider
flagd_client = OpenFeature::Flagd::Provider.build_client
flagd_client.configure do |config|
  config.host = ENV.fetch("FLAGD_HOST", "localhost")
  config.port = ENV.fetch("FLAGD_PORT", 8013).to_i
  config.tls = ENV.fetch("FLAGD_TLS", "false") == "true"
end

OpenFeature::SDK.configure do |config|
  config.set_provider(flagd_client)
end

OpenTelemetry::SDK.configure do |c|
  c.use "OpenTelemetry::Instrumentation::Sinatra"
end

$logger = OpenTelemetry.logger_provider.logger(name: 'email')

otlp_metric_exporter = OpenTelemetry::Exporter::OTLP::Metrics::MetricsExporter.new
OpenTelemetry.meter_provider.add_metric_reader(otlp_metric_exporter)
meter = OpenTelemetry.meter_provider.meter("email")
$confirmation_counter = meter.create_counter("demo.notification.confirmations", unit: "1", description: "Counts the number of order confirmation emails sent")
$archived_counter = meter.create_counter("demo.notification.confirmations.archived", unit: "1", description: "Counts the confirmation emails kept for support")

# Support keeps a copy of every confirmation email, so they can see exactly what a
# customer was sent. Copies go to EMAIL_ARCHIVE_DIR (a folder under the system temp
# folder by default); set EMAIL_ARCHIVE_ENABLED=false to turn this off.
EMAIL_ARCHIVE_ENABLED = ENV.fetch("EMAIL_ARCHIVE_ENABLED", "true") != "false"
EMAIL_ARCHIVE_DIR = ENV.fetch("EMAIL_ARCHIVE_DIR", File.join(Dir.tmpdir, "sent-emails"))

def archive_email(order_id, to, body)
  return unless EMAIL_ARCHIVE_ENABLED

  FileUtils.mkdir_p(EMAIL_ARCHIVE_DIR)
  safe_id = order_id.to_s.gsub(/[^A-Za-z0-9._-]/, "_")
  path = File.join(EMAIL_ARCHIVE_DIR, "#{safe_id}.eml")
  File.write(path, "To: #{to}\nSubject: Your confirmation email\nDate: #{Time.now.utc.iso8601}\n\n#{body}")
  $archived_counter.add(1)
  $logger.on_emit(
    timestamp: Time.now,
    severity_text: 'INFO',
    body: 'Order confirmation email archived',
    attributes: { 'demo.order.id' => order_id.to_s, 'demo.email.archive_path' => path },
    event_name: 'email.confirmation_archived',
  )
rescue SystemCallError => e
  # A copy for support must never stop the customer's email.
  puts "Could not archive the confirmation email for order #{order_id}: #{e.message}"
end

post "/send_order_confirmation" do
  data = JSON.parse(request.body.read, object_class: OpenStruct)

  # get the current auto-instrumented span
  current_span = OpenTelemetry::Trace.current_span
  current_span.add_attributes({
    "demo.order.id" => data.order.order_id,
  })

  $confirmation_counter.add(1)
  send_email(data)

end

error do
  OpenTelemetry::Trace.current_span.record_exception(env['sinatra.error'])
end

def send_email(data)
  # create and start a manual span
  tracer = OpenTelemetry.tracer_provider.tracer('email')
  tracer.in_span("send_email") do |span|
    # Check if memory leak flag is enabled
    client = OpenFeature::SDK.build_client
    memory_leak_multiplier = client.fetch_number_value(flag_key: "emailMemoryLeak", default_value: 0)

    # To speed up the memory leak we create a long email body
    confirmation_content = erb(:confirmation, locals: { order: data.order })
    whitespace_length = [0, confirmation_content.length * (memory_leak_multiplier-1)].max

    Pony.mail(
      to:       data.email,
      from:     "noreply@example.com",
      subject:  "Your confirmation email",
      body:     confirmation_content + " " * whitespace_length,
      via:      :test
    )

    archive_email(data.order.order_id, data.email, confirmation_content)

    # If not clearing the deliveries, the emails will accumulate in the test mailer
    # We use this to create a memory leak.
    if memory_leak_multiplier < 1
      Mail::TestMailer.deliveries.clear
    end

    span.set_attribute("demo.order.id", data.order.order_id)
    $logger.on_emit(
      timestamp: Time.now,
      severity_text: 'INFO',
      body: 'Order confirmation email sent',
      attributes: { 'demo.order.id' => data.order.order_id },
      event_name: 'email.confirmation_sent',
    )

    puts "Order confirmation email sent for order #{data.order.order_id}"
  end
  # manually created spans need to be ended
  # in Ruby, the method `in_span` ends it automatically
  # check out the OpenTelemetry Ruby docs at: 
  # https://opentelemetry.io/docs/instrumentation/ruby/manual/#creating-new-spans 
end
