'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

function SuperadminAffiliatesSecondaryNav() {
  const t = useTranslations('superadmin_affiliates');
  const pathname = usePathname();
  return (
    <nav aria-label={t('ui.affiliates_list_f2da5c6')} className="mb-5 flex flex-wrap gap-2 border-b border-border pb-3">
      <Link href="/frontend_superadmin/superadmin_affiliates/affiliates_management" aria-current={pathname.endsWith('/affiliates_management') ? 'page' : undefined} className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-primary focus-visible:ring-2 focus-visible:ring-primary">
        {t('ui.affiliates_list_f2da5c6')}
      </Link>
      <Link href="/frontend_superadmin/superadmin_affiliates/affiliates_payout_history" aria-current={pathname.endsWith('/affiliates_payout_history') ? 'page' : undefined} className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-primary focus-visible:ring-2 focus-visible:ring-primary">
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
