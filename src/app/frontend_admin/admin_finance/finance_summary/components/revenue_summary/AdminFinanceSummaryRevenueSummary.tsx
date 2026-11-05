"use client";
// RESPONSIBILITY: Provides the implementation for AdminFinanceRevenueSummary.tsx functionality within its module.
// DATA FLOW: feature data/state and user input → AdminFinanceOverviewRevenueSummary → accessible UI/events routed to owning hooks (admin_finance/finance_summary/components/revenue_summary/AdminFinanceOverviewRevenueSummary.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_summary/utils/AdminFinanceSummaryFormatCurrency';

import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_summary/hooks/useAdminFinanceSummaryLogic';
import AdminNavigationLayoutProgressBar from '@/app/frontend_admin/admin_finance/finance_summary/components/progress_bar/AdminFinanceSummaryProgressBar';


/**
 * AdminFinanceOverviewRevenueSummary renders the admin finance revenue summary UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceOverviewRevenueSummary: Provides the implementation for AdminFinanceRevenueSummary.tsx functionality within its module.
 * @dependencies Consumes AdminFinanceFormatCurrency, useAdminFinanceLogic, AdminNavigationLayoutProgressBar.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceOverviewRevenueSummary() {
  const t = useTranslations();
  const locale = useLocale();
  const { summary, summaryStatus, loadAll } = useAdminFinanceLogic();

  return (
    <section
      data-testid="admin_finance-admin_finance-revenue-summary"
      aria-labelledby="admin-finance-revenue-summary-heading"
      className="p-4 bg-card rounded-xl border border-border shadow-card"
    >
      <h3 id="admin-finance-revenue-summary-heading" className="font-semibold text-primary">
        {t('finance.admin_finance_revenue_summary.text_ad2e428a29')}
      </h3>

      {summaryStatus === 'pending' && (
        <p role="status" className="mt-3 text-sm text-secondary" data-testid="finance-overview-finance-overview-revenue-summary-status-region">
          {t('finance.admin_finance_revenue_summary.text_loading')}
        </p>
      )}

      {summaryStatus === 'error' && (
        <div role="alert" className="mt-3 rounded-lg border border-border bg-danger-bg p-4">
          <p className="text-sm text-danger">{t('finance.admin_finance_tabs.financeLoadError')}</p>
          <button
            type="button"
            onClick={() => void loadAll()}
            className="mt-3 min-h-11 rounded-lg border border-border px-4 font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
           data-testid="finance-overview-finance-overview-revenue-summary-admin-finance-tabs-retry">
            {t('finance.admin_finance_tabs.retry')}
          </button>
        </div>
      )}

      {summaryStatus === 'success' && (!summary || summary.monthlyData.length === 0) && (
        <p role="status" className="mt-3 text-sm text-secondary" data-testid="finance-overview-finance-overview-revenue-summary-status-region-2">
          {t('finance.admin_finance_tabs.summaryUnavailable')}
        </p>
      )}

      {summaryStatus === 'success' && summary && summary.monthlyData.length > 0 && (
        <div className="mt-3 space-y-2">
          {summary.monthlyData.map((item) => {
            const max = Math.max(...summary.monthlyData.map((entry) => entry.revenue), 1);
            return (
              <div key={item.month} className="flex items-center gap-3">
                <span className="w-20 text-xs text-secondary">{item.month}</span>
                <div className="min-w-0 flex-1">
                  <AdminNavigationLayoutProgressBar
                    value={(item.revenue / max) * 100}
                    label={t('admin_finance_revenue_summary.auto_revenueShare', { month: item.month })}
                  />
                  {item.revenue > 0 && (
                    <span className="text-xs font-medium text-primary">
                      {AdminFinanceFormatCurrency(item.revenue, 'INR', locale)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
