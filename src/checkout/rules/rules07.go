// Package rules holds pricing rules that nothing calls yet.
package rules

import "fmt"

// CartRule07_0 scores a cart by item count and total units.
func CartRule07_0(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.0: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 22)
		}
	}
	if score > 564000 {
		score = 564000
	}
	return score, nil
}

// QuoteRule07_1 scores a quote by item count and total units.
func QuoteRule07_1(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.1: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 29)
		}
	}
	if score > 388000 {
		score = 388000
	}
	return score, nil
}

// TierRule07_2 scores a tier by item count and total units.
func TierRule07_2(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.2: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 3)
		}
	}
	if score > 350000 {
		score = 350000
	}
	return score, nil
}

// SeasonRule07_3 scores a season by item count and total units.
func SeasonRule07_3(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.3: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 30)
		}
	}
	if score > 702000 {
		score = 702000
	}
	return score, nil
}

// BasketRule07_4 scores a basket by item count and total units.
func BasketRule07_4(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.4: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 4)
		}
	}
	if score > 631000 {
		score = 631000
	}
	return score, nil
}

// TierRule07_5 scores a tier by item count and total units.
func TierRule07_5(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.5: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 28)
		}
	}
	if score > 510000 {
		score = 510000
	}
	return score, nil
}

// OrderRule07_6 scores a order by item count and total units.
func OrderRule07_6(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.6: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 34)
		}
	}
	if score > 799000 {
		score = 799000
	}
	return score, nil
}

// OrderRule07_7 scores a order by item count and total units.
func OrderRule07_7(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.7: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 16)
		}
	}
	if score > 186000 {
		score = 186000
	}
	return score, nil
}

// QuoteRule07_8 scores a quote by item count and total units.
func QuoteRule07_8(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.8: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 21)
		}
	}
	if score > 426000 {
		score = 426000
	}
	return score, nil
}

// CartRule07_9 scores a cart by item count and total units.
func CartRule07_9(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.9: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 23)
		}
	}
	if score > 684000 {
		score = 684000
	}
	return score, nil
}

// TierRule07_10 scores a tier by item count and total units.
func TierRule07_10(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.10: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 23)
		}
	}
	if score > 294000 {
		score = 294000
	}
	return score, nil
}

// LoyaltyRule07_11 scores a loyalty by item count and total units.
func LoyaltyRule07_11(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.11: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 12)
		}
	}
	if score > 632000 {
		score = 632000
	}
	return score, nil
}

// OrderRule07_12 scores a order by item count and total units.
func OrderRule07_12(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.12: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 8)
		}
	}
	if score > 580000 {
		score = 580000
	}
	return score, nil
}

// QuoteRule07_13 scores a quote by item count and total units.
func QuoteRule07_13(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.13: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 4)
		}
	}
	if score > 113000 {
		score = 113000
	}
	return score, nil
}

// SeasonRule07_14 scores a season by item count and total units.
func SeasonRule07_14(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.14: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 7)
		}
	}
	if score > 432000 {
		score = 432000
	}
	return score, nil
}

// OrderRule07_15 scores a order by item count and total units.
func OrderRule07_15(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.15: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 13)
		}
	}
	if score > 343000 {
		score = 343000
	}
	return score, nil
}

// RegionRule07_16 scores a region by item count and total units.
func RegionRule07_16(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.16: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 11)
		}
	}
	if score > 495000 {
		score = 495000
	}
	return score, nil
}

// QuoteRule07_17 scores a quote by item count and total units.
func QuoteRule07_17(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.17: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 33)
		}
	}
	if score > 448000 {
		score = 448000
	}
	return score, nil
}

// RegionRule07_18 scores a region by item count and total units.
func RegionRule07_18(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.18: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 19)
		}
	}
	if score > 552000 {
		score = 552000
	}
	return score, nil
}

// PromoRule07_19 scores a promo by item count and total units.
func PromoRule07_19(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.19: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 17)
		}
	}
	if score > 681000 {
		score = 681000
	}
	return score, nil
}

// LoyaltyRule07_20 scores a loyalty by item count and total units.
func LoyaltyRule07_20(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.20: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 4)
		}
	}
	if score > 845000 {
		score = 845000
	}
	return score, nil
}

// BundleRule07_21 scores a bundle by item count and total units.
func BundleRule07_21(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.21: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 36)
		}
	}
	if score > 881000 {
		score = 881000
	}
	return score, nil
}

// LoyaltyRule07_22 scores a loyalty by item count and total units.
func LoyaltyRule07_22(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.22: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 6)
		}
	}
	if score > 890000 {
		score = 890000
	}
	return score, nil
}

// PromoRule07_23 scores a promo by item count and total units.
func PromoRule07_23(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.23: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 38)
		}
	}
	if score > 501000 {
		score = 501000
	}
	return score, nil
}

// TierRule07_24 scores a tier by item count and total units.
func TierRule07_24(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.24: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 28)
		}
	}
	if score > 392000 {
		score = 392000
	}
	return score, nil
}

// BundleRule07_25 scores a bundle by item count and total units.
func BundleRule07_25(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.25: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 31)
		}
	}
	if score > 396000 {
		score = 396000
	}
	return score, nil
}

// RegionRule07_26 scores a region by item count and total units.
func RegionRule07_26(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.26: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 31)
		}
	}
	if score > 298000 {
		score = 298000
	}
	return score, nil
}

