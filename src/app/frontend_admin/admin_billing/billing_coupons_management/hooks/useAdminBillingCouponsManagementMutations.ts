"use client";
// RESPONSIBILITY: Owns all TanStack Query mutations and cache updates for Admin Coupons.
// DATA FLOW: Coupon form/action → mutation hook → AdminCouponsApi → TanStack Query invalidation → coupon UI and backend feedback.

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_COUPONS_QUERY_KEYS } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementQueryKeys';
import { AdminCouponsApi } from '@/app/frontend_admin/admin_billing/billing_coupons_management/api/admin_billing_coupons_management_api';
import { useAdminCouponsStore } from '@/app/frontend_admin/admin_billing/billing_coupons_management/state/useAdminBillingCouponsManagementStore';
import { adminToast } from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/feedback/AdminBillingCouponsManagementToastService';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementIdempotencyIntentStore';
import type { Coupon, CouponWritePayload } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';
/** @description useAdminCouponsMutations: Owns all TanStack Query mutations and cache updates for Admin Coupons. @dependencies Consumes AdminCouponsQueryKeys, AdminCouponsApi, useAdminCouponsStore, AdminNavigationLayoutToastService, AdminNavigationLayoutBackendMessage, AdminNavigationLayoutIdempotencyIntentStore. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminCouponsMutations() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const store = useAdminCouponsStore();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const invalidate = () => {
    // Refresh both independently queried views after any coupon write. This does not assume KPI derivation; it re-reads the declared KPI endpoint.
    void queryClient.invalidateQueries({ queryKey: ADMIN_COUPONS_QUERY_KEYS.key('list') });
    void queryClient.invalidateQueries({ queryKey: ADMIN_COUPONS_QUERY_KEYS.key('kpis') });
  };

  const createMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey, intentId }: { payload: CouponWritePayload; idempotencyKey: string; intentId: string }) => AdminCouponsApi.createCoupon(payload, idempotencyKey),
    onSuccess: (res, variables) => { clearIntentKey(variables.intentId); adminToast.success(res.message, 'admin-success-28c64429b0'); store.setShowModal(false); invalidate(); },
    onError: () => adminToast.error(t('coupons.AdminRepair.requestFailed'), 'admin-error-000fe5d6ed'),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload, idempotencyKey, intentId }: { id: string; payload: Partial<Coupon>; idempotencyKey: string; intentId: string }) => AdminCouponsApi.updateCoupon(id, payload, idempotencyKey),
    onSuccess: (res, variables) => { clearIntentKey(variables.intentId); adminToast.success(res.message, 'admin-success-268a88738b'); store.setShowModal(false); invalidate(); },
    onError: () => adminToast.error(t('coupons.AdminRepair.requestFailed'), 'admin-error-1bf98dcfe1'),
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminCouponsApi.deleteCoupon(id, idempotencyKey),
    onSuccess: (res, variables) => { adminToast.success(res.message, 'admin-success-1eef48be92'); clearIntentKey(`delete-coupon:${variables.id}`); invalidate(); },
    onError: () => adminToast.error(t('coupons.AdminRepair.requestFailed'), 'admin-error-aedbe2342a'),
  });
  const toggleMutation = useMutation({
    mutationFn: ({ id, idempotencyKey, intentId }: { id: string; idempotencyKey: string; intentId: string }) => AdminCouponsApi.toggleCoupon(id, idempotencyKey),
    onSuccess: (res, variables) => { clearIntentKey(variables.intentId); adminToast.success(res.message, 'admin-success-c9f979e51f'); invalidate(); },
    onError: () => adminToast.error(t('coupons.AdminRepair.requestFailed'), 'admin-error-4febc5f64f'),
  });

  return { getIntentKey, clearIntentKey, createMutation, updateMutation, deleteMutation, toggleMutation };
}
