// Package rules holds pricing rules that nothing calls yet.
package rules

import "fmt"

// BundleRule03_0 scores a bundle by item count and total units.
func BundleRule03_0(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.0: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 10)
		}
	}
	if score > 291000 {
		score = 291000
	}
	return score, nil
}

// OrderRule03_1 scores a order by item count and total units.
func OrderRule03_1(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.1: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 14)
		}
	}
	if score > 735000 {
		score = 735000
	}
	return score, nil
}

// OrderRule03_2 scores a order by item count and total units.
func OrderRule03_2(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.2: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 865000 {
		score = 865000
	}
	return score, nil
}

// RegionRule03_3 scores a region by item count and total units.
func RegionRule03_3(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.3: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 24)
		}
	}
	if score > 177000 {
		score = 177000
	}
	return score, nil
}

// TierRule03_4 scores a tier by item count and total units.
func TierRule03_4(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.4: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 19)
		}
	}
	if score > 317000 {
		score = 317000
	}
	return score, nil
}

// TierRule03_5 scores a tier by item count and total units.
func TierRule03_5(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.5: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 10)
		}
	}
	if score > 854000 {
		score = 854000
	}
	return score, nil
}

// PromoRule03_6 scores a promo by item count and total units.
func PromoRule03_6(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.6: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 18)
		}
	}
	if score > 211000 {
		score = 211000
	}
	return score, nil
}

// TierRule03_7 scores a tier by item count and total units.
func TierRule03_7(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.7: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 20)
		}
	}
	if score > 134000 {
		score = 134000
	}
	return score, nil
}

// RegionRule03_8 scores a region by item count and total units.
func RegionRule03_8(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.8: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 37)
		}
	}
	if score > 443000 {
		score = 443000
	}
	return score, nil
}

// SeasonRule03_9 scores a season by item count and total units.
func SeasonRule03_9(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.9: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 34)
		}
	}
	if score > 647000 {
		score = 647000
	}
	return score, nil
}

// LoyaltyRule03_10 scores a loyalty by item count and total units.
func LoyaltyRule03_10(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.10: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 455000 {
		score = 455000
	}
	return score, nil
}

// RegionRule03_11 scores a region by item count and total units.
func RegionRule03_11(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.11: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 26)
		}
	}
	if score > 228000 {
		score = 228000
	}
	return score, nil
}

// PromoRule03_12 scores a promo by item count and total units.
func PromoRule03_12(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.12: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 25)
		}
	}
	if score > 636000 {
		score = 636000
	}
	return score, nil
}

// TierRule03_13 scores a tier by item count and total units.
func TierRule03_13(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.13: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 20)
		}
	}
	if score > 130000 {
		score = 130000
	}
	return score, nil
}

// SeasonRule03_14 scores a season by item count and total units.
func SeasonRule03_14(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.14: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 4)
		}
	}
	if score > 437000 {
		score = 437000
	}
	return score, nil
}

// BasketRule03_15 scores a basket by item count and total units.
func BasketRule03_15(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.15: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 23)
		}
	}
	if score > 341000 {
		score = 341000
	}
	return score, nil
}

// BasketRule03_16 scores a basket by item count and total units.
func BasketRule03_16(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.16: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 39)
		}
	}
	if score > 492000 {
		score = 492000
	}
	return score, nil
}

// LoyaltyRule03_17 scores a loyalty by item count and total units.
func LoyaltyRule03_17(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.17: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 3)
		}
	}
	if score > 837000 {
		score = 837000
	}
	return score, nil
}

// CartRule03_18 scores a cart by item count and total units.
func CartRule03_18(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.18: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 17)
		}
	}
	if score > 428000 {
		score = 428000
	}
	return score, nil
}

// OrderRule03_19 scores a order by item count and total units.
func OrderRule03_19(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.19: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 9)
		}
	}
	if score > 443000 {
		score = 443000
	}
	return score, nil
}

// QuoteRule03_20 scores a quote by item count and total units.
func QuoteRule03_20(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.20: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 242000 {
		score = 242000
	}
	return score, nil
}

// QuoteRule03_21 scores a quote by item count and total units.
func QuoteRule03_21(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.21: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 39)
		}
	}
	if score > 880000 {
		score = 880000
	}
	return score, nil
}

// BasketRule03_22 scores a basket by item count and total units.
func BasketRule03_22(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.22: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 16)
		}
	}
	if score > 807000 {
		score = 807000
	}
	return score, nil
}

// BundleRule03_23 scores a bundle by item count and total units.
func BundleRule03_23(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.23: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 30)
		}
	}
	if score > 716000 {
		score = 716000
	}
	return score, nil
}

// SeasonRule03_24 scores a season by item count and total units.
func SeasonRule03_24(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.24: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 34)
		}
	}
	if score > 500000 {
		score = 500000
	}
	return score, nil
}

// TierRule03_25 scores a tier by item count and total units.
func TierRule03_25(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.25: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 30)
		}
	}
	if score > 270000 {
		score = 270000
	}
	return score, nil
}

// QuoteRule03_26 scores a quote by item count and total units.
func QuoteRule03_26(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.26: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 16)
		}
	}
	if score > 560000 {
		score = 560000
	}
	return score, nil
}

// TierRule03_27 scores a tier by item count and total units.
func TierRule03_27(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.27: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 6)
		}
	}
	if score > 171000 {
		score = 171000
	}
	return score, nil
}

