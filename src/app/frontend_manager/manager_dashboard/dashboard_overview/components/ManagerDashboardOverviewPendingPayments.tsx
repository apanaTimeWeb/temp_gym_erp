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
    <div className="rounded-xl shadow-card border p-5 bg-card border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 mb-3">
        <h2 className="font-semibold text-text-primary">{t("COPY_PENDING_DUES_2")}</h2>
        <span data-testid="manager_dashboard-manager-dashboard-pending-payments-status" className="bg-danger-bg text-danger-text px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">
          {filtered.length}
        </span>
      </div>

      <div className="relative mb-4">
        <Search size={18} strokeWidth={2} className="absolute start-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full ps-8 pe-3 py-1.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page bg-input text-text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_dashboard-manager-dashboard-pending-payments-input-value"
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
                <p className="break-words text-sm font-medium text-text-primary">{p.name}</p>
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
