"use client";
// RESPONSIBILITY: Owns all Admin Subscriptions mutations, invalidation, feedback, and idempotency.
// DATA FLOW: Subscription confirmation/action → mutation hook → AdminSubscriptionsApi → TanStack Query invalidation → subscription UI and backend feedback.

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_SUBSCRIPTIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/constants/AdminBillingSubscriptionPaymentMethodsQueryKeys';
import { AdminSubscriptionsApi } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/api/admin_billing_subscription_payment_methods_api';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/state/useAdminBillingSubscriptionPaymentMethodsStore';
import { adminToast } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/components/feedback/AdminBillingSubscriptionPaymentMethodsToastService';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/utils/AdminBillingSubscriptionPaymentMethodsIdempotencyIntentStore';
/** @description useAdminSubscriptionsMutations: Owns all Admin Subscriptions mutations, invalidation, feedback, and idempotency. @dependencies Consumes AdminSubscriptionsQueryKeys, AdminSubscriptionsApi, useAdminSubscriptionsStore, AdminNavigationLayoutToastService, AdminNavigationLayoutBackendMessage, AdminNavigationLayoutIdempotencyIntentStore. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSubscriptionsMutations() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const store = useAdminSubscriptionsStore();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const upgradeMutation = useMutation({
    mutationFn: ({ planId, idempotencyKey }: { planId: string; idempotencyKey: string }) => AdminSubscriptionsApi.upgradePlan(planId, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(`upgrade-plan:${variables.planId}`); adminToast.success(response.message, 'admin-success-22dbbbf6'); store.setShowUpgradeConfirm(null); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('subscription') }); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('kpis') }); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('plans') }); },
    onError: () => adminToast.error(t('subscriptions.AdminRepair.requestFailed'), 'admin-error-adfbfcf78b'),
  });
  const autoRenewMutation = useMutation({
    mutationFn: ({ idempotencyKey }: { intentId: string; idempotencyKey: string }) => AdminSubscriptionsApi.toggleAutoRenew(idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(variables.intentId); adminToast.success(response.message, 'admin-success-8bbeec64'); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('subscription') }); },
    onError: () => adminToast.error(t('subscriptions.AdminRepair.requestFailed'), 'admin-error-1067ba6b06'),
  });
  const setDefaultPMMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminSubscriptionsApi.setDefaultPaymentMethod(id, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(`set-default-payment-method:${variables.id}`); adminToast.success(response.message, 'admin-success-235b8623c8'); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('payment-methods') }); },
    onError: () => adminToast.error(t('subscriptions.AdminRepair.requestFailed'), 'admin-error-638550b7de'),
  });
  const removePMMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminSubscriptionsApi.removePaymentMethod(id, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(`remove-payment-method:${variables.id}`); adminToast.success(response.message, 'admin-success-83e444b113'); void queryClient.invalidateQueries({ queryKey: ADMIN_SUBSCRIPTIONS_QUERY_KEYS.key('payment-methods') }); },
    onError: () => adminToast.error(t('subscriptions.AdminRepair.requestFailed'), 'admin-error-3b8d91063d'),
  });
  return { upgradeMutation, autoRenewMutation, setDefaultPMMutation, removePMMutation, getIntentKey, clearIntentKey };
}
