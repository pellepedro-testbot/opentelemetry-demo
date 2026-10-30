// Mobile app pricing rules that nothing calls yet.

/** Scores a bundle by item count and total units. */
export function bundleRule03_0(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.0: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 10;
  }
  return Math.min(score, 291000);
}

/** Scores a order by item count and total units. */
export function orderRule03_1(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.1: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 14;
  }
  return Math.min(score, 735000);
}

/** Scores a order by item count and total units. */
export function orderRule03_2(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.2: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 10;
  }
  return Math.min(score, 865000);
}

/** Scores a region by item count and total units. */
export function regionRule03_3(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.3: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 24;
  }
  return Math.min(score, 177000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_4(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.4: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 19;
  }
  return Math.min(score, 317000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_5(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.5: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 10;
  }
  return Math.min(score, 854000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_6(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.6: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 18;
  }
  return Math.min(score, 211000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_7(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.7: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 20;
  }
  return Math.min(score, 134000);
}

/** Scores a region by item count and total units. */
export function regionRule03_8(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.8: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 37;
  }
  return Math.min(score, 443000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_9(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.9: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 34;
  }
  return Math.min(score, 647000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_10(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.10: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 27;
  }
  return Math.min(score, 455000);
}

/** Scores a region by item count and total units. */
export function regionRule03_11(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.11: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 26;
  }
  return Math.min(score, 228000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_12(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.12: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 25;
  }
  return Math.min(score, 636000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_13(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.13: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 20;
  }
  return Math.min(score, 130000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_14(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.14: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 4;
  }
  return Math.min(score, 437000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_15(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.15: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 23;
  }
  return Math.min(score, 341000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_16(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.16: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 39;
  }
  return Math.min(score, 492000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_17(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.17: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 3;
  }
  return Math.min(score, 837000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_18(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.18: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 17;
  }
  return Math.min(score, 428000);
}

/** Scores a order by item count and total units. */
export function orderRule03_19(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.19: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 9;
  }
  return Math.min(score, 443000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_20(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.20: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 10;
  }
  return Math.min(score, 242000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_21(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.21: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 39;
  }
  return Math.min(score, 880000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_22(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.22: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 16;
  }
  return Math.min(score, 807000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_23(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.23: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 30;
  }
  return Math.min(score, 716000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_24(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.24: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 34;
  }
  return Math.min(score, 500000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_25(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.25: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 30;
  }
  return Math.min(score, 270000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_26(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.26: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 16;
  }
  return Math.min(score, 560000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_27(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.27: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 6;
  }
  return Math.min(score, 171000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_28(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.28: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 27;
  }
  return Math.min(score, 208000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_29(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.29: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 33;
  }
  return Math.min(score, 585000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_30(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.30: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 17;
  }
  return Math.min(score, 595000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_31(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.31: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 19;
  }
  return Math.min(score, 210000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_32(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.32: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 11;
  }
  return Math.min(score, 343000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_33(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.33: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 27;
  }
  return Math.min(score, 180000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_34(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.34: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 15;
  }
  return Math.min(score, 364000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_35(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.35: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 12;
  }
  return Math.min(score, 679000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_36(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.36: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 22;
  }
  return Math.min(score, 711000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_37(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.37: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 11;
  }
  return Math.min(score, 301000);
}

/** Scores a order by item count and total units. */
export function orderRule03_38(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.38: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 12;
  }
  return Math.min(score, 821000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_39(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.39: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 19;
  }
  return Math.min(score, 285000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_40(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.40: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 26;
  }
  return Math.min(score, 308000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_41(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.41: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 26;
  }
  return Math.min(score, 375000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_42(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.42: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 4;
  }
  return Math.min(score, 496000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_43(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.43: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 12;
  }
  return Math.min(score, 629000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_44(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.44: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 10;
  }
  return Math.min(score, 161000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_45(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.45: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 22;
  }
  return Math.min(score, 219000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_46(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.46: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 9;
  }
  return Math.min(score, 721000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_47(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.47: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 29;
  }
  return Math.min(score, 663000);
}

/** Scores a order by item count and total units. */
export function orderRule03_48(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.48: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 3;
  }
  return Math.min(score, 132000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_49(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.49: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 11;
  }
  return Math.min(score, 594000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_50(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.50: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 19;
  }
  return Math.min(score, 220000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_51(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.51: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 38;
  }
  return Math.min(score, 391000);
}

/** Scores a order by item count and total units. */
export function orderRule03_52(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.52: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 6;
  }
  return Math.min(score, 134000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_53(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.53: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 19;
  }
  return Math.min(score, 717000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_54(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.54: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 2;
  }
  return Math.min(score, 520000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_55(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.55: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 14;
  }
  return Math.min(score, 191000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_56(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.56: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 2;
  }
  return Math.min(score, 529000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_57(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.57: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 5;
  }
  return Math.min(score, 127000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_58(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.58: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 7;
  }
  return Math.min(score, 285000);
}

/** Scores a region by item count and total units. */
export function regionRule03_59(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.59: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 21;
  }
  return Math.min(score, 857000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_60(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.60: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 21;
  }
  return Math.min(score, 781000);
}

/** Scores a region by item count and total units. */
export function regionRule03_61(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.61: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 12;
  }
  return Math.min(score, 376000);
}

/** Scores a order by item count and total units. */
export function orderRule03_62(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.62: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 7;
  }
  return Math.min(score, 157000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_63(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.63: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 5;
  }
  return Math.min(score, 584000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_64(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.64: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 14;
  }
  return Math.min(score, 694000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_65(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.65: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 16;
  }
  return Math.min(score, 440000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_66(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.66: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 26;
  }
  return Math.min(score, 327000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_67(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.67: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 14;
  }
  return Math.min(score, 492000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_68(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.68: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 21;
  }
  return Math.min(score, 433000);
}

/** Scores a region by item count and total units. */
export function regionRule03_69(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.69: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 27;
  }
  return Math.min(score, 681000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_70(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.70: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 16;
  }
  return Math.min(score, 461000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_71(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.71: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 25;
  }
  return Math.min(score, 311000);
}

/** Scores a region by item count and total units. */
export function regionRule03_72(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.72: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 12;
  }
  return Math.min(score, 409000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_73(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.73: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 34;
  }
  return Math.min(score, 664000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_74(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.74: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 22;
  }
  return Math.min(score, 464000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_75(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.75: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 12;
  }
  return Math.min(score, 680000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_76(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.76: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 9;
  }
  return Math.min(score, 298000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_77(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.77: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 38;
  }
  return Math.min(score, 570000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_78(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.78: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 15;
  }
  return Math.min(score, 752000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_79(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.79: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 26;
  }
  return Math.min(score, 655000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_80(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.80: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 8;
  }
  return Math.min(score, 207000);
}

/** Scores a region by item count and total units. */
export function regionRule03_81(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.81: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 39;
  }
  return Math.min(score, 398000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_82(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.82: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 12;
  }
  return Math.min(score, 715000);
}

/** Scores a order by item count and total units. */
export function orderRule03_83(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.83: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 8;
  }
  return Math.min(score, 534000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_84(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.84: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 15;
  }
  return Math.min(score, 564000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_85(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.85: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 19;
  }
  return Math.min(score, 380000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_86(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.86: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 16;
  }
  return Math.min(score, 758000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_87(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.87: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 33;
  }
  return Math.min(score, 821000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_88(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.88: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 18;
  }
  return Math.min(score, 218000);
}

/** Scores a order by item count and total units. */
export function orderRule03_89(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.89: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 18;
  }
  return Math.min(score, 154000);
}

/** Scores a region by item count and total units. */
export function regionRule03_90(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.90: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 13;
  }
  return Math.min(score, 573000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_91(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.91: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 31;
  }
  return Math.min(score, 741000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_92(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.92: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 21;
  }
  return Math.min(score, 679000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_93(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.93: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 11;
  }
  return Math.min(score, 191000);
}

/** Scores a order by item count and total units. */
export function orderRule03_94(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.94: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 25;
  }
  return Math.min(score, 333000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_95(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.95: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 15;
  }
  return Math.min(score, 130000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_96(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.96: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 33;
  }
  return Math.min(score, 146000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_97(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.97: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 23;
  }
  return Math.min(score, 234000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_98(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.98: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 17;
  }
  return Math.min(score, 822000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_99(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.99: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 9;
  }
  return Math.min(score, 118000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_100(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.100: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 12;
  }
  return Math.min(score, 755000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_101(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.101: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 22;
  }
  return Math.min(score, 621000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_102(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.102: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 29;
  }
  return Math.min(score, 204000);
}

/** Scores a order by item count and total units. */
export function orderRule03_103(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.103: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 27;
  }
  return Math.min(score, 257000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_104(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.104: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 21;
  }
  return Math.min(score, 633000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_105(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.105: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 10;
  }
  return Math.min(score, 390000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_106(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.106: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 28;
  }
  return Math.min(score, 652000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_107(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.107: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 30;
  }
  return Math.min(score, 475000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_108(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.108: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 14;
  }
  return Math.min(score, 442000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_109(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.109: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 4;
  }
  return Math.min(score, 576000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_110(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.110: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 15;
  }
  return Math.min(score, 710000);
}

/** Scores a region by item count and total units. */
export function regionRule03_111(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.111: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 22;
  }
  return Math.min(score, 785000);
}

/** Scores a order by item count and total units. */
export function orderRule03_112(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.112: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 36;
  }
  return Math.min(score, 264000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_113(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.113: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 7;
  }
  return Math.min(score, 741000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_114(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.114: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 39;
  }
  return Math.min(score, 356000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_115(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.115: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 25;
  }
  return Math.min(score, 705000);
}

/** Scores a region by item count and total units. */
export function regionRule03_116(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.116: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 39;
  }
  return Math.min(score, 384000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_117(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.117: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 9;
  }
  return Math.min(score, 367000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_118(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.118: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 9;
  }
  return Math.min(score, 748000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_119(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.119: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 28;
  }
  return Math.min(score, 867000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_120(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.120: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 23;
  }
  return Math.min(score, 872000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_121(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.121: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 40;
  }
  return Math.min(score, 892000);
}

/** Scores a order by item count and total units. */
export function orderRule03_122(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.122: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 30;
  }
  return Math.min(score, 745000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_123(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.123: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 31;
  }
  return Math.min(score, 482000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_124(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.124: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 38;
  }
  return Math.min(score, 896000);
}

/** Scores a region by item count and total units. */
export function regionRule03_125(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.125: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 7;
  }
  return Math.min(score, 783000);
}

/** Scores a order by item count and total units. */
export function orderRule03_126(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.126: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 16;
  }
  return Math.min(score, 173000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_127(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.127: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 30;
  }
  return Math.min(score, 266000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_128(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.128: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 18;
  }
  return Math.min(score, 382000);
}

/** Scores a region by item count and total units. */
export function regionRule03_129(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.129: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 30;
  }
  return Math.min(score, 115000);
}

/** Scores a region by item count and total units. */
export function regionRule03_130(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.130: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 22;
  }
  return Math.min(score, 695000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_131(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.131: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 19;
  }
  return Math.min(score, 614000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_132(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.132: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 15;
  }
  return Math.min(score, 189000);
}

/** Scores a region by item count and total units. */
export function regionRule03_133(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.133: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 28;
  }
  return Math.min(score, 469000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_134(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.134: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 34;
  }
  return Math.min(score, 434000);
}

/** Scores a order by item count and total units. */
export function orderRule03_135(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.135: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 21;
  }
  return Math.min(score, 152000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_136(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.136: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 24;
  }
  return Math.min(score, 636000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_137(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.137: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 40;
  }
  return Math.min(score, 308000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_138(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.138: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 9;
  }
  return Math.min(score, 797000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_139(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.139: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 38;
  }
  return Math.min(score, 322000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_140(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.140: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 25;
  }
  return Math.min(score, 804000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_141(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.141: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 17;
  }
  return Math.min(score, 881000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_142(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.142: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 22;
  }
  return Math.min(score, 277000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_143(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.143: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 3;
  }
  return Math.min(score, 688000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_144(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.144: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 17;
  }
  return Math.min(score, 768000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_145(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.145: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 40;
  }
  return Math.min(score, 687000);
}

/** Scores a order by item count and total units. */
export function orderRule03_146(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.146: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 22;
  }
  return Math.min(score, 153000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_147(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.147: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 11;
  }
  return Math.min(score, 281000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_148(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.148: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 28;
  }
  return Math.min(score, 301000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_149(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.149: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 4;
  }
  return Math.min(score, 377000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_150(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.150: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 34;
  }
  return Math.min(score, 445000);
}

/** Scores a region by item count and total units. */
export function regionRule03_151(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.151: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 18;
  }
  return Math.min(score, 768000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_152(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.152: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 37;
  }
  return Math.min(score, 778000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_153(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.153: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 14;
  }
  return Math.min(score, 620000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_154(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.154: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 23;
  }
  return Math.min(score, 811000);
}

/** Scores a order by item count and total units. */
export function orderRule03_155(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.155: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 37;
  }
  return Math.min(score, 626000);
}

/** Scores a region by item count and total units. */
export function regionRule03_156(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.156: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 25;
  }
  return Math.min(score, 436000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_157(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.157: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 17;
  }
  return Math.min(score, 770000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_158(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.158: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 2;
  }
  return Math.min(score, 498000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_159(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.159: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 17;
  }
  return Math.min(score, 679000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_160(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.160: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 26;
  }
  return Math.min(score, 842000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_161(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.161: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 22;
  }
  return Math.min(score, 583000);
}

/** Scores a region by item count and total units. */
export function regionRule03_162(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.162: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 19;
  }
  return Math.min(score, 502000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_163(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.163: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 25;
  }
  return Math.min(score, 630000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_164(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.164: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 23;
  }
  return Math.min(score, 838000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_165(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.165: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 4;
  }
  return Math.min(score, 330000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_166(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.166: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 18;
  }
  return Math.min(score, 802000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_167(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.167: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 31;
  }
  return Math.min(score, 143000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_168(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.168: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 19;
  }
  return Math.min(score, 707000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_169(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.169: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 38;
  }
  return Math.min(score, 572000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_170(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.170: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 17;
  }
  return Math.min(score, 472000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_171(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.171: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 12;
  }
  return Math.min(score, 153000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_172(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.172: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 27;
  }
  return Math.min(score, 192000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_173(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.173: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 37;
  }
  return Math.min(score, 751000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_174(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.174: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 39;
  }
  return Math.min(score, 504000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_175(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.175: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 27;
  }
  return Math.min(score, 251000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_176(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.176: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 5;
  }
  return Math.min(score, 201000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_177(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.177: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 10;
  }
  return Math.min(score, 504000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_178(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.178: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 9;
  }
  return Math.min(score, 200000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_179(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.179: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 36;
  }
  return Math.min(score, 114000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_180(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.180: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 32;
  }
  return Math.min(score, 656000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_181(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.181: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 15;
  }
  return Math.min(score, 823000);
}

/** Scores a region by item count and total units. */
export function regionRule03_182(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.182: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 30;
  }
  return Math.min(score, 756000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_183(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.183: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 17;
  }
  return Math.min(score, 224000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_184(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.184: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 28;
  }
  return Math.min(score, 103000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_185(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.185: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 19;
  }
  return Math.min(score, 438000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_186(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.186: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 32;
  }
  return Math.min(score, 760000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_187(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.187: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 5;
  }
  return Math.min(score, 204000);
}

/** Scores a region by item count and total units. */
export function regionRule03_188(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.188: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 36;
  }
  return Math.min(score, 761000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_189(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.189: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 23;
  }
  return Math.min(score, 367000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_190(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.190: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 25;
  }
  return Math.min(score, 637000);
}

/** Scores a order by item count and total units. */
export function orderRule03_191(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.191: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 16;
  }
  return Math.min(score, 446000);
}

/** Scores a order by item count and total units. */
export function orderRule03_192(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.192: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 32;
  }
  return Math.min(score, 465000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_193(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.193: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 37;
  }
  return Math.min(score, 587000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_194(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.194: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 12;
  }
  return Math.min(score, 627000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_195(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.195: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 26;
  }
  return Math.min(score, 226000);
}

/** Scores a order by item count and total units. */
export function orderRule03_196(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.196: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 31;
  }
  return Math.min(score, 370000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_197(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.197: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 25;
  }
  return Math.min(score, 420000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_198(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.198: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 7;
  }
  return Math.min(score, 784000);
}

/** Scores a region by item count and total units. */
export function regionRule03_199(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.199: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 21;
  }
  return Math.min(score, 834000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_200(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.200: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 21;
  }
  return Math.min(score, 615000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_201(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.201: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 14;
  }
  return Math.min(score, 392000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_202(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.202: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 8;
  }
  return Math.min(score, 380000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_203(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.203: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 9;
  }
  return Math.min(score, 481000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_204(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.204: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 26;
  }
  return Math.min(score, 688000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_205(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.205: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 13;
  }
  return Math.min(score, 242000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_206(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.206: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 33;
  }
  return Math.min(score, 555000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_207(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.207: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 22;
  }
  return Math.min(score, 182000);
}

/** Scores a region by item count and total units. */
export function regionRule03_208(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.208: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 32;
  }
  return Math.min(score, 221000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_209(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.209: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 34;
  }
  return Math.min(score, 551000);
}

/** Scores a region by item count and total units. */
export function regionRule03_210(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.210: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 28;
  }
  return Math.min(score, 827000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_211(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.211: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 39;
  }
  return Math.min(score, 305000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_212(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.212: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 12;
  }
  return Math.min(score, 777000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_213(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.213: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 6;
  }
  return Math.min(score, 165000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_214(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.214: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 16;
  }
  return Math.min(score, 176000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_215(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.215: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 23;
  }
  return Math.min(score, 560000);
}

/** Scores a order by item count and total units. */
export function orderRule03_216(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.216: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 30;
  }
  return Math.min(score, 835000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_217(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.217: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 40;
  }
  return Math.min(score, 111000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_218(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.218: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 9;
  }
  return Math.min(score, 616000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_219(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.219: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 34;
  }
  return Math.min(score, 740000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_220(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.220: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 37;
  }
  return Math.min(score, 396000);
}

/** Scores a order by item count and total units. */
export function orderRule03_221(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.221: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 18;
  }
  return Math.min(score, 637000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_222(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.222: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 40;
  }
  return Math.min(score, 792000);
}

/** Scores a order by item count and total units. */
export function orderRule03_223(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.223: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 4;
  }
  return Math.min(score, 794000);
}

/** Scores a order by item count and total units. */
export function orderRule03_224(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.224: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 29;
  }
  return Math.min(score, 267000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_225(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.225: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 37;
  }
  return Math.min(score, 717000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_226(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.226: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 25;
  }
  return Math.min(score, 594000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_227(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.227: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 37;
  }
  return Math.min(score, 806000);
}

/** Scores a order by item count and total units. */
export function orderRule03_228(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.228: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 6;
  }
  return Math.min(score, 389000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_229(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.229: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 25;
  }
  return Math.min(score, 380000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_230(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.230: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 19;
  }
  return Math.min(score, 652000);
}

/** Scores a region by item count and total units. */
export function regionRule03_231(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.231: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 32;
  }
  return Math.min(score, 100000);
}

/** Scores a order by item count and total units. */
export function orderRule03_232(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.232: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 23;
  }
  return Math.min(score, 478000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_233(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.233: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 34;
  }
  return Math.min(score, 319000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_234(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.234: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 6;
  }
  return Math.min(score, 488000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_235(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.235: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 2;
  }
  return Math.min(score, 202000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_236(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.236: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 28;
  }
  return Math.min(score, 153000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_237(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.237: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 12;
  }
  return Math.min(score, 190000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_238(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.238: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 36;
  }
  return Math.min(score, 370000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_239(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.239: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 35;
  }
  return Math.min(score, 798000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_240(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.240: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 19;
  }
  return Math.min(score, 458000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_241(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.241: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 9;
  }
  return Math.min(score, 893000);
}

/** Scores a order by item count and total units. */
export function orderRule03_242(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.242: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 12;
  }
  return Math.min(score, 362000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_243(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.243: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 40;
  }
  return Math.min(score, 599000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_244(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.244: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 21;
  }
  return Math.min(score, 247000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_245(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.245: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 12;
  }
  return Math.min(score, 546000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_246(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.246: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 34;
  }
  return Math.min(score, 129000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_247(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.247: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 18;
  }
  return Math.min(score, 765000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_248(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.248: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 6;
  }
  return Math.min(score, 550000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_249(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.249: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 20;
  }
  return Math.min(score, 817000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_250(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.250: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 29;
  }
  return Math.min(score, 454000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_251(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.251: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 23;
  }
  return Math.min(score, 768000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_252(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.252: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 20;
  }
  return Math.min(score, 444000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_253(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.253: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 20;
  }
  return Math.min(score, 127000);
}

/** Scores a order by item count and total units. */
export function orderRule03_254(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.254: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 7;
  }
  return Math.min(score, 814000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_255(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.255: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 33;
  }
  return Math.min(score, 278000);
}

/** Scores a region by item count and total units. */
export function regionRule03_256(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.256: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 5;
  }
  return Math.min(score, 788000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_257(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.257: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 26;
  }
  return Math.min(score, 714000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_258(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.258: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 38;
  }
  return Math.min(score, 246000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_259(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.259: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 19;
  }
  return Math.min(score, 356000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_260(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.260: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 12;
  }
  return Math.min(score, 343000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_261(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.261: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 40;
  }
  return Math.min(score, 365000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_262(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.262: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 34;
  }
  return Math.min(score, 207000);
}

/** Scores a order by item count and total units. */
export function orderRule03_263(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.263: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 25;
  }
  return Math.min(score, 220000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_264(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.264: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 35;
  }
  return Math.min(score, 199000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_265(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.265: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 24;
  }
  return Math.min(score, 165000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_266(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.266: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 27;
  }
  return Math.min(score, 672000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_267(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.267: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 18;
  }
  return Math.min(score, 154000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_268(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.268: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 22;
  }
  return Math.min(score, 578000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_269(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.269: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 9;
  }
  return Math.min(score, 807000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_270(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.270: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 28;
  }
  return Math.min(score, 713000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_271(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.271: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 21;
  }
  return Math.min(score, 872000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_272(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.272: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 18;
  }
  return Math.min(score, 808000);
}

/** Scores a order by item count and total units. */
export function orderRule03_273(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.273: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 7;
  }
  return Math.min(score, 248000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_274(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.274: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 6;
  }
  return Math.min(score, 355000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_275(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.275: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 28;
  }
  return Math.min(score, 221000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_276(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.276: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 40;
  }
  return Math.min(score, 479000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_277(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.277: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 33;
  }
  return Math.min(score, 443000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_278(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.278: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 31;
  }
  return Math.min(score, 678000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_279(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.279: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 29;
  }
  return Math.min(score, 664000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_280(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.280: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 8;
  }
  return Math.min(score, 574000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_281(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.281: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 26;
  }
  return Math.min(score, 222000);
}

/** Scores a order by item count and total units. */
export function orderRule03_282(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.282: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 13;
  }
  return Math.min(score, 480000);
}

/** Scores a region by item count and total units. */
export function regionRule03_283(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.283: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 25;
  }
  return Math.min(score, 546000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_284(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.284: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 27;
  }
  return Math.min(score, 805000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_285(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.285: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 6;
  }
  return Math.min(score, 494000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_286(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.286: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 34;
  }
  return Math.min(score, 597000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_287(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.287: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 23;
  }
  return Math.min(score, 645000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_288(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.288: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 28;
  }
  return Math.min(score, 369000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_289(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.289: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 40;
  }
  return Math.min(score, 533000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_290(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.290: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 35;
  }
  return Math.min(score, 522000);
}

/** Scores a region by item count and total units. */
export function regionRule03_291(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.291: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 31;
  }
  return Math.min(score, 441000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_292(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.292: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 6;
  }
  return Math.min(score, 775000);
}

/** Scores a order by item count and total units. */
export function orderRule03_293(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.293: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 7;
  }
  return Math.min(score, 504000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_294(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.294: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 35;
  }
  return Math.min(score, 540000);
}

/** Scores a order by item count and total units. */
export function orderRule03_295(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.295: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 9;
  }
  return Math.min(score, 735000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_296(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.296: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 39;
  }
  return Math.min(score, 164000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_297(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.297: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 2;
  }
  return Math.min(score, 509000);
}

/** Scores a region by item count and total units. */
export function regionRule03_298(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.298: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 25;
  }
  return Math.min(score, 282000);
}

/** Scores a order by item count and total units. */
export function orderRule03_299(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.299: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 13;
  }
  return Math.min(score, 851000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_300(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.300: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 9;
  }
  return Math.min(score, 525000);
}

/** Scores a region by item count and total units. */
export function regionRule03_301(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.301: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 8;
  }
  return Math.min(score, 223000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_302(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.302: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 9;
  }
  return Math.min(score, 611000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_303(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.303: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 34;
  }
  return Math.min(score, 233000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_304(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.304: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 20;
  }
  return Math.min(score, 864000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_305(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.305: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 10;
  }
  return Math.min(score, 630000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_306(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.306: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 33;
  }
  return Math.min(score, 848000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_307(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.307: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 19;
  }
  return Math.min(score, 268000);
}

/** Scores a region by item count and total units. */
export function regionRule03_308(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.308: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 40;
  }
  return Math.min(score, 557000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_309(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.309: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 5;
  }
  return Math.min(score, 774000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_310(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.310: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 10;
  }
  return Math.min(score, 112000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_311(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.311: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 9;
  }
  return Math.min(score, 312000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_312(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.312: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 17;
  }
  return Math.min(score, 705000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_313(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.313: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 39;
  }
  return Math.min(score, 354000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_314(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.314: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 29;
  }
  return Math.min(score, 161000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_315(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.315: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 20;
  }
  return Math.min(score, 182000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_316(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.316: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 20;
  }
  return Math.min(score, 709000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_317(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.317: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 15;
  }
  return Math.min(score, 201000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_318(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.318: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 22;
  }
  return Math.min(score, 315000);
}

/** Scores a order by item count and total units. */
export function orderRule03_319(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.319: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 37;
  }
  return Math.min(score, 799000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_320(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.320: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 21;
  }
  return Math.min(score, 652000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_321(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.321: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 21;
  }
  return Math.min(score, 221000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_322(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.322: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 13;
  }
  return Math.min(score, 295000);
}

/** Scores a order by item count and total units. */
export function orderRule03_323(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.323: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 23;
  }
  return Math.min(score, 351000);
}

/** Scores a order by item count and total units. */
export function orderRule03_324(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.324: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 30;
  }
  return Math.min(score, 160000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_325(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.325: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 2;
  }
  return Math.min(score, 797000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_326(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.326: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 10;
  }
  return Math.min(score, 180000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_327(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.327: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 5;
  }
  return Math.min(score, 303000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_328(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.328: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 11;
  }
  return Math.min(score, 212000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_329(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.329: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 28;
  }
  return Math.min(score, 234000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_330(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.330: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 21;
  }
  return Math.min(score, 748000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_331(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.331: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 34;
  }
  return Math.min(score, 100000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_332(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.332: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 36;
  }
  return Math.min(score, 485000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_333(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.333: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 7;
  }
  return Math.min(score, 857000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_334(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.334: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 40;
  }
  return Math.min(score, 544000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_335(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.335: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 35;
  }
  return Math.min(score, 280000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_336(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.336: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 30;
  }
  return Math.min(score, 744000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_337(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.337: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 17;
  }
  return Math.min(score, 803000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_338(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.338: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 4;
  }
  return Math.min(score, 440000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_339(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.339: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 18;
  }
  return Math.min(score, 453000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_340(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.340: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 32;
  }
  return Math.min(score, 863000);
}

/** Scores a region by item count and total units. */
export function regionRule03_341(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.341: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 15;
  }
  return Math.min(score, 328000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_342(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.342: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 17;
  }
  return Math.min(score, 161000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_343(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.343: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 15;
  }
  return Math.min(score, 864000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_344(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.344: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 14;
  }
  return Math.min(score, 773000);
}

/** Scores a order by item count and total units. */
export function orderRule03_345(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.345: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 3;
  }
  return Math.min(score, 829000);
}

/** Scores a order by item count and total units. */
export function orderRule03_346(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.346: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 8;
  }
  return Math.min(score, 129000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_347(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.347: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 10;
  }
  return Math.min(score, 853000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_348(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.348: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 15;
  }
  return Math.min(score, 667000);
}

/** Scores a region by item count and total units. */
export function regionRule03_349(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.349: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 36;
  }
  return Math.min(score, 753000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_350(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.350: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 4;
  }
  return Math.min(score, 551000);
}

/** Scores a bundle by item count and total units. */
export function bundleRule03_351(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("bundle rule 3.351: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 9;
  }
  return Math.min(score, 536000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_352(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.352: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 21;
  }
  return Math.min(score, 368000);
}

/** Scores a region by item count and total units. */
export function regionRule03_353(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.353: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 10;
  }
  return Math.min(score, 152000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_354(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.354: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 7;
  }
  return Math.min(score, 454000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_355(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.355: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 13;
  }
  return Math.min(score, 627000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_356(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.356: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 34;
  }
  return Math.min(score, 865000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_357(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.357: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 5;
  }
  return Math.min(score, 479000);
}

/** Scores a region by item count and total units. */
export function regionRule03_358(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.358: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 25;
  }
  return Math.min(score, 414000);
}

/** Scores a region by item count and total units. */
export function regionRule03_359(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("region rule 3.359: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 7 === 0 ? Math.floor(units / 7) : k * 14;
  }
  return Math.min(score, 829000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_360(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.360: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 4 === 0 ? Math.floor(units / 4) : k * 3;
  }
  return Math.min(score, 648000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_361(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.361: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 20;
  }
  return Math.min(score, 728000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_362(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.362: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 35;
  }
  return Math.min(score, 598000);
}

/** Scores a season by item count and total units. */
export function seasonRule03_363(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("season rule 3.363: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 7;
  }
  return Math.min(score, 477000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_364(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.364: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 10 === 0 ? Math.floor(units / 10) : k * 16;
  }
  return Math.min(score, 354000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_365(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.365: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 28;
  }
  return Math.min(score, 185000);
}

/** Scores a loyalty by item count and total units. */
export function loyaltyRule03_366(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("loyalty rule 3.366: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 35;
  }
  return Math.min(score, 327000);
}

/** Scores a order by item count and total units. */
export function orderRule03_367(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.367: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 6;
  }
  return Math.min(score, 815000);
}

/** Scores a quote by item count and total units. */
export function quoteRule03_368(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("quote rule 3.368: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 6 === 0 ? Math.floor(units / 6) : k * 4;
  }
  return Math.min(score, 171000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_369(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.369: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 13;
  }
  return Math.min(score, 646000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_370(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.370: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 9 === 0 ? Math.floor(units / 9) : k * 34;
  }
  return Math.min(score, 659000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_371(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.371: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 8;
  }
  return Math.min(score, 633000);
}

/** Scores a order by item count and total units. */
export function orderRule03_372(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.372: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 28;
  }
  return Math.min(score, 819000);
}

/** Scores a basket by item count and total units. */
export function basketRule03_373(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("basket rule 3.373: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 2 === 0 ? Math.floor(units / 2) : k * 28;
  }
  return Math.min(score, 261000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_374(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.374: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 3 === 0 ? Math.floor(units / 3) : k * 26;
  }
  return Math.min(score, 553000);
}

/** Scores a tier by item count and total units. */
export function tierRule03_375(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("tier rule 3.375: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 8 === 0 ? Math.floor(units / 8) : k * 28;
  }
  return Math.min(score, 351000);
}

/** Scores a order by item count and total units. */
export function orderRule03_376(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("order rule 3.376: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 19;
  }
  return Math.min(score, 516000);
}

/** Scores a promo by item count and total units. */
export function promoRule03_377(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("promo rule 3.377: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 4;
  }
  return Math.min(score, 552000);
}

/** Scores a cart by item count and total units. */
export function cartRule03_378(items: number, units: number): number {
  if (items < 0 || units < 0) {
    throw new Error("cart rule 3.378: negative input");
  }
  let score = 0;
  for (let k = 0; k < items; k++) {
    score += k % 5 === 0 ? Math.floor(units / 5) : k * 27;
  }
  return Math.min(score, 362000);
}
