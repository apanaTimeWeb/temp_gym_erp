'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

function SuperadminAffiliatesSecondaryNav() {
  const t = useTranslations('superadmin_affiliates');
  const pathname = usePathname();
  const isAffiliates = pathname.endsWith('/affiliates_management') || pathname === '/frontend_superadmin/superadmin_affiliates';
  const isPayouts = pathname.endsWith('/affiliates_payout_history');
  return (
    <nav aria-label={t('ui.affiliates_list_f2da5c6')} className="mb-5 flex flex-wrap gap-2 border-b border-border pb-3">
      <Link
        href="/frontend_superadmin/superadmin_affiliates/affiliates_management"
        aria-current={isAffiliates ? 'page' : undefined}
        className={`inline-flex min-h-11 items-center rounded-md border px-4 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isAffiliates
            ? 'border-focus text-primary font-medium bg-surface-hover shadow-sm'
            : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'
        }`}
      >
        {t('ui.affiliates_list_f2da5c6')}
      </Link>
      <Link
        href="/frontend_superadmin/superadmin_affiliates/affiliates_payout_history"
        aria-current={isPayouts ? 'page' : undefined}
        className={`inline-flex min-h-11 items-center rounded-md border px-4 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isPayouts
            ? 'border-focus text-primary font-medium bg-surface-hover shadow-sm'
            : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'
        }`}
      >
        {t('ui.payout_history_625c04c')}
      </Link>
    </nav>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<nav className="mb-5 flex flex-wrap gap-2 border-b border-border pb-3 min-h-11" />}>
        <SuperadminAffiliatesSecondaryNav />
      </Suspense>
      {children}
    </>
  );
}
