import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminPlansRevenueMockHandlers } from '../mocks/handlers/AdminFinancePlanRevenueAnalyticsMockHandlers';
const server = setupServer(...adminPlansRevenueMockHandlers);
const url = 'https://rbg114.example/admin/plans/fetchPlanRevenue';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
async function get(query: string) { const res = await fetch(`${url}?${query}`); expect(res.ok).toBe(true); return res.json(); }
describe('RBG114 mock HTTP request boundaries', () => {
  it('clamps out-of-range pages and returns coherent metadata', async () => {
    const body = await get('page=999999&limit=1');
    expect(body.meta).toMatchObject({ page: 3, limit: 1, totalPages: 3, hasNextPage: false, hasPrevPage: true });
    expect(body.data).toHaveLength(1);
  });
  it('trims searches and safely validates sorting, limits and periods', async () => {
    expect((await get('search=%20annual%20&page=5')).meta).toMatchObject({ total: 1, page: 1 });
    const invalid = await get('sortKey=__proto__&sortDir=invalid&limit=999999999999');
    expect(invalid.meta.limit).toBe(100);
    expect(invalid.data[0].planName).toBe('Annual Pro');
    expect((await get('period=invalid')).meta.period).toBe('THIS_MONTH');
  });
});
