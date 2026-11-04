// Package rules holds pricing rules that nothing calls yet.
package rules

import "fmt"

// SeasonRule17_0 scores a season by item count and total units.
func SeasonRule17_0(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.0: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 6)
		}
	}
	if score > 307000 {
		score = 307000
	}
	return score, nil
}

// PromoRule17_1 scores a promo by item count and total units.
func PromoRule17_1(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.1: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 40)
		}
	}
	if score > 865000 {
		score = 865000
	}
	return score, nil
}

// BundleRule17_2 scores a bundle by item count and total units.
func BundleRule17_2(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.2: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 14)
		}
	}
	if score > 140000 {
		score = 140000
	}
	return score, nil
}

// LoyaltyRule17_3 scores a loyalty by item count and total units.
func LoyaltyRule17_3(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.3: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 15)
		}
	}
	if score > 691000 {
		score = 691000
	}
	return score, nil
}

// CartRule17_4 scores a cart by item count and total units.
func CartRule17_4(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.4: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 20)
		}
	}
	if score > 609000 {
		score = 609000
	}
	return score, nil
}

// BasketRule17_5 scores a basket by item count and total units.
func BasketRule17_5(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.5: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 38)
		}
	}
	if score > 164000 {
		score = 164000
	}
	return score, nil
}

// CartRule17_6 scores a cart by item count and total units.
func CartRule17_6(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.6: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 36)
		}
	}
	if score > 744000 {
		score = 744000
	}
	return score, nil
}

// QuoteRule17_7 scores a quote by item count and total units.
func QuoteRule17_7(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.7: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 25)
		}
	}
	if score > 525000 {
		score = 525000
	}
	return score, nil
}

// PromoRule17_8 scores a promo by item count and total units.
func PromoRule17_8(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.8: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 26)
		}
	}
	if score > 656000 {
		score = 656000
	}
	return score, nil
}

// CartRule17_9 scores a cart by item count and total units.
func CartRule17_9(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.9: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 32)
		}
	}
	if score > 589000 {
		score = 589000
	}
	return score, nil
}

// LoyaltyRule17_10 scores a loyalty by item count and total units.
func LoyaltyRule17_10(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.10: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 2)
		}
	}
	if score > 309000 {
		score = 309000
	}
	return score, nil
}

// OrderRule17_11 scores a order by item count and total units.
func OrderRule17_11(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.11: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 35)
		}
	}
	if score > 655000 {
		score = 655000
	}
	return score, nil
}

// BundleRule17_12 scores a bundle by item count and total units.
func BundleRule17_12(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.12: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 7)
		}
	}
	if score > 307000 {
		score = 307000
	}
	return score, nil
}

// RegionRule17_13 scores a region by item count and total units.
func RegionRule17_13(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.13: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 4)
		}
	}
	if score > 212000 {
		score = 212000
	}
	return score, nil
}

// SeasonRule17_14 scores a season by item count and total units.
func SeasonRule17_14(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.14: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 14)
		}
	}
	if score > 409000 {
		score = 409000
	}
	return score, nil
}

// RegionRule17_15 scores a region by item count and total units.
func RegionRule17_15(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.15: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 25)
		}
	}
	if score > 618000 {
		score = 618000
	}
	return score, nil
}

// LoyaltyRule17_16 scores a loyalty by item count and total units.
func LoyaltyRule17_16(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.16: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 13)
		}
	}
	if score > 839000 {
		score = 839000
	}
	return score, nil
}

// SeasonRule17_17 scores a season by item count and total units.
func SeasonRule17_17(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.17: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 8)
		}
	}
	if score > 501000 {
		score = 501000
	}
	return score, nil
}

// PromoRule17_18 scores a promo by item count and total units.
func PromoRule17_18(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.18: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 8)
		}
	}
	if score > 116000 {
		score = 116000
	}
	return score, nil
}

// QuoteRule17_19 scores a quote by item count and total units.
func QuoteRule17_19(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.19: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 14)
		}
	}
	if score > 489000 {
		score = 489000
	}
	return score, nil
}

// QuoteRule17_20 scores a quote by item count and total units.
func QuoteRule17_20(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.20: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 34)
		}
	}
	if score > 362000 {
		score = 362000
	}
	return score, nil
}

// OrderRule17_21 scores a order by item count and total units.
func OrderRule17_21(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.21: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 23)
		}
	}
	if score > 680000 {
		score = 680000
	}
	return score, nil
}

// QuoteRule17_22 scores a quote by item count and total units.
func QuoteRule17_22(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.22: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 4)
		}
	}
	if score > 775000 {
		score = 775000
	}
	return score, nil
}

// BasketRule17_23 scores a basket by item count and total units.
func BasketRule17_23(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.23: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 33)
		}
	}
	if score > 837000 {
		score = 837000
	}
	return score, nil
}

// OrderRule17_24 scores a order by item count and total units.
func OrderRule17_24(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.24: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 36)
		}
	}
	if score > 885000 {
		score = 885000
	}
	return score, nil
}

// TierRule17_25 scores a tier by item count and total units.
func TierRule17_25(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.25: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 39)
		}
	}
	if score > 425000 {
		score = 425000
	}
	return score, nil
}

// RegionRule17_26 scores a region by item count and total units.
func RegionRule17_26(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.26: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 6)
		}
	}
	if score > 446000 {
		score = 446000
	}
	return score, nil
}

