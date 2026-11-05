"use client";
// DATA FLOW: Validated ?view= query parameter → profile view-state hook → Next.js router normalization → selected Profile view.
// RESPONSIBILITY: Own validated URL-backed view state for the Trainer Profile module.
import { useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { buildTrainerProfileViewHref, canonicalizeTrainerProfileViewParams, resolveTrainerProfileScreenView } from '@/app/frontend_trainer/trainer_account/account_personal_profile/utils/TrainerAccountPersonalProfileProfileViewUrlUtils';
import type { TrainerProfileTab } from '@/app/frontend_trainer/trainer_account/account_personal_profile/types/TrainerAccountPersonalProfileProfileTypes';

export function useTrainerProfileViewState() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsText = searchParams.toString();
  const activeTab = resolveTrainerProfileScreenView(new URLSearchParams(searchParamsText));
  const setActiveTab = useCallback((tab: TrainerProfileTab) => {
    const nextHref = buildTrainerProfileViewHref(pathname, new URLSearchParams(searchParamsText), tab);
    const currentHref = `${pathname}${searchParamsText ? `?${searchParamsText}` : ''}`;
    if (nextHref !== currentHref) router.replace(nextHref, { scroll: false });
  }, [pathname, router, searchParamsText]);

  useEffect(() => {
    const normalizedQuery = canonicalizeTrainerProfileViewParams(new URLSearchParams(searchParamsText));
    if (normalizedQuery !== null) {
      router.replace(`${pathname}${normalizedQuery ? `?${normalizedQuery}` : ''}`, { scroll: false });
    }
  }, [pathname, router, searchParamsText]);

  return { activeTab, setActiveTab };
}
