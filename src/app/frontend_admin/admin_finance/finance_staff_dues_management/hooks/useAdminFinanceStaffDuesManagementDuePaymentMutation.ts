"use client";
// RESPONSIBILITY: Owns the Finance staff-dues settlement mutation, confirmation boundary, idempotency and cache refresh.
// DATA FLOW: Staff-dues form → confirmation → API mutation → Finance query cache invalidation and toast.

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_FINANCE_STAFF_DUES_MANAGEMENT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/constants/AdminFinanceStaffDuesManagementQueryKeys';
import { AdminFinanceStaffDuesManagementApi } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/api/admin_finance_staff_dues_management_api';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementIdempotencyIntentStore';
import { AdminFinanceStaffDuesManagementToMinorUnits } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementCurrencyUnits';
import type { AdminToastType } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementToastTypes';

export function useAdminFinanceStaffDuesManagementDuePaymentMutation(showToast: (message: string, type: AdminToastType, id?: string) => void) {
  const { confirm } = useAdminNavigationLayoutConfirm();
  const t = useTranslations();
  const keysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(keysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(keysRef.current, intentId), []);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => AdminFinanceStaffDuesManagementApi.payDue(payload, idempotencyKey),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ADMIN_FINANCE_STAFF_DUES_MANAGEMENT_QUERY_KEYS.key() }); },
    onError: (error) => showToast(t('hr.AdminAuditRepair.requestFailed'), 'error', 'finance-staff-due-error'),
  });
  const payDue = useCallback(async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => {
    const intentId = `staff-due:${JSON.stringify([data.staffId, data.amount, data.date ?? '', data.paymentMode ?? '', data.notes ?? ''])}`;
    const confirmed = await confirm({ title: t('hr.AdminHrMutations.auto_dueTitle'), message: t('hr.AdminHrMutations.auto_dueMessage'), confirmText: t('hr.AdminHrMutations.auto_paymentConfirm'), type: 'warning' });
    if (!confirmed) { clearIntentKey(intentId); return false; }
    try {
      const response = await mutation.mutateAsync({ payload: { ...data, amount: AdminFinanceStaffDuesManagementToMinorUnits(data.amount) }, idempotencyKey: getIntentKey(intentId) });
      clearIntentKey(intentId);
      showToast(response.message, 'success', 'finance-staff-due-success');
      return true;
    } catch (error) {
      // A failed request may have committed remotely. Retain this intent's key for safe retries.
      // Only success or an explicit cancellation clears it.
      throw error;
    }
  }, [clearIntentKey, confirm, getIntentKey, mutation, showToast, t]);
  return { payDue, isPending: mutation.isPending };
}
