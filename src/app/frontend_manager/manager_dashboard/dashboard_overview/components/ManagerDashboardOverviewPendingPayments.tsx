// RESPONSIBILITY: Renders ManagerDashboardOverviewPendingPayments's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';
import Link from 'next/link';

import { Search } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { useManagerInfrastructureNavigationDestination } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureNavigationDestination';

import { useDashboardStatsQuery } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewQueries';
import { useManagerDashboardOverviewUrlState } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewUrlState';
import { ManagerDashboardOverviewFormatCurrency, ManagerDashboardOverviewFormatDate } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/utils/ManagerDashboardOverviewFormatters';
/** @description Renders the ManagerDashboardOverviewPendingPayments component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerDashboardOverviewPendingPayments() {
  const t = useTranslations('MANAGER_DASHBOARD');
  const navigationDestination = useManagerInfrastructureNavigationDestination('FINANCE');
  const locale = useLocale();

  const { range } = useManagerDashboardOverviewUrlState();
  const { data: stats } = useDashboardStatsQuery({ range });
  const [search, setSearch] = useState('');

  if (!stats) return null;
  const list = stats.pendingPaymentsList || [];

  const filtered = list.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-card border border-rose-500/30 dark:border-rose-500/35 p-4 sm:p-5 bg-card dark:bg-gradient-to-br dark:from-[#22121A] dark:via-[#141B2D] dark:to-[#0C1220]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-rose-500 via-amber-400 to-orange-500 opacity-85" />
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-rose-500/20">
        <h2 className="font-bold text-base text-text-primary">{t("COPY_PENDING_DUES_2")}</h2>
        <span data-testid="manager_dashboard-manager-dashboard-pending-payments-status" className="bg-danger-bg text-danger-text border border-rose-500/30 px-2.5 py-1 rounded-full text-xs font-bold tabular-nums whitespace-nowrap">
          {filtered.length}
        </span>
      </div>

      <div className="relative mb-4">
        <Search size={18} strokeWidth={2} className="absolute start-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full ps-8 pe-3 py-2 text-sm border border-border/80 dark:border-white/10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page bg-page/80 dark:bg-[#0B1220]/90 text-text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_dashboard-manager-dashboard-pending-payments-input-value"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t("COPY_SEARCH_NAME_2")}
          
         aria-label={t("COPY_SEARCH_NAME_2")}/>
      </div>

      <div className="space-y-3">
        {filtered.slice(0, 6).map((p) => (
          <div key={p.id} className="flex min-w-0 flex-wrap items-center justify-between gap-2 py-2 border-b last:border-0 border-border group">
            <div className="flex min-w-0 items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-danger text-on-danger" data-testid="manager_dashboard-managerdashboardpendingpayments-status-badge-1">
                {p.name.charAt(0)}
              </div>
              <div>
                <Link
                  href={`/frontend_manager/manager_members/members_directory?search=${encodeURIComponent(p.name)}`}
                  className="break-words text-sm font-medium text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring rounded"
                  title={`View ${p.name} in Members Directory`}
                >
                  {p.name}
                </Link>
                <p className="text-xs text-text-secondary">{t("COPY_EXPIRES_1")}{ManagerDashboardOverviewFormatDate(p.expiryDate, locale)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="break-words text-sm font-bold text-danger-text">{ManagerDashboardOverviewFormatCurrency(p.pendingAmount, ManagerEnvConfig.currencyCode, locale)}</p>

            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-center py-4 text-text-secondary">
            {search ? t('COPY_NO_RESULTS_FOR_QUERY', { query: search }) : t('COPY_NO_PENDING_PAYMENTS')}
          </p>
        )}
      </div>

      <Link data-testid="manager_dashboard-manager-dashboard-pending-payments-navigation" href={navigationDestination} className="mt-3 block w-full text-center text-sm font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t("COPY_VIEW_ALL_PENDING")}</Link>
    </div>
  );
}
