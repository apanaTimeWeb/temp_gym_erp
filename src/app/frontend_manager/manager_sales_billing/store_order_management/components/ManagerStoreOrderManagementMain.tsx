// RESPONSIBILITY: Provides the store-order-management page shell and delegates order-list presentation to its feature view; it does not fetch orders, mutate order records, or define receipt business rules.
"use client";
import { useTranslations } from 'next-intl';
import ManagerStoreProductsOrdersView from '@/app/frontend_manager/manager_sales_billing/store_order_management/components/ManagerStoreProductsOrdersView';
export default function StoreOrderManagementMain() { const t=useTranslations('MANAGER_STORE_PRODUCTS'); return <section className="min-h-full p-6 space-y-5"><h1 className="text-2xl font-bold text-text-primary">Store Order Management</h1><ManagerStoreProductsOrdersView /></section>; }
