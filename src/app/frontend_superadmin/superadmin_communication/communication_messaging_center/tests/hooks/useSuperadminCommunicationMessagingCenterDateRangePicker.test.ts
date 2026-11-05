import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
const { searchParams } = vi.hoisted(() => ({ searchParams: new URLSearchParams() }));
vi.mock('next/navigation', () => ({ useSearchParams: () => searchParams }));

import { useSuperadminCommunicationMessagingCenterDateRangePicker } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterDateRangePicker';
import { getDateRange } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/utils/SuperadminCommunicationMessagingCenterDateRangeUtils';

describe('useSuperadminCommunicationMessagingCenterDateRangePicker', () => {
  it('applies the initial preset and emits normalized preset and custom date ranges', () => {
    const onRangeChange = vi.fn();
    const { result } = renderHook(() => useSuperadminCommunicationMessagingCenterDateRangePicker(onRangeChange));
    expect(result.current.range).toBe('this_month');
    expect(onRangeChange).toHaveBeenCalledWith(getDateRange('this_month').start, getDateRange('this_month').end);

    act(() => result.current.handleRangeChange('today'));
    expect(onRangeChange).toHaveBeenLastCalledWith(getDateRange('today').start, getDateRange('today').end);
    expect(result.current.range).toBe('today');
    act(() => result.current.handleRangeChange('custom'));
    expect(result.current.range).toBe('custom');
    expect(onRangeChange).toHaveBeenLastCalledWith('', '');

    act(() => result.current.handleCustomStartChange('2026-10-01'));
    act(() => result.current.handleCustomEndChange('2026-10-05'));
    expect(onRangeChange).toHaveBeenLastCalledWith('2026-10-01', '2026-10-05');
  });
});


describe('URL date-range hydration', () => {
  it('resynchronizes custom bounds when URL navigation changes the date range', () => {
    searchParams.delete('startDate'); searchParams.delete('endDate');
    const onRangeChange = vi.fn(); const { result, rerender, unmount } = renderHook(() => useSuperadminCommunicationMessagingCenterDateRangePicker(onRangeChange));
    expect(result.current.range).toBe('this_month');
    searchParams.set('startDate', '2026-10-01'); searchParams.set('endDate', '2026-10-08'); rerender();
    expect(result.current.range).toBe('custom'); expect(result.current.customStart).toBe('2026-10-01'); expect(result.current.customEnd).toBe('2026-10-08');
    expect(onRangeChange).toHaveBeenLastCalledWith('2026-10-01', '2026-10-08');
    searchParams.delete('startDate'); searchParams.delete('endDate'); rerender();
    expect(result.current.range).toBe('this_month'); expect(result.current.customStart).toBe(''); expect(result.current.customEnd).toBe('');
    expect(onRangeChange).toHaveBeenLastCalledWith(getDateRange('this_month').start, getDateRange('this_month').end);
    unmount();
  });
});
