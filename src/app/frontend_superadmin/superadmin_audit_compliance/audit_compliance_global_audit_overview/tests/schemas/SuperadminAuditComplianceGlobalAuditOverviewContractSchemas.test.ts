import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { SuperadminAuditComplianceGlobalAuditApiResponseSchema } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/schemas/superadmin_audit_compliance_global_audit_overview_api_response.schemas';
import { SuperadminAuditComplianceGlobalAuditListResponseSchema } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/schemas/superadmin_audit_compliance_global_audit_overview_api_response.schemas';
import { AuditLogSchema } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/schemas/superadmin_audit_compliance_global_audit_overview_contract.schemas';

describe('Global Audit response contracts', () => {
  const log = { id: 'a', timestamp: '2026-01-02T12:00:00Z', actor: 'operator', action: 'LOGIN', resource: 'session', details: 'signed in', ipAddress: '127.0.0.1', severity: 'INFO' };
  it('rejects malformed timestamps at the API boundary', () => {
    expect(AuditLogSchema.safeParse({ ...log, timestamp: 'not-a-date' }).success).toBe(false);
  });
  it('requires valid pagination metadata rather than accepting a partial page envelope', () => {
    const schema = SuperadminAuditComplianceGlobalAuditListResponseSchema(z.array(AuditLogSchema));
    expect(schema.safeParse({ success: true, message: 'ok', data: [log], requestId: 'req-1' }).success).toBe(false);
    expect(schema.safeParse({ success: false, message: 'service unavailable', data: null, errorCode: 'DOWN', statusCode: 503, requestId: 'req-1' }).success).toBe(true);
    expect(schema.safeParse({ success: false, message: 'failure', data: [log], errorCode: 'DOWN', statusCode: 500, requestId: 'req-1' }).success).toBe(false);
    expect(schema.safeParse({ success: true, message: 'ok', data: [log], meta: { total: 1, page: 1, limit: 20, totalPages: 1, hasNextPage: false, hasPrevPage: false }, requestId: 'req-1' }).success).toBe(true);
    expect(schema.safeParse({ success: true, message: 'ok', data: [log], meta: { total: 100, page: 1, limit: 20, totalPages: 1, hasNextPage: true, hasPrevPage: false }, requestId: 'req-1' }).success).toBe(false);
    expect(schema.safeParse({ success: true, message: 'ok', data: [log], meta: { total: 1, page: 2, limit: 20, totalPages: 1, hasNextPage: false, hasPrevPage: true }, requestId: 'req-1' }).success).toBe(false);
    expect(schema.safeParse({ success: true, message: 'ok', data: [log], meta: { total: 21, page: 1, limit: 20, totalPages: 2, hasNextPage: false, hasPrevPage: false }, requestId: 'req-1' }).success).toBe(false);
  });
});
describe('Global Audit generic API response envelope', () => {
  const schema = SuperadminAuditComplianceGlobalAuditApiResponseSchema(z.object({ id: z.string() }));
  it('accepts the success branch and a failure without data', () => {
    expect(schema.safeParse({ success: true, message: 'ok', data: { id: 'a' }, requestId: 'req-1' }).success).toBe(true);
    expect(schema.safeParse({ success: false, message: 'unavailable', data: null, errorCode: 'DOWN', statusCode: 503, requestId: 'req-1' }).success).toBe(true);
  });
  it('rejects branch/data mismatches', () => {
    expect(schema.safeParse({ success: true, message: 'missing data' }).success).toBe(false);
    expect(schema.safeParse({ success: false, message: 'failure', data: { id: 'a' }, errorCode: 'DOWN', statusCode: 500, requestId: 'req-1' }).success).toBe(false);
  });
});
