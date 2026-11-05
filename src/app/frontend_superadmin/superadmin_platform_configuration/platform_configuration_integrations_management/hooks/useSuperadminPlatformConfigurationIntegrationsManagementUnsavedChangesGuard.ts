'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

/** Feature-local dirty-form guard. Prevents data loss on browser exit, links, and history navigation. */
export function useSuperadminPlatformConfigurationIntegrationsManagementUnsavedChangesGuard(isDirty: boolean, message?: string): void {
  const { confirm } = useConfirm();
  const t = useTranslations('superadmin_platform_configuration_integrations');
  const resolvedMessage = message ?? t('ui.discard_api_key_changes_message');
  const router = useRouter();
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
      title: t('ui.discard_api_key_changes_title'),
      message: resolvedMessage,
      type: 'warning',
      confirmText: t('ui.discard_changes_action'),
      cancelText: t('ui.keep_editing_action'),
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
      // history.forward() can itself emit popstate; suppress that re-entry while one confirmation is active.
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
    };
  }, [confirm, isDirty, resolvedMessage, router, t]);
}
