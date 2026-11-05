import { MANAGER_STORE_PRODUCTS_API } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/config/manager_sales_billing_store_point_of_sale.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

import { productSchema, orderSchema } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/schemas/manager_sales_billing_store_point_of_sale.schemas';
import type { Product, Order } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/types/manager_sales_billing_store_point_of_sale.types';

/**
 * @description Provides the ManagerStoreProductsApi implementation for the store module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_sales_billing/manager_store_schemas/ManagerStoreProductsSchema; @/app/frontend_manager/manager_sales_billing/manager_store_url_config; @/app/frontend_manager/manager_sales_billing/manager_store_types/ManagerStoreProductsTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerStoreProductsApi = {
  fetchProducts: async (params?: Record<string, string>): Promise<ApiResponse<{ products: Product[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_STORE_PRODUCTS_API.PRODUCTS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ products: z.array(productSchema), total: z.number() }) });
  },

  createOrder: async (body: { items: { productId: string; qty: number; price?: number }[]; method: string; notes?: string; customerName?: string; total?: number; status?: string; }, idempotencyKey: string): Promise<ApiResponse<Order>> => {
    return apiFetch(MANAGER_STORE_PRODUCTS_API.ORDERS_BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: orderSchema });
  }
};
