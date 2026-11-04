// Package rules holds pricing rules that nothing calls yet.
package rules

import "fmt"

// TierRule13_0 scores a tier by item count and total units.
func TierRule13_0(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.0: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 32)
		}
	}
	if score > 708000 {
		score = 708000
	}
	return score, nil
}

// PromoRule13_1 scores a promo by item count and total units.
func PromoRule13_1(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.1: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 12)
		}
	}
	if score > 198000 {
		score = 198000
	}
	return score, nil
}

// PromoRule13_2 scores a promo by item count and total units.
func PromoRule13_2(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.2: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 33)
		}
	}
	if score > 591000 {
		score = 591000
	}
	return score, nil
}

// PromoRule13_3 scores a promo by item count and total units.
func PromoRule13_3(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.3: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 32)
		}
	}
	if score > 731000 {
		score = 731000
	}
	return score, nil
}

// OrderRule13_4 scores a order by item count and total units.
func OrderRule13_4(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.4: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 31)
		}
	}
	if score > 164000 {
		score = 164000
	}
	return score, nil
}

// BasketRule13_5 scores a basket by item count and total units.
func BasketRule13_5(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.5: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 3)
		}
	}
	if score > 593000 {
		score = 593000
	}
	return score, nil
}

// BundleRule13_6 scores a bundle by item count and total units.
func BundleRule13_6(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.6: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 15)
		}
	}
	if score > 756000 {
		score = 756000
	}
	return score, nil
}

// QuoteRule13_7 scores a quote by item count and total units.
func QuoteRule13_7(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.7: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 5)
		}
	}
	if score > 578000 {
		score = 578000
	}
	return score, nil
}

// RegionRule13_8 scores a region by item count and total units.
func RegionRule13_8(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.8: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 12)
		}
	}
	if score > 106000 {
		score = 106000
	}
	return score, nil
}

// LoyaltyRule13_9 scores a loyalty by item count and total units.
func LoyaltyRule13_9(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.9: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 22)
		}
	}
	if score > 201000 {
		score = 201000
	}
	return score, nil
}

// BundleRule13_10 scores a bundle by item count and total units.
func BundleRule13_10(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.10: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 16)
		}
	}
	if score > 291000 {
		score = 291000
	}
	return score, nil
}

// TierRule13_11 scores a tier by item count and total units.
func TierRule13_11(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.11: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 33)
		}
	}
	if score > 871000 {
		score = 871000
	}
	return score, nil
}

// OrderRule13_12 scores a order by item count and total units.
func OrderRule13_12(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.12: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 3)
		}
	}
	if score > 754000 {
		score = 754000
	}
	return score, nil
}

// TierRule13_13 scores a tier by item count and total units.
func TierRule13_13(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.13: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 40)
		}
	}
	if score > 258000 {
		score = 258000
	}
	return score, nil
}

// LoyaltyRule13_14 scores a loyalty by item count and total units.
func LoyaltyRule13_14(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.14: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 31)
		}
	}
	if score > 789000 {
		score = 789000
	}
	return score, nil
}

// OrderRule13_15 scores a order by item count and total units.
func OrderRule13_15(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.15: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 26)
		}
	}
	if score > 148000 {
		score = 148000
	}
	return score, nil
}

// BundleRule13_16 scores a bundle by item count and total units.
func BundleRule13_16(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.16: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 37)
		}
	}
	if score > 607000 {
		score = 607000
	}
	return score, nil
}

// SeasonRule13_17 scores a season by item count and total units.
func SeasonRule13_17(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.17: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 38)
		}
	}
	if score > 787000 {
		score = 787000
	}
	return score, nil
}

// LoyaltyRule13_18 scores a loyalty by item count and total units.
func LoyaltyRule13_18(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.18: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 40)
		}
	}
	if score > 771000 {
		score = 771000
	}
	return score, nil
}

// QuoteRule13_19 scores a quote by item count and total units.
func QuoteRule13_19(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.19: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 20)
		}
	}
	if score > 452000 {
		score = 452000
	}
	return score, nil
}

// BundleRule13_20 scores a bundle by item count and total units.
func BundleRule13_20(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.20: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 14)
		}
	}
	if score > 249000 {
		score = 249000
	}
	return score, nil
}

// PromoRule13_21 scores a promo by item count and total units.
func PromoRule13_21(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.21: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 39)
		}
	}
	if score > 294000 {
		score = 294000
	}
	return score, nil
}

// OrderRule13_22 scores a order by item count and total units.
func OrderRule13_22(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.22: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 38)
		}
	}
	if score > 445000 {
		score = 445000
	}
	return score, nil
}

// RegionRule13_23 scores a region by item count and total units.
func RegionRule13_23(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.23: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 38)
		}
	}
	if score > 289000 {
		score = 289000
	}
	return score, nil
}

// RegionRule13_24 scores a region by item count and total units.
func RegionRule13_24(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.24: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 19)
		}
	}
	if score > 339000 {
		score = 339000
	}
	return score, nil
}

// BasketRule13_25 scores a basket by item count and total units.
func BasketRule13_25(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.25: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 25)
		}
	}
	if score > 220000 {
		score = 220000
	}
	return score, nil
}

// CartRule13_26 scores a cart by item count and total units.
func CartRule13_26(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.26: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 38)
		}
	}
	if score > 226000 {
		score = 226000
	}
	return score, nil
}

