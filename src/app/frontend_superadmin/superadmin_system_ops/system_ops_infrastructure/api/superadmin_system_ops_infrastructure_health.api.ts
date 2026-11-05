import { superadminSystemOpsInfrastructureApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure_api_fetch.api';
import { SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API as SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/config/superadmin_system_ops_infrastructure.url_config';
import { SuperadminInfrastructureV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/schemas/superadmin_system_ops_infrastructure_v1.schemas';

import type { SuperadminInfrastructureV1Data } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_v1.types';
import type { ApiResponse } from '@/lib/api';


// RESPONSIBILITY: Provides API access for the Platform API Health feature within Superadmin only.


export async function fetchInfrastructureApiHealth(): Promise<ApiResponse<SuperadminInfrastructureV1Data>> {
    return apiFetch<SuperadminInfrastructureV1Data>(SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH.BACKEND_API.BASE, { dataSchema: SuperadminInfrastructureV1DataSchema });
}
