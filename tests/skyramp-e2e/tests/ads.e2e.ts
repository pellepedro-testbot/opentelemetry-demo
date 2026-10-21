// Ad service: ads for every category of a page (AdCatalog) and the same ads
// throughout a visit (SessionAds).
import { expect, test } from '@playwright/test';
import { call } from '../grpc-clients';
import { promQuery } from '../prometheus';
import { sleep, uniqueId } from '../stack';

interface Ad {
  redirect_url: string;
  text: string;
}

const CATALOG: Record<string, Ad[]> = {
  binoculars: [{ redirect_url: '/product/2ZYFJ3GM2N', text: 'Roof Binoculars for sale. 50% off.' }],
  telescopes: [{ redirect_url: '/product/66VCHSJNUP', text: 'Starsense Explorer Refractor Telescope for sale. 20% off.' }],
  accessories: [
    { redirect_url: '/product/0PUK6V6EV0', text: 'Solar System Color Imager for sale. 30% off.' },
    { redirect_url: '/product/6E92ZMYYFZ', text: 'Solar Filter for sale. Buy two, get third one for free' },
    { redirect_url: '/product/L9ECAV7KIM', text: 'Lens Cleaning Kit for sale. Buy one, get second one for free' },
  ],
  assembly: [{ redirect_url: '/product/9SIQT8TOJO', text: 'Optical Tube Assembly for sale. 10% off.' }],
  travel: [
    {
      redirect_url: '/product/1YMWWN1N4O',
      text: 'Eclipsmart Travel Refractor Telescope for sale. Buy one, get second kit for free',
    },
  ],
};
const ALL_URLS = Object.values(CATALOG).flat().map(a => a.redirect_url);
const ACCESSORY_URLS = CATALOG.accessories.map(a => a.redirect_url);

async function getAds(contextKeys: string[], sessionId?: string): Promise<Ad[]> {
  const metadata: Record<string, string> = sessionId ? { baggage: `session.id=${sessionId}` } : {};
  const res = await call<{ ads: Ad[] }>('AdService', 'GetAds', { context_keys: contextKeys }, metadata);
  return res.ads;
}

const urls = (ads: Ad[]) => ads.map(a => a.redirect_url);

test.describe('ads for the categories of a page', () => {
  test('a repeated category yields each ad once and every category is served', async () => {
    const got = urls(await getAds(['telescopes', 'binoculars', 'Telescopes']));
    expect(new Set(got).size, `duplicates in ${got}`).toBe(got.length);
    expect(got.filter(u => u === '/product/66VCHSJNUP')).toHaveLength(1);
    expect(got.filter(u => u === '/product/2ZYFJ3GM2N')).toHaveLength(1);
  });

  test('a category with three ads contributes at most two', async () => {
    const got = urls(await getAds(['accessories']));
    expect(got.length).toBeGreaterThanOrEqual(1);
    expect(got.length).toBeLessThanOrEqual(2);
    for (const u of got) expect(ACCESSORY_URLS).toContain(u);
  });

  test('several categories each get their ads, in the order asked for', async () => {
    expect(urls(await getAds(['binoculars', 'telescopes', 'travel']))).toEqual([
      '/product/2ZYFJ3GM2N',
      '/product/66VCHSJNUP',
      '/product/1YMWWN1N4O',
    ]);
    expect(urls(await getAds(['travel', 'telescopes', 'binoculars']))).toEqual([
      '/product/1YMWWN1N4O',
      '/product/66VCHSJNUP',
      '/product/2ZYFJ3GM2N',
    ]);
  });

  test('two and three category pages get one ad from every category', async () => {
    expect(urls(await getAds(['telescopes', 'binoculars']))).toEqual(['/product/66VCHSJNUP', '/product/2ZYFJ3GM2N']);
    expect(urls(await getAds(['binoculars', 'assembly', 'travel']))).toEqual([
      '/product/2ZYFJ3GM2N',
      '/product/9SIQT8TOJO',
      '/product/1YMWWN1N4O',
    ]);
  });

  test('category names are trimmed and matched case-insensitively', async () => {
    for (let i = 0; i < 5; i++) {
      expect(urls(await getAds(['  TeLeScOpEs ']))).toEqual(['/product/66VCHSJNUP']);
    }
  });

  test('blank and repeated categories are ignored', async () => {
    expect(urls(await getAds(['', '   ', 'binoculars', 'BINOCULARS']))).toEqual(['/product/2ZYFJ3GM2N']);
  });

  test('a category without ads falls back to two random catalog ads', async () => {
    const got = urls(await getAds(['books']));
    expect(got).toHaveLength(2);
    for (const u of got) expect(ALL_URLS).toContain(u);
  });

  test('a request without categories gets two random catalog ads', async () => {
    const got = urls(await getAds([]));
    expect(got).toHaveLength(2);
    for (const u of got) expect(ALL_URLS).toContain(u);
  });

  test('every category maps to the same ads as before the catalog moved', async () => {
    for (const [category, ads] of Object.entries(CATALOG)) {
      expect.soft(await getAds([category]), category).toEqual(ads.slice(0, 2));
    }
  });
});

