// RESPONSIBILITY: Resolve URL-selected Settings tab to a physically supported section.
// DATA FLOW: URL tab string → canonical Settings tab allow-list → safe Settings view.
import { SETTINGS_TABS } from '@/app/frontend_admin/admin_settings/settings_management/constants/AdminSettingsManagementConstants';

export type AdminSettingsManagementTabId = (typeof SETTINGS_TABS)[number]['id'];

export function resolveAdminSettingsManagementTab(value: string | null): AdminSettingsManagementTabId {
  return SETTINGS_TABS.find((tab) => tab.id === value)?.id ?? 'profile';
}
