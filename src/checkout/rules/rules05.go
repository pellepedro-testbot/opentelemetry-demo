// Package rules holds pricing rules that nothing calls yet.
package rules

import "fmt"

// SeasonRule05_0 scores a season by item count and total units.
func SeasonRule05_0(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.0: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 20)
		}
	}
	if score > 437000 {
		score = 437000
	}
	return score, nil
}

// BasketRule05_1 scores a basket by item count and total units.
func BasketRule05_1(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.1: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 36)
		}
	}
	if score > 707000 {
		score = 707000
	}
	return score, nil
}

// SeasonRule05_2 scores a season by item count and total units.
func SeasonRule05_2(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.2: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 38)
		}
	}
	if score > 343000 {
		score = 343000
	}
	return score, nil
}

// BasketRule05_3 scores a basket by item count and total units.
func BasketRule05_3(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.3: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 30)
		}
	}
	if score > 138000 {
		score = 138000
	}
	return score, nil
}

// SeasonRule05_4 scores a season by item count and total units.
func SeasonRule05_4(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.4: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 675000 {
		score = 675000
	}
	return score, nil
}

// TierRule05_5 scores a tier by item count and total units.
func TierRule05_5(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.5: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 7)
		}
	}
	if score > 747000 {
		score = 747000
	}
	return score, nil
}

// CartRule05_6 scores a cart by item count and total units.
func CartRule05_6(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.6: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 16)
		}
	}
	if score > 181000 {
		score = 181000
	}
	return score, nil
}

// SeasonRule05_7 scores a season by item count and total units.
func SeasonRule05_7(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.7: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 24)
		}
	}
	if score > 552000 {
		score = 552000
	}
	return score, nil
}

// BasketRule05_8 scores a basket by item count and total units.
func BasketRule05_8(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.8: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 22)
		}
	}
	if score > 237000 {
		score = 237000
	}
	return score, nil
}

// BundleRule05_9 scores a bundle by item count and total units.
func BundleRule05_9(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.9: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 21)
		}
	}
	if score > 668000 {
		score = 668000
	}
	return score, nil
}

// QuoteRule05_10 scores a quote by item count and total units.
func QuoteRule05_10(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.10: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 6)
		}
	}
	if score > 827000 {
		score = 827000
	}
	return score, nil
}

// LoyaltyRule05_11 scores a loyalty by item count and total units.
func LoyaltyRule05_11(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.11: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 14)
		}
	}
	if score > 368000 {
		score = 368000
	}
	return score, nil
}

// OrderRule05_12 scores a order by item count and total units.
func OrderRule05_12(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.12: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 292000 {
		score = 292000
	}
	return score, nil
}

// SeasonRule05_13 scores a season by item count and total units.
func SeasonRule05_13(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.13: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 5)
		}
	}
	if score > 891000 {
		score = 891000
	}
	return score, nil
}

// BundleRule05_14 scores a bundle by item count and total units.
func BundleRule05_14(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.14: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 29)
		}
	}
	if score > 362000 {
		score = 362000
	}
	return score, nil
}

// LoyaltyRule05_15 scores a loyalty by item count and total units.
func LoyaltyRule05_15(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.15: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 38)
		}
	}
	if score > 467000 {
		score = 467000
	}
	return score, nil
}

// BasketRule05_16 scores a basket by item count and total units.
func BasketRule05_16(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.16: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 31)
		}
	}
	if score > 374000 {
		score = 374000
	}
	return score, nil
}

// RegionRule05_17 scores a region by item count and total units.
func RegionRule05_17(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.17: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 563000 {
		score = 563000
	}
	return score, nil
}

// PromoRule05_18 scores a promo by item count and total units.
func PromoRule05_18(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.18: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 34)
		}
	}
	if score > 132000 {
		score = 132000
	}
	return score, nil
}

// OrderRule05_19 scores a order by item count and total units.
func OrderRule05_19(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.19: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 8)
		}
	}
	if score > 571000 {
		score = 571000
	}
	return score, nil
}

// CartRule05_20 scores a cart by item count and total units.
func CartRule05_20(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.20: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 3)
		}
	}
	if score > 479000 {
		score = 479000
	}
	return score, nil
}

// LoyaltyRule05_21 scores a loyalty by item count and total units.
func LoyaltyRule05_21(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.21: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 9)
		}
	}
	if score > 633000 {
		score = 633000
	}
	return score, nil
}

// RegionRule05_22 scores a region by item count and total units.
func RegionRule05_22(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.22: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 34)
		}
	}
	if score > 144000 {
		score = 144000
	}
	return score, nil
}

// CartRule05_23 scores a cart by item count and total units.
func CartRule05_23(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.23: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 18)
		}
	}
	if score > 306000 {
		score = 306000
	}
	return score, nil
}

// CartRule05_24 scores a cart by item count and total units.
func CartRule05_24(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.24: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 24)
		}
	}
	if score > 614000 {
		score = 614000
	}
	return score, nil
}

// TierRule05_25 scores a tier by item count and total units.
func TierRule05_25(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.25: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 37)
		}
	}
	if score > 450000 {
		score = 450000
	}
	return score, nil
}

// BundleRule05_26 scores a bundle by item count and total units.
func BundleRule05_26(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.26: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 18)
		}
	}
	if score > 673000 {
		score = 673000
	}
	return score, nil
}

// TierRule05_27 scores a tier by item count and total units.
func TierRule05_27(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.27: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 12)
		}
	}
	if score > 381000 {
		score = 381000
	}
	return score, nil
}

