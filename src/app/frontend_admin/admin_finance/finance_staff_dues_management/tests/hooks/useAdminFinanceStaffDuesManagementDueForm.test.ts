// RESPONSIBILITY: Defines regression tests for useAdminFinanceStaffDuesManagementDueForm.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_staff_dues_management/tests/hooks/useAdminFinanceStaffDuesManagementDueForm.test.ts)

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminFinanceStaffDuesManagementDueForm } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementDueForm';

const payDue = vi.fn();

vi.mock('@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementViewModel', () => ({
  useAdminFinanceStaffDuesManagementViewModel: () => ({ staff: [{ id: 'staff-1', name: 'Asha', currentDue: 8000 }], payDue, saving: false }),
}));
vi.mock('@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementUnsavedChangesGuard', () => ({
  useAdminFinanceStaffDuesManagementUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }),
}));

describe('useAdminFinanceStaffDuesManagementDueForm', () => {
  it('submits validated values and resets only after success', async () => {
    payDue.mockResolvedValueOnce(true);
    const { result } = renderHook(() => useAdminFinanceStaffDuesManagementDueForm());
    act(() => {
      result.current.form.setValue('staffId', 'staff-1', { shouldDirty: true });
      result.current.form.setValue('amount', 3000, { shouldDirty: true });
      result.current.form.setValue('paymentMode', 'Bank Transfer', { shouldDirty: true });
    });
    await act(async () => { await result.current.submit(); });
    expect(payDue).toHaveBeenCalledWith({ staffId: 'staff-1', amount: 3000, notes: '', paymentMode: 'Bank Transfer' });
    expect(result.current.form.getValues('amount')).toBe(0);
  });

  it('preserves entered values when the mutation fails', async () => {
    payDue.mockRejectedValueOnce(new Error('failed'));
    const { result } = renderHook(() => useAdminFinanceStaffDuesManagementDueForm());
    act(() => {
      result.current.form.setValue('staffId', 'staff-1', { shouldDirty: true });
      result.current.form.setValue('amount', 3000, { shouldDirty: true });
    });
    await act(async () => { await result.current.submit(); });
    expect(result.current.form.getValues('amount')).toBe(3000);
    expect(result.current.form.formState.isDirty).toBe(true);
  });
});