// SeasonRule03_28 scores a season by item count and total units.
func SeasonRule03_28(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.28: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 27)
		}
	}
	if score > 208000 {
		score = 208000
	}
	return score, nil
}

// BundleRule03_29 scores a bundle by item count and total units.
func BundleRule03_29(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.29: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 33)
		}
	}
	if score > 585000 {
		score = 585000
	}
	return score, nil
}

// LoyaltyRule03_30 scores a loyalty by item count and total units.
func LoyaltyRule03_30(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.30: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 17)
		}
	}
	if score > 595000 {
		score = 595000
	}
	return score, nil
}

// QuoteRule03_31 scores a quote by item count and total units.
func QuoteRule03_31(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.31: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 19)
		}
	}
	if score > 210000 {
		score = 210000
	}
	return score, nil
}

// BasketRule03_32 scores a basket by item count and total units.
func BasketRule03_32(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.32: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 11)
		}
	}
	if score > 343000 {
		score = 343000
	}
	return score, nil
}

// QuoteRule03_33 scores a quote by item count and total units.
func QuoteRule03_33(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.33: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 27)
		}
	}
	if score > 180000 {
		score = 180000
	}
	return score, nil
}

// QuoteRule03_34 scores a quote by item count and total units.
func QuoteRule03_34(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.34: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 15)
		}
	}
	if score > 364000 {
		score = 364000
	}
	return score, nil
}

// TierRule03_35 scores a tier by item count and total units.
func TierRule03_35(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.35: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 12)
		}
	}
	if score > 679000 {
		score = 679000
	}
	return score, nil
}

// BundleRule03_36 scores a bundle by item count and total units.
func BundleRule03_36(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.36: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 22)
		}
	}
	if score > 711000 {
		score = 711000
	}
	return score, nil
}

// SeasonRule03_37 scores a season by item count and total units.
func SeasonRule03_37(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.37: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 11)
		}
	}
	if score > 301000 {
		score = 301000
	}
	return score, nil
}

// OrderRule03_38 scores a order by item count and total units.
func OrderRule03_38(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.38: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 12)
		}
	}
	if score > 821000 {
		score = 821000
	}
	return score, nil
}

// BundleRule03_39 scores a bundle by item count and total units.
func BundleRule03_39(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.39: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 19)
		}
	}
	if score > 285000 {
		score = 285000
	}
	return score, nil
}

// TierRule03_40 scores a tier by item count and total units.
func TierRule03_40(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.40: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 26)
		}
	}
	if score > 308000 {
		score = 308000
	}
	return score, nil
}

// BundleRule03_41 scores a bundle by item count and total units.
func BundleRule03_41(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.41: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 26)
		}
	}
	if score > 375000 {
		score = 375000
	}
	return score, nil
}

// PromoRule03_42 scores a promo by item count and total units.
func PromoRule03_42(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.42: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 4)
		}
	}
	if score > 496000 {
		score = 496000
	}
	return score, nil
}

// PromoRule03_43 scores a promo by item count and total units.
func PromoRule03_43(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.43: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 12)
		}
	}
	if score > 629000 {
		score = 629000
	}
	return score, nil
}

// LoyaltyRule03_44 scores a loyalty by item count and total units.
func LoyaltyRule03_44(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.44: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 10)
		}
	}
	if score > 161000 {
		score = 161000
	}
	return score, nil
}

// SeasonRule03_45 scores a season by item count and total units.
func SeasonRule03_45(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.45: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 22)
		}
	}
	if score > 219000 {
		score = 219000
	}
	return score, nil
}

// CartRule03_46 scores a cart by item count and total units.
func CartRule03_46(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.46: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 9)
		}
	}
	if score > 721000 {
		score = 721000
	}
	return score, nil
}

// PromoRule03_47 scores a promo by item count and total units.
func PromoRule03_47(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.47: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 29)
		}
	}
	if score > 663000 {
		score = 663000
	}
	return score, nil
}

// OrderRule03_48 scores a order by item count and total units.
func OrderRule03_48(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.48: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 3)
		}
	}
	if score > 132000 {
		score = 132000
	}
	return score, nil
}

// LoyaltyRule03_49 scores a loyalty by item count and total units.
func LoyaltyRule03_49(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.49: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 11)
		}
	}
	if score > 594000 {
		score = 594000
	}
	return score, nil
}

// QuoteRule03_50 scores a quote by item count and total units.
func QuoteRule03_50(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.50: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 19)
		}
	}
	if score > 220000 {
		score = 220000
	}
	return score, nil
}

// TierRule03_51 scores a tier by item count and total units.
func TierRule03_51(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.51: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 38)
		}
	}
	if score > 391000 {
		score = 391000
	}
	return score, nil
}

// OrderRule03_52 scores a order by item count and total units.
func OrderRule03_52(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.52: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 6)
		}
	}
	if score > 134000 {
		score = 134000
	}
	return score, nil
}

// BasketRule03_53 scores a basket by item count and total units.
func BasketRule03_53(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.53: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 19)
		}
	}
	if score > 717000 {
		score = 717000
	}
	return score, nil
}

// BundleRule03_54 scores a bundle by item count and total units.
func BundleRule03_54(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.54: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 2)
		}
	}
	if score > 520000 {
		score = 520000
	}
	return score, nil
}

// PromoRule03_55 scores a promo by item count and total units.
func PromoRule03_55(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.55: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 14)
		}
	}
	if score > 191000 {
		score = 191000
	}
	return score, nil
}

