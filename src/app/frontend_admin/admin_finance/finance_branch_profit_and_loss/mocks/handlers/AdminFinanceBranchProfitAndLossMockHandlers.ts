// RESPONSIBILITY: Module-local P&L MSW handler with contract-bound query parsing.
// DATA FLOW: MSW request -> validated feature filters -> owned fixture -> response envelope.

import { http, HttpResponse } from 'msw';
import { ADMIN_FINANCE_PNL_API_URL } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/config/admin_finance_branch_profit_and_loss.url_config';
import { PNL_PERIOD_OPTIONS, FINANCE_PNL_STATUS_FILTERS } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/constants/AdminFinanceBranchProfitAndLossConstants';
import { getAdminFinancePnlFixtureByPeriod } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/mocks/fixtures/AdminFinanceBranchProfitAndLossFixtureByPeriod';
import type { PnlPeriod, PnlSortKey, PnlStatusFilter } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';

const SORT_KEYS: readonly PnlSortKey[] = ['branchName', 'revenue', 'expenses', 'netProfit', 'marginPct'];
const STATUS_VALUES: readonly PnlStatusFilter[] = Object.values(FINANCE_PNL_STATUS_FILTERS);
export const adminFinancePnlMockHandlers = [
  http.get(`*${ADMIN_FINANCE_PNL_API_URL}`, ({ request }) => {
    const url = new URL(request.url);
    const rawPeriod = url.searchParams.get('period');
    const period: PnlPeriod = PNL_PERIOD_OPTIONS.some(({ value }) => value === rawPeriod)
      ? rawPeriod as PnlPeriod : 'THIS_MONTH';
    const rawStatus = url.searchParams.get('status');
    const status: PnlStatusFilter = STATUS_VALUES.includes(rawStatus as PnlStatusFilter)
      ? rawStatus as PnlStatusFilter : 'ALL';
    const rawSortKey = url.searchParams.get('sortKey');
    const sortKey: PnlSortKey = SORT_KEYS.includes(rawSortKey as PnlSortKey)
      ? rawSortKey as PnlSortKey : 'netProfit';
    const sortDir = url.searchParams.get('sortDir') === 'asc' ? 'asc' : 'desc';
    const rows = getAdminFinancePnlFixtureByPeriod(period);
    const filtered = status !== 'ALL' ? rows.filter((record) => record.status === status) : rows;
    const sorted = [...filtered].sort((left, right) => {
      const a = left[sortKey];
      const b = right[sortKey];
      const result = typeof a === 'number' && typeof b === 'number'
        ? a - b : String(a).localeCompare(String(b));
      return sortDir === 'asc' ? result : -result;
    });
    return HttpResponse.json({ success: true, message: 'Success', data: sorted, requestId: globalThis.crypto.randomUUID() });
  }),
];
