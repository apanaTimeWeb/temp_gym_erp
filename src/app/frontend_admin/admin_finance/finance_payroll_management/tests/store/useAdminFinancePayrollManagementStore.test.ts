// RESPONSIBILITY: Defines regression tests for useAdminFinancePayrollManagementStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payroll_management/tests/store/useAdminFinancePayrollManagementStore.test.ts)

import { act } from 'react';
import { describe, expect, it, beforeEach } from 'vitest';
import { useAdminFinancePayrollManagementStore } from '@/app/frontend_admin/admin_finance/finance_payroll_management/state/useAdminFinancePayrollManagementStore';
import type { Staff } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';

const staff: Staff = {
  id: 'staff-1',
  name: 'Demo Staff',
  email: 'demo@example.com',
  phone: '9876543210',
  role: 'Admin',
  salary: 25000,
  branch: 'branch-1',
  gender: 'OTHER',
  joinDate: '2026-01-01',
  isActive: true,
};

describe('useAdminFinancePayrollManagementStore', () => {
  beforeEach(() => {
    useAdminFinancePayrollManagementStore.setState({
      visibleColumns: ['name', 'role', 'phone', 'salary', 'status', 'actions'],
      showModal: false,
      showPayrollModal: false,
      showProfileModal: false,
      paymentModal: null,
      editId: null,
    });
  });

  it('opens add and edit profile workflows with incompatible modal state cleared', () => {
    act(() => useAdminFinancePayrollManagementStore.getState().openEdit(staff));
    let state = useAdminFinancePayrollManagementStore.getState();
    expect(state.editId).toBe('staff-1');
    expect(state.showModal).toBe(true);
    expect(state.showProfileModal).toBe(false);

    act(() => useAdminFinancePayrollManagementStore.getState().openProfile(staff));
    state = useAdminFinancePayrollManagementStore.getState();
    expect(state.editId).toBe('staff-1');
    expect(state.showProfileModal).toBe(true);
    expect(state.showModal).toBe(false);
  });

  it('opens payroll and add flows independently', () => {
    act(() => useAdminFinancePayrollManagementStore.getState().openAddPayroll());
    expect(useAdminFinancePayrollManagementStore.getState().showPayrollModal).toBe(true);

    act(() => useAdminFinancePayrollManagementStore.getState().openAdd());
    const state = useAdminFinancePayrollManagementStore.getState();
    expect(state.showModal).toBe(true);
    expect(state.editId).toBeNull();
    expect(state.showProfileModal).toBe(false);
  });
});
