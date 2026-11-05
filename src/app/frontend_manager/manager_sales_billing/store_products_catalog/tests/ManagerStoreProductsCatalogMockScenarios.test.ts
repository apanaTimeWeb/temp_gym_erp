// RESPONSIBILITY: Guards the required eight-state mock catalog for store_products.
import { describe, expect, it } from 'vitest';
import { MANAGERSTOREPRODUCTSCATALOG_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/mocks/scenarios/ManagerStoreProductsCatalogMockScenarios';

describe('ManagerStoreProducts mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERSTOREPRODUCTSCATALOG_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
