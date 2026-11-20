"""Recommendation rules that nothing calls yet."""


def bundle_rule_16_0(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.0: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 25
    return min(score, 858000)


def loyalty_rule_16_1(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.1: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 8
    return min(score, 806000)


def promo_rule_16_2(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.2: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 16
    return min(score, 102000)


def quote_rule_16_3(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.3: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 21
    return min(score, 467000)


def cart_rule_16_4(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.4: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 24
    return min(score, 378000)


def quote_rule_16_5(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.5: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 24
    return min(score, 652000)


def season_rule_16_6(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.6: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 37
    return min(score, 255000)


def quote_rule_16_7(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.7: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 31
    return min(score, 581000)


def order_rule_16_8(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.8: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 40
    return min(score, 471000)


def quote_rule_16_9(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.9: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 18
    return min(score, 493000)


def basket_rule_16_10(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.10: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 32
    return min(score, 126000)


def basket_rule_16_11(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.11: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 7
    return min(score, 698000)


def region_rule_16_12(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.12: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 9
    return min(score, 311000)


def region_rule_16_13(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.13: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 11
    return min(score, 673000)


def quote_rule_16_14(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.14: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 31
    return min(score, 865000)


def promo_rule_16_15(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.15: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 33
    return min(score, 352000)


def region_rule_16_16(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.16: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 14
    return min(score, 463000)


def basket_rule_16_17(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.17: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 19
    return min(score, 392000)


def cart_rule_16_18(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.18: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 29
    return min(score, 391000)


def season_rule_16_19(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.19: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 32
    return min(score, 484000)


def promo_rule_16_20(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.20: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 12
    return min(score, 835000)


def season_rule_16_21(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.21: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 16
    return min(score, 753000)


def cart_rule_16_22(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.22: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 14
    return min(score, 175000)


def promo_rule_16_23(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.23: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 14
    return min(score, 617000)


def cart_rule_16_24(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.24: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 23
    return min(score, 643000)


def season_rule_16_25(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.25: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 12
    return min(score, 634000)


def region_rule_16_26(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.26: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 35
    return min(score, 491000)


def tier_rule_16_27(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.27: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 25
    return min(score, 441000)


def cart_rule_16_28(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.28: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 17
    return min(score, 194000)


def basket_rule_16_29(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.29: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 24
    return min(score, 736000)


def basket_rule_16_30(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.30: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 2
    return min(score, 345000)


def cart_rule_16_31(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.31: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 32
    return min(score, 340000)


def tier_rule_16_32(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.32: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 19
    return min(score, 824000)


def cart_rule_16_33(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.33: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 31
    return min(score, 676000)


def season_rule_16_34(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.34: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 23
    return min(score, 739000)


def order_rule_16_35(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.35: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 27
    return min(score, 370000)


def bundle_rule_16_36(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.36: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 28
    return min(score, 724000)


def bundle_rule_16_37(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.37: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 16
    return min(score, 761000)


def bundle_rule_16_38(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.38: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 15
    return min(score, 377000)


def cart_rule_16_39(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.39: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 18
    return min(score, 411000)


def quote_rule_16_40(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.40: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 22
    return min(score, 414000)


def basket_rule_16_41(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.41: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 4
    return min(score, 753000)


def season_rule_16_42(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.42: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 13
    return min(score, 288000)


def quote_rule_16_43(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.43: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 16
    return min(score, 528000)


def loyalty_rule_16_44(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.44: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 2
    return min(score, 212000)


def region_rule_16_45(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.45: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 40
    return min(score, 808000)


def quote_rule_16_46(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.46: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 32
    return min(score, 144000)


def region_rule_16_47(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.47: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 31
    return min(score, 844000)


def order_rule_16_48(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.48: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 15
    return min(score, 548000)


def quote_rule_16_49(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.49: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 40
    return min(score, 740000)


def loyalty_rule_16_50(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.50: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 18
    return min(score, 754000)


def order_rule_16_51(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.51: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 2
    return min(score, 754000)


def cart_rule_16_52(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.52: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 37
    return min(score, 509000)


def bundle_rule_16_53(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.53: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 16
    return min(score, 116000)


def bundle_rule_16_54(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.54: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 24
    return min(score, 130000)


def region_rule_16_55(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.55: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 9
    return min(score, 451000)


def basket_rule_16_56(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.56: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 13
    return min(score, 536000)


def bundle_rule_16_57(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.57: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 5
    return min(score, 107000)


def season_rule_16_58(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.58: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 38
    return min(score, 662000)


def quote_rule_16_59(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.59: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 24
    return min(score, 418000)


def loyalty_rule_16_60(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.60: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 33
    return min(score, 802000)


def promo_rule_16_61(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.61: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 13
    return min(score, 823000)


def loyalty_rule_16_62(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.62: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 13
    return min(score, 549000)


def promo_rule_16_63(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.63: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 9
    return min(score, 263000)


def tier_rule_16_64(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.64: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 12
    return min(score, 519000)


def season_rule_16_65(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.65: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 37
    return min(score, 326000)


def bundle_rule_16_66(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.66: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 5
    return min(score, 881000)


def cart_rule_16_67(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.67: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 6
    return min(score, 241000)


def order_rule_16_68(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.68: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 25
    return min(score, 716000)


def order_rule_16_69(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.69: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 8
    return min(score, 656000)


def promo_rule_16_70(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.70: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 23
    return min(score, 811000)


def quote_rule_16_71(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.71: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 9
    return min(score, 292000)


def promo_rule_16_72(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.72: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 22
    return min(score, 603000)


def season_rule_16_73(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.73: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 36
    return min(score, 297000)


def loyalty_rule_16_74(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.74: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 30
    return min(score, 280000)


def bundle_rule_16_75(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.75: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 20
    return min(score, 816000)


def basket_rule_16_76(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.76: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 30
    return min(score, 652000)


def season_rule_16_77(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.77: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 18
    return min(score, 470000)


def basket_rule_16_78(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.78: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 15
    return min(score, 422000)


def promo_rule_16_79(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.79: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 17
    return min(score, 764000)


def basket_rule_16_80(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.80: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 24
    return min(score, 729000)


def quote_rule_16_81(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.81: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 30
    return min(score, 356000)


def quote_rule_16_82(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.82: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 14
    return min(score, 594000)


def region_rule_16_83(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.83: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 14
    return min(score, 586000)


def basket_rule_16_84(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.84: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 31
    return min(score, 850000)


def cart_rule_16_85(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.85: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 27
    return min(score, 552000)


def basket_rule_16_86(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.86: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 2
    return min(score, 203000)


def region_rule_16_87(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.87: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 40
    return min(score, 844000)


def promo_rule_16_88(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.88: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 4
    return min(score, 610000)


def basket_rule_16_89(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.89: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 40
    return min(score, 538000)


def region_rule_16_90(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.90: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 21
    return min(score, 555000)


def season_rule_16_91(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.91: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 14
    return min(score, 241000)


def basket_rule_16_92(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.92: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 15
    return min(score, 492000)


def loyalty_rule_16_93(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.93: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 7
    return min(score, 781000)


def bundle_rule_16_94(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.94: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 23
    return min(score, 765000)


def bundle_rule_16_95(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.95: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 16
    return min(score, 213000)


def tier_rule_16_96(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.96: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 10
    return min(score, 146000)


def region_rule_16_97(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.97: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 6
    return min(score, 767000)


def region_rule_16_98(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.98: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 8
    return min(score, 536000)


def region_rule_16_99(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.99: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 15
    return min(score, 415000)


def promo_rule_16_100(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.100: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 37
    return min(score, 341000)


def tier_rule_16_101(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.101: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 3
    return min(score, 602000)


def season_rule_16_102(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.102: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 18
    return min(score, 163000)


def promo_rule_16_103(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.103: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 9
    return min(score, 151000)


def bundle_rule_16_104(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.104: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 14
    return min(score, 114000)


def season_rule_16_105(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.105: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 34
    return min(score, 506000)


def tier_rule_16_106(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.106: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 25
    return min(score, 600000)


def basket_rule_16_107(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.107: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 18
    return min(score, 440000)


def basket_rule_16_108(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.108: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 13
    return min(score, 494000)


def bundle_rule_16_109(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.109: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 31
    return min(score, 845000)


def promo_rule_16_110(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.110: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 30
    return min(score, 395000)


def basket_rule_16_111(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.111: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 20
    return min(score, 785000)


def bundle_rule_16_112(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.112: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 13
    return min(score, 899000)


def basket_rule_16_113(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.113: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 18
    return min(score, 528000)


def loyalty_rule_16_114(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.114: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 31
    return min(score, 691000)


def quote_rule_16_115(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.115: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 38
    return min(score, 181000)


def region_rule_16_116(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.116: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 16
    return min(score, 810000)


def quote_rule_16_117(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.117: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 15
    return min(score, 302000)


def cart_rule_16_118(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.118: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 40
    return min(score, 885000)


def basket_rule_16_119(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.119: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 15
    return min(score, 583000)


def bundle_rule_16_120(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.120: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 31
    return min(score, 766000)


def basket_rule_16_121(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.121: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 11
    return min(score, 862000)


def promo_rule_16_122(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.122: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 27
    return min(score, 522000)


def promo_rule_16_123(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.123: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 19
    return min(score, 750000)


def basket_rule_16_124(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.124: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 17
    return min(score, 649000)


def quote_rule_16_125(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.125: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 20
    return min(score, 481000)


def order_rule_16_126(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.126: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 6
    return min(score, 218000)


def season_rule_16_127(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.127: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 20
    return min(score, 252000)


def cart_rule_16_128(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.128: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 36
    return min(score, 887000)


def cart_rule_16_129(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.129: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 11
    return min(score, 754000)


def promo_rule_16_130(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.130: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 33
    return min(score, 779000)


def order_rule_16_131(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.131: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 33
    return min(score, 497000)


def cart_rule_16_132(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.132: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 21
    return min(score, 415000)


def cart_rule_16_133(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.133: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 27
    return min(score, 415000)


def basket_rule_16_134(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.134: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 6
    return min(score, 404000)


def bundle_rule_16_135(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.135: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 19
    return min(score, 331000)


def cart_rule_16_136(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.136: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 8
    return min(score, 428000)


def season_rule_16_137(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.137: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 8
    return min(score, 837000)


def bundle_rule_16_138(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.138: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 16
    return min(score, 708000)


def loyalty_rule_16_139(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.139: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 20
    return min(score, 393000)


def order_rule_16_140(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.140: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 33
    return min(score, 716000)


def promo_rule_16_141(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.141: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 18
    return min(score, 277000)


def tier_rule_16_142(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.142: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 3
    return min(score, 172000)


def quote_rule_16_143(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.143: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 29
    return min(score, 742000)


def bundle_rule_16_144(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.144: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 6
    return min(score, 505000)


def order_rule_16_145(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.145: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 36
    return min(score, 568000)


def season_rule_16_146(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.146: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 38
    return min(score, 783000)


def quote_rule_16_147(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.147: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 11
    return min(score, 207000)


def quote_rule_16_148(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.148: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 34
    return min(score, 418000)


def quote_rule_16_149(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.149: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 12
    return min(score, 853000)


def region_rule_16_150(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.150: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 16
    return min(score, 399000)


def order_rule_16_151(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.151: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 33
    return min(score, 463000)


def loyalty_rule_16_152(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.152: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 17
    return min(score, 363000)


def quote_rule_16_153(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.153: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 11
    return min(score, 793000)


def cart_rule_16_154(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.154: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 37
    return min(score, 869000)


def cart_rule_16_155(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.155: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 16
    return min(score, 659000)


def bundle_rule_16_156(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.156: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 26
    return min(score, 143000)


def quote_rule_16_157(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.157: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 40
    return min(score, 867000)


def cart_rule_16_158(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.158: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 20
    return min(score, 885000)


def loyalty_rule_16_159(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.159: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 11
    return min(score, 383000)


def region_rule_16_160(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.160: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 40
    return min(score, 409000)


def quote_rule_16_161(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.161: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 10
    return min(score, 518000)


def loyalty_rule_16_162(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.162: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 8
    return min(score, 496000)


def basket_rule_16_163(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.163: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 26
    return min(score, 693000)


def basket_rule_16_164(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.164: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 32
    return min(score, 704000)


def order_rule_16_165(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.165: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 9
    return min(score, 304000)


def basket_rule_16_166(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.166: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 13
    return min(score, 430000)


def season_rule_16_167(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.167: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 15
    return min(score, 610000)


def loyalty_rule_16_168(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.168: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 30
    return min(score, 214000)


def quote_rule_16_169(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.169: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 10
    return min(score, 506000)


def order_rule_16_170(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.170: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 3
    return min(score, 583000)


def tier_rule_16_171(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.171: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 4
    return min(score, 107000)


def quote_rule_16_172(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.172: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 12
    return min(score, 869000)


def bundle_rule_16_173(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.173: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 23
    return min(score, 149000)


def tier_rule_16_174(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.174: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 32
    return min(score, 429000)


def bundle_rule_16_175(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.175: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 40
    return min(score, 620000)


def basket_rule_16_176(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.176: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 25
    return min(score, 261000)


def loyalty_rule_16_177(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.177: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 19
    return min(score, 108000)


def quote_rule_16_178(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.178: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 9
    return min(score, 842000)


def region_rule_16_179(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.179: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 35
    return min(score, 700000)


def season_rule_16_180(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.180: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 30
    return min(score, 310000)


def tier_rule_16_181(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.181: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 11
    return min(score, 348000)


def quote_rule_16_182(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.182: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 14
    return min(score, 445000)


def tier_rule_16_183(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.183: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 17
    return min(score, 375000)


def cart_rule_16_184(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.184: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 18
    return min(score, 518000)


def promo_rule_16_185(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.185: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 15
    return min(score, 347000)


def season_rule_16_186(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.186: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 14
    return min(score, 332000)


def order_rule_16_187(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.187: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 12
    return min(score, 174000)


def cart_rule_16_188(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.188: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 3
    return min(score, 671000)


def quote_rule_16_189(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.189: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 23
    return min(score, 558000)


def promo_rule_16_190(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.190: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 37
    return min(score, 515000)


def tier_rule_16_191(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.191: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 27
    return min(score, 855000)


def basket_rule_16_192(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.192: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 16
    return min(score, 511000)


def basket_rule_16_193(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.193: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 23
    return min(score, 511000)


def basket_rule_16_194(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.194: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 27
    return min(score, 685000)


def order_rule_16_195(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.195: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 21
    return min(score, 631000)


def tier_rule_16_196(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.196: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 31
    return min(score, 341000)


def tier_rule_16_197(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.197: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 19
    return min(score, 504000)


def basket_rule_16_198(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.198: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 35
    return min(score, 612000)


def tier_rule_16_199(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.199: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 31
    return min(score, 898000)


def tier_rule_16_200(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.200: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 38
    return min(score, 773000)


def cart_rule_16_201(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.201: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 30
    return min(score, 761000)


def quote_rule_16_202(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.202: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 21
    return min(score, 177000)


def tier_rule_16_203(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.203: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 33
    return min(score, 816000)


def cart_rule_16_204(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.204: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 30
    return min(score, 345000)


def loyalty_rule_16_205(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.205: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 38
    return min(score, 379000)


def quote_rule_16_206(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.206: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 16
    return min(score, 779000)


def loyalty_rule_16_207(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.207: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 11
    return min(score, 461000)


def order_rule_16_208(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.208: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 15
    return min(score, 440000)


def region_rule_16_209(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.209: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 28
    return min(score, 897000)


def bundle_rule_16_210(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.210: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 36
    return min(score, 435000)


def season_rule_16_211(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.211: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 13
    return min(score, 539000)


def promo_rule_16_212(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.212: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 15
    return min(score, 661000)


def tier_rule_16_213(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.213: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 25
    return min(score, 898000)


def order_rule_16_214(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.214: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 12
    return min(score, 448000)


def basket_rule_16_215(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.215: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 31
    return min(score, 286000)


def bundle_rule_16_216(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.216: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 16
    return min(score, 332000)


def promo_rule_16_217(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.217: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 16
    return min(score, 287000)


def tier_rule_16_218(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.218: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 38
    return min(score, 317000)


def bundle_rule_16_219(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.219: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 27
    return min(score, 758000)


def bundle_rule_16_220(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.220: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 13
    return min(score, 403000)


def region_rule_16_221(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.221: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 26
    return min(score, 405000)


def order_rule_16_222(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.222: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 14
    return min(score, 562000)


def promo_rule_16_223(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.223: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 13
    return min(score, 121000)


def cart_rule_16_224(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.224: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 10
    return min(score, 166000)


def promo_rule_16_225(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.225: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 29
    return min(score, 399000)


def cart_rule_16_226(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.226: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 28
    return min(score, 371000)


def quote_rule_16_227(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.227: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 2
    return min(score, 284000)


def bundle_rule_16_228(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.228: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 10
    return min(score, 797000)


def basket_rule_16_229(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.229: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 15
    return min(score, 406000)


def season_rule_16_230(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.230: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 17
    return min(score, 730000)


def cart_rule_16_231(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.231: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 29
    return min(score, 885000)


def season_rule_16_232(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.232: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 10
    return min(score, 836000)


def basket_rule_16_233(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.233: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 18
    return min(score, 509000)


def order_rule_16_234(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.234: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 37
    return min(score, 142000)


def loyalty_rule_16_235(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.235: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 34
    return min(score, 154000)


def cart_rule_16_236(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.236: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 39
    return min(score, 212000)


def region_rule_16_237(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.237: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 16
    return min(score, 840000)


def tier_rule_16_238(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.238: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 23
    return min(score, 791000)


def promo_rule_16_239(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.239: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 26
    return min(score, 900000)


def loyalty_rule_16_240(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.240: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 30
    return min(score, 204000)


def promo_rule_16_241(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.241: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 15
    return min(score, 803000)


def order_rule_16_242(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.242: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 13
    return min(score, 564000)


def region_rule_16_243(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.243: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 40
    return min(score, 575000)


def basket_rule_16_244(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.244: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 3
    return min(score, 197000)


def promo_rule_16_245(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.245: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 30
    return min(score, 464000)


def basket_rule_16_246(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.246: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 14
    return min(score, 893000)


def loyalty_rule_16_247(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.247: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 33
    return min(score, 279000)


def cart_rule_16_248(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.248: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 4
    return min(score, 171000)


def order_rule_16_249(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.249: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 35
    return min(score, 413000)


def cart_rule_16_250(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.250: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 3
    return min(score, 199000)


def cart_rule_16_251(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.251: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 5
    return min(score, 754000)


def order_rule_16_252(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.252: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 35
    return min(score, 671000)


def tier_rule_16_253(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.253: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 16
    return min(score, 627000)


def tier_rule_16_254(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.254: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 28
    return min(score, 285000)


def season_rule_16_255(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.255: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 15
    return min(score, 620000)


def promo_rule_16_256(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.256: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 10
    return min(score, 597000)


def order_rule_16_257(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.257: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 13
    return min(score, 805000)


def basket_rule_16_258(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.258: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 35
    return min(score, 234000)


def season_rule_16_259(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.259: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 24
    return min(score, 361000)


def loyalty_rule_16_260(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.260: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 26
    return min(score, 501000)


def promo_rule_16_261(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.261: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 2
    return min(score, 596000)


def season_rule_16_262(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.262: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 35
    return min(score, 667000)


def quote_rule_16_263(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.263: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 29
    return min(score, 841000)


def loyalty_rule_16_264(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.264: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 3
    return min(score, 747000)


def loyalty_rule_16_265(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.265: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 12
    return min(score, 125000)


def order_rule_16_266(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.266: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 19
    return min(score, 382000)


def promo_rule_16_267(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.267: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 18
    return min(score, 195000)


def loyalty_rule_16_268(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.268: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 22
    return min(score, 707000)


def basket_rule_16_269(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.269: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 30
    return min(score, 101000)


def basket_rule_16_270(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.270: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 18
    return min(score, 677000)


def loyalty_rule_16_271(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.271: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 22
    return min(score, 445000)


def region_rule_16_272(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.272: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 11
    return min(score, 900000)


def quote_rule_16_273(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.273: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 8
    return min(score, 578000)


def tier_rule_16_274(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.274: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 23
    return min(score, 338000)


def bundle_rule_16_275(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.275: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 4
    return min(score, 678000)


def bundle_rule_16_276(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.276: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 38
    return min(score, 802000)


def region_rule_16_277(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.277: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 4
    return min(score, 225000)


def region_rule_16_278(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.278: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 23
    return min(score, 639000)


def loyalty_rule_16_279(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.279: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 36
    return min(score, 412000)


def cart_rule_16_280(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.280: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 28
    return min(score, 362000)


def region_rule_16_281(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.281: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 13
    return min(score, 221000)


def loyalty_rule_16_282(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.282: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 8
    return min(score, 168000)


def promo_rule_16_283(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.283: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 17
    return min(score, 659000)


def tier_rule_16_284(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.284: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 20
    return min(score, 736000)


def basket_rule_16_285(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.285: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 31
    return min(score, 649000)


def quote_rule_16_286(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.286: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 19
    return min(score, 153000)


def basket_rule_16_287(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.287: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 15
    return min(score, 338000)


def bundle_rule_16_288(items: int, units: int) -> int:
    """Score a bundle by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("bundle rule 16.288: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 22
    return min(score, 530000)


def cart_rule_16_289(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.289: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 14
    return min(score, 435000)


def basket_rule_16_290(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.290: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 2
    return min(score, 487000)


def tier_rule_16_291(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.291: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 15
    return min(score, 735000)


def tier_rule_16_292(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.292: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 15
    return min(score, 188000)


def season_rule_16_293(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.293: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 32
    return min(score, 215000)


def region_rule_16_294(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.294: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 12
    return min(score, 673000)


def loyalty_rule_16_295(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.295: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 18
    return min(score, 384000)


def order_rule_16_296(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.296: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 20
    return min(score, 547000)


def order_rule_16_297(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.297: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 28
    return min(score, 365000)


def cart_rule_16_298(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.298: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 26
    return min(score, 145000)


def season_rule_16_299(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.299: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 16
    return min(score, 395000)


def season_rule_16_300(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.300: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 15
    return min(score, 406000)


def order_rule_16_301(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.301: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 36
    return min(score, 229000)


def order_rule_16_302(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.302: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 11
    return min(score, 794000)


def loyalty_rule_16_303(items: int, units: int) -> int:
    """Score a loyalty by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("loyalty rule 16.303: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 5
    return min(score, 760000)


def season_rule_16_304(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.304: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 22
    return min(score, 646000)


def promo_rule_16_305(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.305: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 6
    return min(score, 325000)


def tier_rule_16_306(items: int, units: int) -> int:
    """Score a tier by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("tier rule 16.306: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 24
    return min(score, 701000)


def order_rule_16_307(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.307: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 13
    return min(score, 195000)


def order_rule_16_308(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.308: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 10
    return min(score, 599000)


def season_rule_16_309(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.309: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 16
    return min(score, 304000)


def basket_rule_16_310(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.310: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 40
    return min(score, 667000)


def promo_rule_16_311(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.311: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 35
    return min(score, 365000)


def season_rule_16_312(items: int, units: int) -> int:
    """Score a season by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("season rule 16.312: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 24
    return min(score, 387000)


def cart_rule_16_313(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.313: negative input")
    score = 0
    for k in range(items):
        if k % 4 == 0:
            score += units // 4
        else:
            score += k * 22
    return min(score, 582000)


def promo_rule_16_314(items: int, units: int) -> int:
    """Score a promo by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("promo rule 16.314: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 11
    return min(score, 699000)


def region_rule_16_315(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.315: negative input")
    score = 0
    for k in range(items):
        if k % 2 == 0:
            score += units // 2
        else:
            score += k * 5
    return min(score, 647000)


def basket_rule_16_316(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.316: negative input")
    score = 0
    for k in range(items):
        if k % 5 == 0:
            score += units // 5
        else:
            score += k * 26
    return min(score, 406000)


def basket_rule_16_317(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.317: negative input")
    score = 0
    for k in range(items):
        if k % 8 == 0:
            score += units // 8
        else:
            score += k * 13
    return min(score, 342000)


def quote_rule_16_318(items: int, units: int) -> int:
    """Score a quote by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("quote rule 16.318: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 5
    return min(score, 771000)


def order_rule_16_319(items: int, units: int) -> int:
    """Score a order by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("order rule 16.319: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 3
    return min(score, 246000)


def region_rule_16_320(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.320: negative input")
    score = 0
    for k in range(items):
        if k % 6 == 0:
            score += units // 6
        else:
            score += k * 22
    return min(score, 185000)


def basket_rule_16_321(items: int, units: int) -> int:
    """Score a basket by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("basket rule 16.321: negative input")
    score = 0
    for k in range(items):
        if k % 3 == 0:
            score += units // 3
        else:
            score += k * 31
    return min(score, 176000)


def cart_rule_16_322(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.322: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 13
    return min(score, 184000)


def cart_rule_16_323(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.323: negative input")
    score = 0
    for k in range(items):
        if k % 7 == 0:
            score += units // 7
        else:
            score += k * 17
    return min(score, 879000)


def region_rule_16_324(items: int, units: int) -> int:
    """Score a region by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("region rule 16.324: negative input")
    score = 0
    for k in range(items):
        if k % 10 == 0:
            score += units // 10
        else:
            score += k * 18
    return min(score, 252000)


def cart_rule_16_325(items: int, units: int) -> int:
    """Score a cart by item count and total units."""
    if items < 0 or units < 0:
        raise ValueError("cart rule 16.325: negative input")
    score = 0
    for k in range(items):
        if k % 9 == 0:
            score += units // 9
        else:
            score += k * 8
    return min(score, 225000)
