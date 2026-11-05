// RESPONSIBILITY: Composes the point-of-sale screen, opens the order modal through its feature UI store, and presents the current thermal receipt; it does not own product transport or order mutation logic.
"use client";
import { useTranslations } from 'next-intl';
import { useManagerStoreProductsLogic } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/hooks/useManagerStoreProductsLogic';
import ManagerStoreProductsPosModal from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/components/ManagerStoreProductsPosModal';
import ManagerStoreProductsThermalReceipt from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/components/ManagerStoreProductsThermalReceipt';
import { useManagerStoreProductsUiStore } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/state/useManagerStoreProductsUiStore';

export default function StorePointOfSaleMain() {
  const t = useTranslations('MANAGER_STORE_PRODUCTS');
  const { isPending, isError, errorMessage, loadAll } = useManagerStoreProductsLogic();
  const open = useManagerStoreProductsUiStore((s) => s.setShowOrderModal);
  const printData = useManagerStoreProductsUiStore((s) => s.printData);
  const toast = useManagerStoreProductsUiStore((s) => s.toast);
  const hideToast = useManagerStoreProductsUiStore((s) => s.hideToast);
  return <section className="p-6 space-y-4" aria-busy={isPending}><h1 className="text-2xl font-bold text-text-primary">{t('COPY_NEW_SALE_POS')}</h1><p className="text-sm text-text-secondary">{t('COPY_POINT_OF_SALE_DESCRIPTION')}</p>{isPending && <div role="status" aria-live="polite" aria-busy="true" aria-label={t('COPY_SELECT_PRODUCTS_ADD')} className="rounded-lg border border-border bg-card p-4"><div className="h-4 w-2/3 rounded bg-skeleton-base motion-safe:animate-pulse" aria-hidden="true" /><div className="mt-3 h-10 rounded bg-skeleton-base motion-safe:animate-pulse" aria-hidden="true" /></div>}{isError && <div role="alert" aria-live="assertive" className="rounded-lg border border-danger bg-card p-4"><p className="font-semibold text-danger-text">{t('COPY_STORE_UNAVAILABLE')}</p><p className="mt-1 text-sm text-text-secondary">{errorMessage || t('COPY_WE_COULDN_T_LOAD_STORE_MODULE_TRY_AGAIN')}</p><button type="button" onClick={() => { void loadAll(); }} className="mt-3 min-h-11 rounded-lg bg-primary px-4 py-2 text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('COPY_TRY_AGAIN')}</button></div>}<button type="button" onClick={() => open(true)} className="min-h-11 px-4 py-2 rounded-lg bg-primary text-on-primary" data-testid="manager_sales_billing-store-point-of-sale-main-button-open-order-modal">{t('COPY_NEW_SALE_POS')}</button><ManagerStoreProductsPosModal />{toast && <div role={toast.type === 'error' ? 'alert' : 'status'} aria-live={toast.type === 'error' ? 'assertive' : 'polite'} className="rounded-lg border border-border bg-card p-3 text-sm text-text-primary" data-testid="manager-store-pos-toast"><span>{toast.message}</span><button type="button" className="ml-3 min-h-11 px-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" aria-label={t('COPY_CLOSE_POINT_SALE')} onClick={hideToast}>×</button></div>}{printData && <ManagerStoreProductsThermalReceipt data={printData} />}</section>;
}
