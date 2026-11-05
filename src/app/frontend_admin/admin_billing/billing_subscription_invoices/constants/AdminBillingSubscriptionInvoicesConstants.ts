// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_finance/finance_subscription_invoices/constants/AdminSubscriptionsManagementConstants.ts)

import type {
  CurrentSubscription, SaaSPlan, Invoice, PaymentMethod, SubscriptionKPIData, InvoiceStatus, AdminSubscriptionsInvoiceStatusStyle,
} from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/types/AdminBillingSubscriptionInvoicesTypes';


export const PLAN_TIER_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  starter:    { bg: 'bg-info-bg',    text: 'text-info',    border: 'border-border'    },
  growth:     { bg: 'bg-primary-subtle', text: 'text-primary', border: 'border-border' },
  pro:        { bg: 'bg-warning-bg', text: 'text-warning', border: 'border-border' },
  enterprise: { bg: 'bg-success-bg', text: 'text-success', border: 'border-border' },
};


export const ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE = 10;

export const ADMIN_SUBSCRIPTIONS_TAB_OPTIONS = [
  { key: 'overview', labelKey: 'subscriptions.AdminSubscriptionsMain.auto_tabOverview' },
  { key: 'plans', labelKey: 'subscriptions.AdminSubscriptionsMain.auto_tabPlans' },
  { key: 'invoices', labelKey: 'subscriptions.AdminSubscriptionsMain.auto_tabInvoices' },
  { key: 'payment', labelKey: 'subscriptions.AdminSubscriptionsMain.auto_tabPayment' },
] as const;

export const ADMIN_SUBSCRIPTIONS_STATUS_VALUES = { ACTIVE: 'active', CANCELLED: 'cancelled', PAST_DUE: 'past_due' } as const;
export const ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES = { PAID: 'paid', PENDING: 'pending', FAILED: 'failed', REFUNDED: 'refunded' } as const;

export const ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_STYLES: Record<InvoiceStatus, AdminSubscriptionsInvoiceStatusStyle> = {
  paid: { labelKey: 'subscriptions.static.paid', backgroundClass: 'bg-success-bg', textClass: 'text-success' },
  pending: { labelKey: 'subscriptions.static.pending', backgroundClass: 'bg-warning-bg', textClass: 'text-warning' },
  failed: { labelKey: 'subscriptions.static.failed', backgroundClass: 'bg-danger-bg', textClass: 'text-danger' },
  refunded: { labelKey: 'subscriptions.static.refunded', backgroundClass: 'bg-info-bg', textClass: 'text-info' },
};

export const ADMIN_SUBSCRIPTIONS_PLAN_TIER_VALUES = ['starter', 'growth', 'pro', 'enterprise'] as const;
export const ADMIN_SUBSCRIPTIONS_PAYMENT_METHOD_TYPE_VALUES = { CARD: 'card', UPI: 'upi', NETBANKING: 'netbanking' } as const;
export const ADMIN_SUBSCRIPTIONS_BILLING_CYCLE_VALUES = { MONTHLY: 'monthly', ANNUAL: 'annual' } as const;
