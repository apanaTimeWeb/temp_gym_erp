// DATA FLOW: API/server state → ManagerStoreProductsSchema → owning feature UI; UI events/mutations → ManagerStoreProductsSchema → module API → TanStack Query cache/UI.
import { z } from 'zod';

import { STORE_RETURN_STATUS_VALUES } from '@/app/frontend_manager/manager_sales_billing/store_order_management/constants/manager_store_products_shared.constants';

/**
 * @description Validates product and order payloads consumed by the read-only Store Order Management leaf.
 * @dependencies Zod and the leaf-owned return-status contract.
 * @edge-case Rejects fractional/negative currency and quantity values, invalid stock counts, and non-ISO timestamps.
 */
const nonNegativeInteger = z.number().int().nonnegative();
const positiveInteger = z.number().int().positive();
const isoDateTime = z.string().datetime({ offset: true });

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1),
  category: z.string().trim().min(1),
  price: nonNegativeInteger,
  stock: nonNegativeInteger,
  description: z.string().optional(),
  imageUrl: z.string().trim().min(1).optional(),
  isActive: z.boolean(),
  unit: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  costPrice: nonNegativeInteger.optional(),
  reorderThreshold: nonNegativeInteger.optional(),
});

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  qty: positiveInteger,
  name: z.string().trim().min(1),
  price: nonNegativeInteger,
  unit: z.string().optional(),
});

export const orderItemResponseSchema = z.object({
  id: z.string().min(1),
  qty: positiveInteger,
  price: nonNegativeInteger,
  product: z.object({ name: z.string().trim().min(1), unit: z.string().optional() }),
});

export const orderSchema = z.object({
  id: z.string().min(1),
  total: nonNegativeInteger,
  method: z.string().trim().min(1),
  status: z.string().trim().min(1),
  notes: z.string().optional(),
  createdAt: isoDateTime,
  customerId: z.string().optional(),
  gstAmount: nonNegativeInteger.optional(),
  returnStatus: z.enum(STORE_RETURN_STATUS_VALUES),
  items: z.array(orderItemResponseSchema).optional(),
});

export const storeSummarySchema = z.object({
  totalProducts: nonNegativeInteger,
  totalOrders: nonNegativeInteger,
  totalRevenue: nonNegativeInteger,
  lowStockProducts: z.array(productSchema),
});
