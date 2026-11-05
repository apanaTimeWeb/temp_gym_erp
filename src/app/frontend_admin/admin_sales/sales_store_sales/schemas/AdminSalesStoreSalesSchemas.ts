// RESPONSIBILITY: Runtime schemas for Store Sales order and summary responses only.
import { z } from 'zod';
export const storeProductSchema=z.object({id:z.string(),name:z.string(),category:z.string(),price:z.number().int().nonnegative(),stock:z.number().int().nonnegative(),description:z.string().optional(),imageUrl:z.string().optional(),isActive:z.boolean()});
export const storeOrderItemSchema=z.object({id:z.string(),qty:z.number().int().nonnegative(),price:z.number().int().nonnegative(),product:z.object({name:z.string()})});
export const storeOrderSchema=z.object({id:z.string(),total:z.number().int().nonnegative(),method:z.string(),status:z.string(),branchId:z.string().optional(),notes:z.string().optional(),createdAt:z.string(),items:z.array(storeOrderItemSchema).optional()});
export const storeSummarySchema=z.object({totalProducts:z.number().int().nonnegative(),totalOrders:z.number().int().nonnegative(),totalRevenue:z.number().int().nonnegative(),lowStockProducts:z.array(storeProductSchema)});
export const storeOrdersResponseSchema=z.object({orders:z.array(storeOrderSchema),total:z.number().int().nonnegative()});
export const storeOrdersSummaryResponseSchema=z.object({summary:storeSummarySchema});
