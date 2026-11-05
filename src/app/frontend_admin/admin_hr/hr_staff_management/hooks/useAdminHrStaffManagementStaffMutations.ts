"use client";
// RESPONSIBILITY: Owns Admin HR staff create/update/delete/status mutation orchestration and destructive confirmation.
// DATA FLOW: HR form action → useAdminHrStaffMutations → AdminHrApi → TanStack Query cache.

import { ADMIN_HR_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/hr_staff_management/constants/AdminHrStaffManagementQueryKeys';
import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminHrApi } from '@/app/frontend_admin/admin_hr/hr_staff_management/api/admin_hr_staff_management_api';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementIdempotencyIntentStore';
import type { Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';
import type { AdminToastType } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementToastTypes';
import { AdminHrToMinorUnits } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementCurrencyUnits';
import { getAdminHrStaffJoinDateIso } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementJoinDate';
import { getAdminHrGeneratedJoinDateIntent, getAdminHrStatusIntent } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementRetryIntent';
/** @description useAdminHrStaffMutations: Owns Admin HR staff create/update/delete/status mutation orchestration and destructive confirmation. @dependencies Consumes AdminHrQueryKeys, AdminHrApi, useAdminNavigationLayoutConfirm, AdminNavigationLayoutIdempotencyIntentStore, AdminHrTypes, AdminNavigationLayoutToastTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @param editId - Input consumed by this hook as declared by its TypeScript signature. @param setShowModal - Input consumed by this hook as declared by its TypeScript signature. @param showToast - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminHrStaffMutations(
  editId: string | null,
  setShowModal: (open: boolean) => void,
  showToast: (message: string, type: AdminToastType, id?: string) => void,
) {
  const { confirm } = useAdminNavigationLayoutConfirm();
  const t = useTranslations();
  const queryClient = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const generatedJoinDatesRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const invalidateHr = useCallback(() => queryClient.invalidateQueries({ queryKey: ADMIN_HR_QUERY_KEYS.key() }), [queryClient]);

  const createMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: Partial<Staff>; idempotencyKey: string }) => AdminHrApi.createStaff(payload, idempotencyKey), onSuccess: () => { void invalidateHr(); }, onError: (error) => showToast(t('hr.AdminAuditRepair.requestFailed'), 'error', 'hr-staff-create-error') });
  const updateMutation = useMutation({ mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Staff>; idempotencyKey: string }) => AdminHrApi.updateStaff(id, payload, idempotencyKey), onSuccess: () => { void invalidateHr(); }, onError: (error) => showToast(t('hr.AdminAuditRepair.requestFailed'), 'error', 'hr-staff-update-error') });
  const deleteMutation = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminHrApi.deleteStaff(id, idempotencyKey), onSuccess: () => { void invalidateHr(); }, onError: (error) => showToast(t('hr.AdminAuditRepair.requestFailed'), 'error', 'hr-staff-delete-error') });

  const saveStaff = useCallback(async (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => {
    // A failed create/edit retry with no provided joinDate must reuse the exact original payload.
    const generatedJoinDateIntent = getAdminHrGeneratedJoinDateIntent(editId, data);
    if (!data.joinDate && !generatedJoinDatesRef.current.has(generatedJoinDateIntent)) {
      generatedJoinDatesRef.current.set(generatedJoinDateIntent, new Date().toISOString());
    }
    const payload: Partial<Staff> = {
      ...data,
      salary: AdminHrToMinorUnits(Number(data.salary ?? 0)),
      joinDate: data.joinDate ? getAdminHrStaffJoinDateIso(data.joinDate) : generatedJoinDatesRef.current.get(generatedJoinDateIntent)!,
      ...(editId ? (data.isActive === undefined ? {} : { isActive: data.isActive }) : { isActive: data.isActive ?? true }),
    };
    const intentId = editId ? `update-staff:${editId}:${JSON.stringify(payload)}` : `create-staff:${JSON.stringify(payload)}`;
    const response = editId
      ? await updateMutation.mutateAsync({ id: editId, payload, idempotencyKey: getIntentKey(intentId) })
      : await createMutation.mutateAsync({ payload, idempotencyKey: getIntentKey(intentId) });
    clearIntentKey(intentId);
    generatedJoinDatesRef.current.delete(generatedJoinDateIntent);
    showToast(response.message, 'success', 'hr-staff-create-success');
    setShowModal(false);
  }, [clearIntentKey, createMutation, editId, getIntentKey, setShowModal, showToast, updateMutation]);

  const deleteStaff = useCallback(async (id: string) => {
    const intentId = `delete-staff:${id}`;
    const confirmed = await confirm({
      title: t('hr.AdminHrMutations.auto_removeTitle'),
      message: t('hr.AdminHrMutations.auto_removeMessage'),
      confirmText: t('hr.AdminHrMutations.auto_removeConfirm'),
      type: 'danger',
    });
    if (!confirmed) { clearIntentKey(intentId); return; }
    const response = await deleteMutation.mutateAsync({ id, idempotencyKey: getIntentKey(intentId) });
    idempotencyKeysRef.current.delete(intentId);
    showToast(response.message, 'success', 'hr-staff-update-success');
  }, [clearIntentKey, confirm, deleteMutation, getIntentKey, showToast, t]);

  const toggleStaffStatus = useCallback(async (staff: Staff) => {
    const isActivating = staff.isActive === false;
    const action = isActivating ? t('hr.AdminHrMutations.auto_activateTitle') : t('hr.AdminHrMutations.auto_suspendTitle');
    const confirmed = await confirm({
      title: action,
      message: t('hr.AdminHrMutations.auto_toggleMessage', { action: action.toLowerCase(), staffName: staff.name }),
      confirmText: isActivating ? t('hr.AdminHrMutations.auto_activateConfirm') : t('hr.AdminHrMutations.auto_suspendConfirm'),
      type: isActivating ? 'info' : 'danger',
    });
    if (!confirmed) return;
    const intentId = getAdminHrStatusIntent(staff.id, isActivating);
    const response = await updateMutation.mutateAsync({ id: staff.id, payload: { isActive: isActivating }, idempotencyKey: getIntentKey(intentId) });
    clearIntentKey(intentId);
    showToast(response.message, 'success', 'hr-staff-delete-success');
  }, [clearIntentKey, confirm, getIntentKey, showToast, t, updateMutation]);

  return {
    saveStaff,
    deleteStaff,
    toggleStaffStatus,
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}
