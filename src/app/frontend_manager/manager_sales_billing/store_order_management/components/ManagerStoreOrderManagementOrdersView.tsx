// RESPONSIBILITY: Renders the Orders screen body for Manager Store Order Management.
'use client';
import ManagerStoreOrderManagementFilters from '@/app/frontend_manager/manager_sales_billing/store_order_management/components/ManagerStoreOrderManagementFilters';
import ManagerStoreOrderManagementOrderTable from '@/app/frontend_manager/manager_sales_billing/store_order_management/components/ManagerStoreOrderManagementOrderTable';

export default function ManagerStoreOrderManagementOrdersView() {
  return <div className="space-y-4"><ManagerStoreOrderManagementFilters /><ManagerStoreOrderManagementOrderTable /></div>;
}

export const ManagerStoreProductsOrdersView = ManagerStoreOrderManagementOrdersView;
