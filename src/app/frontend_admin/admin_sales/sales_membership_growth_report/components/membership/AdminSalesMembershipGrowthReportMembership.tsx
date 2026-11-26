"use client";
// RESPONSIBILITY: Renders the Membership Growth report tab — new members, renewals, exits, net growth per gym.
// DATA FLOW: feature data/state and user input → AdminSalesMembershipGrowthReportAnalyticsMembership → accessible UI/events routed to owning hooks (admin_sales/sales_membership_growth_report/components/membership/AdminSalesMembershipGrowthReportAnalyticsMembership.tsx)

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { formatNumber } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/utils/AdminSalesMembershipGrowthReportFormatters';

import { useAdminSalesMembershipGrowthReportLogic } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/hooks/useAdminSalesMembershipGrowthReportLogic';
import AdminSalesMembershipGrowthReportSectionState from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/components/main_view/AdminSalesMembershipGrowthReportSectionState';
import { AdminSalesMembershipGrowthReportAnalyticsEmptyState as AdminSalesMembershipGrowthReportEmptyState } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/components/empty_state/AdminSalesMembershipGrowthReportEmptyState';
import { CopyButton } from '@/components/ui/CopyButton';

const TABLE_COLUMN_COUNT = 6;

const TABLE_HEADERS = [
  'reports.AdminAuditRepair.gym',
  'reports.AdminAuditRepair.activeMembers',
  'reports.AdminAuditRepair.newMembers',
  'reports.AdminAuditRepair.renewals',
  'reports.AdminAuditRepair.exits',
  'reports.AdminAuditRepair.netGrowth',
] as const;

