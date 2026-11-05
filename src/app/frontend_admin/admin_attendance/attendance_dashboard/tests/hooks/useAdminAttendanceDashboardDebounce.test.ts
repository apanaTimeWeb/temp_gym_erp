// RESPONSIBILITY: Defines regression tests for useAdminAttendanceDashboardDebounce.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_attendance/attendance_dashboard/tests/hooks/useAdminAttendanceDashboardDebounce.test.ts)

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminAttendanceDebounce } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardDebounce';

describe('useAdminAttendanceDebounce', () => {
  it('returns the latest value only after the debounce delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value, delay }) => useAdminAttendanceDebounce(value, delay), { initialProps: { value: 'first', delay: 300 } });
    expect(result.current).toBe('first');
    rerender({ value: 'second', delay: 300 });
    expect(result.current).toBe('first');
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe('first');
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('second');
    vi.useRealTimers();
  });
});
