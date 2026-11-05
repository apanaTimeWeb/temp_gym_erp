import { superadminGlobalAuditApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/api/superadmin_audit_compliance_global_audit_overview_api_fetch.api';
import { SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT_OVERVIEW_API } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/config/superadmin_audit_compliance_global_audit_overview.url_config';
import { SuperadminAuditComplianceGlobalAuditApiResponseSchema } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/schemas/superadmin_audit_compliance_global_audit_overview_api_response.schemas';
import { SuperadminAuditComplianceGlobalAuditExportResponseSchema } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/schemas/superadmin_audit_compliance_global_audit_overview_export_response.schemas';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAuditComplianceGlobalAuditExportApi owned by the superadmin_audit_compliance_global_audit feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/schemas/superadmin_audit_compliance_global_audit_overview_export_response.schemas, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/config/superadmin_audit_compliance_global_audit_overview.url_config, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/api/superadmin_audit_compliance_global_audit_overview_api_fetch.api, @/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/schemas/superadmin_audit_compliance_global_audit_overview_api_response.schemas, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the Global Audit export request contract.


export const superadminGlobalAuditExportApi = {
  requestExport: (idempotencyKey: string) => apiFetch<null>(SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT_OVERVIEW_API.EXPORT, {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    responseSchema: SuperadminAuditComplianceGlobalAuditApiResponseSchema(SuperadminAuditComplianceGlobalAuditExportResponseSchema),
  }),
};
