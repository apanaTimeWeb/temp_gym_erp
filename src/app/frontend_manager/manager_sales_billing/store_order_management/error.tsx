'use client';
import { useTranslations } from 'next-intl';

export default function ManagerWorkflowError({ reset }: { reset: () => void }) {
  const t = useTranslations('MANAGER_STORE_PRODUCTS');
  return <section className="p-6" role="alert" aria-live="assertive" data-testid="manager_manager_sales_billing-store-order-management-error-boundary-fallback"><p>{t('COPY_WE_COULDN_T_LOAD_STORE_MODULE_TRY_AGAIN')}</p><button type="button" onClick={reset} className="mt-3 min-h-11 rounded-lg bg-primary px-4 py-2 text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" data-testid="manager_manager_sales_billing-store-order-management-error-boundary-button-retry">{t('COPY_TRY_AGAIN')}</button></section>;
}
