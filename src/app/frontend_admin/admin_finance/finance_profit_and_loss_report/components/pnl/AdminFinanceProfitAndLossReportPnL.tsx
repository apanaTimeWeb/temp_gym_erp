"use client";
// RESPONSIBILITY: Renders the P&L (Profit & Loss) report tab — full breakdown per gym with margin indicators.
// DATA FLOW: feature data/state and user input → AdminFinanceProfitAndLossReportPnL → accessible UI/events routed to owning hooks (admin_finance/finance_profit_and_loss_report/components/pnl/AdminFinanceProfitAndLossReportPnL.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { AdminFinanceProfitAndLossReportFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/utils/AdminFinanceProfitAndLossReportFormatCurrency';
import { formatPercent1dp } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/utils/AdminFinanceProfitAndLossReportFormatters';

import { useAdminFinanceProfitAndLossReportLogic } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/hooks/useAdminFinanceProfitAndLossReportLogic';
import AdminReportsSectionState from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/main_view/AdminFinanceProfitAndLossReportSectionState';
import { AdminFinanceProfitAndLossReportEmptyState as AdminReportsEmptyState } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/empty_state/AdminFinanceProfitAndLossReportEmptyState';
import AdminNavigationLayoutProgressBar from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/progress_bar/AdminFinanceProfitAndLossReportProgressBar';

/**
 * AdminFinanceProfitAndLossReportPnL renders the admin reports pn l UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceProfitAndLossReportPnL: Renders the P&L (Profit & Loss) report tab — full breakdown per gym with margin indicators.
 * @dependencies Consumes AdminFinanceProfitAndLossReportFormatCurrency, AdminReportsFormatters, useAdminFinanceProfitAndLossReportLogic, AdminReportsEmptyState, AdminNavigationLayoutProgressBar.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceProfitAndLossReportPnL() {
  const locale = useLocale();
  const t = useTranslations();

  const { reportData, status, retryReport } = useAdminFinanceProfitAndLossReportLogic();
  if (status !== 'success') return <AdminReportsSectionState status={status as 'pending' | 'success' | 'error'} onRetry={retryReport} />;
  if (!reportData) return null;

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">{t('reports.admin_finance_profit_and_loss_report.text_abc7e55ec9')}</h2>
          <p className="text-xs text-secondary mt-0.5">{t('reports.admin_finance_profit_and_loss_report.text_c51b793f71')}</p>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {['reports.AdminAuditRepair.gym', 'reports.AdminAuditRepair.totalRevenue', 'reports.AdminAuditRepair.membershipRevenue', 'reports.AdminAuditRepair.storeRevenue', 'reports.AdminAuditRepair.staffCost', 'reports.AdminAuditRepair.operationalCost', 'reports.AdminAuditRepair.totalExpenses', 'reports.AdminAuditRepair.netProfit', 'reports.AdminAuditRepair.margin'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{t(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.pnlSummary.length === 0 ? (
                <tr><td colSpan={9}><AdminReportsEmptyState title={t('reports.admin_finance_profit_and_loss_report.emptyTitle')} description={t('reports.admin_finance_profit_and_loss_report.emptyDescription')} /></td></tr>
              ) : reportData.pnlSummary.map((row) => (
                <tr key={row.gymId} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-4 py-4 text-sm font-semibold text-primary whitespace-nowrap">{row.gymName}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-primary">{AdminFinanceProfitAndLossReportFormatCurrency(row.revenue, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm text-primary">{AdminFinanceProfitAndLossReportFormatCurrency(row.membershipRevenue, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm text-primary">{AdminFinanceProfitAndLossReportFormatCurrency(row.storeRevenue, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm text-danger">{AdminFinanceProfitAndLossReportFormatCurrency(row.staffCost, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm text-danger">{AdminFinanceProfitAndLossReportFormatCurrency(row.operationalCost, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-danger">{AdminFinanceProfitAndLossReportFormatCurrency(row.totalExpenses, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm font-bold text-success">{AdminFinanceProfitAndLossReportFormatCurrency(row.netProfit, undefined, locale)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16">
                        <AdminNavigationLayoutProgressBar value={row.profitMargin} label={t('reports.admin_finance_profit_and_loss_report.auto_profitMargin', { gym: row.gymName })} variant="success" />
                      </div>
                      <span className={`text-xs font-bold ${row.profitMargin >= 60 ? 'text-success' : row.profitMargin >= 40 ? 'text-warning' : 'text-danger'}`}>
                        {formatPercent1dp(row.profitMargin, locale)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {reportData.pnlSummary.length > 0 && <tfoot>
              <tr className="bg-surface-highlight border-t-2 border-border">
                <td className="px-4 py-3 text-sm font-bold text-primary">{t('reports.admin_finance_profit_and_loss_report.text_b25928c699')}</td>
                <td className="px-4 py-3 text-sm font-bold text-primary">{AdminFinanceProfitAndLossReportFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.revenue, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-primary">{AdminFinanceProfitAndLossReportFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.membershipRevenue, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-primary">{AdminFinanceProfitAndLossReportFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.storeRevenue, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger">{AdminFinanceProfitAndLossReportFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.staffCost, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger">{AdminFinanceProfitAndLossReportFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.operationalCost, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger">{AdminFinanceProfitAndLossReportFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.totalExpenses, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-success">{AdminFinanceProfitAndLossReportFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.netProfit, 0), undefined, locale)}</td>
                <td className="px-4 py-3" />
              </tr>
            </tfoot>}
          </table>
        </div>
      </div>
    </div>
  );
}
