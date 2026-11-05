// RESPONSIBILITY: Verify Settings query tabs cannot select an unsupported blank view.
import { describe, expect, it } from 'vitest';
import { SETTINGS_TABS } from '@/app/frontend_admin/admin_settings/settings_management/constants/AdminSettingsManagementConstants';
import { resolveAdminSettingsManagementTab } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementResolveTab';

describe('Settings tab allow-list', () => {
  it('accepts every known tab', () => {
    for (const tab of SETTINGS_TABS) expect(resolveAdminSettingsManagementTab(tab.id)).toBe(tab.id);
  });
  it('falls back safely for missing, empty, and injected values', () => {
    for (const value of [null, '', 'unknown', '../admin', 'profile%00', 'PROFILE']) {
      expect(resolveAdminSettingsManagementTab(value)).toBe('profile');
    }
  });
});
