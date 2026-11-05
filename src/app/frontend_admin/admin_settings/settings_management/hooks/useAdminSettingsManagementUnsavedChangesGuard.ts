"use client";
// RESPONSIBILITY: Guard dirty Settings forms on same-tab links, browser history, and tab close.
// DATA FLOW: RHF dirty flag → owning confirmation provider → guarded navigation continuation.

import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementConfirm';

export function useAdminSettingsUnsavedChangesGuard(isDirty: boolean) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { confirm } = useAdminNavigationLayoutConfirm();
  const t = useTranslations('admin_layout.AdminUnsavedChangesGuard');
  const currentUrlRef = useRef('/');
  const confirmationPendingRef = useRef(false);

  const confirmDiscardIfDirty = useCallback(async () => {
    if (!isDirty) return true;
    return confirm({ title: t('title'), message: t('message'), confirmText: t('discard'), type: 'warning' });
  }, [confirm, isDirty, t]);

  const handleNavigationAttempt = useCallback(async (event: MouseEvent) => {
    if (!isDirty || confirmationPendingRef.current || event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest('a[href]');
    if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute('download') ||
      (anchor.target && anchor.target.toLowerCase() !== '_self')) return;
    const target = new URL(anchor.href, window.location.href);
    if (target.origin !== window.location.origin || target.protocol !== window.location.protocol ||
      target.href === window.location.href) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    confirmationPendingRef.current = true;
    try {
      const confirmed = await confirm({ title: t('title'), message: t('message'), confirmText: t('leave'), type: 'warning' });
      if (confirmed) router.push(`${target.pathname}${target.search}${target.hash}`);
    } finally { confirmationPendingRef.current = false; }
  }, [confirm, isDirty, router, t]);

  useEffect(() => {
    currentUrlRef.current = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}${window.location.hash}`;
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = t('message');
    };
    const handlePopState = (event: PopStateEvent) => {
      if (!isDirty || confirmationPendingRef.current) return;
      const destination = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (destination === currentUrlRef.current) return;
      // Restore the dirty view before Next.js consumes the history event.
      event.stopImmediatePropagation();
      window.history.pushState(window.history.state, '', currentUrlRef.current);
      confirmationPendingRef.current = true;
      void confirm({ title: t('title'), message: t('message'), confirmText: t('leave'), type: 'warning' })
        .then((approved) => { if (approved) router.push(destination); })
        .finally(() => { confirmationPendingRef.current = false; });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState, true);
    document.addEventListener('click', handleNavigationAttempt, true);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState, true);
      document.removeEventListener('click', handleNavigationAttempt, true);
    };
  }, [handleNavigationAttempt, isDirty, router, confirm, t]);

  return { confirmDiscardIfDirty };
}
