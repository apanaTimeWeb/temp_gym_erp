// RESPONSIBILITY: Renders ManagerStaffPayrollAndAttendancePaymentModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';
import type { FormEvent } from 'react';

import { IndianRupee, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureFromManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureFromManagerMinorUnits';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureToManagerMinorUnits';

import { useManagerStaffPayrollAndAttendanceLogic } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceLogic';
import { useManagerStaffPayrollAndAttendancePaymentModalState } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendancePaymentModalState';
import { ManagerStaffPayrollAndAttendanceFormatCurrency } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/utils/ManagerStaffPayrollAndAttendanceFormatters';


/** @description Renders the ManagerStaffPayrollAndAttendancePaymentModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerStaffPayrollAndAttendancePaymentModal() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const locale = useLocale();

  const { paymentModal, setPaymentModal, markPayrollPaid } = useManagerStaffPayrollAndAttendanceLogic();
  const { confirm } = useConfirm();
  const keyRef = useRef<string | null>(null);
  const { amount, setAmount, isSubmitting, setIsSubmitting } = useManagerStaffPayrollAndAttendancePaymentModalState(paymentModal);

  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(!!amount && !isSubmitting);
  const handleClose = () => { void confirmAndClose(() => setPaymentModal(null)); };


  if (!paymentModal) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    const confirmed = await confirm({ title: t("COPY_CONFIRM_SALARY_PAYMENT"), message: t("TEXT_CONFIRM_SALARY_PAYMENT_MESSAGE", { value: ManagerStaffPayrollAndAttendanceFormatCurrency(ManagerInfrastructureToManagerMinorUnits(Number(amount)), ManagerEnvConfig.currencyCode, locale), staff: paymentModal.staffName }), confirmText: t("COPY_RECORD_PAYMENT"), type: 'warning' });
    if (!confirmed) return;
    keyRef.current ??= ManagerInfrastructureIdempotency();
    setIsSubmitting(true);
    try {
      await markPayrollPaid(paymentModal.payrollId, ManagerInfrastructureToManagerMinorUnits(Number(amount)), keyRef.current);
      keyRef.current = null;
      setPaymentModal(null);
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop backdrop-blur-sm p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
      <div className="bg-overlay backdrop-blur-xl rounded-2xl shadow-dialog w-full max-w-sm overflow-hidden motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-200 border border-border" role="dialog" aria-modal="true" aria-labelledby="managerhrpaymentmodal-dialog-title">
        <div className="p-5 flex justify-between items-center border-b border-border">
          <h3 className="font-bold text-text-primary" id="managerhrpaymentmodal-dialog-title">{t("COPY_PAY_SALARY_2")}</h3>
          <button data-testid="manager_hr-manager-hr-payment-modal-close" aria-label={t("COPY_CLOSE_SALARY_PAYMENT_MODAL")} type="button" onClick={handleClose} className="p-1.5 text-text-secondary min-h-11 min-w-11 inline-flex items-center justify-center hover:text-primary hover:bg-primary-subtle rounded-md motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"><X size={18} strokeWidth={2}/></button>
        </div>
        
        <form data-testid="manager_hr-managerhrpaymentmodal-form-1" onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-primary-subtle border border-border mb-2">
            <p className="text-sm text-text-secondary mb-1">{t("COPY_STAFF")}<strong className="text-text-primary">{paymentModal.staffName}</strong>
            </p>
            <p className="text-sm text-text-secondary">{t("COPY_PENDING")}<strong className="text-danger-text font-bold text-lg">{ManagerStaffPayrollAndAttendanceFormatCurrency(paymentModal.pendingAmount, ManagerEnvConfig.currencyCode, locale)}</strong>
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="manager-hr-payment-modal-amount" className="text-xs font-semibold text-text-secondary uppercase">{t("COPY_AMOUNT_PAYING")}</label>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "text-xs font-bold text-primary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_hr-manager-hr-payment-modal-button-action" 
                type="button" 
                onClick={() => setAmount(ManagerInfrastructureFromManagerMinorUnits(paymentModal.pendingAmount))}
                
              >{t("COPY_PAY_FULL")}</button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee size={18} strokeWidth={2} className="text-text-secondary" />
              </div>
              <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-focus-ring text-text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_hr-manager-hr-payment-modal-input-number"
                id="manager-hr-payment-modal-amount"
                type="number"
                required
                min="1"
                max={ManagerInfrastructureFromManagerMinorUnits(paymentModal.pendingAmount)}
                step="0.01"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  setAmount(val === '' ? '' : Number(val));
                }}
                
              />
            </div>
          </div>

          <div className="mt-6">
            <button data-testid="manager_hr-manager-hr-payment-modal-button-submit"
              aria-label={isSubmitting ? t("COPY_RECORDING") : t("CONFIRM_PAYMENT")}
              type="submit"
              disabled={isSubmitting || Number(amount) <= 0 || Number(amount) > ManagerInfrastructureFromManagerMinorUnits(paymentModal.pendingAmount)}
              className="w-full py-2.5 bg-primary text-on-primary text-sm font-bold rounded-xl hover:bg-primary-hover motion-safe:transition-all shadow-card disabled:opacity-50 disabled:shadow-none motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
            >
              {isSubmitting ? t('COPY_RECORDING') : t('CONFIRM_PAYMENT')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
