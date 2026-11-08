"use client";
// RESPONSIBILITY: Owns Diet Library query state, URL filters, modal UI state, and trainer-safe mutations.
// DATA FLOW: URL filters → TanStack Query → TrainerLibraryApi → TrainerLibraryDietGrid; UI-only modal/toast state stays local.
import { useCallback, useState, useEffect, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useTrainerInfrastructureDebounce } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/TrainerCoachingDietLibraryAndAssignmentsuseTrainerInfrastructureDebounce';

import { TrainerLibraryApi } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/api/TrainerCoachingDietLibraryAndAssignmentsApi';

import { TRAINER_LIBRARY_GOALS as TRAINER_LIBRARY_FILTER_GOALS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/TrainerCoachingDietLibraryAndAssignmentsConstants';

import { TRAINER_LIBRARY_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/TrainerCoachingDietLibraryAndAssignmentsQueryKeys';

import { TrainerLibraryParsePage } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/utils/TrainerCoachingDietLibraryAndAssignmentsParsePage';

import { useTrainerLibraryDiet } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/useTrainerCoachingDietLibraryAndAssignmentsDiet';
import { useTrainerLibraryMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/useTrainerCoachingDietLibraryAndAssignmentsMutations';

import type { TrainerLibraryFilterGoal, TrainerLibraryLogicReturn } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';











/**
 * @description Owns useTrainerLibraryLogic behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerLibraryLogic state and data flow for the library feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerLibraryLogic(): TrainerLibraryLogicReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const urlSearch = searchParams.get('search') ?? '';
  const [search, setLocalSearch] = useState(urlSearch);
  const lastUrlSearchRef = useRef(urlSearch);
  const debouncedSearch = useTrainerInfrastructureDebounce(search, 300);
  const requestedGoal = searchParams.get('goal');
  const filterGoal: TrainerLibraryFilterGoal | 'All' = requestedGoal && TRAINER_LIBRARY_FILTER_GOALS.some(g => g.value === requestedGoal)
    ? requestedGoal as TrainerLibraryFilterGoal
    : 'All';
  const currentPage = TrainerLibraryParsePage(searchParams.get('page'));

  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam === null || pageParam === String(currentPage)) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(currentPage));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [currentPage, pathname, router, searchParams]);

  const query = useQuery({
    queryKey: TRAINER_LIBRARY_QUERY_KEYS.dietPlans({ search: debouncedSearch, goal: filterGoal === 'All' ? undefined : filterGoal, page: currentPage }),
    queryFn: async () => {
      const params: Record<string,string> = { page: String(currentPage), limit: '10' };
      if (debouncedSearch) params.search = debouncedSearch;
      if (filterGoal !== 'All') params.goal = filterGoal;
      const response = await TrainerLibraryApi.fetchDietPlans(params);
      return response;
    },
  });

// Effect contract: external URL/history changes win; only a settled local edit may write search back to the URL.
  useEffect(() => {
    if (urlSearch !== lastUrlSearchRef.current) {
      lastUrlSearchRef.current = urlSearch;
      setLocalSearch(urlSearch);
      return;
    }
    if (debouncedSearch !== search || debouncedSearch === urlSearch) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) params.set('search', debouncedSearch); else params.delete('search');
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, pathname, router, search, searchParams, urlSearch]);

  const setSearch = useCallback((value: string) => setLocalSearch(value), []);
  const setUrlParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All') params.set(key, value); else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const setFilterGoal = useCallback((value: TrainerLibraryFilterGoal | 'All') => setUrlParam('goal', value), [setUrlParam]);
  const setCurrentPage = useCallback((page: number) => setUrlParam('page', String(page)), [setUrlParam]);
  const loadAll = useCallback(async () => { await query.refetch(); }, [query]);
  const dietLogic = useTrainerLibraryDiet();
  const mutations = useTrainerLibraryMutations();
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | undefined>();

  const saveDietPlan = useCallback(async (data: Record<string, unknown>, idempotencyKey: string) => {
    setSaveErrorMessage(undefined);
    try {
      if (dietLogic.formDietPlan?.id) {
        await mutations.updateDietPlan({ id: dietLogic.formDietPlan.id, data, idempotencyKey });
      } else {
        await mutations.createDietPlan({ data, idempotencyKey });
      }
      dietLogic.closeFormModal();
      await query.refetch();
    } catch (err) {
      setSaveErrorMessage(err instanceof Error ? err.message : 'Failed to save diet plan');
      throw err;
    }
  }, [dietLogic, mutations, query]);

  const requestDietPlanDeletion = useCallback(async (id: string, reason: string, idempotencyKey: string) => {
    setSaveErrorMessage(undefined);
    try {
      await mutations.requestDietPlanDeletion({ id, reason, idempotencyKey });
      dietLogic.closeDeleteRequestModal();
      dietLogic.closeDietModal();
      await query.refetch();
    } catch (err) {
      setSaveErrorMessage(err instanceof Error ? err.message : 'Failed to request deletion');
      throw err;
    }
  }, [dietLogic, mutations, query]);

  return {
    dietPlans: query.data?.data?.dietPlans ?? [], totalDietPlans: query.data?.data?.total ?? 0, isPending: query.isPending, isError: query.isError, isSuccess: query.isSuccess,
    search, debouncedSearch, setSearch, filterGoal, setFilterGoal, currentPage, setCurrentPage,
    loadAll, ...dietLogic,
    saveDietPlan,
    requestDietPlanDeletion,
    isSavingPlan: mutations.createDietPlanPending || mutations.updateDietPlanPending || mutations.requestDietPlanDeletionPending,
    saveErrorMessage,
  };
}
