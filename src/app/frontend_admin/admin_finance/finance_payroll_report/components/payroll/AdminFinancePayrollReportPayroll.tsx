"use client";
// RESPONSIBILITY: Renders the Payroll summary report tab — staff count, total payroll, paid, pending, advances per gym.
// DATA FLOW: feature data/state and user input → AdminFinancePayrollReportPayroll → accessible UI/events routed to owning hooks (admin_finance/finance_payroll_report/components/payroll/AdminFinancePayrollReportPayroll.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { AdminFinancePayrollReportFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_payroll_report/utils/AdminFinancePayrollReportFormatCurrency';

import { useAdminFinancePayrollReportLogic } from '@/app/frontend_admin/admin_finance/finance_payroll_report/hooks/useAdminFinancePayrollReportLogic';
import AdminReportsSectionState from '@/app/frontend_admin/admin_finance/finance_payroll_report/components/main_view/AdminFinancePayrollReportSectionState';
import { AdminFinancePayrollReportEmptyState as AdminReportsEmptyState } from '@/app/frontend_admin/admin_finance/finance_payroll_report/components/empty_state/AdminFinancePayrollReportEmptyState';

/**
 * AdminFinancePayrollReportPayroll renders the admin reports payroll UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePayrollReportPayroll: Renders the Payroll summary report tab — staff count, total payroll, paid, pending, advances per gym.
 * @dependencies Consumes AdminFinancePayrollReportFormatCurrency, useAdminFinancePayrollReportLogic, AdminReportsEmptyState.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePayrollReportPayroll() {
  const locale = useLocale();
  const t = useTranslations();

  const { reportData, status, retryReport } = useAdminFinancePayrollReportLogic();
  if (status !== 'success') return <AdminReportsSectionState status={status as 'pending' | 'success' | 'error'} onRetry={retryReport} />;
  if (!reportData) return null;

  const totalPayroll = reportData.payrollSummary.reduce((s: number, r) => s + r.totalPayroll, 0);
  const totalPaid = reportData.payrollSummary.reduce((s: number, r) => s + r.paid, 0);
  const totalPending = reportData.payrollSummary.reduce((s: number, r) => s + r.pending, 0);
  const totalAdvances = reportData.payrollSummary.reduce((s: number, r) => s + r.advances, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('reports.AdminAuditRepair.totalPayroll'), value: AdminFinancePayrollReportFormatCurrency(totalPayroll, undefined, locale), color: 'text-primary' },
          { label: t('reports.AdminAuditRepair.paid'), value: AdminFinancePayrollReportFormatCurrency(totalPaid, undefined, locale), color: 'text-success' },
          { label: t('reports.AdminAuditRepair.pending'), value: AdminFinancePayrollReportFormatCurrency(totalPending, undefined, locale), color: 'text-danger' },
          { label: t('reports.AdminAuditRepair.advances'), value: AdminFinancePayrollReportFormatCurrency(totalAdvances, undefined, locale), color: 'text-warning' },
        ].map(card => (
          <div key={card.label} className="bg-card rounded-xl border border-border p-4">
            <p className="text-xs font-medium text-secondary uppercase tracking-wider">{card.label}</p>
            <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Payroll Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">{t('reports.admin_finance_payroll_report.text_86bb288973')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {['reports.AdminAuditRepair.gym', 'reports.AdminAuditRepair.staffCount', 'reports.AdminAuditRepair.totalPayroll', 'reports.AdminAuditRepair.paid', 'reports.AdminAuditRepair.pending', 'reports.AdminAuditRepair.advances', 'reports.AdminAuditRepair.status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">{t(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.payrollSummary.length === 0 ? (
                <tr><td colSpan={7}><AdminReportsEmptyState title={t('reports.admin_finance_payroll_report.text_9062d7cc94')} description={t('reports.admin_finance_payroll_report.auto_2a76b3d03a')} /></td></tr>
              ) : reportData.payrollSummary.map((row , __testIdIndex62) => (
                <tr key={row.gymId} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-5 py-4 text-sm font-semibold text-primary">{row.gymName}</td>
                  <td className="px-5 py-4 text-sm text-primary">{row.totalStaff}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-primary">{AdminFinancePayrollReportFormatCurrency(row.totalPayroll, undefined, locale)}</td>
                  <td className="px-5 py-4 text-sm text-success">{AdminFinancePayrollReportFormatCurrency(row.paid, undefined, locale)}</td>
                  <td className="px-5 py-4 text-sm text-danger">{AdminFinancePayrollReportFormatCurrency(row.pending, undefined, locale)}</td>
                  <td className="px-5 py-4 text-sm text-warning">{AdminFinancePayrollReportFormatCurrency(row.advances, undefined, locale)}</td>
                  <td className="px-5 py-4">
                    {row.pending === 0
                      ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success text-on-success" data-testid={`admin_reports-adminreportspayroll-status-1-map62-${__testIdIndex62}-1`}>{t('reports.admin_finance_payroll_report.text_3aab2cfaf7')}</span>
                      : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-warning-bg text-warning" data-testid={`admin_reports-adminreportspayroll-status-2-map62-${__testIdIndex62}-2`}>{t('reports.admin_finance_payroll_report.text_96f608c16c')}</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
