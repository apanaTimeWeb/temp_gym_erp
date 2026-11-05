// RESPONSIBILITY: API client for the Subscriptions / Billing module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_finance/finance_subscription_payment_methods/api/admin_subscriptions_management_api.ts)

import { ADMIN_SUBSCRIPTIONS_API } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/config/admin_billing_subscription_payment_methods.url_config';
import { saaSPlanSchema, invoiceSchema, paymentMethodSchema, subscriptionKpiDataSchema, currentSubscriptionSchema } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/schemas/AdminBillingSubscriptionPaymentMethodsSchemas';
import type { CurrentSubscription, SaaSPlan, Invoice, PaymentMethod, SubscriptionKPIData } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/types/AdminBillingSubscriptionPaymentMethodsTypes';
import { z } from 'zod';
import { adminSubscriptionsManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/utils/AdminBillingSubscriptionPaymentMethodsApiResponse';

export const AdminSubscriptionsApi = {
  fetchSubscription: async () => {
    return apiFetch<CurrentSubscription>(ADMIN_SUBSCRIPTIONS_API.subscription, { method: 'GET', dataSchema: currentSubscriptionSchema });
  },
  fetchPlans: async () => {
    return apiFetch<SaaSPlan[]>(ADMIN_SUBSCRIPTIONS_API.plans, { method: 'GET', dataSchema: z.array(saaSPlanSchema) });
  },
  fetchInvoices: async (params: { page: number; limit: number }) => {
    const query = new URLSearchParams({ page: String(params.page), limit: String(params.limit) }).toString();
    return apiFetch<Invoice[]>(`${ADMIN_SUBSCRIPTIONS_API.invoices}?${query}`, { method: 'GET', dataSchema: z.array(invoiceSchema) });
  },
  fetchPaymentMethods: async () => {
    return apiFetch<PaymentMethod[]>(ADMIN_SUBSCRIPTIONS_API.paymentMethods, { method: 'GET', dataSchema: z.array(paymentMethodSchema) });
  },
  fetchKPIs: async () => {
    return apiFetch<SubscriptionKPIData>(ADMIN_SUBSCRIPTIONS_API.kpis, { method: 'GET', dataSchema: subscriptionKpiDataSchema });
  },
  upgradePlan: async (planId: string, idempotencyKey: string) => {
          return apiFetch<null>(ADMIN_SUBSCRIPTIONS_API.upgradePlan, { method: 'POST', body: JSON.stringify({ planId }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });
      },
  toggleAutoRenew: async (idempotencyKey: string) => {
          return apiFetch<null>(ADMIN_SUBSCRIPTIONS_API.toggleAutoRenew, { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });
      },
  setDefaultPaymentMethod: async (id: string, idempotencyKey: string) => {
          return apiFetch<null>(ADMIN_SUBSCRIPTIONS_API.setDefaultPaymentMethod, { method: 'POST', body: JSON.stringify({ id }), dataSchema: z.null(),
              headers: { 'Idempotency-Key': idempotencyKey }
        });
      },
  removePaymentMethod: async (id: string, idempotencyKey: string) => {
          return apiFetch<null>(ADMIN_SUBSCRIPTIONS_API.removePaymentMethod, { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() });
      },
};
