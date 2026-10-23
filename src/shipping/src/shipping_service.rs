// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

use actix_web::{post, web, HttpResponse, Responder};
use open_feature::provider::FeatureProvider;
use open_feature::EvaluationContext;
use tracing::{info, warn};

mod quote;
use quote::create_quote_from_count;

mod tracking;
use tracking::create_tracking_id;

mod shipping_types;
pub use shipping_types::*;

const NANOS_MULTIPLE: u32 = 10000000u32;

#[post("/get-quote")]
pub async fn get_quote(req: web::Json<GetQuoteRequest>) -> impl Responder {
    if req.items.is_empty() {
        return HttpResponse::BadRequest().body("items must not be empty");
    }

    if req.items.iter().any(|item| item.quantity == 0) {
        return HttpResponse::BadRequest().body("item quantity must be greater than 0");
    }

    let itemct: u32 = req
        .items
        .iter()
        .fold(0u32, |acc, item| acc.saturating_add(item.quantity));

    let mut quote = match create_quote_from_count(itemct).await {
        Ok(q) => q,
        Err(e) => {
            return HttpResponse::InternalServerError().body(format!("Failed to get quote: {}", e));
        }
    };

    if (10..=50).contains(&itemct) {
        quote.dollars = 0;
        quote.cents = 0;
    }

    let reply = GetQuoteResponse {
        cost_usd: Some(Money {
            currency_code: "USD".into(),
            units: quote.dollars,
            nanos: quote.cents * NANOS_MULTIPLE,
        }),
        carrier: match &req.address {
            Some(addr) if addr.country == "United States" => "USPS",
            _ => "DHL",
        }
        .into(),
        zone: match &req.address {
            Some(addr) if addr.country == "United States" => "domestic",
            _ => "international",
        }
        .into(),
        estimated_delivery_days: match &req.address {
            Some(addr) if addr.country == "United States" => 3,
            _ => 10,
        },
        package_size: match itemct {
            0..=3 => "small",
            4..=9 => "medium",
            _ => "large",
        }
        .into(),
    };

    info!(
        name: "shipping.quote.sent",
        dollars = quote.dollars,
        cents = quote.cents,
        "Sending Quote"
    );

    HttpResponse::Ok().json(reply)
}

#[post("/ship-order")]
pub async fn ship_order(
    req: web::Json<ShipOrderRequest>,
    flag_provider: web::Data<dyn FeatureProvider>,
) -> impl Responder {
    if req.address.is_none() {
        return HttpResponse::BadRequest().body("address is required");
    }

    if req
        .address
        .as_ref()
        .is_some_and(|addr| addr.zip_code.trim().is_empty())
    {
        return HttpResponse::BadRequest().body("address.zip_code is required");
    }

    if req.items.is_empty() {
        return HttpResponse::BadRequest().body("items must not be empty");
    }

    let is_outside_us = req
        .address
        .as_ref()
        .map(|addr| {
            !matches!(
                addr.country.to_uppercase().trim(),
                "US" | "USA" | "UNITED STATES" | "UNITED STATES OF AMERICA"
            )
        })
        .unwrap_or(false);

    let slowdown_secs = if is_outside_us {
        flag_provider
            .resolve_int_value("intlShippingSlowdown", &EvaluationContext::default())
            .await
            .map(|res| {
                info!(
                    name: "shipping.feature_flag.evaluated",
                    feature_flag_key = "intlShippingSlowdown",
                    feature_flag_provider_name = "flagd",
                    feature_flag_variant = res.variant.as_deref().unwrap_or("unknown"),
                );
                res.value
            })
            .unwrap_or_else(|e| {
                warn!(name: "shipping.feature_flag.evaluation_failed", error = ?e);
                0
            })
    } else {
        0
    };

    if slowdown_secs > 0 {
        info!(
            name: "shipping.international.slowdown",
            delay_secs = slowdown_secs,
            "Delaying international shipment due to intlShippingSlowdown feature flag"
        );
        actix_web::rt::time::sleep(std::time::Duration::from_secs(slowdown_secs as u64)).await;
    }

    let tid = create_tracking_id();
    info!(
        name: "shipping.tracking_id.created",
        tracking_id = tid.as_str(),
        "Tracking ID Created"
    );
    HttpResponse::Ok().json(ShipOrderResponse { tracking_id: tid })
}

#[cfg(test)]
mod tests {
    use actix_web::{http::header::ContentType, test, App};
    use open_feature::provider::{MockFeatureProvider, ResolutionDetails};
    use std::sync::Arc;

    use super::*;

    fn mock_provider(value: i64) -> web::Data<dyn FeatureProvider> {
        let mut mock = MockFeatureProvider::new();
        mock.expect_resolve_int_value()
            .returning(move |_, _| Ok(ResolutionDetails::new(value)));
        web::Data::from(Arc::new(mock) as Arc<dyn FeatureProvider>)
    }

