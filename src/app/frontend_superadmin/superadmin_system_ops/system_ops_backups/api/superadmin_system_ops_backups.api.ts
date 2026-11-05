import { superadminSystemOpsBackupsApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups_api_fetch.api';
import { SUPERADMIN_SYSTEM_OPS_BACKUPS_API } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/config/superadmin_system_ops_backups.url_config';
import { SuperadminBackupDownloadDataSchema, SuperadminBackupsNullDataSchema, SuperadminBackupsListDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_api.schemas';
import { SuperadminSystemOpsBackupsScheduleSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_schedule.schemas';

import type { SuperadminBackupsSchedule, SuperadminBackupsScheduleInput } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups_schedule.types';
import type { BackupRecord } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups.types';
import type { ApiResponse } from '@/lib/api';


// RESPONSIBILITY: Provides API access for Superadmin backup operations; demo behavior is owned by this module's MSW handlers.


export async function fetchBackups(params?: Record<string, string>): Promise<ApiResponse<BackupRecord[]>> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiFetch<BackupRecord[]>(`${SUPERADMIN_SYSTEM_OPS_BACKUPS_API.BASE}${query}`, { dataSchema: SuperadminBackupsListDataSchema });
}

/**
 * Requests creation of a backup snapshot through the module-owned API contract.
 * @description Starts a backup mutation for the Superadmin Backups feature.
 * @dependencies Uses the module-owned API transport and Zod response validation.
 * @edge-case Preserves mutation failure semantics for the owning retry/confirmation flow.
 */
export async function createBackupSnapshot(idempotencyKey: string): Promise<ApiResponse<null>> {
    return apiFetch<null>(SUPERADMIN_SYSTEM_OPS_BACKUPS_API.TRIGGER, { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminBackupsNullDataSchema });
}

/**
 * @description Restores one validated backup snapshot through the feature-owned API contract.
 * @dependencies Uses the Superadmin backups URL configuration, canonical API transport, and idempotency header.
 * @edge-case Propagates the backend response message/error so the caller can expose the real failure and retry safely.
 */
export async function restoreBackupSnapshot(id: string, idempotencyKey: string): Promise<ApiResponse<null>> {
    return apiFetch<null>(SUPERADMIN_SYSTEM_OPS_BACKUPS_API.RESTORE(id), { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminBackupsNullDataSchema });
}

export async function fetchBackupDownloadUrl(id: string): Promise<ApiResponse<{ downloadUrl: string }>> {
    return apiFetch<{ downloadUrl: string }>(SUPERADMIN_SYSTEM_OPS_BACKUPS_API.DOWNLOAD(id), { dataSchema: SuperadminBackupDownloadDataSchema });
}

export async function fetchBackupSchedule(): Promise<ApiResponse<SuperadminBackupsSchedule>> {
    return apiFetch<SuperadminBackupsSchedule>(SUPERADMIN_SYSTEM_OPS_BACKUPS_API.SCHEDULE, {
        dataSchema: SuperadminSystemOpsBackupsScheduleSchema,
    });
}

export async function updateBackupSchedule(input: SuperadminBackupsScheduleInput, idempotencyKey: string): Promise<ApiResponse<SuperadminBackupsSchedule>> {
    return apiFetch<SuperadminBackupsSchedule>(SUPERADMIN_SYSTEM_OPS_BACKUPS_API.SCHEDULE, {
        method: 'PATCH',
        body: JSON.stringify(input),
        dataSchema: SuperadminSystemOpsBackupsScheduleSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    });
}
