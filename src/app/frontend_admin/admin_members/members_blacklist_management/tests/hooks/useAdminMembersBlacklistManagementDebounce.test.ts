// RESPONSIBILITY: Defines regression tests for useAdminMembersBlacklistManagementDebounce.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_blacklist/blacklist_management/tests/hooks/useAdminMembersBlacklistManagementDebounce.test.ts)

import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useAdminBlacklistDebounce } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementDebounce';

describe('useAdminBlacklistDebounce', () => {
  afterEach(() => vi.useRealTimers());
  it('keeps the previous value until the timer expires and cancels stale values', async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useAdminBlacklistDebounce(value, 300), { initialProps: { value: 'a' } });
    expect(result.current).toBe('a');
    rerender({ value: 'ab' });
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current).toBe('a');
    rerender({ value: 'abc' });
    act(() => { vi.advanceTimersByTime(299); });
    expect(result.current).toBe('a');
    act(() => { vi.advanceTimersByTime(1); });
    await waitFor(() => expect(result.current).toBe('abc'));
  });
});
