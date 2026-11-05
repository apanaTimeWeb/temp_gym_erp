/**
 * @description Central TanStack Query key registry for Broadcasts.
 * @dependencies None.
 * @edge-case Keys remain stable across retries so mutations reconcile the exact affected cache.
 */
export const SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS = {
  all: ["superadmin_communication_broadcasts"] as const,
  list: (params: unknown) => ["superadmin_communication_broadcasts", "list", params] as const,
  tenants: ["superadmin_communication_broadcasts", "tenants"] as const,
  modalTenants: ["superadmin_communication_broadcasts", "modal-tenants"] as const,
  modalRecipientCount: ["superadmin_communication_broadcasts", "modal-recipient-count"] as const,
  detail: (id: string) => ["superadmin_communication_broadcasts", "detail", id] as const,
} as const;
