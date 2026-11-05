// RESPONSIBILITY: Owns MSW transport for the Admin Dashboard. Branch identity is resolved against module-owned fixtures before response generation.
// DATA FLOW: MSW request → request/schema validation → module fixture state → response envelope → feature query/UI (admin_dashboard/dashboard_overview/mocks/handlers/AdminDashboardOverviewMockHandlers.ts)

import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { getAdminDashboardFixture } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/mocks/fixtures/AdminDashboardOverviewMockFixtures';
import type { AdminDashboardRange } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewRangeTypes';

export const adminDashboardMockHandlers = [
  http.get('*/admin/dashboard/fetchDashboardStats', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('scenario') === 'error') {
      return HttpResponse.json({ errorCode: 'ADMIN_API_INTERNAL_SERVER_ERROR', statusCode: StatusCodes.INTERNAL_SERVER_ERROR, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Dashboard data is temporarily unavailable.', data: null }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    }
    const branchId = url.searchParams.get('branchId') || undefined;
    const rawRange = url.searchParams.get('range') || 'this_month';
    const allowedRanges: readonly string[] = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'monthly', 'yearly', 'custom'];
    if (!allowedRanges.includes(rawRange)) return HttpResponse.json({ errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Unsupported dashboard range.', data: null }, { status: StatusCodes.BAD_REQUEST });
    const range = rawRange as AdminDashboardRange;
    if (range === 'custom') {
      const startDate = url.searchParams.get('startDate') || '';
      const endDate = url.searchParams.get('endDate') || '';
      const validDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
      if (!validDate(startDate) || !validDate(endDate) || startDate > endDate) return HttpResponse.json({ errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'A valid start and end date are required.', data: null }, { status: StatusCodes.BAD_REQUEST });
      return HttpResponse.json({ errorCode: 'ADMIN_API_NOT_IMPLEMENTED', statusCode: StatusCodes.NOT_IMPLEMENTED, requestId: globalThis.crypto.randomUUID(), success: false, message: 'The supplied dashboard fixtures do not contain date-granular financial aggregates for custom ranges.', data: null }, { status: StatusCodes.NOT_IMPLEMENTED });
    }
    const data = getAdminDashboardFixture(branchId, range);
    if (branchId && data === null) {
      return HttpResponse.json({ errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Dashboard branch not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    }
    return HttpResponse.json({
      success: true,
      message: 'Dashboard data loaded',
      data,
     requestId: globalThis.crypto.randomUUID()});
  }),
];
