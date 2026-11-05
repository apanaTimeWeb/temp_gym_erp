import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/hooks/useManagerStoreProductsOrderMutations';

describe('useManagerStoreProductsOrderMutations', () => {
  it('exports the dedicated order mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerStoreProductsOrderMutations).toBe('function');
  });
});