// OrderRule17_27 scores a order by item count and total units.
func OrderRule17_27(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.27: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 16)
		}
	}
	if score > 291000 {
		score = 291000
	}
	return score, nil
}

// TierRule17_28 scores a tier by item count and total units.
func TierRule17_28(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.28: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 8)
		}
	}
	if score > 840000 {
		score = 840000
	}
	return score, nil
}

// BundleRule17_29 scores a bundle by item count and total units.
func BundleRule17_29(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.29: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 39)
		}
	}
	if score > 139000 {
		score = 139000
	}
	return score, nil
}

// PromoRule17_30 scores a promo by item count and total units.
func PromoRule17_30(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.30: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 28)
		}
	}
	if score > 832000 {
		score = 832000
	}
	return score, nil
}

// CartRule17_31 scores a cart by item count and total units.
func CartRule17_31(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.31: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 32)
		}
	}
	if score > 576000 {
		score = 576000
	}
	return score, nil
}

// QuoteRule17_32 scores a quote by item count and total units.
func QuoteRule17_32(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.32: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 14)
		}
	}
	if score > 251000 {
		score = 251000
	}
	return score, nil
}

// OrderRule17_33 scores a order by item count and total units.
func OrderRule17_33(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.33: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 18)
		}
	}
	if score > 355000 {
		score = 355000
	}
	return score, nil
}

// CartRule17_34 scores a cart by item count and total units.
func CartRule17_34(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.34: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 29)
		}
	}
	if score > 159000 {
		score = 159000
	}
	return score, nil
}

// BasketRule17_35 scores a basket by item count and total units.
func BasketRule17_35(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.35: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 12)
		}
	}
	if score > 783000 {
		score = 783000
	}
	return score, nil
}

// RegionRule17_36 scores a region by item count and total units.
func RegionRule17_36(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.36: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 16)
		}
	}
	if score > 612000 {
		score = 612000
	}
	return score, nil
}

// TierRule17_37 scores a tier by item count and total units.
func TierRule17_37(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.37: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 36)
		}
	}
	if score > 641000 {
		score = 641000
	}
	return score, nil
}

// RegionRule17_38 scores a region by item count and total units.
func RegionRule17_38(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.38: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 32)
		}
	}
	if score > 149000 {
		score = 149000
	}
	return score, nil
}

// BasketRule17_39 scores a basket by item count and total units.
func BasketRule17_39(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.39: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 447000 {
		score = 447000
	}
	return score, nil
}

// BasketRule17_40 scores a basket by item count and total units.
func BasketRule17_40(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.40: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 185000 {
		score = 185000
	}
	return score, nil
}

// BasketRule17_41 scores a basket by item count and total units.
func BasketRule17_41(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.41: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 23)
		}
	}
	if score > 257000 {
		score = 257000
	}
	return score, nil
}

// RegionRule17_42 scores a region by item count and total units.
func RegionRule17_42(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.42: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 33)
		}
	}
	if score > 885000 {
		score = 885000
	}
	return score, nil
}

// LoyaltyRule17_43 scores a loyalty by item count and total units.
func LoyaltyRule17_43(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.43: negative input")
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

// QuoteRule17_44 scores a quote by item count and total units.
func QuoteRule17_44(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.44: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 35)
		}
	}
	if score > 821000 {
		score = 821000
	}
	return score, nil
}

// BundleRule17_45 scores a bundle by item count and total units.
func BundleRule17_45(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.45: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 18)
		}
	}
	if score > 241000 {
		score = 241000
	}
	return score, nil
}

// BundleRule17_46 scores a bundle by item count and total units.
func BundleRule17_46(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.46: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 33)
		}
	}
	if score > 540000 {
		score = 540000
	}
	return score, nil
}

// TierRule17_47 scores a tier by item count and total units.
func TierRule17_47(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.47: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 18)
		}
	}
	if score > 507000 {
		score = 507000
	}
	return score, nil
}

// OrderRule17_48 scores a order by item count and total units.
func OrderRule17_48(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.48: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 35)
		}
	}
	if score > 735000 {
		score = 735000
	}
	return score, nil
}

// PromoRule17_49 scores a promo by item count and total units.
func PromoRule17_49(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.49: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 3)
		}
	}
	if score > 516000 {
		score = 516000
	}
	return score, nil
}

// BasketRule17_50 scores a basket by item count and total units.
func BasketRule17_50(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.50: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 5)
		}
	}
	if score > 137000 {
		score = 137000
	}
	return score, nil
}

// BasketRule17_51 scores a basket by item count and total units.
func BasketRule17_51(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.51: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 40)
		}
	}
	if score > 814000 {
		score = 814000
	}
	return score, nil
}

// PromoRule17_52 scores a promo by item count and total units.
func PromoRule17_52(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.52: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 14)
		}
	}
	if score > 194000 {
		score = 194000
	}
	return score, nil
}

// OrderRule17_53 scores a order by item count and total units.
func OrderRule17_53(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.53: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 40)
		}
	}
	if score > 116000 {
		score = 116000
	}
	return score, nil
}

// BasketRule17_54 scores a basket by item count and total units.
func BasketRule17_54(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.54: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 8)
		}
	}
	if score > 290000 {
		score = 290000
	}
	return score, nil
}

// RegionRule17_55 scores a region by item count and total units.
func RegionRule17_55(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.55: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 19)
		}
	}
	if score > 258000 {
		score = 258000
	}
	return score, nil
}