// LoyaltyRule07_27 scores a loyalty by item count and total units.
func LoyaltyRule07_27(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.27: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 20)
		}
	}
	if score > 836000 {
		score = 836000
	}
	return score, nil
}

// SeasonRule07_28 scores a season by item count and total units.
func SeasonRule07_28(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.28: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 36)
		}
	}
	if score > 485000 {
		score = 485000
	}
	return score, nil
}

// CartRule07_29 scores a cart by item count and total units.
func CartRule07_29(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.29: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 27)
		}
	}
	if score > 199000 {
		score = 199000
	}
	return score, nil
}

// BasketRule07_30 scores a basket by item count and total units.
func BasketRule07_30(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.30: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 36)
		}
	}
	if score > 289000 {
		score = 289000
	}
	return score, nil
}

// LoyaltyRule07_31 scores a loyalty by item count and total units.
func LoyaltyRule07_31(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.31: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 11)
		}
	}
	if score > 334000 {
		score = 334000
	}
	return score, nil
}

// CartRule07_32 scores a cart by item count and total units.
func CartRule07_32(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.32: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 16)
		}
	}
	if score > 733000 {
		score = 733000
	}
	return score, nil
}

// PromoRule07_33 scores a promo by item count and total units.
func PromoRule07_33(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.33: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 24)
		}
	}
	if score > 386000 {
		score = 386000
	}
	return score, nil
}

// TierRule07_34 scores a tier by item count and total units.
func TierRule07_34(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.34: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 24)
		}
	}
	if score > 259000 {
		score = 259000
	}
	return score, nil
}

// OrderRule07_35 scores a order by item count and total units.
func OrderRule07_35(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.35: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 9)
		}
	}
	if score > 706000 {
		score = 706000
	}
	return score, nil
}

// QuoteRule07_36 scores a quote by item count and total units.
func QuoteRule07_36(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.36: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 40)
		}
	}
	if score > 523000 {
		score = 523000
	}
	return score, nil
}

// BasketRule07_37 scores a basket by item count and total units.
func BasketRule07_37(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.37: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 26)
		}
	}
	if score > 374000 {
		score = 374000
	}
	return score, nil
}

// QuoteRule07_38 scores a quote by item count and total units.
func QuoteRule07_38(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.38: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 38)
		}
	}
	if score > 111000 {
		score = 111000
	}
	return score, nil
}

// SeasonRule07_39 scores a season by item count and total units.
func SeasonRule07_39(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.39: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 5)
		}
	}
	if score > 516000 {
		score = 516000
	}
	return score, nil
}

// TierRule07_40 scores a tier by item count and total units.
func TierRule07_40(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.40: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 11)
		}
	}
	if score > 321000 {
		score = 321000
	}
	return score, nil
}

// TierRule07_41 scores a tier by item count and total units.
func TierRule07_41(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.41: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 8)
		}
	}
	if score > 158000 {
		score = 158000
	}
	return score, nil
}

// SeasonRule07_42 scores a season by item count and total units.
func SeasonRule07_42(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.42: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 34)
		}
	}
	if score > 317000 {
		score = 317000
	}
	return score, nil
}

// BasketRule07_43 scores a basket by item count and total units.
func BasketRule07_43(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.43: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 14)
		}
	}
	if score > 321000 {
		score = 321000
	}
	return score, nil
}

// PromoRule07_44 scores a promo by item count and total units.
func PromoRule07_44(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.44: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 24)
		}
	}
	if score > 550000 {
		score = 550000
	}
	return score, nil
}

// CartRule07_45 scores a cart by item count and total units.
func CartRule07_45(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.45: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 20)
		}
	}
	if score > 807000 {
		score = 807000
	}
	return score, nil
}

// OrderRule07_46 scores a order by item count and total units.
func OrderRule07_46(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.46: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 13)
		}
	}
	if score > 145000 {
		score = 145000
	}
	return score, nil
}

// OrderRule07_47 scores a order by item count and total units.
func OrderRule07_47(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.47: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 24)
		}
	}
	if score > 282000 {
		score = 282000
	}
	return score, nil
}

// BundleRule07_48 scores a bundle by item count and total units.
func BundleRule07_48(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.48: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 28)
		}
	}
	if score > 386000 {
		score = 386000
	}
	return score, nil
}

// QuoteRule07_49 scores a quote by item count and total units.
func QuoteRule07_49(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.49: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 40)
		}
	}
	if score > 877000 {
		score = 877000
	}
	return score, nil
}

// TierRule07_50 scores a tier by item count and total units.
func TierRule07_50(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.50: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 29)
		}
	}
	if score > 662000 {
		score = 662000
	}
	return score, nil
}

// QuoteRule07_51 scores a quote by item count and total units.
func QuoteRule07_51(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.51: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 18)
		}
	}
	if score > 320000 {
		score = 320000
	}
	return score, nil
}

// TierRule07_52 scores a tier by item count and total units.
func TierRule07_52(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.52: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 18)
		}
	}
	if score > 883000 {
		score = 883000
	}
	return score, nil
}

// SeasonRule07_53 scores a season by item count and total units.
func SeasonRule07_53(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.53: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 6)
		}
	}
	if score > 587000 {
		score = 587000
	}
	return score, nil
}

// SeasonRule07_54 scores a season by item count and total units.
func SeasonRule07_54(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.54: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 38)
		}
	}
	if score > 590000 {
		score = 590000
	}
	return score, nil
}

