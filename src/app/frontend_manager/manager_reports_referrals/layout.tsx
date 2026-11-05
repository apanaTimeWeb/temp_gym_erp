'use client';
import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function ManagerReportsReferralsDomainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('MANAGER_REPORTS_REFERRALS_NAVIGATION');
  const pathname = usePathname();
 return <section aria-label={t('DOMAIN_LABEL')} className="min-h-full"><nav aria-label={t('SUBMODULE_NAVIGATION_LABEL')} className="flex flex-wrap gap-2 border-b border-border px-6 py-3 bg-card">
        <a href="/frontend_manager/manager_reports_referrals/reports_overview" aria-current={pathname === '/frontend_manager/manager_reports_referrals/reports_overview' ? 'page' : undefined} className={`inline-flex min-h-11 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium ${pathname === '/frontend_manager/manager_reports_referrals/reports_overview' ? 'bg-primary-subtle text-primary border-primary' : 'text-text-secondary hover:text-text-primary hover:bg-input'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_reports_referrals-layout-link-reports_overview">{t('REPORTS_OVERVIEW')}</a>
        <a href="/frontend_manager/manager_reports_referrals/referrals_rewards" aria-current={pathname === '/frontend_manager/manager_reports_referrals/reports_overview' ? 'page' : undefined} className={`inline-flex min-h-11 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium ${pathname === '/frontend_manager/manager_reports_referrals/reports_overview' ? 'bg-primary-subtle text-primary border-primary' : 'text-text-secondary hover:text-text-primary hover:bg-input'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_reports_referrals-layout-link-referrals_rewards">{t('REFERRALS_AND_REWARDS')}</a>
</nav>{children}</section>;
}