test.describe('the same ads throughout a visit', () => {
  test('a session sees the same ads for the same page on every request', async () => {
    const session = uniqueId('visit');
    const first = await getAds([], session);
    expect(first).toHaveLength(2);
    for (let i = 0; i < 9; i++) expect(await getAds([], session)).toEqual(first);

    const accessories = await getAds(['accessories'], session);
    for (let i = 0; i < 4; i++) expect(await getAds(['accessories'], session)).toEqual(accessories);
  });

  test('requests without a session get a fresh pick', async () => {
    const pairs = new Set<string>();
    for (let i = 0; i < 20; i++) pairs.add(urls(await getAds([])).join(','));
    expect(pairs.size).toBeGreaterThan(1);
  });

  test('different sessions are remembered independently', async () => {
    const pairs = new Set<string>();
    for (let i = 0; i < 20; i++) {
      const session = uniqueId('visit');
      const first = await getAds([], session);
      expect(await getAds([], session)).toEqual(first);
      pairs.add(urls(first).join(','));
    }
    expect(pairs.size).toBeGreaterThan(1);
  });

  test('different pages of one session get their own ads', async () => {
    const session = uniqueId('visit');
    expect(urls(await getAds(['telescopes'], session))).toEqual(['/product/66VCHSJNUP']);
    expect(urls(await getAds(['binoculars'], session))).toEqual(['/product/2ZYFJ3GM2N']);
  });

  test('remembered-ads entries and lookups are exported as metrics', async () => {
    test.setTimeout(240_000);
    const hitsBefore = (await promQuery('sum(demo_ad_session_ads_lookups_total{result="hit"})')) ?? 0;
    const entriesBefore = (await promQuery('max(demo_ad_session_ads_entries)')) ?? 0;
    expect(await promQuery('sum(demo_ad_session_ads_lookups_total{result="miss"})')).toBeDefined();

    const session = uniqueId('visit');
    for (let i = 0; i < 10; i++) await getAds([], session);

    const deadline = Date.now() + 180_000;
    let hits = hitsBefore;
    let entries = entriesBefore;
    while (Date.now() < deadline && (hits - hitsBefore < 9 || entries - entriesBefore < 1)) {
      await sleep(5000);
      hits = (await promQuery('sum(demo_ad_session_ads_lookups_total{result="hit"})')) ?? hits;
      entries = (await promQuery('max(demo_ad_session_ads_entries)')) ?? entries;
    }
    expect(hits - hitsBefore).toBeGreaterThanOrEqual(9);
    expect(entries - entriesBefore).toBeGreaterThanOrEqual(1);
  });

  test('remembered ads of past visits do not accumulate without bound', async () => {
    test.setTimeout(900_000);
    const before = (await promQuery('max(demo_ad_session_ads_entries)')) ?? 0;
    const sessions = Array.from({ length: 5000 }, () => uniqueId('past-visit'));
    for (let i = 0; i < sessions.length; i += 100) {
      await Promise.all(sessions.slice(i, i + 100).map(s => getAds([], s)));
    }
    // Let the visits go idle, then read the gauge again.
    await sleep(600_000);
    const after = (await promQuery('max(demo_ad_session_ads_entries)')) ?? 0;
    expect(after - before).toBeLessThan(5000);
  });
});
