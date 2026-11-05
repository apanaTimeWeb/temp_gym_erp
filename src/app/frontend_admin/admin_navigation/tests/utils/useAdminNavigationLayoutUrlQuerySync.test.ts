// RESPONSIBILITY: Defines regression tests for useAdminNavigationLayoutUrlQuerySync.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/utils/useAdminNavigationLayoutUrlQuerySync.test.ts)

import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutUrlQuerySync';

const router = { replace: vi.fn() };
let searchParams = new URLSearchParams('page=3&status=active');
vi.mock('next/navigation', () => ({ useRouter: () => router, usePathname: () => '/admin/members', useSearchParams: () => searchParams }));

describe('useAdminNavigationLayoutUrlQuerySync', () => {
  beforeEach(() => { router.replace.mockReset(); searchParams = new URLSearchParams('page=3&status=active'); });
  it('hydrates controlled state from explicit URL values and removes defaults from the canonical URL', async () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState<number | string>(1);
      const [status, setStatus] = useState('all');
      useAdminNavigationLayoutUrlQuerySync([
        { key: 'page', value: page, defaultValue: 1, setValue: setPage },
        { key: 'status', value: status, defaultValue: 'all', setValue: setStatus },
      ]);
      return { page, status, setPage, setStatus };
    });
    await waitFor(() => expect(result.current).toMatchObject({ page: '3', status: 'active' }));
    expect(router.replace).not.toHaveBeenCalled();
    act(() => { result.current.setPage(1); result.current.setStatus('all'); });
    await waitFor(() => expect(router.replace).toHaveBeenCalledWith('/admin/members', { scroll: false }));
  });
  it('uses the latest setter callback when only the callback identity changes', async () => {
    const oldSetter = vi.fn();
    const newSetter = vi.fn();
    const { rerender } = renderHook(({ setter }) => useAdminNavigationLayoutUrlQuerySync([{ key: 'page', value: 1, defaultValue: 1, setValue: setter }]), { initialProps: { setter: oldSetter } });
    rerender({ setter: newSetter });
    expect(oldSetter).not.toHaveBeenCalledWith('3');
    // Force URL identity change to rerun the hydration effect after the callback is replaced.
    searchParams = new URLSearchParams('page=3&irrelevant=1');
    rerender({ setter: newSetter });
    await waitFor(() => expect(newSetter).toHaveBeenCalledWith('3'));
    searchParams = new URLSearchParams('page=3&status=active');
  });
});