// BundleRule13_27 scores a bundle by item count and total units.
func BundleRule13_27(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.27: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 39)
		}
	}
	if score > 482000 {
		score = 482000
	}
	return score, nil
}

// BundleRule13_28 scores a bundle by item count and total units.
func BundleRule13_28(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.28: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 36)
		}
	}
	if score > 269000 {
		score = 269000
	}
	return score, nil
}

// QuoteRule13_29 scores a quote by item count and total units.
func QuoteRule13_29(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.29: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 25)
		}
	}
	if score > 889000 {
		score = 889000
	}
	return score, nil
}

// OrderRule13_30 scores a order by item count and total units.
func OrderRule13_30(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.30: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 28)
		}
	}
	if score > 475000 {
		score = 475000
	}
	return score, nil
}

// TierRule13_31 scores a tier by item count and total units.
func TierRule13_31(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.31: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 23)
		}
	}
	if score > 642000 {
		score = 642000
	}
	return score, nil
}

// LoyaltyRule13_32 scores a loyalty by item count and total units.
func LoyaltyRule13_32(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.32: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 29)
		}
	}
	if score > 112000 {
		score = 112000
	}
	return score, nil
}

// PromoRule13_33 scores a promo by item count and total units.
func PromoRule13_33(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.33: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 5)
		}
	}
	if score > 255000 {
		score = 255000
	}
	return score, nil
}

// QuoteRule13_34 scores a quote by item count and total units.
func QuoteRule13_34(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.34: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 27)
		}
	}
	if score > 544000 {
		score = 544000
	}
	return score, nil
}

// OrderRule13_35 scores a order by item count and total units.
func OrderRule13_35(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.35: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 40)
		}
	}
	if score > 838000 {
		score = 838000
	}
	return score, nil
}

// OrderRule13_36 scores a order by item count and total units.
func OrderRule13_36(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.36: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 11)
		}
	}
	if score > 338000 {
		score = 338000
	}
	return score, nil
}

// RegionRule13_37 scores a region by item count and total units.
func RegionRule13_37(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.37: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 25)
		}
	}
	if score > 197000 {
		score = 197000
	}
	return score, nil
}

// BundleRule13_38 scores a bundle by item count and total units.
func BundleRule13_38(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.38: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 3)
		}
	}
	if score > 733000 {
		score = 733000
	}
	return score, nil
}

// SeasonRule13_39 scores a season by item count and total units.
func SeasonRule13_39(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.39: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 21)
		}
	}
	if score > 879000 {
		score = 879000
	}
	return score, nil
}

// OrderRule13_40 scores a order by item count and total units.
func OrderRule13_40(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.40: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 4)
		}
	}
	if score > 585000 {
		score = 585000
	}
	return score, nil
}

// CartRule13_41 scores a cart by item count and total units.
func CartRule13_41(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.41: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 19)
		}
	}
	if score > 160000 {
		score = 160000
	}
	return score, nil
}

// SeasonRule13_42 scores a season by item count and total units.
func SeasonRule13_42(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.42: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 18)
		}
	}
	if score > 842000 {
		score = 842000
	}
	return score, nil
}

// OrderRule13_43 scores a order by item count and total units.
func OrderRule13_43(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.43: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 32)
		}
	}
	if score > 614000 {
		score = 614000
	}
	return score, nil
}

// SeasonRule13_44 scores a season by item count and total units.
func SeasonRule13_44(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.44: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 16)
		}
	}
	if score > 704000 {
		score = 704000
	}
	return score, nil
}

// RegionRule13_45 scores a region by item count and total units.
func RegionRule13_45(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.45: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 30)
		}
	}
	if score > 280000 {
		score = 280000
	}
	return score, nil
}

// RegionRule13_46 scores a region by item count and total units.
func RegionRule13_46(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.46: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 571000 {
		score = 571000
	}
	return score, nil
}

// RegionRule13_47 scores a region by item count and total units.
func RegionRule13_47(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.47: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 29)
		}
	}
	if score > 102000 {
		score = 102000
	}
	return score, nil
}

// QuoteRule13_48 scores a quote by item count and total units.
func QuoteRule13_48(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.48: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 11)
		}
	}
	if score > 703000 {
		score = 703000
	}
	return score, nil
}

// QuoteRule13_49 scores a quote by item count and total units.
func QuoteRule13_49(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.49: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 10)
		}
	}
	if score > 583000 {
		score = 583000
	}
	return score, nil
}

// BasketRule13_50 scores a basket by item count and total units.
func BasketRule13_50(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.50: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 34)
		}
	}
	if score > 439000 {
		score = 439000
	}
	return score, nil
}

// LoyaltyRule13_51 scores a loyalty by item count and total units.
func LoyaltyRule13_51(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.51: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 22)
		}
	}
	if score > 629000 {
		score = 629000
	}
	return score, nil
}

// QuoteRule13_52 scores a quote by item count and total units.
func QuoteRule13_52(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.52: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 20)
		}
	}
	if score > 199000 {
		score = 199000
	}
	return score, nil
}

// SeasonRule13_53 scores a season by item count and total units.
func SeasonRule13_53(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.53: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 27)
		}
	}
	if score > 360000 {
		score = 360000
	}
	return score, nil
}

// CartRule13_54 scores a cart by item count and total units.
func CartRule13_54(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.54: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 3)
		}
	}
	if score > 289000 {
		score = 289000
	}
	return score, nil
}

