// DATA FLOW: URL parameters and user input → derived module state → consuming module-owned UI.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { useManagerWorkoutPlansUiStore } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/state/useManagerWorkoutPlansUiStore';
import type { ManagerWorkoutPlansViewModel } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/types/manager_workout_plans_view_model.types';



/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates workout feature state and its documented UI/API boundary through useManagerWorkoutPlansLogic.
 * @dependencies Uses useManagerWorkoutPlansUiStore, ManagerWorkoutPlansTypes, ManagerWorkoutPlansViewModelTypes.
 * @edge-case preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerWorkoutPlansLogic owns the workout feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerWorkoutPlansLogic(): ManagerWorkoutPlansViewModel {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const ui = useManagerWorkoutPlansUiStore();
  const updateUrl = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isDefault = !value || (key === 'level' && value === 'ALL') || (key === 'page' && value === '1');
    if (isDefault) params.delete(key); else params.set(key, value);
    if (key !== 'page') params.delete('page');
    router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);
  return {
    search: searchParams.get('search') || '', setSearch: (value) => updateUrl('search', value),
    levelFilter: searchParams.get('level') || 'ALL', setLevelFilter: (value) => updateUrl('level', value),
    currentPage: Number(searchParams.get('page') || '1'), setCurrentPage: (value) => updateUrl('page', String(value)),
    showWkModal: ui.showWkModal, setShowWkModal: ui.setShowWkModal, editWkId: ui.editWkId, wkForm: ui.wkForm, setWkForm: ui.setWkForm, openAddWk: ui.openAddWk, openEditWk: ui.openEditWk,
  };
}
