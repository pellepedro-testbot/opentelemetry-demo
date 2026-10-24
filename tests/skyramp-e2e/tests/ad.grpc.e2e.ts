import { expect, test } from '@playwright/test';
import { FREE_RETURNS_AD_TEXT, STARSENSE_AD_TEXT } from '../support/catalog';
import { callOk, services } from '../support/grpcClients';

type Ad = { redirect_url: string; text: string };

const getAds = async (contextKeys: string[]) =>
  (await callOk<{ ads: Ad[] }>(services.ad, 'GetAds', { context_keys: contextKeys })).ads;

const distinct = (ads: Ad[]) => new Set(ads.map(a => `${a.text}|${a.redirect_url}`)).size;

test.describe('ad service contract', () => {
  test('Pasted text AC13, variant 1', async () => {
    const ads = await getAds(['accessories', 'accessories']);
    expect(ads).toHaveLength(3);
    expect(distinct(ads)).toBe(3);
  });

  test('Pasted text AC13, variant 2', async () => {
    const ads = await getAds(['telescopes', 'telescopes']);
    expect(ads).toHaveLength(1);
    expect(ads[0].text).toMatch(STARSENSE_AD_TEXT);
  });

  test('Pasted text AC24', async () => {
    for (let i = 0; i < 5; i++) {
      const ads = await getAds(['home']);
      expect(ads).toHaveLength(1);
      expect(ads[0].redirect_url).toBe('/product/66VCHSJNUP');
      expect(ads[0].text).toMatch(STARSENSE_AD_TEXT);
    }
  });

  test('Pasted text AC33, variant 1', async () => {
    for (let i = 0; i < 50; i++) {
      const ads = await getAds([]);
      expect(ads).toHaveLength(2);
      expect(distinct(ads)).toBe(2);
    }
  });

  test('Pasted text AC33, variant 2', async () => {
    for (let i = 0; i < 30; i++) {
      const ads = await getAds(['books']);
      expect(distinct(ads)).toBe(ads.length);
      expect(ads.map(a => a.text)).not.toContain(FREE_RETURNS_AD_TEXT);
    }
  });

  test('Pasted text AC47', async () => {
    const ads = await getAds(['checkout']);
    expect(ads).toHaveLength(1);
    expect(ads[0].text).toBe(FREE_RETURNS_AD_TEXT);
  });
});
