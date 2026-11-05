"use client";
// RESPONSIBILITY: Custom hook encapsulating all business logic, state, and API interactions for the Plans module.
// DATA FLOW: Centralized store/hook logic mapping API mutations and query state to UI props.

import { normalizeAdminBillingPlansCatalogUrlPage } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogUrlPage';
import { ADMIN_PLANS_QUERY_KEYS } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/constants/admin_billing_plans_catalog.query_keys';
import { useAdminPlansStore } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogStore';
import { buildAdminPlansQueryString } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogUrlState';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogToastStore';
import { useAdminPlansMutations } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogMutations';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminPlansApi } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/api/admin_billing_plans_catalog_api';
import type { Plan, PlansContextType } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes';
import { EMPTY_PLAN_FORM, PLANS_ITEMS_PER_PAGE, TIERS } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/constants/admin_billing_plans_catalog.constants';
import type { PlanFormValues } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogConfirm';
import { useQuery } from '@tanstack/react-query';
import { adminPlansMajorToMinor, adminPlansMinorToMajor } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogCurrencyUnits';
/** @description useAdminPlansLogic: Custom hook encapsulating all business logic, state, and API interactions for the Plans module. @dependencies Consumes AdminPlansQueryKeys, useAdminPlansStore, AdminPlansUrlState, useAdminNavigationLayoutToastStore, useAdminPlansMutations, AdminPlansApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminPlansLogic(): PlansContextType {
  const { confirm } = useAdminNavigationLayoutConfirm();
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const requestedTier = searchParams.get('tier') || 'All';
  const tierFilter = requestedTier === 'All' || (TIERS as readonly string[]).includes(requestedTier) ? requestedTier : 'All';
  const currentPage = normalizeAdminBillingPlansCatalogUrlPage(searchParams.get('page'));

  // Merge pending local updates until Next.js acknowledges them; history changes reset the draft.
  const physicalUrl = searchParams.toString();
  const observedUrlRef = useRef(physicalUrl);
  const pendingUrlsRef = useRef<string[]>([]);
  const optimisticUrlRef = useRef<string | null>(null);
  useEffect(() => {
    if (observedUrlRef.current === physicalUrl) return;
    observedUrlRef.current = physicalUrl;
    const index = pendingUrlsRef.current.indexOf(physicalUrl);
    if (index !== -1) {
      pendingUrlsRef.current.splice(0, index + 1);
      if (optimisticUrlRef.current === physicalUrl) optimisticUrlRef.current = null;
    } else {
      pendingUrlsRef.current = [];
      optimisticUrlRef.current = null;
    }
  }, [physicalUrl]);
  const updateUrl = useCallback((update: Parameters<typeof buildAdminPlansQueryString>[1]) => {
    const base = optimisticUrlRef.current ?? physicalUrl;
    const next = buildAdminPlansQueryString(new URLSearchParams(base), update);
    const query = next.startsWith('?') ? next.slice(1) : next;
    if (query === base) return;
    optimisticUrlRef.current = query;
    pendingUrlsRef.current.push(query);
    router.push(next, { scroll: false });
  }, [router, physicalUrl]);

  const setSearch = useCallback((val: string) => updateUrl({ search: val || null, page: 1 }), [updateUrl]);
  const setTierFilter = useCallback((val: string) => updateUrl({ tier: val === 'All' ? null : val, page: 1 }), [updateUrl]);
  const setCurrentPage = useCallback((page: number) => updateUrl({ page: normalizeAdminBillingPlansCatalogUrlPage(page) }), [updateUrl]);

  const { showModal, setShowModal, editId, setEditId, form, setForm } = useAdminPlansStore();
  const { showToast } = useAdminNavigationLayoutToastStore();

  const plansQuery = useQuery({
    queryKey: ADMIN_PLANS_QUERY_KEYS.key('list', { search, tier: tierFilter, page: currentPage, limit: PLANS_ITEMS_PER_PAGE }),
    queryFn: () => AdminPlansApi.fetchAllPlans({ search, tier: tierFilter === 'All' ? undefined : tierFilter, page: currentPage, limit: PLANS_ITEMS_PER_PAGE }),
  });

  const fetchedPlans = plansQuery.data?.data ?? [];
  const totalItems = plansQuery.data?.meta?.total ?? fetchedPlans.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PLANS_ITEMS_PER_PAGE));
  // Repair obsolete deep links after a successful server result, never while loading/error.
  useEffect(() => {
    if (plansQuery.status === 'success' && currentPage > totalPages) setCurrentPage(totalPages);
  }, [plansQuery.status, currentPage, totalPages, setCurrentPage]);
  const openAdd = useCallback(() => {
    setEditId(null);
    setForm(EMPTY_PLAN_FORM);
    setShowModal(true);
  }, []);

  const openEdit = useCallback((p: Plan) => {
    setEditId(p.id);
    setForm({
      name: p.name,
      tier: p.tier,
      price1Month: String(adminPlansMinorToMajor(p.price1Month)),
      price3Month: String(adminPlansMinorToMajor(p.price3Month)),
      price6Month: String(adminPlansMinorToMajor(p.price6Month)),
      price12Month: String(adminPlansMinorToMajor(p.price12Month)),
      priceCustom: String(adminPlansMinorToMajor(p.priceCustom ?? 0)),
      features: p.features.join('\n'),
    });
    setShowModal(true);
  }, []);

  const { createMutation, updateMutation, deleteMutation, getIntentKey, clearIntentKey } = useAdminPlansMutations();
  const actionInFlightRef = useRef(false);
  const runSingleFlight = useCallback(async (action: () => Promise<void>) => {
    if (actionInFlightRef.current) return;
    actionInFlightRef.current = true;
    try { await action(); } finally { actionInFlightRef.current = false; }
  }, []);

  const savePlan = useCallback(async (data: PlanFormValues, onValidationError?: (error: unknown) => void) => runSingleFlight(async () => {
    const payload: Partial<Plan> & { priceCustom?: number } = {
      name: data.name,
      tier: data.tier,
      price1Month: adminPlansMajorToMinor(Number(data.price1Month)),
      price3Month: adminPlansMajorToMinor(Number(data.price3Month)),
      price6Month: adminPlansMajorToMinor(Number(data.price6Month)),
      price12Month: adminPlansMajorToMinor(Number(data.price12Month)),
      priceCustom: adminPlansMajorToMinor(Number(data.priceCustom)),
      ...(editId ? {} : { isActive: true }),
      features: data.features.split('\n').map((s: string) => s.trim()).filter(Boolean),
    };

    if (editId) {
      const intentId = `update-plan:${editId}`;
      try { await updateMutation.mutateAsync({ id: editId, payload, idempotencyKey: getIntentKey(intentId, JSON.stringify(payload)) }); } catch (error) { onValidationError?.(error); }
    } else {
      try { await createMutation.mutateAsync({ payload, idempotencyKey: getIntentKey('create-plan', JSON.stringify(payload)) }); } catch (error) { onValidationError?.(error); }
    }
  }), [editId, createMutation, getIntentKey, updateMutation, runSingleFlight]);

  const deletePlan = useCallback(async (id: string) => runSingleFlight(async () => {
    const intentId = `delete-plan:${id}`;
    const isConfirmed = await confirm({ title: t('plans.AdminPlansConfirm.deleteTitle'), message: t('plans.AdminPlansConfirm.deleteMessage'), confirmText: t('plans.AdminPlansConfirm.deleteConfirm'), type: 'danger' });
    if (!isConfirmed) { clearIntentKey(intentId); return; }
    try { await deleteMutation.mutateAsync({ id, idempotencyKey: getIntentKey(intentId) }); } catch { /* Mutation onError owns the translated failure notification. */ }
  }), [confirm, clearIntentKey, deleteMutation, getIntentKey, t, runSingleFlight]);

  const saving = createMutation.isPending || updateMutation.isPending;
  const deletingPlanId = deleteMutation.isPending ? deleteMutation.variables?.id ?? null : null;
  const loadPlans = useCallback(async () => {
    await plansQuery.refetch();
  }, [plansQuery]);

  return {
    plans: fetchedPlans, status: plansQuery.status, saving, toast: null, totalItems, totalPages,
    search, setSearch, tierFilter, setTierFilter, currentPage, setCurrentPage, deletingPlanId,
    showModal, setShowModal, editId, form, setForm,
    showToast, loadPlans,
    openAdd, openEdit, savePlan, clearIntentKey, deletePlan,
  };
}
