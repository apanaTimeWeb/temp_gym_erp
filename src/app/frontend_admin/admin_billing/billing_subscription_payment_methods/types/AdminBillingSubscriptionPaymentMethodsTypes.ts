// RESPONSIBILITY: TypeScript types for the Subscriptions / Billing module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_subscription_payment_methods/types/AdminSubscriptionsManagementTypes.ts)

import { ADMIN_SUBSCRIPTIONS_PLAN_TIER_VALUES, ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES, ADMIN_SUBSCRIPTIONS_PAYMENT_METHOD_TYPE_VALUES, ADMIN_SUBSCRIPTIONS_BILLING_CYCLE_VALUES, ADMIN_SUBSCRIPTIONS_STATUS_VALUES } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/constants/AdminBillingSubscriptionPaymentMethodsConstants';
export type PlanTier = (typeof ADMIN_SUBSCRIPTIONS_PLAN_TIER_VALUES)[number];
export type InvoiceStatus = (typeof ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES)[keyof typeof ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES];
export type PaymentMethodType = (typeof ADMIN_SUBSCRIPTIONS_PAYMENT_METHOD_TYPE_VALUES)[keyof typeof ADMIN_SUBSCRIPTIONS_PAYMENT_METHOD_TYPE_VALUES];
export type BillingCycle = (typeof ADMIN_SUBSCRIPTIONS_BILLING_CYCLE_VALUES)[keyof typeof ADMIN_SUBSCRIPTIONS_BILLING_CYCLE_VALUES];
export type SubscriptionStatus = (typeof ADMIN_SUBSCRIPTIONS_STATUS_VALUES)[keyof typeof ADMIN_SUBSCRIPTIONS_STATUS_VALUES];

export interface CurrentSubscription {
  planId: string;
  planName: string;
  tier: PlanTier;
  monthlyPrice: number;
  annualPrice: number;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate: string;
  autoRenew: boolean;
  gymCount: number;
  memberLimit: number;
  staffLimit: number;
  storageGb: number;
}

export interface SaaSPlan {
  id: string;
  name: string;
  tier: PlanTier;
  monthlyPrice: number;
  annualPrice: number;
  gymLimit: number;
  memberLimit: number;
  staffLimit: number;
  storageGb: number;
  features: string[];
  isPopular: boolean;
  isCurrent: boolean;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  planName: string;
  billingCycle: BillingCycle;
  pdfUrl: string;
  taxAmount?: number;
  gstNumber?: string;
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  last4?: string;
  brand?: string;
  upiId?: string;
  bankName?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface SubscriptionKPIData {
  currentPlan: string;
  monthlySpend: number;
  totalInvoices: number;
  nextBillingAmount: number;
  daysUntilRenewal: number;
  savedWithAnnual: number;
}

export interface AdminSubscriptionsInvoiceStatusStyle {
  labelKey: string;
  backgroundClass: string;
  textClass: string;
}

