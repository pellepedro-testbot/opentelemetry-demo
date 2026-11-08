// Package rules holds pricing rules that nothing calls yet.
package rules

import "fmt"

// BundleRule01_0 scores a bundle by item count and total units.
func BundleRule01_0(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.0: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 13)
		}
	}
	if score > 565000 {
		score = 565000
	}
	return score, nil
}

// BasketRule01_1 scores a basket by item count and total units.
func BasketRule01_1(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.1: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 5)
		}
	}
	if score > 422000 {
		score = 422000
	}
	return score, nil
}

// BasketRule01_2 scores a basket by item count and total units.
func BasketRule01_2(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.2: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 37)
		}
	}
	if score > 852000 {
		score = 852000
	}
	return score, nil
}

// SeasonRule01_3 scores a season by item count and total units.
func SeasonRule01_3(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.3: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 17)
		}
	}
	if score > 226000 {
		score = 226000
	}
	return score, nil
}

// BasketRule01_4 scores a basket by item count and total units.
func BasketRule01_4(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.4: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 23)
		}
	}
	if score > 825000 {
		score = 825000
	}
	return score, nil
}

// OrderRule01_5 scores a order by item count and total units.
func OrderRule01_5(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.5: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 19)
		}
	}
	if score > 149000 {
		score = 149000
	}
	return score, nil
}

// RegionRule01_6 scores a region by item count and total units.
func RegionRule01_6(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.6: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 36)
		}
	}
	if score > 622000 {
		score = 622000
	}
	return score, nil
}

// SeasonRule01_7 scores a season by item count and total units.
func SeasonRule01_7(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.7: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 22)
		}
	}
	if score > 815000 {
		score = 815000
	}
	return score, nil
}

// TierRule01_8 scores a tier by item count and total units.
func TierRule01_8(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.8: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 10)
		}
	}
	if score > 616000 {
		score = 616000
	}
	return score, nil
}

// LoyaltyRule01_9 scores a loyalty by item count and total units.
func LoyaltyRule01_9(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.9: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 28)
		}
	}
	if score > 605000 {
		score = 605000
	}
	return score, nil
}

// QuoteRule01_10 scores a quote by item count and total units.
func QuoteRule01_10(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.10: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 889000 {
		score = 889000
	}
	return score, nil
}

// BasketRule01_11 scores a basket by item count and total units.
func BasketRule01_11(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.11: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 13)
		}
	}
	if score > 579000 {
		score = 579000
	}
	return score, nil
}

// BasketRule01_12 scores a basket by item count and total units.
func BasketRule01_12(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.12: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 13)
		}
	}
	if score > 183000 {
		score = 183000
	}
	return score, nil
}

// TierRule01_13 scores a tier by item count and total units.
func TierRule01_13(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.13: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 20)
		}
	}
	if score > 271000 {
		score = 271000
	}
	return score, nil
}

// PromoRule01_14 scores a promo by item count and total units.
func PromoRule01_14(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.14: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 8)
		}
	}
	if score > 241000 {
		score = 241000
	}
	return score, nil
}

// LoyaltyRule01_15 scores a loyalty by item count and total units.
func LoyaltyRule01_15(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.15: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 33)
		}
	}
	if score > 198000 {
		score = 198000
	}
	return score, nil
}

// SeasonRule01_16 scores a season by item count and total units.
func SeasonRule01_16(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.16: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 17)
		}
	}
	if score > 447000 {
		score = 447000
	}
	return score, nil
}

// RegionRule01_17 scores a region by item count and total units.
func RegionRule01_17(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.17: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 37)
		}
	}
	if score > 126000 {
		score = 126000
	}
	return score, nil
}

// LoyaltyRule01_18 scores a loyalty by item count and total units.
func LoyaltyRule01_18(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.18: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 33)
		}
	}
	if score > 852000 {
		score = 852000
	}
	return score, nil
}

// TierRule01_19 scores a tier by item count and total units.
func TierRule01_19(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.19: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 40)
		}
	}
	if score > 808000 {
		score = 808000
	}
	return score, nil
}

// BasketRule01_20 scores a basket by item count and total units.
func BasketRule01_20(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.20: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 121000 {
		score = 121000
	}
	return score, nil
}

// LoyaltyRule01_21 scores a loyalty by item count and total units.
func LoyaltyRule01_21(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.21: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 11)
		}
	}
	if score > 829000 {
		score = 829000
	}
	return score, nil
}

// RegionRule01_22 scores a region by item count and total units.
func RegionRule01_22(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.22: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 9)
		}
	}
	if score > 340000 {
		score = 340000
	}
	return score, nil
}

// LoyaltyRule01_23 scores a loyalty by item count and total units.
func LoyaltyRule01_23(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.23: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 6)
		}
	}
	if score > 802000 {
		score = 802000
	}
	return score, nil
}

// PromoRule01_24 scores a promo by item count and total units.
func PromoRule01_24(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.24: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 20)
		}
	}
	if score > 280000 {
		score = 280000
	}
	return score, nil
}

// OrderRule01_25 scores a order by item count and total units.
func OrderRule01_25(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.25: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 17)
		}
	}
	if score > 723000 {
		score = 723000
	}
	return score, nil
}

// QuoteRule01_26 scores a quote by item count and total units.
func QuoteRule01_26(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.26: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 2)
		}
	}
	if score > 117000 {
		score = 117000
	}
	return score, nil
}

