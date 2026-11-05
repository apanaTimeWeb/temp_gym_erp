'use client';
// DATA FLOW: URL/search state → debounce hook → Exercise API client → TanStack Query cache → Exercise screen.
import { useQuery } from '@tanstack/react-query';
import { useTrainerInfrastructureDebounce } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureDebounce';
import { TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/utils/TrainerCoachingExerciseManagementTrainerInfrastructureConstants';
import { TrainerWorkoutApi } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/api/TrainerCoachingExerciseManagementApi';
import { TRAINER_WORKOUT_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/TrainerCoachingExerciseManagementQueryKeys';
import type { TrainerWorkoutSortDirection, TrainerWorkoutSortField } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementSortTypes';
export function useTrainerWorkoutExercisesQuery(search: string, category: string, page: number, sortBy: TrainerWorkoutSortField = 'name', sortDirection: TrainerWorkoutSortDirection = 'asc', enabled = true) {
 const debouncedSearch = useTrainerInfrastructureDebounce(search, 300);
 return useQuery({
  queryKey: TRAINER_WORKOUT_QUERY_KEYS.exercises({ search: debouncedSearch, category, page, sortBy, sortDirection }),
  queryFn: async () => {
   const params: Record<string,string> = { page: String(page), limit: String(TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE), sortBy, sortDirection };
   if (debouncedSearch) params.search = debouncedSearch;
   if (category && category !== 'All') params.category = category;
   const response = await TrainerWorkoutApi.fetchExercises(params);
   return response.data;
  }, staleTime: 5*60*1000, enabled,
 });
}
