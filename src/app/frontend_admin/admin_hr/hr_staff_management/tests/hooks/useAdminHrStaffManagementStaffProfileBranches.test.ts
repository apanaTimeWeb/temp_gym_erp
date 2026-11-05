// RESPONSIBILITY: Defines regression tests for useAdminHrManagementStaffProfileBranches.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_hr/hr_staff_management/tests/hooks/useAdminHrManagementStaffProfileBranches.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminHrStaffProfileBranches } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementStaffProfileBranches';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

describe('useAdminHrStaffProfileBranches', () => {
  it('passes the enabled state through to the branch query', () => {
    vi.mocked(useQuery).mockReturnValue({ data: [], status: 'success' } as never);
    renderHook(() => useAdminHrStaffProfileBranches(false));
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({ enabled: false, staleTime: 600000 }));
  });
});
