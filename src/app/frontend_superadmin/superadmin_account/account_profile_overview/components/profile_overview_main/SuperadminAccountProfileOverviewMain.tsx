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
 const t=useTranslations('superadmin_account_profile');
 const router=useRouter();const searchParams=useSearchParams();
 useEffect(()=>{if(searchParams.get('tab')==='security')router.replace(SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES.DESTINATION_1);},[router,searchParams]);
 const { profile, profileLoading, profileError, refetchProfile, personalState, updatePersonalProfile, requestFullDataExport, isRequestingDataExport, dataExportCompletionState }=useSuperadminAccountProfileOverviewPage();
 if(profileLoading&&!profile)return <div data-testid="superadmin_account_profile-loading-state" className="h-64 rounded-xl border border-border bg-card motion-safe:animate-pulse" role="status" aria-busy="true"/>;
 if(profileError||!profile)return <div data-testid="superadmin_account_profile-error-state" className="rounded-xl border border-border bg-danger-bg p-6 text-danger" role="alert"><p>{t('ui.profile_could_not_be_loaded')}</p><button type="button" data-testid="superadmin_account_profile-retry" className="min-h-11 underline focus-visible:ring-2 focus-visible:ring-primary" onClick={()=>void refetchProfile()}>{t('ui.retry_profile')}</button></div>;
 return <div className="space-y-6" data-testid="superadmin_account_profile-superadmin-profile-main-page-ready"><header>
 <h1 className="superadmin-page-title text-primary">{t('ui.my_profile_3615e58')}</h1>
 <p className="mt-1 text-secondary">{t('ui.manage_your_personal_information_and_account_sec_fd8f0e8')}</p>
 <Link href={SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES.DESTINATION_1} className="mt-3 inline-flex min-h-11 items-center rounded border border-border bg-card px-4 text-primary focus-visible:ring-2 focus-visible:ring-primary">{t('ui.security')}</Link></header>
 <div className="grid grid-cols-1 gap-6 lg:grid-cols-4"><div className="lg:col-span-1"><AvatarCard profile={profile}/></div>
 <div className="rounded-xl border border-border bg-card p-6 lg:col-span-3"><PersonalForm profile={profile} isSaving={personalState==='loading'} onSave={updatePersonalProfile}/></div></div>
 <ExportCard onRequestExport={requestFullDataExport} isRequesting={isRequestingDataExport} completionState={dataExportCompletionState}/>
 </div>;
}
