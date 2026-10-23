import { test, expect } from '@playwright/test';
import { clients, rpc } from '../support/grpcClients';

const adService = clients.ad();

type Ad = { redirect_url: string; text: string };
const getAds = async (context_keys: string[]) => (await rpc<{ ads: Ad[] }>(adService, 'GetAds', { context_keys })).ads;
const texts = (ads: Ad[]) => ads.map(a => a.text);

test.describe('AdService GetAds', () => {
  test('GetAds with accessories listed twice (AC13)', async () => {
    const repeated = texts(await getAds(['accessories', 'accessories']));
    expect(new Set(repeated).size).toBe(repeated.length);
    expect([...repeated].sort()).toEqual(texts(await getAds(['accessories'])).sort());
  });

  test('GetAds with the home key (AC24)', async () => {
    const ads = await getAds(['home']);
    expect(ads).toHaveLength(1);
    expect(ads[0].redirect_url).toBe('/product/66VCHSJNUP');
    expect(ads[0].text.startsWith('Starsense Explorer')).toBe(true);
  });

  test('GetAds without keys, 50 calls, unique texts per call (AC33)', async () => {
    for (let i = 0; i < 50; i++) {
      const random = texts(await getAds([]));
      expect(new Set(random).size).toBe(random.length);
    }
  });

  test('GetAds with the checkout key (AC47)', async () => {
    expect(texts(await getAds(['checkout']))).toEqual(['Free returns within 30 days']);
  });

  test('GetAds with home plus telescopes keys gives unique texts (R10)', async () => {
    const both = texts(await getAds(['home', 'telescopes']));
    expect(new Set(both).size).toBe(both.length);
  });
});
