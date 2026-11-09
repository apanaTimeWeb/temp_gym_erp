// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';

import { resolveManagerPtAssignmentsView } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/utils/ManagerPtAssignmentsResolveView';
import { useManagerPtAssignmentsMutations } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/hooks/useManagerPtAssignmentsMutations';
import { useManagerPtAssignmentsQueries } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/hooks/useManagerPtAssignmentsQueries';
import type { PtActiveTab } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates pt feature state and its documented UI/API boundary through useManagerPtAssignmentsLogic.
 * @dependencies Uses ManagerDebounce, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast, ManagerIdempotency, ManagerPtAssignmentsApi.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerPtAssignmentsLogic owns the pt feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerPtAssignmentsLogic() {
  const t = useTranslations('MANAGER_PT_ASSIGNMENTS');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');
  const [localSearch, setLocalSearch] = useState<string | null>(null);
  const search = localSearch ?? (searchParams.get('search') || '');
  const setSearch = useCallback((value: string) => {
    setLocalSearch(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('search', value);
    else params.delete('search');
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const debouncedSearch = useManagerInfrastructureDebounce(search, 300);
  const limit = Number(searchParams.get('limit') || '10');
  const setPage = useCallback((page: number) => { const params = new URLSearchParams(searchParams.toString()); params.set('page', String(page)); router.replace(`${pathname}?${params.toString()}`, { scroll: false }); }, [pathname, router, searchParams]);

  const [localTab, setLocalTab] = useState<PtActiveTab | null>(null);
  const activeTab = localTab ?? resolveManagerPtAssignmentsView(searchParams.get('view') ?? searchParams.get('tab'));

  const setActiveTab = useCallback((tab: PtActiveTab) => {
    setLocalTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', tab);
    params.delete('tab');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const { kpisQuery, workloadQuery, packagesQuery, assignmentsQuery } = useManagerPtAssignmentsQueries(currentPage, limit, debouncedSearch);

  const ptMutations = useManagerPtAssignmentsMutations();

  const assignments = assignmentsQuery.data?.assignments ?? [];
  const totalAssignments = assignmentsQuery.data?.total ?? 0;
  const expiringPackages = useMemo(
    () => assignments.filter((assignment) => assignment.sessionsRemaining <= 3 && assignment.sessionsRemaining > 0),
    [assignments],
  );

  const isPending = [kpisQuery, workloadQuery, packagesQuery, assignmentsQuery].some((query) => query.isPending);
  const isError = [kpisQuery, workloadQuery, packagesQuery, assignmentsQuery].some((query) => query.isError);
  const ptQueryError = [kpisQuery.error, workloadQuery.error, packagesQuery.error, assignmentsQuery.error].find(Boolean);
  const errorMessage = ptQueryError ? ManagerInfrastructureGetErrorMessage(ptQueryError, t('TEXT_GENERIC_ERROR')) : '';

  return {
    activeTab,
    setActiveTab,
    packages: packagesQuery.data ?? [],
    assignments,
    totalAssignments,
    currentPage,
    limit,
    search,
    setSearch,
    setPage,
    kpis: kpisQuery.data ?? null,
    workload: workloadQuery.data ?? [],
    expiringPackages,
    isPending,
    isError,
    errorMessage,
    handleMarkSession: ptMutations.handleMarkSession,
    markingId: ptMutations.markingId,
    createAssignment: ptMutations.createAssignment,
    assignmentSaving: ptMutations.assignmentSaving };
}
