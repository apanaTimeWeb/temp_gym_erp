/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Cross-leaf imports are forbidden, including sibling URL-config imports. Role navigation owns its separate public destination registry and duplicates only verified navigation href values; feature route/API contracts remain leaf-local.
 */

export const SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_ROUTES = { MAIN: "/frontend_superadmin/superadmin_support/support_tickets_management", GYMS: "/frontend_superadmin/superadmin_gyms" } as const;

export const SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_API = {
          BASE: "/superadmin/tickets",
          DETAIL: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}`,
          REPLY: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/reply`,
          CLOSE: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/close`,
          ASSIGN: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/assign`,
      } as const;


