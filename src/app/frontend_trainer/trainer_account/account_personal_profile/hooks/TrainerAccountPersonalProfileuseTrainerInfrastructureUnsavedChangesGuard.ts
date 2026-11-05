'use client';
// DATA FLOW: Form dirty state → module navigation-guard store → browser/router interception → confirm action → navigation or retained draft.
import type { GuardNavigateEvent, GuardNavigation } from '../types/TrainerAccountAccountPersonalProfileAuxiliaryTypes';
// RESPONSIBILITY: Protect local profile drafts at document, link, Navigation API and history boundaries.
import { useCallback, useEffect, useId, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTrainerInfrastructureConfirm } from '@/app/frontend_trainer/trainer_account/account_personal_profile/hooks/TrainerAccountPersonalProfileuseTrainerInfrastructureConfirm';
import { useTrainerInfrastructureNavigationGuardStore } from '@/app/frontend_trainer/trainer_account/account_personal_profile/state/TrainerAccountPersonalProfileuseTrainerInfrastructureNavigationGuardStore';




/** An approved navigation is allowed once; unrelated and cancelled requests are never silently allowed. */
export function useTrainerInfrastructureUnsavedChangesGuard(isDirty: boolean) {
  const t = useTranslations('TRAINER_INFRASTRUCTURE');
  const { confirm } = useTrainerInfrastructureConfirm();
  const router = useRouter();
  const sourceId = useId();
  const promptOpen = useRef(false);
  const allowedDestination = useRef<string | null>(null);
  const setSourceDirty = useTrainerInfrastructureNavigationGuardStore((state) => state.setSourceDirty);

  useEffect(() => {
    setSourceDirty(sourceId, isDirty);
    return () => setSourceDirty(sourceId, false);
  }, [isDirty, setSourceDirty, sourceId]);

  const askToLeave = useCallback(async (navigate: () => void, approvedPath?: string): Promise<boolean> => {
    if (!isDirty) { navigate(); return true; }
    if (promptOpen.current) return false;
    promptOpen.current = true;
    try {
      const approved = await confirm({
        title: t('TEXT_UNSAVED_CHANGES_TITLE'),
        message: t('TEXT_UNSAVED_CHANGES_MESSAGE'),
        confirmText: t('TEXT_LEAVE'), cancelText: t('TEXT_STAY'), type: 'warning',
      });
      if (approved) {
        if (approvedPath) allowedDestination.current = new URL(approvedPath, window.location.href).href;
        navigate();
      }
      return approved;
    } catch {
      return false;
    } finally {
      promptOpen.current = false;
    }
  }, [confirm, isDirty, t]);

  useEffect(() => {
    if (!isDirty) { allowedDestination.current = null; return undefined; }
    const currentUrl = window.location.href;
    const currentState = window.history.state as unknown;
    const navigation = (window as Window & { navigation?: GuardNavigation }).navigation;
    const sameUrl = (url: string) => url === window.location.href;
    const route = (url: string) => {
      const target = new URL(url, window.location.href);
      const path = `${target.pathname}${target.search}${target.hash}`;
      allowedDestination.current = target.href;
      router.push(path);
    };
    const beforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault(); event.returnValue = '';
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.download || (anchor.target && anchor.target !== '_self')) return;
      if (anchor.origin !== window.location.origin || sameUrl(anchor.href)) return;
      event.preventDefault(); event.stopPropagation();
      void askToLeave(() => route(anchor.href));
    };
    // Navigation API catches same-document router.push/replace AND browser traversal before the page changes.
    const navigate = (event: Event) => {
      const next = event as GuardNavigateEvent;
      if (!next.canIntercept || !next.cancelable || !next.destination?.url) return;
      const url = new URL(next.destination.url);
      if (url.origin !== window.location.origin || sameUrl(url.href)) return;
      if (allowedDestination.current === url.href) { allowedDestination.current = null; return; }
      event.preventDefault();
      void askToLeave(() => {
        if (next.navigationType === 'traverse' && next.destination.key && navigation?.traverseTo) {
          allowedDestination.current = url.href;
          void navigation.traverseTo(next.destination.key).catch(() => { allowedDestination.current = null; });
        } else route(url.href);
      });
    };
    // Older engines lack Navigation API. Restore the current location synchronously before asking.
    // This fallback cannot guarantee interception of third-party programmatic App Router transitions.
    const popState = () => {
      if (navigation || sameUrl(currentUrl)) return;
      const attemptedUrl = window.location.href;
      window.history.pushState(currentState, '', currentUrl);
      void askToLeave(() => route(attemptedUrl));
    };
    window.addEventListener('beforeunload', beforeUnload);
    document.addEventListener('click', click, true);
    navigation?.addEventListener('navigate', navigate);
    window.addEventListener('popstate', popState, true);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
      document.removeEventListener('click', click, true);
      navigation?.removeEventListener('navigate', navigate);
      window.removeEventListener('popstate', popState, true);
      allowedDestination.current = null;
    };
  }, [askToLeave, isDirty, router]);
  return askToLeave;
}


export type { GuardNavigateEvent, GuardNavigation } from '../types/TrainerAccountAccountPersonalProfileAuxiliaryTypes';
