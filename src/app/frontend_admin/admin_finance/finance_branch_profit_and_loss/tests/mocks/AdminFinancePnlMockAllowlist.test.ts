// RBG115: repository-native MSW protocol checks (authored; host execution pending).
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminFinancePnlMockHandlers } from '../../mocks/handlers/AdminFinanceBranchProfitAndLossMockHandlers';
import { ADMIN_FINANCE_PNL_API_URL } from '../../config/admin_finance_branch_profit_and_loss.url_config';
const server = setupServer(...adminFinancePnlMockHandlers);
const url = `https://rbg115.example${ADMIN_FINANCE_PNL_API_URL}`;
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
async function request(query: string) {
  const response = await fetch(`${url}?${query}`);
  expect(response.ok).toBe(true);
  return response.json();
}
describe('RBG115 allowlisted P&L MSW queries', () => {
  it('falls back on invalid periods, status, sort key and direction', async () => {
    const baseline = await request('period=THIS_MONTH');
    const invalid = await request('period=__proto__&status=weird&sortKey=__proto__&sortDir=weird');
    expect(invalid.data.map((r: {branchId: string}) => r.branchId)).toEqual(baseline.data.map((r: {branchId: string}) => r.branchId));
  });
  it('preserves allowed status filtering and numeric sort order', async () => {
    const filtered = await request('status=LOSS');
    expect(filtered.data).toHaveLength(1);
    expect(filtered.data[0].status).toBe('LOSS');
    const asc = await request('sortKey=revenue&sortDir=asc');
    expect(asc.data[0].revenue).toBeLessThanOrEqual(asc.data[1].revenue);
  });
});
