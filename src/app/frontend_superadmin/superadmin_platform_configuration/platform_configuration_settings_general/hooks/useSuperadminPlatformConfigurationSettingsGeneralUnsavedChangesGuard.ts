'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

/** Protects locally edited platform settings from accidental browser, link, and history navigation. */
export function useSuperadminPlatformConfigurationSettingsGeneralUnsavedChangesGuard(isDirty: boolean): void {
  const { confirm } = useConfirm();
  const t = useTranslations('superadmin_platform_configuration_settings');
  const router = useRouter();
  const acceptedHrefRef = useRef<string | null>(null);
  const handlingPopStateRef = useRef(false);
  useEffect(() => { acceptedHrefRef.current = window.location.href; }, []);
  useEffect(() => {
    if (!isDirty) return;
    const message = t('ui.unsaved_settings_changes_message');
    const confirmNavigation = () => confirm({ title: t('ui.unsaved_settings_changes_title'), message, type: 'warning', confirmText: t('ui.leave_settings_action'), cancelText: t('ui.stay_on_settings_action') });
    const handleBeforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = message; };
    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(target instanceof HTMLAnchorElement) || (target.target && target.target !== '_self') || target.hasAttribute('download')) return;
      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin || url.href === window.location.href) return;
      event.preventDefault(); event.stopPropagation();
      void confirmNavigation().then((approved) => { if (!approved) return; acceptedHrefRef.current = url.href; router.push(`${url.pathname}${url.search}${url.hash}`); });
    };
    const handlePopState = () => {
      if (handlingPopStateRef.current) return;
      handlingPopStateRef.current = true;
      const targetHref = window.location.href;
      const currentHref = acceptedHrefRef.current;
      window.history.forward();
      void confirmNavigation().then((approved) => {
        if (approved) { const url = new URL(targetHref, window.location.origin); acceptedHrefRef.current = targetHref; router.push(`${url.pathname}${url.search}${url.hash}`); }
        else if (currentHref) acceptedHrefRef.current = currentHref;
      }).finally(() => { handlingPopStateRef.current = false; });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleAnchorClick, true);
    window.addEventListener('popstate', handlePopState);
    return () => { window.removeEventListener('beforeunload', handleBeforeUnload); document.removeEventListener('click', handleAnchorClick, true); window.removeEventListener('popstate', handlePopState); };
  }, [confirm, isDirty, router, t]);
}
