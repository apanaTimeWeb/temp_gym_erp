import { describe, expect, it } from 'vitest';
import { managerStoreHandlers, resetManagerStoreProductsCatalogMockState } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/mocks/handlers/ManagerStoreProductsCatalogMockHandlers';

describe('store_products_catalog mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerStoreHandlers)).toBe(true);
    expect(typeof resetManagerStoreProductsCatalogMockState).toBe('function');
  });
});
