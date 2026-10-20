// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

#pragma once

#include <algorithm>
#include <cctype>
#include <cstdlib>
#include <string>

namespace
{
// How spans and log records leave the service. "immediate" hands each one to
// the exporter as soon as it ends, so a conversion shows up in Jaeger and the
// log backend right away; "batch" collects them and exports every few seconds.
enum class TelemetryExport
{
  Immediate,
  Batch
};

inline TelemetryExport telemetryExportMode()
{
  const char *configured = std::getenv("CURRENCY_TELEMETRY_EXPORT");
  std::string mode = configured == nullptr ? "immediate" : configured;
  std::transform(mode.begin(), mode.end(), mode.begin(),
                 [](unsigned char c) { return static_cast<char>(std::tolower(c)); });
  return mode == "batch" ? TelemetryExport::Batch : TelemetryExport::Immediate;
}

inline const char *telemetryExportName(TelemetryExport mode)
{
  return mode == TelemetryExport::Batch ? "batch" : "immediate";
}
} // namespace
