// RESPONSIBILITY: Validates and resolves Settings view identifiers.
import type { SettingsTab } from '@/app/frontend_manager/manager_dashboard/business_settings/types/manager_business_settings.types';
import { MANAGER_BUSINESS_SETTINGS_DEFAULT_VIEW, MANAGER_BUSINESS_SETTINGS_VIEW_IDS } from '@/app/frontend_manager/manager_dashboard/business_settings/constants/manager_business_settings_view.constants';

export function resolveManagerBusinessSettingsView(value: string | null | undefined): SettingsTab {
  return MANAGER_BUSINESS_SETTINGS_VIEW_IDS.includes(value as SettingsTab) ? value as SettingsTab : MANAGER_BUSINESS_SETTINGS_DEFAULT_VIEW;
}
