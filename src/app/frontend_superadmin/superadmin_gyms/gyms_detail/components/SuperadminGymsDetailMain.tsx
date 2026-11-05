// RESPONSIBILITY: Renders and orchestrates SuperadminGymsGymDetailView for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymDetailView owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminGymsDetailMain, useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/lib/formatters, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailBranchesSection, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailLifecycleSection, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailOverviewSection, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailSkeleton, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailWhiteLabelSection, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/constants/superadmin_gyms_detail.constants, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/hooks/useSuperadminGymsDetailMain, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_main.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Gym Detail workspace from hook-owned route state and isolated tab sections. No direct API calls or business calculations.
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



/**
 * @description Owns the SuperadminGymsGymDetailView responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDetailMain({ gymId }: SuperadminGymsGymDetailViewProps) {
  const t = useTranslations('superadmin_gyms');
  const vm = useSuperadminGymsDetailMain(gymId);
  if (vm.query.isPending) return <SuperadminGymsGymDetailSkeleton/>;
  if (vm.query.isError || !vm.gym) return <section className="rounded-xl border border-border bg-danger-bg p-8 text-center" role="alert" data-testid="superadmin_gyms-gym-detail-error-state"><p className="mb-4 font-medium text-danger">{t('ui.failed_to_load_gym_details_2969c6c4')}</p><button type="button" onClick={() => void vm.query.refetch()} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_gyms-superadmin-gyms-gym-detail-main-gym-detail-main-retry">{t('ui.retry_6327b4e5')}</button></section>;
  const gym = vm.gym;
  return <section className="space-y-6" aria-labelledby="superadmin-gym-detail-title" data-testid="superadmin_gyms-superadmin-gyms-gym-detail-main-page-ready">
    <button type="button" onClick={vm.goBackToGyms} className="flex min-h-11 items-center gap-2 text-sm text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_gyms-superadmin-gyms-gym-detail-main-main-back-to-gyms"><ArrowLeft size={18} strokeWidth={2} aria-hidden="true"/> {t('ui.back_to_gyms_014ddcb9')}</button>
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div className="min-w-0"><h1 id="superadmin-gym-detail-title" className="truncate text-2xl font-bold text-primary" title={gym.gymName}>{displayValue(gym.gymName)}</h1><p className="mt-1 text-sm text-secondary">{t('ui.gym_id_338c46b9')}{displayValue(gym.gymId)}</p></div><div className="flex flex-wrap items-center gap-3"><button type="button" onClick={() => void vm.handleGhostLogin()} disabled={vm.isStartingGhostLogin} className="min-h-11 rounded-lg border border-border bg-input px-4 py-2 text-sm font-medium text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50" data-testid="superadmin_gyms-superadmin-gyms-gym-detail-main-gym-detail-main-button">{vm.isStartingGhostLogin ? t('ui.opening_admin_2d3f7a1b') : t('ui.ghost_login_impersonate_7c1e9d2a')}</button><span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${getSuperadminGymStatusBadgeClasses(gym.status)}`}>{t(GYMS_STATUS_TRANSLATION_KEYS[gym.status])}</span></div></div>
    <nav className="flex w-full overflow-x-auto border-b border-border" aria-label={t('ui.gym_detail_sections_d2cf0fdc')}>{SUPERADMIN_GYM_DETAIL_MAIN_TABS.map((tab) => <button key={tab.id} type="button" onClick={() => vm.setActiveTab(tab.id)} aria-current={vm.activeTab === tab.id ? 'page' : undefined} className={`min-h-11 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${vm.activeTab === tab.id ? 'border-focus text-primary' : 'border-transparent text-secondary hover:border-border hover:text-primary'}`} data-testid="superadmin_gyms-gym-detail-tab">{t(tab.labelKey)}</button>)}</nav>
    {vm.activeTab === 'overview' ? <SuperadminGymsGymDetailOverviewSection gym={gym} locale={vm.locale} /> : null}
    {vm.activeTab === 'branches' ? <SuperadminGymsGymDetailBranchesSection /> : null}
    {vm.activeTab === 'lifecycle' ? <SuperadminGymsGymDetailLifecycleSection gym={gym} billingRoute={vm.billingRoute} /> : null}
    {vm.activeTab === 'whitelabel' ? <SuperadminGymsGymDetailWhiteLabelSection gym={gym} /> : null}
  </section>;
}