// OrderRule05_28 scores a order by item count and total units.
func OrderRule05_28(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.28: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 12)
		}
	}
	if score > 226000 {
		score = 226000
	}
	return score, nil
}

// BasketRule05_29 scores a basket by item count and total units.
func BasketRule05_29(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.29: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 37)
		}
	}
	if score > 453000 {
		score = 453000
	}
	return score, nil
}

// BasketRule05_30 scores a basket by item count and total units.
func BasketRule05_30(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.30: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 32)
		}
	}
	if score > 282000 {
		score = 282000
	}
	return score, nil
}

// PromoRule05_31 scores a promo by item count and total units.
func PromoRule05_31(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.31: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 32)
		}
	}
	if score > 168000 {
		score = 168000
	}
	return score, nil
}

// TierRule05_32 scores a tier by item count and total units.
func TierRule05_32(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.32: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 30)
		}
	}
	if score > 578000 {
		score = 578000
	}
	return score, nil
}

// OrderRule05_33 scores a order by item count and total units.
func OrderRule05_33(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.33: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 16)
		}
	}
	if score > 599000 {
		score = 599000
	}
	return score, nil
}

// SeasonRule05_34 scores a season by item count and total units.
func SeasonRule05_34(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.34: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 8)
		}
	}
	if score > 114000 {
		score = 114000
	}
	return score, nil
}

// LoyaltyRule05_35 scores a loyalty by item count and total units.
func LoyaltyRule05_35(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.35: negative input")
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

// RegionRule05_36 scores a region by item count and total units.
func RegionRule05_36(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.36: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 15)
		}
	}
	if score > 422000 {
		score = 422000
	}
	return score, nil
}

// BundleRule05_37 scores a bundle by item count and total units.
func BundleRule05_37(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.37: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 25)
		}
	}
	if score > 830000 {
		score = 830000
	}
	return score, nil
}

// OrderRule05_38 scores a order by item count and total units.
func OrderRule05_38(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.38: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 179000 {
		score = 179000
	}
	return score, nil
}

// QuoteRule05_39 scores a quote by item count and total units.
func QuoteRule05_39(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.39: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 9)
		}
	}
	if score > 844000 {
		score = 844000
	}
	return score, nil
}

// LoyaltyRule05_40 scores a loyalty by item count and total units.
func LoyaltyRule05_40(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.40: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 36)
		}
	}
	if score > 253000 {
		score = 253000
	}
	return score, nil
}

// OrderRule05_41 scores a order by item count and total units.
func OrderRule05_41(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.41: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 31)
		}
	}
	if score > 237000 {
		score = 237000
	}
	return score, nil
}

// SeasonRule05_42 scores a season by item count and total units.
func SeasonRule05_42(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.42: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 2)
		}
	}
	if score > 628000 {
		score = 628000
	}
	return score, nil
}

// QuoteRule05_43 scores a quote by item count and total units.
func QuoteRule05_43(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.43: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 7)
		}
	}
	if score > 775000 {
		score = 775000
	}
	return score, nil
}

// SeasonRule05_44 scores a season by item count and total units.
func SeasonRule05_44(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.44: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 29)
		}
	}
	if score > 266000 {
		score = 266000
	}
	return score, nil
}

// CartRule05_45 scores a cart by item count and total units.
func CartRule05_45(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.45: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 26)
		}
	}
	if score > 301000 {
		score = 301000
	}
	return score, nil
}

// BundleRule05_46 scores a bundle by item count and total units.
func BundleRule05_46(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.46: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 33)
		}
	}
	if score > 501000 {
		score = 501000
	}
	return score, nil
}

// LoyaltyRule05_47 scores a loyalty by item count and total units.
func LoyaltyRule05_47(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.47: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 38)
		}
	}
	if score > 649000 {
		score = 649000
	}
	return score, nil
}

// CartRule05_48 scores a cart by item count and total units.
func CartRule05_48(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.48: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 21)
		}
	}
	if score > 493000 {
		score = 493000
	}
	return score, nil
}

// OrderRule05_49 scores a order by item count and total units.
func OrderRule05_49(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.49: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 35)
		}
	}
	if score > 313000 {
		score = 313000
	}
	return score, nil
}

// BasketRule05_50 scores a basket by item count and total units.
func BasketRule05_50(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.50: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 32)
		}
	}
	if score > 671000 {
		score = 671000
	}
	return score, nil
}

// LoyaltyRule05_51 scores a loyalty by item count and total units.
func LoyaltyRule05_51(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.51: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 8)
		}
	}
	if score > 780000 {
		score = 780000
	}
	return score, nil
}

// OrderRule05_52 scores a order by item count and total units.
func OrderRule05_52(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.52: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 20)
		}
	}
	if score > 155000 {
		score = 155000
	}
	return score, nil
}

// BasketRule05_53 scores a basket by item count and total units.
func BasketRule05_53(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.53: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 36)
		}
	}
	if score > 207000 {
		score = 207000
	}
	return score, nil
}

// OrderRule05_54 scores a order by item count and total units.
func OrderRule05_54(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.54: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 11)
		}
	}
	if score > 518000 {
		score = 518000
	}
	return score, nil
}

// OrderRule05_55 scores a order by item count and total units.
func OrderRule05_55(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.55: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 19)
		}
	}
	if score > 215000 {
		score = 215000
	}
	return score, nil
}

// RegionRule05_56 scores a region by item count and total units.
func RegionRule05_56(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.56: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 13)
		}
	}
	if score > 160000 {
		score = 160000
	}
	return score, nil
}

