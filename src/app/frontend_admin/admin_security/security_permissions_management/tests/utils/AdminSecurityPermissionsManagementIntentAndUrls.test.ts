import { describe, expect, it } from 'vitest';
import { ADMIN_PERMISSIONS_API } from '@/app/frontend_admin/admin_security/security_permissions_management/config/admin_security_permissions_management.url_config';
import { adminPermissionsChangeIntentId, adminPermissionsResetIntentId } from '@/app/frontend_admin/admin_security/security_permissions_management/utils/AdminSecurityPermissionsManagementIntentId';

describe('Permissions URL and idempotency boundaries', () => {
  it('keeps arbitrary staff IDs inside one encoded path segment', () => {
    expect(ADMIN_PERMISSIONS_API.staff('s/1?x#y')).toBe('/admin/permissions/s%2F1%3Fx%23y');
    expect(ADMIN_PERMISSIONS_API.reset('s/1?x#y')).toBe('/admin/permissions/s%2F1%3Fx%23y/reset');
    expect(ADMIN_PERMISSIONS_API.staff('50%')).toBe('/admin/permissions/50%25');
  });
  it('distinguishes enabled state and tuple boundaries without changing retry identity', () => {
    const first = adminPermissionsChangeIntentId('a:b', 'c', true);
    expect(first).toBe(adminPermissionsChangeIntentId('a:b', 'c', true));
    expect(first).not.toBe(adminPermissionsChangeIntentId('a:b', 'c', false));
    expect(first).not.toBe(adminPermissionsChangeIntentId('a', 'b:c', true));
    expect(adminPermissionsResetIntentId('a:b')).not.toBe(adminPermissionsResetIntentId('a'));
  });
  it('rejects reserved dot-only ID path segments before browser normalization', () => {
    expect(() => ADMIN_PERMISSIONS_API.staff('.')).toThrow('Invalid path identifier');
    expect(() => ADMIN_PERMISSIONS_API.staff('..')).toThrow('Invalid path identifier');
  });
});
