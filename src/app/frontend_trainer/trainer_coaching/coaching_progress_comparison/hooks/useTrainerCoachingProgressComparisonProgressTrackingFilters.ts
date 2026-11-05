"use client";
// DATA FLOW: canonical URL (?view=individual|compare) -> filters -> queries -> screen view.
import { useCallback, useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TRAINER_PROGRESS_TRACKING_PROGRESS_SORT_FIELDS } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/utils/TrainerCoachingProgressComparisonProgressTrackingConstants';
import type { TrainerProgressTrackingProgressSortDirection, TrainerProgressTrackingProgressSortField } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingTypes';
import { TRAINER_PROGRESS_TRACKING_VIEW_QUERY_PARAM } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/config/trainer_coaching_progress_comparison.url_config';
import { canonicalizeTrainerProgressTrackingViewParams, isTrainerProgressTrackingScreenView, resolveTrainerProgressTrackingScreenView } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/utils/TrainerCoachingProgressComparisonProgressTrackingViewUrlUtils';
import type { TrainerProgressTrackingScreenView } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/utils/TrainerCoachingProgressComparisonProgressTrackingViewUrlUtils';

export function useTrainerProgressTrackingFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const serializedParams = searchParams.toString();

  useEffect(() => {
    const normalized = canonicalizeTrainerProgressTrackingViewParams(new URLSearchParams(serializedParams));
    if (normalized === null) return;
    router.replace(`${pathname}${normalized ? `?${normalized}` : ''}`, { scroll: false });
  }, [pathname, router, serializedParams]);

  const currentParams = new URLSearchParams(serializedParams);
  const activeTab: TrainerProgressTrackingScreenView = resolveTrainerProgressTrackingScreenView(currentParams);
  const selectedMemberId = currentParams.get('memberId') ?? '';
  const pageValue = Number(currentParams.get('page') ?? '1');
  const currentPage = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const sortByValue = currentParams.get('sortBy') ?? 'date';
  const sortBy: TrainerProgressTrackingProgressSortField = TRAINER_PROGRESS_TRACKING_PROGRESS_SORT_FIELDS.includes(sortByValue as TrainerProgressTrackingProgressSortField) ? sortByValue as TrainerProgressTrackingProgressSortField : 'date';
  const sortDirection: TrainerProgressTrackingProgressSortDirection = currentParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';

  const getCanonicalParams = useCallback(() => {
    const current = new URLSearchParams(serializedParams);
    const normalized = canonicalizeTrainerProgressTrackingViewParams(current);
    return new URLSearchParams(normalized ?? serializedParams);
  }, [serializedParams]);

  const setSelectedMemberId = useCallback((id: string) => {
    const params = getCanonicalParams();
    if (id) params.set('memberId', id); else params.delete('memberId');
    params.set('page', '1'); // New member must start at the first page.
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [getCanonicalParams, pathname, router]);

  const setCurrentPage = useCallback((page: number) => {
    const params = getCanonicalParams();
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  }, [getCanonicalParams, pathname, router]);

  const setSort = useCallback((field: TrainerProgressTrackingProgressSortField) => {
    const params = getCanonicalParams();
    params.set('sortBy', field);
    params.set('sortDirection', field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  }, [getCanonicalParams, pathname, router, sortBy, sortDirection]);

  const setActiveTab = useCallback((view: TrainerProgressTrackingScreenView) => {
    const params = getCanonicalParams();
    if (isTrainerProgressTrackingScreenView(view)) params.set(TRAINER_PROGRESS_TRACKING_VIEW_QUERY_PARAM, view);
    params.delete('tab');
    router.push(`${pathname}?${params.toString()}`);
  }, [getCanonicalParams, pathname, router]);

  return { selectedMemberId, setSelectedMemberId, activeTab, setActiveTab, currentPage, setCurrentPage, sortBy, sortDirection, setSort };
}
