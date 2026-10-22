// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { ad } from '../../demo-grpc';

type Ad = { redirect_url: string; text: string };

const getAds = async (context_keys: string[]) => {
  const { response, error } = await ad('GetAds', { context_keys });
  expect(error).toBeUndefined();
  return response.ads as Ad[];
};

const keyOf = (a: Ad) => `${a.redirect_url}|${a.text}`;

test.describe('AdService.GetAds', () => {
  test('Pasted text AC13: GetAds with ["accessories", "accessories"]', async () => {
    const twice = (await getAds(['accessories', 'accessories'])).map(keyOf);
    const once = (await getAds(['accessories'])).map(keyOf);
    expect(new Set(twice).size).toBe(twice.length);
    expect(twice.sort()).toEqual(once.sort());
    expect(twice).toHaveLength(3);
  });

  test('Pasted text AC24: GetAds with ["home"]', async () => {
    for (let i = 0; i < 5; i++) {
      const ads = await getAds(['home']);
      expect(ads).toHaveLength(1);
      expect(ads[0].redirect_url).toBe('/product/66VCHSJNUP');
      expect(ads[0].text).toContain('Starsense Explorer');
    }
  });
});
