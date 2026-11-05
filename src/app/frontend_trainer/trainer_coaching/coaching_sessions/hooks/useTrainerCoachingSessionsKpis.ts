"use client";
// RESPONSIBILITY: Derives session KPI values from the Trainer Sessions query result. No rendering or API ownership.
// DATA FLOW: Session query data → KPI derivation → display-ready session statistics → Sessions UI.
import { endOfMonth, endOfWeek, format, isWithinInterval, parseISO, startOfMonth, startOfWeek } from 'date-fns';

import { TRAINER_SESSIONS_SESSION_STATUS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';

import type { TrainerSessionsKpiValues } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsKpiValues';

import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';







/**
 * @description Owns useTrainerSessionsKpis behavior in the Trainer module.
 * @dependencies Session query data → KPI derivation → display-ready session statistics → Sessions UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerSessionsKpis state and data flow for the sessions feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerSessionsKpis(sessions: TrainerSessionsTrainerSession[]): TrainerSessionsKpiValues {
  const now = new Date();
  const today = format(now, 'yyyy-MM-dd');
  const weekWindow = { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
  const monthWindow = { start: startOfMonth(now), end: endOfMonth(now) };
  const validDatedSessions = sessions.flatMap((session) => {
    const date = /^\d{4}-\d{2}-\d{2}$/.test(session.sessionDate) ? parseISO(session.sessionDate) : new Date(Number.NaN);
    return Number.isNaN(date.getTime()) ? [] : [{ session, date }];
  });
  const todaySessions = validDatedSessions.filter(({ session }) => session.sessionDate === today);
  const completedThisWeek = validDatedSessions.filter(({ session, date }) => session.status === TRAINER_SESSIONS_SESSION_STATUS.COMPLETED && isWithinInterval(date, weekWindow)).length;
  const noShowsThisMonth = validDatedSessions.filter(({ session, date }) => session.status === TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW && isWithinInterval(date, monthWindow)).length;
  const measurable = validDatedSessions.filter(({ date, session }) => isWithinInterval(date, monthWindow) && Boolean(session.maxAttendees && session.maxAttendees > 0)).map(({ session }) => session);
  const avgAttendanceRate = measurable.length === 0 ? 0 : Math.round((measurable.reduce((sum, session) => sum + (session.attendees / (session.maxAttendees ?? 1)) * 100, 0) / measurable.length) * 10) / 10;
  return { todayCount: todaySessions.length, completedThisWeek, noShowsThisMonth, avgAttendanceRate };
}
