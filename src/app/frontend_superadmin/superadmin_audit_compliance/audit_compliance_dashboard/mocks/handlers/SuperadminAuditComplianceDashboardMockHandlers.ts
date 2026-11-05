import { http, HttpResponse } from 'msw';
import { SUPERADMIN_AUDIT_COMPLIANCE_DASHBOARD_API } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/config/superadmin_audit_compliance_dashboard.url_config';
import { SUPERADMIN_AUDIT_COMPLIANCE_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/mocks/fixtures/SuperadminAuditComplianceDashboardMockFixtures';
import type { SuperadminAuditComplianceResponse } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/types/superadmin_audit_compliance_dashboard.types';
import type { ApiResponse } from '@/lib/api';

export type SuperadminAuditComplianceMockScenario = 'success' | 'empty' | 'error' | 'permission-denied';

export function getSuperadminAuditComplianceMockBody(scenario: SuperadminAuditComplianceMockScenario = 'success'): ApiResponse<SuperadminAuditComplianceResponse> {
  if (scenario === 'empty') {
    return { success: true, message: 'Compliance overview loaded.', data: { summary: { registeredTenants: 0, missingTaxDetails: 0, documentsExpiring: 0, openComplianceTasks: 0 }, regions: [], documents: [] }, requestId: crypto.randomUUID()};
  }
  return { success: true, message: 'Compliance overview loaded.', data: SUPERADMIN_AUDIT_COMPLIANCE_MOCK_FIXTURE, requestId: crypto.randomUUID()};
}

export const superadminComplianceHandlers = [
  http.get('*' + SUPERADMIN_AUDIT_COMPLIANCE_DASHBOARD_API.BASE, ({ request }) => {
    const scenario = new URL(request.url).searchParams.get('__mockScenario') as SuperadminAuditComplianceMockScenario | null;
    if (scenario === 'permission-denied') return HttpResponse.json({ success: false, message: 'Access denied.', data: null, errorCode: 'FORBIDDEN', statusCode: 403, requestId: crypto.randomUUID()}, { status: 403 });
    if (scenario === 'error') return HttpResponse.json({ success: false, message: 'Compliance service unavailable.', data: null, errorCode: 'SERVICE_UNAVAILABLE', statusCode: 503, requestId: crypto.randomUUID()}, { status: 503 });
    return HttpResponse.json(getSuperadminAuditComplianceMockBody(scenario === 'empty' ? 'empty' : 'success'));
  }),
];
