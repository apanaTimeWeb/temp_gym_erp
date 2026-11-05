import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/mocks/TrainerDashboardOverviewMockData';

import { TRAINER_DASHBOARD_URLS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';

/** Canonical mock transport envelope; keep feature DTO shape and verified status codes. */
const trainerMockJson = (body: unknown, init?: Parameters<typeof HttpResponse.json>[1]) => {
  if (!body || typeof body !== 'object' || !('success' in body)) return HttpResponse.json(body as Parameters<typeof HttpResponse.json>[0], init);
  const response = body as Record<string, unknown>;
  const success = response.success === true;
  const statusCode = init?.status ?? 400;
  return HttpResponse.json({
    ...response,
    requestId: typeof response.requestId === 'string' ? response.requestId : crypto.randomUUID(),
    ...(!success ? {
      data: null,
      errorCode: typeof response.errorCode === 'string' ? response.errorCode : `MOCK_HTTP_${statusCode}`,
      statusCode,
    } : {}),
  }, { ...init, status: success ? init?.status : statusCode });
};

const BASE = env.NEXT_PUBLIC_API_URL;

export const TrainerDashboardMockHandlers = [
  http.get(`${BASE}${TRAINER_DASHBOARD_URLS.API.STATS}`, async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    // This isolated MSW fixture is a current-month snapshot, with no historical data.
    // Explicitly reject unsupported range requests rather than silently returning misleading unchanged aggregates.
    const range = url.searchParams.get('range') ?? 'this_month';
    if (range !== 'this_month') return trainerMockJson({ success: false, message: 'Historical dashboard aggregates are unavailable in the supplied mock fixture.', data: null, errorCode: 'MOCK_RANGE_NOT_AVAILABLE', statusCode: 501 }, { status: 501 });
    // The supplied fixture is a static demo snapshot, not a range-aware backend aggregate.
    // Preserve values rather than inventing scaled historical metrics.
    const data = TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS;
    return trainerMockJson({ success: true, message: 'Dashboard data fetched successfully', data });
  }),
];
