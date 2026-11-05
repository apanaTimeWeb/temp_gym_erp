// RESPONSIBILITY: Paginates the module-owned subscription invoice fixture and exposes canonical pagination metadata.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_subscription_invoices/utils/AdminSubscriptionsManagementPaginateInvoices.ts)

import type { Invoice } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/types/AdminBillingSubscriptionInvoicesTypes';
import { ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/constants/AdminBillingSubscriptionInvoicesConstants';
import type { AdminSubscriptionsInvoicePaginationResult } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/types/AdminBillingSubscriptionInvoicesInvoicePaginationTypes';

/** paginateAdminBillingSubscriptionInvoices provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies. @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature. @description Implements paginateAdminBillingSubscriptionInvoices for the owning feature’s explicitly typed data. @param invoices - Input used by this utility as declared by the signature. @param page - Input used by this utility as declared by the signature. @param limit - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function paginateAdminBillingSubscriptionInvoices(invoices: Invoice[], page: number, limit: number): AdminSubscriptionsInvoicePaginationResult {
  // Malformed numeric URL inputs must never produce non-finite or fractional metadata.
  const safePage = Number.isSafeInteger(page) && page >= 1 ? page : 1;
  const safeLimit = Number.isSafeInteger(limit) && limit >= 1
    ? Math.min(limit, ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE)
    : ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(invoices.length / safeLimit));
  const boundedPage = Math.min(safePage, totalPages);
  const start = (boundedPage - 1) * safeLimit;
  return {
    items: invoices.slice(start, start + safeLimit),
    total: invoices.length,
    page: boundedPage,
    limit: safeLimit,
    totalPages,
    hasNextPage: boundedPage < totalPages,
    hasPrevPage: boundedPage > 1,
  };
}
