// RESPONSIBILITY: Defines regression tests for AdminSecurityAuditLogsExplorerRedactMetadata.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_audit_logs/audit_logs_explorer/tests/utils/AdminSecurityAuditLogsExplorerRedactMetadata.test.ts)

import { describe, expect, it } from 'vitest';
import { redactAdminAuditMetadata } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerRedactMetadata';

describe('redactAdminAuditMetadata', () => {
  it('redacts sensitive keys recursively without mutating source values', () => {
    const source = { actor: 'Admin', email: 'a@example.com', nested: { token: 'secret', changed: 'ok' } };
    expect(redactAdminAuditMetadata(source)).toEqual({ actor: 'Admin', email: '[REDACTED]', nested: { token: '[REDACTED]', changed: 'ok' } });
    expect(source.email).toBe('a@example.com');
  });
});
