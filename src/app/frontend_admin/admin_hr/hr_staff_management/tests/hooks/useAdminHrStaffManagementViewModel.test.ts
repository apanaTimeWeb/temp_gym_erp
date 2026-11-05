// RESPONSIBILITY: Regression coverage for HR staff view-model composition.
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementLogic', () => ({ useAdminHrLogic: () => ({ staff: [], totalStaff: 0, status: 'success', error: '', retryStaff: vi.fn(), saving: false, loadAll: vi.fn(), saveStaff: vi.fn(), deleteStaff: vi.fn(), toggleStaffStatus: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementUrlState', () => ({ useAdminHrUrlState: () => ({ search: '', roleFilter: 'All', branchFilter: 'All', currentPage: 1, debouncedSearch: '', staffSortKey: 'name', staffSortDir: 'asc', setSearch: vi.fn(), setBranchFilter: vi.fn(), setRoleFilter: vi.fn(), setCurrentPage: vi.fn(), setStaffSort: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/state/useAdminHrStaffManagementStore', () => ({ useAdminHrStore: () => ({ editId: null, showModal: false, showProfileModal: false, setShowModal: vi.fn(), setShowProfileModal: vi.fn(), setEditId: vi.fn(), openAdd: vi.fn(), openEdit: vi.fn(), openProfile: vi.fn(), visibleColumns: [], setVisibleColumns: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/state/useAdminHrStaffManagementToastStore', () => ({ useAdminNavigationLayoutToastStore: () => ({ showToast: vi.fn() }) }));
import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementViewModel';

describe('useAdminHrViewModel', () => {
  it('composes staff UI and server state without exposing Finance workflows', () => {
    const { result } = renderHook(() => useAdminHrViewModel());
    expect(result.current.staff).toEqual([]);
    expect(result.current.showModal).toBe(false);
    expect(result.current).not.toHaveProperty('savePayroll');
    expect(result.current).not.toHaveProperty('giveAdvance');
    expect(result.current).not.toHaveProperty('payDue');
  });
});
