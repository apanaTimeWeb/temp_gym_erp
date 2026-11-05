"use client";
// RESPONSIBILITY: Business logic hook for Subscriptions — queries and mutations.
// DATA FLOW: feature API/schema → hook/context → useAdminSubscriptionsLogic consumers.

import { useTranslations } from 'next-intl';
import { adminBillingSubscriptionInvoicesAutoRenewIntent } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/utils/AdminBillingSubscriptionInvoicesAutoRenewIntent';


import { useCallback, useEffect, useRef } from 'react';
import type { AdminConfirmOptions } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/types/AdminBillingSubscriptionInvoicesConfirmTypes';
import { normalizeAdminBillingSubscriptionInvoicesUrlPage } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/utils/AdminBillingSubscriptionInvoicesUrlPage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/state/useAdminBillingSubscriptionInvoicesStore';
import { useAdminSubscriptionsQueries } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesQueries';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesConfirm';
import { ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/constants/AdminBillingSubscriptionInvoicesConstants';
import { useAdminSubscriptionsMutations } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesMutations';
/** @description useAdminSubscriptionsLogic: Business logic hook for Subscriptions — queries and mutations. @dependencies Consumes AdminSubscriptionsQueryKeys, useAdminSubscriptionsStore, useAdminSubscriptionsQueries, useAdminNavigationLayoutConfirm, AdminSubscriptionsConstants, useAdminSubscriptionsMutations. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSubscriptionsLogic() {
  const t = useTranslations();
  const { confirm } = useAdminNavigationLayoutConfirm();
  const { showUpgradeConfirm, setShowUpgradeConfirm } = useAdminSubscriptionsStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentInvoicePage = normalizeAdminBillingSubscriptionInvoicesUrlPage(searchParams.get('page'));
  const setCurrentInvoicePage = useCallback((page: number) => {
    const nextPage = normalizeAdminBillingSubscriptionInvoicesUrlPage(page);
    if (nextPage === currentInvoicePage) return;
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage === 1) params.delete('page');
    else params.set('page', String(nextPage));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [currentInvoicePage, pathname, router, searchParams]);

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
  } = useAdminSubscriptionsQueries(currentInvoicePage);

  const { upgradeMutation, autoRenewMutation, setDefaultPMMutation, removePMMutation, getIntentKey, clearIntentKey } = useAdminSubscriptionsMutations();

  // One subscription write or confirmation at a time. The lock lasts until the API resolves.
  // Mutation onSuccess clears the key; API errors keep the same key for explicit retry.
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
      // Mutation onError owns user-visible feedback; keep the same key on retry.
    } finally {
      actionInFlight.current = false;
    }
  }, [confirm, clearIntentKey, getIntentKey]);

  // Recover an out-of-range deep link after invoice metadata loads; do not conceal fetch errors.
  useEffect(() => {
    if (invoicesStatus === 'success' && Number.isSafeInteger(invoiceTotalPages) && invoiceTotalPages > 0 && currentInvoicePage > invoiceTotalPages) {
      setCurrentInvoicePage(invoiceTotalPages);
    }
  }, [invoicesStatus, invoiceTotalPages, currentInvoicePage, setCurrentInvoicePage]);

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
      // An unknown or unloaded subscription cannot determine a safe toggle direction.
      if (!subscription || typeof subscription.autoRenew !== 'boolean') return Promise.resolve();
      const intentId = adminBillingSubscriptionInvoicesAutoRenewIntent(subscription.autoRenew);
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
