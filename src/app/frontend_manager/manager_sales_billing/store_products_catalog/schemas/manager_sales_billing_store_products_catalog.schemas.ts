// DATA FLOW: API/server state → ManagerStoreProductsSchema → owning feature UI; UI events/mutations → ManagerStoreProductsSchema → module API → TanStack Query cache/UI.
import { z } from 'zod';

import { STORE_RETURN_STATUS_VALUES } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/constants/manager_store_products_shared.constants';

/**
 * @description Provides the ManagerStoreProductsSchema implementation for the store module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  price: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
  unit: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  costPrice: z.number().int().nonnegative().optional(),
  reorderThreshold: z.number().int().nonnegative().optional() });

export const orderItemSchema = z.object({
  productId: z.string(),
  qty: z.number().int().positive(),
  name: z.string(),
  price: z.number().int().nonnegative(),
  unit: z.string().optional() });

export const orderItemResponseSchema = z.object({
  id: z.string(),
  qty: z.number().int().positive(),
  price: z.number().int().nonnegative(),
  product: z.object({
    name: z.string(),
    unit: z.string().optional() }) });

export const orderSchema = z.object({
  id: z.string(),
  total: z.number().int(),
  method: z.string(),
  status: z.string(),
  notes: z.string().optional(),
  createdAt: z.string(),
  customerId: z.string().optional(),
  gstAmount: z.number().int().optional(),
  returnStatus: z.enum(STORE_RETURN_STATUS_VALUES),
  items: z.array(orderItemResponseSchema).optional() });

export const storeSummarySchema = z.object({
  totalProducts: z.number(),
  totalOrders: z.number(),
  totalRevenue: z.number().int(),
  lowStockProducts: z.array(productSchema) });
