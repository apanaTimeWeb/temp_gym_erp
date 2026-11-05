// RESPONSIBILITY: Mock records for Store Sales orders and summary only.
import { ADMIN_SALES_ORDER_STATUS } from '@/app/frontend_admin/admin_sales/sales_store_sales/constants/AdminSalesStoreSalesConstants';
import type { StoreProduct, StoreOrder } from '@/app/frontend_admin/admin_sales/sales_store_sales/types/AdminSalesStoreSalesTypes';
export const MOCK_ADMIN_STORE_PRODUCTS: StoreProduct[] = [
  { id: 'sp-1', name: 'Protein Shaker', category: 'Accessories', price: 499, stock: 22, isActive: true },
  { id: 'sp-2', name: 'Gym Towel', category: 'Accessories', price: 299, stock: 45, isActive: true },
  { id: 'sp-3', name: 'Whey Protein 1kg', category: 'Supplements', price: 2499, stock: 8, isActive: true },
  { id: 'sp-4', name: 'Resistance Band', category: 'Equipment', price: 799, stock: 16, isActive: true },
];

export const MOCK_ADMIN_STORE_ORDERS: StoreOrder[] = [
  { id: 'ord-1001', branchId: 'b1', total: 2798, method: 'UPI', status: ADMIN_SALES_ORDER_STATUS.PAID, createdAt: '2026-09-18T10:30:00Z', items: [
    { id: 'ord-1001-1', qty: 1, price: 2499, product: { name: 'Whey Protein 1kg' } },
    { id: 'ord-1001-2', qty: 1, price: 299, product: { name: 'Gym Towel' } },
  ] },
  { id: 'ord-1002', branchId: 'b2', total: 1298, method: 'Card', status: ADMIN_SALES_ORDER_STATUS.PAID, createdAt: '2026-09-17T14:15:00Z', items: [
    { id: 'ord-1002-1', qty: 1, price: 499, product: { name: 'Protein Shaker' } },
    { id: 'ord-1002-2', qty: 1, price: 799, product: { name: 'Resistance Band' } },
  ] },
  { id: 'ord-1003', branchId: 'b3', total: 998, method: 'Cash', status: ADMIN_SALES_ORDER_STATUS.PAID, createdAt: '2026-09-16T18:00:00Z', items: [
    { id: 'ord-1003-1', qty: 2, price: 499, product: { name: 'Protein Shaker' } },
  ] },
  { id: 'ord-1004', branchId: 'b1', total: 299, method: 'UPI', status: ADMIN_SALES_ORDER_STATUS.PAID, createdAt: '2026-09-15T08:40:00Z', items: [
    { id: 'ord-1004-1', qty: 1, price: 299, product: { name: 'Gym Towel' } },
  ] },
  { id: 'ord-1005', branchId: 'b2', total: 1598, method: 'Card', status: ADMIN_SALES_ORDER_STATUS.PAID, createdAt: '2026-09-13T12:20:00Z', items: [
    { id: 'ord-1005-1', qty: 2, price: 799, product: { name: 'Resistance Band' } },
  ] },
  { id: 'ord-1006', branchId: 'b4', total: 4998, method: 'UPI', status: ADMIN_SALES_ORDER_STATUS.PAID, createdAt: '2026-09-10T16:45:00Z', items: [
    { id: 'ord-1006-1', qty: 2, price: 2499, product: { name: 'Whey Protein 1kg' } },
  ] },
];
