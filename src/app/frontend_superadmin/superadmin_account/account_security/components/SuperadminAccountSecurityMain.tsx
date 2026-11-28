// RESPONSIBILITY: Renders Superadmin Account Security Main using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import SecurityForm from '@/app/frontend_superadmin/superadmin_account/account_security/components/profile_overview_security_form/SuperadminAccountSecurityForm';
import { SUPERADMIN_ACCOUNT_SECURITY_ROUTES as SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_account/account_security/config/superadmin_account_security.url_config';
import { useSuperadminAccountSecurityPage } from '@/app/frontend_superadmin/superadmin_account/account_security/hooks/useSuperadminAccountSecurityPage';

export function SuperadminAccountSecurityMain() {
  const t = useTranslations('superadmin_account_profile');
  const { profileQuery, passwordMutation, factorMutation, mutatePassword, mutateFactor } = useSuperadminAccountSecurityPage();

  return (
    <section className="space-y-5">
      <header className="relative overflow-hidden rounded-2xl border border-cyan-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#22D3EE] via-[#10B981] to-[#D946EF]" />
        <h1 className="superadmin-page-title text-primary">{t('ui.security')}</h1>
        <Link
          href={SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES_URL_CONTRACT.SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES.DESTINATION_1}
          className="inline-flex min-h-10 items-center rounded-xl border border-border dark:border-white/15 bg-card/80 px-4 text-xs sm:text-sm font-semibold text-primary hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary shrink-0"
        >
          {t('ui.personal_information')}
        </Link>
      </header>
      {(() => {
        if (profileQuery.isPending) {
          return <div className="h-64 rounded-2xl border border-border bg-card motion-safe:animate-pulse" aria-busy="true" role="status" />;
        }
        if (profileQuery.isError || !profileQuery.data) {
          return (
            <div role="alert" className="rounded-2xl border border-danger/35 bg-danger-bg p-6 text-danger">
              <p>{t('ui.profile_could_not_be_loaded')}</p>
              <button type="button" className="mt-2 min-h-10 underline cursor-pointer" onClick={() => void profileQuery.refetch()}>
                {t('ui.retry_profile')}
              </button>
            </div>
          );
        }
        return (
          <div className="relative overflow-hidden rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-5 sm:p-6 shadow-card">
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#10B981]/70 via-[#22D3EE]/70 to-transparent" />
            <SecurityForm profile={profileQuery.data} isSavingPassword={passwordMutation.isPending} isTogglingTwoFA={factorMutation.isPending} onSavePassword={mutatePassword} onToggle2FA={mutateFactor} />
          </div>
        );
      })()}
    </section>
  );
}
