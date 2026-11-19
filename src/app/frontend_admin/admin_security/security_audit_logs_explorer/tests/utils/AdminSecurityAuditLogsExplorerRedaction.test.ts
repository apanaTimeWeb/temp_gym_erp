import { describe, expect, it } from 'vitest';
import { redactAdminAuditMetadata, redactAdminAuditText } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerRedactMetadata';

// Authored regression coverage; requires the host's Vitest runner.
describe('RBG125 audit data privacy', () => {
  it('redacts JSON-embedded credentials and authorization headers', () => {
    expect(redactAdminAuditText('{"token":"secret123","actor":"alice@example.org"}')).not.toContain('secret123');
    expect(redactAdminAuditText('Basic dXNlcjpzZWNyZXQ=')).not.toContain('dXNlcjpzZWNyZXQ=');
    expect(redactAdminAuditText('Bearer verysecret123')).not.toContain('verysecret123');
  });
  it('redacts nested credential keys without mutating source', () => {
    const original = { privateKey: 'pem', child: { apiKey: 'key', sessionId: 'id', otp: '777777', safe: 'ok' } };
    const masked = redactAdminAuditMetadata(original) as Record<string, any>;
    expect(masked.privateKey).toBe('[REDACTED]');
    expect(masked.child.apiKey).toBe('[REDACTED]');
    expect(masked.child.sessionId).toBe('[REDACTED]');
    expect(masked.child.otp).toBe('[REDACTED]');
    expect(masked.child.safe).toBe('ok');
    expect(original.privateKey).toBe('pem');
  });
});
