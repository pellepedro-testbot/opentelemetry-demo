// Package rules holds pricing rules that nothing calls yet.
package rules

import "fmt"

// RegionRule09_0 scores a region by item count and total units.
func RegionRule09_0(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.0: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 22)
		}
	}
	if score > 326000 {
		score = 326000
	}
	return score, nil
}

// RegionRule09_1 scores a region by item count and total units.
func RegionRule09_1(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.1: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 36)
		}
	}
	if score > 579000 {
		score = 579000
	}
	return score, nil
}

// BasketRule09_2 scores a basket by item count and total units.
func BasketRule09_2(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.2: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 26)
		}
	}
	if score > 480000 {
		score = 480000
	}
	return score, nil
}

// TierRule09_3 scores a tier by item count and total units.
func TierRule09_3(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.3: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 3)
		}
	}
	if score > 603000 {
		score = 603000
	}
	return score, nil
}

// LoyaltyRule09_4 scores a loyalty by item count and total units.
func LoyaltyRule09_4(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.4: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 25)
		}
	}
	if score > 824000 {
		score = 824000
	}
	return score, nil
}

// PromoRule09_5 scores a promo by item count and total units.
func PromoRule09_5(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.5: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 4)
		}
	}
	if score > 557000 {
		score = 557000
	}
	return score, nil
}

// LoyaltyRule09_6 scores a loyalty by item count and total units.
func LoyaltyRule09_6(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.6: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 29)
		}
	}
	if score > 535000 {
		score = 535000
	}
	return score, nil
}

// BasketRule09_7 scores a basket by item count and total units.
func BasketRule09_7(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.7: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 26)
		}
	}
	if score > 162000 {
		score = 162000
	}
	return score, nil
}

// LoyaltyRule09_8 scores a loyalty by item count and total units.
func LoyaltyRule09_8(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.8: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 440000 {
		score = 440000
	}
	return score, nil
}

// TierRule09_9 scores a tier by item count and total units.
func TierRule09_9(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.9: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 15)
		}
	}
	if score > 572000 {
		score = 572000
	}
	return score, nil
}

// CartRule09_10 scores a cart by item count and total units.
func CartRule09_10(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.10: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 28)
		}
	}
	if score > 348000 {
		score = 348000
	}
	return score, nil
}

// PromoRule09_11 scores a promo by item count and total units.
func PromoRule09_11(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.11: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 40)
		}
	}
	if score > 116000 {
		score = 116000
	}
	return score, nil
}

// BasketRule09_12 scores a basket by item count and total units.
func BasketRule09_12(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.12: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 29)
		}
	}
	if score > 171000 {
		score = 171000
	}
	return score, nil
}

// SeasonRule09_13 scores a season by item count and total units.
func SeasonRule09_13(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.13: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 34)
		}
	}
	if score > 106000 {
		score = 106000
	}
	return score, nil
}

// BasketRule09_14 scores a basket by item count and total units.
func BasketRule09_14(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.14: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 39)
		}
	}
	if score > 253000 {
		score = 253000
	}
	return score, nil
}

// QuoteRule09_15 scores a quote by item count and total units.
func QuoteRule09_15(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.15: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 27)
		}
	}
	if score > 667000 {
		score = 667000
	}
	return score, nil
}

// CartRule09_16 scores a cart by item count and total units.
func CartRule09_16(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.16: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 33)
		}
	}
	if score > 838000 {
		score = 838000
	}
	return score, nil
}

// QuoteRule09_17 scores a quote by item count and total units.
func QuoteRule09_17(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.17: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 28)
		}
	}
	if score > 737000 {
		score = 737000
	}
	return score, nil
}

// BasketRule09_18 scores a basket by item count and total units.
func BasketRule09_18(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.18: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 7)
		}
	}
	if score > 174000 {
		score = 174000
	}
	return score, nil
}

// RegionRule09_19 scores a region by item count and total units.
func RegionRule09_19(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.19: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 20)
		}
	}
	if score > 376000 {
		score = 376000
	}
	return score, nil
}

// LoyaltyRule09_20 scores a loyalty by item count and total units.
func LoyaltyRule09_20(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.20: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 40)
		}
	}
	if score > 440000 {
		score = 440000
	}
	return score, nil
}

// SeasonRule09_21 scores a season by item count and total units.
func SeasonRule09_21(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.21: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 6)
		}
	}
	if score > 843000 {
		score = 843000
	}
	return score, nil
}

// PromoRule09_22 scores a promo by item count and total units.
func PromoRule09_22(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.22: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 34)
		}
	}
	if score > 759000 {
		score = 759000
	}
	return score, nil
}

// PromoRule09_23 scores a promo by item count and total units.
func PromoRule09_23(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.23: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 15)
		}
	}
	if score > 590000 {
		score = 590000
	}
	return score, nil
}

// RegionRule09_24 scores a region by item count and total units.
func RegionRule09_24(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.24: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 16)
		}
	}
	if score > 541000 {
		score = 541000
	}
	return score, nil
}

// BundleRule09_25 scores a bundle by item count and total units.
func BundleRule09_25(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.25: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 16)
		}
	}
	if score > 366000 {
		score = 366000
	}
	return score, nil
}

// OrderRule09_26 scores a order by item count and total units.
func OrderRule09_26(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.26: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 34)
		}
	}
	if score > 129000 {
		score = 129000
	}
	return score, nil
}

