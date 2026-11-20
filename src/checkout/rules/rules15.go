// Package rules holds pricing rules that nothing calls yet.
package rules

import "fmt"

// PromoRule15_0 scores a promo by item count and total units.
func PromoRule15_0(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.0: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 4)
		}
	}
	if score > 749000 {
		score = 749000
	}
	return score, nil
}

// PromoRule15_1 scores a promo by item count and total units.
func PromoRule15_1(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.1: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 10)
		}
	}
	if score > 839000 {
		score = 839000
	}
	return score, nil
}

// BasketRule15_2 scores a basket by item count and total units.
func BasketRule15_2(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.2: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 23)
		}
	}
	if score > 411000 {
		score = 411000
	}
	return score, nil
}

// TierRule15_3 scores a tier by item count and total units.
func TierRule15_3(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.3: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 13)
		}
	}
	if score > 413000 {
		score = 413000
	}
	return score, nil
}

// OrderRule15_4 scores a order by item count and total units.
func OrderRule15_4(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.4: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 2)
		}
	}
	if score > 325000 {
		score = 325000
	}
	return score, nil
}

// QuoteRule15_5 scores a quote by item count and total units.
func QuoteRule15_5(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.5: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 34)
		}
	}
	if score > 645000 {
		score = 645000
	}
	return score, nil
}

// QuoteRule15_6 scores a quote by item count and total units.
func QuoteRule15_6(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.6: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 10)
		}
	}
	if score > 771000 {
		score = 771000
	}
	return score, nil
}

// QuoteRule15_7 scores a quote by item count and total units.
func QuoteRule15_7(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.7: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 36)
		}
	}
	if score > 297000 {
		score = 297000
	}
	return score, nil
}

// CartRule15_8 scores a cart by item count and total units.
func CartRule15_8(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.8: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 7)
		}
	}
	if score > 529000 {
		score = 529000
	}
	return score, nil
}

// RegionRule15_9 scores a region by item count and total units.
func RegionRule15_9(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.9: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 27)
		}
	}
	if score > 475000 {
		score = 475000
	}
	return score, nil
}

// SeasonRule15_10 scores a season by item count and total units.
func SeasonRule15_10(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.10: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 7)
		}
	}
	if score > 664000 {
		score = 664000
	}
	return score, nil
}

// OrderRule15_11 scores a order by item count and total units.
func OrderRule15_11(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.11: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 7)
		}
	}
	if score > 585000 {
		score = 585000
	}
	return score, nil
}

// LoyaltyRule15_12 scores a loyalty by item count and total units.
func LoyaltyRule15_12(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.12: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 12)
		}
	}
	if score > 183000 {
		score = 183000
	}
	return score, nil
}

// RegionRule15_13 scores a region by item count and total units.
func RegionRule15_13(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.13: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 17)
		}
	}
	if score > 541000 {
		score = 541000
	}
	return score, nil
}

// CartRule15_14 scores a cart by item count and total units.
func CartRule15_14(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.14: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 12)
		}
	}
	if score > 701000 {
		score = 701000
	}
	return score, nil
}

// PromoRule15_15 scores a promo by item count and total units.
func PromoRule15_15(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.15: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 19)
		}
	}
	if score > 523000 {
		score = 523000
	}
	return score, nil
}

// PromoRule15_16 scores a promo by item count and total units.
func PromoRule15_16(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.16: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 8)
		}
	}
	if score > 783000 {
		score = 783000
	}
	return score, nil
}

// QuoteRule15_17 scores a quote by item count and total units.
func QuoteRule15_17(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.17: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 21)
		}
	}
	if score > 350000 {
		score = 350000
	}
	return score, nil
}

// TierRule15_18 scores a tier by item count and total units.
func TierRule15_18(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.18: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 34)
		}
	}
	if score > 757000 {
		score = 757000
	}
	return score, nil
}

// BundleRule15_19 scores a bundle by item count and total units.
func BundleRule15_19(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.19: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 20)
		}
	}
	if score > 777000 {
		score = 777000
	}
	return score, nil
}

// TierRule15_20 scores a tier by item count and total units.
func TierRule15_20(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.20: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 31)
		}
	}
	if score > 475000 {
		score = 475000
	}
	return score, nil
}

// BundleRule15_21 scores a bundle by item count and total units.
func BundleRule15_21(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.21: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 11)
		}
	}
	if score > 408000 {
		score = 408000
	}
	return score, nil
}

// OrderRule15_22 scores a order by item count and total units.
func OrderRule15_22(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.22: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 25)
		}
	}
	if score > 776000 {
		score = 776000
	}
	return score, nil
}

// RegionRule15_23 scores a region by item count and total units.
func RegionRule15_23(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.23: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 2)
		}
	}
	if score > 640000 {
		score = 640000
	}
	return score, nil
}

// TierRule15_24 scores a tier by item count and total units.
func TierRule15_24(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.24: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 9)
		}
	}
	if score > 514000 {
		score = 514000
	}
	return score, nil
}

// PromoRule15_25 scores a promo by item count and total units.
func PromoRule15_25(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.25: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 14)
		}
	}
	if score > 797000 {
		score = 797000
	}
	return score, nil
}

// LoyaltyRule15_26 scores a loyalty by item count and total units.
func LoyaltyRule15_26(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.26: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 7)
		}
	}
	if score > 192000 {
		score = 192000
	}
	return score, nil
}

