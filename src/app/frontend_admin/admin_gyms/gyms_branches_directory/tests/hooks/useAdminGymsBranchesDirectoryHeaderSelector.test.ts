"use client";
// RESPONSIBILITY: Defines regression tests for useAdminGymsBranchesDirectoryHeaderSelector.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_branches/branches_directory/tests/hooks/useAdminGymsBranchesDirectoryHeaderSelector.test.ts)

import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useAdminBranchesHeaderSelector } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/hooks/useAdminGymsBranchesDirectoryHeaderSelector';

const replace = vi.fn();
const queryMock = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace }), usePathname: () => '/admin/dashboard', useSearchParams: () => new URLSearchParams('branchId=branch-1&page=2') }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@tanstack/react-query', () => ({ useQuery: (...args: unknown[]) => queryMock(...args) }));
vi.mock('@/app/frontend_admin/admin_gyms/gyms_branches_directory/api/admin_gyms_branches_directory_api', () => ({ AdminBranchesApi: { fetchBranches: vi.fn() } }));

beforeEach(() => {
  replace.mockReset();
  queryMock.mockReturnValue({ data: { data: [{ id: 'branch-1', name: 'Main' }, { id: 'branch-2', name: 'North' }] } });
});

describe('useAdminBranchesHeaderSelector', () => {
  it('serializes branch changes into the shareable URL and clears pagination', () => {
    const { result } = renderHook(() => useAdminBranchesHeaderSelector());
    expect(result.current.selectedBranchId).toBe('branch-1');
    expect(result.current.branchOptions.map((option) => option.value)).toEqual(['all', 'branch-1', 'branch-2']);
    act(() => result.current.handleChange('branch-2'));
    expect(replace).toHaveBeenCalledWith('/admin/dashboard?branchId=branch-2', { scroll: false });
  });
});
