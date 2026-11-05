import { describe, expect, it } from 'vitest';
import { ManagerStoreProductsBuildViewSearchParams } from '@/app/frontend_manager/manager_sales_billing/store_order_management/utils/ManagerStoreProductsBuildViewSearchParams';

describe('Manager Store view URL updates', () => {
  it('preserves search/filter state and canonicalizes the legacy tab key', () => {
    const params = new URLSearchParams(ManagerStoreProductsBuildViewSearchParams('tab=Orders&search=protein&category=supplements&page=2&sortBy=name', 'orders'));
    expect(params.get('view')).toBe('orders');
    expect(params.get('tab')).toBeNull();
    expect(params.get('search')).toBe('protein');
    expect(params.get('category')).toBe('supplements');
    expect(params.get('page')).toBe('2');
    expect(params.get('sortBy')).toBe('name');
  });
});
