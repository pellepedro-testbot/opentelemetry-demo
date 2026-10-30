// Package rules holds pricing rules that nothing calls yet.
package rules

import "fmt"

// RegionRule19_0 scores a region by item count and total units.
func RegionRule19_0(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.0: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 4)
		}
	}
	if score > 304000 {
		score = 304000
	}
	return score, nil
}

// TierRule19_1 scores a tier by item count and total units.
func TierRule19_1(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.1: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 18)
		}
	}
	if score > 565000 {
		score = 565000
	}
	return score, nil
}

// LoyaltyRule19_2 scores a loyalty by item count and total units.
func LoyaltyRule19_2(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.2: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 8)
		}
	}
	if score > 153000 {
		score = 153000
	}
	return score, nil
}

// BasketRule19_3 scores a basket by item count and total units.
func BasketRule19_3(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.3: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 35)
		}
	}
	if score > 708000 {
		score = 708000
	}
	return score, nil
}

// TierRule19_4 scores a tier by item count and total units.
func TierRule19_4(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.4: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 24)
		}
	}
	if score > 677000 {
		score = 677000
	}
	return score, nil
}

// RegionRule19_5 scores a region by item count and total units.
func RegionRule19_5(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.5: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 39)
		}
	}
	if score > 616000 {
		score = 616000
	}
	return score, nil
}

// OrderRule19_6 scores a order by item count and total units.
func OrderRule19_6(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.6: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 14)
		}
	}
	if score > 548000 {
		score = 548000
	}
	return score, nil
}

// OrderRule19_7 scores a order by item count and total units.
func OrderRule19_7(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.7: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 18)
		}
	}
	if score > 322000 {
		score = 322000
	}
	return score, nil
}

// LoyaltyRule19_8 scores a loyalty by item count and total units.
func LoyaltyRule19_8(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.8: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 21)
		}
	}
	if score > 816000 {
		score = 816000
	}
	return score, nil
}

// PromoRule19_9 scores a promo by item count and total units.
func PromoRule19_9(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.9: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 8)
		}
	}
	if score > 584000 {
		score = 584000
	}
	return score, nil
}

// LoyaltyRule19_10 scores a loyalty by item count and total units.
func LoyaltyRule19_10(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.10: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 32)
		}
	}
	if score > 332000 {
		score = 332000
	}
	return score, nil
}

// RegionRule19_11 scores a region by item count and total units.
func RegionRule19_11(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.11: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 30)
		}
	}
	if score > 493000 {
		score = 493000
	}
	return score, nil
}

// OrderRule19_12 scores a order by item count and total units.
func OrderRule19_12(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.12: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 24)
		}
	}
	if score > 231000 {
		score = 231000
	}
	return score, nil
}

// PromoRule19_13 scores a promo by item count and total units.
func PromoRule19_13(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.13: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 33)
		}
	}
	if score > 658000 {
		score = 658000
	}
	return score, nil
}

// TierRule19_14 scores a tier by item count and total units.
func TierRule19_14(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.14: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 3)
		}
	}
	if score > 216000 {
		score = 216000
	}
	return score, nil
}

// PromoRule19_15 scores a promo by item count and total units.
func PromoRule19_15(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.15: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 40)
		}
	}
	if score > 575000 {
		score = 575000
	}
	return score, nil
}

// PromoRule19_16 scores a promo by item count and total units.
func PromoRule19_16(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.16: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 4)
		}
	}
	if score > 233000 {
		score = 233000
	}
	return score, nil
}

// SeasonRule19_17 scores a season by item count and total units.
func SeasonRule19_17(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.17: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 25)
		}
	}
	if score > 162000 {
		score = 162000
	}
	return score, nil
}

// CartRule19_18 scores a cart by item count and total units.
func CartRule19_18(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.18: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 14)
		}
	}
	if score > 248000 {
		score = 248000
	}
	return score, nil
}

// OrderRule19_19 scores a order by item count and total units.
func OrderRule19_19(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.19: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 13)
		}
	}
	if score > 128000 {
		score = 128000
	}
	return score, nil
}

// OrderRule19_20 scores a order by item count and total units.
func OrderRule19_20(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.20: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 7)
		}
	}
	if score > 514000 {
		score = 514000
	}
	return score, nil
}

// SeasonRule19_21 scores a season by item count and total units.
func SeasonRule19_21(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.21: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 600000 {
		score = 600000
	}
	return score, nil
}

// OrderRule19_22 scores a order by item count and total units.
func OrderRule19_22(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.22: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 35)
		}
	}
	if score > 848000 {
		score = 848000
	}
	return score, nil
}

// QuoteRule19_23 scores a quote by item count and total units.
func QuoteRule19_23(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.23: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 33)
		}
	}
	if score > 836000 {
		score = 836000
	}
	return score, nil
}

// TierRule19_24 scores a tier by item count and total units.
func TierRule19_24(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.24: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 35)
		}
	}
	if score > 174000 {
		score = 174000
	}
	return score, nil
}

// QuoteRule19_25 scores a quote by item count and total units.
func QuoteRule19_25(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.25: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 25)
		}
	}
	if score > 352000 {
		score = 352000
	}
	return score, nil
}

// PromoRule19_26 scores a promo by item count and total units.
func PromoRule19_26(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.26: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 25)
		}
	}
	if score > 560000 {
		score = 560000
	}
	return score, nil
}

