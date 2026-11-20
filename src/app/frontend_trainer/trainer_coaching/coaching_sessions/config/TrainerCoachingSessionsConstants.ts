// RESPONSIBILITY: Centralized runtime constants for the Trainer Sessions module.
// TypeScript types (TrainerSessionsSessionType, TrainerSessionsSessionStatus, TrainerSessionsSessionFilter) live in
// sessions_types/TrainerSessionsTypes.ts (Rule 7 — type isolation).
// Bug #19 fix: Adds TrainerSessionsIsSpecificFilter() type guard for TrainerSessionsSessionFilter vs TrainerSessionsSessionType conflation.
import { CalendarCheck, CalendarX, TrendingUp, Users } from 'lucide-react';

import type { TrainerSessionsSessionType, TrainerSessionsSessionStatus, TrainerSessionsSessionFilter, LiveWorkoutExercise } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';







export const TRAINER_SESSIONS_SESSION_TYPE = { PT: 'PT', GROUP: 'Group' } as const;
export const TRAINER_SESSIONS_SESSION_TYPES = [TRAINER_SESSIONS_SESSION_TYPE.PT, TRAINER_SESSIONS_SESSION_TYPE.GROUP] as const;
export const TRAINER_SESSIONS_ALL_SESSION_FILTER = 'All' as const;
export const TRAINER_SESSIONS_RECURRENCE_TYPES = ['none', 'weekly', 'biweekly'] as const;

export const TRAINER_SESSIONS_SESSION_FILTER_OPTIONS = [
  { value: TRAINER_SESSIONS_ALL_SESSION_FILTER, labelKey: 'TEXT_ALL' },
  { value: TRAINER_SESSIONS_SESSION_TYPE.PT, labelKey: 'TEXT_PT' },
  { value: TRAINER_SESSIONS_SESSION_TYPE.GROUP, labelKey: 'TEXT_GROUP' },
] as const;

export const TRAINER_SESSIONS_SESSION_STATUS = { UPCOMING: 'Upcoming', COMPLETED: 'Completed', NO_SHOW: 'No Show' } as const;
export const TRAINER_SESSIONS_SESSION_STATUS_VALUES = [TRAINER_SESSIONS_SESSION_STATUS.UPCOMING, TRAINER_SESSIONS_SESSION_STATUS.COMPLETED, TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW] as const;

export const TRAINER_SESSIONS_SESSION_STATUS_STYLES: Record<TrainerSessionsSessionStatus, string> = {
  [TRAINER_SESSIONS_SESSION_STATUS.COMPLETED]: 'bg-success-bg text-success',
  [TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW]: 'bg-danger-bg text-danger',
  [TRAINER_SESSIONS_SESSION_STATUS.UPCOMING]: 'bg-warning-bg text-warning',
};

export const TRAINER_SESSIONS_SESSION_TYPE_STYLES: Record<TrainerSessionsSessionType, string> = {
  [TRAINER_SESSIONS_SESSION_TYPE.PT]: 'bg-info-bg text-info',
  [TRAINER_SESSIONS_SESSION_TYPE.GROUP]: 'bg-purple-bg text-purple',
};

export const TRAINER_SESSIONS_DURATION_OPTIONS = [
  { value: '30m', labelKey: 'TEXT_30_MINUTES' },
  { value: '45m', labelKey: 'TEXT_45_MINUTES' },
  { value: '60m', labelKey: 'TEXT_60_MINUTES' },
];


export const TRAINER_SESSIONS_KPI_CARD_CONFIG = [
  { key: 'today', labelKey: 'TEXT_TODAYS_SESSIONS', icon: CalendarCheck, iconClass: 'text-primary', bgClass: 'bg-primary-subtle' },
  { key: 'completed', labelKey: 'TEXT_COMPLETED_WEEK', icon: TrendingUp, iconClass: 'text-success', bgClass: 'bg-success-bg' },
  { key: 'no-shows', labelKey: 'TEXT_NO_SHOWS_MONTH', icon: CalendarX, iconClass: 'text-danger', bgClass: 'bg-danger-bg' },
  { key: 'attendance', labelKey: 'TEXT_AVG_ATTENDANCE', icon: Users, iconClass: 'text-info', bgClass: 'bg-info-bg' },
] as const;

export const TRAINER_SESSIONS_DEFAULT_LIVE_EXERCISES: LiveWorkoutExercise[] = [
  {
    id: 'ex-1',
    name: 'Barbell Bench Press',
    targetSets: 3,
    sets: [
      { id: 's-1-1', setNumber: 1, targetWeightKg: 60, actualWeightKg: 60, targetReps: 10, actualReps: 10, rpe: 7, completed: true },
      { id: 's-1-2', setNumber: 2, targetWeightKg: 65, actualWeightKg: 65, targetReps: 8, actualReps: 8, rpe: 8, completed: true },
      { id: 's-1-3', setNumber: 3, targetWeightKg: 70, actualWeightKg: 70, targetReps: 6, actualReps: 6, rpe: 9, completed: false },
    ],
  },
  {
    id: 'ex-2',
    name: 'Incline Dumbbell Press',
    targetSets: 3,
    sets: [
      { id: 's-2-1', setNumber: 1, targetWeightKg: 22, actualWeightKg: 22, targetReps: 12, actualReps: 12, rpe: 7, completed: false },
      { id: 's-2-2', setNumber: 2, targetWeightKg: 24, actualWeightKg: 24, targetReps: 10, actualReps: 10, rpe: 8, completed: false },
      { id: 's-2-3', setNumber: 3, targetWeightKg: 24, actualWeightKg: 24, targetReps: 10, actualReps: 10, rpe: 9, completed: false },
    ],
  },
];