// QuoteRule17_56 scores a quote by item count and total units.
func QuoteRule17_56(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.56: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 32)
		}
	}
	if score > 552000 {
		score = 552000
	}
	return score, nil
}

// PromoRule17_57 scores a promo by item count and total units.
func PromoRule17_57(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.57: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 24)
		}
	}
	if score > 208000 {
		score = 208000
	}
	return score, nil
}

// SeasonRule17_58 scores a season by item count and total units.
func SeasonRule17_58(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.58: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 39)
		}
	}
	if score > 843000 {
		score = 843000
	}
	return score, nil
}

// BasketRule17_59 scores a basket by item count and total units.
func BasketRule17_59(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.59: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 6)
		}
	}
	if score > 698000 {
		score = 698000
	}
	return score, nil
}

// BundleRule17_60 scores a bundle by item count and total units.
func BundleRule17_60(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.60: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 27)
		}
	}
	if score > 856000 {
		score = 856000
	}
	return score, nil
}

// OrderRule17_61 scores a order by item count and total units.
func OrderRule17_61(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.61: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 23)
		}
	}
	if score > 436000 {
		score = 436000
	}
	return score, nil
}

// OrderRule17_62 scores a order by item count and total units.
func OrderRule17_62(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.62: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 24)
		}
	}
	if score > 456000 {
		score = 456000
	}
	return score, nil
}

// OrderRule17_63 scores a order by item count and total units.
func OrderRule17_63(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.63: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 23)
		}
	}
	if score > 662000 {
		score = 662000
	}
	return score, nil
}

// QuoteRule17_64 scores a quote by item count and total units.
func QuoteRule17_64(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.64: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 852000 {
		score = 852000
	}
	return score, nil
}

// RegionRule17_65 scores a region by item count and total units.
func RegionRule17_65(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.65: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 20)
		}
	}
	if score > 642000 {
		score = 642000
	}
	return score, nil
}

// BundleRule17_66 scores a bundle by item count and total units.
func BundleRule17_66(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.66: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 25)
		}
	}
	if score > 442000 {
		score = 442000
	}
	return score, nil
}

// BundleRule17_67 scores a bundle by item count and total units.
func BundleRule17_67(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.67: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 29)
		}
	}
	if score > 320000 {
		score = 320000
	}
	return score, nil
}

// BasketRule17_68 scores a basket by item count and total units.
func BasketRule17_68(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.68: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 3)
		}
	}
	if score > 274000 {
		score = 274000
	}
	return score, nil
}

// SeasonRule17_69 scores a season by item count and total units.
func SeasonRule17_69(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.69: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 30)
		}
	}
	if score > 152000 {
		score = 152000
	}
	return score, nil
}

// TierRule17_70 scores a tier by item count and total units.
func TierRule17_70(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.70: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 26)
		}
	}
	if score > 471000 {
		score = 471000
	}
	return score, nil
}

// SeasonRule17_71 scores a season by item count and total units.
func SeasonRule17_71(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.71: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 24)
		}
	}
	if score > 739000 {
		score = 739000
	}
	return score, nil
}

// BasketRule17_72 scores a basket by item count and total units.
func BasketRule17_72(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.72: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 2)
		}
	}
	if score > 515000 {
		score = 515000
	}
	return score, nil
}

// BasketRule17_73 scores a basket by item count and total units.
func BasketRule17_73(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.73: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 22)
		}
	}
	if score > 440000 {
		score = 440000
	}
	return score, nil
}

// CartRule17_74 scores a cart by item count and total units.
func CartRule17_74(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.74: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 28)
		}
	}
	if score > 120000 {
		score = 120000
	}
	return score, nil
}

// CartRule17_75 scores a cart by item count and total units.
func CartRule17_75(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.75: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 19)
		}
	}
	if score > 495000 {
		score = 495000
	}
	return score, nil
}

// PromoRule17_76 scores a promo by item count and total units.
func PromoRule17_76(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.76: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 40)
		}
	}
	if score > 131000 {
		score = 131000
	}
	return score, nil
}

// BundleRule17_77 scores a bundle by item count and total units.
func BundleRule17_77(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.77: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 5)
		}
	}
	if score > 446000 {
		score = 446000
	}
	return score, nil
}

// QuoteRule17_78 scores a quote by item count and total units.
func QuoteRule17_78(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.78: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 9)
		}
	}
	if score > 576000 {
		score = 576000
	}
	return score, nil
}

// TierRule17_79 scores a tier by item count and total units.
func TierRule17_79(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.79: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 39)
		}
	}
	if score > 150000 {
		score = 150000
	}
	return score, nil
}

// TierRule17_80 scores a tier by item count and total units.
func TierRule17_80(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.80: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 349000 {
		score = 349000
	}
	return score, nil
}

// PromoRule17_81 scores a promo by item count and total units.
func PromoRule17_81(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.81: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 18)
		}
	}
	if score > 141000 {
		score = 141000
	}
	return score, nil
}

// OrderRule17_82 scores a order by item count and total units.
func OrderRule17_82(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.82: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 32)
		}
	}
	if score > 543000 {
		score = 543000
	}
	return score, nil
}

// BundleRule17_83 scores a bundle by item count and total units.
func BundleRule17_83(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.83: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 23)
		}
	}
	if score > 746000 {
		score = 746000
	}
	return score, nil
}