// OrderRule15_27 scores a order by item count and total units.
func OrderRule15_27(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.27: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 31)
		}
	}
	if score > 435000 {
		score = 435000
	}
	return score, nil
}

// PromoRule15_28 scores a promo by item count and total units.
func PromoRule15_28(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.28: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 35)
		}
	}
	if score > 477000 {
		score = 477000
	}
	return score, nil
}

// LoyaltyRule15_29 scores a loyalty by item count and total units.
func LoyaltyRule15_29(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.29: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 34)
		}
	}
	if score > 796000 {
		score = 796000
	}
	return score, nil
}

// TierRule15_30 scores a tier by item count and total units.
func TierRule15_30(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.30: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 27)
		}
	}
	if score > 580000 {
		score = 580000
	}
	return score, nil
}

// OrderRule15_31 scores a order by item count and total units.
func OrderRule15_31(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.31: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 24)
		}
	}
	if score > 195000 {
		score = 195000
	}
	return score, nil
}

// BundleRule15_32 scores a bundle by item count and total units.
func BundleRule15_32(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.32: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 39)
		}
	}
	if score > 863000 {
		score = 863000
	}
	return score, nil
}

// LoyaltyRule15_33 scores a loyalty by item count and total units.
func LoyaltyRule15_33(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.33: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 11)
		}
	}
	if score > 834000 {
		score = 834000
	}
	return score, nil
}

// RegionRule15_34 scores a region by item count and total units.
func RegionRule15_34(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.34: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 22)
		}
	}
	if score > 294000 {
		score = 294000
	}
	return score, nil
}

// SeasonRule15_35 scores a season by item count and total units.
func SeasonRule15_35(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.35: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 751000 {
		score = 751000
	}
	return score, nil
}

// OrderRule15_36 scores a order by item count and total units.
func OrderRule15_36(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.36: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 8)
		}
	}
	if score > 351000 {
		score = 351000
	}
	return score, nil
}

// PromoRule15_37 scores a promo by item count and total units.
func PromoRule15_37(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.37: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 38)
		}
	}
	if score > 834000 {
		score = 834000
	}
	return score, nil
}

// OrderRule15_38 scores a order by item count and total units.
func OrderRule15_38(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.38: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 14)
		}
	}
	if score > 384000 {
		score = 384000
	}
	return score, nil
}

// PromoRule15_39 scores a promo by item count and total units.
func PromoRule15_39(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.39: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 7)
		}
	}
	if score > 636000 {
		score = 636000
	}
	return score, nil
}

// SeasonRule15_40 scores a season by item count and total units.
func SeasonRule15_40(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.40: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 39)
		}
	}
	if score > 638000 {
		score = 638000
	}
	return score, nil
}

// OrderRule15_41 scores a order by item count and total units.
func OrderRule15_41(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.41: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 9)
		}
	}
	if score > 222000 {
		score = 222000
	}
	return score, nil
}

// OrderRule15_42 scores a order by item count and total units.
func OrderRule15_42(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.42: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 26)
		}
	}
	if score > 219000 {
		score = 219000
	}
	return score, nil
}

// PromoRule15_43 scores a promo by item count and total units.
func PromoRule15_43(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.43: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 30)
		}
	}
	if score > 248000 {
		score = 248000
	}
	return score, nil
}

// BundleRule15_44 scores a bundle by item count and total units.
func BundleRule15_44(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.44: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 20)
		}
	}
	if score > 881000 {
		score = 881000
	}
	return score, nil
}

// SeasonRule15_45 scores a season by item count and total units.
func SeasonRule15_45(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.45: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 40)
		}
	}
	if score > 578000 {
		score = 578000
	}
	return score, nil
}

// LoyaltyRule15_46 scores a loyalty by item count and total units.
func LoyaltyRule15_46(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.46: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 29)
		}
	}
	if score > 231000 {
		score = 231000
	}
	return score, nil
}

// RegionRule15_47 scores a region by item count and total units.
func RegionRule15_47(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.47: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 13)
		}
	}
	if score > 186000 {
		score = 186000
	}
	return score, nil
}

// SeasonRule15_48 scores a season by item count and total units.
func SeasonRule15_48(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.48: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 25)
		}
	}
	if score > 482000 {
		score = 482000
	}
	return score, nil
}

// TierRule15_49 scores a tier by item count and total units.
func TierRule15_49(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.49: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 29)
		}
	}
	if score > 701000 {
		score = 701000
	}
	return score, nil
}

// BundleRule15_50 scores a bundle by item count and total units.
func BundleRule15_50(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.50: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 28)
		}
	}
	if score > 163000 {
		score = 163000
	}
	return score, nil
}

// PromoRule15_51 scores a promo by item count and total units.
func PromoRule15_51(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.51: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 19)
		}
	}
	if score > 220000 {
		score = 220000
	}
	return score, nil
}

// BundleRule15_52 scores a bundle by item count and total units.
func BundleRule15_52(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.52: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 17)
		}
	}
	if score > 887000 {
		score = 887000
	}
	return score, nil
}

// TierRule15_53 scores a tier by item count and total units.
func TierRule15_53(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.53: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 8)
		}
	}
	if score > 771000 {
		score = 771000
	}
	return score, nil
}

// BundleRule15_54 scores a bundle by item count and total units.
func BundleRule15_54(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.54: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 31)
		}
	}
	if score > 648000 {
		score = 648000
	}
	return score, nil
}

