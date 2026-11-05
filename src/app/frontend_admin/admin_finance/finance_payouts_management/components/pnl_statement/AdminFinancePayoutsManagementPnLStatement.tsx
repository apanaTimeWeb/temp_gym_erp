"use client";
// RESPONSIBILITY: Renders the tax-ready P&L statement with semantic sortable headers and independent loading/error states.
// DATA FLOW: feature data/state and user input → AdminFinancePayoutsManagementPnLStatement → accessible UI/events routed to owning hooks (admin_finance/finance_payouts_management/components/pnl_statement/AdminFinancePayoutsManagementPnLStatement.tsx)

import { useTranslations } from 'next-intl';
import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_finance/finance_payouts_management/hooks/useAdminFinancePayoutsManagementLogic';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/AdminFinancePayoutsManagementTableSkeleton';
import AdminPayoutsPnLStatementCell from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/pnl_statement/AdminFinancePayoutsManagementPnLStatementCell';
import type { PnlSortKey } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';
import AdminPayoutsPnLStatementSortIcon from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/pnl_statement/AdminFinancePayoutsManagementPnLStatementSortIcon';
import AdminPayoutsEmptyState from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/empty_state/AdminFinancePayoutsManagementEmptyState';

/** P&L presentation stays inside the Payouts feature module. 
 * @description AdminFinancePayoutsManagementPnLStatement renders the PayoutsManagementPnLStatement interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminFinancePayoutsManagementPnLStatement() {
  const t = useTranslations();
  const logic = useAdminPayoutsLogic();
  const headers: ReadonlyArray<{ key: PnlSortKey; label: string }> = [
    { key: 'gymName', label: t('payouts.AdminAuditRepair.gym') },
    { key: 'month', label: t('payouts.AdminAuditRepair.month') },
    { key: 'revenue', label: t('payouts.AdminAuditRepair.revenue') },
    { key: 'cogs', label: t('payouts.AdminAuditRepair.cogs') },
    { key: 'grossProfit', label: t('payouts.AdminAuditRepair.grossProfit') },
    { key: 'staffCost', label: t('payouts.AdminAuditRepair.staffCost') },
    { key: 'rentUtilities', label: t('payouts.AdminAuditRepair.rentUtilities') },
    { key: 'marketing', label: t('payouts.AdminAuditRepair.marketing') },
    { key: 'miscExpenses', label: t('payouts.AdminAuditRepair.misc') },
    { key: 'ebitda', label: t('payouts.AdminAuditRepair.ebitda') },
    { key: 'tax', label: t('payouts.AdminAuditRepair.tax') },
    { key: 'netProfit', label: t('payouts.AdminAuditRepair.netProfit') },
  ];

  if (logic.pnlStatus === 'pending') return <AdminNavigationLayoutTableSkeleton rows={4} cols={headers.length} />;
  if (logic.pnlStatus === 'error') return (
    <div role="alert" className="space-y-3 rounded-xl border border-danger bg-danger-bg p-4 text-sm text-danger">
      <p>{t('payouts.AdminRepair.pnlLoadError')}</p>
      <button type="button" onClick={() => void logic.retryPnl()} className="min-h-11 rounded-lg border border-border px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="payouts-management-payouts-management-pn-l-statement-retry-pnl">{t('payouts.AdminRepair.retry')}</button>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-3">
        <p className="text-sm font-semibold text-primary">{t('payouts.admin_payouts_pnl_statement.text_587bef7062')}</p>
        <p className="mt-0.5 text-xs text-secondary">{t('payouts.admin_payouts_pnl_statement.text_b968ad7e9b')}</p>
      </div>
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full">
          <thead><tr className="border-b border-border bg-surface-highlight">
            {headers.map((header) => (
              <th key={header.key} scope="col" aria-sort={logic.pnlSortKey === header.key ? (logic.pnlSortDir === 'asc' ? 'ascending' : 'descending') : 'none'} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">
                <button type="button" onClick={() => logic.onPnlSort(header.key)} aria-label={header.label} className="inline-flex min-h-11 min-w-11 items-center gap-1.5 rounded text-left hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="payouts-management-payouts-management-pn-l-statement-on-pnl-sort">
                  <span>{header.label}</span><AdminPayoutsPnLStatementSortIcon column={header.key} sortKey={logic.pnlSortKey} sortDir={logic.pnlSortDir} />
                </button>
              </th>
            ))}
          </tr></thead>
          <tbody className="divide-y divide-border">
            {logic.pnlData.length === 0 ? <tr><td colSpan={headers.length}><AdminPayoutsEmptyState title={t('payouts.admin_payouts_pnl_statement.text_f19bc6d402')} description={t('payouts.admin_payouts_pnl_statement.auto_55e2fbeab5')} /></td></tr> : logic.pnlData.map((row) => (
              <tr key={`${row.gymId}-${row.month}`} className="motion-safe:transition-colors motion-safe:duration-base hover:bg-surface-highlight">
                <td className="px-4 py-3 text-sm font-medium text-primary">{row.gymName}</td><td className="px-4 py-3 text-sm text-secondary">{row.month}</td>
                <AdminPayoutsPnLStatementCell value={row.revenue} /><AdminPayoutsPnLStatementCell value={row.cogs} tone="text-danger" /><AdminPayoutsPnLStatementCell value={row.grossProfit} /><AdminPayoutsPnLStatementCell value={row.staffCost} tone="text-danger" /><AdminPayoutsPnLStatementCell value={row.rentUtilities} tone="text-danger" /><AdminPayoutsPnLStatementCell value={row.marketing} tone="text-danger" /><AdminPayoutsPnLStatementCell value={row.miscExpenses} tone="text-danger" /><AdminPayoutsPnLStatementCell value={row.ebitda} tone="text-info" /><AdminPayoutsPnLStatementCell value={row.tax} tone="text-danger" /><AdminPayoutsPnLStatementCell value={row.netProfit} tone="font-bold text-success" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
