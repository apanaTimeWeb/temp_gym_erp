// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';


/**
 * @description Provides the ManagerUnsavedChangesGuard implementation for the manager components hook module.
 * @dependencies @/components/ui/manager_confirm_provider/ManagerConfirmProvider
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
/** Guards a dirty form against browser exit, in-app navigation, and accidental discard. */
/**
 * @description useManagerInfrastructureUnsavedChangesGuard owns the feature-level orchestration for the module and keeps server data, client UI state, and side effects at their documented boundaries.
 * @dependencies Uses only feature-owned APIs, schemas, types, constants, stores, and approved global infrastructure.
 * @edge-case Preserves documented loading, empty, error, retry, cancellation, permission, and direct-URL behavior for this flow.
 */
export function useManagerInfrastructureUnsavedChangesGuard(isDirty: boolean, warningText?: string) {
  const t = useTranslations('MANAGER_SHELL');
  const resolvedWarningText = warningText ?? t('UNSAVED_CHANGES_MESSAGE');
  const router = useRouter();
  const { confirm } = useConfirm();

  const askBeforeDiscard = useCallback(async () => {
    if (!isDirty) return true;
    return confirm({
      title: t('UNSAVED_CHANGES_TITLE'),
      message: resolvedWarningText,
      confirmText: t('DISCARD_CHANGES'),
      cancelText: t('KEEP_EDITING'),
      type: 'warning',
    });
  }, [confirm, isDirty, resolvedWarningText, t]);

  const confirmAndClose = useCallback(async (onClose: () => void) => {
    const shouldClose = await askBeforeDiscard();
    if (shouldClose) onClose();
    return shouldClose;
  }, [askBeforeDiscard]);

  const confirmAndNavigate = useCallback(async (href: string) => {
    const shouldLeave = await askBeforeDiscard();
    if (shouldLeave) router.push(href);
    return shouldLeave;
  }, [askBeforeDiscard, router]);

  // EFFECT: Registers and cleans up browser-exit and same-origin navigation protection only while the form is dirty.
  useEffect(() => {
    if (!isDirty) return undefined;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const targetUrl = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);
      if (targetUrl.origin !== currentUrl.origin || targetUrl.href === currentUrl.href) return;

      // Same-origin navigation must be intercepted here; cross-origin/download/new-tab paths were
      // intentionally filtered above because the application cannot safely reroute them through Next.js.


      event.preventDefault();
      event.stopPropagation();
      const href = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
      void confirmAndNavigate(href);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [confirmAndNavigate, isDirty]);

  return { askBeforeDiscard, confirmAndClose, confirmAndNavigate };
}
