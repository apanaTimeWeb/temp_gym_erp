import { MANAGER_STORE_PRODUCTS_API } from '@/app/frontend_manager/manager_sales_billing/store_order_management/config/manager_sales_billing_store_order_management.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

import { orderSchema } from '@/app/frontend_manager/manager_sales_billing/store_order_management/schemas/manager_sales_billing_store_order_management.schemas';
import type { Order } from '@/app/frontend_manager/manager_sales_billing/store_order_management/types/manager_sales_billing_store_order_management.types';

/**
 * @description Provides the ManagerStoreProductsApi implementation for the store module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_sales_billing/manager_store_schemas/ManagerStoreProductsSchema; @/app/frontend_manager/manager_sales_billing/manager_store_url_config; @/app/frontend_manager/manager_sales_billing/manager_store_types/ManagerStoreProductsTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerStoreProductsApi = {
  fetchOrders: async (params?: Record<string, string>): Promise<ApiResponse<{ orders: Order[], total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_STORE_PRODUCTS_API.ORDERS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ orders: z.array(orderSchema), total: z.number() }) });
  }
};