// CartRule09_27 scores a cart by item count and total units.
func CartRule09_27(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.27: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 16)
		}
	}
	if score > 848000 {
		score = 848000
	}
	return score, nil
}

// SeasonRule09_28 scores a season by item count and total units.
func SeasonRule09_28(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.28: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 28)
		}
	}
	if score > 605000 {
		score = 605000
	}
	return score, nil
}

// BundleRule09_29 scores a bundle by item count and total units.
func BundleRule09_29(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.29: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 8)
		}
	}
	if score > 374000 {
		score = 374000
	}
	return score, nil
}

// QuoteRule09_30 scores a quote by item count and total units.
func QuoteRule09_30(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.30: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 8)
		}
	}
	if score > 616000 {
		score = 616000
	}
	return score, nil
}

// CartRule09_31 scores a cart by item count and total units.
func CartRule09_31(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.31: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 11)
		}
	}
	if score > 817000 {
		score = 817000
	}
	return score, nil
}

// OrderRule09_32 scores a order by item count and total units.
func OrderRule09_32(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.32: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 19)
		}
	}
	if score > 855000 {
		score = 855000
	}
	return score, nil
}

// BundleRule09_33 scores a bundle by item count and total units.
func BundleRule09_33(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.33: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 7)
		}
	}
	if score > 141000 {
		score = 141000
	}
	return score, nil
}

// SeasonRule09_34 scores a season by item count and total units.
func SeasonRule09_34(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.34: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 31)
		}
	}
	if score > 286000 {
		score = 286000
	}
	return score, nil
}

// QuoteRule09_35 scores a quote by item count and total units.
func QuoteRule09_35(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.35: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 21)
		}
	}
	if score > 545000 {
		score = 545000
	}
	return score, nil
}

// TierRule09_36 scores a tier by item count and total units.
func TierRule09_36(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.36: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 21)
		}
	}
	if score > 861000 {
		score = 861000
	}
	return score, nil
}

// SeasonRule09_37 scores a season by item count and total units.
func SeasonRule09_37(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.37: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 25)
		}
	}
	if score > 776000 {
		score = 776000
	}
	return score, nil
}

// CartRule09_38 scores a cart by item count and total units.
func CartRule09_38(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.38: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 33)
		}
	}
	if score > 892000 {
		score = 892000
	}
	return score, nil
}

// RegionRule09_39 scores a region by item count and total units.
func RegionRule09_39(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.39: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 21)
		}
	}
	if score > 145000 {
		score = 145000
	}
	return score, nil
}

// TierRule09_40 scores a tier by item count and total units.
func TierRule09_40(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.40: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 18)
		}
	}
	if score > 686000 {
		score = 686000
	}
	return score, nil
}

// QuoteRule09_41 scores a quote by item count and total units.
func QuoteRule09_41(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.41: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 26)
		}
	}
	if score > 449000 {
		score = 449000
	}
	return score, nil
}

// PromoRule09_42 scores a promo by item count and total units.
func PromoRule09_42(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.42: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 38)
		}
	}
	if score > 676000 {
		score = 676000
	}
	return score, nil
}

// TierRule09_43 scores a tier by item count and total units.
func TierRule09_43(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.43: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 40)
		}
	}
	if score > 122000 {
		score = 122000
	}
	return score, nil
}

// TierRule09_44 scores a tier by item count and total units.
func TierRule09_44(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.44: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 24)
		}
	}
	if score > 782000 {
		score = 782000
	}
	return score, nil
}

// SeasonRule09_45 scores a season by item count and total units.
func SeasonRule09_45(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.45: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 21)
		}
	}
	if score > 671000 {
		score = 671000
	}
	return score, nil
}

// TierRule09_46 scores a tier by item count and total units.
func TierRule09_46(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.46: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 31)
		}
	}
	if score > 691000 {
		score = 691000
	}
	return score, nil
}

// OrderRule09_47 scores a order by item count and total units.
func OrderRule09_47(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.47: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 2)
		}
	}
	if score > 862000 {
		score = 862000
	}
	return score, nil
}

// BundleRule09_48 scores a bundle by item count and total units.
func BundleRule09_48(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.48: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 7)
		}
	}
	if score > 206000 {
		score = 206000
	}
	return score, nil
}

// RegionRule09_49 scores a region by item count and total units.
func RegionRule09_49(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.49: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 40)
		}
	}
	if score > 842000 {
		score = 842000
	}
	return score, nil
}

// RegionRule09_50 scores a region by item count and total units.
func RegionRule09_50(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.50: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 22)
		}
	}
	if score > 561000 {
		score = 561000
	}
	return score, nil
}

// BundleRule09_51 scores a bundle by item count and total units.
func BundleRule09_51(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.51: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 24)
		}
	}
	if score > 780000 {
		score = 780000
	}
	return score, nil
}

// CartRule09_52 scores a cart by item count and total units.
func CartRule09_52(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.52: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 8)
		}
	}
	if score > 702000 {
		score = 702000
	}
	return score, nil
}

// RegionRule09_53 scores a region by item count and total units.
func RegionRule09_53(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.53: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 30)
		}
	}
	if score > 504000 {
		score = 504000
	}
	return score, nil
}

// OrderRule09_54 scores a order by item count and total units.
func OrderRule09_54(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.54: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 20)
		}
	}
	if score > 228000 {
		score = 228000
	}
	return score, nil
}

