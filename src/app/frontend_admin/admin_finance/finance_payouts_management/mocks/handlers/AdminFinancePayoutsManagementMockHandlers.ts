import { normalizeAdminFinancePayoutsManagementMockPagination } from '@/app/frontend_admin/admin_finance/finance_payouts_management/utils/AdminFinancePayoutsManagementMockPagination';
// RESPONSIBILITY: Owns MSW handlers for the Admin payouts feature.
// DATA FLOW: payouts API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import type { PayoutSortKey, PnlSortKey } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';
import { PAYOUT_STATUS_VALUES } from '@/app/frontend_admin/admin_finance/finance_payouts_management/constants/AdminFinancePayoutsManagementConstants';
import { http, HttpResponse } from 'msw';

import type { AdminPayoutsJsonObject } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementMockHandlerTypes';
/**
 * parseRequestBody is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

/**
 * asRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function asRecord(value: unknown): AdminPayoutsJsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as AdminPayoutsJsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, Math.min(100, limit));
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 }  , requestId: globalThis.crypto.randomUUID()});
};

const PAYOUT_SORT_KEYS: readonly PayoutSortKey[] = ['gymName','month','grossRevenue','staffPayroll','operationalExpenses','platformFee','netProfit','payoutStatus'];
const PNL_SORT_KEYS: readonly PnlSortKey[] = ['gymName','month','revenue','cogs','grossProfit','staffCost','rentUtilities','marketing','miscExpenses','ebitda','tax','netProfit'];
const validSortKey = <T extends string>(raw: string | null, allowed: readonly T[], fallback: T): T =>
  raw !== null && allowed.includes(raw as T) ? raw as T : fallback;
const validSortDir = (raw: string | null): 'asc' | 'desc' => raw === 'asc' ? 'asc' : 'desc';

import { MOCK_PAYOUTS, MOCK_PNL } from '@/app/frontend_admin/admin_finance/finance_payouts_management/mocks/fixtures/AdminFinancePayoutsManagementMockFixtures';

export const adminPayoutsMockHandlers = [
  http.get('*/admin/payouts', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('scenario') === 'error') return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_500', statusCode: 500, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Unable to load payouts.' }, { status: 500 });
    const month = url.searchParams.get('month'); const gymId = url.searchParams.get('gymId'); const status = url.searchParams.get('status');
    const page = normalizeAdminFinancePayoutsManagementMockPagination(url.searchParams.get('page'), 1); const limit = normalizeAdminFinancePayoutsManagementMockPagination(url.searchParams.get('limit'), 10);
    const sortKey = validSortKey(url.searchParams.get('sortKey'), PAYOUT_SORT_KEYS, 'month'); const sortDir = validSortDir(url.searchParams.get('sortDir'));
    const filtered = MOCK_PAYOUTS.filter(p => (!month || month === 'all' || p.month === month) && (!gymId || gymId === 'all' || p.gymId === gymId) && (!status || status === 'all' || p.payoutStatus === status));
    const sorted = [...filtered].sort((a,b) => { const av=a[sortKey]; const bv=b[sortKey]; if (typeof av === 'number' && typeof bv === 'number') return sortDir==='asc'?av-bv:bv-av; return String(av??'').localeCompare(String(bv??''),undefined,{numeric:true})*(sortDir==='asc'?1:-1); });
    const start = (page - 1) * limit; const data = sorted.slice(start, start + limit);
    return HttpResponse.json({ success: true, message: 'Success', data, meta: { total: sorted.length, page, limit, totalPages: Math.max(1, Math.ceil(sorted.length / limit)), hasNextPage: page < Math.max(1, Math.ceil(sorted.length / limit)), hasPrevPage: page > 1 }  , requestId: globalThis.crypto.randomUUID()});
  }),
  http.get('*/admin/payouts/pnl', ({ request }) => { const url = new URL(request.url); if (url.searchParams.get('scenario') === 'error') return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_500', statusCode: 500, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Unable to load profit and loss data.' }, { status: 500 }); const month=url.searchParams.get('month'); const gymId=url.searchParams.get('gymId'); const sortKey=validSortKey(url.searchParams.get('sortKey'),PNL_SORT_KEYS,'netProfit'); const sortDir=validSortDir(url.searchParams.get('sortDir')); const filtered=MOCK_PNL.filter(p => (!month || month === 'all' || p.month === month) && (!gymId || gymId === 'all' || p.gymId === gymId)); const sorted=[...filtered].sort((a,b)=>{const av=a[sortKey]; const bv=b[sortKey]; if(typeof av==='number'&&typeof bv==='number') return sortDir==='asc'?av-bv:bv-av; return String(av??'').localeCompare(String(bv??''),undefined,{numeric:true})*(sortDir==='asc'?1:-1);}); return ok(sorted); }),
  http.get('*/admin/payouts/kpis', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('scenario') === 'error') return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_500', statusCode: 500, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Unable to load payout KPIs.' }, { status: 500 });
    const month = url.searchParams.get('month');
    const gymId = url.searchParams.get('gymId');
    const filtered = MOCK_PAYOUTS.filter(p => (!month || month === 'all' || p.month === month) && (!gymId || gymId === 'all' || p.gymId === gymId));
    return ok({
      totalNetProfit: filtered.reduce((sum, item) => sum + item.netProfit, 0),
      totalGrossRevenue: filtered.reduce((sum, item) => sum + item.grossRevenue, 0),
      totalExpenses: filtered.reduce((sum, item) => sum + item.staffPayroll + item.operationalExpenses + item.platformFee, 0),
      pendingPayouts: filtered.filter(item => item.payoutStatus === PAYOUT_STATUS_VALUES.PENDING).length,
    });
  })
];
