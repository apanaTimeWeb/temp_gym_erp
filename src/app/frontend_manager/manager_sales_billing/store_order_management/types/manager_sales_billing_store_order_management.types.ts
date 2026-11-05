import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { ManagerStoreProductsViewId } from '@/app/frontend_manager/manager_sales_billing/store_order_management/types/manager_store_products_view.types';

import type { STORE_RETURN_STATUS_VALUES, STORE_SORT_ORDER_VALUES } from '@/app/frontend_manager/manager_sales_billing/store_order_management/constants/manager_store_products_shared.constants';
import type { ProductFormValues } from '@/app/frontend_manager/manager_sales_billing/store_order_management/types/manager_store_products_product_form.types';
import type { ManagerStoreProductsReceiptData } from '@/app/frontend_manager/manager_sales_billing/store_order_management/types/manager_store_products_thermal_receipt.types';
export type ReturnStatus = typeof STORE_RETURN_STATUS_VALUES[number];
export type ManagerStoreProductsSortOrder = typeof STORE_SORT_ORDER_VALUES[number];
export type ManagerStoreProductsProductFieldType = 'text' | 'number' | 'textarea' | 'select' | 'switch' | 'file';

export interface StoreInitialData {
  products: Product[];
  orders: Order[];
  totalOrders: number;
  summary: StoreSummary | null;
}

export interface OrderItem {
  productId: string;
  qty: number;
  name: string;
  price: number;
  unit?: string;
}

export interface ManagerStoreProductsViewModel {
  view: ManagerStoreProductsViewId;
  setTab: (view: ManagerStoreProductsViewId) => void;

  products: Product[];
  orders: Order[];
  totalOrders: number;
  summary: StoreSummary | null;
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  saving: boolean;

  toast: { message: string; type: ManagerToastType } | null;
  printData: ManagerStoreProductsReceiptData | null;

  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  categoryFilter: string;
  setCategoryFilter: (s: string) => void;
  stockFilter: string;
  setStockFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  startDate: string;
  setStartDate: (d: string) => void;
  endDate: string;
  setEndDate: (d: string) => void;
  sortOrder: ManagerStoreProductsSortOrder;
  setSortOrder: (o: ManagerStoreProductsSortOrder) => void;

  showProductModal: boolean;
  setShowProductModal: (show: boolean) => void;
  editProductId: string | null;
  editProductData: ProductFormValues | null;

  showOrderModal: boolean;
  setShowOrderModal: (show: boolean) => void;
  closeOrderModal: () => Promise<void>;
  orderItems: OrderItem[];
  orderMethod: string;
  setOrderMethod: (method: string) => void;
  customerPhone: string;
  setCustomerPhone: (p: string) => void;
  sendViaWhatsapp: boolean;
  setSendViaWhatsapp: (s: boolean) => void;

  hideToast: () => void;
  setPrintData: (data: ManagerStoreProductsReceiptData | null) => void;

  loadAll: () => Promise<void>;
  openAddProduct: () => void;
  openEditProduct: (p: Product) => void;
  saveProduct: (data: ProductFormValues) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  addToOrder: (p: Product) => void;
  removeFromOrder: (productId: string) => void;
  updateOrderQty: (productId: string, qty: number) => void;
  orderTotal: number;
  placeOrder: () => Promise<void>;
}

// ─── Product ──────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  unit?: string;
  // HIGHLY RECOMMENDED — standard inventory fields
  sku?: string;               // Stock Keeping Unit
  barcode?: string;
  costPrice?: number;         // purchase price for margin calculations
  reorderThreshold?: number;  // alert when stock falls below this
}

// ─── Order ────────────────────────────────────────────────────────────────────
export interface Order {
  id: string;
  total: number;
  method: string;
  status: string;
  notes?: string;
  createdAt: string;
  // HIGHLY RECOMMENDED
  customerId?: string;          // link to member if purchase is by a member
  gstAmount?: number;           // GST applied on this order
  returnStatus: ReturnStatus;   // return/refund tracking
  items?: { id: string; qty: number; price: number; product: { name: string; unit?: string } }[];
}

// ─── Store Summary ────────────────────────────────────────────────────────────
export interface StoreSummary {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: Product[];
}