    async fn call_ship_order(
        address: Option<Address>,
        provider: web::Data<dyn FeatureProvider>,
    ) -> ShipOrderResponse {
        let app = test::init_service(App::new().app_data(provider).service(ship_order)).await;
        let req = test::TestRequest::post()
            .uri("/ship-order")
            .insert_header(ContentType::json())
            .set_json(&ShipOrderRequest {
                address,
                items: vec![CartItem {
                    product_id: "OLJCESPC7Z".into(),
                    quantity: 1,
                }],
            })
            .to_request();
        let resp = test::call_service(&app, req).await;
        assert!(resp.status().is_success());
        test::read_body_json(resp).await
    }

    fn make_address(country: &str) -> Address {
        Address {
            street_address: "123 Main St".into(),
            city: "Anytown".into(),
            state: "CA".into(),
            country: country.into(),
            zip_code: "00000".into(),
        }
    }

    #[actix_web::test]
    async fn test_ship_order_no_address() {
        let app =
            test::init_service(App::new().app_data(mock_provider(0)).service(ship_order)).await;
        let req = test::TestRequest::post()
            .uri("/ship-order")
            .insert_header(ContentType::json())
            .set_json(&ShipOrderRequest {
                address: None,
                items: vec![],
            })
            .to_request();
        let resp = test::call_service(&app, req).await;
        assert_eq!(resp.status(), actix_web::http::StatusCode::BAD_REQUEST);
    }

    #[derive(serde::Deserialize)]
    struct QuoteMoney {
        units: u64,
        nanos: u32,
    }

    #[derive(serde::Deserialize)]
    struct QuoteReply {
        cost_usd: Option<QuoteMoney>,
        carrier: String,
        zone: String,
        estimated_delivery_days: u32,
        package_size: String,
    }

    // Stands in for the quote service: answers every request with a fixed price.
    fn start_quote_stub() {
        static STUB: std::sync::OnceLock<()> = std::sync::OnceLock::new();
        STUB.get_or_init(|| {
            use std::io::{Read, Write};
            let listener = std::net::TcpListener::bind("127.0.0.1:0").unwrap();
            std::env::set_var(
                "QUOTE_ADDR",
                format!("http://{}", listener.local_addr().unwrap()),
            );
            std::thread::spawn(move || {
                for mut stream in listener.incoming().flatten() {
                    let mut request = Vec::new();
                    let mut buf = [0u8; 1024];
                    loop {
                        let n = stream.read(&mut buf).unwrap_or(0);
                        if n == 0 {
                            break;
                        }
                        request.extend_from_slice(&buf[..n]);
                        let text = String::from_utf8_lossy(&request).to_lowercase();
                        if let Some(end) = text.find("\r\n\r\n") {
                            let length = text
                                .lines()
                                .find_map(|l| l.strip_prefix("content-length:"))
                                .and_then(|v| v.trim().parse::<usize>().ok())
                                .unwrap_or(0);
                            if request.len() >= end + 4 + length {
                                break;
                            }
                        }
                    }
                    let body = "8.99";
                    let _ = write!(
                        stream,
                        "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{}",
                        body.len(),
                        body
                    );
                }
            });
        });
    }

    async fn post_get_quote(body: &str) -> actix_web::dev::ServiceResponse {
        start_quote_stub();
        let app = test::init_service(App::new().service(get_quote)).await;
        let req = test::TestRequest::post()
            .uri("/get-quote")
            .insert_header(ContentType::json())
            .set_payload(body.to_owned())
            .to_request();
        test::call_service(&app, req).await
    }

