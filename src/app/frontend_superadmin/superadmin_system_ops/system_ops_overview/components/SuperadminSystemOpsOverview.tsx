// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsOverview within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import Tooltip from '@/components/ui/Tooltip';

import SuperadminSystemOpsOverviewSkeleton from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/components/SuperadminSystemOpsOverviewSkeleton';
import { SUPERADMIN_SYSTEM_OPS_OVERVIEW_CARD_DEFINITIONS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/constants/superadmin_system_ops_overview.constants';
import { useSuperadminSystemOpsOverviewSummary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/hooks/useSuperadminSystemOpsOverviewSummary';

export default function SuperadminSystemOpsOverview() {
  const t = useTranslations('superadmin_system_ops');
  const locale = useLocale();
  const query = useSuperadminSystemOpsOverviewSummary();
  if (query.isPending) return <SuperadminSystemOpsOverviewSkeleton />;
  if (query.isError || !query.data?.data) {
    return (
      <section className="space-y-3 rounded-2xl border border-border bg-danger-bg p-6 text-center" role="alert" data-testid="superadmin_system_ops-superadmin-system-ops-main-ops-dashboard-client-alert">
        <h1 className="text-lg font-semibold text-danger">{t('ui.system_operations_data_could_not_be_loaded_e9f8223')}</h1>
        <p className="text-sm text-secondary">{t('ui.please_retry_the_request_93873f2')}</p>
        <button
          type="button"
          onClick={() => void query.refetch()}
          className="min-h-11 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          data-testid="superadmin_system_ops-superadmin-system-ops-main-dashboard-client-try-again"
        >
          {t('ui.try_again_cb12d14')}
        </button>
      </section>
    );
  }

  const summary = query.data.data;
  return (
    <section className="space-y-5" aria-labelledby="superadmin_system_ops-title" data-testid="superadmin_system_ops-superadmin-system-ops-main-page-ready">
      <div className="relative overflow-hidden rounded-2xl border border-blue-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] to-[#10B981]" />
        <h1 id="superadmin_system_ops-title" className="superadmin-page-title text-primary">{t('ui.system_operations_dashboard_fde07da')}</h1>
        <p className="text-secondary text-sm mt-1">{t('ui.review_operational_summaries_and_open_the_owning_0c02797')}</p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {SUPERADMIN_SYSTEM_OPS_OVERVIEW_CARD_DEFINITIONS.map(({ key, titleKey, descriptionKey, href, icon: Icon, labelKey, getLabelValues, toneClass }) => {
          const labelValues = getLabelValues(summary, locale);
          if (labelValues.status) labelValues.status = t(`ui.status_${labelValues.status.toLowerCase()}`);
          return (
            <Link
              key={key}
              href={href}
              className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11"
              data-testid={`superadmin_system_ops-system-ops-dashboard-client-${key}-open`}
            >
              <div className="relative overflow-hidden flex h-full flex-col gap-4 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-6 shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5 hover:border-blue-400/60">
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] to-transparent" />
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-3 border border-white/10 ${typeof toneClass === 'function' ? toneClass(summary) : toneClass} motion-safe:transition-transform motion-safe:duration-base motion-safe:group-hover:scale-105`}>
                    <Icon size={18} aria-hidden={true} />
                  </div>
                  <h2 className="text-base font-bold text-primary">{t(titleKey)}</h2>
                </div>
                <p className="flex-1 text-sm text-secondary leading-relaxed">{t(descriptionKey)}</p>
                <div className="flex items-center justify-between gap-2 border-t border-border dark:border-white/10 pt-4">
                  <Tooltip content={t(labelKey, labelValues)}>
                    <span className="block max-w-full truncate rounded-lg bg-surface-highlight px-2.5 py-1 text-xs font-semibold text-primary">
                      {t(labelKey, labelValues)}
                    </span>
                  </Tooltip>
                  <span className="text-xs font-semibold text-primary shrink-0">{t('ui.open_2c1e525')} →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
