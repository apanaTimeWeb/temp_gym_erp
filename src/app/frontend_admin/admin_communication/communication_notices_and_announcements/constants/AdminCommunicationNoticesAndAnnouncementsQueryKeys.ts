// RESPONSIBILITY: Canonical TanStack Query key registry for the AdminAnnouncements Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_communication/communication_notices_and_announcements/constants/AdminCommunicationNoticesAndAnnouncementsQueryKeys.ts)

/**
 * Provides one stable cache-key construction surface with explicit list/detail/resource identity boundaries.
 * @remarks Every server-state consumer in this feature must import this registry rather than inventing literals.
 */
export const ADMIN_ANNOUNCEMENTS_QUERY_KEYS = {
  all: ['admin_announcements'] as const,
  lists: () => [...ADMIN_ANNOUNCEMENTS_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: unknown) => filters === undefined ? ADMIN_ANNOUNCEMENTS_QUERY_KEYS.lists() : [...ADMIN_ANNOUNCEMENTS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...ADMIN_ANNOUNCEMENTS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ADMIN_ANNOUNCEMENTS_QUERY_KEYS.details(), id] as const,
  key: (...segments: readonly unknown[]) => [...ADMIN_ANNOUNCEMENTS_QUERY_KEYS.all, ...segments] as const,
};
