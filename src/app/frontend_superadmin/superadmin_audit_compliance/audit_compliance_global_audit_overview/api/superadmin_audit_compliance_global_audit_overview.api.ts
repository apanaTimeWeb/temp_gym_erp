import { z } from 'zod';

import { superadminGlobalAuditApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/api/superadmin_audit_compliance_global_audit_overview_api_fetch.api';
import { SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT_OVERVIEW_API } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/config/superadmin_audit_compliance_global_audit_overview.url_config';
import { SuperadminAuditComplianceGlobalAuditListResponseSchema } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/schemas/superadmin_audit_compliance_global_audit_overview_api_response.schemas';
import { AuditLogSchema } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/schemas/superadmin_audit_compliance_global_audit_overview_contract.schemas';

import type { GlobalAuditListMeta, AuditLog } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/types/superadmin_audit_compliance_global_audit_overview.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAuditComplianceGlobalAuditApi owned by the superadmin_audit_compliance_global_audit feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/schemas/superadmin_audit_compliance_global_audit_overview_api_response.schemas, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/schemas/superadmin_audit_compliance_global_audit_overview_contract.schemas, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/api/superadmin_audit_compliance_global_audit_overview_api_fetch.api, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/config/superadmin_audit_compliance_global_audit_overview.url_config, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/types/superadmin_audit_compliance_global_audit_overview.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Modularized API client for the Global Audit module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.


export const auditLogsApi = {
    fetchGlobalLogs: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<AuditLog[]>(`${SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT_OVERVIEW_API.BASE}${q}`, { responseSchema: SuperadminAuditComplianceGlobalAuditListResponseSchema(z.array(AuditLogSchema)) }) as Promise<ApiResponse<AuditLog[]> & { meta: GlobalAuditListMeta }>;
    },
};