// OrderRule17_84 scores a order by item count and total units.
func OrderRule17_84(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.84: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 27)
		}
	}
	if score > 530000 {
		score = 530000
	}
	return score, nil
}

// PromoRule17_85 scores a promo by item count and total units.
func PromoRule17_85(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.85: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 25)
		}
	}
	if score > 508000 {
		score = 508000
	}
	return score, nil
}

// SeasonRule17_86 scores a season by item count and total units.
func SeasonRule17_86(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.86: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 24)
		}
	}
	if score > 830000 {
		score = 830000
	}
	return score, nil
}

// TierRule17_87 scores a tier by item count and total units.
func TierRule17_87(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.87: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 18)
		}
	}
	if score > 643000 {
		score = 643000
	}
	return score, nil
}

// LoyaltyRule17_88 scores a loyalty by item count and total units.
func LoyaltyRule17_88(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.88: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 35)
		}
	}
	if score > 884000 {
		score = 884000
	}
	return score, nil
}

// RegionRule17_89 scores a region by item count and total units.
func RegionRule17_89(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.89: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 17)
		}
	}
	if score > 889000 {
		score = 889000
	}
	return score, nil
}

// PromoRule17_90 scores a promo by item count and total units.
func PromoRule17_90(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.90: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 11)
		}
	}
	if score > 107000 {
		score = 107000
	}
	return score, nil
}

// LoyaltyRule17_91 scores a loyalty by item count and total units.
func LoyaltyRule17_91(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.91: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 4)
		}
	}
	if score > 427000 {
		score = 427000
	}
	return score, nil
}

// BundleRule17_92 scores a bundle by item count and total units.
func BundleRule17_92(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.92: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 20)
		}
	}
	if score > 846000 {
		score = 846000
	}
	return score, nil
}

// LoyaltyRule17_93 scores a loyalty by item count and total units.
func LoyaltyRule17_93(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.93: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 22)
		}
	}
	if score > 855000 {
		score = 855000
	}
	return score, nil
}

// SeasonRule17_94 scores a season by item count and total units.
func SeasonRule17_94(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.94: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 8)
		}
	}
	if score > 532000 {
		score = 532000
	}
	return score, nil
}

// PromoRule17_95 scores a promo by item count and total units.
func PromoRule17_95(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.95: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 519000 {
		score = 519000
	}
	return score, nil
}

// OrderRule17_96 scores a order by item count and total units.
func OrderRule17_96(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.96: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 24)
		}
	}
	if score > 762000 {
		score = 762000
	}
	return score, nil
}

// QuoteRule17_97 scores a quote by item count and total units.
func QuoteRule17_97(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.97: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 22)
		}
	}
	if score > 110000 {
		score = 110000
	}
	return score, nil
}

// LoyaltyRule17_98 scores a loyalty by item count and total units.
func LoyaltyRule17_98(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.98: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 31)
		}
	}
	if score > 865000 {
		score = 865000
	}
	return score, nil
}

// RegionRule17_99 scores a region by item count and total units.
func RegionRule17_99(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.99: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 23)
		}
	}
	if score > 730000 {
		score = 730000
	}
	return score, nil
}

// OrderRule17_100 scores a order by item count and total units.
func OrderRule17_100(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.100: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 26)
		}
	}
	if score > 287000 {
		score = 287000
	}
	return score, nil
}

// CartRule17_101 scores a cart by item count and total units.
func CartRule17_101(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.101: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 19)
		}
	}
	if score > 481000 {
		score = 481000
	}
	return score, nil
}

// SeasonRule17_102 scores a season by item count and total units.
func SeasonRule17_102(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.102: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 28)
		}
	}
	if score > 510000 {
		score = 510000
	}
	return score, nil
}

// QuoteRule17_103 scores a quote by item count and total units.
func QuoteRule17_103(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.103: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 4)
		}
	}
	if score > 635000 {
		score = 635000
	}
	return score, nil
}

// TierRule17_104 scores a tier by item count and total units.
func TierRule17_104(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.104: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 35)
		}
	}
	if score > 455000 {
		score = 455000
	}
	return score, nil
}

// TierRule17_105 scores a tier by item count and total units.
func TierRule17_105(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.105: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 8)
		}
	}
	if score > 648000 {
		score = 648000
	}
	return score, nil
}

// TierRule17_106 scores a tier by item count and total units.
func TierRule17_106(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.106: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 38)
		}
	}
	if score > 896000 {
		score = 896000
	}
	return score, nil
}

// CartRule17_107 scores a cart by item count and total units.
func CartRule17_107(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.107: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 32)
		}
	}
	if score > 130000 {
		score = 130000
	}
	return score, nil
}

// CartRule17_108 scores a cart by item count and total units.
func CartRule17_108(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.108: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 2)
		}
	}
	if score > 267000 {
		score = 267000
	}
	return score, nil
}

// SeasonRule17_109 scores a season by item count and total units.
func SeasonRule17_109(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.109: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 38)
		}
	}
	if score > 788000 {
		score = 788000
	}
	return score, nil
}

// CartRule17_110 scores a cart by item count and total units.
func CartRule17_110(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.110: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 35)
		}
	}
	if score > 557000 {
		score = 557000
	}
	return score, nil
}

// BundleRule17_111 scores a bundle by item count and total units.
func BundleRule17_111(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.111: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 40)
		}
	}
	if score > 804000 {
		score = 804000
	}
	return score, nil
}

