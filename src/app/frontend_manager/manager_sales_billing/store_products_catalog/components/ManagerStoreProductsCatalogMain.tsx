// RESPONSIBILITY: Composes the store-products catalog page, its KPI/grid/modal surfaces, and the add-product entry action; it does not own catalog API transport, query caching, or product validation.
"use client";
import { useTranslations } from 'next-intl';
import { useManagerStoreProductsUiStore } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/state/useManagerStoreProductsUiStore';
import ManagerStoreProductsKPIs from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/components/ManagerStoreProductsKPIs';
import ManagerStoreProductsProductGrid from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/components/ManagerStoreProductsProductGrid';
import ManagerStoreProductsProductModal from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/components/ManagerStoreProductsProductModal';
export default function StoreProductsCatalogMain() { const t=useTranslations('MANAGER_STORE_PRODUCTS'); const openAdd=useManagerStoreProductsUiStore((s)=>s.openAddProduct); return <section className="min-h-full p-6 space-y-5"><div className="flex flex-wrap justify-between gap-3"><h1 className="text-2xl font-bold text-text-primary">Store Product Catalogue</h1><button type="button" onClick={openAdd} className="min-h-11 px-4 py-2 rounded-lg bg-primary text-on-primary" data-testid="manager_sales_billing-store-products-catalog-main-button-add-product">{t('COPY_ADD_PRODUCT')}</button></div><ManagerStoreProductsKPIs /><ManagerStoreProductsProductGrid /><ManagerStoreProductsProductModal /></section>; }
