// RESPONSIBILITY: Defines regression tests for useAdminFinanceStaffLedgerManagementLedgerLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_staff_ledger_management/tests/hooks/useAdminFinanceStaffLedgerManagementLedgerLogic.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminFinanceStaffLedgerManagementLedgerLogic } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/hooks/useAdminFinanceStaffLedgerManagementLedgerLogic';

const showToast = vi.fn();
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_finance/finance_staff_ledger_management/hooks/useAdminFinanceStaffLedgerManagementViewModel', () => ({ useAdminFinanceStaffLedgerManagementViewModel: () => ({
  staff: [
    { id: 's1', name: 'Riya', role: 'Trainer' },
    { id: 's2', name: 'Aman', role: 'Manager' },
  ],
  showToast,
}) }));

describe('useAdminFinanceStaffLedgerManagementLedgerLogic', () => {
  beforeEach(() => {
    showToast.mockReset();
    vi.mocked(useQuery).mockReturnValue({ data: { data: [
      { id: 'l1', staffId: 's1', date: '2026-10-04', type: 'Salary Paid', credit: 0, debit: 20000, balance: 0 },
      { id: 'l2', staffId: 's1', date: '2026-10-01', type: 'Salary Generated', credit: 20000, debit: 0, balance: 20000 },
    ] }, isPending: false, error: null } as never);
  });

  it('selects the first available staff and sorts ledger rows by the active column', () => {
    const { result } = renderHook(() => useAdminFinanceStaffLedgerManagementLedgerLogic());
    expect(result.current.selectedStaffId).toBe('s1');
    expect(result.current.staffOptions).toEqual([{ value: 's1', label: 'Riya (Trainer)' }, { value: 's2', label: 'Aman (Manager)' }]);
    expect(result.current.sortedLedger[0]?.id).toBe('l1');
    act(() => result.current.handleSort('credit'));
    expect(result.current.sortKey).toBe('credit');
    expect(result.current.sortDir).toBe('desc');
  });
});
