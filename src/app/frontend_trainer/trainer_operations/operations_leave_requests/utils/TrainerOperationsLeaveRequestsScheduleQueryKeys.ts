// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Schedule server state.
export const TRAINER_SCHEDULE_QUERY_KEYS = {
  all: ['trainer_schedule'] as const,
  schedule: () => [...TRAINER_SCHEDULE_QUERY_KEYS.all, 'schedule'] as const,
} as const;
