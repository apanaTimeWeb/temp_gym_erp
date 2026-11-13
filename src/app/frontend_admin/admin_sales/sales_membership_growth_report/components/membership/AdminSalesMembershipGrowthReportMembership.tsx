"use client";
// RESPONSIBILITY: Renders the Membership Growth report tab — new members, renewals, exits, net growth per gym.
// DATA FLOW: feature data/state and user input → AdminSalesMembershipGrowthReportAnalyticsMembership → accessible UI/events routed to owning hooks (admin_sales/sales_membership_growth_report/components/membership/AdminSalesMembershipGrowthReportAnalyticsMembership.tsx)

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { formatNumber } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/utils/AdminSalesMembershipGrowthReportFormatters';

import { useAdminSalesMembershipGrowthReportLogic } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/hooks/useAdminSalesMembershipGrowthReportLogic';
import AdminSalesMembershipGrowthReportSectionState from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/components/main_view/AdminSalesMembershipGrowthReportSectionState';
import { AdminSalesMembershipGrowthReportAnalyticsEmptyState as AdminSalesMembershipGrowthReportEmptyState } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/components/empty_state/AdminSalesMembershipGrowthReportEmptyState';

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
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> New Members</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Renewals</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Exits</span>
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
                    <span className="text-xs font-bold text-primary truncate">{row.gymName}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${row.netGrowth >= 0 ? 'bg-success-bg text-success-text' : 'bg-danger-bg text-danger-text'}`}>
                      {row.netGrowth >= 0 ? '+' : ''}{row.netGrowth} net
                    </span>
                  </div>
                  <div className="text-xs text-secondary mb-2.5">
                    Active: <strong className="text-primary">{formatNumber(row.activeMembers, locale)}</strong>
                  </div>
                  
                  {/* Visual Segmented bar */}
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden flex mb-2">
                    <div style={{ width: `${newPct}%` }} className="bg-emerald-500 h-full transition-all" title={`New: ${row.newMembers}`} />
                    <div style={{ width: `${renewalPct}%` }} className="bg-blue-500 h-full transition-all" title={`Renewals: ${row.renewals}`} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-border text-center text-[11px]">
                  <div>
                    <span className="text-secondary block">New</span>
                    <strong className="text-emerald-600 font-bold">+{row.newMembers}</strong>
                  </div>
                  <div>
                    <span className="text-secondary block">Renew</span>
                    <strong className="text-blue-600 font-bold">{row.renewals}</strong>
                  </div>
                  <div>
                    <span className="text-secondary block">Exit</span>
                    <strong className="text-rose-600 font-bold">-{row.exits}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">{t('reports.admin_reports_membership.text_fd05c3efa5')}</h2>
          <p className="text-xs text-secondary mt-0.5">{t('reports.admin_reports_membership.text_e044ab4747')}</p>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {['reports.AdminAuditRepair.gym', 'reports.AdminAuditRepair.activeMembers', 'reports.AdminAuditRepair.newMembers', 'reports.AdminAuditRepair.renewals', 'reports.AdminAuditRepair.exits', 'reports.AdminAuditRepair.netGrowth'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">{t(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.membershipGrowth.length === 0 ? (
                <tr><td colSpan={6}><AdminSalesMembershipGrowthReportEmptyState title={t('reports.admin_reports_membership.emptyTitle')} description={t('reports.admin_reports_membership.emptyDescription')} /></td></tr>
              ) : reportData.membershipGrowth.map((row , __testIdIndex41) => (
                <tr key={row.gymId} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-5 py-4 text-sm font-semibold text-primary">{row.gymName}</td>
                  <td className="px-5 py-4 text-sm text-primary">{formatNumber(row.activeMembers, locale)}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-bg text-success-text" data-testid={`admin_sales-adminreportsmembership-status-1-map41-${__testIdIndex41}-1`}>+{row.newMembers}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info-bg text-info-text" data-testid={`admin_sales-adminreportsmembership-status-2-map41-${__testIdIndex41}-2`}>{row.renewals}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-danger-bg text-danger-text" data-testid={`admin_sales-adminreportsmembership-status-3-map41-${__testIdIndex41}-3`}>-{row.exits}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${row.netGrowth >= 0 ? 'bg-success-bg text-success-text' : 'bg-danger-bg text-danger-text'}`} data-testid={`admin_sales-adminreportsmembership-status-4-map41-${__testIdIndex41}-4`}>
                      {row.netGrowth >= 0 ? '+' : ''}{row.netGrowth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-surface-highlight border-t-2 border-border">
                <td className="px-5 py-3 text-sm font-bold text-primary">{t('reports.admin_reports_membership.text_b25928c699')}</td>
                <td className="px-5 py-3 text-sm font-bold text-primary">
                  {formatNumber(reportData.membershipGrowth.reduce((s: number, r) => s + r.activeMembers, 0), locale)}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-success">
                  +{reportData.membershipGrowth.reduce((s: number, r) => s + r.newMembers, 0)}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-info">
                  {reportData.membershipGrowth.reduce((s: number, r) => s + r.renewals, 0)}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-danger">
                  -{reportData.membershipGrowth.reduce((s: number, r) => s + r.exits, 0)}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-success">
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
