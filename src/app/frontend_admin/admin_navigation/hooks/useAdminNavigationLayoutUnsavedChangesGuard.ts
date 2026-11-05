"use client";
// RESPONSIBILITY: Blocks browser exits and in-app navigation while an Admin form has unsaved changes.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/hooks/useAdminNavigationLayoutUnsavedChangesGuard.ts)

import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutConfirm';

type NavigationMethod = 'push' | 'replace';
export function useAdminNavigationLayoutUnsavedChangesGuard(isDirty: boolean) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { confirm } = useAdminNavigationLayoutConfirm();
  const t = useTranslations('admin_layout.AdminUnsavedChangesGuard');
  const lastKnownUrlRef = useRef('/');
  const confirmationPendingRef = useRef(false);

  const confirmDiscardIfDirty = useCallback(async () => {
    if (!isDirty) return true;
    return confirm({ title: t('title'), message: t('message'), confirmText: t('discard'), type: 'warning' });
  }, [confirm, isDirty, t]);

  const navigate = useCallback(async (href: string, method: NavigationMethod = 'push') => {
    if (!isDirty) { router[method](href); return true; }
    const shouldLeave = await confirm({ title: t('title'), message: t('message'), confirmText: t('leave'), type: 'warning' });
    if (!shouldLeave) return false;
    router[method](href);
    return true;
  }, [confirm, isDirty, router, t]);
  const guardedPush = useCallback((href: string) => navigate(href, 'push'), [navigate]);
  const guardedReplace = useCallback((href: string) => navigate(href, 'replace'), [navigate]);

  const handleNavigationAttempt = useCallback(async (event: MouseEvent) => {
    if (!isDirty || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a[href]');
    if (!(anchor instanceof HTMLAnchorElement)) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || (url.pathname === pathname && url.search === window.location.search)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    await navigate(`${url.pathname}${url.search}${url.hash}`);
  }, [isDirty, navigate, pathname]);

  useEffect(() => {
    lastKnownUrlRef.current = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}${window.location.hash}`;
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = t('message');
    };
    const handlePopState = (event: PopStateEvent) => {
      if (!isDirty || confirmationPendingRef.current) return;
      const targetUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const currentUrl = lastKnownUrlRef.current;
      if (targetUrl === currentUrl) return;
      // Stop the App Router's bubbling popstate listener and restore the dirty page while consent is pending.
      event.stopImmediatePropagation();
      window.history.pushState(window.history.state, '', currentUrl);
      confirmationPendingRef.current = true;
      void confirm({ title: t('title'), message: t('message'), confirmText: t('leave'), type: 'warning' })
        .then((shouldLeave) => { if (shouldLeave) router.push(targetUrl); })
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
  }, [confirm, handleNavigationAttempt, isDirty, router, t]);

  return { confirmDiscardIfDirty, guardedPush, guardedReplace };
}