// TierRule03_56 scores a tier by item count and total units.
func TierRule03_56(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.56: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 2)
		}
	}
	if score > 529000 {
		score = 529000
	}
	return score, nil
}

// BundleRule03_57 scores a bundle by item count and total units.
func BundleRule03_57(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.57: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 5)
		}
	}
	if score > 127000 {
		score = 127000
	}
	return score, nil
}

// TierRule03_58 scores a tier by item count and total units.
func TierRule03_58(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.58: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 7)
		}
	}
	if score > 285000 {
		score = 285000
	}
	return score, nil
}

// RegionRule03_59 scores a region by item count and total units.
func RegionRule03_59(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.59: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 21)
		}
	}
	if score > 857000 {
		score = 857000
	}
	return score, nil
}

// CartRule03_60 scores a cart by item count and total units.
func CartRule03_60(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.60: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 21)
		}
	}
	if score > 781000 {
		score = 781000
	}
	return score, nil
}

// RegionRule03_61 scores a region by item count and total units.
func RegionRule03_61(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.61: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 12)
		}
	}
	if score > 376000 {
		score = 376000
	}
	return score, nil
}

// OrderRule03_62 scores a order by item count and total units.
func OrderRule03_62(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.62: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 7)
		}
	}
	if score > 157000 {
		score = 157000
	}
	return score, nil
}

// QuoteRule03_63 scores a quote by item count and total units.
func QuoteRule03_63(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.63: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 5)
		}
	}
	if score > 584000 {
		score = 584000
	}
	return score, nil
}

// LoyaltyRule03_64 scores a loyalty by item count and total units.
func LoyaltyRule03_64(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.64: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 14)
		}
	}
	if score > 694000 {
		score = 694000
	}
	return score, nil
}

// BundleRule03_65 scores a bundle by item count and total units.
func BundleRule03_65(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.65: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 16)
		}
	}
	if score > 440000 {
		score = 440000
	}
	return score, nil
}

// TierRule03_66 scores a tier by item count and total units.
func TierRule03_66(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.66: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 26)
		}
	}
	if score > 327000 {
		score = 327000
	}
	return score, nil
}

// LoyaltyRule03_67 scores a loyalty by item count and total units.
func LoyaltyRule03_67(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.67: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 14)
		}
	}
	if score > 492000 {
		score = 492000
	}
	return score, nil
}

// LoyaltyRule03_68 scores a loyalty by item count and total units.
func LoyaltyRule03_68(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.68: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 21)
		}
	}
	if score > 433000 {
		score = 433000
	}
	return score, nil
}

// RegionRule03_69 scores a region by item count and total units.
func RegionRule03_69(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.69: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 27)
		}
	}
	if score > 681000 {
		score = 681000
	}
	return score, nil
}

// BundleRule03_70 scores a bundle by item count and total units.
func BundleRule03_70(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.70: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 16)
		}
	}
	if score > 461000 {
		score = 461000
	}
	return score, nil
}

// BundleRule03_71 scores a bundle by item count and total units.
func BundleRule03_71(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.71: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 25)
		}
	}
	if score > 311000 {
		score = 311000
	}
	return score, nil
}

// RegionRule03_72 scores a region by item count and total units.
func RegionRule03_72(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.72: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 12)
		}
	}
	if score > 409000 {
		score = 409000
	}
	return score, nil
}

// QuoteRule03_73 scores a quote by item count and total units.
func QuoteRule03_73(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.73: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 34)
		}
	}
	if score > 664000 {
		score = 664000
	}
	return score, nil
}

// LoyaltyRule03_74 scores a loyalty by item count and total units.
func LoyaltyRule03_74(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.74: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 22)
		}
	}
	if score > 464000 {
		score = 464000
	}
	return score, nil
}

// CartRule03_75 scores a cart by item count and total units.
func CartRule03_75(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.75: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 12)
		}
	}
	if score > 680000 {
		score = 680000
	}
	return score, nil
}

// CartRule03_76 scores a cart by item count and total units.
func CartRule03_76(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.76: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 298000 {
		score = 298000
	}
	return score, nil
}

// BasketRule03_77 scores a basket by item count and total units.
func BasketRule03_77(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.77: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 38)
		}
	}
	if score > 570000 {
		score = 570000
	}
	return score, nil
}

// SeasonRule03_78 scores a season by item count and total units.
func SeasonRule03_78(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.78: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 15)
		}
	}
	if score > 752000 {
		score = 752000
	}
	return score, nil
}

// LoyaltyRule03_79 scores a loyalty by item count and total units.
func LoyaltyRule03_79(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.79: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 26)
		}
	}
	if score > 655000 {
		score = 655000
	}
	return score, nil
}

// QuoteRule03_80 scores a quote by item count and total units.
func QuoteRule03_80(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.80: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 8)
		}
	}
	if score > 207000 {
		score = 207000
	}
	return score, nil
}

// RegionRule03_81 scores a region by item count and total units.
func RegionRule03_81(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.81: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 39)
		}
	}
	if score > 398000 {
		score = 398000
	}
	return score, nil
}

// BasketRule03_82 scores a basket by item count and total units.
func BasketRule03_82(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.82: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 12)
		}
	}
	if score > 715000 {
		score = 715000
	}
	return score, nil
}

