import { renderHook, act } from '@testing-library/react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { expect, vi, beforeEach, describe, it } from 'vitest';

import { SUPERADMIN_DASHBOARD_OVERVIEW_ROUTES } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/config/superadmin_dashboard_overview.url_config';
import { useSuperadminDashboardOverviewDateFilter } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/hooks/useSuperadminDashboardOverviewDateFilter';


// DATA FLOW: API / URL state / module client state → useRouter → superadmin_dashboard view components.


vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({ replace: vi.fn() })),
    usePathname: vi.fn(() => ''),
    useSearchParams: vi.fn(() => ({ get: vi.fn(), set: vi.fn() })),
}));
describe('useSuperadminDashboardOverviewDateFilter', () => {
    const replaceMock = vi.fn();
    beforeEach(() => {
        vi.clearAllMocks();
        (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ replace: replaceMock });
        (usePathname as unknown as ReturnType<typeof vi.fn>).mockReturnValue(SUPERADMIN_DASHBOARD_OVERVIEW_ROUTES.MAIN);
    });
    it('should initialize with this_month by default', () => {
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn().mockReturnValue(null),
            toString: () => '',
        });
        const { result } = renderHook(() => useSuperadminDashboardOverviewDateFilter());
        expect(result.current.value).toBe('this_month');
        expect(result.current.customStart).toBe('');
        expect(result.current.customEnd).toBe('');
    });
    it('should update URL when handling preset change', () => {
        const searchParamsMock = new URLSearchParams('');
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn().mockReturnValue('this_month'),
            toString: () => searchParamsMock.toString(),
        });
        const { result } = renderHook(() => useSuperadminDashboardOverviewDateFilter());
        act(() => {
            result.current.handlePresetChange('last_month');
        });
        expect(replaceMock).toHaveBeenCalled();
        const urlCalled = replaceMock.mock.calls[0][0];
        expect(urlCalled).toContain('range=last_month');
        expect(urlCalled).toContain('startDate=');
        expect(urlCalled).toContain('endDate=');
    });
    it('rejects unknown preset values without changing the URL', () => {
        const searchParamsMock = new URLSearchParams('range=this_month&startDate=2026-10-01&endDate=2026-10-19');
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: (key: string) => searchParamsMock.get(key),
            toString: () => searchParamsMock.toString(),
        });
        const { result } = renderHook(() => useSuperadminDashboardOverviewDateFilter());
        act(() => result.current.handlePresetChange('unknown-range'));
        expect(replaceMock).not.toHaveBeenCalled();
    });
    it('should clear dates when preset is custom and then handleCustomDateChange is called', () => {
        const searchParamsMock = new URLSearchParams('range=custom');
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn((key) => {
                if (key === 'range')
                    return 'custom';
                return null;
            }),
            toString: () => searchParamsMock.toString(),
        });
        const { result } = renderHook(() => useSuperadminDashboardOverviewDateFilter());
        act(() => {
            result.current.handleCustomDateChange('start', '2024-01-01');
        });
        expect(replaceMock).toHaveBeenCalled();
        const urlCalled = replaceMock.mock.calls[0][0];
        expect(urlCalled).toContain('range=custom');
        expect(urlCalled).toContain('startDate=2024-01-01');
    });
});


describe('custom date boundary integrity', () => {
    const replaceMock = vi.fn();
    beforeEach(() => {
        vi.clearAllMocks();
        (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ replace: replaceMock });
        (usePathname as unknown as ReturnType<typeof vi.fn>).mockReturnValue(SUPERADMIN_DASHBOARD_OVERVIEW_ROUTES.MAIN);
    });
    const setup = (query: string) => {
        const params = new URLSearchParams(query);
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ get: (key: string) => params.get(key), toString: () => params.toString() });
        return renderHook(() => useSuperadminDashboardOverviewDateFilter());
    };
    it('preserves a valid preset-to-custom range while editing the end date', () => {
        const { result } = setup('range=this_month&startDate=2026-10-01&endDate=2026-10-17');
        act(() => result.current.handleCustomDateChange('end', '2026-10-20'));
        expect(replaceMock.mock.calls.at(-1)?.[0]).toContain('startDate=2026-10-01');
        expect(replaceMock.mock.calls.at(-1)?.[0]).toContain('endDate=2026-10-20');
    });
    it('clears the end boundary when a new start would invert the range', () => {
        const { result } = setup('range=custom&startDate=2026-10-01&endDate=2026-10-10');
        act(() => result.current.handleCustomDateChange('start', '2026-10-12'));
        const url = replaceMock.mock.calls.at(-1)?.[0] as string;
        expect(url).toContain('startDate=2026-10-12'); expect(url).not.toContain('endDate=');
    });
    it('clears the start boundary when a new end would invert the range', () => {
        const { result } = setup('range=custom&startDate=2026-10-10&endDate=2026-10-20');
        act(() => result.current.handleCustomDateChange('end', '2026-10-05'));
        const url = replaceMock.mock.calls.at(-1)?.[0] as string;
        expect(url).toContain('endDate=2026-10-05'); expect(url).not.toContain('startDate=');
    });
    it('rejects impossible date-only calendar values without changing the URL', () => {
        const { result } = setup('range=custom&startDate=2026-10-01&endDate=2026-10-17');
        replaceMock.mockClear();
        act(() => result.current.handleCustomDateChange('start', '2026-02-31'));
        expect(replaceMock).not.toHaveBeenCalled();
    });
});