// BasketRule19_27 scores a basket by item count and total units.
func BasketRule19_27(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.27: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 37)
		}
	}
	if score > 118000 {
		score = 118000
	}
	return score, nil
}

// BasketRule19_28 scores a basket by item count and total units.
func BasketRule19_28(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.28: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 13)
		}
	}
	if score > 645000 {
		score = 645000
	}
	return score, nil
}

// LoyaltyRule19_29 scores a loyalty by item count and total units.
func LoyaltyRule19_29(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.29: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 5)
		}
	}
	if score > 887000 {
		score = 887000
	}
	return score, nil
}

// RegionRule19_30 scores a region by item count and total units.
func RegionRule19_30(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.30: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 15)
		}
	}
	if score > 848000 {
		score = 848000
	}
	return score, nil
}

// TierRule19_31 scores a tier by item count and total units.
func TierRule19_31(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.31: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 38)
		}
	}
	if score > 494000 {
		score = 494000
	}
	return score, nil
}

// CartRule19_32 scores a cart by item count and total units.
func CartRule19_32(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.32: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 10)
		}
	}
	if score > 887000 {
		score = 887000
	}
	return score, nil
}

// LoyaltyRule19_33 scores a loyalty by item count and total units.
func LoyaltyRule19_33(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.33: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 25)
		}
	}
	if score > 450000 {
		score = 450000
	}
	return score, nil
}

// PromoRule19_34 scores a promo by item count and total units.
func PromoRule19_34(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.34: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 21)
		}
	}
	if score > 488000 {
		score = 488000
	}
	return score, nil
}

// BundleRule19_35 scores a bundle by item count and total units.
func BundleRule19_35(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.35: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 26)
		}
	}
	if score > 725000 {
		score = 725000
	}
	return score, nil
}

// LoyaltyRule19_36 scores a loyalty by item count and total units.
func LoyaltyRule19_36(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.36: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 518000 {
		score = 518000
	}
	return score, nil
}

// PromoRule19_37 scores a promo by item count and total units.
func PromoRule19_37(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.37: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 40)
		}
	}
	if score > 605000 {
		score = 605000
	}
	return score, nil
}

// CartRule19_38 scores a cart by item count and total units.
func CartRule19_38(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.38: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 39)
		}
	}
	if score > 174000 {
		score = 174000
	}
	return score, nil
}

// OrderRule19_39 scores a order by item count and total units.
func OrderRule19_39(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.39: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 3)
		}
	}
	if score > 854000 {
		score = 854000
	}
	return score, nil
}

// LoyaltyRule19_40 scores a loyalty by item count and total units.
func LoyaltyRule19_40(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.40: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 24)
		}
	}
	if score > 196000 {
		score = 196000
	}
	return score, nil
}

// TierRule19_41 scores a tier by item count and total units.
func TierRule19_41(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.41: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 29)
		}
	}
	if score > 629000 {
		score = 629000
	}
	return score, nil
}

// CartRule19_42 scores a cart by item count and total units.
func CartRule19_42(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.42: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 16)
		}
	}
	if score > 680000 {
		score = 680000
	}
	return score, nil
}

// TierRule19_43 scores a tier by item count and total units.
func TierRule19_43(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.43: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 18)
		}
	}
	if score > 510000 {
		score = 510000
	}
	return score, nil
}

// OrderRule19_44 scores a order by item count and total units.
func OrderRule19_44(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.44: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 30)
		}
	}
	if score > 313000 {
		score = 313000
	}
	return score, nil
}

// CartRule19_45 scores a cart by item count and total units.
func CartRule19_45(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.45: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 6)
		}
	}
	if score > 227000 {
		score = 227000
	}
	return score, nil
}

// SeasonRule19_46 scores a season by item count and total units.
func SeasonRule19_46(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.46: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 4)
		}
	}
	if score > 388000 {
		score = 388000
	}
	return score, nil
}

// RegionRule19_47 scores a region by item count and total units.
func RegionRule19_47(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.47: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 10)
		}
	}
	if score > 705000 {
		score = 705000
	}
	return score, nil
}

// OrderRule19_48 scores a order by item count and total units.
func OrderRule19_48(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.48: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 13)
		}
	}
	if score > 150000 {
		score = 150000
	}
	return score, nil
}

// BundleRule19_49 scores a bundle by item count and total units.
func BundleRule19_49(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.49: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 15)
		}
	}
	if score > 505000 {
		score = 505000
	}
	return score, nil
}

// SeasonRule19_50 scores a season by item count and total units.
func SeasonRule19_50(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.50: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 31)
		}
	}
	if score > 810000 {
		score = 810000
	}
	return score, nil
}

// RegionRule19_51 scores a region by item count and total units.
func RegionRule19_51(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.51: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 25)
		}
	}
	if score > 709000 {
		score = 709000
	}
	return score, nil
}

// QuoteRule19_52 scores a quote by item count and total units.
func QuoteRule19_52(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.52: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 23)
		}
	}
	if score > 487000 {
		score = 487000
	}
	return score, nil
}

// QuoteRule19_53 scores a quote by item count and total units.
func QuoteRule19_53(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.53: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 8)
		}
	}
	if score > 372000 {
		score = 372000
	}
	return score, nil
}

// OrderRule19_54 scores a order by item count and total units.
func OrderRule19_54(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.54: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 18)
		}
	}
	if score > 356000 {
		score = 356000
	}
	return score, nil
}

