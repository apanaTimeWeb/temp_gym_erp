import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';

import { env } from '@/config/env';
import { TRAINER_DASHBOARD_URLS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';
import { TrainerDashboardMockHandlers } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/mocks/TrainerDashboardOverviewMockHandlers';
import { TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/mocks/TrainerDashboardOverviewMockData';

const server = setupServer(...TrainerDashboardMockHandlers);
const base = env.NEXT_PUBLIC_API_URL;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => server.resetHandlers());

describe('TrainerDashboardMockHandlers', () => {
  it('returns canonical unavailable error instead of fabricated historical range aggregates', async () => {
    const endpoint = `${base}${TRAINER_DASHBOARD_URLS.API.STATS}`;
    const currentResponse = await fetch(`${endpoint}?range=this_month`);
    const currentMonth = await currentResponse.json() as { success: boolean; requestId: string; data: unknown };
    const oldResponse = await fetch(`${endpoint}?range=last_month`);
    const lastMonth = await oldResponse.json() as { success: boolean; requestId: string; data: null; errorCode: string; statusCode: number };
    expect(currentResponse.status).toBe(200);
    expect(currentMonth.success).toBe(true);
    expect(currentMonth.requestId).toEqual(expect.any(String));
    expect(currentMonth.data).toEqual(TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS);
    expect(oldResponse.status).toBe(501);
    expect(lastMonth).toMatchObject({ success: false, data: null, errorCode: 'MOCK_RANGE_NOT_AVAILABLE', statusCode: 501 });
    expect(lastMonth.requestId).toEqual(expect.any(String));
  });
});
