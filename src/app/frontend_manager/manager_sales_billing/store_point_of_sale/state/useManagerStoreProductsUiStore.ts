// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from 'zustand';

import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';

import type { ManagerStoreProductsReceiptData } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/types/manager_store_products_thermal_receipt.types';
import type { OrderItem } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/types/manager_sales_billing_store_point_of_sale.types';


interface ManagerStoreProductsUiState {
  toast: { message: string; type: ManagerToastType } | null;
  printData: ManagerStoreProductsReceiptData | null;
  showOrderModal: boolean;
  orderItems: OrderItem[];
  orderMethod: string;
  customerPhone: string;
  sendViaWhatsapp: boolean;
  setToast: (toast: ManagerStoreProductsUiState['toast']) => void;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
  setPrintData: (data: ManagerStoreProductsReceiptData | null) => void;
  setShowOrderModal: (show: boolean) => void;
  setOrderItems: (items: OrderItem[] | ((previous: OrderItem[]) => OrderItem[])) => void;
  setOrderMethod: (method: string) => void;
  setCustomerPhone: (phone: string) => void;
  setSendViaWhatsapp: (value: boolean) => void;
  resetOrder: () => void;
}

/**
 * @description Coordinates store feature state and its documented UI/API boundary through useManagerStoreProductsUiStore.
 * @dependencies Uses ManagerStoreProductsProductFormTypes, ManagerToastTypes, ManagerStoreProductsThermalReceiptTypes, ManagerStoreProductsTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerStoreProductsUiStore = create<ManagerStoreProductsUiState>((set) => ({
  toast: null,
  printData: null,
  showOrderModal: false,
  orderItems: [],
  orderMethod: 'Cash',
  customerPhone: '',
  sendViaWhatsapp: false,
  setToast: (toast) => set({ toast }),
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
  setPrintData: (printData) => set({ printData }),
  setShowOrderModal: (showOrderModal) => set({ showOrderModal }),
  setOrderItems: (orderItems) => set((state) => ({ orderItems: typeof orderItems === 'function' ? orderItems(state.orderItems) : orderItems })),
  setOrderMethod: (orderMethod) => set({ orderMethod }),
  setCustomerPhone: (customerPhone) => set({ customerPhone }),
  setSendViaWhatsapp: (sendViaWhatsapp) => set({ sendViaWhatsapp }),
  resetOrder: () => set({ orderItems: [], customerPhone: '', sendViaWhatsapp: false, showOrderModal: false }) }));
