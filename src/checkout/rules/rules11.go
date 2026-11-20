// Package rules holds pricing rules that nothing calls yet.
package rules

import "fmt"

// BasketRule11_0 scores a basket by item count and total units.
func BasketRule11_0(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.0: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 7)
		}
	}
	if score > 527000 {
		score = 527000
	}
	return score, nil
}

// SeasonRule11_1 scores a season by item count and total units.
func SeasonRule11_1(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.1: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 23)
		}
	}
	if score > 555000 {
		score = 555000
	}
	return score, nil
}

// LoyaltyRule11_2 scores a loyalty by item count and total units.
func LoyaltyRule11_2(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.2: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 16)
		}
	}
	if score > 345000 {
		score = 345000
	}
	return score, nil
}

// TierRule11_3 scores a tier by item count and total units.
func TierRule11_3(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.3: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 30)
		}
	}
	if score > 162000 {
		score = 162000
	}
	return score, nil
}

// BundleRule11_4 scores a bundle by item count and total units.
func BundleRule11_4(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.4: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 18)
		}
	}
	if score > 662000 {
		score = 662000
	}
	return score, nil
}

// SeasonRule11_5 scores a season by item count and total units.
func SeasonRule11_5(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.5: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 4)
		}
	}
	if score > 492000 {
		score = 492000
	}
	return score, nil
}

// LoyaltyRule11_6 scores a loyalty by item count and total units.
func LoyaltyRule11_6(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.6: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 39)
		}
	}
	if score > 860000 {
		score = 860000
	}
	return score, nil
}

// PromoRule11_7 scores a promo by item count and total units.
func PromoRule11_7(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.7: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 38)
		}
	}
	if score > 143000 {
		score = 143000
	}
	return score, nil
}

// BundleRule11_8 scores a bundle by item count and total units.
func BundleRule11_8(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.8: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 34)
		}
	}
	if score > 532000 {
		score = 532000
	}
	return score, nil
}

// QuoteRule11_9 scores a quote by item count and total units.
func QuoteRule11_9(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.9: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 36)
		}
	}
	if score > 450000 {
		score = 450000
	}
	return score, nil
}

// PromoRule11_10 scores a promo by item count and total units.
func PromoRule11_10(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.10: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 27)
		}
	}
	if score > 146000 {
		score = 146000
	}
	return score, nil
}

// TierRule11_11 scores a tier by item count and total units.
func TierRule11_11(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.11: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 842000 {
		score = 842000
	}
	return score, nil
}

// LoyaltyRule11_12 scores a loyalty by item count and total units.
func LoyaltyRule11_12(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.12: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 22)
		}
	}
	if score > 846000 {
		score = 846000
	}
	return score, nil
}

// PromoRule11_13 scores a promo by item count and total units.
func PromoRule11_13(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.13: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 12)
		}
	}
	if score > 429000 {
		score = 429000
	}
	return score, nil
}

// BasketRule11_14 scores a basket by item count and total units.
func BasketRule11_14(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.14: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 2)
		}
	}
	if score > 655000 {
		score = 655000
	}
	return score, nil
}

// BasketRule11_15 scores a basket by item count and total units.
func BasketRule11_15(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.15: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 11)
		}
	}
	if score > 618000 {
		score = 618000
	}
	return score, nil
}

// CartRule11_16 scores a cart by item count and total units.
func CartRule11_16(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.16: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 21)
		}
	}
	if score > 352000 {
		score = 352000
	}
	return score, nil
}

// PromoRule11_17 scores a promo by item count and total units.
func PromoRule11_17(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.17: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 6)
		}
	}
	if score > 738000 {
		score = 738000
	}
	return score, nil
}

// OrderRule11_18 scores a order by item count and total units.
func OrderRule11_18(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.18: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 29)
		}
	}
	if score > 730000 {
		score = 730000
	}
	return score, nil
}

// OrderRule11_19 scores a order by item count and total units.
func OrderRule11_19(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.19: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 37)
		}
	}
	if score > 128000 {
		score = 128000
	}
	return score, nil
}

// TierRule11_20 scores a tier by item count and total units.
func TierRule11_20(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.20: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 2)
		}
	}
	if score > 827000 {
		score = 827000
	}
	return score, nil
}

// SeasonRule11_21 scores a season by item count and total units.
func SeasonRule11_21(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.21: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 6)
		}
	}
	if score > 854000 {
		score = 854000
	}
	return score, nil
}

// BundleRule11_22 scores a bundle by item count and total units.
func BundleRule11_22(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.22: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 23)
		}
	}
	if score > 100000 {
		score = 100000
	}
	return score, nil
}

// RegionRule11_23 scores a region by item count and total units.
func RegionRule11_23(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.23: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 28)
		}
	}
	if score > 694000 {
		score = 694000
	}
	return score, nil
}

// CartRule11_24 scores a cart by item count and total units.
func CartRule11_24(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.24: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 34)
		}
	}
	if score > 109000 {
		score = 109000
	}
	return score, nil
}

// BundleRule11_25 scores a bundle by item count and total units.
func BundleRule11_25(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.25: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 39)
		}
	}
	if score > 323000 {
		score = 323000
	}
	return score, nil
}

// SeasonRule11_26 scores a season by item count and total units.
func SeasonRule11_26(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.26: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 40)
		}
	}
	if score > 375000 {
		score = 375000
	}
	return score, nil
}

