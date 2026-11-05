import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminFinanceMockHandlers } from '../../mocks/handlers/AdminFinanceSummaryMockHandlers';
import { ADMIN_FINANCE_API } from '../../config/admin_finance_summary.url_config.ts';

const server = setupServer(...adminFinanceMockHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('FinanceSummary isolated mock pagination', () => {
  it('falls back for malformed pages and limits without changing response shape', async () => {
    const url = new URL(new URL(ADMIN_FINANCE_API.expenses, 'https://app.example.test').toString());
    url.searchParams.set('page', 'Infinity');
    url.searchParams.set('limit', '1e5');
    const response = await fetch(url);
    expect(response.ok).toBe(true);
    const body = await response.json();
    expect(body.meta.page).toBe(1);
    expect(body.meta.limit).toBe(8);
    expect(body.success).toBe(true);
  });
  it('accepts finite integer pagination requests', async () => {
    const url = new URL(new URL(ADMIN_FINANCE_API.expenses, 'https://app.example.test').toString());
    url.searchParams.set('page', '3');
    url.searchParams.set('limit', '4');
    const body = await (await fetch(url)).json();
    expect(body.meta.page).toBe(3);
    expect(body.meta.limit).toBe(4);
  });
});
