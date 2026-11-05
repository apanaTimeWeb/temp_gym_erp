"use client";
// RESPONSIBILITY: Provides the authenticated Admin command palette (Ctrl+K) for navigating to role-owned routes without owning business data.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/command_palette/AdminNavigationLayoutCommandPalette.tsx)

import type { AdminCommandPaletteItem } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutCommandPaletteItemTypes';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState, useId } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useAdminNavigationLayoutDialogAccessibility } from '@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutDialogAccessibility';
import { ADMIN_NAV_GROUPS } from '@/app/frontend_admin/admin_navigation/config/admin_navigation_shell.url_config';
import styles from '@/app/frontend_admin/admin_navigation/components/command_palette/AdminNavigationLayoutCommandPalette.module.css';


/** Renders the global Admin Ctrl+K command palette using role-owned navigation configuration only. */
export default function AdminNavigationLayoutCommandPalette() {
  const t = useTranslations();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const listboxId = useId();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLElement>(null);

  const items = useMemo<AdminCommandPaletteItem[]>(() => ADMIN_NAV_GROUPS.flatMap((group) => group.items.map((item) => ({
    groupKey: group.groupKey,
    labelKey: item.labelKey,
    href: item.href,
  }))), [t]);
  const filtered = useMemo(
    () => items.filter((item) => `${t(`admin_navigation.AdminNavigation.groups.${item.groupKey}`)} ${t(`admin_navigation.AdminNavigation.items.${item.labelKey}`)}`.toLowerCase().includes(query.trim().toLowerCase())),
    [items, query, t],
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);


  useAdminNavigationLayoutDialogAccessibility({
    isOpen: open,
    containerRef: dialogRef,
    onClose: close,
  });

  // EFFECT: Registers the global keyboard and visible-trigger listener and manages palette navigation while open.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.type === 'keydown' && ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault();
        setOpen(true);
        return;
      }
      if (!open) return;
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, Math.max(filtered.length - 1, 0)));
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
        return;
      }
      if (event.key === 'Enter') {
        const activeItem = filtered[activeIndex];
        if (!activeItem) return;
        router.push(activeItem.href);
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const handleVisibleTrigger = () => setOpen(true);
    window.addEventListener('open-admin-command-palette', handleVisibleTrigger);
    return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('open-admin-command-palette', handleVisibleTrigger); };
  }, [activeIndex, close, filtered, open, router]);

  // EFFECT: Keeps the active result index valid when filtering changes the available command list.
  useEffect(() => {
    if (activeIndex > Math.max(filtered.length - 1, 0)) setActiveIndex(0);
  }, [activeIndex, filtered.length]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-start justify-center bg-overlay-backdrop p-3"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
     data-testid="admin_navigation-admin-command-palette-control">
      <section
        ref={dialogRef}
        className={`${styles.palette} overflow-hidden rounded-xl border border-border bg-popover shadow-dialog`}
        role="dialog"
        aria-modal="true"
        aria-label={t('admin_navigation.components/admin_layout_command_palette.text_7b6b539e73')}
        data-testid="admin_navigation-admin-command-palette-control-2"
      >
        <div className="flex items-center gap-3 border-b border-border bg-input px-4 py-3">
          <Search size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-secondary" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('admin_navigation.components/admin_layout_command_palette.text_d9150f4eca')}
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-activedescendant={filtered[activeIndex] ? `${listboxId}-option-${activeIndex}` : undefined}
            aria-label={t('admin_navigation.components/admin_layout_command_palette.text_0ddc47f0e6')}
            className="min-h-11 min-w-0 flex-1 bg-transparent text-primary outline-none placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out"
            data-testid="admin_navigation-admin-command-palette-search"
          />
          <kbd className="rounded-md border border-border bg-card px-2 py-1 text-xs text-secondary">{t('admin_navigation.components/admin_layout_command_palette.text_1f7a4f9e2f')}</kbd>
        </div>
        <div className={`${styles.results} overflow-y-auto p-2`} id={listboxId} role="listbox" aria-label={t('admin_navigation.components/admin_layout_command_palette.text_414cb17461')} data-testid="admin_navigation-admin-command-palette-control-3">
          {filtered.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-secondary">{t('admin_navigation.AdminNavigationLayoutCommandPalette.text_a68d28f1ee')}</div>
          ) : filtered.map((item, index) => (
            <div
              key={`${item.groupKey}-${item.href}`}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                router.push(item.href);
                close();
              }}
              className={`min-w-11 flex min-h-11 w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm motion-safe:transition-colors motion-safe:duration-base ${index === activeIndex ? 'bg-surface-hover text-primary' : 'text-secondary hover:bg-surface-hover hover:text-primary'}`}
              data-testid={`admin_navigation-admin-command-palette-result-${index}`}>
              <span>{t(`admin_navigation.AdminNavigation.items.${item.labelKey}`)}</span>
              <span className="text-xs text-secondary">{t(`admin_navigation.AdminNavigation.groups.${item.groupKey}`)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
