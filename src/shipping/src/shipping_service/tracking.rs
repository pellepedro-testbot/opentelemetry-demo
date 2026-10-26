// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

use uuid::Uuid;

/// returns a tracking ID: `TRK-` and 10 digits
pub fn create_tracking_id() -> String {
    format!("TRK-{:010}", Uuid::new_v4().as_u128() % 10_000_000_000)
}
