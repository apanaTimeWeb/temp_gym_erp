// Regression: module-owned Zod translation-marker extraction must preserve the full translation key.
import { describe, expect, it } from 'vitest';
import { resolveAdminFinanceSalaryAdvanceManagementValidationMessage } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/utils/AdminFinanceSalaryAdvanceManagementValidationMessages';

describe('finance_salary_advance_management validation marker messages', () => {
  const translate = (key: string) => `translated:${key}`;
  it('preserves the complete key and does not drop the first character', () => {
    expect(resolveAdminFinanceSalaryAdvanceManagementValidationMessage('__i18n:settings.validation.gymNameMin', translate)).toBe('translated:settings.validation.gymNameMin');
    expect(resolveAdminFinanceSalaryAdvanceManagementValidationMessage('__i18n:hr.validation.nameRequired', translate)).toBe('translated:hr.validation.nameRequired');
  });
  it('retains ordinary error text and neutralizes empty values', () => {
    expect(resolveAdminFinanceSalaryAdvanceManagementValidationMessage('The value is required', translate)).toBe('The value is required');
    expect(resolveAdminFinanceSalaryAdvanceManagementValidationMessage(undefined, translate)).toBe('');
    expect(resolveAdminFinanceSalaryAdvanceManagementValidationMessage(null, translate)).toBe('');
  });
  it('does not invoke translation for literal messages', () => {
    const keys: string[] = [];
    expect(resolveAdminFinanceSalaryAdvanceManagementValidationMessage('Error', (key) => { keys.push(key); return key; })).toBe('Error');
    expect(keys).toEqual([]);
  });
});
