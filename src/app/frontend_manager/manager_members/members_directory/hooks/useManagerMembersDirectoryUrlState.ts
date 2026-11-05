// DATA FLOW: URL parameters and user input → derived module state → consuming module-owned UI.
'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLocalDebounce';

import { MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { MANAGER_MEMBERS_DIRECTORY_ID_QUERY_PARAM, MANAGER_MEMBERS_DIRECTORY_LIST_VIEW, MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW, MANAGER_MEMBERS_DIRECTORY_VIEW_QUERY_PARAM } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_view.constants';
import { resolveManagerMembersDirectoryView } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryResolveView';
import type { MemberSortColumn, SortDirection } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersDirectoryUrlState.
 * @dependencies Uses ManagerDebounce, ManagerMembersDirectoryTypes.
 * @edge-case preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersDirectoryUrlState owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersDirectoryUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawView = searchParams.get(MANAGER_MEMBERS_DIRECTORY_VIEW_QUERY_PARAM);
  const rawMemberId = searchParams.get(MANAGER_MEMBERS_DIRECTORY_ID_QUERY_PARAM);
  const view = resolveManagerMembersDirectoryView(rawView, rawMemberId);
  const memberProfileId = view === MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW ? rawMemberId : null;

  // Invalid detail URLs are normalized to the list view; valid detail URLs retain record identity.
  useEffect(() => {
    if (rawView === null || (rawView === MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW && rawMemberId?.trim())) return;
    const next = new URLSearchParams(searchParams.toString());
    next.delete(MANAGER_MEMBERS_DIRECTORY_VIEW_QUERY_PARAM);
    next.delete(MANAGER_MEMBERS_DIRECTORY_ID_QUERY_PARAM);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, rawMemberId, rawView, router, searchParams]);

  const setMemberProfileView = useCallback((memberId: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (memberId) { next.set(MANAGER_MEMBERS_DIRECTORY_VIEW_QUERY_PARAM, MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW); next.set(MANAGER_MEMBERS_DIRECTORY_ID_QUERY_PARAM, memberId); }
    else { next.delete(MANAGER_MEMBERS_DIRECTORY_VIEW_QUERY_PARAM); next.delete(MANAGER_MEMBERS_DIRECTORY_ID_QUERY_PARAM); }
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const [search, setSearchDraft] = useState('');
  const statusFilterRaw = searchParams.get('status') || MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.ALL_STATUS_FILTER;
  const statusFilter = Object.values(MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES).includes(statusFilterRaw as never) ? statusFilterRaw : MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.ALL_STATUS_FILTER;
  const rawPage = Number(searchParams.get('page') || '1');
  const currentPage = Number.isSafeInteger(rawPage) && rawPage > 0 ? Math.min(rawPage, 100000) : 1;
  const debouncedSearch = useManagerInfrastructureDebounce(search, 300);

  // Remove legacy PII-bearing search parameters from previously shared/bookmarked URLs.
  useEffect(() => {
    const piiParams = ['search', 'name', 'phone', 'email'];
    if (!piiParams.some((key) => searchParams.has(key))) return;
    const next = new URLSearchParams(searchParams.toString());
    for (const key of piiParams) next.delete(key);
    router.replace(next.toString() ? `${pathname}?${next.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(searchParams.toString());
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page' && key !== 'sort' && key !== 'dir') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const clearUrlParams = useCallback((keys: readonly string[]) => {
    const current = new URLSearchParams(searchParams.toString());
    for (const key of keys) current.delete(key);
    const query = current.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [searchParams, pathname, router]);

  const setSearch = useCallback((val: string) => { setSearchDraft(val); setUrlParam('page', '1'); }, [setUrlParam]);
  const setStatusFilter = useCallback((val: string) => setUrlParam('status', val === 'All' ? null : val), [setUrlParam]);
  const setGenderFilter = useCallback((val: string) => setUrlParam('gender', val === 'All' ? null : val), [setUrlParam]);
  const setPlanFilter = useCallback((val: string) => setUrlParam('plan', val === 'All' ? null : val), [setUrlParam]);
  
  const setExpiryRange = useCallback((from: string, to: string) => {
    const current = new URLSearchParams(searchParams.toString());
    if (from) current.set('expiryFrom', from); else current.delete('expiryFrom');
    if (to) current.set('expiryTo', to); else current.delete('expiryTo');
    current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSortColumn = useCallback((val: MemberSortColumn) => setUrlParam('sort', val), [setUrlParam]);
  const setSortDirection = useCallback((val: SortDirection) => setUrlParam('dir', val), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);

  const genderRaw = searchParams.get('gender') || 'All';
  const genderFilter = ['All', 'MALE', 'FEMALE', 'OTHER'].includes(genderRaw) ? genderRaw : 'All';
  const planRaw = searchParams.get('plan') || 'All';
  const planFilter = planRaw === 'All' || /^[A-Za-z0-9_-]{1,128}$/.test(planRaw) ? planRaw : 'All';
  const expiryFrom = searchParams.get('expiryFrom') || '';
  const expiryTo = searchParams.get('expiryTo') || '';
  const sortRaw = searchParams.get('sort');
  const sortColumn: MemberSortColumn = sortRaw && ['name', 'joinDate', 'expiryDate', 'paidAmount', 'status'].includes(sortRaw) ? sortRaw as MemberSortColumn : 'name';
  const sortDirection: SortDirection = searchParams.get('dir') === 'desc' ? 'desc' : 'asc';

  return {
    searchParams, view: view === MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW ? MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW : MANAGER_MEMBERS_DIRECTORY_LIST_VIEW, memberProfileId, setMemberProfileView,
    search, debouncedSearch, setSearch, statusFilter, setStatusFilter, currentPage, setCurrentPage,
    genderFilter, setGenderFilter, planFilter, setPlanFilter, expiryFrom, expiryTo, setExpiryRange,
    sortColumn, setSortColumn, sortDirection, setSortDirection, setUrlParam, clearUrlParams
  };
}
