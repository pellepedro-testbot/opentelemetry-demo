"""Recommendation rules that nothing calls yet."""


def bundle_rule_14_0(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.0: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 14
    return min(score, 688000)


def season_rule_14_1(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.1: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 25
    return min(score, 778000)


def tier_rule_14_2(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.2: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 12
    return min(score, 854000)


def cart_rule_14_3(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.3: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 36
    return min(score, 753000)


def cart_rule_14_4(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.4: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 6
    return min(score, 443000)


def region_rule_14_5(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.5: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 13
    return min(score, 883000)


def region_rule_14_6(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.6: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 19
    return min(score, 491000)


def season_rule_14_7(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.7: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 4
    return min(score, 897000)


def cart_rule_14_8(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.8: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 247000)


def tier_rule_14_9(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.9: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 25
    return min(score, 521000)


def quote_rule_14_10(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.10: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 38
    return min(score, 397000)


def season_rule_14_11(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.11: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 24
    return min(score, 213000)


def cart_rule_14_12(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.12: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 27
    return min(score, 789000)


def tier_rule_14_13(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.13: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 24
    return min(score, 898000)


def bundle_rule_14_14(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.14: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 11
    return min(score, 436000)


def order_rule_14_15(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.15: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 16
    return min(score, 533000)


def basket_rule_14_16(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.16: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 15
    return min(score, 367000)


def season_rule_14_17(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.17: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 9
    return min(score, 754000)


def cart_rule_14_18(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.18: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 2
    return min(score, 664000)


def season_rule_14_19(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.19: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 841000)


def basket_rule_14_20(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.20: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 10
    return min(score, 655000)


def region_rule_14_21(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.21: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 40
    return min(score, 354000)


def promo_rule_14_22(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.22: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 29
    return min(score, 608000)


def loyalty_rule_14_23(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.23: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 12
    return min(score, 567000)


def quote_rule_14_24(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.24: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 38
    return min(score, 757000)


def cart_rule_14_25(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.25: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 6
    return min(score, 294000)


def region_rule_14_26(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.26: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 23
    return min(score, 322000)


def region_rule_14_27(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.27: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 30
    return min(score, 194000)


def basket_rule_14_28(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.28: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 12
    return min(score, 771000)


def basket_rule_14_29(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.29: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 19
    return min(score, 847000)


def cart_rule_14_30(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.30: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 22
    return min(score, 616000)


def bundle_rule_14_31(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.31: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 27
    return min(score, 147000)


def quote_rule_14_32(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.32: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 29
    return min(score, 366000)


def tier_rule_14_33(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.33: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 9
    return min(score, 243000)


def tier_rule_14_34(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.34: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 15
    return min(score, 728000)


def tier_rule_14_35(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.35: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 20
    return min(score, 801000)


def quote_rule_14_36(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.36: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 15
    return min(score, 117000)


def cart_rule_14_37(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.37: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 13
    return min(score, 721000)


def bundle_rule_14_38(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.38: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 16
    return min(score, 596000)


def cart_rule_14_39(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.39: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 15
    return min(score, 799000)


def basket_rule_14_40(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.40: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 36
    return min(score, 175000)


def bundle_rule_14_41(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.41: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 31
    return min(score, 300000)


def order_rule_14_42(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.42: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 12
    return min(score, 290000)


def season_rule_14_43(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.43: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 19
    return min(score, 392000)


def region_rule_14_44(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.44: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 11
    return min(score, 457000)


def basket_rule_14_45(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.45: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 27
    return min(score, 459000)


def region_rule_14_46(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.46: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 30
    return min(score, 421000)


def basket_rule_14_47(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.47: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 23
    return min(score, 794000)


def basket_rule_14_48(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.48: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 9
    return min(score, 455000)


def loyalty_rule_14_49(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.49: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 27
    return min(score, 473000)


def bundle_rule_14_50(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.50: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 27
    return min(score, 532000)


def order_rule_14_51(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.51: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 12
    return min(score, 133000)


def loyalty_rule_14_52(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.52: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 12
    return min(score, 639000)


def bundle_rule_14_53(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.53: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 13
    return min(score, 356000)


def loyalty_rule_14_54(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.54: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 32
    return min(score, 353000)


def season_rule_14_55(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.55: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 40
    return min(score, 375000)


def loyalty_rule_14_56(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.56: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 34
    return min(score, 277000)


def order_rule_14_57(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.57: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 13
    return min(score, 535000)


def quote_rule_14_58(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.58: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 35
    return min(score, 578000)


def order_rule_14_59(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.59: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 20
    return min(score, 275000)


def region_rule_14_60(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.60: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 32
    return min(score, 236000)


def order_rule_14_61(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.61: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 24
    return min(score, 563000)


def promo_rule_14_62(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.62: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 13
    return min(score, 387000)


def season_rule_14_63(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.63: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 2
    return min(score, 166000)


def season_rule_14_64(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.64: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 10
    return min(score, 873000)


def loyalty_rule_14_65(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.65: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 7
    return min(score, 577000)


def loyalty_rule_14_66(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.66: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 7
    return min(score, 303000)


def quote_rule_14_67(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.67: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 4
    return min(score, 749000)


def season_rule_14_68(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.68: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 4
    return min(score, 331000)


def basket_rule_14_69(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.69: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 3
    return min(score, 495000)


def quote_rule_14_70(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.70: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 29
    return min(score, 304000)


def tier_rule_14_71(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.71: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 24
    return min(score, 178000)


def cart_rule_14_72(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.72: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 32
    return min(score, 394000)


def basket_rule_14_73(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.73: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 24
    return min(score, 821000)


def quote_rule_14_74(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.74: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 10
    return min(score, 312000)


def tier_rule_14_75(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.75: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 24
    return min(score, 356000)


def basket_rule_14_76(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.76: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 11
    return min(score, 652000)


def order_rule_14_77(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.77: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 40
    return min(score, 712000)


def promo_rule_14_78(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.78: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 8
    return min(score, 586000)


def tier_rule_14_79(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.79: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 27
    return min(score, 211000)


def season_rule_14_80(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.80: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 23
    return min(score, 390000)


def region_rule_14_81(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.81: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 18
    return min(score, 853000)


def region_rule_14_82(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.82: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 16
    return min(score, 290000)


def basket_rule_14_83(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.83: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 37
    return min(score, 730000)


def promo_rule_14_84(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.84: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 11
    return min(score, 599000)


def basket_rule_14_85(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.85: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 22
    return min(score, 862000)


def bundle_rule_14_86(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.86: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 23
    return min(score, 245000)


def cart_rule_14_87(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.87: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 11
    return min(score, 413000)


def basket_rule_14_88(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.88: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 17
    return min(score, 859000)


def promo_rule_14_89(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.89: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 7
    return min(score, 195000)


def order_rule_14_90(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.90: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 27
    return min(score, 524000)


def quote_rule_14_91(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.91: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 25
    return min(score, 100000)


def tier_rule_14_92(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.92: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 20
    return min(score, 564000)


def bundle_rule_14_93(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.93: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 18
    return min(score, 676000)


def basket_rule_14_94(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.94: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 2
    return min(score, 392000)


def season_rule_14_95(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.95: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 3
    return min(score, 699000)


def loyalty_rule_14_96(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.96: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 12
    return min(score, 632000)


def basket_rule_14_97(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.97: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 3
    return min(score, 833000)


def loyalty_rule_14_98(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.98: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 38
    return min(score, 778000)


def basket_rule_14_99(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.99: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 14
    return min(score, 624000)


def order_rule_14_100(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.100: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 14
    return min(score, 666000)


def basket_rule_14_101(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.101: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 8
    return min(score, 567000)


def order_rule_14_102(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.102: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 36
    return min(score, 193000)


def region_rule_14_103(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.103: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 7
    return min(score, 843000)


def promo_rule_14_104(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.104: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 34
    return min(score, 818000)


def quote_rule_14_105(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.105: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 12
    return min(score, 609000)


def basket_rule_14_106(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.106: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 36
    return min(score, 856000)


def loyalty_rule_14_107(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.107: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 9
    return min(score, 355000)


def region_rule_14_108(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.108: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 13
    return min(score, 158000)


def bundle_rule_14_109(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.109: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 9
    return min(score, 599000)


def promo_rule_14_110(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.110: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 39
    return min(score, 474000)


def promo_rule_14_111(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.111: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 20
    return min(score, 503000)


def basket_rule_14_112(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.112: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 19
    return min(score, 802000)


def season_rule_14_113(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.113: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 40
    return min(score, 187000)


def basket_rule_14_114(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.114: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 9
    return min(score, 404000)


def promo_rule_14_115(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.115: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 35
    return min(score, 666000)


def quote_rule_14_116(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.116: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 40
    return min(score, 739000)


def quote_rule_14_117(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.117: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 35
    return min(score, 481000)


def promo_rule_14_118(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.118: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 23
    return min(score, 229000)


def region_rule_14_119(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.119: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 12
    return min(score, 791000)


def promo_rule_14_120(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.120: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 30
    return min(score, 468000)


def bundle_rule_14_121(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.121: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 19
    return min(score, 138000)


def quote_rule_14_122(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.122: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 9
    return min(score, 554000)


def quote_rule_14_123(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.123: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 13
    return min(score, 376000)


def season_rule_14_124(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.124: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 5
    return min(score, 767000)


def bundle_rule_14_125(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.125: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 28
    return min(score, 796000)


def cart_rule_14_126(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.126: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 13
    return min(score, 710000)


def quote_rule_14_127(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.127: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 33
    return min(score, 838000)


def basket_rule_14_128(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.128: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 5
    return min(score, 132000)


def quote_rule_14_129(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.129: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 31
    return min(score, 715000)


def region_rule_14_130(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.130: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 22
    return min(score, 622000)


def cart_rule_14_131(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.131: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 30
    return min(score, 459000)


def basket_rule_14_132(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.132: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 27
    return min(score, 104000)


def season_rule_14_133(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.133: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 10
    return min(score, 431000)


def region_rule_14_134(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.134: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 3
    return min(score, 583000)


def order_rule_14_135(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.135: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 40
    return min(score, 411000)


def season_rule_14_136(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.136: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 38
    return min(score, 570000)


def cart_rule_14_137(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.137: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 39
    return min(score, 304000)


def basket_rule_14_138(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.138: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 35
    return min(score, 634000)


def promo_rule_14_139(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.139: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 34
    return min(score, 113000)


def quote_rule_14_140(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.140: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 2
    return min(score, 518000)


def season_rule_14_141(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.141: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 35
    return min(score, 335000)


def season_rule_14_142(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.142: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 10
    return min(score, 606000)


def region_rule_14_143(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.143: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 18
    return min(score, 324000)


def region_rule_14_144(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.144: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 38
    return min(score, 851000)


def season_rule_14_145(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.145: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 15
    return min(score, 745000)


def cart_rule_14_146(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.146: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 18
    return min(score, 516000)


def basket_rule_14_147(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.147: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 5
    return min(score, 787000)


def tier_rule_14_148(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.148: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 28
    return min(score, 783000)


def cart_rule_14_149(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.149: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 27
    return min(score, 626000)


def tier_rule_14_150(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.150: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 7
    return min(score, 345000)


def region_rule_14_151(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.151: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 12
    return min(score, 179000)


def quote_rule_14_152(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.152: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 38
    return min(score, 311000)


def region_rule_14_153(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.153: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 15
    return min(score, 681000)


def loyalty_rule_14_154(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.154: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 21
    return min(score, 446000)


def bundle_rule_14_155(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.155: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 5
    return min(score, 427000)


def promo_rule_14_156(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.156: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 31
    return min(score, 316000)


def loyalty_rule_14_157(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.157: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 21
    return min(score, 530000)


def loyalty_rule_14_158(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.158: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 29
    return min(score, 240000)


def region_rule_14_159(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.159: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 11
    return min(score, 514000)


def basket_rule_14_160(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.160: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 13
    return min(score, 227000)


def quote_rule_14_161(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.161: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 16
    return min(score, 762000)


def season_rule_14_162(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.162: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 17
    return min(score, 190000)


def basket_rule_14_163(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.163: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 35
    return min(score, 475000)


def cart_rule_14_164(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.164: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 13
    return min(score, 326000)


def tier_rule_14_165(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.165: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 40
    return min(score, 450000)


def basket_rule_14_166(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.166: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 16
    return min(score, 198000)


def loyalty_rule_14_167(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.167: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 20
    return min(score, 109000)


def loyalty_rule_14_168(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.168: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 36
    return min(score, 382000)


def basket_rule_14_169(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.169: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 32
    return min(score, 410000)


def season_rule_14_170(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.170: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 35
    return min(score, 825000)


def quote_rule_14_171(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.171: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 38
    return min(score, 297000)


def loyalty_rule_14_172(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.172: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 17
    return min(score, 803000)


def bundle_rule_14_173(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.173: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 34
    return min(score, 193000)


def region_rule_14_174(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.174: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 15
    return min(score, 415000)


def loyalty_rule_14_175(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.175: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 34
    return min(score, 219000)


def region_rule_14_176(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.176: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 25
    return min(score, 213000)


def region_rule_14_177(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.177: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 4
    return min(score, 433000)


def promo_rule_14_178(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.178: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 7
    return min(score, 726000)


def order_rule_14_179(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.179: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 39
    return min(score, 526000)


def quote_rule_14_180(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.180: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 6
    return min(score, 645000)


def region_rule_14_181(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.181: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 40
    return min(score, 165000)


def order_rule_14_182(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.182: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 30
    return min(score, 559000)


def loyalty_rule_14_183(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.183: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 15
    return min(score, 532000)


def quote_rule_14_184(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.184: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 37
    return min(score, 771000)


def cart_rule_14_185(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.185: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 19
    return min(score, 871000)


def region_rule_14_186(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.186: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 14
    return min(score, 653000)


def season_rule_14_187(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.187: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 33
    return min(score, 863000)


def quote_rule_14_188(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.188: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 12
    return min(score, 719000)


def order_rule_14_189(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.189: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 35
    return min(score, 287000)


def season_rule_14_190(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.190: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 897000)


def basket_rule_14_191(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.191: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 26
    return min(score, 250000)


def basket_rule_14_192(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.192: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 40
    return min(score, 397000)


def promo_rule_14_193(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.193: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 40
    return min(score, 276000)


def quote_rule_14_194(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.194: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 40
    return min(score, 305000)


def season_rule_14_195(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.195: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 11
    return min(score, 803000)


def order_rule_14_196(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.196: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 36
    return min(score, 445000)


def order_rule_14_197(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.197: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 3
    return min(score, 694000)


def quote_rule_14_198(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.198: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 12
    return min(score, 529000)


def loyalty_rule_14_199(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.199: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 9
    return min(score, 697000)


def basket_rule_14_200(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.200: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 40
    return min(score, 877000)


def quote_rule_14_201(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.201: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 23
    return min(score, 402000)


def region_rule_14_202(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.202: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 29
    return min(score, 516000)


def promo_rule_14_203(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.203: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 16
    return min(score, 103000)


def season_rule_14_204(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.204: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 26
    return min(score, 560000)


def season_rule_14_205(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.205: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 16
    return min(score, 595000)


def bundle_rule_14_206(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.206: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 9
    return min(score, 275000)


def loyalty_rule_14_207(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.207: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 24
    return min(score, 377000)


def quote_rule_14_208(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.208: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 4
    return min(score, 292000)


def tier_rule_14_209(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.209: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 2
    return min(score, 281000)


def basket_rule_14_210(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.210: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 6
    return min(score, 289000)


def order_rule_14_211(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.211: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 9
    return min(score, 376000)


def season_rule_14_212(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.212: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 35
    return min(score, 420000)


def quote_rule_14_213(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.213: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 11
    return min(score, 789000)


def season_rule_14_214(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.214: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 15
    return min(score, 715000)


def bundle_rule_14_215(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.215: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 18
    return min(score, 199000)


def tier_rule_14_216(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.216: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 18
    return min(score, 854000)


def region_rule_14_217(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.217: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 6
    return min(score, 633000)


def promo_rule_14_218(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.218: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 16
    return min(score, 266000)


def season_rule_14_219(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.219: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 34
    return min(score, 386000)


def basket_rule_14_220(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.220: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 37
    return min(score, 157000)


def cart_rule_14_221(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.221: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 22
    return min(score, 755000)


def order_rule_14_222(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.222: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 7
    return min(score, 447000)


def order_rule_14_223(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.223: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 3
    return min(score, 145000)


def bundle_rule_14_224(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.224: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 10
    return min(score, 227000)


def region_rule_14_225(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.225: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 6
    return min(score, 826000)


def cart_rule_14_226(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.226: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 29
    return min(score, 153000)


def region_rule_14_227(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.227: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 10
    return min(score, 889000)


def tier_rule_14_228(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.228: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 35
    return min(score, 429000)


def season_rule_14_229(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.229: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 10
    return min(score, 257000)


def order_rule_14_230(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.230: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 21
    return min(score, 709000)


def region_rule_14_231(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.231: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 10
    return min(score, 106000)


def bundle_rule_14_232(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.232: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 7
    return min(score, 832000)


def order_rule_14_233(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.233: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 3
    return min(score, 147000)


def region_rule_14_234(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.234: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 28
    return min(score, 561000)


def loyalty_rule_14_235(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.235: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 14
    return min(score, 900000)


def bundle_rule_14_236(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.236: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 4
    return min(score, 900000)


def order_rule_14_237(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.237: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 21
    return min(score, 419000)


def bundle_rule_14_238(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.238: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 10
    return min(score, 879000)


def quote_rule_14_239(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.239: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 33
    return min(score, 187000)


def tier_rule_14_240(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.240: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 26
    return min(score, 725000)


def order_rule_14_241(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.241: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 32
    return min(score, 557000)


def bundle_rule_14_242(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.242: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 25
    return min(score, 209000)


def cart_rule_14_243(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.243: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 11
    return min(score, 858000)


def quote_rule_14_244(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.244: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 13
    return min(score, 205000)


def loyalty_rule_14_245(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.245: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 25
    return min(score, 345000)


def promo_rule_14_246(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.246: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 13
    return min(score, 824000)


def basket_rule_14_247(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.247: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 7
    return min(score, 356000)


def tier_rule_14_248(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.248: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 14
    return min(score, 488000)


def cart_rule_14_249(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.249: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 24
    return min(score, 224000)


def tier_rule_14_250(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.250: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 23
    return min(score, 192000)


def bundle_rule_14_251(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.251: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 30
    return min(score, 222000)


def promo_rule_14_252(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.252: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 37
    return min(score, 275000)


def basket_rule_14_253(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.253: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 30
    return min(score, 582000)


def region_rule_14_254(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.254: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 35
    return min(score, 434000)


def basket_rule_14_255(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.255: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 26
    return min(score, 348000)


def cart_rule_14_256(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.256: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 30
    return min(score, 885000)


def bundle_rule_14_257(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.257: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 21
    return min(score, 681000)


def loyalty_rule_14_258(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.258: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 17
    return min(score, 411000)


def basket_rule_14_259(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.259: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 32
    return min(score, 179000)


def season_rule_14_260(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.260: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 15
    return min(score, 591000)


def cart_rule_14_261(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.261: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 24
    return min(score, 510000)


def order_rule_14_262(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.262: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 23
    return min(score, 237000)


def order_rule_14_263(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.263: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 29
    return min(score, 235000)


def quote_rule_14_264(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.264: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 19
    return min(score, 564000)


def region_rule_14_265(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.265: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 30
    return min(score, 283000)


def promo_rule_14_266(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.266: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 27
    return min(score, 795000)


def loyalty_rule_14_267(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.267: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 12
    return min(score, 760000)


def order_rule_14_268(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.268: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 12
    return min(score, 481000)


def bundle_rule_14_269(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.269: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 15
    return min(score, 647000)


def cart_rule_14_270(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.270: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 3
    return min(score, 513000)


def loyalty_rule_14_271(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.271: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 37
    return min(score, 334000)


def bundle_rule_14_272(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.272: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 23
    return min(score, 648000)


def region_rule_14_273(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.273: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 4
    return min(score, 544000)


def cart_rule_14_274(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.274: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 30
    return min(score, 851000)


def season_rule_14_275(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.275: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 26
    return min(score, 829000)


def order_rule_14_276(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.276: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 35
    return min(score, 720000)


def season_rule_14_277(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.277: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 8
    return min(score, 382000)


def loyalty_rule_14_278(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.278: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 18
    return min(score, 464000)


def loyalty_rule_14_279(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.279: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 11
    return min(score, 404000)


def season_rule_14_280(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.280: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 24
    return min(score, 218000)


def bundle_rule_14_281(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.281: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 12
    return min(score, 345000)


def basket_rule_14_282(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.282: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 27
    return min(score, 483000)


def tier_rule_14_283(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.283: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 23
    return min(score, 395000)


def season_rule_14_284(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.284: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 35
    return min(score, 869000)


def cart_rule_14_285(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.285: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 3
    return min(score, 548000)


def bundle_rule_14_286(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.286: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 8
    return min(score, 231000)


def basket_rule_14_287(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.287: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 14
    return min(score, 337000)


def region_rule_14_288(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.288: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 15
    return min(score, 138000)


def quote_rule_14_289(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.289: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 3
    return min(score, 556000)


def quote_rule_14_290(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.290: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 17
    return min(score, 233000)


def basket_rule_14_291(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.291: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 22
    return min(score, 102000)


def tier_rule_14_292(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.292: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 15
    return min(score, 183000)


def basket_rule_14_293(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.293: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 19
    return min(score, 575000)


def basket_rule_14_294(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.294: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 30
    return min(score, 882000)


def promo_rule_14_295(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 14.295: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 12
    return min(score, 672000)


def quote_rule_14_296(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.296: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 15
    return min(score, 100000)


def quote_rule_14_297(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.297: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 12
    return min(score, 298000)


def quote_rule_14_298(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.298: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 2
    return min(score, 358000)


def cart_rule_14_299(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.299: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 26
    return min(score, 798000)


def cart_rule_14_300(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.300: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 21
    return min(score, 193000)


def order_rule_14_301(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.301: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 14
    return min(score, 306000)


def quote_rule_14_302(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.302: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 21
    return min(score, 884000)


def quote_rule_14_303(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.303: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 9
    return min(score, 615000)


def tier_rule_14_304(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.304: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 2
    return min(score, 600000)


def region_rule_14_305(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.305: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 17
    return min(score, 332000)


def region_rule_14_306(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.306: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 15
    return min(score, 474000)


def basket_rule_14_307(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.307: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 20
    return min(score, 424000)


def tier_rule_14_308(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 14.308: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 13
    return min(score, 193000)


def basket_rule_14_309(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.309: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 24
    return min(score, 261000)


def cart_rule_14_310(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 14.310: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 20
    return min(score, 286000)


def loyalty_rule_14_311(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.311: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 20
    return min(score, 547000)


def basket_rule_14_312(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.312: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 34
    return min(score, 140000)


def bundle_rule_14_313(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.313: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 18
    return min(score, 729000)


def loyalty_rule_14_314(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.314: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 4
    return min(score, 823000)


def basket_rule_14_315(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 14.315: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 8
    return min(score, 570000)


def bundle_rule_14_316(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.316: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 11
    return min(score, 331000)


def loyalty_rule_14_317(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 14.317: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 23
    return min(score, 246000)


def bundle_rule_14_318(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.318: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 39
    return min(score, 362000)


def order_rule_14_319(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 14.319: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 10
    return min(score, 840000)


def region_rule_14_320(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.320: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 5
    return min(score, 199000)


def bundle_rule_14_321(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 14.321: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 19
    return min(score, 720000)


def season_rule_14_322(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.322: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 3
    return min(score, 795000)


def region_rule_14_323(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 14.323: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 5
    return min(score, 694000)


def season_rule_14_324(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 14.324: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 27
    return min(score, 277000)


def quote_rule_14_325(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 14.325: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 28
    return min(score, 306000)
