"use client";
import { normalizeAdminBillingCouponsManagementUrlPage } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementUrlPage';
// RESPONSIBILITY: Custom hook encapsulating all business logic for the Coupons module.
// DATA FLOW: AdminCouponsMain → useAdminCouponsLogic → AdminCouponsApi

import { COUPON_DATE_RANGE_OPTIONS, COUPON_STATUS, COUPON_STATUS_OPTIONS } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementConstants';
import { ADMIN_COUPONS_QUERY_KEYS } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementQueryKeys';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { adminBillingCouponsManagementWriteIntent } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementWriteIntent';
import { useQuery } from '@tanstack/react-query';
import { AdminCouponsApi } from '@/app/frontend_admin/admin_billing/billing_coupons_management/api/admin_billing_coupons_management_api';
import { useAdminCouponsStore } from '@/app/frontend_admin/admin_billing/billing_coupons_management/state/useAdminBillingCouponsManagementStore';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementUrlQuerySync';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementConfirm';
import { EMPTY_COUPON_FORM, COUPONS_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementConstants';
import type { Coupon, CouponFormValues } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';
import { parseAdminCouponUsageLimit } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementUsageLimit';
import { adminCouponToggleIntent } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementToggleIntent';
import { useAdminCouponsMutations } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementMutations';
import { adminCouponsMajorToMinor, adminCouponsMinorToMajor } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementCurrencyUnits';
import type { CouponWritePayload } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';
/** @description useAdminCouponsLogic: Custom hook encapsulating all business logic for the Coupons module. @dependencies Consumes AdminCouponsQueryKeys, AdminCouponsApi, useAdminCouponsStore, useAdminNavigationLayoutUrlQuerySync, useAdminNavigationLayoutConfirm, AdminCouponsConstants. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminCouponsLogic() {
  const { confirm } = useAdminNavigationLayoutConfirm();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate') || undefined;
  const endDate = searchParams.get('endDate') || undefined;
  const { showModal, setShowModal, editId, setEditId, form, setForm, search, statusFilter, currentPage, setCurrentPage, dateRange, setDateRange } = useAdminCouponsStore();
  // Keep keystrokes instantaneous in the store, but debounce network cache keys/requests.
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timeoutId);
  }, [search]);
  useAdminNavigationLayoutUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: (val) => useAdminCouponsStore.getState().setSearch(val as string) },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => { if (COUPON_STATUS_OPTIONS.some((option) => option.value === val)) useAdminCouponsStore.getState().setStatusFilter(val); } },
    { key: 'dateRange', value: dateRange, defaultValue: 'all_time', setValue: (val) => { if (COUPON_DATE_RANGE_OPTIONS.some((option) => option.value === val)) useAdminCouponsStore.getState().setDateRange(val); } },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(normalizeAdminBillingCouponsManagementUrlPage(value)) },
  ]);

  const couponsQuery = useQuery({
    queryKey: ADMIN_COUPONS_QUERY_KEYS.key('list', debouncedSearch, statusFilter, dateRange, startDate, endDate, currentPage),
    queryFn: () => AdminCouponsApi.fetchCoupons({ page: currentPage, limit: COUPONS_ITEMS_PER_PAGE, search: debouncedSearch || undefined, status: statusFilter !== 'all' ? statusFilter as Coupon['status'] : undefined, dateRange, startDate, endDate }),
    staleTime: 1000 * 60 * 2,
  });

  const kpisQuery = useQuery({
    queryKey: ADMIN_COUPONS_QUERY_KEYS.key('kpis'),
    queryFn: async () => (await AdminCouponsApi.fetchKPIs()).data,
    staleTime: 1000 * 60 * 2,
  });

  const status = couponsQuery.status;
  const error = couponsQuery.error;
  const data = couponsQuery.data;

  const allCoupons = data?.data ?? [];
  const totalItems = data?.meta?.total ?? allCoupons.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / COUPONS_ITEMS_PER_PAGE));
  const paginated = allCoupons;
  const actionInFlightRef = useRef(false);
  // Covers the confirmation gap as well as the unsettled network operation.
  const runSingleFlight = useCallback(async (action: () => Promise<unknown>) => {
    if (actionInFlightRef.current) return;
    actionInFlightRef.current = true;
    try { await action(); } finally { actionInFlightRef.current = false; }
  }, []);
  // Recover obsolete deep-linked pages only after successful server metadata.
  useEffect(() => {
    if (status === 'success' && Number.isSafeInteger(totalPages) && currentPage > totalPages) setCurrentPage(totalPages);
  }, [status, totalPages, currentPage, setCurrentPage]);

  const { getIntentKey, clearIntentKey, createMutation, updateMutation, deleteMutation, toggleMutation } = useAdminCouponsMutations();

  const openAdd = useCallback(() => { setEditId(null); setForm(EMPTY_COUPON_FORM); setShowModal(true); }, [setEditId, setForm, setShowModal]);

  const openEdit = useCallback((c: Coupon) => {
    if (c.status === COUPON_STATUS.EXPIRED || c.validUntil < format(new Date(), 'yyyy-MM-dd')) return;
    setEditId(c.id);
    setForm({
      code: c.code, description: c.description, type: c.type,
      value: String(c.type === 'flat' ? adminCouponsMinorToMajor(c.value) : c.value),
      minOrderAmount: String(adminCouponsMinorToMajor(c.minOrderAmount)),
      maxDiscount: String(adminCouponsMinorToMajor(c.maxDiscount)), usageLimit: String(c.usageLimit),
      assignedGyms: c.assignedGyms, validFrom: c.validFrom, validUntil: c.validUntil,
    });
    setShowModal(true);
  }, [setEditId, setForm, setShowModal]);

  const saveCoupon = useCallback(async (data: CouponFormValues, onValidationError?: (error: unknown) => void) => runSingleFlight(async () => {
    const payload: CouponWritePayload = {
      code: data.code.toUpperCase(), description: data.description, type: data.type,
      value: data.type === 'flat' ? adminCouponsMajorToMinor(Number(data.value)) : Number(data.value),
      minOrderAmount: adminCouponsMajorToMinor(Number(data.minOrderAmount)),
      maxDiscount: adminCouponsMajorToMinor(Number(data.maxDiscount)),
      usageLimit: parseAdminCouponUsageLimit(data.usageLimit), assignedGyms: data.assignedGyms,
      validFrom: data.validFrom, validUntil: data.validUntil,
    };
    try {
      if (editId) {
        const intentId = adminBillingCouponsManagementWriteIntent('update', payload, editId);
        await updateMutation.mutateAsync({ id: editId, payload, idempotencyKey: getIntentKey(intentId), intentId });
      } else {
        const intentId = adminBillingCouponsManagementWriteIntent('create', payload);
        await createMutation.mutateAsync({ payload, idempotencyKey: getIntentKey(intentId), intentId });
      }
    } catch (error) { onValidationError?.(error); /* mutation onError owns feedback; retain retry key */ }
  }), [editId, createMutation, getIntentKey, updateMutation, runSingleFlight]);

  const deleteCoupon = useCallback((id: string) => runSingleFlight(async () => {
    const intentId = `delete-coupon:${id}`;
    const ok = await confirm({ title: t('coupons.AdminCouponsConfirm.deleteTitle'), message: t('coupons.AdminCouponsConfirm.deleteMessage'), confirmText: t('coupons.AdminCouponsConfirm.deleteConfirm'), type: 'danger' });
    if (!ok) { clearIntentKey(intentId); return; }
    try { await deleteMutation.mutateAsync({ id, idempotencyKey: getIntentKey(intentId) }); }
    catch { /* mutation onError owns feedback; retain retry key */ }
  }), [confirm, clearIntentKey, deleteMutation, getIntentKey, t, runSingleFlight]);

  const toggleCoupon = useCallback((id: string) => runSingleFlight(async () => {
    const coupon = allCoupons.find((item) => item.id === id);
    if (!coupon || coupon.status === COUPON_STATUS.EXPIRED || coupon.validUntil < format(new Date(), 'yyyy-MM-dd')) return;
    const intentId = adminCouponToggleIntent(id, coupon.status === COUPON_STATUS.ACTIVE);
    try { await toggleMutation.mutateAsync({ id, idempotencyKey: getIntentKey(intentId), intentId }); }
    catch { /* mutation onError owns feedback; retain retry key */ }
  }), [allCoupons, getIntentKey, toggleMutation, runSingleFlight]);

  const saving = createMutation.isPending || updateMutation.isPending;

  return { coupons: paginated, allCoupons, status, error, retry: couponsQuery.refetch, clearIntentKey, kpis: kpisQuery.data ?? null, kpiStatus: kpisQuery.status, kpiError: kpisQuery.error, retryKpis: kpisQuery.refetch, statusFilter, setStatusFilter: (value: string) => { useAdminCouponsStore.getState().setStatusFilter(value); setCurrentPage(1); }, saving, showModal, setShowModal, editId, form, setForm, dateRange, setDateRange, openAdd, openEdit, saveCoupon, deleteCoupon, toggleCoupon, currentPage, setCurrentPage, totalPages, totalItems };
}
