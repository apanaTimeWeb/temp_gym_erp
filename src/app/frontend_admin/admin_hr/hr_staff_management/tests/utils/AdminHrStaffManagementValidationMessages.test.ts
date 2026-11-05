// Regression: module-owned Zod translation-marker extraction must preserve the full translation key.
import { describe, expect, it } from 'vitest';
import { resolveAdminHrStaffManagementValidationMessage } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementValidationMessages';

describe('HR Staff validation marker messages', () => {
  const translate = (key: string) => `translated:${key}`;
  it('preserves the complete key and does not drop the first character', () => {
    expect(resolveAdminHrStaffManagementValidationMessage('__i18n:settings.validation.gymNameMin', translate)).toBe('translated:settings.validation.gymNameMin');
    expect(resolveAdminHrStaffManagementValidationMessage('__i18n:hr.validation.nameRequired', translate)).toBe('translated:hr.validation.nameRequired');
  });
  it('retains ordinary error text and neutralizes empty values', () => {
    expect(resolveAdminHrStaffManagementValidationMessage('The value is required', translate)).toBe('The value is required');
    expect(resolveAdminHrStaffManagementValidationMessage(undefined, translate)).toBe('');
    expect(resolveAdminHrStaffManagementValidationMessage(null, translate)).toBe('');
  });
  it('does not invoke translation for literal messages', () => {
    const keys: string[] = [];
    expect(resolveAdminHrStaffManagementValidationMessage('Error', (key) => { keys.push(key); return key; })).toBe('Error');
    expect(keys).toEqual([]);
  });
});
