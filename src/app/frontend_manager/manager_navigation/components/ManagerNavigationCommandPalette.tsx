// RESPONSIBILITY: Owns the Manager role's keyboard-driven route command palette; it performs navigation only and contains no feature business data.
'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Command, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MANAGER_NAV_GROUPS } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationConfig';
import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import ManagerNavigationCommandPaletteResults from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationCommandPaletteResults';
import type { ManagerNavigationCommandItem, ManagerNavigationCommandPaletteProps } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationCommandPaletteTypes';

/**
 * @description Provides the Manager role's route command palette with explicit keyboard shortcuts, route filtering, focus restoration, and accessible status semantics. It delegates navigation to Next.js and reads only the role-owned navigation registry.
 * @dependencies Uses ManagerNavigationConfig, Next.js router/navigation lifecycle, next-intl labels, and lucide-react icons. No feature business API/state dependencies are permitted.
 * @edge-case Restores focus to the element active before opening, closes on Escape, avoids opening while the user is already typing in a native editable control, and safely handles an empty search result without inventing a route.
 */
export default function ManagerNavigationCommandPalette({ requestedOpen = false, onRequestedOpenHandled }: ManagerNavigationCommandPaletteProps) {
  const t = useTranslations('MANAGER_SHELL');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShortcutHelp, setShowShortcutHelp] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const commands = useMemo<ManagerNavigationCommandItem[]>(
    () => MANAGER_NAV_GROUPS.flatMap((group) => group.items.map((item) => ({
      href: item.href,
      labelKey: item.labelKey,
      label: t(item.labelKey),
      icon: item.icon,
    }))),
    [t],
  );

  const filteredCommands = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return commands;
    return commands.filter((command) => command.label.toLocaleLowerCase().includes(normalized) || command.labelKey.toLocaleLowerCase().includes(normalized) || command.href.toLocaleLowerCase().includes(normalized));
  }, [commands, searchQuery]);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setShowShortcutHelp(false);
    setSearchQuery('');
    window.requestAnimationFrame(() => {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    });
  }, []);

  const openPalette = useCallback(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
    setShowShortcutHelp(false);
    setSearchQuery('');
  }, []);

  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen, onClose: closePalette });

  // EFFECT: Opens the palette when the shell requests it and acknowledges the request once handled.
  useEffect(() => {
    if (!requestedOpen) return;
    openPalette();
    onRequestedOpenHandled?.();
  }, [requestedOpen, onRequestedOpenHandled, openPalette]);

  // EFFECT: Restores keyboard focus to the search input whenever the palette becomes visible.
  useEffect(() => {
    if (!isOpen) return;
    searchInputRef.current?.focus();
    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  }, [isOpen, openPalette]);

  // EFFECT: Registers the Manager shell keyboard shortcuts and removes the listener on unmount.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const activeEl = document.activeElement instanceof Element ? document.activeElement : null;
      const target = event.target instanceof Element && event.target !== document.body ? event.target : activeEl;
      const editable = Boolean(target?.matches('input, textarea, select, [contenteditable="true"], [contenteditable=""]'));
      if (isOpen && event.key === 'Escape') {
        event.preventDefault();
        closePalette();
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (!isOpen) openPalette();
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        if (editable && !isOpen) {
          event.preventDefault();
          const form = target?.closest('form');
          if (form instanceof HTMLFormElement) form.requestSubmit();
        }
        return;
      }
      if (!isOpen && event.key === '?' && !editable) {
        event.preventDefault();
        previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setIsOpen(true);
        setShowShortcutHelp(true);
        return;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-overlay-backdrop p-4 pt-24" role="presentation">
      <div
        aria-hidden="true"
        data-testid="manager_navigation-command-palette-backdrop-close"
        className="absolute inset-0 cursor-default"
        onClick={closePalette}
      />
      <div
        ref={dialogRef}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
          const buttons = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>('[data-testid^="manager_navigation-command-palette-page-"]') ?? []);
          if (buttons.length === 0) return;
          event.preventDefault();
          const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
          const next = event.key === 'ArrowDown' ? (current + 1) % buttons.length : (current <= 0 ? buttons.length - 1 : current - 1);
          buttons[next]?.focus();
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="manager-navigation-command-palette-title"
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-overlay shadow-dialog"
        data-testid="manager_navigation-command-palette-dialog"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary" aria-hidden="true">
              <Command size={18} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <h2 id="manager-navigation-command-palette-title" className="truncate text-sm font-semibold text-text-primary">{t('COMMAND_PALETTE_TITLE')}</h2>
              <p className="truncate text-xs text-text-secondary">{t('COMMAND_PALETTE_DESCRIPTION')}</p>
            </div>
          </div>
          <button
            type="button"
            data-testid="manager_navigation-command-palette-button-close"
            onClick={closePalette}
            aria-label={t('COMMAND_PALETTE_CLOSE_BUTTON')}
            className="min-h-11 min-w-11 rounded-lg p-2 text-text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {showShortcutHelp ? (
          <div className="space-y-4 p-5" data-testid="manager_navigation-command-palette-shortcut-help" role="status">
            <h3 className="text-sm font-semibold text-text-primary">{t('SHORTCUT_HELP_TITLE')}</h3>
            <div className="grid grid-cols-1 gap-2 text-sm text-text-secondary sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"><span>{t('SHORTCUT_COMMAND_PALETTE')}</span><kbd className="rounded border border-border bg-input px-2 py-1 text-xs text-text-primary">{t('SHORTCUT_KEY_CTRL_K')}</kbd></div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"><span>{t('SHORTCUT_SAVE')}</span><kbd className="rounded border border-border bg-input px-2 py-1 text-xs text-text-primary">{t('SHORTCUT_KEY_CTRL_S')}</kbd></div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"><span>{t('SHORTCUT_CLOSE')}</span><kbd className="rounded border border-border bg-input px-2 py-1 text-xs text-text-primary">{t('SHORTCUT_KEY_ESCAPE')}</kbd></div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"><span>{t('SHORTCUT_HELP')}</span><kbd className="rounded border border-border bg-input px-2 py-1 text-xs text-text-primary">{t('SHORTCUT_KEY_HELP')}</kbd></div>
            </div>
          </div>
        ) : (
          <>
            <div className="border-b border-border p-3">
              <label htmlFor="manager-navigation-command-palette-search" className="sr-only">{t('COMMAND_PALETTE_SEARCH')}</label>
              <div className="relative">
                <Search size={18} strokeWidth={2} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  id="manager-navigation-command-palette-search"
                  ref={searchInputRef}
                  data-testid="manager_navigation-command-palette-input-search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t('COMMAND_PALETTE_SEARCH')}
                  aria-label={t('COMMAND_PALETTE_SEARCH')}
                  className="w-full rounded-xl border border-border bg-input py-2.5 pl-10 pr-4 text-sm text-text-primary outline-none focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-focus-ring"
                />
              </div>
            </div>
            <ManagerNavigationCommandPaletteResults commands={filteredCommands} onChoose={(href) => { router.push(href); closePalette(); }} />
          </>
        )}
      </div>
    </div>
  );
}
