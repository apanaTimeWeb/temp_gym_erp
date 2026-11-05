import type { SUPERADMIN_BILLING_INVOICES_TAB_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';

// RESPONSIBILITY: Type contract extracted from SuperadminBillingInvoicesMain.tsx; no business behavior.

export type InvoicesTab = keyof typeof SUPERADMIN_BILLING_INVOICES_TAB_CODES;
