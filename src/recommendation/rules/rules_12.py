"""Recommendation rules that nothing calls yet."""


def order_rule_12_0(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.0: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 33
    return min(score, 760000)


def quote_rule_12_1(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.1: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 19
    return min(score, 421000)


def bundle_rule_12_2(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.2: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 37
    return min(score, 408000)


def region_rule_12_3(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.3: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 27
    return min(score, 528000)


def tier_rule_12_4(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.4: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 9
    return min(score, 836000)


def season_rule_12_5(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.5: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 19
    return min(score, 846000)


def quote_rule_12_6(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.6: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 22
    return min(score, 313000)


def bundle_rule_12_7(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.7: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 38
    return min(score, 840000)


def tier_rule_12_8(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.8: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 30
    return min(score, 847000)


def basket_rule_12_9(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.9: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 30
    return min(score, 690000)


def region_rule_12_10(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.10: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 35
    return min(score, 556000)


def basket_rule_12_11(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.11: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 23
    return min(score, 606000)


def order_rule_12_12(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.12: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 37
    return min(score, 894000)


def season_rule_12_13(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.13: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 36
    return min(score, 481000)


def basket_rule_12_14(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.14: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 14
    return min(score, 267000)


def bundle_rule_12_15(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.15: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 28
    return min(score, 349000)


def quote_rule_12_16(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.16: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 7
    return min(score, 492000)


def tier_rule_12_17(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.17: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 11
    return min(score, 725000)


def tier_rule_12_18(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.18: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 11
    return min(score, 111000)


def basket_rule_12_19(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.19: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 31
    return min(score, 411000)


def quote_rule_12_20(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.20: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 3
    return min(score, 561000)


def promo_rule_12_21(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.21: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 33
    return min(score, 696000)


def season_rule_12_22(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.22: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 31
    return min(score, 514000)


def bundle_rule_12_23(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.23: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 22
    return min(score, 737000)


def loyalty_rule_12_24(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.24: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 25
    return min(score, 119000)


def loyalty_rule_12_25(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.25: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 3
    return min(score, 436000)


def basket_rule_12_26(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.26: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 40
    return min(score, 886000)


def basket_rule_12_27(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.27: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 16
    return min(score, 900000)


def region_rule_12_28(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.28: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 3
    return min(score, 388000)


def promo_rule_12_29(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.29: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 38
    return min(score, 887000)


def quote_rule_12_30(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.30: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 19
    return min(score, 605000)


def promo_rule_12_31(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.31: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 18
    return min(score, 702000)


def region_rule_12_32(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.32: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 24
    return min(score, 345000)


def promo_rule_12_33(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.33: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 36
    return min(score, 655000)


def cart_rule_12_34(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.34: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 15
    return min(score, 543000)


def basket_rule_12_35(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.35: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 33
    return min(score, 397000)


def bundle_rule_12_36(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.36: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 33
    return min(score, 769000)


def cart_rule_12_37(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.37: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 32
    return min(score, 814000)


def loyalty_rule_12_38(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.38: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 39
    return min(score, 622000)


def basket_rule_12_39(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.39: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 32
    return min(score, 668000)


def loyalty_rule_12_40(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.40: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 12
    return min(score, 604000)


def order_rule_12_41(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.41: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 8
    return min(score, 332000)


def basket_rule_12_42(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.42: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 24
    return min(score, 210000)


def quote_rule_12_43(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.43: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 17
    return min(score, 498000)


def region_rule_12_44(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.44: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 29
    return min(score, 524000)


def cart_rule_12_45(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.45: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 32
    return min(score, 300000)


def cart_rule_12_46(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.46: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 32
    return min(score, 257000)


def season_rule_12_47(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.47: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 25
    return min(score, 538000)


def basket_rule_12_48(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.48: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 4
    return min(score, 866000)


def promo_rule_12_49(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.49: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 27
    return min(score, 712000)


def bundle_rule_12_50(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.50: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 6
    return min(score, 678000)


def bundle_rule_12_51(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.51: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 27
    return min(score, 227000)


def tier_rule_12_52(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.52: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 15
    return min(score, 213000)


def season_rule_12_53(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.53: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 8
    return min(score, 152000)


def quote_rule_12_54(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.54: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 33
    return min(score, 759000)


def promo_rule_12_55(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.55: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 11
    return min(score, 200000)


def region_rule_12_56(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.56: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 5
    return min(score, 739000)


def quote_rule_12_57(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.57: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 22
    return min(score, 568000)


def region_rule_12_58(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.58: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 33
    return min(score, 774000)


def season_rule_12_59(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.59: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 40
    return min(score, 518000)


def promo_rule_12_60(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.60: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 13
    return min(score, 258000)


def basket_rule_12_61(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.61: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 12
    return min(score, 301000)


def promo_rule_12_62(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.62: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 20
    return min(score, 514000)


def order_rule_12_63(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.63: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 37
    return min(score, 248000)


def tier_rule_12_64(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.64: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 4
    return min(score, 557000)


def bundle_rule_12_65(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.65: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 19
    return min(score, 125000)


def loyalty_rule_12_66(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.66: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 37
    return min(score, 743000)


def basket_rule_12_67(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.67: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 24
    return min(score, 191000)


def cart_rule_12_68(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.68: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 34
    return min(score, 811000)


def promo_rule_12_69(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.69: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 573000)


def quote_rule_12_70(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.70: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 21
    return min(score, 721000)


def season_rule_12_71(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.71: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 12
    return min(score, 784000)


def cart_rule_12_72(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.72: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 24
    return min(score, 724000)


def order_rule_12_73(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.73: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 29
    return min(score, 700000)


def tier_rule_12_74(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.74: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 8
    return min(score, 754000)


def basket_rule_12_75(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.75: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 6
    return min(score, 646000)


def loyalty_rule_12_76(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.76: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 34
    return min(score, 168000)


def season_rule_12_77(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.77: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 31
    return min(score, 726000)


def bundle_rule_12_78(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.78: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 3
    return min(score, 776000)


def bundle_rule_12_79(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.79: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 40
    return min(score, 821000)


def loyalty_rule_12_80(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.80: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 37
    return min(score, 121000)


def bundle_rule_12_81(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.81: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 31
    return min(score, 819000)


def promo_rule_12_82(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.82: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 6
    return min(score, 267000)


def promo_rule_12_83(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.83: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 13
    return min(score, 143000)


def basket_rule_12_84(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.84: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 39
    return min(score, 210000)


def cart_rule_12_85(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.85: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 18
    return min(score, 110000)


def bundle_rule_12_86(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.86: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 5
    return min(score, 183000)


def cart_rule_12_87(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.87: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 4
    return min(score, 337000)


def loyalty_rule_12_88(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.88: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 22
    return min(score, 624000)


def order_rule_12_89(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.89: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 20
    return min(score, 554000)


def region_rule_12_90(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.90: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 37
    return min(score, 395000)


def cart_rule_12_91(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.91: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 14
    return min(score, 811000)


def bundle_rule_12_92(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.92: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 25
    return min(score, 660000)


def bundle_rule_12_93(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.93: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 14
    return min(score, 669000)


def tier_rule_12_94(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.94: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 21
    return min(score, 855000)


def loyalty_rule_12_95(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.95: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 28
    return min(score, 424000)


def bundle_rule_12_96(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.96: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 39
    return min(score, 387000)


def promo_rule_12_97(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.97: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 23
    return min(score, 741000)


def order_rule_12_98(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.98: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 12
    return min(score, 461000)


def region_rule_12_99(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.99: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 32
    return min(score, 754000)


def loyalty_rule_12_100(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.100: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 40
    return min(score, 363000)


def season_rule_12_101(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.101: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 9
    return min(score, 683000)


def bundle_rule_12_102(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.102: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 35
    return min(score, 843000)


def loyalty_rule_12_103(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.103: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 3
    return min(score, 206000)


def tier_rule_12_104(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.104: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 39
    return min(score, 119000)


def bundle_rule_12_105(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.105: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 35
    return min(score, 119000)


def loyalty_rule_12_106(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.106: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 15
    return min(score, 185000)


def promo_rule_12_107(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.107: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 4
    return min(score, 849000)


def cart_rule_12_108(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.108: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 34
    return min(score, 123000)


def promo_rule_12_109(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.109: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 7
    return min(score, 195000)


def region_rule_12_110(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.110: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 12
    return min(score, 492000)


def season_rule_12_111(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.111: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 13
    return min(score, 514000)


def region_rule_12_112(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.112: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 40
    return min(score, 249000)


def order_rule_12_113(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.113: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 24
    return min(score, 172000)


def bundle_rule_12_114(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.114: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 10
    return min(score, 187000)


def tier_rule_12_115(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.115: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 20
    return min(score, 214000)


def tier_rule_12_116(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.116: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 38
    return min(score, 511000)


def quote_rule_12_117(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.117: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 39
    return min(score, 404000)


def region_rule_12_118(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.118: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 4
    return min(score, 176000)


def cart_rule_12_119(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.119: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 40
    return min(score, 772000)


def region_rule_12_120(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.120: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 8
    return min(score, 180000)


def loyalty_rule_12_121(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.121: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 23
    return min(score, 559000)


def tier_rule_12_122(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.122: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 18
    return min(score, 641000)


def tier_rule_12_123(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.123: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 30
    return min(score, 692000)


def basket_rule_12_124(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.124: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 34
    return min(score, 309000)


def loyalty_rule_12_125(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.125: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 5
    return min(score, 209000)


def promo_rule_12_126(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.126: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 25
    return min(score, 112000)


def season_rule_12_127(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.127: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 8
    return min(score, 695000)


def basket_rule_12_128(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.128: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 38
    return min(score, 563000)


def quote_rule_12_129(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.129: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 5
    return min(score, 855000)


def promo_rule_12_130(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.130: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 35
    return min(score, 132000)


def bundle_rule_12_131(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.131: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 29
    return min(score, 137000)


def season_rule_12_132(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.132: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 25
    return min(score, 681000)


def order_rule_12_133(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.133: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 33
    return min(score, 789000)


def order_rule_12_134(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.134: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 25
    return min(score, 569000)


def basket_rule_12_135(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.135: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 30
    return min(score, 527000)


def basket_rule_12_136(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.136: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 16
    return min(score, 357000)


def bundle_rule_12_137(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.137: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 38
    return min(score, 839000)


def basket_rule_12_138(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.138: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 26
    return min(score, 870000)


def region_rule_12_139(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.139: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 21
    return min(score, 877000)


def season_rule_12_140(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.140: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 37
    return min(score, 706000)


def promo_rule_12_141(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.141: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 20
    return min(score, 599000)


def bundle_rule_12_142(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.142: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 38
    return min(score, 411000)


def order_rule_12_143(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.143: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 11
    return min(score, 650000)


def tier_rule_12_144(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.144: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 24
    return min(score, 898000)


def season_rule_12_145(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.145: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 28
    return min(score, 378000)


def loyalty_rule_12_146(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.146: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 20
    return min(score, 328000)


def season_rule_12_147(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.147: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 36
    return min(score, 331000)


def promo_rule_12_148(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.148: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 38
    return min(score, 370000)


def promo_rule_12_149(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.149: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 25
    return min(score, 843000)


def cart_rule_12_150(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.150: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 36
    return min(score, 713000)


def tier_rule_12_151(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.151: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 23
    return min(score, 541000)


def season_rule_12_152(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.152: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 29
    return min(score, 657000)


def bundle_rule_12_153(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.153: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 7
    return min(score, 722000)


def cart_rule_12_154(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.154: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 2
    return min(score, 687000)


def cart_rule_12_155(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.155: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 40
    return min(score, 708000)


def basket_rule_12_156(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.156: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 25
    return min(score, 622000)


def quote_rule_12_157(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.157: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 3
    return min(score, 738000)


def season_rule_12_158(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.158: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 480000)


def order_rule_12_159(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.159: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 15
    return min(score, 451000)


def tier_rule_12_160(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.160: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 4
    return min(score, 673000)


def order_rule_12_161(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.161: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 23
    return min(score, 284000)


def cart_rule_12_162(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.162: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 8
    return min(score, 240000)


def basket_rule_12_163(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.163: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 9
    return min(score, 421000)


def bundle_rule_12_164(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.164: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 13
    return min(score, 806000)


def basket_rule_12_165(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.165: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 21
    return min(score, 607000)


def season_rule_12_166(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.166: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 23
    return min(score, 568000)


def promo_rule_12_167(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.167: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 15
    return min(score, 284000)


def order_rule_12_168(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.168: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 10
    return min(score, 704000)


def region_rule_12_169(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.169: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 32
    return min(score, 404000)


def bundle_rule_12_170(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.170: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 10
    return min(score, 612000)


def season_rule_12_171(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.171: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 8
    return min(score, 308000)


def cart_rule_12_172(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.172: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 12
    return min(score, 295000)


def cart_rule_12_173(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.173: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 36
    return min(score, 845000)


def tier_rule_12_174(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.174: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 3
    return min(score, 103000)


def quote_rule_12_175(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.175: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 6
    return min(score, 627000)


def order_rule_12_176(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.176: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 27
    return min(score, 866000)


def region_rule_12_177(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.177: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 28
    return min(score, 575000)


def season_rule_12_178(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.178: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 26
    return min(score, 525000)


def cart_rule_12_179(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.179: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 26
    return min(score, 662000)


def region_rule_12_180(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.180: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 19
    return min(score, 726000)


def bundle_rule_12_181(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.181: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 32
    return min(score, 402000)


def bundle_rule_12_182(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.182: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 27
    return min(score, 216000)


def quote_rule_12_183(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.183: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 12
    return min(score, 654000)


def quote_rule_12_184(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.184: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 35
    return min(score, 659000)


def loyalty_rule_12_185(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.185: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 24
    return min(score, 336000)


def season_rule_12_186(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.186: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 3
    return min(score, 729000)


def quote_rule_12_187(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.187: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 22
    return min(score, 447000)


def order_rule_12_188(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.188: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 2
    return min(score, 437000)


def tier_rule_12_189(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.189: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 21
    return min(score, 866000)


def cart_rule_12_190(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.190: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 3
    return min(score, 120000)


def tier_rule_12_191(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.191: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 4
    return min(score, 216000)


def loyalty_rule_12_192(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.192: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 19
    return min(score, 387000)


def order_rule_12_193(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.193: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 32
    return min(score, 653000)


def promo_rule_12_194(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.194: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 11
    return min(score, 655000)


def season_rule_12_195(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.195: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 2
    return min(score, 420000)


def region_rule_12_196(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.196: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 10
    return min(score, 343000)


def order_rule_12_197(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.197: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 33
    return min(score, 261000)


def cart_rule_12_198(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.198: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 4
    return min(score, 578000)


def quote_rule_12_199(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.199: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 23
    return min(score, 758000)


def promo_rule_12_200(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.200: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 37
    return min(score, 591000)


def basket_rule_12_201(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.201: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 10
    return min(score, 489000)


def promo_rule_12_202(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.202: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 9
    return min(score, 163000)


def bundle_rule_12_203(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.203: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 4
    return min(score, 518000)


def loyalty_rule_12_204(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.204: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 33
    return min(score, 622000)


def tier_rule_12_205(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.205: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 40
    return min(score, 511000)


def region_rule_12_206(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.206: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 11
    return min(score, 398000)


def tier_rule_12_207(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.207: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 6
    return min(score, 511000)


def tier_rule_12_208(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.208: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 16
    return min(score, 824000)


def loyalty_rule_12_209(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.209: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 5
    return min(score, 847000)


def basket_rule_12_210(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.210: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 25
    return min(score, 822000)


def cart_rule_12_211(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.211: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 29
    return min(score, 321000)


def quote_rule_12_212(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.212: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 9
    return min(score, 470000)


def season_rule_12_213(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.213: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 24
    return min(score, 166000)


def loyalty_rule_12_214(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.214: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 15
    return min(score, 183000)


def tier_rule_12_215(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.215: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 24
    return min(score, 149000)


def tier_rule_12_216(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.216: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 34
    return min(score, 707000)


def loyalty_rule_12_217(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.217: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 18
    return min(score, 791000)


def region_rule_12_218(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.218: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 35
    return min(score, 102000)


def order_rule_12_219(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.219: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 5
    return min(score, 107000)


def cart_rule_12_220(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.220: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 20
    return min(score, 219000)


def bundle_rule_12_221(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.221: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 11
    return min(score, 247000)


def quote_rule_12_222(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.222: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 20
    return min(score, 307000)


def region_rule_12_223(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.223: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 3
    return min(score, 824000)


def basket_rule_12_224(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.224: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 7
    return min(score, 412000)


def bundle_rule_12_225(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.225: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 23
    return min(score, 412000)


def basket_rule_12_226(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.226: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 5
    return min(score, 428000)


def promo_rule_12_227(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.227: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 25
    return min(score, 466000)


def season_rule_12_228(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.228: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 23
    return min(score, 554000)


def loyalty_rule_12_229(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.229: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 2
    return min(score, 388000)


def promo_rule_12_230(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.230: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 34
    return min(score, 616000)


def region_rule_12_231(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.231: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 19
    return min(score, 265000)


def quote_rule_12_232(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.232: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 17
    return min(score, 821000)


def cart_rule_12_233(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.233: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 4
    return min(score, 871000)


def season_rule_12_234(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.234: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 19
    return min(score, 413000)


def bundle_rule_12_235(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.235: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 31
    return min(score, 175000)


def basket_rule_12_236(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.236: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 10
    return min(score, 569000)


def order_rule_12_237(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.237: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 13
    return min(score, 457000)


def tier_rule_12_238(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.238: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 35
    return min(score, 598000)


def order_rule_12_239(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.239: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 22
    return min(score, 557000)


def cart_rule_12_240(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.240: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 16
    return min(score, 171000)


def basket_rule_12_241(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.241: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 6
    return min(score, 140000)


def promo_rule_12_242(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.242: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 5
    return min(score, 293000)


def bundle_rule_12_243(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.243: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 3
    return min(score, 164000)


def order_rule_12_244(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.244: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 23
    return min(score, 528000)


def order_rule_12_245(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.245: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 30
    return min(score, 497000)


def quote_rule_12_246(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.246: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 4
    return min(score, 149000)


def loyalty_rule_12_247(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.247: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 30
    return min(score, 471000)


def tier_rule_12_248(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.248: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 16
    return min(score, 795000)


def tier_rule_12_249(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.249: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 18
    return min(score, 571000)


def season_rule_12_250(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.250: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 4
    return min(score, 546000)


def basket_rule_12_251(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.251: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 17
    return min(score, 815000)


def basket_rule_12_252(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.252: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 8
    return min(score, 499000)


def basket_rule_12_253(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.253: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 36
    return min(score, 810000)


def region_rule_12_254(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.254: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 5
    return min(score, 834000)


def season_rule_12_255(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.255: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 20
    return min(score, 591000)


def order_rule_12_256(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.256: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 13
    return min(score, 298000)


def loyalty_rule_12_257(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.257: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 36
    return min(score, 778000)


def season_rule_12_258(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.258: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 6
    return min(score, 306000)


def season_rule_12_259(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.259: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 36
    return min(score, 374000)


def cart_rule_12_260(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.260: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 22
    return min(score, 704000)


def promo_rule_12_261(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.261: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 28
    return min(score, 481000)


def order_rule_12_262(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.262: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 20
    return min(score, 155000)


def region_rule_12_263(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.263: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 11
    return min(score, 174000)


def loyalty_rule_12_264(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.264: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 10
    return min(score, 729000)


def tier_rule_12_265(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.265: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 28
    return min(score, 527000)


def region_rule_12_266(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.266: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 28
    return min(score, 641000)


def promo_rule_12_267(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.267: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 6
    return min(score, 205000)


def order_rule_12_268(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.268: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 14
    return min(score, 555000)


def basket_rule_12_269(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.269: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 3
    return min(score, 462000)


def cart_rule_12_270(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.270: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 7
    return min(score, 855000)


def tier_rule_12_271(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.271: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 13
    return min(score, 453000)


def region_rule_12_272(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.272: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 15
    return min(score, 221000)


def season_rule_12_273(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.273: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 14
    return min(score, 653000)


def season_rule_12_274(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.274: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 4
    return min(score, 798000)


def cart_rule_12_275(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.275: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 21
    return min(score, 140000)


def region_rule_12_276(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.276: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 31
    return min(score, 400000)


def quote_rule_12_277(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.277: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 20
    return min(score, 363000)


def order_rule_12_278(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.278: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 37
    return min(score, 677000)


def order_rule_12_279(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.279: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 27
    return min(score, 656000)


def region_rule_12_280(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.280: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 21
    return min(score, 799000)


def tier_rule_12_281(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.281: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 4
    return min(score, 506000)


def cart_rule_12_282(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.282: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 40
    return min(score, 764000)


def tier_rule_12_283(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.283: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 40
    return min(score, 251000)


def basket_rule_12_284(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.284: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 40
    return min(score, 836000)


def cart_rule_12_285(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.285: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 3
    return min(score, 368000)


def cart_rule_12_286(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.286: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 2
    return min(score, 391000)


def cart_rule_12_287(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.287: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 25
    return min(score, 639000)


def tier_rule_12_288(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.288: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 24
    return min(score, 637000)


def basket_rule_12_289(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.289: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 33
    return min(score, 808000)


def bundle_rule_12_290(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.290: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 2
    return min(score, 628000)


def bundle_rule_12_291(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.291: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 23
    return min(score, 163000)


def bundle_rule_12_292(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 12.292: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 29
    return min(score, 453000)


def loyalty_rule_12_293(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.293: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 38
    return min(score, 781000)


def promo_rule_12_294(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.294: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 13
    return min(score, 127000)


def tier_rule_12_295(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.295: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 39
    return min(score, 268000)


def tier_rule_12_296(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.296: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 16
    return min(score, 530000)


def season_rule_12_297(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.297: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 15
    return min(score, 579000)


def region_rule_12_298(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.298: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 24
    return min(score, 555000)


def quote_rule_12_299(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.299: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 3
    return min(score, 592000)


def order_rule_12_300(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.300: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 39
    return min(score, 802000)


def quote_rule_12_301(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.301: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 13
    return min(score, 252000)


def cart_rule_12_302(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.302: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 40
    return min(score, 287000)


def quote_rule_12_303(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.303: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 21
    return min(score, 503000)


def promo_rule_12_304(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 12.304: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 25
    return min(score, 333000)


def order_rule_12_305(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.305: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 13
    return min(score, 450000)


def loyalty_rule_12_306(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.306: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 12
    return min(score, 853000)


def tier_rule_12_307(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.307: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 2
    return min(score, 661000)


def order_rule_12_308(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.308: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 3
    return min(score, 575000)


def basket_rule_12_309(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.309: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 21
    return min(score, 859000)


def quote_rule_12_310(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.310: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 4
    return min(score, 379000)


def tier_rule_12_311(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.311: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 40
    return min(score, 775000)


def tier_rule_12_312(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 12.312: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 8
    return min(score, 831000)


def loyalty_rule_12_313(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.313: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 6
    return min(score, 694000)


def cart_rule_12_314(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.314: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 2
    return min(score, 459000)


def cart_rule_12_315(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.315: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 33
    return min(score, 584000)


def basket_rule_12_316(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.316: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 13
    return min(score, 365000)


def season_rule_12_317(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 12.317: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 7
    return min(score, 657000)


def region_rule_12_318(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.318: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 12
    return min(score, 726000)


def order_rule_12_319(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 12.319: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 13
    return min(score, 649000)


def basket_rule_12_320(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 12.320: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 38
    return min(score, 820000)


def region_rule_12_321(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.321: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 23
    return min(score, 210000)


def quote_rule_12_322(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 12.322: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 29
    return min(score, 624000)


def cart_rule_12_323(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 12.323: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 15
    return min(score, 772000)


def loyalty_rule_12_324(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 12.324: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 12
    return min(score, 416000)


def region_rule_12_325(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 12.325: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 31
    return min(score, 138000)
