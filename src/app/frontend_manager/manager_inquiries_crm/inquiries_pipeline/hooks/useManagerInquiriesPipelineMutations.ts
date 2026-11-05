// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';

import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';

import { ManagerInquiriesPipelineApi } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/api/manager_inquiries_pipeline.api';
import { MANAGER_INQUIRIES_PIPELINE_QUERY_KEYS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/api/manager_inquiries_pipeline.query_keys';
import type { ManagerInquiriesPipelineWritePayload } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline.types';
interface UseInquiriesMutationsProps {
  showToast: (msg: string, type: ManagerToastType) => void;
  onSuccessCallback?: () => void;
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates inquiries feature state and its documented UI/API boundary through useManagerInquiriesPipelineMutations.
 * @dependencies Uses ManagerIdempotency, ManagerInquiriesPipelineApi, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast, ManagerInquiriesPipelineFormTypes.
 * @edge-case preserves explicit loading state until the query or mutation settles; reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerInquiriesPipelineMutations owns the inquiries feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerInquiriesPipelineMutations({ showToast, onSuccessCallback }: UseInquiriesMutationsProps) {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    void queryClient.invalidateQueries({ queryKey: MANAGER_INQUIRIES_PIPELINE_QUERY_KEYS.all });
  };

  const createInquiryMutation = useMutation({
    mutationFn: ({ data, idempotencyKey }: { data: ManagerInquiriesPipelineWritePayload; idempotencyKey: string }) => ManagerInquiriesPipelineApi.createInquiry(data, idempotencyKey),
    onSuccess: (res) => {
      showToast(res.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      ManagerInfrastructureShowErrorToast(err, 'manager-inquiries-error');
    }
  });

  const updateInquiryMutation = useMutation({
    mutationFn: ({ id, data, idempotencyKey }: { id: string; data: ManagerInquiriesPipelineWritePayload; idempotencyKey: string }) => ManagerInquiriesPipelineApi.updateInquiry(id, data, idempotencyKey),
    onSuccess: (res) => {
      showToast(res.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      ManagerInfrastructureShowErrorToast(err, 'manager-inquiries-error');
    }
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerInquiriesPipelineApi.deleteInquiry(id, idempotencyKey),
    onSuccess: (res) => {
      showToast(res.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      ManagerInfrastructureShowErrorToast(err, 'manager-inquiries-error');
    }
  });


  const convertLeadMutation = useMutation({
    mutationFn: ({ id, data, idempotencyKey }: { id: string; data: Record<string, unknown>; idempotencyKey: string }) => ManagerInquiriesPipelineApi.convertLead(id, data, idempotencyKey),
    onSuccess: (response) => {
      showToast(response.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      ManagerInfrastructureShowErrorToast(err, 'manager-inquiries-error');
    } });

  return {
    createInquiry: createInquiryMutation.mutateAsync,
    isCreating: createInquiryMutation.isPending,
    updateInquiry: updateInquiryMutation.mutateAsync,
    isUpdating: updateInquiryMutation.isPending,
    deleteInquiry: deleteInquiryMutation.mutateAsync,
    isDeleting: deleteInquiryMutation.isPending,
    convertLead: convertLeadMutation.mutateAsync,
    isConverting: convertLeadMutation.isPending };
}
