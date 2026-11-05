import { superadminSystemOpsInfrastructureApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure_api_fetch.api';
import { SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/config/superadmin_system_ops_infrastructure.url_config';
import { SuperadminInfrastructureTenantListDataSchema, SuperadminInfrastructureNullDataSchema, SuperadminInfrastructureNodesDataSchema, SuperadminInfrastructureUptimeDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/schemas/superadmin_system_ops_infrastructure_api.schemas';
import { RedisTelemetrySchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/schemas/superadmin_system_ops_infrastructure.schemas';

import type { SuperadminInfrastructureUptimePoint } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_uptime.types';
import type { InfrastructureNode, RedisTelemetry, SuperadminInfrastructureTenant } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsInfrastructureApi owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/schemas/superadmin_system_ops_infrastructure.schemas, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/schemas/superadmin_system_ops_infrastructure_api.schemas, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure_api_fetch.api, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/config/superadmin_system_ops_infrastructure.url_config, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure.types, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_uptime.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Modularized API client for the Infrastructure module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.


export const infrastructureApi = {
    fetchInfrastructureNodes: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<InfrastructureNode[]>(`${SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.BASE}${q}`, { dataSchema: SuperadminInfrastructureNodesDataSchema });
    },
    fetchRedisTelemetry: () => apiFetch<RedisTelemetry>(SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.REDIS_TELEMETRY, { dataSchema: RedisTelemetrySchema }),
    fetchUptimeHistory: () => apiFetch<SuperadminInfrastructureUptimePoint[]>(SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.UPTIME_HISTORY, { dataSchema: SuperadminInfrastructureUptimeDataSchema }),
    flushGlobalCache: (idempotencyKey: string) => apiFetch<void>(SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.REDIS_FLUSH_GLOBAL, { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminInfrastructureNullDataSchema }),
    flushTenantCache: (tenantIds: string[], idempotencyKey: string) => apiFetch<void>(SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.REDIS_FLUSH_TENANT, { method: 'POST', body: JSON.stringify({ tenantIds }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminInfrastructureNullDataSchema }),
    fetchTenants: () => apiFetch<SuperadminInfrastructureTenant[]>(SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API.TENANTS, { dataSchema: SuperadminInfrastructureTenantListDataSchema }),
};
