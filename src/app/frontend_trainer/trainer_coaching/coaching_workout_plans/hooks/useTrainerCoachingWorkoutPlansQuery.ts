"use client";
// RESPONSIBILITY: Owns TrainerWorkoutWorkout Library server-state queries; search is debounced and browseable datasets propagate URL filters/sort/pagination to the API.
// DATA FLOW: TrainerWorkoutWorkout URL/filter state → TanStack Query → TrainerWorkoutWorkout API → validated server data → workout UI.
import { useQuery } from '@tanstack/react-query';

import { useTrainerInfrastructureDebounce } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureDebounce';

import { TrainerWorkoutApi } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/api/TrainerCoachingWorkoutPlansApi';

import { TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansTrainerInfrastructureConstants';

import { TRAINER_WORKOUT_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/TrainerCoachingWorkoutPlansQueryKeys';

import type { TrainerWorkoutSortDirection, TrainerWorkoutSortField } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansSortTypes';







/**
 * @description Owns useTrainerWorkoutsQuery behavior in the Trainer module.
 * @dependencies TrainerWorkoutWorkout URL/filter state → TanStack Query → TrainerWorkoutWorkout API → validated server data → workout UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerWorkoutsQuery state and data flow for the workout feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerWorkoutsQuery(search: string, category: string, page: number, sortBy: TrainerWorkoutSortField = 'name', sortDirection: TrainerWorkoutSortDirection = 'asc', enabled = true) {
  const debouncedSearch = useTrainerInfrastructureDebounce(search, 300);
  return useQuery({
    queryKey: TRAINER_WORKOUT_QUERY_KEYS.plans({ search: debouncedSearch, category, page, sortBy, sortDirection }),
    queryFn: async () => {
      const params: Record<string, string> = { page: page.toString(), limit: String(TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE), sortBy, sortDirection };
      if (debouncedSearch) params.search = debouncedSearch;
      if (category && category !== 'All') params.category = category;
      const res = await TrainerWorkoutApi.fetchWorkouts(params);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled,
  });
}

/**
 * @description Owns useTrainerWorkoutExercisesQuery behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerWorkoutExercisesQuery state and data flow for the workout feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerWorkoutExercisesQuery(search: string, category: string, page: number, sortBy: TrainerWorkoutSortField = 'name', sortDirection: TrainerWorkoutSortDirection = 'asc', enabled = true) {
  const debouncedSearch = useTrainerInfrastructureDebounce(search, 300);
  return useQuery({
    queryKey: TRAINER_WORKOUT_QUERY_KEYS.exercises({ search: debouncedSearch, category, page, sortBy, sortDirection }),
    queryFn: async () => {
      const params: Record<string, string> = { page: page.toString(), limit: String(TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE), sortBy, sortDirection };
      if (debouncedSearch) params.search = debouncedSearch;
      if (category && category !== 'All') params.category = category;
      const res = await TrainerWorkoutApi.fetchExercises(params);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled,
  });
}
