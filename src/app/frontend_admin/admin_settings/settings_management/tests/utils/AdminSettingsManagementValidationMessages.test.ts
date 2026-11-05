// Regression: module-owned Zod translation-marker extraction must preserve the full translation key.
import { describe, expect, it } from 'vitest';
import { resolveAdminSettingsManagementValidationMessage } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementValidationMessages';

describe('Settings validation marker messages', () => {
  const translate = (key: string) => `translated:${key}`;
  it('preserves the complete key and does not drop the first character', () => {
    expect(resolveAdminSettingsManagementValidationMessage('__i18n:settings.validation.gymNameMin', translate)).toBe('translated:settings.validation.gymNameMin');
    expect(resolveAdminSettingsManagementValidationMessage('__i18n:hr.validation.nameRequired', translate)).toBe('translated:hr.validation.nameRequired');
  });
  it('retains ordinary error text and neutralizes empty values', () => {
    expect(resolveAdminSettingsManagementValidationMessage('The value is required', translate)).toBe('The value is required');
    expect(resolveAdminSettingsManagementValidationMessage(undefined, translate)).toBe('');
    expect(resolveAdminSettingsManagementValidationMessage(null, translate)).toBe('');
  });
  it('does not invoke translation for literal messages', () => {
    const keys: string[] = [];
    expect(resolveAdminSettingsManagementValidationMessage('Error', (key) => { keys.push(key); return key; })).toBe('Error');
    expect(keys).toEqual([]);
  });
});
