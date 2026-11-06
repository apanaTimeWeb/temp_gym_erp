"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

const NAVIGATION_ITEMS = [
  { labelKey: 'navigation.items.plans', href: '/frontend_superadmin/superadmin_billing/billing_plans_management' },
  { labelKey: 'navigation.items.invoices', href: '/frontend_superadmin/superadmin_billing/billing_invoices_management' },
  { labelKey: 'navigation.items.coupons', href: '/frontend_superadmin/superadmin_billing/billing_coupons_management' },
  { labelKey: 'navigation.items.usage_meters', href: '/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard' },
] as const;

function SuperadminBillingSecondaryNav() {
  const pathname = usePathname();
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  return (
    <nav
      aria-label={t('navigation.domain_sections')}
      className="mb-5 flex w-full flex-wrap gap-1 overflow-x-auto border-b border-border"
      data-testid="superadmin-domain-secondary-navigation-billing"
    >
      {NAVIGATION_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-11 items-center whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${active ? 'border-focus text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}
          >
            {t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}

/** Secondary navigation for the billing domain; business behavior remains in the owning leaf modules. */
export default function SuperadminBillingDomainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Suspense fallback={<nav className="mb-5 flex w-full border-b border-border min-h-11" />}>
        <SuperadminBillingSecondaryNav />
      </Suspense>
      {children}
    </>
  );
}
