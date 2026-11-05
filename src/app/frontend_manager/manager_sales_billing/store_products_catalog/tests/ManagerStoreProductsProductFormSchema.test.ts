import { describe, expect, it } from 'vitest';
import { managerStoreProductFormSchema } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/schemas/manager_store_products_product_form.schemas';

describe('Manager Store product form schema input/output parity', () => {
  it('rejects fractional or non-finite stock values', () => {
    expect(managerStoreProductFormSchema.safeParse({ name: 'Protein Powder', category: 'Supplements', price: '12.5', stock: '1.5' }).success).toBe(false);
    expect(managerStoreProductFormSchema.safeParse({ name: 'Protein Powder', category: 'Supplements', price: '12.5', stock: 'Infinity' }).success).toBe(false);
  });

  it('coerces numeric text input to numeric output', () => {
    const result = managerStoreProductFormSchema.safeParse({ name: 'Protein Powder', category: 'Supplements', price: '12.5', stock: '10', description: '', unit: 'tub' });
    expect(result.success).toBe(true);
    if (result.success) { expect(result.data.price).toBe(12.5); expect(result.data.stock).toBe(10); }
  });
});
