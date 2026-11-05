import { superadminSystemOpsOverviewApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/api/superadmin_system_ops_overview_api_fetch.api';
import { SUPERADMIN_SYSTEM_OPS_OVERVIEW_API as SUPERADMIN_SYSTEM_OPS_API } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/config/superadmin_system_ops_overview.url_config';
import { SuperadminSystemOpsSummarySchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/schemas/superadmin_system_ops_overview_types.schemas';

import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/types/superadmin_system_ops_overview_status.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsApi owned by the superadmin_system_ops feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/schemas/SuperadminSystemOpsTypesSchemas, @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/api/superadmin_system_ops_overview_api_fetch.api, @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/config/superadmin_system_ops_overview.url_config, @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/types/SuperadminSystemOpsTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Provides API access for the Superadmin System Ops summary feature. No UI logic.


export function fetchSuperadminSystemOpsSummary(): Promise<ApiResponse<SuperadminSystemOpsSummary>> {
  return apiFetch<SuperadminSystemOpsSummary>(SUPERADMIN_SYSTEM_OPS_API.SUMMARY, {
    dataSchema: SuperadminSystemOpsSummarySchema,
  });
}
