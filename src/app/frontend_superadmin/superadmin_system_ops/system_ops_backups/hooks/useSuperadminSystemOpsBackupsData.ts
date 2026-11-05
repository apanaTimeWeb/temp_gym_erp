'use client';
// DATA FLOW: backups API → useSuperadminSystemOpsBackupsData → TanStack Query cache → Superadmin backups UI
// RESPONSIBILITY: Retrieves authoritative backup data and server pagination metadata.
import { useQuery } from '@tanstack/react-query';

import * as backupsApi from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.api';
import { SUPERADMIN_BACKUPS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.query_keys';

import type { BackupRecord } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups.types';



/**
 * Purpose: Retrieves authoritative backup data and server pagination metadata.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Retrieves authoritative backup data and server pagination metadata.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminSystemOpsBackupsData responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminSystemOpsBackupsData(params?: Record<string, string>) {
    const query = useQuery({ queryKey: SUPERADMIN_BACKUPS_QUERY_KEYS.list(params ?? {}), queryFn: async () => { const res = await backupsApi.fetchBackups(params); if (!res.success || !res.data)
            throw new Error(res.message); return res; } });
    return { data: query.data?.data as BackupRecord[] | undefined, total: query.data?.meta?.total ?? query.data?.data?.length ?? 0, totalPages: query.data?.meta?.totalPages ?? 1, isPending: query.isPending, isError: query.isError, error: query.error, refetch: query.refetch };
}
