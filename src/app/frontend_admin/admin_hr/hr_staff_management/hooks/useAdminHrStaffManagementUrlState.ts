"use client";
// RESPONSIBILITY: Owns URL-backed HR staff search, filter, sort and pagination state.
// DATA FLOW: search params → stable staff query inputs → HR staff directory.

import { normalizeAdminHrStaffManagementUrlPage } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementUrlPage';
import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAdminHrDebounce } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementDebounce';
import type { AdminHrStaffSortKey } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';
import type { AdminHrSortDirection } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementSortTypes';
import { STAFF_SORT_KEY_VALUES } from '@/app/frontend_admin/admin_hr/hr_staff_management/constants/AdminHrStaffManagementConstants';

export function useAdminHrUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  // Keep consecutive edits based on the latest unacknowledged navigation, not a stale URL snapshot.
  const observedQuery = useRef(query);
  const pendingQuery = useRef<string | null>(null);
  const issuedQueries = useRef<string[]>([]);
  useEffect(() => {
    if (query === observedQuery.current) return;
    observedQuery.current = query;
    const acknowledged = issuedQueries.current.indexOf(query);
    if (acknowledged >= 0) {
      issuedQueries.current.splice(0, acknowledged + 1);
      if (pendingQuery.current === query) pendingQuery.current = null;
    } else {
      // External history navigation replaces in-flight local query changes.
      pendingQuery.current = null;
      issuedQueries.current = [];
    }
  }, [query]);
  const pendingParams = useCallback(() => new URLSearchParams(pendingQuery.current ?? query), [query]);
  const pushQuery = useCallback((next: URLSearchParams) => {
    const value = next.toString();
    if (value === (pendingQuery.current ?? query)) return;
    pendingQuery.current = value;
    issuedQueries.current.push(value);
    if (issuedQueries.current.length > 20) issuedQueries.current.shift();
    router.push(value ? `${pathname}?${value}` : pathname);
  }, [pathname, query, router]);
  const search = searchParams.get('search') || '';
  const currentPage = normalizeAdminHrStaffManagementUrlPage(searchParams.get('page'));
  const staffSortKeyParam = searchParams.get('staffSortKey');
  const staffSortKey = STAFF_SORT_KEY_VALUES.some((key) => key === staffSortKeyParam) ? staffSortKeyParam as AdminHrStaffSortKey : 'name';
  const staffSortDir: AdminHrSortDirection = searchParams.get('staffSortDir') === 'desc' ? 'desc' : 'asc';
  const roleFilter = searchParams.get('role') || 'All';
  const branchFilter = searchParams.get('branch') || 'All';
  const debouncedSearch = useAdminHrDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const next = pendingParams();
    if (value) next.set(key, value); else next.delete(key);
    if (key !== 'page') next.set('page', '1');
    pushQuery(next);
  }, [pendingParams, pushQuery]);

  const setStaffSort = useCallback((key: AdminHrStaffSortKey, direction: AdminHrSortDirection) => {
    const next = pendingParams();
    next.set('staffSortKey', key);
    next.set('staffSortDir', direction);
    next.set('page', '1');
    pushQuery(next);
  }, [pendingParams, pushQuery]);

  return {
    search, currentPage, staffSortKey, staffSortDir, roleFilter, branchFilter, debouncedSearch,
    setSearch: useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]),
    setCurrentPage: useCallback((value: number) => setUrlParam('page', String(normalizeAdminHrStaffManagementUrlPage(value))), [setUrlParam]),
    setRoleFilter: useCallback((value: string) => setUrlParam('role', value === 'All' ? null : value), [setUrlParam]),
    setBranchFilter: useCallback((value: string) => setUrlParam('branch', value === 'All' ? null : value), [setUrlParam]),
    setStaffSort,
  };
}
