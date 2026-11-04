// RESPONSIBILITY: Owns stable TanStack Query keys for PublicLanding server-state mutation reconciliation.
export const PUBLIC_LANDING_QUERY_KEYS = {
  BOOKING: ['public-landing', 'booking'] as const,
  CONTACT: ['public-landing', 'contact'] as const,
} as const;
