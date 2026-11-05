"use client";
// RESPONSIBILITY: Owns plan create, update, and delete mutations for Admin Plans.
// DATA FLOW: Plan form/action → mutation hook → AdminPlansApi → TanStack Query invalidation → plan UI and backend feedback.

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_PLANS_QUERY_KEYS } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/constants/admin_billing_plans_catalog.query_keys';
import { AdminPlansApi } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/api/admin_billing_plans_catalog_api';
import { useAdminPlansStore } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogStore';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogToastStore';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogIdempotencyIntentStore';
import type { Plan } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes';
/** @description useAdminPlansMutations: Owns plan create, update, and delete mutations for Admin Plans. @dependencies Consumes AdminPlansQueryKeys, AdminPlansApi, useAdminPlansStore, useAdminNavigationLayoutToastStore, AdminNavigationLayoutBackendMessage, AdminNavigationLayoutIdempotencyIntentStore. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminPlansMutations() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const store = useAdminPlansStore();
  const { showToast } = useAdminNavigationLayoutToastStore();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  // A changed normalized form is a new request, not a retry of the previous write.
  const payloadSignaturesRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string, payloadSignature?: string) => {
    if (payloadSignature !== undefined) {
      const last = payloadSignaturesRef.current.get(intentId);
      if (last !== undefined && last !== payloadSignature) clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId);
      payloadSignaturesRef.current.set(intentId, payloadSignature);
    }
    return getAdminIdempotencyKey(idempotencyKeysRef.current, intentId);
  }, []);
  const clearIntentKey = useCallback((intentId: string) => {
    clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId);
    payloadSignaturesRef.current.delete(intentId);
  }, []);
  const invalidate = () => void queryClient.invalidateQueries({ queryKey: ADMIN_PLANS_QUERY_KEYS.key('list') });
  const createMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: Partial<Plan>; idempotencyKey: string }) => AdminPlansApi.createPlan(payload, idempotencyKey),
    onSuccess: (res) => { showToast(res.message, 'success', 'plans-create-success'); clearIntentKey('create-plan'); store.setShowModal(false); invalidate(); },
    onError: () => showToast(t('plans.AdminRepair.requestFailed'), 'error', 'plans-create-error'),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Plan>; idempotencyKey: string }) => AdminPlansApi.updatePlan(id, payload, idempotencyKey),
    onSuccess: (res, variables) => { showToast(res.message, 'success', 'plans-update-success'); clearIntentKey(`update-plan:${variables.id}`); store.setShowModal(false); invalidate(); },
    onError: () => showToast(t('plans.AdminRepair.requestFailed'), 'error', 'plans-update-error'),
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminPlansApi.deletePlan(id, idempotencyKey),
    onSuccess: (res, variables) => { showToast(res.message, 'success', 'plans-delete-success'); clearIntentKey(`delete-plan:${variables.id}`); invalidate(); },
    onError: () => showToast(t('plans.AdminRepair.requestFailed'), 'error', 'plans-delete-error'),
  });
  return { createMutation, updateMutation, deleteMutation, getIntentKey, clearIntentKey };
}
