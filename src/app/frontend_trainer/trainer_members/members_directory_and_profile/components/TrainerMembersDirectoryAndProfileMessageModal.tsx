"use client";
// RESPONSIBILITY: Renders member-directed WhatsApp or Email delivery for the Members feature.
// DATA FLOW: Members store → message modal → external delivery URL → member.
import { useEffect, useId, useRef, useState } from 'react';

import { X, Send, MessageCircle, Mail, CheckCircle, Phone, AtSign } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/TrainerMembersDirectoryAndProfileuseTrainerInfrastructureUnsavedChangesGuard';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructureTooltip';



import { TrainerMembersBuildMailtoUrl } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileBuildMailtoUrl';

import { TrainerMembersBuildWhatsAppUrl } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileBuildWhatsAppUrl';

import type { TrainerMembersMessageModalProps } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileMessageModalTypes';

import type { TrainerMembersMemberMessageType } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileMessagingTypes';











/**
 * @description Owns the members feature UI responsibility represented by TAB_STYLE, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
const TAB_STYLE: Record<TrainerMembersMemberMessageType, string> = {
  whatsapp: 'bg-social-whatsapp',
  email: 'bg-info',
};

/**
 * @description Renders member-directed WhatsApp or Email delivery for the Members feature.
 * @dependencies Members store → message modal → external delivery URL → member.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders and coordinates the members feature form/modal surface for MembersMessageModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerMembersMessageModal({
  isOpen,
  open,
  onClose,
  recipient,
  type,
  defaultMessage,
  message: propMessage,
  subject: defaultSubject,
  onSuccess,
}: TrainerMembersMessageModalProps) {
  const t = useTranslations('TRAINER_MEMBERS');
  const resolvedDefaultSubject = defaultSubject ?? t('TEXT_DEFAULT_MESSAGE_SUBJECT');
  const initialMessage = defaultMessage || propMessage || '';
  const [message, setMessage] = useState(initialMessage);
  const [subject, setSubject] = useState(resolvedDefaultSubject);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [handoffError, setHandoffError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const messageId = useId();
  const subjectId = useId();

  const visible = Boolean(isOpen || open);
  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(visible && !sending && (message !== initialMessage || subject !== resolvedDefaultSubject));

// Effect contract: focus the dialog and restore the previous element whenever visibility changes.
  useEffect(() => {
    if (!visible) return;
    const previous = document.activeElement as HTMLElement | null;
    const focusable = dialogRef.current?.querySelector<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
    );
    (focusable ?? dialogRef.current)?.focus();
    return () => previous?.focus();
  }, [visible]);

// Effect contract: focus the dialog and restore the previous element whenever visibility changes.
  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !sending) handleClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const elements: HTMLElement[] = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
      ));
      if (elements.length === 0) return;
      const first = elements[0]!;
      const last = elements[elements.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, sending, onClose, guardNavigation]);

// Effect contract: focus the dialog and restore the previous element whenever visibility changes.
  useEffect(() => {
    if (!visible) return;
    setMessage(defaultMessage || propMessage || '');
    setSubject(resolvedDefaultSubject);
    setSent(false);
    setHandoffError(false);
  }, [visible, defaultMessage, propMessage, resolvedDefaultSubject]);

  if (!visible) return null;

  const Icon = type === 'whatsapp' ? MessageCircle : Mail;
  const label = type === 'whatsapp' ? t('TEXT_WHATSAPP') : t('TEXT_EMAIL');
  const contactInfo = type === 'whatsapp' ? recipient.phone : recipient.email;

  const handleSend = () => {
    setSending(true);
    try {
      if (type === 'whatsapp') {
        const phone = contactInfo?.replace(/\D/g, '') || '';
        const handoffUrl = TrainerMembersBuildWhatsAppUrl(phone, message);
        if (!handoffUrl) {
          setSent(false);
          setHandoffError(true);
          return;
        }
        const handoffLink = document.createElement('a');
        handoffLink.href = handoffUrl;
        handoffLink.target = '_blank';
        handoffLink.rel = 'noopener noreferrer';
        handoffLink.click();
      } else {
        // A mailto handoff only prepares an email; the browser cannot confirm delivery.
        const handoffUrl = TrainerMembersBuildMailtoUrl(contactInfo || '', subject, message);
        if (!handoffUrl) {
          setSent(false);
          setHandoffError(true);
          return;
        }
        window.location.href = handoffUrl;
      }
      setHandoffError(false);
      setSent(true);
      window.setTimeout(() => {
        setSent(false);
        onClose();
        onSuccess?.();
      }, 700);
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    if (sending) return;
    void guardNavigation(() => {
      setMessage(initialMessage);
      setSubject(resolvedDefaultSubject);
      setSent(false);
      setHandoffError(false);
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay backdrop-blur-sm overflow-y-auto " role="presentation">
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="my-auto bg-overlay rounded-xl shadow-dialog w-full max-w-lg max-h-dialog-desktop flex flex-col relative overflow-hidden border border-border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <div className={`px-6 py-4 flex items-center justify-between shrink-0 ${TAB_STYLE[type]} `}>
          <div className="flex flex-wrap items-center gap-3 ">
            <div className="w-9 h-9 rounded-full bg-primary-subtle flex items-center justify-center ">
              <Icon size={18} strokeWidth={2} className="text-primary " aria-hidden="true" />
            </div>
            <div>
              <p id={titleId} className={`font-bold text-base leading-tight ${type === 'whatsapp' ? 'text-on-primary' : 'text-on-info'}`}>{label} {t("TEXT_MESSAGE")}</p>
              <p className={`${type === 'whatsapp' ? 'text-on-primary' : 'text-on-info'} text-xs`}>{t("TEXT_SENDING_TO")}{recipient.name}</p>
            </div>
          </div>
          <button type="button" aria-label={t("TEXT_CLOSE_MEMBER_MESSAGE_DIALOG")} onClick={handleClose} disabled={sending} className="min-w-11 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page w-10 h-10 rounded-full bg-primary-subtle flex items-center justify-center motion-safe:transition-colors disabled:opacity-50 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersmessagemodal-button_1">
            <X size={18} className="text-primary "  strokeWidth={2}/>
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-1 min-h-0">
          <div className="px-6 pt-4 pb-2 ">
            <div className="flex items-center gap-3 p-3 bg-input rounded-lg border border-border ">
              <div className="w-10 h-10 rounded-full bg-primary-subtle flex items-center justify-center text-primary font-bold text-sm shrink-0 ">{recipient.name.charAt(0)}</div>
              <div className="flex-1 min-w-0 ">
                <TrainerInfrastructureTooltip content={recipient.name}><p className="text-sm font-semibold text-primary truncate ">{recipient.name}</p></TrainerInfrastructureTooltip>
                <div className="flex items-center gap-1 mt-0.5 ">
                  {type === 'whatsapp' ? <Phone size={18} className="text-secondary " aria-hidden="true"  strokeWidth={2}/> : <AtSign size={18} className="text-secondary " aria-hidden="true"  strokeWidth={2}/>}
                  <TrainerInfrastructureTooltip content={String(displayValue(contactInfo))}><p className="text-xs text-secondary truncate ">{displayValue(contactInfo)}</p></TrainerInfrastructureTooltip>
                </div>
              </div>
            </div>
          </div>

          {type === 'email' && (
            <div className="px-6 pt-2 ">
              <label htmlFor={subjectId} className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95">{t("TEXT_SUBJECT")}</label>
              <input id={subjectId} type="text" value={subject} onChange={(event) => setSubject(event.target.value)} disabled={sending || sent} className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring text-primary disabled:opacity-60  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid="trainer_members-trainermembersmessagemodal-input_2"/>
            </div>
          )}

          <div className="px-6 pt-3 pb-2 ">
            <label htmlFor={messageId} className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5 ">{t("TEXT_MESSAGE")}</label>
            <textarea id={messageId} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} disabled={sending || sent} className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring text-primary resize-none disabled:opacity-60  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" placeholder={t("TEXT_TYPE_YOUR_MESSAGE")}  data-testid="trainer_members-trainermembersmessagemodal-textarea_3"/>
            <p className="text-end text-xs text-secondary mt-1 ">{message.length} {t("TEXT_CHARS")}</p>
          </div>

          {handoffError && <p className="px-6 pt-2 text-sm text-danger" role="alert" data-testid="trainer_members-message-handoff-error">{t('TEXT_CONTACT_HANDOFF_ERROR')}</p>}
        </div>

        <div className="px-6 py-4 border-t border-border flex gap-3 shrink-0 bg-overlay sticky bottom-0 z-10 ">
          <button type="button" onClick={handleClose} disabled={sending} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 flex-1 px-4 py-2.5 text-sm border border-border rounded-lg hover:bg-input text-primary font-medium motion-safe:transition-colors disabled:opacity-50 " data-testid="trainer_members-trainermembersmessagemodal-button_4">{t("TEXT_CANCEL")}</button>
          <button type="button" onClick={handleSend} disabled={sending || sent || !message.trim() || !(type === 'whatsapp' ? TrainerMembersBuildWhatsAppUrl(contactInfo ?? '', message) : TrainerMembersBuildMailtoUrl(contactInfo ?? '', subject, message))} className={`min-h-11 flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 motion-safe:transition-all disabled:opacity-50 ${sent ? 'bg-success text-on-success' : type === 'whatsapp' ? 'bg-social-whatsapp text-on-primary' : 'bg-info text-on-info'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_members-trainermembersmessagemodal-button_5">
            {sent ? <><CheckCircle size={18}  strokeWidth={2}/> {t("TEXT_HANDOFF_STARTED")}</> : sending ? t("TEXT_SENDING") : <><Send size={18}  strokeWidth={2}/> {t("TEXT_SEND_VIA")}{label}</>}
          </button>
        </div>
      </div>
    </div>
  );
}

