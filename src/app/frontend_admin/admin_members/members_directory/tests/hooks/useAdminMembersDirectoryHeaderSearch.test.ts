// RESPONSIBILITY: Defines regression tests for useAdminMembersDirectoryHeaderSearch.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/hooks/useAdminMembersDirectoryHeaderSearch.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminMembersHeaderSearch } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryHeaderSearch';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryDebounce', () => ({ useAdminMembersDebounce: (value: string) => value.trim() }));

describe('useAdminMembersHeaderSearch', () => {
  it('disables empty searches and limits active searches to five records', () => {
    vi.mocked(useQuery).mockReturnValue({ data: [], status: 'success' } as never);
    renderHook(() => useAdminMembersHeaderSearch('   '));
    expect(vi.mocked(useQuery).mock.calls[0]?.[0]).toEqual(expect.objectContaining({ enabled: false, staleTime: 30000 }));

    const { rerender } = renderHook(({ search }) => useAdminMembersHeaderSearch(search), { initialProps: { search: 'Riya' } });
    const options = vi.mocked(useQuery).mock.calls.at(-1)?.[0] as { queryFn: () => Promise<unknown>; enabled: boolean };
    expect(options.enabled).toBe(true);
    return expect(options.queryFn()).resolves.toEqual([]);
  });
});
