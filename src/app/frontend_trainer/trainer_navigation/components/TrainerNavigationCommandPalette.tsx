"use client";
// Effect contract: synchronizes command-palette keyboard listeners and keeps the handler scoped to the mounted palette.
// RESPONSIBILITY: Owns Trainer shell keyboard shortcuts and route command palette; no feature business logic.
import { useEffect, useMemo, useRef, useState } from 'react';

import { ArrowRight, Command, HelpCircle, Search, X } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { usePathname, useRouter } from 'next/navigation';

import { TRAINER_NAVIGATION_GROUPS } from '@/app/frontend_trainer/trainer_navigation/config/TrainerNavigationConstants';

import { useTrainerNavigationDialogFocusTrap } from '@/app/frontend_trainer/trainer_navigation/hooks/useTrainerNavigationDialogFocusTrap';








/**
 * @description Provides the documented Trainer shell Ctrl+K page launcher, '?' shortcut help, Escape dismissal, and Ctrl+S form submission.
 * @dependencies Trainer role navigation metadata, Next.js navigation, localization, and the module-owned focus-trap primitive.
 * @edge-case Ignores text-entry '?' shortcuts, avoids duplicate form submission when no active form exists, and preserves focus after dismissal.
 */
/**
 * @description Renders the global Ctrl+K command palette shell and routes command selection to the approved Trainer navigation contract.
 * @dependencies Trainer role URL configuration and zero-business overlay primitives.
 * @edge-case The palette must remain keyboard accessible and must not own feature business data.
 */
