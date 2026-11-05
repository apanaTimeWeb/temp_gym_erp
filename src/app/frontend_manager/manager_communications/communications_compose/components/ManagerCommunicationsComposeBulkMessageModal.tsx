// RESPONSIBILITY: Renders ManagerCommunicationsCampaignsBulkMessageModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useCallback, useRef } from 'react';
import { X, Send, MessageCircle, Mail, CheckCircle, Phone, AtSign, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';

import { useManagerCommunicationsCampaignsBulkMessageDraft } from '@/app/frontend_manager/manager_communications/communications_compose/hooks/useManagerCommunicationsComposeBulkMessageDraft';
import type { ManagerCommunicationsCampaignsBulkMessageModalProps } from '@/app/frontend_manager/manager_communications/communications_compose/types/manager_communications_campaigns_bulk_message_modal.types';




/** @description Renders the ManagerCommunicationsCampaignsBulkMessageModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerCommunicationsCampaignsBulkMessageModal({
  open,
  onClose,
  recipients,
  type,
  defaultMessage = '',
  whatsappUrlBuilder }: ManagerCommunicationsCampaignsBulkMessageModalProps) {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');

  const { message, setMessage, subject, setSubject, openedRecipientKeys, setOpenedRecipientKeys, initialSubject } = useManagerCommunicationsCampaignsBulkMessageDraft(open || false, defaultMessage);

  const isDirty = open && (message !== defaultMessage || subject !== initialSubject || openedRecipientKeys.size > 0);
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(isDirty);
  const dialogRef = useRef<HTMLDivElement>(null);
  const handleGuardedClose = useCallback(() => { void confirmAndClose(onClose); }, [confirmAndClose, onClose]);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: open, onClose: handleGuardedClose });
  if (!open) return null;

  const Icon = type === 'whatsapp' ? MessageCircle : Mail;
  const label = type === 'whatsapp' ? t('TEXT_CHANNEL_WHATSAPP') : t('TEXT_CHANNEL_EMAIL');

  const handleSendEmail = () => {
    const validEmails = recipients.map(r => r.email).filter(Boolean).join(',');
    if (!validEmails) return;

    const url = `mailto:?bcc=${validEmails}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = url;

    onClose();
  };

  const personalizeMessage = (baseMsg: string, name: string) => {
    return baseMsg.replace(/{name}/gi, name);
  };

  const handleSendWhatsApp = (index: number) => {
    const recipient = recipients[index];
    if (!recipient) return;
    const phone = recipient.phone?.replace(/\D/g, '') || '';
    if (!phone) return;

    const personalizedMessage = personalizeMessage(message, recipient.name);
    const url = whatsappUrlBuilder?.(phone, personalizedMessage);
    if (!url) return;
    const openedWindow = window.open(url, '_blank');
    if (!openedWindow) return;
    openedWindow.opener = null;

    const recipientKey = `${recipient.phone ?? ''}-${recipient.email ?? ''}-${recipient.name}`;
    setOpenedRecipientKeys(prev => new Set(prev).add(recipientKey));
  };


  const allWhatsAppSent = type === 'whatsapp' && openedRecipientKeys.size === recipients.length && recipients.length > 0;

  const handleDone = () => { setOpenedRecipientKeys(new Set()); setMessage(defaultMessage); setSubject(initialSubject); onClose(); };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-sm">
      <div ref={dialogRef} tabIndex={-1} className="bg-overlay rounded-2xl shadow-dialog w-full max-w-2xl relative overflow-hidden border border-border max-h-full flex flex-col motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-200" role="dialog" aria-modal="true" aria-label={t("TEXT_BULK_MESSAGE_DIALOG_LABEL")}>
        <div
          className={`px-6 py-4 flex items-center justify-between shrink-0 ${type === 'whatsapp' ? 'bg-social-whatsapp' : 'bg-info-bg'}`}
          
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-subtle flex items-center justify-center">
              <Icon size={18} className="text-text-primary" />
            </div>
            <div>
              <p className="text-text-primary font-bold text-base leading-tight">{t("COPY_BULK")}{label}{t("COPY_MESSAGE_1")}</p>
              <p className="text-text-primary text-xs flex items-center gap-1">
                <Users size={18} strokeWidth={2}/>{t("COPY_SENDING_2")}{recipients.length}{t("COPY_RECIPIENTS")}</p>
            </div>
          </div>
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-w-11 min-h-11 w-11 h-11 rounded-full bg-primary-subtle hover:bg-primary-subtle flex items-center justify-center motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-communications-bulk-message-modal-button-close"
            aria-label={t("COPY_CLOSE_BULK_MESSAGE_DIALOG")}
            onClick={handleGuardedClose}
            
           type="button">
            <X size={18} strokeWidth={2} className="text-primary" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
          {type === 'email' && (
            <div className="px-6 pt-5 pb-2 shrink-0">
              <label htmlFor="manager-managercommunicationsbulkmessagemodal-field-1" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">{t("COPY_SUBJECT")}</label>
              <input id="manager-managercommunicationsbulkmessagemodal-field-1" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg focus-visible:outline-none focus-visible:border-primary text-text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-communications-bulk-message-modal-input-text"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                
                placeholder={t("COPY_EMAIL_SUBJECT_2")}
              />
            </div>
          )}

          <div className={`px-6 pb-2 shrink-0 ${type === 'whatsapp' ? 'pt-5' : 'pt-2'}`}>
            <label htmlFor="manager-managercommunicationsbulkmessagemodal-field-2" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">{t("COPY_MESSAGE_CONTENT")}</label>
            <textarea id="manager-managercommunicationsbulkmessagemodal-field-2" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full px-3 py-2.5 text-sm bg-input border border-border rounded-xl focus-visible:outline-none focus-visible:border-primary text-text-primary resize-none"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-communications-bulk-message-modal-textarea-message-input"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              
              placeholder={t("TEXT_TYPE_MESSAGE", { value: label })}
            />
          </div>

          <div className="px-6 pb-2 pt-2 flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">{t("COPY_RECIPIENTS_QUEUE")}</label>
              {type === 'whatsapp' && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-input border border-border text-text-secondary">
                  {openedRecipientKeys.size} / {recipients.length}{t("COPY_OPENED_2")}</span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto bg-input rounded-xl border border-border p-2 space-y-1.5">
              {recipients.map((rec, idx) => {
                const recipientKey = `${rec.phone ?? ''}-${rec.email ?? ''}-${rec.name}`;
                const isSent = openedRecipientKeys.has(recipientKey);
                const hasContactInfo = type === 'whatsapp' ? !!rec.phone : !!rec.email;
                // Stable composite key: phone+email uniquely identifies a recipient in this list
                const stableKey = `${rec.phone ?? ''}-${rec.email ?? ''}-${rec.name}`;

                return (
                  <div key={stableKey} className="flex items-center justify-between p-2.5 bg-overlay rounded-lg border border-border">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-11 min-h-11 w-11 h-11 rounded-full flex items-center justify-center text-primary font-bold text-xs shrink-0 bg-primary-subtle">
                        {rec.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary truncate">{rec.name}</p>
                        <div className="flex items-center gap-1 mt-0.5 text-xs text-text-secondary">
                          {type === 'whatsapp' ? <Phone size={18} strokeWidth={2}/> : <AtSign size={18} strokeWidth={2}/>}
                          <span className="truncate">{type === 'whatsapp' ? rec.phone : rec.email}</span>
                        </div>
                      </div>
                    </div>

                    {type === 'whatsapp' && (
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`shrink-0 min-h-11 px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 motion-safe:transition-all ${
                          isSent
                            ? 'bg-success-bg text-success-text border border-success'
                            : 'bg-social-whatsapp text-text-primary disabled:opacity-50'
                        } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managercommunicationsbulkmessagemodal-button-secondary-${idx}`}
                        onClick={() => handleSendWhatsApp(idx)}
                        disabled={!hasContactInfo || !message.trim()}
                        
                        
                       type="button">
                        {isSent ? (
                          <><CheckCircle size={18} strokeWidth={2}/>{t("COPY_OPENED_1")}</>
                        ) : (
                          <><Send size={18} strokeWidth={2}/>{t("COPY_SEND")}</>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            {type === 'whatsapp' && (
              <p className="text-xs text-text-secondary mt-2 italic text-center">{t("COPY_WHATSAPP_PREVENTS_AUTOMATED_BULK_SENDING_CLICK_QUOT_OPEN_QUOT")}</p>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-input border-t border-border flex gap-3 shrink-0">
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-5 py-2.5 text-sm border border-border rounded-xl hover:bg-overlay text-text-primary font-medium motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-communications-bulk-message-modal-button-action" onClick={handleGuardedClose}  type="button">{t("COPY_CANCEL_1")}</button>
          {(() => { if (type === 'email') { return (
            <button data-testid="manager_communications-manager-communications-bulk-message-modal-send-email" onClick={handleSendEmail} disabled={!message.trim()} className="flex-1 px-4 py-2.5 text-sm font-semibold text-on-info rounded-xl flex items-center justify-center gap-2 motion-safe:transition-all disabled:opacity-50 bg-info motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110" type="button">
              <Send size={18} strokeWidth={2}/>{t("COPY_OPEN_EMAIL_CLIENT_BCC_ALL")}</button>
          ); } return (
            <button data-testid="manager_communications-manager-communications-bulk-message-modal-all-whats-app-sent" onClick={allWhatsAppSent ? handleDone : handleGuardedClose} className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 motion-safe:transition-all ${allWhatsAppSent ? 'bg-success text-on-success' : 'bg-overlay border border-border text-text-primary'} motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`} type="button">
              {allWhatsAppSent ? <><CheckCircle size={18} strokeWidth={2}/>{t("COPY_ALL_DONE")}</> : t('COPY_CLOSE_QUEUE')}
            </button>
          ); })()}
        </div>
      </div>
    </div>
  );
}
