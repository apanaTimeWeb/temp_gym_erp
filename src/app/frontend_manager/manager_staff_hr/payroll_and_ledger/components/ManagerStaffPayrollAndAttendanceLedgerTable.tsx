// RESPONSIBILITY: Renders ManagerStaffPayrollAndAttendanceLedgerTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { useState } from 'react';

import { useTranslations, useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';

import ManagerStaffPayrollAndAttendanceLedgerEmptyState from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerStaffPayrollAndAttendanceLedgerEmptyState';
import { useManagerStaffPayrollAndAttendanceLedgerQuery } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceLedgerQuery';
import { useManagerStaffPayrollAndAttendanceLogic } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceLogic';
import { ManagerStaffPayrollAndAttendanceDisplayValue, ManagerStaffPayrollAndAttendanceFormatCurrency, ManagerStaffPayrollAndAttendanceFormatDate } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/utils/ManagerStaffPayrollAndAttendanceFormatters';


/**
 * @description Renders/orchestrates the ManagerStaffPayrollAndAttendanceLedgerTable user interface for the hr module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_staff_hr/manager_hr_utils/ManagerStaffPayrollAndAttendanceFormatters; @/app/frontend_manager/manager_staff_hr/manager_hr_components/manager_hr_ledger_empty_state/ManagerStaffPayrollAndAttendanceLedgerEmptyState; @/app/frontend_manager/manager_staff_hr/manager_hr_hooks/useManagerStaffPayrollAndAttendanceLedgerQuery; @/app/frontend_manager/manager_staff_hr/manager_hr_hooks/useManagerStaffPayrollAndAttendanceLogic; @/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const HR_LEDGER_COLUMN_COUNT = 6;

/** @description Renders the ManagerStaffPayrollAndAttendanceLedgerTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves loading state, empty state, error state. */
export default function ManagerStaffPayrollAndAttendanceLedgerTable() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const locale = useLocale();

  const { staff } = useManagerStaffPayrollAndAttendanceLogic();
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const effectiveStaffId = selectedStaffId || staff[0]?.id || '';
  const { data: ledgerResponse, isPending: loading, isError, error } = useManagerStaffPayrollAndAttendanceLedgerQuery(effectiveStaffId);
  const ledger = ledgerResponse?.data?.ledger ?? [];

  const selectedStaff = staff.find(s => String(s.id) === String(effectiveStaffId));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-end">
        <div>
          <h2 className="text-lg font-bold text-text-primary">{t("COPY_STAFF_LEDGER")}</h2>
          <p className="text-sm text-text-secondary">{t("COPY_VIEW_DETAILED_TRANSACTION_HISTORY_STAFF_MEMBERS")}</p>
        </div>
        <div className="w-full sm:w-64">
          <label htmlFor="manager-managerhrledgertable-field-1" className="block text-xs text-text-secondary mb-1">{t("COPY_SELECT_STAFF_MEMBER")}</label>
          <ManagerSearchableDropdown ariaLabel={t("COPY_SELECT_STAFF_MEMBER")} dataTestId="manager_hr-managerhrledgertable-managersearchabledropdown-1"
            value={effectiveStaffId}
            onChange={(value) => setSelectedStaffId(String(value))}
            options={staff.map((member) => ({ value: member.id, label: `${member.name} (${member.role})` }))}
            placeholder={t("COPY_SELECT_STAFF_5")}
           data-testid="manager_hr-managerhrledgertable-searchable-dropdown-1"/>
        </div>
      </div>

      {selectedStaff && (
        <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
          <div className="bg-card p-4 rounded-xl border border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
            <p className="text-xs text-text-secondary uppercase">{t("COPY_BASE_SALARY_2")}</p>
            <p className="text-xl font-bold text-text-primary">{ManagerStaffPayrollAndAttendanceFormatCurrency(selectedStaff.salary || 0, ManagerEnvConfig.currencyCode, locale)}{t("COPY_MO")}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
            <p className="text-xs text-text-secondary uppercase">{t("COPY_ADVANCE_BALANCE_2")}</p>
            <p className="text-xl font-bold text-danger-text">{ManagerStaffPayrollAndAttendanceFormatCurrency(selectedStaff.advanceSalary || 0, ManagerEnvConfig.currencyCode, locale)}</p>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
            <p className="text-xs text-text-secondary uppercase">{t("COPY_DUE_AMOUNT")}</p>
            <p className="text-xl font-bold text-warning-text">{ManagerStaffPayrollAndAttendanceFormatCurrency(selectedStaff.currentDue || 0, ManagerEnvConfig.currencyCode, locale)}</p>
          </div>
        </div>
      )}

      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <ManagerInfrastructureResponsiveTable labels={[t('COPY_DATE_1'), t('COPY_TRANSACTION_TYPE'), t('COPY_NOTES_1'), t('COPY_CREDIT'), t('COPY_DEBIT'), t('COPY_BALANCE')]}>
<table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-input border-b border-border text-sm">
                <th className="p-4 font-medium text-text-secondary whitespace-nowrap">{t("COPY_DATE_1")}</th>
                <th className="p-4 font-medium text-text-secondary whitespace-nowrap">{t("COPY_TRANSACTION_TYPE")}</th>
                <th className="p-4 font-medium text-text-secondary">{t("COPY_NOTES_1")}</th>
                <th className="p-4 font-medium text-text-secondary text-right">{t("COPY_CREDIT")}</th>
                <th className="p-4 font-medium text-text-secondary text-right">{t("COPY_DEBIT")}</th>
                <th className="p-4 font-medium text-text-secondary text-right bg-primary-subtle">{t("COPY_BALANCE")}</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              {(() => { if (loading) { return (
                [1, 2, 3, 4, 5].map((skeletonRow) => (
                  <tr key={`ledger-loading-row-${skeletonRow}`} className="motion-safe:animate-pulse">
                    {Array.from({ length: HR_LEDGER_COLUMN_COUNT }, (_, cellIndex) => (
                      <td key={`ledger-loading-row-${skeletonRow}-cell-${cellIndex + 1}`} className="p-4"><div className="h-4 w-full max-w-32 rounded bg-input" /></td>
                    ))}
                  </tr>
                ))
              ); } return (() => { if (isError) { return (
                <tr><td colSpan={HR_LEDGER_COLUMN_COUNT} className="p-10 text-center text-danger-text">{ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR'))}</td></tr>
              ); } return (() => { if (ledger.length === 0) { return (
                <tr><td colSpan={HR_LEDGER_COLUMN_COUNT} className="p-0"><ManagerStaffPayrollAndAttendanceLedgerEmptyState /></td></tr>
              ); } return (
                ledger.map(l => (
                  <tr key={l.id} className="hover:bg-surface-highlight motion-safe:transition-all motion-safe:duration-200 ease-in-out">
                    <td className="p-4 text-text-primary whitespace-nowrap">{ManagerStaffPayrollAndAttendanceFormatDate(l.date)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                        ${(() => { if (l.type.includes('Advance')) { return 'bg-danger text-on-danger'; } return (() => { if (l.type.includes('Salary Generated')) { return 'bg-info text-on-info'; } return (() => { if (l.type.includes('Due')) { return 'bg-warning text-on-warning'; } return 'bg-success text-on-success'; })(); })(); })()}`} data-testid="manager_hr-managerhrledgertable-status-badge-1">
                        {l.type}
                      </span>
                    </td>
                    <td className="p-4 text-text-secondary max-w-50 truncate" title={ManagerStaffPayrollAndAttendanceDisplayValue(l.notes)}>{ManagerStaffPayrollAndAttendanceDisplayValue(l.notes)}</td>
                    <td className="p-4 text-right text-success-text font-medium">{l.credit > 0 ? `+${ManagerStaffPayrollAndAttendanceFormatCurrency(l.credit, ManagerEnvConfig.currencyCode, locale)}` : '—'}</td>
                    <td className="p-4 text-right text-danger-text font-medium">{l.debit > 0 ? `-${ManagerStaffPayrollAndAttendanceFormatCurrency(l.debit, ManagerEnvConfig.currencyCode, locale)}` : '—'}</td>
                    <td className="p-4 text-right font-bold text-primary bg-primary-subtle">{ManagerStaffPayrollAndAttendanceFormatCurrency(l.balance, ManagerEnvConfig.currencyCode, locale)}</td>
                  </tr>
                ))
              ); })(); })(); })()}
            </tbody>
          </table>
</ManagerInfrastructureResponsiveTable>
        </div>
      </div>
    </div>
  );
}
