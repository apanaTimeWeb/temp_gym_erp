"use client";



import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { ReactNode } from 'react';

const NAVIGATION_ITEMS = [
  { labelKey: 'navigation.items.analytics', href: '/frontend_superadmin/superadmin_analytics/analytics_dashboard' },
  { labelKey: 'navigation.items.reports', href: '/frontend_superadmin/superadmin_analytics/analytics_reports_center' },
  { labelKey: 'navigation.items.reports', featureLabel: 'ui.reports_tab_cancellations', href: '/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations' },
  { labelKey: 'navigation.items.reports', featureLabel: 'ui.reports_tab_health', href: '/frontend_superadmin/superadmin_analytics/analytics_reports_health' }
] as const;

/** Secondary navigation for the analytics domain; all items remain inside the owning domain. */
export default function SuperadminAnalyticsDomainLayout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  const featureT = useTranslations('superadmin_analytics_reports');
  return (
    <>
      <nav aria-label={t('navigation.domain_sections')} className="mb-5 flex w-full flex-wrap gap-1 overflow-x-auto border-b border-border" data-testid="superadmin-domain-secondary-navigation-analytics">
        {NAVIGATION_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`flex min-h-11 items-center whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${active ? 'border-focus text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}>
              {'featureLabel' in item ? featureT(item.featureLabel) : t(item.labelKey)}
            </Link>
          );
        })}
      </nav>
      {children}
    </>
  );
}
