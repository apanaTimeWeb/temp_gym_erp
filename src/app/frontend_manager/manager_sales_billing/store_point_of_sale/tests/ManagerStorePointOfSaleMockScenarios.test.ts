// RESPONSIBILITY: Guards the required eight-state mock catalog for store_products.
import { describe, expect, it } from 'vitest';
import { MANAGERSTOREPOINTOFSALE_MOCK_SCENARIOS, resolveManagerStorePointOfSaleMockScenario } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/mocks/scenarios/ManagerStorePointOfSaleMockScenarios';

describe('ManagerStoreProducts mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERSTOREPOINTOFSALE_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });

  it('resolves known scenario names and safely defaults unknown names to ACTIVE', () => {
    expect(resolveManagerStorePointOfSaleMockScenario('UNAUTHORIZED')).toEqual(MANAGERSTOREPOINTOFSALE_MOCK_SCENARIOS.UNAUTHORIZED);
    expect(resolveManagerStorePointOfSaleMockScenario('not-a-scenario')).toEqual(MANAGERSTOREPOINTOFSALE_MOCK_SCENARIOS.ACTIVE);
  });
});
