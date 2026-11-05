'use client';
// RESPONSIBILITY: Orchestrates the async Superadmin tenant-data export request and completion feedback.
import { useRef, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { superadminProfileDataExportApi } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview_data_export.api';
import { SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview.query_keys';
import { SUPERADMIN_ACCOUNT_PROFILE_DATA_EXPORT_COMPLETION_STATES } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/constants/superadmin_account_profile_overview.constants';
import { useSuperadminAccountProfileOverviewSocketEvent } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/hooks/useSuperadminAccountProfileOverviewSocketEvent';


// DATA FLOW: API / URL state / module client state → useRef → superadmin_account_profile view components.
/**
 * @description Requests the asynchronous Superadmin full-data export and listens for its exact completion event through the centralized role socket.
 * @dependencies Uses the Profile-owned export API, idempotency lifecycle, translated feedback, and the role-level socket subscription hook.
 * @edge-case Reuses one idempotency key across retries and clears it only after a successful request; no file bytes are streamed through the browser.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminAccountProfileOverviewDataExportMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin profile data export mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminAccountProfileOverviewDataExportMutation() {
  const t = useTranslations('superadmin_account_profile');
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<string | null>(null);
  const [completionState, setCompletionState] = useState<(typeof SUPERADMIN_ACCOUNT_PROFILE_DATA_EXPORT_COMPLETION_STATES)[number]>('idle');
  const activeExportRef = useRef(false);

  const mutation = useMutation({
    mutationFn: async (idempotencyKey: string) => {
      const response = await superadminProfileDataExportApi.requestFullDataExport(idempotencyKey);
      if (!response.success) throw new Error(response.message || t('ui.action_failed_retry'));
      return response;
    },
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_ACCOUNT_PROFILE_QUERY_KEYS.all });
      idempotencyKeyRef.current = null;
      activeExportRef.current = true;
      setCompletionState('started');
      toast.success(response.message, { id: 'superadmin-profile-data-export-success' });
    },
    onError: () => {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-profile-data-export-error' });
    },
  });

  useSuperadminAccountProfileOverviewSocketEvent('export.completed', () => {
    if (!activeExportRef.current) return;
    activeExportRef.current = false;
    setCompletionState('completed');
    toast.success(t('ui.export_completed_success'), { id: 'superadmin-profile-data-export-completed' });
  });

  const requestExport = async (): Promise<void> => {
    setCompletionState('idle');
    activeExportRef.current = false;
    idempotencyKeyRef.current ??= crypto.randomUUID();
    try {
      await mutation.mutateAsync(idempotencyKeyRef.current);
    } catch {
      // onError owns user feedback; keep the idempotency key so retry repeats the same intent.
    }
  };

  return {
    requestExport,
    isRequesting: mutation.isPending,
    completionState,
  };
}
