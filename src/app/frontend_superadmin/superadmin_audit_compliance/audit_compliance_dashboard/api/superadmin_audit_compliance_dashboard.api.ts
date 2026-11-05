import { superadminComplianceApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/api/superadmin_audit_compliance_dashboard_api_fetch.api';
import { SUPERADMIN_AUDIT_COMPLIANCE_DASHBOARD_API } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/config/superadmin_audit_compliance_dashboard.url_config';
import { SuperadminAuditComplianceResponseSchema } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/schemas/superadmin_audit_compliance_dashboard_contract.schemas';

import type { SuperadminAuditComplianceResponse } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/types/superadmin_audit_compliance_dashboard.types';
import type { ApiResponse } from '@/lib/api';


export async function fetchComplianceOverview(): Promise<ApiResponse<SuperadminAuditComplianceResponse>> {
    return apiFetch<SuperadminAuditComplianceResponse>(SUPERADMIN_AUDIT_COMPLIANCE_DASHBOARD_API.BASE, { dataSchema: SuperadminAuditComplianceResponseSchema });
}
