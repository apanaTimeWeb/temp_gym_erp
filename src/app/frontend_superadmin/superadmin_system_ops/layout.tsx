"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

const NAVIGATION_ITEMS = [
  { labelKey: 'navigation.items.cache_management', href: '/frontend_superadmin/superadmin_system_ops/system_ops_cache_management' },
  { labelKey: 'navigation.items.system_ops_overview', href: '/frontend_superadmin/superadmin_system_ops/system_ops_overview' },
  { labelKey: 'navigation.items.infrastructure', href: '/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure' },
  { labelKey: 'navigation.items.backups', href: '/frontend_superadmin/superadmin_system_ops/system_ops_backups' },
  { labelKey: 'navigation.items.jobs', href: '/frontend_superadmin/superadmin_system_ops/system_ops_jobs' },
  { labelKey: 'navigation.items.migrations', href: '/frontend_superadmin/superadmin_system_ops/system_ops_migrations' }
] as const;

function SuperadminSystemOperationsSecondaryNav() {
  const pathname = usePathname();
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  return (
    <nav aria-label={t('navigation.domain_sections')} className="mb-5 flex w-full flex-wrap gap-1 overflow-x-auto border-b border-border" data-testid="superadmin-domain-secondary-navigation-system-operations">
      {NAVIGATION_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`flex min-h-11 items-center whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${active ? 'border-focus text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}>
            {t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}

/** Secondary navigation for the system-operations domain; all items remain inside the owning domain. */
export default function SuperadminSystemOperationsDomainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Suspense fallback={<nav className="mb-5 flex w-full border-b border-border min-h-11" />}>
        <SuperadminSystemOperationsSecondaryNav />
      </Suspense>
      {children}
    </>
  );
}
