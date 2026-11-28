'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

function SuperadminAccountSecondaryNav() {
  const t = useTranslations('superadmin_account_profile');
  const pathname = usePathname();
  const isProfile = pathname.endsWith('/account_profile_overview') || pathname === '/frontend_superadmin/superadmin_account';
  const isSecurity = pathname.endsWith('/account_security');
  return (
    <nav
      aria-label={t('ui.personal_information')}
      className="mb-5 flex w-full items-center gap-1.5 overflow-x-auto hide-scrollbar rounded-2xl border border-border dark:border-white/10 bg-card/80 dark:bg-[#0E1526]/85 backdrop-blur-md p-1.5"
      data-testid="superadmin-domain-secondary-navigation-account"
    >
      <Link
        href="/frontend_superadmin/superadmin_account/account_profile_overview"
        aria-current={isProfile ? 'page' : undefined}
        className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-xl border px-4 py-2 text-xs sm:text-sm font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isProfile
            ? 'border-orange-500/40 bg-gradient-to-r from-[#FF5A1F]/20 to-[#F97316]/10 text-primary dark:text-orange-300 font-semibold shadow-[0_2px_10px_rgba(255,90,31,0.16)]'
            : 'border-transparent text-secondary hover:bg-surface-hover dark:hover:bg-white/[0.06] hover:text-primary'
        }`}
      >
        {t('ui.personal_information')}
      </Link>
      <Link
        href="/frontend_superadmin/superadmin_account/account_security"
        aria-current={isSecurity ? 'page' : undefined}
        className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-xl border px-4 py-2 text-xs sm:text-sm font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isSecurity
            ? 'border-orange-500/40 bg-gradient-to-r from-[#FF5A1F]/20 to-[#F97316]/10 text-primary dark:text-orange-300 font-semibold shadow-[0_2px_10px_rgba(255,90,31,0.16)]'
            : 'border-transparent text-secondary hover:bg-surface-hover dark:hover:bg-white/[0.06] hover:text-primary'
        }`}
      >
        {t('ui.security')}
      </Link>
    </nav>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<nav className="mb-5 flex w-full rounded-2xl border border-border bg-card/80 p-1.5 min-h-[52px]" />}>
        <SuperadminAccountSecondaryNav />
      </Suspense>
      {children}
    </>
  );
}
