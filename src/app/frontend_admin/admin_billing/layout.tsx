"use client";
// Domain shell: secondary navigation only. Business logic stays in autonomous child leaves.
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

type NavigationItem = { href: string; labelKey: string };
type NavigationGroup = { key: string; labelKey: string; items: readonly NavigationItem[] };

const NAV_GROUPS: readonly NavigationGroup[] = [
  { key: 'plansAndPromotions', labelKey: 'admin_navigation.AdminNavigation.billingGroups.plansAndPromotions', items: [
      { href: '/frontend_admin/admin_billing/billing_plans_catalog', labelKey: 'admin_navigation.AdminNavigation.billingTabs.plansCatalog' },
      { href: '/frontend_admin/admin_billing/billing_coupons_management', labelKey: 'admin_navigation.AdminNavigation.billingTabs.coupons' }
  ] },
  { key: 'subscriptionLifecycle', labelKey: 'admin_navigation.AdminNavigation.billingGroups.subscriptionLifecycle', items: [
      { href: '/frontend_admin/admin_billing/billing_subscriptions_overview', labelKey: 'admin_navigation.AdminNavigation.billingTabs.subscriptionsOverview' },
      { href: '/frontend_admin/admin_billing/billing_subscription_plans', labelKey: 'admin_navigation.AdminNavigation.billingTabs.subscriptionPlans' },
      { href: '/frontend_admin/admin_billing/billing_subscription_invoices', labelKey: 'admin_navigation.AdminNavigation.billingTabs.subscriptionInvoices' },
      { href: '/frontend_admin/admin_billing/billing_subscription_payment_methods', labelKey: 'admin_navigation.AdminNavigation.billingTabs.subscriptionPaymentMethods' }
  ] },
  { key: 'usageAnalytics', labelKey: 'admin_navigation.AdminNavigation.billingGroups.usageAnalytics', items: [
      { href: '/frontend_admin/admin_billing/billing_usage_analytics', labelKey: 'admin_navigation.AdminNavigation.billingTabs.usageAnalytics' }
  ] },
];

export default function AdminBillingDomainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations();
  return <div className="min-h-full bg-page text-primary">
    <nav aria-label={t('admin_navigation.AdminNavigation.billingNavigation')} className="sticky top-0 z-20 border-b border-border bg-header px-3 py-3 sm:px-4">
      <div className="grid gap-2 lg:grid-cols-3">
        {NAV_GROUPS.map((group) => {
          const active = group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
          return <section key={group.key} aria-label={t(group.labelKey)} className="min-w-0 rounded-xl border border-border bg-card">
            <h2 className="border-b border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-secondary">{t(group.labelKey)}</h2>
            <div className="flex flex-wrap gap-2 p-3">
              {group.items.map((item) => {
                const itemActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return <Link key={item.href} href={item.href} aria-current={itemActive ? 'page' : undefined} className={`inline-flex min-h-11 shrink-0 items-center rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors ${itemActive ? 'border-focus bg-surface-highlight text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}>{t(item.labelKey)}</Link>;
              })}
            </div>
            {active ? <span className="sr-only">{t('admin_navigation.AdminNavigation.activeDomain')}</span> : null}
          </section>;
        })}
      </div>
    </nav>
    {children}
  </div>;
}
