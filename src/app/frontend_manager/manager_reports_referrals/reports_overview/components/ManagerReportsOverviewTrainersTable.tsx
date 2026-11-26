// RESPONSIBILITY: Renders the Trainer Performance table for the Reports module; state remains in module-owned logic hook.
'use client';

import Link from 'next/link';
import { Star, Award, TrendingUp } from 'lucide-react';
import { useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import ManagerReportsOverviewEmptyState from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewEmptyState';
import CopyButton from '@/components/ui/CopyButton';
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

const TABLE_COLUMN_COUNT = 7;

export function ManagerReportsOverviewTrainersTable() {
  const locale = useLocale();
  const formatReportCurrency = (value: number) => ManagerReportsOverviewFormatCurrency(value, ManagerEnvConfig.currencyCode, locale);
  const { summary } = useManagerReportsOverviewLogic();
  const data = summary?.trainerPerformance ?? [];

  return (
    <div data-testid="manager_reports-trainers-table-region" className="w-full rounded-2xl border border-border bg-card shadow-card overflow-hidden" role="region" aria-label="Trainer Performance Table">
      <div className="max-h-[640px] overflow-auto">
        <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={TRAINERS_TABLE_HEADERS}>
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
              <tr>
                {TRAINERS_TABLE_HEADERS.map((h, idx) => (
                  <th
                    key={h}
                    className={`text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-5 py-3 whitespace-nowrap ${
                      idx === 0 ? 'sticky start-0 z-30 bg-surface-highlight border-e border-border' : ''
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_COLUMN_COUNT}>
                    <ManagerReportsOverviewEmptyState />
                  </td>
                </tr>
              ) : (
                data.map((t) => (
                  <tr key={t.id} className="hover:bg-surface-hover transition-colors group">
                    <td className="sticky start-0 z-10 bg-card border-e border-border px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div>
                          <Link
                            href={`/frontend_manager/manager_staff_hr/staff_directory?search=${encodeURIComponent(t.trainerName)}`}
                            className="text-sm font-semibold text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring rounded"
                            title={`View ${t.trainerName} in Staff Directory`}
                          >
                            {t.trainerName}
                          </Link>
                          <p className="text-xs text-text-secondary">{t.specialization}</p>
                        </div>
                        <CopyButton value={t.trainerName} />
                      </div>
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
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-warning-text">
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
                ))
              )}
            </tbody>
          </table>
        </ManagerInfrastructureResponsiveTable>
      </div>
    </div>
  );
}