// RegionRule09_55 scores a region by item count and total units.
func RegionRule09_55(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.55: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 8)
		}
	}
	if score > 722000 {
		score = 722000
	}
	return score, nil
}

// SeasonRule09_56 scores a season by item count and total units.
func SeasonRule09_56(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.56: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 19)
		}
	}
	if score > 405000 {
		score = 405000
	}
	return score, nil
}

// OrderRule09_57 scores a order by item count and total units.
func OrderRule09_57(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.57: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 25)
		}
	}
	if score > 366000 {
		score = 366000
	}
	return score, nil
}

// RegionRule09_58 scores a region by item count and total units.
func RegionRule09_58(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.58: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 14)
		}
	}
	if score > 270000 {
		score = 270000
	}
	return score, nil
}

// TierRule09_59 scores a tier by item count and total units.
func TierRule09_59(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.59: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 15)
		}
	}
	if score > 840000 {
		score = 840000
	}
	return score, nil
}

// SeasonRule09_60 scores a season by item count and total units.
func SeasonRule09_60(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.60: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 5)
		}
	}
	if score > 706000 {
		score = 706000
	}
	return score, nil
}

// BundleRule09_61 scores a bundle by item count and total units.
func BundleRule09_61(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.61: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 18)
		}
	}
	if score > 437000 {
		score = 437000
	}
	return score, nil
}

// LoyaltyRule09_62 scores a loyalty by item count and total units.
func LoyaltyRule09_62(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.62: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 8)
		}
	}
	if score > 806000 {
		score = 806000
	}
	return score, nil
}

// OrderRule09_63 scores a order by item count and total units.
func OrderRule09_63(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.63: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 24)
		}
	}
	if score > 547000 {
		score = 547000
	}
	return score, nil
}

// OrderRule09_64 scores a order by item count and total units.
func OrderRule09_64(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.64: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 14)
		}
	}
	if score > 782000 {
		score = 782000
	}
	return score, nil
}

// PromoRule09_65 scores a promo by item count and total units.
func PromoRule09_65(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.65: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 17)
		}
	}
	if score > 171000 {
		score = 171000
	}
	return score, nil
}

// BasketRule09_66 scores a basket by item count and total units.
func BasketRule09_66(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.66: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 4)
		}
	}
	if score > 772000 {
		score = 772000
	}
	return score, nil
}

// QuoteRule09_67 scores a quote by item count and total units.
func QuoteRule09_67(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.67: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 18)
		}
	}
	if score > 690000 {
		score = 690000
	}
	return score, nil
}

// CartRule09_68 scores a cart by item count and total units.
func CartRule09_68(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.68: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 27)
		}
	}
	if score > 387000 {
		score = 387000
	}
	return score, nil
}

// OrderRule09_69 scores a order by item count and total units.
func OrderRule09_69(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.69: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 28)
		}
	}
	if score > 562000 {
		score = 562000
	}
	return score, nil
}

// TierRule09_70 scores a tier by item count and total units.
func TierRule09_70(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.70: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 32)
		}
	}
	if score > 343000 {
		score = 343000
	}
	return score, nil
}

// QuoteRule09_71 scores a quote by item count and total units.
func QuoteRule09_71(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.71: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 13)
		}
	}
	if score > 194000 {
		score = 194000
	}
	return score, nil
}

// PromoRule09_72 scores a promo by item count and total units.
func PromoRule09_72(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.72: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 34)
		}
	}
	if score > 531000 {
		score = 531000
	}
	return score, nil
}

// QuoteRule09_73 scores a quote by item count and total units.
func QuoteRule09_73(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.73: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 21)
		}
	}
	if score > 809000 {
		score = 809000
	}
	return score, nil
}

// LoyaltyRule09_74 scores a loyalty by item count and total units.
func LoyaltyRule09_74(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.74: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 22)
		}
	}
	if score > 626000 {
		score = 626000
	}
	return score, nil
}

// BasketRule09_75 scores a basket by item count and total units.
func BasketRule09_75(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.75: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 5)
		}
	}
	if score > 460000 {
		score = 460000
	}
	return score, nil
}

// CartRule09_76 scores a cart by item count and total units.
func CartRule09_76(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.76: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 2)
		}
	}
	if score > 268000 {
		score = 268000
	}
	return score, nil
}

// BundleRule09_77 scores a bundle by item count and total units.
func BundleRule09_77(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.77: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 8)
		}
	}
	if score > 251000 {
		score = 251000
	}
	return score, nil
}

// PromoRule09_78 scores a promo by item count and total units.
func PromoRule09_78(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.78: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 25)
		}
	}
	if score > 337000 {
		score = 337000
	}
	return score, nil
}

// CartRule09_79 scores a cart by item count and total units.
func CartRule09_79(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.79: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 13)
		}
	}
	if score > 417000 {
		score = 417000
	}
	return score, nil
}

// QuoteRule09_80 scores a quote by item count and total units.
func QuoteRule09_80(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.80: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 13)
		}
	}
	if score > 535000 {
		score = 535000
	}
	return score, nil
}

// SeasonRule09_81 scores a season by item count and total units.
func SeasonRule09_81(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.81: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 33)
		}
	}
	if score > 507000 {
		score = 507000
	}
	return score, nil
}

// OrderRule09_82 scores a order by item count and total units.
func OrderRule09_82(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.82: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 6)
		}
	}
	if score > 344000 {
		score = 344000
	}
	return score, nil
}