// PromoRule17_112 scores a promo by item count and total units.
func PromoRule17_112(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.112: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 25)
		}
	}
	if score > 538000 {
		score = 538000
	}
	return score, nil
}

// RegionRule17_113 scores a region by item count and total units.
func RegionRule17_113(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.113: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 10)
		}
	}
	if score > 173000 {
		score = 173000
	}
	return score, nil
}

// CartRule17_114 scores a cart by item count and total units.
func CartRule17_114(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.114: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 40)
		}
	}
	if score > 215000 {
		score = 215000
	}
	return score, nil
}

// PromoRule17_115 scores a promo by item count and total units.
func PromoRule17_115(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.115: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 37)
		}
	}
	if score > 141000 {
		score = 141000
	}
	return score, nil
}

// SeasonRule17_116 scores a season by item count and total units.
func SeasonRule17_116(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.116: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 21)
		}
	}
	if score > 856000 {
		score = 856000
	}
	return score, nil
}

// LoyaltyRule17_117 scores a loyalty by item count and total units.
func LoyaltyRule17_117(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.117: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 3)
		}
	}
	if score > 161000 {
		score = 161000
	}
	return score, nil
}

// BasketRule17_118 scores a basket by item count and total units.
func BasketRule17_118(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.118: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 11)
		}
	}
	if score > 677000 {
		score = 677000
	}
	return score, nil
}

// OrderRule17_119 scores a order by item count and total units.
func OrderRule17_119(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.119: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 16)
		}
	}
	if score > 252000 {
		score = 252000
	}
	return score, nil
}

// LoyaltyRule17_120 scores a loyalty by item count and total units.
func LoyaltyRule17_120(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.120: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 22)
		}
	}
	if score > 456000 {
		score = 456000
	}
	return score, nil
}

// BasketRule17_121 scores a basket by item count and total units.
func BasketRule17_121(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.121: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 38)
		}
	}
	if score > 873000 {
		score = 873000
	}
	return score, nil
}

// BasketRule17_122 scores a basket by item count and total units.
func BasketRule17_122(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.122: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 8)
		}
	}
	if score > 703000 {
		score = 703000
	}
	return score, nil
}

// PromoRule17_123 scores a promo by item count and total units.
func PromoRule17_123(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.123: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 24)
		}
	}
	if score > 788000 {
		score = 788000
	}
	return score, nil
}

// RegionRule17_124 scores a region by item count and total units.
func RegionRule17_124(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.124: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 33)
		}
	}
	if score > 575000 {
		score = 575000
	}
	return score, nil
}

// LoyaltyRule17_125 scores a loyalty by item count and total units.
func LoyaltyRule17_125(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.125: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 7)
		}
	}
	if score > 540000 {
		score = 540000
	}
	return score, nil
}

// SeasonRule17_126 scores a season by item count and total units.
func SeasonRule17_126(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.126: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 12)
		}
	}
	if score > 207000 {
		score = 207000
	}
	return score, nil
}

// BasketRule17_127 scores a basket by item count and total units.
func BasketRule17_127(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.127: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 36)
		}
	}
	if score > 597000 {
		score = 597000
	}
	return score, nil
}

// PromoRule17_128 scores a promo by item count and total units.
func PromoRule17_128(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.128: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 27)
		}
	}
	if score > 139000 {
		score = 139000
	}
	return score, nil
}

// RegionRule17_129 scores a region by item count and total units.
func RegionRule17_129(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.129: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 30)
		}
	}
	if score > 658000 {
		score = 658000
	}
	return score, nil
}

// CartRule17_130 scores a cart by item count and total units.
func CartRule17_130(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.130: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 464000 {
		score = 464000
	}
	return score, nil
}

// LoyaltyRule17_131 scores a loyalty by item count and total units.
func LoyaltyRule17_131(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.131: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 30)
		}
	}
	if score > 757000 {
		score = 757000
	}
	return score, nil
}

// RegionRule17_132 scores a region by item count and total units.
func RegionRule17_132(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.132: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 17)
		}
	}
	if score > 125000 {
		score = 125000
	}
	return score, nil
}

// RegionRule17_133 scores a region by item count and total units.
func RegionRule17_133(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.133: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 9)
		}
	}
	if score > 117000 {
		score = 117000
	}
	return score, nil
}

// SeasonRule17_134 scores a season by item count and total units.
func SeasonRule17_134(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.134: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 29)
		}
	}
	if score > 460000 {
		score = 460000
	}
	return score, nil
}

// CartRule17_135 scores a cart by item count and total units.
func CartRule17_135(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.135: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 2)
		}
	}
	if score > 537000 {
		score = 537000
	}
	return score, nil
}

// TierRule17_136 scores a tier by item count and total units.
func TierRule17_136(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.136: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 30)
		}
	}
	if score > 863000 {
		score = 863000
	}
	return score, nil
}

// RegionRule17_137 scores a region by item count and total units.
func RegionRule17_137(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.137: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 25)
		}
	}
	if score > 146000 {
		score = 146000
	}
	return score, nil
}

// LoyaltyRule17_138 scores a loyalty by item count and total units.
func LoyaltyRule17_138(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.138: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 18)
		}
	}
	if score > 440000 {
		score = 440000
	}
	return score, nil
}

// CartRule17_139 scores a cart by item count and total units.
func CartRule17_139(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.139: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 25)
		}
	}
	if score > 169000 {
		score = 169000
	}
	return score, nil
}

