// DATA FLOW: URL parameters and user input → derived module state → consuming module-owned UI.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { useManagerWorkoutPlansUiStore } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/state/useManagerWorkoutPlansUiStore';
import type { ManagerWorkoutPlansViewModel } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_view_model.types';

export function useManagerWorkoutPlansLogic(): ManagerWorkoutPlansViewModel {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ui = useManagerWorkoutPlansUiStore();
  const requestedPage = Number(searchParams.get('page') ?? '1');
  const currentPage = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const updateUrl = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isDefault = !value || (key === 'level' && value === 'ALL') || (key === 'page' && value === '1') || (key === 'tab' && value === 'Workout Plans');
    if (isDefault) params.delete(key); else params.set(key, value);
    if (key !== 'page') params.delete('page');
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return {
    tab: searchParams.get('tab') || 'Workout Plans',
    setTab: (value) => updateUrl('tab', value),
    search: searchParams.get('search') || '',
    setSearch: (value) => updateUrl('search', value),
    levelFilter: searchParams.get('level') || 'ALL',
    setLevelFilter: (value) => updateUrl('level', value),
    currentPage,
    setCurrentPage: (value) => updateUrl('page', String(Number.isSafeInteger(value) && value > 0 ? value : 1)),
    showWkModal: ui.showWkModal,
    setShowWkModal: ui.setShowWkModal,
    editWkId: ui.editWkId,
    wkForm: ui.wkForm,
    setWkForm: ui.setWkForm,
    openAddWk: ui.openAddWk,
    openEditWk: ui.openEditWk,
    showExModal: ui.showExModal,
    setShowExModal: ui.setShowExModal,
    editExId: ui.editExId,
    exForm: ui.exForm,
    setExForm: ui.setExForm,
    openAddEx: ui.openAddEx,
    openEditEx: ui.openEditEx,
  };
}
