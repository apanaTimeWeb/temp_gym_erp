// RESPONSIBILITY: Owns module-scoped MSW handlers for the documented immutable Audit Logs API.
// DATA FLOW: MSW request → request/schema validation → module fixture state → response envelope → feature query/UI (admin_audit_logs/audit_logs_explorer/mocks/handlers/AdminSecurityAuditLogsExplorerMockHandlers.ts)

import { adminAuditLogsCsvCell } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerCsvCell';
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { normalizeAdminSecurityAuditLogsExplorerMockPagination } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerMockPagination';
import { MOCK_AUDIT_ACTORS, MOCK_AUDIT_KPI, MOCK_AUDIT_LOGS } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/mocks/fixtures/AdminSecurityAuditLogsExplorerMockFixtures';
import type { AuditLogDetail } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerTypes';
import { redactAdminAuditMetadata, redactAdminAuditText } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerRedactMetadata';

function page<T>(items: T[], pageNumber: number, limit: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / limit));
  const safePage = Math.max(1, Math.min(pageNumber, totalPages));
  const start = (safePage - 1) * limit;
  return { success: true, message: 'Success', data: items.slice(start, start + limit), meta: { total: items.length, page: safePage, limit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 } , requestId: globalThis.crypto.randomUUID() };
}

export const adminAuditLogsMockHandlers = [
  http.get('*/admin/audit-logs', ({ request }) => {
    const url = new URL(request.url);
    const actor = url.searchParams.get('actor');
    const action = url.searchParams.get('action');
    const entityType = url.searchParams.get('entityType');
    const entityId = url.searchParams.get('entityId');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const pageNumber = normalizeAdminSecurityAuditLogsExplorerMockPagination(url.searchParams.get('page'), 1);
    const limit = normalizeAdminSecurityAuditLogsExplorerMockPagination(url.searchParams.get('limit'), 10, 100);
    const items = MOCK_AUDIT_LOGS.filter((log) => {
      const date = new Date(log.timestamp).getTime();
      return (!actor || actor === 'all' || log.actor === actor) && (!action || log.action.includes(action)) && (!entityType || entityType === 'all' || log.entityType === entityType) && (!entityId || entityId === 'all' || log.entityId === entityId) && (!from || date >= new Date(from).getTime()) && (!to || date <= new Date(`${to}T23:59:59.999Z`).getTime());
    });
    return HttpResponse.json(page(items, pageNumber, limit));
  }),
  http.get('*/admin/audit-logs/kpis', () => HttpResponse.json({ success: true, message: 'Success', data: MOCK_AUDIT_KPI , requestId: globalThis.crypto.randomUUID() })),
  http.get('*/admin/audit-logs/actors', () => HttpResponse.json({ success: true, message: 'Success', data: { actors: MOCK_AUDIT_ACTORS } , requestId: globalThis.crypto.randomUUID() })),

  http.get('*/admin/audit-logs/export', ({ request }) => {
    const url = new URL(request.url);
    const actor = url.searchParams.get('actor');
    const action = url.searchParams.get('action');
    const entityType = url.searchParams.get('entityType');
    const entityId = url.searchParams.get('entityId');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const filtered = MOCK_AUDIT_LOGS.filter((log) => {
      const timestamp = new Date(log.timestamp).getTime();
      return (!actor || actor === 'all' || log.actor === actor) &&
        (!action || log.action.includes(action)) &&
        (!entityType || entityType === 'all' || log.entityType === entityType) &&
        (!entityId || entityId === 'all' || log.entityId === entityId) &&
        (!from || timestamp >= new Date(from).getTime()) &&
        (!to || timestamp <= new Date(`${to}T23:59:59.999Z`).getTime());
    });
    const header = 'timestamp,actor,action,entityType,entityId,branchId,severity,details';
    const cell = adminAuditLogsCsvCell;
    const rows = filtered.map((log) => [log.timestamp, redactAdminAuditText(log.actor), redactAdminAuditText(log.action), redactAdminAuditText(log.entityType), redactAdminAuditText(log.entityId ?? ''), redactAdminAuditText(log.branchId), log.severity, String(redactAdminAuditMetadata(log.details) ?? '')].map(cell).join(','));
    return new HttpResponse([header, ...rows].join('\r\n'), { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="audit_logs.csv"' } });
  }),
  http.get('*/admin/audit-logs/:id', ({ params }) => {
    const record = MOCK_AUDIT_LOGS.find((log) => log.id === params.id) as AuditLogDetail | undefined;
    if (!record) return HttpResponse.json({ errorCode: 'NOT_FOUND', requestId: globalThis.crypto.randomUUID(), success: false, message: 'Audit log not found.', data: null, error: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND }, { status: StatusCodes.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Success', data: record , requestId: globalThis.crypto.randomUUID() });
  }),
];
