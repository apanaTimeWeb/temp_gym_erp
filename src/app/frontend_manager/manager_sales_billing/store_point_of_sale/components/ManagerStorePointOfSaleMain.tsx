// RESPONSIBILITY: Composes the point-of-sale screen, opens the order modal through its feature UI store, and presents the current thermal receipt; it does not own product transport or order mutation logic.
"use client";
import { useTranslations } from 'next-intl';
import { useManagerStoreProductsLogic } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/hooks/useManagerStoreProductsLogic';
import ManagerStorePointOfSalePosModal from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/components/ManagerStorePointOfSalePosModal';
import ManagerStorePointOfSaleThermalReceipt from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/components/ManagerStorePointOfSaleThermalReceipt';
import { useManagerStoreProductsUiStore } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/state/useManagerStoreProductsUiStore';

export default function StorePointOfSaleMain() {
  const t = useTranslations('MANAGER_STORE_PRODUCTS');
  const { isPending, isError, errorMessage, loadAll } = useManagerStoreProductsLogic();
  const open = useManagerStoreProductsUiStore((s) => s.setShowOrderModal);
  const printData = useManagerStoreProductsUiStore((s) => s.printData);
  const toast = useManagerStoreProductsUiStore((s) => s.toast);
  const hideToast = useManagerStoreProductsUiStore((s) => s.hideToast);
  return (
    <section className="p-4 sm:p-6 space-y-5" aria-busy={isPending}>
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/35 bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#141B2D] dark:to-[#0C1220] p-5 sm:p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#F59E0B] to-[#10B981]" />
        <div className="space-y-1">
          <h1 className="text-page-title font-extrabold text-text-primary">{t('COPY_NEW_SALE_POS')}</h1>
          <p className="text-sm text-text-secondary">{t('COPY_POINT_OF_SALE_DESCRIPTION')}</p>
        </div>
        <button type="button" onClick={() => open(true)} className="min-h-11 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#F97316] text-white text-sm font-semibold hover:brightness-110 shadow-[0_4px_14px_rgba(255,90,31,0.3)] shrink-0 cursor-pointer" data-testid="manager_sales_billing-store-point-of-sale-main-button-open-order-modal">{t('COPY_NEW_SALE_POS')}</button>
      </div>
      {isPending && <div role="status" aria-live="polite" aria-busy="true" aria-label={t('COPY_SELECT_PRODUCTS_ADD')} className="rounded-2xl border border-border bg-card p-5"><div className="h-4 w-2/3 rounded bg-skeleton-base motion-safe:animate-pulse" aria-hidden="true" /><div className="mt-3 h-10 rounded bg-skeleton-base motion-safe:animate-pulse" aria-hidden="true" /></div>}
      {isError && <div role="alert" aria-live="assertive" className="rounded-2xl border border-danger bg-card p-5"><p className="font-semibold text-danger-text">{t('COPY_STORE_UNAVAILABLE')}</p><p className="mt-1 text-sm text-text-secondary">{errorMessage || t('COPY_WE_COULDN_T_LOAD_STORE_MODULE_TRY_AGAIN')}</p><button type="button" onClick={() => { void loadAll(); }} className="mt-3 min-h-11 rounded-xl bg-primary px-4 py-2 text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('COPY_TRY_AGAIN')}</button></div>}
      <ManagerStorePointOfSalePosModal />
      {toast && <div role={toast.type === 'error' ? 'alert' : 'status'} aria-live={toast.type === 'error' ? 'assertive' : 'polite'} className="rounded-xl border border-border bg-card p-3 text-sm text-text-primary" data-testid="manager-store-pos-toast"><span>{toast.message}</span><button type="button" className="ml-3 min-h-11 px-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" aria-label={t('COPY_CLOSE_POINT_SALE')} onClick={hideToast}>×</button></div>}
      {printData && <ManagerStorePointOfSaleThermalReceipt data={printData} />}
    </section>
  );
}
