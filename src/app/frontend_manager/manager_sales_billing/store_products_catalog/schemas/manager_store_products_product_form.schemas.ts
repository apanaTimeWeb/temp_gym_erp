// DATA FLOW: API/server state → ManagerStoreProductsProductFormSchema → owning feature UI; UI events/mutations → ManagerStoreProductsProductFormSchema → module API → TanStack Query cache/UI.
import { z } from 'zod';

/**
 * @description Provides the ManagerStoreProductsProductFormSchema implementation for the store module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerStoreProductFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().finite().min(0, 'Price must be non-negative').max(Number.MAX_SAFE_INTEGER / 100),
  stock: z.coerce.number().int().finite().min(0, 'Stock must be a non-negative whole number').max(Number.MAX_SAFE_INTEGER),
  description: z.string().optional(),
  unit: z.string().optional(),
});

export type ManagerStoreProductsProductFormInput = z.input<typeof managerStoreProductFormSchema>;
export type ManagerStoreProductsProductFormValues = z.output<typeof managerStoreProductFormSchema>;
