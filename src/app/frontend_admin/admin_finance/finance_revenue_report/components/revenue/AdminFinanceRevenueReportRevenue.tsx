"use client";
// RESPONSIBILITY: Renders the Revenue report tab — breakdown by gym, payment method, plan, and monthly trend chart.
// DATA FLOW: feature data/state and user input → AdminFinanceRevenueReportRevenue → accessible UI/events routed to owning hooks (admin_finance/finance_revenue_report/components/revenue/AdminFinanceRevenueReportRevenue.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { AdminFinanceRevenueReportFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_revenue_report/utils/AdminFinanceRevenueReportFormatCurrency';
import { formatPercent1dp } from '@/app/frontend_admin/admin_finance/finance_revenue_report/utils/AdminFinanceRevenueReportFormatters';
import type { AdminFinanceRevenueReportSortKey } from '@/app/frontend_admin/admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportUiTypes';
import type { AdminReportsSortDirection } from '@/app/frontend_admin/admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportSortTypes';
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAdminFinanceRevenueReportLogic } from '@/app/frontend_admin/admin_finance/finance_revenue_report/hooks/useAdminFinanceRevenueReportLogic';
import AdminReportsSectionState from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/main_view/AdminFinanceRevenueReportSectionState';
import { AdminFinanceRevenueReportEmptyState as AdminReportsEmptyState } from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/empty_state/AdminFinanceRevenueReportEmptyState';
import AdminNavigationLayoutProgressBar from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/progress_bar/AdminFinanceRevenueReportProgressBar';

const TREND_ICON = {
  up: <TrendingUp size={18} className="text-success"  strokeWidth={2}/>,
  down: <TrendingDown size={18} className="text-danger"  strokeWidth={2}/>,
  flat: <Minus size={18} className="text-secondary"  strokeWidth={2}/>,
};

