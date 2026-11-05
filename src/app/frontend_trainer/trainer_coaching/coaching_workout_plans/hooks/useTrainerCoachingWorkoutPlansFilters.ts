"use client";
// DATA FLOW: canonical URL (?view=plans|exercises) -> filters -> queries -> screen view.
import { useCallback, useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS, TRAINER_WORKOUT_CATEGORY_OPTIONS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/TrainerCoachingWorkoutPlansConstants';
import type { TrainerWorkoutSortDirection, TrainerWorkoutSortField } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansSortTypes';
import { TRAINER_WORKOUT_VIEW_QUERY_PARAM, TRAINER_WORKOUT_PAGE_EXERCISES_NAV } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/trainer_coaching_workout_plans.url_config';
import { canonicalizeTrainerWorkoutViewParams, isTrainerWorkoutScreenView, resolveTrainerWorkoutScreenView } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansViewUrlUtils';

export function useTrainerWorkoutFilters(options: { canonicalizeUrl?: boolean } = {}) {
  const shouldCanonicalizeUrl = options.canonicalizeUrl ?? true;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const serializedParams = searchParams.toString();

  useEffect(() => {
    if (!shouldCanonicalizeUrl) return;
    const current = new URLSearchParams(serializedParams);
    const normalized = canonicalizeTrainerWorkoutViewParams(current);
    if (pathname.includes('/coaching_workout_plans') && resolveTrainerWorkoutScreenView(current) === 'exercises') {
      const exerciseQuery = normalized ?? serializedParams;
      router.replace(`${TRAINER_WORKOUT_PAGE_EXERCISES_NAV}${exerciseQuery ? `?${exerciseQuery}` : ''}`, { scroll: false });
      return;
    }
    if (normalized === null) return;
    router.replace(`${pathname}${normalized ? `?${normalized}` : ''}`, { scroll: false });
  }, [pathname, router, serializedParams, shouldCanonicalizeUrl]);

  const currentParams = new URLSearchParams(serializedParams);
  // This route renders plans only; exercise-library deep links are redirected to its separate canonical route.
  const tab = 'plans' as const;
  const search = currentParams.get('search') ?? '';
  const categoryValues = new Set((tab === 'plans' ? TRAINER_WORKOUT_CATEGORY_OPTIONS.WORKOUT : TRAINER_WORKOUT_CATEGORY_OPTIONS.EXERCISE).map((option) => option.value));
  const rawCategory = currentParams.get('category') ?? 'All';
  const category = categoryValues.has(rawCategory as never) ? rawCategory : 'All';
  const rawPage = Number(currentParams.get('page') ?? '1');
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const rawSortBy = currentParams.get('sortBy') ?? 'name';
  const sortBy: TrainerWorkoutSortField = ['name', 'category', 'difficulty'].includes(rawSortBy) ? rawSortBy as TrainerWorkoutSortField : 'name';
  const sortDirection: TrainerWorkoutSortDirection = currentParams.get('sortDirection') === 'desc' ? 'desc' : 'asc';

  const getCanonicalParams = useCallback(() => {
    const current = new URLSearchParams(serializedParams);
    const normalized = canonicalizeTrainerWorkoutViewParams(current);
    return new URLSearchParams(normalized ?? serializedParams);
  }, [serializedParams]);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = getCanonicalParams();
    if (value) current.set(key, value); else current.delete(key);
    if (key !== 'page' && key !== 'view') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [getCanonicalParams, pathname, router]);

  const handleTabChange = useCallback((newTab: string) => {
    const current = getCanonicalParams();
    const validatedView = isTrainerWorkoutScreenView(newTab) ? newTab : TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS[0].value;
    if (pathname.includes('/coaching_workout_plans') && validatedView === 'exercises') {
      current.set(TRAINER_WORKOUT_VIEW_QUERY_PARAM, 'exercises');
      current.set('page', '1');
      current.delete('category');
      router.push(`${TRAINER_WORKOUT_PAGE_EXERCISES_NAV}?${current.toString()}`, { scroll: false });
      return;
    }
    current.set(TRAINER_WORKOUT_VIEW_QUERY_PARAM, validatedView);
    
    current.set('page', '1');
    current.delete('category'); // Preserve the pre-existing behavior for tab-specific category filters.
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [getCanonicalParams, pathname, router]);

  const handleSearchChange = useCallback((newSearch: string) => setUrlParam('search', newSearch || null), [setUrlParam]);
  const handleCategoryChange = useCallback((newCategory: string) => setUrlParam('category', newCategory), [setUrlParam]);
  const handlePageChange = useCallback((newPage: number) => setUrlParam('page', newPage.toString()), [setUrlParam]);
  const handleSort = useCallback((field: TrainerWorkoutSortField) => {
    const current = getCanonicalParams();
    const nextDirection = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
    current.set('sortBy', field);
    current.set('sortDirection', nextDirection);
    current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [getCanonicalParams, pathname, router, sortBy, sortDirection]);

  return { tab, setTab: handleTabChange, search, setSearch: handleSearchChange, category, setCategory: handleCategoryChange, page, setPage: handlePageChange, sortBy, sortDirection, setSort: handleSort };
}
