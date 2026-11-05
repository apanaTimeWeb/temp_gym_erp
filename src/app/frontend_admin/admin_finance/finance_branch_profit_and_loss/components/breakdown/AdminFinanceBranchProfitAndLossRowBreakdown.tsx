"use client";
// RESPONSIBILITY: Renders the inline branch breakdown panel that expands inside the P&L table row.
// DATA FLOW: feature data/state and user input → AdminFinanceBranchProfitAndLossRowBreakdown → accessible UI/events routed to owning hooks (admin_finance/finance_branch_profit_and_loss/components/breakdown/AdminFinanceBranchProfitAndLossRowBreakdown.tsx)

import { useLocale, useTranslations } from 'next-intl';
// Shows revenue source split + expense category split + MoM delta context. No API calls.

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AdminFinancePnlBreakdownBar from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/components/breakdown/AdminFinanceBranchProfitAndLossBreakdownBar';
import type { BranchPnlRecord } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';
import { FINANCE_EXPENSE_BREAKDOWN_ITEMS, FINANCE_REVENUE_BREAKDOWN_ITEMS } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/constants/AdminFinanceBranchProfitAndLossConstants';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossFormatCurrency';
import { formatPercent1dp } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossFormatters';

import type { AdminFinancePnlRowBreakdownProps } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossRowBreakdownPropsTypes';


/**
 * AdminFinanceBranchProfitAndLossRowBreakdown renders the admin finance pnl row breakdown UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceBranchProfitAndLossRowBreakdown: Renders the inline branch breakdown panel that expands inside the P&L table row.
 * @dependencies Consumes AdminFinancePnlBreakdownBar, AdminFinanceTypes, AdminFinanceConstants, AdminFinanceFormatCurrency, AdminFinanceFormatters.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceBranchProfitAndLossRowBreakdown({ branch, colSpan, detailsId }: AdminFinancePnlRowBreakdownProps) {
  const locale = useLocale();
  const t = useTranslations();

  const { revenueBreakdown: rev, expenseBreakdown: exp, momDelta, netProfit, revenue, expenses } = branch;

  const revItems = FINANCE_REVENUE_BREAKDOWN_ITEMS.map((item) => ({ label: t(item.labelKey), value: rev[item.key] }));
  const expItems = FINANCE_EXPENSE_BREAKDOWN_ITEMS.map((item) => ({ label: t(item.labelKey), value: exp[item.key] }));

  const MomIcon = momDelta > 0 ? TrendingUp : momDelta < 0 ? TrendingDown : Minus;
  const momColor = momDelta > 0 ? 'text-success' : momDelta < 0 ? 'text-danger' : 'text-secondary';

  return (
    <tr id={detailsId}>
      <td colSpan={colSpan} className="bg-input border-b border-border px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Revenue Breakdown */}
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">{t('finance.AdminFinancePnlRowBreakdown.text_de2968d33b')}</p>
            <div className="space-y-2.5">
              {revItems.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-secondary">{item.label}</span>
                    <span className="text-primary font-medium">{AdminFinanceFormatCurrency(item.value, undefined, locale)}</span>
                  </div>
                  <AdminFinancePnlBreakdownBar value={item.value} max={revenue} colorClass="success" />
                </div>
              ))}
            </div>
          </div>

          {/* Expense Breakdown */}
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">{t('finance.AdminFinancePnlRowBreakdown.text_06fccc1c0e')}</p>
            <div className="space-y-2.5">
              {expItems.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-secondary">{item.label}</span>
                    <span className="text-primary font-medium">{AdminFinanceFormatCurrency(item.value, undefined, locale)}</span>
                  </div>
                  <AdminFinancePnlBreakdownBar value={item.value} max={expenses} colorClass="danger" />
                </div>
              ))}
            </div>
          </div>

          {/* Summary Panel */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">{t('finance.AdminFinancePnlRowBreakdown.text_3ce4d2eff4')}</p>
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-secondary">{t('finance.AdminFinancePnlRowBreakdown.text_f3a8370f38')}</span>
                <span className="text-sm font-semibold text-success">{AdminFinanceFormatCurrency(revenue, undefined, locale)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-secondary">{t('finance.AdminFinancePnlRowBreakdown.text_750134b65d')}</span>
                <span className="text-sm font-semibold text-danger">{AdminFinanceFormatCurrency(expenses, undefined, locale)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="text-xs font-bold text-primary">{t('finance.AdminFinancePnlRowBreakdown.text_8bebc63cc9')}</span>
                <span className={`text-sm font-bold ${netProfit >= 0 ? 'text-success' : 'text-danger'}`}>
                  {AdminFinanceFormatCurrency(netProfit, undefined, locale)}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-border pt-3">
                <span className="text-xs text-secondary">{t('finance.AdminFinancePnlRowBreakdown.text_b059c52693')}</span>
                <div className={`flex items-center gap-1 text-xs font-semibold ${momColor}`}>
                  <MomIcon size={18} strokeWidth={2} />
                  {momDelta > 0 ? '+' : ''}{formatPercent1dp(momDelta, locale)}%
                </div>
              </div>
            </div>
          </div>

        </div>
      </td>
    </tr>
  );
}
