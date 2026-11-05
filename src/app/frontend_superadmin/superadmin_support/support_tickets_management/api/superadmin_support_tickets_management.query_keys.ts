/**
 * @description Canonical TanStack Query key registry for the active Superadmin Tickets feature.
 * @invariant Query identity preserves list and detail resource identities.
 */
export const SUPERADMIN_SUPPORT_TICKETS_QUERY_KEYS = {
  all: ['superadmin_support_tickets', 'tickets'] as const,
  list: (queryParams: Readonly<Record<string, string>>) => ['superadmin_support_tickets', 'tickets', queryParams] as const,
  detail: (ticketId: string) => ['superadmin_support_tickets', 'tickets', 'detail', ticketId] as const,
} as const;
