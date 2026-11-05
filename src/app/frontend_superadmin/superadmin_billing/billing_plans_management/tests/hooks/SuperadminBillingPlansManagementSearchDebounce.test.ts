import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminBillingPlansManagementSearchDebounce } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementSearchDebounce';

describe('useSuperadminBillingPlansManagementSearchDebounce', () => {
  afterEach(() => vi.useRealTimers());

  it('keeps the input responsive and delays only the search URL commit', () => {
    vi.useFakeTimers();
    const setParam = vi.fn();
    const { result } = renderHook(() => useSuperadminBillingPlansManagementSearchDebounce('', setParam));

    act(() => result.current.setSearch('premium'));
    expect(result.current.search).toBe('premium');
    expect(setParam).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(299));
    expect(setParam).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(setParam.mock.calls).toEqual([['search', 'premium']]);
    expect(setParam).not.toHaveBeenCalledWith('page', '1');
  });

  it('clears pending work when the hook unmounts', () => {
    vi.useFakeTimers();
    const setParam = vi.fn();
    const { result, unmount } = renderHook(() => useSuperadminBillingPlansManagementSearchDebounce('', setParam));

    act(() => result.current.setSearch('discard-me'));
    unmount();
    act(() => vi.advanceTimersByTime(300));
    expect(setParam).not.toHaveBeenCalled();
  });
});
