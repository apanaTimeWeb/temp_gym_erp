// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsOverview within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders System Ops summary cards from TanStack Query server data and links to the owning detail features. No API calls.
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import Tooltip from '@/components/ui/Tooltip';

import SuperadminSystemOpsOverviewSkeleton from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/components/SuperadminSystemOpsOverviewSkeleton';
import { SUPERADMIN_SYSTEM_OPS_OVERVIEW_CARD_DEFINITIONS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/constants/superadmin_system_ops_overview.constants';
import { useSuperadminSystemOpsOverviewSummary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/hooks/useSuperadminSystemOpsOverviewSummary';


/**
 * @description Renders System Ops summary cards from TanStack Query server data and links to the owning detail features. No API calls.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsOverview() {
  const t = useTranslations('superadmin_system_ops');
  const locale = useLocale();
  const query = useSuperadminSystemOpsOverviewSummary();
  if (query.isPending) return <SuperadminSystemOpsOverviewSkeleton/>;
  if (query.isError || !query.data?.data) return <section className="space-y-3 rounded-xl border border-border bg-danger-bg p-6 text-center" role="alert" data-testid="superadmin_system_ops-superadmin-system-ops-main-ops-dashboard-client-alert"><h1 className="text-lg font-semibold text-danger">{t('ui.system_operations_data_could_not_be_loaded_e9f8223')}</h1><p className="text-sm text-secondary">{t('ui.please_retry_the_request_93873f2')}</p><button  type="button" onClick={() => void query.refetch()} className="min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_system_ops-superadmin-system-ops-main-dashboard-client-try-again">{t('ui.try_again_cb12d14')}</button></section>;

  const summary = query.data.data;
  return <section className="space-y-6" aria-labelledby="superadmin_system_ops-title" data-testid="superadmin_system_ops-superadmin-system-ops-main-page-ready"><div className="space-y-2"><h1 id="superadmin_system_ops-title" className="superadmin-page-title text-primary">{t('ui.system_operations_dashboard_fde07da')}</h1><p className="text-secondary">{t('ui.review_operational_summaries_and_open_the_owning_0c02797')}</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">{SUPERADMIN_SYSTEM_OPS_OVERVIEW_CARD_DEFINITIONS.map(({ key, titleKey, descriptionKey, href, icon: Icon, labelKey, getLabelValues, toneClass }) => { const labelValues = getLabelValues(summary, locale); if (labelValues.status) labelValues.status = t(`ui.status_${labelValues.status.toLowerCase()}`); return <Link key={key} href={href} className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11" data-testid={`superadmin_system_ops-system-ops-dashboard-client-${key}-open`}><div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 motion-safe:hover:border-focus"><div className="flex items-center gap-3"><div className={`rounded-lg p-3 ${typeof toneClass === 'function' ? toneClass(summary) : toneClass} motion-safe:transition-transform motion-safe:duration-base motion-safe:group-hover:scale-105`}><Icon size={18} aria-hidden={true} /></div><h2 className="text-lg font-bold text-primary">{t(titleKey)}</h2></div><p className="flex-1 text-sm text-secondary">{t(descriptionKey)}</p><div className="flex items-center justify-between border-t border-border pt-4"><Tooltip content={t(labelKey, labelValues)}><span className="block max-w-full truncate rounded bg-surface-highlight px-2 py-1 text-xs font-semibold text-primary">{t(labelKey, labelValues)}</span></Tooltip><span className="text-sm font-medium text-primary">{t('ui.open_2c1e525')}</span></div></div></Link>; })}</div></section>;
}