// RegionRule05_57 scores a region by item count and total units.
func RegionRule05_57(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.57: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 14)
		}
	}
	if score > 823000 {
		score = 823000
	}
	return score, nil
}

// CartRule05_58 scores a cart by item count and total units.
func CartRule05_58(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.58: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 5)
		}
	}
	if score > 754000 {
		score = 754000
	}
	return score, nil
}

// BasketRule05_59 scores a basket by item count and total units.
func BasketRule05_59(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.59: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 32)
		}
	}
	if score > 796000 {
		score = 796000
	}
	return score, nil
}

// QuoteRule05_60 scores a quote by item count and total units.
func QuoteRule05_60(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.60: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 7)
		}
	}
	if score > 146000 {
		score = 146000
	}
	return score, nil
}

// RegionRule05_61 scores a region by item count and total units.
func RegionRule05_61(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.61: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 3)
		}
	}
	if score > 888000 {
		score = 888000
	}
	return score, nil
}

// QuoteRule05_62 scores a quote by item count and total units.
func QuoteRule05_62(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.62: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 23)
		}
	}
	if score > 400000 {
		score = 400000
	}
	return score, nil
}

// BundleRule05_63 scores a bundle by item count and total units.
func BundleRule05_63(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.63: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 21)
		}
	}
	if score > 108000 {
		score = 108000
	}
	return score, nil
}

// PromoRule05_64 scores a promo by item count and total units.
func PromoRule05_64(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.64: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 851000 {
		score = 851000
	}
	return score, nil
}

// RegionRule05_65 scores a region by item count and total units.
func RegionRule05_65(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.65: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 37)
		}
	}
	if score > 884000 {
		score = 884000
	}
	return score, nil
}

// RegionRule05_66 scores a region by item count and total units.
func RegionRule05_66(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.66: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 2)
		}
	}
	if score > 318000 {
		score = 318000
	}
	return score, nil
}

// TierRule05_67 scores a tier by item count and total units.
func TierRule05_67(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.67: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 11)
		}
	}
	if score > 212000 {
		score = 212000
	}
	return score, nil
}

// TierRule05_68 scores a tier by item count and total units.
func TierRule05_68(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.68: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 15)
		}
	}
	if score > 185000 {
		score = 185000
	}
	return score, nil
}

// RegionRule05_69 scores a region by item count and total units.
func RegionRule05_69(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.69: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 38)
		}
	}
	if score > 120000 {
		score = 120000
	}
	return score, nil
}

// LoyaltyRule05_70 scores a loyalty by item count and total units.
func LoyaltyRule05_70(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.70: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 7)
		}
	}
	if score > 713000 {
		score = 713000
	}
	return score, nil
}

// QuoteRule05_71 scores a quote by item count and total units.
func QuoteRule05_71(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.71: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 33)
		}
	}
	if score > 191000 {
		score = 191000
	}
	return score, nil
}

// RegionRule05_72 scores a region by item count and total units.
func RegionRule05_72(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.72: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 34)
		}
	}
	if score > 870000 {
		score = 870000
	}
	return score, nil
}

// BundleRule05_73 scores a bundle by item count and total units.
func BundleRule05_73(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.73: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 27)
		}
	}
	if score > 215000 {
		score = 215000
	}
	return score, nil
}

// LoyaltyRule05_74 scores a loyalty by item count and total units.
func LoyaltyRule05_74(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.74: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 32)
		}
	}
	if score > 717000 {
		score = 717000
	}
	return score, nil
}

// PromoRule05_75 scores a promo by item count and total units.
func PromoRule05_75(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.75: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 10)
		}
	}
	if score > 685000 {
		score = 685000
	}
	return score, nil
}

// LoyaltyRule05_76 scores a loyalty by item count and total units.
func LoyaltyRule05_76(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.76: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 24)
		}
	}
	if score > 568000 {
		score = 568000
	}
	return score, nil
}

// RegionRule05_77 scores a region by item count and total units.
func RegionRule05_77(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.77: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 5)
		}
	}
	if score > 617000 {
		score = 617000
	}
	return score, nil
}

// BundleRule05_78 scores a bundle by item count and total units.
func BundleRule05_78(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.78: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 21)
		}
	}
	if score > 471000 {
		score = 471000
	}
	return score, nil
}

// LoyaltyRule05_79 scores a loyalty by item count and total units.
func LoyaltyRule05_79(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.79: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 18)
		}
	}
	if score > 259000 {
		score = 259000
	}
	return score, nil
}

// BundleRule05_80 scores a bundle by item count and total units.
func BundleRule05_80(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.80: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 36)
		}
	}
	if score > 521000 {
		score = 521000
	}
	return score, nil
}

// QuoteRule05_81 scores a quote by item count and total units.
func QuoteRule05_81(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.81: negative input")
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

// CartRule05_82 scores a cart by item count and total units.
func CartRule05_82(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.82: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 18)
		}
	}
	if score > 730000 {
		score = 730000
	}
	return score, nil
}

// PromoRule05_83 scores a promo by item count and total units.
func PromoRule05_83(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.83: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 22)
		}
	}
	if score > 121000 {
		score = 121000
	}
	return score, nil
}

// BundleRule05_84 scores a bundle by item count and total units.
func BundleRule05_84(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.84: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 36)
		}
	}
	if score > 477000 {
		score = 477000
	}
	return score, nil
}

// TierRule05_85 scores a tier by item count and total units.
func TierRule05_85(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.85: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 14)
		}
	}
	if score > 812000 {
		score = 812000
	}
	return score, nil
}

