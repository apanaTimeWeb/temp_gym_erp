// RESPONSIBILITY: Defines pagination metadata for the Admin Subscriptions invoice list.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_subscription_invoices/types/AdminSubscriptionsManagementInvoicePaginationTypes.ts)

import type { Invoice } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/types/AdminBillingSubscriptionInvoicesTypes';
export interface AdminSubscriptionsInvoicePaginationResult {
  items: Invoice[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

