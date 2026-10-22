// Skyramp Testbot test package: Testbot owns and maintains everything in this folder.
import { expect, test } from '@playwright/test';
import { recommendation } from '../../demo-grpc';
import { ACCESSORY_IDS } from '../../storefront-data';

const recommend = async (product_ids: string[]) => {
  const { response, error } = await recommendation('ListRecommendations', { user_id: 'testbot-user', product_ids });
  expect(error).toBeUndefined();
  return response.product_ids as string[];
};

test.describe('RecommendationService.ListRecommendations', () => {
  test('returned product ids are sorted ascending', async () => {
    for (let i = 0; i < 10; i++) {
      const ids = await recommend(['OLJCESPC7Z']);
      expect(ids).toEqual([...ids].sort());
    }
  });

  test('with no input products only accessories are recommended', async () => {
    for (let i = 0; i < 10; i++) {
      const ids = await recommend([]);
      expect(ids.length).toBeGreaterThan(0);
      for (const id of ids) expect(ACCESSORY_IDS).toContain(id);
    }
  });
});