/**
 * @description Provides the Trainer-wide command palette shell using approved zero-business infrastructure while role navigation remains role-owned.
 * @dependencies Consumes role-owned navigation metadata and the zero-business infrastructure focus-trap primitive.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNavigationCommandPalette() {
  const t = useTranslations('TRAINER_SHELL');
  const pathname = usePathname();
  const router = useRouter();
  const [mode, setMode] = useState<'closed' | 'search' | 'help'>('closed');
  const [query, setQuery] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const resultRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pages = useMemo(() => TRAINER_NAVIGATION_GROUPS.flatMap((group) => group.items.map((item) => ({ ...item, label: t(item.labelKey) }))), [t]);
  const filteredPages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return pages;
    return pages.filter((item) => item.label.toLowerCase().includes(normalized));
  }, [pages, query]);

  const close = () => { setMode('closed'); setQuery(''); triggerRef.current?.focus(); };
  useTrainerNavigationDialogFocusTrap({ isOpen: mode !== 'closed', dialogRef, onEscape: close });

  // EFFECT AUDIT: Registers the document-level keyboard shortcut listener once; cleanup removes the exact listener, so an empty dependency array is intentional.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      const isTyping = target?.matches('input, textarea, select, [contenteditable="true"]') ?? false;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        triggerRef.current = document.activeElement as HTMLElement | null;
        setMode('search');
        return;
      }
      if ((event.key === '?' || (event.shiftKey && event.key === '/')) && !isTyping) {
        event.preventDefault();
        triggerRef.current = document.activeElement as HTMLElement | null;
        setMode('help');
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        const form = target?.closest('form') ?? document.activeElement?.closest?.('form');
        if (form instanceof HTMLFormElement) {
          event.preventDefault();
          form.requestSubmit();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (mode === 'closed') return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-overlay-backdrop p-3 sm:p-6 overflow-y-auto trainer-navigation-command-palette-offset " role="presentation">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="trainer-command-palette-title" className="my-auto w-full max-w-2xl bg-popover border border-border rounded-xl shadow-dialog overflow-hidden ">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3 ">
          {mode === 'search' ? <Search size={18} className="text-secondary " aria-hidden="true"  strokeWidth={2}/> : <HelpCircle size={18} className="text-primary " aria-hidden="true"  strokeWidth={2}/>}
          <h2 id="trainer-command-palette-title" className="sr-only ">{mode === 'search' ? t('TEXT_COMMAND_PALETTE') : t('TEXT_KEYBOARD_SHORTCUTS')}</h2>
          {mode === 'search' ? (
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'ArrowDown' && filteredPages.length) { event.preventDefault(); resultRefs.current[0]?.focus(); } }} placeholder={t('TEXT_SEARCH_OR_JUMP')} className="min-h-11 flex-1 bg-transparent border-0 text-primary outline-none placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors motion-safe:duration-base" aria-label={t('TEXT_SEARCH_OR_JUMP')} data-testid="trainer_navigation-trainerinfrastructurecommandpalette-input_1" />
          ) : <p className="flex-1 text-base font-semibold text-primary ">{t('TEXT_KEYBOARD_SHORTCUTS')}</p>}
          <button type="button" onClick={close} className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_CLOSE_COMMAND_PALETTE')} data-testid="trainer_navigation-trainerinfrastructurecommandpalette-button_2"><X size={18} aria-hidden="true"  strokeWidth={2}/></button>
        </div>
        {mode === 'search' ? (
          <div className="trainer-navigation-command-palette-results overflow-y-auto p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page " aria-label={t('TEXT_COMMAND_PALETTE')} data-testid="trainer_navigation-command-palette_results">
            {filteredPages.map((item, index) => {
              const Icon = item.icon;
              const focusResult = (nextIndex: number) => resultRefs.current[Math.max(0, Math.min(nextIndex, filteredPages.length - 1))]?.focus();
              return <button key={item.href} ref={(element) => { resultRefs.current[index] = element; }} type="button" onClick={() => { close(); router.push(item.href); }} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); focusResult((index + 1) % filteredPages.length); } else if (event.key === 'ArrowUp') { event.preventDefault(); focusResult((index - 1 + filteredPages.length) % filteredPages.length); } else if (event.key === 'Home') { event.preventDefault(); focusResult(0); } else if (event.key === 'End') { event.preventDefault(); focusResult(filteredPages.length - 1); } }} className={`w-full min-h-11 flex items-center gap-3 rounded-lg px-3 py-2 text-start text-secondary hover:text-primary hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${pathname === item.href ? 'bg-primary-subtle text-primary' : ''} motion-safe:transition-colors motion-safe:duration-base`} aria-current={pathname === item.href ? 'page' : undefined} data-testid={`trainer_navigation-command-palette-result-${item.href.split('/').filter(Boolean).join('-') || 'root'}`}><Icon size={18} strokeWidth={2} aria-hidden="true" /><span className="truncate flex-1 ">{item.label}</span><ArrowRight size={18} aria-hidden="true" strokeWidth={2}/></button>;
            })}
            {filteredPages.length === 0 && <p className="px-3 py-6 text-center text-sm text-secondary " data-testid="trainer_navigation-command-palette_empty">{t('TEXT_NO_MATCHES_FOUND')}</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 text-sm " data-testid="trainer_navigation-command-palette_shortcuts">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-3 "><span className="text-secondary ">{t('TEXT_OPEN_COMMAND_PALETTE')}</span><kbd className="inline-flex items-center gap-1 rounded-md bg-input border border-border px-2 py-1 text-xs text-primary "><Command size={18}  strokeWidth={2}/> K</kbd></div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-3 "><span className="text-secondary ">{t('TEXT_SUBMIT_ACTIVE_FORM')}</span><kbd className="rounded-md bg-input border border-border px-2 py-1 text-xs text-primary ">{t('TEXT_CTRL_S')}</kbd></div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-3 "><span className="text-secondary ">{t('TEXT_OPEN_SHORTCUT_HELP')}</span><kbd className="rounded-md bg-input border border-border px-2 py-1 text-xs text-primary ">?</kbd></div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-3 "><span className="text-secondary ">{t('TEXT_CLOSE_DIALOGS')}</span><kbd className="rounded-md bg-input border border-border px-2 py-1 text-xs text-primary ">{t('TEXT_ESCAPE')}</kbd></div>
          </div>
        )}
      </div>
    </div>
  );
}
