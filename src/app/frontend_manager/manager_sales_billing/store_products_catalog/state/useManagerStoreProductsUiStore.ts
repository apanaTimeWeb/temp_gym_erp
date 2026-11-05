// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from 'zustand';

import type { ManagerToastType } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/ManagerStoreProductsCatalogLocalToastTypes';

import { EMPTY_PRODUCT_FORM } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/constants/manager_store_products_form_defaults.constants';
import type { ProductFormValues } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_store_products_product_form.types';
import type { ManagerStoreProductsReceiptData } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_store_products_thermal_receipt.types';
import type { Product } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_sales_billing_store_products_catalog.types';


interface ManagerStoreProductsUiState {
  toast: { message: string; type: ManagerToastType } | null;
  printData: ManagerStoreProductsReceiptData | null;
  showProductModal: boolean;
  editProductId: string | null;
  editProductData: ProductFormValues | null;
  setToast: (toast: ManagerStoreProductsUiState['toast']) => void;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
  setPrintData: (data: ManagerStoreProductsReceiptData | null) => void;
  setShowProductModal: (show: boolean) => void;
  openAddProduct: () => void;
  openEditProduct: (product: Product) => void;
}

/**
 * @description Coordinates store feature state and its documented UI/API boundary through useManagerStoreProductsUiStore.
 * @dependencies Uses ManagerStoreProductsProductFormTypes, ManagerToastTypes, ManagerStoreProductsThermalReceiptTypes, ManagerStoreProductsTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerStoreProductsUiStore = create<ManagerStoreProductsUiState>((set) => ({
  toast: null,
  printData: null,
  showProductModal: false,
  editProductId: null,
  editProductData: null,
  setToast: (toast) => set({ toast }),
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
  setPrintData: (printData) => set({ printData }),
  setShowProductModal: (showProductModal) => set({ showProductModal }),
  openAddProduct: () => set({ editProductId: null, editProductData: EMPTY_PRODUCT_FORM as ProductFormValues, showProductModal: true }),
  openEditProduct: (product) => set({
    editProductId: product.id,
    editProductData: { name: product.name, category: product.category, price: product.price, stock: product.stock, description: product.description || '', unit: product.unit || '' },
    showProductModal: true }),
}));
