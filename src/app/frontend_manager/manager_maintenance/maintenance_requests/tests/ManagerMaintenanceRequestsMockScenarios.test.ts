// RESPONSIBILITY: Guards the required eight-state mock catalog for maintenance_requests.
import { describe, expect, it } from 'vitest';
import { MANAGERMAINTENANCEMANAGEMENT_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/mocks/scenarios/ManagerMaintenanceRequestsMockScenarios';

describe('ManagerMaintenanceRequests mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERMAINTENANCEMANAGEMENT_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