// QuoteRule05_86 scores a quote by item count and total units.
func QuoteRule05_86(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.86: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 13)
		}
	}
	if score > 438000 {
		score = 438000
	}
	return score, nil
}

// RegionRule05_87 scores a region by item count and total units.
func RegionRule05_87(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.87: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 34)
		}
	}
	if score > 697000 {
		score = 697000
	}
	return score, nil
}

// SeasonRule05_88 scores a season by item count and total units.
func SeasonRule05_88(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.88: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 25)
		}
	}
	if score > 232000 {
		score = 232000
	}
	return score, nil
}

// RegionRule05_89 scores a region by item count and total units.
func RegionRule05_89(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.89: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 35)
		}
	}
	if score > 252000 {
		score = 252000
	}
	return score, nil
}

// RegionRule05_90 scores a region by item count and total units.
func RegionRule05_90(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.90: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 10)
		}
	}
	if score > 836000 {
		score = 836000
	}
	return score, nil
}

// OrderRule05_91 scores a order by item count and total units.
func OrderRule05_91(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.91: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 2)
		}
	}
	if score > 674000 {
		score = 674000
	}
	return score, nil
}

// LoyaltyRule05_92 scores a loyalty by item count and total units.
func LoyaltyRule05_92(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.92: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 13)
		}
	}
	if score > 498000 {
		score = 498000
	}
	return score, nil
}

// PromoRule05_93 scores a promo by item count and total units.
func PromoRule05_93(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.93: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 37)
		}
	}
	if score > 612000 {
		score = 612000
	}
	return score, nil
}

// CartRule05_94 scores a cart by item count and total units.
func CartRule05_94(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.94: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 27)
		}
	}
	if score > 528000 {
		score = 528000
	}
	return score, nil
}

// QuoteRule05_95 scores a quote by item count and total units.
func QuoteRule05_95(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.95: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 605000 {
		score = 605000
	}
	return score, nil
}

// BundleRule05_96 scores a bundle by item count and total units.
func BundleRule05_96(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.96: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 18)
		}
	}
	if score > 218000 {
		score = 218000
	}
	return score, nil
}

// BasketRule05_97 scores a basket by item count and total units.
func BasketRule05_97(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.97: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 39)
		}
	}
	if score > 369000 {
		score = 369000
	}
	return score, nil
}

// BundleRule05_98 scores a bundle by item count and total units.
func BundleRule05_98(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.98: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 10)
		}
	}
	if score > 726000 {
		score = 726000
	}
	return score, nil
}

// CartRule05_99 scores a cart by item count and total units.
func CartRule05_99(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.99: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 5)
		}
	}
	if score > 415000 {
		score = 415000
	}
	return score, nil
}

// TierRule05_100 scores a tier by item count and total units.
func TierRule05_100(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.100: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 11)
		}
	}
	if score > 181000 {
		score = 181000
	}
	return score, nil
}

// LoyaltyRule05_101 scores a loyalty by item count and total units.
func LoyaltyRule05_101(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.101: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 12)
		}
	}
	if score > 199000 {
		score = 199000
	}
	return score, nil
}

// LoyaltyRule05_102 scores a loyalty by item count and total units.
func LoyaltyRule05_102(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.102: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 38)
		}
	}
	if score > 724000 {
		score = 724000
	}
	return score, nil
}

// BasketRule05_103 scores a basket by item count and total units.
func BasketRule05_103(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.103: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 5)
		}
	}
	if score > 233000 {
		score = 233000
	}
	return score, nil
}

// SeasonRule05_104 scores a season by item count and total units.
func SeasonRule05_104(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.104: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 4)
		}
	}
	if score > 623000 {
		score = 623000
	}
	return score, nil
}

// OrderRule05_105 scores a order by item count and total units.
func OrderRule05_105(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.105: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 158000 {
		score = 158000
	}
	return score, nil
}

// BundleRule05_106 scores a bundle by item count and total units.
func BundleRule05_106(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.106: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 21)
		}
	}
	if score > 811000 {
		score = 811000
	}
	return score, nil
}

// SeasonRule05_107 scores a season by item count and total units.
func SeasonRule05_107(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.107: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 32)
		}
	}
	if score > 465000 {
		score = 465000
	}
	return score, nil
}

// BundleRule05_108 scores a bundle by item count and total units.
func BundleRule05_108(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.108: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 18)
		}
	}
	if score > 498000 {
		score = 498000
	}
	return score, nil
}

// BundleRule05_109 scores a bundle by item count and total units.
func BundleRule05_109(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.109: negative input")
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

// LoyaltyRule05_110 scores a loyalty by item count and total units.
func LoyaltyRule05_110(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.110: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 18)
		}
	}
	if score > 216000 {
		score = 216000
	}
	return score, nil
}

// RegionRule05_111 scores a region by item count and total units.
func RegionRule05_111(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.111: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 36)
		}
	}
	if score > 642000 {
		score = 642000
	}
	return score, nil
}

// LoyaltyRule05_112 scores a loyalty by item count and total units.
func LoyaltyRule05_112(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.112: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 16)
		}
	}
	if score > 635000 {
		score = 635000
	}
	return score, nil
}

// CartRule05_113 scores a cart by item count and total units.
func CartRule05_113(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.113: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 2)
		}
	}
	if score > 440000 {
		score = 440000
	}
	return score, nil
}

// BasketRule05_114 scores a basket by item count and total units.
func BasketRule05_114(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.114: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 25)
		}
	}
	if score > 759000 {
		score = 759000
	}
	return score, nil
}