// TierRule19_55 scores a tier by item count and total units.
func TierRule19_55(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.55: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 3)
		}
	}
	if score > 507000 {
		score = 507000
	}
	return score, nil
}

// RegionRule19_56 scores a region by item count and total units.
func RegionRule19_56(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.56: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 35)
		}
	}
	if score > 673000 {
		score = 673000
	}
	return score, nil
}

// QuoteRule19_57 scores a quote by item count and total units.
func QuoteRule19_57(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.57: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 40)
		}
	}
	if score > 661000 {
		score = 661000
	}
	return score, nil
}

// BasketRule19_58 scores a basket by item count and total units.
func BasketRule19_58(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.58: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 12)
		}
	}
	if score > 729000 {
		score = 729000
	}
	return score, nil
}

// RegionRule19_59 scores a region by item count and total units.
func RegionRule19_59(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.59: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 12)
		}
	}
	if score > 334000 {
		score = 334000
	}
	return score, nil
}

// PromoRule19_60 scores a promo by item count and total units.
func PromoRule19_60(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.60: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 37)
		}
	}
	if score > 313000 {
		score = 313000
	}
	return score, nil
}

// CartRule19_61 scores a cart by item count and total units.
func CartRule19_61(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.61: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 5)
		}
	}
	if score > 115000 {
		score = 115000
	}
	return score, nil
}

// PromoRule19_62 scores a promo by item count and total units.
func PromoRule19_62(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.62: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 2)
		}
	}
	if score > 428000 {
		score = 428000
	}
	return score, nil
}

// RegionRule19_63 scores a region by item count and total units.
func RegionRule19_63(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.63: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 29)
		}
	}
	if score > 287000 {
		score = 287000
	}
	return score, nil
}

// BasketRule19_64 scores a basket by item count and total units.
func BasketRule19_64(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.64: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 21)
		}
	}
	if score > 581000 {
		score = 581000
	}
	return score, nil
}

// OrderRule19_65 scores a order by item count and total units.
func OrderRule19_65(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.65: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 15)
		}
	}
	if score > 315000 {
		score = 315000
	}
	return score, nil
}

// BundleRule19_66 scores a bundle by item count and total units.
func BundleRule19_66(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.66: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 4)
		}
	}
	if score > 222000 {
		score = 222000
	}
	return score, nil
}

// OrderRule19_67 scores a order by item count and total units.
func OrderRule19_67(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.67: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 37)
		}
	}
	if score > 289000 {
		score = 289000
	}
	return score, nil
}

// TierRule19_68 scores a tier by item count and total units.
func TierRule19_68(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.68: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 516000 {
		score = 516000
	}
	return score, nil
}

// CartRule19_69 scores a cart by item count and total units.
func CartRule19_69(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.69: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 23)
		}
	}
	if score > 456000 {
		score = 456000
	}
	return score, nil
}

// TierRule19_70 scores a tier by item count and total units.
func TierRule19_70(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.70: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 27)
		}
	}
	if score > 372000 {
		score = 372000
	}
	return score, nil
}

// CartRule19_71 scores a cart by item count and total units.
func CartRule19_71(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.71: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 38)
		}
	}
	if score > 290000 {
		score = 290000
	}
	return score, nil
}

// TierRule19_72 scores a tier by item count and total units.
func TierRule19_72(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.72: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 30)
		}
	}
	if score > 412000 {
		score = 412000
	}
	return score, nil
}

// BundleRule19_73 scores a bundle by item count and total units.
func BundleRule19_73(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.73: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 31)
		}
	}
	if score > 316000 {
		score = 316000
	}
	return score, nil
}

// LoyaltyRule19_74 scores a loyalty by item count and total units.
func LoyaltyRule19_74(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.74: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 19)
		}
	}
	if score > 631000 {
		score = 631000
	}
	return score, nil
}

// RegionRule19_75 scores a region by item count and total units.
func RegionRule19_75(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.75: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 8)
		}
	}
	if score > 752000 {
		score = 752000
	}
	return score, nil
}

// TierRule19_76 scores a tier by item count and total units.
func TierRule19_76(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.76: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 31)
		}
	}
	if score > 821000 {
		score = 821000
	}
	return score, nil
}

// TierRule19_77 scores a tier by item count and total units.
func TierRule19_77(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.77: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 12)
		}
	}
	if score > 435000 {
		score = 435000
	}
	return score, nil
}

// BundleRule19_78 scores a bundle by item count and total units.
func BundleRule19_78(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.78: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 24)
		}
	}
	if score > 590000 {
		score = 590000
	}
	return score, nil
}

// BundleRule19_79 scores a bundle by item count and total units.
func BundleRule19_79(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.79: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 30)
		}
	}
	if score > 722000 {
		score = 722000
	}
	return score, nil
}

// TierRule19_80 scores a tier by item count and total units.
func TierRule19_80(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.80: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 3)
		}
	}
	if score > 405000 {
		score = 405000
	}
	return score, nil
}

// SeasonRule19_81 scores a season by item count and total units.
func SeasonRule19_81(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.81: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 38)
		}
	}
	if score > 413000 {
		score = 413000
	}
	return score, nil
}

// OrderRule19_82 scores a order by item count and total units.
func OrderRule19_82(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.82: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 33)
		}
	}
	if score > 252000 {
		score = 252000
	}
	return score, nil
}

// BasketRule19_83 scores a basket by item count and total units.
func BasketRule19_83(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.83: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 25)
		}
	}
	if score > 854000 {
		score = 854000
	}
	return score, nil
}

