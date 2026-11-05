"use client";
// RESPONSIBILITY: Owns feature-local query, mutation, or interaction orchestration for hr_management; it does not render the page UI.
// DATA FLOW: URL query parameters → useAdminFinanceStaffDuesManagementUrlState → Admin Finance views.

import { useCallback, useEffect, useRef } from 'react';
import { normalizeAdminFinanceStaffDuesManagementUrlPage } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementUrlPage';
import { format, isValid, parseISO } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAdminFinanceStaffDuesManagementDebounce } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementDebounce';
import type { AdminFinanceStaffDuesManagementStaffSortKey } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementTypes';
import type { AdminFinanceStaffDuesManagementSortDirection } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementSortTypes';
import { STAFF_SORT_KEY_VALUES, PAYROLL_SORT_KEY_VALUES } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/constants/AdminFinanceStaffDuesManagementConstants';
/** @description useAdminFinanceStaffDuesManagementUrlState: Owns the useAdminFinanceStaffDuesManagementUrlState responsibility for the admin_hr feature. @dependencies Consumes useAdminNavigationLayoutDebounce. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminFinanceStaffDuesManagementUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const lastObservedQuery = useRef(query);
  const pendingQuery = useRef<string | null>(null);
  const issuedQueries = useRef<string[]>([]);
  useEffect(() => {
    if (query === lastObservedQuery.current) return;
    lastObservedQuery.current = query;
    const acknowledgedIndex = issuedQueries.current.indexOf(query);
    if (acknowledgedIndex >= 0) {
      issuedQueries.current.splice(0, acknowledgedIndex + 1);
      if (pendingQuery.current === query) pendingQuery.current = null;
    } else {
      // Browser history and externally supplied URLs supersede local pending edits.
      pendingQuery.current = null;
      issuedQueries.current = [];
    }
  }, [query]);
  const pendingParams = useCallback(() => new URLSearchParams(pendingQuery.current ?? query), [query]);
  const pushQuery = useCallback((next: URLSearchParams) => {
    const nextQuery = next.toString();
    if (nextQuery === (pendingQuery.current ?? query)) return;
    pendingQuery.current = nextQuery;
    issuedQueries.current.push(nextQuery);
    if (issuedQueries.current.length > 20) issuedQueries.current.shift();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  }, [pathname, query, router]);
  const search = searchParams.get('search') || '';
  const currentPage = normalizeAdminFinanceStaffDuesManagementUrlPage(searchParams.get('page'));
  const staffSortKeyParam = searchParams.get('staffSortKey');
  const staffSortKey = STAFF_SORT_KEY_VALUES.some((key) => key === staffSortKeyParam) ? staffSortKeyParam! : 'name';
  const staffSortDirParam = searchParams.get('staffSortDir');
  const staffSortDir: AdminFinanceStaffDuesManagementSortDirection = staffSortDirParam === 'desc' ? 'desc' : 'asc';
  const payrollSortKeyParam = searchParams.get('payrollSortKey');
  const payrollSortKey = PAYROLL_SORT_KEY_VALUES.some((key) => key === payrollSortKeyParam) ? payrollSortKeyParam! : 'month';
  const payrollSortDirParam = searchParams.get('payrollSortDir');
  const payrollSortDir: AdminFinanceStaffDuesManagementSortDirection = payrollSortDirParam === 'asc' ? 'asc' : 'desc';
  const roleFilter = searchParams.get('role') || 'All';
  const branchFilter = searchParams.get('branch') || 'All';
  const payrollMonthParam = searchParams.get('month') || '';
  const payrollMonthDate = parseISO(`${payrollMonthParam}-01`);
  const payrollMonth = /^(?!0000)\d{4}-(?:0[1-9]|1[0-2])$/.test(payrollMonthParam) && isValid(payrollMonthDate) && format(payrollMonthDate, 'yyyy-MM') === payrollMonthParam ? payrollMonthParam : format(new Date(), 'yyyy-MM');
  const debouncedSearch = useAdminFinanceStaffDuesManagementDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const next = pendingParams();
    if (value !== null && value !== '') next.set(key, value); else next.delete(key);
    if (key !== 'page' && key !== 'month') next.set('page', '1');
    pushQuery(next);
  }, [pendingParams, pushQuery]);

  const setStaffSort = useCallback((key: AdminFinanceStaffDuesManagementStaffSortKey, direction: AdminFinanceStaffDuesManagementSortDirection) => {
    const next = pendingParams();
    next.set('staffSortKey', key);
    next.set('staffSortDir', direction);
    next.set('page', '1');
    pushQuery(next);
  }, [pendingParams, pushQuery]);
  const setPayrollSort = useCallback((key: string, direction: AdminFinanceStaffDuesManagementSortDirection) => {
    const next = pendingParams();
    next.set('payrollSortKey', key);
    next.set('payrollSortDir', direction);
    next.set('page', '1');
    pushQuery(next);
  }, [pendingParams, pushQuery]);

  return {
    search,
    currentPage,
    staffSortKey,
    staffSortDir,
    payrollSortKey,
    payrollSortDir,
    roleFilter,
    branchFilter,
    payrollMonth,
    debouncedSearch,
    setSearch: useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]),
    setCurrentPage: useCallback((value: number) => setUrlParam('page', String(normalizeAdminFinanceStaffDuesManagementUrlPage(value))), [setUrlParam]),
    setRoleFilter: useCallback((value: string) => setUrlParam('role', value === 'All' ? null : value), [setUrlParam]),
    setBranchFilter: useCallback((value: string) => setUrlParam('branch', value === 'All' ? null : value), [setUrlParam]),
    setPayrollMonth: useCallback((value: string) => setUrlParam('month', value), [setUrlParam]),
    setStaffSort,
    setPayrollSort,
  };
}
