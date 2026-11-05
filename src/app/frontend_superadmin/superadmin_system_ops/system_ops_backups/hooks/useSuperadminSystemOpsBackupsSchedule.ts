'use client';
// DATA FLOW: Schedule modal → query + mutation hooks → Superadmin Backups API → cache reconciliation.
// RESPONSIBILITY: Stable feature-facing composition hook for the Backups schedule; TanStack mutation logic lives in its dedicated hook.
import { useSuperadminSystemOpsBackupsScheduleQuery } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsScheduleQuery';
import { useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation';



/** @description Composes the Backups schedule server-state query with its dedicated mutation hook without owning either TanStack primitive directly. */
export function useSuperadminSystemOpsBackupsSchedule(enabled: boolean) {
  const query = useSuperadminSystemOpsBackupsScheduleQuery(enabled);
  const mutation = useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation();
  return {
    schedule: query.schedule,
    isPending: query.isPending,
    isError: query.isError,
    queryError: query.error,
    retry: query.refetch,
    saveSchedule: mutation.mutateAsync,
    isSaving: mutation.isPending,
    saveError: mutation.error,
  };
}