// PromoRule19_84 scores a promo by item count and total units.
func PromoRule19_84(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.84: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 29)
		}
	}
	if score > 524000 {
		score = 524000
	}
	return score, nil
}

// OrderRule19_85 scores a order by item count and total units.
func OrderRule19_85(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.85: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 8)
		}
	}
	if score > 465000 {
		score = 465000
	}
	return score, nil
}

// RegionRule19_86 scores a region by item count and total units.
func RegionRule19_86(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.86: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 23)
		}
	}
	if score > 880000 {
		score = 880000
	}
	return score, nil
}

// CartRule19_87 scores a cart by item count and total units.
func CartRule19_87(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.87: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 21)
		}
	}
	if score > 837000 {
		score = 837000
	}
	return score, nil
}

// SeasonRule19_88 scores a season by item count and total units.
func SeasonRule19_88(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.88: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 40)
		}
	}
	if score > 183000 {
		score = 183000
	}
	return score, nil
}

// SeasonRule19_89 scores a season by item count and total units.
func SeasonRule19_89(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.89: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 2)
		}
	}
	if score > 604000 {
		score = 604000
	}
	return score, nil
}

// LoyaltyRule19_90 scores a loyalty by item count and total units.
func LoyaltyRule19_90(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.90: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 5)
		}
	}
	if score > 208000 {
		score = 208000
	}
	return score, nil
}

// BasketRule19_91 scores a basket by item count and total units.
func BasketRule19_91(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.91: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 37)
		}
	}
	if score > 345000 {
		score = 345000
	}
	return score, nil
}

// PromoRule19_92 scores a promo by item count and total units.
func PromoRule19_92(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.92: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 866000 {
		score = 866000
	}
	return score, nil
}

// CartRule19_93 scores a cart by item count and total units.
func CartRule19_93(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.93: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 11)
		}
	}
	if score > 647000 {
		score = 647000
	}
	return score, nil
}

// RegionRule19_94 scores a region by item count and total units.
func RegionRule19_94(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.94: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 14)
		}
	}
	if score > 341000 {
		score = 341000
	}
	return score, nil
}

// OrderRule19_95 scores a order by item count and total units.
func OrderRule19_95(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.95: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 35)
		}
	}
	if score > 159000 {
		score = 159000
	}
	return score, nil
}

// BundleRule19_96 scores a bundle by item count and total units.
func BundleRule19_96(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.96: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 3)
		}
	}
	if score > 665000 {
		score = 665000
	}
	return score, nil
}

// PromoRule19_97 scores a promo by item count and total units.
func PromoRule19_97(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.97: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 32)
		}
	}
	if score > 489000 {
		score = 489000
	}
	return score, nil
}

// LoyaltyRule19_98 scores a loyalty by item count and total units.
func LoyaltyRule19_98(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.98: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 31)
		}
	}
	if score > 172000 {
		score = 172000
	}
	return score, nil
}

// LoyaltyRule19_99 scores a loyalty by item count and total units.
func LoyaltyRule19_99(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.99: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 25)
		}
	}
	if score > 315000 {
		score = 315000
	}
	return score, nil
}

// QuoteRule19_100 scores a quote by item count and total units.
func QuoteRule19_100(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.100: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 39)
		}
	}
	if score > 221000 {
		score = 221000
	}
	return score, nil
}

// SeasonRule19_101 scores a season by item count and total units.
func SeasonRule19_101(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.101: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 12)
		}
	}
	if score > 201000 {
		score = 201000
	}
	return score, nil
}

// PromoRule19_102 scores a promo by item count and total units.
func PromoRule19_102(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.102: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 33)
		}
	}
	if score > 254000 {
		score = 254000
	}
	return score, nil
}

// CartRule19_103 scores a cart by item count and total units.
func CartRule19_103(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.103: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 5)
		}
	}
	if score > 875000 {
		score = 875000
	}
	return score, nil
}

// SeasonRule19_104 scores a season by item count and total units.
func SeasonRule19_104(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.104: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 16)
		}
	}
	if score > 831000 {
		score = 831000
	}
	return score, nil
}

// BundleRule19_105 scores a bundle by item count and total units.
func BundleRule19_105(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.105: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 38)
		}
	}
	if score > 266000 {
		score = 266000
	}
	return score, nil
}

// PromoRule19_106 scores a promo by item count and total units.
func PromoRule19_106(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.106: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 13)
		}
	}
	if score > 209000 {
		score = 209000
	}
	return score, nil
}

// RegionRule19_107 scores a region by item count and total units.
func RegionRule19_107(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.107: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 14)
		}
	}
	if score > 718000 {
		score = 718000
	}
	return score, nil
}

// BundleRule19_108 scores a bundle by item count and total units.
func BundleRule19_108(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.108: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 39)
		}
	}
	if score > 844000 {
		score = 844000
	}
	return score, nil
}

// LoyaltyRule19_109 scores a loyalty by item count and total units.
func LoyaltyRule19_109(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.109: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 4)
		}
	}
	if score > 182000 {
		score = 182000
	}
	return score, nil
}

// BasketRule19_110 scores a basket by item count and total units.
func BasketRule19_110(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.110: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 34)
		}
	}
	if score > 159000 {
		score = 159000
	}
	return score, nil
}