// OrderRule03_83 scores a order by item count and total units.
func OrderRule03_83(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.83: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 8)
		}
	}
	if score > 534000 {
		score = 534000
	}
	return score, nil
}

// LoyaltyRule03_84 scores a loyalty by item count and total units.
func LoyaltyRule03_84(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.84: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 15)
		}
	}
	if score > 564000 {
		score = 564000
	}
	return score, nil
}

// BasketRule03_85 scores a basket by item count and total units.
func BasketRule03_85(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.85: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 19)
		}
	}
	if score > 380000 {
		score = 380000
	}
	return score, nil
}

// BasketRule03_86 scores a basket by item count and total units.
func BasketRule03_86(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.86: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 16)
		}
	}
	if score > 758000 {
		score = 758000
	}
	return score, nil
}

// BasketRule03_87 scores a basket by item count and total units.
func BasketRule03_87(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.87: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 33)
		}
	}
	if score > 821000 {
		score = 821000
	}
	return score, nil
}

// QuoteRule03_88 scores a quote by item count and total units.
func QuoteRule03_88(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.88: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 18)
		}
	}
	if score > 218000 {
		score = 218000
	}
	return score, nil
}

// OrderRule03_89 scores a order by item count and total units.
func OrderRule03_89(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.89: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 18)
		}
	}
	if score > 154000 {
		score = 154000
	}
	return score, nil
}

// RegionRule03_90 scores a region by item count and total units.
func RegionRule03_90(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.90: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 13)
		}
	}
	if score > 573000 {
		score = 573000
	}
	return score, nil
}

// QuoteRule03_91 scores a quote by item count and total units.
func QuoteRule03_91(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.91: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 31)
		}
	}
	if score > 741000 {
		score = 741000
	}
	return score, nil
}

// SeasonRule03_92 scores a season by item count and total units.
func SeasonRule03_92(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.92: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 21)
		}
	}
	if score > 679000 {
		score = 679000
	}
	return score, nil
}

// BasketRule03_93 scores a basket by item count and total units.
func BasketRule03_93(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.93: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 11)
		}
	}
	if score > 191000 {
		score = 191000
	}
	return score, nil
}

// OrderRule03_94 scores a order by item count and total units.
func OrderRule03_94(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.94: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 25)
		}
	}
	if score > 333000 {
		score = 333000
	}
	return score, nil
}

// QuoteRule03_95 scores a quote by item count and total units.
func QuoteRule03_95(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.95: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 15)
		}
	}
	if score > 130000 {
		score = 130000
	}
	return score, nil
}

// SeasonRule03_96 scores a season by item count and total units.
func SeasonRule03_96(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.96: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 33)
		}
	}
	if score > 146000 {
		score = 146000
	}
	return score, nil
}

// PromoRule03_97 scores a promo by item count and total units.
func PromoRule03_97(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.97: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 23)
		}
	}
	if score > 234000 {
		score = 234000
	}
	return score, nil
}

// TierRule03_98 scores a tier by item count and total units.
func TierRule03_98(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.98: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 17)
		}
	}
	if score > 822000 {
		score = 822000
	}
	return score, nil
}

// BundleRule03_99 scores a bundle by item count and total units.
func BundleRule03_99(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.99: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 9)
		}
	}
	if score > 118000 {
		score = 118000
	}
	return score, nil
}

// BasketRule03_100 scores a basket by item count and total units.
func BasketRule03_100(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.100: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 12)
		}
	}
	if score > 755000 {
		score = 755000
	}
	return score, nil
}

// TierRule03_101 scores a tier by item count and total units.
func TierRule03_101(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.101: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 22)
		}
	}
	if score > 621000 {
		score = 621000
	}
	return score, nil
}

// LoyaltyRule03_102 scores a loyalty by item count and total units.
func LoyaltyRule03_102(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.102: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 29)
		}
	}
	if score > 204000 {
		score = 204000
	}
	return score, nil
}

// OrderRule03_103 scores a order by item count and total units.
func OrderRule03_103(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.103: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 27)
		}
	}
	if score > 257000 {
		score = 257000
	}
	return score, nil
}

// BundleRule03_104 scores a bundle by item count and total units.
func BundleRule03_104(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.104: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 21)
		}
	}
	if score > 633000 {
		score = 633000
	}
	return score, nil
}

// BasketRule03_105 scores a basket by item count and total units.
func BasketRule03_105(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.105: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 10)
		}
	}
	if score > 390000 {
		score = 390000
	}
	return score, nil
}

// BasketRule03_106 scores a basket by item count and total units.
func BasketRule03_106(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.106: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 28)
		}
	}
	if score > 652000 {
		score = 652000
	}
	return score, nil
}

// BasketRule03_107 scores a basket by item count and total units.
func BasketRule03_107(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.107: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 30)
		}
	}
	if score > 475000 {
		score = 475000
	}
	return score, nil
}

// BasketRule03_108 scores a basket by item count and total units.
func BasketRule03_108(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.108: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 14)
		}
	}
	if score > 442000 {
		score = 442000
	}
	return score, nil
}

// BundleRule03_109 scores a bundle by item count and total units.
func BundleRule03_109(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.109: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 4)
		}
	}
	if score > 576000 {
		score = 576000
	}
	return score, nil
}

// PromoRule03_110 scores a promo by item count and total units.
func PromoRule03_110(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.110: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 15)
		}
	}
	if score > 710000 {
		score = 710000
	}
	return score, nil
}

