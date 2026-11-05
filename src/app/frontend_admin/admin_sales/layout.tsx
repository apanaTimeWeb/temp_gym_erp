"use client";
// Domain shell: secondary navigation only. Business logic stays in autonomous child leaves.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const NAV_ITEMS = [
  { href: '/frontend_admin/admin_sales/sales_overview', labelKey: 'admin_navigation.AdminNavigation.salesTabs.overview' },
  { href: '/frontend_admin/admin_sales/sales_membership_report', labelKey: 'admin_navigation.AdminNavigation.salesTabs.membershipReport' },
  { href: '/frontend_admin/admin_sales/sales_membership_growth_report', labelKey: 'admin_navigation.AdminNavigation.salesTabs.membershipGrowthReport' },
  { href: '/frontend_admin/admin_sales/sales_memberships', labelKey: 'admin_navigation.AdminNavigation.salesTabs.allMemberships' },
  { href: '/frontend_admin/admin_sales/sales_store_sales', labelKey: 'admin_navigation.AdminNavigation.salesTabs.storeSales' },
  { href: '/frontend_admin/admin_sales/sales_pending_payments', labelKey: 'admin_navigation.AdminNavigation.salesTabs.pendingPayments' },
] as const;

export default function AdminSalesDomainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations();
  return <div className="min-h-full bg-page text-primary">
    <nav aria-label={t('admin_navigation.AdminNavigation.salesNavigation')} className="sticky top-0 z-20 border-b border-border bg-header px-3 py-3 sm:px-4">
      <div className="flex gap-2 overflow-x-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`inline-flex min-h-11 shrink-0 items-center rounded-lg border px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors ${active ? 'border-focus bg-surface-highlight text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}>{t(item.labelKey)}</Link>;
        })}
      </div>
    </nav>
    {children}
  </div>;
}
