// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useCallback, useRef } from 'react';

import type { ManagerToastType } from '@/app/frontend_manager/manager_members/members_directory/types/ManagerMembersDirectoryLocalToastTypes';

import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalIdempotency';

import { useManagerMembersDirectoryCoreMutations } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryCoreMutations';
import { useManagerMembersDirectoryStatusMutations } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryStatusMutations';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_form.schemas';
import type { DietPlanSnapshot, WorkoutSnapshot } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_snapshot.types';
import type { Member } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';



/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersDirectoryMutations.
 * @dependencies Uses ManagerIdempotency, useManagerMembersDirectoryCoreMutations, useManagerMembersDirectoryStatusMutations, ManagerToastTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersDirectoryMutations owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersDirectoryMutations(
  showToast: (msg: string, t: ManagerToastType) => void,
  selectedMember: Member | null,
  setSelectedMember: (member: Member | null) => void,
  editId: string | null,
  setShowAddModal: (s: boolean) => void,
  setShowRenewModal: (s: boolean) => void,
  setShowPaymentModal: (s: boolean) => void
) {
  const { saveMutation, deleteMutation, renewMutation, recordPaymentMutation } = useManagerMembersDirectoryCoreMutations(
    showToast, selectedMember, setSelectedMember, editId, setShowAddModal, setShowRenewModal, setShowPaymentModal
  );

  const saveKeyRef = useRef<string | null>(null);
  const intentKeysRef = useRef(new Map<string, string>());

  const { assignDietMutation, assignWorkoutMutation, freezeMutation, toggleSuspendMutation, assignTrainerMutation } = useManagerMembersDirectoryStatusMutations(
    showToast
  );

  return {
    saveMember: async (data: MemberFormValues, idempotencyKey?: string) => { const key = idempotencyKey ?? saveKeyRef.current ?? ManagerInfrastructureIdempotency(); saveKeyRef.current = key; const response = await saveMutation.mutateAsync({ data, idempotencyKey: key }); saveKeyRef.current = null; return response; },
    deleteMember: useCallback(async (id: string) => { const key = intentKeysRef.current.get(`delete:${id}`) ?? ManagerInfrastructureIdempotency(); intentKeysRef.current.set(`delete:${id}`, key); const response = await deleteMutation.mutateAsync({ id, idempotencyKey: key }); intentKeysRef.current.delete(`delete:${id}`); return response; }, [deleteMutation]),
    assignDiet: async (memberId: string, diet: DietPlanSnapshot | null) => { const intent = `diet:${memberId}:${diet?.id ?? 'unassigned'}`; const key = intentKeysRef.current.get(intent) ?? ManagerInfrastructureIdempotency(); intentKeysRef.current.set(intent, key); const response = await assignDietMutation.mutateAsync({ memberId, diet, idempotencyKey: key }); intentKeysRef.current.delete(intent); return response; },
    assignWorkout: async (memberId: string, workout: WorkoutSnapshot | null) => { const intent = `workout:${memberId}:${workout?.id ?? 'unassigned'}`; const key = intentKeysRef.current.get(intent) ?? ManagerInfrastructureIdempotency(); intentKeysRef.current.set(intent, key); const response = await assignWorkoutMutation.mutateAsync({ memberId, workout, idempotencyKey: key }); intentKeysRef.current.delete(intent); return response; },
    renewMember: async (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number; }, idempotencyKey: string) => { await renewMutation.mutateAsync({ ...data, memberId: selectedMember?.id!, idempotencyKey }); },
    recordPayment: async (data: { amount: number; method: string }, idempotencyKey: string) => { await recordPaymentMutation.mutateAsync({ ...data, memberId: selectedMember?.id!, idempotencyKey }); },
    freezeMember: async (isFrozen: boolean, freezeUntil?: string) => { const memberId = selectedMember?.id; if (!memberId) return; const intent = `freeze:${memberId}:${isFrozen}:${freezeUntil ?? ''}`; const key = intentKeysRef.current.get(intent) ?? ManagerInfrastructureIdempotency(); intentKeysRef.current.set(intent, key); const response = await freezeMutation.mutateAsync({ memberId, isFrozen, idempotencyKey: key }); intentKeysRef.current.delete(intent); return response; },
    toggleSuspend: async (isSuspended: boolean) => { const memberId = selectedMember?.id; if (!memberId) return; const intent = `suspend:${memberId}:${isSuspended}`; const key = intentKeysRef.current.get(intent) ?? ManagerInfrastructureIdempotency(); intentKeysRef.current.set(intent, key); const response = await toggleSuspendMutation.mutateAsync({ memberId, isSuspended, idempotencyKey: key }); intentKeysRef.current.delete(intent); return response; },
    assignTrainer: async (memberId: string, trainerId: string, trainerName: string, isPT: boolean) => { const intent = `trainer:${memberId}:${trainerId}:${isPT}`; const key = intentKeysRef.current.get(intent) ?? ManagerInfrastructureIdempotency(); intentKeysRef.current.set(intent, key); const response = await assignTrainerMutation.mutateAsync({ memberId, trainerId, trainerName, isPT, idempotencyKey: key }); intentKeysRef.current.delete(intent); return response; }
  };
}