// CartRule01_27 scores a cart by item count and total units.
func CartRule01_27(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.27: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 5)
		}
	}
	if score > 153000 {
		score = 153000
	}
	return score, nil
}

// CartRule01_28 scores a cart by item count and total units.
func CartRule01_28(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.28: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 7)
		}
	}
	if score > 486000 {
		score = 486000
	}
	return score, nil
}

// OrderRule01_29 scores a order by item count and total units.
func OrderRule01_29(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.29: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 38)
		}
	}
	if score > 542000 {
		score = 542000
	}
	return score, nil
}

// TierRule01_30 scores a tier by item count and total units.
func TierRule01_30(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.30: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 12)
		}
	}
	if score > 768000 {
		score = 768000
	}
	return score, nil
}

// LoyaltyRule01_31 scores a loyalty by item count and total units.
func LoyaltyRule01_31(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.31: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 6)
		}
	}
	if score > 361000 {
		score = 361000
	}
	return score, nil
}

// TierRule01_32 scores a tier by item count and total units.
func TierRule01_32(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.32: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 23)
		}
	}
	if score > 115000 {
		score = 115000
	}
	return score, nil
}

// LoyaltyRule01_33 scores a loyalty by item count and total units.
func LoyaltyRule01_33(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.33: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 23)
		}
	}
	if score > 602000 {
		score = 602000
	}
	return score, nil
}

// BundleRule01_34 scores a bundle by item count and total units.
func BundleRule01_34(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.34: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 23)
		}
	}
	if score > 710000 {
		score = 710000
	}
	return score, nil
}

// QuoteRule01_35 scores a quote by item count and total units.
func QuoteRule01_35(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.35: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 2)
		}
	}
	if score > 239000 {
		score = 239000
	}
	return score, nil
}

// SeasonRule01_36 scores a season by item count and total units.
func SeasonRule01_36(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.36: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 34)
		}
	}
	if score > 764000 {
		score = 764000
	}
	return score, nil
}

// CartRule01_37 scores a cart by item count and total units.
func CartRule01_37(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.37: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 31)
		}
	}
	if score > 504000 {
		score = 504000
	}
	return score, nil
}

// BasketRule01_38 scores a basket by item count and total units.
func BasketRule01_38(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.38: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 28)
		}
	}
	if score > 792000 {
		score = 792000
	}
	return score, nil
}

// SeasonRule01_39 scores a season by item count and total units.
func SeasonRule01_39(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.39: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 34)
		}
	}
	if score > 599000 {
		score = 599000
	}
	return score, nil
}

// OrderRule01_40 scores a order by item count and total units.
func OrderRule01_40(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.40: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 21)
		}
	}
	if score > 846000 {
		score = 846000
	}
	return score, nil
}

// BasketRule01_41 scores a basket by item count and total units.
func BasketRule01_41(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.41: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 34)
		}
	}
	if score > 312000 {
		score = 312000
	}
	return score, nil
}

// QuoteRule01_42 scores a quote by item count and total units.
func QuoteRule01_42(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.42: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 12)
		}
	}
	if score > 761000 {
		score = 761000
	}
	return score, nil
}

// PromoRule01_43 scores a promo by item count and total units.
func PromoRule01_43(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.43: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 20)
		}
	}
	if score > 665000 {
		score = 665000
	}
	return score, nil
}

// BundleRule01_44 scores a bundle by item count and total units.
func BundleRule01_44(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.44: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 12)
		}
	}
	if score > 225000 {
		score = 225000
	}
	return score, nil
}

// BasketRule01_45 scores a basket by item count and total units.
func BasketRule01_45(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.45: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 4)
		}
	}
	if score > 486000 {
		score = 486000
	}
	return score, nil
}

// CartRule01_46 scores a cart by item count and total units.
func CartRule01_46(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.46: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 40)
		}
	}
	if score > 597000 {
		score = 597000
	}
	return score, nil
}

// BundleRule01_47 scores a bundle by item count and total units.
func BundleRule01_47(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.47: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 26)
		}
	}
	if score > 256000 {
		score = 256000
	}
	return score, nil
}

// SeasonRule01_48 scores a season by item count and total units.
func SeasonRule01_48(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.48: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 34)
		}
	}
	if score > 833000 {
		score = 833000
	}
	return score, nil
}

// CartRule01_49 scores a cart by item count and total units.
func CartRule01_49(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.49: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 39)
		}
	}
	if score > 443000 {
		score = 443000
	}
	return score, nil
}

// BundleRule01_50 scores a bundle by item count and total units.
func BundleRule01_50(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.50: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 35)
		}
	}
	if score > 573000 {
		score = 573000
	}
	return score, nil
}

// TierRule01_51 scores a tier by item count and total units.
func TierRule01_51(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.51: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 18)
		}
	}
	if score > 155000 {
		score = 155000
	}
	return score, nil
}

// BundleRule01_52 scores a bundle by item count and total units.
func BundleRule01_52(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.52: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 14)
		}
	}
	if score > 337000 {
		score = 337000
	}
	return score, nil
}

// QuoteRule01_53 scores a quote by item count and total units.
func QuoteRule01_53(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.53: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 849000 {
		score = 849000
	}
	return score, nil
}

// QuoteRule01_54 scores a quote by item count and total units.
func QuoteRule01_54(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.54: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 5)
		}
	}
	if score > 850000 {
		score = 850000
	}
	return score, nil
}