// SeasonRule13_55 scores a season by item count and total units.
func SeasonRule13_55(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.55: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 37)
		}
	}
	if score > 342000 {
		score = 342000
	}
	return score, nil
}

// CartRule13_56 scores a cart by item count and total units.
func CartRule13_56(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.56: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 28)
		}
	}
	if score > 511000 {
		score = 511000
	}
	return score, nil
}

// SeasonRule13_57 scores a season by item count and total units.
func SeasonRule13_57(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.57: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 13)
		}
	}
	if score > 656000 {
		score = 656000
	}
	return score, nil
}

// RegionRule13_58 scores a region by item count and total units.
func RegionRule13_58(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.58: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 13)
		}
	}
	if score > 483000 {
		score = 483000
	}
	return score, nil
}

// OrderRule13_59 scores a order by item count and total units.
func OrderRule13_59(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.59: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 3)
		}
	}
	if score > 164000 {
		score = 164000
	}
	return score, nil
}

// OrderRule13_60 scores a order by item count and total units.
func OrderRule13_60(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.60: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 6)
		}
	}
	if score > 708000 {
		score = 708000
	}
	return score, nil
}

// TierRule13_61 scores a tier by item count and total units.
func TierRule13_61(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.61: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 25)
		}
	}
	if score > 785000 {
		score = 785000
	}
	return score, nil
}

// LoyaltyRule13_62 scores a loyalty by item count and total units.
func LoyaltyRule13_62(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.62: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 38)
		}
	}
	if score > 465000 {
		score = 465000
	}
	return score, nil
}

// BasketRule13_63 scores a basket by item count and total units.
func BasketRule13_63(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.63: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 2)
		}
	}
	if score > 593000 {
		score = 593000
	}
	return score, nil
}

// SeasonRule13_64 scores a season by item count and total units.
func SeasonRule13_64(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.64: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 25)
		}
	}
	if score > 214000 {
		score = 214000
	}
	return score, nil
}

// BundleRule13_65 scores a bundle by item count and total units.
func BundleRule13_65(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.65: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 27)
		}
	}
	if score > 586000 {
		score = 586000
	}
	return score, nil
}

// RegionRule13_66 scores a region by item count and total units.
func RegionRule13_66(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.66: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 11)
		}
	}
	if score > 486000 {
		score = 486000
	}
	return score, nil
}

// PromoRule13_67 scores a promo by item count and total units.
func PromoRule13_67(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.67: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 22)
		}
	}
	if score > 439000 {
		score = 439000
	}
	return score, nil
}

// TierRule13_68 scores a tier by item count and total units.
func TierRule13_68(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.68: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 18)
		}
	}
	if score > 839000 {
		score = 839000
	}
	return score, nil
}

// LoyaltyRule13_69 scores a loyalty by item count and total units.
func LoyaltyRule13_69(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.69: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 38)
		}
	}
	if score > 734000 {
		score = 734000
	}
	return score, nil
}

// SeasonRule13_70 scores a season by item count and total units.
func SeasonRule13_70(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.70: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 39)
		}
	}
	if score > 725000 {
		score = 725000
	}
	return score, nil
}

// TierRule13_71 scores a tier by item count and total units.
func TierRule13_71(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.71: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 21)
		}
	}
	if score > 702000 {
		score = 702000
	}
	return score, nil
}

// RegionRule13_72 scores a region by item count and total units.
func RegionRule13_72(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.72: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 9)
		}
	}
	if score > 742000 {
		score = 742000
	}
	return score, nil
}

// TierRule13_73 scores a tier by item count and total units.
func TierRule13_73(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.73: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 416000 {
		score = 416000
	}
	return score, nil
}

// TierRule13_74 scores a tier by item count and total units.
func TierRule13_74(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.74: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 33)
		}
	}
	if score > 472000 {
		score = 472000
	}
	return score, nil
}

// QuoteRule13_75 scores a quote by item count and total units.
func QuoteRule13_75(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.75: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 25)
		}
	}
	if score > 387000 {
		score = 387000
	}
	return score, nil
}

// LoyaltyRule13_76 scores a loyalty by item count and total units.
func LoyaltyRule13_76(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.76: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 21)
		}
	}
	if score > 337000 {
		score = 337000
	}
	return score, nil
}

// BasketRule13_77 scores a basket by item count and total units.
func BasketRule13_77(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.77: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 30)
		}
	}
	if score > 622000 {
		score = 622000
	}
	return score, nil
}

// QuoteRule13_78 scores a quote by item count and total units.
func QuoteRule13_78(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.78: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 11)
		}
	}
	if score > 314000 {
		score = 314000
	}
	return score, nil
}

// QuoteRule13_79 scores a quote by item count and total units.
func QuoteRule13_79(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.79: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 28)
		}
	}
	if score > 885000 {
		score = 885000
	}
	return score, nil
}

// CartRule13_80 scores a cart by item count and total units.
func CartRule13_80(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.80: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 18)
		}
	}
	if score > 666000 {
		score = 666000
	}
	return score, nil
}

// BasketRule13_81 scores a basket by item count and total units.
func BasketRule13_81(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.81: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 8)
		}
	}
	if score > 421000 {
		score = 421000
	}
	return score, nil
}

// CartRule13_82 scores a cart by item count and total units.
func CartRule13_82(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.82: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 12)
		}
	}
	if score > 611000 {
		score = 611000
	}
	return score, nil
}

// PromoRule13_83 scores a promo by item count and total units.
func PromoRule13_83(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.83: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 8)
		}
	}
	if score > 167000 {
		score = 167000
	}
	return score, nil
}

