// RESPONSIBILITY: Renders ManagerMembersDirectoryAddPaymentModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';
import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLocalUnsavedChangesGuard';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalIdempotency';
import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalToMinorUnits';

import { MEMBER_PAYMENT_METHOD_OPTIONS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_ui.constants';
import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';
import { ManagerMembersDirectoryFormatCurrency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';


/** @description Renders the ManagerMembersDirectoryAddPaymentModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerMembersDirectoryAddPaymentModal() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const locale = useLocale();

  const { showPaymentModal, setShowPaymentModal, recordPayment, selectedMember } = useManagerMembersDirectoryLogic();
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<string | null>(null);
  const idempotencyPayloadRef = useRef<string | null>(null);
  const [amount, setAmount] = useState<number | ''>('');
  const [method, setMethod] = useState('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(!!amount && !isSubmitting);
  const handleClose = () => { void confirmAndClose(() => { idempotencyKeyRef.current = null; idempotencyPayloadRef.current = null; setAmount(''); setMethod('UPI'); setShowPaymentModal(false); }); };

  if (!showPaymentModal || !selectedMember) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    const confirmed = await confirm({ title: t("COPY_CONFIRM_PAYMENT"), message: t("TEXT_RECORD_PAYMENT_MESSAGE", { amount: ManagerMembersDirectoryFormatCurrency(ManagerInfrastructureToManagerMinorUnits(Number(amount)), ManagerEnvConfig.currencyCode, locale), member: selectedMember?.name ?? t("TEXT_MEMBER_FALLBACK") }), confirmText: t("COPY_RECORD_PAYMENT_1"), type: 'warning' });
    if (!confirmed) return;
    const intentFingerprint = JSON.stringify({ memberId: selectedMember.id, amount: Number(amount), method });
    if (idempotencyPayloadRef.current !== intentFingerprint) {
      idempotencyKeyRef.current = ManagerInfrastructureIdempotency();
      idempotencyPayloadRef.current = intentFingerprint;
    }
    idempotencyKeyRef.current ??= ManagerInfrastructureIdempotency();
    setIsSubmitting(true);
    try {
      await recordPayment({ amount: Number(amount), method }, idempotencyKeyRef.current!);
      idempotencyKeyRef.current = null;
      idempotencyPayloadRef.current = null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop backdrop-blur-sm p-4 overflow-y-auto">
      <div className="my-auto bg-overlay w-full max-w-md max-h-dialog-desktop rounded-2xl shadow-dialog overflow-hidden flex flex-col" role="dialog" aria-modal="true" aria-labelledby="managermembersaddpaymentmodal-dialog-title">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0 bg-overlay">
          <h2 className="text-xl font-bold text-text-primary" id="managermembersaddpaymentmodal-dialog-title">{t("COPY_RECORD_PAYMENT_2")}</h2>
          <button data-testid="manager_members-manager-add-payment-modal-close-1" aria-label={t("COPY_CLOSE_PAYMENT_MODAL")} onClick={handleClose} className="p-2 text-text-secondary hover:text-primary rounded-full hover:bg-input motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110" type="button">
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        
        <form data-testid="manager_members-managermembersaddpaymentmodal-form-1" onSubmit={handleSubmit} className="min-h-0 flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {(selectedMember.pendingAmount > 0 || (selectedMember.advanceAmount && selectedMember.advanceAmount > 0)) && (
            <div className={`p-3 rounded-lg border mb-4 ${selectedMember.pendingAmount > 0 ? 'bg-danger-bg border-border' : 'bg-success-bg border-success'}`}>
              <p className={`text-sm font-semibold ${selectedMember.pendingAmount > 0 ? 'text-danger-text' : 'text-success-text'}`}>
                {selectedMember.pendingAmount > 0 
                  ? t("TEXT_CURRENT_DUES_WITH_AMOUNT", { amount: ManagerMembersDirectoryFormatCurrency(selectedMember.pendingAmount, ManagerEnvConfig.currencyCode, locale) }) 
                  : t("TEXT_ADVANCE_BALANCE", { amount: ManagerMembersDirectoryFormatCurrency(selectedMember.advanceAmount || 0, ManagerEnvConfig.currencyCode, locale) })}
              </p>
            </div>
          )}

          <div>
            <label htmlFor="manager-managermembersaddpaymentmodal-field-1" className="block text-sm font-medium text-text-primary mb-1.5">{t("COPY_AMOUNT_1")}</label>
            <input id="manager-managermembersaddpaymentmodal-field-1" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:border-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-manager-add-payment-modal-input-number" 
              type="number"
              disabled={isSubmitting}
              required 
              min="1"
              value={amount}
              onChange={e => setAmount(e.target.value ? Number(e.target.value) : '')}
              
              placeholder={t("COPY_E_G_1500")}
            />
          </div>

          <div>
            <label htmlFor="manager-managermembersaddpaymentmodal-field-2" className="block text-sm font-medium text-text-primary mb-1.5">{t("COPY_PAYMENT_METHOD_1")}</label>
            <select id="manager-managermembersaddpaymentmodal-field-2" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:border-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-manager-add-payment-modal-select-option"
              value={method}
              disabled={isSubmitting}
              onChange={(e) => setMethod(e.target.value)}
              
            >
              {MEMBER_PAYMENT_METHOD_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid="manager_members-managermembersaddpaymentmodal-interactive">{t(option.labelKey)}</option>)}
            </select>
          </div>

          <div className="sticky bottom-0 bg-overlay border-t border-border pt-4 flex gap-3 shrink-0">
            <button data-testid="manager_members-manager-add-payment-modal-close-2"
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-text-secondary hover:text-primary bg-input hover:bg-input rounded-xl motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
            >{t("COPY_CANCEL_2")}</button>
            <button data-testid="manager_members-manager-add-payment-modal-button-submit"
              type="submit"
              disabled={isSubmitting || !amount}
              className="min-w-32 flex-1 px-4 py-2.5 text-sm font-semibold text-primary bg-primary-subtle hover:bg-primary-hover rounded-xl motion-safe:transition-all disabled:opacity-50 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
            >
              {isSubmitting ? t("TEXT_RECORDING") : t("TEXT_CONFIRM_PAYMENT")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
