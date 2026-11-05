// RESPONSIBILITY: Renders the SuperadminDashboardBasic.test UI for the dashboard feature. Business/data orchestration is delegated to module-owned hooks.
import { describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/mocks/fixtures/SuperadminDashboardOverviewMockFixtures';



describe('Superadmin Dashboard fixture behavior', () => {
  it('contains dashboard KPIs, recent onboards, and chart-ready revenue data', () => {
    expect(MOCK_SUPERADMIN_DASHBOARD_DATA.metrics).toMatchObject({ totalGyms: 120, activeGyms: 105, currency: 'INR' });
    expect(MOCK_SUPERADMIN_DASHBOARD_DATA.metrics.recentOnboards).toHaveLength(2);
    expect(MOCK_SUPERADMIN_DASHBOARD_DATA.revenue.length).toBeGreaterThan(1);
    expect(MOCK_SUPERADMIN_DASHBOARD_DATA.growth.length).toBeGreaterThan(1);
  });
});
