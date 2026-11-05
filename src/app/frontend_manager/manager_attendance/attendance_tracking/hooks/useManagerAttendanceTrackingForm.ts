// DATA FLOW: Owning module inputs → this hook state/derived result → consuming module-owned components.
'use client';
import { useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingLocalUnsavedChangesGuard';

import { EMPTY_ATTENDANCE_FORM } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_form_defaults.constants';
import { useManagerAttendanceTrackingLogic } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingLogic';
import { managerAttendanceFormSchema } from '@/app/frontend_manager/manager_attendance/attendance_tracking/schemas/manager_attendance_tracking_form.schemas';
import type { AttendanceFormValues } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_form.types';


/** Coordinates the Attendance modal editor without placing form lifecycle logic in the view. */
/**
 * @description Coordinates attendance feature state and its documented UI/API boundary through useManagerAttendanceTrackingForm.
 * @dependencies Uses useManagerAttendanceTrackingLogic, ManagerAttendanceTrackingFormSchema, ManagerAttendanceTrackingFormTypes, ManagerUnsavedChangesGuard.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerAttendanceTrackingForm owns the attendance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerAttendanceTrackingForm() {
  const logic = useManagerAttendanceTrackingLogic();
  const form = useForm<AttendanceFormValues>({ resolver: zodResolver(managerAttendanceFormSchema), defaultValues: EMPTY_ATTENDANCE_FORM });
  const { showModal, tab } = logic;

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!showModal) return;
    const date = new Date();
    form.reset({ ...EMPTY_ATTENDANCE_FORM, date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`, type: (tab === 'Staff Attendance' || tab === 'Trainer Attendance') ? 'STAFF' : 'MEMBER' });
  }, [form, showModal, tab]);

  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(showModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => logic.setShowModal(false)); };
  const submit = form.handleSubmit(async (values) => logic.markAttendance(values));
  const watchType = form.watch('type');
  const watchStatus = form.watch('status');
  const todayDate = useMemo(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }, []);

  return { ...logic, form, handleClose, submit, watchType, watchStatus, todayDate };
}
