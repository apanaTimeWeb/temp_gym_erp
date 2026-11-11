"use client";
// RESPONSIBILITY: Renders one formatted monetary cell in the payouts P&L statement.
// DATA FLOW: feature data/state and user input → AdminFinancePayoutsManagementPnLStatementCell → accessible UI/events routed to owning hooks (admin_finance/finance_payouts_management/components/pnl_statement/AdminFinancePayoutsManagementPnLStatementCell.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { AdminPayoutsFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_payouts_management/utils/AdminFinancePayoutsManagementFormatCurrency';
import type { AdminPayoutsPnLStatementCellProps } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementPnLStatementCellPropsTypes';

export default function AdminFinancePayoutsManagementPnLStatementCell({ value, tone = 'text-primary' }: AdminPayoutsPnLStatementCellProps) {
  const locale = useLocale();
  const formatted = typeof value === 'number' ? AdminPayoutsFormatCurrency(value, 'INR', locale) : '—';
  return <td className={`px-4 py-3 text-sm ${tone}`}><span>{formatted !== '—' ? formatted : (Number.isFinite(value) ? `₹${value.toLocaleString(locale)}` : '—')}</span></td>;
}
