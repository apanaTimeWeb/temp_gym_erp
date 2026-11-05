// RESPONSIBILITY: Guards the required eight-state mock catalog for reports_overview.
import { describe, expect, it } from 'vitest';
import { MANAGERREPORTSOVERVIEW_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/mocks/scenarios/ManagerReportsOverviewMockScenarios';

describe('ManagerReportsOverview mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERREPORTSOVERVIEW_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