// RegionRule03_111 scores a region by item count and total units.
func RegionRule03_111(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.111: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 22)
		}
	}
	if score > 785000 {
		score = 785000
	}
	return score, nil
}

// OrderRule03_112 scores a order by item count and total units.
func OrderRule03_112(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.112: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 36)
		}
	}
	if score > 264000 {
		score = 264000
	}
	return score, nil
}

// PromoRule03_113 scores a promo by item count and total units.
func PromoRule03_113(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.113: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 7)
		}
	}
	if score > 741000 {
		score = 741000
	}
	return score, nil
}

// TierRule03_114 scores a tier by item count and total units.
func TierRule03_114(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.114: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 39)
		}
	}
	if score > 356000 {
		score = 356000
	}
	return score, nil
}

// BasketRule03_115 scores a basket by item count and total units.
func BasketRule03_115(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.115: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 25)
		}
	}
	if score > 705000 {
		score = 705000
	}
	return score, nil
}

// RegionRule03_116 scores a region by item count and total units.
func RegionRule03_116(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.116: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 39)
		}
	}
	if score > 384000 {
		score = 384000
	}
	return score, nil
}

// BasketRule03_117 scores a basket by item count and total units.
func BasketRule03_117(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.117: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 9)
		}
	}
	if score > 367000 {
		score = 367000
	}
	return score, nil
}

// TierRule03_118 scores a tier by item count and total units.
func TierRule03_118(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.118: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 9)
		}
	}
	if score > 748000 {
		score = 748000
	}
	return score, nil
}

// SeasonRule03_119 scores a season by item count and total units.
func SeasonRule03_119(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.119: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 28)
		}
	}
	if score > 867000 {
		score = 867000
	}
	return score, nil
}

// PromoRule03_120 scores a promo by item count and total units.
func PromoRule03_120(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.120: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 23)
		}
	}
	if score > 872000 {
		score = 872000
	}
	return score, nil
}

// TierRule03_121 scores a tier by item count and total units.
func TierRule03_121(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.121: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 40)
		}
	}
	if score > 892000 {
		score = 892000
	}
	return score, nil
}

// OrderRule03_122 scores a order by item count and total units.
func OrderRule03_122(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.122: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 745000 {
		score = 745000
	}
	return score, nil
}

// CartRule03_123 scores a cart by item count and total units.
func CartRule03_123(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.123: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 31)
		}
	}
	if score > 482000 {
		score = 482000
	}
	return score, nil
}

// BundleRule03_124 scores a bundle by item count and total units.
func BundleRule03_124(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.124: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 38)
		}
	}
	if score > 896000 {
		score = 896000
	}
	return score, nil
}

// RegionRule03_125 scores a region by item count and total units.
func RegionRule03_125(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.125: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 7)
		}
	}
	if score > 783000 {
		score = 783000
	}
	return score, nil
}

// OrderRule03_126 scores a order by item count and total units.
func OrderRule03_126(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.126: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 16)
		}
	}
	if score > 173000 {
		score = 173000
	}
	return score, nil
}

// TierRule03_127 scores a tier by item count and total units.
func TierRule03_127(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.127: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 30)
		}
	}
	if score > 266000 {
		score = 266000
	}
	return score, nil
}

// SeasonRule03_128 scores a season by item count and total units.
func SeasonRule03_128(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.128: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 18)
		}
	}
	if score > 382000 {
		score = 382000
	}
	return score, nil
}

// RegionRule03_129 scores a region by item count and total units.
func RegionRule03_129(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.129: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 30)
		}
	}
	if score > 115000 {
		score = 115000
	}
	return score, nil
}

// RegionRule03_130 scores a region by item count and total units.
func RegionRule03_130(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.130: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 22)
		}
	}
	if score > 695000 {
		score = 695000
	}
	return score, nil
}

// PromoRule03_131 scores a promo by item count and total units.
func PromoRule03_131(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.131: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 19)
		}
	}
	if score > 614000 {
		score = 614000
	}
	return score, nil
}

// QuoteRule03_132 scores a quote by item count and total units.
func QuoteRule03_132(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.132: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 15)
		}
	}
	if score > 189000 {
		score = 189000
	}
	return score, nil
}

// RegionRule03_133 scores a region by item count and total units.
func RegionRule03_133(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.133: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 28)
		}
	}
	if score > 469000 {
		score = 469000
	}
	return score, nil
}

// QuoteRule03_134 scores a quote by item count and total units.
func QuoteRule03_134(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.134: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 34)
		}
	}
	if score > 434000 {
		score = 434000
	}
	return score, nil
}

// OrderRule03_135 scores a order by item count and total units.
func OrderRule03_135(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.135: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 21)
		}
	}
	if score > 152000 {
		score = 152000
	}
	return score, nil
}

// BundleRule03_136 scores a bundle by item count and total units.
func BundleRule03_136(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.136: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 24)
		}
	}
	if score > 636000 {
		score = 636000
	}
	return score, nil
}

// BasketRule03_137 scores a basket by item count and total units.
func BasketRule03_137(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.137: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 40)
		}
	}
	if score > 308000 {
		score = 308000
	}
	return score, nil
}

// SeasonRule03_138 scores a season by item count and total units.
func SeasonRule03_138(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.138: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 9)
		}
	}
	if score > 797000 {
		score = 797000
	}
	return score, nil
}

