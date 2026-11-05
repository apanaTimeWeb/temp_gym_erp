// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Protects dirty Trainer forms from browser exits and in-app route changes without losing typed data.
// DATA FLOW: formState.isDirty → useTrainerInfrastructureNavigationGuardStore → anchor/router navigation interception → TrainerInfrastructureConfirmProvider.
import { useCallback, useEffect, useId, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { useRouter } from 'next/navigation';

import { useTrainerInfrastructureConfirm } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureConfirm';

import { useTrainerInfrastructureNavigationGuardStore } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/state/TrainerCoachingSessionsuseTrainerInfrastructureNavigationGuardStore';







/**
 * @description Owns useTrainerInfrastructureUnsavedChangesGuard behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerInfrastructureUnsavedChangesGuard state and data flow for the infrastructure feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerInfrastructureUnsavedChangesGuard(isDirty: boolean) {
  const t = useTranslations('TRAINER_INFRASTRUCTURE');
  const { confirm } = useTrainerInfrastructureConfirm();
  const router = useRouter();
  const sourceId = useId();
  const promptOpenRef = useRef(false);
  const setSourceDirty = useTrainerInfrastructureNavigationGuardStore((state) => state.setSourceDirty);

// Effect contract: register this form's dirty state with the guard registry and clear it during cleanup.
  useEffect(() => {
    setSourceDirty(sourceId, isDirty);
    return () => setSourceDirty(sourceId, false);
  }, [isDirty, setSourceDirty, sourceId]);

// Effect contract: when dirty, protect same-origin anchor navigation and browser tab exits; cleanup removes both listeners.
  useEffect(() => {
    if (!isDirty) return undefined;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (target.target && target.target !== '_self') return;
      if (target.hasAttribute('download')) return;
      if (target.origin !== window.location.origin) return;
      const destination = new URL(target.href);
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
      if (promptOpenRef.current) return;

      event.preventDefault();
      promptOpenRef.current = true;
      const nextUrl = new URL(target.href);
      const nextPath = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
      void confirm({
        title: t('TEXT_UNSAVED_CHANGES_TITLE'),
        message: t('TEXT_UNSAVED_CHANGES_MESSAGE'),
        confirmText: t('TEXT_LEAVE'),
        cancelText: t('TEXT_STAY'),
        type: 'warning',
      }).then((approved) => {
        if (approved) router.push(nextPath);
      }).catch(() => {
        // Confirmation failure is treated as Stay; never navigate without approval.
      }).finally(() => {
        promptOpenRef.current = false;
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [confirm, isDirty, router, t]);

  return useCallback(async (navigate: () => void) => {
    if (!isDirty) {
      navigate();
      return true;
    }
    if (promptOpenRef.current) return false;
    promptOpenRef.current = true;
    try {
      const approved = await confirm({
        title: t('TEXT_UNSAVED_CHANGES_TITLE'),
        message: t('TEXT_UNSAVED_CHANGES_MESSAGE'),
        confirmText: t('TEXT_LEAVE'),
        cancelText: t('TEXT_STAY'),
        type: 'warning',
      });
      if (approved) navigate();
      return approved;
    } finally {
      promptOpenRef.current = false;
    }
  }, [confirm, isDirty, t]);

}
