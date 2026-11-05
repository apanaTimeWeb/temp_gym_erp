'use client';

// DATA FLOW: Plan UI → module-owned mutation hooks → centralized API → TanStack Query reconciliation.


import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { plansApi } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/api/superadmin_billing_plans_management.api';
import { SUPERADMIN_BILLING_PLANS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/api/superadmin_billing_plans_management.query_keys';
import { createSuperadminBillingPlansFormApiError } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/utils/SuperadminBillingPlansManagementFormApiErrors';

import type { CreatePlanPayload, UpdatePlanPayload } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management.types';

/** Owns mutation feedback and guarantees idempotency keys survive retries but not abandoned intents. */
export function useSuperadminBillingPlansManagementPlanMutations() {
  const t = useTranslations('superadmin_billing_plans');
  const queryClient = useQueryClient();
  const createKeyRef = useRef<{ fingerprint: string; key: string } | null>(null);
  const updateKeysRef = useRef(new Map<string, { fingerprint: string; key: string }>());
  const reconcile = () => queryClient.invalidateQueries({ queryKey: SUPERADMIN_BILLING_PLANS_QUERY_KEYS.all });

  const create = useMutation({
    mutationFn: async ({ payload, idempotencyKey }: { payload: CreatePlanPayload; idempotencyKey: string }) => {
      const response = await plansApi.createPlan(payload, idempotencyKey);
      if (!response.success || !response.data) throw createSuperadminBillingPlansFormApiError(response);
      return response;
    },
    onSuccess: async (response) => {
      await reconcile();
      createKeyRef.current = null;
      toast.success(response.message, { id: 'superadmin-plan-create-success' });
    },
    onError: () => toast.error(t('ui.plan_create_error_retry_8a3d2c1e'), { id: 'superadmin-plan-create-error' }),
  });

  const update = useMutation({
    mutationFn: async ({ id, payload, idempotencyKey }: { id: string; payload: UpdatePlanPayload; idempotencyKey: string }) => {
      const response = await plansApi.updatePlan(id, payload, idempotencyKey);
      if (!response.success || !response.data) throw createSuperadminBillingPlansFormApiError(response);
      return response;
    },
    onSuccess: async (response, variables) => {
      await reconcile();
      updateKeysRef.current.delete(variables.id);
      toast.success(response.message, { id: `superadmin-plan-update-success-${variables.id}` });
    },
    onError: (_error, variables) => toast.error(t('ui.plan_update_error_retry_6f1e4c2b'), { id: `superadmin-plan-update-error-${variables.id}` }),
  });

  const createPlan = (payload: CreatePlanPayload) => {
    const fingerprint = JSON.stringify(payload);
    if (!createKeyRef.current || createKeyRef.current.fingerprint !== fingerprint) createKeyRef.current = { fingerprint, key: crypto.randomUUID() };
    return create.mutateAsync({ payload, idempotencyKey: createKeyRef.current.key });
  };
  const updatePlan = (input: { id: string; payload: UpdatePlanPayload }) => {
    const fingerprint = JSON.stringify(input.payload);
    const previous = updateKeysRef.current.get(input.id);
    const intent = !previous || previous.fingerprint !== fingerprint ? { fingerprint, key: crypto.randomUUID() } : previous;
    updateKeysRef.current.set(input.id, intent);
    return update.mutateAsync({ ...input, idempotencyKey: intent.key });
  };
  const resetCreateIntent = () => { if (!create.isPending) createKeyRef.current = null; };
  const resetUpdateIntent = (planId: string) => { if (!update.isPending) updateKeysRef.current.delete(planId); };
  return { createPlan, isCreating: create.isPending, updatePlan, isUpdating: update.isPending, resetCreateIntent, resetUpdateIntent };
}
