import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminHrLogic } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementLogic';

const queryState = vi.hoisted(() => ({
  response: { data: { data: { staff: [{ id: 's1', isActive: true }], total: 1 } }, status: 'success', error: null, refetch: vi.fn() },
}));
const staffMutations = vi.hoisted(() => ({ isPending: false, saveStaff: vi.fn(), deleteStaff: vi.fn(), toggleStaffStatus: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('branchId=all') }));
vi.mock('@tanstack/react-query', () => ({ useQuery: (config: { queryFn: () => unknown }) => queryState.response }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/api/admin_hr_staff_management_api', () => ({ AdminHrApi: { fetchStaff: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementStaffMutations', () => ({ useAdminHrStaffMutations: () => staffMutations }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementUrlState', () => ({ useAdminHrUrlState: () => ({ search: '', roleFilter: 'All', branchFilter: 'All', currentPage: 1, debouncedSearch: '', staffSortKey: 'name', staffSortDir: 'asc' }) }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/state/useAdminHrStaffManagementToastStore', () => ({ useAdminNavigationLayoutToastStore: () => ({ showToast: vi.fn() }) }));

describe('useAdminHrLogic', () => {
  beforeEach(() => { queryState.response = { data: { data: { staff: [{ id: 's1', isActive: true }], total: 1 } }, status: 'success', error: null, refetch: vi.fn() }; });
  it('exposes staff-directory data and staff lifecycle actions only', () => {
    const { result } = renderHook(() => useAdminHrLogic({ editId: null, setShowModal: vi.fn() }));
    expect(result.current.staff).toEqual([{ id: 's1', isActive: true }]);
    expect(result.current.totalStaff).toBe(1);
    expect(result.current.saveStaff).toBe(staffMutations.saveStaff);
    expect(result.current).not.toHaveProperty('savePayroll');
    expect(result.current).not.toHaveProperty('giveAdvance');
    expect(result.current).not.toHaveProperty('payDue');
  });
});
