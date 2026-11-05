'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminSystemOpsJobsMutations → consuming feature component.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { jobsApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs.api';
import { SUPERADMIN_JOBS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs.query_keys';

import type { SuperadminSystemOpsJobsMutationOptions } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs_mutation.types';



// DATA FLOW: API / URL state / module client state → useTranslations → superadmin_system_ops_jobs view components.
/** Executes job mutations and reconciles the owning Jobs query after each successful operation. 
 * @description Owns the hook behavior for this Superadmin feature.
 * @dependencies Consumes feature-local state/API/query contracts and approved global infrastructure only.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminSystemOpsJobsMutations → owning feature view/components.
/**
 * @description Owns the feature-local superadmin system ops jobs mutations responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminSystemOpsJobsMutations({ setSelectedJobIds, selectedJobIds }: SuperadminSystemOpsJobsMutationOptions) {
  const t = useTranslations('superadmin_system_ops_jobs');
  const queryClient = useQueryClient();
  const { confirm } = useConfirm();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const invalidateJobs = () => Promise.allSettled([queryClient.invalidateQueries({ queryKey: SUPERADMIN_JOBS_QUERY_KEYS.all })]);
  const getKey = (scope: string) => {
    const existing = idempotencyKeysRef.current.get(scope);
    if (existing) return existing;
    const next = crypto.randomUUID();
    idempotencyKeysRef.current.set(scope, next);
    return next;
  };
  const clearKey = (scope: string) => idempotencyKeysRef.current.delete(scope);
  const runMutationSafely = async (action: () => Promise<unknown>): Promise<void> => {
    try {
      await action();
    } catch {
      // Each mutation's onError handler already displays localized recovery feedback.
      // Swallow only here so an event-handler promise does not become an unhandled rejection.
      return;
    }
  };

  const retryAllMutation = useMutation({
    mutationFn: async () => { const response = await jobsApi.retryAllJobs(getKey('retry-all')); if (!response.success) throw new Error(response.message); return response; },
    onSuccess: async (response) => { clearKey('retry-all'); toast.success(response.message, { id: 'superadmin-jobs-retry-all' }); await invalidateJobs(); },
    onError: (_error: unknown) => toast.error(t('ui.action_failed_retry'), { id: 'superadmin-jobs-retry-all-error' }),
  });
  const retryJobMutation = useMutation({
    mutationFn: async (id: string) => { const response = await jobsApi.retryJob(id, getKey(`retry:${id}`)); if (!response.success) throw new Error(response.message); return response; },
    onSuccess: async (response, id) => { clearKey(`retry:${id}`); toast.success(response.message, { id: `superadmin-jobs-retry-${id}` }); await invalidateJobs(); },
    onError: (_error: unknown, id) => toast.error(t('ui.action_failed_retry'), { id: `superadmin-jobs-retry-error-${id}` }),
  });
  const cancelJobMutation = useMutation({
    mutationFn: async ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => { const response = await jobsApi.cancelJob(id, idempotencyKey); if (!response.success) throw new Error(response.message); return response; },
    onSuccess: async (response, variables) => { clearKey(`cancel:${variables.id}`); toast.success(response.message, { id: `superadmin-jobs-cancel-${variables.id}` }); await invalidateJobs(); },
    onError: (_error: unknown, variables) => toast.error(t('ui.action_failed_retry'), { id: `superadmin-jobs-cancel-error-${variables.id}` }),
  });
  const deleteJobMutation = useMutation({
    mutationFn: async ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => { const response = await jobsApi.deleteJob(id, idempotencyKey); if (!response.success) throw new Error(response.message); return response; },
    onSuccess: async (response, variables) => { clearKey(`delete:${variables.id}`); toast.success(response.message, { id: `superadmin-jobs-delete-${variables.id}` }); setSelectedJobIds((previous) => { const next = new Set(previous); next.delete(variables.id); return next; }); await invalidateJobs(); },
    onError: (_error: unknown, variables) => toast.error(t('ui.action_failed_retry'), { id: `superadmin-jobs-delete-error-${variables.id}` }),
  });
  const clearCompletedMutation = useMutation({
    mutationFn: async (idempotencyKey: string) => { const response = await jobsApi.clearCompletedJobs(idempotencyKey); if (!response.success) throw new Error(response.message); return response; },
    onSuccess: async (response) => { clearKey('clear-completed'); toast.success(response.message, { id: 'superadmin-jobs-clear-completed' }); setSelectedJobIds(new Set()); await invalidateJobs(); },
    onError: (_error: unknown) => toast.error(t('ui.action_failed_retry'), { id: 'superadmin-jobs-clear-completed-error' }),
  });
  const bulkRetryMutation = useMutation({
    mutationFn: async (ids: string[]) => { const response = await jobsApi.bulkRetryJobs(ids, getKey(`bulk-retry:${[...ids].sort().join(',')}`)); if (!response.success) throw new Error(response.message); return response; },
    onSuccess: async (response, ids) => { clearKey(`bulk-retry:${[...ids].sort().join(',')}`); toast.success(response.message, { id: 'superadmin-jobs-bulk-retry' }); setSelectedJobIds(new Set()); await invalidateJobs(); },
    onError: (_error: unknown) => toast.error(t('ui.action_failed_retry'), { id: 'superadmin-jobs-bulk-retry-error' }),
  });
  const bulkDeleteMutation = useMutation({
    mutationFn: async ({ ids, idempotencyKey }: { ids: string[]; idempotencyKey: string }) => { const response = await jobsApi.bulkDeleteJobs(ids, idempotencyKey); if (!response.success) throw new Error(response.message); return response; },
    onSuccess: async (response, variables) => { clearKey(`bulk-delete:${[...variables.ids].sort().join(',')}`); toast.success(response.message, { id: 'superadmin-jobs-bulk-delete' }); setSelectedJobIds(new Set()); await invalidateJobs(); },
    onError: (_error: unknown) => toast.error(t('ui.action_failed_retry'), { id: 'superadmin-jobs-bulk-delete-error' }),
  });

  async function handleRetryAll() { if (!retryAllMutation.isPending) await runMutationSafely(() => retryAllMutation.mutateAsync()); }
  async function handleRetryJob(id: string) { if (!retryJobMutation.isPending) await runMutationSafely(() => retryJobMutation.mutateAsync(id)); }
  async function handleCancelJob(id: string) {
    const confirmed = await confirm({ title: t('ui.confirm_cancel_job_title'), message: t('ui.confirm_cancel_job_message'), type: 'warning', confirmText: t('ui.cancel_job_action') });
    if (!confirmed || cancelJobMutation.isPending) return;
    await runMutationSafely(() => cancelJobMutation.mutateAsync({ id, idempotencyKey: getKey(`cancel:${id}`) }));
  }
  async function handleDeleteJob(id: string) {
    const confirmed = await confirm({ title: t('ui.confirm_delete_job_title'), message: t('ui.confirm_delete_job_message'), type: 'danger', confirmText: t('ui.delete_job_action') });
    if (!confirmed || deleteJobMutation.isPending) return;
    await runMutationSafely(() => deleteJobMutation.mutateAsync({ id, idempotencyKey: getKey(`delete:${id}`) }));
  }
  async function handleClearCompleted() {
    const confirmed = await confirm({ title: t('ui.confirm_clear_completed_jobs_title'), message: t('ui.confirm_clear_completed_jobs_message'), type: 'danger', confirmText: t('ui.clear_completed_action') });
    if (!confirmed || clearCompletedMutation.isPending) return;
    await runMutationSafely(() => clearCompletedMutation.mutateAsync(getKey('clear-completed')));
  }
  async function handleBulkRetry() { const ids = [...selectedJobIds]; if (!ids.length || bulkRetryMutation.isPending) return; await runMutationSafely(() => bulkRetryMutation.mutateAsync(ids)); }
  async function handleBulkDelete() {
    const ids = [...selectedJobIds];
    if (!ids.length) return;
    const confirmed = await confirm({ title: t('ui.confirm_delete_selected_jobs_title'), message: t('ui.confirm_delete_selected_jobs_message', { count: ids.length }), type: 'danger', confirmText: t('ui.delete_selected_action') });
    if (!confirmed || bulkDeleteMutation.isPending) return;
    const scope = `bulk-delete:${[...ids].sort().join(',')}`;
    await runMutationSafely(() => bulkDeleteMutation.mutateAsync({ ids, idempotencyKey: getKey(scope) }));
  }
  const isRetrying = retryAllMutation.isPending || bulkRetryMutation.isPending;
  const isJobActionPending = (id: string) => retryJobMutation.isPending && retryJobMutation.variables === id || cancelJobMutation.isPending && cancelJobMutation.variables?.id === id || deleteJobMutation.isPending && deleteJobMutation.variables?.id === id;

  return { isRetrying, isJobActionPending, handleRetryAll, handleRetryJob, handleCancelJob, handleDeleteJob, handleClearCompleted, handleBulkRetry, handleBulkDelete };
}