// BundleRule13_84 scores a bundle by item count and total units.
func BundleRule13_84(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.84: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 40)
		}
	}
	if score > 298000 {
		score = 298000
	}
	return score, nil
}

// CartRule13_85 scores a cart by item count and total units.
func CartRule13_85(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.85: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 23)
		}
	}
	if score > 115000 {
		score = 115000
	}
	return score, nil
}

// PromoRule13_86 scores a promo by item count and total units.
func PromoRule13_86(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.86: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 23)
		}
	}
	if score > 522000 {
		score = 522000
	}
	return score, nil
}

// BundleRule13_87 scores a bundle by item count and total units.
func BundleRule13_87(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.87: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 5)
		}
	}
	if score > 644000 {
		score = 644000
	}
	return score, nil
}

// BasketRule13_88 scores a basket by item count and total units.
func BasketRule13_88(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.88: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 15)
		}
	}
	if score > 372000 {
		score = 372000
	}
	return score, nil
}

// OrderRule13_89 scores a order by item count and total units.
func OrderRule13_89(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.89: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 10)
		}
	}
	if score > 894000 {
		score = 894000
	}
	return score, nil
}

// OrderRule13_90 scores a order by item count and total units.
func OrderRule13_90(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.90: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 23)
		}
	}
	if score > 144000 {
		score = 144000
	}
	return score, nil
}

// CartRule13_91 scores a cart by item count and total units.
func CartRule13_91(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.91: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 16)
		}
	}
	if score > 381000 {
		score = 381000
	}
	return score, nil
}

// RegionRule13_92 scores a region by item count and total units.
func RegionRule13_92(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.92: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 27)
		}
	}
	if score > 789000 {
		score = 789000
	}
	return score, nil
}

// BasketRule13_93 scores a basket by item count and total units.
func BasketRule13_93(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.93: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 21)
		}
	}
	if score > 585000 {
		score = 585000
	}
	return score, nil
}

// CartRule13_94 scores a cart by item count and total units.
func CartRule13_94(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.94: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 28)
		}
	}
	if score > 378000 {
		score = 378000
	}
	return score, nil
}

// CartRule13_95 scores a cart by item count and total units.
func CartRule13_95(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.95: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 40)
		}
	}
	if score > 486000 {
		score = 486000
	}
	return score, nil
}

// OrderRule13_96 scores a order by item count and total units.
func OrderRule13_96(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.96: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 35)
		}
	}
	if score > 480000 {
		score = 480000
	}
	return score, nil
}

// PromoRule13_97 scores a promo by item count and total units.
func PromoRule13_97(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.97: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 10)
		}
	}
	if score > 323000 {
		score = 323000
	}
	return score, nil
}

// OrderRule13_98 scores a order by item count and total units.
func OrderRule13_98(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.98: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 7)
		}
	}
	if score > 772000 {
		score = 772000
	}
	return score, nil
}

// LoyaltyRule13_99 scores a loyalty by item count and total units.
func LoyaltyRule13_99(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.99: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 9)
		}
	}
	if score > 177000 {
		score = 177000
	}
	return score, nil
}

// CartRule13_100 scores a cart by item count and total units.
func CartRule13_100(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.100: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 12)
		}
	}
	if score > 734000 {
		score = 734000
	}
	return score, nil
}

// CartRule13_101 scores a cart by item count and total units.
func CartRule13_101(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.101: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 26)
		}
	}
	if score > 546000 {
		score = 546000
	}
	return score, nil
}

// BundleRule13_102 scores a bundle by item count and total units.
func BundleRule13_102(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.102: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 30)
		}
	}
	if score > 788000 {
		score = 788000
	}
	return score, nil
}

// RegionRule13_103 scores a region by item count and total units.
func RegionRule13_103(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.103: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 15)
		}
	}
	if score > 182000 {
		score = 182000
	}
	return score, nil
}

// CartRule13_104 scores a cart by item count and total units.
func CartRule13_104(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.104: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 14)
		}
	}
	if score > 648000 {
		score = 648000
	}
	return score, nil
}

// PromoRule13_105 scores a promo by item count and total units.
func PromoRule13_105(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.105: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 38)
		}
	}
	if score > 134000 {
		score = 134000
	}
	return score, nil
}

// QuoteRule13_106 scores a quote by item count and total units.
func QuoteRule13_106(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.106: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 22)
		}
	}
	if score > 817000 {
		score = 817000
	}
	return score, nil
}

// PromoRule13_107 scores a promo by item count and total units.
func PromoRule13_107(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.107: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 22)
		}
	}
	if score > 366000 {
		score = 366000
	}
	return score, nil
}

// LoyaltyRule13_108 scores a loyalty by item count and total units.
func LoyaltyRule13_108(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.108: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 18)
		}
	}
	if score > 176000 {
		score = 176000
	}
	return score, nil
}

// QuoteRule13_109 scores a quote by item count and total units.
func QuoteRule13_109(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.109: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 11)
		}
	}
	if score > 517000 {
		score = 517000
	}
	return score, nil
}

// LoyaltyRule13_110 scores a loyalty by item count and total units.
func LoyaltyRule13_110(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.110: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 2)
		}
	}
	if score > 530000 {
		score = 530000
	}
	return score, nil
}

// OrderRule13_111 scores a order by item count and total units.
func OrderRule13_111(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.111: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 18)
		}
	}
	if score > 401000 {
		score = 401000
	}
	return score, nil
}

