'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';



// RESPONSIBILITY: Blocks navigation while plans_management forms have unsaved changes.
// DATA FLOW: formState.isDirty -> guard -> design-system confirmation -> continued or cancelled navigation.

/**
 * @description Prevents data loss for dirty plans_management forms during browser exit, in-app link navigation, and back/forward navigation.
 * @dependencies Uses the approved ConfirmProvider for in-app navigation and the browser beforeunload contract for full-page exits.
 * @edge-case beforeunload must use the browser-native prompt because custom dialogs cannot intercept a tab/window close; in-app navigation uses the design-system dialog.
 */
export function useSuperadminBillingPlansManagementUnsavedChangesGuard(
  isDirty: boolean,
  message?: string,
): void {
  const { confirm } = useConfirm();
  const t = useTranslations('superadmin_billing_plans');
  const resolvedMessage = message ?? t('ui.unsaved_changes_message');
  const router = useRouter();
  const acceptedHrefRef = useRef<string | null>(null);
  const popstateInFlightRef = useRef(false);

// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
  useEffect(() => {
    acceptedHrefRef.current = window.location.href;
  }, []);

// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = resolvedMessage;
    };

    const confirmNavigation = async () => confirm({
      title: t('ui.unsaved_changes_title'),
      message: resolvedMessage,
      type: 'warning',
      confirmText: t('ui.leave_page'),
      cancelText: t('ui.stay_on_page'),
    });

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (target.target && target.target !== '_self') return;
      if (target.hasAttribute('download')) return;
      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin || url.href === window.location.href) return;
      event.preventDefault();
      event.stopPropagation();
      void confirmNavigation().then((approved) => {
        if (!approved) return;
        const destination = `${url.pathname}${url.search}${url.hash}`;
        acceptedHrefRef.current = url.href;
        router.push(destination);
      });
    };

    const handlePopState = () => {
      // `history.forward()` may dispatch another popstate while the async
      // confirmation is pending. Keep the guard single-flight per user action.
      if (popstateInFlightRef.current) return;
      popstateInFlightRef.current = true;
      const targetHref = window.location.href;
      const currentHref = acceptedHrefRef.current;
      window.history.forward();
      void confirmNavigation()
        .then((approved) => {
          if (!approved) {
            if (currentHref) acceptedHrefRef.current = currentHref;
            return;
          }
          const targetUrl = new URL(targetHref, window.location.origin);
          acceptedHrefRef.current = targetHref;
          router.push(`${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`);
        })
        .finally(() => { popstateInFlightRef.current = false; });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleAnchorClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleAnchorClick, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [confirm, isDirty, resolvedMessage, router, t]);
}
