// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

#include "opentelemetry/exporters/otlp/otlp_grpc_exporter_factory.h"
#include "opentelemetry/logs/provider.h"
#include "opentelemetry/sdk/logs/logger.h"
#include "opentelemetry/sdk/logs/logger_provider_factory.h"
#include "opentelemetry/sdk/logs/batch_log_record_processor_factory.h"
#include "opentelemetry/sdk/logs/simple_log_record_processor_factory.h"
#include "opentelemetry/sdk/logs/logger_context_factory.h"
#include "opentelemetry/exporters/otlp/otlp_grpc_log_record_exporter_factory.h"
#include "telemetry_export.h"

using namespace std;
namespace nostd     = opentelemetry::nostd;
namespace otlp      = opentelemetry::exporter::otlp;
namespace logs      = opentelemetry::logs;
namespace logs_sdk  = opentelemetry::sdk::logs;

namespace
{
  std::unique_ptr<logs_sdk::LogRecordProcessor> makeLogProcessor(
      std::unique_ptr<logs_sdk::LogRecordExporter> exporter, TelemetryExport mode) {
    if (mode == TelemetryExport::Batch) {
      return logs_sdk::BatchLogRecordProcessorFactory::Create(std::move(exporter), {});
    }
    return logs_sdk::SimpleLogRecordProcessorFactory::Create(std::move(exporter));
  }

  std::shared_ptr<logs_sdk::LoggerProvider> initLogger() {
    otlp::OtlpGrpcLogRecordExporterOptions loggerOptions;
    auto exporter  = otlp::OtlpGrpcLogRecordExporterFactory::Create(loggerOptions);
    auto processor = makeLogProcessor(std::move(exporter), telemetryExportMode());
    std::vector<std::unique_ptr<logs_sdk::LogRecordProcessor>> processors;
    processors.push_back(std::move(processor));
    auto context = logs_sdk::LoggerContextFactory::Create(std::move(processors));
    std::shared_ptr<logs_sdk::LoggerProvider> provider =
        logs_sdk::LoggerProviderFactory::Create(std::move(context));
    std::shared_ptr<logs::LoggerProvider> api_provider = provider;
    opentelemetry::logs::Provider::SetLoggerProvider(api_provider);
    return provider;
  }

  nostd::shared_ptr<opentelemetry::logs::Logger> getLogger(std::string name){
    auto provider = logs::Provider::GetLoggerProvider();
    return provider->GetLogger(name + "_logger", name, OPENTELEMETRY_SDK_VERSION);
  }
}
