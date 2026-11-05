"use client";
// RESPONSIBILITY: Business logic hook for Subscriptions — queries and mutations.
// DATA FLOW: feature API/schema → hook/context → useAdminSubscriptionsLogic consumers.

import { ADMIN_SUBSCRIPTIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/constants/AdminBillingSubscriptionPlansQueryKeys';
import { useTranslations } from 'next-intl';


import { adminBillingSubscriptionPlansAutoRenewIntent } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/utils/AdminBillingSubscriptionPlansAutoRenewIntent';
import { useCallback, useRef } from 'react';
import type { AdminConfirmOptions } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/types/AdminBillingSubscriptionPlansConfirmTypes';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/state/useAdminBillingSubscriptionPlansStore';
import { useAdminSubscriptionsQueries } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/hooks/useAdminBillingSubscriptionPlansQueries';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/hooks/useAdminBillingSubscriptionPlansConfirm';
import { ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/constants/AdminBillingSubscriptionPlansConstants';
import { useAdminSubscriptionsMutations } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/hooks/useAdminBillingSubscriptionPlansMutations';
/** @description useAdminSubscriptionsLogic: Business logic hook for Subscriptions — queries and mutations. @dependencies Consumes AdminSubscriptionsQueryKeys, useAdminSubscriptionsStore, useAdminSubscriptionsQueries, useAdminNavigationLayoutConfirm, AdminSubscriptionsConstants, useAdminSubscriptionsMutations. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSubscriptionsLogic() {
  const t = useTranslations();
  const { confirm } = useAdminNavigationLayoutConfirm();
  const { showUpgradeConfirm, setShowUpgradeConfirm, currentInvoicePage, setCurrentInvoicePage } = useAdminSubscriptionsStore();

  const {
    subscription,
    plans,
    invoices,
    invoiceTotal,
    invoiceTotalPages,
    paymentMethods,
    kpis,
    status,
    isPending,
    subscriptionError, retrySubscription, plansStatus, plansError, retryPlans,
    invoicesStatus, invoicesError, retryInvoices, paymentMethodsStatus, paymentMethodsError, retryPaymentMethods,
    kpisStatus, kpisError, retryKpis,
  } = useAdminSubscriptionsQueries();

  const { upgradeMutation, autoRenewMutation, setDefaultPMMutation, removePMMutation, getIntentKey, clearIntentKey } = useAdminSubscriptionsMutations();

  // Single-flight covers the confirmation interval and the actual API request.
  // Only a successful API mutation clears its idempotency key in the mutation hook.
  const actionInFlight = useRef(false);
  const runConfirmedMutation = useCallback(async (
    intentId: string,
    options: AdminConfirmOptions,
    submit: (key: string) => Promise<unknown>,
  ) => {
    if (actionInFlight.current) return;
    actionInFlight.current = true;
    try {
      const accepted = await confirm(options);
      if (!accepted) { clearIntentKey(intentId); return; }
      await submit(getIntentKey(intentId));
    } catch {
      // Mutation onError provides localized feedback; preserve intent identity on error.
    } finally {
      actionInFlight.current = false;
    }
  }, [confirm, clearIntentKey, getIntentKey]);

  const handleUpgrade = (planId: string, planName: string) => {
    // Do not create upgrade requests for a current, unknown or unavailable plan.
    if (!plans.some((plan) => plan.id === planId && !plan.isCurrent && plan.tier !== 'enterprise')) return Promise.resolve();
    return runConfirmedMutation(`upgrade-plan:${planId}`, {
      title: t('subscriptions.AdminSubscriptionsConfirm.upgradeTitle', { planName }),
      message: t('subscriptions.AdminSubscriptionsConfirm.upgradeMessage', { planName }),
      confirmText: t('subscriptions.AdminSubscriptionsConfirm.upgradeConfirm'),
      type: 'info',
    }, (key) => upgradeMutation.mutateAsync({ planId, idempotencyKey: key }));
  };

  const handleRemovePaymentMethod = (id: string) => {
    if (!paymentMethods.some((method) => method.id === id && !method.isDefault)) return Promise.resolve();
    return runConfirmedMutation(`remove-payment-method:${id}`, {
      title: t('subscriptions.AdminSubscriptionsConfirm.removeTitle'),
      message: t('subscriptions.AdminSubscriptionsConfirm.removeMessage'),
      confirmText: t('subscriptions.AdminSubscriptionsConfirm.removeConfirm'),
      type: 'danger',
    }, (key) => removePMMutation.mutateAsync({ id, idempotencyKey: key }));
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    if (!paymentMethods.some((method) => method.id === id && !method.isDefault)) return Promise.resolve();
    return runConfirmedMutation(`set-default-payment-method:${id}`, {
      title: t('subscriptions.AdminSubscriptionsConfirm.setDefaultTitle'),
      message: t('subscriptions.AdminSubscriptionsConfirm.setDefaultMessage'),
      confirmText: t('subscriptions.AdminSubscriptionsConfirm.setDefaultConfirm'),
      type: 'warning',
    }, (key) => setDefaultPMMutation.mutateAsync({ id, idempotencyKey: key }));
  };

  return {
    subscription, plans, invoices, paymentMethods, kpis,
    currentInvoicePage, setCurrentInvoicePage, invoiceTotal, invoiceTotalPages,
    invoiceItemsPerPage: ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE,
    status,
    isPending,
    subscriptionError, retrySubscription, plansStatus, plansError, retryPlans,
    invoicesStatus, invoicesError, retryInvoices, paymentMethodsStatus, paymentMethodsError, retryPaymentMethods,
    kpisStatus, kpisError, retryKpis,
    handleUpgrade, upgrading: upgradeMutation.isPending,
    toggleAutoRenew: () => {
      if (!subscription || typeof subscription.autoRenew !== 'boolean') return Promise.resolve();
      const intentId = adminBillingSubscriptionPlansAutoRenewIntent(subscription.autoRenew);
      const nextState = subscription.autoRenew ? 'off' : 'on';
      return runConfirmedMutation(intentId, {
        title: t('subscriptions.AdminSubscriptionsConfirm.autoRenewTitle'),
        message: t('subscriptions.AdminSubscriptionsConfirm.autoRenewMessage', { nextState }),
        confirmText: t('subscriptions.AdminSubscriptionsConfirm.autoRenewConfirm'),
        type: 'warning',
      }, (key) => autoRenewMutation.mutateAsync({ intentId, idempotencyKey: key }));
    },
    togglingAutoRenew: autoRenewMutation.isPending,
    setDefaultPaymentMethod: handleSetDefaultPaymentMethod,
    settingDefaultPaymentMethod: setDefaultPMMutation.isPending,
    handleRemovePaymentMethod,
    removingPaymentMethod: removePMMutation.isPending,
    showUpgradeConfirm, setShowUpgradeConfirm,
  };
}
