/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsCacheManagementApiSchema owned by the superadmin_system_ops_cache_management feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/schemas/superadmin_system_ops_cache_management.schemas, @/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/schemas/superadmin_system_ops_cache_management_uptime.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

import { SuperadminInfrastructureUptimePointSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/schemas/superadmin_system_ops_cache_management_uptime.schemas';
import { InfrastructureNodeSchema, RedisTelemetrySchema, SuperadminInfrastructureTenantSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/schemas/superadmin_system_ops_cache_management.schemas';


export const SuperadminInfrastructureNodesDataSchema = z.array(InfrastructureNodeSchema);
export const SuperadminInfrastructureUptimeDataSchema = z.array(SuperadminInfrastructureUptimePointSchema);
export const SuperadminInfrastructureNullDataSchema = z.null();
export const SuperadminInfrastructureTenantListDataSchema = z.array(SuperadminInfrastructureTenantSchema);

