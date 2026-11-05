"use client";
// RESPONSIBILITY: Loads complete date-scoped session records for the current week/month KPI windows.
// DATA FLOW: KPI date window → bounded date-specific API requests → session records → KPI derivation.
import { useQuery } from '@tanstack/react-query';
import { eachDayOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns';

import { fetchTrainerSessions } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/api/TrainerCoachingSessionsApi';
import { TRAINER_SESSIONS_ALL_SESSION_FILTER } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';
import { TRAINER_SESSIONS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsQueryKeys';
import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

export function getTrainerSessionsKpiQueryDates(now: Date = new Date()): string[] {
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const rangeStart = weekStart < monthStart ? weekStart : monthStart;
  const rangeEnd = weekEnd > monthEnd ? weekEnd : monthEnd;
  return eachDayOfInterval({ start: rangeStart, end: rangeEnd }).map((date) => format(date, 'yyyy-MM-dd'));
}

/**
 * @description Retrieves date-scoped records for current week/month KPI calculations without assuming an undocumented range query.
 * @dependencies Uses the existing single-date list API and a namespaced period query key.
 * @edge-case Limits concurrency to four requests, deduplicates stable IDs, and exposes retry state if a date request fails.
 */
export function useTrainerSessionsKpisQuery() {
  const dates = getTrainerSessionsKpiQueryDates();
  const periodStart = dates[0] ?? format(new Date(), 'yyyy-MM-dd');
  const periodEnd = dates[dates.length - 1] ?? periodStart;
  const query = useQuery({
    queryKey: TRAINER_SESSIONS_QUERY_KEYS.kpiPeriod(periodStart, periodEnd),
    queryFn: async () => {
      const records: TrainerSessionsTrainerSession[] = [];
      const concurrency = 4;
      for (let offset = 0; offset < dates.length; offset += concurrency) {
        const batch = dates.slice(offset, offset + concurrency);
        const results = await Promise.all(batch.map((date) => fetchTrainerSessions(date, TRAINER_SESSIONS_ALL_SESSION_FILTER)));
        for (const dayRecords of results) records.push(...dayRecords);
      }
      const recordsById = new Map<string, TrainerSessionsTrainerSession>();
      for (const session of records) recordsById.set(session.id, session);
      return Array.from(recordsById.values());
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return { sessions: query.data ?? [], isPending: query.isPending, isError: query.isError, refetch: query.refetch, queriedDateCount: dates.length };
}