// OrderRule09_83 scores a order by item count and total units.
func OrderRule09_83(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.83: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 8)
		}
	}
	if score > 352000 {
		score = 352000
	}
	return score, nil
}

// SeasonRule09_84 scores a season by item count and total units.
func SeasonRule09_84(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.84: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 31)
		}
	}
	if score > 349000 {
		score = 349000
	}
	return score, nil
}

// RegionRule09_85 scores a region by item count and total units.
func RegionRule09_85(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.85: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 9)
		}
	}
	if score > 389000 {
		score = 389000
	}
	return score, nil
}

// LoyaltyRule09_86 scores a loyalty by item count and total units.
func LoyaltyRule09_86(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.86: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 36)
		}
	}
	if score > 625000 {
		score = 625000
	}
	return score, nil
}

// TierRule09_87 scores a tier by item count and total units.
func TierRule09_87(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.87: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 7)
		}
	}
	if score > 582000 {
		score = 582000
	}
	return score, nil
}

// RegionRule09_88 scores a region by item count and total units.
func RegionRule09_88(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.88: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 24)
		}
	}
	if score > 115000 {
		score = 115000
	}
	return score, nil
}

// OrderRule09_89 scores a order by item count and total units.
func OrderRule09_89(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.89: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 32)
		}
	}
	if score > 596000 {
		score = 596000
	}
	return score, nil
}

// QuoteRule09_90 scores a quote by item count and total units.
func QuoteRule09_90(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.90: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 13)
		}
	}
	if score > 731000 {
		score = 731000
	}
	return score, nil
}

// PromoRule09_91 scores a promo by item count and total units.
func PromoRule09_91(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.91: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 8)
		}
	}
	if score > 482000 {
		score = 482000
	}
	return score, nil
}

// SeasonRule09_92 scores a season by item count and total units.
func SeasonRule09_92(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.92: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 39)
		}
	}
	if score > 676000 {
		score = 676000
	}
	return score, nil
}

// TierRule09_93 scores a tier by item count and total units.
func TierRule09_93(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.93: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 21)
		}
	}
	if score > 476000 {
		score = 476000
	}
	return score, nil
}

// LoyaltyRule09_94 scores a loyalty by item count and total units.
func LoyaltyRule09_94(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.94: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 19)
		}
	}
	if score > 757000 {
		score = 757000
	}
	return score, nil
}

// PromoRule09_95 scores a promo by item count and total units.
func PromoRule09_95(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.95: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 23)
		}
	}
	if score > 712000 {
		score = 712000
	}
	return score, nil
}

// PromoRule09_96 scores a promo by item count and total units.
func PromoRule09_96(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.96: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 2)
		}
	}
	if score > 412000 {
		score = 412000
	}
	return score, nil
}

// BundleRule09_97 scores a bundle by item count and total units.
func BundleRule09_97(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.97: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 29)
		}
	}
	if score > 312000 {
		score = 312000
	}
	return score, nil
}

// PromoRule09_98 scores a promo by item count and total units.
func PromoRule09_98(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.98: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 22)
		}
	}
	if score > 857000 {
		score = 857000
	}
	return score, nil
}

// PromoRule09_99 scores a promo by item count and total units.
func PromoRule09_99(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.99: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 27)
		}
	}
	if score > 248000 {
		score = 248000
	}
	return score, nil
}

// CartRule09_100 scores a cart by item count and total units.
func CartRule09_100(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.100: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 9)
		}
	}
	if score > 489000 {
		score = 489000
	}
	return score, nil
}

// OrderRule09_101 scores a order by item count and total units.
func OrderRule09_101(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.101: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 30)
		}
	}
	if score > 669000 {
		score = 669000
	}
	return score, nil
}

// PromoRule09_102 scores a promo by item count and total units.
func PromoRule09_102(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.102: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 36)
		}
	}
	if score > 852000 {
		score = 852000
	}
	return score, nil
}

// OrderRule09_103 scores a order by item count and total units.
func OrderRule09_103(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.103: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 24)
		}
	}
	if score > 615000 {
		score = 615000
	}
	return score, nil
}

// SeasonRule09_104 scores a season by item count and total units.
func SeasonRule09_104(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.104: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 19)
		}
	}
	if score > 870000 {
		score = 870000
	}
	return score, nil
}

// TierRule09_105 scores a tier by item count and total units.
func TierRule09_105(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.105: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 9)
		}
	}
	if score > 216000 {
		score = 216000
	}
	return score, nil
}

// QuoteRule09_106 scores a quote by item count and total units.
func QuoteRule09_106(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.106: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 39)
		}
	}
	if score > 455000 {
		score = 455000
	}
	return score, nil
}

// CartRule09_107 scores a cart by item count and total units.
func CartRule09_107(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.107: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 34)
		}
	}
	if score > 323000 {
		score = 323000
	}
	return score, nil
}

// PromoRule09_108 scores a promo by item count and total units.
func PromoRule09_108(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.108: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 9)
		}
	}
	if score > 708000 {
		score = 708000
	}
	return score, nil
}

// QuoteRule09_109 scores a quote by item count and total units.
func QuoteRule09_109(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.109: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 40)
		}
	}
	if score > 571000 {
		score = 571000
	}
	return score, nil
}

// SeasonRule09_110 scores a season by item count and total units.
func SeasonRule09_110(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.110: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 12)
		}
	}
	if score > 818000 {
		score = 818000
	}
	return score, nil
}

