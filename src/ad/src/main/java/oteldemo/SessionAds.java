/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */

package oteldemo;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import oteldemo.Demo.Ad;

/**
 * Remembers the ads a shopper was shown, so the same shopper sees the same ads for the same
 * categories on every page of a visit instead of a new random pick on each page load.
 *
 * <p>Ads are remembered per session and per set of categories: a product page for telescopes and
 * the cart page show different ads, but going back to the telescope page shows the telescope ads
 * the shopper saw before.
 */
final class SessionAds {

  /** Key used for pages that ask for no category and get random ads. */
  static final String RANDOM_PAGE = "*";

  private final Map<String, List<Ad>> adsBySessionAndPage = new ConcurrentHashMap<>();
  private final AtomicLong hits = new AtomicLong();
  private final AtomicLong misses = new AtomicLong();

  /**
   * Builds the key for one shopper and one page: the session id, then the page's categories in the
   * order they were asked for. Categories are expected to be normalized already.
   */
  static String key(String sessionId, List<String> categories) {
    String page = categories.isEmpty() ? RANDOM_PAGE : String.join(",", categories);
    return sessionId.trim().toLowerCase(Locale.ROOT) + "|" + page;
  }

  /** Returns the ads this shopper was shown on this page before, if any. */
  Optional<List<Ad>> recall(String key) {
    List<Ad> ads = adsBySessionAndPage.get(key);
    if (ads == null) {
      misses.incrementAndGet();
      return Optional.empty();
    }
    hits.incrementAndGet();
    return Optional.of(ads);
  }

  /** Remembers the ads this shopper is being shown on this page. */
  void remember(String key, List<Ad> ads) {
    adsBySessionAndPage.put(key, List.copyOf(ads));
  }

  /** Number of shopper and page pairs remembered. */
  int size() {
    return adsBySessionAndPage.size();
  }

  long hits() {
    return hits.get();
  }

  long misses() {
    return misses.get();
  }
}