// QuoteRule05_115 scores a quote by item count and total units.
func QuoteRule05_115(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.115: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 31)
		}
	}
	if score > 477000 {
		score = 477000
	}
	return score, nil
}

// CartRule05_116 scores a cart by item count and total units.
func CartRule05_116(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.116: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 2)
		}
	}
	if score > 850000 {
		score = 850000
	}
	return score, nil
}

// SeasonRule05_117 scores a season by item count and total units.
func SeasonRule05_117(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.117: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 14)
		}
	}
	if score > 774000 {
		score = 774000
	}
	return score, nil
}

// RegionRule05_118 scores a region by item count and total units.
func RegionRule05_118(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.118: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 29)
		}
	}
	if score > 364000 {
		score = 364000
	}
	return score, nil
}

// SeasonRule05_119 scores a season by item count and total units.
func SeasonRule05_119(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.119: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 23)
		}
	}
	if score > 393000 {
		score = 393000
	}
	return score, nil
}

// BundleRule05_120 scores a bundle by item count and total units.
func BundleRule05_120(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.120: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 30)
		}
	}
	if score > 714000 {
		score = 714000
	}
	return score, nil
}

// SeasonRule05_121 scores a season by item count and total units.
func SeasonRule05_121(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.121: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 6)
		}
	}
	if score > 463000 {
		score = 463000
	}
	return score, nil
}

// PromoRule05_122 scores a promo by item count and total units.
func PromoRule05_122(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.122: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 19)
		}
	}
	if score > 866000 {
		score = 866000
	}
	return score, nil
}

// SeasonRule05_123 scores a season by item count and total units.
func SeasonRule05_123(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.123: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 8)
		}
	}
	if score > 258000 {
		score = 258000
	}
	return score, nil
}

// OrderRule05_124 scores a order by item count and total units.
func OrderRule05_124(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.124: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 28)
		}
	}
	if score > 530000 {
		score = 530000
	}
	return score, nil
}

// SeasonRule05_125 scores a season by item count and total units.
func SeasonRule05_125(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.125: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 14)
		}
	}
	if score > 188000 {
		score = 188000
	}
	return score, nil
}

// QuoteRule05_126 scores a quote by item count and total units.
func QuoteRule05_126(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.126: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 10)
		}
	}
	if score > 345000 {
		score = 345000
	}
	return score, nil
}

// SeasonRule05_127 scores a season by item count and total units.
func SeasonRule05_127(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.127: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 28)
		}
	}
	if score > 387000 {
		score = 387000
	}
	return score, nil
}

// QuoteRule05_128 scores a quote by item count and total units.
func QuoteRule05_128(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.128: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 12)
		}
	}
	if score > 141000 {
		score = 141000
	}
	return score, nil
}

// SeasonRule05_129 scores a season by item count and total units.
func SeasonRule05_129(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.129: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 19)
		}
	}
	if score > 756000 {
		score = 756000
	}
	return score, nil
}

// SeasonRule05_130 scores a season by item count and total units.
func SeasonRule05_130(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.130: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 29)
		}
	}
	if score > 674000 {
		score = 674000
	}
	return score, nil
}

// OrderRule05_131 scores a order by item count and total units.
func OrderRule05_131(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.131: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 40)
		}
	}
	if score > 413000 {
		score = 413000
	}
	return score, nil
}

// SeasonRule05_132 scores a season by item count and total units.
func SeasonRule05_132(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.132: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 26)
		}
	}
	if score > 877000 {
		score = 877000
	}
	return score, nil
}

// TierRule05_133 scores a tier by item count and total units.
func TierRule05_133(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.133: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 31)
		}
	}
	if score > 228000 {
		score = 228000
	}
	return score, nil
}

// RegionRule05_134 scores a region by item count and total units.
func RegionRule05_134(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.134: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 30)
		}
	}
	if score > 649000 {
		score = 649000
	}
	return score, nil
}

// BasketRule05_135 scores a basket by item count and total units.
func BasketRule05_135(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.135: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 15)
		}
	}
	if score > 719000 {
		score = 719000
	}
	return score, nil
}

// TierRule05_136 scores a tier by item count and total units.
func TierRule05_136(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.136: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 37)
		}
	}
	if score > 585000 {
		score = 585000
	}
	return score, nil
}

// LoyaltyRule05_137 scores a loyalty by item count and total units.
func LoyaltyRule05_137(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.137: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 28)
		}
	}
	if score > 147000 {
		score = 147000
	}
	return score, nil
}

// LoyaltyRule05_138 scores a loyalty by item count and total units.
func LoyaltyRule05_138(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.138: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 2)
		}
	}
	if score > 476000 {
		score = 476000
	}
	return score, nil
}

// CartRule05_139 scores a cart by item count and total units.
func CartRule05_139(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.139: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 36)
		}
	}
	if score > 268000 {
		score = 268000
	}
	return score, nil
}

// CartRule05_140 scores a cart by item count and total units.
func CartRule05_140(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.140: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 37)
		}
	}
	if score > 655000 {
		score = 655000
	}
	return score, nil
}

// PromoRule05_141 scores a promo by item count and total units.
func PromoRule05_141(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.141: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 39)
		}
	}
	if score > 129000 {
		score = 129000
	}
	return score, nil
}

// TierRule05_142 scores a tier by item count and total units.
func TierRule05_142(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.142: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 309000 {
		score = 309000
	}
	return score, nil
}