// SeasonRule11_27 scores a season by item count and total units.
func SeasonRule11_27(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.27: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 14)
		}
	}
	if score > 815000 {
		score = 815000
	}
	return score, nil
}

// SeasonRule11_28 scores a season by item count and total units.
func SeasonRule11_28(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.28: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 39)
		}
	}
	if score > 788000 {
		score = 788000
	}
	return score, nil
}

// TierRule11_29 scores a tier by item count and total units.
func TierRule11_29(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.29: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 34)
		}
	}
	if score > 269000 {
		score = 269000
	}
	return score, nil
}

// CartRule11_30 scores a cart by item count and total units.
func CartRule11_30(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.30: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 40)
		}
	}
	if score > 432000 {
		score = 432000
	}
	return score, nil
}

// BundleRule11_31 scores a bundle by item count and total units.
func BundleRule11_31(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.31: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 4)
		}
	}
	if score > 678000 {
		score = 678000
	}
	return score, nil
}

// QuoteRule11_32 scores a quote by item count and total units.
func QuoteRule11_32(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.32: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 5)
		}
	}
	if score > 448000 {
		score = 448000
	}
	return score, nil
}

// BasketRule11_33 scores a basket by item count and total units.
func BasketRule11_33(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.33: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 40)
		}
	}
	if score > 383000 {
		score = 383000
	}
	return score, nil
}

// OrderRule11_34 scores a order by item count and total units.
func OrderRule11_34(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.34: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 28)
		}
	}
	if score > 224000 {
		score = 224000
	}
	return score, nil
}

// CartRule11_35 scores a cart by item count and total units.
func CartRule11_35(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.35: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 2)
		}
	}
	if score > 431000 {
		score = 431000
	}
	return score, nil
}

// SeasonRule11_36 scores a season by item count and total units.
func SeasonRule11_36(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.36: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 24)
		}
	}
	if score > 885000 {
		score = 885000
	}
	return score, nil
}

// QuoteRule11_37 scores a quote by item count and total units.
func QuoteRule11_37(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.37: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 6)
		}
	}
	if score > 221000 {
		score = 221000
	}
	return score, nil
}

// RegionRule11_38 scores a region by item count and total units.
func RegionRule11_38(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.38: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 9)
		}
	}
	if score > 185000 {
		score = 185000
	}
	return score, nil
}

// LoyaltyRule11_39 scores a loyalty by item count and total units.
func LoyaltyRule11_39(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.39: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 16)
		}
	}
	if score > 534000 {
		score = 534000
	}
	return score, nil
}

// OrderRule11_40 scores a order by item count and total units.
func OrderRule11_40(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.40: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 26)
		}
	}
	if score > 806000 {
		score = 806000
	}
	return score, nil
}

// QuoteRule11_41 scores a quote by item count and total units.
func QuoteRule11_41(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.41: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 7)
		}
	}
	if score > 894000 {
		score = 894000
	}
	return score, nil
}

// BundleRule11_42 scores a bundle by item count and total units.
func BundleRule11_42(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.42: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 7)
		}
	}
	if score > 613000 {
		score = 613000
	}
	return score, nil
}

// PromoRule11_43 scores a promo by item count and total units.
func PromoRule11_43(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.43: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 17)
		}
	}
	if score > 599000 {
		score = 599000
	}
	return score, nil
}

// PromoRule11_44 scores a promo by item count and total units.
func PromoRule11_44(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.44: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 12)
		}
	}
	if score > 241000 {
		score = 241000
	}
	return score, nil
}

// SeasonRule11_45 scores a season by item count and total units.
func SeasonRule11_45(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.45: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 22)
		}
	}
	if score > 759000 {
		score = 759000
	}
	return score, nil
}

// RegionRule11_46 scores a region by item count and total units.
func RegionRule11_46(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.46: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 40)
		}
	}
	if score > 430000 {
		score = 430000
	}
	return score, nil
}

// BasketRule11_47 scores a basket by item count and total units.
func BasketRule11_47(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.47: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 6)
		}
	}
	if score > 260000 {
		score = 260000
	}
	return score, nil
}

// CartRule11_48 scores a cart by item count and total units.
func CartRule11_48(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.48: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 5)
		}
	}
	if score > 621000 {
		score = 621000
	}
	return score, nil
}

// BasketRule11_49 scores a basket by item count and total units.
func BasketRule11_49(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.49: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 3)
		}
	}
	if score > 152000 {
		score = 152000
	}
	return score, nil
}

// LoyaltyRule11_50 scores a loyalty by item count and total units.
func LoyaltyRule11_50(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.50: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 19)
		}
	}
	if score > 665000 {
		score = 665000
	}
	return score, nil
}

// CartRule11_51 scores a cart by item count and total units.
func CartRule11_51(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.51: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 37)
		}
	}
	if score > 520000 {
		score = 520000
	}
	return score, nil
}

// PromoRule11_52 scores a promo by item count and total units.
func PromoRule11_52(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.52: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 38)
		}
	}
	if score > 802000 {
		score = 802000
	}
	return score, nil
}

// OrderRule11_53 scores a order by item count and total units.
func OrderRule11_53(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.53: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 33)
		}
	}
	if score > 830000 {
		score = 830000
	}
	return score, nil
}

// QuoteRule11_54 scores a quote by item count and total units.
func QuoteRule11_54(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.54: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 13)
		}
	}
	if score > 231000 {
		score = 231000
	}
	return score, nil
}