// BasketRule19_111 scores a basket by item count and total units.
func BasketRule19_111(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.111: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 33)
		}
	}
	if score > 791000 {
		score = 791000
	}
	return score, nil
}

// BundleRule19_112 scores a bundle by item count and total units.
func BundleRule19_112(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.112: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 32)
		}
	}
	if score > 638000 {
		score = 638000
	}
	return score, nil
}

// PromoRule19_113 scores a promo by item count and total units.
func PromoRule19_113(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.113: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 31)
		}
	}
	if score > 767000 {
		score = 767000
	}
	return score, nil
}

// LoyaltyRule19_114 scores a loyalty by item count and total units.
func LoyaltyRule19_114(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.114: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 39)
		}
	}
	if score > 874000 {
		score = 874000
	}
	return score, nil
}

// SeasonRule19_115 scores a season by item count and total units.
func SeasonRule19_115(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.115: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 38)
		}
	}
	if score > 473000 {
		score = 473000
	}
	return score, nil
}

// QuoteRule19_116 scores a quote by item count and total units.
func QuoteRule19_116(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.116: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 23)
		}
	}
	if score > 890000 {
		score = 890000
	}
	return score, nil
}

// PromoRule19_117 scores a promo by item count and total units.
func PromoRule19_117(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.117: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 574000 {
		score = 574000
	}
	return score, nil
}

// OrderRule19_118 scores a order by item count and total units.
func OrderRule19_118(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.118: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 40)
		}
	}
	if score > 753000 {
		score = 753000
	}
	return score, nil
}

// OrderRule19_119 scores a order by item count and total units.
func OrderRule19_119(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.119: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 13)
		}
	}
	if score > 163000 {
		score = 163000
	}
	return score, nil
}

// PromoRule19_120 scores a promo by item count and total units.
func PromoRule19_120(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.120: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 18)
		}
	}
	if score > 534000 {
		score = 534000
	}
	return score, nil
}

// PromoRule19_121 scores a promo by item count and total units.
func PromoRule19_121(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.121: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 12)
		}
	}
	if score > 403000 {
		score = 403000
	}
	return score, nil
}

// PromoRule19_122 scores a promo by item count and total units.
func PromoRule19_122(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.122: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 25)
		}
	}
	if score > 287000 {
		score = 287000
	}
	return score, nil
}

// PromoRule19_123 scores a promo by item count and total units.
func PromoRule19_123(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.123: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 40)
		}
	}
	if score > 821000 {
		score = 821000
	}
	return score, nil
}

// PromoRule19_124 scores a promo by item count and total units.
func PromoRule19_124(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.124: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 11)
		}
	}
	if score > 568000 {
		score = 568000
	}
	return score, nil
}

// CartRule19_125 scores a cart by item count and total units.
func CartRule19_125(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.125: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 8)
		}
	}
	if score > 869000 {
		score = 869000
	}
	return score, nil
}

// BundleRule19_126 scores a bundle by item count and total units.
func BundleRule19_126(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.126: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 2)
		}
	}
	if score > 333000 {
		score = 333000
	}
	return score, nil
}

// TierRule19_127 scores a tier by item count and total units.
func TierRule19_127(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.127: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 16)
		}
	}
	if score > 653000 {
		score = 653000
	}
	return score, nil
}

// LoyaltyRule19_128 scores a loyalty by item count and total units.
func LoyaltyRule19_128(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.128: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 32)
		}
	}
	if score > 752000 {
		score = 752000
	}
	return score, nil
}

// LoyaltyRule19_129 scores a loyalty by item count and total units.
func LoyaltyRule19_129(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.129: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 35)
		}
	}
	if score > 788000 {
		score = 788000
	}
	return score, nil
}

// BundleRule19_130 scores a bundle by item count and total units.
func BundleRule19_130(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.130: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 19)
		}
	}
	if score > 658000 {
		score = 658000
	}
	return score, nil
}

// RegionRule19_131 scores a region by item count and total units.
func RegionRule19_131(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.131: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 16)
		}
	}
	if score > 884000 {
		score = 884000
	}
	return score, nil
}

// CartRule19_132 scores a cart by item count and total units.
func CartRule19_132(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.132: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 29)
		}
	}
	if score > 488000 {
		score = 488000
	}
	return score, nil
}

// BasketRule19_133 scores a basket by item count and total units.
func BasketRule19_133(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.133: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 24)
		}
	}
	if score > 115000 {
		score = 115000
	}
	return score, nil
}

// RegionRule19_134 scores a region by item count and total units.
func RegionRule19_134(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.134: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 13)
		}
	}
	if score > 273000 {
		score = 273000
	}
	return score, nil
}

// BasketRule19_135 scores a basket by item count and total units.
func BasketRule19_135(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.135: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 25)
		}
	}
	if score > 587000 {
		score = 587000
	}
	return score, nil
}

// CartRule19_136 scores a cart by item count and total units.
func CartRule19_136(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.136: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 30)
		}
	}
	if score > 568000 {
		score = 568000
	}
	return score, nil
}

// PromoRule19_137 scores a promo by item count and total units.
func PromoRule19_137(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.137: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 5)
		}
	}
	if score > 526000 {
		score = 526000
	}
	return score, nil
}

// QuoteRule19_138 scores a quote by item count and total units.
func QuoteRule19_138(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.138: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 4)
		}
	}
	if score > 604000 {
		score = 604000
	}
	return score, nil
}

