// RESPONSIBILITY: Renders ManagerStaffPayrollAndAttendancePayrollModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Loader2, X, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Controller } from 'react-hook-form';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_MAX_AMOUNT_MAJOR_UNITS } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance_shared.constants';
import { useManagerStaffPayrollAndAttendancePayrollForm } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendancePayrollForm';
import { ManagerStaffPayrollAndAttendanceFormatCurrency } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/utils/ManagerStaffPayrollAndAttendanceFormatters';


/** @description Renders the ManagerStaffPayrollAndAttendancePayrollModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerStaffPayrollAndAttendancePayrollModal() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const locale = useLocale();

  const { showPayrollModal, staff, form, calcData, submit, handleClose } = useManagerStaffPayrollAndAttendancePayrollForm();
  const { register, control, formState: { errors, isSubmitting } } = form;
  if (!showPayrollModal) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200 overflow-y-auto">
      <div className="my-auto w-full max-w-md rounded-2xl shadow-dialog flex flex-col max-h-dialog-desktop overflow-hidden bg-overlay backdrop-blur-xl border border-border motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-200" role="dialog" aria-modal="true" aria-labelledby="managerhrpayrollmodal-dialog-title">
        <div className="flex items-center justify-between px-8 py-5 border-b border-border shrink-0 bg-overlay">
          <h2 className="text-xl font-bold text-text-primary" id="managerhrpayrollmodal-dialog-title">{t("COPY_DISBURSE_PAYROLL")}</h2>
          <button data-testid="manager_hr-manager-hr-payroll-modal-close-1" type="button" onClick={handleClose} aria-label={t("COPY_CLOSE_PAYROLL_FORM")} className="p-2 rounded-full hover:bg-primary-subtle motion-safe:transition-all text-text-secondary hover:text-primary motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">
            <X size={18} strokeWidth={2}/>
          </button>
        </div>
        <div className="p-8 overflow-y-auto flex-1 min-h-0 custom-scrollbar">
          <form data-testid="manager_hr-managerhrpayrollmodal-form-1" id="payroll-form" onSubmit={submit} className="space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="manager-managerhrpayrollmodal-field-1" className="text-sm font-semibold text-text-secondary">{t("COPY_STAFF_MEMBER_2")}<span className="text-danger-text">*</span></label>
              <Controller name="staffId" control={form.control} render={({ field }) => <ManagerSearchableDropdown ariaLabel={t("COPY_STAFF_MEMBER_2")} ariaInvalid={Boolean(errors.staffId)} ariaDescribedBy={errors.staffId ? 'managerhrpayrollmodal-staffId-error' : undefined} dataTestId="manager_hr-managerhrpayrollmodal-managersearchabledropdown-1" value={String(field.value ?? '')} onChange={field.onChange} placeholder={t("COPY_SELECT_STAFF_4")} options={staff.map((item) => ({ label: `${item.name} (${item.role})`, value: String(item.id) }))}  data-testid="manager_hr-managerhrpayrollmodal-searchable-dropdown-1"/>} />
              {errors.staffId && <p id="managerhrpayrollmodal-staffId-error" className="text-danger-text text-xs mt-1.5">{errors.staffId.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="manager-managerhrpayrollmodal-field-2" className="text-sm font-semibold text-text-secondary">{t("COPY_MONTH_1")}<span className="text-danger-text">*</span></label>
              <input id="manager-managerhrpayrollmodal-field-2" data-testid="manager_hr-manager-hr-payroll-modal-input-month" type="month" {...register('month')} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-text-primary" aria-invalid={errors.month ? 'true' : undefined} aria-describedby={errors.month ? 'managerhrpayrollmodal-month-error' : undefined} />
              {errors.month && <p id="managerhrpayrollmodal-month-error" className="text-danger-text text-xs mt-1.5">{errors.month.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="manager-managerhrpayrollmodal-field-3" className="text-sm font-semibold text-text-secondary">{t("COPY_NET_PAYABLE_AMOUNT")}<span className="text-danger-text">*</span></label>
              <input id="manager-managerhrpayrollmodal-field-3" data-testid="manager_hr-manager-hr-payroll-modal-input-number-1" type="number" min="0" max={MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_MAX_AMOUNT_MAJOR_UNITS} step="0.01" {...register('amount', { valueAsNumber: true })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-text-primary" aria-invalid={errors.amount ? 'true' : undefined} aria-describedby={errors.amount ? 'managerhrpayrollmodal-amount-error' : undefined} />
              {calcData && (
                <div className="mt-3 p-4 rounded-xl bg-primary-subtle border border-border space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-text-secondary">{t("COPY_BASE_SALARY_1")}</span><span className="font-medium text-text-primary">{ManagerStaffPayrollAndAttendanceFormatCurrency(calcData.base, ManagerEnvConfig.currencyCode, locale)}</span></div>
                  <div className="flex justify-between text-danger-text"><span>{t("COPY_ATTENDANCE_DED")}</span><span>-{ManagerStaffPayrollAndAttendanceFormatCurrency(calcData.attDed, ManagerEnvConfig.currencyCode, locale)}</span></div>
                  <div className="flex justify-between text-warning-text"><span>{t("COPY_ADVANCE_ADJ")}</span><span>-{ManagerStaffPayrollAndAttendanceFormatCurrency(calcData.advAdj, ManagerEnvConfig.currencyCode, locale)}</span></div>
                  <div className="pt-2 border-t border-border flex justify-between text-sm font-bold text-text-primary"><span>{t("COPY_NET_AUTO_CALCULATED")}</span><span>{ManagerStaffPayrollAndAttendanceFormatCurrency(calcData.net, ManagerEnvConfig.currencyCode, locale)}</span></div>
                </div>
              )}
              {errors.amount && <p id="managerhrpayrollmodal-amount-error" className="text-danger-text text-xs mt-1.5">{errors.amount.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="manager-managerhrpayrollmodal-field-4" className="text-sm font-semibold text-text-secondary">{t("COPY_AMOUNT_PAYING_NOW")}<span className="text-danger-text">*</span></label>
              <input id="manager-managerhrpayrollmodal-field-4" data-testid="manager_hr-manager-hr-payroll-modal-input-number-2" type="number" min="0" max={MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_MAX_AMOUNT_MAJOR_UNITS} step="0.01" {...register('paidAmount', { valueAsNumber: true })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-text-primary" aria-invalid={errors.paidAmount ? 'true' : undefined} aria-describedby={errors.paidAmount ? 'managerhrpayrollmodal-paidAmount-error' : undefined} />
              {errors.paidAmount && <p id="managerhrpayrollmodal-paidAmount-error" className="text-danger-text text-xs mt-1.5">{errors.paidAmount.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="manager-managerhrpayrollmodal-field-5" className="text-sm font-semibold text-text-secondary">{t("COPY_NOTES_3")}</label>
              <textarea id="manager-managerhrpayrollmodal-field-5" data-testid="manager_hr-manager-hr-payroll-modal-textarea-message-input" {...register('notes')} rows={3} className="w-full px-4 py-3 rounded-xl border border-border text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring resize-none bg-input text-text-primary" placeholder={t("COPY_OPTIONAL_NOTES")} />
            </div>
          </form>
        </div>
        <div className="px-8 py-5 border-t border-border flex justify-end gap-3 bg-primary-subtle shrink-0">
          <button data-testid="manager_hr-manager-hr-payroll-modal-close-2" type="button" onClick={handleClose} className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-border motion-safe:transition-all text-text-secondary hover:bg-primary-subtle hover:text-primary motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">{t("COPY_CANCEL_2")}</button>
          <button data-testid="manager_hr-manager-hr-payroll-modal-button-submit" type="submit" form="payroll-form" disabled={isSubmitting} className="min-w-40 flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold text-on-primary bg-primary disabled:opacity-70 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">
            {isSubmitting ? <Loader2 size={18} strokeWidth={2} className="text-on-primary motion-safe:animate-spin" /> : <Check size={18} strokeWidth={2}/>}
            {isSubmitting ? t('COPY_SAVING') : t('COPY_DISBURSE_PAYROLL')}
          </button>
        </div>
      </div>
    </div>
  );
}
