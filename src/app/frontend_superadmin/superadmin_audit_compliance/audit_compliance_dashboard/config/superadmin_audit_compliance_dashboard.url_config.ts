/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Cross-leaf imports are forbidden, including sibling URL-config imports. Role navigation owns its separate public destination registry and duplicates only verified navigation href values; feature route/API contracts remain leaf-local.
 */

export const SUPERADMIN_AUDIT_COMPLIANCE_DASHBOARD_ROUTES = { MAIN: '/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard' } as const;

export const SUPERADMIN_AUDIT_COMPLIANCE_DASHBOARD_API = { BASE: '/frontend_superadmin/superadmin_compliance' } as const;


