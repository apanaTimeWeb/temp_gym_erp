import { describe, expect, it } from 'vitest';
import { MANAGER_DASHBOARD_OVERVIEW_ROUTES, MANAGER_DASHBOARD_OVERVIEW_API } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/config/manager_dashboard_overview.url_config';;
import { buildManagerDashboardOverviewHref } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/utils/manager_dashboard_overview_route_compat';

describe('dashboard_overview route compatibility contract', () => {
  it('keeps the live root compatibility route distinct from the active leaf route', () => {
    expect(MANAGER_DASHBOARD_OVERVIEW_ROUTES.PATHS.ROOT_COMPATIBILITY).toBe('/frontend_manager/manager_dashboard');
    expect(MANAGER_DASHBOARD_OVERVIEW_ROUTES.PATHS.OVERVIEW).toBe('/frontend_manager/manager_dashboard/dashboard_overview');
  });

  it('preserves existing query values, repeated keys and unrelated parameters', () => {
    const href = buildManagerDashboardOverviewHref('?range=custom&startDate=2026-09-01&endDate=2026-09-19&tag=a&tag=b&campaign=autumn');
    const parsed = new URL(href, 'https://manager.example.test');

    expect(parsed.pathname).toBe(MANAGER_DASHBOARD_OVERVIEW_ROUTES.PATHS.OVERVIEW);
    expect(parsed.searchParams.get('range')).toBe('custom');
    expect(parsed.searchParams.get('startDate')).toBe('2026-09-01');
    expect(parsed.searchParams.get('endDate')).toBe('2026-09-19');
    expect(parsed.searchParams.getAll('tag')).toEqual(['a', 'b']);
    expect(parsed.searchParams.get('campaign')).toBe('autumn');
  });

  it('does not change the existing dashboard stats endpoint', () => {
    expect(MANAGER_DASHBOARD_OVERVIEW_API.STATS).toBe('/api/v1/manager/dashboard/stats');
  });
});
