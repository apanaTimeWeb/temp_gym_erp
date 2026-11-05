// RESPONSIBILITY: Renders ManagerMembersDirectoryMessageModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useEffect, useMemo, useState } from 'react';

import { Loader2, X, Send, MessageCircle, Mail, Phone, AtSign } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLocalUnsavedChangesGuard';

import type { ManagerMembersDirectoryMessageModalProps } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_message.types';










/** @description Renders the ManagerMembersDirectoryMessageModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerMembersDirectoryMessageModal({
 isOpen,
 open,
 onClose,
 recipient,
 type,
 defaultMessage,
 message: propMessage,
 subject: defaultSubject = 'Message from GymSmart',
 whatsappUrlBuilder }: ManagerMembersDirectoryMessageModalProps) {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');

 const [message, setMessage] = useState(defaultMessage || propMessage || '');
 const [subject, setSubject] = useState(defaultSubject);
 const [sending, setSending] = useState(false);
 const initialMessage = useMemo(() => defaultMessage || propMessage || '', [defaultMessage, propMessage]);
 const [sent, setSent] = useState(false);
 const initialSubject = defaultSubject;
 useEffect(() => { setMessage(initialMessage); setSubject(defaultSubject); setSent(false); }, [defaultSubject, initialMessage]);
 const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(message !== initialMessage || subject !== initialSubject);

 if (!(isOpen || open)) return null;

 const Icon = type === 'whatsapp' ? MessageCircle : Mail;
 const label = type === 'whatsapp' ? t('TEXT_CHANNEL_WHATSAPP') : t('TEXT_CHANNEL_EMAIL');
 const contactInfo = type === 'whatsapp' ? recipient.phone : recipient.email;

 const handleSend = async () => {
  setSending(true);
  try {
   if (type === 'whatsapp') {
    const phone = contactInfo?.replace(/\D/g, '') || '';
    const url = whatsappUrlBuilder?.(phone, message);
    if (!url) return;
    const openedWindow = window.open(url, '_blank');
    if (!openedWindow) return;
    openedWindow.opener = null;
   } else {
    const url = `mailto:${contactInfo || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = url;
   }
   setSent(true);
  } finally {
   setSending(false);
  }
 };

 const handleClose = () => {
  if (sending) return;
  void confirmAndClose(() => {
   setSent(false);
   setMessage(initialMessage);
   setSubject(initialSubject);
   onClose();
  });
 };

 return (
 <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-sm">
 <div
 role="dialog" aria-modal="true" aria-label={t("TEXT_MESSAGE_DIALOG_LABEL")} className="bg-overlay rounded-2xl shadow-dialog w-full max-w-lg relative overflow-hidden border border-border"

 >
 <div
 className={`px-6 py-4 flex items-center justify-between ${type === 'whatsapp' ? 'bg-social-whatsapp' : 'bg-info-bg'}`}
 
 >
 <div className="flex flex-wrap items-center gap-3">
 <div className="w-9 h-9 rounded-full bg-primary-subtle flex items-center justify-center">
 <Icon size={18} className="text-text-primary" />
 </div>
 <div>
 <p className="text-text-primary font-bold text-base leading-tight">{label}{t("COPY_MESSAGE_2")}</p>
 <p className="text-text-primary text-xs">{t("COPY_SENDING_1")}{recipient.name}</p>
 </div>
 </div>
 <button data-testid="manager_members-manager-members-message-modal-close-1"
 aria-label={t("COPY_CLOSE_MESSAGE_DIALOG_1")}
 onClick={handleClose}
 disabled={sending}
 className="min-w-11 min-h-11 rounded-full bg-primary-subtle hover:bg-primary-subtle flex items-center justify-center motion-safe:transition-all disabled:opacity-50 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
  type="button">
 <X size={18} strokeWidth={2} className="text-primary" />
 </button>
 </div>

 <div className="px-6 pt-4 pb-2">
 <div className="flex items-center gap-3 p-3 bg-input rounded-xl border border-border">
 <div
 className="w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold text-sm flex-shrink-0 bg-primary-subtle"
 >
 {recipient.name.charAt(0)}
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-semibold text-text-primary truncate">{recipient.name}</p>
 <div className="flex items-center gap-1 mt-0.5">
 {type === 'whatsapp' ? (
 <Phone size={18} strokeWidth={2} className="text-text-secondary flex-shrink-0"/>
 ) : (
 <AtSign size={18} strokeWidth={2} className="text-text-secondary flex-shrink-0"/>
 )}
 <p className="text-xs text-text-secondary truncate">{contactInfo || t('COPY_N')}</p>
 </div>
 </div>
 </div>
 </div>

 {type === 'email' && (
 <div className="px-6 pt-2">
 <label htmlFor="manager-managermembersmessagemodal-field-1" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">{t("COPY_SUBJECT")}</label>
 <input id="manager-managermembersmessagemodal-field-1" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg focus-visible:outline-none focus-visible:border-primary text-text-primary disabled:opacity-60"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-manager-members-message-modal-input-text"
 type="text"
 value={subject}
 onChange={(e) => setSubject(e.target.value)}
 disabled={sending || sent}
 
 placeholder={t("COPY_EMAIL_SUBJECT")}
 />
 </div>
 )}

 <div className="px-6 pt-3 pb-2">
 <label htmlFor="manager-managermembersmessagemodal-field-2" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">{t("COPY_MESSAGE_1")}</label>
 <textarea id="manager-managermembersmessagemodal-field-2" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full px-3 py-2.5 text-sm bg-input border border-border rounded-xl focus-visible:outline-none focus-visible:border-primary text-text-primary resize-none disabled:opacity-60"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-manager-members-message-modal-textarea-message-input"
 rows={5}
 value={message}
 onChange={(e) => setMessage(e.target.value)}
 disabled={sending || sent}
 
 placeholder={t("COPY_TYPE_MESSAGE")}
 />
 <p className="text-right text-xs text-text-secondary mt-1">{message.length}{t("COPY_CHARS")}</p>
 </div>

 <div className="px-6 pb-5 flex gap-3">
 <button data-testid="manager_members-manager-members-message-modal-close-2"
 aria-label={t("COPY_CLOSE_MESSAGE_DIALOG_2")}
 onClick={handleClose}
 disabled={sending}
 className="min-w-32 flex-1 px-4 py-2.5 text-sm border border-border rounded-xl hover:bg-input text-text-primary font-medium motion-safe:transition-all disabled:opacity-50 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
  type="button">{t("COPY_CANCEL_1")}</button>
 <button  data-testid="manager_members-manager-members-message-modal-send"
 onClick={handleSend}
 disabled={sending || sent || !message.trim()}
 className={`min-w-32 flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 motion-safe:transition-all disabled:opacity-50 ${(() => { if (sent) return 'bg-success text-on-success'; return (() => { if (type === 'whatsapp') return 'bg-social-whatsapp text-text-primary'; return 'bg-info text-on-info'; })(); })()} motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`}
 
  type="button">
 {(() => { if (sent) return (<>{t("COPY_OPENED")}</>); return (() => { if (sending) return (<>
 <Loader2 size={18} strokeWidth={2} className="text-on-primary motion-safe:animate-spin" />{t("COPY_SENDING_2")}</>); return (<>
 <Send size={18} strokeWidth={2}/>{t("COPY_OPEN")}{label}
 </>); })(); })()}
 </button>
 </div>
 </div>

 </div>
 );
}
