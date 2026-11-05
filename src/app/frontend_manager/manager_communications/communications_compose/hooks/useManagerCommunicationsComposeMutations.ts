// DATA FLOW: User send intent → idempotent campaign-send mutation → local query invalidation and feedback.
'use client';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';
import { ManagerCommunicationsCampaignsApi } from '@/app/frontend_manager/manager_communications/communications_compose/api/manager_communications_communications_compose.api';
import { ManagerCommunicationsCampaignsQueryKeys } from '@/app/frontend_manager/manager_communications/communications_compose/api/manager_communications_communications_compose.query_keys';
import type { CommFormValues } from '@/app/frontend_manager/manager_communications/communications_compose/types/manager_communications_communications_compose.types';

/**
 * @description Sends a communications campaign through the feature API and coordinates idempotency, success/error feedback, and cache invalidation.
 * @dependencies Uses ManagerCommunicationsCampaignsApi, ManagerCommunicationsCampaignsQueryKeys, ManagerInfrastructureIdempotency, centralized toast utilities, and the TanStack Query client.
 * @edge-case A serialized payload signature reuses the same idempotency key for a repeated in-flight intent; a different payload gets a new key; success clears the matching key and invalidates all compose campaign queries; failures use the centralized error toast.
 * @returns The TanStack mutation object and sendCampaign action that accepts the form payload plus recipient count and segment label.
 */
export function useManagerCommunicationsCampaignsMutations() {
  const queryClient = useQueryClient();
  const intentRef = useRef<{ signature: string; key: string } | null>(null);
  const mutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: CommFormValues & { recipientCount: number; segmentLabel: string }; idempotencyKey: string }) => ManagerCommunicationsCampaignsApi.sendCampaign(payload, idempotencyKey),
    onSuccess: (response, variables) => {
      if (intentRef.current?.key === variables.idempotencyKey) intentRef.current = null;
      ManagerInfrastructureShowSuccessToast(response.message, 'manager-communications-campaign-success');
      void queryClient.invalidateQueries({ queryKey: ManagerCommunicationsCampaignsQueryKeys.all });
    },
    onError: (error: unknown) => ManagerInfrastructureShowErrorToast(error, 'manager-communications-campaign-error'),
  });
  const sendCampaign = (payload: CommFormValues & { recipientCount: number; segmentLabel: string }) => {
    const signature = JSON.stringify(payload);
    const key = intentRef.current?.signature === signature ? intentRef.current.key : ManagerInfrastructureIdempotency();
    intentRef.current = { signature, key };
    mutation.mutate({ payload, idempotencyKey: key });
  };
  return { sendMutation: mutation, sendCampaign };
}