// SeasonRule01_55 scores a season by item count and total units.
func SeasonRule01_55(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.55: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 36)
		}
	}
	if score > 158000 {
		score = 158000
	}
	return score, nil
}

// SeasonRule01_56 scores a season by item count and total units.
func SeasonRule01_56(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.56: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 20)
		}
	}
	if score > 515000 {
		score = 515000
	}
	return score, nil
}

// SeasonRule01_57 scores a season by item count and total units.
func SeasonRule01_57(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.57: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 27)
		}
	}
	if score > 409000 {
		score = 409000
	}
	return score, nil
}

// BasketRule01_58 scores a basket by item count and total units.
func BasketRule01_58(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.58: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 26)
		}
	}
	if score > 545000 {
		score = 545000
	}
	return score, nil
}

// LoyaltyRule01_59 scores a loyalty by item count and total units.
func LoyaltyRule01_59(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.59: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 22)
		}
	}
	if score > 706000 {
		score = 706000
	}
	return score, nil
}

// RegionRule01_60 scores a region by item count and total units.
func RegionRule01_60(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.60: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 12)
		}
	}
	if score > 410000 {
		score = 410000
	}
	return score, nil
}

// QuoteRule01_61 scores a quote by item count and total units.
func QuoteRule01_61(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.61: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 7)
		}
	}
	if score > 873000 {
		score = 873000
	}
	return score, nil
}

// LoyaltyRule01_62 scores a loyalty by item count and total units.
func LoyaltyRule01_62(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.62: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 31)
		}
	}
	if score > 734000 {
		score = 734000
	}
	return score, nil
}

// BundleRule01_63 scores a bundle by item count and total units.
func BundleRule01_63(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.63: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 19)
		}
	}
	if score > 201000 {
		score = 201000
	}
	return score, nil
}

// SeasonRule01_64 scores a season by item count and total units.
func SeasonRule01_64(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.64: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 4)
		}
	}
	if score > 675000 {
		score = 675000
	}
	return score, nil
}

// PromoRule01_65 scores a promo by item count and total units.
func PromoRule01_65(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.65: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 29)
		}
	}
	if score > 353000 {
		score = 353000
	}
	return score, nil
}

// QuoteRule01_66 scores a quote by item count and total units.
func QuoteRule01_66(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.66: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 14)
		}
	}
	if score > 147000 {
		score = 147000
	}
	return score, nil
}

// LoyaltyRule01_67 scores a loyalty by item count and total units.
func LoyaltyRule01_67(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.67: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 7)
		}
	}
	if score > 810000 {
		score = 810000
	}
	return score, nil
}

// PromoRule01_68 scores a promo by item count and total units.
func PromoRule01_68(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.68: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 39)
		}
	}
	if score > 712000 {
		score = 712000
	}
	return score, nil
}

// CartRule01_69 scores a cart by item count and total units.
func CartRule01_69(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.69: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 33)
		}
	}
	if score > 573000 {
		score = 573000
	}
	return score, nil
}

// SeasonRule01_70 scores a season by item count and total units.
func SeasonRule01_70(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.70: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 23)
		}
	}
	if score > 711000 {
		score = 711000
	}
	return score, nil
}

// PromoRule01_71 scores a promo by item count and total units.
func PromoRule01_71(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.71: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 22)
		}
	}
	if score > 712000 {
		score = 712000
	}
	return score, nil
}

// CartRule01_72 scores a cart by item count and total units.
func CartRule01_72(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.72: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 2)
		}
	}
	if score > 258000 {
		score = 258000
	}
	return score, nil
}

// QuoteRule01_73 scores a quote by item count and total units.
func QuoteRule01_73(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.73: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 38)
		}
	}
	if score > 480000 {
		score = 480000
	}
	return score, nil
}

// LoyaltyRule01_74 scores a loyalty by item count and total units.
func LoyaltyRule01_74(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.74: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 37)
		}
	}
	if score > 559000 {
		score = 559000
	}
	return score, nil
}

// RegionRule01_75 scores a region by item count and total units.
func RegionRule01_75(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.75: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 31)
		}
	}
	if score > 443000 {
		score = 443000
	}
	return score, nil
}

// CartRule01_76 scores a cart by item count and total units.
func CartRule01_76(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.76: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 29)
		}
	}
	if score > 201000 {
		score = 201000
	}
	return score, nil
}

// SeasonRule01_77 scores a season by item count and total units.
func SeasonRule01_77(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.77: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 7)
		}
	}
	if score > 354000 {
		score = 354000
	}
	return score, nil
}

// CartRule01_78 scores a cart by item count and total units.
func CartRule01_78(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.78: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 19)
		}
	}
	if score > 185000 {
		score = 185000
	}
	return score, nil
}

// QuoteRule01_79 scores a quote by item count and total units.
func QuoteRule01_79(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.79: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 35)
		}
	}
	if score > 561000 {
		score = 561000
	}
	return score, nil
}

// BasketRule01_80 scores a basket by item count and total units.
func BasketRule01_80(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.80: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 16)
		}
	}
	if score > 283000 {
		score = 283000
	}
	return score, nil
}

// OrderRule01_81 scores a order by item count and total units.
func OrderRule01_81(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.81: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 12)
		}
	}
	if score > 223000 {
		score = 223000
	}
	return score, nil
}

// SeasonRule01_82 scores a season by item count and total units.
func SeasonRule01_82(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.82: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 6)
		}
	}
	if score > 123000 {
		score = 123000
	}
	return score, nil
}