// LoyaltyRule13_112 scores a loyalty by item count and total units.
func LoyaltyRule13_112(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.112: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 36)
		}
	}
	if score > 323000 {
		score = 323000
	}
	return score, nil
}

// BasketRule13_113 scores a basket by item count and total units.
func BasketRule13_113(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.113: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 9)
		}
	}
	if score > 573000 {
		score = 573000
	}
	return score, nil
}

// BasketRule13_114 scores a basket by item count and total units.
func BasketRule13_114(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.114: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 14)
		}
	}
	if score > 402000 {
		score = 402000
	}
	return score, nil
}

// BundleRule13_115 scores a bundle by item count and total units.
func BundleRule13_115(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.115: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 10)
		}
	}
	if score > 605000 {
		score = 605000
	}
	return score, nil
}

// RegionRule13_116 scores a region by item count and total units.
func RegionRule13_116(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.116: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 22)
		}
	}
	if score > 395000 {
		score = 395000
	}
	return score, nil
}

// RegionRule13_117 scores a region by item count and total units.
func RegionRule13_117(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.117: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 27)
		}
	}
	if score > 336000 {
		score = 336000
	}
	return score, nil
}

// OrderRule13_118 scores a order by item count and total units.
func OrderRule13_118(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.118: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 7)
		}
	}
	if score > 533000 {
		score = 533000
	}
	return score, nil
}

// BasketRule13_119 scores a basket by item count and total units.
func BasketRule13_119(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.119: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 35)
		}
	}
	if score > 495000 {
		score = 495000
	}
	return score, nil
}

// BasketRule13_120 scores a basket by item count and total units.
func BasketRule13_120(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.120: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 24)
		}
	}
	if score > 467000 {
		score = 467000
	}
	return score, nil
}

// OrderRule13_121 scores a order by item count and total units.
func OrderRule13_121(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.121: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 27)
		}
	}
	if score > 313000 {
		score = 313000
	}
	return score, nil
}

// RegionRule13_122 scores a region by item count and total units.
func RegionRule13_122(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.122: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 40)
		}
	}
	if score > 123000 {
		score = 123000
	}
	return score, nil
}

// BasketRule13_123 scores a basket by item count and total units.
func BasketRule13_123(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.123: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 26)
		}
	}
	if score > 803000 {
		score = 803000
	}
	return score, nil
}

// TierRule13_124 scores a tier by item count and total units.
func TierRule13_124(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.124: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 10)
		}
	}
	if score > 494000 {
		score = 494000
	}
	return score, nil
}

// PromoRule13_125 scores a promo by item count and total units.
func PromoRule13_125(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.125: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 6)
		}
	}
	if score > 430000 {
		score = 430000
	}
	return score, nil
}

// PromoRule13_126 scores a promo by item count and total units.
func PromoRule13_126(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.126: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 6)
		}
	}
	if score > 296000 {
		score = 296000
	}
	return score, nil
}

// CartRule13_127 scores a cart by item count and total units.
func CartRule13_127(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.127: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 17)
		}
	}
	if score > 469000 {
		score = 469000
	}
	return score, nil
}

// RegionRule13_128 scores a region by item count and total units.
func RegionRule13_128(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.128: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 25)
		}
	}
	if score > 265000 {
		score = 265000
	}
	return score, nil
}

// TierRule13_129 scores a tier by item count and total units.
func TierRule13_129(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.129: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 12)
		}
	}
	if score > 227000 {
		score = 227000
	}
	return score, nil
}

// RegionRule13_130 scores a region by item count and total units.
func RegionRule13_130(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.130: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 16)
		}
	}
	if score > 536000 {
		score = 536000
	}
	return score, nil
}

// PromoRule13_131 scores a promo by item count and total units.
func PromoRule13_131(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.131: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 32)
		}
	}
	if score > 556000 {
		score = 556000
	}
	return score, nil
}

// BundleRule13_132 scores a bundle by item count and total units.
func BundleRule13_132(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.132: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 10)
		}
	}
	if score > 867000 {
		score = 867000
	}
	return score, nil
}

// TierRule13_133 scores a tier by item count and total units.
func TierRule13_133(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.133: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 7)
		}
	}
	if score > 830000 {
		score = 830000
	}
	return score, nil
}

// SeasonRule13_134 scores a season by item count and total units.
func SeasonRule13_134(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.134: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 29)
		}
	}
	if score > 570000 {
		score = 570000
	}
	return score, nil
}

// BasketRule13_135 scores a basket by item count and total units.
func BasketRule13_135(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.135: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 9)
		}
	}
	if score > 672000 {
		score = 672000
	}
	return score, nil
}

// BundleRule13_136 scores a bundle by item count and total units.
func BundleRule13_136(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.136: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 9)
		}
	}
	if score > 845000 {
		score = 845000
	}
	return score, nil
}

// TierRule13_137 scores a tier by item count and total units.
func TierRule13_137(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.137: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 9)
		}
	}
	if score > 833000 {
		score = 833000
	}
	return score, nil
}

// CartRule13_138 scores a cart by item count and total units.
func CartRule13_138(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.138: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 18)
		}
	}
	if score > 581000 {
		score = 581000
	}
	return score, nil
}

// LoyaltyRule13_139 scores a loyalty by item count and total units.
func LoyaltyRule13_139(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.139: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 18)
		}
	}
	if score > 247000 {
		score = 247000
	}
	return score, nil
}

