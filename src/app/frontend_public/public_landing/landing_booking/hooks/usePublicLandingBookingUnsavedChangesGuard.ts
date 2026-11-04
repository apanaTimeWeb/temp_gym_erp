// RESPONSIBILITY: Blocks accidental intra-app navigation from dirty forms with an accessible feature-owned dialog.
// FLOW: dirty RHF state -> intercepted same-origin link -> pending URL -> accessible confirmation -> router.push.
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

/** The native beforeunload prompt is browser-controlled; internal navigation uses a custom dialog. */
export function usePublicLandingUnsavedChangesGuard(isDirty: boolean) {
  const router = useRouter();
  const t = useTranslations('LANDING');
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    if (!isDirty) return;
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = t('shared.unsavedChanges');
    };
    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute('download') || (anchor.target && anchor.target.toLowerCase() !== '_self')) return;
      let destination: URL;
      try { destination = new URL(anchor.href, window.location.href); } catch { return; }
      if (destination.origin !== window.location.origin) return;
      const current = new URL(window.location.href);
      if (destination.pathname === current.pathname && destination.search === current.search && destination.hash === current.hash) return;
      event.preventDefault();
      event.stopPropagation();
      setPendingHref(`${destination.pathname}${destination.search}${destination.hash}`);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [isDirty, t]);

  const stay = useCallback(() => setPendingHref(null), []);
  const leave = useCallback(() => {
    if (pendingHref !== null) { const href = pendingHref; setPendingHref(null); router.push(href); }
  }, [pendingHref, router]);
  return { isConfirmOpen: isDirty && pendingHref !== null, stay, leave };
}
