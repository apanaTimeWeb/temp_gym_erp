// RESPONSIBILITY: Renders Superadmin Account Profile Overview Main using its declared props and feature-local hooks.
'use client';
import { useEffect } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import AvatarCard from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/components/profile_overview_avatar_card/SuperadminAccountProfileOverviewAvatarCard';
import ExportCard from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/components/profile_overview_data_export_card/SuperadminAccountProfileOverviewDataExportCard';
import PersonalForm from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/components/profile_overview_personal_form/SuperadminAccountProfileOverviewPersonalForm';
import { SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/config/superadmin_account_profile_overview.url_config';
import { useSuperadminAccountProfileOverviewPage } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/hooks/useSuperadminAccountProfileOverviewPage';

export default function SuperadminAccountProfileOverviewMain() {
  const t = useTranslations('superadmin_account_profile');
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('tab') === 'security') router.replace(SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES.DESTINATION_1);
  }, [router, searchParams]);
  const { profile, profileLoading, profileError, refetchProfile, personalState, updatePersonalProfile, requestFullDataExport, isRequestingDataExport, dataExportCompletionState } = useSuperadminAccountProfileOverviewPage();

  if (profileLoading && !profile) {
    return <div data-testid="superadmin_account_profile-loading-state" className="h-64 rounded-2xl border border-border bg-card motion-safe:animate-pulse" role="status" aria-busy="true" />;
  }
  if (profileError || !profile) {
    return (
      <div data-testid="superadmin_account_profile-error-state" className="rounded-2xl border border-danger/35 bg-danger-bg p-6 text-danger" role="alert">
        <p>{t('ui.profile_could_not_be_loaded')}</p>
        <button type="button" data-testid="superadmin_account_profile-retry" className="mt-2 min-h-10 underline focus-visible:ring-2 focus-visible:ring-primary cursor-pointer" onClick={() => void refetchProfile()}>
          {t('ui.retry_profile')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5" data-testid="superadmin_account_profile-superadmin-profile-main-page-ready">
      <header className="relative overflow-hidden rounded-2xl border border-cyan-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#22D3EE] via-[#38BDF8] to-[#D946EF]" />
        <div className="min-w-0">
          <h1 className="superadmin-page-title text-primary">{t('ui.my_profile_3615e58')}</h1>
          <p className="mt-1 text-sm text-secondary">{t('ui.manage_your_personal_information_and_account_sec_fd8f0e8')}</p>
        </div>
        <Link
          href={SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES.DESTINATION_1}
          className="inline-flex min-h-10 items-center rounded-xl border border-border dark:border-white/15 bg-card/80 px-4 text-xs sm:text-sm font-semibold text-primary hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary shrink-0"
        >
          {t('ui.security')}
        </Link>
      </header>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        <div className="lg:col-span-1"><AvatarCard profile={profile} /></div>
        <div className="relative overflow-hidden rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-5 sm:p-6 shadow-card lg:col-span-3">
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#22D3EE]/70 via-[#38BDF8]/70 to-transparent" />
          <PersonalForm profile={profile} isSaving={personalState === 'loading'} onSave={updatePersonalProfile} />
        </div>
      </div>
      <ExportCard onRequestExport={requestFullDataExport} isRequesting={isRequestingDataExport} completionState={dataExportCompletionState} />
    </div>
  );
}
