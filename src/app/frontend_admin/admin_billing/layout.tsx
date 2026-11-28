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
  return (
    <div className="min-h-full bg-page text-text-primary trainer-aurora-canvas">
      <nav aria-label={t('admin_navigation.AdminNavigation.billingNavigation')} className="border-b border-border/80 bg-header/95 dark:bg-[#0B0F19]/85 backdrop-blur-md px-3 py-2.5 sm:px-6">
        <div className="flex items-center gap-1.5 overflow-x-auto trainer-shell-scrollbar">
          {NAV_GROUPS.map((group, groupIndex) => {
            const active = group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
            return (
              <div key={group.key} className="flex items-center gap-1.5 shrink-0">
                {groupIndex > 0 && <span className="h-5 w-px bg-border mx-1 shrink-0" aria-hidden="true" />}
                {group.items.map((item) => {
                  const itemActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={itemActive ? 'page' : undefined}
                      className={`inline-flex min-h-10 shrink-0 items-center rounded-xl border px-3.5 py-1.5 text-xs sm:text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all ${
                        itemActive
                          ? 'border-orange-500/45 bg-orange-500/15 text-orange-600 dark:text-orange-300 shadow-[0_2px_10px_rgba(255,90,31,0.16)]'
                          : 'border-transparent text-secondary hover:bg-surface-hover hover:text-text-primary'
                      }`}
                    >
                      {t(item.labelKey)}
                    </Link>
                  );
                })}
                {active ? <span className="sr-only">{t('admin_navigation.AdminNavigation.activeDomain')}</span> : null}
              </div>
            );
          })}
        </div>
      </nav>
      {children}
    </div>
  );
}
