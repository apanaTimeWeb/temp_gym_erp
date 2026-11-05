"use client";
// RESPONSIBILITY: Protects dirty Coupons forms from accidental navigation.
// DATA FLOW: Form isDirty → feature-local guard → approved shell confirmation infrastructure → navigation continuation.

import { useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementConfirm';

/** @description Prevents accidental browser exits and same-origin navigation while a Coupons form is dirty. @dependencies Uses the feature dirty-state signal plus approved shell confirmation infrastructure. @edge-case Preserves beforeunload protection, anchor interception, and explicit discard confirmation. @param isDirty - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminBillingCouponsManagementUnsavedChangesGuard(isDirty: boolean) {
  const router = useRouter();
  const pathname = usePathname();
  const { confirm } = useAdminNavigationLayoutConfirm();
  const t = useTranslations('admin_layout.AdminUnsavedChangesGuard');
  const confirmDiscardIfDirty = useCallback(async () => {
    if (!isDirty) return true;
    return confirm({ title: t('title'), message: t('message'), confirmText: t('discard'), type: 'warning' });
  }, [confirm, isDirty, t]);
  const handleNavigationAttempt = useCallback(async (event: MouseEvent) => {
    if (!isDirty || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a[href]');
    if (!(anchor instanceof HTMLAnchorElement)) return;
    // Only guard current-tab SPA navigation: new tabs, downloads and external links
    // must retain their native browser behavior even when a form is dirty.
    const linkTarget = anchor.getAttribute('target')?.trim().toLowerCase();
    if ((linkTarget && linkTarget !== '_self') || anchor.hasAttribute('download') ||
        anchor.relList.contains('external')) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || (url.pathname === pathname && url.search === window.location.search)) return;
    event.preventDefault();
    const shouldLeave = await confirm({ title: t('title'), message: t('message'), confirmText: t('leave'), type: 'warning' });
    if (shouldLeave) router.push(`${url.pathname}${url.search}${url.hash}`);
  }, [confirm, isDirty, pathname, router, t]);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = t('message');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleNavigationAttempt, true);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleNavigationAttempt, true);
    };
  }, [handleNavigationAttempt, isDirty, t]);
  return { confirmDiscardIfDirty };
}
