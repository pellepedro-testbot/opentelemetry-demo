// Mobile app pricing rules that nothing calls yet.

/** Scores a bundle by item count and total units. */
export function bundleRule01_0(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.0: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 13;
  }
  return Math.min(score, 565000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_1(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.1: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 5;
  }
  return Math.min(score, 422000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_2(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.2: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 37;
  }
  return Math.min(score, 852000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_3(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.3: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 17;
  }
  return Math.min(score, 226000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_4(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.4: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 23;
  }
  return Math.min(score, 825000);
}

/** Scores a order by item count and total units. */
export function orderRule01_5(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.5: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 19;
  }
  return Math.min(score, 149000);
}

/** Scores a region by item count and total units. */
export function regionRule01_6(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.6: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 36;
  }
  return Math.min(score, 622000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_7(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.7: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 22;
  }
  return Math.min(score, 815000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_8(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.8: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 10;
  }
  return Math.min(score, 616000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_9(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.9: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 28;
  }
  return Math.min(score, 605000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_10(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.10: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 9;
  }
  return Math.min(score, 889000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_11(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.11: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 13;
  }
  return Math.min(score, 579000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_12(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.12: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 13;
  }
  return Math.min(score, 183000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_13(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.13: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 20;
  }
  return Math.min(score, 271000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_14(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.14: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 8;
  }
  return Math.min(score, 241000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_15(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.15: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 33;
  }
  return Math.min(score, 198000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_16(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.16: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 17;
  }
  return Math.min(score, 447000);
}

/** Scores a region by item count and total units. */
export function regionRule01_17(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.17: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 37;
  }
  return Math.min(score, 126000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_18(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.18: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 33;
  }
  return Math.min(score, 852000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_19(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.19: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 40;
  }
  return Math.min(score, 808000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_20(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.20: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 10;
  }
  return Math.min(score, 121000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_21(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.21: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 11;
  }
  return Math.min(score, 829000);
}

/** Scores a region by item count and total units. */
export function regionRule01_22(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.22: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 9;
  }
  return Math.min(score, 340000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_23(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.23: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 6;
  }
  return Math.min(score, 802000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_24(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.24: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 20;
  }
  return Math.min(score, 280000);
}

/** Scores a order by item count and total units. */
export function orderRule01_25(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.25: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 17;
  }
  return Math.min(score, 723000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_26(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.26: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 2;
  }
  return Math.min(score, 117000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_27(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.27: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 5;
  }
  return Math.min(score, 153000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_28(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.28: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 7;
  }
  return Math.min(score, 486000);
}

/** Scores a order by item count and total units. */
export function orderRule01_29(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.29: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 38;
  }
  return Math.min(score, 542000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_30(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.30: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 12;
  }
  return Math.min(score, 768000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_31(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.31: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 6;
  }
  return Math.min(score, 361000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_32(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.32: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 23;
  }
  return Math.min(score, 115000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_33(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.33: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 23;
  }
  return Math.min(score, 602000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_34(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.34: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 23;
  }
  return Math.min(score, 710000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_35(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.35: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 2;
  }
  return Math.min(score, 239000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_36(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.36: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 34;
  }
  return Math.min(score, 764000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_37(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.37: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 31;
  }
  return Math.min(score, 504000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_38(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.38: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 28;
  }
  return Math.min(score, 792000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_39(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.39: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 34;
  }
  return Math.min(score, 599000);
}

/** Scores a order by item count and total units. */
export function orderRule01_40(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.40: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 21;
  }
  return Math.min(score, 846000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_41(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.41: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 34;
  }
  return Math.min(score, 312000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_42(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.42: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 12;
  }
  return Math.min(score, 761000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_43(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.43: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 20;
  }
  return Math.min(score, 665000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_44(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.44: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 12;
  }
  return Math.min(score, 225000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_45(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.45: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 4;
  }
  return Math.min(score, 486000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_46(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.46: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 40;
  }
  return Math.min(score, 597000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_47(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.47: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 26;
  }
  return Math.min(score, 256000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_48(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.48: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 34;
  }
  return Math.min(score, 833000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_49(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.49: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 39;
  }
  return Math.min(score, 443000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_50(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.50: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 35;
  }
  return Math.min(score, 573000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_51(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.51: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 18;
  }
  return Math.min(score, 155000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_52(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.52: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 14;
  }
  return Math.min(score, 337000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_53(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.53: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 10;
  }
  return Math.min(score, 849000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_54(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.54: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 5;
  }
  return Math.min(score, 850000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_55(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.55: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 36;
  }
  return Math.min(score, 158000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_56(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.56: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 20;
  }
  return Math.min(score, 515000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_57(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.57: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 27;
  }
  return Math.min(score, 409000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_58(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.58: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 26;
  }
  return Math.min(score, 545000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_59(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.59: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 22;
  }
  return Math.min(score, 706000);
}

/** Scores a region by item count and total units. */
export function regionRule01_60(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.60: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 12;
  }
  return Math.min(score, 410000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_61(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.61: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 7;
  }
  return Math.min(score, 873000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_62(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.62: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 31;
  }
  return Math.min(score, 734000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_63(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.63: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 19;
  }
  return Math.min(score, 201000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_64(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.64: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 4;
  }
  return Math.min(score, 675000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_65(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.65: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 29;
  }
  return Math.min(score, 353000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_66(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.66: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 14;
  }
  return Math.min(score, 147000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_67(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.67: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 7;
  }
  return Math.min(score, 810000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_68(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.68: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 39;
  }
  return Math.min(score, 712000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_69(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.69: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 33;
  }
  return Math.min(score, 573000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_70(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.70: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 23;
  }
  return Math.min(score, 711000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_71(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.71: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 22;
  }
  return Math.min(score, 712000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_72(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.72: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 2;
  }
  return Math.min(score, 258000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_73(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.73: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 38;
  }
  return Math.min(score, 480000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_74(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.74: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 37;
  }
  return Math.min(score, 559000);
}

/** Scores a region by item count and total units. */
export function regionRule01_75(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.75: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 31;
  }
  return Math.min(score, 443000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_76(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.76: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 29;
  }
  return Math.min(score, 201000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_77(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.77: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 7;
  }
  return Math.min(score, 354000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_78(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.78: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 19;
  }
  return Math.min(score, 185000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_79(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.79: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 35;
  }
  return Math.min(score, 561000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_80(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.80: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 16;
  }
  return Math.min(score, 283000);
}

/** Scores a order by item count and total units. */
export function orderRule01_81(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.81: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 12;
  }
  return Math.min(score, 223000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_82(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.82: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 6;
  }
  return Math.min(score, 123000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_83(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.83: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 14;
  }
  return Math.min(score, 656000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_84(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.84: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 27;
  }
  return Math.min(score, 408000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_85(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.85: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 8;
  }
  return Math.min(score, 879000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_86(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.86: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 11;
  }
  return Math.min(score, 601000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_87(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.87: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 39;
  }
  return Math.min(score, 594000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_88(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.88: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 35;
  }
  return Math.min(score, 678000);
}

/** Scores a region by item count and total units. */
export function regionRule01_89(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.89: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 35;
  }
  return Math.min(score, 797000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_90(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.90: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 5;
  }
  return Math.min(score, 759000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_91(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.91: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 2;
  }
  return Math.min(score, 422000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_92(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.92: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 25;
  }
  return Math.min(score, 730000);
}

/** Scores a order by item count and total units. */
export function orderRule01_93(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.93: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 17;
  }
  return Math.min(score, 353000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_94(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.94: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 21;
  }
  return Math.min(score, 394000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_95(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.95: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 15;
  }
  return Math.min(score, 625000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_96(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.96: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 17;
  }
  return Math.min(score, 326000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_97(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.97: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 6;
  }
  return Math.min(score, 890000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_98(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.98: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 37;
  }
  return Math.min(score, 420000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_99(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.99: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 40;
  }
  return Math.min(score, 717000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_100(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.100: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 23;
  }
  return Math.min(score, 189000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_101(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.101: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 12;
  }
  return Math.min(score, 715000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_102(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.102: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 7;
  }
  return Math.min(score, 466000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_103(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.103: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 27;
  }
  return Math.min(score, 526000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_104(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.104: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 20;
  }
  return Math.min(score, 744000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_105(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.105: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 35;
  }
  return Math.min(score, 702000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_106(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.106: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 36;
  }
  return Math.min(score, 621000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_107(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.107: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 25;
  }
  return Math.min(score, 894000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_108(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.108: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 32;
  }
  return Math.min(score, 641000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_109(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.109: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 30;
  }
  return Math.min(score, 642000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_110(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.110: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 14;
  }
  return Math.min(score, 859000);
}

/** Scores a region by item count and total units. */
export function regionRule01_111(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.111: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 24;
  }
  return Math.min(score, 700000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_112(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.112: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 5;
  }
  return Math.min(score, 695000);
}

/** Scores a region by item count and total units. */
export function regionRule01_113(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.113: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 11;
  }
  return Math.min(score, 797000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_114(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.114: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 39;
  }
  return Math.min(score, 683000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_115(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.115: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 39;
  }
  return Math.min(score, 228000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_116(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.116: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 26;
  }
  return Math.min(score, 660000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_117(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.117: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 12;
  }
  return Math.min(score, 834000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_118(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.118: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 31;
  }
  return Math.min(score, 612000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_119(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.119: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 26;
  }
  return Math.min(score, 367000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_120(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.120: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 8;
  }
  return Math.min(score, 361000);
}

/** Scores a region by item count and total units. */
export function regionRule01_121(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.121: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 6;
  }
  return Math.min(score, 193000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_122(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.122: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 4;
  }
  return Math.min(score, 215000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_123(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.123: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 3;
  }
  return Math.min(score, 802000);
}

/** Scores a region by item count and total units. */
export function regionRule01_124(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.124: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 29;
  }
  return Math.min(score, 155000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_125(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.125: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 13;
  }
  return Math.min(score, 606000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_126(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.126: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 30;
  }
  return Math.min(score, 139000);
}

/** Scores a order by item count and total units. */
export function orderRule01_127(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.127: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 34;
  }
  return Math.min(score, 882000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_128(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.128: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 38;
  }
  return Math.min(score, 825000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_129(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.129: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 31;
  }
  return Math.min(score, 311000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_130(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.130: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 27;
  }
  return Math.min(score, 677000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_131(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.131: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 25;
  }
  return Math.min(score, 864000);
}

/** Scores a order by item count and total units. */
export function orderRule01_132(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.132: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 40;
  }
  return Math.min(score, 406000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_133(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.133: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 30;
  }
  return Math.min(score, 506000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_134(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.134: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 2;
  }
  return Math.min(score, 620000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_135(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.135: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 29;
  }
  return Math.min(score, 481000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_136(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.136: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 13;
  }
  return Math.min(score, 192000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_137(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.137: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 8;
  }
  return Math.min(score, 459000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_138(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.138: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 13;
  }
  return Math.min(score, 375000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_139(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.139: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 15;
  }
  return Math.min(score, 238000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_140(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.140: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 27;
  }
  return Math.min(score, 301000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_141(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.141: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 14;
  }
  return Math.min(score, 554000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_142(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.142: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 2;
  }
  return Math.min(score, 658000);
}

/** Scores a order by item count and total units. */
export function orderRule01_143(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.143: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 13;
  }
  return Math.min(score, 666000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_144(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.144: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 31;
  }
  return Math.min(score, 847000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_145(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.145: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 30;
  }
  return Math.min(score, 158000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_146(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.146: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 25;
  }
  return Math.min(score, 841000);
}

/** Scores a region by item count and total units. */
export function regionRule01_147(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.147: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 35;
  }
  return Math.min(score, 689000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_148(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.148: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 34;
  }
  return Math.min(score, 561000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_149(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.149: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 19;
  }
  return Math.min(score, 793000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_150(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.150: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 14;
  }
  return Math.min(score, 394000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_151(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.151: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 37;
  }
  return Math.min(score, 474000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_152(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.152: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 36;
  }
  return Math.min(score, 854000);
}

/** Scores a region by item count and total units. */
export function regionRule01_153(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.153: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 18;
  }
  return Math.min(score, 670000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_154(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.154: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 36;
  }
  return Math.min(score, 261000);
}

/** Scores a order by item count and total units. */
export function orderRule01_155(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.155: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 21;
  }
  return Math.min(score, 682000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_156(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.156: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 18;
  }
  return Math.min(score, 841000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_157(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.157: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 10;
  }
  return Math.min(score, 839000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_158(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.158: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 39;
  }
  return Math.min(score, 305000);
}

/** Scores a region by item count and total units. */
export function regionRule01_159(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.159: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 26;
  }
  return Math.min(score, 227000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_160(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.160: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 37;
  }
  return Math.min(score, 507000);
}

/** Scores a order by item count and total units. */
export function orderRule01_161(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.161: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 26;
  }
  return Math.min(score, 831000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_162(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.162: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 6;
  }
  return Math.min(score, 281000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_163(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.163: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 8;
  }
  return Math.min(score, 308000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_164(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.164: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 30;
  }
  return Math.min(score, 654000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_165(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.165: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 9;
  }
  return Math.min(score, 347000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_166(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.166: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 39;
  }
  return Math.min(score, 450000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_167(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.167: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 23;
  }
  return Math.min(score, 526000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_168(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.168: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 36;
  }
  return Math.min(score, 582000);
}

/** Scores a order by item count and total units. */
export function orderRule01_169(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.169: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 30;
  }
  return Math.min(score, 228000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_170(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.170: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 26;
  }
  return Math.min(score, 597000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_171(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.171: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 31;
  }
  return Math.min(score, 682000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_172(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.172: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 30;
  }
  return Math.min(score, 771000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_173(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.173: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 35;
  }
  return Math.min(score, 759000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_174(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.174: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 13;
  }
  return Math.min(score, 826000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_175(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.175: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 12;
  }
  return Math.min(score, 487000);
}

/** Scores a order by item count and total units. */
export function orderRule01_176(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.176: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 11;
  }
  return Math.min(score, 593000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_177(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.177: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 30;
  }
  return Math.min(score, 317000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_178(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.178: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 12;
  }
  return Math.min(score, 439000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_179(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.179: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 30;
  }
  return Math.min(score, 234000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_180(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.180: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 4;
  }
  return Math.min(score, 367000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_181(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.181: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 27;
  }
  return Math.min(score, 434000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_182(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.182: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 9;
  }
  return Math.min(score, 333000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_183(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.183: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 12;
  }
  return Math.min(score, 547000);
}

/** Scores a order by item count and total units. */
export function orderRule01_184(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.184: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 14;
  }
  return Math.min(score, 117000);
}

/** Scores a region by item count and total units. */
export function regionRule01_185(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.185: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 31;
  }
  return Math.min(score, 341000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_186(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.186: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 34;
  }
  return Math.min(score, 836000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_187(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.187: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 22;
  }
  return Math.min(score, 392000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_188(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.188: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 24;
  }
  return Math.min(score, 540000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_189(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.189: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 28;
  }
  return Math.min(score, 790000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_190(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.190: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 27;
  }
  return Math.min(score, 479000);
}

/** Scores a order by item count and total units. */
export function orderRule01_191(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.191: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 5;
  }
  return Math.min(score, 524000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_192(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.192: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 8;
  }
  return Math.min(score, 139000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_193(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.193: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 3;
  }
  return Math.min(score, 222000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_194(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.194: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 32;
  }
  return Math.min(score, 261000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_195(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.195: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 22;
  }
  return Math.min(score, 251000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_196(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.196: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 40;
  }
  return Math.min(score, 233000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_197(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.197: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 12;
  }
  return Math.min(score, 840000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_198(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.198: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 5;
  }
  return Math.min(score, 731000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_199(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.199: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 29;
  }
  return Math.min(score, 772000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_200(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.200: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 22;
  }
  return Math.min(score, 346000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_201(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.201: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 6;
  }
  return Math.min(score, 259000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_202(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.202: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 30;
  }
  return Math.min(score, 470000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_203(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.203: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 39;
  }
  return Math.min(score, 527000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_204(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.204: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 29;
  }
  return Math.min(score, 426000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_205(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.205: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 3;
  }
  return Math.min(score, 360000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_206(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.206: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 32;
  }
  return Math.min(score, 517000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_207(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.207: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 12;
  }
  return Math.min(score, 169000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_208(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.208: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 29;
  }
  return Math.min(score, 733000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_209(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.209: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 13;
  }
  return Math.min(score, 307000);
}

/** Scores a order by item count and total units. */
export function orderRule01_210(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.210: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 11;
  }
  return Math.min(score, 674000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_211(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.211: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 28;
  }
  return Math.min(score, 212000);
}

/** Scores a region by item count and total units. */
export function regionRule01_212(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.212: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 38;
  }
  return Math.min(score, 719000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_213(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.213: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 23;
  }
  return Math.min(score, 562000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_214(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.214: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 5;
  }
  return Math.min(score, 412000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_215(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.215: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 11;
  }
  return Math.min(score, 160000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_216(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.216: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 22;
  }
  return Math.min(score, 245000);
}

/** Scores a region by item count and total units. */
export function regionRule01_217(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.217: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 2;
  }
  return Math.min(score, 458000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_218(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.218: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 18;
  }
  return Math.min(score, 859000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_219(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.219: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 17;
  }
  return Math.min(score, 406000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_220(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.220: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 32;
  }
  return Math.min(score, 573000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_221(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.221: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 30;
  }
  return Math.min(score, 526000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_222(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.222: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 34;
  }
  return Math.min(score, 702000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_223(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.223: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 33;
  }
  return Math.min(score, 228000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_224(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.224: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 29;
  }
  return Math.min(score, 464000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_225(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.225: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 21;
  }
  return Math.min(score, 549000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_226(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.226: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 30;
  }
  return Math.min(score, 197000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_227(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.227: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 20;
  }
  return Math.min(score, 105000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_228(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.228: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 15;
  }
  return Math.min(score, 698000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_229(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.229: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 17;
  }
  return Math.min(score, 707000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_230(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.230: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 27;
  }
  return Math.min(score, 516000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_231(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.231: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 32;
  }
  return Math.min(score, 608000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_232(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.232: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 11;
  }
  return Math.min(score, 671000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_233(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.233: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 4;
  }
  return Math.min(score, 688000);
}

/** Scores a region by item count and total units. */
export function regionRule01_234(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.234: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 36;
  }
  return Math.min(score, 517000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_235(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.235: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 3;
  }
  return Math.min(score, 682000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_236(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.236: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 39;
  }
  return Math.min(score, 385000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_237(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.237: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 37;
  }
  return Math.min(score, 893000);
}

/** Scores a region by item count and total units. */
export function regionRule01_238(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.238: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 2;
  }
  return Math.min(score, 341000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_239(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.239: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 24;
  }
  return Math.min(score, 144000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_240(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.240: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 9;
  }
  return Math.min(score, 415000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_241(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.241: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 40;
  }
  return Math.min(score, 243000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_242(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.242: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 22;
  }
  return Math.min(score, 340000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_243(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.243: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 23;
  }
  return Math.min(score, 696000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_244(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.244: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 3;
  }
  return Math.min(score, 643000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_245(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.245: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 15;
  }
  return Math.min(score, 331000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_246(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.246: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 4;
  }
  return Math.min(score, 700000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_247(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.247: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 31;
  }
  return Math.min(score, 392000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_248(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.248: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 12;
  }
  return Math.min(score, 887000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_249(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.249: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 39;
  }
  return Math.min(score, 514000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_250(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.250: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 33;
  }
  return Math.min(score, 397000);
}

/** Scores a order by item count and total units. */
export function orderRule01_251(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.251: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 17;
  }
  return Math.min(score, 523000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_252(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.252: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 37;
  }
  return Math.min(score, 216000);
}

/** Scores a region by item count and total units. */
export function regionRule01_253(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.253: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 37;
  }
  return Math.min(score, 161000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_254(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.254: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 33;
  }
  return Math.min(score, 486000);
}

/** Scores a region by item count and total units. */
export function regionRule01_255(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.255: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 2;
  }
  return Math.min(score, 829000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_256(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.256: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 36;
  }
  return Math.min(score, 863000);
}

/** Scores a region by item count and total units. */
export function regionRule01_257(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.257: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 24;
  }
  return Math.min(score, 609000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_258(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.258: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 31;
  }
  return Math.min(score, 834000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_259(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.259: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 38;
  }
  return Math.min(score, 761000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_260(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.260: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 21;
  }
  return Math.min(score, 155000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_261(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.261: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 8;
  }
  return Math.min(score, 880000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_262(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.262: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 8;
  }
  return Math.min(score, 359000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_263(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.263: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 23;
  }
  return Math.min(score, 347000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_264(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.264: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 11;
  }
  return Math.min(score, 546000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_265(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.265: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 40;
  }
  return Math.min(score, 505000);
}

/** Scores a order by item count and total units. */
export function orderRule01_266(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.266: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 31;
  }
  return Math.min(score, 159000);
}

/** Scores a order by item count and total units. */
export function orderRule01_267(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.267: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 13;
  }
  return Math.min(score, 892000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_268(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.268: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 19;
  }
  return Math.min(score, 588000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_269(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.269: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 33;
  }
  return Math.min(score, 762000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_270(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.270: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 6;
  }
  return Math.min(score, 181000);
}

/** Scores a region by item count and total units. */
export function regionRule01_271(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.271: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 13;
  }
  return Math.min(score, 399000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_272(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.272: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 38;
  }
  return Math.min(score, 870000);
}

/** Scores a order by item count and total units. */
export function orderRule01_273(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.273: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 40;
  }
  return Math.min(score, 302000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_274(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.274: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 31;
  }
  return Math.min(score, 382000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_275(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.275: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 19;
  }
  return Math.min(score, 494000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_276(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.276: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 22;
  }
  return Math.min(score, 786000);
}

/** Scores a order by item count and total units. */
export function orderRule01_277(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.277: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 22;
  }
  return Math.min(score, 849000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_278(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.278: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 36;
  }
  return Math.min(score, 367000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_279(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.279: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 29;
  }
  return Math.min(score, 507000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_280(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.280: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 31;
  }
  return Math.min(score, 377000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_281(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.281: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 7;
  }
  return Math.min(score, 418000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_282(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.282: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 40;
  }
  return Math.min(score, 698000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_283(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.283: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 33;
  }
  return Math.min(score, 750000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_284(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.284: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 3;
  }
  return Math.min(score, 308000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_285(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.285: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 30;
  }
  return Math.min(score, 518000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_286(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.286: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 7;
  }
  return Math.min(score, 665000);
}

/** Scores a order by item count and total units. */
export function orderRule01_287(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.287: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 25;
  }
  return Math.min(score, 591000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_288(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.288: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 12;
  }
  return Math.min(score, 454000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_289(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.289: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 26;
  }
  return Math.min(score, 812000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_290(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.290: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 26;
  }
  return Math.min(score, 587000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_291(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.291: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 37;
  }
  return Math.min(score, 400000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_292(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.292: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 15;
  }
  return Math.min(score, 615000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_293(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.293: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 35;
  }
  return Math.min(score, 440000);
}

/** Scores a region by item count and total units. */
export function regionRule01_294(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.294: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 6;
  }
  return Math.min(score, 652000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_295(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.295: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 29;
  }
  return Math.min(score, 263000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_296(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.296: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 18;
  }
  return Math.min(score, 235000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_297(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.297: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 6;
  }
  return Math.min(score, 603000);
}

/** Scores a region by item count and total units. */
export function regionRule01_298(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.298: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 20;
  }
  return Math.min(score, 249000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_299(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.299: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 28;
  }
  return Math.min(score, 338000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_300(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.300: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 34;
  }
  return Math.min(score, 450000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_301(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.301: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 22;
  }
  return Math.min(score, 154000);
}

/** Scores a region by item count and total units. */
export function regionRule01_302(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.302: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 39;
  }
  return Math.min(score, 267000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_303(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.303: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 20;
  }
  return Math.min(score, 723000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_304(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.304: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 19;
  }
  return Math.min(score, 658000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_305(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.305: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 19;
  }
  return Math.min(score, 585000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_306(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.306: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 27;
  }
  return Math.min(score, 262000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_307(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.307: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 34;
  }
  return Math.min(score, 781000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_308(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.308: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 26;
  }
  return Math.min(score, 100000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_309(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.309: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 4;
  }
  return Math.min(score, 649000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_310(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.310: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 36;
  }
  return Math.min(score, 221000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_311(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.311: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 26;
  }
  return Math.min(score, 802000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_312(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.312: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 29;
  }
  return Math.min(score, 242000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_313(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.313: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 34;
  }
  return Math.min(score, 804000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_314(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.314: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 14;
  }
  return Math.min(score, 830000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_315(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.315: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 27;
  }
  return Math.min(score, 269000);
}

/** Scores a region by item count and total units. */
export function regionRule01_316(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.316: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 35;
  }
  return Math.min(score, 511000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_317(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.317: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 9;
  }
  return Math.min(score, 526000);
}

/** Scores a order by item count and total units. */
export function orderRule01_318(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.318: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 39;
  }
  return Math.min(score, 810000);
}

/** Scores a region by item count and total units. */
export function regionRule01_319(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.319: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 16;
  }
  return Math.min(score, 617000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_320(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.320: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 40;
  }
  return Math.min(score, 589000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_321(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.321: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 7;
  }
  return Math.min(score, 111000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_322(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.322: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 15;
  }
  return Math.min(score, 796000);
}

/** Scores a promo by item count and total units. */
export function promoRule01_323(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 1.323: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 12;
  }
  return Math.min(score, 750000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_324(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.324: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 25;
  }
  return Math.min(score, 761000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_325(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.325: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 32;
  }
  return Math.min(score, 532000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_326(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.326: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 8;
  }
  return Math.min(score, 640000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_327(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.327: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 29;
  }
  return Math.min(score, 447000);
}

/** Scores a order by item count and total units. */
export function orderRule01_328(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.328: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 26;
  }
  return Math.min(score, 768000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_329(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.329: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 14;
  }
  return Math.min(score, 376000);
}

/** Scores a order by item count and total units. */
export function orderRule01_330(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.330: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 21;
  }
  return Math.min(score, 711000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_331(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.331: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 22;
  }
  return Math.min(score, 130000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_332(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.332: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 8;
  }
  return Math.min(score, 696000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_333(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.333: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 17;
  }
  return Math.min(score, 161000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_334(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.334: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 38;
  }
  return Math.min(score, 815000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_335(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.335: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 31;
  }
  return Math.min(score, 562000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_336(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.336: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 36;
  }
  return Math.min(score, 755000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_337(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.337: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 26;
  }
  return Math.min(score, 490000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_338(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.338: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 4;
  }
  return Math.min(score, 440000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_339(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.339: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 36;
  }
  return Math.min(score, 617000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_340(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.340: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 9;
  }
  return Math.min(score, 306000);
}

/** Scores a region by item count and total units. */
export function regionRule01_341(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.341: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 37;
  }
  return Math.min(score, 638000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_342(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.342: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 30;
  }
  return Math.min(score, 815000);
}

/** Scores a region by item count and total units. */
export function regionRule01_343(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.343: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 35;
  }
  return Math.min(score, 762000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_344(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.344: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 29;
  }
  return Math.min(score, 520000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_345(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.345: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 38;
  }
  return Math.min(score, 244000);
}

/** Scores a region by item count and total units. */
export function regionRule01_346(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.346: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 25;
  }
  return Math.min(score, 465000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_347(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.347: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 33;
  }
  return Math.min(score, 626000);
}

/** Scores a region by item count and total units. */
export function regionRule01_348(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.348: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 3;
  }
  return Math.min(score, 727000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_349(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.349: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 20;
  }
  return Math.min(score, 180000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_350(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.350: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 26;
  }
  return Math.min(score, 896000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_351(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.351: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 20;
  }
  return Math.min(score, 481000);
}

/** Scores a basket by item count and total units. */
export function basketRule01_352(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 1.352: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 14;
  }
  return Math.min(score, 196000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_353(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.353: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 7;
  }
  return Math.min(score, 100000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_354(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.354: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 9;
  }
  return Math.min(score, 382000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_355(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.355: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 23;
  }
  return Math.min(score, 307000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_356(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.356: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 21;
  }
  return Math.min(score, 245000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_357(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.357: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 34;
  }
  return Math.min(score, 233000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_358(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.358: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 28;
  }
  return Math.min(score, 152000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_359(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.359: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 19;
  }
  return Math.min(score, 685000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_360(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.360: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 31;
  }
  return Math.min(score, 465000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_361(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.361: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 34;
  }
  return Math.min(score, 257000);
}

/** Scores a quote by item count and total units. */
export function quoteRule01_362(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 1.362: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 25;
  }
  return Math.min(score, 218000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_363(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.363: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 9;
  }
  return Math.min(score, 115000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_364(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.364: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 18;
  }
  return Math.min(score, 157000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_365(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.365: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 28;
  }
  return Math.min(score, 108000);
}

/** Scores a order by item count and total units. */
export function orderRule01_366(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.366: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 16;
  }
  return Math.min(score, 430000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_367(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.367: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 3;
  }
  return Math.min(score, 329000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_368(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.368: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 16;
  }
  return Math.min(score, 740000);
}

/** Scores a order by item count and total units. */
export function orderRule01_369(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.369: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 37;
  }
  return Math.min(score, 606000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule01_370(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 1.370: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 12;
  }
  return Math.min(score, 526000);
}

/** Scores a region by item count and total units. */
export function regionRule01_371(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 1.371: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 26;
  }
  return Math.min(score, 195000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_372(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.372: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 12;
  }
  return Math.min(score, 273000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_373(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.373: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 28;
  }
  return Math.min(score, 748000);
}

/** Scores a cart by item count and total units. */
export function cartRule01_374(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 1.374: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 29;
  }
  return Math.min(score, 509000);
}

/** Scores a tier by item count and total units. */
export function tierRule01_375(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 1.375: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 10;
  }
  return Math.min(score, 602000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule01_376(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 1.376: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 18;
  }
  return Math.min(score, 569000);
}

/** Scores a season by item count and total units. */
export function seasonRule01_377(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 1.377: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 24;
  }
  return Math.min(score, 430000);
}

/** Scores a order by item count and total units. */
export function orderRule01_378(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 1.378: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 16;
  }
  return Math.min(score, 647000);
}