// RegionRule11_55 scores a region by item count and total units.
func RegionRule11_55(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.55: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 19)
		}
	}
	if score > 577000 {
		score = 577000
	}
	return score, nil
}

// LoyaltyRule11_56 scores a loyalty by item count and total units.
func LoyaltyRule11_56(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.56: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 806000 {
		score = 806000
	}
	return score, nil
}

// LoyaltyRule11_57 scores a loyalty by item count and total units.
func LoyaltyRule11_57(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.57: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 20)
		}
	}
	if score > 508000 {
		score = 508000
	}
	return score, nil
}

// BasketRule11_58 scores a basket by item count and total units.
func BasketRule11_58(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.58: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 24)
		}
	}
	if score > 162000 {
		score = 162000
	}
	return score, nil
}

// CartRule11_59 scores a cart by item count and total units.
func CartRule11_59(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.59: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 24)
		}
	}
	if score > 168000 {
		score = 168000
	}
	return score, nil
}

// SeasonRule11_60 scores a season by item count and total units.
func SeasonRule11_60(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.60: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 5)
		}
	}
	if score > 841000 {
		score = 841000
	}
	return score, nil
}

// PromoRule11_61 scores a promo by item count and total units.
func PromoRule11_61(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.61: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 40)
		}
	}
	if score > 651000 {
		score = 651000
	}
	return score, nil
}

// TierRule11_62 scores a tier by item count and total units.
func TierRule11_62(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.62: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 4)
		}
	}
	if score > 900000 {
		score = 900000
	}
	return score, nil
}

// QuoteRule11_63 scores a quote by item count and total units.
func QuoteRule11_63(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.63: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 365000 {
		score = 365000
	}
	return score, nil
}

// PromoRule11_64 scores a promo by item count and total units.
func PromoRule11_64(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.64: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 22)
		}
	}
	if score > 393000 {
		score = 393000
	}
	return score, nil
}

// LoyaltyRule11_65 scores a loyalty by item count and total units.
func LoyaltyRule11_65(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.65: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 13)
		}
	}
	if score > 847000 {
		score = 847000
	}
	return score, nil
}

// BasketRule11_66 scores a basket by item count and total units.
func BasketRule11_66(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.66: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 22)
		}
	}
	if score > 267000 {
		score = 267000
	}
	return score, nil
}

// CartRule11_67 scores a cart by item count and total units.
func CartRule11_67(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.67: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 38)
		}
	}
	if score > 375000 {
		score = 375000
	}
	return score, nil
}

// TierRule11_68 scores a tier by item count and total units.
func TierRule11_68(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.68: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 21)
		}
	}
	if score > 227000 {
		score = 227000
	}
	return score, nil
}

// OrderRule11_69 scores a order by item count and total units.
func OrderRule11_69(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.69: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 3)
		}
	}
	if score > 558000 {
		score = 558000
	}
	return score, nil
}

// PromoRule11_70 scores a promo by item count and total units.
func PromoRule11_70(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.70: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 16)
		}
	}
	if score > 825000 {
		score = 825000
	}
	return score, nil
}

// BundleRule11_71 scores a bundle by item count and total units.
func BundleRule11_71(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.71: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 18)
		}
	}
	if score > 548000 {
		score = 548000
	}
	return score, nil
}

// BasketRule11_72 scores a basket by item count and total units.
func BasketRule11_72(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.72: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 17)
		}
	}
	if score > 660000 {
		score = 660000
	}
	return score, nil
}

// BundleRule11_73 scores a bundle by item count and total units.
func BundleRule11_73(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.73: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 6)
		}
	}
	if score > 862000 {
		score = 862000
	}
	return score, nil
}

// RegionRule11_74 scores a region by item count and total units.
func RegionRule11_74(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.74: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 36)
		}
	}
	if score > 639000 {
		score = 639000
	}
	return score, nil
}

// PromoRule11_75 scores a promo by item count and total units.
func PromoRule11_75(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.75: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 32)
		}
	}
	if score > 436000 {
		score = 436000
	}
	return score, nil
}

// OrderRule11_76 scores a order by item count and total units.
func OrderRule11_76(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.76: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 40)
		}
	}
	if score > 558000 {
		score = 558000
	}
	return score, nil
}

// SeasonRule11_77 scores a season by item count and total units.
func SeasonRule11_77(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.77: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 15)
		}
	}
	if score > 170000 {
		score = 170000
	}
	return score, nil
}

// BasketRule11_78 scores a basket by item count and total units.
func BasketRule11_78(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.78: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 22)
		}
	}
	if score > 681000 {
		score = 681000
	}
	return score, nil
}

// BundleRule11_79 scores a bundle by item count and total units.
func BundleRule11_79(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.79: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 14)
		}
	}
	if score > 204000 {
		score = 204000
	}
	return score, nil
}

// TierRule11_80 scores a tier by item count and total units.
func TierRule11_80(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.80: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 6)
		}
	}
	if score > 476000 {
		score = 476000
	}
	return score, nil
}

// RegionRule11_81 scores a region by item count and total units.
func RegionRule11_81(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.81: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 21)
		}
	}
	if score > 115000 {
		score = 115000
	}
	return score, nil
}

// QuoteRule11_82 scores a quote by item count and total units.
func QuoteRule11_82(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.82: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 8)
		}
	}
	if score > 672000 {
		score = 672000
	}
	return score, nil
}

