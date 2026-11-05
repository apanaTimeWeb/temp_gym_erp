import { describe, expect, it } from 'vitest';
import { isSafeAdminSettingsAppStoreUrl } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementSafeAppStoreUrl';
describe('Settings external HTTPS link safety', () => {
  it('permits explicit HTTPS with hostname, path and query', () => {
    expect(isSafeAdminSettingsAppStoreUrl('https://apps.apple.com/region/app?id=1')).toBe(true);
    expect(isSafeAdminSettingsAppStoreUrl('HTTPS://play.google.com/store/apps')).toBe(true);
  });
  it('rejects credentials, insecure URLs, controls, and ambiguous input', () => {
    for (const value of ['https://user@example.com/', 'https://user:password@example.com/', 'http://example.com', 'javascript:alert(1)', '//example.com', 'https://example.com/\npath', 'https://example.com/\tpath', '', null]) {
      expect(isSafeAdminSettingsAppStoreUrl(value)).toBe(false);
    }
  });
});