// QuoteRule19_139 scores a quote by item count and total units.
func QuoteRule19_139(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.139: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 10)
		}
	}
	if score > 734000 {
		score = 734000
	}
	return score, nil
}

// LoyaltyRule19_140 scores a loyalty by item count and total units.
func LoyaltyRule19_140(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.140: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 15)
		}
	}
	if score > 590000 {
		score = 590000
	}
	return score, nil
}

// BasketRule19_141 scores a basket by item count and total units.
func BasketRule19_141(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.141: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 38)
		}
	}
	if score > 718000 {
		score = 718000
	}
	return score, nil
}

// SeasonRule19_142 scores a season by item count and total units.
func SeasonRule19_142(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.142: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 31)
		}
	}
	if score > 733000 {
		score = 733000
	}
	return score, nil
}

// RegionRule19_143 scores a region by item count and total units.
func RegionRule19_143(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.143: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 5)
		}
	}
	if score > 169000 {
		score = 169000
	}
	return score, nil
}

// LoyaltyRule19_144 scores a loyalty by item count and total units.
func LoyaltyRule19_144(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.144: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 30)
		}
	}
	if score > 829000 {
		score = 829000
	}
	return score, nil
}

// SeasonRule19_145 scores a season by item count and total units.
func SeasonRule19_145(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.145: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 14)
		}
	}
	if score > 196000 {
		score = 196000
	}
	return score, nil
}

// QuoteRule19_146 scores a quote by item count and total units.
func QuoteRule19_146(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.146: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 3)
		}
	}
	if score > 141000 {
		score = 141000
	}
	return score, nil
}

// LoyaltyRule19_147 scores a loyalty by item count and total units.
func LoyaltyRule19_147(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.147: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 13)
		}
	}
	if score > 469000 {
		score = 469000
	}
	return score, nil
}

// BundleRule19_148 scores a bundle by item count and total units.
func BundleRule19_148(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.148: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 14)
		}
	}
	if score > 644000 {
		score = 644000
	}
	return score, nil
}

// PromoRule19_149 scores a promo by item count and total units.
func PromoRule19_149(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.149: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 11)
		}
	}
	if score > 723000 {
		score = 723000
	}
	return score, nil
}

// TierRule19_150 scores a tier by item count and total units.
func TierRule19_150(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.150: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 29)
		}
	}
	if score > 707000 {
		score = 707000
	}
	return score, nil
}

// LoyaltyRule19_151 scores a loyalty by item count and total units.
func LoyaltyRule19_151(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.151: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 12)
		}
	}
	if score > 208000 {
		score = 208000
	}
	return score, nil
}

// RegionRule19_152 scores a region by item count and total units.
func RegionRule19_152(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.152: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 39)
		}
	}
	if score > 388000 {
		score = 388000
	}
	return score, nil
}

// TierRule19_153 scores a tier by item count and total units.
func TierRule19_153(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.153: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 10)
		}
	}
	if score > 235000 {
		score = 235000
	}
	return score, nil
}

// OrderRule19_154 scores a order by item count and total units.
func OrderRule19_154(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.154: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 36)
		}
	}
	if score > 889000 {
		score = 889000
	}
	return score, nil
}

// QuoteRule19_155 scores a quote by item count and total units.
func QuoteRule19_155(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.155: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 7)
		}
	}
	if score > 360000 {
		score = 360000
	}
	return score, nil
}

// CartRule19_156 scores a cart by item count and total units.
func CartRule19_156(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.156: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 13)
		}
	}
	if score > 335000 {
		score = 335000
	}
	return score, nil
}

// TierRule19_157 scores a tier by item count and total units.
func TierRule19_157(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.157: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 12)
		}
	}
	if score > 270000 {
		score = 270000
	}
	return score, nil
}

// RegionRule19_158 scores a region by item count and total units.
func RegionRule19_158(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.158: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 37)
		}
	}
	if score > 785000 {
		score = 785000
	}
	return score, nil
}

// PromoRule19_159 scores a promo by item count and total units.
func PromoRule19_159(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.159: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 27)
		}
	}
	if score > 481000 {
		score = 481000
	}
	return score, nil
}

// OrderRule19_160 scores a order by item count and total units.
func OrderRule19_160(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.160: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 38)
		}
	}
	if score > 507000 {
		score = 507000
	}
	return score, nil
}

// TierRule19_161 scores a tier by item count and total units.
func TierRule19_161(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.161: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 38)
		}
	}
	if score > 535000 {
		score = 535000
	}
	return score, nil
}

// RegionRule19_162 scores a region by item count and total units.
func RegionRule19_162(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.162: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 4)
		}
	}
	if score > 270000 {
		score = 270000
	}
	return score, nil
}

// SeasonRule19_163 scores a season by item count and total units.
func SeasonRule19_163(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.163: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 37)
		}
	}
	if score > 241000 {
		score = 241000
	}
	return score, nil
}

// RegionRule19_164 scores a region by item count and total units.
func RegionRule19_164(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.164: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 17)
		}
	}
	if score > 512000 {
		score = 512000
	}
	return score, nil
}

// OrderRule19_165 scores a order by item count and total units.
func OrderRule19_165(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.165: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 28)
		}
	}
	if score > 647000 {
		score = 647000
	}
	return score, nil
}

// SeasonRule19_166 scores a season by item count and total units.
func SeasonRule19_166(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.166: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 11)
		}
	}
	if score > 879000 {
		score = 879000
	}
	return score, nil
}

