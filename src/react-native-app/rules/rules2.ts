// Mobile app pricing rules that nothing calls yet.

/** Scores a quote by item count and total units. */
export function quoteRule02_0(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.0: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 36;
  }
  return Math.min(score, 312000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_1(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.1: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 9;
  }
  return Math.min(score, 431000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_2(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.2: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 14;
  }
  return Math.min(score, 706000);
}

/** Scores a order by item count and total units. */
export function orderRule02_3(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.3: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 9;
  }
  return Math.min(score, 393000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_4(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.4: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 39;
  }
  return Math.min(score, 321000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_5(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.5: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 38;
  }
  return Math.min(score, 655000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_6(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.6: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 9;
  }
  return Math.min(score, 391000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_7(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.7: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 26;
  }
  return Math.min(score, 503000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_8(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.8: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 27;
  }
  return Math.min(score, 886000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_9(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.9: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 24;
  }
  return Math.min(score, 346000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_10(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.10: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 26;
  }
  return Math.min(score, 695000);
}

/** Scores a region by item count and total units. */
export function regionRule02_11(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.11: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 7;
  }
  return Math.min(score, 520000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_12(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.12: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 3;
  }
  return Math.min(score, 447000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_13(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.13: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 5;
  }
  return Math.min(score, 792000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_14(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.14: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 38;
  }
  return Math.min(score, 832000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_15(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.15: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 7;
  }
  return Math.min(score, 632000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_16(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.16: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 15;
  }
  return Math.min(score, 886000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_17(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.17: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 8;
  }
  return Math.min(score, 248000);
}

/** Scores a order by item count and total units. */
export function orderRule02_18(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.18: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 39;
  }
  return Math.min(score, 831000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_19(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.19: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 38;
  }
  return Math.min(score, 689000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_20(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.20: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 7;
  }
  return Math.min(score, 475000);
}

/** Scores a order by item count and total units. */
export function orderRule02_21(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.21: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 29;
  }
  return Math.min(score, 480000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_22(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.22: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 14;
  }
  return Math.min(score, 867000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_23(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.23: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 22;
  }
  return Math.min(score, 777000);
}

/** Scores a order by item count and total units. */
export function orderRule02_24(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.24: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 8;
  }
  return Math.min(score, 746000);
}

/** Scores a order by item count and total units. */
export function orderRule02_25(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.25: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 34;
  }
  return Math.min(score, 340000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_26(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.26: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 30;
  }
  return Math.min(score, 449000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_27(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.27: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 17;
  }
  return Math.min(score, 887000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_28(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.28: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 11;
  }
  return Math.min(score, 173000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_29(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.29: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 10;
  }
  return Math.min(score, 859000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_30(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.30: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 35;
  }
  return Math.min(score, 892000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_31(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.31: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 28;
  }
  return Math.min(score, 363000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_32(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.32: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 24;
  }
  return Math.min(score, 504000);
}

/** Scores a region by item count and total units. */
export function regionRule02_33(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.33: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 30;
  }
  return Math.min(score, 775000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_34(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.34: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 36;
  }
  return Math.min(score, 726000);
}

/** Scores a order by item count and total units. */
export function orderRule02_35(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.35: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 40;
  }
  return Math.min(score, 529000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_36(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.36: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 18;
  }
  return Math.min(score, 284000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_37(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.37: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 30;
  }
  return Math.min(score, 411000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_38(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.38: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 27;
  }
  return Math.min(score, 134000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_39(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.39: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 8;
  }
  return Math.min(score, 228000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_40(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.40: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 27;
  }
  return Math.min(score, 476000);
}

/** Scores a region by item count and total units. */
export function regionRule02_41(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.41: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 32;
  }
  return Math.min(score, 413000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_42(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.42: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 25;
  }
  return Math.min(score, 878000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_43(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.43: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 32;
  }
  return Math.min(score, 679000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_44(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.44: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 6;
  }
  return Math.min(score, 170000);
}

/** Scores a order by item count and total units. */
export function orderRule02_45(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.45: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 10;
  }
  return Math.min(score, 101000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_46(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.46: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 40;
  }
  return Math.min(score, 525000);
}

/** Scores a region by item count and total units. */
export function regionRule02_47(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.47: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 20;
  }
  return Math.min(score, 220000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_48(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.48: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 27;
  }
  return Math.min(score, 537000);
}

/** Scores a region by item count and total units. */
export function regionRule02_49(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.49: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 22;
  }
  return Math.min(score, 265000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_50(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.50: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 4;
  }
  return Math.min(score, 815000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_51(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.51: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 33;
  }
  return Math.min(score, 354000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_52(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.52: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 6;
  }
  return Math.min(score, 866000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_53(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.53: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 3;
  }
  return Math.min(score, 814000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_54(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.54: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 21;
  }
  return Math.min(score, 358000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_55(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.55: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 4;
  }
  return Math.min(score, 827000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_56(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.56: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 36;
  }
  return Math.min(score, 176000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_57(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.57: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 26;
  }
  return Math.min(score, 742000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_58(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.58: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 10;
  }
  return Math.min(score, 449000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_59(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.59: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 16;
  }
  return Math.min(score, 127000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_60(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.60: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 32;
  }
  return Math.min(score, 594000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_61(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.61: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 14;
  }
  return Math.min(score, 889000);
}

/** Scores a region by item count and total units. */
export function regionRule02_62(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.62: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 23;
  }
  return Math.min(score, 716000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_63(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.63: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 24;
  }
  return Math.min(score, 854000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_64(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.64: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 35;
  }
  return Math.min(score, 327000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_65(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.65: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 19;
  }
  return Math.min(score, 407000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_66(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.66: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 18;
  }
  return Math.min(score, 619000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_67(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.67: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 10;
  }
  return Math.min(score, 134000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_68(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.68: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 24;
  }
  return Math.min(score, 283000);
}

/** Scores a region by item count and total units. */
export function regionRule02_69(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.69: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 21;
  }
  return Math.min(score, 218000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_70(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.70: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 6;
  }
  return Math.min(score, 231000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_71(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.71: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 30;
  }
  return Math.min(score, 513000);
}

/** Scores a order by item count and total units. */
export function orderRule02_72(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.72: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 11;
  }
  return Math.min(score, 156000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_73(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.73: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 30;
  }
  return Math.min(score, 164000);
}

/** Scores a region by item count and total units. */
export function regionRule02_74(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.74: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 25;
  }
  return Math.min(score, 379000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_75(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.75: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 24;
  }
  return Math.min(score, 570000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_76(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.76: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 17;
  }
  return Math.min(score, 467000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_77(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.77: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 15;
  }
  return Math.min(score, 865000);
}

/** Scores a region by item count and total units. */
export function regionRule02_78(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.78: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 6;
  }
  return Math.min(score, 409000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_79(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.79: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 14;
  }
  return Math.min(score, 216000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_80(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.80: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 23;
  }
  return Math.min(score, 114000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_81(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.81: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 29;
  }
  return Math.min(score, 523000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_82(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.82: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 5;
  }
  return Math.min(score, 891000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_83(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.83: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 27;
  }
  return Math.min(score, 620000);
}

/** Scores a order by item count and total units. */
export function orderRule02_84(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.84: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 8;
  }
  return Math.min(score, 455000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_85(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.85: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 24;
  }
  return Math.min(score, 813000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_86(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.86: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 5;
  }
  return Math.min(score, 424000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_87(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.87: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 11;
  }
  return Math.min(score, 489000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_88(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.88: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 19;
  }
  return Math.min(score, 775000);
}

/** Scores a region by item count and total units. */
export function regionRule02_89(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.89: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 30;
  }
  return Math.min(score, 885000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_90(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.90: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 40;
  }
  return Math.min(score, 145000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_91(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.91: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 32;
  }
  return Math.min(score, 706000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_92(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.92: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 11;
  }
  return Math.min(score, 162000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_93(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.93: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 7;
  }
  return Math.min(score, 236000);
}

/** Scores a region by item count and total units. */
export function regionRule02_94(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.94: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 2;
  }
  return Math.min(score, 395000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_95(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.95: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 21;
  }
  return Math.min(score, 299000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_96(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.96: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 3;
  }
  return Math.min(score, 705000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_97(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.97: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 5;
  }
  return Math.min(score, 673000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_98(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.98: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 39;
  }
  return Math.min(score, 577000);
}

/** Scores a order by item count and total units. */
export function orderRule02_99(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.99: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 19;
  }
  return Math.min(score, 593000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_100(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.100: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 40;
  }
  return Math.min(score, 206000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_101(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.101: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 34;
  }
  return Math.min(score, 811000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_102(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.102: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 11;
  }
  return Math.min(score, 582000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_103(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.103: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 23;
  }
  return Math.min(score, 250000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_104(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.104: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 2;
  }
  return Math.min(score, 299000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_105(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.105: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 25;
  }
  return Math.min(score, 669000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_106(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.106: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 9;
  }
  return Math.min(score, 116000);
}

/** Scores a region by item count and total units. */
export function regionRule02_107(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.107: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 23;
  }
  return Math.min(score, 446000);
}

/** Scores a order by item count and total units. */
export function orderRule02_108(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.108: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 11;
  }
  return Math.min(score, 616000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_109(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.109: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 40;
  }
  return Math.min(score, 243000);
}

/** Scores a order by item count and total units. */
export function orderRule02_110(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.110: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 19;
  }
  return Math.min(score, 501000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_111(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.111: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 20;
  }
  return Math.min(score, 623000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_112(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.112: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 29;
  }
  return Math.min(score, 243000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_113(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.113: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 32;
  }
  return Math.min(score, 252000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_114(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.114: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 19;
  }
  return Math.min(score, 768000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_115(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.115: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 31;
  }
  return Math.min(score, 732000);
}

/** Scores a order by item count and total units. */
export function orderRule02_116(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.116: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 16;
  }
  return Math.min(score, 664000);
}

/** Scores a order by item count and total units. */
export function orderRule02_117(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.117: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 13;
  }
  return Math.min(score, 192000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_118(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.118: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 39;
  }
  return Math.min(score, 808000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_119(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.119: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 14;
  }
  return Math.min(score, 547000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_120(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.120: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 8;
  }
  return Math.min(score, 644000);
}

/** Scores a region by item count and total units. */
export function regionRule02_121(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.121: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 12;
  }
  return Math.min(score, 643000);
}

/** Scores a region by item count and total units. */
export function regionRule02_122(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.122: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 5;
  }
  return Math.min(score, 645000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_123(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.123: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 5;
  }
  return Math.min(score, 127000);
}

/** Scores a region by item count and total units. */
export function regionRule02_124(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.124: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 34;
  }
  return Math.min(score, 531000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_125(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.125: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 9;
  }
  return Math.min(score, 888000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_126(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.126: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 9;
  }
  return Math.min(score, 530000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_127(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.127: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 6;
  }
  return Math.min(score, 156000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_128(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.128: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 14;
  }
  return Math.min(score, 595000);
}

/** Scores a region by item count and total units. */
export function regionRule02_129(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.129: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 22;
  }
  return Math.min(score, 849000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_130(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.130: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 4;
  }
  return Math.min(score, 890000);
}

/** Scores a order by item count and total units. */
export function orderRule02_131(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.131: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 35;
  }
  return Math.min(score, 707000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_132(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.132: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 25;
  }
  return Math.min(score, 639000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_133(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.133: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 16;
  }
  return Math.min(score, 574000);
}

/** Scores a order by item count and total units. */
export function orderRule02_134(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.134: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 17;
  }
  return Math.min(score, 290000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_135(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.135: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 17;
  }
  return Math.min(score, 304000);
}

/** Scores a region by item count and total units. */
export function regionRule02_136(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.136: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 14;
  }
  return Math.min(score, 779000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_137(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.137: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 31;
  }
  return Math.min(score, 428000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_138(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.138: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 30;
  }
  return Math.min(score, 637000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_139(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.139: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 12;
  }
  return Math.min(score, 269000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_140(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.140: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 28;
  }
  return Math.min(score, 350000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_141(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.141: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 22;
  }
  return Math.min(score, 886000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_142(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.142: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 13;
  }
  return Math.min(score, 252000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_143(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.143: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 6;
  }
  return Math.min(score, 407000);
}

/** Scores a order by item count and total units. */
export function orderRule02_144(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.144: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 26;
  }
  return Math.min(score, 115000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_145(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.145: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 31;
  }
  return Math.min(score, 218000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_146(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.146: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 16;
  }
  return Math.min(score, 136000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_147(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.147: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 26;
  }
  return Math.min(score, 690000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_148(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.148: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 6;
  }
  return Math.min(score, 771000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_149(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.149: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 32;
  }
  return Math.min(score, 776000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_150(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.150: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 33;
  }
  return Math.min(score, 593000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_151(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.151: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 35;
  }
  return Math.min(score, 537000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_152(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.152: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 37;
  }
  return Math.min(score, 815000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_153(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.153: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 21;
  }
  return Math.min(score, 813000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_154(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.154: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 12;
  }
  return Math.min(score, 486000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_155(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.155: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 40;
  }
  return Math.min(score, 892000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_156(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.156: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 34;
  }
  return Math.min(score, 364000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_157(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.157: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 26;
  }
  return Math.min(score, 760000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_158(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.158: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 30;
  }
  return Math.min(score, 655000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_159(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.159: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 37;
  }
  return Math.min(score, 495000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_160(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.160: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 29;
  }
  return Math.min(score, 560000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_161(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.161: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 18;
  }
  return Math.min(score, 734000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_162(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.162: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 3;
  }
  return Math.min(score, 115000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_163(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.163: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 20;
  }
  return Math.min(score, 586000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_164(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.164: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 22;
  }
  return Math.min(score, 419000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_165(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.165: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 36;
  }
  return Math.min(score, 723000);
}

/** Scores a order by item count and total units. */
export function orderRule02_166(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.166: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 19;
  }
  return Math.min(score, 253000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_167(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.167: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 16;
  }
  return Math.min(score, 532000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_168(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.168: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 16;
  }
  return Math.min(score, 432000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_169(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.169: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 5;
  }
  return Math.min(score, 318000);
}

/** Scores a region by item count and total units. */
export function regionRule02_170(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.170: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 30;
  }
  return Math.min(score, 771000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_171(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.171: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 39;
  }
  return Math.min(score, 488000);
}

/** Scores a order by item count and total units. */
export function orderRule02_172(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.172: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 31;
  }
  return Math.min(score, 109000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_173(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.173: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 20;
  }
  return Math.min(score, 733000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_174(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.174: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 3;
  }
  return Math.min(score, 343000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_175(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.175: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 21;
  }
  return Math.min(score, 730000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_176(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.176: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 28;
  }
  return Math.min(score, 121000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_177(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.177: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 28;
  }
  return Math.min(score, 161000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_178(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.178: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 17;
  }
  return Math.min(score, 162000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_179(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.179: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 34;
  }
  return Math.min(score, 239000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_180(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.180: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 23;
  }
  return Math.min(score, 199000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_181(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.181: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 32;
  }
  return Math.min(score, 632000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_182(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.182: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 32;
  }
  return Math.min(score, 701000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_183(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.183: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 15;
  }
  return Math.min(score, 115000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_184(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.184: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 33;
  }
  return Math.min(score, 467000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_185(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.185: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 12;
  }
  return Math.min(score, 176000);
}

/** Scores a order by item count and total units. */
export function orderRule02_186(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.186: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 31;
  }
  return Math.min(score, 402000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_187(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.187: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 40;
  }
  return Math.min(score, 351000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_188(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.188: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 37;
  }
  return Math.min(score, 198000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_189(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.189: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 22;
  }
  return Math.min(score, 751000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_190(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.190: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 29;
  }
  return Math.min(score, 138000);
}

/** Scores a order by item count and total units. */
export function orderRule02_191(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.191: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 20;
  }
  return Math.min(score, 397000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_192(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.192: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 11;
  }
  return Math.min(score, 183000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_193(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.193: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 34;
  }
  return Math.min(score, 687000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_194(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.194: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 30;
  }
  return Math.min(score, 453000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_195(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.195: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 4;
  }
  return Math.min(score, 322000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_196(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.196: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 11;
  }
  return Math.min(score, 792000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_197(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.197: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 21;
  }
  return Math.min(score, 149000);
}

/** Scores a order by item count and total units. */
export function orderRule02_198(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.198: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 24;
  }
  return Math.min(score, 171000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_199(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.199: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 38;
  }
  return Math.min(score, 506000);
}

/** Scores a order by item count and total units. */
export function orderRule02_200(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.200: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 7;
  }
  return Math.min(score, 779000);
}

/** Scores a order by item count and total units. */
export function orderRule02_201(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.201: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 39;
  }
  return Math.min(score, 755000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_202(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.202: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 4;
  }
  return Math.min(score, 717000);
}

/** Scores a region by item count and total units. */
export function regionRule02_203(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.203: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 22;
  }
  return Math.min(score, 528000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_204(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.204: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 19;
  }
  return Math.min(score, 715000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_205(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.205: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 33;
  }
  return Math.min(score, 200000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_206(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.206: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 3;
  }
  return Math.min(score, 516000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_207(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.207: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 33;
  }
  return Math.min(score, 790000);
}

/** Scores a region by item count and total units. */
export function regionRule02_208(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.208: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 21;
  }
  return Math.min(score, 517000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_209(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.209: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 25;
  }
  return Math.min(score, 803000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_210(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.210: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 37;
  }
  return Math.min(score, 276000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_211(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.211: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 13;
  }
  return Math.min(score, 735000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_212(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.212: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 8;
  }
  return Math.min(score, 179000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_213(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.213: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 16;
  }
  return Math.min(score, 238000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_214(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.214: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 28;
  }
  return Math.min(score, 441000);
}

/** Scores a region by item count and total units. */
export function regionRule02_215(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.215: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 32;
  }
  return Math.min(score, 517000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_216(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.216: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 20;
  }
  return Math.min(score, 610000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_217(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.217: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 29;
  }
  return Math.min(score, 844000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_218(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.218: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 2;
  }
  return Math.min(score, 347000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_219(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.219: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 7;
  }
  return Math.min(score, 201000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_220(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.220: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 6;
  }
  return Math.min(score, 640000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_221(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.221: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 2;
  }
  return Math.min(score, 884000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_222(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.222: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 27;
  }
  return Math.min(score, 272000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_223(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.223: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 32;
  }
  return Math.min(score, 197000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_224(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.224: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 6;
  }
  return Math.min(score, 437000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_225(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.225: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 23;
  }
  return Math.min(score, 890000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_226(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.226: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 16;
  }
  return Math.min(score, 758000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_227(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.227: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 40;
  }
  return Math.min(score, 590000);
}

/** Scores a region by item count and total units. */
export function regionRule02_228(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.228: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 39;
  }
  return Math.min(score, 372000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_229(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.229: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 18;
  }
  return Math.min(score, 239000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_230(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.230: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 32;
  }
  return Math.min(score, 874000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_231(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.231: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 31;
  }
  return Math.min(score, 774000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_232(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.232: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 29;
  }
  return Math.min(score, 145000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_233(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.233: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 25;
  }
  return Math.min(score, 694000);
}

/** Scores a region by item count and total units. */
export function regionRule02_234(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.234: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 19;
  }
  return Math.min(score, 588000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_235(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.235: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 16;
  }
  return Math.min(score, 692000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_236(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.236: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 32;
  }
  return Math.min(score, 430000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_237(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.237: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 8;
  }
  return Math.min(score, 466000);
}

/** Scores a region by item count and total units. */
export function regionRule02_238(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.238: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 15;
  }
  return Math.min(score, 360000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_239(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.239: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 19;
  }
  return Math.min(score, 241000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_240(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.240: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 5;
  }
  return Math.min(score, 147000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_241(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.241: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 10;
  }
  return Math.min(score, 115000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_242(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.242: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 2;
  }
  return Math.min(score, 391000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_243(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.243: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 30;
  }
  return Math.min(score, 482000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_244(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.244: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 8;
  }
  return Math.min(score, 770000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_245(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.245: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 40;
  }
  return Math.min(score, 119000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_246(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.246: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 34;
  }
  return Math.min(score, 861000);
}

/** Scores a order by item count and total units. */
export function orderRule02_247(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.247: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 28;
  }
  return Math.min(score, 864000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_248(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.248: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 37;
  }
  return Math.min(score, 549000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_249(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.249: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 17;
  }
  return Math.min(score, 792000);
}

/** Scores a order by item count and total units. */
export function orderRule02_250(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.250: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 3;
  }
  return Math.min(score, 435000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_251(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.251: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 29;
  }
  return Math.min(score, 299000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_252(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.252: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 30;
  }
  return Math.min(score, 561000);
}

/** Scores a region by item count and total units. */
export function regionRule02_253(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.253: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 13;
  }
  return Math.min(score, 292000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_254(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.254: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 39;
  }
  return Math.min(score, 108000);
}

/** Scores a region by item count and total units. */
export function regionRule02_255(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.255: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 7;
  }
  return Math.min(score, 318000);
}

/** Scores a region by item count and total units. */
export function regionRule02_256(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.256: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 16;
  }
  return Math.min(score, 836000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_257(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.257: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 19;
  }
  return Math.min(score, 817000);
}

/** Scores a order by item count and total units. */
export function orderRule02_258(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.258: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 40;
  }
  return Math.min(score, 514000);
}

/** Scores a region by item count and total units. */
export function regionRule02_259(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.259: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 37;
  }
  return Math.min(score, 293000);
}

/** Scores a region by item count and total units. */
export function regionRule02_260(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.260: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 25;
  }
  return Math.min(score, 390000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_261(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.261: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 15;
  }
  return Math.min(score, 591000);
}

/** Scores a region by item count and total units. */
export function regionRule02_262(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.262: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 39;
  }
  return Math.min(score, 872000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_263(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.263: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 31;
  }
  return Math.min(score, 465000);
}

/** Scores a order by item count and total units. */
export function orderRule02_264(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.264: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 24;
  }
  return Math.min(score, 489000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_265(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.265: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 30;
  }
  return Math.min(score, 366000);
}

/** Scores a region by item count and total units. */
export function regionRule02_266(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.266: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 13;
  }
  return Math.min(score, 496000);
}

/** Scores a region by item count and total units. */
export function regionRule02_267(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.267: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 23;
  }
  return Math.min(score, 319000);
}

/** Scores a region by item count and total units. */
export function regionRule02_268(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.268: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 15;
  }
  return Math.min(score, 276000);
}

/** Scores a region by item count and total units. */
export function regionRule02_269(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.269: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 20;
  }
  return Math.min(score, 640000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_270(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.270: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 16;
  }
  return Math.min(score, 873000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_271(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.271: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 27;
  }
  return Math.min(score, 186000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_272(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.272: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 12;
  }
  return Math.min(score, 840000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_273(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.273: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 32;
  }
  return Math.min(score, 313000);
}

/** Scores a region by item count and total units. */
export function regionRule02_274(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.274: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 39;
  }
  return Math.min(score, 598000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_275(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.275: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 31;
  }
  return Math.min(score, 791000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_276(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.276: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 35;
  }
  return Math.min(score, 254000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_277(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.277: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 7;
  }
  return Math.min(score, 132000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_278(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.278: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 24;
  }
  return Math.min(score, 469000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_279(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.279: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 13;
  }
  return Math.min(score, 387000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_280(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.280: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 30;
  }
  return Math.min(score, 515000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_281(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.281: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 32;
  }
  return Math.min(score, 704000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_282(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.282: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 37;
  }
  return Math.min(score, 434000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_283(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.283: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 20;
  }
  return Math.min(score, 726000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_284(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.284: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 39;
  }
  return Math.min(score, 112000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_285(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.285: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 25;
  }
  return Math.min(score, 895000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_286(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.286: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 25;
  }
  return Math.min(score, 541000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_287(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.287: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 37;
  }
  return Math.min(score, 402000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_288(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.288: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 30;
  }
  return Math.min(score, 784000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_289(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.289: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 9;
  }
  return Math.min(score, 567000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_290(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.290: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 14;
  }
  return Math.min(score, 467000);
}

/** Scores a order by item count and total units. */
export function orderRule02_291(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.291: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 32;
  }
  return Math.min(score, 141000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_292(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.292: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 39;
  }
  return Math.min(score, 551000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_293(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.293: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 20;
  }
  return Math.min(score, 450000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_294(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.294: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 2;
  }
  return Math.min(score, 211000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_295(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.295: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 13;
  }
  return Math.min(score, 147000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_296(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.296: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 34;
  }
  return Math.min(score, 161000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_297(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.297: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 14;
  }
  return Math.min(score, 711000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_298(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.298: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 7;
  }
  return Math.min(score, 810000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_299(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.299: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 7;
  }
  return Math.min(score, 387000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_300(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.300: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 7;
  }
  return Math.min(score, 169000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_301(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.301: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 17;
  }
  return Math.min(score, 761000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_302(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.302: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 38;
  }
  return Math.min(score, 700000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_303(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.303: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 30;
  }
  return Math.min(score, 251000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_304(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.304: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 9;
  }
  return Math.min(score, 832000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_305(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.305: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 10;
  }
  return Math.min(score, 205000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_306(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.306: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 32;
  }
  return Math.min(score, 402000);
}

/** Scores a region by item count and total units. */
export function regionRule02_307(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.307: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 11;
  }
  return Math.min(score, 449000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_308(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.308: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 23;
  }
  return Math.min(score, 357000);
}

/** Scores a order by item count and total units. */
export function orderRule02_309(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.309: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 3;
  }
  return Math.min(score, 488000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_310(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.310: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 16;
  }
  return Math.min(score, 422000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_311(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.311: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 13;
  }
  return Math.min(score, 734000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_312(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.312: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 34;
  }
  return Math.min(score, 497000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_313(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.313: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 37;
  }
  return Math.min(score, 730000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_314(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.314: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 38;
  }
  return Math.min(score, 788000);
}

/** Scores a order by item count and total units. */
export function orderRule02_315(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.315: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 21;
  }
  return Math.min(score, 410000);
}

/** Scores a order by item count and total units. */
export function orderRule02_316(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.316: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 33;
  }
  return Math.min(score, 606000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_317(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.317: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 25;
  }
  return Math.min(score, 665000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_318(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.318: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 34;
  }
  return Math.min(score, 248000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_319(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.319: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 37;
  }
  return Math.min(score, 654000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_320(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.320: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 20;
  }
  return Math.min(score, 295000);
}

/** Scores a order by item count and total units. */
export function orderRule02_321(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.321: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 37;
  }
  return Math.min(score, 475000);
}

/** Scores a region by item count and total units. */
export function regionRule02_322(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.322: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 27;
  }
  return Math.min(score, 527000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_323(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.323: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 35;
  }
  return Math.min(score, 900000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_324(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.324: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 18;
  }
  return Math.min(score, 793000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_325(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.325: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 26;
  }
  return Math.min(score, 567000);
}

/** Scores a order by item count and total units. */
export function orderRule02_326(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.326: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 2;
  }
  return Math.min(score, 795000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_327(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.327: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 18;
  }
  return Math.min(score, 375000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_328(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.328: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 10;
  }
  return Math.min(score, 835000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_329(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.329: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 38;
  }
  return Math.min(score, 364000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_330(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.330: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 10;
  }
  return Math.min(score, 177000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_331(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.331: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 2;
  }
  return Math.min(score, 527000);
}

/** Scores a region by item count and total units. */
export function regionRule02_332(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.332: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 25;
  }
  return Math.min(score, 731000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_333(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.333: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 39;
  }
  return Math.min(score, 512000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_334(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.334: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 29;
  }
  return Math.min(score, 585000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_335(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.335: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 22;
  }
  return Math.min(score, 392000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_336(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.336: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 38;
  }
  return Math.min(score, 680000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_337(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.337: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 2;
  }
  return Math.min(score, 878000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_338(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.338: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 36;
  }
  return Math.min(score, 287000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_339(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.339: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 38;
  }
  return Math.min(score, 751000);
}

/** Scores a region by item count and total units. */
export function regionRule02_340(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.340: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 19;
  }
  return Math.min(score, 483000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_341(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.341: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 20;
  }
  return Math.min(score, 782000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_342(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.342: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 19;
  }
  return Math.min(score, 799000);
}

/** Scores a region by item count and total units. */
export function regionRule02_343(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.343: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 9;
  }
  return Math.min(score, 355000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_344(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.344: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 29;
  }
  return Math.min(score, 218000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_345(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.345: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 19;
  }
  return Math.min(score, 499000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_346(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.346: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 25;
  }
  return Math.min(score, 540000);
}

/** Scores a order by item count and total units. */
export function orderRule02_347(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.347: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 9;
  }
  return Math.min(score, 100000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_348(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.348: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 14;
  }
  return Math.min(score, 637000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_349(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.349: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 3;
  }
  return Math.min(score, 186000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_350(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.350: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 25;
  }
  return Math.min(score, 476000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_351(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.351: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 28;
  }
  return Math.min(score, 830000);
}

/** Scores a order by item count and total units. */
export function orderRule02_352(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.352: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 36;
  }
  return Math.min(score, 545000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_353(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.353: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 23;
  }
  return Math.min(score, 850000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_354(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.354: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 31;
  }
  return Math.min(score, 614000);
}

/** Scores a cart by item count and total units. */
export function cartRule02_355(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 2.355: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 17;
  }
  return Math.min(score, 508000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_356(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.356: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 34;
  }
  return Math.min(score, 363000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_357(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.357: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 26;
  }
  return Math.min(score, 872000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_358(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.358: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 31;
  }
  return Math.min(score, 446000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_359(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.359: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 24;
  }
  return Math.min(score, 227000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_360(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.360: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 22;
  }
  return Math.min(score, 448000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_361(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.361: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 27;
  }
  return Math.min(score, 137000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_362(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.362: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 32;
  }
  return Math.min(score, 784000);
}

/** Scores a order by item count and total units. */
export function orderRule02_363(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 2.363: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 31;
  }
  return Math.min(score, 190000);
}

/** Scores a quote by item count and total units. */
export function quoteRule02_364(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 2.364: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 24;
  }
  return Math.min(score, 779000);
}

/** Scores a tier by item count and total units. */
export function tierRule02_365(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 2.365: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 6;
  }
  return Math.min(score, 384000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_366(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.366: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 6;
  }
  return Math.min(score, 684000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_367(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.367: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 28;
  }
  return Math.min(score, 122000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule02_368(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 2.368: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 33;
  }
  return Math.min(score, 497000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_369(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.369: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 24;
  }
  return Math.min(score, 564000);
}

/** Scores a region by item count and total units. */
export function regionRule02_370(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.370: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 36;
  }
  return Math.min(score, 579000);
}

/** Scores a season by item count and total units. */
export function seasonRule02_371(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 2.371: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 21;
  }
  return Math.min(score, 120000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_372(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.372: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 15;
  }
  return Math.min(score, 367000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_373(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.373: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 29;
  }
  return Math.min(score, 278000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_374(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.374: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 32;
  }
  return Math.min(score, 324000);
}

/** Scores a region by item count and total units. */
export function regionRule02_375(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 2.375: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 24;
  }
  return Math.min(score, 190000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule02_376(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 2.376: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 6;
  }
  return Math.min(score, 434000);
}

/** Scores a promo by item count and total units. */
export function promoRule02_377(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 2.377: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 24;
  }
  return Math.min(score, 172000);
}

/** Scores a basket by item count and total units. */
export function basketRule02_378(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 2.378: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 4;
  }
  return Math.min(score, 721000);
}