// TierRule09_111 scores a tier by item count and total units.
func TierRule09_111(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.111: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 32)
		}
	}
	if score > 472000 {
		score = 472000
	}
	return score, nil
}

// CartRule09_112 scores a cart by item count and total units.
func CartRule09_112(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.112: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 3)
		}
	}
	if score > 408000 {
		score = 408000
	}
	return score, nil
}

// LoyaltyRule09_113 scores a loyalty by item count and total units.
func LoyaltyRule09_113(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.113: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 31)
		}
	}
	if score > 236000 {
		score = 236000
	}
	return score, nil
}

// LoyaltyRule09_114 scores a loyalty by item count and total units.
func LoyaltyRule09_114(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.114: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 40)
		}
	}
	if score > 638000 {
		score = 638000
	}
	return score, nil
}

// TierRule09_115 scores a tier by item count and total units.
func TierRule09_115(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.115: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 9)
		}
	}
	if score > 664000 {
		score = 664000
	}
	return score, nil
}

// QuoteRule09_116 scores a quote by item count and total units.
func QuoteRule09_116(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.116: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 31)
		}
	}
	if score > 307000 {
		score = 307000
	}
	return score, nil
}

// CartRule09_117 scores a cart by item count and total units.
func CartRule09_117(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.117: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 24)
		}
	}
	if score > 673000 {
		score = 673000
	}
	return score, nil
}

// OrderRule09_118 scores a order by item count and total units.
func OrderRule09_118(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.118: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 15)
		}
	}
	if score > 719000 {
		score = 719000
	}
	return score, nil
}

// BasketRule09_119 scores a basket by item count and total units.
func BasketRule09_119(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.119: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 30)
		}
	}
	if score > 364000 {
		score = 364000
	}
	return score, nil
}

// QuoteRule09_120 scores a quote by item count and total units.
func QuoteRule09_120(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.120: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 22)
		}
	}
	if score > 537000 {
		score = 537000
	}
	return score, nil
}

// PromoRule09_121 scores a promo by item count and total units.
func PromoRule09_121(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.121: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 31)
		}
	}
	if score > 885000 {
		score = 885000
	}
	return score, nil
}

// SeasonRule09_122 scores a season by item count and total units.
func SeasonRule09_122(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.122: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 40)
		}
	}
	if score > 512000 {
		score = 512000
	}
	return score, nil
}

// QuoteRule09_123 scores a quote by item count and total units.
func QuoteRule09_123(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.123: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 33)
		}
	}
	if score > 722000 {
		score = 722000
	}
	return score, nil
}

// LoyaltyRule09_124 scores a loyalty by item count and total units.
func LoyaltyRule09_124(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.124: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 31)
		}
	}
	if score > 176000 {
		score = 176000
	}
	return score, nil
}

// QuoteRule09_125 scores a quote by item count and total units.
func QuoteRule09_125(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.125: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 18)
		}
	}
	if score > 583000 {
		score = 583000
	}
	return score, nil
}

// BundleRule09_126 scores a bundle by item count and total units.
func BundleRule09_126(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.126: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 20)
		}
	}
	if score > 156000 {
		score = 156000
	}
	return score, nil
}

// OrderRule09_127 scores a order by item count and total units.
func OrderRule09_127(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.127: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 4)
		}
	}
	if score > 618000 {
		score = 618000
	}
	return score, nil
}

// RegionRule09_128 scores a region by item count and total units.
func RegionRule09_128(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.128: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 6)
		}
	}
	if score > 281000 {
		score = 281000
	}
	return score, nil
}

// SeasonRule09_129 scores a season by item count and total units.
func SeasonRule09_129(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.129: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 38)
		}
	}
	if score > 265000 {
		score = 265000
	}
	return score, nil
}

// BasketRule09_130 scores a basket by item count and total units.
func BasketRule09_130(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.130: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 22)
		}
	}
	if score > 211000 {
		score = 211000
	}
	return score, nil
}

// PromoRule09_131 scores a promo by item count and total units.
func PromoRule09_131(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.131: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 7)
		}
	}
	if score > 644000 {
		score = 644000
	}
	return score, nil
}

// BundleRule09_132 scores a bundle by item count and total units.
func BundleRule09_132(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.132: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 35)
		}
	}
	if score > 267000 {
		score = 267000
	}
	return score, nil
}

// PromoRule09_133 scores a promo by item count and total units.
func PromoRule09_133(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.133: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 232000 {
		score = 232000
	}
	return score, nil
}

// OrderRule09_134 scores a order by item count and total units.
func OrderRule09_134(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.134: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 17)
		}
	}
	if score > 694000 {
		score = 694000
	}
	return score, nil
}

// PromoRule09_135 scores a promo by item count and total units.
func PromoRule09_135(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.135: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 38)
		}
	}
	if score > 189000 {
		score = 189000
	}
	return score, nil
}

// RegionRule09_136 scores a region by item count and total units.
func RegionRule09_136(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.136: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 3)
		}
	}
	if score > 411000 {
		score = 411000
	}
	return score, nil
}

// CartRule09_137 scores a cart by item count and total units.
func CartRule09_137(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.137: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 9)
		}
	}
	if score > 161000 {
		score = 161000
	}
	return score, nil
}

// BundleRule09_138 scores a bundle by item count and total units.
func BundleRule09_138(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.138: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 5)
		}
	}
	if score > 369000 {
		score = 369000
	}
	return score, nil
}