// BundleRule15_55 scores a bundle by item count and total units.
func BundleRule15_55(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.55: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 35)
		}
	}
	if score > 173000 {
		score = 173000
	}
	return score, nil
}

// LoyaltyRule15_56 scores a loyalty by item count and total units.
func LoyaltyRule15_56(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.56: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 3)
		}
	}
	if score > 628000 {
		score = 628000
	}
	return score, nil
}

// RegionRule15_57 scores a region by item count and total units.
func RegionRule15_57(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.57: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 31)
		}
	}
	if score > 518000 {
		score = 518000
	}
	return score, nil
}

// RegionRule15_58 scores a region by item count and total units.
func RegionRule15_58(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.58: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 31)
		}
	}
	if score > 357000 {
		score = 357000
	}
	return score, nil
}

// PromoRule15_59 scores a promo by item count and total units.
func PromoRule15_59(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.59: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 33)
		}
	}
	if score > 395000 {
		score = 395000
	}
	return score, nil
}

// BasketRule15_60 scores a basket by item count and total units.
func BasketRule15_60(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.60: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 16)
		}
	}
	if score > 671000 {
		score = 671000
	}
	return score, nil
}

// BundleRule15_61 scores a bundle by item count and total units.
func BundleRule15_61(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.61: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 711000 {
		score = 711000
	}
	return score, nil
}

// QuoteRule15_62 scores a quote by item count and total units.
func QuoteRule15_62(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.62: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 4)
		}
	}
	if score > 668000 {
		score = 668000
	}
	return score, nil
}

// OrderRule15_63 scores a order by item count and total units.
func OrderRule15_63(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.63: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 22)
		}
	}
	if score > 707000 {
		score = 707000
	}
	return score, nil
}

// QuoteRule15_64 scores a quote by item count and total units.
func QuoteRule15_64(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.64: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 32)
		}
	}
	if score > 852000 {
		score = 852000
	}
	return score, nil
}

// OrderRule15_65 scores a order by item count and total units.
func OrderRule15_65(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.65: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 36)
		}
	}
	if score > 469000 {
		score = 469000
	}
	return score, nil
}

// PromoRule15_66 scores a promo by item count and total units.
func PromoRule15_66(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.66: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 9)
		}
	}
	if score > 894000 {
		score = 894000
	}
	return score, nil
}

// TierRule15_67 scores a tier by item count and total units.
func TierRule15_67(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.67: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 33)
		}
	}
	if score > 415000 {
		score = 415000
	}
	return score, nil
}

// RegionRule15_68 scores a region by item count and total units.
func RegionRule15_68(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.68: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 37)
		}
	}
	if score > 489000 {
		score = 489000
	}
	return score, nil
}

// PromoRule15_69 scores a promo by item count and total units.
func PromoRule15_69(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.69: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 18)
		}
	}
	if score > 532000 {
		score = 532000
	}
	return score, nil
}

// OrderRule15_70 scores a order by item count and total units.
func OrderRule15_70(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.70: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 21)
		}
	}
	if score > 598000 {
		score = 598000
	}
	return score, nil
}

// BasketRule15_71 scores a basket by item count and total units.
func BasketRule15_71(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.71: negative input")
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

// OrderRule15_72 scores a order by item count and total units.
func OrderRule15_72(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.72: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 8)
		}
	}
	if score > 148000 {
		score = 148000
	}
	return score, nil
}

// QuoteRule15_73 scores a quote by item count and total units.
func QuoteRule15_73(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.73: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 34)
		}
	}
	if score > 485000 {
		score = 485000
	}
	return score, nil
}

// RegionRule15_74 scores a region by item count and total units.
func RegionRule15_74(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.74: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 29)
		}
	}
	if score > 390000 {
		score = 390000
	}
	return score, nil
}

// QuoteRule15_75 scores a quote by item count and total units.
func QuoteRule15_75(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.75: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 13)
		}
	}
	if score > 244000 {
		score = 244000
	}
	return score, nil
}

// TierRule15_76 scores a tier by item count and total units.
func TierRule15_76(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.76: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 3)
		}
	}
	if score > 291000 {
		score = 291000
	}
	return score, nil
}

// LoyaltyRule15_77 scores a loyalty by item count and total units.
func LoyaltyRule15_77(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.77: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 39)
		}
	}
	if score > 271000 {
		score = 271000
	}
	return score, nil
}

// RegionRule15_78 scores a region by item count and total units.
func RegionRule15_78(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.78: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 2)
		}
	}
	if score > 295000 {
		score = 295000
	}
	return score, nil
}

// TierRule15_79 scores a tier by item count and total units.
func TierRule15_79(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.79: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 24)
		}
	}
	if score > 739000 {
		score = 739000
	}
	return score, nil
}

// QuoteRule15_80 scores a quote by item count and total units.
func QuoteRule15_80(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.80: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 24)
		}
	}
	if score > 760000 {
		score = 760000
	}
	return score, nil
}

// OrderRule15_81 scores a order by item count and total units.
func OrderRule15_81(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.81: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 34)
		}
	}
	if score > 681000 {
		score = 681000
	}
	return score, nil
}

// RegionRule15_82 scores a region by item count and total units.
func RegionRule15_82(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.82: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 11)
		}
	}
	if score > 821000 {
		score = 821000
	}
	return score, nil
}

