// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

//! Feature flags for shipping that do not depend on flagd being up when shipping starts.
//!
//! Shipping used to stop if flagd could not be reached at startup, and the
//! container then restarted until flagd was ready. Here shipping starts either
//! way: until flagd is connected every flag evaluates to its default, and a
//! background task keeps connecting and switches to flagd once it answers.

use std::sync::{Arc, RwLock};
use std::time::Duration;

use open_feature::provider::{FeatureProvider, ProviderMetadata, ResolutionDetails};
use open_feature::{
    async_trait, EvaluationContext, EvaluationError, EvaluationErrorCode, EvaluationResult,
    StructValue,
};
use open_feature_flagd::{FlagdOptions, FlagdProvider};
use tracing::{info, warn};

/// Connection attempts made before the server starts; later attempts run in the background.
/// One is enough: the flagd provider itself retries five times (about 15 s) before it gives up.
const STARTUP_ATTEMPTS: u32 = 1;
const FIRST_RETRY_DELAY: Duration = Duration::from_secs(1);
const MAX_RETRY_DELAY: Duration = Duration::from_secs(30);

/// A feature provider that answers with flagd once flagd is connected, and
/// reports "not ready" before that, so every flag falls back to its default.
pub struct FlagdWhenReady {
    flagd: RwLock<Option<Arc<FlagdProvider>>>,
    metadata: ProviderMetadata,
}

impl FlagdWhenReady {
    pub fn new() -> Self {
        Self {
            flagd: RwLock::new(None),
            metadata: ProviderMetadata::new("flagd"),
        }
    }

    pub fn is_connected(&self) -> bool {
        self.flagd.read().map(|f| f.is_some()).unwrap_or(false)
    }

    fn connected(&self) -> Option<Arc<FlagdProvider>> {
        self.flagd.read().ok().and_then(|f| f.clone())
    }

    fn set(&self, provider: FlagdProvider) {
        if let Ok(mut flagd) = self.flagd.write() {
            *flagd = Some(Arc::new(provider));
        }
    }

    fn not_ready<T>() -> EvaluationResult<T> {
        Err(EvaluationError::builder()
            .code(EvaluationErrorCode::ProviderNotReady)
            .message("flagd is not connected yet")
            .build())
    }
}

impl Default for FlagdWhenReady {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl FeatureProvider for FlagdWhenReady {
    fn metadata(&self) -> &ProviderMetadata {
        &self.metadata
    }

    async fn resolve_bool_value(
        &self,
        flag_key: &str,
        evaluation_context: &EvaluationContext,
    ) -> EvaluationResult<ResolutionDetails<bool>> {
        match self.connected() {
            Some(flagd) => flagd.resolve_bool_value(flag_key, evaluation_context).await,
            None => Self::not_ready(),
        }
    }

    async fn resolve_int_value(
        &self,
        flag_key: &str,
        evaluation_context: &EvaluationContext,
    ) -> EvaluationResult<ResolutionDetails<i64>> {
        match self.connected() {
            Some(flagd) => flagd.resolve_int_value(flag_key, evaluation_context).await,
            None => Self::not_ready(),
        }
    }

    async fn resolve_float_value(
        &self,
        flag_key: &str,
        evaluation_context: &EvaluationContext,
    ) -> EvaluationResult<ResolutionDetails<f64>> {
        match self.connected() {
            Some(flagd) => flagd.resolve_float_value(flag_key, evaluation_context).await,
            None => Self::not_ready(),
        }
    }

    async fn resolve_string_value(
        &self,
        flag_key: &str,
        evaluation_context: &EvaluationContext,
    ) -> EvaluationResult<ResolutionDetails<String>> {
        match self.connected() {
            Some(flagd) => flagd.resolve_string_value(flag_key, evaluation_context).await,
            None => Self::not_ready(),
        }
    }

    async fn resolve_struct_value(
        &self,
        flag_key: &str,
        evaluation_context: &EvaluationContext,
    ) -> EvaluationResult<ResolutionDetails<StructValue>> {
        match self.connected() {
            Some(flagd) => flagd.resolve_struct_value(flag_key, evaluation_context).await,
            None => Self::not_ready(),
        }
    }
}

async fn try_connect() -> Result<FlagdProvider, String> {
    FlagdProvider::new(FlagdOptions {
        cache_settings: None,
        ..Default::default()
    })
    .await
    .map_err(|err| format!("{err:?}"))
}

fn next_delay(delay: Duration) -> Duration {
    (delay * 2).min(MAX_RETRY_DELAY)
}

/// Connects to flagd once before returning. If flagd is still
/// not reachable, shipping starts with default flag values and a background
/// task keeps trying until flagd answers.
pub async fn connect(flags: Arc<FlagdWhenReady>) {
    let mut delay = FIRST_RETRY_DELAY;
    for attempt in 1..=STARTUP_ATTEMPTS {
        match try_connect().await {
            Ok(provider) => {
                flags.set(provider);
                info!(name: "shipping.flagd.connected", attempt, "Connected to flagd");
                return;
            }
            Err(error) => {
                warn!(
                    name: "shipping.flagd.connect_failed",
                    attempt,
                    error = error.as_str(),
                    retry_in_secs = delay.as_secs(),
                    "Could not connect to flagd"
                );
                actix_web::rt::time::sleep(delay).await;
                delay = next_delay(delay);
            }
        }
    }

    warn!(
        name: "shipping.flagd.starting_without_flags",
        "Starting without flagd; feature flags use their defaults until flagd is reachable"
    );
    actix_web::rt::spawn(async move {
        let mut attempt = STARTUP_ATTEMPTS;
        loop {
            attempt += 1;
            match try_connect().await {
                Ok(provider) => {
                    flags.set(provider);
                    info!(name: "shipping.flagd.connected", attempt, "Connected to flagd");
                    return;
                }
                Err(error) => {
                    warn!(
                        name: "shipping.flagd.connect_failed",
                        attempt,
                        error = error.as_str(),
                        retry_in_secs = delay.as_secs(),
                        "Could not connect to flagd"
                    );
                    actix_web::rt::time::sleep(delay).await;
                    delay = next_delay(delay);
                }
            }
        }
    });
}

#[cfg(test)]
mod tests {
    use super::*;

    #[actix_web::test]
    async fn flags_use_defaults_until_flagd_is_connected() {
        let flags = FlagdWhenReady::new();
        assert!(!flags.is_connected());
        let err = flags
            .resolve_int_value("intlShippingSlowdown", &EvaluationContext::default())
            .await
            .unwrap_err();
        assert_eq!(err.code, EvaluationErrorCode::ProviderNotReady);
    }

    #[test]
    fn retry_delay_doubles_up_to_the_cap() {
        assert_eq!(next_delay(Duration::from_secs(1)), Duration::from_secs(2));
        assert_eq!(next_delay(Duration::from_secs(20)), MAX_RETRY_DELAY);
    }
}
