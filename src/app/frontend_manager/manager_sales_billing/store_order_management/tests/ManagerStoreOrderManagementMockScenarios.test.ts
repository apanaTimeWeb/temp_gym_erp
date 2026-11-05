// Guards the route-local mock scenario catalog and its required transport/UI states.
import { describe, expect, it } from 'vitest';
import { MANAGERSTOREORDERMANAGEMENT_MOCK_SCENARIOS, resolveManagerStoreOrderManagementMockScenario } from '@/app/frontend_manager/manager_sales_billing/store_order_management/mocks/scenarios/ManagerStoreOrderManagementMockScenarios';

describe('store_order_management mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERSTOREORDERMANAGEMENT_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});

describe('ManagerStoreOrderManagement scenario resolution', () => {
  it('returns known scenarios and defaults unknown values to ACTIVE', () => {
    expect(resolveManagerStoreOrderManagementMockScenario('EMPTY')).toEqual(MANAGERSTOREORDERMANAGEMENT_MOCK_SCENARIOS.EMPTY);
    expect(resolveManagerStoreOrderManagementMockScenario('invalid')).toEqual(MANAGERSTOREORDERMANAGEMENT_MOCK_SCENARIOS.ACTIVE);
  });
});
