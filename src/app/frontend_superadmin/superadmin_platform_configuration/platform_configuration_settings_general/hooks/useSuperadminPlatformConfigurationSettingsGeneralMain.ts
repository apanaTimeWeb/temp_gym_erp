'use client';
// DATA FLOW: Settings route → useSuperadminPlatformConfigurationSettingsGeneralPage → draft/grouping state → Settings Main view.
// RESPONSIBILITY: Owns editable drafts, grouped settings, and save completion behavior for the settings view.
import { useMemo, useState } from 'react';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useSuperadminPlatformConfigurationSettingsGeneralPage } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/hooks/useSuperadminPlatformConfigurationSettingsGeneralPage';
import { useSuperadminPlatformConfigurationSettingsGeneralUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/hooks/useSuperadminPlatformConfigurationSettingsGeneralUnsavedChangesGuard';
import { isSuperadminSettingValueValid } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_contract.schemas';

import type { PlatformSetting } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/types/superadmin_platform_configuration_settings_general.types';


/**
 * @description Coordinates editable Settings drafts, grouping, and save feedback for the route main view.
 * @dependencies Composes the Settings page hook and keeps unsaved field edits in local component state.
 * @edge-case A save is ignored when no draft exists; failed saves preserve the draft so the user can retry without losing input.
 */
export function useSuperadminPlatformConfigurationSettingsGeneralMain() {
  const t = useTranslations('superadmin_platform_configuration_settings');
  const page = useSuperadminPlatformConfigurationSettingsGeneralPage();
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const settings: PlatformSetting[] = page.query.data?.data ?? [];
  const hasUnsavedChanges = Object.entries(editedValues).some(([id, value]) => settings.some((setting) => setting.id === id && setting.value !== value));
  useSuperadminPlatformConfigurationSettingsGeneralUnsavedChangesGuard(hasUnsavedChanges);
  const groupedSettings = useMemo(() => settings.reduce<Record<string, PlatformSetting[]>>((accumulator, current) => {
    const category = current.category || 'general';
    const existing = accumulator[category] ?? [];
    existing.push(current);
    accumulator[category] = existing;
    return accumulator;
  }, {}), [settings]);
  const handleSave = async (id: string) => {
    const value = editedValues[id];
    if (value === undefined) return;
    const setting = settings.find((candidate) => candidate.id === id);
    if (!setting) return;
    if (!isSuperadminSettingValueValid(setting.dataType, value)) {
      toast.error(t('ui.setting_value_invalid'), { id: `superadmin-setting-validation-${id}` });
      return;
    }
    try {
      const response = await page.updateSetting({ id, value });
      toast.success(response.message, { id: `superadmin-setting-save-${id}` });
      setEditedValues((previous) => { const next = { ...previous }; delete next[id]; return next; });
    } catch (error: unknown) {
      toast.error(t('ui.setting_save_failed'), { id: `superadmin-setting-save-error-${id}` });
    }
  };
  return { ...page, settings, groupedSettings, editedValues, setEditedValues, handleSave };
}