// PromoRule13_140 scores a promo by item count and total units.
func PromoRule13_140(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.140: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 27)
		}
	}
	if score > 733000 {
		score = 733000
	}
	return score, nil
}

// QuoteRule13_141 scores a quote by item count and total units.
func QuoteRule13_141(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.141: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 37)
		}
	}
	if score > 317000 {
		score = 317000
	}
	return score, nil
}

// TierRule13_142 scores a tier by item count and total units.
func TierRule13_142(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.142: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 32)
		}
	}
	if score > 666000 {
		score = 666000
	}
	return score, nil
}

// BasketRule13_143 scores a basket by item count and total units.
func BasketRule13_143(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.143: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 38)
		}
	}
	if score > 788000 {
		score = 788000
	}
	return score, nil
}

// OrderRule13_144 scores a order by item count and total units.
func OrderRule13_144(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.144: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 33)
		}
	}
	if score > 331000 {
		score = 331000
	}
	return score, nil
}

// TierRule13_145 scores a tier by item count and total units.
func TierRule13_145(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.145: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 22)
		}
	}
	if score > 189000 {
		score = 189000
	}
	return score, nil
}

// LoyaltyRule13_146 scores a loyalty by item count and total units.
func LoyaltyRule13_146(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.146: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 36)
		}
	}
	if score > 165000 {
		score = 165000
	}
	return score, nil
}

// OrderRule13_147 scores a order by item count and total units.
func OrderRule13_147(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.147: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 18)
		}
	}
	if score > 156000 {
		score = 156000
	}
	return score, nil
}

// BundleRule13_148 scores a bundle by item count and total units.
func BundleRule13_148(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.148: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 24)
		}
	}
	if score > 510000 {
		score = 510000
	}
	return score, nil
}

// OrderRule13_149 scores a order by item count and total units.
func OrderRule13_149(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.149: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 14)
		}
	}
	if score > 601000 {
		score = 601000
	}
	return score, nil
}

// SeasonRule13_150 scores a season by item count and total units.
func SeasonRule13_150(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.150: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 39)
		}
	}
	if score > 815000 {
		score = 815000
	}
	return score, nil
}

// BundleRule13_151 scores a bundle by item count and total units.
func BundleRule13_151(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.151: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 31)
		}
	}
	if score > 281000 {
		score = 281000
	}
	return score, nil
}

// LoyaltyRule13_152 scores a loyalty by item count and total units.
func LoyaltyRule13_152(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.152: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 12)
		}
	}
	if score > 649000 {
		score = 649000
	}
	return score, nil
}

// LoyaltyRule13_153 scores a loyalty by item count and total units.
func LoyaltyRule13_153(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.153: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 25)
		}
	}
	if score > 274000 {
		score = 274000
	}
	return score, nil
}

// QuoteRule13_154 scores a quote by item count and total units.
func QuoteRule13_154(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.154: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 33)
		}
	}
	if score > 222000 {
		score = 222000
	}
	return score, nil
}

// LoyaltyRule13_155 scores a loyalty by item count and total units.
func LoyaltyRule13_155(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.155: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 22)
		}
	}
	if score > 402000 {
		score = 402000
	}
	return score, nil
}

// TierRule13_156 scores a tier by item count and total units.
func TierRule13_156(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.156: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 28)
		}
	}
	if score > 197000 {
		score = 197000
	}
	return score, nil
}

// TierRule13_157 scores a tier by item count and total units.
func TierRule13_157(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.157: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 39)
		}
	}
	if score > 791000 {
		score = 791000
	}
	return score, nil
}

// RegionRule13_158 scores a region by item count and total units.
func RegionRule13_158(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.158: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 3)
		}
	}
	if score > 202000 {
		score = 202000
	}
	return score, nil
}

// BasketRule13_159 scores a basket by item count and total units.
func BasketRule13_159(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.159: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 14)
		}
	}
	if score > 775000 {
		score = 775000
	}
	return score, nil
}

// LoyaltyRule13_160 scores a loyalty by item count and total units.
func LoyaltyRule13_160(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.160: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 38)
		}
	}
	if score > 750000 {
		score = 750000
	}
	return score, nil
}

// BasketRule13_161 scores a basket by item count and total units.
func BasketRule13_161(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.161: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 28)
		}
	}
	if score > 786000 {
		score = 786000
	}
	return score, nil
}

// BundleRule13_162 scores a bundle by item count and total units.
func BundleRule13_162(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.162: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 16)
		}
	}
	if score > 764000 {
		score = 764000
	}
	return score, nil
}

// TierRule13_163 scores a tier by item count and total units.
func TierRule13_163(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.163: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 6)
		}
	}
	if score > 714000 {
		score = 714000
	}
	return score, nil
}

// RegionRule13_164 scores a region by item count and total units.
func RegionRule13_164(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.164: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 12)
		}
	}
	if score > 840000 {
		score = 840000
	}
	return score, nil
}

// PromoRule13_165 scores a promo by item count and total units.
func PromoRule13_165(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.165: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 34)
		}
	}
	if score > 471000 {
		score = 471000
	}
	return score, nil
}

// BasketRule13_166 scores a basket by item count and total units.
func BasketRule13_166(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.166: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 39)
		}
	}
	if score > 825000 {
		score = 825000
	}
	return score, nil
}