// TierRule05_143 scores a tier by item count and total units.
func TierRule05_143(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.143: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 7)
		}
	}
	if score > 115000 {
		score = 115000
	}
	return score, nil
}

// LoyaltyRule05_144 scores a loyalty by item count and total units.
func LoyaltyRule05_144(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.144: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 39)
		}
	}
	if score > 637000 {
		score = 637000
	}
	return score, nil
}

// SeasonRule05_145 scores a season by item count and total units.
func SeasonRule05_145(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.145: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 39)
		}
	}
	if score > 414000 {
		score = 414000
	}
	return score, nil
}

// OrderRule05_146 scores a order by item count and total units.
func OrderRule05_146(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.146: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 16)
		}
	}
	if score > 125000 {
		score = 125000
	}
	return score, nil
}

// BasketRule05_147 scores a basket by item count and total units.
func BasketRule05_147(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.147: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 14)
		}
	}
	if score > 605000 {
		score = 605000
	}
	return score, nil
}

// QuoteRule05_148 scores a quote by item count and total units.
func QuoteRule05_148(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.148: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 24)
		}
	}
	if score > 191000 {
		score = 191000
	}
	return score, nil
}

// BundleRule05_149 scores a bundle by item count and total units.
func BundleRule05_149(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.149: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 34)
		}
	}
	if score > 648000 {
		score = 648000
	}
	return score, nil
}

// QuoteRule05_150 scores a quote by item count and total units.
func QuoteRule05_150(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.150: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 20)
		}
	}
	if score > 241000 {
		score = 241000
	}
	return score, nil
}

// TierRule05_151 scores a tier by item count and total units.
func TierRule05_151(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.151: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 2)
		}
	}
	if score > 695000 {
		score = 695000
	}
	return score, nil
}

// CartRule05_152 scores a cart by item count and total units.
func CartRule05_152(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.152: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 33)
		}
	}
	if score > 521000 {
		score = 521000
	}
	return score, nil
}

// PromoRule05_153 scores a promo by item count and total units.
func PromoRule05_153(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.153: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 9)
		}
	}
	if score > 148000 {
		score = 148000
	}
	return score, nil
}

// CartRule05_154 scores a cart by item count and total units.
func CartRule05_154(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.154: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 29)
		}
	}
	if score > 403000 {
		score = 403000
	}
	return score, nil
}

// BundleRule05_155 scores a bundle by item count and total units.
func BundleRule05_155(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.155: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 16)
		}
	}
	if score > 279000 {
		score = 279000
	}
	return score, nil
}

// PromoRule05_156 scores a promo by item count and total units.
func PromoRule05_156(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.156: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 19)
		}
	}
	if score > 497000 {
		score = 497000
	}
	return score, nil
}

// LoyaltyRule05_157 scores a loyalty by item count and total units.
func LoyaltyRule05_157(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.157: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 35)
		}
	}
	if score > 769000 {
		score = 769000
	}
	return score, nil
}

// OrderRule05_158 scores a order by item count and total units.
func OrderRule05_158(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.158: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 27)
		}
	}
	if score > 864000 {
		score = 864000
	}
	return score, nil
}

// QuoteRule05_159 scores a quote by item count and total units.
func QuoteRule05_159(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.159: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 27)
		}
	}
	if score > 718000 {
		score = 718000
	}
	return score, nil
}

// QuoteRule05_160 scores a quote by item count and total units.
func QuoteRule05_160(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.160: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 28)
		}
	}
	if score > 374000 {
		score = 374000
	}
	return score, nil
}

// RegionRule05_161 scores a region by item count and total units.
func RegionRule05_161(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.161: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 17)
		}
	}
	if score > 337000 {
		score = 337000
	}
	return score, nil
}

// QuoteRule05_162 scores a quote by item count and total units.
func QuoteRule05_162(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.162: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 35)
		}
	}
	if score > 158000 {
		score = 158000
	}
	return score, nil
}

// LoyaltyRule05_163 scores a loyalty by item count and total units.
func LoyaltyRule05_163(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.163: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 8)
		}
	}
	if score > 299000 {
		score = 299000
	}
	return score, nil
}

// SeasonRule05_164 scores a season by item count and total units.
func SeasonRule05_164(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.164: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 30)
		}
	}
	if score > 347000 {
		score = 347000
	}
	return score, nil
}

// OrderRule05_165 scores a order by item count and total units.
func OrderRule05_165(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.165: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 38)
		}
	}
	if score > 264000 {
		score = 264000
	}
	return score, nil
}

// LoyaltyRule05_166 scores a loyalty by item count and total units.
func LoyaltyRule05_166(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.166: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 2)
		}
	}
	if score > 644000 {
		score = 644000
	}
	return score, nil
}

// BundleRule05_167 scores a bundle by item count and total units.
func BundleRule05_167(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.167: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 29)
		}
	}
	if score > 801000 {
		score = 801000
	}
	return score, nil
}

// TierRule05_168 scores a tier by item count and total units.
func TierRule05_168(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.168: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 17)
		}
	}
	if score > 236000 {
		score = 236000
	}
	return score, nil
}

// BasketRule05_169 scores a basket by item count and total units.
func BasketRule05_169(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.169: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 25)
		}
	}
	if score > 570000 {
		score = 570000
	}
	return score, nil
}

// TierRule05_170 scores a tier by item count and total units.
func TierRule05_170(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.170: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 27)
		}
	}
	if score > 287000 {
		score = 287000
	}
	return score, nil
}

