// RESPONSIBILITY: Regression coverage for exact registered field-path mapping in the owning submodule.
// DATA FLOW: Canonical 400 failure fixture -> feature API mapper -> React Hook Form field errors.
import { describe, expect, it, vi } from 'vitest';
import { applyAdminFinanceBranchProfitAndLossApiValidationErrors, AdminFinanceBranchProfitAndLossApiResponseError } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossApiResponse';

const failure = (fields: string[]) => new AdminFinanceBranchProfitAndLossApiResponseError({
  success: false, message: 'Validation failed', data: null,
  errorCode: 'VALIDATION_FAILED', statusCode: 400, requestId: 'field-path-test',
  validationErrors: fields.map((field) => ({ field, message: 'Invalid' })),
});

describe('exact API field-path safety', () => {
  it('does not map unknown nested paths or prototype-manipulation paths', () => {
    const setError = vi.fn();
    const mapped = applyAdminFinanceBranchProfitAndLossApiValidationErrors(
      failure(['name.unknown', 'profile.notRegistered', 'name.__proto__', 'name.constructor']),
      { name: '', profile: { displayName: '' } }, setError as never,
    );
    expect(mapped).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it('maps actual root, nested and array-element fields only', () => {
    const setError = vi.fn();
    const mapped = applyAdminFinanceBranchProfitAndLossApiValidationErrors(
      failure(['name', 'profile.displayName', 'items.0.title', 'items.2.title']),
      { name: '', profile: { displayName: '' }, items: [{ title: '' }] }, setError as never,
    );
    expect(mapped).toBe(true);
    expect(setError.mock.calls.map(([name]) => name)).toEqual(['name', 'profile.displayName', 'items.0.title']);
  });

  it('does not map failures without canonical HTTP 400 validation details', () => {
    const setError = vi.fn();
    const mapped = applyAdminFinanceBranchProfitAndLossApiValidationErrors({ statusCode: 500, success: false, validationErrors: [{ field: 'name', message: 'Invalid' }] }, { name: '' }, setError as never);
    expect(mapped).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });
});
