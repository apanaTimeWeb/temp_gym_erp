"use client";
// RESPONSIBILITY: Renders the sortable branch-wise P&L comparison table with
// DATA FLOW: feature data/state and user input → AdminFinanceBranchProfitAndLossTable → accessible UI/events routed to owning hooks (admin_finance/finance_branch_profit_and_loss/components/table/AdminFinanceBranchProfitAndLossTable.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { Fragment } from 'react';
// clickable row expansion. Handles sorting indicators and inline breakdown toggle.

import { ChevronRight } from 'lucide-react';
import { PNL_TABLE_HEADERS, PNL_STATUS_CONFIG } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/constants/AdminFinanceBranchProfitAndLossConstants';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossFormatCurrency';
import { formatPercent1dp } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossFormatters';
import AdminFinancePnlRowBreakdown from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/components/breakdown/AdminFinanceBranchProfitAndLossRowBreakdown';
import AdminFinancePnlTableSortIcon from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/components/table/AdminFinanceBranchProfitAndLossTableSortIcon';
import AdminFinancePnlEmptyState from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/components/empty_state/AdminFinanceBranchProfitAndLossEmptyState';
import type {
  BranchPnlRecord,
  PnlSortKey,
  PnlSortDirection,
  PnlStatusFilter,
} from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';

import type { AdminFinancePnlTableProps } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTablePropsTypes';

const TOTAL_COLS = PNL_TABLE_HEADERS.length;

/**
 * AdminFinanceBranchProfitAndLossTable renders the admin finance pnl table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceBranchProfitAndLossTable: Renders the sortable branch-wise P&L comparison table with
 * @dependencies Consumes AdminFinanceConstants, AdminFinanceFormatCurrency, AdminFinanceFormatters, AdminFinancePnlRowBreakdown, AdminFinancePnlTableSortIcon.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceBranchProfitAndLossTable({
  data,
  sortKey,
  sortDir,
  onSort,
  expandedBranchId,
  onToggleExpand,
  statusFilter,
  onResetFilter,
}: AdminFinancePnlTableProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-highlight border-b border-border">
              {PNL_TABLE_HEADERS.map((h , __testIdIndex50) => (
                <th
                  key={h.key}
                  className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap"
                  aria-sort={h.sortable && sortKey === h.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                 data-testid={`admin_finance-admin_finance-pnl-table-header-map50-${__testIdIndex50}`}>
                  {h.sortable ? (
                    <button type="button" onClick={() => onSort(h.key as PnlSortKey)} className="inline-flex min-h-11 items-center gap-1.5 rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="finance-pnl-report-finance-pnl-report-table-on-sort">
                      {t(h.labelKey)}
                      <AdminFinancePnlTableSortIcon column={h.key} sortKey={sortKey} sortDir={sortDir} />
                    </button>
                  ) : <span>{t(h.labelKey)}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <AdminFinancePnlEmptyState statusFilter={statusFilter} onReset={onResetFilter} />
            ) : (
              data.map((branch , __testIdIndex77) => {
                const isExpanded = expandedBranchId === branch.branchId;
                const detailsId = `admin-finance-pnl-breakdown-${encodeURIComponent(branch.branchId)}`;
                const statusCfg = PNL_STATUS_CONFIG[branch.status];
                const profitColor = branch.netProfit >= 0 ? 'text-success' : 'text-danger';
                const momColor = branch.momDelta > 0 ? 'text-success' : branch.momDelta < 0 ? 'text-danger' : 'text-secondary';

                return (
                  <Fragment key={branch.branchId}>
                    <tr
                      className={`group motion-safe:transition-colors ${
                        isExpanded ? 'bg-surface-highlight' : 'hover:bg-input'
                      }`}
                     data-testid={`admin_finance-admin_finance-pnl-table-row-map77-${__testIdIndex77}`}>

                      {/* Branch Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0`}>
                            {branch.branchName.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-primary truncate">{branch.branchName}</p>
                            <p className="text-xs text-disabled truncate">{branch.location}</p>
                          </div>
                        </div>
                      </td>

                      {/* Revenue */}
                      <td className="px-4 py-3.5 text-sm font-medium text-success text-right">
                        {AdminFinanceFormatCurrency(branch.revenue, undefined, locale)}
                      </td>

                      {/* Expenses */}
                      <td className="px-4 py-3.5 text-sm font-medium text-danger text-right">
                        {AdminFinanceFormatCurrency(branch.expenses, undefined, locale)}
                      </td>

                      {/* Net Profit */}
                      <td className={`px-4 py-3.5 text-sm font-bold text-right ${profitColor}`}>
                        {AdminFinanceFormatCurrency(branch.netProfit, undefined, locale)}
                      </td>

                      {/* Margin % */}
                      <td className={`px-4 py-3.5 text-sm font-semibold text-right ${profitColor}`}>
                        {formatPercent1dp(branch.marginPct, locale)}%
                      </td>

                      {/* MoM Delta */}
                      <td className={`px-4 py-3.5 text-xs font-semibold text-right ${momColor}`}>
                        {branch.momDelta > 0 ? '+' : ''}{formatPercent1dp(branch.momDelta, locale)}%
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusCfg.bgClass} ${statusCfg.textClass}`} data-testid="finance-pnl-report-finance-pnl-report-table-status-badge">
                          {t(statusCfg.labelKey)}
                        </span>
                      </td>

                      {/* Expand Toggle */}
                      <td className="px-4 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => onToggleExpand(branch.branchId)}
                          aria-expanded={isExpanded}
                          aria-controls={isExpanded ? detailsId : undefined}
                          aria-label={`${t(isExpanded ? 'finance.AdminFinancePnlTable.collapseBranch' : 'finance.AdminFinancePnlTable.expandBranch')} — ${branch.branchName}`}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                          data-testid={`admin_finance-admin_finance-pnl-table-expand-${branch.branchId}`}
                        >
                          <ChevronRight size={18} aria-hidden="true" strokeWidth={2} className={`text-secondary motion-safe:transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                      </td>
                    </tr>

                    {/* Inline Breakdown Row */}
                    {isExpanded && (
                      <AdminFinancePnlRowBreakdown
                        branch={branch}
                        colSpan={TOTAL_COLS}
                        detailsId={detailsId}
                      />
                    )}
                  </Fragment>
                );
              })
            )}
          </tbody>

          {/* Footer Totals Row */}
          {data.length > 0 && (
            <tfoot>
              <tr className="bg-surface-highlight border-t-2 border-border">
                <td className="px-4 py-3 text-xs font-bold text-secondary uppercase tracking-wider">
                  {new Intl.NumberFormat(locale).format(data.length)} {t('finance.AdminFinancePnlTable.text_1627510b24')} {t('finance.AdminFinancePnlTable.text_b25928c699')}</td>
                <td className="px-4 py-3 text-sm font-bold text-success text-right">
                  {AdminFinanceFormatCurrency(data.reduce((s, b) => s + b.revenue, 0), undefined, locale)}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-danger text-right">
                  {AdminFinanceFormatCurrency(data.reduce((s, b) => s + b.expenses, 0), undefined, locale)}
                </td>
                <td className={`px-4 py-3 text-sm font-bold text-right ${
                  data.reduce((s, b) => s + b.netProfit, 0) >= 0 ? 'text-success' : 'text-danger'
                }`}>
                  {AdminFinanceFormatCurrency(data.reduce((s, b) => s + b.netProfit, 0), undefined, locale)}
                </td>
                <td className="px-4 py-3 text-xs text-secondary text-right" colSpan={4}>
                  {t('finance.AdminFinancePnlTable.text_a0c2a342bf')}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
