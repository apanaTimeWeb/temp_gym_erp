import { describe, expect, it } from 'vitest';
import { managerStoreHandlers, resetManagerStoreOrderManagementMockState } from '@/app/frontend_manager/manager_sales_billing/store_order_management/mocks/handlers/ManagerStoreOrderManagementMockHandlers';

describe('store_order_management mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerStoreHandlers)).toBe(true);
    expect(typeof resetManagerStoreOrderManagementMockState).toBe('function');
  });
});