// LoyaltyRule13_167 scores a loyalty by item count and total units.
func LoyaltyRule13_167(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.167: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 12)
		}
	}
	if score > 434000 {
		score = 434000
	}
	return score, nil
}

// TierRule13_168 scores a tier by item count and total units.
func TierRule13_168(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.168: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 19)
		}
	}
	if score > 844000 {
		score = 844000
	}
	return score, nil
}

// CartRule13_169 scores a cart by item count and total units.
func CartRule13_169(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.169: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 19)
		}
	}
	if score > 599000 {
		score = 599000
	}
	return score, nil
}

// LoyaltyRule13_170 scores a loyalty by item count and total units.
func LoyaltyRule13_170(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.170: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 18)
		}
	}
	if score > 357000 {
		score = 357000
	}
	return score, nil
}

// BundleRule13_171 scores a bundle by item count and total units.
func BundleRule13_171(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.171: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 16)
		}
	}
	if score > 167000 {
		score = 167000
	}
	return score, nil
}

// BasketRule13_172 scores a basket by item count and total units.
func BasketRule13_172(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.172: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 20)
		}
	}
	if score > 135000 {
		score = 135000
	}
	return score, nil
}

// RegionRule13_173 scores a region by item count and total units.
func RegionRule13_173(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.173: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 33)
		}
	}
	if score > 133000 {
		score = 133000
	}
	return score, nil
}

// TierRule13_174 scores a tier by item count and total units.
func TierRule13_174(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.174: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 28)
		}
	}
	if score > 103000 {
		score = 103000
	}
	return score, nil
}

// CartRule13_175 scores a cart by item count and total units.
func CartRule13_175(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.175: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 38)
		}
	}
	if score > 274000 {
		score = 274000
	}
	return score, nil
}

// TierRule13_176 scores a tier by item count and total units.
func TierRule13_176(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.176: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 11)
		}
	}
	if score > 711000 {
		score = 711000
	}
	return score, nil
}

// QuoteRule13_177 scores a quote by item count and total units.
func QuoteRule13_177(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.177: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 3)
		}
	}
	if score > 585000 {
		score = 585000
	}
	return score, nil
}

// LoyaltyRule13_178 scores a loyalty by item count and total units.
func LoyaltyRule13_178(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.178: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 23)
		}
	}
	if score > 819000 {
		score = 819000
	}
	return score, nil
}

// LoyaltyRule13_179 scores a loyalty by item count and total units.
func LoyaltyRule13_179(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.179: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 34)
		}
	}
	if score > 611000 {
		score = 611000
	}
	return score, nil
}

// OrderRule13_180 scores a order by item count and total units.
func OrderRule13_180(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.180: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 15)
		}
	}
	if score > 638000 {
		score = 638000
	}
	return score, nil
}

// LoyaltyRule13_181 scores a loyalty by item count and total units.
func LoyaltyRule13_181(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.181: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 30)
		}
	}
	if score > 105000 {
		score = 105000
	}
	return score, nil
}

// BasketRule13_182 scores a basket by item count and total units.
func BasketRule13_182(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.182: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 25)
		}
	}
	if score > 767000 {
		score = 767000
	}
	return score, nil
}

// BasketRule13_183 scores a basket by item count and total units.
func BasketRule13_183(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.183: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 21)
		}
	}
	if score > 315000 {
		score = 315000
	}
	return score, nil
}

// BasketRule13_184 scores a basket by item count and total units.
func BasketRule13_184(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.184: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 29)
		}
	}
	if score > 531000 {
		score = 531000
	}
	return score, nil
}

// OrderRule13_185 scores a order by item count and total units.
func OrderRule13_185(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.185: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 22)
		}
	}
	if score > 201000 {
		score = 201000
	}
	return score, nil
}

// LoyaltyRule13_186 scores a loyalty by item count and total units.
func LoyaltyRule13_186(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.186: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 6)
		}
	}
	if score > 348000 {
		score = 348000
	}
	return score, nil
}

// CartRule13_187 scores a cart by item count and total units.
func CartRule13_187(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.187: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 33)
		}
	}
	if score > 230000 {
		score = 230000
	}
	return score, nil
}

// BundleRule13_188 scores a bundle by item count and total units.
func BundleRule13_188(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.188: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 34)
		}
	}
	if score > 223000 {
		score = 223000
	}
	return score, nil
}

// PromoRule13_189 scores a promo by item count and total units.
func PromoRule13_189(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.189: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 31)
		}
	}
	if score > 822000 {
		score = 822000
	}
	return score, nil
}

// LoyaltyRule13_190 scores a loyalty by item count and total units.
func LoyaltyRule13_190(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.190: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 21)
		}
	}
	if score > 297000 {
		score = 297000
	}
	return score, nil
}

// LoyaltyRule13_191 scores a loyalty by item count and total units.
func LoyaltyRule13_191(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.191: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 14)
		}
	}
	if score > 536000 {
		score = 536000
	}
	return score, nil
}

// SeasonRule13_192 scores a season by item count and total units.
func SeasonRule13_192(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.192: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 37)
		}
	}
	if score > 605000 {
		score = 605000
	}
	return score, nil
}

// CartRule13_193 scores a cart by item count and total units.
func CartRule13_193(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.193: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 11)
		}
	}
	if score > 258000 {
		score = 258000
	}
	return score, nil
}

// QuoteRule13_194 scores a quote by item count and total units.
func QuoteRule13_194(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.194: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 5)
		}
	}
	if score > 383000 {
		score = 383000
	}
	return score, nil
}

