// RESPONSIBILITY: Renders Superadmin Affiliates Payout History Main using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import PayoutHistory from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/components/SuperadminAffiliatesPayoutHistoryTable';
import { SUPERADMIN_AFFILIATES_PAYOUT_HISTORY_ROUTES as SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/config/superadmin_affiliates_payout_history.url_config';
import { useSuperadminAffiliatesPayoutHistoryPage } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/hooks/useSuperadminAffiliatesPayoutHistoryPage';


export function SuperadminAffiliatesPayoutHistoryMain() {
 const t=useTranslations('superadmin_affiliates');
 const query=useSuperadminAffiliatesPayoutHistoryPage();
 return <section className="space-y-6"><header><h1 className="superadmin-page-title text-primary">{t('ui.payout_history_625c04c')}</h1>
 <Link href={SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES_URL_CONTRACT.SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES.DESTINATION_1} className="mt-2 inline-flex min-h-11 items-center text-secondary underline focus-visible:ring-2 focus-visible:ring-primary">{t('ui.affiliates_list_f2da5c6')}</Link></header>
 <div className="rounded-xl border border-border bg-card p-4"><PayoutHistory payouts={query.data??[]} isPending={query.isPending} isError={query.isError} onRetry={()=>void query.refetch()}/></div></section>;
}