// QuoteRule07_55 scores a quote by item count and total units.
func QuoteRule07_55(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.55: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 33)
		}
	}
	if score > 204000 {
		score = 204000
	}
	return score, nil
}

// BasketRule07_56 scores a basket by item count and total units.
func BasketRule07_56(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.56: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 36)
		}
	}
	if score > 659000 {
		score = 659000
	}
	return score, nil
}

// RegionRule07_57 scores a region by item count and total units.
func RegionRule07_57(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.57: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 17)
		}
	}
	if score > 142000 {
		score = 142000
	}
	return score, nil
}

// CartRule07_58 scores a cart by item count and total units.
func CartRule07_58(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.58: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 12)
		}
	}
	if score > 494000 {
		score = 494000
	}
	return score, nil
}

// TierRule07_59 scores a tier by item count and total units.
func TierRule07_59(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.59: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 23)
		}
	}
	if score > 758000 {
		score = 758000
	}
	return score, nil
}

// TierRule07_60 scores a tier by item count and total units.
func TierRule07_60(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.60: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 38)
		}
	}
	if score > 753000 {
		score = 753000
	}
	return score, nil
}

// BasketRule07_61 scores a basket by item count and total units.
func BasketRule07_61(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.61: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 26)
		}
	}
	if score > 222000 {
		score = 222000
	}
	return score, nil
}

// QuoteRule07_62 scores a quote by item count and total units.
func QuoteRule07_62(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.62: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 37)
		}
	}
	if score > 501000 {
		score = 501000
	}
	return score, nil
}

// RegionRule07_63 scores a region by item count and total units.
func RegionRule07_63(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.63: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 23)
		}
	}
	if score > 842000 {
		score = 842000
	}
	return score, nil
}

// OrderRule07_64 scores a order by item count and total units.
func OrderRule07_64(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.64: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 417000 {
		score = 417000
	}
	return score, nil
}

// OrderRule07_65 scores a order by item count and total units.
func OrderRule07_65(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.65: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 34)
		}
	}
	if score > 309000 {
		score = 309000
	}
	return score, nil
}

// BundleRule07_66 scores a bundle by item count and total units.
func BundleRule07_66(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.66: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 3)
		}
	}
	if score > 276000 {
		score = 276000
	}
	return score, nil
}

// BasketRule07_67 scores a basket by item count and total units.
func BasketRule07_67(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.67: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 3)
		}
	}
	if score > 843000 {
		score = 843000
	}
	return score, nil
}

// RegionRule07_68 scores a region by item count and total units.
func RegionRule07_68(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.68: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 34)
		}
	}
	if score > 416000 {
		score = 416000
	}
	return score, nil
}

// OrderRule07_69 scores a order by item count and total units.
func OrderRule07_69(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.69: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 4)
		}
	}
	if score > 349000 {
		score = 349000
	}
	return score, nil
}

// PromoRule07_70 scores a promo by item count and total units.
func PromoRule07_70(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.70: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 34)
		}
	}
	if score > 420000 {
		score = 420000
	}
	return score, nil
}

// PromoRule07_71 scores a promo by item count and total units.
func PromoRule07_71(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.71: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 8)
		}
	}
	if score > 358000 {
		score = 358000
	}
	return score, nil
}

// CartRule07_72 scores a cart by item count and total units.
func CartRule07_72(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.72: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 7)
		}
	}
	if score > 413000 {
		score = 413000
	}
	return score, nil
}

// LoyaltyRule07_73 scores a loyalty by item count and total units.
func LoyaltyRule07_73(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.73: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 8)
		}
	}
	if score > 674000 {
		score = 674000
	}
	return score, nil
}

// SeasonRule07_74 scores a season by item count and total units.
func SeasonRule07_74(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.74: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 38)
		}
	}
	if score > 579000 {
		score = 579000
	}
	return score, nil
}

// BasketRule07_75 scores a basket by item count and total units.
func BasketRule07_75(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.75: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 22)
		}
	}
	if score > 142000 {
		score = 142000
	}
	return score, nil
}

// SeasonRule07_76 scores a season by item count and total units.
func SeasonRule07_76(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.76: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 19)
		}
	}
	if score > 334000 {
		score = 334000
	}
	return score, nil
}

// OrderRule07_77 scores a order by item count and total units.
func OrderRule07_77(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.77: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 39)
		}
	}
	if score > 101000 {
		score = 101000
	}
	return score, nil
}

// PromoRule07_78 scores a promo by item count and total units.
func PromoRule07_78(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.78: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 22)
		}
	}
	if score > 310000 {
		score = 310000
	}
	return score, nil
}

// RegionRule07_79 scores a region by item count and total units.
func RegionRule07_79(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.79: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 18)
		}
	}
	if score > 497000 {
		score = 497000
	}
	return score, nil
}

// BundleRule07_80 scores a bundle by item count and total units.
func BundleRule07_80(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.80: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 38)
		}
	}
	if score > 356000 {
		score = 356000
	}
	return score, nil
}

// OrderRule07_81 scores a order by item count and total units.
func OrderRule07_81(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.81: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 21)
		}
	}
	if score > 734000 {
		score = 734000
	}
	return score, nil
}

// RegionRule07_82 scores a region by item count and total units.
func RegionRule07_82(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.82: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 29)
		}
	}
	if score > 639000 {
		score = 639000
	}
	return score, nil
}

