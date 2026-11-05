// RESPONSIBILITY: Guards the required eight-state mock catalog for sales_overview.
import { describe, expect, it } from 'vitest';
import { MANAGERSALESOVERVIEW_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_sales_billing/sales_overview/mocks/scenarios/ManagerSalesOverviewMockScenarios';

describe('ManagerSalesOverview mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERSALESOVERVIEW_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
