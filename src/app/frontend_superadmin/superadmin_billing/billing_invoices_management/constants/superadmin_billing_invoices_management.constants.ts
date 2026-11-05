/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingInvoicesConstants owned by the superadmin_billing_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns static status and date-filter configuration for the Superadmin Invoices feature.
export const SUPERADMIN_INVOICE_STATUS_OPTIONS = [
  { value: '', labelKey: 'ui.status_all' },
  { value: 'PAID', labelKey: 'ui.status_paid' },
  { value: 'PENDING', labelKey: 'ui.status_pending' },
  { value: 'OVERDUE', labelKey: 'ui.status_overdue' },
  { value: 'FAILED', labelKey: 'ui.status_failed' },
] as const;

export const SUPERADMIN_BILLING_INVOICES_DATE_FILTER_OPTIONS = [
  { value: 'this_month', labelKey: 'ui.range_this_month' },
  { value: 'last_month', labelKey: 'ui.range_last_month' },
  { value: 'last_3_months', labelKey: 'ui.range_last_3_months' },
  { value: 'last_6_months', labelKey: 'ui.range_last_6_months' },
  { value: 'this_year', labelKey: 'ui.range_this_year' },
  { value: 'monthly', labelKey: 'ui.range_monthly_all_time' },
  { value: 'yearly', labelKey: 'ui.range_yearly_all_time' },
  { value: 'custom', labelKey: 'ui.range_custom' },
] as const;

/** Canonical business/status literals for this feature. */
export const SUPERADMIN_INVOICE_STATUS_CODES = Object.freeze({
  ALL: 'ALL',
  FAILED: 'FAILED',
  OVERDUE: 'OVERDUE',
  PAID: 'PAID',
  PENDING: 'PENDING',
  UNPAID: 'UNPAID',

} as const);

export const SUPERADMIN_BILLING_INVOICES_TAB_CODES = Object.freeze({ ALL: 'ALL', AGING: 'AGING' } as const);

export const SUPERADMIN_INVOICE_RECOVERY_STATUS_CODES = { APPROVED: 'APPROVED' } as const;
/** External share URL builder; kept outside the canonical route/API URL contract. */
export const SUPERADMIN_BILLING_INVOICES_MANAGEMENT_EXTERNAL = {
  WHATSAPP_SHARE: (message: string) => `https://wa.me/?text=${encodeURIComponent(message)}`,
} as const;
