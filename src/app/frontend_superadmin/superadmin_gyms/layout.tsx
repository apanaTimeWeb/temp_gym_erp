"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

const NAVIGATION_ITEMS = [
  { labelKey: 'navigation.items.gyms', href: '/frontend_superadmin/superadmin_gyms/gyms_directory' }
] as const;

function SuperadminGymsSecondaryNav() {
  const pathname = usePathname();
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  return (
    <nav aria-label={t('navigation.domain_sections')} className="mb-5 flex w-full flex-wrap gap-1 overflow-x-auto border-b border-border" data-testid="superadmin-domain-secondary-navigation-gyms">
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

/** Secondary navigation for the gyms domain; all items remain inside the owning domain. */
export default function SuperadminGymsDomainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Suspense fallback={<nav className="mb-5 flex w-full border-b border-border min-h-11" />}>
        <SuperadminGymsSecondaryNav />
      </Suspense>
      {children}
    </>
  );
}
