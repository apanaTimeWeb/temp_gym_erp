"use client";
// RESPONSIBILITY: Owns only authenticated Admin keyboard shortcut plumbing and its visible shortcut-help dialog; feature behavior stays in feature modules.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/AdminNavigationLayoutKeyboardShortcuts.tsx)

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAdminNavigationLayoutDialogAccessibility } from '@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutDialogAccessibility';

/**
 * Provides the documented global keyboard shortcuts without owning any business state.
 * Ctrl/Cmd+S submits the nearest active form; ? opens the visible shortcut-help dialog.
 */
export default function AdminNavigationLayoutKeyboardShortcuts() {
  const t = useTranslations('admin_layout.AdminNavigationLayoutKeyboardShortcuts');
  const [helpOpen, setHelpOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);

  useAdminNavigationLayoutDialogAccessibility({
    isOpen: helpOpen,
    containerRef: dialogRef,
    onClose: () => setHelpOpen(false),
  });

  // EFFECT: Registers global shortcut listeners and removes them on unmount; no business state is read from sibling modules.
  useEffect(() => {
    // EFFECT: Registers documented global shortcuts while avoiding text-entry contexts for the help shortcut.
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const isTextEntry = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || (target instanceof HTMLElement && target.isContentEditable);
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        const activeForm = target instanceof HTMLElement ? target.closest('form') : null;
        const submitButton = activeForm?.querySelector<HTMLButtonElement>('button[type="submit"]');
        if (submitButton && !submitButton.disabled) {
          event.preventDefault();
          submitButton.click();
        }
        return;
      }
      if (event.key === '?' && !isTextEntry && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        setHelpOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const handleVisibleTrigger = () => setHelpOpen(true);
    window.addEventListener('open-admin-shortcut-help', handleVisibleTrigger);
    return () => { document.removeEventListener('keydown', handleKeyDown); window.removeEventListener('open-admin-shortcut-help', handleVisibleTrigger); };
  }, []);

  if (!helpOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setHelpOpen(false); }} data-testid="admin_navigation-admin-keyboard-shortcuts-overlay">
      <section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="admin-keyboard-shortcuts-title" className="w-full max-w-md rounded-xl border border-border bg-overlay p-6 shadow-dialog" data-testid="admin_navigation-admin-keyboard-shortcuts-dialog">
        <div className="flex items-start justify-between gap-4">
          <h2 id="admin-keyboard-shortcuts-title" className="text-lg font-semibold text-primary">{t('title')}</h2>
          <button type="button" onClick={() => setHelpOpen(false)} className="min-h-11 min-w-11 rounded-lg border border-border bg-input text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" aria-label={t('close')} data-testid="admin_navigation-admin-keyboard-shortcuts-close">
            ×
          </button>
        </div>
        <div className="mt-5 space-y-3" aria-label={t('shortcutHelp')}>
          <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-input px-3 py-3"><span className="text-sm text-primary">{t('commandPalette')}</span><kbd className="rounded-md border border-border bg-card px-2 py-1 text-xs text-secondary">{t('keyCommandPalette')}</kbd></div>
          <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-input px-3 py-3"><span className="text-sm text-primary">{t('closeOverlays')}</span><kbd className="rounded-md border border-border bg-card px-2 py-1 text-xs text-secondary">{t('keyEscape')}</kbd></div>
          <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-input px-3 py-3"><span className="text-sm text-primary">{t('submitForm')}</span><kbd className="rounded-md border border-border bg-card px-2 py-1 text-xs text-secondary">{t('keySubmit')}</kbd></div>
          <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-input px-3 py-3"><span className="text-sm text-primary">{t('showHelp')}</span><kbd className="rounded-md border border-border bg-card px-2 py-1 text-xs text-secondary">{t('keyHelp')}</kbd></div>
        </div>
      </section>
    </div>
  );
}
