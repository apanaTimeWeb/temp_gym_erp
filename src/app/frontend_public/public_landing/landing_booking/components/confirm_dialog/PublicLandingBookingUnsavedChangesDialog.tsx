// RESPONSIBILITY: Renders an accessible, feature-local unsaved-changes confirmation dialog with focus restoration.
// FLOW: guard.pendingHref -> dialog Stay/Leave -> cancel or route navigation.
'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export interface PublicLandingUnsavedChangesDialogProps {
  open: boolean;
  onStay: () => void;
  onLeave: () => void;
}
/** Keeps focus inside the dialog and returns focus to its origin on dismissal. */
export default function PublicLandingUnsavedChangesDialog({ open, onStay, onLeave }: PublicLandingUnsavedChangesDialogProps) {
  const t = useTranslations('LANDING');
  const stayRef = useRef<HTMLButtonElement>(null);
  const leaveRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    stayRef.current?.focus();
    return () => { previousFocusRef.current?.focus(); };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-backdrop p-4" data-testid="public_landing-unsaved-backdrop">
      <div role="alertdialog" aria-modal="true" aria-labelledby="landing-unsaved-title" aria-describedby="landing-unsaved-description" className="w-full max-w-md rounded-xl border border-border bg-overlay p-6 shadow-dialog" onKeyDown={(event) => {
        if (event.key === 'Escape') { event.preventDefault(); onStay(); }
        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === stayRef.current) { event.preventDefault(); leaveRef.current?.focus(); }
          if (!event.shiftKey && document.activeElement === leaveRef.current) { event.preventDefault(); stayRef.current?.focus(); }
        }
      }}>
        <h2 id="landing-unsaved-title" className="text-lg font-semibold text-primary">{t('shared.unsavedTitle')}</h2>
        <p id="landing-unsaved-description" className="mt-3 text-sm text-secondary">{t('shared.unsavedChanges')}</p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button ref={stayRef} type="button" onClick={onStay} className="min-h-11 rounded-lg border border-border px-4 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="public_landing-unsaved-stay">{t('shared.stayHere')}</button>
          <button ref={leaveRef} type="button" onClick={onLeave} className="min-h-11 rounded-lg bg-danger px-4 text-on-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="public_landing-unsaved-leave">{t('shared.leavePage')}</button>
        </div>
      </div>
    </div>
  );
}
