"use client";
// RESPONSIBILITY: Shows revenue grouped by the payment methods defined in the owning Finance module.
// DATA FLOW: feature data/state and user input → AdminFinanceOverviewRevenueByMethod → accessible UI/events routed to owning hooks (admin_finance/finance_summary/components/revenue_by_method/AdminFinanceOverviewRevenueByMethod.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_summary/utils/AdminFinanceSummaryFormatCurrency';
import { FINANCE_PAYMENT_METHOD_LABEL_KEYS } from '@/app/frontend_admin/admin_finance/finance_summary/constants/AdminFinanceSummaryConstants';
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_summary/hooks/useAdminFinanceSummaryLogic';

/**
 * @description AdminFinanceOverviewRevenueByMethod renders the FinanceOverviewRevenueByMethod interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminFinanceOverviewRevenueByMethod() {
  const locale = useLocale();
  const t = useTranslations();
  const { summary, summaryStatus } = useAdminFinanceLogic();
  if (!summary || summaryStatus === 'error') return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {Object.entries(summary.revenueByMethod).map(([method, amount]) => (
        <div key={method} className="rounded-xl p-4 shadow-card border border-border bg-card">
          <p className="text-xs mb-1 text-secondary">{t(FINANCE_PAYMENT_METHOD_LABEL_KEYS[method] ?? 'finance.AdminAuditRepair.other')}</p>
          <p className="text-lg font-bold text-primary">{AdminFinanceFormatCurrency(Number(amount) || 0, undefined, locale)}</p>
        </div>
      ))}
    </div>
  );
}
