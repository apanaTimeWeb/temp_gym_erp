// DATA FLOW: Automation editor intent → idempotent automation update → cache invalidation and feedback.
'use client';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';
import { ManagerCommunicationsCampaignsApi } from '@/app/frontend_manager/manager_communications/communications_automations/api/manager_communications_communications_automations.api';
import { ManagerCommunicationsCampaignsQueryKeys } from '@/app/frontend_manager/manager_communications/communications_automations/api/manager_communications_communications_automations.query_keys';
import type { CommAutomation } from '@/app/frontend_manager/manager_communications/communications_automations/types/manager_communications_communications_automations.types';

/**
 * @description Provides the idempotent automation-update mutation and its UI-facing command.
 * @dependencies Uses the automation feature API/query-key registry, shared idempotency-key utility, TanStack Query client, and approved toast helpers.
 * @edge-case Reuses a key for an identical pending payload per automation ID; a changed payload receives a fresh key. Success invalidates the automation list and clears only the matching intent.
 * @returns The TanStack mutation object and updateAutomation(id, payload) command.
 */
export function useManagerCommunicationsCampaignsMutations() {
  const queryClient = useQueryClient();
  const intentById = useRef(new Map<string, { signature: string; key: string }>());
  const mutation = useMutation({
    mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<CommAutomation>; idempotencyKey: string }) => ManagerCommunicationsCampaignsApi.updateAutomation(id, payload, idempotencyKey),
    onSuccess: (response, variables) => {
      if (intentById.current.get(variables.id)?.key === variables.idempotencyKey) intentById.current.delete(variables.id);
      void queryClient.invalidateQueries({ queryKey: ManagerCommunicationsCampaignsQueryKeys.automations() });
      ManagerInfrastructureShowSuccessToast(response.message, `manager-communications-automation-success-${variables.id}`);
    },
    onError: (error: unknown, variables) => ManagerInfrastructureShowErrorToast(error, `manager-communications-automation-error-${variables.id}`),
  });
  const updateAutomation = (id: string, payload: Partial<CommAutomation>) => {
    const signature = JSON.stringify(payload);
    const current = intentById.current.get(id);
    const idempotencyKey = current?.signature === signature ? current.key : ManagerInfrastructureIdempotency();
    intentById.current.set(id, { signature, key: idempotencyKey });
    mutation.mutate({ id, payload, idempotencyKey });
  };
  return { automationMutation: mutation, updateAutomation };
}
