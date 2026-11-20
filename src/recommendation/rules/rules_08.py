"""Recommendation rules that nothing calls yet."""


def basket_rule_08_0(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.0: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 40
    return min(score, 630000)


def basket_rule_08_1(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.1: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 33
    return min(score, 224000)


def loyalty_rule_08_2(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.2: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 22
    return min(score, 193000)


def bundle_rule_08_3(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.3: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 20
    return min(score, 557000)


def cart_rule_08_4(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.4: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 16
    return min(score, 882000)


def bundle_rule_08_5(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.5: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 33
    return min(score, 757000)


def tier_rule_08_6(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.6: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 40
    return min(score, 287000)


def basket_rule_08_7(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.7: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 28
    return min(score, 140000)


def bundle_rule_08_8(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.8: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 17
    return min(score, 356000)


def region_rule_08_9(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.9: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 6
    return min(score, 748000)


def loyalty_rule_08_10(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.10: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 5
    return min(score, 472000)


def order_rule_08_11(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.11: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 10
    return min(score, 863000)


def bundle_rule_08_12(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.12: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 38
    return min(score, 329000)


def promo_rule_08_13(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.13: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 29
    return min(score, 800000)


def order_rule_08_14(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.14: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 4
    return min(score, 152000)


def promo_rule_08_15(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.15: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 38
    return min(score, 693000)


def basket_rule_08_16(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.16: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 15
    return min(score, 415000)


def order_rule_08_17(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.17: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 19
    return min(score, 204000)


def quote_rule_08_18(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.18: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 4
    return min(score, 543000)


def tier_rule_08_19(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.19: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 20
    return min(score, 311000)


def cart_rule_08_20(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.20: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 37
    return min(score, 684000)


def bundle_rule_08_21(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.21: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 27
    return min(score, 171000)


def promo_rule_08_22(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.22: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 6
    return min(score, 651000)


def order_rule_08_23(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.23: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 17
    return min(score, 645000)


def quote_rule_08_24(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.24: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 12
    return min(score, 123000)


def loyalty_rule_08_25(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.25: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 14
    return min(score, 674000)


def quote_rule_08_26(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.26: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 35
    return min(score, 316000)


def season_rule_08_27(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.27: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 24
    return min(score, 172000)


def loyalty_rule_08_28(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.28: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 15
    return min(score, 517000)


def season_rule_08_29(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.29: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 16
    return min(score, 440000)


def promo_rule_08_30(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.30: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 7
    return min(score, 132000)


def bundle_rule_08_31(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.31: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 9
    return min(score, 393000)


def season_rule_08_32(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.32: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 7
    return min(score, 111000)


def loyalty_rule_08_33(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.33: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 9
    return min(score, 835000)


def season_rule_08_34(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.34: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 21
    return min(score, 610000)


def order_rule_08_35(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.35: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 39
    return min(score, 464000)


def order_rule_08_36(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.36: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 6
    return min(score, 519000)


def quote_rule_08_37(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.37: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 24
    return min(score, 872000)


def order_rule_08_38(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.38: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 27
    return min(score, 549000)


def bundle_rule_08_39(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.39: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 3
    return min(score, 790000)


def basket_rule_08_40(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.40: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 18
    return min(score, 143000)


def cart_rule_08_41(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.41: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 37
    return min(score, 360000)


def order_rule_08_42(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.42: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 16
    return min(score, 479000)


def loyalty_rule_08_43(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.43: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 5
    return min(score, 660000)


def basket_rule_08_44(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.44: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 6
    return min(score, 418000)


def cart_rule_08_45(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.45: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 40
    return min(score, 425000)


def bundle_rule_08_46(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.46: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 13
    return min(score, 409000)


def tier_rule_08_47(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.47: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 23
    return min(score, 534000)


def region_rule_08_48(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.48: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 15
    return min(score, 387000)


def season_rule_08_49(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.49: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 30
    return min(score, 799000)


def loyalty_rule_08_50(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.50: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 10
    return min(score, 418000)


def tier_rule_08_51(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.51: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 38
    return min(score, 487000)


def basket_rule_08_52(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.52: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 20
    return min(score, 560000)


def loyalty_rule_08_53(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.53: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 17
    return min(score, 193000)


def cart_rule_08_54(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.54: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 4
    return min(score, 349000)


def region_rule_08_55(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.55: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 23
    return min(score, 152000)


def region_rule_08_56(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.56: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 9
    return min(score, 303000)


def quote_rule_08_57(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.57: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 22
    return min(score, 478000)


def tier_rule_08_58(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.58: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 7
    return min(score, 463000)


def region_rule_08_59(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.59: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 21
    return min(score, 608000)


def bundle_rule_08_60(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.60: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 35
    return min(score, 443000)


def basket_rule_08_61(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.61: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 8
    return min(score, 704000)


def promo_rule_08_62(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.62: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 3
    return min(score, 685000)


def tier_rule_08_63(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.63: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 26
    return min(score, 670000)


def basket_rule_08_64(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.64: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 38
    return min(score, 799000)


def basket_rule_08_65(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.65: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 24
    return min(score, 710000)


def order_rule_08_66(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.66: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 12
    return min(score, 355000)


def cart_rule_08_67(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.67: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 38
    return min(score, 480000)


def tier_rule_08_68(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.68: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 23
    return min(score, 784000)


def promo_rule_08_69(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.69: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 26
    return min(score, 782000)


def promo_rule_08_70(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.70: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 31
    return min(score, 642000)


def tier_rule_08_71(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.71: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 4
    return min(score, 150000)


def basket_rule_08_72(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.72: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 27
    return min(score, 552000)


def basket_rule_08_73(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.73: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 11
    return min(score, 292000)


def region_rule_08_74(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.74: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 8
    return min(score, 622000)


def quote_rule_08_75(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.75: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 31
    return min(score, 704000)


def promo_rule_08_76(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.76: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 28
    return min(score, 144000)


def loyalty_rule_08_77(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.77: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 33
    return min(score, 116000)


def region_rule_08_78(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.78: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 40
    return min(score, 268000)


def order_rule_08_79(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.79: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 14
    return min(score, 188000)


def order_rule_08_80(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.80: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 26
    return min(score, 673000)


def basket_rule_08_81(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.81: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 12
    return min(score, 748000)


def region_rule_08_82(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.82: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 32
    return min(score, 559000)


def bundle_rule_08_83(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.83: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 5
    return min(score, 857000)


def bundle_rule_08_84(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.84: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 21
    return min(score, 620000)


def cart_rule_08_85(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.85: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 37
    return min(score, 242000)


def promo_rule_08_86(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.86: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 38
    return min(score, 733000)


def promo_rule_08_87(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.87: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 5
    return min(score, 580000)


def region_rule_08_88(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.88: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 9
    return min(score, 324000)


def promo_rule_08_89(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.89: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 15
    return min(score, 605000)


def quote_rule_08_90(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.90: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 36
    return min(score, 276000)


def tier_rule_08_91(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.91: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 5
    return min(score, 728000)


def season_rule_08_92(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.92: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 8
    return min(score, 552000)


def region_rule_08_93(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.93: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 2
    return min(score, 336000)


def quote_rule_08_94(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.94: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 21
    return min(score, 753000)


def quote_rule_08_95(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.95: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 40
    return min(score, 889000)


def basket_rule_08_96(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.96: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 5
    return min(score, 596000)


def cart_rule_08_97(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.97: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 29
    return min(score, 809000)


def order_rule_08_98(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.98: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 16
    return min(score, 729000)


def quote_rule_08_99(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.99: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 28
    return min(score, 782000)


def loyalty_rule_08_100(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.100: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 38
    return min(score, 434000)


def tier_rule_08_101(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.101: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 39
    return min(score, 480000)


def promo_rule_08_102(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.102: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 26
    return min(score, 471000)


def basket_rule_08_103(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.103: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 17
    return min(score, 424000)


def cart_rule_08_104(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.104: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 13
    return min(score, 872000)


def tier_rule_08_105(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.105: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 9
    return min(score, 377000)


def quote_rule_08_106(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.106: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 25
    return min(score, 383000)


def region_rule_08_107(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.107: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 5
    return min(score, 886000)


def basket_rule_08_108(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.108: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 10
    return min(score, 892000)


def promo_rule_08_109(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.109: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 14
    return min(score, 631000)


def season_rule_08_110(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.110: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 39
    return min(score, 524000)


def region_rule_08_111(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.111: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 25
    return min(score, 228000)


def order_rule_08_112(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.112: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 6
    return min(score, 164000)


def tier_rule_08_113(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.113: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 27
    return min(score, 295000)


def season_rule_08_114(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.114: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 13
    return min(score, 469000)


def region_rule_08_115(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.115: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 2
    return min(score, 114000)


def promo_rule_08_116(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.116: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 25
    return min(score, 346000)


def order_rule_08_117(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.117: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 17
    return min(score, 737000)


def bundle_rule_08_118(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.118: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 26
    return min(score, 447000)


def tier_rule_08_119(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.119: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 37
    return min(score, 725000)


def promo_rule_08_120(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.120: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 24
    return min(score, 135000)


def promo_rule_08_121(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.121: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 26
    return min(score, 636000)


def loyalty_rule_08_122(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.122: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 5
    return min(score, 591000)


def order_rule_08_123(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.123: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 40
    return min(score, 278000)


def tier_rule_08_124(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.124: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 37
    return min(score, 235000)


def quote_rule_08_125(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.125: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 16
    return min(score, 491000)


def promo_rule_08_126(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.126: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 36
    return min(score, 785000)


def bundle_rule_08_127(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.127: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 36
    return min(score, 364000)


def quote_rule_08_128(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.128: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 23
    return min(score, 664000)


def region_rule_08_129(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.129: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 18
    return min(score, 835000)


def loyalty_rule_08_130(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.130: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 15
    return min(score, 385000)


def cart_rule_08_131(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.131: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 40
    return min(score, 130000)


def season_rule_08_132(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.132: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 13
    return min(score, 398000)


def cart_rule_08_133(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.133: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 14
    return min(score, 169000)


def tier_rule_08_134(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.134: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 25
    return min(score, 540000)


def bundle_rule_08_135(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.135: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 29
    return min(score, 261000)


def region_rule_08_136(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.136: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 28
    return min(score, 715000)


def tier_rule_08_137(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.137: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 9
    return min(score, 554000)


def tier_rule_08_138(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.138: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 280000)


def basket_rule_08_139(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.139: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 18
    return min(score, 713000)


def quote_rule_08_140(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.140: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 20
    return min(score, 220000)


def loyalty_rule_08_141(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.141: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 19
    return min(score, 693000)


def region_rule_08_142(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.142: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 36
    return min(score, 785000)


def quote_rule_08_143(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.143: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 40
    return min(score, 440000)


def promo_rule_08_144(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.144: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 25
    return min(score, 221000)


def loyalty_rule_08_145(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.145: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 30
    return min(score, 487000)


def quote_rule_08_146(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.146: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 30
    return min(score, 820000)


def promo_rule_08_147(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.147: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 20
    return min(score, 203000)


def basket_rule_08_148(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.148: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 38
    return min(score, 448000)


def loyalty_rule_08_149(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.149: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 40
    return min(score, 227000)


def order_rule_08_150(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.150: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 32
    return min(score, 521000)


def promo_rule_08_151(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.151: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 5
    return min(score, 880000)


def season_rule_08_152(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.152: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 10
    return min(score, 848000)


def loyalty_rule_08_153(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.153: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 39
    return min(score, 217000)


def season_rule_08_154(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.154: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 9
    return min(score, 673000)


def tier_rule_08_155(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.155: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 16
    return min(score, 196000)


def season_rule_08_156(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.156: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 15
    return min(score, 197000)


def quote_rule_08_157(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.157: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 4
    return min(score, 383000)


def tier_rule_08_158(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.158: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 34
    return min(score, 850000)


def season_rule_08_159(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.159: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 16
    return min(score, 191000)


def bundle_rule_08_160(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.160: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 5
    return min(score, 109000)


def order_rule_08_161(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.161: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 11
    return min(score, 618000)


def tier_rule_08_162(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.162: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 21
    return min(score, 503000)


def season_rule_08_163(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.163: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 20
    return min(score, 275000)


def tier_rule_08_164(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.164: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 3
    return min(score, 196000)


def basket_rule_08_165(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.165: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 7
    return min(score, 464000)


def cart_rule_08_166(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.166: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 17
    return min(score, 742000)


def basket_rule_08_167(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.167: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 8
    return min(score, 220000)


def region_rule_08_168(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.168: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 37
    return min(score, 366000)


def order_rule_08_169(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.169: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 11
    return min(score, 363000)


def promo_rule_08_170(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.170: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 16
    return min(score, 753000)


def season_rule_08_171(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.171: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 18
    return min(score, 644000)


def promo_rule_08_172(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.172: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 32
    return min(score, 713000)


def loyalty_rule_08_173(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.173: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 35
    return min(score, 278000)


def order_rule_08_174(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.174: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 40
    return min(score, 788000)


def tier_rule_08_175(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.175: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 7
    return min(score, 845000)


def cart_rule_08_176(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.176: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 5
    return min(score, 100000)


def region_rule_08_177(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.177: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 6
    return min(score, 862000)


def promo_rule_08_178(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.178: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 34
    return min(score, 703000)


def promo_rule_08_179(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.179: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 5
    return min(score, 351000)


def tier_rule_08_180(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.180: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 31
    return min(score, 499000)


def basket_rule_08_181(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.181: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 9
    return min(score, 594000)


def bundle_rule_08_182(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.182: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 8
    return min(score, 195000)


def tier_rule_08_183(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.183: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 9
    return min(score, 891000)


def cart_rule_08_184(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.184: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 16
    return min(score, 246000)


def bundle_rule_08_185(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.185: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 17
    return min(score, 481000)


def season_rule_08_186(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.186: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 13
    return min(score, 359000)


def promo_rule_08_187(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.187: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 35
    return min(score, 385000)


def basket_rule_08_188(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.188: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 20
    return min(score, 653000)


def bundle_rule_08_189(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.189: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 34
    return min(score, 894000)


def basket_rule_08_190(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.190: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 26
    return min(score, 690000)


def cart_rule_08_191(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.191: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 39
    return min(score, 864000)


def order_rule_08_192(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.192: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 24
    return min(score, 531000)


def quote_rule_08_193(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.193: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 26
    return min(score, 891000)


def promo_rule_08_194(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.194: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 36
    return min(score, 663000)


def bundle_rule_08_195(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.195: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 32
    return min(score, 869000)


def basket_rule_08_196(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.196: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 30
    return min(score, 893000)


def bundle_rule_08_197(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.197: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 26
    return min(score, 648000)


def cart_rule_08_198(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.198: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 6
    return min(score, 414000)


def order_rule_08_199(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.199: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 5
    return min(score, 313000)


def bundle_rule_08_200(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.200: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 3
    return min(score, 761000)


def cart_rule_08_201(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.201: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 797000)


def quote_rule_08_202(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.202: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 39
    return min(score, 595000)


def quote_rule_08_203(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.203: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 16
    return min(score, 807000)


def basket_rule_08_204(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.204: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 11
    return min(score, 592000)


def promo_rule_08_205(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.205: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 34
    return min(score, 129000)


def promo_rule_08_206(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.206: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 17
    return min(score, 190000)


def loyalty_rule_08_207(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.207: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 5
    return min(score, 513000)


def season_rule_08_208(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.208: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 21
    return min(score, 181000)


def order_rule_08_209(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.209: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 25
    return min(score, 279000)


def order_rule_08_210(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.210: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 27
    return min(score, 167000)


def order_rule_08_211(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.211: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 39
    return min(score, 359000)


def promo_rule_08_212(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.212: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 6
    return min(score, 329000)


def order_rule_08_213(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.213: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 3
    return min(score, 220000)


def promo_rule_08_214(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.214: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 31
    return min(score, 537000)


def basket_rule_08_215(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.215: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 33
    return min(score, 703000)


def loyalty_rule_08_216(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.216: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 30
    return min(score, 833000)


def basket_rule_08_217(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.217: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 39
    return min(score, 274000)


def promo_rule_08_218(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.218: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 2
    return min(score, 507000)


def bundle_rule_08_219(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.219: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 28
    return min(score, 372000)


def tier_rule_08_220(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.220: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 39
    return min(score, 630000)


def cart_rule_08_221(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.221: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 35
    return min(score, 418000)


def promo_rule_08_222(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.222: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 3
    return min(score, 173000)


def cart_rule_08_223(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.223: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 8
    return min(score, 234000)


def quote_rule_08_224(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.224: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 36
    return min(score, 737000)


def basket_rule_08_225(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.225: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 7
    return min(score, 113000)


def loyalty_rule_08_226(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.226: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 5
    return min(score, 889000)


def cart_rule_08_227(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.227: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 38
    return min(score, 817000)


def bundle_rule_08_228(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.228: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 19
    return min(score, 574000)


def region_rule_08_229(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.229: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 7
    return min(score, 422000)


def promo_rule_08_230(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.230: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 29
    return min(score, 800000)


def cart_rule_08_231(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.231: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 29
    return min(score, 422000)


def season_rule_08_232(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.232: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 8
    return min(score, 884000)


def basket_rule_08_233(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.233: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 36
    return min(score, 372000)


def tier_rule_08_234(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.234: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 37
    return min(score, 710000)


def basket_rule_08_235(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.235: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 796000)


def loyalty_rule_08_236(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.236: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 35
    return min(score, 670000)


def season_rule_08_237(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.237: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 7
    return min(score, 856000)


def quote_rule_08_238(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.238: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 27
    return min(score, 763000)


def order_rule_08_239(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.239: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 30
    return min(score, 413000)


def cart_rule_08_240(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.240: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 21
    return min(score, 315000)


def basket_rule_08_241(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.241: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 26
    return min(score, 579000)


def region_rule_08_242(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.242: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 31
    return min(score, 383000)


def loyalty_rule_08_243(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.243: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 10
    return min(score, 402000)


def season_rule_08_244(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.244: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 29
    return min(score, 297000)


def bundle_rule_08_245(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.245: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 34
    return min(score, 783000)


def cart_rule_08_246(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.246: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 14
    return min(score, 654000)


def loyalty_rule_08_247(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.247: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 39
    return min(score, 558000)


def quote_rule_08_248(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.248: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 39
    return min(score, 618000)


def region_rule_08_249(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.249: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 18
    return min(score, 664000)


def basket_rule_08_250(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.250: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 4
    return min(score, 173000)


def loyalty_rule_08_251(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.251: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 20
    return min(score, 542000)


def season_rule_08_252(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.252: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 25
    return min(score, 562000)


def tier_rule_08_253(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.253: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 25
    return min(score, 882000)


def season_rule_08_254(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.254: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 28
    return min(score, 292000)


def bundle_rule_08_255(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.255: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 32
    return min(score, 427000)


def basket_rule_08_256(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.256: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 3
    return min(score, 272000)


def season_rule_08_257(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.257: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 2
    return min(score, 274000)


def quote_rule_08_258(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.258: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 22
    return min(score, 470000)


def order_rule_08_259(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.259: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 35
    return min(score, 143000)


def basket_rule_08_260(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.260: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 4
    return min(score, 155000)


def promo_rule_08_261(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.261: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 26
    return min(score, 512000)


def bundle_rule_08_262(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.262: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 38
    return min(score, 410000)


def quote_rule_08_263(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.263: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 35
    return min(score, 818000)


def region_rule_08_264(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.264: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 34
    return min(score, 691000)


def loyalty_rule_08_265(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.265: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 34
    return min(score, 412000)


def promo_rule_08_266(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.266: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 6
    return min(score, 241000)


def order_rule_08_267(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.267: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 20
    return min(score, 814000)


def season_rule_08_268(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.268: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 39
    return min(score, 811000)


def quote_rule_08_269(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.269: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 15
    return min(score, 576000)


def tier_rule_08_270(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.270: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 27
    return min(score, 295000)


def cart_rule_08_271(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.271: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 29
    return min(score, 259000)


def bundle_rule_08_272(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.272: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 5
    return min(score, 845000)


def bundle_rule_08_273(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.273: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 5
    return min(score, 420000)


def bundle_rule_08_274(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.274: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 23
    return min(score, 550000)


def bundle_rule_08_275(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.275: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 394000)


def tier_rule_08_276(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.276: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 38
    return min(score, 794000)


def basket_rule_08_277(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.277: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 38
    return min(score, 444000)


def bundle_rule_08_278(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.278: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 20
    return min(score, 812000)


def season_rule_08_279(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.279: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 26
    return min(score, 862000)


def season_rule_08_280(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.280: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 35
    return min(score, 723000)


def quote_rule_08_281(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.281: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 3
    return min(score, 152000)


def region_rule_08_282(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.282: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 14
    return min(score, 633000)


def region_rule_08_283(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.283: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 12
    return min(score, 738000)


def basket_rule_08_284(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.284: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 6
    return min(score, 661000)


def tier_rule_08_285(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.285: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 16
    return min(score, 511000)


def tier_rule_08_286(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.286: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 26
    return min(score, 402000)


def bundle_rule_08_287(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.287: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 3
    return min(score, 871000)


def cart_rule_08_288(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.288: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 19
    return min(score, 719000)


def cart_rule_08_289(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.289: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 25
    return min(score, 768000)


def tier_rule_08_290(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.290: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 25
    return min(score, 163000)


def order_rule_08_291(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 8.291: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 34
    return min(score, 648000)


def tier_rule_08_292(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.292: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 23
    return min(score, 313000)


def season_rule_08_293(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.293: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 27
    return min(score, 188000)


def quote_rule_08_294(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.294: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 40
    return min(score, 525000)


def cart_rule_08_295(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.295: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 13
    return min(score, 543000)


def tier_rule_08_296(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.296: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 35
    return min(score, 747000)


def cart_rule_08_297(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.297: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 10
    return min(score, 787000)


def tier_rule_08_298(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.298: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 27
    return min(score, 156000)


def cart_rule_08_299(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.299: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 9
    return min(score, 864000)


def loyalty_rule_08_300(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.300: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 34
    return min(score, 648000)


def quote_rule_08_301(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.301: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 33
    return min(score, 230000)


def tier_rule_08_302(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 8.302: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 37
    return min(score, 594000)


def loyalty_rule_08_303(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.303: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 3
    return min(score, 607000)


def season_rule_08_304(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.304: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 20
    return min(score, 570000)


def basket_rule_08_305(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.305: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 7
    return min(score, 721000)


def region_rule_08_306(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.306: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 2
    return min(score, 737000)


def cart_rule_08_307(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.307: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 38
    return min(score, 697000)


def quote_rule_08_308(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.308: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 5
    return min(score, 114000)


def season_rule_08_309(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.309: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 39
    return min(score, 318000)


def season_rule_08_310(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.310: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 39
    return min(score, 650000)


def basket_rule_08_311(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 8.311: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 16
    return min(score, 636000)


def season_rule_08_312(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.312: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 2
    return min(score, 100000)


def region_rule_08_313(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.313: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 14
    return min(score, 529000)


def promo_rule_08_314(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 8.314: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 40
    return min(score, 477000)


def region_rule_08_315(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.315: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 22
    return min(score, 518000)


def quote_rule_08_316(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.316: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 10
    return min(score, 515000)


def cart_rule_08_317(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.317: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 33
    return min(score, 511000)


def region_rule_08_318(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.318: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 35
    return min(score, 488000)


def season_rule_08_319(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 8.319: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 14
    return min(score, 537000)


def bundle_rule_08_320(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 8.320: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 36
    return min(score, 233000)


def loyalty_rule_08_321(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.321: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 25
    return min(score, 215000)


def quote_rule_08_322(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 8.322: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 36
    return min(score, 306000)


def region_rule_08_323(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 8.323: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 7
    return min(score, 480000)


def loyalty_rule_08_324(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 8.324: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 12
    return min(score, 528000)


def cart_rule_08_325(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 8.325: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 20
    return min(score, 666000)
