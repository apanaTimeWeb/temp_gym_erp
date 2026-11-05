// RESPONSIBILITY: Guards the required eight-state mock catalog for dashboard overview.
import { describe, expect, it } from 'vitest';
import { MANAGER_DASHBOARD_OVERVIEW_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/mocks/scenarios/ManagerDashboardOverviewMockScenarios';

describe('ManagerDashboardOverview mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGER_DASHBOARD_OVERVIEW_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
