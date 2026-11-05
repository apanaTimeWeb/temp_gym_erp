"use client";
// RESPONSIBILITY: Owns feature-local query, mutation, or interaction orchestration for subscriptions_management; it does not render the page UI.
// DATA FLOW: module-owned API contracts -> TanStack Query -> subscriptions view/mutation orchestration.

import { ADMIN_SUBSCRIPTIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/constants/AdminBillingSubscriptionInvoicesQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { AdminSubscriptionsApi } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/api/admin_billing_subscription_invoices_api';
import { ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/constants/AdminBillingSubscriptionInvoicesConstants';

const ADMIN_SUBSCRIPTIONS_LEAF_SCOPE: 'invoices' | 'plans' | 'payment_methods' | 'overview' = 'invoices';
/** @description useAdminSubscriptionsQueries: Owns the useAdminSubscriptionsQueries responsibility for the admin_subscriptions feature. @dependencies Consumes AdminSubscriptionsQueryKeys, AdminSubscriptionsApi, AdminSubscriptionsConstants, useAdminSubscriptionsStore. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSubscriptionsQueries(currentInvoicePage: number) {
  const subscriptionQuery = useQuery({
    queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('subscription'),
    queryFn: () => AdminSubscriptionsApi.fetchSubscription().then((response) => response.data),
    enabled: ['overview', 'plans'].includes(ADMIN_SUBSCRIPTIONS_LEAF_SCOPE),
    staleTime: 1000 * 60 * 5,
  });
  const plansQuery = useQuery({
    queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('plans'),
    queryFn: () => AdminSubscriptionsApi.fetchPlans().then((response) => response.data ?? []),
    enabled: ADMIN_SUBSCRIPTIONS_LEAF_SCOPE === 'plans',
    staleTime: 1000 * 60 * 10,
  });
  const invoicesQuery = useQuery({
    queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('invoices', { page: currentInvoicePage, limit: ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE }),
    queryFn: () => AdminSubscriptionsApi.fetchInvoices({ page: currentInvoicePage, limit: ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE }),
    enabled: ADMIN_SUBSCRIPTIONS_LEAF_SCOPE === 'invoices',
    staleTime: 1000 * 60 * 5,
  });
  const paymentMethodsQuery = useQuery({
    queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('payment-methods'),
    queryFn: () => AdminSubscriptionsApi.fetchPaymentMethods().then((response) => response.data ?? []),
    enabled: ADMIN_SUBSCRIPTIONS_LEAF_SCOPE === 'payment_methods',
    staleTime: 1000 * 60 * 5,
  });
  const kpisQuery = useQuery({
    queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('kpis'),
    queryFn: () => AdminSubscriptionsApi.fetchKPIs().then((response) => response.data),
    enabled: ADMIN_SUBSCRIPTIONS_LEAF_SCOPE === 'overview',
    staleTime: 1000 * 60 * 5,
  });
  const activeQuery = ADMIN_SUBSCRIPTIONS_LEAF_SCOPE === 'overview' || ADMIN_SUBSCRIPTIONS_LEAF_SCOPE === 'plans'
    ? subscriptionQuery
    : ADMIN_SUBSCRIPTIONS_LEAF_SCOPE === 'invoices'
      ? invoicesQuery
      : paymentMethodsQuery;
  const invoices = invoicesQuery.data?.data ?? [];
  const invoiceTotal = invoicesQuery.data?.meta?.total ?? invoices.length;
  const invoiceTotalPages = invoicesQuery.data?.meta?.totalPages ?? Math.max(1, Math.ceil(invoiceTotal / ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE));
  return {
    subscription: subscriptionQuery.data,
    plans: plansQuery.data ?? [],
    invoices,
    invoiceTotal,
    invoiceTotalPages,
    paymentMethods: paymentMethodsQuery.data ?? [],
    kpis: kpisQuery.data,
    subscriptionStatus: subscriptionQuery.status,
    subscriptionError: activeQuery.error,
    retrySubscription: activeQuery.refetch,
    plansStatus: plansQuery.status,
    plansError: plansQuery.error,
    retryPlans: plansQuery.refetch,
    invoicesStatus: invoicesQuery.status,
    invoicesError: invoicesQuery.error,
    retryInvoices: invoicesQuery.refetch,
    paymentMethodsStatus: paymentMethodsQuery.status,
    paymentMethodsError: paymentMethodsQuery.error,
    retryPaymentMethods: paymentMethodsQuery.refetch,
    kpisStatus: kpisQuery.status,
    kpisError: kpisQuery.error,
    retryKpis: kpisQuery.refetch,
    status: activeQuery.status,
    isPending: activeQuery.isPending,
  };
}
