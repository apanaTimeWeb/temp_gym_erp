import { MANAGER_STORE_PRODUCTS_API } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/config/manager_sales_billing_store_products_catalog.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

import { productSchema, storeSummarySchema } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/schemas/manager_sales_billing_store_products_catalog.schemas';
import type { Product, StoreSummary } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_sales_billing_store_products_catalog.types';

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

  createProduct: async (body: Partial<Product>, idempotencyKey: string): Promise<ApiResponse<Product>> => {
    return apiFetch(MANAGER_STORE_PRODUCTS_API.PRODUCTS_BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: productSchema });
  },

  updateProduct: async (id: string, body: Partial<Product>, idempotencyKey: string): Promise<ApiResponse<Product>> => {
    return apiFetch(MANAGER_STORE_PRODUCTS_API.PRODUCT_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: productSchema });
  },

  deleteProduct: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(MANAGER_STORE_PRODUCTS_API.PRODUCT_DELETE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) });
  },

  fetchStoreSummary: async (): Promise<ApiResponse<StoreSummary>> => {
    return apiFetch(MANAGER_STORE_PRODUCTS_API.SUMMARY, { dataSchema: storeSummarySchema });
  }
};
