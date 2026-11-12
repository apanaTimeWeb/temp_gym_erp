"use client";
// RESPONSIBILITY: Form modal for creating a new payroll entry for a staff member in the HR module.
// DATA FLOW: feature data/state and user input → AdminFinancePayrollManagementPayrollModal → accessible UI/events routed to owning hooks (admin_finance/finance_payroll_management/components/payroll_modal/AdminFinancePayrollManagementPayrollModal.tsx)

import { useTranslations } from 'next-intl';
import { resolveAdminFinancePayrollManagementValidationMessage } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementValidationMessages';

import { useAdminFinancePayrollManagementPayrollModalForm } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementPayrollModalForm';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/searchable_dropdown/AdminFinancePayrollManagementSearchableDropdown';
import { X, Check, Loader2 } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useRef } from 'react';
import { useAdminFinancePayrollManagementDialogFocus } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementDialogFocus';

/**
 * AdminFinancePayrollManagementPayrollModal renders the Finance PayrollManagement payroll modal UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePayrollManagementPayrollModal: Form modal for creating a new payroll entry for a staff member in the HR module.
 * @dependencies Consumes useAdminFinancePayrollManagementPayrollModalForm.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePayrollManagementPayrollModal() {
  const t = useTranslations();
  const getValidationMessage = (message: unknown) => resolveAdminFinancePayrollManagementValidationMessage(message, (key) => t(key));

  const { showPayrollModal, savePayroll, saving, staff, calculationInfo, register, handleSubmit, control, errors, handleClose } = useAdminFinancePayrollManagementPayrollModalForm();

  const dialogRef = useRef<HTMLDivElement>(null);
  useAdminFinancePayrollManagementDialogFocus(showPayrollModal, dialogRef, () => { void handleClose(); });
  if (!showPayrollModal) return null;


  return (
    <div ref={dialogRef} data-admin-dialog="true" role="dialog" aria-modal="true" aria-labelledby="admin-hr-payroll-title" tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay overflow-y-auto" data-testid="admin_hr-admin_hr-payroll-modal-control">
      <div className="my-auto w-full max-w-md rounded-2xl shadow-dialog flex flex-col max-h-dialog-desktop overflow-hidden bg-overlay border-2 border-border">
        
        <div className="flex items-center justify-between px-8 py-5 border-b border-border shrink-0 bg-overlay">
          <h2 id="admin-hr-payroll-title" className="text-xl font-bold text-primary">
            {t('hr.admin_hr_payroll_modal.text_998b7ddeda')}</h2>
          <button type="button" onClick={() => void handleClose()} className="p-2 rounded-full hover:bg-primary-subtle motion-safe:transition-colors text-secondary hover:text-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_hr-admin_hr-payroll-modal-click">
            <X size={18}  strokeWidth={2}/>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 min-h-0 custom-scrollbar">
          <form id="payroll-form" onSubmit={handleSubmit((data) => savePayroll({ ...data, staffId: data.staffId }))} className="space-y-6" data-testid="admin_hr-admin_hr-payroll-modal-submit">
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-secondary">{t('hr.admin_hr_payroll_modal.text_261fa12181')}<span className="text-danger">*</span></label>
              <Controller
                name="staffId"
                control={control}
                render={({ field }) => (
                  <AdminNavigationLayoutSearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    placeholder={t('hr.admin_hr_payroll_modal.text_137fc8d360')}
                    ariaLabel={t('hr.admin_hr_payroll_modal.text_261fa12181')}
                    ariaInvalid={Boolean(errors.staffId)}
                    ariaDescribedBy={errors.staffId ? 'admin-hr-payroll-staff-error' : undefined}
                    options={staff.map(s => ({ label: `${s.name} (${s.role}) - ${s.salary}`, value: String(s.id) }))}
                   testId="admin_hr-admin_hr-payroll-modal-change"/>
                )}
              />
              {errors.staffId && <p id="admin-hr-payroll-staff-error" role="alert" className="text-danger text-xs mt-1.5">{getValidationMessage(errors.staffId.message)}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-hr-payroll-month" className="text-sm font-semibold text-secondary">{t('hr.admin_hr_payroll_modal.text_082bc378cd')}<span className="text-danger">*</span></label>
              <input 
                id="admin-hr-payroll-month" type="month" aria-invalid={Boolean(errors.month)} aria-describedby={errors.month ? "admin-hr-payroll-month-error" : undefined}
                {...register('month')}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
               data-testid="admin_hr-admin_hr-payroll-modal-control-2"/>
              {errors.month && <p id="admin-hr-payroll-month-error" role="alert" className="text-danger text-xs mt-1.5">{getValidationMessage(errors.month.message)}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-hr-payroll-amount" className="text-sm font-semibold text-secondary">{t('hr.admin_hr_payroll_modal.text_43dc8532f7')}<span className="text-danger">*</span></label>
              <input 
                id="admin-hr-payroll-amount" type="number" min="0" step="1" aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? "admin-hr-payroll-amount-error" : undefined} onKeyDown={(e) => { if (['e', 'E', '-', '+'].includes(e.key)) e.preventDefault(); }}
                {...register('amount', { valueAsNumber: true })}
                readOnly
                className="w-full px-4 py-3 border border-dashed border-border rounded-xl text-sm bg-input text-primary cursor-default opacity-100 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
               data-testid="admin_hr-admin_hr-payroll-modal-control-3"/>
              <p className="text-xs text-secondary mt-1.5">
                {calculationInfo ? calculationInfo : t('hr.admin_hr_payroll_modal.auto_0b653ad05a')}</p>
              {errors.amount && <p id="admin-hr-payroll-amount-error" role="alert" className="text-danger text-xs mt-1.5">{getValidationMessage(errors.amount.message)}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="admin-hr-payroll-notes" className="text-sm font-semibold text-secondary">{t('hr.admin_hr_payroll_modal.text_70440046a3')}</label>
              <textarea id="admin-hr-payroll-notes"
                {...register('notes')}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base resize-none bg-input text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
                placeholder={t('hr.admin_hr_payroll_modal.text_ba40661c4f')}
               data-testid="admin_hr-admin_hr-payroll-modal-control-4"/>
            </div>

          </form>
        </div>

        <div className="px-8 py-5 border-t border-border flex justify-end gap-3 bg-card shrink-0">
          <button 
            type="button" 
            onClick={() => void handleClose()}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-border motion-safe:transition-colors text-secondary hover:bg-surface-highlight hover:text-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_hr-admin_hr-payroll-modal-click-2">
            {t('hr.admin_hr_payroll_modal.text_77dfd2135f')}</button>
          <button 
            type="submit" 
            form="payroll-form"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold text-on-primary motion-safe:transition-all hover:shadow-dialog motion-safe:active:scale-95 disabled:opacity-70 bg-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11"
           data-testid="admin_hr-admin_hr-payroll-modal-submit-2">
            {saving ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" /> : <Check size={18}  strokeWidth={2}/>}
            {saving ? t('hr.admin_hr_payroll_modal.auto_a44beb691d') : t('hr.admin_hr_payroll_modal.auto_feeb8370ab')}
          </button>
        </div>

      </div>
    </div>
  );
}