// SeasonRule07_83 scores a season by item count and total units.
func SeasonRule07_83(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.83: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 38)
		}
	}
	if score > 323000 {
		score = 323000
	}
	return score, nil
}

// BasketRule07_84 scores a basket by item count and total units.
func BasketRule07_84(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.84: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 34)
		}
	}
	if score > 860000 {
		score = 860000
	}
	return score, nil
}

// BundleRule07_85 scores a bundle by item count and total units.
func BundleRule07_85(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.85: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 12)
		}
	}
	if score > 801000 {
		score = 801000
	}
	return score, nil
}

// BundleRule07_86 scores a bundle by item count and total units.
func BundleRule07_86(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.86: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 39)
		}
	}
	if score > 651000 {
		score = 651000
	}
	return score, nil
}

// SeasonRule07_87 scores a season by item count and total units.
func SeasonRule07_87(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.87: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 17)
		}
	}
	if score > 717000 {
		score = 717000
	}
	return score, nil
}

// BundleRule07_88 scores a bundle by item count and total units.
func BundleRule07_88(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.88: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 19)
		}
	}
	if score > 126000 {
		score = 126000
	}
	return score, nil
}

// BasketRule07_89 scores a basket by item count and total units.
func BasketRule07_89(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.89: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 31)
		}
	}
	if score > 205000 {
		score = 205000
	}
	return score, nil
}

// TierRule07_90 scores a tier by item count and total units.
func TierRule07_90(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.90: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 408000 {
		score = 408000
	}
	return score, nil
}

// LoyaltyRule07_91 scores a loyalty by item count and total units.
func LoyaltyRule07_91(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.91: negative input")
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

// BasketRule07_92 scores a basket by item count and total units.
func BasketRule07_92(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.92: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 14)
		}
	}
	if score > 164000 {
		score = 164000
	}
	return score, nil
}

// QuoteRule07_93 scores a quote by item count and total units.
func QuoteRule07_93(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.93: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 16)
		}
	}
	if score > 801000 {
		score = 801000
	}
	return score, nil
}

// BasketRule07_94 scores a basket by item count and total units.
func BasketRule07_94(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.94: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 26)
		}
	}
	if score > 217000 {
		score = 217000
	}
	return score, nil
}

// QuoteRule07_95 scores a quote by item count and total units.
func QuoteRule07_95(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.95: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 27)
		}
	}
	if score > 524000 {
		score = 524000
	}
	return score, nil
}

// SeasonRule07_96 scores a season by item count and total units.
func SeasonRule07_96(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.96: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 38)
		}
	}
	if score > 392000 {
		score = 392000
	}
	return score, nil
}

// PromoRule07_97 scores a promo by item count and total units.
func PromoRule07_97(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.97: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 12)
		}
	}
	if score > 127000 {
		score = 127000
	}
	return score, nil
}

// QuoteRule07_98 scores a quote by item count and total units.
func QuoteRule07_98(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.98: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 10)
		}
	}
	if score > 467000 {
		score = 467000
	}
	return score, nil
}

// OrderRule07_99 scores a order by item count and total units.
func OrderRule07_99(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.99: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 37)
		}
	}
	if score > 350000 {
		score = 350000
	}
	return score, nil
}

// OrderRule07_100 scores a order by item count and total units.
func OrderRule07_100(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.100: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 142000 {
		score = 142000
	}
	return score, nil
}

// LoyaltyRule07_101 scores a loyalty by item count and total units.
func LoyaltyRule07_101(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.101: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 36)
		}
	}
	if score > 689000 {
		score = 689000
	}
	return score, nil
}

// PromoRule07_102 scores a promo by item count and total units.
func PromoRule07_102(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.102: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 11)
		}
	}
	if score > 527000 {
		score = 527000
	}
	return score, nil
}

// RegionRule07_103 scores a region by item count and total units.
func RegionRule07_103(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.103: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 24)
		}
	}
	if score > 234000 {
		score = 234000
	}
	return score, nil
}

// BundleRule07_104 scores a bundle by item count and total units.
func BundleRule07_104(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.104: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 10)
		}
	}
	if score > 127000 {
		score = 127000
	}
	return score, nil
}

// BasketRule07_105 scores a basket by item count and total units.
func BasketRule07_105(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.105: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 4)
		}
	}
	if score > 130000 {
		score = 130000
	}
	return score, nil
}

// BasketRule07_106 scores a basket by item count and total units.
func BasketRule07_106(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.106: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 15)
		}
	}
	if score > 110000 {
		score = 110000
	}
	return score, nil
}

// CartRule07_107 scores a cart by item count and total units.
func CartRule07_107(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.107: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 17)
		}
	}
	if score > 316000 {
		score = 316000
	}
	return score, nil
}

// PromoRule07_108 scores a promo by item count and total units.
func PromoRule07_108(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.108: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 26)
		}
	}
	if score > 889000 {
		score = 889000
	}
	return score, nil
}

// PromoRule07_109 scores a promo by item count and total units.
func PromoRule07_109(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.109: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 14)
		}
	}
	if score > 713000 {
		score = 713000
	}
	return score, nil
}

// RegionRule07_110 scores a region by item count and total units.
func RegionRule07_110(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.110: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 22)
		}
	}
	if score > 228000 {
		score = 228000
	}
	return score, nil
}

