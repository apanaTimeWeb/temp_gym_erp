// RESPONSIBILITY: Renders Superadmin Account Security Main using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import SecurityForm from '@/app/frontend_superadmin/superadmin_account/account_security/components/profile_overview_security_form/SuperadminAccountSecurityForm';
import { SUPERADMIN_ACCOUNT_SECURITY_ROUTES as SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_account/account_security/config/superadmin_account_security.url_config';
import { useSuperadminAccountSecurityPage } from '@/app/frontend_superadmin/superadmin_account/account_security/hooks/useSuperadminAccountSecurityPage';


export function SuperadminAccountSecurityMain() {
 const t=useTranslations('superadmin_account_profile');
 const {profileQuery,passwordMutation,factorMutation,mutatePassword,mutateFactor}=useSuperadminAccountSecurityPage();
 return <section className="space-y-6"><header className="space-y-2"><h1 className="superadmin-page-title text-primary">{t('ui.security')}</h1>
 <Link href={SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES_URL_CONTRACT.SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES.DESTINATION_1} className="inline-flex min-h-11 items-center text-secondary underline focus-visible:ring-2 focus-visible:ring-primary">{t('ui.personal_information')}</Link></header>
 {(() => { if (profileQuery.isPending) { return (<div className="h-64 rounded-xl border border-border bg-card motion-safe:animate-pulse" aria-busy="true" role="status"/>); } if (profileQuery.isError||!profileQuery.data) { return (<div role="alert" className="rounded-xl bg-danger-bg p-6 text-danger"><p>{t('ui.profile_could_not_be_loaded')}</p><button type="button" className="min-h-11 underline" onClick={()=>void profileQuery.refetch()}>{t('ui.retry_profile')}</button></div>); } return (<div className="rounded-xl border border-border bg-card p-6"><SecurityForm profile={profileQuery.data} isSavingPassword={passwordMutation.isPending} isTogglingTwoFA={factorMutation.isPending} onSavePassword={mutatePassword} onToggle2FA={mutateFactor}/></div>); })()}
 </section>;
}
