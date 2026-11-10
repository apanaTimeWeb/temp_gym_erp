// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';

import { useRef } from 'react';

import { Banknote, RefreshCw, Printer } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructurePaginationDefaults';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';

import ManagerStaffPayrollAndAttendancePayrollEmptyState from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerStaffPayrollAndAttendancePayrollEmptyState';
import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance.constants';
import { PAYROLL_TABLE_HEADERS } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance_shared.constants';
import { useManagerStaffPayrollAndAttendanceLogic } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceLogic';
import { ManagerStaffPayrollAndAttendanceDisplayValue, ManagerStaffPayrollAndAttendanceFormatCurrency, ManagerStaffPayrollAndAttendanceFormatDate } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/utils/ManagerStaffPayrollAndAttendanceFormatters';
import { printManagerStaffPayrollAndAttendancePayslip } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/utils/ManagerStaffPayrollAndAttendanceExportUtils';



/** @description Renders the ManagerStaffPayrollAndAttendancePayrollTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves loading state, empty state, error state, retry/recovery. */
export default function ManagerStaffPayrollAndAttendancePayrollTable() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const locale = useLocale();

  const { confirm } = useConfirm();
  const generatePayrollKeyRef = useRef<string | null>(null);
  const { search, setSearch, payrollMonth, setPayrollMonth, payrolls, totalPayrolls, setPaymentModal, currentPage, setCurrentPage, isPending, isError, error, loadAll, staff, bulkGeneratePayroll } = useManagerStaffPayrollAndAttendanceLogic();

  const totalPages = Math.max(1, Math.ceil(totalPayrolls / MANAGER_ITEMS_PER_PAGE));
  const currentData = payrolls;
  const handleGeneratePayroll = async () => {
    const confirmed = await confirm({ title: t("COPY_CONFIRM_PAYROLL_GENERATION"), message: payrollMonth ? t("TEXT_GENERATE_PAYROLL_FOR_MONTH", { value: payrollMonth }) : t("TEXT_GENERATE_PAYROLL_CURRENT_MONTH"), confirmText: t("COPY_GENERATE_PAYROLL_1"), type: 'warning' });
    if (!confirmed) return;
    generatePayrollKeyRef.current ??= ManagerInfrastructureIdempotency();
    try {
      await bulkGeneratePayroll(payrollMonth || new Date().toISOString().slice(0, 7), generatePayrollKeyRef.current);
      generatePayrollKeyRef.current = null;
    } catch {
      // The mutation owns the backend error toast. Retain the key so a retry reuses the same user-intent key.
    }
  };

  const payrollColumnCount = PAYROLL_TABLE_HEADERS.length + 1;

  if (isPending) {
    return (
      <div className="flex flex-col h-full">
        <div className="overflow-x-auto flex-1">
          <ManagerInfrastructureResponsiveTable labels={[...PAYROLL_TABLE_HEADERS, t('COPY_ACTIONS_4')]}>
<table className="w-full">
            <thead className="bg-input text-text-secondary">
              <tr>
                {PAYROLL_TABLE_HEADERS.map(h => (
                  <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
                <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">{t("COPY_ACTIONS_4")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...Array(5)].map((_, i) => (
                <tr key={`payroll-loading-${i}`} className="motion-safe:animate-pulse bg-card">
                  <td className="px-4 py-4">
                    <div className="h-4 bg-input rounded w-32 mb-2"></div>
                    <div className="h-3 bg-input rounded w-20"></div>
                  </td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-16"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-24"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-24"></div></td>
                  <td className="px-4 py-4"><div className="h-5 bg-input rounded-full w-16"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-20"></div></td>
                  <td className="px-4 py-4"><div className="h-5 bg-input rounded-full w-16"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-input rounded w-20"></div></td>
                  <td className="px-4 py-4 text-right"><div className="h-8 bg-input rounded-lg w-24 ml-auto"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
</ManagerInfrastructureResponsiveTable>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="m-4 rounded-xl border border-danger bg-card p-6 text-center space-y-3">
        <p className="text-sm text-danger-text">{error || t('TEXT_GENERIC_ERROR')}</p>
        <button type="button" onClick={() => { void loadAll(); }} className="min-h-11 px-4 py-2 rounded-lg bg-primary text-on-primary focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none">{t('COPY_TRY_AGAIN')}</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search, month selection, and payroll generation controls. */}
      <div className="flex flex-col gap-3 px-4 pt-3 pb-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="manager-payroll-search" className="text-xs font-medium text-text-secondary">{t('COPY_SEARCH_STAFF_1')}</label>
            <input id="manager-payroll-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('COPY_SEARCH_STAFF_1')} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
          </div>
          <div className="space-y-1">
            <label htmlFor="manager-payroll-month" className="text-xs font-medium text-text-secondary">{t('COPY_PAYROLL_MONTH')}</label>
            <input id="manager-payroll-month" type="month" value={payrollMonth} onChange={(event) => setPayrollMonth(event.target.value)} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
          </div>
        </div>
        <button data-testid="manager_hr-manager-hr-payroll-table-button-close" onClick={() => { void handleGeneratePayroll(); }} className="min-h-11 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-primary text-on-primary rounded-lg motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110" aria-label={t("COPY_GENERATE_PAYROLL_CURRENT_MONTH")} type="button">
          <RefreshCw size={18} strokeWidth={2}/>{t("COPY_GENERATE_PAYROLL_2")}</button>
      </div>
      <ManagerInfrastructureResponsiveTable labels={[...PAYROLL_TABLE_HEADERS, t('COPY_ACTIONS_1')]}>
<table className="w-full">
          <thead className="bg-input text-text-secondary border-b border-border">
            <tr>
              {PAYROLL_TABLE_HEADERS.map(h => (
                <th key={h} className={`text-xs font-semibold uppercase tracking-wider px-3 py-3 whitespace-nowrap ${['Base Salary', 'Net Payable', 'Paid Amount', 'Pending'].includes(h) ? 'text-right' : 'text-left'}`}>
                  {h}
                </th>
              ))}
              <th className="text-right text-xs font-semibold uppercase tracking-wider px-3 py-3 whitespace-nowrap">{t("COPY_ACTIONS_1")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentData.map((p, mapIndex) => (
              <tr key={p.id} className="motion-safe:transition-all hover:bg-primary-subtle bg-card motion-safe:duration-200 ease-in-out">
                <td className="px-3 py-3 whitespace-nowrap">
                  <p className="text-sm font-medium text-text-primary">
                    {p.staff?.name || `Staff #${p.staffId}`}
                  </p>
                  <div className="text-xs text-text-secondary">
                    {ManagerStaffPayrollAndAttendanceDisplayValue(p.staff?.role)}
                  </div>
                </td>
                <td className="px-3 py-3 text-sm text-text-primary whitespace-nowrap">{p.month}</td>
                <td className="px-3 py-3 text-sm font-medium text-text-secondary text-right whitespace-nowrap">
                  {ManagerStaffPayrollAndAttendanceFormatCurrency(((staff.find(s => String(s.id) === String(p.staffId))?.salary) || 0), ManagerEnvConfig.currencyCode, locale)}
                </td>
                <td className="px-3 py-3 text-sm font-bold text-text-primary text-right whitespace-nowrap">{ManagerStaffPayrollAndAttendanceFormatCurrency(p.amount || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-3 py-3 text-sm font-bold text-success-text text-right whitespace-nowrap">{ManagerStaffPayrollAndAttendanceFormatCurrency(p.paidAmount || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-3 py-3 text-sm font-bold text-danger-text text-right whitespace-nowrap">{ManagerStaffPayrollAndAttendanceFormatCurrency(p.pendingAmount || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span 
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      p.status === MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PAID ? 'bg-success-bg text-success-text' : 'bg-warning-bg text-warning-text'
                    }`}
                   data-testid="manager_hr-managerhrpayrolltable-status-badge-1">
                    {p.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                  {p.paidAt ? ManagerStaffPayrollAndAttendanceFormatDate(p.paidAt, locale) : '—'}
                </td>
                <td className="px-3 py-3 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      data-testid={`manager_hr-payroll-print-payslip-${mapIndex}`}
                      type="button"
                      onClick={() => {
                        printManagerStaffPayrollAndAttendancePayslip({
                          id: p.id,
                          month: p.month,
                          amount: p.amount,
                          netPayable: p.amount,
                          paidAmount: p.paidAmount || 0,
                          pendingAmount: p.pendingAmount || 0,
                          status: p.status,
                          deductions: { tds: 0, pf: 0, esi: 0, other: 0 },
                          staff: p.staff ? { name: p.staff.name, role: p.staff.role } : undefined,
                        });
                      }}
                      aria-label={`Print payslip for ${p.staff?.name || p.staffId}`}
                      className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold border border-border text-text-primary rounded-lg hover:bg-input motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none"
                    >
                      <Printer size={14} strokeWidth={2} />
                      <span>Payslip</span>
                    </button>
                    {p.status !== MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PAID && (
                      <button data-testid={`manager_hr-hr-managerhrpayrolltable-button-payslip`}
                        onClick={() => setPaymentModal({ payrollId: p.id, staffName: p.staff?.name || `Staff #${p.staffId}`, pendingAmount: p.pendingAmount || p.amount })}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-on-primary rounded-lg hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
                       type="button">
                        <Banknote size={16} strokeWidth={2}/>{t("COPY_PAY_SALARY_1")}</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={payrollColumnCount} className="p-0 border-b-0">
                  <ManagerStaffPayrollAndAttendancePayrollEmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
</ManagerInfrastructureResponsiveTable>
      <ManagerPagination data-testid="manager_hr-managerhrpayrolltable-managerpagination-1" 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalPayrolls} 
        itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