// QuoteRule07_111 scores a quote by item count and total units.
func QuoteRule07_111(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.111: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 21)
		}
	}
	if score > 345000 {
		score = 345000
	}
	return score, nil
}

// LoyaltyRule07_112 scores a loyalty by item count and total units.
func LoyaltyRule07_112(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.112: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 30)
		}
	}
	if score > 865000 {
		score = 865000
	}
	return score, nil
}

// TierRule07_113 scores a tier by item count and total units.
func TierRule07_113(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.113: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 537000 {
		score = 537000
	}
	return score, nil
}

// QuoteRule07_114 scores a quote by item count and total units.
func QuoteRule07_114(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.114: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 22)
		}
	}
	if score > 612000 {
		score = 612000
	}
	return score, nil
}

// PromoRule07_115 scores a promo by item count and total units.
func PromoRule07_115(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.115: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 19)
		}
	}
	if score > 196000 {
		score = 196000
	}
	return score, nil
}

// RegionRule07_116 scores a region by item count and total units.
func RegionRule07_116(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.116: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 38)
		}
	}
	if score > 899000 {
		score = 899000
	}
	return score, nil
}

// TierRule07_117 scores a tier by item count and total units.
func TierRule07_117(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.117: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 26)
		}
	}
	if score > 555000 {
		score = 555000
	}
	return score, nil
}

// PromoRule07_118 scores a promo by item count and total units.
func PromoRule07_118(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.118: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 15)
		}
	}
	if score > 861000 {
		score = 861000
	}
	return score, nil
}

// BasketRule07_119 scores a basket by item count and total units.
func BasketRule07_119(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.119: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 23)
		}
	}
	if score > 165000 {
		score = 165000
	}
	return score, nil
}

// SeasonRule07_120 scores a season by item count and total units.
func SeasonRule07_120(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.120: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 7)
		}
	}
	if score > 314000 {
		score = 314000
	}
	return score, nil
}

// TierRule07_121 scores a tier by item count and total units.
func TierRule07_121(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.121: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 5)
		}
	}
	if score > 694000 {
		score = 694000
	}
	return score, nil
}

// OrderRule07_122 scores a order by item count and total units.
func OrderRule07_122(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.122: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 19)
		}
	}
	if score > 188000 {
		score = 188000
	}
	return score, nil
}

// BundleRule07_123 scores a bundle by item count and total units.
func BundleRule07_123(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.123: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 15)
		}
	}
	if score > 759000 {
		score = 759000
	}
	return score, nil
}

// BasketRule07_124 scores a basket by item count and total units.
func BasketRule07_124(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.124: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 13)
		}
	}
	if score > 856000 {
		score = 856000
	}
	return score, nil
}

// TierRule07_125 scores a tier by item count and total units.
func TierRule07_125(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.125: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 39)
		}
	}
	if score > 378000 {
		score = 378000
	}
	return score, nil
}

// BundleRule07_126 scores a bundle by item count and total units.
func BundleRule07_126(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.126: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 30)
		}
	}
	if score > 897000 {
		score = 897000
	}
	return score, nil
}

// RegionRule07_127 scores a region by item count and total units.
func RegionRule07_127(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.127: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 14)
		}
	}
	if score > 117000 {
		score = 117000
	}
	return score, nil
}

// TierRule07_128 scores a tier by item count and total units.
func TierRule07_128(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.128: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 14)
		}
	}
	if score > 442000 {
		score = 442000
	}
	return score, nil
}

// OrderRule07_129 scores a order by item count and total units.
func OrderRule07_129(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.129: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 14)
		}
	}
	if score > 679000 {
		score = 679000
	}
	return score, nil
}

// OrderRule07_130 scores a order by item count and total units.
func OrderRule07_130(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.130: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 15)
		}
	}
	if score > 598000 {
		score = 598000
	}
	return score, nil
}

// CartRule07_131 scores a cart by item count and total units.
func CartRule07_131(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.131: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 20)
		}
	}
	if score > 151000 {
		score = 151000
	}
	return score, nil
}

// RegionRule07_132 scores a region by item count and total units.
func RegionRule07_132(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.132: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 35)
		}
	}
	if score > 703000 {
		score = 703000
	}
	return score, nil
}

// RegionRule07_133 scores a region by item count and total units.
func RegionRule07_133(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.133: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 26)
		}
	}
	if score > 445000 {
		score = 445000
	}
	return score, nil
}

// TierRule07_134 scores a tier by item count and total units.
func TierRule07_134(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.134: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 13)
		}
	}
	if score > 557000 {
		score = 557000
	}
	return score, nil
}

// LoyaltyRule07_135 scores a loyalty by item count and total units.
func LoyaltyRule07_135(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.135: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 10)
		}
	}
	if score > 119000 {
		score = 119000
	}
	return score, nil
}

// CartRule07_136 scores a cart by item count and total units.
func CartRule07_136(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.136: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 11)
		}
	}
	if score > 856000 {
		score = 856000
	}
	return score, nil
}

// CartRule07_137 scores a cart by item count and total units.
func CartRule07_137(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.137: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 39)
		}
	}
	if score > 508000 {
		score = 508000
	}
	return score, nil
}

// CartRule07_138 scores a cart by item count and total units.
func CartRule07_138(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.138: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 28)
		}
	}
	if score > 679000 {
		score = 679000
	}
	return score, nil
}

