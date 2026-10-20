/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */

package oteldemo;

import io.grpc.*;
import io.grpc.health.v1.HealthCheckResponse.ServingStatus;
import io.grpc.protobuf.services.*;
import io.grpc.stub.StreamObserver;
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.baggage.Baggage;
import io.opentelemetry.api.common.AttributeKey;
import io.opentelemetry.api.common.Attributes;
import io.opentelemetry.api.metrics.LongCounter;
import io.opentelemetry.api.metrics.Meter;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.StatusCode;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.Scope;
import io.opentelemetry.instrumentation.annotations.SpanAttribute;
import io.opentelemetry.instrumentation.annotations.WithSpan;
import io.prometheus.metrics.core.metrics.Counter;
import io.prometheus.metrics.exporter.httpserver.HTTPServer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import oteldemo.Demo.Ad;
import oteldemo.Demo.AdRequest;
import oteldemo.Demo.AdResponse;
import oteldemo.problempattern.GarbageCollectionTrigger;
import oteldemo.problempattern.CPULoad;
import dev.openfeature.contrib.providers.flagd.FlagdOptions;
import dev.openfeature.contrib.providers.flagd.FlagdProvider;
import dev.openfeature.sdk.Client;
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;
import dev.openfeature.sdk.OpenFeatureAPI;
import java.util.UUID;


public final class AdService {

  private static final Logger logger = LogManager.getLogger(AdService.class);

  @SuppressWarnings("FieldCanBeLocal")
  private static final int MAX_ADS_TO_SERVE = 2;

  // A page with several categories shows at most this many ads from each one, so a category
  // with many ads cannot crowd out the others.
  private static final int MAX_ADS_PER_CATEGORY = 2;

  private Server server;
  private HealthStatusManager healthMgr;
  private HTTPServer prometheusServer;

  // DEMO: this counter and its `/metrics` HTTP exporter use the Prometheus
  // Java client library rather than the OpenTelemetry SDK. It is here to
  // illustrate how non-OTel custom metrics (e.g. existing Prometheus
  // instrumentation that an organization already owns) can be ingested into
  // an OpenTelemetry pipeline via the Collector's `prometheus` receiver --
  // a common bridging pattern during OTel adoption.
  //
  // Recommendation: this is a *transitional* pattern. New custom metrics
  // should be created directly with the OpenTelemetry SDK (see the
  // `adRequestsCounter` below), and existing Prometheus-client metrics
  // should be migrated over time. See `src/ad/README.md` for details.
  private static final Counter adsServedCounter =
      Counter.builder()
          .name("demo_ad_served_total")
          .help("Total number of ads served, labeled by category")
          .labelNames("category")
          .register();

  private static final AdService service = new AdService();
  private static final Tracer tracer = GlobalOpenTelemetry.getTracer("ad");
  private static final Meter meter = GlobalOpenTelemetry.getMeter("ad");

  private static final LongCounter adRequestsCounter =
      meter
          .counterBuilder("demo.ad.requests")
          .setDescription("Counts ad requests by request and response type")
          .build();

  // The ads each shopper has seen, so a page shows the same ads throughout a visit.
  private static final SessionAds sessionAds = new SessionAds();

  static {
    meter
        .gaugeBuilder("demo.ad.session_ads.entries")
        .setDescription("Shopper and page pairs whose ads are remembered")
        .ofLongs()
        .buildWithCallback(m -> m.record(sessionAds.size()));
    meter
        .counterBuilder("demo.ad.session_ads.lookups")
        .setDescription("Remembered-ads lookups, by result")
        .buildWithCallback(
            m -> {
              m.record(sessionAds.hits(), Attributes.of(AttributeKey.stringKey("result"), "hit"));
              m.record(sessionAds.misses(), Attributes.of(AttributeKey.stringKey("result"), "miss"));
            });
  }

  private static final AttributeKey<String> adRequestTypeKey =
      AttributeKey.stringKey("demo.ad.request_type");
  private static final AttributeKey<String> adResponseTypeKey =
      AttributeKey.stringKey("demo.ad.response_type");

