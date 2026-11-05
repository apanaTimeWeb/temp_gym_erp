import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_BILLING_USAGE_METERS_DASHBOARD_API } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/config/superadmin_billing_usage_meters_dashboard.url_config';
import { MOCK_SUPERADMIN_BILLING_USAGE_METERS } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/mocks/fixtures/SuperadminBillingUsageMetersDashboardMockFixtures';

import type { UsageMeter } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/types/superadmin_billing_usage_meters_dashboard.types';
import type { ApiResponse } from '@/lib/api';


export function filterSuperadminBillingUsageMetersByDateRange(meters: readonly UsageMeter[], params: URLSearchParams, now = new Date()): UsageMeter[] {
  let from = params.get('from') || '';
  let to = params.get('to') || '';
  const range = params.get('range') || 'this_month';
  if (range === 'this_month' && !from && !to) {
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    from = start.toISOString().slice(0, 10);
    to = end.toISOString().slice(0, 10);
  } else if (range === 'this_week' && !from && !to) {
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const mondayOffset = (today.getUTCDay() + 6) % 7;
    const start = new Date(today); start.setUTCDate(start.getUTCDate() - mondayOffset);
    const end = new Date(start); end.setUTCDate(end.getUTCDate() + 6);
    from = start.toISOString().slice(0, 10); to = end.toISOString().slice(0, 10);
  }
  const isValidDate = (value: string) => { if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false; const [year = 0, month = 0, day = 0] = value.split('-').map(Number); const date = new Date(0); date.setUTCHours(0, 0, 0, 0); date.setUTCFullYear(year, month - 1, day); return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day; };
  if ((from && !isValidDate(from)) || (to && !isValidDate(to)) || (from && to && from > to)) return [];
  return meters.filter((meter) => (!from || meter.billingCycleEnd >= from) && (!to || meter.billingCycleEnd <= to));
}

const BASE_URL = `*${SUPERADMIN_BILLING_USAGE_METERS_DASHBOARD_API.BASE}`;
export const superadminUsageMetersHandlers = [
  http.get(BASE_URL, async ({ request }) => {
    await delay(200);
    const url = new URL(request.url);
    const data = filterSuperadminBillingUsageMetersByDateRange(MOCK_SUPERADMIN_BILLING_USAGE_METERS, url.searchParams);
    return HttpResponse.json<ApiResponse<UsageMeter[]>>({ success: true, message: 'Success', requestId: crypto.randomUUID(), data});
  }),
];