/**
 * AdminSalesMembershipGrowthReportAnalyticsMembership renders the admin reports membership UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesMembershipGrowthReportAnalyticsMembership: Renders the Membership Growth report tab — new members, renewals, exits, net growth per gym.
 * @dependencies Consumes AdminSalesMembershipGrowthReportFormatters, useAdminSalesMembershipGrowthReportLogic, AdminSalesMembershipGrowthReportEmptyState.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesMembershipGrowthReportAnalyticsMembership() {
  const locale = useLocale();
  const t = useTranslations();

  const { reportData, status, retryReport } = useAdminSalesMembershipGrowthReportLogic();
  if (status !== 'success') return <AdminSalesMembershipGrowthReportSectionState status={status as 'pending' | 'success' | 'error'} onRetry={retryReport} />;
  if (!reportData) return null;

  return (
    <div className="space-y-6">
      {/* Visual Comparative Growth Chart */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-primary">Visual Branch Growth & Acquisition Dynamics</h3>
            <p className="text-xs text-secondary mt-0.5">Comparative breakdown of new additions, renewals, and exits across operational branches</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-chart-success"></span> New Members</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-chart-info"></span> Renewals</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-chart-danger"></span> Exits</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportData.membershipGrowth.map((row) => {
            const total = (row.newMembers + row.renewals) || 1;
            const newPct = Math.round((row.newMembers / total) * 100);
            const renewalPct = 100 - newPct;
            return (
              <div key={row.gymId} className="p-3.5 rounded-lg border border-border bg-surface-highlight flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Link
                      href={`/frontend_admin/admin_gyms/gyms_branches_directory?search=${encodeURIComponent(row.gymName)}`}
                      className="text-xs font-bold text-primary truncate hover:underline"
                      title={`View ${row.gymName} in Branches Directory`}
                    >
                      {row.gymName}
                    </Link>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${row.netGrowth >= 0 ? 'bg-success-bg text-success-text' : 'bg-danger-bg text-danger-text'}`}>
                      {row.netGrowth >= 0 ? '+' : ''}{row.netGrowth} net
                    </span>
                  </div>
                  <div className="text-xs text-secondary mb-2.5">
                    Active: <strong className="text-primary">{formatNumber(row.activeMembers, locale)}</strong>
                  </div>
                  
                  {/* Visual Segmented bar */}
                  <div className="h-2.5 w-full bg-input rounded-full overflow-hidden flex mb-2">
                    <div style={{ width: `${newPct}%` }} className="bg-chart-success h-full transition-all" title={`New: ${row.newMembers}`} />
                    <div style={{ width: `${renewalPct}%` }} className="bg-chart-info h-full transition-all" title={`Renewals: ${row.renewals}`} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-border text-center text-[11px]">
                  <div>
                    <span className="text-secondary block">New</span>
                    <strong className="text-success-text font-bold">+{row.newMembers}</strong>
                  </div>
                  <div>
                    <span className="text-secondary block">Renew</span>
                    <strong className="text-info-text font-bold">{row.renewals}</strong>
                  </div>
                  <div>
                    <span className="text-secondary block">Exit</span>
                    <strong className="text-danger-text font-bold">-{row.exits}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-surface-highlight">
          <h2 className="text-base font-semibold text-primary">{t('reports.admin_reports_membership.text_fd05c3efa5')}</h2>
          <p className="text-xs text-secondary mt-0.5">{t('reports.admin_reports_membership.text_e044ab4747')}</p>
        </div>
        <div className="max-h-[640px] overflow-auto">
          <table data-admin-responsive-table className="w-full text-sm">
            <thead>
              <tr className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
                {TABLE_HEADERS.map((h, hIdx) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap ${
                      hIdx === 0 ? 'sticky start-0 z-30 bg-surface-highlight border-e border-border' : ''
                    }`}
                  >
                    {t(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.membershipGrowth.length === 0 ? (
                <tr><td colSpan={TABLE_COLUMN_COUNT}><AdminSalesMembershipGrowthReportEmptyState title={t('reports.admin_reports_membership.emptyTitle')} description={t('reports.admin_reports_membership.emptyDescription')} /></td></tr>
              ) : reportData.membershipGrowth.map((row , __testIdIndex41) => (
                <tr key={row.gymId} className="hover:bg-surface-hover transition-colors group">
                  <td className="px-5 py-4 text-sm font-semibold text-primary sticky start-0 z-10 bg-card border-e border-border">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/frontend_admin/admin_gyms/gyms_branches_directory?search=${encodeURIComponent(row.gymName)}`}
                        className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                        title={`View ${row.gymName} in Branches Directory`}
                      >
                        {row.gymName}
                      </Link>
                      <CopyButton text={row.gymName} label="Copy gym name" />
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-primary whitespace-nowrap">{formatNumber(row.activeMembers, locale)}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-bg text-success-text" data-testid={`admin_sales-adminreportsmembership-status-1-map41-${__testIdIndex41}-1`}>+{row.newMembers}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info-bg text-info-text" data-testid={`admin_sales-adminreportsmembership-status-2-map41-${__testIdIndex41}-2`}>{row.renewals}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-danger-bg text-danger-text" data-testid={`admin_sales-adminreportsmembership-status-3-map41-${__testIdIndex41}-3`}>-{row.exits}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${row.netGrowth >= 0 ? 'bg-success-bg text-success-text' : 'bg-danger-bg text-danger-text'}`} data-testid={`admin_sales-adminreportsmembership-status-4-map41-${__testIdIndex41}-4`}>
                      {row.netGrowth >= 0 ? '+' : ''}{row.netGrowth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-surface-highlight border-t-2 border-border font-bold">
                <td className="px-5 py-3 text-sm text-primary sticky start-0 z-10 bg-surface-highlight border-e border-border">{t('reports.admin_reports_membership.text_b25928c699')}</td>
                <td className="px-5 py-3 text-sm text-primary whitespace-nowrap">
                  {formatNumber(reportData.membershipGrowth.reduce((s: number, r) => s + r.activeMembers, 0), locale)}
                </td>
                <td className="px-5 py-3 text-sm text-success whitespace-nowrap">
                  +{reportData.membershipGrowth.reduce((s: number, r) => s + r.newMembers, 0)}
                </td>
                <td className="px-5 py-3 text-sm text-info whitespace-nowrap">
                  {reportData.membershipGrowth.reduce((s: number, r) => s + r.renewals, 0)}
                </td>
                <td className="px-5 py-3 text-sm text-danger whitespace-nowrap">
                  -{reportData.membershipGrowth.reduce((s: number, r) => s + r.exits, 0)}
                </td>
                <td className="px-5 py-3 text-sm text-success whitespace-nowrap">
                  +{reportData.membershipGrowth.reduce((s: number, r) => s + r.netGrowth, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
