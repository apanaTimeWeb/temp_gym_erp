import { describe, expect, it } from 'vitest';
import { normalizeAdminSecurityAuditLogsExplorerUrlPage } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerUrlPage';

describe('AdminSecurityAuditLogsExplorerUrlPage: strict pagination boundary', () => {
  it.each(['', '0', '-2', '1.5', '2abc', '1e3', '0x10', '01', 'Infinity', 'NaN', ' 4', '9007199254740992', '', null, undefined])(
    'rejects untrusted value %s', (value) => expect(normalizeAdminSecurityAuditLogsExplorerUrlPage(value)).toBe(1),
  );
  it('accepts canonical integers and bounds even safe large pages', () => {
    expect(normalizeAdminSecurityAuditLogsExplorerUrlPage('12')).toBe(12);
    expect(normalizeAdminSecurityAuditLogsExplorerUrlPage(12)).toBe(12);
    expect(normalizeAdminSecurityAuditLogsExplorerUrlPage('99999')).toBe(99999);
    expect(normalizeAdminSecurityAuditLogsExplorerUrlPage('100001')).toBe(100000);
    expect(normalizeAdminSecurityAuditLogsExplorerUrlPage(0.5)).toBe(1);
  });
});