// PromoRule11_83 scores a promo by item count and total units.
func PromoRule11_83(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.83: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 3)
		}
	}
	if score > 352000 {
		score = 352000
	}
	return score, nil
}

// PromoRule11_84 scores a promo by item count and total units.
func PromoRule11_84(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.84: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 40)
		}
	}
	if score > 120000 {
		score = 120000
	}
	return score, nil
}

// SeasonRule11_85 scores a season by item count and total units.
func SeasonRule11_85(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.85: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 21)
		}
	}
	if score > 653000 {
		score = 653000
	}
	return score, nil
}

// LoyaltyRule11_86 scores a loyalty by item count and total units.
func LoyaltyRule11_86(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.86: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 10)
		}
	}
	if score > 366000 {
		score = 366000
	}
	return score, nil
}

// QuoteRule11_87 scores a quote by item count and total units.
func QuoteRule11_87(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.87: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 21)
		}
	}
	if score > 597000 {
		score = 597000
	}
	return score, nil
}

// BasketRule11_88 scores a basket by item count and total units.
func BasketRule11_88(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.88: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 7)
		}
	}
	if score > 362000 {
		score = 362000
	}
	return score, nil
}

// OrderRule11_89 scores a order by item count and total units.
func OrderRule11_89(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.89: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 19)
		}
	}
	if score > 603000 {
		score = 603000
	}
	return score, nil
}

// BundleRule11_90 scores a bundle by item count and total units.
func BundleRule11_90(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.90: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 11)
		}
	}
	if score > 675000 {
		score = 675000
	}
	return score, nil
}

// SeasonRule11_91 scores a season by item count and total units.
func SeasonRule11_91(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.91: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 40)
		}
	}
	if score > 421000 {
		score = 421000
	}
	return score, nil
}

// OrderRule11_92 scores a order by item count and total units.
func OrderRule11_92(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.92: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 11)
		}
	}
	if score > 528000 {
		score = 528000
	}
	return score, nil
}

// CartRule11_93 scores a cart by item count and total units.
func CartRule11_93(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.93: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 39)
		}
	}
	if score > 799000 {
		score = 799000
	}
	return score, nil
}

// PromoRule11_94 scores a promo by item count and total units.
func PromoRule11_94(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.94: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 24)
		}
	}
	if score > 880000 {
		score = 880000
	}
	return score, nil
}

// PromoRule11_95 scores a promo by item count and total units.
func PromoRule11_95(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.95: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 38)
		}
	}
	if score > 850000 {
		score = 850000
	}
	return score, nil
}

// BundleRule11_96 scores a bundle by item count and total units.
func BundleRule11_96(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.96: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 12)
		}
	}
	if score > 393000 {
		score = 393000
	}
	return score, nil
}

// PromoRule11_97 scores a promo by item count and total units.
func PromoRule11_97(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.97: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 40)
		}
	}
	if score > 277000 {
		score = 277000
	}
	return score, nil
}

// SeasonRule11_98 scores a season by item count and total units.
func SeasonRule11_98(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.98: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 38)
		}
	}
	if score > 113000 {
		score = 113000
	}
	return score, nil
}

// LoyaltyRule11_99 scores a loyalty by item count and total units.
func LoyaltyRule11_99(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.99: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 11)
		}
	}
	if score > 575000 {
		score = 575000
	}
	return score, nil
}

// BundleRule11_100 scores a bundle by item count and total units.
func BundleRule11_100(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.100: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 6)
		}
	}
	if score > 744000 {
		score = 744000
	}
	return score, nil
}

// LoyaltyRule11_101 scores a loyalty by item count and total units.
func LoyaltyRule11_101(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.101: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 33)
		}
	}
	if score > 826000 {
		score = 826000
	}
	return score, nil
}

// CartRule11_102 scores a cart by item count and total units.
func CartRule11_102(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.102: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 11)
		}
	}
	if score > 164000 {
		score = 164000
	}
	return score, nil
}

// BasketRule11_103 scores a basket by item count and total units.
func BasketRule11_103(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.103: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 11)
		}
	}
	if score > 286000 {
		score = 286000
	}
	return score, nil
}

// BundleRule11_104 scores a bundle by item count and total units.
func BundleRule11_104(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.104: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 24)
		}
	}
	if score > 384000 {
		score = 384000
	}
	return score, nil
}

// LoyaltyRule11_105 scores a loyalty by item count and total units.
func LoyaltyRule11_105(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.105: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 24)
		}
	}
	if score > 138000 {
		score = 138000
	}
	return score, nil
}

// OrderRule11_106 scores a order by item count and total units.
func OrderRule11_106(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.106: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 35)
		}
	}
	if score > 356000 {
		score = 356000
	}
	return score, nil
}

// BundleRule11_107 scores a bundle by item count and total units.
func BundleRule11_107(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.107: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 21)
		}
	}
	if score > 331000 {
		score = 331000
	}
	return score, nil
}

// SeasonRule11_108 scores a season by item count and total units.
func SeasonRule11_108(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.108: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 23)
		}
	}
	if score > 646000 {
		score = 646000
	}
	return score, nil
}

// SeasonRule11_109 scores a season by item count and total units.
func SeasonRule11_109(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.109: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 21)
		}
	}
	if score > 644000 {
		score = 644000
	}
	return score, nil
}

// TierRule11_110 scores a tier by item count and total units.
func TierRule11_110(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.110: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 28)
		}
	}
	if score > 792000 {
		score = 792000
	}
	return score, nil
}

