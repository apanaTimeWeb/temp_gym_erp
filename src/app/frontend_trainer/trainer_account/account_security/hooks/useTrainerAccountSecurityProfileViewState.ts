"use client";
// DATA FLOW: Validated ?view= query parameter → view-state hook → Next.js router normalization → Security screen selection.
// RESPONSIBILITY: Own validated URL-backed view state for the Trainer Profile module.
import { useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { buildTrainerAccountSecurityViewHref, canonicalizeTrainerAccountSecurityViewParams, resolveTrainerAccountSecurityScreenView } from '@/app/frontend_trainer/trainer_account/account_security/utils/TrainerAccountSecurityProfileViewUrlUtils';
import type { TrainerAccountSecurityTab } from '@/app/frontend_trainer/trainer_account/account_security/types/TrainerAccountSecurityProfileTypes';

export function useTrainerAccountSecurityProfileViewState() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsText = searchParams.toString();
  const activeTab = resolveTrainerAccountSecurityScreenView(new URLSearchParams(searchParamsText));
  const setActiveTab = useCallback((tab: TrainerAccountSecurityTab) => {
    const nextHref = buildTrainerAccountSecurityViewHref(pathname, new URLSearchParams(searchParamsText), tab);
    const currentHref = `${pathname}${searchParamsText ? `?${searchParamsText}` : ''}`;
    if (nextHref !== currentHref) router.replace(nextHref, { scroll: false });
  }, [pathname, router, searchParamsText]);

  useEffect(() => {
    const normalizedQuery = canonicalizeTrainerAccountSecurityViewParams(new URLSearchParams(searchParamsText));
    if (normalizedQuery !== null) {
      router.replace(`${pathname}${normalizedQuery ? `?${normalizedQuery}` : ''}`, { scroll: false });
    }
  }, [pathname, router, searchParamsText]);

  return { activeTab, setActiveTab };
}
