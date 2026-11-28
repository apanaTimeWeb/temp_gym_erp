"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

const NAVIGATION_ITEMS = [
  { labelKey: 'navigation.items.broadcasts', href: '/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns' },
  { labelKey: 'navigation.items.messaging', href: '/frontend_superadmin/superadmin_communication/communication_messaging_center' },
  { labelKey: 'navigation.items.notifications', href: '/frontend_superadmin/superadmin_communication/communication_notifications' },
] as const;

function SuperadminCommunicationSecondaryNav() {
  const pathname = usePathname();
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  return (
    <nav
      aria-label={t('navigation.domain_sections')}
      className="mb-5 flex w-full items-center gap-1.5 overflow-x-auto hide-scrollbar rounded-2xl border border-border dark:border-white/10 bg-card/80 dark:bg-[#0E1526]/85 backdrop-blur-md p-1.5"
      data-testid="superadmin-domain-secondary-navigation-communication"
    >
      {NAVIGATION_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-10 items-center whitespace-nowrap rounded-xl border px-4 py-2 text-xs sm:text-sm font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              active
                ? 'border-orange-500/40 bg-gradient-to-r from-[#FF5A1F]/20 to-[#F97316]/10 text-primary dark:text-orange-300 font-semibold shadow-[0_2px_10px_rgba(255,90,31,0.16)]'
                : 'border-transparent text-secondary hover:bg-surface-hover dark:hover:bg-white/[0.06] hover:text-primary'
            }`}
          >
            {t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}

/** Secondary navigation for the communication domain; all items remain inside the owning domain. */
export default function SuperadminCommunicationDomainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Suspense fallback={<nav className="mb-5 flex w-full rounded-2xl border border-border bg-card/80 p-1.5 min-h-[52px]" />}>
        <SuperadminCommunicationSecondaryNav />
      </Suspense>
      {children}
    </>
  );
}
