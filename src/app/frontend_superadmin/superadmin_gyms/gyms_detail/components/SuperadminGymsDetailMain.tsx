// RESPONSIBILITY: Renders and orchestrates SuperadminGymsGymDetailView for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';

import SuperadminGymsGymDetailBranchesSection from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailBranchesSection';
import SuperadminGymsGymDetailLifecycleSection from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailLifecycleSection';
import SuperadminGymsGymDetailOverviewSection from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailOverviewSection';
import SuperadminGymsGymDetailSkeleton from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailSkeleton';
import SuperadminGymsGymDetailWhiteLabelSection from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailWhiteLabelSection';
import { GYMS_STATUS_TRANSLATION_KEYS, SUPERADMIN_GYM_DETAIL_MAIN_TABS, getSuperadminGymStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/constants/superadmin_gyms_detail.constants';
import { useSuperadminGymsDetailMain } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/hooks/useSuperadminGymsDetailMain';

import type { SuperadminGymsGymDetailViewProps } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_main.types';

export default function SuperadminGymsDetailMain({ gymId }: SuperadminGymsGymDetailViewProps) {
  const t = useTranslations('superadmin_gyms');
  const vm = useSuperadminGymsDetailMain(gymId);
  if (vm.query.isPending) return <SuperadminGymsGymDetailSkeleton />;
  if (vm.query.isError || !vm.gym) {
    return (
      <section className="rounded-2xl border border-border bg-danger-bg p-8 text-center" role="alert" data-testid="superadmin_gyms-gym-detail-error-state">
        <p className="mb-4 font-medium text-danger">{t('ui.failed_to_load_gym_details_2969c6c4')}</p>
        <button
          type="button"
          onClick={() => void vm.query.refetch()}
          className="min-h-11 rounded-xl border border-border px-4 py-2 text-sm text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer"
          data-testid="superadmin_gyms-superadmin-gyms-gym-detail-main-gym-detail-main-retry"
        >
          {t('ui.retry_6327b4e5')}
        </button>
      </section>
    );
  }

  const gym = vm.gym;
  return (
    <section className="space-y-5" aria-labelledby="superadmin-gym-detail-title" data-testid="superadmin_gyms-superadmin-gyms-gym-detail-main-page-ready">
      <button
        type="button"
        onClick={vm.goBackToGyms}
        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border dark:border-white/10 bg-card px-3.5 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
        data-testid="superadmin_gyms-superadmin-gyms-gym-detail-main-main-back-to-gyms"
      >
        <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
        <span>{t('ui.back_to_gyms_014ddcb9')}</span>
      </button>

      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#38BDF8] to-[#FF5A1F]" />
        <div className="min-w-0">
          <h1 id="superadmin-gym-detail-title" className="truncate superadmin-page-title text-primary" title={gym.gymName}>{displayValue(gym.gymName)}</h1>
          <p className="mt-1 text-sm text-secondary">{t('ui.gym_id_338c46b9')}{displayValue(gym.gymId)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => void vm.handleGhostLogin()}
            disabled={vm.isStartingGhostLogin}
            className="min-h-10 rounded-xl border border-orange-500/35 bg-orange-500/15 hover:bg-orange-500/25 px-4 py-2 text-sm font-semibold text-orange-600 dark:text-orange-300 motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            data-testid="superadmin_gyms-superadmin-gyms-gym-detail-main-gym-detail-main-button"
          >
            {vm.isStartingGhostLogin ? t('ui.opening_admin_2d3f7a1b') : t('ui.ghost_login_impersonate_7c1e9d2a')}
          </button>
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getSuperadminGymStatusBadgeClasses(gym.status)}`}>
            {t(GYMS_STATUS_TRANSLATION_KEYS[gym.status])}
          </span>
        </div>
      </div>

      <nav className="flex w-full items-center gap-1.5 overflow-x-auto hide-scrollbar rounded-2xl border border-border dark:border-white/10 bg-card/80 dark:bg-[#0E1526]/85 p-1.5" aria-label={t('ui.gym_detail_sections_d2cf0fdc')}>
        {SUPERADMIN_GYM_DETAIL_MAIN_TABS.map((tab) => {
          const active = vm.activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => vm.setActiveTab(tab.id)}
              aria-current={active ? 'page' : undefined}
              className={`min-h-10 whitespace-nowrap rounded-xl border px-4 py-2 text-xs sm:text-sm font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${
                active
                  ? 'border-orange-500/40 bg-gradient-to-r from-[#FF5A1F]/20 to-[#F97316]/10 text-primary dark:text-orange-300 font-semibold shadow-[0_2px_10px_rgba(255,90,31,0.16)]'
                  : 'border-transparent text-secondary hover:bg-surface-hover dark:hover:bg-white/[0.06] hover:text-primary'
              }`}
              data-testid="superadmin_gyms-gym-detail-tab"
            >
              {t(tab.labelKey)}
            </button>
          );
        })}
      </nav>

      {vm.activeTab === 'overview' ? <SuperadminGymsGymDetailOverviewSection gym={gym} locale={vm.locale} /> : null}
      {vm.activeTab === 'branches' ? <SuperadminGymsGymDetailBranchesSection /> : null}
      {vm.activeTab === 'lifecycle' ? <SuperadminGymsGymDetailLifecycleSection gym={gym} billingRoute={vm.billingRoute} /> : null}
      {vm.activeTab === 'whitelabel' ? <SuperadminGymsGymDetailWhiteLabelSection gym={gym} /> : null}
    </section>
  );
}