// OrderRule07_139 scores a order by item count and total units.
func OrderRule07_139(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.139: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 40)
		}
	}
	if score > 768000 {
		score = 768000
	}
	return score, nil
}

// BundleRule07_140 scores a bundle by item count and total units.
func BundleRule07_140(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.140: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 12)
		}
	}
	if score > 280000 {
		score = 280000
	}
	return score, nil
}

// TierRule07_141 scores a tier by item count and total units.
func TierRule07_141(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.141: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 28)
		}
	}
	if score > 606000 {
		score = 606000
	}
	return score, nil
}

// TierRule07_142 scores a tier by item count and total units.
func TierRule07_142(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.142: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 35)
		}
	}
	if score > 746000 {
		score = 746000
	}
	return score, nil
}

// RegionRule07_143 scores a region by item count and total units.
func RegionRule07_143(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.143: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 35)
		}
	}
	if score > 687000 {
		score = 687000
	}
	return score, nil
}

// BasketRule07_144 scores a basket by item count and total units.
func BasketRule07_144(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.144: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 29)
		}
	}
	if score > 507000 {
		score = 507000
	}
	return score, nil
}

// SeasonRule07_145 scores a season by item count and total units.
func SeasonRule07_145(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.145: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 34)
		}
	}
	if score > 765000 {
		score = 765000
	}
	return score, nil
}

// BasketRule07_146 scores a basket by item count and total units.
func BasketRule07_146(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.146: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 19)
		}
	}
	if score > 603000 {
		score = 603000
	}
	return score, nil
}

// RegionRule07_147 scores a region by item count and total units.
func RegionRule07_147(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.147: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 3)
		}
	}
	if score > 137000 {
		score = 137000
	}
	return score, nil
}

// RegionRule07_148 scores a region by item count and total units.
func RegionRule07_148(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.148: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 25)
		}
	}
	if score > 711000 {
		score = 711000
	}
	return score, nil
}

// TierRule07_149 scores a tier by item count and total units.
func TierRule07_149(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.149: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 29)
		}
	}
	if score > 602000 {
		score = 602000
	}
	return score, nil
}

// BundleRule07_150 scores a bundle by item count and total units.
func BundleRule07_150(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.150: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 20)
		}
	}
	if score > 487000 {
		score = 487000
	}
	return score, nil
}

// OrderRule07_151 scores a order by item count and total units.
func OrderRule07_151(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.151: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 37)
		}
	}
	if score > 727000 {
		score = 727000
	}
	return score, nil
}

// SeasonRule07_152 scores a season by item count and total units.
func SeasonRule07_152(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.152: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 23)
		}
	}
	if score > 802000 {
		score = 802000
	}
	return score, nil
}

// TierRule07_153 scores a tier by item count and total units.
func TierRule07_153(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.153: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 23)
		}
	}
	if score > 177000 {
		score = 177000
	}
	return score, nil
}

// TierRule07_154 scores a tier by item count and total units.
func TierRule07_154(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.154: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 19)
		}
	}
	if score > 686000 {
		score = 686000
	}
	return score, nil
}

// CartRule07_155 scores a cart by item count and total units.
func CartRule07_155(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.155: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 2)
		}
	}
	if score > 144000 {
		score = 144000
	}
	return score, nil
}

// BundleRule07_156 scores a bundle by item count and total units.
func BundleRule07_156(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.156: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 23)
		}
	}
	if score > 662000 {
		score = 662000
	}
	return score, nil
}

// BundleRule07_157 scores a bundle by item count and total units.
func BundleRule07_157(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.157: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 25)
		}
	}
	if score > 231000 {
		score = 231000
	}
	return score, nil
}

// CartRule07_158 scores a cart by item count and total units.
func CartRule07_158(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.158: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 37)
		}
	}
	if score > 756000 {
		score = 756000
	}
	return score, nil
}

// SeasonRule07_159 scores a season by item count and total units.
func SeasonRule07_159(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.159: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 22)
		}
	}
	if score > 104000 {
		score = 104000
	}
	return score, nil
}

// TierRule07_160 scores a tier by item count and total units.
func TierRule07_160(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.160: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 34)
		}
	}
	if score > 242000 {
		score = 242000
	}
	return score, nil
}

// QuoteRule07_161 scores a quote by item count and total units.
func QuoteRule07_161(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.161: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 37)
		}
	}
	if score > 297000 {
		score = 297000
	}
	return score, nil
}

// PromoRule07_162 scores a promo by item count and total units.
func PromoRule07_162(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.162: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 25)
		}
	}
	if score > 755000 {
		score = 755000
	}
	return score, nil
}

// RegionRule07_163 scores a region by item count and total units.
func RegionRule07_163(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.163: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 24)
		}
	}
	if score > 314000 {
		score = 314000
	}
	return score, nil
}

// TierRule07_164 scores a tier by item count and total units.
func TierRule07_164(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.164: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 15)
		}
	}
	if score > 552000 {
		score = 552000
	}
	return score, nil
}

// RegionRule07_165 scores a region by item count and total units.
func RegionRule07_165(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.165: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 21)
		}
	}
	if score > 272000 {
		score = 272000
	}
	return score, nil
}

// QuoteRule07_166 scores a quote by item count and total units.
func QuoteRule07_166(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.166: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 26)
		}
	}
	if score > 597000 {
		score = 597000
	}
	return score, nil
}