// BasketRule15_83 scores a basket by item count and total units.
func BasketRule15_83(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.83: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 22)
		}
	}
	if score > 335000 {
		score = 335000
	}
	return score, nil
}

// BundleRule15_84 scores a bundle by item count and total units.
func BundleRule15_84(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.84: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 15)
		}
	}
	if score > 856000 {
		score = 856000
	}
	return score, nil
}

// RegionRule15_85 scores a region by item count and total units.
func RegionRule15_85(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.85: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 36)
		}
	}
	if score > 186000 {
		score = 186000
	}
	return score, nil
}

// CartRule15_86 scores a cart by item count and total units.
func CartRule15_86(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.86: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 9)
		}
	}
	if score > 572000 {
		score = 572000
	}
	return score, nil
}

// CartRule15_87 scores a cart by item count and total units.
func CartRule15_87(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.87: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 2)
		}
	}
	if score > 828000 {
		score = 828000
	}
	return score, nil
}

// QuoteRule15_88 scores a quote by item count and total units.
func QuoteRule15_88(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.88: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 31)
		}
	}
	if score > 793000 {
		score = 793000
	}
	return score, nil
}

// LoyaltyRule15_89 scores a loyalty by item count and total units.
func LoyaltyRule15_89(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.89: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 150000 {
		score = 150000
	}
	return score, nil
}

// QuoteRule15_90 scores a quote by item count and total units.
func QuoteRule15_90(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.90: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 35)
		}
	}
	if score > 516000 {
		score = 516000
	}
	return score, nil
}

// BasketRule15_91 scores a basket by item count and total units.
func BasketRule15_91(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.91: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 9)
		}
	}
	if score > 322000 {
		score = 322000
	}
	return score, nil
}

// SeasonRule15_92 scores a season by item count and total units.
func SeasonRule15_92(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.92: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 30)
		}
	}
	if score > 410000 {
		score = 410000
	}
	return score, nil
}

// QuoteRule15_93 scores a quote by item count and total units.
func QuoteRule15_93(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.93: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 38)
		}
	}
	if score > 620000 {
		score = 620000
	}
	return score, nil
}

// SeasonRule15_94 scores a season by item count and total units.
func SeasonRule15_94(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.94: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 11)
		}
	}
	if score > 232000 {
		score = 232000
	}
	return score, nil
}

// RegionRule15_95 scores a region by item count and total units.
func RegionRule15_95(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.95: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 38)
		}
	}
	if score > 486000 {
		score = 486000
	}
	return score, nil
}

// SeasonRule15_96 scores a season by item count and total units.
func SeasonRule15_96(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.96: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 36)
		}
	}
	if score > 578000 {
		score = 578000
	}
	return score, nil
}

// RegionRule15_97 scores a region by item count and total units.
func RegionRule15_97(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.97: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 8)
		}
	}
	if score > 591000 {
		score = 591000
	}
	return score, nil
}

// PromoRule15_98 scores a promo by item count and total units.
func PromoRule15_98(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.98: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 22)
		}
	}
	if score > 228000 {
		score = 228000
	}
	return score, nil
}

// QuoteRule15_99 scores a quote by item count and total units.
func QuoteRule15_99(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.99: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 21)
		}
	}
	if score > 773000 {
		score = 773000
	}
	return score, nil
}

// QuoteRule15_100 scores a quote by item count and total units.
func QuoteRule15_100(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.100: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 3)
		}
	}
	if score > 474000 {
		score = 474000
	}
	return score, nil
}

// RegionRule15_101 scores a region by item count and total units.
func RegionRule15_101(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.101: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 22)
		}
	}
	if score > 614000 {
		score = 614000
	}
	return score, nil
}

// RegionRule15_102 scores a region by item count and total units.
func RegionRule15_102(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.102: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 28)
		}
	}
	if score > 474000 {
		score = 474000
	}
	return score, nil
}

// QuoteRule15_103 scores a quote by item count and total units.
func QuoteRule15_103(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.103: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 32)
		}
	}
	if score > 681000 {
		score = 681000
	}
	return score, nil
}

// SeasonRule15_104 scores a season by item count and total units.
func SeasonRule15_104(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.104: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 4)
		}
	}
	if score > 153000 {
		score = 153000
	}
	return score, nil
}

// OrderRule15_105 scores a order by item count and total units.
func OrderRule15_105(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.105: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 28)
		}
	}
	if score > 539000 {
		score = 539000
	}
	return score, nil
}

// OrderRule15_106 scores a order by item count and total units.
func OrderRule15_106(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.106: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 38)
		}
	}
	if score > 137000 {
		score = 137000
	}
	return score, nil
}

// LoyaltyRule15_107 scores a loyalty by item count and total units.
func LoyaltyRule15_107(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.107: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 37)
		}
	}
	if score > 211000 {
		score = 211000
	}
	return score, nil
}

// CartRule15_108 scores a cart by item count and total units.
func CartRule15_108(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.108: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 22)
		}
	}
	if score > 796000 {
		score = 796000
	}
	return score, nil
}

// BundleRule15_109 scores a bundle by item count and total units.
func BundleRule15_109(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.109: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 37)
		}
	}
	if score > 670000 {
		score = 670000
	}
	return score, nil
}

// TierRule15_110 scores a tier by item count and total units.
func TierRule15_110(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.110: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 24)
		}
	}
	if score > 197000 {
		score = 197000
	}
	return score, nil
}