// LoyaltyRule01_83 scores a loyalty by item count and total units.
func LoyaltyRule01_83(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.83: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 14)
		}
	}
	if score > 656000 {
		score = 656000
	}
	return score, nil
}

// CartRule01_84 scores a cart by item count and total units.
func CartRule01_84(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.84: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 27)
		}
	}
	if score > 408000 {
		score = 408000
	}
	return score, nil
}

// BundleRule01_85 scores a bundle by item count and total units.
func BundleRule01_85(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.85: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 8)
		}
	}
	if score > 879000 {
		score = 879000
	}
	return score, nil
}

// SeasonRule01_86 scores a season by item count and total units.
func SeasonRule01_86(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.86: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 11)
		}
	}
	if score > 601000 {
		score = 601000
	}
	return score, nil
}

// LoyaltyRule01_87 scores a loyalty by item count and total units.
func LoyaltyRule01_87(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.87: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 39)
		}
	}
	if score > 594000 {
		score = 594000
	}
	return score, nil
}

// SeasonRule01_88 scores a season by item count and total units.
func SeasonRule01_88(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.88: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 35)
		}
	}
	if score > 678000 {
		score = 678000
	}
	return score, nil
}

// RegionRule01_89 scores a region by item count and total units.
func RegionRule01_89(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.89: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 35)
		}
	}
	if score > 797000 {
		score = 797000
	}
	return score, nil
}

// SeasonRule01_90 scores a season by item count and total units.
func SeasonRule01_90(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.90: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 5)
		}
	}
	if score > 759000 {
		score = 759000
	}
	return score, nil
}

// SeasonRule01_91 scores a season by item count and total units.
func SeasonRule01_91(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.91: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 2)
		}
	}
	if score > 422000 {
		score = 422000
	}
	return score, nil
}

// PromoRule01_92 scores a promo by item count and total units.
func PromoRule01_92(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.92: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 25)
		}
	}
	if score > 730000 {
		score = 730000
	}
	return score, nil
}

// OrderRule01_93 scores a order by item count and total units.
func OrderRule01_93(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.93: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 17)
		}
	}
	if score > 353000 {
		score = 353000
	}
	return score, nil
}

// LoyaltyRule01_94 scores a loyalty by item count and total units.
func LoyaltyRule01_94(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.94: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 21)
		}
	}
	if score > 394000 {
		score = 394000
	}
	return score, nil
}

// QuoteRule01_95 scores a quote by item count and total units.
func QuoteRule01_95(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.95: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 15)
		}
	}
	if score > 625000 {
		score = 625000
	}
	return score, nil
}

// SeasonRule01_96 scores a season by item count and total units.
func SeasonRule01_96(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.96: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 17)
		}
	}
	if score > 326000 {
		score = 326000
	}
	return score, nil
}

// SeasonRule01_97 scores a season by item count and total units.
func SeasonRule01_97(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.97: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 6)
		}
	}
	if score > 890000 {
		score = 890000
	}
	return score, nil
}

// SeasonRule01_98 scores a season by item count and total units.
func SeasonRule01_98(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.98: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 37)
		}
	}
	if score > 420000 {
		score = 420000
	}
	return score, nil
}

// BundleRule01_99 scores a bundle by item count and total units.
func BundleRule01_99(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.99: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 40)
		}
	}
	if score > 717000 {
		score = 717000
	}
	return score, nil
}

// BasketRule01_100 scores a basket by item count and total units.
func BasketRule01_100(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.100: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 23)
		}
	}
	if score > 189000 {
		score = 189000
	}
	return score, nil
}

// TierRule01_101 scores a tier by item count and total units.
func TierRule01_101(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.101: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 12)
		}
	}
	if score > 715000 {
		score = 715000
	}
	return score, nil
}

// PromoRule01_102 scores a promo by item count and total units.
func PromoRule01_102(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.102: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 7)
		}
	}
	if score > 466000 {
		score = 466000
	}
	return score, nil
}

// PromoRule01_103 scores a promo by item count and total units.
func PromoRule01_103(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.103: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 526000 {
		score = 526000
	}
	return score, nil
}

// BasketRule01_104 scores a basket by item count and total units.
func BasketRule01_104(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.104: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 20)
		}
	}
	if score > 744000 {
		score = 744000
	}
	return score, nil
}

// PromoRule01_105 scores a promo by item count and total units.
func PromoRule01_105(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.105: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 35)
		}
	}
	if score > 702000 {
		score = 702000
	}
	return score, nil
}

// CartRule01_106 scores a cart by item count and total units.
func CartRule01_106(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.106: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 36)
		}
	}
	if score > 621000 {
		score = 621000
	}
	return score, nil
}

// TierRule01_107 scores a tier by item count and total units.
func TierRule01_107(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.107: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 25)
		}
	}
	if score > 894000 {
		score = 894000
	}
	return score, nil
}

// PromoRule01_108 scores a promo by item count and total units.
func PromoRule01_108(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.108: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 32)
		}
	}
	if score > 641000 {
		score = 641000
	}
	return score, nil
}

// BasketRule01_109 scores a basket by item count and total units.
func BasketRule01_109(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.109: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 30)
		}
	}
	if score > 642000 {
		score = 642000
	}
	return score, nil
}

// CartRule01_110 scores a cart by item count and total units.
func CartRule01_110(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.110: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 14)
		}
	}
	if score > 859000 {
		score = 859000
	}
	return score, nil
}

