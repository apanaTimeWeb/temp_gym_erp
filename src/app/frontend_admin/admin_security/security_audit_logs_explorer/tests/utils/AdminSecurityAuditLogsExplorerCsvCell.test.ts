import { describe, expect, it } from 'vitest';
import { adminAuditLogsCsvCell } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerCsvCell';

describe('audit mock CSV export cell', () => {
  it('escapes embedded quotes, CR/LF and commas', () => {
    expect(adminAuditLogsCsvCell('a,"b"\nnext')).toBe('"a,""b"" next"');
    expect(adminAuditLogsCsvCell(null)).toBe('""');
  });
  it('blocks executable formula prefixes and whitespace/control bypasses', () => {
    for (const value of ['=2+2', '+SUM(1,1)', '-3+5', '@cmd', '\t=HYPERLINK', '\n+2', '\uFEFF@x']) {
      expect(adminAuditLogsCsvCell(value)).toMatch(/^"'/);
    }
  });
  it('keeps benign identity and timestamp values byte-for-byte', () => {
    expect(adminAuditLogsCsvCell('Audit User')).toBe('"Audit User"');
    expect(adminAuditLogsCsvCell('2026-09-28T09:15:00Z')).toBe('"2026-09-28T09:15:00Z"');
  });
});
