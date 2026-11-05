// Regression: module-owned Zod translation-marker extraction must preserve the full translation key.
import { describe, expect, it } from 'vitest';
import { resolveAdminFinanceStaffDuesManagementValidationMessage } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementValidationMessages';

describe('finance_staff_dues_management validation marker messages', () => {
  const translate = (key: string) => `translated:${key}`;
  it('preserves the complete key and does not drop the first character', () => {
    expect(resolveAdminFinanceStaffDuesManagementValidationMessage('__i18n:settings.validation.gymNameMin', translate)).toBe('translated:settings.validation.gymNameMin');
    expect(resolveAdminFinanceStaffDuesManagementValidationMessage('__i18n:hr.validation.nameRequired', translate)).toBe('translated:hr.validation.nameRequired');
  });
  it('retains ordinary error text and neutralizes empty values', () => {
    expect(resolveAdminFinanceStaffDuesManagementValidationMessage('The value is required', translate)).toBe('The value is required');
    expect(resolveAdminFinanceStaffDuesManagementValidationMessage(undefined, translate)).toBe('');
    expect(resolveAdminFinanceStaffDuesManagementValidationMessage(null, translate)).toBe('');
  });
  it('does not invoke translation for literal messages', () => {
    const keys: string[] = [];
    expect(resolveAdminFinanceStaffDuesManagementValidationMessage('Error', (key) => { keys.push(key); return key; })).toBe('Error');
    expect(keys).toEqual([]);
  });
});