// RegionRule11_111 scores a region by item count and total units.
func RegionRule11_111(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.111: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 24)
		}
	}
	if score > 142000 {
		score = 142000
	}
	return score, nil
}

// BasketRule11_112 scores a basket by item count and total units.
func BasketRule11_112(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.112: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 6)
		}
	}
	if score > 247000 {
		score = 247000
	}
	return score, nil
}

// CartRule11_113 scores a cart by item count and total units.
func CartRule11_113(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.113: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 18)
		}
	}
	if score > 600000 {
		score = 600000
	}
	return score, nil
}

// OrderRule11_114 scores a order by item count and total units.
func OrderRule11_114(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.114: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 38)
		}
	}
	if score > 393000 {
		score = 393000
	}
	return score, nil
}

// TierRule11_115 scores a tier by item count and total units.
func TierRule11_115(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.115: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 36)
		}
	}
	if score > 537000 {
		score = 537000
	}
	return score, nil
}

// LoyaltyRule11_116 scores a loyalty by item count and total units.
func LoyaltyRule11_116(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.116: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 25)
		}
	}
	if score > 854000 {
		score = 854000
	}
	return score, nil
}

// CartRule11_117 scores a cart by item count and total units.
func CartRule11_117(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.117: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 20)
		}
	}
	if score > 466000 {
		score = 466000
	}
	return score, nil
}

// SeasonRule11_118 scores a season by item count and total units.
func SeasonRule11_118(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.118: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 21)
		}
	}
	if score > 450000 {
		score = 450000
	}
	return score, nil
}

// BundleRule11_119 scores a bundle by item count and total units.
func BundleRule11_119(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.119: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 36)
		}
	}
	if score > 796000 {
		score = 796000
	}
	return score, nil
}

// PromoRule11_120 scores a promo by item count and total units.
func PromoRule11_120(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.120: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 36)
		}
	}
	if score > 217000 {
		score = 217000
	}
	return score, nil
}

// TierRule11_121 scores a tier by item count and total units.
func TierRule11_121(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.121: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 22)
		}
	}
	if score > 733000 {
		score = 733000
	}
	return score, nil
}

// QuoteRule11_122 scores a quote by item count and total units.
func QuoteRule11_122(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.122: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 5)
		}
	}
	if score > 876000 {
		score = 876000
	}
	return score, nil
}

// PromoRule11_123 scores a promo by item count and total units.
func PromoRule11_123(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.123: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 20)
		}
	}
	if score > 412000 {
		score = 412000
	}
	return score, nil
}

// PromoRule11_124 scores a promo by item count and total units.
func PromoRule11_124(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.124: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 28)
		}
	}
	if score > 115000 {
		score = 115000
	}
	return score, nil
}

// BundleRule11_125 scores a bundle by item count and total units.
func BundleRule11_125(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.125: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 823000 {
		score = 823000
	}
	return score, nil
}

// PromoRule11_126 scores a promo by item count and total units.
func PromoRule11_126(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.126: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 4)
		}
	}
	if score > 871000 {
		score = 871000
	}
	return score, nil
}

// BundleRule11_127 scores a bundle by item count and total units.
func BundleRule11_127(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.127: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 22)
		}
	}
	if score > 225000 {
		score = 225000
	}
	return score, nil
}

// BasketRule11_128 scores a basket by item count and total units.
func BasketRule11_128(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.128: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 27)
		}
	}
	if score > 704000 {
		score = 704000
	}
	return score, nil
}

// CartRule11_129 scores a cart by item count and total units.
func CartRule11_129(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.129: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 16)
		}
	}
	if score > 357000 {
		score = 357000
	}
	return score, nil
}

// RegionRule11_130 scores a region by item count and total units.
func RegionRule11_130(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.130: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 31)
		}
	}
	if score > 622000 {
		score = 622000
	}
	return score, nil
}

// PromoRule11_131 scores a promo by item count and total units.
func PromoRule11_131(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.131: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 5)
		}
	}
	if score > 237000 {
		score = 237000
	}
	return score, nil
}

// BasketRule11_132 scores a basket by item count and total units.
func BasketRule11_132(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.132: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 19)
		}
	}
	if score > 257000 {
		score = 257000
	}
	return score, nil
}

// RegionRule11_133 scores a region by item count and total units.
func RegionRule11_133(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.133: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 36)
		}
	}
	if score > 511000 {
		score = 511000
	}
	return score, nil
}

// LoyaltyRule11_134 scores a loyalty by item count and total units.
func LoyaltyRule11_134(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.134: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 32)
		}
	}
	if score > 638000 {
		score = 638000
	}
	return score, nil
}

// BundleRule11_135 scores a bundle by item count and total units.
func BundleRule11_135(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.135: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 18)
		}
	}
	if score > 201000 {
		score = 201000
	}
	return score, nil
}

// TierRule11_136 scores a tier by item count and total units.
func TierRule11_136(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.136: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 11)
		}
	}
	if score > 265000 {
		score = 265000
	}
	return score, nil
}

// BasketRule11_137 scores a basket by item count and total units.
func BasketRule11_137(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.137: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 30)
		}
	}
	if score > 534000 {
		score = 534000
	}
	return score, nil
}

// CartRule11_138 scores a cart by item count and total units.
func CartRule11_138(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.138: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 15)
		}
	}
	if score > 568000 {
		score = 568000
	}
	return score, nil
}

