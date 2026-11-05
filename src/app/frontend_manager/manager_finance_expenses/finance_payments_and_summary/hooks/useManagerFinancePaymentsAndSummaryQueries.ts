// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerFinancePaymentsAndSummaryApi } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/api/manager_finance_payments_and_summary.api';
import { ManagerFinancePaymentsAndSummaryQueryKeys } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/api/manager_finance_payments_and_summary.query_keys';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates finance feature state and its documented UI/API boundary through useManagerFinancePaymentsAndSummaryPayments.
 * @dependencies Uses ManagerFinancePaymentsAndSummaryApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useManagerFinancePaymentsAndSummaryPayments owns the finance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerFinancePaymentsAndSummaryPayments(params: Record<string, string>) {
  return useQuery({
    queryKey: ManagerFinancePaymentsAndSummaryQueryKeys.payments(params),
    queryFn: async () => {
      const res = await ManagerFinancePaymentsAndSummaryApi.fetchPayments(params);
      if (!res.success) throw new Error(res.message || 'Unable to load payments');
      return {
        payments: res.data?.payments ?? [],
        total: res.data?.total ?? 0
      };
    }
  });
}

/**
 * @description Loads the manager finance summary through the module query-key registry and owning API facade.
 * @dependencies Uses ManagerFinancePaymentsAndSummaryApi and ManagerFinancePaymentsAndSummaryQueryKeys; owns no client UI state.
 * @edge-case Preserves empty summary data, request failures, and cache identity for the selected range.
 */
export function useManagerFinancePaymentsAndSummarySummary(range: string, startDate = '', endDate = '') {
  return useQuery({
    queryKey: ManagerFinancePaymentsAndSummaryQueryKeys.summary(range, startDate, endDate),
    queryFn: async () => {
      const params: Record<string, string> = { ...(range ? { range } : {}), ...(startDate ? { startDate } : {}), ...(endDate ? { endDate } : {}) };
      const res = await ManagerFinancePaymentsAndSummaryApi.fetchFinanceSummary(params);
      if (!res.success) throw new Error(res.message || 'Unable to load finance summary');
      return res.data;
    }
  });
}
