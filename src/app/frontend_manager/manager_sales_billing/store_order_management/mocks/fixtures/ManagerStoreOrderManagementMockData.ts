import { MANAGER_STORE_PRODUCTS_STATUS_VALUES } from '@/app/frontend_manager/manager_sales_billing/store_order_management/constants/manager_store_products.constants';
import { STORE_RETURN_NONE_STATUS } from '@/app/frontend_manager/manager_sales_billing/store_order_management/constants/manager_store_products_shared.constants';
import type { Order } from '@/app/frontend_manager/manager_sales_billing/store_order_management/types/manager_sales_billing_store_order_management.types';

/** Read-only order-history examples retained from the supplied module source. */
export const MOCK_ORDERS: Order[] = [
  { id: 'ord1', total: 450000, method: 'UPI', status: MANAGER_STORE_PRODUCTS_STATUS_VALUES.COMPLETED, createdAt: '2024-05-01T10:00:00Z', returnStatus: STORE_RETURN_NONE_STATUS, items: [{ id: 'item1', qty: 1, price: 450000, product: { name: 'Whey Protein (2kg)' } }] },
  { id: 'ord2', total: 120000, method: 'Cash', status: MANAGER_STORE_PRODUCTS_STATUS_VALUES.COMPLETED, createdAt: '2024-05-10T14:30:00Z', returnStatus: STORE_RETURN_NONE_STATUS, items: [{ id: 'item2', qty: 2, price: 60000, product: { name: 'Gym T-Shirt (L)' } }] },
  { id: 'ord3', total: 200000, method: 'Card', status: MANAGER_STORE_PRODUCTS_STATUS_VALUES.COMPLETED, createdAt: '2025-01-18T09:15:00Z', returnStatus: STORE_RETURN_NONE_STATUS, items: [{ id: 'item3', qty: 1, price: 200000, product: { name: 'Pre-Workout Energy' } }] },
  { id: 'ord4', total: 90000, method: 'UPI', status: MANAGER_STORE_PRODUCTS_STATUS_VALUES.COMPLETED, createdAt: '2025-02-03T17:45:00Z', returnStatus: STORE_RETURN_NONE_STATUS, items: [{ id: 'item4', qty: 1, price: 90000, product: { name: 'Gym T-Shirt (M)' } }] },
];