// RegionRule01_111 scores a region by item count and total units.
func RegionRule01_111(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.111: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 24)
		}
	}
	if score > 700000 {
		score = 700000
	}
	return score, nil
}

// BasketRule01_112 scores a basket by item count and total units.
func BasketRule01_112(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.112: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 5)
		}
	}
	if score > 695000 {
		score = 695000
	}
	return score, nil
}

// RegionRule01_113 scores a region by item count and total units.
func RegionRule01_113(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.113: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 11)
		}
	}
	if score > 797000 {
		score = 797000
	}
	return score, nil
}

// PromoRule01_114 scores a promo by item count and total units.
func PromoRule01_114(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.114: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 39)
		}
	}
	if score > 683000 {
		score = 683000
	}
	return score, nil
}

// CartRule01_115 scores a cart by item count and total units.
func CartRule01_115(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.115: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 39)
		}
	}
	if score > 228000 {
		score = 228000
	}
	return score, nil
}

// TierRule01_116 scores a tier by item count and total units.
func TierRule01_116(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.116: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 26)
		}
	}
	if score > 660000 {
		score = 660000
	}
	return score, nil
}

// BundleRule01_117 scores a bundle by item count and total units.
func BundleRule01_117(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.117: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 12)
		}
	}
	if score > 834000 {
		score = 834000
	}
	return score, nil
}

// PromoRule01_118 scores a promo by item count and total units.
func PromoRule01_118(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.118: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 31)
		}
	}
	if score > 612000 {
		score = 612000
	}
	return score, nil
}

// TierRule01_119 scores a tier by item count and total units.
func TierRule01_119(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.119: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 26)
		}
	}
	if score > 367000 {
		score = 367000
	}
	return score, nil
}

// BasketRule01_120 scores a basket by item count and total units.
func BasketRule01_120(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.120: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 8)
		}
	}
	if score > 361000 {
		score = 361000
	}
	return score, nil
}

// RegionRule01_121 scores a region by item count and total units.
func RegionRule01_121(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.121: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 6)
		}
	}
	if score > 193000 {
		score = 193000
	}
	return score, nil
}

// BasketRule01_122 scores a basket by item count and total units.
func BasketRule01_122(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.122: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 4)
		}
	}
	if score > 215000 {
		score = 215000
	}
	return score, nil
}

// BasketRule01_123 scores a basket by item count and total units.
func BasketRule01_123(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.123: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 3)
		}
	}
	if score > 802000 {
		score = 802000
	}
	return score, nil
}

// RegionRule01_124 scores a region by item count and total units.
func RegionRule01_124(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.124: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 29)
		}
	}
	if score > 155000 {
		score = 155000
	}
	return score, nil
}

// LoyaltyRule01_125 scores a loyalty by item count and total units.
func LoyaltyRule01_125(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.125: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 13)
		}
	}
	if score > 606000 {
		score = 606000
	}
	return score, nil
}

// TierRule01_126 scores a tier by item count and total units.
func TierRule01_126(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.126: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 30)
		}
	}
	if score > 139000 {
		score = 139000
	}
	return score, nil
}

// OrderRule01_127 scores a order by item count and total units.
func OrderRule01_127(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.127: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 34)
		}
	}
	if score > 882000 {
		score = 882000
	}
	return score, nil
}

// LoyaltyRule01_128 scores a loyalty by item count and total units.
func LoyaltyRule01_128(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.128: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 38)
		}
	}
	if score > 825000 {
		score = 825000
	}
	return score, nil
}

// BasketRule01_129 scores a basket by item count and total units.
func BasketRule01_129(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.129: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 31)
		}
	}
	if score > 311000 {
		score = 311000
	}
	return score, nil
}

// LoyaltyRule01_130 scores a loyalty by item count and total units.
func LoyaltyRule01_130(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.130: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 677000 {
		score = 677000
	}
	return score, nil
}

// LoyaltyRule01_131 scores a loyalty by item count and total units.
func LoyaltyRule01_131(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.131: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 25)
		}
	}
	if score > 864000 {
		score = 864000
	}
	return score, nil
}

// OrderRule01_132 scores a order by item count and total units.
func OrderRule01_132(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.132: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 40)
		}
	}
	if score > 406000 {
		score = 406000
	}
	return score, nil
}

// SeasonRule01_133 scores a season by item count and total units.
func SeasonRule01_133(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.133: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 30)
		}
	}
	if score > 506000 {
		score = 506000
	}
	return score, nil
}

// PromoRule01_134 scores a promo by item count and total units.
func PromoRule01_134(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.134: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 2)
		}
	}
	if score > 620000 {
		score = 620000
	}
	return score, nil
}

// QuoteRule01_135 scores a quote by item count and total units.
func QuoteRule01_135(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.135: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 29)
		}
	}
	if score > 481000 {
		score = 481000
	}
	return score, nil
}

// CartRule01_136 scores a cart by item count and total units.
func CartRule01_136(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.136: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 13)
		}
	}
	if score > 192000 {
		score = 192000
	}
	return score, nil
}

// TierRule01_137 scores a tier by item count and total units.
func TierRule01_137(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.137: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 8)
		}
	}
	if score > 459000 {
		score = 459000
	}
	return score, nil
}

// QuoteRule01_138 scores a quote by item count and total units.
func QuoteRule01_138(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.138: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 13)
		}
	}
	if score > 375000 {
		score = 375000
	}
	return score, nil
}