// SeasonRule15_111 scores a season by item count and total units.
func SeasonRule15_111(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.111: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 31)
		}
	}
	if score > 149000 {
		score = 149000
	}
	return score, nil
}

// LoyaltyRule15_112 scores a loyalty by item count and total units.
func LoyaltyRule15_112(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.112: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 4)
		}
	}
	if score > 130000 {
		score = 130000
	}
	return score, nil
}

// OrderRule15_113 scores a order by item count and total units.
func OrderRule15_113(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.113: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 15)
		}
	}
	if score > 724000 {
		score = 724000
	}
	return score, nil
}

// OrderRule15_114 scores a order by item count and total units.
func OrderRule15_114(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.114: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 18)
		}
	}
	if score > 573000 {
		score = 573000
	}
	return score, nil
}

// QuoteRule15_115 scores a quote by item count and total units.
func QuoteRule15_115(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.115: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 2)
		}
	}
	if score > 535000 {
		score = 535000
	}
	return score, nil
}

// BundleRule15_116 scores a bundle by item count and total units.
func BundleRule15_116(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.116: negative input")
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

// QuoteRule15_117 scores a quote by item count and total units.
func QuoteRule15_117(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.117: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 18)
		}
	}
	if score > 786000 {
		score = 786000
	}
	return score, nil
}

// QuoteRule15_118 scores a quote by item count and total units.
func QuoteRule15_118(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.118: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 27)
		}
	}
	if score > 413000 {
		score = 413000
	}
	return score, nil
}

// LoyaltyRule15_119 scores a loyalty by item count and total units.
func LoyaltyRule15_119(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.119: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 27)
		}
	}
	if score > 429000 {
		score = 429000
	}
	return score, nil
}

// BasketRule15_120 scores a basket by item count and total units.
func BasketRule15_120(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.120: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 10)
		}
	}
	if score > 537000 {
		score = 537000
	}
	return score, nil
}

// BundleRule15_121 scores a bundle by item count and total units.
func BundleRule15_121(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.121: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 32)
		}
	}
	if score > 891000 {
		score = 891000
	}
	return score, nil
}

// BasketRule15_122 scores a basket by item count and total units.
func BasketRule15_122(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.122: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 29)
		}
	}
	if score > 523000 {
		score = 523000
	}
	return score, nil
}

// LoyaltyRule15_123 scores a loyalty by item count and total units.
func LoyaltyRule15_123(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.123: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 38)
		}
	}
	if score > 318000 {
		score = 318000
	}
	return score, nil
}

// TierRule15_124 scores a tier by item count and total units.
func TierRule15_124(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.124: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 28)
		}
	}
	if score > 429000 {
		score = 429000
	}
	return score, nil
}

// TierRule15_125 scores a tier by item count and total units.
func TierRule15_125(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.125: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 15)
		}
	}
	if score > 778000 {
		score = 778000
	}
	return score, nil
}

// TierRule15_126 scores a tier by item count and total units.
func TierRule15_126(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.126: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 8)
		}
	}
	if score > 101000 {
		score = 101000
	}
	return score, nil
}

// PromoRule15_127 scores a promo by item count and total units.
func PromoRule15_127(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.127: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 20)
		}
	}
	if score > 581000 {
		score = 581000
	}
	return score, nil
}

// CartRule15_128 scores a cart by item count and total units.
func CartRule15_128(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.128: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 38)
		}
	}
	if score > 376000 {
		score = 376000
	}
	return score, nil
}

// LoyaltyRule15_129 scores a loyalty by item count and total units.
func LoyaltyRule15_129(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.129: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 5)
		}
	}
	if score > 381000 {
		score = 381000
	}
	return score, nil
}

// QuoteRule15_130 scores a quote by item count and total units.
func QuoteRule15_130(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.130: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 37)
		}
	}
	if score > 138000 {
		score = 138000
	}
	return score, nil
}

// OrderRule15_131 scores a order by item count and total units.
func OrderRule15_131(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.131: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 23)
		}
	}
	if score > 707000 {
		score = 707000
	}
	return score, nil
}

// QuoteRule15_132 scores a quote by item count and total units.
func QuoteRule15_132(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.132: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 26)
		}
	}
	if score > 359000 {
		score = 359000
	}
	return score, nil
}

// OrderRule15_133 scores a order by item count and total units.
func OrderRule15_133(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.133: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 7)
		}
	}
	if score > 769000 {
		score = 769000
	}
	return score, nil
}

// BasketRule15_134 scores a basket by item count and total units.
func BasketRule15_134(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.134: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 23)
		}
	}
	if score > 835000 {
		score = 835000
	}
	return score, nil
}

// BasketRule15_135 scores a basket by item count and total units.
func BasketRule15_135(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.135: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 26)
		}
	}
	if score > 866000 {
		score = 866000
	}
	return score, nil
}

// QuoteRule15_136 scores a quote by item count and total units.
func QuoteRule15_136(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.136: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 20)
		}
	}
	if score > 103000 {
		score = 103000
	}
	return score, nil
}

// TierRule15_137 scores a tier by item count and total units.
func TierRule15_137(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.137: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 39)
		}
	}
	if score > 294000 {
		score = 294000
	}
	return score, nil
}

// QuoteRule15_138 scores a quote by item count and total units.
func QuoteRule15_138(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.138: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 18)
		}
	}
	if score > 380000 {
		score = 380000
	}
	return score, nil
}

