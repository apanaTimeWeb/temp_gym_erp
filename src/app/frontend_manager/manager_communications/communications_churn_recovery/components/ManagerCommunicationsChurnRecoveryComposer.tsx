// RESPONSIBILITY: Renders ManagerCommunicationsChurnRecoveryComposer's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';

import { MessageCircle, Mail, Send, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerCommunicationsCampaignsChurnRecoveryComposerHeader from '@/app/frontend_manager/manager_communications/communications_churn_recovery/components/ManagerCommunicationsChurnRecoveryComposerHeader';
import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';

import { CANCELLATIONS_WIN_BACK_TEMPLATES, MANAGER_COMMUNICATIONS_CAMPAIGNS_WIN_BACK_TIER_OPTIONS } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_campaigns_shared.constants';
import { useManagerCommunicationsCampaignsChurnRecoveryComposerState } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/hooks/useManagerCommunicationsChurnRecoveryComposerState';
import type { ManagerCommunicationsCampaignsChurnRecoveryComposerProps } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_campaigns_churn_recovery_composer.types';




/**
 * @description Renders/orchestrates the ManagerCommunicationsCampaignsChurnRecoveryComposer user interface for the communications module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsCampaignsSharedConstants; @/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard.ts; @/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsCampaignsChurnRecoveryComposerTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */

/** @description Renders the ManagerCommunicationsCampaignsChurnRecoveryComposer component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves modal lifecycle, drawer lifecycle. */
export default function ManagerCommunicationsCampaignsChurnRecoveryComposer({
  member,
  isOpen,
  onClose,
  onSend,
  isSending,
  defaultTier }: ManagerCommunicationsCampaignsChurnRecoveryComposerProps) {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');

  const { channel, setChannel, tier, message, setMessage, subject, setSubject, handleTierChange } = useManagerCommunicationsCampaignsChurnRecoveryComposerState(member, defaultTier);
  const initialTemplate = CANCELLATIONS_WIN_BACK_TEMPLATES[tier];
  const isDirty = isOpen && !isSending && (tier !== defaultTier || message !== initialTemplate.message || subject !== initialTemplate.subject);
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(isDirty);

  function handleClose() { void confirmAndClose(onClose); }

  const dialogRef = useRef<HTMLElement>(null);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen, onClose: handleClose });

  function handleSend() {
    if (!member) return;
    onSend(member, channel, tier, message, subject);
  }

  const isEmailChannel  = channel === 'email';
  const canSend         = message.trim().length >= 10 && (!isEmailChannel || subject.trim().length >= 3);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div data-testid="manager_communications-managerchurnrecoverycomposer-backdrop-close"
          className="fixed inset-0 bg-overlay-backdrop backdrop-blur-sm z-40 motion-safe:transition-all motion-safe:duration-200 ease-in-out"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside data-testid="manager_communications-managercommunicationschurnrecoverycomposer-dialog" ref={dialogRef}
        aria-label={t("COPY_WIN_BACK_MESSAGE_COMPOSER")}
        aria-modal="true"
       role="dialog"
        className={`fixed top-0 right-0 h-full w-full sm:w-120 bg-overlay border-l border-border z-40 flex flex-col shadow-card motion-safe:transition-all motion-safe:duration-300 ${
          isOpen ? 'motion-safe:translate-x-0 motion-reduce:translate-x-0' : 'motion-safe:translate-x-full motion-reduce:translate-x-full'
        }`}
      >
        <ManagerCommunicationsCampaignsChurnRecoveryComposerHeader member={member} onClose={handleClose} />

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          {/* Template Tier Selector */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">{t("COPY_TEMPLATE_BASED_TIME_SINCE_EXIT")}</label>
            <div className="flex flex-wrap gap-2">
              {MANAGER_COMMUNICATIONS_CAMPAIGNS_WIN_BACK_TIER_OPTIONS.map((opt, mapIndex) => (
                <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-3 py-1.5 rounded-lg text-xs font-medium border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                    tier === opt.value
                      ? 'bg-primary-subtle text-primary border-primary'
                      : 'bg-input border-border text-text-secondary hover:text-primary'
                  } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managerchurnrecoverycomposer-button-secondary-${mapIndex}`}
                  key={opt.value}
                  type="button"
                  onClick={() => handleTierChange(opt.value)}
                  
                >
                  {t(opt.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Channel */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">{t("COPY_CHANNEL")}</label>
            <div className="flex gap-3">
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                  channel === 'whatsapp'
                    ? 'bg-success border-success text-on-success'
                    : 'bg-input border-border text-text-secondary hover:text-primary'
                } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-button-action-1"
                type="button"
                onClick={() => setChannel('whatsapp')}
                
              >
                <MessageCircle size={18} strokeWidth={2}/>{t("COPY_WHATSAPP_1")}</button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                  channel === 'email'
                    ? 'bg-info border-info text-on-info'
                    : 'bg-input border-border text-text-secondary hover:text-primary'
                } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-button-action-2"
                type="button"
                onClick={() => setChannel('email')}
                
              >
                <Mail size={18} strokeWidth={2}/>{t("COPY_EMAIL_2")}</button>
            </div>
          </div>

          {/* Subject — only for email */}
          {isEmailChannel && (
            <div>
              <label htmlFor="churn-subject" className="block text-sm font-medium text-text-secondary mb-1.5">{t("COPY_EMAIL_SUBJECT_3")}<span className="text-danger-text" aria-hidden="true">*</span>
              </label>
              <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:border-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-churn-subject"
                id="churn-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t("COPY_ENTER_EMAIL_SUBJECT")}
                
                aria-required="true"
              />
            </div>
          )}

          {/* Message Body */}
          <div>
            <label htmlFor="churn-message" className="block text-sm font-medium text-text-secondary mb-1.5">{t("COPY_MESSAGE_2")}<span className="text-danger-text" aria-hidden="true">*</span>
            </label>
            <textarea className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:border-primary motion-safe:transition-all custom-scrollbar motion-safe:duration-200 ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-churn-message"
              id="churn-message"
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("COPY_WRITE_WIN_BACK_MESSAGE")}
              
              aria-required="true"
              aria-describedby="churn-message-hint"
            />
            <p id="churn-message-hint" className="text-xs text-text-secondary mt-1">{t("COPY_USE_2")}<code className="bg-input px-1 py-0.5 rounded text-text-primary">{'{name}'}</code>{t("COPY_AS_PLACEHOLDER_BACKEND_WILL_REPLACE_IT_MEMBERAPOSS_REAL_NAME")}</p>
          </div>

          {/* WhatsApp notice */}
          {channel === 'whatsapp' && (
            <div className="rounded-lg bg-warning border border-warning px-4 py-3 text-xs text-on-warning leading-relaxed">
              ⚠️ <strong>{t("COPY_WHATSAPP_CANNOT_BE_SENT_BULK")}</strong>{t("COPY_CLICKING_QUOT_SEND_QUOT_BELOW_WILL_OPEN_WHATSAPP_PRE")}</div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border shrink-0">
          <button data-testid="manager_communications-manager-churn-recovery-close-2"
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-border text-text-secondary hover:text-primary bg-transparent motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
          >{t("COPY_CANCEL_3")}</button>
          <button data-testid="manager_communications-manager-churn-recovery-send"
            type="button"
            onClick={handleSend}
            disabled={!canSend || isSending || !member}
            className="min-w-32 flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-primary-subtle text-primary disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-all motion-safe:hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out hover:brightness-110"
          >
            {isSending ? (
              <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>
            ) : (
              <Send size={18} strokeWidth={2}/>
            )}
            {isSending ? t('COPY_SENDING_3') : t('COPY_SEND_WIN_BACK')}
          </button>
        </div>
      </aside>
    </>
  );
}
