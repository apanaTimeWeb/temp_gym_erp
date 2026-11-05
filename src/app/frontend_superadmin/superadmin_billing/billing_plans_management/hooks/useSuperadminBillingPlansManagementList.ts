'use client';
import { useRef } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations as useFeedbackTranslations } from 'next-intl';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { useUrlState } from '@/hooks/useUrlState';

import { plansApi } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/api/superadmin_billing_plans_management.api';
import { SUPERADMIN_BILLING_PLANS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/api/superadmin_billing_plans_management.query_keys';
import { useSuperadminBillingPlansManagementSearchDebounce } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementSearchDebounce';
import { useSuperadminBillingPlansManagementStore } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/state/useSuperadminBillingPlansManagementStore';
import { resolveSuperadminBillingPlansManagementFeedback } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/utils/SuperadminBillingPlansManagementFeedback';
import { createSuperadminBillingPlansFormApiError } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/utils/SuperadminBillingPlansManagementFormApiErrors';

import type { SuperadminPlanListMutationInput } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management_list_mutation.types';
import type { SuperadminBillingPlansListDestructiveActionTarget } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management_ui.types';


// DATA FLOW: Plans API → TanStack Query → Plans list view; mutations invalidate the authoritative list.
// RESPONSIBILITY: Owns Superadmin Plans list server queries, mutation orchestration, cache invalidation and destructive confirmation.


/**
 * Purpose: Owns the Plans list server-state lifecycle and critical archive/delete flow.
 * Inputs: none; the hook reads module-scoped UI state and the Plans API.
 * Output: list data, query state, modal opener, mutations, and the guarded destructive action.
 * Side effects: TanStack Query invalidation and user feedback toasts after mutations.
 * Invariant: backend plan records remain TanStack Query state; Zustand owns UI-only modal state.
 */
/**
 * @description Manages plans state, queries, and UI interactions for useSuperadminBillingPlansManagementList.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBillingPlansManagementList → consuming feature component.
/**
 * @description Coordinates the use Superadmin plans list concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminBillingPlansManagementList() {
 const feedback = useFeedbackTranslations('superadmin_billing_plans');

  const t = useTranslations('superadmin_billing_plans');
  const openCreateModal = useSuperadminBillingPlansManagementStore((state) => state.openCreateModal);
  const openEditModal = useSuperadminBillingPlansManagementStore((state) => state.openEditModal);
  const queryClient = useQueryClient();
  const { getParam, setParam } = useUrlState();
  const committedSearch = getParam('search', '');
  const { search, setSearch } = useSuperadminBillingPlansManagementSearchDebounce(committedSearch, setParam);
  const status = getParam('status', 'ALL');
  const sortBy = getParam('sortBy', 'name');
  const order = getParam('order', 'asc') === 'desc' ? 'desc' : 'asc';
  const queryParams = { search: committedSearch, status, sortBy, order };
  const { confirm } = useConfirm();
  const idempotencyKeysRef = useRef(new Map<string, string>());

  const plansQuery = useQuery({
    queryKey: SUPERADMIN_BILLING_PLANS_QUERY_KEYS.list(queryParams),
    queryFn: async () => {
      const response = await plansApi.fetchPlans(queryParams);
      if (!response.success) throw createSuperadminBillingPlansFormApiError(response);
      return response;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, idempotencyKey }: SuperadminPlanListMutationInput) => {
      const response = await plansApi.deletePlan(id, idempotencyKey);
      if (!response.success) throw createSuperadminBillingPlansFormApiError(response);
      return response;
    },
    onSuccess: (response, variables) => {
      toast.success(response.message, { id: `superadmin-plan-delete-success-${variables.id}` });
      idempotencyKeysRef.current.delete(`delete:${variables.id}`);
      idempotencyKeysRef.current.delete(`archive:${variables.id}`);
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_BILLING_PLANS_QUERY_KEYS.all });
    },
    onError: (error: unknown, variables) => {
      toast.error(resolveSuperadminBillingPlansManagementFeedback(error, feedback('errors.unexpected')), { id: `superadmin-plan-delete-error-${variables.id}` });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: async ({ id, idempotencyKey }: SuperadminPlanListMutationInput) => {
      const response = await plansApi.archivePlan(id, idempotencyKey);
      if (!response.success) throw createSuperadminBillingPlansFormApiError(response);
      return response;
    },
    onSuccess: (response, variables) => {
      toast.success(response.message, { id: `superadmin-plan-archive-success-${variables.id}` });
      idempotencyKeysRef.current.delete(`archive:${variables.id}`);
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_BILLING_PLANS_QUERY_KEYS.all });
    },
    onError: (error: unknown, variables) => {
      toast.error(resolveSuperadminBillingPlansManagementFeedback(error, feedback('errors.unexpected')), { id: `superadmin-plan-archive-error-${variables.id}` });
    },
  });

  const confirmPlanDestructiveAction = async (plan: SuperadminBillingPlansListDestructiveActionTarget) => {
    const hasActiveTenants = (plan.activeTenants ?? 0) > 0;
    const confirmed = await confirm(
      hasActiveTenants
        ? {
            title: t('ui.cannot_delete_active_plan_title'),
            message: t('ui.delete_active_plan_message', { name: plan.name, count: plan.activeTenants ?? 0 }),
            type: 'warning',
            confirmText: t('ui.archive_plan_confirm_button'),
          }
        : {
            title: t('ui.delete_plan_confirm_title'),
            message: t('ui.delete_plan_confirm_message', { name: plan.name }),
            type: 'danger',
            confirmText: t('ui.delete_plan_confirm_button'),
          },
    );
    const keyName = `${hasActiveTenants ? 'archive' : 'delete'}:${plan.id}`;
    if (!confirmed) { idempotencyKeysRef.current.delete(keyName); return; }
    idempotencyKeysRef.current.set(keyName, idempotencyKeysRef.current.get(keyName) ?? crypto.randomUUID());
    const idempotencyKey = idempotencyKeysRef.current.get(keyName) as string;
    if (hasActiveTenants) {
      archiveMutation.mutate({ id: plan.id, idempotencyKey });
      return;
    }
    deleteMutation.mutate({ id: plan.id, idempotencyKey });
  };

  return {
    plans: plansQuery.data?.data ?? [],
    search, status, sortBy, order,
    setSearch,
    setStatus: (value: string) => setParam('status', value),
    setSortBy: (value: string) => setParam('sortBy', value),
    setOrder: (value: string) => setParam('order', value),
    refetch: plansQuery.refetch,
    isPending: plansQuery.isPending,
    isError: plansQuery.isError,
    openCreateModal,
    openEditModal,
    deleteMutation,
    archiveMutation,
    confirmPlanDestructiveAction,
  };
}
