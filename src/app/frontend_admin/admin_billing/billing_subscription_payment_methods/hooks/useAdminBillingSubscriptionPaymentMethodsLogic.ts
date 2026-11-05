"use client";
// RESPONSIBILITY: Business logic hook for Subscriptions — queries and mutations.
// DATA FLOW: feature API/schema → hook/context → useAdminSubscriptionsLogic consumers.

import { useTranslations } from 'next-intl';


import { adminBillingSubscriptionPaymentMethodsAutoRenewIntent } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/utils/AdminBillingSubscriptionPaymentMethodsAutoRenewIntent';
import { useCallback, useRef } from 'react';
import type { AdminConfirmOptions } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/types/AdminBillingSubscriptionPaymentMethodsConfirmTypes';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/state/useAdminBillingSubscriptionPaymentMethodsStore';
import { useAdminSubscriptionsQueries } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsQueries';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsConfirm';
import { ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/constants/AdminBillingSubscriptionPaymentMethodsConstants';
import { useAdminSubscriptionsMutations } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsMutations';
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

  // One financial mutation or confirmation at a time, including while the API promise is unsettled.
  // Keep the retry key on API failure; clear it only for explicit cancellation or API success.
  const actionInFlight = useRef(false);
  const runConfirmedMutation = useCallback(async (
    intentId: string,
    options: AdminConfirmOptions,
    submit: (idempotencyKey: string) => Promise<unknown>,
  ) => {
    if (actionInFlight.current) return;
    actionInFlight.current = true;
    try {
      const accepted = await confirm(options);
      if (!accepted) {
        clearIntentKey(intentId);
        return;
      }
      await submit(getIntentKey(intentId));
    } catch {
      // Existing mutation onError emits localized feedback; retain intent key for an explicit retry.
    } finally {
      actionInFlight.current = false;
    }
  }, [confirm, clearIntentKey, getIntentKey]);

  const handleUpgrade = (planId: string, planName: string) => runConfirmedMutation(
    `upgrade-plan:${planId}`,
    {
      title: t('subscriptions.AdminSubscriptionsConfirm.upgradeTitle', { planName }),
      message: t('subscriptions.AdminSubscriptionsConfirm.upgradeMessage', { planName }),
      confirmText: t('subscriptions.AdminSubscriptionsConfirm.upgradeConfirm'),
      type: 'info',
    },
    (idempotencyKey) => upgradeMutation.mutateAsync({ planId, idempotencyKey }),
  );

  const handleRemovePaymentMethod = (id: string) => {
    // Enforce the existing default-method restriction outside the presentation layer, too.
    if (paymentMethods.some((method) => method.id === id && method.isDefault)) return Promise.resolve();
    return runConfirmedMutation(
      `remove-payment-method:${id}`,
      {
        title: t('subscriptions.AdminSubscriptionsConfirm.removeTitle'),
        message: t('subscriptions.AdminSubscriptionsConfirm.removeMessage'),
        confirmText: t('subscriptions.AdminSubscriptionsConfirm.removeConfirm'),
        type: 'danger',
      },
      (idempotencyKey) => removePMMutation.mutateAsync({ id, idempotencyKey }),
    );
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    if (paymentMethods.some((method) => method.id === id && method.isDefault)) return Promise.resolve();
    return runConfirmedMutation(
      `set-default-payment-method:${id}`,
      {
          title: t('subscriptions.AdminSubscriptionsConfirm.setDefaultTitle'),
        message: t('subscriptions.AdminSubscriptionsConfirm.setDefaultMessage'),
        confirmText: t('subscriptions.AdminSubscriptionsConfirm.setDefaultConfirm'),
        type: 'warning',
      },
      (idempotencyKey) => setDefaultPMMutation.mutateAsync({ id, idempotencyKey }),
    );
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
      // An unknown subscription state cannot safely determine the direction of a toggle.
      if (!subscription || typeof subscription.autoRenew !== 'boolean') return Promise.resolve();
      const intentId = adminBillingSubscriptionPaymentMethodsAutoRenewIntent(subscription.autoRenew);
      const nextState = subscription.autoRenew ? 'off' : 'on';
      return runConfirmedMutation(
        intentId,
        {
          title: t('subscriptions.AdminSubscriptionsConfirm.autoRenewTitle'),
          message: t('subscriptions.AdminSubscriptionsConfirm.autoRenewMessage', { nextState }),
          confirmText: t('subscriptions.AdminSubscriptionsConfirm.autoRenewConfirm'),
          type: 'warning',
        },
        (idempotencyKey) => autoRenewMutation.mutateAsync({ intentId, idempotencyKey }),
      );
    },
    togglingAutoRenew: autoRenewMutation.isPending,
    setDefaultPaymentMethod: handleSetDefaultPaymentMethod,
    settingDefaultPaymentMethod: setDefaultPMMutation.isPending,
    handleRemovePaymentMethod,
    removingPaymentMethod: removePMMutation.isPending,
    showUpgradeConfirm, setShowUpgradeConfirm,
  };
}
