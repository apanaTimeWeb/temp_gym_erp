'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/frontend_manager/manager_sales_billing/sales_overview', labelKey: 'SALES_OVERVIEW', testId: 'manager_manager_sales_billing-layout-link-sales_overview' },
  { href: '/frontend_manager/manager_sales_billing/store_products_catalog', labelKey: 'PRODUCTS', testId: 'manager_manager_sales_billing-layout-link-store_products_catalog' },
  { href: '/frontend_manager/manager_sales_billing/store_order_management', labelKey: 'ORDERS', testId: 'manager_manager_sales_billing-layout-link-store_order_management' },
  { href: '/frontend_manager/manager_sales_billing/store_point_of_sale', labelKey: 'POINT_OF_SALE', testId: 'manager_manager_sales_billing-layout-link-store_point_of_sale' },
] as const;

export default function ManagerSalesBillingDomainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('MANAGER_SALES_BILLING_NAVIGATION');
  const pathname = usePathname();

  return (
    <section aria-label={t('DOMAIN_LABEL')} className="min-h-full">
      <nav aria-label={t('SUBMODULE_NAVIGATION_LABEL')} className="flex flex-wrap gap-2 border-b border-border px-6 py-3 bg-card">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium ${isActive ? 'bg-primary-subtle text-primary border-primary' : 'text-text-secondary hover:text-text-primary hover:bg-input'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`}
              data-testid={item.testId}
            >
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>
      {children}
    </section>
  );
}
