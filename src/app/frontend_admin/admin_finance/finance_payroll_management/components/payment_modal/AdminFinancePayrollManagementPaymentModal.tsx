"use client";
// RESPONSIBILITY: Renders the Admin Finance payroll payment form using module-owned form orchestration.
// DATA FLOW: feature data/state and user input → AdminFinancePayrollManagementPaymentModal → accessible UI/events routed to owning hooks (admin_finance/finance_payroll_management/components/payment_modal/AdminFinancePayrollManagementPaymentModal.tsx)

import { Loader2, IndianRupee, X } from 'lucide-react';
import { AdminFinancePayrollManagementFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementFormatCurrency';
import { AdminFinancePayrollManagementFromMinorUnits } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementCurrencyUnits';
import { useAdminFinancePayrollManagementPaymentModalForm } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementPaymentModalForm';
import { useRef } from 'react';
import { useAdminFinancePayrollManagementDialogFocus } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementDialogFocus';

/**
 * @description Presents the validated payroll payment form and delegates lifecycle/mutation behavior to the form hook.
 * @dependencies Admin Finance payment-form hook and the module currency formatter.
 * @edge-case Renders nothing when no payment intent is active and keeps the form open when mutation fails.
 */
export default function AdminFinancePayrollManagementPaymentModal() {
  const { locale, t, paymentModal, setPaymentModal, form, amount, submit } = useAdminFinancePayrollManagementPaymentModalForm();
  const dialogRef = useRef<HTMLDivElement>(null);
  useAdminFinancePayrollManagementDialogFocus(Boolean(paymentModal), dialogRef, () => setPaymentModal(null));
  if (!paymentModal) return null;

  return (
    <div ref={dialogRef} data-admin-dialog="true" role="dialog" aria-modal="true" aria-labelledby="admin-hr-payment-title" tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center bg-overlay backdrop-blur-sm p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-base overflow-y-auto" data-testid="admin_hr-admin_hr-payment-modal-control">
      <div className="my-auto bg-overlay backdrop-blur-xl rounded-2xl shadow-dialog w-full max-w-md max-h-dialog-desktop flex flex-col overflow-hidden motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-base border border-border">
        <div className="p-5 flex justify-between items-center border-b border-border shrink-0 bg-overlay">
          <h3 id="admin-hr-payment-title" className="font-bold text-primary">{t('hr.admin_hr_payment_modal.text_669fa93630')}</h3>
          <button type="button" onClick={() => setPaymentModal(null)} className="min-h-11 min-w-11 p-1.5 text-secondary hover:text-primary hover:bg-surface-hover rounded-md motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" data-testid="admin_hr-admin_hr-payment-modal-close">
            <X size={18}  strokeWidth={2}/>
          </button>
        </div>
        <form onSubmit={submit} className="min-h-0 flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar" data-testid="admin_hr-admin_hr-payment-modal-form">
          <div className="p-4 rounded-xl bg-surface-hover border border-border mb-2">
            <p className="text-sm text-secondary mb-1">{t('hr.admin_hr_payment_modal.text_4f15794d3f')}<strong className="text-primary">{paymentModal.staffName}</strong></p>
            <p className="text-sm text-secondary">{t('hr.admin_hr_payment_modal.text_cacc074438')}<strong className="text-danger font-bold text-lg">{AdminFinancePayrollManagementFormatCurrency(paymentModal.pendingAmount, undefined, locale)}</strong></p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="admin_hr-payment-amount" className="text-xs font-semibold text-secondary uppercase">{t('hr.admin_hr_payment_modal.text_e513d566c3')}</label>
              <button type="button" onClick={() => form.setValue('amount', AdminFinancePayrollManagementFromMinorUnits(paymentModal.pendingAmount), { shouldDirty: true, shouldValidate: true })} className="min-h-11 px-2 text-xs font-bold text-primary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-w-11 motion-safe:active:scale-95" data-testid="admin_hr-admin_hr-payment-modal-fill-pending">{t('hr.admin_hr_payment_modal.text_0286e51411')}</button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><IndianRupee size={18} className="text-secondary"  strokeWidth={2}/></div>
              <input id="admin_hr-payment-amount" type="number" min="0.01" step="0.01" max={AdminFinancePayrollManagementFromMinorUnits(paymentModal.pendingAmount)} value={amount} onChange={(e) => form.setValue('amount', Number(e.target.value), { shouldDirty: true, shouldValidate: true })} aria-invalid={Boolean(form.formState.errors.amount)} aria-describedby="admin_hr-payment-amount-error" className="w-full min-h-11 pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:border-focus focus-visible:ring-1 focus-visible:ring-primary text-primary motion-safe:transition-all motion-safe:duration-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out" data-testid="admin_hr-admin_hr-payment-modal-amount" />
            </div>
            {form.formState.errors.amount && <p id="admin_hr-payment-amount-error" className="mt-1 text-xs text-danger" data-testid="admin_hr-admin_hr-payment-modal-amount-error">{t('hr.admin_hr_payment_modal.validation_amount')}</p>}
          </div>
          <div className="sticky bottom-0 bg-overlay border-t border-border pt-4 mt-6 shrink-0">
            <button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid || Number(amount) <= 0 || Number(amount) > AdminFinancePayrollManagementFromMinorUnits(paymentModal.pendingAmount)} className="w-full min-h-11 py-2.5 bg-primary text-on-primary text-sm font-bold rounded-xl hover:bg-primary-hover motion-safe:transition-all motion-safe:hover:scale-105 motion-safe:active:scale-95 shadow-dialog disabled:opacity-50 motion-safe:motion-safe:disabled:hover:scale-100 disabled:shadow-none motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out min-w-11" data-testid="admin_hr-adminhrpaymentmodal-button-1">
              {form.formState.isSubmitting ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/> {t('hr.admin_hr_payment_modal.auto_60628c6169')}</> : t('hr.admin_hr_payment_modal.auto_5af677997f')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
