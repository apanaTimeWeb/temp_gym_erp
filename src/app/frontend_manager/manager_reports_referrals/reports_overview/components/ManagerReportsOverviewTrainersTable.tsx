// RESPONSIBILITY: Renders the Trainer Performance table for the Reports module; state remains in module-owned logic hook.
'use client';

import { Star, Award, TrendingUp } from 'lucide-react';
import { useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import ManagerReportsOverviewEmptyState from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewEmptyState';
import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';
import { ManagerReportsOverviewFormatCurrency } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/utils/ManagerReportsOverviewFormatters';

const TRAINERS_TABLE_HEADERS = [
  'Trainer & Specialization',
  'Active Clients',
  'Sessions Completed',
  'Completion Rate',
  'Rating',
  'Revenue Generated',
  'Retention Rate',
];

export function ManagerReportsOverviewTrainersTable() {
  const locale = useLocale();
  const formatReportCurrency = (value: number) => ManagerReportsOverviewFormatCurrency(value, ManagerEnvConfig.currencyCode, locale);
  const { summary } = useManagerReportsOverviewLogic();
  const data = summary?.trainerPerformance ?? [];

  return (
    <div data-testid="manager_reports-trainers-table-region" className="w-full overflow-x-auto" role="region" aria-label="Trainer Performance Table">
      <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={TRAINERS_TABLE_HEADERS}>
        <table className="w-full text-left">
          <thead className="bg-primary-subtle">
            <tr>
              {TRAINERS_TABLE_HEADERS.map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(() => {
              if (data.length === 0) {
                return (
                  <tr>
                    <td colSpan={TRAINERS_TABLE_HEADERS.length}>
                      <ManagerReportsOverviewEmptyState />
                    </td>
                  </tr>
                );
              }
              return data.map((t) => (
                <tr key={t.id} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="text-sm font-semibold text-text-primary">{t.trainerName}</p>
                    <p className="text-xs text-text-secondary">{t.specialization}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium text-text-primary whitespace-nowrap">
                    {t.activeClients} clients
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium text-text-primary whitespace-nowrap">
                    {t.sessionsCompleted} sessions
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-bg text-success-text">
                      <Award size={12} aria-hidden="true" />
                      {t.completionRate}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-500">
                      <Star size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                      {t.avgRating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-success-text whitespace-nowrap">
                    {formatReportCurrency(t.revenueGenerated)}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      <TrendingUp size={14} aria-hidden="true" />
                      {t.retentionRate}%
                    </span>
                  </td>
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </ManagerInfrastructureResponsiveTable>
    </div>
  );
}

