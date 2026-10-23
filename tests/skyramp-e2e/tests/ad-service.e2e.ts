import { expect, test } from '@playwright/test';
import { ad } from '../support/grpc-clients';

type Ad = { redirectUrl: string; text: string };

const getAds = async (contextKeys: string[]): Promise<Ad[]> => (await ad.getAds({ contextKeys })).ads;

const STARSENSE = 'Starsense Explorer Refractor Telescope for sale. 20% off.';

test.describe('AdService/GetAds', () => {
  test('Pasted text AC13', async () => {
    const ads = await getAds(['telescopes', 'telescopes']);
    expect(ads.map(a => a.text)).toEqual([STARSENSE]);
  });

  test('Pasted text AC24', async () => {
    const ads = await getAds(['home']);
    expect(ads).toHaveLength(1);
    expect(ads[0].text.startsWith('Starsense Explorer Refractor Telescope')).toBe(true);
  });

  test('Pasted text AC33', async () => {
    for (let i = 0; i < 25; i++) {
      const texts = (await getAds([])).map(a => a.text);
      expect(new Set(texts).size, texts.join(' | ')).toBe(texts.length);
    }
  });

  test('Pasted text AC47', async () => {
    const ads = await getAds(['checkout']);
    expect(ads.map(a => a.text)).toEqual(['Free returns within 30 days']);
  });

  test('Pasted text AC53', async () => {
    expect((await getAds(['Telescopes'])).map(a => a.text)).toEqual((await getAds(['telescopes'])).map(a => a.text));
    expect((await getAds(['Telescopes'])).map(a => a.text)).toEqual([STARSENSE]);
  });

  test('Pasted text AC70', async () => {
    const ads = await getAds(['cart']);
    expect(ads).toHaveLength(1);
    expect(ads[0].text).toContain('Lens Cleaning Kit');
  });

  test('Pasted text AC73', async () => {
    const ads = await getAds([' binoculars ']);
    expect(ads.map(a => a.text)).toEqual(['Roof Binoculars for sale. 50% off.']);
  });

  test('Pasted text AC87', async () => {
    const keys = ['binoculars', 'telescopes', 'accessories', 'assembly', 'travel', 'home', 'checkout', 'cart', 'empty-cart'];
    const urls: string[] = [];
    for (const key of keys) urls.push(...(await getAds([key])).map(a => a.redirectUrl));
    for (let i = 0; i < 5; i++) urls.push(...(await getAds([])).map(a => a.redirectUrl));
    expect(urls.length).toBeGreaterThan(keys.length);
    for (const url of urls) expect.soft(url).toMatch(/\?utm_source=ad$/);
  });

  test('Pasted text AC93', async () => {
    for (const keys of [['accessories'], ['accessories', 'telescopes', 'travel']]) {
      const texts = (await getAds(keys)).map(a => a.text);
      expect.soft(texts.length, keys.join(',')).toBeGreaterThanOrEqual(1);
      expect.soft(texts.length, keys.join(',')).toBeLessThanOrEqual(2);
      expect.soft(new Set(texts).size, keys.join(',')).toBe(texts.length);
    }
  });

  test('Pasted text AC100', async () => {
    const ads = await getAds(['empty-cart']);
    expect(ads).toHaveLength(1);
    expect(ads[0].text).toContain('Solar System Color Imager');
  });
});
