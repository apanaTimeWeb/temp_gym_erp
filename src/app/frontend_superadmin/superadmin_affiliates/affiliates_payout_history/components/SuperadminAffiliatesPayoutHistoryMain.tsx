// RESPONSIBILITY: Renders Superadmin Affiliates Payout History Main using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import PayoutHistory from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/components/SuperadminAffiliatesPayoutHistoryTable';
import { SUPERADMIN_AFFILIATES_PAYOUT_HISTORY_ROUTES as SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/config/superadmin_affiliates_payout_history.url_config';
import { useSuperadminAffiliatesPayoutHistoryPage } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/hooks/useSuperadminAffiliatesPayoutHistoryPage';

export function SuperadminAffiliatesPayoutHistoryMain() {
  const t = useTranslations('superadmin_affiliates');
  const query = useSuperadminAffiliatesPayoutHistoryPage();
  return (
    <section className="space-y-5">
      <header className="relative overflow-hidden rounded-2xl border border-teal-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#2DD4BF] via-[#10B981] to-[#38BDF8]" />
        <h1 className="superadmin-page-title text-primary">{t('ui.payout_history_625c04c')}</h1>
        <Link href={SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES_URL_CONTRACT.SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES.DESTINATION_1} className="inline-flex min-h-10 items-center rounded-xl border border-border dark:border-white/15 bg-card/80 px-4 text-xs sm:text-sm font-semibold text-primary hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary shrink-0">
          {t('ui.affiliates_list_f2da5c6')}
        </Link>
      </header>
      <PayoutHistory payouts={query.data ?? []} isPending={query.isPending} isError={query.isError} onRetry={() => void query.refetch()} />
    </section>
  );
}