// TierRule03_139 scores a tier by item count and total units.
func TierRule03_139(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.139: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 38)
		}
	}
	if score > 322000 {
		score = 322000
	}
	return score, nil
}

// TierRule03_140 scores a tier by item count and total units.
func TierRule03_140(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.140: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 25)
		}
	}
	if score > 804000 {
		score = 804000
	}
	return score, nil
}

// BasketRule03_141 scores a basket by item count and total units.
func BasketRule03_141(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.141: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 17)
		}
	}
	if score > 881000 {
		score = 881000
	}
	return score, nil
}

// QuoteRule03_142 scores a quote by item count and total units.
func QuoteRule03_142(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.142: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 22)
		}
	}
	if score > 277000 {
		score = 277000
	}
	return score, nil
}

// TierRule03_143 scores a tier by item count and total units.
func TierRule03_143(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.143: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 3)
		}
	}
	if score > 688000 {
		score = 688000
	}
	return score, nil
}

// LoyaltyRule03_144 scores a loyalty by item count and total units.
func LoyaltyRule03_144(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.144: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 17)
		}
	}
	if score > 768000 {
		score = 768000
	}
	return score, nil
}

// PromoRule03_145 scores a promo by item count and total units.
func PromoRule03_145(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.145: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 40)
		}
	}
	if score > 687000 {
		score = 687000
	}
	return score, nil
}

// OrderRule03_146 scores a order by item count and total units.
func OrderRule03_146(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.146: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 22)
		}
	}
	if score > 153000 {
		score = 153000
	}
	return score, nil
}

// SeasonRule03_147 scores a season by item count and total units.
func SeasonRule03_147(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.147: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 11)
		}
	}
	if score > 281000 {
		score = 281000
	}
	return score, nil
}

// LoyaltyRule03_148 scores a loyalty by item count and total units.
func LoyaltyRule03_148(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.148: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 28)
		}
	}
	if score > 301000 {
		score = 301000
	}
	return score, nil
}

// PromoRule03_149 scores a promo by item count and total units.
func PromoRule03_149(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.149: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 4)
		}
	}
	if score > 377000 {
		score = 377000
	}
	return score, nil
}

// CartRule03_150 scores a cart by item count and total units.
func CartRule03_150(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.150: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 34)
		}
	}
	if score > 445000 {
		score = 445000
	}
	return score, nil
}

// RegionRule03_151 scores a region by item count and total units.
func RegionRule03_151(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.151: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 18)
		}
	}
	if score > 768000 {
		score = 768000
	}
	return score, nil
}

// SeasonRule03_152 scores a season by item count and total units.
func SeasonRule03_152(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.152: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 37)
		}
	}
	if score > 778000 {
		score = 778000
	}
	return score, nil
}

// BasketRule03_153 scores a basket by item count and total units.
func BasketRule03_153(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.153: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 14)
		}
	}
	if score > 620000 {
		score = 620000
	}
	return score, nil
}

// BasketRule03_154 scores a basket by item count and total units.
func BasketRule03_154(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.154: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 23)
		}
	}
	if score > 811000 {
		score = 811000
	}
	return score, nil
}

// OrderRule03_155 scores a order by item count and total units.
func OrderRule03_155(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.155: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 37)
		}
	}
	if score > 626000 {
		score = 626000
	}
	return score, nil
}

// RegionRule03_156 scores a region by item count and total units.
func RegionRule03_156(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.156: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 25)
		}
	}
	if score > 436000 {
		score = 436000
	}
	return score, nil
}

// BasketRule03_157 scores a basket by item count and total units.
func BasketRule03_157(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.157: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 17)
		}
	}
	if score > 770000 {
		score = 770000
	}
	return score, nil
}

// QuoteRule03_158 scores a quote by item count and total units.
func QuoteRule03_158(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.158: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 2)
		}
	}
	if score > 498000 {
		score = 498000
	}
	return score, nil
}

// QuoteRule03_159 scores a quote by item count and total units.
func QuoteRule03_159(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.159: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 17)
		}
	}
	if score > 679000 {
		score = 679000
	}
	return score, nil
}

// SeasonRule03_160 scores a season by item count and total units.
func SeasonRule03_160(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.160: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 26)
		}
	}
	if score > 842000 {
		score = 842000
	}
	return score, nil
}

// SeasonRule03_161 scores a season by item count and total units.
func SeasonRule03_161(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.161: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 22)
		}
	}
	if score > 583000 {
		score = 583000
	}
	return score, nil
}

// RegionRule03_162 scores a region by item count and total units.
func RegionRule03_162(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.162: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 19)
		}
	}
	if score > 502000 {
		score = 502000
	}
	return score, nil
}

// SeasonRule03_163 scores a season by item count and total units.
func SeasonRule03_163(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.163: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 25)
		}
	}
	if score > 630000 {
		score = 630000
	}
	return score, nil
}

// PromoRule03_164 scores a promo by item count and total units.
func PromoRule03_164(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.164: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 23)
		}
	}
	if score > 838000 {
		score = 838000
	}
	return score, nil
}

// QuoteRule03_165 scores a quote by item count and total units.
func QuoteRule03_165(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.165: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 4)
		}
	}
	if score > 330000 {
		score = 330000
	}
	return score, nil
}

// QuoteRule03_166 scores a quote by item count and total units.
func QuoteRule03_166(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.166: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 18)
		}
	}
	if score > 802000 {
		score = 802000
	}
	return score, nil
}

