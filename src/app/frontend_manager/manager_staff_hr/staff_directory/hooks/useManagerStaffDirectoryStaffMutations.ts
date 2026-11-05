// DATA FLOW: User intent → this module mutation hook → module API → query invalidation → consuming module UI.
'use client';
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';

import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureToManagerMinorUnits';

import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/staff_directory/api/manager_staff_hr_staff_directory.api';
import { ManagerStaffPayrollAndAttendanceQueryKeys } from '@/app/frontend_manager/manager_staff_hr/staff_directory/api/manager_staff_hr_staff_directory.query_keys';
import type { Staff } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_hr_staff_directory.types';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerStaffPayrollAndAttendanceStaffMutations.
 * @dependencies Uses ManagerStaffPayrollAndAttendanceApi, ManagerIdempotency, ManagerInfrastructureToManagerMinorUnits and ManagerInfrastructureFromManagerMinorUnits, ManagerStaffPayrollAndAttendanceTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStaffPayrollAndAttendanceStaffMutations owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStaffPayrollAndAttendanceStaffMutations(
  staff: Staff[],
  editId: string | null,
  setShowModal: (value: boolean) => void,
  setSaving: (value: boolean) => void,
  showToast: (message: string, type: ManagerToastType) => void,
) {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const queryClient = useQueryClient();
  const saveIntentKeyRef = useRef<string | null>(null);
  const deleteIntentKeysRef = useRef(new Map<string, string>());
  const toggleIntentKeysRef = useRef(new Map<string, string>());

  const saveStaffMutation = useMutation({
    mutationFn: async (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number; idempotencyKey: string }) => {
      const payload: Omit<Partial<Staff>, 'joinDate'> & { joinDate?: string | Date } = {
        ...data,
        salary: ManagerInfrastructureToManagerMinorUnits(Number(data.salary || 0)),
        advanceSalary: ManagerInfrastructureToManagerMinorUnits(Number(data.advanceSalary || 0)),
        joinDate: data.joinDate ? new Date(data.joinDate) : new Date(),
        isActive: true };
      return editId ? ManagerStaffPayrollAndAttendanceApi.updateStaff(editId, payload, data.idempotencyKey) : ManagerStaffPayrollAndAttendanceApi.createStaff(payload, data.idempotencyKey);
    },
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      if (!response.data) return;
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.staff() });
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.summary() });
      showToast(response.message, 'success');
      saveIntentKeyRef.current = null;
      setShowModal(false);
    },
    onError: (error) => { showToast(ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')), 'error'); },
    onSettled: () => setSaving(false) });

  const deleteStaffMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerStaffPayrollAndAttendanceApi.deleteStaff(id, idempotencyKey),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.staff() });
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.summary() });
      deleteIntentKeysRef.current.delete(variables.id);
      showToast(response.message, 'success');
    },
    onError: (error) => { showToast(ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')), 'error'); } });

  const toggleStaffStatusMutation = useMutation({
    mutationFn: ({ id, isActive, idempotencyKey }: { id: string; isActive: boolean; idempotencyKey: string }) => ManagerStaffPayrollAndAttendanceApi.updateStaff(id, { isActive }, idempotencyKey),
    onMutate: () => setSaving(true),
    onSuccess: (response, variables) => {
      if (!response.data) return;
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.staff() });
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.summary() });
      toggleIntentKeysRef.current.delete(variables.id);
      showToast(response.message, 'success');
    },
    onError: (error) => { showToast(ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')), 'error'); },
    onSettled: () => setSaving(false) });

  const saveStaff = async (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => {
    const idempotencyKey = saveIntentKeyRef.current ?? ManagerInfrastructureIdempotency();
    saveIntentKeyRef.current = idempotencyKey;
    return saveStaffMutation.mutateAsync({ ...data, idempotencyKey });
  };
  const deleteStaff = async (id: string) => {
    const idempotencyKey = deleteIntentKeysRef.current.get(id) ?? ManagerInfrastructureIdempotency();
    deleteIntentKeysRef.current.set(id, idempotencyKey);
    return deleteStaffMutation.mutateAsync({ id, idempotencyKey });
  };
  const toggleStaffStatus = async (item: Staff) => {
    const nextStatus = !item.isActive;
    const idempotencyKey = toggleIntentKeysRef.current.get(item.id) ?? ManagerInfrastructureIdempotency();
    toggleIntentKeysRef.current.set(item.id, idempotencyKey);
    return toggleStaffStatusMutation.mutateAsync({ id: item.id, isActive: nextStatus, idempotencyKey });
  };

  return { saveStaff, deleteStaff, toggleStaffStatus };
}
