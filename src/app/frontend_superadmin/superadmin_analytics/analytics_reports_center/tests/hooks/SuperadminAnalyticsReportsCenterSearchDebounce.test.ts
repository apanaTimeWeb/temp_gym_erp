import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminAnalyticsReportsCenterSearchDebounce } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterSearchDebounce';

describe('useSuperadminAnalyticsReportsCenterSearchDebounce', () => {
  afterEach(() => vi.useRealTimers());

  it('keeps input immediate and commits the raw search after 300 ms', () => {
    vi.useFakeTimers();
    const setParam = vi.fn();
    const { result } = renderHook(() => useSuperadminAnalyticsReportsCenterSearchDebounce('', setParam));

    act(() => result.current.setSearch('  inactive tenant  '));
    expect(result.current.searchQuery).toBe('  inactive tenant  ');
    expect(setParam).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(300));
    expect(setParam.mock.calls).toEqual([['search', '  inactive tenant  ']]);
  });

  it('uses the supplied normalized URL value when a committed URL update arrives', () => {
    vi.useFakeTimers();
    const setParam = vi.fn();
    const { result, rerender } = renderHook(
      ({ committed }: { committed: string }) => useSuperadminAnalyticsReportsCenterSearchDebounce(committed, setParam),
      { initialProps: { committed: '' } },
    );

    act(() => result.current.setSearch('  tenant  '));
    rerender({ committed: 'tenant' });
    expect(result.current.searchQuery).toBe('tenant');
  });
});
