import { superadminSystemOpsBackupsApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups_api_fetch.api';
import { SUPERADMIN_SYSTEM_OPS_BACKUPS_API as SUPERADMIN_SYSTEM_OPS_BACKUPS_HEALTH_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/config/superadmin_system_ops_backups.url_config';
import { SuperadminBackupsV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_v1.schemas';

import type { SuperadminBackupsV1Data } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups_v1.types';
import type { ApiResponse } from '@/lib/api';


// RESPONSIBILITY: Provides API access for Superadmin backup safety and restore readiness; demo behavior is owned by module MSW handlers.


export async function fetchBackupsHealth(): Promise<ApiResponse<SuperadminBackupsV1Data>> {
    return apiFetch<SuperadminBackupsV1Data>(SUPERADMIN_SYSTEM_OPS_BACKUPS_HEALTH_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_BACKUPS_HEALTH.BACKEND_API.BASE, { dataSchema: SuperadminBackupsV1DataSchema });
}