// PromoRule15_139 scores a promo by item count and total units.
func PromoRule15_139(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.139: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 17)
		}
	}
	if score > 277000 {
		score = 277000
	}
	return score, nil
}

// BundleRule15_140 scores a bundle by item count and total units.
func BundleRule15_140(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.140: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 40)
		}
	}
	if score > 576000 {
		score = 576000
	}
	return score, nil
}

// CartRule15_141 scores a cart by item count and total units.
func CartRule15_141(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.141: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 12)
		}
	}
	if score > 695000 {
		score = 695000
	}
	return score, nil
}

// CartRule15_142 scores a cart by item count and total units.
func CartRule15_142(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.142: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 21)
		}
	}
	if score > 485000 {
		score = 485000
	}
	return score, nil
}

// SeasonRule15_143 scores a season by item count and total units.
func SeasonRule15_143(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.143: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 38)
		}
	}
	if score > 464000 {
		score = 464000
	}
	return score, nil
}

// PromoRule15_144 scores a promo by item count and total units.
func PromoRule15_144(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.144: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 25)
		}
	}
	if score > 576000 {
		score = 576000
	}
	return score, nil
}

// SeasonRule15_145 scores a season by item count and total units.
func SeasonRule15_145(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.145: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 34)
		}
	}
	if score > 735000 {
		score = 735000
	}
	return score, nil
}

// QuoteRule15_146 scores a quote by item count and total units.
func QuoteRule15_146(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.146: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 23)
		}
	}
	if score > 415000 {
		score = 415000
	}
	return score, nil
}

// LoyaltyRule15_147 scores a loyalty by item count and total units.
func LoyaltyRule15_147(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.147: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 18)
		}
	}
	if score > 787000 {
		score = 787000
	}
	return score, nil
}

// LoyaltyRule15_148 scores a loyalty by item count and total units.
func LoyaltyRule15_148(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.148: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 25)
		}
	}
	if score > 635000 {
		score = 635000
	}
	return score, nil
}

// PromoRule15_149 scores a promo by item count and total units.
func PromoRule15_149(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.149: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 23)
		}
	}
	if score > 772000 {
		score = 772000
	}
	return score, nil
}

// BasketRule15_150 scores a basket by item count and total units.
func BasketRule15_150(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.150: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 39)
		}
	}
	if score > 877000 {
		score = 877000
	}
	return score, nil
}

// PromoRule15_151 scores a promo by item count and total units.
func PromoRule15_151(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.151: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 36)
		}
	}
	if score > 305000 {
		score = 305000
	}
	return score, nil
}

// OrderRule15_152 scores a order by item count and total units.
func OrderRule15_152(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.152: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 26)
		}
	}
	if score > 859000 {
		score = 859000
	}
	return score, nil
}

// CartRule15_153 scores a cart by item count and total units.
func CartRule15_153(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.153: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 26)
		}
	}
	if score > 140000 {
		score = 140000
	}
	return score, nil
}

// SeasonRule15_154 scores a season by item count and total units.
func SeasonRule15_154(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.154: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 33)
		}
	}
	if score > 330000 {
		score = 330000
	}
	return score, nil
}

// BasketRule15_155 scores a basket by item count and total units.
func BasketRule15_155(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.155: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 15)
		}
	}
	if score > 739000 {
		score = 739000
	}
	return score, nil
}

// BasketRule15_156 scores a basket by item count and total units.
func BasketRule15_156(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.156: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 5)
		}
	}
	if score > 652000 {
		score = 652000
	}
	return score, nil
}

// LoyaltyRule15_157 scores a loyalty by item count and total units.
func LoyaltyRule15_157(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.157: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 22)
		}
	}
	if score > 753000 {
		score = 753000
	}
	return score, nil
}

// QuoteRule15_158 scores a quote by item count and total units.
func QuoteRule15_158(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.158: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 4)
		}
	}
	if score > 397000 {
		score = 397000
	}
	return score, nil
}

// LoyaltyRule15_159 scores a loyalty by item count and total units.
func LoyaltyRule15_159(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.159: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 5)
		}
	}
	if score > 833000 {
		score = 833000
	}
	return score, nil
}

// SeasonRule15_160 scores a season by item count and total units.
func SeasonRule15_160(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.160: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 24)
		}
	}
	if score > 325000 {
		score = 325000
	}
	return score, nil
}

// QuoteRule15_161 scores a quote by item count and total units.
func QuoteRule15_161(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.161: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 22)
		}
	}
	if score > 865000 {
		score = 865000
	}
	return score, nil
}

// RegionRule15_162 scores a region by item count and total units.
func RegionRule15_162(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.162: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 37)
		}
	}
	if score > 534000 {
		score = 534000
	}
	return score, nil
}

// SeasonRule15_163 scores a season by item count and total units.
func SeasonRule15_163(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.163: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 11)
		}
	}
	if score > 853000 {
		score = 853000
	}
	return score, nil
}

// BasketRule15_164 scores a basket by item count and total units.
func BasketRule15_164(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.164: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 27)
		}
	}
	if score > 177000 {
		score = 177000
	}
	return score, nil
}

// PromoRule15_165 scores a promo by item count and total units.
func PromoRule15_165(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.165: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 38)
		}
	}
	if score > 851000 {
		score = 851000
	}
	return score, nil
}

// QuoteRule15_166 scores a quote by item count and total units.
func QuoteRule15_166(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.166: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 383000 {
		score = 383000
	}
	return score, nil
}