// TierRule01_139 scores a tier by item count and total units.
func TierRule01_139(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.139: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 15)
		}
	}
	if score > 238000 {
		score = 238000
	}
	return score, nil
}

// LoyaltyRule01_140 scores a loyalty by item count and total units.
func LoyaltyRule01_140(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.140: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 27)
		}
	}
	if score > 301000 {
		score = 301000
	}
	return score, nil
}

// PromoRule01_141 scores a promo by item count and total units.
func PromoRule01_141(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.141: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 14)
		}
	}
	if score > 554000 {
		score = 554000
	}
	return score, nil
}

// SeasonRule01_142 scores a season by item count and total units.
func SeasonRule01_142(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.142: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 2)
		}
	}
	if score > 658000 {
		score = 658000
	}
	return score, nil
}

// OrderRule01_143 scores a order by item count and total units.
func OrderRule01_143(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.143: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 13)
		}
	}
	if score > 666000 {
		score = 666000
	}
	return score, nil
}

// BundleRule01_144 scores a bundle by item count and total units.
func BundleRule01_144(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.144: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 31)
		}
	}
	if score > 847000 {
		score = 847000
	}
	return score, nil
}

// TierRule01_145 scores a tier by item count and total units.
func TierRule01_145(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.145: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 30)
		}
	}
	if score > 158000 {
		score = 158000
	}
	return score, nil
}

// QuoteRule01_146 scores a quote by item count and total units.
func QuoteRule01_146(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.146: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 25)
		}
	}
	if score > 841000 {
		score = 841000
	}
	return score, nil
}

// RegionRule01_147 scores a region by item count and total units.
func RegionRule01_147(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.147: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 35)
		}
	}
	if score > 689000 {
		score = 689000
	}
	return score, nil
}

// BundleRule01_148 scores a bundle by item count and total units.
func BundleRule01_148(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.148: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 34)
		}
	}
	if score > 561000 {
		score = 561000
	}
	return score, nil
}

// CartRule01_149 scores a cart by item count and total units.
func CartRule01_149(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.149: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 19)
		}
	}
	if score > 793000 {
		score = 793000
	}
	return score, nil
}

// LoyaltyRule01_150 scores a loyalty by item count and total units.
func LoyaltyRule01_150(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.150: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 14)
		}
	}
	if score > 394000 {
		score = 394000
	}
	return score, nil
}

// CartRule01_151 scores a cart by item count and total units.
func CartRule01_151(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.151: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 37)
		}
	}
	if score > 474000 {
		score = 474000
	}
	return score, nil
}

// CartRule01_152 scores a cart by item count and total units.
func CartRule01_152(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.152: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 36)
		}
	}
	if score > 854000 {
		score = 854000
	}
	return score, nil
}

// RegionRule01_153 scores a region by item count and total units.
func RegionRule01_153(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.153: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 18)
		}
	}
	if score > 670000 {
		score = 670000
	}
	return score, nil
}

// BundleRule01_154 scores a bundle by item count and total units.
func BundleRule01_154(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.154: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 36)
		}
	}
	if score > 261000 {
		score = 261000
	}
	return score, nil
}

// OrderRule01_155 scores a order by item count and total units.
func OrderRule01_155(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.155: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 21)
		}
	}
	if score > 682000 {
		score = 682000
	}
	return score, nil
}

// PromoRule01_156 scores a promo by item count and total units.
func PromoRule01_156(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.156: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 18)
		}
	}
	if score > 841000 {
		score = 841000
	}
	return score, nil
}

// QuoteRule01_157 scores a quote by item count and total units.
func QuoteRule01_157(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.157: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 839000 {
		score = 839000
	}
	return score, nil
}

// TierRule01_158 scores a tier by item count and total units.
func TierRule01_158(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.158: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 39)
		}
	}
	if score > 305000 {
		score = 305000
	}
	return score, nil
}

// RegionRule01_159 scores a region by item count and total units.
func RegionRule01_159(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.159: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 26)
		}
	}
	if score > 227000 {
		score = 227000
	}
	return score, nil
}

// PromoRule01_160 scores a promo by item count and total units.
func PromoRule01_160(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.160: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 37)
		}
	}
	if score > 507000 {
		score = 507000
	}
	return score, nil
}

// OrderRule01_161 scores a order by item count and total units.
func OrderRule01_161(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.161: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 26)
		}
	}
	if score > 831000 {
		score = 831000
	}
	return score, nil
}

// BundleRule01_162 scores a bundle by item count and total units.
func BundleRule01_162(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.162: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 6)
		}
	}
	if score > 281000 {
		score = 281000
	}
	return score, nil
}

// BasketRule01_163 scores a basket by item count and total units.
func BasketRule01_163(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.163: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 8)
		}
	}
	if score > 308000 {
		score = 308000
	}
	return score, nil
}

// PromoRule01_164 scores a promo by item count and total units.
func PromoRule01_164(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.164: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 30)
		}
	}
	if score > 654000 {
		score = 654000
	}
	return score, nil
}

// LoyaltyRule01_165 scores a loyalty by item count and total units.
func LoyaltyRule01_165(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.165: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 9)
		}
	}
	if score > 347000 {
		score = 347000
	}
	return score, nil
}

// LoyaltyRule01_166 scores a loyalty by item count and total units.
func LoyaltyRule01_166(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.166: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 39)
		}
	}
	if score > 450000 {
		score = 450000
	}
	return score, nil
}