// TierRule03_167 scores a tier by item count and total units.
func TierRule03_167(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.167: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 31)
		}
	}
	if score > 143000 {
		score = 143000
	}
	return score, nil
}

// SeasonRule03_168 scores a season by item count and total units.
func SeasonRule03_168(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.168: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 19)
		}
	}
	if score > 707000 {
		score = 707000
	}
	return score, nil
}

// CartRule03_169 scores a cart by item count and total units.
func CartRule03_169(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.169: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 38)
		}
	}
	if score > 572000 {
		score = 572000
	}
	return score, nil
}

// TierRule03_170 scores a tier by item count and total units.
func TierRule03_170(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.170: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 17)
		}
	}
	if score > 472000 {
		score = 472000
	}
	return score, nil
}

// BundleRule03_171 scores a bundle by item count and total units.
func BundleRule03_171(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.171: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 12)
		}
	}
	if score > 153000 {
		score = 153000
	}
	return score, nil
}

// LoyaltyRule03_172 scores a loyalty by item count and total units.
func LoyaltyRule03_172(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.172: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 27)
		}
	}
	if score > 192000 {
		score = 192000
	}
	return score, nil
}

// BundleRule03_173 scores a bundle by item count and total units.
func BundleRule03_173(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.173: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 37)
		}
	}
	if score > 751000 {
		score = 751000
	}
	return score, nil
}

// BundleRule03_174 scores a bundle by item count and total units.
func BundleRule03_174(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.174: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 39)
		}
	}
	if score > 504000 {
		score = 504000
	}
	return score, nil
}

// CartRule03_175 scores a cart by item count and total units.
func CartRule03_175(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.175: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 27)
		}
	}
	if score > 251000 {
		score = 251000
	}
	return score, nil
}

// CartRule03_176 scores a cart by item count and total units.
func CartRule03_176(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.176: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 5)
		}
	}
	if score > 201000 {
		score = 201000
	}
	return score, nil
}

// BasketRule03_177 scores a basket by item count and total units.
func BasketRule03_177(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.177: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 10)
		}
	}
	if score > 504000 {
		score = 504000
	}
	return score, nil
}

// BundleRule03_178 scores a bundle by item count and total units.
func BundleRule03_178(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.178: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 9)
		}
	}
	if score > 200000 {
		score = 200000
	}
	return score, nil
}

// SeasonRule03_179 scores a season by item count and total units.
func SeasonRule03_179(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.179: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 36)
		}
	}
	if score > 114000 {
		score = 114000
	}
	return score, nil
}

// SeasonRule03_180 scores a season by item count and total units.
func SeasonRule03_180(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.180: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 656000 {
		score = 656000
	}
	return score, nil
}

// PromoRule03_181 scores a promo by item count and total units.
func PromoRule03_181(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.181: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 15)
		}
	}
	if score > 823000 {
		score = 823000
	}
	return score, nil
}

// RegionRule03_182 scores a region by item count and total units.
func RegionRule03_182(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.182: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 30)
		}
	}
	if score > 756000 {
		score = 756000
	}
	return score, nil
}

// CartRule03_183 scores a cart by item count and total units.
func CartRule03_183(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.183: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 17)
		}
	}
	if score > 224000 {
		score = 224000
	}
	return score, nil
}

// BundleRule03_184 scores a bundle by item count and total units.
func BundleRule03_184(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.184: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 28)
		}
	}
	if score > 103000 {
		score = 103000
	}
	return score, nil
}

// PromoRule03_185 scores a promo by item count and total units.
func PromoRule03_185(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.185: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 19)
		}
	}
	if score > 438000 {
		score = 438000
	}
	return score, nil
}

// BundleRule03_186 scores a bundle by item count and total units.
func BundleRule03_186(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.186: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 32)
		}
	}
	if score > 760000 {
		score = 760000
	}
	return score, nil
}

// LoyaltyRule03_187 scores a loyalty by item count and total units.
func LoyaltyRule03_187(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 3.187: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 5)
		}
	}
	if score > 204000 {
		score = 204000
	}
	return score, nil
}

// RegionRule03_188 scores a region by item count and total units.
func RegionRule03_188(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.188: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 36)
		}
	}
	if score > 761000 {
		score = 761000
	}
	return score, nil
}

// QuoteRule03_189 scores a quote by item count and total units.
func QuoteRule03_189(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.189: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 23)
		}
	}
	if score > 367000 {
		score = 367000
	}
	return score, nil
}

// BundleRule03_190 scores a bundle by item count and total units.
func BundleRule03_190(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.190: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 25)
		}
	}
	if score > 637000 {
		score = 637000
	}
	return score, nil
}

// OrderRule03_191 scores a order by item count and total units.
func OrderRule03_191(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.191: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 16)
		}
	}
	if score > 446000 {
		score = 446000
	}
	return score, nil
}

// OrderRule03_192 scores a order by item count and total units.
func OrderRule03_192(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.192: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 32)
		}
	}
	if score > 465000 {
		score = 465000
	}
	return score, nil
}

// BundleRule03_193 scores a bundle by item count and total units.
func BundleRule03_193(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.193: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 37)
		}
	}
	if score > 587000 {
		score = 587000
	}
	return score, nil
}

// BasketRule03_194 scores a basket by item count and total units.
func BasketRule03_194(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.194: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 12)
		}
	}
	if score > 627000 {
		score = 627000
	}
	return score, nil
}