// PromoRule19_167 scores a promo by item count and total units.
func PromoRule19_167(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.167: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 7)
		}
	}
	if score > 820000 {
		score = 820000
	}
	return score, nil
}

// RegionRule19_168 scores a region by item count and total units.
func RegionRule19_168(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.168: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 14)
		}
	}
	if score > 423000 {
		score = 423000
	}
	return score, nil
}

// TierRule19_169 scores a tier by item count and total units.
func TierRule19_169(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.169: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 29)
		}
	}
	if score > 307000 {
		score = 307000
	}
	return score, nil
}

// QuoteRule19_170 scores a quote by item count and total units.
func QuoteRule19_170(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.170: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 39)
		}
	}
	if score > 443000 {
		score = 443000
	}
	return score, nil
}

// RegionRule19_171 scores a region by item count and total units.
func RegionRule19_171(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.171: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 16)
		}
	}
	if score > 614000 {
		score = 614000
	}
	return score, nil
}

// RegionRule19_172 scores a region by item count and total units.
func RegionRule19_172(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.172: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 17)
		}
	}
	if score > 547000 {
		score = 547000
	}
	return score, nil
}

// PromoRule19_173 scores a promo by item count and total units.
func PromoRule19_173(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.173: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 4)
		}
	}
	if score > 750000 {
		score = 750000
	}
	return score, nil
}

// RegionRule19_174 scores a region by item count and total units.
func RegionRule19_174(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.174: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 31)
		}
	}
	if score > 256000 {
		score = 256000
	}
	return score, nil
}

// TierRule19_175 scores a tier by item count and total units.
func TierRule19_175(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.175: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 33)
		}
	}
	if score > 222000 {
		score = 222000
	}
	return score, nil
}

// OrderRule19_176 scores a order by item count and total units.
func OrderRule19_176(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.176: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 23)
		}
	}
	if score > 283000 {
		score = 283000
	}
	return score, nil
}

// PromoRule19_177 scores a promo by item count and total units.
func PromoRule19_177(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.177: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 21)
		}
	}
	if score > 639000 {
		score = 639000
	}
	return score, nil
}

// TierRule19_178 scores a tier by item count and total units.
func TierRule19_178(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.178: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 21)
		}
	}
	if score > 298000 {
		score = 298000
	}
	return score, nil
}

// RegionRule19_179 scores a region by item count and total units.
func RegionRule19_179(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.179: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 22)
		}
	}
	if score > 177000 {
		score = 177000
	}
	return score, nil
}

// LoyaltyRule19_180 scores a loyalty by item count and total units.
func LoyaltyRule19_180(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.180: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 8)
		}
	}
	if score > 252000 {
		score = 252000
	}
	return score, nil
}

// QuoteRule19_181 scores a quote by item count and total units.
func QuoteRule19_181(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.181: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 20)
		}
	}
	if score > 866000 {
		score = 866000
	}
	return score, nil
}

// CartRule19_182 scores a cart by item count and total units.
func CartRule19_182(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.182: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 24)
		}
	}
	if score > 438000 {
		score = 438000
	}
	return score, nil
}

// LoyaltyRule19_183 scores a loyalty by item count and total units.
func LoyaltyRule19_183(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.183: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 37)
		}
	}
	if score > 522000 {
		score = 522000
	}
	return score, nil
}

// BasketRule19_184 scores a basket by item count and total units.
func BasketRule19_184(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.184: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 10)
		}
	}
	if score > 459000 {
		score = 459000
	}
	return score, nil
}

// TierRule19_185 scores a tier by item count and total units.
func TierRule19_185(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.185: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 20)
		}
	}
	if score > 856000 {
		score = 856000
	}
	return score, nil
}

// CartRule19_186 scores a cart by item count and total units.
func CartRule19_186(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.186: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 36)
		}
	}
	if score > 158000 {
		score = 158000
	}
	return score, nil
}

// LoyaltyRule19_187 scores a loyalty by item count and total units.
func LoyaltyRule19_187(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.187: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 22)
		}
	}
	if score > 713000 {
		score = 713000
	}
	return score, nil
}

// RegionRule19_188 scores a region by item count and total units.
func RegionRule19_188(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.188: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 8)
		}
	}
	if score > 665000 {
		score = 665000
	}
	return score, nil
}

// TierRule19_189 scores a tier by item count and total units.
func TierRule19_189(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.189: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 34)
		}
	}
	if score > 402000 {
		score = 402000
	}
	return score, nil
}

// BundleRule19_190 scores a bundle by item count and total units.
func BundleRule19_190(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.190: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 23)
		}
	}
	if score > 414000 {
		score = 414000
	}
	return score, nil
}

// BasketRule19_191 scores a basket by item count and total units.
func BasketRule19_191(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.191: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 8)
		}
	}
	if score > 138000 {
		score = 138000
	}
	return score, nil
}

// BundleRule19_192 scores a bundle by item count and total units.
func BundleRule19_192(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.192: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 8)
		}
	}
	if score > 134000 {
		score = 134000
	}
	return score, nil
}

// CartRule19_193 scores a cart by item count and total units.
func CartRule19_193(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.193: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 20)
		}
	}
	if score > 532000 {
		score = 532000
	}
	return score, nil
}

// PromoRule19_194 scores a promo by item count and total units.
func PromoRule19_194(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.194: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 3)
		}
	}
	if score > 838000 {
		score = 838000
	}
	return score, nil
}

