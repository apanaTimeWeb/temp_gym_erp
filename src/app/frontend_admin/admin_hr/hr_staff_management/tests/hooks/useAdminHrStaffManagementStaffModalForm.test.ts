// RESPONSIBILITY: Defines regression tests for useAdminHrManagementStaffModalForm.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_hr/hr_staff_management/tests/hooks/useAdminHrManagementStaffModalForm.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminHrStaffModalForm } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementStaffModalForm';

const setShowModal = vi.fn();
const saveStaff = vi.fn();
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementViewModel', () => ({ useAdminHrViewModel: () => ({ showModal: true, setShowModal, editId: null, editData: null, saveStaff, saving: false }) }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementBranchReference', () => ({ useAdminHrBranchReference: () => ({ data: [{ id: 'b1', name: 'Main Branch' }] }) }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementUnsavedChangesGuard', () => ({ useAdminHrUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }) }));

describe('useAdminHrStaffModalForm', () => {
  it('resolves branch labels and toggles password visibility through real form state', () => {
    const { result } = renderHook(() => useAdminHrStaffModalForm());
    expect(result.current.getBranchLabel('b1')).toBe('Main Branch');
    expect(result.current.getBranchLabel('missing')).toBe('missing');
    expect(result.current.showPassword).toBe(false);
    act(() => result.current.togglePasswordVisibility());
    expect(result.current.showPassword).toBe(true);
  });
});
