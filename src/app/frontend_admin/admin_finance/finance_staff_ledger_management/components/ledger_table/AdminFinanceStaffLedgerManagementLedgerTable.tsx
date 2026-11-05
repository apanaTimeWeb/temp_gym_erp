"use client";
// RESPONSIBILITY: Renders the Admin Finance staff ledger using typed query state and accessible table sorting from the ledger hook.
// DATA FLOW: feature data/state and user input → AdminFinanceStaffLedgerManagementLedgerTable → accessible UI/events routed to owning hooks (admin_finance/finance_staff_ledger_management/components/ledger_table/AdminFinanceStaffLedgerManagementLedgerTable.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/utils/AdminFinanceStaffLedgerManagementFormatters';
import { displayValue } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/utils/AdminFinanceStaffLedgerManagementDisplayValue';
import { AdminFinanceStaffLedgerManagementFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/utils/AdminFinanceStaffLedgerManagementFormatCurrency';
import { ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_LEDGER_ENTRY_STYLE_CLASSES } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/constants/AdminFinanceStaffLedgerManagementConstants';

import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/components/searchable_dropdown/AdminFinanceStaffLedgerManagementSearchableDropdown';
import { useAdminFinanceStaffLedgerManagementLedgerLogic } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/hooks/useAdminFinanceStaffLedgerManagementLedgerLogic';
import { ChevronDown, ChevronUp, ChevronsUpDown, FileText } from 'lucide-react';
import type { AdminFinanceStaffLedgerManagementLedgerSortKey } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementTypes';
import AdminFinanceStaffLedgerManagementEmptyState from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/components/empty_state/AdminFinanceStaffLedgerManagementEmptyState';


/**
 * AdminFinanceStaffLedgerManagementLedgerTable renders the Finance StaffLedgerManagement ledger table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceStaffLedgerManagementLedgerTable: Renders the Admin Finance staff ledger using typed query state and accessible table sorting from the ledger hook.
 * @dependencies Consumes AdminFinanceStaffLedgerManagementFormatters, AdminNavigationLayoutDisplayValue, AdminFinanceStaffLedgerManagementFormatCurrency, AdminNavigationLayoutSearchableDropdown, useAdminFinanceStaffLedgerManagementLedgerLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceStaffLedgerManagementLedgerTable() {
  const locale = useLocale();
  const t = useTranslations();
  const ledgerColumns: ReadonlyArray<{ key: AdminFinanceStaffLedgerManagementLedgerSortKey | null; label: string }> = [
    { key: 'date', label: t('hr.AdminAuditRepair.date') },
    { key: 'type', label: t('hr.AdminAuditRepair.transactionType') },
    { key: null, label: t('hr.AdminAuditRepair.notes') },
    { key: 'credit', label: t('hr.AdminAuditRepair.credit') },
    { key: 'debit', label: t('hr.AdminAuditRepair.debit') },
    { key: 'balance', label: t('hr.AdminAuditRepair.balance') },
  ];

  const {
    selectedStaffId,
    setSelectedStaffId,
    selectedStaff,
    staffOptions,
    sortedLedger,
    loading,
    error,
    retryLedger,
    sortKey,
    sortDir,
    handleSort,
  } = useAdminFinanceStaffLedgerManagementLedgerLogic();


  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-end">
        <div>
          <h2 className="text-lg font-bold text-primary">{t('hr.admin_hr_ledger_table.text_a77422ce93')}</h2>
          <p className="text-sm text-secondary">{t('hr.admin_hr_ledger_table.text_b7a1514f11')}</p>
        </div>
        <div className="w-full sm:w-64">
          <label className="block text-xs text-secondary mb-1">{t('hr.admin_hr_ledger_table.text_b403d2d36b')}</label>
          <AdminNavigationLayoutSearchableDropdown
            options={staffOptions}
            value={selectedStaffId}
            onChange={(value) => setSelectedStaffId(String(value))}
            placeholder={t('hr.admin_hr_ledger_table.text_137fc8d360')}
            disabled={staffOptions.length === 0}
           testId="admin_hr-admin_hr-ledger-table-change"/>
        </div>
      </div>

      {selectedStaff && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">{t('hr.admin_hr_ledger_table.text_c4cbb9027e')}</p>
            <p className="text-xl font-bold text-primary">{AdminFinanceStaffLedgerManagementFormatCurrency(selectedStaff.salary ?? 0, undefined, locale)}{t('hr.admin_hr_ledger_table.text_e9e0ceb5e8')}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">{t('hr.admin_hr_ledger_table.text_9f119bb465')}</p>
            <p className="text-xl font-bold text-danger">{AdminFinanceStaffLedgerManagementFormatCurrency(selectedStaff.advanceSalary ?? 0, undefined, locale)}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-secondary uppercase">{t('hr.admin_hr_ledger_table.text_00c45e0ac2')}</p>
            <p className="text-xl font-bold text-warning">{AdminFinanceStaffLedgerManagementFormatCurrency(selectedStaff.currentDue ?? 0, undefined, locale)}</p>
          </div>
        </div>
      )}

      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-highlight border-b border-border text-sm">
                {ledgerColumns.map((column , __testIdIndex88) => {
                  const active = column.key !== null && sortKey === column.key;
                  return (
                    <th key={column.label} className={`p-4 font-medium text-secondary whitespace-nowrap ${column.key ? 'select-none' : ''} ${column.key === 'balance' ? 'bg-surface-highlight text-right' : ''}`} aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                      {column.key ? (
                        <button type="button" onClick={() => handleSort(column.key as AdminFinanceStaffLedgerManagementLedgerSortKey)} className="motion-safe:transition-all motion-safe:duration-base ease-in-out inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95" data-testid={`admin_hr-admin_hr-ledger-table-click-map88-${__testIdIndex88}-1`}>
                          {column.label}
                          {active ? (sortDir === 'asc' ? <ChevronUp size={18} className="text-primary" aria-hidden="true"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary" aria-hidden="true"  strokeWidth={2}/>) : <ChevronsUpDown size={18} className="text-disabled" aria-hidden="true"  strokeWidth={2}/>}
                        </button>
                      ) : column.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="text-center p-8 text-secondary">{t('hr.admin_hr_ledger_table.text_b3e27da8cc')}</td></tr>
              ) : error ? (
                <tr><td colSpan={6} className="p-8 text-center">
                  <p role="alert" className="text-danger mb-3">{error}</p>
                  <button type="button" onClick={() => { void retryLedger(); }} className="min-h-11 rounded-lg px-4 font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="finance-staff-ledger-retry">{t('hr.HrError.text_042c862e44')}</button>
                </td></tr>
              ) : sortedLedger.length === 0 ? (
                <tr><td colSpan={6}><AdminFinanceStaffLedgerManagementEmptyState title={t('hr.admin_hr_ledger_table.text_d60c045dd2')} description={t('hr.admin_hr_ledger_table.auto_d9cf357274')} /></td></tr>
              ) : (
                sortedLedger.map((entry , __testIdIndex109) => (
                  <tr key={entry.id} className="hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base">
                    <td className="p-4 text-primary whitespace-nowrap">{formatDate(entry.date, locale)}</td>
                    <td className="p-4"><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_LEDGER_ENTRY_STYLE_CLASSES[entry.type] ?? 'bg-input text-secondary'}`} data-testid={`admin_hr-adminhrledgertable-status-1-map109-${__testIdIndex109}-1`}>{entry.type}</span></td>
                    <td className="p-4 text-secondary max-w-48 truncate" title={entry.notes}>{displayValue(entry.notes)}</td>
                    <td className="p-4 text-success text-right">{entry.credit ? AdminFinanceStaffLedgerManagementFormatCurrency(entry.credit, undefined, locale) : '—'}</td>
                    <td className="p-4 text-danger text-right">{entry.debit ? AdminFinanceStaffLedgerManagementFormatCurrency(entry.debit, undefined, locale) : '—'}</td>
                    <td className="p-4 text-primary font-semibold text-right">{AdminFinanceStaffLedgerManagementFormatCurrency(entry.balance, undefined, locale)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