  private void start() throws IOException {
    int port =
        Integer.parseInt(
            Optional.ofNullable(System.getenv("AD_PORT"))
                .orElseThrow(
                    () ->
                        new IllegalStateException(
                            "environment vars: AD_PORT must not be null")));
    int prometheusPort =
        Integer.parseInt(Optional.ofNullable(System.getenv("AD_PROMETHEUS_PORT")).orElse("9465"));
    prometheusServer = HTTPServer.builder().port(prometheusPort).buildAndStart();
    logger.info(
        "Prometheus metrics endpoint started, listening on " + prometheusServer.getPort() + "/metrics");
    healthMgr = new HealthStatusManager();

    // Create a flagd instance with OpenTelemetry
    FlagdOptions options =
        FlagdOptions.builder()
            .withGlobalTelemetry(true)
            .build();

    FlagdProvider flagdProvider = new FlagdProvider(options);
    // Set flagd as the OpenFeature Provider
    OpenFeatureAPI.getInstance().setProvider(flagdProvider);
  
    server =
        ServerBuilder.forPort(port)
            .addService(new AdServiceImpl())
            .addService(healthMgr.getHealthService())
            .build()
            .start();
    logger.info("Ad service started, listening on " + port);
    Runtime.getRuntime()
        .addShutdownHook(
            new Thread(
                () -> {
                  // Use stderr here since the logger may have been reset by its JVM shutdown hook.
                  System.err.println(
                      "*** shutting down gRPC ads server since JVM is shutting down");
                  AdService.this.stop();
                  System.err.println("*** server shut down");
                }));
    healthMgr.setStatus("", ServingStatus.SERVING);
  }

  private void stop() {
    if (server != null) {
      healthMgr.clearStatus("");
      server.shutdown();
    }
    if (prometheusServer != null) {
      prometheusServer.stop();
    }
  }

  private enum AdRequestType {
    TARGETED,
    NOT_TARGETED
  }

  private enum AdResponseType {
    TARGETED,
    RANDOM
  }

  private static class AdServiceImpl extends oteldemo.AdServiceGrpc.AdServiceImplBase {
    
    private static final String AD_FAILURE = "adFailure";
    private static final String AD_MANUAL_GC_FEATURE_FLAG = "adManualGc";
    private static final String AD_HIGH_CPU_FEATURE_FLAG = "adHighCpu";
    private static final Client ffClient = OpenFeatureAPI.getInstance().getClient();
    
    private AdServiceImpl() {}

    /**
     * Retrieves ads based on context provided in the request {@code AdRequest}.
     *
     * @param req the request containing context.
     * @param responseObserver the stream observer which gets notified with the value of {@code
     *     AdResponse}
     */
    @Override
    public void getAds(AdRequest req, StreamObserver<AdResponse> responseObserver) {
      AdService service = AdService.getInstance();

      // get the current span in context
      Span span = Span.current();
      try {
        List<Ad> allAds = new ArrayList<>();
        AdRequestType adRequestType;
        AdResponseType adResponseType;

        Baggage baggage = Baggage.fromContextOrNull(Context.current());
        MutableContext evaluationContext = new MutableContext();
        String sessionId = null;
        if (baggage != null) {
          sessionId = baggage.getEntryValue("session.id");
          span.setAttribute("session.id", sessionId);
          evaluationContext.setTargetingKey(sessionId);
          evaluationContext.add("session", sessionId);
          final String enduserId = baggage.getEntryValue("enduser.id");
          if (enduserId != null) {
            span.setAttribute("enduser.id", enduserId);
          }
        } else {
          logger.info("no baggage found in context");
        }

        CPULoad cpuload = CPULoad.getInstance();
        cpuload.execute(ffClient.getBooleanValue(AD_HIGH_CPU_FEATURE_FLAG, false, evaluationContext));

        span.setAttribute("demo.ad.context_keys", req.getContextKeysList().toString());
        span.setAttribute("demo.ad.context_keys.count", req.getContextKeysCount());
        List<String> categories = distinctCategories(req.getContextKeysList());
        adRequestType =
            req.getContextKeysCount() > 0 ? AdRequestType.TARGETED : AdRequestType.NOT_TARGETED;

        // A shopper who saw ads for this page earlier in the visit gets the same ads again.
        String sessionKey =
            sessionId == null || sessionId.isBlank() ? null : SessionAds.key(sessionId, categories);
        Optional<List<Ad>> remembered =
            sessionKey == null ? Optional.empty() : sessionAds.recall(sessionKey);
        span.setAttribute("demo.ad.session_ads.hit", remembered.isPresent());

        if (remembered.isPresent()) {
          allAds = new ArrayList<>(remembered.get());
          adResponseType =
              adRequestType == AdRequestType.TARGETED ? AdResponseType.TARGETED : AdResponseType.RANDOM;
        } else if (adRequestType == AdRequestType.TARGETED) {
          logger.info("Targeted ad request received for " + req.getContextKeysList());
          span.setAttribute("demo.ad.categories.count", categories.size());
          allAds.addAll(collectTargetedAds(service, categories));
          adResponseType = AdResponseType.TARGETED;
        } else {
          logger.info("Non-targeted ad request received, preparing random response.");
          allAds = service.getRandomAds();
          adResponseType = AdResponseType.RANDOM;
        }
        if (allAds.isEmpty()) {
          // Serve random ads.
          allAds = service.getRandomAds();
          adResponseType = AdResponseType.RANDOM;
        }
        if (sessionKey != null && remembered.isEmpty()) {
          sessionAds.remember(sessionKey, allAds);
        }
        span.setAttribute("demo.ad.count", allAds.size());
        span.setAttribute("demo.ad.request_type", adRequestType.name());
        span.setAttribute("demo.ad.response_type", adResponseType.name());

        adRequestsCounter.add(
            1,
            Attributes.of(
                adRequestTypeKey, adRequestType.name(), adResponseTypeKey, adResponseType.name()));

        // Throw 1/10 of the time to simulate a failure when the feature flag is enabled
        if (ffClient.getBooleanValue(AD_FAILURE, false, evaluationContext) && random.nextInt(10) == 0) {
          throw new StatusRuntimeException(Status.UNAVAILABLE);
        }

        if (ffClient.getBooleanValue(AD_MANUAL_GC_FEATURE_FLAG, false, evaluationContext)) {
          logger.warn("Feature Flag " + AD_MANUAL_GC_FEATURE_FLAG + " enabled, performing a manual gc now");
          GarbageCollectionTrigger gct = new GarbageCollectionTrigger();
          gct.doExecute();
        }

        AdResponse reply = AdResponse.newBuilder().addAllAds(allAds).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
      } catch (StatusRuntimeException e) {
        span.addEvent(
            "Error", Attributes.of(AttributeKey.stringKey("exception.message"), e.getMessage()));
        span.setStatus(StatusCode.ERROR);
        logger.log(Level.WARN, "GetAds Failed with status {}", e.getStatus());
        responseObserver.onError(e);
      }
    }