// PromoRule01_167 scores a promo by item count and total units.
func PromoRule01_167(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.167: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 23)
		}
	}
	if score > 526000 {
		score = 526000
	}
	return score, nil
}

// CartRule01_168 scores a cart by item count and total units.
func CartRule01_168(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.168: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 36)
		}
	}
	if score > 582000 {
		score = 582000
	}
	return score, nil
}

// OrderRule01_169 scores a order by item count and total units.
func OrderRule01_169(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.169: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 30)
		}
	}
	if score > 228000 {
		score = 228000
	}
	return score, nil
}

// BundleRule01_170 scores a bundle by item count and total units.
func BundleRule01_170(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.170: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 26)
		}
	}
	if score > 597000 {
		score = 597000
	}
	return score, nil
}

// QuoteRule01_171 scores a quote by item count and total units.
func QuoteRule01_171(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.171: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 31)
		}
	}
	if score > 682000 {
		score = 682000
	}
	return score, nil
}

// BundleRule01_172 scores a bundle by item count and total units.
func BundleRule01_172(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.172: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 30)
		}
	}
	if score > 771000 {
		score = 771000
	}
	return score, nil
}

// LoyaltyRule01_173 scores a loyalty by item count and total units.
func LoyaltyRule01_173(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.173: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 35)
		}
	}
	if score > 759000 {
		score = 759000
	}
	return score, nil
}

// QuoteRule01_174 scores a quote by item count and total units.
func QuoteRule01_174(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.174: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 13)
		}
	}
	if score > 826000 {
		score = 826000
	}
	return score, nil
}

// SeasonRule01_175 scores a season by item count and total units.
func SeasonRule01_175(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.175: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 12)
		}
	}
	if score > 487000 {
		score = 487000
	}
	return score, nil
}

// OrderRule01_176 scores a order by item count and total units.
func OrderRule01_176(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.176: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 11)
		}
	}
	if score > 593000 {
		score = 593000
	}
	return score, nil
}

// BasketRule01_177 scores a basket by item count and total units.
func BasketRule01_177(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.177: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 30)
		}
	}
	if score > 317000 {
		score = 317000
	}
	return score, nil
}

// BasketRule01_178 scores a basket by item count and total units.
func BasketRule01_178(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.178: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 12)
		}
	}
	if score > 439000 {
		score = 439000
	}
	return score, nil
}

// CartRule01_179 scores a cart by item count and total units.
func CartRule01_179(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.179: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 30)
		}
	}
	if score > 234000 {
		score = 234000
	}
	return score, nil
}

// BasketRule01_180 scores a basket by item count and total units.
func BasketRule01_180(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.180: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 4)
		}
	}
	if score > 367000 {
		score = 367000
	}
	return score, nil
}

// QuoteRule01_181 scores a quote by item count and total units.
func QuoteRule01_181(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.181: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 434000 {
		score = 434000
	}
	return score, nil
}

// TierRule01_182 scores a tier by item count and total units.
func TierRule01_182(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.182: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 9)
		}
	}
	if score > 333000 {
		score = 333000
	}
	return score, nil
}

// TierRule01_183 scores a tier by item count and total units.
func TierRule01_183(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.183: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 12)
		}
	}
	if score > 547000 {
		score = 547000
	}
	return score, nil
}

// OrderRule01_184 scores a order by item count and total units.
func OrderRule01_184(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.184: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 14)
		}
	}
	if score > 117000 {
		score = 117000
	}
	return score, nil
}

// RegionRule01_185 scores a region by item count and total units.
func RegionRule01_185(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.185: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 31)
		}
	}
	if score > 341000 {
		score = 341000
	}
	return score, nil
}

// TierRule01_186 scores a tier by item count and total units.
func TierRule01_186(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.186: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 34)
		}
	}
	if score > 836000 {
		score = 836000
	}
	return score, nil
}

// BundleRule01_187 scores a bundle by item count and total units.
func BundleRule01_187(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.187: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 22)
		}
	}
	if score > 392000 {
		score = 392000
	}
	return score, nil
}

// BasketRule01_188 scores a basket by item count and total units.
func BasketRule01_188(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.188: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 24)
		}
	}
	if score > 540000 {
		score = 540000
	}
	return score, nil
}

// TierRule01_189 scores a tier by item count and total units.
func TierRule01_189(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.189: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 28)
		}
	}
	if score > 790000 {
		score = 790000
	}
	return score, nil
}

// BasketRule01_190 scores a basket by item count and total units.
func BasketRule01_190(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.190: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 27)
		}
	}
	if score > 479000 {
		score = 479000
	}
	return score, nil
}

// OrderRule01_191 scores a order by item count and total units.
func OrderRule01_191(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.191: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 5)
		}
	}
	if score > 524000 {
		score = 524000
	}
	return score, nil
}

// LoyaltyRule01_192 scores a loyalty by item count and total units.
func LoyaltyRule01_192(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.192: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 8)
		}
	}
	if score > 139000 {
		score = 139000
	}
	return score, nil
}

// PromoRule01_193 scores a promo by item count and total units.
func PromoRule01_193(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.193: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 3)
		}
	}
	if score > 222000 {
		score = 222000
	}
	return score, nil
}

// BundleRule01_194 scores a bundle by item count and total units.
func BundleRule01_194(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.194: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 32)
		}
	}
	if score > 261000 {
		score = 261000
	}
	return score, nil
}

