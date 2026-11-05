import { describe, expect, it } from 'vitest';

import { productSchema, orderSchema } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/schemas/manager_sales_billing_store_products_catalog.schemas';

describe('Store API money schemas', () => { it('rejects fractional minor-unit product prices and order totals', () => { const product = { id: 'p1', name: 'Bottle', category: 'Accessories', price: 99900, stock: 3, isActive: true }; expect(productSchema.safeParse(product).success).toBe(true); expect(productSchema.safeParse({ ...product, price: 99900.5 }).success).toBe(false); const order = { id: 'o1', total: 99900, method: 'UPI', status: 'PAID', createdAt: '2026-10-01T10:00:00Z', returnStatus: 'NONE' }; expect(orderSchema.safeParse({ ...order, total: 99900.5 }).success).toBe(false); }); });
