// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Profile server state.
export const TRAINER_ACCOUNT_SECURITY_QUERY_KEYS = {
  all: ['trainer_profile'] as const,
  profile: () => [...TRAINER_ACCOUNT_SECURITY_QUERY_KEYS.all, 'profile'] as const,
} as const;
