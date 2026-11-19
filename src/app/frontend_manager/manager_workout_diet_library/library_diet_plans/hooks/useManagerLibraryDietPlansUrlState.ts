// RESPONSIBILITY: Synchronizes library view, search, and pagination with the URL query parameters.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { isManagerLibraryDietPlansView, resolveManagerLibraryDietPlansView } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/utils/ManagerLibraryDietPlansResolveView';
import {
  MANAGER_LIBRARY_DIET_PLANS_LEGACY_TAB_QUERY_PARAM,
  MANAGER_LIBRARY_DIET_PLANS_PAGE_QUERY_PARAM,
  MANAGER_LIBRARY_DIET_PLANS_SEARCH_QUERY_PARAM,
  MANAGER_LIBRARY_DIET_PLANS_VIEW_QUERY_PARAM
} from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/constants/manager_library_diet_plans_view.constants';
import type { LibraryView } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans.types';

export function useManagerLibraryDietPlansUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const viewValue = searchParams.get(MANAGER_LIBRARY_DIET_PLANS_VIEW_QUERY_PARAM);
  const legacyTabValue = searchParams.get(MANAGER_LIBRARY_DIET_PLANS_LEGACY_TAB_QUERY_PARAM);
  const view: LibraryView = resolveManagerLibraryDietPlansView(viewValue ?? legacyTabValue);
  const search = searchParams.get(MANAGER_LIBRARY_DIET_PLANS_SEARCH_QUERY_PARAM) ?? '';
  const currentPage = Math.max(Number(searchParams.get(MANAGER_LIBRARY_DIET_PLANS_PAGE_QUERY_PARAM) ?? '1') || 1, 1);

  // Normalize invalid view IDs and legacy tab bookmarks to a single canonical URL.
  useEffect(() => {
    const needsLegacyMigration = legacyTabValue !== null;
    const needsInvalidViewNormalization = viewValue !== null && !isManagerLibraryDietPlansView(viewValue);
    if (!needsLegacyMigration && !needsInvalidViewNormalization) return;
    const next = new URLSearchParams(searchParams.toString());
    next.set(MANAGER_LIBRARY_DIET_PLANS_VIEW_QUERY_PARAM, resolveManagerLibraryDietPlansView(viewValue ?? legacyTabValue));
    next.delete(MANAGER_LIBRARY_DIET_PLANS_LEGACY_TAB_QUERY_PARAM);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }, [legacyTabValue, pathname, router, searchParams, viewValue]);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value); else next.delete(key);
    if (key === MANAGER_LIBRARY_DIET_PLANS_VIEW_QUERY_PARAM) next.delete(MANAGER_LIBRARY_DIET_PLANS_LEGACY_TAB_QUERY_PARAM);
    if (key !== MANAGER_LIBRARY_DIET_PLANS_PAGE_QUERY_PARAM) next.set(MANAGER_LIBRARY_DIET_PLANS_PAGE_QUERY_PARAM, '1');
    router.replace(next.size ? `${pathname}?${next.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const setView = useCallback((nextView: LibraryView) => setUrlParam(MANAGER_LIBRARY_DIET_PLANS_VIEW_QUERY_PARAM, nextView), [setUrlParam]);
  const setSearch = useCallback((value: string) => setUrlParam(MANAGER_LIBRARY_DIET_PLANS_SEARCH_QUERY_PARAM, value || null), [setUrlParam]);
  const setCurrentPage = useCallback((page: number) => setUrlParam(MANAGER_LIBRARY_DIET_PLANS_PAGE_QUERY_PARAM, String(Math.max(1, page))), [setUrlParam]);

  return {
    view,
    search,
    currentPage,
    setView,
    setSearch,
    setCurrentPage,
  };
}
