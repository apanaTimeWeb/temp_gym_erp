import { describe, expect, it } from 'vitest';

import { MANAGER_DASHBOARD_OVERVIEW_ROUTES, MANAGER_DASHBOARD_OVERVIEW_API } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/config/manager_dashboard_overview.url_config';;

describe('manager_dashboard route and API URL contract', () => {
  it('preserves the existing dashboard root compatibility route while final host checks remain pending', () => {
    expect(MANAGER_DASHBOARD_OVERVIEW_ROUTES.PATHS.ROOT_COMPATIBILITY).toBe('/frontend_manager/manager_dashboard');
  });
  it('keeps the existing stats API endpoint unchanged', () => { expect(MANAGER_DASHBOARD_OVERVIEW_API.STATS).toBe('/api/v1/manager/dashboard/stats'); });
});