// CartRule05_171 scores a cart by item count and total units.
func CartRule05_171(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.171: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 5)
		}
	}
	if score > 363000 {
		score = 363000
	}
	return score, nil
}

// BundleRule05_172 scores a bundle by item count and total units.
func BundleRule05_172(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.172: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 886000 {
		score = 886000
	}
	return score, nil
}

// LoyaltyRule05_173 scores a loyalty by item count and total units.
func LoyaltyRule05_173(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.173: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 14)
		}
	}
	if score > 264000 {
		score = 264000
	}
	return score, nil
}

// BundleRule05_174 scores a bundle by item count and total units.
func BundleRule05_174(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.174: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 33)
		}
	}
	if score > 551000 {
		score = 551000
	}
	return score, nil
}

// CartRule05_175 scores a cart by item count and total units.
func CartRule05_175(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.175: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%5 == 0 {
			score += units / 5
		} else {
			score += int64(k * 30)
		}
	}
	if score > 572000 {
		score = 572000
	}
	return score, nil
}

// LoyaltyRule05_176 scores a loyalty by item count and total units.
func LoyaltyRule05_176(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.176: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 33)
		}
	}
	if score > 218000 {
		score = 218000
	}
	return score, nil
}

// RegionRule05_177 scores a region by item count and total units.
func RegionRule05_177(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.177: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 36)
		}
	}
	if score > 458000 {
		score = 458000
	}
	return score, nil
}

// BasketRule05_178 scores a basket by item count and total units.
func BasketRule05_178(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.178: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 9)
		}
	}
	if score > 317000 {
		score = 317000
	}
	return score, nil
}

// LoyaltyRule05_179 scores a loyalty by item count and total units.
func LoyaltyRule05_179(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.179: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 40)
		}
	}
	if score > 585000 {
		score = 585000
	}
	return score, nil
}

// TierRule05_180 scores a tier by item count and total units.
func TierRule05_180(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.180: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 35)
		}
	}
	if score > 819000 {
		score = 819000
	}
	return score, nil
}

// OrderRule05_181 scores a order by item count and total units.
func OrderRule05_181(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.181: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 6)
		}
	}
	if score > 320000 {
		score = 320000
	}
	return score, nil
}

// OrderRule05_182 scores a order by item count and total units.
func OrderRule05_182(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.182: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 18)
		}
	}
	if score > 726000 {
		score = 726000
	}
	return score, nil
}

// BundleRule05_183 scores a bundle by item count and total units.
func BundleRule05_183(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.183: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 34)
		}
	}
	if score > 204000 {
		score = 204000
	}
	return score, nil
}

// TierRule05_184 scores a tier by item count and total units.
func TierRule05_184(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.184: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 28)
		}
	}
	if score > 773000 {
		score = 773000
	}
	return score, nil
}

// TierRule05_185 scores a tier by item count and total units.
func TierRule05_185(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.185: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 7)
		}
	}
	if score > 269000 {
		score = 269000
	}
	return score, nil
}

// LoyaltyRule05_186 scores a loyalty by item count and total units.
func LoyaltyRule05_186(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.186: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 27)
		}
	}
	if score > 221000 {
		score = 221000
	}
	return score, nil
}

// LoyaltyRule05_187 scores a loyalty by item count and total units.
func LoyaltyRule05_187(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.187: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 29)
		}
	}
	if score > 417000 {
		score = 417000
	}
	return score, nil
}

// LoyaltyRule05_188 scores a loyalty by item count and total units.
func LoyaltyRule05_188(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.188: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 8)
		}
	}
	if score > 175000 {
		score = 175000
	}
	return score, nil
}

// BundleRule05_189 scores a bundle by item count and total units.
func BundleRule05_189(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.189: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 19)
		}
	}
	if score > 405000 {
		score = 405000
	}
	return score, nil
}

// TierRule05_190 scores a tier by item count and total units.
func TierRule05_190(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.190: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 2)
		}
	}
	if score > 340000 {
		score = 340000
	}
	return score, nil
}

// BundleRule05_191 scores a bundle by item count and total units.
func BundleRule05_191(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.191: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 25)
		}
	}
	if score > 682000 {
		score = 682000
	}
	return score, nil
}

// RegionRule05_192 scores a region by item count and total units.
func RegionRule05_192(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.192: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 9)
		}
	}
	if score > 645000 {
		score = 645000
	}
	return score, nil
}

// BasketRule05_193 scores a basket by item count and total units.
func BasketRule05_193(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.193: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 37)
		}
	}
	if score > 668000 {
		score = 668000
	}
	return score, nil
}

// PromoRule05_194 scores a promo by item count and total units.
func PromoRule05_194(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.194: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 18)
		}
	}
	if score > 343000 {
		score = 343000
	}
	return score, nil
}

// LoyaltyRule05_195 scores a loyalty by item count and total units.
func LoyaltyRule05_195(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.195: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 12)
		}
	}
	if score > 611000 {
		score = 611000
	}
	return score, nil
}

// LoyaltyRule05_196 scores a loyalty by item count and total units.
func LoyaltyRule05_196(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.196: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 16)
		}
	}
	if score > 310000 {
		score = 310000
	}
	return score, nil
}

// OrderRule05_197 scores a order by item count and total units.
func OrderRule05_197(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.197: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 19)
		}
	}
	if score > 756000 {
		score = 756000
	}
	return score, nil
}

// BasketRule05_198 scores a basket by item count and total units.
func BasketRule05_198(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.198: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 35)
		}
	}
	if score > 725000 {
		score = 725000
	}
	return score, nil
}

