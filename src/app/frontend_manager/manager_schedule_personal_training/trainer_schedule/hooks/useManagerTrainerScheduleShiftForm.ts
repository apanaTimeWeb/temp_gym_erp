// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useCallback, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleLocalUnsavedChangesGuard';

import { EMPTY_SHIFT_FORM } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_form_defaults.constants';
import { useManagerTrainerScheduleLogic } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleLogic';
import { managerScheduleShiftFormSchema } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/schemas/manager_trainer_schedule_shift_form.schemas';
import type { ShiftFormValues } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule_shift_form.types';
import type { CreateShiftDto } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule.types';

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates schedule feature state and its documented UI/API boundary through useManagerTrainerScheduleShiftForm.
 * @dependencies Uses ManagerUnsavedChangesGuard, useManagerTrainerScheduleLogic, ManagerTrainerScheduleShiftFormSchema, ManagerTrainerScheduleShiftFormTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerTrainerScheduleShiftForm owns the schedule feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerTrainerScheduleShiftForm() {
  const { shiftModal, closeShiftModal, saving, saveShift, trainers } = useManagerTrainerScheduleLogic();
  const form = useForm<ShiftFormValues>({ resolver: zodResolver(managerScheduleShiftFormSchema), defaultValues: EMPTY_SHIFT_FORM });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (shiftModal.open) form.reset(shiftModal.editShift ? { trainerId: shiftModal.editShift.trainerId, day: shiftModal.editShift.day, startTime: shiftModal.editShift.startTime, endTime: shiftModal.editShift.endTime, status: shiftModal.editShift.status, notes: shiftModal.editShift.notes ?? '' } : { ...EMPTY_SHIFT_FORM, trainerId: shiftModal.trainerId ?? '' }); }, [form, shiftModal.open, shiftModal.editShift, shiftModal.trainerId]);
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(shiftModal.open && form.formState.isDirty);
  const handleClose = useCallback(() => { void confirmAndClose(closeShiftModal); }, [closeShiftModal, confirmAndClose]);
  const submit = form.handleSubmit(async (data) => { await saveShift(data as unknown as CreateShiftDto); form.reset(data); });
  return { open: shiftModal.open, editShift: shiftModal.editShift, saving, trainers, form, submit, handleClose };
}
