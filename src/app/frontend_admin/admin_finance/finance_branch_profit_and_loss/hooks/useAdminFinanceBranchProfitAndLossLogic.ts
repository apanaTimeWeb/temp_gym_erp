"use client";
// RESPONSIBILITY: Encapsulates all P&L state, sorting, filtering, and derived aggregates.
// DATA FLOW: AdminFinanceConstants → useAdminFinancePnlLogic → AdminFinancePnl → child components

import { FINANCE_PNL_STATUS_FILTERS, PNL_PERIOD_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/constants/AdminFinanceBranchProfitAndLossConstants';
import { ADMIN_FINANCE_PNL_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/constants/AdminFinanceBranchProfitAndLossQueryKeys';

import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminFinancePnlApi } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/api/admin_finance_branch_profit_and_loss_api';
import { useAdminFinancePnlUrlQuerySync } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/hooks/useAdminFinanceBranchProfitAndLossUrlQuerySync';
import type {
  BranchPnlRecord,
  BranchPnlAggregates,
  PnlPeriod,
  PnlStatusFilter,
  PnlSortKey,
  PnlSortDirection,
} from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';
/** @description useAdminFinancePnlLogic: Encapsulates all P&L state, sorting, filtering, and derived aggregates. @dependencies Consumes AdminFinanceQueryKeys, AdminFinancePnlApi, useAdminFinancePnlUrlQuerySync, AdminFinanceTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminFinancePnlLogic() {
  const { getValue, setValue } = useAdminFinancePnlUrlQuerySync();
  const rawPeriod = getValue('period');
  const period: PnlPeriod = PNL_PERIOD_OPTIONS.some((option) => option.value === rawPeriod)
    ? rawPeriod as PnlPeriod : 'THIS_MONTH';
  const rawStatus = getValue('status');
  const statusFilter: PnlStatusFilter = Object.values(FINANCE_PNL_STATUS_FILTERS).some((value) => value === rawStatus)
    ? rawStatus as PnlStatusFilter : 'ALL';
  const setPeriod = useCallback((value: PnlPeriod) => setValue('period', value, 'THIS_MONTH'), [setValue]);
  const setStatusFilter = useCallback((value: PnlStatusFilter) => setValue('status', value, 'ALL'), [setValue]);
  const [sortKey, setSortKey] = useState<PnlSortKey>('netProfit');
  const [sortDir, setSortDir] = useState<PnlSortDirection>('desc');
  const [expandedBranchId, setExpandedBranchId] = useState<string | null>(null);

  const filteredQuery = useQuery({
    queryKey: ADMIN_FINANCE_PNL_QUERY_KEYS.key('pnl', { period, status: statusFilter, sortKey, sortDir }),
    queryFn: () => AdminFinancePnlApi.fetchBranchPnl(period, { status: statusFilter, sortKey, sortDir }),
  });

  const aggregateQuery = useQuery({
    queryKey: ADMIN_FINANCE_PNL_QUERY_KEYS.key('pnl-summary', { period }),
    queryFn: () => AdminFinancePnlApi.fetchBranchPnl(period),
  });

  const sortedData: BranchPnlRecord[] = filteredQuery.data?.data ?? [];
  const rawData: BranchPnlRecord[] = aggregateQuery.data?.data ?? [];

  const aggregates: BranchPnlAggregates = {
    totalRevenue: rawData.reduce((sum, branch) => sum + branch.revenue, 0),
    totalExpenses: rawData.reduce((sum, branch) => sum + branch.expenses, 0),
    totalNetProfit: rawData.reduce((sum, branch) => sum + branch.netProfit, 0),
    overallMarginPct: rawData.reduce((sum, branch) => sum + branch.revenue, 0) > 0
      ? rawData.reduce((sum, branch) => sum + branch.netProfit, 0) / rawData.reduce((sum, branch) => sum + branch.revenue, 0) * 100
      : 0,
    profitableBranches: rawData.filter((branch) => branch.status === FINANCE_PNL_STATUS_FILTERS.PROFITABLE).length,
    lossMakingBranches: rawData.filter((branch) => branch.status === FINANCE_PNL_STATUS_FILTERS.LOSS).length,
  };

  const isPending = filteredQuery.isPending || aggregateQuery.isPending;
  const isError = filteredQuery.isError || aggregateQuery.isError;
  const retry = async () => { await Promise.all([filteredQuery.refetch(), aggregateQuery.refetch()]); };
  /** Toggle sort: same key flips direction; new key defaults to desc */
  function handleSort(key: PnlSortKey) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  /** Toggle row expansion; clicking the same row collapses it */
  function toggleExpand(branchId: string) {
    setExpandedBranchId((prev) => (prev === branchId ? null : branchId));
  }

  return {
    period,
    setPeriod,
    statusFilter,
    setStatusFilter,
    sortKey,
    sortDir,
    handleSort,
    expandedBranchId,
    toggleExpand,
    sortedData,
    aggregates,
    isEmpty: sortedData.length === 0,
    isPending,
    isError,
    retry,
  };
}
