"use client";
// RESPONSIBILITY: Renders the Admin Finance salary-advance form; all validation and mutation orchestration stays in useAdminFinanceSalaryAdvanceManagementAdvanceForm.
// DATA FLOW: feature data/state and user input → AdminFinanceSalaryAdvanceManagementAdvanceTable → accessible UI/events routed to owning hooks (admin_finance/finance_salary_advance_management/components/advance_table/AdminFinanceSalaryAdvanceManagementAdvanceTable.tsx)

import { Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { AdminFinanceSalaryAdvanceManagementFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/utils/AdminFinanceSalaryAdvanceManagementFormatCurrency';
import { FINANCE_SALARY_ADVANCE_PAYMENT_MODE_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/constants/AdminFinanceSalaryAdvanceManagementConstants';
import { resolveAdminFinanceSalaryAdvanceManagementValidationMessage } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/utils/AdminFinanceSalaryAdvanceManagementValidationMessages';
import { useAdminFinanceSalaryAdvanceManagementAdvanceForm } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementAdvanceForm';

/**
 * AdminFinanceSalaryAdvanceManagementAdvanceTable renders the salary-advance workflow for Admin Finance.
 * @remarks The view consumes RHF/Zod state from its adjacent hook and never owns mutation/API logic.
 * @description AdminFinanceSalaryAdvanceManagementAdvanceTable: Renders the Admin Finance salary-advance form; all validation and mutation orchestration stays in useAdminFinanceSalaryAdvanceManagementAdvanceForm.
 * @dependencies Consumes AdminFinanceSalaryAdvanceManagementFormatCurrency, AdminFinanceSalaryAdvanceManagementConstants, useAdminFinanceSalaryAdvanceManagementAdvanceForm.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceSalaryAdvanceManagementAdvanceTable() {
  const locale = useLocale();
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => resolveAdminFinanceSalaryAdvanceManagementValidationMessage(message, (key) => t(key));
  const { staff, selectedStaff, saving, form, submit } = useAdminFinanceSalaryAdvanceManagementAdvanceForm();
  const { register, formState: { errors } } = form;

  return (
    <div className="max-w-2xl mx-auto bg-card p-6 rounded-xl border border-border">
      <h2 className="text-xl font-bold mb-6 text-primary">{t('hr.admin_hr_advance_table.text_1a794f7e6b')}</h2>
      <form onSubmit={submit} className="space-y-5" noValidate data-testid="admin_hr-admin_hr-advance-table-submit">
        <div>
          <label htmlFor="admin-hr-advance-staff" className="block text-sm font-medium mb-1 text-primary">{t('hr.admin_hr_advance_table.text_88d53ffc1d')}</label>
          <select
            id="admin-hr-advance-staff"
            required
            {...register('staffId')}
            aria-invalid={errors.staffId ? 'true' : 'false'}
            aria-describedby={errors.staffId ? 'admin_hr-advance-staff-error' : undefined}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
            data-testid="admin_hr-admin_hr-advance-table-control"
          >
            <option value="" disabled data-testid="admin_hr-admin_hr-advance-table-control-2">{t('hr.admin_hr_advance_table.text_137fc8d360')}</option>
            {staff.map((member) => (
              <option key={member.id} value={member.id} data-testid={`admin_hr-admin_hr-advance-table-option-${member.id}`}>
                {member.name} ({member.role}{t('hr.admin_hr_advance_table.text_bef328931b')}{AdminFinanceSalaryAdvanceManagementFormatCurrency(member.advanceSalary || 0, undefined, locale)})
              </option>
            ))}
          </select>
          {errors.staffId && <p id="admin_hr-advance-staff-error" className="mt-1 text-xs text-danger">{getValidationMessage(errors.staffId.message)}</p>}
        </div>

        {selectedStaff && (
          <div className="p-4 bg-surface-highlight rounded-lg border border-border text-sm">
            <p><strong>{t('hr.admin_hr_advance_table.text_b548806f45')}</strong> {AdminFinanceSalaryAdvanceManagementFormatCurrency(selectedStaff.advanceSalary || 0, undefined, locale)}</p>
            <p className="text-secondary text-xs mt-1">{t('hr.admin_hr_advance_table.text_eed46ec191')}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="admin-hr-advance-amount" className="block text-sm font-medium mb-1 text-primary">{t('hr.admin_hr_advance_table.text_76aa32f207')}</label>
            <input
              id="admin-hr-advance-amount"
              type="number"
              required
              min="1"
              step="1"
              {...register('amount', { valueAsNumber: true })}
              aria-invalid={errors.amount ? 'true' : 'false'}
              aria-describedby={errors.amount ? 'admin_hr-advance-amount-error' : undefined}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
              data-testid="admin_hr-admin_hr-advance-table-control-4"
            />
            {errors.amount && <p id="admin_hr-advance-amount-error" className="mt-1 text-xs text-danger">{getValidationMessage(errors.amount.message)}</p>}
          </div>
          <div>
            <label htmlFor="admin-hr-advance-payment-mode" className="block text-sm font-medium mb-1 text-primary">{t('hr.admin_hr_advance_table.text_23b35c414a')}</label>
            <select id="admin-hr-advance-payment-mode" {...register('paymentMode')} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11" data-testid="admin_hr-admin_hr-advance-table-control-5">
              {FINANCE_SALARY_ADVANCE_PAYMENT_MODE_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid={`finance_salary_advance_management-finance_salary_advance_management-advance-payment-option-${option.value.toLowerCase().replaceAll(' ', '-')}`}>{t(`hr.admin_hr_advance_table.text_${option.value === 'Cash' ? '758ec54e43' : option.value === 'Bank Transfer' ? '17ef50d8f8' : option.value === 'UPI' ? 'f295b2cdff' : '6c0a136376'}`)}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="admin-hr-advance-notes" className="block text-sm font-medium mb-1 text-primary">{t('hr.admin_hr_advance_table.text_69a6dd8283')}</label>
          <textarea id="admin-hr-advance-notes" {...register('notes')} aria-invalid={errors.notes ? 'true' : 'false'} aria-describedby={errors.notes ? 'admin_hr-advance-notes-error' : undefined} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary min-h-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11" placeholder={t('hr.admin_hr_advance_table.text_3cd6e5ef0c')} data-testid="admin_hr-admin_hr-advance-table-control-10" />
          {errors.notes && <p id="admin_hr-advance-notes-error" className="mt-1 text-xs text-danger">{getValidationMessage(errors.notes.message)}</p>}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="motion-safe:transition-all motion-safe:duration-base ease-in-out min-w-36 px-6 py-2 bg-primary text-on-primary rounded-lg font-medium disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95"
            data-testid="admin_hr-admin_hr-advance-table-submit-2"
          >
            {saving ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> {t('hr.admin_hr_advance_table.auto_21fba6f5c0')}</> : t('hr.admin_hr_advance_table.auto_80a4490614')}
          </button>
        </div>
      </form>
    </div>
  );
}
