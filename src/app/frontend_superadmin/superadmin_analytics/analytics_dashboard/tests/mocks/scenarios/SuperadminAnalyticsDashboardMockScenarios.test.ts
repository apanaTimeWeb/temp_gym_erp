import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SUPERADMIN_ANALYTICS_DASHBOARD_API } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/config/superadmin_analytics_dashboard.url_config';
import { MOCK_SUPERADMIN_ANALYTICS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/mocks/fixtures/SuperadminAnalyticsDashboardMockFixtures';
import { createAnalyticsDashboardScenarioHandler, createAnalyticsDashboardEmptyScenarioData } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/mocks/scenarios/superadmin_analytics_dashboard.scenarios';


const activeData = JSON.parse(JSON.stringify(MOCK_SUPERADMIN_ANALYTICS));
const emptyData = createAnalyticsDashboardEmptyScenarioData(activeData);
const server = setupServer(createAnalyticsDashboardScenarioHandler(
  SUPERADMIN_ANALYTICS_DASHBOARD_API.BASE,
  (scenario) => scenario === 'ACTIVE' ? activeData : emptyData,
));
const requestScenario = (scenario: string) => fetch(`http://127.0.0.1${SUPERADMIN_ANALYTICS_DASHBOARD_API.BASE}?__mockScenario=${scenario}`);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('analytics_dashboard mock scenarios', () => {
  it('returns the fixture-shaped active success envelope', async () => {
    const response = await requestScenario('ACTIVE');
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toMatchObject({ success: true, data: activeData, requestId: expect.any(String) });
  });

  it('returns an empty payload derived from the owning fixture without inventing fields', async () => {
    const response = await requestScenario('EMPTY');
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toMatchObject({ success: true, data: emptyData, requestId: expect.any(String) });
  });

  it('returns the canonical server-failure envelope', async () => {
    const response = await requestScenario('SERVER_500');
    const body = await response.json();
    expect(response.status).toBe(500);
    expect(body).toMatchObject({ success: false, data: null, errorCode: 'INTERNAL_SERVER_ERROR', statusCode: 500, requestId: expect.any(String) });
  });

  it('simulates a network timeout/failure', async () => {
    await expect(requestScenario('TIMEOUT')).rejects.toThrow();
  });

  it('returns the canonical unauthorized envelope', async () => {
    const response = await requestScenario('UNAUTHORIZED');
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body).toMatchObject({ success: false, data: null, errorCode: 'UNAUTHORIZED', statusCode: 401, requestId: expect.any(String) });
  });
});
