import { describe, expect, it } from 'vitest';
import { ADMIN_AUDIT_LOGS_DETAIL_URL } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/config/admin_security_audit_logs_explorer.url_config';

describe('AdminSecurityAuditLogsExplorer URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_AUDIT_LOGS_DETAIL_URL('valid-1')).toBe("/admin/audit-logs/valid-1");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_AUDIT_LOGS_DETAIL_URL('a/b?x#y')).toBe("/admin/audit-logs/a%2Fb%3Fx%23y");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_AUDIT_LOGS_DETAIL_URL(id)).toThrow(TypeError);
  });
});
