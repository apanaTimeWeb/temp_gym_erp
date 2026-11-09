'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function ManagerReportsReferralsDomainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('MANAGER_REPORTS_REFERRALS_NAVIGATION');
  const pathname = usePathname();
  const isReportsActive = pathname === '/frontend_manager/manager_reports_referrals/reports_overview' || pathname.startsWith('/frontend_manager/manager_reports_referrals/reports_overview/');
  const isReferralsActive = pathname === '/frontend_manager/manager_reports_referrals/referrals_rewards' || pathname.startsWith('/frontend_manager/manager_reports_referrals/referrals_rewards/');

  return (
    <section aria-label={t('DOMAIN_LABEL')} className="min-h-full">
      <nav aria-label={t('SUBMODULE_NAVIGATION_LABEL')} className="flex flex-wrap gap-2 border-b border-border px-6 py-3 bg-card">
        <Link
          href="/frontend_manager/manager_reports_referrals/reports_overview"
          aria-current={isReportsActive ? 'page' : undefined}
          className={`inline-flex min-h-11 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium ${isReportsActive ? 'bg-primary-subtle text-primary border-primary' : 'text-text-secondary hover:text-text-primary hover:bg-input'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`}
          data-testid="manager_manager_reports_referrals-layout-link-reports_overview"
        >
          {t('REPORTS_OVERVIEW')}
        </Link>
        <Link
          href="/frontend_manager/manager_reports_referrals/referrals_rewards"
          aria-current={isReferralsActive ? 'page' : undefined}
          className={`inline-flex min-h-11 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium ${isReferralsActive ? 'bg-primary-subtle text-primary border-primary' : 'text-text-secondary hover:text-text-primary hover:bg-input'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`}
          data-testid="manager_manager_reports_referrals-layout-link-referrals_rewards"
        >
          {t('REFERRALS_AND_REWARDS')}
        </Link>
      </nav>
      {children}
    </section>
  );
}