/**
 * AdminFinanceRevenueReportRevenue renders the admin reports revenue UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceRevenueReportRevenue: Renders the Revenue report tab — breakdown by gym, payment method, plan, and monthly trend chart.
 * @dependencies Consumes AdminFinanceRevenueReportFormatCurrency, AdminReportsFormatters, AdminReportsUiTypes, AdminReportsSortTypes, useAdminFinanceRevenueReportLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceRevenueReportRevenue() {
  const t = useTranslations();
  const revenueHeaders = [t('reports.AdminAuditRepair.gym'), t('reports.AdminAuditRepair.revenue'), t('reports.AdminAuditRepair.expenses'), t('reports.AdminAuditRepair.netProfit'), t('reports.AdminAuditRepair.margin'), t('reports.AdminAuditRepair.trend')] as const;
  const monthlyHeaders = [t('reports.AdminAuditRepair.month'), t('reports.AdminAuditRepair.revenue'), t('reports.AdminAuditRepair.expenses'), t('reports.AdminAuditRepair.netProfit'), t('reports.AdminAuditRepair.margin')] as const;
  const locale = useLocale();

  const { reportData, status, retryReport } = useAdminFinanceRevenueReportLogic();
  const [sortKey, setSortKey] = useState<AdminFinanceRevenueReportSortKey>('revenue');
  const [sortDir, setSortDir] = useState<AdminReportsSortDirection>('desc');
  type MonthlySortKey = 'month' | 'revenue' | 'expenses' | 'profit';
  const [monthlySortKey, setMonthlySortKey] = useState<MonthlySortKey>('month');
  const [monthlySortDir, setMonthlySortDir] = useState<AdminReportsSortDirection>('desc');

  const revenueByGym = useMemo(() => {
    if (!reportData) return [];
    return [...reportData.revenueByGym].sort((a,b)=>{const av=a[sortKey],bv=b[sortKey];const result=typeof av==='number'&&typeof bv==='number'?av-bv:String(av??'').localeCompare(String(bv??''),undefined,{numeric:true});return sortDir==='asc'?result:-result;});
  },[reportData,sortKey,sortDir]);
  const handleSort=(key:AdminFinanceRevenueReportSortKey)=>{if(sortKey===key)setSortDir(d=>d==='asc'?'desc':'asc');else{setSortKey(key);setSortDir('desc');}};
  const handleMonthlySort = (key: MonthlySortKey) => {
    if (monthlySortKey === key) setMonthlySortDir((direction) => direction === 'asc' ? 'desc' : 'asc');
    else { setMonthlySortKey(key); setMonthlySortDir(key === 'month' ? 'asc' : 'desc'); }
  };
  const monthlyRevenue = useMemo(() => {
    const rows = [...reportData?.monthlyRevenue ?? []];
    return rows.sort((left, right) => {
      const a = left[monthlySortKey];
      const b = right[monthlySortKey];
      const result = typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b), undefined, { numeric: true });
      return monthlySortDir === 'asc' ? result : -result;
    });
  }, [reportData?.monthlyRevenue, monthlySortKey, monthlySortDir]);
  const maxRevenue = Math.max(1, ...revenueByGym.map(g => g.revenue));

  


  if (status !== 'success') return <AdminReportsSectionState status={status as 'pending' | 'success' | 'error'} onRetry={retryReport} />;
  if (!reportData) return null;

  return (
    <div className="space-y-6">
      {/* Revenue by Gym */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">{t('reports.admin_finance_revenue_report.text_177bf7fe0c')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {revenueHeaders.map((header, index) => {
                  const keys: Array<AdminFinanceRevenueReportSortKey | null> = ['gymName', 'revenue', 'expenses', 'profit', null, 'trendPercent'];
                  const key = keys[index];
                  const active = Boolean(key && sortKey === key);
                  return (
                    <th key={header} className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider" aria-sort={key ? (active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none') : undefined} data-testid={`admin_reports-admin_reports-revenue-header-map59-${index}`}>
                      {key ? <button type="button" onClick={() => handleSort(key)} className="inline-flex min-h-11 items-center gap-1.5 rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('reports.admin_finance_revenue_report.auto_sortBy', { header })} data-testid="reports-analytics-reports-analytics-revenue-handle-sort">
                        {header}{active ? (sortDir === 'asc' ? <ChevronUp size={18} aria-hidden="true" className="text-primary" strokeWidth={2} /> : <ChevronDown size={18} aria-hidden="true" className="text-primary" strokeWidth={2} />) : <ChevronsUpDown size={18} aria-hidden="true" className="text-disabled" strokeWidth={2} />}
                      </button> : header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {revenueByGym.map((row) => (
                <tr key={row.gymId} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-semibold text-primary">{row.gymName}</p>
                      <div className="mt-1 w-32">
                        <AdminNavigationLayoutProgressBar value={(row.revenue / maxRevenue) * 100} label={t('reports.admin_finance_revenue_report.auto_revenueShare', { gym: row.gymName })} />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-primary">{AdminFinanceRevenueReportFormatCurrency(row.revenue, undefined, locale)}</td>
                  <td className="px-5 py-4 text-sm text-danger">{AdminFinanceRevenueReportFormatCurrency(row.expenses, undefined, locale)}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-success">{AdminFinanceRevenueReportFormatCurrency(row.profit, undefined, locale)}</td>
                  <td className="px-5 py-4 text-sm text-primary">{row.revenue > 0 ? `${formatPercent1dp((row.profit / row.revenue) * 100, locale)}%` : '—'}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      {TREND_ICON[row.trend as keyof typeof TREND_ICON]}
                      <span className={`text-xs font-medium ${row.trend === 'up' ? 'text-success' : row.trend === 'down' ? 'text-danger' : 'text-secondary'}`}>
                        {row.trendPercent > 0 ? '+' : ''}{row.trendPercent}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue by Method + Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-primary">{t('reports.admin_finance_revenue_report.text_a47fd0727f')}</h2>
          </div>
          <div className="p-5 space-y-3">
            {reportData.revenueByMethod.length === 0 ? (
              <AdminReportsEmptyState title={t('reports.admin_finance_revenue_report.text_8764bbb6f1')} description={t('reports.admin_finance_revenue_report.auto_fdf7814a62')} />
            ) : reportData.revenueByMethod.map((row) => {
              const total = reportData.revenueByMethod.reduce((s: number, r) => s + r.amount, 0);
              const percentage = total > 0 ? (row.amount / total) * 100 : 0;
              const pct = formatPercent1dp(percentage, locale);
              return (
                <div key={row.method}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary font-medium">{row.method}</span>
                    <span className="text-secondary">{AdminFinanceRevenueReportFormatCurrency(row.amount, undefined, locale)} <span className="text-xs">({pct}%)</span></span>
                  </div>
                  <AdminNavigationLayoutProgressBar value={percentage} label={t('reports.admin_finance_revenue_report.auto_methodRevenueShare', { method: row.method })} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-primary">{t('reports.admin_finance_revenue_report.text_098e8b7646')}</h2>
          </div>
          <div className="p-5 space-y-3">
            {reportData.revenueByPlan.length === 0 ? (
              <AdminReportsEmptyState title={t('reports.admin_finance_revenue_report.text_9dd0910563')} description={t('reports.admin_finance_revenue_report.auto_2e04c86d5b')} />
            ) : reportData.revenueByPlan.map((row) => {
              const total = reportData.revenueByPlan.reduce((s: number, r) => s + r.amount, 0);
              const percentage = total > 0 ? (row.amount / total) * 100 : 0;
              const pct = formatPercent1dp(percentage, locale);
              return (
                <div key={row.planName}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary font-medium">{row.planName}</span>
                    <span className="text-secondary">{AdminFinanceRevenueReportFormatCurrency(row.amount, undefined, locale)} <span className="text-xs">({row.count} {t('reports.admin_finance_revenue_report.text_3757697e2a')})</span></span>
                  </div>
                  <AdminNavigationLayoutProgressBar value={percentage} label={t('reports.admin_finance_revenue_report.auto_planRevenueShare', { plan: row.planName })} variant="info" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">{t('reports.admin_finance_revenue_report.text_d965c78fbc')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {monthlyHeaders.map((header, index) => {
                  const keys: Array<MonthlySortKey | null> = ['month', 'revenue', 'expenses', 'profit', null];
                  const key = keys[index];
                  const active = Boolean(key && monthlySortKey === key);
                  return <th key={header} className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider" aria-sort={key ? (active ? (monthlySortDir === 'asc' ? 'ascending' : 'descending') : 'none') : undefined}>
                    {key ? <button type="button" onClick={() => handleMonthlySort(key)} className="inline-flex min-h-11 items-center gap-1.5 rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('reports.admin_finance_revenue_report.auto_sortBy', { header })} data-testid={`admin_reports-admin_reports-revenue-monthly-sort-${index}`}>
                      {header}{active ? (monthlySortDir === 'asc' ? <ChevronUp size={18} aria-hidden="true" className="text-primary" strokeWidth={2} /> : <ChevronDown size={18} aria-hidden="true" className="text-primary" strokeWidth={2} />) : <ChevronsUpDown size={18} aria-hidden="true" className="text-disabled" strokeWidth={2} />}
                    </button> : header}
                  </th>;
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.monthlyRevenue.length === 0 ? (
                <tr><td colSpan={5}><AdminReportsEmptyState title={t('reports.admin_finance_revenue_report.text_096b9d52b6')} description={t('reports.admin_finance_revenue_report.auto_a64dbf269d')} /></td></tr>
              ) : monthlyRevenue.map((row) => (
                <tr key={row.month} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-5 py-3 text-sm font-semibold text-primary">{row.month}</td>
                  <td className="px-5 py-3 text-sm text-primary">{AdminFinanceRevenueReportFormatCurrency(row.revenue, undefined, locale)}</td>
                  <td className="px-5 py-3 text-sm text-danger">{AdminFinanceRevenueReportFormatCurrency(row.expenses, undefined, locale)}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-success">{AdminFinanceRevenueReportFormatCurrency(row.profit, undefined, locale)}</td>
                  <td className="px-5 py-3 text-sm text-primary">{row.revenue > 0 ? `${formatPercent1dp((row.profit / row.revenue) * 100, locale)}%` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
