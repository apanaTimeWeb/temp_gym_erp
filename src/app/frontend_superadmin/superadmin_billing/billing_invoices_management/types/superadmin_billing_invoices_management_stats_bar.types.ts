import type { SuperadminInvoiceCurrencyMetrics } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementMetrics';

export interface SuperadminBillingInvoicesStatsBarProps {
  totalsByCurrency: Record<string, SuperadminInvoiceCurrencyMetrics>;
  overdueCount: number;
}
