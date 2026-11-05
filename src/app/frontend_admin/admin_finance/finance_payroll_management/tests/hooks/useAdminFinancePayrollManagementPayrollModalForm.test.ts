// RESPONSIBILITY: Defines regression tests for useAdminFinancePayrollManagementPayrollModalForm.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payroll_management/tests/hooks/useAdminFinancePayrollManagementPayrollModalForm.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminFinancePayrollManagementPayrollModalForm } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementPayrollModalForm';

const setShowPayrollModal = vi.fn();
const savePayroll = vi.fn();
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementViewModel', () => ({ useAdminFinancePayrollManagementViewModel: () => ({ showPayrollModal: true, setShowPayrollModal, savePayroll, saving: false, staff: [{ id: 's1', name: 'Riya', role: 'Trainer', salary: 25000 }] }) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementUnsavedChangesGuard', () => ({ useAdminFinancePayrollManagementUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }) }));

describe('useAdminFinancePayrollManagementPayrollModalForm', () => {
  it('delegates a validated payroll draft to the view-model mutation', async () => {
    savePayroll.mockReset().mockResolvedValue(undefined);
    const { result } = renderHook(() => useAdminFinancePayrollManagementPayrollModalForm());
    await act(async () => {
      await result.current.savePayroll({ staffId: 's1', month: '2026-11', amount: 250 } as never);
    });
    expect(savePayroll).toHaveBeenCalledWith(expect.objectContaining({ staffId: 's1', month: '2026-11', amount: 250 }));
  });

  it('exposes the selected staff source and closes the modal after discard confirmation', async () => {
    const { result } = renderHook(() => useAdminFinancePayrollManagementPayrollModalForm());
    expect(result.current.staff).toEqual([{ id: 's1', name: 'Riya', role: 'Trainer', salary: 25000 }]);
    await act(async () => result.current.handleClose());
    expect(setShowPayrollModal).toHaveBeenCalledWith(false);
  });
});
