"use client";
// RESPONSIBILITY: Renders the Admin Finance payroll list from the server-backed query, keeping search/month/sort/pagination state in the feature URL.
// DATA FLOW: feature data/state and user input → AdminFinancePayrollManagementPayrollTable → accessible UI/events routed to owning hooks (admin_finance/finance_payroll_management/components/payroll_table/AdminFinancePayrollManagementPayrollTable.tsx)

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { formatDate } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementFormatters';
import { AdminFinancePayrollManagementFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementFormatCurrency';
import { useAdminFinancePayrollManagementViewModel } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementViewModel';
import type { AdminFinancePayrollManagementPayrollSortKey } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';
import type { AdminFinancePayrollManagementSortDirection } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementSortTypes';
import { CheckCircle2 } from 'lucide-react';
import { ADMIN_FINANCE_PAYROLL_MANAGEMENT_TABLE_HEADERS, ADMIN_FINANCE_PAYROLL_MANAGEMENT_TABLE_HEADER_LABEL_KEYS, ADMIN_FINANCE_PAYROLL_MANAGEMENT_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_finance/finance_payroll_management/constants/AdminFinancePayrollManagementConstants';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/AdminFinancePayrollManagementPagination';
import AdminFinancePayrollManagementEmptyState from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/empty_state/AdminFinancePayrollManagementEmptyState';
import AdminFinancePayrollManagementPayrollSortIndicator from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/payroll_table/AdminFinancePayrollManagementPayrollSortIndicator';
import { PAYROLL_STATUS, PAYROLL_STATUS_LABEL_KEYS } from '@/app/frontend_admin/admin_finance/finance_payroll_management/constants/AdminFinancePayrollManagementConstants';
import { displayValue } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementDisplayValue';
import { CopyButton } from '@/components/ui/CopyButton';

const TABLE_COLUMN_COUNT = 9;

const PAYROLL_SORT_KEYS: Partial<Record<string, AdminFinancePayrollManagementPayrollSortKey>> = {
  Staff: 'staffName',
  Month: 'month',
  'Net Payable': 'amount',
  'Paid Amount': 'paidAmount',
  Pending: 'pendingAmount',
  Status: 'status',
  'Paid On': 'paidAt',
};

/**
 * AdminFinancePayrollManagementPayrollTable renders the Finance PayrollManagement payroll table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePayrollManagementPayrollTable: Renders the Admin Finance payroll list from the server-backed query, keeping search/month/sort/pagination state in the feature URL.
 * @dependencies Consumes AdminFinancePayrollManagementFormatters, AdminFinancePayrollManagementFormatCurrency, useAdminFinancePayrollManagementViewModel, AdminFinancePayrollManagementTypes, AdminFinancePayrollManagementSortTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePayrollManagementPayrollTable() {
  const locale = useLocale();
  const t = useTranslations();

  const {
    payrolls,
    currentPage,
    setCurrentPage,
    setPaymentModal,
    setShowPayrollModal,
    payrollStatus,
    payrollError,
    retryPayroll,
    totalPayrolls,
    staff,
    payrollSortKey,
    payrollSortDir,
    setPayrollSort,
  } = useAdminFinancePayrollManagementViewModel();

  const handleSort = (key: AdminFinancePayrollManagementPayrollSortKey) =>
    setPayrollSort(key, payrollSortKey === key && payrollSortDir === 'asc' ? 'desc' : 'asc');

  const renderHeader = (header: string) => {
    const key = PAYROLL_SORT_KEYS[header];
    const label = t(ADMIN_FINANCE_PAYROLL_MANAGEMENT_TABLE_HEADER_LABEL_KEYS[header] ?? header);
    if (!key) return <span>{label}</span>;
    return (
      <button
        type="button"
        onClick={() => handleSort(key)}
        className="inline-flex min-h-11 items-center gap-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded min-w-11 active:scale-95"
        aria-label={t('admin_hr_payroll_table.auto_sortBy', { header })}
        data-testid="admin_hr-admin_hr-payroll-table-click"
      >
        {header}
        <AdminFinancePayrollManagementPayrollSortIndicator active={payrollSortKey === key} direction={payrollSortDir} />
      </button>
    );
  };

  if (payrollStatus === 'pending') {
    return (
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto max-h-[640px] overflow-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20 bg-surface-highlight text-secondary">
              <tr className="border-b border-border">
                {ADMIN_FINANCE_PAYROLL_MANAGEMENT_TABLE_HEADERS.map((header, idx) => (
                  <th
                    key={header}
                    aria-sort={PAYROLL_SORT_KEYS[header] && payrollSortKey === PAYROLL_SORT_KEYS[header] ? (payrollSortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className={`text-left text-xs font-semibold uppercase tracking-wider px-4 py-3 whitespace-nowrap ${
                      idx === 0 ? 'sticky start-0 z-30 bg-surface-highlight border-e border-border' : ''
                    }`}
                  >
                    {renderHeader(header)}
                  </th>
                ))}
                <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                  {t('hr.admin_hr_payroll_table.text_c3cd636a58')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {['payroll-skeleton-1', 'payroll-skeleton-2', 'payroll-skeleton-3', 'payroll-skeleton-4', 'payroll-skeleton-5'].map((key) => (
                <tr key={key} className="animate-pulse bg-card">
                  {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((cell, cIdx) => (
                    <td key={`${key}-${cell}`} className={`px-4 py-4 ${cIdx === 0 ? 'sticky start-0 z-10 bg-card border-e border-border' : ''}`}>
                      <div className="h-4 bg-skeleton-base rounded w-24" />
                    </td>
                  ))}
                  <td className="px-4 py-4"><div className="h-8 bg-skeleton-base rounded w-24 ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (payrollStatus === 'error') {
    return (
      <div className="rounded-2xl border border-border bg-danger-bg p-4 text-sm text-danger shadow-card" role="alert" data-testid="admin_hr-adminhrpayrolltable-error">
        <p>{t('hr.AdminAuditRepair.payrollFailed')}</p>
        {payrollError && <p className="mt-1 break-words">{payrollError}</p>}
        <button
          type="button"
          onClick={() => void retryPayroll()}
          className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          data-testid="hr-management-hr-management-payroll-table-retry-payroll"
        >
          {t('hr.AdminAuditRepair.retryPayroll')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowPayrollModal(true)}
          className="min-h-11 flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95 transition-all"
          data-testid="admin_hr-admin_hr-payroll-table-click-2"
        >
          {t('hr.admin_hr_payroll_table.text_3a5a144258')}
        </button>
      </div>
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto max-h-[640px] overflow-auto">
          <table data-admin-responsive-table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-20 bg-surface-highlight text-secondary">
              <tr className="border-b border-border">
                {ADMIN_FINANCE_PAYROLL_MANAGEMENT_TABLE_HEADERS.map((header, idx) => (
                  <th
                    key={header}
                    aria-sort={PAYROLL_SORT_KEYS[header] && payrollSortKey === PAYROLL_SORT_KEYS[header] ? (payrollSortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className={`text-left text-xs font-semibold uppercase tracking-wider px-4 py-3 whitespace-nowrap ${
                      idx === 0 ? 'sticky start-0 z-30 bg-surface-highlight border-e border-border' : ''
                    }`}
                  >
                    {renderHeader(header)}
                  </th>
                ))}
                <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                  {t('hr.admin_hr_payroll_table.text_c3cd636a58')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payrolls.map((payroll, __testIdIndex45) => {
                const salary = staff.find((member) => member.id === payroll.staffId)?.salary ?? 0;
                return (
                  <tr key={payroll.id} className="hover:bg-surface-hover transition-colors group">
                    <td className="sticky start-0 z-10 bg-card border-e border-border px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {payroll.staff?.name ? (
                          <Link
                            href={`/frontend_admin/admin_hr/hr_staff_management?search=${encodeURIComponent(payroll.staff.name)}`}
                            className="text-sm font-medium text-primary hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                            title="View staff profile"
                          >
                            {payroll.staff.name}
                          </Link>
                        ) : (
                          <p className="text-sm font-medium text-primary">{t('admin_hr_payroll_table.auto_staffFallback', { id: payroll.staffId })}</p>
                        )}
                        {payroll.staff?.name && <CopyButton text={payroll.staff.name} label={payroll.staff.name} />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-secondary">{payroll.staff?.role}</span>
                        {payroll.staff?.name && (
                          <Link
                            href={`/frontend_admin/admin_finance/finance_staff_ledger_management?search=${encodeURIComponent(payroll.staff.name)}`}
                            className="text-[10px] text-primary hover:underline font-semibold"
                            title="View Ledger"
                          >
                            Ledger
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-primary">{payroll.month}</td>
                    <td className="px-4 py-3 text-sm font-medium text-right">{AdminFinancePayrollManagementFormatCurrency(salary, undefined, locale)}</td>
                    <td className="px-4 py-3 text-sm font-bold text-primary text-right">{AdminFinancePayrollManagementFormatCurrency(payroll.amount || 0, undefined, locale)}</td>
                    <td className="px-4 py-3 text-sm font-bold text-success text-right">{AdminFinancePayrollManagementFormatCurrency(payroll.paidAmount || 0, undefined, locale)}</td>
                    <td className="px-4 py-3 text-sm font-bold text-danger text-right">{AdminFinancePayrollManagementFormatCurrency(payroll.pendingAmount || 0, undefined, locale)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${payroll.status.toLowerCase() === PAYROLL_STATUS.PAID.toLowerCase() ? 'bg-success-bg text-success-text' : 'bg-warning-bg text-warning'}`} data-testid={`admin_hr-adminhrpayrolltable-status-1-map45-${__testIdIndex45}-1`}>
                        {PAYROLL_STATUS_LABEL_KEYS[payroll.status.toUpperCase()] ? t(PAYROLL_STATUS_LABEL_KEYS[payroll.status.toUpperCase()] as string) : payroll.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">{payroll.paidAt ? formatDate(payroll.paidAt, locale) : displayValue(null)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {payroll.status.toLowerCase() !== PAYROLL_STATUS.PAID.toLowerCase() && (
                          <button
                            type="button"
                            onClick={() => setPaymentModal({ payrollId: payroll.id, staffName: payroll.staff?.name || t('admin_hr_payroll_table.auto_staffFallback', { id: payroll.staffId }), pendingAmount: payroll.pendingAmount })}
                            className="min-h-11 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-xl hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95 transition-all"
                            aria-label={t('admin_hr_payroll_table.auto_payStaff', { name: payroll.staff?.name ?? payroll.staffId })}
                            data-testid={`admin_hr-admin_hr-payroll-table-click-3-map45-${__testIdIndex45}-2`}
                          >
                            <CheckCircle2 size={18} strokeWidth={2} /> {t('hr.admin_hr_payroll_table.text_80c37573af')}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {payrolls.length === 0 && (
                <tr>
                  <td colSpan={TABLE_COLUMN_COUNT}>
                    <AdminFinancePayrollManagementEmptyState
                      title={t('hr.admin_hr_payroll_table.text_83248dc119')}
                      description={t('hr.admin_hr_payroll_table.auto_05f817cba7')}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border p-4 bg-surface-highlight">
          <AdminNavigationLayoutPagination
            currentPage={currentPage}
            totalPages={Math.max(1, Math.ceil(totalPayrolls / ADMIN_FINANCE_PAYROLL_MANAGEMENT_ITEMS_PER_PAGE))}
            totalItems={totalPayrolls}
            itemsPerPage={ADMIN_FINANCE_PAYROLL_MANAGEMENT_ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