    async fn get_quote_for(items: &[u32], country: Option<&str>) -> QuoteReply {
        let items: Vec<String> = items
            .iter()
            .map(|q| format!(r#"{{"product_id":"OLJCESPC7Z","quantity":{q}}}"#))
            .collect();
        let address = match country {
            Some(c) => format!(
                r#"{{"street_address":"1600 Amphitheatre Parkway","city":"Mountain View","state":"CA","country":"{c}","zip_code":"94043"}}"#
            ),
            None => "null".into(),
        };
        let resp = post_get_quote(&format!(
            r#"{{"items":[{}],"address":{address}}}"#,
            items.join(",")
        ))
        .await;
        assert!(resp.status().is_success(), "status {}", resp.status());
        test::read_body_json(resp).await
    }

    fn is_free(reply: &QuoteReply) -> bool {
        let cost = reply.cost_usd.as_ref().expect("cost_usd");
        cost.units == 0 && cost.nanos == 0
    }

    #[actix_web::test]
    async fn test_get_quote_carrier_usps_for_united_states() {
        let reply = get_quote_for(&[1], Some("United States")).await;
        assert_eq!(reply.carrier, "USPS");
    }

    #[actix_web::test]
    async fn test_get_quote_carrier_dhl_otherwise() {
        assert_eq!(get_quote_for(&[1], Some("Canada")).await.carrier, "DHL");
        assert_eq!(
            get_quote_for(&[1], Some("united states")).await.carrier,
            "DHL"
        );
        assert_eq!(get_quote_for(&[1], None).await.carrier, "DHL");
    }

    #[actix_web::test]
    async fn test_get_quote_empty_items_bad_request() {
        let resp = post_get_quote(r#"{"items":[],"address":null}"#).await;
        assert_eq!(resp.status(), actix_web::http::StatusCode::BAD_REQUEST);
    }

    #[actix_web::test]
    async fn test_get_quote_free_for_10_to_50_units() {
        assert!(is_free(&get_quote_for(&[10], Some("United States")).await));
        assert!(is_free(&get_quote_for(&[50], Some("United States")).await));
        assert!(is_free(
            &get_quote_for(&[5, 5], Some("United States")).await
        ));
    }

    #[actix_web::test]
    async fn test_get_quote_charged_for_9_and_51_units() {
        assert!(!is_free(&get_quote_for(&[9], Some("United States")).await));
        assert!(!is_free(&get_quote_for(&[51], Some("United States")).await));
    }

    #[actix_web::test]
    async fn test_get_quote_zero_quantity_item_bad_request() {
        let resp = post_get_quote(
            r#"{"items":[{"product_id":"OLJCESPC7Z","quantity":1},{"product_id":"66VCHSJNUP","quantity":0}],"address":null}"#,
        )
        .await;
        assert_eq!(resp.status(), actix_web::http::StatusCode::BAD_REQUEST);
    }

    #[actix_web::test]
    async fn test_get_quote_zone() {
        assert_eq!(
            get_quote_for(&[1], Some("United States")).await.zone,
            "domestic"
        );
        assert_eq!(
            get_quote_for(&[1], Some("Canada")).await.zone,
            "international"
        );
    }

    #[actix_web::test]
    async fn test_get_quote_estimated_delivery_days() {
        assert_eq!(
            get_quote_for(&[1], Some("United States"))
                .await
                .estimated_delivery_days,
            3
        );
        assert_eq!(
            get_quote_for(&[1], Some("Canada"))
                .await
                .estimated_delivery_days,
            10
        );
    }

    #[actix_web::test]
    async fn test_get_quote_package_size() {
        for (units, size) in [
            (1, "small"),
            (3, "small"),
            (4, "medium"),
            (9, "medium"),
            (10, "large"),
            (50, "large"),
        ] {
            assert_eq!(
                get_quote_for(&[units], Some("United States"))
                    .await
                    .package_size,
                size,
                "{units} units"
            );
        }
    }

    async fn post_ship_order(body: &str) -> actix_web::dev::ServiceResponse {
        let app =
            test::init_service(App::new().app_data(mock_provider(0)).service(ship_order)).await;
        let req = test::TestRequest::post()
            .uri("/ship-order")
            .insert_header(ContentType::json())
            .set_payload(body.to_owned())
            .to_request();
        test::call_service(&app, req).await
    }

    #[actix_web::test]
    async fn test_ship_order_empty_items_bad_request() {
        let resp = post_ship_order(
            r#"{"address":{"street_address":"1600 Amphitheatre Parkway","city":"Mountain View","state":"CA","country":"United States","zip_code":"94043"},"items":[]}"#,
        )
        .await;
        assert_eq!(resp.status(), actix_web::http::StatusCode::BAD_REQUEST);
    }

    #[actix_web::test]
    async fn test_ship_order_blank_zip_code_bad_request() {
        for zip in ["", "   "] {
            let resp = post_ship_order(&format!(
                r#"{{"address":{{"street_address":"1600 Amphitheatre Parkway","city":"Mountain View","state":"CA","country":"United States","zip_code":"{zip}"}},"items":[{{"product_id":"OLJCESPC7Z","quantity":1}}]}}"#
            ))
            .await;
            assert_eq!(
                resp.status(),
                actix_web::http::StatusCode::BAD_REQUEST,
                "zip {zip:?}"
            );
        }
    }

    #[actix_web::test]
    async fn test_ship_order_us_address() {
        let order = call_ship_order(Some(make_address("US")), mock_provider(0)).await;
        assert!(!order.tracking_id.is_empty());
    }

    #[actix_web::test]
    async fn test_ship_order_international_flag_off() {
        let order = call_ship_order(Some(make_address("FR")), mock_provider(0)).await;
        assert!(!order.tracking_id.is_empty());
    }

    #[actix_web::test]
    async fn test_ship_order_international_flag_on() {
        let start = std::time::Instant::now();
        let order = call_ship_order(Some(make_address("FR")), mock_provider(1)).await;
        assert!(start.elapsed() >= std::time::Duration::from_secs(1));
        assert!(!order.tracking_id.is_empty());
    }

    #[actix_web::test]
    async fn test_ship_order_us_flag_on() {
        let start = std::time::Instant::now();
        let order = call_ship_order(Some(make_address("US")), mock_provider(10)).await;
        assert!(start.elapsed() < std::time::Duration::from_secs(1));
        assert!(!order.tracking_id.is_empty());
    }
}