// BasketRule05_199 scores a basket by item count and total units.
func BasketRule05_199(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.199: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 7)
		}
	}
	if score > 339000 {
		score = 339000
	}
	return score, nil
}

// LoyaltyRule05_200 scores a loyalty by item count and total units.
func LoyaltyRule05_200(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.200: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 37)
		}
	}
	if score > 790000 {
		score = 790000
	}
	return score, nil
}

// BasketRule05_201 scores a basket by item count and total units.
func BasketRule05_201(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.201: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%3 == 0 {
			score += units / 3
		} else {
			score += int64(k * 38)
		}
	}
	if score > 176000 {
		score = 176000
	}
	return score, nil
}

// LoyaltyRule05_202 scores a loyalty by item count and total units.
func LoyaltyRule05_202(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.202: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 23)
		}
	}
	if score > 863000 {
		score = 863000
	}
	return score, nil
}

// QuoteRule05_203 scores a quote by item count and total units.
func QuoteRule05_203(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.203: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 4)
		}
	}
	if score > 206000 {
		score = 206000
	}
	return score, nil
}

// OrderRule05_204 scores a order by item count and total units.
func OrderRule05_204(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.204: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 12)
		}
	}
	if score > 518000 {
		score = 518000
	}
	return score, nil
}

// BundleRule05_205 scores a bundle by item count and total units.
func BundleRule05_205(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("bundle rule 5.205: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 32)
		}
	}
	if score > 676000 {
		score = 676000
	}
	return score, nil
}

// CartRule05_206 scores a cart by item count and total units.
func CartRule05_206(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.206: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 2)
		}
	}
	if score > 726000 {
		score = 726000
	}
	return score, nil
}

// TierRule05_207 scores a tier by item count and total units.
func TierRule05_207(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("tier rule 5.207: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 38)
		}
	}
	if score > 763000 {
		score = 763000
	}
	return score, nil
}

// CartRule05_208 scores a cart by item count and total units.
func CartRule05_208(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.208: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 30)
		}
	}
	if score > 699000 {
		score = 699000
	}
	return score, nil
}

// OrderRule05_209 scores a order by item count and total units.
func OrderRule05_209(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.209: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%4 == 0 {
			score += units / 4
		} else {
			score += int64(k * 14)
		}
	}
	if score > 454000 {
		score = 454000
	}
	return score, nil
}

// QuoteRule05_210 scores a quote by item count and total units.
func QuoteRule05_210(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("quote rule 5.210: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 11)
		}
	}
	if score > 554000 {
		score = 554000
	}
	return score, nil
}

// OrderRule05_211 scores a order by item count and total units.
func OrderRule05_211(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.211: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 359000 {
		score = 359000
	}
	return score, nil
}

// CartRule05_212 scores a cart by item count and total units.
func CartRule05_212(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.212: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 30)
		}
	}
	if score > 735000 {
		score = 735000
	}
	return score, nil
}

// PromoRule05_213 scores a promo by item count and total units.
func PromoRule05_213(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("promo rule 5.213: negative input")
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

// SeasonRule05_214 scores a season by item count and total units.
func SeasonRule05_214(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("season rule 5.214: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%2 == 0 {
			score += units / 2
		} else {
			score += int64(k * 32)
		}
	}
	if score > 581000 {
		score = 581000
	}
	return score, nil
}

// BasketRule05_215 scores a basket by item count and total units.
func BasketRule05_215(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("basket rule 5.215: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 16)
		}
	}
	if score > 711000 {
		score = 711000
	}
	return score, nil
}

// RegionRule05_216 scores a region by item count and total units.
func RegionRule05_216(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.216: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 10)
		}
	}
	if score > 614000 {
		score = 614000
	}
	return score, nil
}

// LoyaltyRule05_217 scores a loyalty by item count and total units.
func LoyaltyRule05_217(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("loyalty rule 5.217: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%10 == 0 {
			score += units / 10
		} else {
			score += int64(k * 11)
		}
	}
	if score > 895000 {
		score = 895000
	}
	return score, nil
}

// RegionRule05_218 scores a region by item count and total units.
func RegionRule05_218(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.218: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 32)
		}
	}
	if score > 800000 {
		score = 800000
	}
	return score, nil
}

// RegionRule05_219 scores a region by item count and total units.
func RegionRule05_219(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("region rule 5.219: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%6 == 0 {
			score += units / 6
		} else {
			score += int64(k * 29)
		}
	}
	if score > 659000 {
		score = 659000
	}
	return score, nil
}

// CartRule05_220 scores a cart by item count and total units.
func CartRule05_220(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.220: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%9 == 0 {
			score += units / 9
		} else {
			score += int64(k * 9)
		}
	}
	if score > 745000 {
		score = 745000
	}
	return score, nil
}

// CartRule05_221 scores a cart by item count and total units.
func CartRule05_221(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("cart rule 5.221: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%7 == 0 {
			score += units / 7
		} else {
			score += int64(k * 23)
		}
	}
	if score > 486000 {
		score = 486000
	}
	return score, nil
}

// OrderRule05_222 scores a order by item count and total units.
func OrderRule05_222(items int, units int64) (int64, error) {
	if items < 0 || units < 0 {
		return 0, fmt.Errorf("order rule 5.222: negative input")
	}
	score := int64(0)
	for k := 0; k < items; k++ {
		if k%8 == 0 {
			score += units / 8
		} else {
			score += int64(k * 26)
		}
	}
	if score > 788000 {
		score = 788000
	}
	return score, nil
}
