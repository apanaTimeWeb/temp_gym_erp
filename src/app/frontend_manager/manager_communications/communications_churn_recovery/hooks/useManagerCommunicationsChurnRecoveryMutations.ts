// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { ManagerCommunicationsCampaignsApi } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/api/manager_communications_communications_churn_recovery.api';
import { ManagerCommunicationsCampaignsQueryKeys } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/api/manager_communications_communications_churn_recovery.query_keys';
import type { CommChannel, WinBackTemplateTier } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_communications_churn_recovery.types';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsCampaignsChurnRecoveryMutations.
 * @dependencies Uses ManagerIdempotency, ManagerCommunicationsCampaignsApi, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast, ManagerCommunicationsCampaignsTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsCampaignsChurnRecoveryMutations owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerCommunicationsCampaignsChurnRecoveryMutations(closeComposer: () => void) {
  const qc = useQueryClient();
  const winBackIntentRef = useRef<{ signature: string; key: string } | null>(null);

  const winBackMutation = useMutation({
    mutationFn: (payload: {
      memberId: string;
      memberName: string;
      phone: string;
      email: string;
      channel: CommChannel;
      templateTier: WinBackTemplateTier;
      message: string;
      subject: string;
      idempotencyKey: string;
    }) => {
      const { idempotencyKey, ...rest } = payload;
      return ManagerCommunicationsCampaignsApi.sendWinBackMessage(rest, idempotencyKey);
    },
    onSuccess: (res, variables) => {
      if (winBackIntentRef.current?.key === variables.idempotencyKey) winBackIntentRef.current = null;
      ManagerInfrastructureShowSuccessToast(res.message, 'manager-churn-winback-success');
      closeComposer();
      qc.invalidateQueries({ queryKey: ManagerCommunicationsCampaignsQueryKeys.all });
    },
    onError: (err) => ManagerInfrastructureShowErrorToast(err, 'manager-communications-churn-error') });

  const sendWinBackMessage = (payload: Omit<Parameters<typeof ManagerCommunicationsCampaignsApi.sendWinBackMessage>[0], 'idempotencyKey'>) => {
    const signature = JSON.stringify(payload);
    const current = winBackIntentRef.current;
    const key = current?.signature === signature ? current.key : ManagerInfrastructureIdempotency();
    winBackIntentRef.current = { signature, key };
    winBackMutation.mutate({ ...payload, idempotencyKey: key });
  };

  return { winBackMutation, sendWinBackMessage };
}
