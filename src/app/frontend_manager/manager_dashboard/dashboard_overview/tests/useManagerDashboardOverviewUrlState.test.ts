import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useManagerDashboardOverviewUrlState } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewUrlState';


const replace = vi.fn();
let currentParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ replace })),
  usePathname: vi.fn(() => '/frontend_manager/manager_dashboard'),
  useSearchParams: vi.fn(() => currentParams),
}));

describe('useManagerDashboardOverviewUrlState', () => {
  beforeEach(() => {
    replace.mockClear();
    currentParams = new URLSearchParams();
  });
  it('reads canonical range/date state from the URL', () => {
    currentParams = new URLSearchParams('range=custom&startDate=2026-09-01&endDate=2026-09-19');
    const { result } = renderHook(() => useManagerDashboardOverviewUrlState());

    expect(result.current.range).toBe('custom');
    expect(result.current.startDate).toBe('2026-09-01');
    expect(result.current.endDate).toBe('2026-09-19');
  });

  it('writes preset range and clears custom dates when leaving custom mode', () => {
    currentParams = new URLSearchParams('range=custom&startDate=2026-09-01&endDate=2026-09-19');
    const { result } = renderHook(() => useManagerDashboardOverviewUrlState());

    act(() => result.current.setRange('monthly'));

    expect(replace).toHaveBeenCalledWith('/frontend_manager/manager_dashboard?range=monthly', { scroll: false });
  });

  it('falls back to the monthly preset for an unsupported URL range', () => {
    currentParams = new URLSearchParams('range=unexpected&campaign=autumn');
    const { result } = renderHook(() => useManagerDashboardOverviewUrlState());

    expect(result.current.range).toBe('this_month');
    expect(result.current.startDate).toBe('');
    expect(result.current.endDate).toBe('');
  });

  it('writes custom range with both URL date boundaries', () => {
    currentParams = new URLSearchParams();
    const { result } = renderHook(() => useManagerDashboardOverviewUrlState());

    act(() => result.current.setCustomDateRange('2026-09-01', '2026-09-19'));

    expect(replace).toHaveBeenCalledWith('/frontend_manager/manager_dashboard?range=custom&startDate=2026-09-01&endDate=2026-09-19', { scroll: false });
  });
  it('preserves unrelated and repeated query parameters when changing dashboard date range', () => {
    currentParams = new URLSearchParams('range=custom&startDate=2026-09-01&endDate=2026-09-19&campaign=autumn&tag=a&tag=b&ref=manager-home');
    const { result } = renderHook(() => useManagerDashboardOverviewUrlState());

    act(() => result.current.setRange('monthly'));

    expect(replace).toHaveBeenCalledWith(
      '/frontend_manager/manager_dashboard?range=monthly&campaign=autumn&tag=a&tag=b&ref=manager-home',
      { scroll: false },
    );
  });

});
