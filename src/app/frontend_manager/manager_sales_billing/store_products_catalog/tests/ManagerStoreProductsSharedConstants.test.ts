import { describe, expect, it } from 'vitest';

import { CATEGORIES, ERR_EMPTY_ORDER, PAYMENT_METHODS } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/constants/manager_store_products_shared.constants';


describe('ManagerStoreProductsSharedConstants', () => {
  it('keeps store filters and payment modes stable', () => {
    expect(CATEGORIES).toContain('Merchandise');
    expect(PAYMENT_METHODS).toEqual(['UPI', 'Cash']);
    expect(ERR_EMPTY_ORDER).toContain('Add items');
  });
});