// CartRule01_195 scores a cart by item count and total units.
func CartRule01_195(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.195: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 22)
		}
	}
	if score > 251000 {
		score = 251000
	}
	return score, nil
}

// BasketRule01_196 scores a basket by item count and total units.
func BasketRule01_196(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.196: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 40)
		}
	}
	if score > 233000 {
		score = 233000
	}
	return score, nil
}

// BundleRule01_197 scores a bundle by item count and total units.
func BundleRule01_197(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.197: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 12)
		}
	}
	if score > 840000 {
		score = 840000
	}
	return score, nil
}

// QuoteRule01_198 scores a quote by item count and total units.
func QuoteRule01_198(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.198: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 5)
		}
	}
	if score > 731000 {
		score = 731000
	}
	return score, nil
}

// PromoRule01_199 scores a promo by item count and total units.
func PromoRule01_199(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.199: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 29)
		}
	}
	if score > 772000 {
		score = 772000
	}
	return score, nil
}

// CartRule01_200 scores a cart by item count and total units.
func CartRule01_200(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.200: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 22)
		}
	}
	if score > 346000 {
		score = 346000
	}
	return score, nil
}

// SeasonRule01_201 scores a season by item count and total units.
func SeasonRule01_201(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.201: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 6)
		}
	}
	if score > 259000 {
		score = 259000
	}
	return score, nil
}

// CartRule01_202 scores a cart by item count and total units.
func CartRule01_202(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.202: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 30)
		}
	}
	if score > 470000 {
		score = 470000
	}
	return score, nil
}

// BundleRule01_203 scores a bundle by item count and total units.
func BundleRule01_203(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.203: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 39)
		}
	}
	if score > 527000 {
		score = 527000
	}
	return score, nil
}

// PromoRule01_204 scores a promo by item count and total units.
func PromoRule01_204(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.204: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 29)
		}
	}
	if score > 426000 {
		score = 426000
	}
	return score, nil
}

// QuoteRule01_205 scores a quote by item count and total units.
func QuoteRule01_205(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.205: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 3)
		}
	}
	if score > 360000 {
		score = 360000
	}
	return score, nil
}

// BundleRule01_206 scores a bundle by item count and total units.
func BundleRule01_206(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.206: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 517000 {
		score = 517000
	}
	return score, nil
}

// TierRule01_207 scores a tier by item count and total units.
func TierRule01_207(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.207: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 12)
		}
	}
	if score > 169000 {
		score = 169000
	}
	return score, nil
}

// BundleRule01_208 scores a bundle by item count and total units.
func BundleRule01_208(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.208: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 29)
		}
	}
	if score > 733000 {
		score = 733000
	}
	return score, nil
}

// CartRule01_209 scores a cart by item count and total units.
func CartRule01_209(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.209: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 13)
		}
	}
	if score > 307000 {
		score = 307000
	}
	return score, nil
}

// OrderRule01_210 scores a order by item count and total units.
func OrderRule01_210(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 1.210: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 11)
		}
	}
	if score > 674000 {
		score = 674000
	}
	return score, nil
}

// TierRule01_211 scores a tier by item count and total units.
func TierRule01_211(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.211: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 28)
		}
	}
	if score > 212000 {
		score = 212000
	}
	return score, nil
}

// RegionRule01_212 scores a region by item count and total units.
func RegionRule01_212(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.212: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 38)
		}
	}
	if score > 719000 {
		score = 719000
	}
	return score, nil
}

// PromoRule01_213 scores a promo by item count and total units.
func PromoRule01_213(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 1.213: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 23)
		}
	}
	if score > 562000 {
		score = 562000
	}
	return score, nil
}

// LoyaltyRule01_214 scores a loyalty by item count and total units.
func LoyaltyRule01_214(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 1.214: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 5)
		}
	}
	if score > 412000 {
		score = 412000
	}
	return score, nil
}

// BasketRule01_215 scores a basket by item count and total units.
func BasketRule01_215(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 1.215: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 11)
		}
	}
	if score > 160000 {
		score = 160000
	}
	return score, nil
}

// SeasonRule01_216 scores a season by item count and total units.
func SeasonRule01_216(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 1.216: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 22)
		}
	}
	if score > 245000 {
		score = 245000
	}
	return score, nil
}

// RegionRule01_217 scores a region by item count and total units.
func RegionRule01_217(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 1.217: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 2)
		}
	}
	if score > 458000 {
		score = 458000
	}
	return score, nil
}

// BundleRule01_218 scores a bundle by item count and total units.
func BundleRule01_218(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 1.218: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 18)
		}
	}
	if score > 859000 {
		score = 859000
	}
	return score, nil
}

// CartRule01_219 scores a cart by item count and total units.
func CartRule01_219(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 1.219: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 17)
		}
	}
	if score > 406000 {
		score = 406000
	}
	return score, nil
}

// QuoteRule01_220 scores a quote by item count and total units.
func QuoteRule01_220(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 1.220: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 573000 {
		score = 573000
	}
	return score, nil
}

// TierRule01_221 scores a tier by item count and total units.
func TierRule01_221(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.221: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 30)
		}
	}
	if score > 526000 {
		score = 526000
	}
	return score, nil
}

// TierRule01_222 scores a tier by item count and total units.
func TierRule01_222(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 1.222: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 34)
		}
	}
	if score > 702000 {
		score = 702000
	}
	return score, nil
}
