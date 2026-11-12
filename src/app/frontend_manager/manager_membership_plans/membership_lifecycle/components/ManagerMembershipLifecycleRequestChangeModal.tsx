// RESPONSIBILITY: Renders ManagerMembershipLifecycleRequestChangeModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useCallback, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { Send, X, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';

import { useManagerMembershipLifecycleLogic } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleLogic';


/** @description Renders the ManagerMembershipLifecycleRequestChangeModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerMembershipLifecycleRequestChangeModal() {
  const t = useTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');

  const { requestModalPlan, closeRequestModal, submitChangeRequest, saving } = useManagerMembershipLifecycleLogic();
  const [note, setNote] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const { confirm } = useConfirm();

  const isDirty = note.trim().length > 0;
  useManagerInfrastructureUnsavedChangesGuard(isDirty);

  const handleClose = useCallback(async () => {
    if (isDirty) {
      const isConfirmed = await confirm({
        title: t("COPY_DISCARD_CHANGES"),
        message: t("COPY_YOU_HAVE_UNSAVED_CHANGES_YOU_SURE_YOU_WANT_CLOSE"),
        confirmText: t("COPY_DISCARD"),
        type: 'danger'
      });
      if (!isConfirmed) return;
    }
    setNote('');
    closeRequestModal();
  }, [closeRequestModal, confirm, isDirty, t]);
  const closeFromKeyboard = useCallback(() => { void handleClose(); }, [handleClose]);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: Boolean(requestModalPlan), onClose: closeFromKeyboard });

  if (!requestModalPlan) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    await submitChangeRequest(note);
    setNote('');
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-sm overflow-y-auto">
      <div ref={dialogRef} tabIndex={-1} className="my-auto bg-overlay border border-border rounded-2xl shadow-dialog w-full max-w-md max-h-dialog-desktop flex flex-col overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="managerplansrequestchangemodal-dialog-title">
        <div className="flex items-center justify-between p-5 border-b border-border shrink-0 bg-overlay">
          <div>
            <h3 className="text-base font-bold text-text-primary" id="managerplansrequestchangemodal-dialog-title">{t("COPY_REQUEST_PLAN_CHANGE")}</h3>
            <p className="text-xs text-text-secondary mt-0.5">{requestModalPlan.name} — {requestModalPlan.tier}</p>
          </div>
          <button data-testid="manager_plans-manager-plans-main-close-1" type="button" aria-label={t("COPY_CLOSE_REQUEST_CHANGE_DIALOG")} onClick={handleClose} className="min-h-11 min-w-11 flex items-center justify-center p-2 rounded-lg hover:bg-input text-text-secondary motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110">
            <X size={18} strokeWidth={2}/>
          </button>
        </div>
        <form data-testid="manager_plans-managerplansrequestchangemodal-form-1" onSubmit={handleSubmit} className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 custom-scrollbar">
          <div>
            <label htmlFor="manager-managerplansrequestchangemodal-field-1" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">{t("COPY_DESCRIBE_CHANGE_NEEDED")}</label>
            <textarea id="manager-managerplansrequestchangemodal-field-1" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:border-primary resize-none"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_plans-manager-plans-main-textarea-message-input"
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={4}
              placeholder={t("COPY_E_G_INCREASE_1_MONTH_PRICE_1500_ADD_SAUNA")}
              
            />
          </div>
          <div className="sticky bottom-0 bg-overlay border-t border-border pt-3 flex gap-3 shrink-0">
            <button data-testid="manager_plans-manager-plans-main-close-2" type="button" onClick={handleClose}
              className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-border text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">{t("COPY_CANCEL")}</button>
            <button data-testid="manager_plans-manager-plans-main-button-submit" type="submit" disabled={saving || !note.trim()}
              className="min-w-32 flex-1 py-2.5 text-sm font-semibold rounded-xl bg-primary text-on-primary motion-safe:transition-all hover:bg-primary-hover disabled:opacity-50 flex items-center justify-center gap-2 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">
              {saving ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/> : <Send size={18} strokeWidth={2} />}{t("COPY_SEND_REQUEST")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