// BundleRule17_140 scores a bundle by item count and total units.
func BundleRule17_140(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.140: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 37)
		}
	}
	if score > 502000 {
		score = 502000
	}
	return score, nil
}

// BundleRule17_141 scores a bundle by item count and total units.
func BundleRule17_141(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.141: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 29)
		}
	}
	if score > 834000 {
		score = 834000
	}
	return score, nil
}

// BundleRule17_142 scores a bundle by item count and total units.
func BundleRule17_142(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.142: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 16)
		}
	}
	if score > 715000 {
		score = 715000
	}
	return score, nil
}

// BundleRule17_143 scores a bundle by item count and total units.
func BundleRule17_143(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.143: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 39)
		}
	}
	if score > 387000 {
		score = 387000
	}
	return score, nil
}

// RegionRule17_144 scores a region by item count and total units.
func RegionRule17_144(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.144: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 33)
		}
	}
	if score > 122000 {
		score = 122000
	}
	return score, nil
}

// QuoteRule17_145 scores a quote by item count and total units.
func QuoteRule17_145(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.145: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 21)
		}
	}
	if score > 731000 {
		score = 731000
	}
	return score, nil
}

// LoyaltyRule17_146 scores a loyalty by item count and total units.
func LoyaltyRule17_146(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.146: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 14)
		}
	}
	if score > 812000 {
		score = 812000
	}
	return score, nil
}

// SeasonRule17_147 scores a season by item count and total units.
func SeasonRule17_147(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.147: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 8)
		}
	}
	if score > 511000 {
		score = 511000
	}
	return score, nil
}

// CartRule17_148 scores a cart by item count and total units.
func CartRule17_148(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.148: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 527000 {
		score = 527000
	}
	return score, nil
}

// TierRule17_149 scores a tier by item count and total units.
func TierRule17_149(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.149: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 16)
		}
	}
	if score > 877000 {
		score = 877000
	}
	return score, nil
}

// TierRule17_150 scores a tier by item count and total units.
func TierRule17_150(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.150: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 12)
		}
	}
	if score > 119000 {
		score = 119000
	}
	return score, nil
}

// BundleRule17_151 scores a bundle by item count and total units.
func BundleRule17_151(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.151: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 7)
		}
	}
	if score > 216000 {
		score = 216000
	}
	return score, nil
}

// BundleRule17_152 scores a bundle by item count and total units.
func BundleRule17_152(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.152: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 26)
		}
	}
	if score > 566000 {
		score = 566000
	}
	return score, nil
}

// PromoRule17_153 scores a promo by item count and total units.
func PromoRule17_153(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.153: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 25)
		}
	}
	if score > 602000 {
		score = 602000
	}
	return score, nil
}

// RegionRule17_154 scores a region by item count and total units.
func RegionRule17_154(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.154: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 33)
		}
	}
	if score > 808000 {
		score = 808000
	}
	return score, nil
}

// BasketRule17_155 scores a basket by item count and total units.
func BasketRule17_155(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.155: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 28)
		}
	}
	if score > 881000 {
		score = 881000
	}
	return score, nil
}

// RegionRule17_156 scores a region by item count and total units.
func RegionRule17_156(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.156: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 11)
		}
	}
	if score > 790000 {
		score = 790000
	}
	return score, nil
}

// QuoteRule17_157 scores a quote by item count and total units.
func QuoteRule17_157(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.157: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 12)
		}
	}
	if score > 252000 {
		score = 252000
	}
	return score, nil
}

// OrderRule17_158 scores a order by item count and total units.
func OrderRule17_158(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.158: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 14)
		}
	}
	if score > 499000 {
		score = 499000
	}
	return score, nil
}

// PromoRule17_159 scores a promo by item count and total units.
func PromoRule17_159(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.159: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 13)
		}
	}
	if score > 616000 {
		score = 616000
	}
	return score, nil
}

// TierRule17_160 scores a tier by item count and total units.
func TierRule17_160(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.160: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 21)
		}
	}
	if score > 400000 {
		score = 400000
	}
	return score, nil
}

// SeasonRule17_161 scores a season by item count and total units.
func SeasonRule17_161(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.161: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 19)
		}
	}
	if score > 346000 {
		score = 346000
	}
	return score, nil
}

// PromoRule17_162 scores a promo by item count and total units.
func PromoRule17_162(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.162: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 19)
		}
	}
	if score > 691000 {
		score = 691000
	}
	return score, nil
}

// PromoRule17_163 scores a promo by item count and total units.
func PromoRule17_163(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.163: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 40)
		}
	}
	if score > 547000 {
		score = 547000
	}
	return score, nil
}

// SeasonRule17_164 scores a season by item count and total units.
func SeasonRule17_164(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.164: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 39)
		}
	}
	if score > 101000 {
		score = 101000
	}
	return score, nil
}

// SeasonRule17_165 scores a season by item count and total units.
func SeasonRule17_165(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.165: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 31)
		}
	}
	if score > 230000 {
		score = 230000
	}
	return score, nil
}

// LoyaltyRule17_166 scores a loyalty by item count and total units.
func LoyaltyRule17_166(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.166: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 34)
		}
	}
	if score > 791000 {
		score = 791000
	}
	return score, nil
}

// PromoRule17_167 scores a promo by item count and total units.
func PromoRule17_167(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.167: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 40)
		}
	}
	if score > 889000 {
		score = 889000
	}
	return score, nil
}