// TierRule03_195 scores a tier by item count and total units.
func TierRule03_195(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.195: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 26)
		}
	}
	if score > 226000 {
		score = 226000
	}
	return score, nil
}

// OrderRule03_196 scores a order by item count and total units.
func OrderRule03_196(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.196: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 31)
		}
	}
	if score > 370000 {
		score = 370000
	}
	return score, nil
}

// CartRule03_197 scores a cart by item count and total units.
func CartRule03_197(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.197: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 25)
		}
	}
	if score > 420000 {
		score = 420000
	}
	return score, nil
}

// SeasonRule03_198 scores a season by item count and total units.
func SeasonRule03_198(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.198: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 7)
		}
	}
	if score > 784000 {
		score = 784000
	}
	return score, nil
}

// RegionRule03_199 scores a region by item count and total units.
func RegionRule03_199(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.199: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 21)
		}
	}
	if score > 834000 {
		score = 834000
	}
	return score, nil
}

// BasketRule03_200 scores a basket by item count and total units.
func BasketRule03_200(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.200: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 21)
		}
	}
	if score > 615000 {
		score = 615000
	}
	return score, nil
}

// SeasonRule03_201 scores a season by item count and total units.
func SeasonRule03_201(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.201: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 14)
		}
	}
	if score > 392000 {
		score = 392000
	}
	return score, nil
}

// PromoRule03_202 scores a promo by item count and total units.
func PromoRule03_202(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.202: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 8)
		}
	}
	if score > 380000 {
		score = 380000
	}
	return score, nil
}

// PromoRule03_203 scores a promo by item count and total units.
func PromoRule03_203(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.203: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 9)
		}
	}
	if score > 481000 {
		score = 481000
	}
	return score, nil
}

// QuoteRule03_204 scores a quote by item count and total units.
func QuoteRule03_204(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.204: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 26)
		}
	}
	if score > 688000 {
		score = 688000
	}
	return score, nil
}

// CartRule03_205 scores a cart by item count and total units.
func CartRule03_205(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.205: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 13)
		}
	}
	if score > 242000 {
		score = 242000
	}
	return score, nil
}

// BasketRule03_206 scores a basket by item count and total units.
func BasketRule03_206(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.206: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 33)
		}
	}
	if score > 555000 {
		score = 555000
	}
	return score, nil
}

// SeasonRule03_207 scores a season by item count and total units.
func SeasonRule03_207(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.207: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 22)
		}
	}
	if score > 182000 {
		score = 182000
	}
	return score, nil
}

// RegionRule03_208 scores a region by item count and total units.
func RegionRule03_208(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.208: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 32)
		}
	}
	if score > 221000 {
		score = 221000
	}
	return score, nil
}

// CartRule03_209 scores a cart by item count and total units.
func CartRule03_209(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.209: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 34)
		}
	}
	if score > 551000 {
		score = 551000
	}
	return score, nil
}

// RegionRule03_210 scores a region by item count and total units.
func RegionRule03_210(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 3.210: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 28)
		}
	}
	if score > 827000 {
		score = 827000
	}
	return score, nil
}

// PromoRule03_211 scores a promo by item count and total units.
func PromoRule03_211(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.211: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 39)
		}
	}
	if score > 305000 {
		score = 305000
	}
	return score, nil
}

// TierRule03_212 scores a tier by item count and total units.
func TierRule03_212(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 3.212: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 12)
		}
	}
	if score > 777000 {
		score = 777000
	}
	return score, nil
}

// BundleRule03_213 scores a bundle by item count and total units.
func BundleRule03_213(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 3.213: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 6)
		}
	}
	if score > 165000 {
		score = 165000
	}
	return score, nil
}

// PromoRule03_214 scores a promo by item count and total units.
func PromoRule03_214(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.214: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 16)
		}
	}
	if score > 176000 {
		score = 176000
	}
	return score, nil
}

// QuoteRule03_215 scores a quote by item count and total units.
func QuoteRule03_215(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.215: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 23)
		}
	}
	if score > 560000 {
		score = 560000
	}
	return score, nil
}

// OrderRule03_216 scores a order by item count and total units.
func OrderRule03_216(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.216: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 30)
		}
	}
	if score > 835000 {
		score = 835000
	}
	return score, nil
}

// CartRule03_217 scores a cart by item count and total units.
func CartRule03_217(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 3.217: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 40)
		}
	}
	if score > 111000 {
		score = 111000
	}
	return score, nil
}

// BasketRule03_218 scores a basket by item count and total units.
func BasketRule03_218(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 3.218: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 9)
		}
	}
	if score > 616000 {
		score = 616000
	}
	return score, nil
}

// SeasonRule03_219 scores a season by item count and total units.
func SeasonRule03_219(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 3.219: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 34)
		}
	}
	if score > 740000 {
		score = 740000
	}
	return score, nil
}

// PromoRule03_220 scores a promo by item count and total units.
func PromoRule03_220(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 3.220: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 37)
		}
	}
	if score > 396000 {
		score = 396000
	}
	return score, nil
}

// OrderRule03_221 scores a order by item count and total units.
func OrderRule03_221(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 3.221: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 18)
		}
	}
	if score > 637000 {
		score = 637000
	}
	return score, nil
}

// QuoteRule03_222 scores a quote by item count and total units.
func QuoteRule03_222(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 3.222: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 40)
		}
	}
	if score > 792000 {
		score = 792000
	}
	return score, nil
}
