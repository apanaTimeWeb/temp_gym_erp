"use client";
// RESPONSIBILITY: Owns Finance URL filter state and TanStack Query server-state orchestration for read-only finance analytics.
// DATA FLOW: URL state -> query parameters/query keys -> Admin Finance API -> Zod-validated response -> read-only views.

import { ADMIN_FINANCE_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_payments/constants/AdminFinancePaymentsQueryKeys';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { AdminFinanceApi } from '@/app/frontend_admin/admin_finance/finance_payments/api/admin_finance_payments_api';
import { normalizeAdminFinancePaymentsPage } from '@/app/frontend_admin/admin_finance/finance_payments/utils/AdminFinancePaymentsNormalizePage';
import { useAdminFinanceDebounce } from '@/app/frontend_admin/admin_finance/finance_payments/hooks/useAdminFinancePaymentsDebounce';
import type { AdminFinanceExpenseUrlParamKey } from '@/app/frontend_admin/admin_finance/finance_payments/types/AdminFinancePaymentsTypes';
import { EXPENSE_CATEGORIES, FINANCE_DATE_FILTER_PRESETS, FINANCE_EXPENSE_ITEMS_PER_PAGE, FINANCE_ITEMS_PER_PAGE, FINANCE_PAYMENT_METHODS, FINANCE_PAYMENT_STATUSES } from '@/app/frontend_admin/admin_finance/finance_payments/constants/AdminFinancePaymentsConstants';
import { isValidAdminFinanceDateRange } from '@/app/frontend_admin/admin_finance/finance_payments/utils/AdminFinancePaymentsDateRangeUtils';

const ADMIN_FINANCE_LEAF_SCOPE: string = 'payments';
/** @description useAdminFinanceLogic: Owns Finance URL filter state and TanStack Query server-state orchestration for read-only finance analytics. @dependencies Consumes AdminFinanceQueryKeys, AdminNavigationLayoutBackendMessage, AdminFinanceApi, useAdminNavigationLayoutDebounce, AdminFinanceTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminFinanceLogic() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeQuery = searchParams.toString();
  const observedQueryRef = useRef(routeQuery);
  const pendingQueryRef = useRef<string | null>(null);
  useEffect(() => {
    if (observedQueryRef.current !== routeQuery) {
      observedQueryRef.current = routeQuery;
      pendingQueryRef.current = null;
    }
  }, [routeQuery]);
  // Merge rapid user edits before Next.js acknowledges the previous navigation.
  const commitUrl = useCallback((update: (params: URLSearchParams) => void) => {
    const base = observedQueryRef.current === routeQuery ? pendingQueryRef.current ?? routeQuery : routeQuery;
    const next = new URLSearchParams(base);
    update(next);
    const query = next.toString();
    if (query === base) return;
    pendingQueryRef.current = query;
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, routeQuery, router]);
  const selectedBranchId = searchParams.get('branchId') || 'all';

  const search = searchParams.get('search') ?? '';
  const requestedMethod = searchParams.get('method') ?? 'All';
  const methodFilter = requestedMethod === 'All' || (FINANCE_PAYMENT_METHODS as readonly string[]).includes(requestedMethod) ? requestedMethod : 'All';
  const requestedStatus = searchParams.get('status') ?? 'All';
  const statusFilter = requestedStatus === 'All' || (FINANCE_PAYMENT_STATUSES as readonly string[]).includes(requestedStatus) ? requestedStatus : 'All';
  const currentPage = normalizeAdminFinancePaymentsPage(searchParams.get('page'));
  const requestedRange = searchParams.get('range') ?? 'this_month';
  const range = (FINANCE_DATE_FILTER_PRESETS as readonly string[]).includes(requestedRange) ? requestedRange : 'this_month';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const customRangeInvalid = range === 'custom' && !isValidAdminFinanceDateRange(startDate, endDate);
  const summaryDateRange = range === 'custom' ? { startDate, endDate } : undefined;
  const debouncedSearch = useAdminFinanceDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    commitUrl((next) => {
      if (value) next.set(key, value); else next.delete(key);
      if (key !== 'page') next.set('page', '1');
    });
  }, [commitUrl]);

  const requestedExpenseCategory = searchParams.get('expenseCategory') ?? 'All';
  const expenseCategory = requestedExpenseCategory === 'All' || (EXPENSE_CATEGORIES as readonly string[]).includes(requestedExpenseCategory) ? requestedExpenseCategory : 'All';
  const expensePage = normalizeAdminFinancePaymentsPage(searchParams.get('expensePage'));

  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]);
  const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(normalizeAdminFinancePaymentsPage(value))), [setUrlParam]);
  const setMethodFilter = useCallback((value: string) => setUrlParam('method', value === 'All' ? null : value), [setUrlParam]);
  const setStatusFilter = useCallback((value: string) => setUrlParam('status', value === 'All' ? null : value), [setUrlParam]);
  const setRange = useCallback((value: string) => setUrlParam('range', value === 'this_month' ? null : value), [setUrlParam]);
  const setExpenseUrlParam = useCallback((key: AdminFinanceExpenseUrlParamKey, value: string | null) => {
    commitUrl((next) => {
      if (value) next.set(key, value); else next.delete(key);
      if (key === 'expenseCategory') next.set('expensePage', '1');
    });
  }, [commitUrl]);
  const setExpenseCategory = useCallback((value: string) => setExpenseUrlParam('expenseCategory', value === 'All' ? null : value), [setExpenseUrlParam]);
  const setExpensePage = useCallback((value: number) => setExpenseUrlParam('expensePage', String(normalizeAdminFinancePaymentsPage(value))), [setExpenseUrlParam]);

  const queryParams = {
    limit: String(FINANCE_ITEMS_PER_PAGE),
    page: String(currentPage),
    branchId: selectedBranchId,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(methodFilter !== 'All' ? { method: methodFilter } : {}),
    ...(statusFilter !== 'All' ? { status: statusFilter } : {}),
  };

  const paymentsQuery = useQuery({
    queryKey: ADMIN_FINANCE_QUERY_KEYS.key('payments', queryParams),
    queryFn: () => AdminFinanceApi.fetchPayments(queryParams),
    enabled: ADMIN_FINANCE_LEAF_SCOPE === 'payments',
  });

  const summaryQuery = useQuery({
    queryKey: ADMIN_FINANCE_QUERY_KEYS.key('summary', selectedBranchId, range, startDate, endDate),
    queryFn: () => AdminFinanceApi.fetchSummary(selectedBranchId, range, summaryDateRange),
    enabled: !customRangeInvalid,
  });

  const expenseParams = {
    branchId: selectedBranchId,
    page: String(expensePage),
    limit: String(FINANCE_EXPENSE_ITEMS_PER_PAGE),
    ...(expenseCategory !== 'All' ? { category: expenseCategory } : {}),
  };
  const expensesQuery = useQuery({
    queryKey: ADMIN_FINANCE_QUERY_KEYS.key('expenses', expenseParams),
    queryFn: () => AdminFinanceApi.fetchExpenses(expenseParams),
    enabled: ADMIN_FINANCE_LEAF_SCOPE === 'expenses',
  });

  // Recover an obsolete bookmark after a successful, settled payments query.
  const paymentTotal = paymentsQuery.data?.data?.total;
  useEffect(() => {
    if (paymentsQuery.status !== 'success' || paymentsQuery.isFetching || paymentTotal === undefined) return;
    const lastPage = Math.max(1, Math.ceil(paymentTotal / FINANCE_ITEMS_PER_PAGE));
    if (currentPage > lastPage) setCurrentPage(lastPage);
  }, [currentPage, paymentTotal, paymentsQuery.isFetching, paymentsQuery.status, setCurrentPage]);

  const activeEntityQuery = ADMIN_FINANCE_LEAF_SCOPE === 'payments' ? paymentsQuery : ADMIN_FINANCE_LEAF_SCOPE === 'expenses' ? expensesQuery : summaryQuery;
  const isError = activeEntityQuery.isError || (ADMIN_FINANCE_LEAF_SCOPE !== 'summary' && summaryQuery.isError);
  const status = activeEntityQuery.status;

  const loadAll = useCallback(async () => {
    const refetches: Array<Promise<unknown>> = [
      paymentsQuery.refetch(),
      expensesQuery.refetch(),
    ];
    if (!customRangeInvalid) refetches.push(summaryQuery.refetch());
    await Promise.all(refetches);
  }, [customRangeInvalid, expensesQuery, paymentsQuery, summaryQuery]);

  return {
    payments: paymentsQuery.data?.data?.payments ?? [],
    expenses: expensesQuery.data?.data?.expenses ?? [],
    totalExpenses: expensesQuery.data?.data?.total ?? 0,
    totalExpenseAmount: expensesQuery.data?.data?.totalAmount ?? 0,
    expenseCategory,
    expensePage,
    totalPayments: paymentsQuery.data?.data?.total ?? 0,
    summary: summaryQuery.data?.data ?? null,
    status,
    paymentsStatus: paymentsQuery.status,
    paymentsError: paymentsQuery.error,
    summaryStatus: customRangeInvalid ? 'error' : summaryQuery.status,
    summaryError: summaryQuery.error,
    expensesStatus: expensesQuery.status,
    expensesError: expensesQuery.error,
    isError,
    error: customRangeInvalid
      ? t('finance.AdminFinanceDateFilterDropdown.customRangeInvalid')
      : isError
        ? t('finance.AdminFinanceLogic.genericError')
        : '',
    loadAll,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    methodFilter,
    setMethodFilter,
    statusFilter,
    setStatusFilter,
    range,
    setRange,
    setExpenseCategory,
    setExpensePage,
  };
}
