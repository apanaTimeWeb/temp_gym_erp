// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Profile server state.
export const TRAINER_PROFILE_QUERY_KEYS = {
  all: ['trainer_profile'] as const,
  profile: () => [...TRAINER_PROFILE_QUERY_KEYS.all, 'profile'] as const,
} as const;
