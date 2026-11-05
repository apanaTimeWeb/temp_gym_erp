// RESPONSIBILITY: Renders the Orders screen body for Manager Store.
'use client';
import ManagerStoreProductsFilters from '@/app/frontend_manager/manager_sales_billing/store_order_management/components/ManagerStoreProductsFilters';
import ManagerStoreProductsOrderTable from '@/app/frontend_manager/manager_sales_billing/store_order_management/components/ManagerStoreProductsOrderTable';

export default function ManagerStoreProductsOrdersView() {
  return <div className="space-y-4"><ManagerStoreProductsFilters /><ManagerStoreProductsOrderTable /></div>;
}
