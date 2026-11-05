// RESPONSIBILITY: Defines regression tests for useAdminFinancePayrollManagementPayrollMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payroll_management/tests/hooks/useAdminFinancePayrollManagementPayrollMutations.test.ts)

import { PAYROLL_STATUS } from '@/app/frontend_admin/admin_finance/finance_payroll_management/constants/AdminFinancePayrollManagementConstants';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminFinancePayrollManagementPayrollMutations } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementPayrollMutations';
import type { Payroll, Staff } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';

const confirm = vi.fn();
const mutationMocks = Array.from({ length: 5 }, () => ({ mutateAsync: vi.fn(), isPending: false }));
const queryClient = { invalidateQueries: vi.fn() };
const setShowPayrollModal = vi.fn();
const showToast = vi.fn();

vi.mock('@tanstack/react-query', () => ({ useMutation: vi.fn(), useQueryClient: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm }) }));

const staff: Staff[] = [{
  id: 's1', name: 'Riya', email: 'r@example.com', phone: '9876543210', role: 'Trainer', salary: 25000,
  branch: 'b1', gender: 'FEMALE', joinDate: '2026-01-01', isActive: true,
}];
const payrolls: Payroll[] = [{ id: 'p1', staffId: 's1', month: '2026-10', amount: 25000, paidAmount: 5000, pendingAmount: 20000, status: PAYROLL_STATUS.PARTIAL, staff: { name: 'Riya', role: 'Trainer' } }];

describe('useAdminFinancePayrollManagementPayrollMutations', () => {
  beforeEach(() => {
    vi.mocked(useMutation).mockReset();
    mutationMocks.forEach((m) => { m.mutateAsync.mockReset().mockResolvedValue({ message: 'ok' }); });
    mutationMocks.forEach((m) => vi.mocked(useMutation).mockReturnValueOnce(m as never));
    vi.mocked(useQueryClient).mockReturnValue(queryClient as never);
    confirm.mockReset().mockResolvedValue(true);
    setShowPayrollModal.mockReset();
    showToast.mockReset();
  });

  it('calculates pending payroll amount and routes the payload through the mutation layer', async () => {
    const { result } = renderHook(() => useAdminFinancePayrollManagementPayrollMutations(staff, payrolls, setShowPayrollModal, showToast));
    await act(async () => {
      await result.current.savePayroll({ staffId: 's1', month: '2026-11', amount: 25000, paidAmount: 10000 });
    });
    expect(mutationMocks[0].mutateAsync).toHaveBeenCalledWith(expect.objectContaining({ payload: expect.objectContaining({ amount: 2500000, paidAmount: 1000000, pendingAmount: 1500000, status: PAYROLL_STATUS.PARTIAL }) }));
    expect(showToast).toHaveBeenCalledWith('ok', 'success', 'hr-payroll-create-success');
    expect(setShowPayrollModal).toHaveBeenCalledWith(false);
  });

  it('fails closed before confirmation when a payment exceeds the pending paise balance', async () => {
    const { result } = renderHook(() => useAdminFinancePayrollManagementPayrollMutations(staff, payrolls, setShowPayrollModal, showToast));
    await act(async () => {
      expect(await result.current.markPayrollPaid('p1', 201)).toBe(false);
      expect(await result.current.markPayrollPaid('p1', 0)).toBe(false);
      expect(await result.current.markPayrollPaid('p1', 0.001)).toBe(false);
    });
    expect(confirm).not.toHaveBeenCalled();
    expect(mutationMocks[1].mutateAsync).not.toHaveBeenCalled();
  });

  it('calculates the remaining balance before marking an existing payroll paid', async () => {
    const { result } = renderHook(() => useAdminFinancePayrollManagementPayrollMutations(staff, payrolls, setShowPayrollModal, showToast));
    await act(async () => {
      await result.current.markPayrollPaid('p1', 50);
    });
    expect(mutationMocks[1].mutateAsync).toHaveBeenCalledWith(expect.objectContaining({
      id: 'p1',
      payload: expect.objectContaining({ paidAmount: 10000, pendingAmount: 15000, status: PAYROLL_STATUS.PARTIAL }),
    }));
  });
});