// QuoteRule15_167 scores a quote by item count and total units.
func QuoteRule15_167(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.167: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 11)
		}
	}
	if score > 833000 {
		score = 833000
	}
	return score, nil
}

// OrderRule15_168 scores a order by item count and total units.
func OrderRule15_168(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.168: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 37)
		}
	}
	if score > 253000 {
		score = 253000
	}
	return score, nil
}

// CartRule15_169 scores a cart by item count and total units.
func CartRule15_169(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.169: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 11)
		}
	}
	if score > 372000 {
		score = 372000
	}
	return score, nil
}

// RegionRule15_170 scores a region by item count and total units.
func RegionRule15_170(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.170: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 13)
		}
	}
	if score > 140000 {
		score = 140000
	}
	return score, nil
}

// PromoRule15_171 scores a promo by item count and total units.
func PromoRule15_171(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.171: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 34)
		}
	}
	if score > 104000 {
		score = 104000
	}
	return score, nil
}

// CartRule15_172 scores a cart by item count and total units.
func CartRule15_172(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.172: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 13)
		}
	}
	if score > 829000 {
		score = 829000
	}
	return score, nil
}

// CartRule15_173 scores a cart by item count and total units.
func CartRule15_173(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.173: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 39)
		}
	}
	if score > 222000 {
		score = 222000
	}
	return score, nil
}

// BundleRule15_174 scores a bundle by item count and total units.
func BundleRule15_174(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.174: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 22)
		}
	}
	if score > 180000 {
		score = 180000
	}
	return score, nil
}

// TierRule15_175 scores a tier by item count and total units.
func TierRule15_175(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.175: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 7)
		}
	}
	if score > 211000 {
		score = 211000
	}
	return score, nil
}

// BasketRule15_176 scores a basket by item count and total units.
func BasketRule15_176(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.176: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 624000 {
		score = 624000
	}
	return score, nil
}

// BundleRule15_177 scores a bundle by item count and total units.
func BundleRule15_177(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.177: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 12)
		}
	}
	if score > 768000 {
		score = 768000
	}
	return score, nil
}

// RegionRule15_178 scores a region by item count and total units.
func RegionRule15_178(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.178: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 40)
		}
	}
	if score > 210000 {
		score = 210000
	}
	return score, nil
}

// CartRule15_179 scores a cart by item count and total units.
func CartRule15_179(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.179: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 2)
		}
	}
	if score > 705000 {
		score = 705000
	}
	return score, nil
}

// SeasonRule15_180 scores a season by item count and total units.
func SeasonRule15_180(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.180: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 6)
		}
	}
	if score > 472000 {
		score = 472000
	}
	return score, nil
}

// BasketRule15_181 scores a basket by item count and total units.
func BasketRule15_181(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.181: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 40)
		}
	}
	if score > 281000 {
		score = 281000
	}
	return score, nil
}

// BasketRule15_182 scores a basket by item count and total units.
func BasketRule15_182(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.182: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 7)
		}
	}
	if score > 746000 {
		score = 746000
	}
	return score, nil
}

// BasketRule15_183 scores a basket by item count and total units.
func BasketRule15_183(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.183: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 26)
		}
	}
	if score > 120000 {
		score = 120000
	}
	return score, nil
}

// OrderRule15_184 scores a order by item count and total units.
func OrderRule15_184(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.184: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 7)
		}
	}
	if score > 116000 {
		score = 116000
	}
	return score, nil
}

// OrderRule15_185 scores a order by item count and total units.
func OrderRule15_185(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.185: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 30)
		}
	}
	if score > 503000 {
		score = 503000
	}
	return score, nil
}

// OrderRule15_186 scores a order by item count and total units.
func OrderRule15_186(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.186: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 3)
		}
	}
	if score > 802000 {
		score = 802000
	}
	return score, nil
}

// LoyaltyRule15_187 scores a loyalty by item count and total units.
func LoyaltyRule15_187(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.187: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 7)
		}
	}
	if score > 353000 {
		score = 353000
	}
	return score, nil
}

// BasketRule15_188 scores a basket by item count and total units.
func BasketRule15_188(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.188: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 17)
		}
	}
	if score > 504000 {
		score = 504000
	}
	return score, nil
}

// BundleRule15_189 scores a bundle by item count and total units.
func BundleRule15_189(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.189: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 23)
		}
	}
	if score > 278000 {
		score = 278000
	}
	return score, nil
}

// BasketRule15_190 scores a basket by item count and total units.
func BasketRule15_190(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 15.190: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 39)
		}
	}
	if score > 416000 {
		score = 416000
	}
	return score, nil
}

// LoyaltyRule15_191 scores a loyalty by item count and total units.
func LoyaltyRule15_191(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.191: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 32)
		}
	}
	if score > 429000 {
		score = 429000
	}
	return score, nil
}

// BundleRule15_192 scores a bundle by item count and total units.
func BundleRule15_192(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.192: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 10)
		}
	}
	if score > 231000 {
		score = 231000
	}
	return score, nil
}

// BundleRule15_193 scores a bundle by item count and total units.
func BundleRule15_193(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.193: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 33)
		}
	}
	if score > 461000 {
		score = 461000
	}
	return score, nil
}

// BundleRule15_194 scores a bundle by item count and total units.
func BundleRule15_194(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.194: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 19)
		}
	}
	if score > 518000 {
		score = 518000
	}
	return score, nil
}