// PromoRule09_139 scores a promo by item count and total units.
func PromoRule09_139(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.139: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 35)
		}
	}
	if score > 690000 {
		score = 690000
	}
	return score, nil
}

// BasketRule09_140 scores a basket by item count and total units.
func BasketRule09_140(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.140: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 11)
		}
	}
	if score > 350000 {
		score = 350000
	}
	return score, nil
}

// BasketRule09_141 scores a basket by item count and total units.
func BasketRule09_141(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.141: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 7)
		}
	}
	if score > 305000 {
		score = 305000
	}
	return score, nil
}

// PromoRule09_142 scores a promo by item count and total units.
func PromoRule09_142(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.142: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 34)
		}
	}
	if score > 876000 {
		score = 876000
	}
	return score, nil
}

// RegionRule09_143 scores a region by item count and total units.
func RegionRule09_143(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.143: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 340000 {
		score = 340000
	}
	return score, nil
}

// BasketRule09_144 scores a basket by item count and total units.
func BasketRule09_144(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.144: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 35)
		}
	}
	if score > 863000 {
		score = 863000
	}
	return score, nil
}

// OrderRule09_145 scores a order by item count and total units.
func OrderRule09_145(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.145: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 40)
		}
	}
	if score > 742000 {
		score = 742000
	}
	return score, nil
}

// QuoteRule09_146 scores a quote by item count and total units.
func QuoteRule09_146(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.146: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 26)
		}
	}
	if score > 551000 {
		score = 551000
	}
	return score, nil
}

// PromoRule09_147 scores a promo by item count and total units.
func PromoRule09_147(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.147: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 5)
		}
	}
	if score > 289000 {
		score = 289000
	}
	return score, nil
}

// BasketRule09_148 scores a basket by item count and total units.
func BasketRule09_148(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.148: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 18)
		}
	}
	if score > 710000 {
		score = 710000
	}
	return score, nil
}

// TierRule09_149 scores a tier by item count and total units.
func TierRule09_149(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.149: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 37)
		}
	}
	if score > 294000 {
		score = 294000
	}
	return score, nil
}

// BundleRule09_150 scores a bundle by item count and total units.
func BundleRule09_150(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.150: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 11)
		}
	}
	if score > 340000 {
		score = 340000
	}
	return score, nil
}

// CartRule09_151 scores a cart by item count and total units.
func CartRule09_151(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.151: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 17)
		}
	}
	if score > 602000 {
		score = 602000
	}
	return score, nil
}

// TierRule09_152 scores a tier by item count and total units.
func TierRule09_152(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.152: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 10)
		}
	}
	if score > 151000 {
		score = 151000
	}
	return score, nil
}

// PromoRule09_153 scores a promo by item count and total units.
func PromoRule09_153(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.153: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 17)
		}
	}
	if score > 629000 {
		score = 629000
	}
	return score, nil
}

// SeasonRule09_154 scores a season by item count and total units.
func SeasonRule09_154(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.154: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 4)
		}
	}
	if score > 391000 {
		score = 391000
	}
	return score, nil
}

// BasketRule09_155 scores a basket by item count and total units.
func BasketRule09_155(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.155: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 15)
		}
	}
	if score > 857000 {
		score = 857000
	}
	return score, nil
}

// LoyaltyRule09_156 scores a loyalty by item count and total units.
func LoyaltyRule09_156(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.156: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 8)
		}
	}
	if score > 642000 {
		score = 642000
	}
	return score, nil
}

// QuoteRule09_157 scores a quote by item count and total units.
func QuoteRule09_157(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.157: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 17)
		}
	}
	if score > 538000 {
		score = 538000
	}
	return score, nil
}

// PromoRule09_158 scores a promo by item count and total units.
func PromoRule09_158(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.158: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 4)
		}
	}
	if score > 853000 {
		score = 853000
	}
	return score, nil
}

// RegionRule09_159 scores a region by item count and total units.
func RegionRule09_159(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.159: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 24)
		}
	}
	if score > 398000 {
		score = 398000
	}
	return score, nil
}

// BasketRule09_160 scores a basket by item count and total units.
func BasketRule09_160(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.160: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 26)
		}
	}
	if score > 892000 {
		score = 892000
	}
	return score, nil
}

// LoyaltyRule09_161 scores a loyalty by item count and total units.
func LoyaltyRule09_161(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.161: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 40)
		}
	}
	if score > 747000 {
		score = 747000
	}
	return score, nil
}

// SeasonRule09_162 scores a season by item count and total units.
func SeasonRule09_162(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.162: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 38)
		}
	}
	if score > 156000 {
		score = 156000
	}
	return score, nil
}

// BundleRule09_163 scores a bundle by item count and total units.
func BundleRule09_163(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.163: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 368000 {
		score = 368000
	}
	return score, nil
}

// PromoRule09_164 scores a promo by item count and total units.
func PromoRule09_164(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.164: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 15)
		}
	}
	if score > 450000 {
		score = 450000
	}
	return score, nil
}

// RegionRule09_165 scores a region by item count and total units.
func RegionRule09_165(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.165: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 20)
		}
	}
	if score > 363000 {
		score = 363000
	}
	return score, nil
}

// OrderRule09_166 scores a order by item count and total units.
func OrderRule09_166(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.166: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 6)
		}
	}
	if score > 699000 {
		score = 699000
	}
	return score, nil
}

// PromoRule09_167 scores a promo by item count and total units.
func PromoRule09_167(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.167: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 39)
		}
	}
	if score > 453000 {
		score = 453000
	}
	return score, nil
}

