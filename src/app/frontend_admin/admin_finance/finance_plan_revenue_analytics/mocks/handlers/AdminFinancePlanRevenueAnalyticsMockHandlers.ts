import { normalizeAdminFinancePlanRevenueAnalyticsMockPagination } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsMockPagination';
// RESPONSIBILITY: Owns module-local MSW handlers for finance_plan_revenue_analytics; it simulates only the endpoints and fields supported by the supplied feature contract.
// DATA FLOW: MSW request → request/schema validation → module fixture state → response envelope → feature query/UI (admin_finance/finance_plan_revenue_analytics/mocks/handlers/AdminFinancePlanRevenueAnalyticsMockHandlers.ts)

import { http, HttpResponse } from 'msw';
import { ADMIN_PLANS_REVENUE_API_URL } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/config/admin_finance_plan_revenue_analytics.url_config';
import { MOCK_ADMIN_PLAN_REVENUE } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/mocks/fixtures/AdminFinancePlanRevenueAnalyticsMockFixtures';
// Validate mock HTTP inputs separately from trusted UI state. Do not widen production contracts.
const SORTABLE_FIELDS = ['planName', 'tier', 'activeSubscriptions', 'newSignups', 'renewalRate', 'totalRevenue'] as const;
const VALID_PERIODS = ['THIS_MONTH', 'LAST_MONTH', 'THIS_QUARTER', 'THIS_YEAR'] as const;
export const adminPlansRevenueMockHandlers = [
  http.get(`*${ADMIN_PLANS_REVENUE_API_URL}`, ({ request }) => {
    const url = new URL(request.url);
    const requestedPeriod = url.searchParams.get('period');
    const period = VALID_PERIODS.find((value) => value === requestedPeriod) ?? 'THIS_MONTH';
    const search = (url.searchParams.get('search') ?? '').trim().toLocaleLowerCase();
    const requestedSort = url.searchParams.get('sortKey');
    const sortKey = SORTABLE_FIELDS.find((value) => value === requestedSort) ?? 'totalRevenue';
    const sortDir = url.searchParams.get('sortDir') === 'asc' ? 'asc' : 'desc';
    const requestedPage = normalizeAdminFinancePlanRevenueAnalyticsMockPagination(url.searchParams.get('page'), 1);
    const limit = Math.min(100, normalizeAdminFinancePlanRevenueAnalyticsMockPagination(url.searchParams.get('limit'), 10));
    const filtered = MOCK_ADMIN_PLAN_REVENUE.filter((row) =>
      !search || `${row.planName} ${row.tier}`.toLocaleLowerCase().includes(search));
    const sorted = [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv : String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
    const totalPages = Math.max(1, Math.ceil(sorted.length / limit));
    const page = Math.min(requestedPage, totalPages);
    const start = (page - 1) * limit;
    const data = sorted.slice(start, start + limit);
    return HttpResponse.json({
      success: true, message: 'Success', data,
      meta: { total: sorted.length, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1, period },
      requestId: globalThis.crypto.randomUUID(),
    });
  }),
];
