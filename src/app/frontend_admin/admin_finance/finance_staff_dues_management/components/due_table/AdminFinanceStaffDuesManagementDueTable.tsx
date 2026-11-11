"use client";
// RESPONSIBILITY: Renders the Admin Finance due-payment workflow; validation and mutation orchestration stay in useAdminFinanceStaffDuesManagementDueForm.
// DATA FLOW: feature data/state and user input → AdminFinanceStaffDuesManagementDueTable → accessible UI/events routed to owning hooks (admin_finance/finance_staff_dues_management/components/due_table/AdminFinanceStaffDuesManagementDueTable.tsx)

import { useLocale, useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';
import { AdminFinanceStaffDuesManagementFromMinorUnits } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementCurrencyUnits';
import { AdminFinanceStaffDuesManagementFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementFormatCurrency';
import { FINANCE_STAFF_DUES_PAYMENT_MODE_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/constants/AdminFinanceStaffDuesManagementConstants';
import { useAdminFinanceStaffDuesManagementDueForm } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementDueForm';
import { useAdminFinanceStaffDuesManagementDueAmountSync } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementDueAmountSync';
import { Loader2, AlertCircle } from 'lucide-react';
import { resolveAdminFinanceStaffDuesManagementValidationMessage } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementValidationMessages';

/**
 * AdminFinanceStaffDuesManagementDueTable renders the staff-due settlement workflow for Admin Finance.
 * @remarks The view consumes RHF/Zod state from its adjacent hook and never owns mutation/API logic.
 * @description AdminFinanceStaffDuesManagementDueTable: Renders the Admin Finance due-payment workflow; validation and mutation orchestration stay in useAdminFinanceStaffDuesManagementDueForm.
 * @dependencies Consumes AdminFinanceStaffDuesManagementFormatCurrency, AdminFinanceStaffDuesManagementConstants, useAdminFinanceStaffDuesManagementDueForm.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceStaffDuesManagementDueTable() {
  const locale = useLocale();
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => resolveAdminFinanceStaffDuesManagementValidationMessage(message, (key) => t(key));
  const { staff, selectedStaff, saving, form, submit } = useAdminFinanceStaffDuesManagementDueForm();
  const { register, setValue, formState: { errors } } = form;
  const selectedStaffId = form.watch('staffId');
  const amount = form.watch('amount');

  useAdminFinanceStaffDuesManagementDueAmountSync(form, selectedStaff);
  const maxAmount = selectedStaff ? AdminFinanceStaffDuesManagementFromMinorUnits(selectedStaff.currentDue) : undefined;

  return (
    <div className="space-y-6 w-full">
      {staff.some((member) => (member.currentDue || 0) > 0) && (
        <div className="bg-warning-bg border border-border rounded-xl p-4 flex gap-3 items-start">
          <AlertCircle className="text-warning mt-0.5" size={18} aria-hidden="true"  strokeWidth={2}/>
          <div>
            <h4 className="font-semibold text-warning text-sm">{t('hr.admin_hr_due_table.text_afcfe5d61e')}</h4>
            <p className="text-sm text-secondary mt-1">
              {t('hr.admin_hr_due_table.text_799c9f2a12')}{staff.filter((member) => (member.currentDue || 0) > 0).length} {t('hr.admin_hr_due_table.text_0f3f0bbd43')}<strong className="ml-1 text-primary">{AdminFinanceStaffDuesManagementFormatCurrency(staff.reduce((sum, member) => sum + (member.currentDue || 0), 0), undefined, locale)}</strong>
            </p>
          </div>
        </div>
      )}

      <div className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold mb-6 text-primary">{t('hr.admin_hr_due_table.text_09b5727d9f')}</h2>
        <form onSubmit={submit} className="space-y-5" noValidate data-testid="admin_hr-admin_hr-due-table-submit">
          <div>
            <label htmlFor="admin-hr-due-staff" className="block text-sm font-medium mb-1 text-primary">{t('hr.admin_hr_due_table.text_88d53ffc1d')}</label>
            <select
              id="admin-hr-due-staff"
              required
              {...register('staffId')}
              aria-invalid={errors.staffId ? 'true' : 'false'}
              aria-describedby={errors.staffId ? 'admin_hr-due-staff-error' : undefined}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                const nextId = event.target.value;
                setValue('staffId', nextId, { shouldDirty: true, shouldValidate: true });
              }}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
              data-testid="admin_hr-admin_hr-due-table-control"
            >
              <option value="" disabled data-testid="admin_hr-admin_hr-due-table-control-2">{t('hr.admin_hr_due_table.text_137fc8d360')}</option>
              {staff.map((member) => (
                <option key={member.id} value={member.id} data-testid={`admin_hr-admin_hr-due-table-option-${member.id}`}>
                  {member.name} ({member.role}{t('hr.admin_hr_due_table.text_a54b6d2020')}{AdminFinanceStaffDuesManagementFormatCurrency(member.currentDue || 0, undefined, locale)})
                </option>
              ))}
            </select>
            {errors.staffId && <p id="admin_hr-due-staff-error" className="mt-1 text-xs text-danger">{getValidationMessage(errors.staffId.message)}</p>}
          </div>

          {selectedStaff && (
            <div className="p-4 bg-warning-bg rounded-lg border border-border text-sm">
              <p><strong>{t('hr.admin_hr_due_table.text_771203a20e')}</strong> {AdminFinanceStaffDuesManagementFormatCurrency(selectedStaff.currentDue || 0, undefined, locale)}</p>
              <p className="text-secondary text-xs mt-1">{t('hr.admin_hr_due_table.text_ffcc23d96a')}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-hr-due-amount" className="block text-sm font-medium mb-1 text-primary">{t('hr.admin_hr_due_table.text_7d42d495a3')}</label>
              <input
                id="admin-hr-due-amount"
                type="number"
                required
                min="0.01"
                step="0.01"
                max={maxAmount}
                {...register('amount', { valueAsNumber: true })}
                aria-invalid={errors.amount ? 'true' : 'false'}
                aria-describedby={errors.amount ? 'admin_hr-due-amount-error' : undefined}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
                data-testid="admin_hr-admin_hr-due-table-control-4"
              />
              {errors.amount && <p id="admin_hr-due-amount-error" className="mt-1 text-xs text-danger">{getValidationMessage(errors.amount.message)}</p>}
            </div>
            <div>
              <label htmlFor="admin-hr-due-payment-mode" className="block text-sm font-medium mb-1 text-primary">{t('hr.admin_hr_due_table.text_23b35c414a')}</label>
              <select id="admin-hr-due-payment-mode" {...register('paymentMode')} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11" data-testid="admin_hr-admin_hr-due-table-control-5">
                {FINANCE_STAFF_DUES_PAYMENT_MODE_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid={`finance_staff_dues_management-finance_staff_dues_management-due-payment-option-${option.value.toLowerCase().replaceAll(' ', '-')}`}>{t(`hr.admin_hr_due_table.text_${option.value === 'Cash' ? '758ec54e43' : option.value === 'Bank Transfer' ? '17ef50d8f8' : option.value === 'UPI' ? 'f295b2cdff' : '6c0a136376'}`)}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="admin-hr-due-notes" className="block text-sm font-medium mb-1 text-primary">{t('hr.admin_hr_due_table.text_70440046a3')}</label>
            <textarea id="admin-hr-due-notes" {...register('notes')} aria-invalid={errors.notes ? 'true' : 'false'} aria-describedby={errors.notes ? 'admin_hr-due-notes-error' : undefined} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-primary min-h-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11" placeholder={t('hr.admin_hr_due_table.text_1bc42af408')} data-testid="admin_hr-admin_hr-due-table-control-10" />
            {errors.notes && <p id="admin_hr-due-notes-error" className="mt-1 text-xs text-danger">{getValidationMessage(errors.notes.message)}</p>}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving || !selectedStaffId || !amount || Number(amount) <= 0 || (selectedStaff && Number(amount) > AdminFinanceStaffDuesManagementFromMinorUnits(selectedStaff.currentDue))}
              className="motion-safe:transition-all motion-safe:duration-base ease-in-out min-w-36 px-6 py-2 bg-primary text-on-primary rounded-lg font-medium disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95"
              data-testid="admin_hr-admin_hr-due-table-submit-2"
            >
              {saving ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> {t('hr.admin_hr_due_table.auto_84c2a1225b')}</> : t('hr.admin_hr_due_table.auto_d5c7d33582')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