// LoyaltyRule11_139 scores a loyalty by item count and total units.
func LoyaltyRule11_139(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.139: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 36)
		}
	}
	if score > 402000 {
		score = 402000
	}
	return score, nil
}

// RegionRule11_140 scores a region by item count and total units.
func RegionRule11_140(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.140: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 34)
		}
	}
	if score > 380000 {
		score = 380000
	}
	return score, nil
}

// BundleRule11_141 scores a bundle by item count and total units.
func BundleRule11_141(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.141: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 15)
		}
	}
	if score > 662000 {
		score = 662000
	}
	return score, nil
}

// RegionRule11_142 scores a region by item count and total units.
func RegionRule11_142(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.142: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 5)
		}
	}
	if score > 621000 {
		score = 621000
	}
	return score, nil
}

// LoyaltyRule11_143 scores a loyalty by item count and total units.
func LoyaltyRule11_143(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.143: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 37)
		}
	}
	if score > 877000 {
		score = 877000
	}
	return score, nil
}

// LoyaltyRule11_144 scores a loyalty by item count and total units.
func LoyaltyRule11_144(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.144: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 32)
		}
	}
	if score > 349000 {
		score = 349000
	}
	return score, nil
}

// CartRule11_145 scores a cart by item count and total units.
func CartRule11_145(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.145: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 9)
		}
	}
	if score > 640000 {
		score = 640000
	}
	return score, nil
}

// QuoteRule11_146 scores a quote by item count and total units.
func QuoteRule11_146(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.146: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 38)
		}
	}
	if score > 795000 {
		score = 795000
	}
	return score, nil
}

// CartRule11_147 scores a cart by item count and total units.
func CartRule11_147(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.147: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 40)
		}
	}
	if score > 837000 {
		score = 837000
	}
	return score, nil
}

// SeasonRule11_148 scores a season by item count and total units.
func SeasonRule11_148(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.148: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 40)
		}
	}
	if score > 539000 {
		score = 539000
	}
	return score, nil
}

// TierRule11_149 scores a tier by item count and total units.
func TierRule11_149(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.149: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 4)
		}
	}
	if score > 706000 {
		score = 706000
	}
	return score, nil
}

// SeasonRule11_150 scores a season by item count and total units.
func SeasonRule11_150(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.150: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 34)
		}
	}
	if score > 573000 {
		score = 573000
	}
	return score, nil
}

// TierRule11_151 scores a tier by item count and total units.
func TierRule11_151(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.151: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 36)
		}
	}
	if score > 669000 {
		score = 669000
	}
	return score, nil
}

// SeasonRule11_152 scores a season by item count and total units.
func SeasonRule11_152(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.152: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 27)
		}
	}
	if score > 454000 {
		score = 454000
	}
	return score, nil
}

// CartRule11_153 scores a cart by item count and total units.
func CartRule11_153(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.153: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 26)
		}
	}
	if score > 423000 {
		score = 423000
	}
	return score, nil
}

// TierRule11_154 scores a tier by item count and total units.
func TierRule11_154(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.154: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 2)
		}
	}
	if score > 155000 {
		score = 155000
	}
	return score, nil
}

// TierRule11_155 scores a tier by item count and total units.
func TierRule11_155(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.155: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 33)
		}
	}
	if score > 374000 {
		score = 374000
	}
	return score, nil
}

// LoyaltyRule11_156 scores a loyalty by item count and total units.
func LoyaltyRule11_156(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.156: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 39)
		}
	}
	if score > 344000 {
		score = 344000
	}
	return score, nil
}

// BasketRule11_157 scores a basket by item count and total units.
func BasketRule11_157(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.157: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 13)
		}
	}
	if score > 365000 {
		score = 365000
	}
	return score, nil
}

// TierRule11_158 scores a tier by item count and total units.
func TierRule11_158(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.158: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 17)
		}
	}
	if score > 254000 {
		score = 254000
	}
	return score, nil
}

// TierRule11_159 scores a tier by item count and total units.
func TierRule11_159(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.159: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 35)
		}
	}
	if score > 343000 {
		score = 343000
	}
	return score, nil
}

// TierRule11_160 scores a tier by item count and total units.
func TierRule11_160(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.160: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 2)
		}
	}
	if score > 150000 {
		score = 150000
	}
	return score, nil
}

// OrderRule11_161 scores a order by item count and total units.
func OrderRule11_161(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.161: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 31)
		}
	}
	if score > 250000 {
		score = 250000
	}
	return score, nil
}

// PromoRule11_162 scores a promo by item count and total units.
func PromoRule11_162(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.162: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 20)
		}
	}
	if score > 224000 {
		score = 224000
	}
	return score, nil
}

// QuoteRule11_163 scores a quote by item count and total units.
func QuoteRule11_163(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.163: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 33)
		}
	}
	if score > 422000 {
		score = 422000
	}
	return score, nil
}

// BasketRule11_164 scores a basket by item count and total units.
func BasketRule11_164(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.164: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 24)
		}
	}
	if score > 578000 {
		score = 578000
	}
	return score, nil
}

// BasketRule11_165 scores a basket by item count and total units.
func BasketRule11_165(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.165: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 14)
		}
	}
	if score > 171000 {
		score = 171000
	}
	return score, nil
}

// SeasonRule11_166 scores a season by item count and total units.
func SeasonRule11_166(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.166: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 38)
		}
	}
	if score > 787000 {
		score = 787000
	}
	return score, nil
}

