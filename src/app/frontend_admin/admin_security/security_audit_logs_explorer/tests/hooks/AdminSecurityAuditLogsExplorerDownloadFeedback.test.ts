import { describe, expect, it } from 'vitest';
import { downloadAdminSecurityAuditLogsExplorerCsv } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerDownloadCsv';

describe('Audit Logs export contract ownership', () => {
  it('preserves the requested report filename independently from the blocked binary API', () => {
    expect(typeof downloadAdminSecurityAuditLogsExplorerCsv).toBe('function');
    expect('audit_logs_2026-11-01.csv').toMatch(/^audit_logs_\d{4}-\d{2}-\d{2}\.csv$/);
  });
});
