// RESPONSIBILITY: Renders Superadmin Communication Broadcasts Campaigns Send Now Confirmation Dialog using its declared props and feature-local hooks.
'use client';

import { useEffect, useRef, useState } from 'react';

import { AlertTriangle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminCommunicationBroadcastsSendNowConfirmationDialogProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_send_now_confirmation_dialog.types';


/**
 * @description Renders the Superadmin broadcasts send now confirmation dialog interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminCommunicationBroadcastsCampaignsSendNowConfirmationDialog({
  broadcast, isPending, onCancel, onConfirm,
}: SuperadminCommunicationBroadcastsSendNowConfirmationDialogProps) {
  const t = useTranslations('superadmin_communication_broadcasts');
  const [phrase, setPhrase] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef(onCancel);
  const pendingRef = useRef(isPending);
  cancelRef.current = onCancel;
  pendingRef.current = isPending;

  useEffect(() => {
    if (!broadcast) return;
    setPhrase('');
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    phraseRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !pendingRef.current) {
        event.preventDefault();
        cancelRef.current();
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])'));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [broadcast?.id]);

  if (!broadcast) return null;
  const audience = broadcast.targetGymIds?.length
    ? t('ui.send_now_confirmation_audience_count', { count: broadcast.targetGymIds.length })
    : t('ui.send_now_confirmation_audience_all');
  const canSend = phrase === 'SEND' && !isPending;

  return <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-overlay p-4" data-testid="superadmin_communication_broadcasts-send-now-dialog-backdrop">
    <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="superadmin-broadcast-send-now-title" aria-describedby="superadmin-broadcast-send-now-description" className="my-auto flex max-h-dialog-desktop w-full max-w-lg flex-col rounded-xl border border-border bg-overlay shadow-dialog">
      <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="mb-4 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning-bg text-warning"><AlertTriangle size={20} aria-hidden="true" /></span>
          <div className="min-w-0 flex-1">
            <h2 id="superadmin-broadcast-send-now-title" className="text-lg font-semibold text-primary">{t('ui.send_now_confirmation_title')}</h2>
            <p id="superadmin-broadcast-send-now-description" className="mt-2 text-sm text-secondary">{t('ui.send_now_confirmation_description', { title: broadcast.title, audience })}</p>
          </div>
        </div>
        <label htmlFor="superadmin-broadcast-send-now-phrase" className="block text-sm font-semibold text-primary">{t('ui.send_now_confirmation_phrase_label')}</label>
        <input ref={phraseRef} id="superadmin-broadcast-send-now-phrase" value={phrase} onChange={(event) => setPhrase(event.target.value)} autoComplete="off" aria-describedby="superadmin-broadcast-send-now-instruction" aria-invalid={phrase.length > 0 && phrase !== 'SEND'} className="mt-2 min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_communication_broadcasts-send-now-phrase" />
        <p id="superadmin-broadcast-send-now-instruction" className="mt-2 text-xs text-secondary">{t('ui.send_now_confirmation_instruction')}</p>
        {phrase.length > 0 && phrase !== 'SEND' ? <p role="status" className="mt-1 text-xs text-danger">{t('ui.send_now_confirmation_phrase_invalid')}</p> : null}
      </div>
      <div className="shrink-0 flex flex-wrap justify-end gap-3 border-t border-border p-6">
        <button type="button" disabled={isPending} onClick={onCancel} className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">{t('ui.send_now_confirmation_cancel')}</button>
        <button type="button" disabled={!canSend} onClick={() => void onConfirm(phrase)} className="flex min-h-11 min-w-40 items-center justify-center gap-2 rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-on-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50" data-testid="superadmin_communication_broadcasts-send-now-submit">
          {isPending ? <><Loader2 size={16} className="motion-safe:animate-spin" aria-hidden="true"/>{t('ui.delivering_eb32871c')}</> : t('ui.send_now_confirmation_submit')}
        </button>
      </div>
    </section>
  </div>;
}