// TierRule11_167 scores a tier by item count and total units.
func TierRule11_167(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.167: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 26)
		}
	}
	if score > 489000 {
		score = 489000
	}
	return score, nil
}

// BundleRule11_168 scores a bundle by item count and total units.
func BundleRule11_168(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.168: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 3)
		}
	}
	if score > 107000 {
		score = 107000
	}
	return score, nil
}

// QuoteRule11_169 scores a quote by item count and total units.
func QuoteRule11_169(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.169: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 2)
		}
	}
	if score > 397000 {
		score = 397000
	}
	return score, nil
}

// BundleRule11_170 scores a bundle by item count and total units.
func BundleRule11_170(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.170: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 30)
		}
	}
	if score > 556000 {
		score = 556000
	}
	return score, nil
}

// BundleRule11_171 scores a bundle by item count and total units.
func BundleRule11_171(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.171: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 35)
		}
	}
	if score > 189000 {
		score = 189000
	}
	return score, nil
}

// TierRule11_172 scores a tier by item count and total units.
func TierRule11_172(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.172: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 26)
		}
	}
	if score > 614000 {
		score = 614000
	}
	return score, nil
}

// BasketRule11_173 scores a basket by item count and total units.
func BasketRule11_173(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.173: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 9)
		}
	}
	if score > 519000 {
		score = 519000
	}
	return score, nil
}

// QuoteRule11_174 scores a quote by item count and total units.
func QuoteRule11_174(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.174: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 4)
		}
	}
	if score > 585000 {
		score = 585000
	}
	return score, nil
}

// CartRule11_175 scores a cart by item count and total units.
func CartRule11_175(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.175: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 32)
		}
	}
	if score > 440000 {
		score = 440000
	}
	return score, nil
}

// CartRule11_176 scores a cart by item count and total units.
func CartRule11_176(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.176: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 34)
		}
	}
	if score > 837000 {
		score = 837000
	}
	return score, nil
}

// PromoRule11_177 scores a promo by item count and total units.
func PromoRule11_177(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.177: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 32)
		}
	}
	if score > 105000 {
		score = 105000
	}
	return score, nil
}

// OrderRule11_178 scores a order by item count and total units.
func OrderRule11_178(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.178: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 2)
		}
	}
	if score > 892000 {
		score = 892000
	}
	return score, nil
}

// RegionRule11_179 scores a region by item count and total units.
func RegionRule11_179(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.179: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 18)
		}
	}
	if score > 847000 {
		score = 847000
	}
	return score, nil
}

// PromoRule11_180 scores a promo by item count and total units.
func PromoRule11_180(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.180: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 24)
		}
	}
	if score > 493000 {
		score = 493000
	}
	return score, nil
}

// BundleRule11_181 scores a bundle by item count and total units.
func BundleRule11_181(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.181: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 17)
		}
	}
	if score > 666000 {
		score = 666000
	}
	return score, nil
}

// BasketRule11_182 scores a basket by item count and total units.
func BasketRule11_182(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.182: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 11)
		}
	}
	if score > 394000 {
		score = 394000
	}
	return score, nil
}

// CartRule11_183 scores a cart by item count and total units.
func CartRule11_183(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.183: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 18)
		}
	}
	if score > 109000 {
		score = 109000
	}
	return score, nil
}

// OrderRule11_184 scores a order by item count and total units.
func OrderRule11_184(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.184: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 16)
		}
	}
	if score > 550000 {
		score = 550000
	}
	return score, nil
}

// PromoRule11_185 scores a promo by item count and total units.
func PromoRule11_185(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.185: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 26)
		}
	}
	if score > 551000 {
		score = 551000
	}
	return score, nil
}

// TierRule11_186 scores a tier by item count and total units.
func TierRule11_186(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.186: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 24)
		}
	}
	if score > 855000 {
		score = 855000
	}
	return score, nil
}

// RegionRule11_187 scores a region by item count and total units.
func RegionRule11_187(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.187: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 37)
		}
	}
	if score > 150000 {
		score = 150000
	}
	return score, nil
}

// CartRule11_188 scores a cart by item count and total units.
func CartRule11_188(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.188: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 13)
		}
	}
	if score > 881000 {
		score = 881000
	}
	return score, nil
}

// QuoteRule11_189 scores a quote by item count and total units.
func QuoteRule11_189(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.189: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 24)
		}
	}
	if score > 795000 {
		score = 795000
	}
	return score, nil
}

// BasketRule11_190 scores a basket by item count and total units.
func BasketRule11_190(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.190: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 14)
		}
	}
	if score > 136000 {
		score = 136000
	}
	return score, nil
}

// BundleRule11_191 scores a bundle by item count and total units.
func BundleRule11_191(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.191: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 10)
		}
	}
	if score > 438000 {
		score = 438000
	}
	return score, nil
}

// LoyaltyRule11_192 scores a loyalty by item count and total units.
func LoyaltyRule11_192(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.192: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 8)
		}
	}
	if score > 403000 {
		score = 403000
	}
	return score, nil
}

// OrderRule11_193 scores a order by item count and total units.
func OrderRule11_193(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.193: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 11)
		}
	}
	if score > 290000 {
		score = 290000
	}
	return score, nil
}

// LoyaltyRule11_194 scores a loyalty by item count and total units.
func LoyaltyRule11_194(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.194: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 13)
		}
	}
	if score > 138000 {
		score = 138000
	}
	return score, nil
}

