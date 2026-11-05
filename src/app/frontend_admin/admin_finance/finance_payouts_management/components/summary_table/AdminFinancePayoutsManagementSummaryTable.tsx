"use client";
// RESPONSIBILITY: Renders the Admin payout summary with server-side filtering, pagination, and sortable headers.
// DATA FLOW: feature data/state and user input → AdminFinancePayoutsManagementSummaryTable → accessible UI/events routed to owning hooks (admin_finance/finance_payouts_management/components/summary_table/AdminFinancePayoutsManagementSummaryTable.tsx)

import { PAYOUT_STATUS_LABEL_KEYS, PAYOUT_STATUS_STYLES, PAYOUT_STATUS_VALUES, PAYOUTS_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_finance/finance_payouts_management/constants/AdminFinancePayoutsManagementConstants';
import { useTranslations } from 'next-intl';

import { CheckCircle, Clock, Loader2 } from 'lucide-react';
import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_finance/finance_payouts_management/hooks/useAdminFinancePayoutsManagementLogic';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/AdminFinancePayoutsManagementTableSkeleton';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/AdminFinancePayoutsManagementPagination';
import { maskAdminPayoutsListAmount } from '@/app/frontend_admin/admin_finance/finance_payouts_management/utils/AdminFinancePayoutsManagementMaskListAmount';

import { PAYOUT_MONTH_OPTIONS, PAYOUT_GYM_OPTIONS, PAYOUT_STATUS_OPTIONS, PAYOUT_SUMMARY_COLUMN_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_payouts_management/constants/AdminFinancePayoutsManagementConstants';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/searchable_dropdown/AdminFinancePayoutsManagementSearchableDropdown';
import type { PayoutSortKey } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';
import AdminPayoutsSummaryTableSortIcon from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/summary_table/AdminFinancePayoutsManagementSummaryTableSortIcon';
import AdminPayoutsEmptyState from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/empty_state/AdminFinancePayoutsManagementEmptyState';


/**
 * AdminFinancePayoutsManagementSummaryTable renders the admin payouts summary table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePayoutsManagementSummaryTable: Renders the Admin payout summary with server-side filtering, pagination, and sortable headers.
 * @dependencies Consumes useAdminPayoutsLogic, AdminNavigationLayoutTableSkeleton, AdminNavigationLayoutPagination, AdminPayoutsFormatCurrency, AdminPayoutsConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePayoutsManagementSummaryTable() {
  const t = useTranslations();
  const tableColumns = PAYOUT_SUMMARY_COLUMN_OPTIONS.map((column) => ({ ...column, label: t(column.labelKey) }));


  const logic = useAdminPayoutsLogic();
  return <div className="space-y-3">
    <div className="flex flex-wrap gap-3">
      <div className="w-44"><AdminNavigationLayoutSearchableDropdown options={PAYOUT_MONTH_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} value={logic.monthFilter} onChange={(val) => logic.setMonthFilter(String(val))} placeholder={t('payouts.admin_payouts_summary_table.text_be46153ca6')}  testId="admin_payouts-admin_payouts-summary-table-change"/></div>
      <div className="w-40"><AdminNavigationLayoutSearchableDropdown options={PAYOUT_GYM_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} value={logic.gymFilter} onChange={(val) => logic.setGymFilter(String(val))} placeholder={t('payouts.admin_payouts_summary_table.text_1ea6687cfe')}  testId="admin_payouts-admin_payouts-summary-table-change-2"/></div>
      <div className="w-40"><AdminNavigationLayoutSearchableDropdown options={PAYOUT_STATUS_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} value={logic.statusFilter} onChange={(val) => logic.setStatusFilter(String(val))} placeholder={t('payouts.admin_payouts_summary_table.text_6b308de777')}  testId="admin_payouts-admin_payouts-summary-table-change-3"/></div>
    </div>
    {logic.status === 'pending' ? <AdminNavigationLayoutTableSkeleton rows={6} cols={tableColumns.length} /> : logic.status === 'error' ? <div role="alert" className="rounded-xl border border-border bg-danger-bg p-4 text-sm text-danger"><p>{t('payouts.AdminRepair.loadError')}</p><button type="button" onClick={() => void logic.retryPayouts()} className="mt-3 min-h-11 rounded-lg border border-border px-4" data-testid="payouts-management-payouts-management-summary-table-retry-payouts">{t('payouts.AdminRepair.retry')}</button></div> : <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto"><table data-admin-responsive-table className="w-full"><thead><tr className="bg-surface-highlight border-b border-border">
        {tableColumns.map((h , __testIdIndex40) => <th key={h.key} scope="col" aria-sort={logic.payoutSortKey===h.key ? (logic.payoutSortDir==='asc'?'ascending':'descending') : 'none'} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-secondary whitespace-nowrap"><button type="button" onClick={() => logic.onPayoutSort(h.key)} aria-label={h.label} className="inline-flex min-h-11 min-w-11 items-center gap-1.5 rounded text-left hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid={`admin_payouts-admin_payouts-summary-table-control-map40-${__testIdIndex40}-1`}><div className="flex items-center gap-1.5">{h.label}<AdminPayoutsSummaryTableSortIcon column={h.key} sortKey={logic.payoutSortKey} sortDir={logic.payoutSortDir} /></div></button></th>)}
      </tr></thead><tbody className="divide-y divide-border">
        {logic.payouts.length === 0 ? <tr><td colSpan={tableColumns.length}><AdminPayoutsEmptyState title={t('payouts.admin_payouts_summary_table.text_f79b0cb03e')} description={t('payouts.admin_payouts_summary_table.auto_76a79e50dc')} /></td></tr> : logic.payouts.map((p) => <tr key={`${p.gymId}-${p.month}`} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
          <td className="px-4 py-3 text-sm font-medium text-primary">{p.gymName}</td><td className="px-4 py-3 text-sm text-secondary">{p.month}</td><td className="px-4 py-3 text-sm text-primary font-medium"><span aria-label={t('payouts.AdminAuditRepair.financialAmountHidden')}>{maskAdminPayoutsListAmount()}</span></td><td className="px-4 py-3 text-sm text-danger"><span aria-label={t('payouts.AdminAuditRepair.financialAmountHidden')}>{maskAdminPayoutsListAmount()}</span></td><td className="px-4 py-3 text-sm text-danger"><span aria-label={t('payouts.AdminAuditRepair.financialAmountHidden')}>{maskAdminPayoutsListAmount()}</span></td><td className="px-4 py-3 text-sm text-secondary"><span aria-label={t('payouts.AdminAuditRepair.financialAmountHidden')}>{maskAdminPayoutsListAmount()}</span></td><td className="px-4 py-3 text-sm font-bold text-success"><span aria-label={t('payouts.AdminAuditRepair.financialAmountHidden')}>{maskAdminPayoutsListAmount()}</span></td>
          <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${PAYOUT_STATUS_STYLES[p.payoutStatus]}`} data-testid="payouts-management-payouts-management-summary-table-status-badge">{p.payoutStatus===PAYOUT_STATUS_VALUES.PAID?<CheckCircle size={18} strokeWidth={2}/>:p.payoutStatus===PAYOUT_STATUS_VALUES.PROCESSING?<Loader2 size={18} className="motion-safe:animate-spin motion-safe:duration-base" strokeWidth={2}/>:<Clock size={18} strokeWidth={2}/>} {PAYOUT_STATUS_LABEL_KEYS[p.payoutStatus] ? t(PAYOUT_STATUS_LABEL_KEYS[p.payoutStatus] as string) : p.payoutStatus}</span></td>
        </tr>)}
      </tbody></table></div><div className="border-t border-border"><AdminNavigationLayoutPagination currentPage={logic.currentPage} totalPages={logic.totalPages} onPageChange={logic.setCurrentPage} totalItems={logic.totalItems} itemsPerPage={PAYOUTS_ITEMS_PER_PAGE}/></div>
    </div>}
  </div>;
}
