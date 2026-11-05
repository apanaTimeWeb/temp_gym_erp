// RESPONSIBILITY: Verifies the alert-monitoring debounce delays values and cancels stale timers.
// DATA FLOW: successive filter values → debounce hook and timer cleanup → stable delayed value.

import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useAdminGymHealthAlertsDebounce } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringDebounce';

describe('useAdminGymHealthAlertsDebounce', () => {
  afterEach(() => { vi.useRealTimers(); });

  it('emits the latest value only after the requested delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useAdminGymHealthAlertsDebounce(value, 300), { initialProps: { value: 'first' } });
    rerender({ value: 'second' });
    act(() => { vi.advanceTimersByTime(299); });
    expect(result.current).toBe('first');
    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current).toBe('second');
  });

  it('cancels earlier values when input changes repeatedly', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useAdminGymHealthAlertsDebounce(value, 200), { initialProps: { value: 'initial' } });
    rerender({ value: 'stale' });
    act(() => { vi.advanceTimersByTime(100); });
    rerender({ value: 'current' });
    act(() => { vi.advanceTimersByTime(199); });
    expect(result.current).toBe('initial');
    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current).toBe('current');
  });
});
