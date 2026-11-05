// RESPONSIBILITY: Defines regression tests for useAdminFinanceStaffDuesManagementDueAmountSync.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_staff_dues_management/tests/hooks/useAdminFinanceStaffDuesManagementDueAmountSync.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAdminFinanceStaffDuesManagementDueAmountSync } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementDueAmountSync';
import { AdminFinanceStaffDuesManagementToMinorUnits } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementCurrencyUnits';
import type { Staff } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementTypes';

const staff: Staff = {
  id: 's1', name: 'Riya', email: 'r@example.com', phone: '9876543210', role: 'Trainer', salary: 25000,
  branch: 'b1', gender: 'FEMALE', joinDate: '2026-01-01', isActive: true, currentDue: 1800,
};

describe('useAdminFinanceStaffDuesManagementDueAmountSync', () => {
  it('syncs the selected staff due into a clean amount field', () => {
    const setValue = vi.fn();
    const form = { getValues: vi.fn().mockReturnValue(0), formState: { dirtyFields: {} }, setValue } as never;
    renderHook(() => useAdminFinanceStaffDuesManagementDueAmountSync(form, staff));
    expect(setValue).toHaveBeenCalledWith('amount', 18, { shouldDirty: false });
  });

  it('round-trips the due amount exactly once across the form and mutation boundary', () => {
    expect(AdminFinanceStaffDuesManagementToMinorUnits(35)).toBe(3500);
    expect(AdminFinanceStaffDuesManagementToMinorUnits(1.15)).toBe(115);
  });

  it('does not overwrite a manually edited non-zero amount', () => {
    const setValue = vi.fn();
    const form = { getValues: vi.fn().mockReturnValue(900), formState: { dirtyFields: { amount: true } }, setValue } as never;
    renderHook(() => useAdminFinanceStaffDuesManagementDueAmountSync(form, staff));
    expect(setValue).not.toHaveBeenCalled();
  });
});