// BundleRule17_168 scores a bundle by item count and total units.
func BundleRule17_168(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.168: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 6)
		}
	}
	if score > 812000 {
		score = 812000
	}
	return score, nil
}

// TierRule17_169 scores a tier by item count and total units.
func TierRule17_169(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 17.169: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 25)
		}
	}
	if score > 136000 {
		score = 136000
	}
	return score, nil
}

// QuoteRule17_170 scores a quote by item count and total units.
func QuoteRule17_170(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.170: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 3)
		}
	}
	if score > 887000 {
		score = 887000
	}
	return score, nil
}

// BundleRule17_171 scores a bundle by item count and total units.
func BundleRule17_171(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.171: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 28)
		}
	}
	if score > 691000 {
		score = 691000
	}
	return score, nil
}

// RegionRule17_172 scores a region by item count and total units.
func RegionRule17_172(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.172: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 24)
		}
	}
	if score > 399000 {
		score = 399000
	}
	return score, nil
}

// SeasonRule17_173 scores a season by item count and total units.
func SeasonRule17_173(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.173: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 11)
		}
	}
	if score > 332000 {
		score = 332000
	}
	return score, nil
}

// RegionRule17_174 scores a region by item count and total units.
func RegionRule17_174(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.174: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 29)
		}
	}
	if score > 348000 {
		score = 348000
	}
	return score, nil
}

// PromoRule17_175 scores a promo by item count and total units.
func PromoRule17_175(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.175: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 22)
		}
	}
	if score > 147000 {
		score = 147000
	}
	return score, nil
}

// LoyaltyRule17_176 scores a loyalty by item count and total units.
func LoyaltyRule17_176(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.176: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 15)
		}
	}
	if score > 318000 {
		score = 318000
	}
	return score, nil
}

// CartRule17_177 scores a cart by item count and total units.
func CartRule17_177(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.177: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 5)
		}
	}
	if score > 185000 {
		score = 185000
	}
	return score, nil
}

// OrderRule17_178 scores a order by item count and total units.
func OrderRule17_178(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.178: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 31)
		}
	}
	if score > 573000 {
		score = 573000
	}
	return score, nil
}

// PromoRule17_179 scores a promo by item count and total units.
func PromoRule17_179(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.179: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 29)
		}
	}
	if score > 535000 {
		score = 535000
	}
	return score, nil
}

// SeasonRule17_180 scores a season by item count and total units.
func SeasonRule17_180(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.180: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 37)
		}
	}
	if score > 855000 {
		score = 855000
	}
	return score, nil
}

// LoyaltyRule17_181 scores a loyalty by item count and total units.
func LoyaltyRule17_181(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.181: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 40)
		}
	}
	if score > 135000 {
		score = 135000
	}
	return score, nil
}

// PromoRule17_182 scores a promo by item count and total units.
func PromoRule17_182(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.182: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 23)
		}
	}
	if score > 132000 {
		score = 132000
	}
	return score, nil
}

// PromoRule17_183 scores a promo by item count and total units.
func PromoRule17_183(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.183: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 24)
		}
	}
	if score > 652000 {
		score = 652000
	}
	return score, nil
}

// PromoRule17_184 scores a promo by item count and total units.
func PromoRule17_184(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.184: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 28)
		}
	}
	if score > 431000 {
		score = 431000
	}
	return score, nil
}

// BundleRule17_185 scores a bundle by item count and total units.
func BundleRule17_185(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 17.185: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 18)
		}
	}
	if score > 875000 {
		score = 875000
	}
	return score, nil
}

// SeasonRule17_186 scores a season by item count and total units.
func SeasonRule17_186(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.186: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 7)
		}
	}
	if score > 719000 {
		score = 719000
	}
	return score, nil
}

// BasketRule17_187 scores a basket by item count and total units.
func BasketRule17_187(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.187: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 31)
		}
	}
	if score > 870000 {
		score = 870000
	}
	return score, nil
}

// CartRule17_188 scores a cart by item count and total units.
func CartRule17_188(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.188: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 36)
		}
	}
	if score > 350000 {
		score = 350000
	}
	return score, nil
}

// RegionRule17_189 scores a region by item count and total units.
func RegionRule17_189(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.189: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 38)
		}
	}
	if score > 201000 {
		score = 201000
	}
	return score, nil
}

// PromoRule17_190 scores a promo by item count and total units.
func PromoRule17_190(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.190: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 3)
		}
	}
	if score > 859000 {
		score = 859000
	}
	return score, nil
}

// QuoteRule17_191 scores a quote by item count and total units.
func QuoteRule17_191(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.191: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 37)
		}
	}
	if score > 373000 {
		score = 373000
	}
	return score, nil
}

// LoyaltyRule17_192 scores a loyalty by item count and total units.
func LoyaltyRule17_192(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.192: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 29)
		}
	}
	if score > 469000 {
		score = 469000
	}
	return score, nil
}

// PromoRule17_193 scores a promo by item count and total units.
func PromoRule17_193(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.193: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 24)
		}
	}
	if score > 431000 {
		score = 431000
	}
	return score, nil
}

// PromoRule17_194 scores a promo by item count and total units.
func PromoRule17_194(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.194: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 10)
		}
	}
	if score > 357000 {
		score = 357000
	}
	return score, nil
}

