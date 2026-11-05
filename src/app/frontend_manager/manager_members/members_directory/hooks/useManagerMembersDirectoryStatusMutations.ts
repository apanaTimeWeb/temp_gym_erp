// DATA FLOW: User intent → this module mutation hook → module API → query invalidation → consuming module UI.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import type { ManagerToastType } from '@/app/frontend_manager/manager_members/members_directory/types/ManagerMembersDirectoryLocalToastTypes';

import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalGetErrorMessage';

import { ManagerMembersDirectoryApi } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.api';
import { ManagerMembersDirectoryQueryKeys } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.query_keys';
import { MEMBER_ACTIVE_STATUS, MEMBER_FROZEN_STATUS, MEMBER_SUSPENDED_STATUS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import type { DietPlanSnapshot, WorkoutSnapshot } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_snapshot.types';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersDirectoryStatusMutations.
 * @dependencies Uses ManagerIdempotency, ManagerMembersDirectoryApi, ManagerToastTypes, ManagerMembersDirectorySnapshotTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersDirectoryStatusMutations owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersDirectoryStatusMutations(
  showToast: (msg: string, t: ManagerToastType) => void
) {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const queryClient = useQueryClient();

  const assignDietMutation = useMutation({
    mutationFn: async ({ memberId, diet, idempotencyKey }: { memberId: string, diet: DietPlanSnapshot | null; idempotencyKey: string }) => 
      ManagerMembersDirectoryApi.updateMember(memberId, { assignedDietId: diet?.id || '', assignedDiet: diet || undefined }, idempotencyKey),
    onSuccess: (res, { memberId, diet }) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersDirectoryQueryKeys.all });
    },
    onError: (err: Error) => showToast(ManagerInfrastructureGetErrorMessage(err, t('TEXT_GENERIC_ERROR')), 'error')
  });

  const assignWorkoutMutation = useMutation({
    mutationFn: async ({ memberId, workout, idempotencyKey }: { memberId: string, workout: WorkoutSnapshot | null; idempotencyKey: string }) => 
      ManagerMembersDirectoryApi.updateMember(memberId, { assignedWorkoutId: workout?.id || '', assignedWorkout: workout || undefined }, idempotencyKey),
    onSuccess: (res, { memberId, workout }) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersDirectoryQueryKeys.all });
    },
    onError: (err: Error) => showToast(ManagerInfrastructureGetErrorMessage(err, t('TEXT_GENERIC_ERROR')), 'error')
  });

  const freezeMutation = useMutation({
    mutationFn: async ({ memberId, isFrozen, idempotencyKey }: { memberId: string, isFrozen: boolean; idempotencyKey: string }) => 
      ManagerMembersDirectoryApi.updateMember(memberId, { status: isFrozen ? MEMBER_FROZEN_STATUS : MEMBER_ACTIVE_STATUS }, idempotencyKey),
    onSuccess: (res, { memberId, isFrozen }) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersDirectoryQueryKeys.all });
    },
    onError: (err: Error) => showToast(ManagerInfrastructureGetErrorMessage(err, t('TEXT_GENERIC_ERROR')), 'error')
  });

  const toggleSuspendMutation = useMutation({
    mutationFn: async ({ memberId, isSuspended, idempotencyKey }: { memberId: string, isSuspended: boolean; idempotencyKey: string }) => 
      ManagerMembersDirectoryApi.updateMember(memberId, { status: isSuspended ? MEMBER_SUSPENDED_STATUS : MEMBER_ACTIVE_STATUS }, idempotencyKey),
    onSuccess: (res, { memberId, isSuspended }) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersDirectoryQueryKeys.all });
    },
    onError: (err: Error) => showToast(ManagerInfrastructureGetErrorMessage(err, t('TEXT_GENERIC_ERROR')), 'error')
  });

  const assignTrainerMutation = useMutation({
    mutationFn: async ({ memberId, trainerId, trainerName, isPT, idempotencyKey }: { memberId: string, trainerId: string, trainerName: string, isPT: boolean; idempotencyKey: string }) => 
      ManagerMembersDirectoryApi.updateMember(memberId, { assignedTrainerId: trainerId || '', assignedTrainerName: trainerName || '', isPT }, idempotencyKey),
    onSuccess: (res, { memberId, trainerId, trainerName, isPT }) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersDirectoryQueryKeys.all });
    },
    onError: (err: Error) => showToast(ManagerInfrastructureGetErrorMessage(err, t('TEXT_GENERIC_ERROR')), 'error')
  });

  return { assignDietMutation, assignWorkoutMutation, freezeMutation, toggleSuspendMutation, assignTrainerMutation };
}
