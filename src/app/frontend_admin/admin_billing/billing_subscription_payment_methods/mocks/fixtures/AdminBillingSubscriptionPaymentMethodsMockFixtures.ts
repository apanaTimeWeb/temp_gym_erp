// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_finance/finance_subscription_payment_methods/mocks/fixtures/AdminSubscriptionsManagementMockFixtures.ts)
import { ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES, ADMIN_SUBSCRIPTIONS_STATUS_VALUES } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/constants/AdminBillingSubscriptionPaymentMethodsConstants';
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin subscriptions feature.
import type { CurrentSubscription } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/types/AdminBillingSubscriptionPaymentMethodsTypes';
import type { SubscriptionKPIData } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/types/AdminBillingSubscriptionPaymentMethodsTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin subscriptions feature.

export const MOCK_CURRENT_SUBSCRIPTION: CurrentSubscription = {
  planId: 'plan_growth',
  planName: 'Growth',
  tier: 'growth',
  monthlyPrice: 4999,
  annualPrice: 49990,
  billingCycle: 'monthly',
  status: ADMIN_SUBSCRIPTIONS_STATUS_VALUES.ACTIVE,
  currentPeriodStart: '2026-06-01',
  currentPeriodEnd: '2026-06-30',
  nextBillingDate: '2026-07-01',
  autoRenew: true,
  gymCount: 3,
  memberLimit: 500,
  staffLimit: 25,
  storageGb: 50,
};

import type { SaaSPlan, Invoice, PaymentMethod } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/types/AdminBillingSubscriptionPaymentMethodsTypes';

export const MOCK_ADMIN_SUBSCRIPTION_INVOICE_PDF_URL = 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iaiA8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4gZW5kb2JqCjIgMCBvYmogPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUiBdIC9Db3VudCAxID4+IGVuZG9iagozIDAgb2JqIDw8IC9UeXBlIC9QYWdlIC9QYXJlbnQgMiAwIFIgL01lZGlhQm94IFswIDAgNTk1LjI4IDg0MS44OV0gL0NvbnRlbnRzIDQgMCBSID4+IGVuZG9iago0IDAgb2JqIDw8IC9MZW5ndGggNDkgPj4gc3RyZWFtCkJUIAovRjEgMTIgVGYKNTAgNzkwIFRkCihTbWFydCBHeW0gMzYwIEZha3RlZCBJbnZvaWNlKSBUagpFVAplbmRzdHJlYW0gZW5kb2JqCjUgMCBvYmogPDwgPj4gZW5kb2JqCnhyZWYKNCAwMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwNjMgMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAxMTQgMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAyMTUgMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAzMTQgMDAwMDAwMDAwIDY1NTM1IGYgCnRyYWlsZXIKPDwgL1Jvb3QgMSAwIFIgPj4Kc3RhcnR4cmVmCjM0MAolJUVPRg==';

