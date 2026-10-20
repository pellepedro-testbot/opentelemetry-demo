/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */

package oteldemo;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableListMultimap;
import java.util.List;
import java.util.Locale;
import oteldemo.Demo.Ad;

/**
 * The ads the shop can serve, grouped by product category. Lookups are case-insensitive and
 * ignore surrounding whitespace, so "Telescopes " and "telescopes" find the same ads.
 */
final class AdCatalog {

  private final ImmutableListMultimap<String, Ad> adsByCategory;

  AdCatalog() {
    this.adsByCategory = createAdsMap();
  }

  /** Returns the category key used for lookups, or an empty string for a blank category. */
  static String normalizeCategory(String category) {
    return category == null ? "" : category.trim().toLowerCase(Locale.ROOT);
  }

  /** Returns the ads for one category, in catalog order; empty for an unknown category. */
  List<Ad> byCategory(String category) {
    return adsByCategory.get(normalizeCategory(category));
  }

  /** Returns every ad in the catalog, in catalog order. */
  List<Ad> all() {
    return ImmutableList.copyOf(adsByCategory.values());
  }

  private static ImmutableListMultimap<String, Ad> createAdsMap() {
    Ad binoculars =
        Ad.newBuilder()
            .setRedirectUrl("/product/2ZYFJ3GM2N")
            .setText("Roof Binoculars for sale. 50% off.")
            .build();
    Ad explorerTelescope =
        Ad.newBuilder()
            .setRedirectUrl("/product/66VCHSJNUP")
            .setText("Starsense Explorer Refractor Telescope for sale. 20% off.")
            .build();
    Ad colorImager =
        Ad.newBuilder()
            .setRedirectUrl("/product/0PUK6V6EV0")
            .setText("Solar System Color Imager for sale. 30% off.")
            .build();
    Ad opticalTube =
        Ad.newBuilder()
            .setRedirectUrl("/product/9SIQT8TOJO")
            .setText("Optical Tube Assembly for sale. 10% off.")
            .build();
    Ad travelTelescope =
        Ad.newBuilder()
            .setRedirectUrl("/product/1YMWWN1N4O")
            .setText(
                "Eclipsmart Travel Refractor Telescope for sale. Buy one, get second kit for free")
            .build();
    Ad solarFilter =
        Ad.newBuilder()
            .setRedirectUrl("/product/6E92ZMYYFZ")
            .setText("Solar Filter for sale. Buy two, get third one for free")
            .build();
    Ad cleaningKit =
        Ad.newBuilder()
            .setRedirectUrl("/product/L9ECAV7KIM")
            .setText("Lens Cleaning Kit for sale. Buy one, get second one for free")
            .build();
    return ImmutableListMultimap.<String, Ad>builder()
        .putAll("binoculars", binoculars)
        .putAll("telescopes", explorerTelescope)
        .putAll("accessories", colorImager, solarFilter, cleaningKit)
        .putAll("assembly", opticalTube)
        .putAll("travel", travelTelescope)
        // Keep the books category free of ads to ensure the random code branch is tested
        .build();
  }
}
