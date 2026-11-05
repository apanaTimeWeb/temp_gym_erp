// RESPONSIBILITY: Paginates the module-owned subscription invoice fixture and exposes canonical pagination metadata.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_subscriptions/subscriptions_plans/utils/AdminSubscriptionsManagementPaginateInvoices.ts)

import type { Invoice } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/types/AdminBillingSubscriptionPlansTypes';
import type { AdminSubscriptionsInvoicePaginationResult } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/types/AdminBillingSubscriptionPlansInvoicePaginationTypes';

/** paginateAdminFinanceSubscriptionInvoices provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies. @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature. @description Implements paginateAdminFinanceSubscriptionInvoices for the owning feature’s explicitly typed data. @param invoices - Input used by this utility as declared by the signature. @param page - Input used by this utility as declared by the signature. @param limit - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function paginateAdminFinanceSubscriptionInvoices(invoices: Invoice[], page: number, limit: number): AdminSubscriptionsInvoicePaginationResult {
  const safeLimit = Number.isSafeInteger(limit) && limit > 0 && limit <= 100 ? limit : 10;
  const totalPages = Math.max(1, Math.ceil(invoices.length / safeLimit));
  const validPage = Number.isSafeInteger(page) && page > 0 ? page : 1;
  const safePage = Math.min(validPage, totalPages);
  const start = (safePage - 1) * safeLimit;
  return {
    items: invoices.slice(start, start + safeLimit),
    total: invoices.length,
    page: safePage,
    limit: safeLimit,
    totalPages,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
  };
}