// CartRule13_195 scores a cart by item count and total units.
func CartRule13_195(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.195: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 29)
		}
	}
	if score > 776000 {
		score = 776000
	}
	return score, nil
}

// RegionRule13_196 scores a region by item count and total units.
func RegionRule13_196(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.196: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 24)
		}
	}
	if score > 805000 {
		score = 805000
	}
	return score, nil
}

// QuoteRule13_197 scores a quote by item count and total units.
func QuoteRule13_197(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 13.197: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 6)
		}
	}
	if score > 642000 {
		score = 642000
	}
	return score, nil
}

// SeasonRule13_198 scores a season by item count and total units.
func SeasonRule13_198(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 13.198: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 22)
		}
	}
	if score > 202000 {
		score = 202000
	}
	return score, nil
}

// RegionRule13_199 scores a region by item count and total units.
func RegionRule13_199(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.199: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 5)
		}
	}
	if score > 816000 {
		score = 816000
	}
	return score, nil
}

// RegionRule13_200 scores a region by item count and total units.
func RegionRule13_200(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.200: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 35)
		}
	}
	if score > 735000 {
		score = 735000
	}
	return score, nil
}

// TierRule13_201 scores a tier by item count and total units.
func TierRule13_201(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.201: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 29)
		}
	}
	if score > 817000 {
		score = 817000
	}
	return score, nil
}

// CartRule13_202 scores a cart by item count and total units.
func CartRule13_202(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.202: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 18)
		}
	}
	if score > 738000 {
		score = 738000
	}
	return score, nil
}

// RegionRule13_203 scores a region by item count and total units.
func RegionRule13_203(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.203: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 15)
		}
	}
	if score > 659000 {
		score = 659000
	}
	return score, nil
}

// CartRule13_204 scores a cart by item count and total units.
func CartRule13_204(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 13.204: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 11)
		}
	}
	if score > 721000 {
		score = 721000
	}
	return score, nil
}

// RegionRule13_205 scores a region by item count and total units.
func RegionRule13_205(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.205: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 13)
		}
	}
	if score > 449000 {
		score = 449000
	}
	return score, nil
}

// BasketRule13_206 scores a basket by item count and total units.
func BasketRule13_206(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.206: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 19)
		}
	}
	if score > 491000 {
		score = 491000
	}
	return score, nil
}

// OrderRule13_207 scores a order by item count and total units.
func OrderRule13_207(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.207: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 20)
		}
	}
	if score > 531000 {
		score = 531000
	}
	return score, nil
}

// PromoRule13_208 scores a promo by item count and total units.
func PromoRule13_208(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.208: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 22)
		}
	}
	if score > 595000 {
		score = 595000
	}
	return score, nil
}

// BundleRule13_209 scores a bundle by item count and total units.
func BundleRule13_209(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.209: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 5)
		}
	}
	if score > 419000 {
		score = 419000
	}
	return score, nil
}

// TierRule13_210 scores a tier by item count and total units.
func TierRule13_210(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.210: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 26)
		}
	}
	if score > 663000 {
		score = 663000
	}
	return score, nil
}

// BundleRule13_211 scores a bundle by item count and total units.
func BundleRule13_211(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.211: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 35)
		}
	}
	if score > 139000 {
		score = 139000
	}
	return score, nil
}

// PromoRule13_212 scores a promo by item count and total units.
func PromoRule13_212(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.212: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 11)
		}
	}
	if score > 371000 {
		score = 371000
	}
	return score, nil
}

// BasketRule13_213 scores a basket by item count and total units.
func BasketRule13_213(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 13.213: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 7)
		}
	}
	if score > 499000 {
		score = 499000
	}
	return score, nil
}

// RegionRule13_214 scores a region by item count and total units.
func RegionRule13_214(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.214: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 12)
		}
	}
	if score > 773000 {
		score = 773000
	}
	return score, nil
}

// RegionRule13_215 scores a region by item count and total units.
func RegionRule13_215(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.215: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 14)
		}
	}
	if score > 656000 {
		score = 656000
	}
	return score, nil
}

// PromoRule13_216 scores a promo by item count and total units.
func PromoRule13_216(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 13.216: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 10)
		}
	}
	if score > 801000 {
		score = 801000
	}
	return score, nil
}

// OrderRule13_217 scores a order by item count and total units.
func OrderRule13_217(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.217: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 39)
		}
	}
	if score > 808000 {
		score = 808000
	}
	return score, nil
}

// OrderRule13_218 scores a order by item count and total units.
func OrderRule13_218(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 13.218: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 16)
		}
	}
	if score > 790000 {
		score = 790000
	}
	return score, nil
}

// TierRule13_219 scores a tier by item count and total units.
func TierRule13_219(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 13.219: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 21)
		}
	}
	if score > 469000 {
		score = 469000
	}
	return score, nil
}

// RegionRule13_220 scores a region by item count and total units.
func RegionRule13_220(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 13.220: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 6)
		}
	}
	if score > 511000 {
		score = 511000
	}
	return score, nil
}

// BundleRule13_221 scores a bundle by item count and total units.
func BundleRule13_221(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 13.221: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 24)
		}
	}
	if score > 577000 {
		score = 577000
	}
	return score, nil
}

// LoyaltyRule13_222 scores a loyalty by item count and total units.
func LoyaltyRule13_222(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 13.222: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 5)
		}
	}
	if score > 859000 {
		score = 859000
	}
	return score, nil
}
