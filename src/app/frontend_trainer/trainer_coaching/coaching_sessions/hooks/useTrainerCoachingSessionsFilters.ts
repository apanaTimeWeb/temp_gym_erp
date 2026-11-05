"use client";
// RESPONSIBILITY: Custom hook managing Trainer Sessions URL-based filters.
// DATA FLOW: URL search params <-> useTrainerSessionsFilters <-> useTrainerSessionsQuery
import { useCallback, useEffect } from 'react';

import { format } from 'date-fns';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { TrainerSessionsSessionFilterSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsDomainSchemas';

import type { TrainerSessionsSessionFilter } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

function isCalendarDate(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}






;

/**
 * @description Custom hook managing Trainer Sessions URL-based filters.
 * @dependencies URL search params <-> useTrainerSessionsFilters <-> useTrainerSessionsQuery
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerSessionsFilters state and data flow for the sessions feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerSessionsFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawFilter = searchParams.get('filter') ?? 'All';
  const parsedFilter = TrainerSessionsSessionFilterSchema.safeParse(rawFilter);
  const filter = parsedFilter.success ? parsedFilter.data : 'All';

  const rawDate = searchParams.get('date');
  const date = isCalendarDate(rawDate) ? rawDate : format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    if (rawDate === null || isCalendarDate(rawDate)) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete('date');
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [rawDate, searchParams, router, pathname]);

  const setFilter = useCallback((newFilter: TrainerSessionsSessionFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newFilter && newFilter !== 'All') {
      params.set('filter', newFilter);
    } else {
      params.delete('filter');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const setDate = useCallback((newDate: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (isCalendarDate(newDate)) {
      params.set('date', newDate);
    } else {
      params.delete('date');
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [searchParams, router, pathname]);

  return { filter, setFilter, date, setDate };
}
