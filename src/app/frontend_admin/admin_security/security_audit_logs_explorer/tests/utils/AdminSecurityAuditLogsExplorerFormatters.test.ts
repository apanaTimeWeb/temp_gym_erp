// RESPONSIBILITY: Defines regression tests for AdminSecurityAuditLogsExplorerFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_audit_logs/audit_logs_explorer/tests/utils/AdminSecurityAuditLogsExplorerFormatters.test.ts)

import { describe, expect, it } from 'vitest';
import { formatDateTime } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerFormatters';

describe('AdminAuditLogsFormatters', () => {
  it('formats timestamps using the requested locale', () => {
    expect(formatDateTime('2026-01-05T13:04:05Z', 'en-IN', true)).toMatch(/05 Jan 2026|5 Jan 2026/);
  });
});
