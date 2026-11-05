// DATA FLOW: Feature UI → module-owned product mutation hook/query state → authoritative Store API response → observable UI reconciliation.
'use client';
import type { ManagerToastType } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/ManagerStoreProductsCatalogLocalToastTypes';

import { useManagerStoreProductsProductMutations } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/hooks/useManagerStoreProductsProductMutations';
import { useManagerStoreProductsUiStore } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/state/useManagerStoreProductsUiStore';
import type { ProductFormValues } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_store_products_product_form.types';
import type { Product, StoreSummary } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_sales_billing_store_products_catalog.types';

/**
 * @description Exposes product modal state and delegates all product server mutations to the dedicated mutation hook.
 * @dependencies Uses useManagerStoreProductsProductMutations and module-scoped Store UI state.
 * @edge-case Keeps server loading state in TanStack Query mutation state rather than Zustand.
 */
export function useManagerStoreProducts(
  setProducts: (updater: Product[] | ((previous: Product[]) => Product[])) => void,
  setSummary: (updater: StoreSummary | null | ((previous: StoreSummary | null) => StoreSummary | null)) => void,
  showToast: (message: string, type: ManagerToastType) => void,
) {
  const ui = useManagerStoreProductsUiStore();
  const mutations = useManagerStoreProductsProductMutations(setProducts, setSummary, showToast, ui.editProductId);
  return {
    showProductModal: ui.showProductModal,
    setShowProductModal: ui.setShowProductModal,
    editProductId: ui.editProductId,
    editProductData: ui.editProductData,
    openAddProduct: ui.openAddProduct,
    openEditProduct: ui.openEditProduct,
    saveProduct: async (data: Partial<ProductFormValues>) => { await mutations.saveProduct(data); },
    deleteProduct: async (id: string) => { await mutations.deleteProduct(id); },
    isSaving: mutations.isSaving,
  };
}
