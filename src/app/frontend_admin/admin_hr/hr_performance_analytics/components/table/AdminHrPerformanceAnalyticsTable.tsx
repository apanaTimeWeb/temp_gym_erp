"use client";
// RESPONSIBILITY: Renders sortable table displaying detailed staff performance metrics.
// DATA FLOW: feature data/state and user input → AdminHrPerformanceAnalyticsTable → accessible UI/events routed to owning hooks (admin_hr/hr_performance_analytics/components/table/AdminHrPerformanceAnalyticsTable.tsx)

import { formatNumber } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/utils/AdminHrPerformanceAnalyticsFormatters';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import { formatDecimal } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/utils/AdminHrPerformanceAnalyticsFormatters';
import { PERFORMANCE_TABLE_HEADERS, PERFORMANCE_STATUS_CONFIG } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/constants/AdminHrPerformanceAnalyticsConstants';
import AdminHrEmptyState from '@/app/frontend_admin/admin_hr/hr_performance_analytics/components/empty_state/AdminHrPerformanceAnalyticsEmptyState';
import AdminHrPerformanceTableSortIcon from '@/app/frontend_admin/admin_hr/hr_performance_analytics/components/table/AdminHrPerformanceAnalyticsTableSortIcon';
import type {
  StaffPerformanceRecord,
  PerformanceSortKey,
  PerformanceSortDirection,
} from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';

import type { AdminHrPerformanceTableProps } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTablePropsTypes';


/**
 * AdminHrPerformanceAnalyticsTable renders the admin hr performance table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrPerformanceAnalyticsTable: Renders sortable table displaying detailed staff performance metrics.
 * @dependencies Consumes AdminHrFormatters, AdminHrConstants, AdminHrEmptyState, AdminHrPerformanceTableSortIcon, AdminHrPerformanceTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrPerformanceAnalyticsTable({
  data,
  sortKey,
  sortDir,
  onSort,
}: AdminHrPerformanceTableProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-highlight border-b border-border">
              {PERFORMANCE_TABLE_HEADERS.map((h, index) => (
                <th
                  key={h.key}
                  scope="col"
                  className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap"
                  aria-sort={h.sortable ? (sortKey === h.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none') : undefined}
                  data-testid={`admin_hr-admin_hr-performance-table-control-map41-${index}-1`}
                >
                  {h.sortable ? (
                    <button type="button" onClick={() => onSort(h.key as PerformanceSortKey)} className="inline-flex min-h-11 items-center gap-1.5 text-left select-none hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('hr.AdminAuditRepair.sortPerformanceBy', { column: t(h.labelKey) })} data-testid="hr-performance-analytics-hr-performance-analytics-table-on-sort">
                      {t(h.labelKey)}
                      <AdminHrPerformanceTableSortIcon column={h.key} sortKey={sortKey} sortDir={sortDir} />
                    </button>
                  ) : <span>{t(h.labelKey)}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td colSpan={7}><AdminHrEmptyState title={t('hr.AdminHrPerformanceTable.text_04f991ef9b')} description={t('hr.AdminHrPerformanceTable.auto_36595ed797')} /></td>
              </tr>
            ) : (
              data.map((staff) => {
                const statusCfg = PERFORMANCE_STATUS_CONFIG[staff.status];
                return (
                  <tr key={staff.id} className="hover:bg-input motion-safe:transition-colors motion-safe:duration-base">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                          {staff.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-primary truncate">{staff.name}</p>
                          <p className="text-xs text-disabled truncate">{staff.branchName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-secondary">{staff.role}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-primary">{formatNumber(staff.sessionsTaken, locale)}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-primary">{formatNumber(staff.membersAdded, locale)}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-primary">{staff.attendancePct}%</td>
                    <td className="px-4 py-3.5 text-sm font-bold text-primary">{formatDecimal(staff.rating, locale)} <span className="text-warning text-xs">★</span></td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusCfg?.bgClass} ${statusCfg?.textClass}`} data-testid="hr-performance-analytics-hr-performance-analytics-table-status-badge">
                        {statusCfg?.labelKey ? t(statusCfg.labelKey) : staff.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