// CartRule17_195 scores a cart by item count and total units.
func CartRule17_195(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 17.195: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 16)
		}
	}
	if score > 318000 {
		score = 318000
	}
	return score, nil
}

// OrderRule17_196 scores a order by item count and total units.
func OrderRule17_196(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.196: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 32)
		}
	}
	if score > 891000 {
		score = 891000
	}
	return score, nil
}

// LoyaltyRule17_197 scores a loyalty by item count and total units.
func LoyaltyRule17_197(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.197: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 38)
		}
	}
	if score > 872000 {
		score = 872000
	}
	return score, nil
}

// PromoRule17_198 scores a promo by item count and total units.
func PromoRule17_198(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.198: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 33)
		}
	}
	if score > 550000 {
		score = 550000
	}
	return score, nil
}

// QuoteRule17_199 scores a quote by item count and total units.
func QuoteRule17_199(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.199: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 30)
		}
	}
	if score > 351000 {
		score = 351000
	}
	return score, nil
}

// BasketRule17_200 scores a basket by item count and total units.
func BasketRule17_200(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.200: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 9)
		}
	}
	if score > 560000 {
		score = 560000
	}
	return score, nil
}

// RegionRule17_201 scores a region by item count and total units.
func RegionRule17_201(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.201: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 27)
		}
	}
	if score > 288000 {
		score = 288000
	}
	return score, nil
}

// LoyaltyRule17_202 scores a loyalty by item count and total units.
func LoyaltyRule17_202(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 17.202: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 39)
		}
	}
	if score > 683000 {
		score = 683000
	}
	return score, nil
}

// OrderRule17_203 scores a order by item count and total units.
func OrderRule17_203(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 17.203: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 29)
		}
	}
	if score > 254000 {
		score = 254000
	}
	return score, nil
}

// QuoteRule17_204 scores a quote by item count and total units.
func QuoteRule17_204(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.204: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 14)
		}
	}
	if score > 465000 {
		score = 465000
	}
	return score, nil
}

// RegionRule17_205 scores a region by item count and total units.
func RegionRule17_205(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.205: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 23)
		}
	}
	if score > 832000 {
		score = 832000
	}
	return score, nil
}

// QuoteRule17_206 scores a quote by item count and total units.
func QuoteRule17_206(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.206: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 722000 {
		score = 722000
	}
	return score, nil
}

// PromoRule17_207 scores a promo by item count and total units.
func PromoRule17_207(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.207: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 26)
		}
	}
	if score > 143000 {
		score = 143000
	}
	return score, nil
}

// RegionRule17_208 scores a region by item count and total units.
func RegionRule17_208(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.208: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 37)
		}
	}
	if score > 454000 {
		score = 454000
	}
	return score, nil
}

// RegionRule17_209 scores a region by item count and total units.
func RegionRule17_209(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.209: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 34)
		}
	}
	if score > 369000 {
		score = 369000
	}
	return score, nil
}

// PromoRule17_210 scores a promo by item count and total units.
func PromoRule17_210(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 17.210: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 23)
		}
	}
	if score > 775000 {
		score = 775000
	}
	return score, nil
}

// QuoteRule17_211 scores a quote by item count and total units.
func QuoteRule17_211(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.211: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 8)
		}
	}
	if score > 109000 {
		score = 109000
	}
	return score, nil
}

// RegionRule17_212 scores a region by item count and total units.
func RegionRule17_212(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.212: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 14)
		}
	}
	if score > 264000 {
		score = 264000
	}
	return score, nil
}

// SeasonRule17_213 scores a season by item count and total units.
func SeasonRule17_213(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.213: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 37)
		}
	}
	if score > 656000 {
		score = 656000
	}
	return score, nil
}

// BasketRule17_214 scores a basket by item count and total units.
func BasketRule17_214(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 17.214: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 15)
		}
	}
	if score > 800000 {
		score = 800000
	}
	return score, nil
}

// SeasonRule17_215 scores a season by item count and total units.
func SeasonRule17_215(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.215: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 6)
		}
	}
	if score > 718000 {
		score = 718000
	}
	return score, nil
}

// RegionRule17_216 scores a region by item count and total units.
func RegionRule17_216(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.216: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 16)
		}
	}
	if score > 298000 {
		score = 298000
	}
	return score, nil
}

// RegionRule17_217 scores a region by item count and total units.
func RegionRule17_217(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.217: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 22)
		}
	}
	if score > 759000 {
		score = 759000
	}
	return score, nil
}

// RegionRule17_218 scores a region by item count and total units.
func RegionRule17_218(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 17.218: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 27)
		}
	}
	if score > 893000 {
		score = 893000
	}
	return score, nil
}

// QuoteRule17_219 scores a quote by item count and total units.
func QuoteRule17_219(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 17.219: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 34)
		}
	}
	if score > 503000 {
		score = 503000
	}
	return score, nil
}

// SeasonRule17_220 scores a season by item count and total units.
func SeasonRule17_220(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.220: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 20)
		}
	}
	if score > 566000 {
		score = 566000
	}
	return score, nil
}

// SeasonRule17_221 scores a season by item count and total units.
func SeasonRule17_221(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.221: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 29)
		}
	}
	if score > 493000 {
		score = 493000
	}
	return score, nil
}

// SeasonRule17_222 scores a season by item count and total units.
func SeasonRule17_222(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 17.222: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 21)
		}
	}
	if score > 680000 {
		score = 680000
	}
	return score, nil
}
