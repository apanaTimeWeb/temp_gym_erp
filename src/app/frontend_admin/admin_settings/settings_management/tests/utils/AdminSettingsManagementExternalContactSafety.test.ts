// RESPONSIBILITY: Regression coverage for trusted external telephone/WhatsApp URLs.
import { describe, expect, it } from 'vitest';
import { normalizeAdminSettingsContactPhone, buildAdminSettingsWhatsAppWebUrl, buildAdminSettingsPhoneUrl } from '@/app/frontend_admin/admin_settings/settings_management/constants/AdminSettingsManagementExternalUrlConstants';

describe('Settings banner external contact links', () => {
  it('preserves a formatted international number', () => {
    expect(normalizeAdminSettingsContactPhone('+91 (98765) 43210')).toBe('+919876543210');
    expect(buildAdminSettingsWhatsAppWebUrl('+91 (98765) 43210')).toBe('https://wa.me/919876543210');
    expect(buildAdminSettingsPhoneUrl('+91 (98765) 43210')).toBe('tel:+919876543210');
  });
  it('does not silently turn invalid input into an external navigation target', () => {
    for (const invalid of ['', '123', 'call 919876543210 now', '++919876543210', '91987+6543210', '1234567890123456', '919876543210?x=1', '91876543210\nhttps://x.invalid']) {
      expect(buildAdminSettingsWhatsAppWebUrl(invalid)).toBe('');
      expect(buildAdminSettingsPhoneUrl(invalid)).toBe('');
    }
  });
});
