"use client";
// Domain shell: secondary navigation only. Business logic stays in autonomous child leaves.
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

type NavigationItem = { href: string; labelKey: string };
type NavigationGroup = { key: string; labelKey: string; items: readonly NavigationItem[] };

const NAV_GROUPS: readonly NavigationGroup[] = [
  { key: 'accessGovernance', labelKey: 'admin_navigation.AdminNavigation.securityGroups.accessGovernance', items: [
      { href: '/frontend_admin/admin_security/security_permissions_management', labelKey: 'admin_navigation.AdminNavigation.securityTabs.permissions' }
  ] },
  { key: 'auditAndCompliance', labelKey: 'admin_navigation.AdminNavigation.securityGroups.auditAndCompliance', items: [
      { href: '/frontend_admin/admin_security/security_audit_logs_explorer', labelKey: 'admin_navigation.AdminNavigation.securityTabs.auditLogs' }
  ] },
];

export default function AdminSecurityDomainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations();
  return <div className="min-h-full bg-page text-primary">
    <nav aria-label={t('admin_navigation.AdminNavigation.securityNavigation')} className="sticky top-0 z-20 border-b border-border bg-header px-3 py-3 sm:px-4">
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