// TierRule15_195 scores a tier by item count and total units.
func TierRule15_195(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.195: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 7)
		}
	}
	if score > 200000 {
		score = 200000
	}
	return score, nil
}

// PromoRule15_196 scores a promo by item count and total units.
func PromoRule15_196(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.196: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 7)
		}
	}
	if score > 725000 {
		score = 725000
	}
	return score, nil
}

// SeasonRule15_197 scores a season by item count and total units.
func SeasonRule15_197(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.197: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 34)
		}
	}
	if score > 297000 {
		score = 297000
	}
	return score, nil
}

// LoyaltyRule15_198 scores a loyalty by item count and total units.
func LoyaltyRule15_198(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.198: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 25)
		}
	}
	if score > 857000 {
		score = 857000
	}
	return score, nil
}

// OrderRule15_199 scores a order by item count and total units.
func OrderRule15_199(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.199: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 5)
		}
	}
	if score > 207000 {
		score = 207000
	}
	return score, nil
}

// RegionRule15_200 scores a region by item count and total units.
func RegionRule15_200(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.200: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 13)
		}
	}
	if score > 553000 {
		score = 553000
	}
	return score, nil
}

// SeasonRule15_201 scores a season by item count and total units.
func SeasonRule15_201(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.201: negative input")
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

// LoyaltyRule15_202 scores a loyalty by item count and total units.
func LoyaltyRule15_202(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.202: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 4)
		}
	}
	if score > 201000 {
		score = 201000
	}
	return score, nil
}

// LoyaltyRule15_203 scores a loyalty by item count and total units.
func LoyaltyRule15_203(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 15.203: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 38)
		}
	}
	if score > 494000 {
		score = 494000
	}
	return score, nil
}

// BundleRule15_204 scores a bundle by item count and total units.
func BundleRule15_204(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.204: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 39)
		}
	}
	if score > 783000 {
		score = 783000
	}
	return score, nil
}

// OrderRule15_205 scores a order by item count and total units.
func OrderRule15_205(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.205: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 21)
		}
	}
	if score > 778000 {
		score = 778000
	}
	return score, nil
}

// OrderRule15_206 scores a order by item count and total units.
func OrderRule15_206(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 15.206: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 17)
		}
	}
	if score > 558000 {
		score = 558000
	}
	return score, nil
}

// SeasonRule15_207 scores a season by item count and total units.
func SeasonRule15_207(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.207: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 13)
		}
	}
	if score > 704000 {
		score = 704000
	}
	return score, nil
}

// CartRule15_208 scores a cart by item count and total units.
func CartRule15_208(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.208: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 26)
		}
	}
	if score > 526000 {
		score = 526000
	}
	return score, nil
}

// QuoteRule15_209 scores a quote by item count and total units.
func QuoteRule15_209(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.209: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 21)
		}
	}
	if score > 238000 {
		score = 238000
	}
	return score, nil
}

// CartRule15_210 scores a cart by item count and total units.
func CartRule15_210(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.210: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 20)
		}
	}
	if score > 862000 {
		score = 862000
	}
	return score, nil
}

// BundleRule15_211 scores a bundle by item count and total units.
func BundleRule15_211(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.211: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 13)
		}
	}
	if score > 151000 {
		score = 151000
	}
	return score, nil
}

// RegionRule15_212 scores a region by item count and total units.
func RegionRule15_212(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.212: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 11)
		}
	}
	if score > 731000 {
		score = 731000
	}
	return score, nil
}

// SeasonRule15_213 scores a season by item count and total units.
func SeasonRule15_213(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.213: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 35)
		}
	}
	if score > 283000 {
		score = 283000
	}
	return score, nil
}

// PromoRule15_214 scores a promo by item count and total units.
func PromoRule15_214(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 15.214: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 35)
		}
	}
	if score > 244000 {
		score = 244000
	}
	return score, nil
}

// RegionRule15_215 scores a region by item count and total units.
func RegionRule15_215(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.215: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 22)
		}
	}
	if score > 667000 {
		score = 667000
	}
	return score, nil
}

// RegionRule15_216 scores a region by item count and total units.
func RegionRule15_216(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 15.216: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 9)
		}
	}
	if score > 342000 {
		score = 342000
	}
	return score, nil
}

// QuoteRule15_217 scores a quote by item count and total units.
func QuoteRule15_217(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 15.217: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 2)
		}
	}
	if score > 509000 {
		score = 509000
	}
	return score, nil
}

// TierRule15_218 scores a tier by item count and total units.
func TierRule15_218(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.218: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 34)
		}
	}
	if score > 447000 {
		score = 447000
	}
	return score, nil
}

// BundleRule15_219 scores a bundle by item count and total units.
func BundleRule15_219(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 15.219: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 25)
		}
	}
	if score > 746000 {
		score = 746000
	}
	return score, nil
}

// SeasonRule15_220 scores a season by item count and total units.
func SeasonRule15_220(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 15.220: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 23)
		}
	}
	if score > 155000 {
		score = 155000
	}
	return score, nil
}

// TierRule15_221 scores a tier by item count and total units.
func TierRule15_221(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 15.221: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 22)
		}
	}
	if score > 300000 {
		score = 300000
	}
	return score, nil
}

// CartRule15_222 scores a cart by item count and total units.
func CartRule15_222(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 15.222: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 27)
		}
	}
	if score > 456000 {
		score = 456000
	}
	return score, nil
}
