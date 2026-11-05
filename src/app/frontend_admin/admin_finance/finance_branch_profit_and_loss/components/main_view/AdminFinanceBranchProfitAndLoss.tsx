"use client";
// RESPONSIBILITY: Root client orchestrator for the Branch P&L Comparison page.
// DATA FLOW: page.tsx → AdminFinanceBranchProfitAndLoss → useAdminFinancePnlLogic → child components

import { useTranslations } from 'next-intl';
import { useState } from 'react';
// Owns layout and composition. Delegates all logic to useAdminFinancePnlLogic. No direct API calls.
import { useAdminFinancePnlLogic } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/hooks/useAdminFinanceBranchProfitAndLossLogic';
import AdminFinancePnlKPIs from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/components/kpis/AdminFinanceBranchProfitAndLossKPIs';
import AdminFinancePnlPeriodSelector from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/components/period_selector/AdminFinanceBranchProfitAndLossPeriodSelector';
import AdminFinancePnlTable from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/components/table/AdminFinanceBranchProfitAndLossTable';
import AdminFinancePnlCharts from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/components/charts/AdminFinanceBranchProfitAndLossCharts';
import { createAdminFinancePnlCsv, getAdminFinancePnlExportDateKey } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossCsvExport';
import { downloadAdminFinanceBranchProfitAndLossCsv } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossDownloadCsv';
import { Loader2 } from 'lucide-react';

/**
 * AdminFinanceBranchProfitAndLoss renders the admin finance pnl main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceBranchProfitAndLoss: Root client orchestrator for the Branch P&L Comparison page.
 * @dependencies Consumes useAdminFinancePnlLogic, AdminFinancePnlKPIs, AdminFinancePnlPeriodSelector, AdminFinancePnlTable, AdminFinancePnlCharts.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceBranchProfitAndLoss() {
  const t = useTranslations();
  const [exportFailed, setExportFailed] = useState(false);

  const {
    period,
    setPeriod,
    statusFilter,
    setStatusFilter,
    sortKey,
    sortDir,
    handleSort,
    expandedBranchId,
    toggleExpand,
    sortedData,
    aggregates,
    isPending,
    isError,
    retry,
  } = useAdminFinancePnlLogic();

  const handleExport = () => {
    if (sortedData.length === 0 || isPending || isError) return;
    try {
      const csv = createAdminFinancePnlCsv(sortedData);
      downloadAdminFinanceBranchProfitAndLossCsv(csv, `branch-pnl-${period.toLowerCase()}-${getAdminFinancePnlExportDateKey()}.csv`);
      setExportFailed(false);
    } catch {
      setExportFailed(true);
    }
  };


  return (
    <div className="min-h-full pb-10 bg-page text-primary">

      <div className="p-6 space-y-6">

        {/* Period Selector + Export */}
        <div className="flex items-center gap-3">
          <AdminFinancePnlPeriodSelector
            period={period}
            onPeriodChange={setPeriod}
            onExport={handleExport}
            canExport={sortedData.length > 0 && !isPending && !isError}
          />
          {isPending && <Loader2 size={18} className="motion-safe:animate-spin text-secondary motion-safe:duration-base"  strokeWidth={2}/>}
        </div>
        {exportFailed && <p role="alert" className="text-sm text-danger">{t('finance.admin_finance_tabs.exportFailed')}</p>}

        {isError && <div role="alert" className="rounded-xl border border-danger bg-danger-bg p-4 text-danger"><p>{t('finance.AdminFinancePnlError.text_5a61f899b6')}</p><p className="mt-1 text-sm">{t('finance.AdminFinancePnlError.text_f10af425f9')}</p><button type="button" onClick={() => void retry()} className="mt-3 min-h-11 rounded-lg border border-danger px-4 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="finance-pnl-report-finance-pnl-report-retry">{t('finance.AdminFinancePnlError.text_cef2fe093b')}</button></div>}

        {!isError && <>
        {/* KPI Cards */}
        <AdminFinancePnlKPIs
          aggregates={aggregates}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Charts */}
        <AdminFinancePnlCharts data={sortedData} />

        {/* P&L Table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-base font-semibold text-primary">{t('finance.admin_finance_pnl.text_209d61d684')}</h2>
              <p className="text-xs text-secondary mt-0.5">
                {t('finance.admin_finance_pnl.text_5c89dc5750')}</p>
            </div>
            {statusFilter !== 'ALL' && (
              <button type="button"
                onClick={() => setStatusFilter('ALL')}
                className="motion-safe:transition-all motion-safe:duration-base ease-in-out text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95"
               data-testid="admin_finance-admin_finance-pnl-main-click">
                {t('finance.admin_finance_pnl.text_1d98da511f')}</button>
            )}
          </div>

          <AdminFinancePnlTable
            data={sortedData}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
            expandedBranchId={expandedBranchId}
            onToggleExpand={toggleExpand}
            statusFilter={statusFilter}
            onResetFilter={() => setStatusFilter('ALL')}
          />
        </div>
        </>}

      </div>
    </div>
  );
}
