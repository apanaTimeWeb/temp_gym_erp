import { describe, expect, it } from 'vitest';
import { normalizeAdminSecurityAuditLogsExplorerMockPagination } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerMockPagination';

describe('AdminSecurityAuditLogsExplorer mock pagination', () => {
  it('preserves normal positive page and list defaults', () => {
    expect(normalizeAdminSecurityAuditLogsExplorerMockPagination(null, 1)).toBe(1);
    expect(normalizeAdminSecurityAuditLogsExplorerMockPagination('2', 1)).toBe(2);
    expect(normalizeAdminSecurityAuditLogsExplorerMockPagination(null, 10, 100)).toBe(10);
  });
  it('rejects noncanonical, nonfinite, fractional and unsafe values', () => {
    for (const raw of ['0', '-1', '', ' 2 ', '1.5', '1e5', 'Infinity', 'NaN', '2abc', '9007199254740992']) {
      expect(normalizeAdminSecurityAuditLogsExplorerMockPagination(raw, 10, 100)).toBe(10);
    }
  });
  it('bounds page and page-size computations', () => {
    expect(normalizeAdminSecurityAuditLogsExplorerMockPagination('1000000', 1)).toBe(100000);
    expect(normalizeAdminSecurityAuditLogsExplorerMockPagination('101', 10, 100)).toBe(100);
  });
});