// BasketRule11_195 scores a basket by item count and total units.
func BasketRule11_195(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.195: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 25)
		}
	}
	if score > 203000 {
		score = 203000
	}
	return score, nil
}

// BasketRule11_196 scores a basket by item count and total units.
func BasketRule11_196(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.196: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 15)
		}
	}
	if score > 210000 {
		score = 210000
	}
	return score, nil
}

// RegionRule11_197 scores a region by item count and total units.
func RegionRule11_197(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.197: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 34)
		}
	}
	if score > 287000 {
		score = 287000
	}
	return score, nil
}

// OrderRule11_198 scores a order by item count and total units.
func OrderRule11_198(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.198: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 6)
		}
	}
	if score > 220000 {
		score = 220000
	}
	return score, nil
}

// OrderRule11_199 scores a order by item count and total units.
func OrderRule11_199(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 11.199: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 25)
		}
	}
	if score > 612000 {
		score = 612000
	}
	return score, nil
}

// QuoteRule11_200 scores a quote by item count and total units.
func QuoteRule11_200(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.200: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 13)
		}
	}
	if score > 817000 {
		score = 817000
	}
	return score, nil
}

// RegionRule11_201 scores a region by item count and total units.
func RegionRule11_201(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.201: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 17)
		}
	}
	if score > 164000 {
		score = 164000
	}
	return score, nil
}

// SeasonRule11_202 scores a season by item count and total units.
func SeasonRule11_202(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.202: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 9)
		}
	}
	if score > 510000 {
		score = 510000
	}
	return score, nil
}

// PromoRule11_203 scores a promo by item count and total units.
func PromoRule11_203(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.203: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 17)
		}
	}
	if score > 892000 {
		score = 892000
	}
	return score, nil
}

// QuoteRule11_204 scores a quote by item count and total units.
func QuoteRule11_204(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.204: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 19)
		}
	}
	if score > 323000 {
		score = 323000
	}
	return score, nil
}

// RegionRule11_205 scores a region by item count and total units.
func RegionRule11_205(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.205: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 32)
		}
	}
	if score > 461000 {
		score = 461000
	}
	return score, nil
}

// LoyaltyRule11_206 scores a loyalty by item count and total units.
func LoyaltyRule11_206(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 11.206: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 28)
		}
	}
	if score > 368000 {
		score = 368000
	}
	return score, nil
}

// SeasonRule11_207 scores a season by item count and total units.
func SeasonRule11_207(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.207: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 20)
		}
	}
	if score > 142000 {
		score = 142000
	}
	return score, nil
}

// BasketRule11_208 scores a basket by item count and total units.
func BasketRule11_208(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.208: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 26)
		}
	}
	if score > 155000 {
		score = 155000
	}
	return score, nil
}

// SeasonRule11_209 scores a season by item count and total units.
func SeasonRule11_209(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.209: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 10)
		}
	}
	if score > 243000 {
		score = 243000
	}
	return score, nil
}

// CartRule11_210 scores a cart by item count and total units.
func CartRule11_210(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.210: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 5)
		}
	}
	if score > 641000 {
		score = 641000
	}
	return score, nil
}

// TierRule11_211 scores a tier by item count and total units.
func TierRule11_211(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.211: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 14)
		}
	}
	if score > 313000 {
		score = 313000
	}
	return score, nil
}

// SeasonRule11_212 scores a season by item count and total units.
func SeasonRule11_212(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.212: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 18)
		}
	}
	if score > 437000 {
		score = 437000
	}
	return score, nil
}

// PromoRule11_213 scores a promo by item count and total units.
func PromoRule11_213(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 11.213: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 26)
		}
	}
	if score > 601000 {
		score = 601000
	}
	return score, nil
}

// SeasonRule11_214 scores a season by item count and total units.
func SeasonRule11_214(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 11.214: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 12)
		}
	}
	if score > 477000 {
		score = 477000
	}
	return score, nil
}

// QuoteRule11_215 scores a quote by item count and total units.
func QuoteRule11_215(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.215: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 23)
		}
	}
	if score > 489000 {
		score = 489000
	}
	return score, nil
}

// QuoteRule11_216 scores a quote by item count and total units.
func QuoteRule11_216(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.216: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 9)
		}
	}
	if score > 366000 {
		score = 366000
	}
	return score, nil
}

// TierRule11_217 scores a tier by item count and total units.
func TierRule11_217(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 11.217: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 28)
		}
	}
	if score > 201000 {
		score = 201000
	}
	return score, nil
}

// CartRule11_218 scores a cart by item count and total units.
func CartRule11_218(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 11.218: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 13)
		}
	}
	if score > 212000 {
		score = 212000
	}
	return score, nil
}

// RegionRule11_219 scores a region by item count and total units.
func RegionRule11_219(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 11.219: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 36)
		}
	}
	if score > 783000 {
		score = 783000
	}
	return score, nil
}

// BasketRule11_220 scores a basket by item count and total units.
func BasketRule11_220(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 11.220: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 5)
		}
	}
	if score > 422000 {
		score = 422000
	}
	return score, nil
}

// BundleRule11_221 scores a bundle by item count and total units.
func BundleRule11_221(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 11.221: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 26)
		}
	}
	if score > 456000 {
		score = 456000
	}
	return score, nil
}

// QuoteRule11_222 scores a quote by item count and total units.
func QuoteRule11_222(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 11.222: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 32)
		}
	}
	if score > 650000 {
		score = 650000
	}
	return score, nil
}
