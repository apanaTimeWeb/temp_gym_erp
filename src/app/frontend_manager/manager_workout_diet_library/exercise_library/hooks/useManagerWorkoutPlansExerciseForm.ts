// DATA FLOW: Exercise form → module-owned mutation hook → exercise API → observable success/error feedback.
'use client';
import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';
import { EMPTY_EXERCISE_FORM } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/constants/manager_workout_plans_form_defaults.constants';
import { useManagerWorkoutPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/hooks/useManagerWorkoutPlansLogic';
import { useSaveExerciseMutation } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/hooks/useManagerWorkoutPlansMutations';
import { managerExerciseFormSchema } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/schemas/manager_workout_plans_form_forms.schemas';
import type { ExerciseFormValues } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_form.types';

export function useManagerWorkoutPlansExerciseForm() {
  const saveKeyRef = useRef<string | null>(null);
  const lastSubmittedPayloadRef = useRef<string | null>(null);
  const { showExModal, setShowExModal, editExId, exForm } = useManagerWorkoutPlansLogic();
  const saveMutation = useSaveExerciseMutation();
  const form = useForm<ExerciseFormValues>({ resolver: zodResolver(managerExerciseFormSchema), defaultValues: exForm ?? EMPTY_EXERCISE_FORM });
  const { reset } = form;

  // Rehydrate the form when a new modal intent or edit record is opened; do not reset on field edits.
  useEffect(() => {
    if (showExModal) reset(exForm ?? EMPTY_EXERCISE_FORM);
  }, [exForm, reset, showExModal]);

  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(showExModal && form.formState.isDirty);
  const handleClose = () => {
    void confirmAndClose(() => {
      saveKeyRef.current = null;
      lastSubmittedPayloadRef.current = null;
      setShowExModal(false);
    });
  };

  const submit = form.handleSubmit(async (values) => {
    try {
      const businessDto = {
        id: editExId || undefined,
        name: values.name,
        equipment: values.equipment,
        difficulty: values.difficulty,
        muscleGroup: values.muscle.split(',').map((item) => item.trim()).filter(Boolean),
      };
      const payloadFingerprint = JSON.stringify(businessDto);
      const idempotencyKey = saveKeyRef.current && lastSubmittedPayloadRef.current === payloadFingerprint
        ? saveKeyRef.current
        : ManagerInfrastructureIdempotency();
      saveKeyRef.current = idempotencyKey;
      lastSubmittedPayloadRef.current = payloadFingerprint;
      const response = await saveMutation.mutateAsync({ ...businessDto, idempotencyKey });
      ManagerInfrastructureShowSuccessToast(response.message, `manager-workout-exercise-${editExId ?? 'new'}-save-success`);
      saveKeyRef.current = null;
      lastSubmittedPayloadRef.current = null;
      form.reset(values);
      setShowExModal(false);
    } catch (error: unknown) {
      ManagerInfrastructureShowErrorToast(error, `manager-workout-exercise-${editExId ?? 'new'}-save-error`);
    }
  });

  return { form, showExModal, editExId, saving: saveMutation.isPending, handleClose, submit };
}
