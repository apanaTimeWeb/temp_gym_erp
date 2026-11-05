import { describe, expect, it } from 'vitest';
import { managerStoreHandlers, resetManagerStorePointOfSaleMockState } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/mocks/handlers/ManagerStorePointOfSaleMockHandlers';

describe('store_point_of_sale mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerStoreHandlers)).toBe(true);
    expect(typeof resetManagerStorePointOfSaleMockState).toBe('function');
  });
});
