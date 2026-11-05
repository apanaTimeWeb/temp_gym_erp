import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SUPERADMIN_ANALYTICS_DASHBOARD_API } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/config/superadmin_analytics_dashboard.url_config';
import { MOCK_SUPERADMIN_ANALYTICS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/mocks/fixtures/SuperadminAnalyticsDashboardMockFixtures';
import { superadminAnalyticsHandlers } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/mocks/handlers/SuperadminAnalyticsDashboardMockHandlers';


const server = setupServer(...superadminAnalyticsHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
const requestUrl = `http://localhost${SUPERADMIN_ANALYTICS_DASHBOARD_API.BASE}?timeRange=this_month`;
const pathMatcher = new RegExp(`${SUPERADMIN_ANALYTICS_DASHBOARD_API.BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\?.*)?$`);

describe('Superadmin Analytics MSW contract', () => {
  it('returns the complete fixture contract for a successful request', async () => {
    const response = await fetch(requestUrl);
    const body = await response.json();
    expect(response.ok).toBe(true);
    expect(body.data.metrics).toEqual(MOCK_SUPERADMIN_ANALYTICS.metrics);
    expect(body.data.monthly).toEqual(MOCK_SUPERADMIN_ANALYTICS.monthly);
  });

  it('supports a valid empty chart dataset with the same response schema', async () => {
    server.use(http.get(pathMatcher, () => HttpResponse.json({
      success: true,
      message: 'Success',
      data: { ...MOCK_SUPERADMIN_ANALYTICS, monthly: [], planRevenue: [] },
    })));
    const response = await fetch(requestUrl);
    const body = await response.json();
    expect(response.ok).toBe(true);
    expect(body.data.metrics).toEqual(MOCK_SUPERADMIN_ANALYTICS.metrics);
    expect(body.data.monthly).toEqual([]);
  });

  it('supports a recoverable error response for query error-state tests', async () => {
    server.use(http.get(pathMatcher, () => HttpResponse.json({ success: false, message: 'Analytics unavailable', data: null }, { status: 503 })));
    const response = await fetch(requestUrl);
    const body = await response.json();
    expect(response.status).toBe(503);
    expect(body.success).toBe(false);
    expect(body.message).toBe('Analytics unavailable');
  });
});
