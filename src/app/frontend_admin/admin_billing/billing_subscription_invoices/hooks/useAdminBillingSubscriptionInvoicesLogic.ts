"use client";
// RESPONSIBILITY: Business logic hook for Subscriptions — queries and mutations.
// DATA FLOW: feature API/schema → hook/context → useAdminSubscriptionsLogic consumers.

import { useTranslations } from 'next-intl';
import { adminBillingSubscriptionInvoicesAutoRenewIntent } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/utils/AdminBillingSubscriptionInvoicesAutoRenewIntent';
import { useCallback, useEffect } from 'react';
import { normalizeAdminBillingSubscriptionInvoicesUrlPage } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/utils/AdminBillingSubscriptionInvoicesUrlPage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/state/useAdminBillingSubscriptionInvoicesStore';
import { useAdminSubscriptionsQueries } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesQueries';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesConfirm';
import { ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/constants/AdminBillingSubscriptionInvoicesConstants';
import { useAdminSubscriptionsMutations } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesMutations';
import { useAdminBillingSubscriptionInvoicesRunConfirmed } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesRunConfirmed';

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
    subscription, plans, invoices, invoiceTotal, invoiceTotalPages,
    paymentMethods, kpis, status, isPending,
    subscriptionError, retrySubscription, plansStatus, plansError, retryPlans,
    invoicesStatus, invoicesError, retryInvoices, paymentMethodsStatus, paymentMethodsError, retryPaymentMethods,
    kpisStatus, kpisError, retryKpis,
  } = useAdminSubscriptionsQueries(currentInvoicePage);

  const { upgradeMutation, autoRenewMutation, setDefaultPMMutation, removePMMutation, getIntentKey, clearIntentKey } = useAdminSubscriptionsMutations();
  const runConfirmedMutation = useAdminBillingSubscriptionInvoicesRunConfirmed(confirm, clearIntentKey, getIntentKey);

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
    status, isPending,
    subscriptionError, retrySubscription, plansStatus, plansError, retryPlans,
    invoicesStatus, invoicesError, retryInvoices, paymentMethodsStatus, paymentMethodsError, retryPaymentMethods,
    kpisStatus, kpisError, retryKpis,
    handleUpgrade, upgrading: upgradeMutation.isPending,
    toggleAutoRenew: () => {
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
