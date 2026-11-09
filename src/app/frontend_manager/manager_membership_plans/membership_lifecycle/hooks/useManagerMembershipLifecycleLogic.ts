"use client";
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef } from "react";

import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { useManagerInfrastructureDebounce } from "@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce";
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/constants/manager_membership_lifecycle.constants';
import { MANAGER_MEMBERSHIP_LIFECYCLE_TAB_IDS } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/constants/manager_membership_lifecycle_tab.constants';
import { resolveManagerMembershipLifecycleView } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/utils/ManagerMembershipLifecycleResolveView';
import { useManagerMembershipLifecycleMutations } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleMutations';
import { useFetchPlans } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleQueries';
import { useManagerMembershipLifecycleUiStore } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/state/useManagerMembershipLifecycleUiStore';
import type { ManagerMembershipLifecycleTabId } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle.types';
import type { Plan, ManagerMembershipLifecycleViewModel } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle.types';



/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates plans feature state and its documented UI/API boundary through useManagerMembershipLifecycleLogic.
 * @dependencies Uses ManagerIdempotency, ManagerDebounce, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast, useManagerMembershipLifecycleQueries.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembershipLifecycleLogic owns the plans feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembershipLifecycleLogic(): ManagerMembershipLifecycleViewModel {
  const t = useTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const ui = useManagerMembershipLifecycleUiStore();
  const search = ui.search || searchParams.get("search") || ""; const tierFilter = searchParams.get("tier") || MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ALL; const statusFilter = searchParams.get("status") || MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ALL; const activeTabParam = searchParams.get('view') ?? searchParams.get('tab'); const activeTab: ManagerMembershipLifecycleTabId = resolveManagerMembershipLifecycleView(activeTabParam); const rawPage = Number(searchParams.get("page") || "1"); const currentPage = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1; const debouncedSearch = useManagerInfrastructureDebounce(search, 300);
  const updateUrl = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isDefault = !value || (key === "tier" && value === MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ALL) || (key === "status" && value === MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ALL) || ((key === "view" || key === "tab") && value === MANAGER_MEMBERSHIP_LIFECYCLE_TAB_IDS[0]) || (key === "page" && value === "1");
    if (key === 'view') params.delete('tab');
    if (key === 'tab') params.delete('view');
    if (isDefault) params.delete(key); else params.set(key, value);
    if (key !== "page") params.delete("page");
    router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);
  const queryParams = useMemo(() => ({ search: debouncedSearch, tier: tierFilter, status: statusFilter, page: String(currentPage), limit: '10' }), [currentPage, debouncedSearch, statusFilter, tierFilter]);
  const plansQuery = useFetchPlans(queryParams); const mutations = useManagerMembershipLifecycleMutations();
  const intentKeysRef = useRef(new Map<string, string>()); const plans = plansQuery.data?.plans ?? []; const { confirm } = useConfirm();
  const openRequestModal = useCallback((plan: Plan) => ui.setRequestModalPlan(plan), [ui.setRequestModalPlan]);
  const closeRequestModal = useCallback(() => ui.setRequestModalPlan(null), [ui.setRequestModalPlan]);
  const submitChangeRequest = useCallback(async (note: string) => {
    const plan = ui.requestModalPlan; if (!plan) return;
    try { const idempotencyKey = intentKeysRef.current.get(`request:${plan.id}`) ?? ManagerInfrastructureIdempotency(); intentKeysRef.current.set(`request:${plan.id}`, idempotencyKey); const response = await mutations.createChangeRequest.mutateAsync({ payload: { planId: plan.id, note }, idempotencyKey }); intentKeysRef.current.delete(`request:${plan.id}`); ManagerInfrastructureShowSuccessToast(response.message, "manager-plans-context-success"); ui.setRequestModalPlan(null); }
    catch (error: unknown) { ManagerInfrastructureShowErrorToast(error, "manager-plans-context-error"); }
  }, [mutations.createChangeRequest, ui.requestModalPlan, ui.setRequestModalPlan]);
  const openCreatePlan = useCallback(() => ui.openCrudModal(null), [ui.openCrudModal]);
  const openEditPlan = useCallback((plan: Plan) => ui.openCrudModal(plan), [ui.openCrudModal]);
  const closeCrudPlan = useCallback(() => ui.closeCrudModal(), [ui.closeCrudModal]);
  const deletePlan = useCallback(async (plan: Plan) => {
    const confirmed = await confirm({ title: t('CONFIRM_DELETE_PLAN_TITLE'), message: t('CONFIRM_DELETE_PLAN_MESSAGE'), type: 'danger', confirmText: t('CONFIRM_DELETE_PLAN') });
    if (!confirmed) return;
    try {
      const intentKey = intentKeysRef.current.get(`delete:${plan.id}`) ?? ManagerInfrastructureIdempotency();
      intentKeysRef.current.set(`delete:${plan.id}`, intentKey);
      await mutations.deletePlan.mutateAsync({ id: plan.id, idempotencyKey: intentKey });
      intentKeysRef.current.delete(`delete:${plan.id}`);
      ManagerInfrastructureShowSuccessToast(t('PLAN_DELETED'), 'manager-plans-delete-success');
    } catch (error: unknown) {
      ManagerInfrastructureShowErrorToast(error, 'manager-plans-delete-error');
    }
  }, [confirm, mutations.deletePlan, t]);
  const errorMessage = plansQuery.error ? ManagerInfrastructureGetErrorMessage(plansQuery.error, t('TEXT_GENERIC_ERROR')) : '';
  return { plans, isPending: plansQuery.isPending, isError: plansQuery.isError, errorMessage, saving: mutations.createChangeRequest.isPending || mutations.createPlan.isPending || mutations.updatePlan.isPending || mutations.deletePlan.isPending, search, setSearch: (value) => { ui.setSearch(value); updateUrl("search", value); }, currentPage, setCurrentPage: (value) => updateUrl("page", String(value)), tierFilter, setTierFilter: (value) => updateUrl("tier", value), statusFilter, setStatusFilter: (value) => updateUrl("status", value), filteredPlans: plans, requestModalPlan: ui.requestModalPlan, openRequestModal, closeRequestModal, submitChangeRequest, activeTab, setActiveTab: (value) => updateUrl("view", value), crudModalPlan: ui.crudModalPlan, crudModalOpen: ui.crudModalOpen, openCreatePlan, openEditPlan, closeCrudPlan, deletePlan };
}
