// RESPONSIBILITY: Filters store-order rows owned by the Sales Store Sales workflow.
import type { StoreOrder } from '@/app/frontend_admin/admin_sales/sales_store_sales/types/AdminSalesStoreSalesTypes';

export function filterAdminSalesStoreSalesOrders(rows: StoreOrder[], search: string): StoreOrder[] {
  const query = search.trim().toLowerCase();
  if (!query) return rows;
  return rows.filter((order) => [order.id, order.status, order.method, order.notes, ...(order.items ?? []).map((item) => item.product.name)]
    .some((value) => String(value ?? '').toLowerCase().includes(query)));
}
