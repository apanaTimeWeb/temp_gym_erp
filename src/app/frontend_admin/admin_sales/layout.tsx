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
  return (
    <div className="min-h-full bg-page text-text-primary trainer-aurora-canvas">
      <nav aria-label={t('admin_navigation.AdminNavigation.salesNavigation')} className="border-b border-border/80 bg-header/95 dark:bg-[#0B0F19]/85 backdrop-blur-md px-3 py-2.5 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto trainer-shell-scrollbar">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex min-h-10 shrink-0 items-center rounded-xl border px-3.5 py-1.5 text-xs sm:text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all ${
                  active
                    ? 'border-orange-500/45 bg-orange-500/15 text-orange-600 dark:text-orange-300 shadow-[0_2px_10px_rgba(255,90,31,0.16)]'
                    : 'border-transparent text-secondary hover:bg-surface-hover hover:text-text-primary'
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </div>
      </nav>
      {children}
    </div>
  );
}
