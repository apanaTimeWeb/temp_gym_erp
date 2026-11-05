// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Notifications server state.
export const TRAINER_NOTIFICATIONS_QUERY_KEYS = {
  all: ['trainer_notifications'] as const,
  lists: () => [...TRAINER_NOTIFICATIONS_QUERY_KEYS.all, 'list'] as const,
  list: (page: number, limit: number) => [...TRAINER_NOTIFICATIONS_QUERY_KEYS.lists(), { page, limit }] as const,
} as const;
