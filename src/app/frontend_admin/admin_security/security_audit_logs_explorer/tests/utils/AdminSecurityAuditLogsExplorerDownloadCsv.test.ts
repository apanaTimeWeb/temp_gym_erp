import { describe, expect, it, vi } from 'vitest';
import { downloadAdminSecurityAuditLogsExplorerCsv } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerDownloadCsv';

describe('Audit Logs browser CSV lifecycle', () => {
  it('mounts the anchor and releases URL after successful click', () => {
    const create = vi.fn().mockReturnValue('blob:audit');
    const revoke = vi.fn();
    vi.stubGlobal('URL', { createObjectURL: create, revokeObjectURL: revoke });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {
      expect(document.querySelector('a[download="audit_logs.csv"]')).not.toBeNull();
    });
    try {
      downloadAdminSecurityAuditLogsExplorerCsv(new Blob(['a']), 'audit_logs.csv');
      expect(click).toHaveBeenCalledTimes(1);
      expect(revoke).toHaveBeenCalledWith('blob:audit');
      expect(document.querySelector('a[download="audit_logs.csv"]')).toBeNull();
    } finally { click.mockRestore(); vi.unstubAllGlobals(); }
  });
  it('releases resources after browser click failure', () => {
    const create = vi.fn().mockReturnValue('blob:audit-fail');
    const revoke = vi.fn();
    vi.stubGlobal('URL', { createObjectURL: create, revokeObjectURL: revoke });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { throw new Error('private browser diagnostic'); });
    try {
      expect(() => downloadAdminSecurityAuditLogsExplorerCsv(new Blob(['a']), 'audit_logs.csv')).toThrow();
      expect(revoke).toHaveBeenCalledWith('blob:audit-fail');
      expect(document.querySelector('a[download="audit_logs.csv"]')).toBeNull();
    } finally { click.mockRestore(); vi.unstubAllGlobals(); }
  });
});
