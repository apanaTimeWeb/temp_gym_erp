// DATA FLOW: API/server state → ManagerStoreProductsProductFormTypes → owning feature UI; UI events/mutations → ManagerStoreProductsProductFormTypes → module API → TanStack Query cache/UI.
import type { ManagerStoreProductsProductFormInput, ManagerStoreProductsProductFormValues } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/schemas/manager_store_products_product_form.schemas';

export type ProductFormInput = ManagerStoreProductsProductFormInput;
export type ProductFormValues = ManagerStoreProductsProductFormValues;

/**
 * @description Provides the ManagerStoreProductsProductFormTypes implementation for the store module.
 * @dependencies @/app/frontend_manager/manager_sales_billing/manager_store_schemas/ManagerStoreProductsProductFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
