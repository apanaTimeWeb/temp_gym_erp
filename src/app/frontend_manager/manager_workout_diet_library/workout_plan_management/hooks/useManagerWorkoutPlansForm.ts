// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { EMPTY_WORKOUT_FORM } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/constants/manager_workout_plans_form_defaults.constants';
import { useManagerWorkoutPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/hooks/useManagerWorkoutPlansLogic';
import { useSaveWorkoutMutation } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/hooks/useManagerWorkoutPlansMutations';
import { managerWorkoutFormSchema } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/schemas/manager_workout_plans_form_forms.schemas';
import type { WorkoutFormInput, WorkoutFormValues } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/types/manager_workout_plans_form.types';


/** Coordinates the Workout Plan editor and transforms user-facing tag text into the API array contract. */
/**
 * @description Coordinates workout feature state and its documented UI/API boundary through useManagerWorkoutPlansForm.
 * @dependencies Uses ManagerIdempotency, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast, ManagerUnsavedChangesGuard, useManagerWorkoutPlansLogic.
 * @edge-case preserves explicit loading state until the query or mutation settles; reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerWorkoutPlansForm owns the workout feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerWorkoutPlansForm() {
  const saveKeyRef = useRef<string | null>(null);
  const { showWkModal, setShowWkModal, editWkId, wkForm } = useManagerWorkoutPlansLogic();
  const saveMutation = useSaveWorkoutMutation();
  const form = useForm<WorkoutFormInput, unknown, WorkoutFormValues>({ resolver: zodResolver(managerWorkoutFormSchema), defaultValues: wkForm ?? EMPTY_WORKOUT_FORM });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (showWkModal) form.reset(wkForm ?? EMPTY_WORKOUT_FORM); }, [form, showWkModal, wkForm]);
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(showWkModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowWkModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    try {
      const idempotencyKey = saveKeyRef.current ?? ManagerInfrastructureIdempotency(); saveKeyRef.current = idempotencyKey; const response = await saveMutation.mutateAsync({ ...values, id: editWkId || undefined, tags: values.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean), idempotencyKey });
      ManagerInfrastructureShowSuccessToast(response.message, `manager-workout-${editWkId ?? 'new'}-save-success`);
      form.reset(values);
      setShowWkModal(false);
    } catch (error: unknown) {
      ManagerInfrastructureShowErrorToast(error, `manager-workout-${editWkId ?? 'new'}-save-error`);
    }
  });
  return { form, showWkModal, editWkId, saving: saveMutation.isPending, handleClose, submit };
}
