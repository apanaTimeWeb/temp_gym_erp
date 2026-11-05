// RESPONSIBILITY: Owns MSW handlers for the Admin finance feature.
// DATA FLOW: finance API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { FINANCE_RECORD_STATUSES } from '@/app/frontend_admin/admin_finance/finance_summary/constants/AdminFinanceSummaryConstants';
// Keep mock pagination consistent with the validated, positive-integer API contract.
const normalizeMockPagination = (value: string | null, fallback: number): number => {
  if (value === null) return fallback;
  if (!/^[1-9]\d*$/.test(value)) return fallback;
  const n = Number(value);
  return Number.isSafeInteger(n) && n > 0 ? n : fallback;
};
import { http, HttpResponse } from 'msw';
import { ADMIN_FINANCE_API } from '@/app/frontend_admin/admin_finance/finance_summary/config/admin_finance_summary.url_config.ts';

const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});

import { MOCK_ADMIN_EXPENSES, MOCK_ADMIN_FINANCE_SUMMARY, MOCK_ADMIN_PAYMENTS_EXPANDED } from '@/app/frontend_admin/admin_finance/finance_summary/mocks/fixtures/AdminFinanceSummaryMockFixtures';
import type { Payment } from '@/app/frontend_admin/admin_finance/finance_summary/types/AdminFinanceSummaryTypes';


const financePaymentsState: Payment[] = structuredClone(MOCK_ADMIN_PAYMENTS_EXPANDED);

export const adminFinanceMockHandlers = [
  http.get(`*${ADMIN_FINANCE_API.payments}`, ({ request }) => { const url=new URL(request.url); const search=(url.searchParams.get('search')??'').trim().toLowerCase(); const method=(url.searchParams.get('method')??'').trim().toLowerCase().replace(/[ _-]/g,''); const status=(url.searchParams.get('status')??'').trim().toLowerCase(); const page=normalizeMockPagination(url.searchParams.get('page'), 1), limit=normalizeMockPagination(url.searchParams.get('limit'), 10); const filtered=financePaymentsState.filter(p => (!search || `${p.member?.name || ''} ${p.invoiceNo || ''}`.toLowerCase().includes(search)) && (!method || method==='all' || p.method.toLowerCase().replace(/[ _-]/g,'')===method || (p.paymentMode || '').toLowerCase().replace(/[ _-]/g,'')===method) && (!status || status==='all' || (status==='due' ? p.status===FINANCE_RECORD_STATUSES.PENDING : p.status.toLowerCase()===status))); const start=(page-1)*limit; return HttpResponse.json({ success:true,message:'Success',data:{payments:filtered.slice(start,start+limit),total:filtered.length},meta:{total:filtered.length,page,limit,totalPages:Math.max(1,Math.ceil(filtered.length/limit)),hasNextPage:page<Math.max(1,Math.ceil(filtered.length/limit)),hasPrevPage:page>1}, requestId: globalThis.crypto.randomUUID() }); }),
  http.get(`*${ADMIN_FINANCE_API.summary}`, () => ok(MOCK_ADMIN_FINANCE_SUMMARY)),
  http.get(`*${ADMIN_FINANCE_API.expenses}`, ({ request }) => {
    const url = new URL(request.url);
    const branchId = url.searchParams.get('branchId');
    const category = url.searchParams.get('category');
    const page = normalizeMockPagination(url.searchParams.get('page'), 1);
    const limit = normalizeMockPagination(url.searchParams.get('limit'), 8);
    const filtered = MOCK_ADMIN_EXPENSES.filter((expense) =>
      (!branchId || branchId === 'all' || expense.branchId === branchId) &&
      (!category || category === 'All' || expense.category === category),
    );
    const totalAmount = filtered.reduce((sum, expense) => sum + expense.amount, 0);
    const start = (page - 1) * limit;
    const pageData = filtered.slice(start, start + limit);
    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    return HttpResponse.json({ success: true, message: 'Success', data: { expenses: pageData, total: filtered.length, totalAmount }, meta: { total: filtered.length, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 } , requestId: globalThis.crypto.randomUUID() });
  })
];
