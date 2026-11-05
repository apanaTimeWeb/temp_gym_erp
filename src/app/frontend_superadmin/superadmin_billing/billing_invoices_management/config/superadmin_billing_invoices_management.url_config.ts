/** Canonical URL contracts for the autonomous Superadmin Invoices Management sub-module. */
export const SUPERADMIN_BILLING_INVOICES_MANAGEMENT_ROUTES = { MAIN: "/frontend_superadmin/superadmin_billing/billing_invoices_management" } as const;

export const SUPERADMIN_BILLING_INVOICES_MANAGEMENT_API = {
  BASE: "/superadmin/saas-billing/invoices",
  MANUAL_PAYMENT: "/superadmin/saas-billing/invoices/manual-payment",
  TENANTS: "/superadmin/gyms",
  DOWNLOAD: (invoiceId: string) => `/superadmin/saas-billing/invoices/${encodeURIComponent(invoiceId)}/download`,
  EXPORT: '/superadmin/saas-billing/invoices/export',
  RESEND: (invoiceId: string) => `/superadmin/saas-billing/invoices/${encodeURIComponent(invoiceId)}/resend`,
  RECOVERY_CENTER: { BACKEND_API: { BASE: '/superadmin/saas-billing/invoices/recovery-center' } },
} as const;

