// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Progress Tracking server state.
import type { TrainerProgressTrackingEntriesQueryParams } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingQueryTypes';
export const TRAINER_PROGRESS_TRACKING_QUERY_KEYS = {
  all: ['trainer_progress_tracking'] as const,
  members: () => [...TRAINER_PROGRESS_TRACKING_QUERY_KEYS.all, 'members'] as const,
  entriesAll: () => [...TRAINER_PROGRESS_TRACKING_QUERY_KEYS.all, 'entries'] as const,
  entries: (memberId: string, params: Omit<TrainerProgressTrackingEntriesQueryParams, 'memberId'>) => [...TRAINER_PROGRESS_TRACKING_QUERY_KEYS.entriesAll(), memberId, params] as const,
  completeHistory: (memberId: string) => [...TRAINER_PROGRESS_TRACKING_QUERY_KEYS.entriesAll(), memberId, 'complete-history'] as const,
  summary: (memberId: string) => [...TRAINER_PROGRESS_TRACKING_QUERY_KEYS.all, 'summary', memberId] as const,
} as const;