export const MOCK_SAAS_PLANS: SaaSPlan[] = [
  {
    id: 'plan_starter',
    name: 'Starter',
    tier: 'starter',
    monthlyPrice: 1999,
    annualPrice: 19990,
    gymLimit: 1,
    memberLimit: 100,
    staffLimit: 5,
    storageGb: 10,
    features: ['1 Gym Branch', 'Up to 100 Members', '5 Staff Accounts', '10 GB Storage', 'Basic Reports', 'Email Support'],
    isPopular: false,
    isCurrent: false,
  },
  {
    id: 'plan_growth',
    name: 'Growth',
    tier: 'growth',
    monthlyPrice: 4999,
    annualPrice: 49990,
    gymLimit: 5,
    memberLimit: 500,
    staffLimit: 25,
    storageGb: 50,
    features: ['Up to 5 Gym Branches', 'Up to 500 Members', '25 Staff Accounts', '50 GB Storage', 'Advanced Reports', 'Bulk Communications', 'Coupons & Discounts', 'Priority Support'],
    isPopular: true,
    isCurrent: true,
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    tier: 'pro',
    monthlyPrice: 9999,
    annualPrice: 99990,
    gymLimit: 15,
    memberLimit: 2000,
    staffLimit: 100,
    storageGb: 200,
    features: ['Up to 15 Gym Branches', 'Up to 2,000 Members', '100 Staff Accounts', '200 GB Storage', 'Full Analytics Suite', 'Data Export (CSV/Excel/PDF)', 'Gym Health Alerts', 'Gym Comparison', 'Dedicated Account Manager', '24/7 Support'],
    isPopular: false,
    isCurrent: false,
  },
  {
    id: 'plan_enterprise',
    name: 'Enterprise',
    tier: 'enterprise',
    monthlyPrice: 0,
    annualPrice: 0,
    gymLimit: 999,
    memberLimit: 999999,
    staffLimit: 9999,
    storageGb: 1000,
    features: ['Unlimited Gym Branches', 'Unlimited Members', 'Unlimited Staff', '1 TB Storage', 'Custom Integrations', 'White-label Option', 'Uptime Guarantee', 'Dedicated Infrastructure', 'Custom Contracts'],
    isPopular: false,
    isCurrent: false,
  },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'inv1', invoiceNo: 'INV-2025-006', date: '2026-06-01', dueDate: '2026-06-07', amount: 4999, status: ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES.PAID,    planName: 'Growth', billingCycle: 'monthly', pdfUrl: MOCK_ADMIN_SUBSCRIPTION_INVOICE_PDF_URL },
  { id: 'inv2', invoiceNo: 'INV-2025-005', date: '2026-05-01', dueDate: '2026-05-07', amount: 4999, status: ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES.PAID,    planName: 'Growth', billingCycle: 'monthly', pdfUrl: MOCK_ADMIN_SUBSCRIPTION_INVOICE_PDF_URL },
  { id: 'inv3', invoiceNo: 'INV-2025-004', date: '2026-04-01', dueDate: '2026-04-07', amount: 4999, status: ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES.PAID,    planName: 'Growth', billingCycle: 'monthly', pdfUrl: MOCK_ADMIN_SUBSCRIPTION_INVOICE_PDF_URL },
  { id: 'inv4', invoiceNo: 'INV-2025-003', date: '2026-03-01', dueDate: '2026-03-07', amount: 4999, status: ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES.PAID,    planName: 'Growth', billingCycle: 'monthly', pdfUrl: MOCK_ADMIN_SUBSCRIPTION_INVOICE_PDF_URL },
  { id: 'inv5', invoiceNo: 'INV-2025-002', date: '2026-02-01', dueDate: '2026-02-07', amount: 4999, status: ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES.PAID,    planName: 'Growth', billingCycle: 'monthly', pdfUrl: MOCK_ADMIN_SUBSCRIPTION_INVOICE_PDF_URL },
  { id: 'inv6', invoiceNo: 'INV-2025-001', date: '2026-01-01', dueDate: '2026-01-07', amount: 3999, status: ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES.PAID,    planName: 'Starter', billingCycle: 'monthly', pdfUrl: MOCK_ADMIN_SUBSCRIPTION_INVOICE_PDF_URL },
  { id: 'inv7', invoiceNo: 'INV-2024-012', date: '2026-12-01', dueDate: '2026-12-07', amount: 3999, status: ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES.FAILED,  planName: 'Starter', billingCycle: 'monthly', pdfUrl: MOCK_ADMIN_SUBSCRIPTION_INVOICE_PDF_URL },
  { id: 'inv8', invoiceNo: 'INV-2024-011', date: '2026-11-01', dueDate: '2026-11-07', amount: 3999, status: ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES.PAID,    planName: 'Starter', billingCycle: 'monthly', pdfUrl: MOCK_ADMIN_SUBSCRIPTION_INVOICE_PDF_URL },
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pm1', type: 'card', last4: '4242', brand: 'Visa',       expiryMonth: 12, expiryYear: 2027, isDefault: true  },
  { id: 'pm2', type: 'upi',  upiId: 'gymsmart@okaxis',                                              isDefault: false },
  { id: 'pm3', type: 'card', last4: '5555', brand: 'Mastercard', expiryMonth: 8,  expiryYear: 2026, isDefault: false },
];



// Deterministic expanded development fixtures keep list/table pagination, search,
// sorting and filter states populated without embedding fallback data in components.

export const MOCK_SUBSCRIPTION_KPI: SubscriptionKPIData = {
  currentPlan: 'Growth',
  monthlySpend: 4999,
  totalInvoices: 8,
  nextBillingAmount: 4999,
  daysUntilRenewal: 11,
  savedWithAnnual: 9998,
};
