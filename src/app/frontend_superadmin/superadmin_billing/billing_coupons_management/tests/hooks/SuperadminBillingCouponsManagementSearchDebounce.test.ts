import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminBillingCouponsManagementSearchDebounce } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementSearchDebounce';

describe('useSuperadminBillingCouponsManagementSearchDebounce', () => {
  afterEach(() => vi.useRealTimers());

  it('keeps draft input immediate and commits search plus page reset after 300 ms', () => {
    vi.useFakeTimers();
    const setParam = vi.fn();
    const { result } = renderHook(() => useSuperadminBillingCouponsManagementSearchDebounce('', setParam));

    act(() => result.current.setSearchQuery('launch'));
    expect(result.current.searchQuery).toBe('launch');
    expect(setParam).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(299));
    expect(setParam).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(setParam.mock.calls).toEqual([['search', 'launch'], ['page', '1']]);
  });

  it('cancels a stale pending commit when URL search changes externally', () => {
    vi.useFakeTimers();
    const setParam = vi.fn();
    const { result, rerender } = renderHook(
      ({ committed }: { committed: string }) => useSuperadminBillingCouponsManagementSearchDebounce(committed, setParam),
      { initialProps: { committed: '' } },
    );

    act(() => result.current.setSearchQuery('stale-draft'));
    rerender({ committed: 'external-search' });
    expect(result.current.searchQuery).toBe('external-search');
    act(() => vi.advanceTimersByTime(300));
    expect(setParam).not.toHaveBeenCalled();
  });
});
