"use client";
import { normalizeAdminFinancePayoutsManagementUrlPage } from '@/app/frontend_admin/admin_finance/finance_payouts_management/utils/AdminFinancePayoutsManagementUrlPage';
// RESPONSIBILITY: Business logic hook for the Payouts module.
// DATA FLOW: feature API/schema → hook/context → useAdminPayoutsLogic consumers.

import { ADMIN_PAYOUTS_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_payouts_management/constants/AdminFinancePayoutsManagementQueryKeys';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AdminPayoutsApi } from '@/app/frontend_admin/admin_finance/finance_payouts_management/api/admin_finance_payouts_management_api';
import { useAdminPayoutsStore } from '@/app/frontend_admin/admin_finance/finance_payouts_management/state/useAdminFinancePayoutsManagementStore';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_finance/finance_payouts_management/hooks/useAdminFinancePayoutsManagementUrlQuerySync';
import { PAYOUTS_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_finance/finance_payouts_management/constants/AdminFinancePayoutsManagementConstants';
import type { PayoutSortDirection, PayoutSortKey, PnlSortDirection, PnlSortKey } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';
/** @description useAdminPayoutsLogic: Business logic hook for the Payouts module. @dependencies Consumes AdminPayoutsQueryKeys, AdminPayoutsApi, useAdminPayoutsStore, useAdminNavigationLayoutUrlQuerySync, AdminPayoutsConstants, AdminPayoutsTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminPayoutsLogic() {
  const { activeTab, setActiveTab, monthFilter, setMonthFilter, gymFilter, setGymFilter, statusFilter, setStatusFilter, currentPage, setCurrentPage } = useAdminPayoutsStore();
  const [payoutSortKey, setPayoutSortKey] = useState<PayoutSortKey>('month');
  const [payoutSortDir, setPayoutSortDir] = useState<PayoutSortDirection>('desc');
  const [pnlSortKey, setPnlSortKey] = useState<PnlSortKey>('netProfit');
  const [pnlSortDir, setPnlSortDir] = useState<PnlSortDirection>('desc');
  useAdminNavigationLayoutUrlQuerySync([
    { key: 'month', value: monthFilter, defaultValue: 'all', setValue: (val) => { const normalized = typeof val === 'string' ? val : ''; if (normalized === 'all' || /^(?!0000)\d{4}-(?:0[1-9]|1[0-2])$/.test(normalized)) useAdminPayoutsStore.getState().setMonthFilter(normalized); } },
    { key: 'gym', value: gymFilter, defaultValue: 'all', setValue: (val) => useAdminPayoutsStore.getState().setGymFilter(typeof val === 'string' && val.trim() ? val : 'all') },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => { const normalized = typeof val === 'string' ? val : ''; if (normalized === 'all' || ['pending','processing','paid','failed'].includes(normalized)) useAdminPayoutsStore.getState().setStatusFilter(normalized as 'all' | 'pending' | 'processing' | 'paid' | 'failed'); } },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(normalizeAdminFinancePayoutsManagementUrlPage(value)) },
  ]);

  const payoutsQuery = useQuery({
    queryKey: ADMIN_PAYOUTS_QUERY_KEYS.key('list', { month: monthFilter, gymId: gymFilter, status: statusFilter, page: currentPage, limit: PAYOUTS_ITEMS_PER_PAGE, sortKey: payoutSortKey, sortDir: payoutSortDir }),
    queryFn: () => AdminPayoutsApi.fetchPayouts({ month: monthFilter, gymId: gymFilter, status: statusFilter, page: currentPage, limit: PAYOUTS_ITEMS_PER_PAGE, sortKey: payoutSortKey, sortDir: payoutSortDir }),
    staleTime: 1000 * 60 * 5,
  });

  const pnlQuery = useQuery({
    queryKey: ADMIN_PAYOUTS_QUERY_KEYS.key('pnl', { month: monthFilter, gymId: gymFilter, sortKey: pnlSortKey, sortDir: pnlSortDir }),
    queryFn: () => AdminPayoutsApi.fetchPnL({ month: monthFilter, gymId: gymFilter, sortKey: pnlSortKey, sortDir: pnlSortDir }).then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const kpiQuery = useQuery({
    queryKey: ADMIN_PAYOUTS_QUERY_KEYS.key('kpis', { month: monthFilter, gymId: gymFilter }),
    queryFn: () => AdminPayoutsApi.fetchKPIs({ month: monthFilter, gymId: gymFilter }).then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const pnlData = pnlQuery.data ?? [];
  const kpis = kpiQuery.data;
  const payoutsResponse = payoutsQuery.data;
  const status = payoutsQuery.status;

  const filteredPayouts = payoutsResponse?.data ?? [];
  const filteredPnL = pnlData;

  const totalPages = payoutsResponse?.meta?.totalPages ?? Math.max(1, Math.ceil(filteredPayouts.length / PAYOUTS_ITEMS_PER_PAGE));
  const paginatedPayouts = filteredPayouts;
  // A saved URL can point beyond the last available page after records change.
  useEffect(() => {
    if (payoutsQuery.status !== 'success' || payoutsQuery.isFetching || !payoutsResponse?.meta) return;
    if (currentPage > totalPages) setCurrentPage(Math.max(1, totalPages));
  }, [payoutsQuery.status, payoutsQuery.isFetching, payoutsResponse?.meta, currentPage, totalPages, setCurrentPage]);


  return {
    activeTab, setActiveTab,
    monthFilter, setMonthFilter,
    gymFilter, setGymFilter,
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage,
    status,
    payouts: paginatedPayouts,
    allPayouts: filteredPayouts,
    pnlData: filteredPnL,
    kpis,
    totalPages,
    totalItems: payoutsResponse?.meta?.total ?? filteredPayouts.length,
    pendingPnl: pnlQuery.isPending,
    pnlStatus: pnlQuery.status, pnlError: pnlQuery.error, retryPnl: () => pnlQuery.refetch(),
    error: payoutsQuery.error, retryPayouts: () => payoutsQuery.refetch(),
    kpiStatus: kpiQuery.status, kpiError: kpiQuery.error, retryKpis: () => kpiQuery.refetch(),
    payoutSortKey, payoutSortDir,
    onPayoutSort: (key: PayoutSortKey) => { if (payoutSortKey === key) setPayoutSortDir((current: PayoutSortDirection) => current === 'asc' ? 'desc' : 'asc'); else { setPayoutSortKey(key); setPayoutSortDir('desc'); } setCurrentPage(1); },
    pnlSortKey, pnlSortDir,
    onPnlSort: (key: PnlSortKey) => { if (pnlSortKey === key) setPnlSortDir((current: PnlSortDirection) => current === 'asc' ? 'desc' : 'asc'); else { setPnlSortKey(key); setPnlSortDir('desc'); } },
  };
}