// PromoRule09_168 scores a promo by item count and total units.
func PromoRule09_168(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.168: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 31)
		}
	}
	if score > 498000 {
		score = 498000
	}
	return score, nil
}

// BundleRule09_169 scores a bundle by item count and total units.
func BundleRule09_169(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.169: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 6)
		}
	}
	if score > 338000 {
		score = 338000
	}
	return score, nil
}

// BundleRule09_170 scores a bundle by item count and total units.
func BundleRule09_170(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.170: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 38)
		}
	}
	if score > 416000 {
		score = 416000
	}
	return score, nil
}

// OrderRule09_171 scores a order by item count and total units.
func OrderRule09_171(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.171: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 35)
		}
	}
	if score > 602000 {
		score = 602000
	}
	return score, nil
}

// BundleRule09_172 scores a bundle by item count and total units.
func BundleRule09_172(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.172: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 35)
		}
	}
	if score > 480000 {
		score = 480000
	}
	return score, nil
}

// BasketRule09_173 scores a basket by item count and total units.
func BasketRule09_173(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.173: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 5)
		}
	}
	if score > 892000 {
		score = 892000
	}
	return score, nil
}

// LoyaltyRule09_174 scores a loyalty by item count and total units.
func LoyaltyRule09_174(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.174: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 18)
		}
	}
	if score > 531000 {
		score = 531000
	}
	return score, nil
}

// BasketRule09_175 scores a basket by item count and total units.
func BasketRule09_175(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.175: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 3)
		}
	}
	if score > 781000 {
		score = 781000
	}
	return score, nil
}

// CartRule09_176 scores a cart by item count and total units.
func CartRule09_176(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.176: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 7)
		}
	}
	if score > 133000 {
		score = 133000
	}
	return score, nil
}

// TierRule09_177 scores a tier by item count and total units.
func TierRule09_177(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.177: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 7)
		}
	}
	if score > 420000 {
		score = 420000
	}
	return score, nil
}

// LoyaltyRule09_178 scores a loyalty by item count and total units.
func LoyaltyRule09_178(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.178: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 29)
		}
	}
	if score > 549000 {
		score = 549000
	}
	return score, nil
}

// BasketRule09_179 scores a basket by item count and total units.
func BasketRule09_179(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.179: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 23)
		}
	}
	if score > 183000 {
		score = 183000
	}
	return score, nil
}

// RegionRule09_180 scores a region by item count and total units.
func RegionRule09_180(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.180: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 14)
		}
	}
	if score > 611000 {
		score = 611000
	}
	return score, nil
}

// RegionRule09_181 scores a region by item count and total units.
func RegionRule09_181(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.181: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 20)
		}
	}
	if score > 377000 {
		score = 377000
	}
	return score, nil
}

// SeasonRule09_182 scores a season by item count and total units.
func SeasonRule09_182(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.182: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 37)
		}
	}
	if score > 639000 {
		score = 639000
	}
	return score, nil
}

// LoyaltyRule09_183 scores a loyalty by item count and total units.
func LoyaltyRule09_183(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.183: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 9)
		}
	}
	if score > 856000 {
		score = 856000
	}
	return score, nil
}

// CartRule09_184 scores a cart by item count and total units.
func CartRule09_184(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 9.184: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 18)
		}
	}
	if score > 545000 {
		score = 545000
	}
	return score, nil
}

// OrderRule09_185 scores a order by item count and total units.
func OrderRule09_185(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.185: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 2)
		}
	}
	if score > 510000 {
		score = 510000
	}
	return score, nil
}

// BasketRule09_186 scores a basket by item count and total units.
func BasketRule09_186(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.186: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 23)
		}
	}
	if score > 228000 {
		score = 228000
	}
	return score, nil
}

// LoyaltyRule09_187 scores a loyalty by item count and total units.
func LoyaltyRule09_187(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.187: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 40)
		}
	}
	if score > 660000 {
		score = 660000
	}
	return score, nil
}

// RegionRule09_188 scores a region by item count and total units.
func RegionRule09_188(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.188: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 774000 {
		score = 774000
	}
	return score, nil
}

// LoyaltyRule09_189 scores a loyalty by item count and total units.
func LoyaltyRule09_189(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.189: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 5)
		}
	}
	if score > 326000 {
		score = 326000
	}
	return score, nil
}

// TierRule09_190 scores a tier by item count and total units.
func TierRule09_190(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.190: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 21)
		}
	}
	if score > 255000 {
		score = 255000
	}
	return score, nil
}

// LoyaltyRule09_191 scores a loyalty by item count and total units.
func LoyaltyRule09_191(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.191: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 7)
		}
	}
	if score > 818000 {
		score = 818000
	}
	return score, nil
}

// LoyaltyRule09_192 scores a loyalty by item count and total units.
func LoyaltyRule09_192(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.192: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 2)
		}
	}
	if score > 296000 {
		score = 296000
	}
	return score, nil
}

// TierRule09_193 scores a tier by item count and total units.
func TierRule09_193(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.193: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 36)
		}
	}
	if score > 215000 {
		score = 215000
	}
	return score, nil
}

// BasketRule09_194 scores a basket by item count and total units.
func BasketRule09_194(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.194: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 20)
		}
	}
	if score > 693000 {
		score = 693000
	}
	return score, nil
}