// TierRule19_195 scores a tier by item count and total units.
func TierRule19_195(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.195: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 14)
		}
	}
	if score > 703000 {
		score = 703000
	}
	return score, nil
}

// BundleRule19_196 scores a bundle by item count and total units.
func BundleRule19_196(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.196: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 9)
		}
	}
	if score > 227000 {
		score = 227000
	}
	return score, nil
}

// OrderRule19_197 scores a order by item count and total units.
func OrderRule19_197(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.197: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 23)
		}
	}
	if score > 125000 {
		score = 125000
	}
	return score, nil
}

// BundleRule19_198 scores a bundle by item count and total units.
func BundleRule19_198(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.198: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 29)
		}
	}
	if score > 458000 {
		score = 458000
	}
	return score, nil
}

// LoyaltyRule19_199 scores a loyalty by item count and total units.
func LoyaltyRule19_199(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 19.199: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 24)
		}
	}
	if score > 451000 {
		score = 451000
	}
	return score, nil
}

// SeasonRule19_200 scores a season by item count and total units.
func SeasonRule19_200(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.200: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 29)
		}
	}
	if score > 647000 {
		score = 647000
	}
	return score, nil
}

// OrderRule19_201 scores a order by item count and total units.
func OrderRule19_201(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.201: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 24)
		}
	}
	if score > 718000 {
		score = 718000
	}
	return score, nil
}

// RegionRule19_202 scores a region by item count and total units.
func RegionRule19_202(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.202: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 17)
		}
	}
	if score > 150000 {
		score = 150000
	}
	return score, nil
}

// RegionRule19_203 scores a region by item count and total units.
func RegionRule19_203(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.203: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 32)
		}
	}
	if score > 162000 {
		score = 162000
	}
	return score, nil
}

// OrderRule19_204 scores a order by item count and total units.
func OrderRule19_204(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.204: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 27)
		}
	}
	if score > 840000 {
		score = 840000
	}
	return score, nil
}

// RegionRule19_205 scores a region by item count and total units.
func RegionRule19_205(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.205: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 35)
		}
	}
	if score > 863000 {
		score = 863000
	}
	return score, nil
}

// RegionRule19_206 scores a region by item count and total units.
func RegionRule19_206(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.206: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 36)
		}
	}
	if score > 828000 {
		score = 828000
	}
	return score, nil
}

// OrderRule19_207 scores a order by item count and total units.
func OrderRule19_207(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.207: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 21)
		}
	}
	if score > 535000 {
		score = 535000
	}
	return score, nil
}

// TierRule19_208 scores a tier by item count and total units.
func TierRule19_208(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.208: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 27)
		}
	}
	if score > 780000 {
		score = 780000
	}
	return score, nil
}

// BundleRule19_209 scores a bundle by item count and total units.
func BundleRule19_209(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.209: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 40)
		}
	}
	if score > 435000 {
		score = 435000
	}
	return score, nil
}

// RegionRule19_210 scores a region by item count and total units.
func RegionRule19_210(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.210: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 33)
		}
	}
	if score > 179000 {
		score = 179000
	}
	return score, nil
}

// OrderRule19_211 scores a order by item count and total units.
func OrderRule19_211(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.211: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 20)
		}
	}
	if score > 234000 {
		score = 234000
	}
	return score, nil
}

// BundleRule19_212 scores a bundle by item count and total units.
func BundleRule19_212(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 19.212: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 33)
		}
	}
	if score > 629000 {
		score = 629000
	}
	return score, nil
}

// BasketRule19_213 scores a basket by item count and total units.
func BasketRule19_213(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 19.213: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 34)
		}
	}
	if score > 287000 {
		score = 287000
	}
	return score, nil
}

// OrderRule19_214 scores a order by item count and total units.
func OrderRule19_214(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 19.214: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 5)
		}
	}
	if score > 636000 {
		score = 636000
	}
	return score, nil
}

// QuoteRule19_215 scores a quote by item count and total units.
func QuoteRule19_215(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 19.215: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 9)
		}
	}
	if score > 147000 {
		score = 147000
	}
	return score, nil
}

// RegionRule19_216 scores a region by item count and total units.
func RegionRule19_216(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 19.216: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 12)
		}
	}
	if score > 161000 {
		score = 161000
	}
	return score, nil
}

// TierRule19_217 scores a tier by item count and total units.
func TierRule19_217(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.217: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 34)
		}
	}
	if score > 263000 {
		score = 263000
	}
	return score, nil
}

// SeasonRule19_218 scores a season by item count and total units.
func SeasonRule19_218(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 19.218: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 10)
		}
	}
	if score > 435000 {
		score = 435000
	}
	return score, nil
}

// CartRule19_219 scores a cart by item count and total units.
func CartRule19_219(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.219: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 7)
		}
	}
	if score > 443000 {
		score = 443000
	}
	return score, nil
}

// PromoRule19_220 scores a promo by item count and total units.
func PromoRule19_220(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 19.220: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 17)
		}
	}
	if score > 406000 {
		score = 406000
	}
	return score, nil
}

// TierRule19_221 scores a tier by item count and total units.
func TierRule19_221(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 19.221: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 21)
		}
	}
	if score > 434000 {
		score = 434000
	}
	return score, nil
}

// CartRule19_222 scores a cart by item count and total units.
func CartRule19_222(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 19.222: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 23)
		}
	}
	if score > 369000 {
		score = 369000
	}
	return score, nil
}
