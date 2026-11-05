import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useAdminHrUrlState } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementUrlState';

const router = vi.hoisted(() => ({ push: vi.fn() }));
const params = vi.hoisted(() => new URLSearchParams('search=rahul&page=3&role=Trainer&staffSortKey=name&staffSortDir=desc'));
vi.mock('next/navigation', () => ({ useRouter: () => router, usePathname: () => '/frontend_admin/admin_hr/hr_staff_management', useSearchParams: () => params }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementDebounce', () => ({ useAdminHrDebounce: (value: string) => value }));

describe('useAdminHrUrlState', () => {
  beforeEach(() => router.push.mockReset());
  it('reads staff filters and pagination from the URL', () => {
    const { result } = renderHook(() => useAdminHrUrlState());
    expect(result.current.search).toBe('rahul');
    expect(result.current.currentPage).toBe(3);
    expect(result.current.roleFilter).toBe('Trainer');
    expect(result.current.staffSortDir).toBe('desc');
  });
  it('resets pagination when the staff search changes', () => {
    const { result } = renderHook(() => useAdminHrUrlState());
    act(() => result.current.setSearch('priya'));
    expect(router.push).toHaveBeenCalledWith(expect.stringContaining('search=priya'));
    expect(router.push).toHaveBeenCalledWith(expect.stringContaining('page=1'));
  });
});
