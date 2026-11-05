// DATA FLOW: PT user action → dedicated mutation hook → ManagerPtAssignmentsApi → Query cache invalidation → PT UI.
'use client';
import { useRef } from 'react';

import { useQueryClient, useMutation } from '@tanstack/react-query';

import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { ManagerPtAssignmentsApi } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/api/manager_pt_assignments.api';
import { ManagerPtAssignmentsQueryKeys } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/api/manager_pt_assignments.query_keys';
import type { CreatePtAssignmentPayload } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';

/**
 * @description Owns PT assignment creation and session-completion mutations with success/error feedback and cache invalidation.
 * @dependencies Uses ManagerPtAssignmentsApi, ManagerPtAssignmentsQueryKeys, idempotency and toast infrastructure.
 * @edge-case Generates the idempotency key at the action boundary for each new user intent; callers can reuse a key when retrying the same intent.
 */
export function useManagerPtAssignmentsMutations() {
  const queryClient = useQueryClient();
  const sessionKeysRef = useRef(new Map<string, string>());
  const createAssignmentMutation = useMutation({
    mutationFn: ({ body, idempotencyKey }: { body: CreatePtAssignmentPayload; idempotencyKey: string }) => ManagerPtAssignmentsApi.createAssignment(body, idempotencyKey),
    onSuccess: (response) => {
      ManagerInfrastructureShowSuccessToast(response.message, 'manager-pt-success');
      void queryClient.invalidateQueries({ queryKey: ManagerPtAssignmentsQueryKeys.assignments() });
    },
    onError: (error) => ManagerInfrastructureShowErrorToast(error, 'manager-pt-assign-error'),
  });
  const markSessionMutation = useMutation({
    mutationFn: ({ assignmentId, idempotencyKey }: { assignmentId: string; idempotencyKey: string }) => ManagerPtAssignmentsApi.markSessionComplete(assignmentId, idempotencyKey),
    onSuccess: (response) => {
      ManagerInfrastructureShowSuccessToast(response.message, 'manager-pt-success');
      void queryClient.invalidateQueries({ queryKey: ManagerPtAssignmentsQueryKeys.assignments() });
    },
    onError: (error) => ManagerInfrastructureShowErrorToast(error, 'manager-pt-session-error'),
  });
  return {
    createAssignment: createAssignmentMutation.mutateAsync,
    assignmentSaving: createAssignmentMutation.isPending,
    handleMarkSession: async (assignmentId: string) => { const key = sessionKeysRef.current.get(assignmentId) ?? ManagerInfrastructureIdempotency(); sessionKeysRef.current.set(assignmentId, key); const response = await markSessionMutation.mutateAsync({ assignmentId, idempotencyKey: key }); sessionKeysRef.current.delete(assignmentId); return response; },
    sessionSaving: markSessionMutation.isPending,
    markingId: markSessionMutation.isPending ? markSessionMutation.variables?.assignmentId : null,
  };
}
