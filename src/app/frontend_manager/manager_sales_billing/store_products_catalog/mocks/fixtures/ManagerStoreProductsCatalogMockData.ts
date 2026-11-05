import { MANAGER_STORE_PRODUCTS_STATUS_VALUES } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/constants/manager_store_products.constants';
import { STORE_RETURN_NONE_STATUS } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/constants/manager_store_products_shared.constants';
import type { Product, Order, StoreSummary } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_sales_billing_store_products_catalog.types';

/**
 * @description Provides the ManagerStoreProductsCatalogMockData implementation for the store module.
 * @dependencies @/app/frontend_manager/manager_store/manager_store_types/ManagerStoreProductsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    name: 'Whey Protein (2kg)',
    category: 'Supplements',
    price: 450000,
    stock: 25,
    description: 'Optimum Nutrition Gold Standard 100% Whey',
    isActive: true,
    unit: 'Tub',
    sku: 'SUP-WHEY-001',
    costPrice: 380000,
    reorderThreshold: 10 },
  {
    id: 'prod2',
    name: 'Gym T-Shirt (L)',
    category: 'Merchandise',
    price: 60000,
    stock: 50,
    description: 'Breathable cotton t-shirt with gym logo',
    isActive: true,
    unit: 'Piece',
    sku: 'MER-TSHIRT-L',
    costPrice: 40000,
    reorderThreshold: 20 },
  {
    id: 'prod3',
    name: 'Pre-Workout Energy',
    category: 'Supplements',
    price: 200000,
    stock: 5,
    description: 'Cellucor C4 Original Pre Workout Powder',
    isActive: true,
    unit: 'Tub',
    sku: 'SUP-PRE-002',
    costPrice: 150000,
    reorderThreshold: 10 },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord1',
    total: 450000,
    method: 'UPI',
    status: MANAGER_STORE_PRODUCTS_STATUS_VALUES.COMPLETED,
    createdAt: '2024-05-01T10:00:00Z',
    returnStatus: STORE_RETURN_NONE_STATUS,
    items: [
      { id: 'item1', qty: 1, price: 450000, product: { name: 'Whey Protein (2kg)' } }
    ]
  },
  {
    id: 'ord2',
    total: 120000,
    method: 'Cash',
    status: MANAGER_STORE_PRODUCTS_STATUS_VALUES.COMPLETED,
    createdAt: '2024-05-10T14:30:00Z',
    returnStatus: STORE_RETURN_NONE_STATUS,
    items: [
      { id: 'item2', qty: 2, price: 60000, product: { name: 'Gym T-Shirt (L)' } }
    ]
  }
];

export const MOCK_STORE_SUMMARY: StoreSummary = {
  totalProducts: 3,
  totalOrders: 15,
  totalRevenue: 2500000,
  lowStockProducts: [MOCK_PRODUCTS[2]!] };
