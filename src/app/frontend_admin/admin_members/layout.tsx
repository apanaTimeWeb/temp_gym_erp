"use client";
// Domain shell: members and blacklist management are secondary navigation leaves.
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const NAV_ITEMS = [
  { href: '/frontend_admin/admin_members/members_directory', labelKey: 'admin_navigation.AdminNavigation.membersTabs.directory' },
  { href: '/frontend_admin/admin_members/members_blacklist_management', labelKey: 'admin_navigation.AdminNavigation.membersTabs.blacklist', badge: '12' },
] as const;

export default function AdminMembersDomainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations();
  return <div className="min-h-full bg-page text-primary">
    <nav aria-label={t('admin_navigation.AdminNavigation.membersNavigation')} className="sticky top-0 z-20 border-b border-border bg-header px-3 py-3 sm:px-4">
      <div className="flex gap-2 overflow-x-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors ${
                active ? 'border-focus bg-surface-highlight text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'
              }`}
            >
              <span>{t(item.labelKey)}</span>
              {'badge' in item && item.badge && (
                <span className="px-1.5 py-0.5 text-xs font-bold rounded-full bg-danger-bg text-danger-text border border-danger-border">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
    {children}
  </div>;
}
