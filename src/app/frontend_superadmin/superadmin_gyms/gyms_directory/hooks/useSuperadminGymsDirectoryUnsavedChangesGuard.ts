'use client';

import { useEffect, useRef } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';


const activeProgrammaticNavigationConfirmers = new Set<() => Promise<boolean>>();

/** Ask every currently dirty Gym form before a programmatic route transition. */
export async function confirmSuperadminGymsDirectoryProgrammaticNavigation(): Promise<boolean> {
  for (const confirmNavigation of activeProgrammaticNavigationConfirmers) {
    if (!(await confirmNavigation())) return false;
  }
  return true;
}

/**
 * Feature-owned unsaved-change guard for Gym forms. It handles browser exits, internal anchor navigation,
 * and back/forward navigation without depending on another business feature module.
 */
export function useSuperadminGymsDirectoryUnsavedChangesGuard(isDirty: boolean, message?: string): void {
  const { confirm } = useConfirm();
  const t = useTranslations('superadmin_gyms');
  const router = useRouter();
  const resolvedMessage = message ?? t('ui.unsaved_changes_message');
  const acceptedHrefRef = useRef<string | null>(null);
  const handlingPopStateRef = useRef(false);

  useEffect(() => { acceptedHrefRef.current = window.location.href; }, []);

  useEffect(() => {
    if (!isDirty) return;
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = resolvedMessage;
    };
    const confirmNavigation = () => confirm({
      title: t('ui.unsaved_changes_title'),
      message: resolvedMessage,
      type: 'warning',
      confirmText: t('ui.leave_page'),
      cancelText: t('ui.stay_on_page'),
    });
    activeProgrammaticNavigationConfirmers.add(confirmNavigation);
    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(target instanceof HTMLAnchorElement) || (target.target && target.target !== '_self') || target.hasAttribute('download')) return;
      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin || url.href === window.location.href) return;
      event.preventDefault();
      event.stopPropagation();
      void confirmNavigation().then((approved) => {
        if (!approved) return;
        acceptedHrefRef.current = url.href;
        router.push(`${url.pathname}${url.search}${url.hash}`);
      });
    };
    const handlePopState = () => {
      // A history.forward() issued here can emit a second popstate. Keep this
      // feature-local single-flight guard active until the user decision settles.
      if (handlingPopStateRef.current) return;
      handlingPopStateRef.current = true;
      const targetHref = window.location.href;
      const currentHref = acceptedHrefRef.current;
      window.history.forward();
      void confirmNavigation().then((approved) => {
        if (approved) {
          const targetUrl = new URL(targetHref, window.location.origin);
          acceptedHrefRef.current = targetHref;
          router.push(`${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`);
        } else if (currentHref) {
          acceptedHrefRef.current = currentHref;
        }
      }).finally(() => { handlingPopStateRef.current = false; });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleAnchorClick, true);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleAnchorClick, true);
      window.removeEventListener('popstate', handlePopState);
      activeProgrammaticNavigationConfirmers.delete(confirmNavigation);
    };
  }, [confirm, isDirty, resolvedMessage, router, t]);
}
