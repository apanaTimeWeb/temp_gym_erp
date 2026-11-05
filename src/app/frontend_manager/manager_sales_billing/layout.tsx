import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

export default function ManagerSalesBillingDomainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('MANAGER_SALES_BILLING_NAVIGATION');
 return <section aria-label={t('DOMAIN_LABEL')} className="min-h-full"><nav aria-label={t('SUBMODULE_NAVIGATION_LABEL')} className="flex flex-wrap gap-2 border-b border-border px-6 py-3 bg-card">
        <a href="/frontend_manager/manager_sales_billing/sales_overview" className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_sales_billing-layout-link-sales_overview">{t('SALES_OVERVIEW')}</a>
        <a href="/frontend_manager/manager_sales_billing/store_products_catalog" className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_sales_billing-layout-link-store_products_catalog">{t('PRODUCTS')}</a>
        <a href="/frontend_manager/manager_sales_billing/store_order_management" className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_sales_billing-layout-link-store_order_management">{t('ORDERS')}</a>
        <a href="/frontend_manager/manager_sales_billing/store_point_of_sale" className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_sales_billing-layout-link-store_point_of_sale">{t('POINT_OF_SALE')}</a>
</nav>{children}</section>;
}
