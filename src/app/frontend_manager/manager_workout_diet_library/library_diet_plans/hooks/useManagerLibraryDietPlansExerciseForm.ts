// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansLocalUnsavedChangesGuard';

import { EMPTY_MANAGER_LIBRARY_DIET_PLANS_EXERCISE_FORM } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/constants/manager_library_diet_plans_form_defaults.constants';
import { useManagerLibraryDietPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansLogic';
import { managerLibraryExerciseFormSchema } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/schemas/manager_library_diet_plans_exercise_form.schemas';
import type { ManagerLibraryDietPlansExerciseFormValues } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans_exercise_form.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates library feature state and its documented UI/API boundary through useManagerLibraryDietPlansExerciseForm.
 * @dependencies Uses useManagerLibraryDietPlansLogic, ManagerLibraryDietPlansExerciseFormSchema, ManagerLibraryDietPlansExerciseFormTypes, ManagerUnsavedChangesGuard.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerLibraryDietPlansExerciseForm owns the library feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerLibraryDietPlansExerciseForm() {
  const { showExerciseModal, setShowExerciseModal, editExerciseId, editExerciseData, saving, saveExercise } = useManagerLibraryDietPlansLogic();
  const form = useForm<ManagerLibraryDietPlansExerciseFormValues>({ resolver: zodResolver(managerLibraryExerciseFormSchema), defaultValues: EMPTY_MANAGER_LIBRARY_DIET_PLANS_EXERCISE_FORM });

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!showExerciseModal) return;
    form.reset(editExerciseData ? {
      name: editExerciseData.name,
      category: editExerciseData.category,
      muscleGroup: editExerciseData.muscleGroup?.join(', ') ?? '',
      sets: editExerciseData.sets,
      reps: editExerciseData.reps,
      duration: editExerciseData.duration,
      difficulty: editExerciseData.difficulty,
      description: editExerciseData.description ?? '',
      videoUrl: editExerciseData.videoUrl ?? '',
      isActive: editExerciseData.isActive,
    } : EMPTY_MANAGER_LIBRARY_DIET_PLANS_EXERCISE_FORM);
  }, [editExerciseData, form, showExerciseModal]);

  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(showExerciseModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowExerciseModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    await saveExercise({
      ...values,
      muscleGroup: values.muscleGroup.split(',').map((item: string) => item.trim()).filter(Boolean),
    });
    form.reset(values);
  });

  return { form, showExerciseModal, editExerciseId, saving, handleClose, submit };
}
