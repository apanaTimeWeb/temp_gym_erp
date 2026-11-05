// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/constants/ManagerLibraryDietPlansLocalPaginationDefaults';
import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansLocalDebounce';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/utils/ManagerLibraryDietPlansLocalGetErrorMessage';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/utils/ManagerLibraryDietPlansLocalIdempotency';

import { isManagerLibraryDietPlansView, resolveManagerLibraryDietPlansView } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/utils/ManagerLibraryDietPlansResolveView';
import { MANAGER_LIBRARY_DIET_PLANS_LEGACY_TAB_QUERY_PARAM, MANAGER_LIBRARY_DIET_PLANS_PAGE_QUERY_PARAM, MANAGER_LIBRARY_DIET_PLANS_SEARCH_QUERY_PARAM, MANAGER_LIBRARY_DIET_PLANS_VIEW_QUERY_PARAM } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/constants/manager_library_diet_plans_view.constants';
import { useManagerLibraryDietPlansMutations } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansMutations';
import { useManagerLibraryDietPlansQuery, useManagerLibraryDietPlansExercisesQuery } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansQueries';
import { useManagerLibraryDietPlansUiStore } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/state/useManagerLibraryDietPlansUiStore';
import type { DietPlan, Exercise, LibraryView, ManagerLibraryDietPlansViewModel } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates library feature state and its documented UI/API boundary through useManagerLibraryDietPlansLogic.
 * @dependencies Uses useManagerLibraryDietPlansMutations, useManagerLibraryDietPlansQueries, useManagerLibraryDietPlansUiStore, ManagerConfirmProvider.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerLibraryDietPlansLogic owns the library feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerLibraryDietPlansLogic(): ManagerLibraryDietPlansViewModel {
  const t = useTranslations('MANAGER_LIBRARY_DIET_PLANS');
  const { confirm } = useConfirm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ui = useManagerLibraryDietPlansUiStore();
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
  const debouncedSearch = useManagerInfrastructureDebounce(search, 300);
  const params = useMemo(() => ({ search: debouncedSearch, page: String(currentPage), limit: String(MANAGER_ITEMS_PER_PAGE) }), [currentPage, debouncedSearch]);
  const dietQuery = useManagerLibraryDietPlansQuery(params);
  const exerciseQuery = useManagerLibraryDietPlansExercisesQuery(params);
  const mutations = useManagerLibraryDietPlansMutations();
  const deletionIdempotencyKeys = useRef(new Map<string, string>());
  const saveDietKeyRef = useRef<string | null>(null);
  const saveExerciseKeyRef = useRef<string | null>(null);

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

  const saveDietPlan = useCallback(async (data: Partial<DietPlan>) => {
    const response = await mutations.saveDiet.mutateAsync({ id: ui.editDietId, data, idempotencyKey: (saveDietKeyRef.current ??= ManagerInfrastructureIdempotency()) });
    saveDietKeyRef.current = null;
    ui.setShowDietModal(false);
    ui.showToast(response.message, 'success');
  }, [mutations.saveDiet, ui]);
  const deleteDietPlan = useCallback(async (id: string) => {
    const ok = await confirm({ title: t('DELETE_DIET_TITLE'), message: t('DELETE_DIET_MESSAGE'), confirmText: t('DELETE'), type: 'danger' });
    if (!ok) return;
    let idempotencyKey = deletionIdempotencyKeys.current.get(`diet:${id}`);
    if (!idempotencyKey) { idempotencyKey = ManagerInfrastructureIdempotency(); deletionIdempotencyKeys.current.set(`diet:${id}`, idempotencyKey); }
    const response = await mutations.removeDiet.mutateAsync({ id, idempotencyKey });
    deletionIdempotencyKeys.current.delete(`diet:${id}`);
    ui.showToast(response.message, 'success');
  }, [confirm, mutations.removeDiet, ui]);
  const saveExercise = useCallback(async (data: Partial<Exercise>) => {
    const response = await mutations.saveExercise.mutateAsync({ id: ui.editExerciseId, data, idempotencyKey: (saveExerciseKeyRef.current ??= ManagerInfrastructureIdempotency()) });
    saveExerciseKeyRef.current = null;
    ui.setShowExerciseModal(false);
    ui.showToast(response.message, 'success');
  }, [mutations.saveExercise, ui]);
  const deleteExercise = useCallback(async (id: string) => {
    const ok = await confirm({ title: t('DELETE_EXERCISE_TITLE'), message: t('DELETE_EXERCISE_MESSAGE'), confirmText: t('DELETE'), type: 'danger' });
    if (!ok) return;
    let idempotencyKey = deletionIdempotencyKeys.current.get(`exercise:${id}`);
    if (!idempotencyKey) { idempotencyKey = ManagerInfrastructureIdempotency(); deletionIdempotencyKeys.current.set(`exercise:${id}`, idempotencyKey); }
    const response = await mutations.removeExercise.mutateAsync({ id, idempotencyKey });
    deletionIdempotencyKeys.current.delete(`exercise:${id}`);
    ui.showToast(response.message, 'success');
  }, [confirm, mutations.removeExercise, ui]);

  const activeQuery = view === 'diet' ? dietQuery : exerciseQuery;
  return {
    view, setView,
    dietPlans: dietQuery.data?.data?.dietPlans ?? [], totalDietPlans: dietQuery.data?.data?.total ?? 0,
    exercises: exerciseQuery.data?.data?.exercises ?? [], totalExercises: exerciseQuery.data?.data?.total ?? 0,
    isPending: activeQuery.isPending, isError: activeQuery.isError,
    errorMessage: activeQuery.error ? ManagerInfrastructureGetErrorMessage(activeQuery.error, t('TEXT_GENERIC_ERROR')) : '',
    saving: mutations.saveDiet.isPending || mutations.removeDiet.isPending || mutations.saveExercise.isPending || mutations.removeExercise.isPending,
    toast: ui.toast,
    search, debouncedSearch, setSearch, currentPage, setCurrentPage,
    showToast: ui.showToast, hideToast: ui.hideToast,
    loadAll: async () => { await activeQuery.refetch(); },
    showDietModal: ui.showDietModal, setShowDietModal: ui.setShowDietModal, editDietId: ui.editDietId, editDietData: ui.editDietData,
    openAddDiet: ui.openAddDiet, openEditDiet: ui.openEditDiet, saveDietPlan, deleteDietPlan,
    showExerciseModal: ui.showExerciseModal, setShowExerciseModal: ui.setShowExerciseModal, editExerciseId: ui.editExerciseId, editExerciseData: ui.editExerciseData,
    openAddExercise: ui.openAddExercise, openEditExercise: ui.openEditExercise, saveExercise, deleteExercise,
  };
}