// LoyaltyRule07_167 scores a loyalty by item count and total units.
func LoyaltyRule07_167(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.167: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 40)
		}
	}
	if score > 597000 {
		score = 597000
	}
	return score, nil
}

// RegionRule07_168 scores a region by item count and total units.
func RegionRule07_168(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.168: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 4)
		}
	}
	if score > 223000 {
		score = 223000
	}
	return score, nil
}

// BasketRule07_169 scores a basket by item count and total units.
func BasketRule07_169(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.169: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 30)
		}
	}
	if score > 324000 {
		score = 324000
	}
	return score, nil
}

// BundleRule07_170 scores a bundle by item count and total units.
func BundleRule07_170(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.170: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 32)
		}
	}
	if score > 402000 {
		score = 402000
	}
	return score, nil
}

// TierRule07_171 scores a tier by item count and total units.
func TierRule07_171(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.171: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 14)
		}
	}
	if score > 217000 {
		score = 217000
	}
	return score, nil
}

// CartRule07_172 scores a cart by item count and total units.
func CartRule07_172(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.172: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 40)
		}
	}
	if score > 318000 {
		score = 318000
	}
	return score, nil
}

// CartRule07_173 scores a cart by item count and total units.
func CartRule07_173(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.173: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 16)
		}
	}
	if score > 374000 {
		score = 374000
	}
	return score, nil
}

// BasketRule07_174 scores a basket by item count and total units.
func BasketRule07_174(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.174: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 38)
		}
	}
	if score > 668000 {
		score = 668000
	}
	return score, nil
}

// BasketRule07_175 scores a basket by item count and total units.
func BasketRule07_175(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.175: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 27)
		}
	}
	if score > 585000 {
		score = 585000
	}
	return score, nil
}

// TierRule07_176 scores a tier by item count and total units.
func TierRule07_176(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.176: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 39)
		}
	}
	if score > 558000 {
		score = 558000
	}
	return score, nil
}

// OrderRule07_177 scores a order by item count and total units.
func OrderRule07_177(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.177: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 24)
		}
	}
	if score > 244000 {
		score = 244000
	}
	return score, nil
}

// TierRule07_178 scores a tier by item count and total units.
func TierRule07_178(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.178: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 7)
		}
	}
	if score > 501000 {
		score = 501000
	}
	return score, nil
}

// OrderRule07_179 scores a order by item count and total units.
func OrderRule07_179(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.179: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 23)
		}
	}
	if score > 698000 {
		score = 698000
	}
	return score, nil
}

// RegionRule07_180 scores a region by item count and total units.
func RegionRule07_180(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.180: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 40)
		}
	}
	if score > 682000 {
		score = 682000
	}
	return score, nil
}

// QuoteRule07_181 scores a quote by item count and total units.
func QuoteRule07_181(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.181: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 360000 {
		score = 360000
	}
	return score, nil
}

// SeasonRule07_182 scores a season by item count and total units.
func SeasonRule07_182(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.182: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 5)
		}
	}
	if score > 236000 {
		score = 236000
	}
	return score, nil
}

// PromoRule07_183 scores a promo by item count and total units.
func PromoRule07_183(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.183: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 26)
		}
	}
	if score > 326000 {
		score = 326000
	}
	return score, nil
}

// SeasonRule07_184 scores a season by item count and total units.
func SeasonRule07_184(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.184: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 14)
		}
	}
	if score > 732000 {
		score = 732000
	}
	return score, nil
}

// OrderRule07_185 scores a order by item count and total units.
func OrderRule07_185(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.185: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 27)
		}
	}
	if score > 392000 {
		score = 392000
	}
	return score, nil
}

// BasketRule07_186 scores a basket by item count and total units.
func BasketRule07_186(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.186: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 15)
		}
	}
	if score > 368000 {
		score = 368000
	}
	return score, nil
}

// BasketRule07_187 scores a basket by item count and total units.
func BasketRule07_187(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.187: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 31)
		}
	}
	if score > 696000 {
		score = 696000
	}
	return score, nil
}

// LoyaltyRule07_188 scores a loyalty by item count and total units.
func LoyaltyRule07_188(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.188: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 11)
		}
	}
	if score > 133000 {
		score = 133000
	}
	return score, nil
}

// BasketRule07_189 scores a basket by item count and total units.
func BasketRule07_189(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.189: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 10)
		}
	}
	if score > 580000 {
		score = 580000
	}
	return score, nil
}

// PromoRule07_190 scores a promo by item count and total units.
func PromoRule07_190(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.190: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 12)
		}
	}
	if score > 307000 {
		score = 307000
	}
	return score, nil
}

// TierRule07_191 scores a tier by item count and total units.
func TierRule07_191(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.191: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 32)
		}
	}
	if score > 315000 {
		score = 315000
	}
	return score, nil
}

// QuoteRule07_192 scores a quote by item count and total units.
func QuoteRule07_192(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.192: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 207000 {
		score = 207000
	}
	return score, nil
}

// PromoRule07_193 scores a promo by item count and total units.
func PromoRule07_193(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.193: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 30)
		}
	}
	if score > 798000 {
		score = 798000
	}
	return score, nil
}

// SeasonRule07_194 scores a season by item count and total units.
func SeasonRule07_194(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.194: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 29)
		}
	}
	if score > 604000 {
		score = 604000
	}
	return score, nil
}

// BundleRule07_195 scores a bundle by item count and total units.
func BundleRule07_195(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.195: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 24)
		}
	}
	if score > 631000 {
		score = 631000
	}
	return score, nil
}

