// DATA FLOW: Workout-plan form/grid actions → workout API → workout-plan query invalidation.
'use client';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { ManagerWorkoutPlansApi } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/api/manager_workout_diet_library_workout_plan_management.api';
import { ManagerWorkoutPlansQueryKeys } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/api/manager_workout_diet_library_workout_plan_management.query_keys';
import type { Workout } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/types/manager_workout_diet_library_workout_plan_management.types';
/**
 * @description Creates or updates a workout plan according to whether the submitted snapshot contains an existing ID.
 * @dependencies Uses the workout-plan API, feature query-key registry, and TanStack Query client.
 * @edge-case The caller supplies the idempotency key; successful writes invalidate the workout-plan catalogue cache.
 * @returns The TanStack mutation result for workout-plan creation or update.
 */
export function useSaveWorkoutMutation(){const client=useQueryClient();return useMutation({mutationFn:async(data:Partial<Workout>&{idempotencyKey:string})=>data.id?ManagerWorkoutPlansApi.updateWorkout(data.id,data,data.idempotencyKey):ManagerWorkoutPlansApi.createWorkout(data,data.idempotencyKey),onSuccess:()=>{void client.invalidateQueries({queryKey:ManagerWorkoutPlansQueryKeys.plans({})});}});}
/**
 * @description Deletes one workout plan and exposes mutateAsync as the deleteWorkout command.
 * @dependencies Uses the workout-plan API, feature query-key registry, and TanStack Query client.
 * @edge-case The caller supplies the workout ID and idempotency key; successful deletion invalidates the workout-plan catalogue cache.
 * @returns The mutation result plus the asynchronous deleteWorkout command.
 */
export function useDeleteWorkoutMutation(){const client=useQueryClient();const mutation=useMutation({mutationFn:({id,idempotencyKey}:{id:string;idempotencyKey:string})=>ManagerWorkoutPlansApi.deleteWorkout(id,idempotencyKey),onSuccess:()=>{void client.invalidateQueries({queryKey:ManagerWorkoutPlansQueryKeys.plans({})});}});return {...mutation,deleteWorkout:mutation.mutateAsync};}
