"use client";
// RESPONSIBILITY: Owns the Finance salary-advance mutation, confirmation boundary, idempotency and cache refresh.
// DATA FLOW: Salary-advance form → confirmation → API mutation → Finance query cache invalidation and toast.

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_FINANCE_SALARY_ADVANCE_MANAGEMENT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/constants/AdminFinanceSalaryAdvanceManagementQueryKeys';
import { AdminFinanceSalaryAdvanceManagementApi } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/api/admin_finance_salary_advance_management_api';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/utils/AdminFinanceSalaryAdvanceManagementIdempotencyIntentStore';
import { AdminFinanceSalaryAdvanceManagementToMinorUnits } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/utils/AdminFinanceSalaryAdvanceManagementCurrencyUnits';
import type { AdminToastType } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/types/AdminFinanceSalaryAdvanceManagementToastTypes';

export function useAdminFinanceSalaryAdvanceManagementAdvanceMutation(showToast: (message: string, type: AdminToastType, id?: string) => void) {
  const { confirm } = useAdminNavigationLayoutConfirm();
  const t = useTranslations();
  const keysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(keysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(keysRef.current, intentId), []);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => AdminFinanceSalaryAdvanceManagementApi.giveAdvance(payload, idempotencyKey),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ADMIN_FINANCE_SALARY_ADVANCE_MANAGEMENT_QUERY_KEYS.key() }); },
    onError: (error) => showToast(t('hr.AdminAuditRepair.requestFailed'), 'error', 'finance-advance-error'),
  });
  const giveAdvance = useCallback(async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => {
    // A retry must reuse a key only for the *same* complete financial payload.
    // Different payment modes/notes are distinct confirmed intents, even with equal amounts.
    const intentId = JSON.stringify(['salary-advance', data.staffId, data.amount, data.date ?? '', data.paymentMode ?? '', data.notes ?? '']);
    const confirmed = await confirm({ title: t('hr.AdminHrMutations.auto_advanceTitle'), message: t('hr.AdminHrMutations.auto_advanceMessage'), confirmText: t('hr.AdminHrMutations.auto_advanceConfirm'), type: 'warning' });
    if (!confirmed) { clearIntentKey(intentId); return false; }
    try {
      const response = await mutation.mutateAsync({ payload: { ...data, amount: AdminFinanceSalaryAdvanceManagementToMinorUnits(data.amount) }, idempotencyKey: getIntentKey(intentId) });
      clearIntentKey(intentId);
      showToast(response.message, 'success', 'finance-advance-success');
      return true;
    } catch (error) {
      // A failed request may have committed remotely. Retain this intent's key for safe retries.
      // Only success or an explicit cancellation clears it.
      throw error;
    }
  }, [clearIntentKey, confirm, getIntentKey, mutation, showToast, t]);
  return { giveAdvance, isPending: mutation.isPending };
}