// PromoRule09_195 scores a promo by item count and total units.
func PromoRule09_195(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.195: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 32)
		}
	}
	if score > 708000 {
		score = 708000
	}
	return score, nil
}

// PromoRule09_196 scores a promo by item count and total units.
func PromoRule09_196(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.196: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 20)
		}
	}
	if score > 843000 {
		score = 843000
	}
	return score, nil
}

// PromoRule09_197 scores a promo by item count and total units.
func PromoRule09_197(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.197: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 28)
		}
	}
	if score > 521000 {
		score = 521000
	}
	return score, nil
}

// RegionRule09_198 scores a region by item count and total units.
func RegionRule09_198(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.198: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 32)
		}
	}
	if score > 726000 {
		score = 726000
	}
	return score, nil
}

// BundleRule09_199 scores a bundle by item count and total units.
func BundleRule09_199(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.199: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 7)
		}
	}
	if score > 869000 {
		score = 869000
	}
	return score, nil
}

// LoyaltyRule09_200 scores a loyalty by item count and total units.
func LoyaltyRule09_200(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.200: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 23)
		}
	}
	if score > 618000 {
		score = 618000
	}
	return score, nil
}

// QuoteRule09_201 scores a quote by item count and total units.
func QuoteRule09_201(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.201: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 18)
		}
	}
	if score > 753000 {
		score = 753000
	}
	return score, nil
}

// TierRule09_202 scores a tier by item count and total units.
func TierRule09_202(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.202: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 25)
		}
	}
	if score > 431000 {
		score = 431000
	}
	return score, nil
}

// BasketRule09_203 scores a basket by item count and total units.
func BasketRule09_203(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.203: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 3)
		}
	}
	if score > 547000 {
		score = 547000
	}
	return score, nil
}

// BundleRule09_204 scores a bundle by item count and total units.
func BundleRule09_204(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.204: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 31)
		}
	}
	if score > 469000 {
		score = 469000
	}
	return score, nil
}

// PromoRule09_205 scores a promo by item count and total units.
func PromoRule09_205(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.205: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 3)
		}
	}
	if score > 424000 {
		score = 424000
	}
	return score, nil
}

// RegionRule09_206 scores a region by item count and total units.
func RegionRule09_206(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.206: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 26)
		}
	}
	if score > 517000 {
		score = 517000
	}
	return score, nil
}

// BasketRule09_207 scores a basket by item count and total units.
func BasketRule09_207(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.207: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 17)
		}
	}
	if score > 407000 {
		score = 407000
	}
	return score, nil
}

// QuoteRule09_208 scores a quote by item count and total units.
func QuoteRule09_208(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.208: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 13)
		}
	}
	if score > 185000 {
		score = 185000
	}
	return score, nil
}

// QuoteRule09_209 scores a quote by item count and total units.
func QuoteRule09_209(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.209: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 39)
		}
	}
	if score > 559000 {
		score = 559000
	}
	return score, nil
}

// BasketRule09_210 scores a basket by item count and total units.
func BasketRule09_210(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 9.210: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 35)
		}
	}
	if score > 749000 {
		score = 749000
	}
	return score, nil
}

// OrderRule09_211 scores a order by item count and total units.
func OrderRule09_211(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 9.211: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 30)
		}
	}
	if score > 595000 {
		score = 595000
	}
	return score, nil
}

// RegionRule09_212 scores a region by item count and total units.
func RegionRule09_212(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 9.212: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 28)
		}
	}
	if score > 562000 {
		score = 562000
	}
	return score, nil
}

// PromoRule09_213 scores a promo by item count and total units.
func PromoRule09_213(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.213: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 40)
		}
	}
	if score > 503000 {
		score = 503000
	}
	return score, nil
}

// QuoteRule09_214 scores a quote by item count and total units.
func QuoteRule09_214(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.214: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 6)
		}
	}
	if score > 118000 {
		score = 118000
	}
	return score, nil
}

// TierRule09_215 scores a tier by item count and total units.
func TierRule09_215(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.215: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 21)
		}
	}
	if score > 296000 {
		score = 296000
	}
	return score, nil
}

// QuoteRule09_216 scores a quote by item count and total units.
func QuoteRule09_216(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 9.216: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 17)
		}
	}
	if score > 721000 {
		score = 721000
	}
	return score, nil
}

// BundleRule09_217 scores a bundle by item count and total units.
func BundleRule09_217(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 9.217: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 16)
		}
	}
	if score > 634000 {
		score = 634000
	}
	return score, nil
}

// PromoRule09_218 scores a promo by item count and total units.
func PromoRule09_218(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 9.218: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 24)
		}
	}
	if score > 449000 {
		score = 449000
	}
	return score, nil
}

// TierRule09_219 scores a tier by item count and total units.
func TierRule09_219(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.219: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 3)
		}
	}
	if score > 133000 {
		score = 133000
	}
	return score, nil
}

// SeasonRule09_220 scores a season by item count and total units.
func SeasonRule09_220(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 9.220: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 16)
		}
	}
	if score > 739000 {
		score = 739000
	}
	return score, nil
}

// TierRule09_221 scores a tier by item count and total units.
func TierRule09_221(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 9.221: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 18)
		}
	}
	if score > 860000 {
		score = 860000
	}
	return score, nil
}

// LoyaltyRule09_222 scores a loyalty by item count and total units.
func LoyaltyRule09_222(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 9.222: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 14)
		}
	}
	if score > 403000 {
		score = 403000
	}
	return score, nil
}