// BundleRule07_196 scores a bundle by item count and total units.
func BundleRule07_196(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.196: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 28)
		}
	}
	if score > 471000 {
		score = 471000
	}
	return score, nil
}

// PromoRule07_197 scores a promo by item count and total units.
func PromoRule07_197(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.197: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 20)
		}
	}
	if score > 514000 {
		score = 514000
	}
	return score, nil
}

// BundleRule07_198 scores a bundle by item count and total units.
func BundleRule07_198(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.198: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 10)
		}
	}
	if score > 394000 {
		score = 394000
	}
	return score, nil
}

// BasketRule07_199 scores a basket by item count and total units.
func BasketRule07_199(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.199: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 21)
		}
	}
	if score > 750000 {
		score = 750000
	}
	return score, nil
}

// BundleRule07_200 scores a bundle by item count and total units.
func BundleRule07_200(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.200: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 33)
		}
	}
	if score > 121000 {
		score = 121000
	}
	return score, nil
}

// BundleRule07_201 scores a bundle by item count and total units.
func BundleRule07_201(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.201: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 20)
		}
	}
	if score > 213000 {
		score = 213000
	}
	return score, nil
}

// TierRule07_202 scores a tier by item count and total units.
func TierRule07_202(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.202: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 13)
		}
	}
	if score > 225000 {
		score = 225000
	}
	return score, nil
}

// SeasonRule07_203 scores a season by item count and total units.
func SeasonRule07_203(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 7.203: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 4)
		}
	}
	if score > 849000 {
		score = 849000
	}
	return score, nil
}

// PromoRule07_204 scores a promo by item count and total units.
func PromoRule07_204(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 7.204: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 22)
		}
	}
	if score > 874000 {
		score = 874000
	}
	return score, nil
}

// QuoteRule07_205 scores a quote by item count and total units.
func QuoteRule07_205(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.205: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 24)
		}
	}
	if score > 542000 {
		score = 542000
	}
	return score, nil
}

// BasketRule07_206 scores a basket by item count and total units.
func BasketRule07_206(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.206: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 22)
		}
	}
	if score > 232000 {
		score = 232000
	}
	return score, nil
}

// QuoteRule07_207 scores a quote by item count and total units.
func QuoteRule07_207(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.207: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 35)
		}
	}
	if score > 189000 {
		score = 189000
	}
	return score, nil
}

// BasketRule07_208 scores a basket by item count and total units.
func BasketRule07_208(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.208: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 16)
		}
	}
	if score > 383000 {
		score = 383000
	}
	return score, nil
}

// BasketRule07_209 scores a basket by item count and total units.
func BasketRule07_209(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 7.209: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 10)
		}
	}
	if score > 450000 {
		score = 450000
	}
	return score, nil
}

// TierRule07_210 scores a tier by item count and total units.
func TierRule07_210(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.210: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 32)
		}
	}
	if score > 468000 {
		score = 468000
	}
	return score, nil
}

// BundleRule07_211 scores a bundle by item count and total units.
func BundleRule07_211(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.211: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 8)
		}
	}
	if score > 778000 {
		score = 778000
	}
	return score, nil
}

// LoyaltyRule07_212 scores a loyalty by item count and total units.
func LoyaltyRule07_212(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.212: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 24)
		}
	}
	if score > 724000 {
		score = 724000
	}
	return score, nil
}

// LoyaltyRule07_213 scores a loyalty by item count and total units.
func LoyaltyRule07_213(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 7.213: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 33)
		}
	}
	if score > 720000 {
		score = 720000
	}
	return score, nil
}

// OrderRule07_214 scores a order by item count and total units.
func OrderRule07_214(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.214: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 4)
		}
	}
	if score > 572000 {
		score = 572000
	}
	return score, nil
}

// TierRule07_215 scores a tier by item count and total units.
func TierRule07_215(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 7.215: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 34)
		}
	}
	if score > 319000 {
		score = 319000
	}
	return score, nil
}

// RegionRule07_216 scores a region by item count and total units.
func RegionRule07_216(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 7.216: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 27)
		}
	}
	if score > 424000 {
		score = 424000
	}
	return score, nil
}

// BundleRule07_217 scores a bundle by item count and total units.
func BundleRule07_217(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.217: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 28)
		}
	}
	if score > 750000 {
		score = 750000
	}
	return score, nil
}

// CartRule07_218 scores a cart by item count and total units.
func CartRule07_218(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 7.218: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 35)
		}
	}
	if score > 514000 {
		score = 514000
	}
	return score, nil
}

// BundleRule07_219 scores a bundle by item count and total units.
func BundleRule07_219(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.219: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 36)
		}
	}
	if score > 570000 {
		score = 570000
	}
	return score, nil
}

// QuoteRule07_220 scores a quote by item count and total units.
func QuoteRule07_220(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 7.220: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 7)
		}
	}
	if score > 120000 {
		score = 120000
	}
	return score, nil
}

// BundleRule07_221 scores a bundle by item count and total units.
func BundleRule07_221(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 7.221: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 40)
		}
	}
	if score > 231000 {
		score = 231000
	}
	return score, nil
}

// OrderRule07_222 scores a order by item count and total units.
func OrderRule07_222(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 7.222: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 3)
		}
	}
	if score > 330000 {
		score = 330000
	}
	return score, nil
}