    /**
     * Returns the categories a page asked for, normalized, without blanks and without repeats,
     * in the order the page listed them.
     */
    private static List<String> distinctCategories(List<String> contextKeys) {
      Set<String> categories = new LinkedHashSet<>();
      for (String key : contextKeys) {
        String category = AdCatalog.normalizeCategory(key);
        if (!category.isEmpty()) {
          categories.add(category);
        }
      }
      return new ArrayList<>(categories);
    }

    /**
     * Collects ads for every category on the page: at most {@link #MAX_ADS_PER_CATEGORY} from
     * each, each ad once even when categories share it, in the order the categories were given.
     */
    private static List<Ad> collectTargetedAds(AdService service, List<String> categories) {
      Set<Ad> unique = new LinkedHashSet<>();
      for (String category : categories) {
        Collection<Ad> ads = service.getAdsByCategory(category);
        List<Ad> capped = ads.stream().limit(MAX_ADS_PER_CATEGORY).toList();
        if (unique.addAll(capped)) {
          break;
        }
      }
      return new ArrayList<>(unique);
    }
  }

  private final AdCatalog catalog = new AdCatalog();

  @WithSpan("getAdsByCategory")
  private Collection<Ad> getAdsByCategory(@SpanAttribute("demo.ad.category") String category) {
    Collection<Ad> ads = catalog.byCategory(category);
    Span.current().setAttribute("demo.ad.count", ads.size());
    adsServedCounter.labelValues(category).inc(ads.size());
    return ads;
  }

  private static final Random random = new Random();

  private List<Ad> getRandomAds() {

    List<Ad> ads = new ArrayList<>(MAX_ADS_TO_SERVE);

    // create and start a new span manually
    Span span = tracer.spanBuilder("getRandomAds").startSpan();

    // put the span into context, so if any child span is started the parent will be set properly
    try (Scope ignored = span.makeCurrent()) {

      List<Ad> allAds = catalog.all();
      for (int i = 0; i < MAX_ADS_TO_SERVE; i++) {
        ads.add(allAds.get(random.nextInt(allAds.size())));
      }
      span.setAttribute("demo.ad.count", ads.size());
      adsServedCounter.labelValues("random").inc(ads.size());

    } finally {
      span.end();
    }

    return ads;
  }

  private static AdService getInstance() {
    return service;
  }

  /** Await termination on the main thread since the grpc library uses daemon threads. */
  private void blockUntilShutdown() throws InterruptedException {
    if (server != null) {
      server.awaitTermination();
    }
  }

  /** Main launches the server from the command line. */
  public static void main(String[] args) throws IOException, InterruptedException {
    // Start the RPC server. You shouldn't see any output from gRPC before this.
    logger.info("Ad service starting.");
    final AdService service = AdService.getInstance();
    service.start();
    service.blockUntilShutdown();
  }
}
