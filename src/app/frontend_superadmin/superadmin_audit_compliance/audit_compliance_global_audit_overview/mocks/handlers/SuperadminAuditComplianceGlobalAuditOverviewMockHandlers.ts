import { delay, http, HttpResponse } from 'msw';
import { SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT_OVERVIEW_API } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/config/superadmin_audit_compliance_global_audit_overview.url_config';
import { MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/mocks/fixtures/SuperadminAuditComplianceGlobalAuditOverviewMockFixtures';
import type { AuditLog, GlobalAuditListMeta } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/types/superadmin_audit_compliance_global_audit_overview.types';
import type { ApiResponse } from '@/lib/api';

export const superadminGlobalAuditHandlers = [
  http.get('*' + SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT_OVERVIEW_API.BASE, async ({ request }) => {
    await delay(120);
    const url = new URL(request.url);
    const scenario = url.searchParams.get('__mockScenario');
    if (scenario === 'permission-denied') return HttpResponse.json({ success: false, message: 'Access denied.', data: null, errorCode: 'FORBIDDEN', statusCode: 403, requestId: crypto.randomUUID()}, { status: 403 });
    if (scenario === 'error') return HttpResponse.json({ success: false, message: 'Audit logs unavailable.', data: null, errorCode: 'SERVICE_UNAVAILABLE', statusCode: 503, requestId: crypto.randomUUID()}, { status: 503 });
    const empty = scenario === 'empty';
    const requestedPage = Math.max(Number(url.searchParams.get('page')) || 1, 1);
    const limit = Math.max(Number(url.searchParams.get('limit')) || 20, 1);
    const search = (url.searchParams.get('search') || '').toLowerCase();
    const severity = url.searchParams.get('severity');
    const actorType = url.searchParams.get('actorType');
    let rows = (empty ? [] : MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT).filter((log) => {
      const values = [log.action, log.actor, log.resource, log.details, log.tenantName || ''];
      return (!search || values.some((value) => value.toLowerCase().includes(search))) && (!severity || severity === 'ALL' || log.severity === severity) && (!actorType || actorType === 'ALL' || log.actorType === actorType);
    });
    const total = rows.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const page = Math.min(requestedPage, totalPages);
    rows = rows.slice((page - 1) * limit, page * limit);
    const meta: GlobalAuditListMeta = { total, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1};
    return HttpResponse.json<ApiResponse<AuditLog[]>>({ success: true, message: 'Success', data: rows, meta, requestId: crypto.randomUUID()});
  }),
  // The export path is present in the supplied URL registry; its backend/OpenAPI contract remains unverified.
  http.post('*' + SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT_OVERVIEW_API.EXPORT, async ({ request }) => {
    await delay(80);
    const url = new URL(request.url);
    if (url.searchParams.get('__mockScenario') === 'error') return HttpResponse.json({ success: false, message: 'Export unavailable.', data: null, errorCode: 'SERVICE_UNAVAILABLE', statusCode: 503, requestId: crypto.randomUUID()}, { status: 503 });
    if (!request.headers.get('Idempotency-Key')) return HttpResponse.json({ success: false, message: 'Idempotency-Key is required.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: 400, requestId: crypto.randomUUID()}, { status: 400 });
    return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Export request accepted.', data: null, requestId: crypto.randomUUID()});
  }),
];
