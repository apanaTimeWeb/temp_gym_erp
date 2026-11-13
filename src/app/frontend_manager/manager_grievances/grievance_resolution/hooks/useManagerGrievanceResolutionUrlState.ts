// DATA FLOW: URL parameters and user input → derived module state → consuming module-owned UI.
"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { MANAGER_GRIEVANCE_RESOLUTION_SEARCH_QUERY_PARAM } from '@/app/frontend_manager/manager_grievances/grievance_resolution/constants/manager_grievance_resolution.constants';

/**
 * @description Owns the shareable grievance search state in the URL so refresh, deep links, and browser navigation preserve the active query.
 * @dependencies Uses Next.js router/search-param infrastructure and the module-owned search query parameter constant.
 * @edge-case Preserves unrelated query parameters and replaces only the grievance search parameter; empty search removes the parameter.
 */
// DATA FLOW: URL query parameter → useManagerGrievanceResolutionUrlState → ManagerGrievanceResolutionMain → grievance list request/rendering
/**
 * @description useManagerGrievanceResolutionUrlState owns the feature-level orchestration for the module and keeps server data, client UI state, and side effects at their documented boundaries.
 * @dependencies Uses only feature-owned APIs, schemas, types, constants, stores, and approved global infrastructure.
 * @edge-case Preserves documented loading, empty, error, retry, cancellation, permission, and direct-URL behavior for this flow.
 */
export function useManagerGrievanceResolutionUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearchState] = useState(() => searchParams.get(MANAGER_GRIEVANCE_RESOLUTION_SEARCH_QUERY_PARAM) || '');
  const status = searchParams.get('status') || 'ALL';
  const category = searchParams.get('category') || 'ALL';
  const date = searchParams.get('date') || 'all';

  useEffect(() => {
    setSearchState(searchParams.get(MANAGER_GRIEVANCE_RESOLUTION_SEARCH_QUERY_PARAM) || '');
  }, [searchParams]);

  const setParam = useCallback((key: string, value: string | null) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (value && value !== 'ALL' && value !== 'all') {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const setSearch = useCallback((value: string) => {
    const trimmed = value.trim();
    setSearchState(value);
    setParam(MANAGER_GRIEVANCE_RESOLUTION_SEARCH_QUERY_PARAM, trimmed || null);
  }, [setParam]);

  const setStatus = useCallback((value: string) => setParam('status', value), [setParam]);
  const setCategory = useCallback((value: string) => setParam('category', value), [setParam]);
  const setDate = useCallback((value: string) => setParam('date', value), [setParam]);

  return { search, setSearch, status, setStatus, category, setCategory, date, setDate };
}
