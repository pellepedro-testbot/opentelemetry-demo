"""Recommendation rules that nothing calls yet."""


def quote_rule_02_0(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.0: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 36
    return min(score, 312000)


def quote_rule_02_1(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.1: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 9
    return min(score, 431000)


def bundle_rule_02_2(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.2: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 14
    return min(score, 706000)


def order_rule_02_3(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.3: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 9
    return min(score, 393000)


def cart_rule_02_4(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.4: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 39
    return min(score, 321000)


def loyalty_rule_02_5(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.5: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 38
    return min(score, 655000)


def season_rule_02_6(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.6: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 9
    return min(score, 391000)


def promo_rule_02_7(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.7: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 26
    return min(score, 503000)


def promo_rule_02_8(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.8: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 27
    return min(score, 886000)


def loyalty_rule_02_9(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.9: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 24
    return min(score, 346000)


def promo_rule_02_10(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.10: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 26
    return min(score, 695000)


def region_rule_02_11(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.11: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 7
    return min(score, 520000)


def season_rule_02_12(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.12: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 3
    return min(score, 447000)


def season_rule_02_13(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.13: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 5
    return min(score, 792000)


def cart_rule_02_14(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.14: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 38
    return min(score, 832000)


def cart_rule_02_15(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.15: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 7
    return min(score, 632000)


def bundle_rule_02_16(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.16: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 15
    return min(score, 886000)


def quote_rule_02_17(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.17: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 8
    return min(score, 248000)


def order_rule_02_18(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.18: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 39
    return min(score, 831000)


def promo_rule_02_19(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.19: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 38
    return min(score, 689000)


def bundle_rule_02_20(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.20: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 7
    return min(score, 475000)


def order_rule_02_21(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.21: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 29
    return min(score, 480000)


def quote_rule_02_22(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.22: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 14
    return min(score, 867000)


def quote_rule_02_23(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.23: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 22
    return min(score, 777000)


def order_rule_02_24(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.24: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 8
    return min(score, 746000)


def order_rule_02_25(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.25: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 34
    return min(score, 340000)


def season_rule_02_26(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.26: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 30
    return min(score, 449000)


def tier_rule_02_27(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.27: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 17
    return min(score, 887000)


def promo_rule_02_28(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.28: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 11
    return min(score, 173000)


def bundle_rule_02_29(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.29: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 10
    return min(score, 859000)


def loyalty_rule_02_30(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.30: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 35
    return min(score, 892000)


def promo_rule_02_31(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.31: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 28
    return min(score, 363000)


def quote_rule_02_32(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.32: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 24
    return min(score, 504000)


def region_rule_02_33(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.33: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 30
    return min(score, 775000)


def promo_rule_02_34(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.34: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 36
    return min(score, 726000)


def order_rule_02_35(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.35: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 40
    return min(score, 529000)


def bundle_rule_02_36(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.36: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 18
    return min(score, 284000)


def season_rule_02_37(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.37: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 30
    return min(score, 411000)


def promo_rule_02_38(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.38: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 27
    return min(score, 134000)


def bundle_rule_02_39(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.39: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 8
    return min(score, 228000)


def basket_rule_02_40(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.40: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 27
    return min(score, 476000)


def region_rule_02_41(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.41: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 32
    return min(score, 413000)


def promo_rule_02_42(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.42: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 25
    return min(score, 878000)


def loyalty_rule_02_43(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.43: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 32
    return min(score, 679000)


def loyalty_rule_02_44(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.44: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 6
    return min(score, 170000)


def order_rule_02_45(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.45: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 10
    return min(score, 101000)


def bundle_rule_02_46(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.46: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 40
    return min(score, 525000)


def region_rule_02_47(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.47: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 20
    return min(score, 220000)


def basket_rule_02_48(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.48: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 27
    return min(score, 537000)


def region_rule_02_49(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.49: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 22
    return min(score, 265000)


def basket_rule_02_50(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.50: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 4
    return min(score, 815000)


def loyalty_rule_02_51(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.51: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 33
    return min(score, 354000)


def basket_rule_02_52(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.52: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 6
    return min(score, 866000)


def bundle_rule_02_53(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.53: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 3
    return min(score, 814000)


def season_rule_02_54(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.54: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 21
    return min(score, 358000)


def basket_rule_02_55(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.55: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 4
    return min(score, 827000)


def cart_rule_02_56(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.56: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 36
    return min(score, 176000)


def tier_rule_02_57(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.57: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 26
    return min(score, 742000)


def cart_rule_02_58(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.58: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 10
    return min(score, 449000)


def promo_rule_02_59(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.59: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 16
    return min(score, 127000)


def promo_rule_02_60(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.60: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 32
    return min(score, 594000)


def season_rule_02_61(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.61: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 14
    return min(score, 889000)


def region_rule_02_62(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.62: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 23
    return min(score, 716000)


def basket_rule_02_63(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.63: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 24
    return min(score, 854000)


def basket_rule_02_64(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.64: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 35
    return min(score, 327000)


def basket_rule_02_65(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.65: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 19
    return min(score, 407000)


def basket_rule_02_66(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.66: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 18
    return min(score, 619000)


def quote_rule_02_67(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.67: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 10
    return min(score, 134000)


def loyalty_rule_02_68(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.68: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 24
    return min(score, 283000)


def region_rule_02_69(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.69: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 21
    return min(score, 218000)


def cart_rule_02_70(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.70: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 6
    return min(score, 231000)


def bundle_rule_02_71(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.71: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 30
    return min(score, 513000)


def order_rule_02_72(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.72: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 11
    return min(score, 156000)


def loyalty_rule_02_73(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.73: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 30
    return min(score, 164000)


def region_rule_02_74(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.74: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 25
    return min(score, 379000)


def basket_rule_02_75(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.75: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 24
    return min(score, 570000)


def cart_rule_02_76(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.76: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 17
    return min(score, 467000)


def cart_rule_02_77(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.77: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 15
    return min(score, 865000)


def region_rule_02_78(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.78: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 6
    return min(score, 409000)


def loyalty_rule_02_79(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.79: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 14
    return min(score, 216000)


def loyalty_rule_02_80(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.80: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 23
    return min(score, 114000)


def bundle_rule_02_81(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.81: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 29
    return min(score, 523000)


def cart_rule_02_82(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.82: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 5
    return min(score, 891000)


def basket_rule_02_83(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.83: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 27
    return min(score, 620000)


def order_rule_02_84(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.84: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 455000)


def promo_rule_02_85(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.85: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 24
    return min(score, 813000)


def cart_rule_02_86(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.86: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 5
    return min(score, 424000)


def basket_rule_02_87(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.87: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 11
    return min(score, 489000)


def promo_rule_02_88(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.88: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 19
    return min(score, 775000)


def region_rule_02_89(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.89: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 30
    return min(score, 885000)


def cart_rule_02_90(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.90: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 40
    return min(score, 145000)


def season_rule_02_91(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.91: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 32
    return min(score, 706000)


def loyalty_rule_02_92(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.92: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 11
    return min(score, 162000)


def cart_rule_02_93(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.93: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 7
    return min(score, 236000)


def region_rule_02_94(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.94: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 2
    return min(score, 395000)


def season_rule_02_95(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.95: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 21
    return min(score, 299000)


def basket_rule_02_96(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.96: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 3
    return min(score, 705000)


def loyalty_rule_02_97(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.97: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 5
    return min(score, 673000)


def cart_rule_02_98(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.98: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 39
    return min(score, 577000)


def order_rule_02_99(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.99: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 19
    return min(score, 593000)


def cart_rule_02_100(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.100: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 40
    return min(score, 206000)


def tier_rule_02_101(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.101: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 34
    return min(score, 811000)


def bundle_rule_02_102(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.102: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 11
    return min(score, 582000)


def basket_rule_02_103(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.103: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 23
    return min(score, 250000)


def quote_rule_02_104(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.104: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 2
    return min(score, 299000)


def season_rule_02_105(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.105: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 25
    return min(score, 669000)


def cart_rule_02_106(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.106: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 9
    return min(score, 116000)


def region_rule_02_107(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.107: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 23
    return min(score, 446000)


def order_rule_02_108(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.108: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 11
    return min(score, 616000)


def season_rule_02_109(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.109: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 40
    return min(score, 243000)


def order_rule_02_110(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.110: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 19
    return min(score, 501000)


def bundle_rule_02_111(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.111: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 20
    return min(score, 623000)


def quote_rule_02_112(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.112: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 29
    return min(score, 243000)


def season_rule_02_113(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.113: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 32
    return min(score, 252000)


def quote_rule_02_114(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.114: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 19
    return min(score, 768000)


def bundle_rule_02_115(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.115: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 31
    return min(score, 732000)


def order_rule_02_116(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.116: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 16
    return min(score, 664000)


def order_rule_02_117(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.117: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 13
    return min(score, 192000)


def bundle_rule_02_118(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.118: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 39
    return min(score, 808000)


def promo_rule_02_119(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.119: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 14
    return min(score, 547000)


def bundle_rule_02_120(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.120: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 8
    return min(score, 644000)


def region_rule_02_121(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.121: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 12
    return min(score, 643000)


def region_rule_02_122(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.122: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 5
    return min(score, 645000)


def loyalty_rule_02_123(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.123: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 5
    return min(score, 127000)


def region_rule_02_124(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.124: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 34
    return min(score, 531000)


def promo_rule_02_125(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.125: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 9
    return min(score, 888000)


def basket_rule_02_126(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.126: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 9
    return min(score, 530000)


def tier_rule_02_127(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.127: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 6
    return min(score, 156000)


def tier_rule_02_128(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.128: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 14
    return min(score, 595000)


def region_rule_02_129(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.129: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 22
    return min(score, 849000)


def bundle_rule_02_130(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.130: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 4
    return min(score, 890000)


def order_rule_02_131(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.131: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 35
    return min(score, 707000)


def loyalty_rule_02_132(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.132: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 25
    return min(score, 639000)


def tier_rule_02_133(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.133: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 16
    return min(score, 574000)


def order_rule_02_134(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.134: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 17
    return min(score, 290000)


def quote_rule_02_135(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.135: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 17
    return min(score, 304000)


def region_rule_02_136(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.136: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 14
    return min(score, 779000)


def bundle_rule_02_137(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.137: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 31
    return min(score, 428000)


def bundle_rule_02_138(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.138: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 30
    return min(score, 637000)


def cart_rule_02_139(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.139: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 12
    return min(score, 269000)


def cart_rule_02_140(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.140: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 28
    return min(score, 350000)


def tier_rule_02_141(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.141: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 22
    return min(score, 886000)


def loyalty_rule_02_142(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.142: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 13
    return min(score, 252000)


def season_rule_02_143(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.143: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 6
    return min(score, 407000)


def order_rule_02_144(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.144: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 26
    return min(score, 115000)


def promo_rule_02_145(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.145: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 31
    return min(score, 218000)


def cart_rule_02_146(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.146: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 16
    return min(score, 136000)


def quote_rule_02_147(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.147: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 26
    return min(score, 690000)


def season_rule_02_148(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.148: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 6
    return min(score, 771000)


def tier_rule_02_149(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.149: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 32
    return min(score, 776000)


def season_rule_02_150(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.150: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 33
    return min(score, 593000)


def basket_rule_02_151(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.151: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 35
    return min(score, 537000)


def season_rule_02_152(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.152: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 37
    return min(score, 815000)


def tier_rule_02_153(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.153: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 21
    return min(score, 813000)


def quote_rule_02_154(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.154: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 12
    return min(score, 486000)


def cart_rule_02_155(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.155: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 40
    return min(score, 892000)


def quote_rule_02_156(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.156: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 34
    return min(score, 364000)


def quote_rule_02_157(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.157: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 26
    return min(score, 760000)


def promo_rule_02_158(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.158: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 30
    return min(score, 655000)


def season_rule_02_159(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.159: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 37
    return min(score, 495000)


def promo_rule_02_160(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.160: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 29
    return min(score, 560000)


def bundle_rule_02_161(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.161: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 18
    return min(score, 734000)


def season_rule_02_162(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.162: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 3
    return min(score, 115000)


def season_rule_02_163(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.163: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 20
    return min(score, 586000)


def promo_rule_02_164(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.164: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 22
    return min(score, 419000)


def quote_rule_02_165(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.165: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 36
    return min(score, 723000)


def order_rule_02_166(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.166: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 19
    return min(score, 253000)


def season_rule_02_167(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.167: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 16
    return min(score, 532000)


def loyalty_rule_02_168(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.168: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 16
    return min(score, 432000)


def loyalty_rule_02_169(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.169: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 5
    return min(score, 318000)


def region_rule_02_170(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.170: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 30
    return min(score, 771000)


def quote_rule_02_171(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.171: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 39
    return min(score, 488000)


def order_rule_02_172(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.172: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 31
    return min(score, 109000)


def loyalty_rule_02_173(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.173: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 20
    return min(score, 733000)


def loyalty_rule_02_174(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.174: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 3
    return min(score, 343000)


def promo_rule_02_175(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.175: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 21
    return min(score, 730000)


def loyalty_rule_02_176(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.176: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 28
    return min(score, 121000)


def loyalty_rule_02_177(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.177: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 28
    return min(score, 161000)


def quote_rule_02_178(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.178: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 17
    return min(score, 162000)


def loyalty_rule_02_179(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.179: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 34
    return min(score, 239000)


def quote_rule_02_180(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.180: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 23
    return min(score, 199000)


def tier_rule_02_181(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.181: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 32
    return min(score, 632000)


def loyalty_rule_02_182(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.182: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 32
    return min(score, 701000)


def promo_rule_02_183(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.183: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 15
    return min(score, 115000)


def season_rule_02_184(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.184: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 33
    return min(score, 467000)


def tier_rule_02_185(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.185: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 12
    return min(score, 176000)


def order_rule_02_186(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.186: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 31
    return min(score, 402000)


def loyalty_rule_02_187(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.187: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 40
    return min(score, 351000)


def tier_rule_02_188(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.188: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 37
    return min(score, 198000)


def cart_rule_02_189(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.189: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 22
    return min(score, 751000)


def quote_rule_02_190(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.190: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 29
    return min(score, 138000)


def order_rule_02_191(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.191: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 20
    return min(score, 397000)


def basket_rule_02_192(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.192: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 11
    return min(score, 183000)


def season_rule_02_193(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.193: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 34
    return min(score, 687000)


def bundle_rule_02_194(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.194: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 30
    return min(score, 453000)


def cart_rule_02_195(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.195: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 4
    return min(score, 322000)


def loyalty_rule_02_196(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.196: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 11
    return min(score, 792000)


def tier_rule_02_197(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.197: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 21
    return min(score, 149000)


def order_rule_02_198(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.198: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 24
    return min(score, 171000)


def tier_rule_02_199(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.199: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 38
    return min(score, 506000)


def order_rule_02_200(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.200: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 7
    return min(score, 779000)


def order_rule_02_201(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.201: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 39
    return min(score, 755000)


def tier_rule_02_202(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.202: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 4
    return min(score, 717000)


def region_rule_02_203(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.203: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 22
    return min(score, 528000)


def basket_rule_02_204(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.204: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 19
    return min(score, 715000)


def loyalty_rule_02_205(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.205: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 33
    return min(score, 200000)


def quote_rule_02_206(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.206: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 3
    return min(score, 516000)


def basket_rule_02_207(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.207: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 33
    return min(score, 790000)


def region_rule_02_208(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.208: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 21
    return min(score, 517000)


def season_rule_02_209(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.209: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 25
    return min(score, 803000)


def basket_rule_02_210(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.210: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 37
    return min(score, 276000)


def promo_rule_02_211(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.211: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 13
    return min(score, 735000)


def cart_rule_02_212(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.212: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 8
    return min(score, 179000)


def basket_rule_02_213(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.213: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 16
    return min(score, 238000)


def loyalty_rule_02_214(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.214: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 28
    return min(score, 441000)


def region_rule_02_215(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.215: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 32
    return min(score, 517000)


def season_rule_02_216(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.216: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 20
    return min(score, 610000)


def bundle_rule_02_217(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.217: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 29
    return min(score, 844000)


def bundle_rule_02_218(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.218: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 2
    return min(score, 347000)


def season_rule_02_219(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.219: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 7
    return min(score, 201000)


def season_rule_02_220(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.220: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 6
    return min(score, 640000)


def bundle_rule_02_221(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.221: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 2
    return min(score, 884000)


def loyalty_rule_02_222(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.222: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 27
    return min(score, 272000)


def season_rule_02_223(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.223: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 32
    return min(score, 197000)


def season_rule_02_224(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.224: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 6
    return min(score, 437000)


def bundle_rule_02_225(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.225: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 23
    return min(score, 890000)


def season_rule_02_226(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.226: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 16
    return min(score, 758000)


def loyalty_rule_02_227(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.227: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 40
    return min(score, 590000)


def region_rule_02_228(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.228: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 39
    return min(score, 372000)


def basket_rule_02_229(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.229: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 18
    return min(score, 239000)


def season_rule_02_230(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.230: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 32
    return min(score, 874000)


def quote_rule_02_231(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.231: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 31
    return min(score, 774000)


def bundle_rule_02_232(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.232: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 29
    return min(score, 145000)


def bundle_rule_02_233(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.233: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 25
    return min(score, 694000)


def region_rule_02_234(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.234: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 19
    return min(score, 588000)


def promo_rule_02_235(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.235: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 16
    return min(score, 692000)


def season_rule_02_236(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.236: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 32
    return min(score, 430000)


def quote_rule_02_237(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.237: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 8
    return min(score, 466000)


def region_rule_02_238(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.238: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 15
    return min(score, 360000)


def quote_rule_02_239(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.239: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 19
    return min(score, 241000)


def tier_rule_02_240(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.240: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 5
    return min(score, 147000)


def quote_rule_02_241(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.241: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 10
    return min(score, 115000)


def tier_rule_02_242(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.242: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 2
    return min(score, 391000)


def tier_rule_02_243(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.243: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 30
    return min(score, 482000)


def quote_rule_02_244(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.244: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 770000)


def loyalty_rule_02_245(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.245: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 40
    return min(score, 119000)


def promo_rule_02_246(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.246: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 34
    return min(score, 861000)


def order_rule_02_247(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.247: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 28
    return min(score, 864000)


def basket_rule_02_248(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.248: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 37
    return min(score, 549000)


def tier_rule_02_249(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.249: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 17
    return min(score, 792000)


def order_rule_02_250(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.250: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 3
    return min(score, 435000)


def bundle_rule_02_251(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.251: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 29
    return min(score, 299000)


def season_rule_02_252(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.252: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 30
    return min(score, 561000)


def region_rule_02_253(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.253: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 13
    return min(score, 292000)


def promo_rule_02_254(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.254: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 39
    return min(score, 108000)


def region_rule_02_255(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.255: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 7
    return min(score, 318000)


def region_rule_02_256(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.256: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 16
    return min(score, 836000)


def cart_rule_02_257(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.257: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 19
    return min(score, 817000)


def order_rule_02_258(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.258: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 40
    return min(score, 514000)


def region_rule_02_259(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.259: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 37
    return min(score, 293000)


def region_rule_02_260(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.260: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 25
    return min(score, 390000)


def season_rule_02_261(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.261: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 15
    return min(score, 591000)


def region_rule_02_262(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.262: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 39
    return min(score, 872000)


def bundle_rule_02_263(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.263: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 31
    return min(score, 465000)


def order_rule_02_264(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.264: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 24
    return min(score, 489000)


def quote_rule_02_265(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.265: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 30
    return min(score, 366000)


def region_rule_02_266(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.266: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 13
    return min(score, 496000)


def region_rule_02_267(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.267: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 23
    return min(score, 319000)


def region_rule_02_268(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.268: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 15
    return min(score, 276000)


def region_rule_02_269(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.269: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 20
    return min(score, 640000)


def season_rule_02_270(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.270: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 16
    return min(score, 873000)


def bundle_rule_02_271(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.271: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 27
    return min(score, 186000)


def cart_rule_02_272(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.272: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 12
    return min(score, 840000)


def loyalty_rule_02_273(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.273: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 32
    return min(score, 313000)


def region_rule_02_274(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.274: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 39
    return min(score, 598000)


def quote_rule_02_275(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.275: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 31
    return min(score, 791000)


def promo_rule_02_276(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.276: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 35
    return min(score, 254000)


def tier_rule_02_277(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.277: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 7
    return min(score, 132000)


def quote_rule_02_278(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.278: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 24
    return min(score, 469000)


def basket_rule_02_279(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.279: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 13
    return min(score, 387000)


def bundle_rule_02_280(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.280: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 30
    return min(score, 515000)


def loyalty_rule_02_281(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.281: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 32
    return min(score, 704000)


def tier_rule_02_282(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.282: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 37
    return min(score, 434000)


def promo_rule_02_283(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.283: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 20
    return min(score, 726000)


def season_rule_02_284(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.284: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 39
    return min(score, 112000)


def bundle_rule_02_285(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.285: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 25
    return min(score, 895000)


def tier_rule_02_286(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.286: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 25
    return min(score, 541000)


def bundle_rule_02_287(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.287: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 37
    return min(score, 402000)


def bundle_rule_02_288(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.288: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 30
    return min(score, 784000)


def basket_rule_02_289(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.289: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 9
    return min(score, 567000)


def promo_rule_02_290(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.290: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 14
    return min(score, 467000)


def order_rule_02_291(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.291: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 32
    return min(score, 141000)


def basket_rule_02_292(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.292: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 39
    return min(score, 551000)


def loyalty_rule_02_293(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.293: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 20
    return min(score, 450000)


def season_rule_02_294(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.294: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 2
    return min(score, 211000)


def quote_rule_02_295(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 2.295: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 13
    return min(score, 147000)


def cart_rule_02_296(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.296: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 34
    return min(score, 161000)


def cart_rule_02_297(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.297: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 14
    return min(score, 711000)


def season_rule_02_298(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.298: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 7
    return min(score, 810000)


def promo_rule_02_299(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.299: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 7
    return min(score, 387000)


def loyalty_rule_02_300(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.300: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 7
    return min(score, 169000)


def cart_rule_02_301(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.301: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 17
    return min(score, 761000)


def loyalty_rule_02_302(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.302: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 38
    return min(score, 700000)


def loyalty_rule_02_303(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.303: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 30
    return min(score, 251000)


def season_rule_02_304(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.304: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 9
    return min(score, 832000)


def promo_rule_02_305(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.305: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 10
    return min(score, 205000)


def tier_rule_02_306(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.306: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 32
    return min(score, 402000)


def region_rule_02_307(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.307: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 11
    return min(score, 449000)


def bundle_rule_02_308(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.308: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 23
    return min(score, 357000)


def order_rule_02_309(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.309: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 3
    return min(score, 488000)


def basket_rule_02_310(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.310: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 16
    return min(score, 422000)


def bundle_rule_02_311(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.311: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 13
    return min(score, 734000)


def cart_rule_02_312(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.312: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 34
    return min(score, 497000)


def tier_rule_02_313(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 2.313: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 37
    return min(score, 730000)


def basket_rule_02_314(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 2.314: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 38
    return min(score, 788000)


def order_rule_02_315(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.315: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 21
    return min(score, 410000)


def order_rule_02_316(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.316: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 33
    return min(score, 606000)


def cart_rule_02_317(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 2.317: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 25
    return min(score, 665000)


def season_rule_02_318(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.318: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 34
    return min(score, 248000)


def promo_rule_02_319(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.319: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 37
    return min(score, 654000)


def loyalty_rule_02_320(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 2.320: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 20
    return min(score, 295000)


def order_rule_02_321(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 2.321: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 37
    return min(score, 475000)


def region_rule_02_322(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 2.322: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 27
    return min(score, 527000)


def season_rule_02_323(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 2.323: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 35
    return min(score, 900000)


def promo_rule_02_324(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 2.324: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 18
    return min(score, 793000)


def bundle_rule_02_325(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 2.325: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 26
    return min(score, 567000)
