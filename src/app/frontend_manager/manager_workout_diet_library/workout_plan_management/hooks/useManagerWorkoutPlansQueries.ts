// DATA FLOW: Workout-plan filters → workout catalogue query → plan grid and summary banner.
'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerWorkoutPlansApi } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/api/manager_workout_diet_library_workout_plan_management.api';
import { ManagerWorkoutPlansQueryKeys } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/api/manager_workout_diet_library_workout_plan_management.query_keys';
/**
 * @description Fetches workout-plan catalogue records for the supplied filters.
 * @dependencies Uses the workout-plan feature API and query-key registry through TanStack Query.
 * @edge-case The complete filter object participates in query identity to keep filtered result sets isolated.
 * @param params Search/filter parameters forwarded to the workout API.
 * @returns The TanStack Query result containing workout-plan response data.
 * @cacheKey ManagerWorkoutPlansQueryKeys.plans(params).
 */
export function useWorkoutPlansQuery(params:Record<string,string>){return useQuery({queryKey:ManagerWorkoutPlansQueryKeys.plans(params),queryFn:async()=>{const response=await ManagerWorkoutPlansApi.fetchWorkouts(params);return response.data;}});}
