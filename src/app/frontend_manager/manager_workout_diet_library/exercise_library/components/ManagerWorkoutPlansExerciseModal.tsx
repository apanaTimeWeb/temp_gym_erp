// RESPONSIBILITY: Renders ManagerWorkoutPlansExerciseModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';

import { X, Save, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';

import { EQUIPMENT_OPTIONS, EXERCISE_DIFFICULTY_OPTIONS, MANAGER_WORKOUT_PLANS_DIFFICULTY_LABEL_KEYS } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/constants/manager_workout_plans_shared.constants';
import { useManagerWorkoutPlansExerciseForm } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/hooks/useManagerWorkoutPlansExerciseForm';


/** @description Renders the ManagerWorkoutPlansExerciseModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerWorkoutPlansExerciseModal() {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');

  const { form, showExModal, editExId, handleClose, submit } = useManagerWorkoutPlansExerciseForm();
  const dialogRef = useRef<HTMLDivElement>(null);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: showExModal, onClose: handleClose });
  const { register, control, formState: { errors, isSubmitting } } = form;
  if (!showExModal) return null;
  return (
    <div data-testid="manager_workout-managerworkoutexercisemodal-presentation" className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4"role="presentation">
      <div data-testid="manager_workout-managerworkoutexercisemodal-dialog" ref={dialogRef} className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md overflow-hidden border-2 border-warning"role="dialog" aria-modal="true" aria-labelledby="manager-workout-exercise-title">
        <div className="flex justify-between items-center p-5 border-b border-border"><h3 id="manager-workout-exercise-title" className="font-bold text-lg text-text-primary">{editExId ? t('COPY_EDIT_EXERCISE') : t('COPY_ADD_EXERCISE')}</h3><button data-testid="manager_workout-manager-workout-exercise-modal-close-1" type="button" aria-label={t("COPY_CLOSE_EXERCISE_FORM")} onClick={handleClose} className="text-text-secondary hover:text-primary hover:bg-primary-subtle p-2 rounded-md motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"><X size={18} strokeWidth={2} aria-hidden="true"/></button></div>
        <form data-testid="manager_workout-managerworkoutexercisemodal-form-1" onSubmit={submit} className="p-5 space-y-4">
          <div><label htmlFor="manager-workout-exercise-name" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_EXERCISE_NAME")}</label><input data-testid="manager_workout-manager-workout-exercise-modal-manager-workout-exercise-name" id="manager-workout-exercise-name" type="text" {...register('name')} className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${errors.name ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-warning'} bg-input text-text-primary`} aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'managerworkoutexercisemodal-name-error' : undefined} />{errors.name && <p id="managerworkoutexercisemodal-name-error" data-testid="manager_workout-manager-workout-exercise-modal-status-1" role="alert" className="text-danger-text text-xs mt-1">{String(errors.name.message ?? '')}</p>}</div>
          <div><label htmlFor="manager-workout-exercise-muscle" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_PRIMARY_MUSCLE")}</label><input data-testid="manager_workout-manager-workout-exercise-modal-manager-workout-exercise-muscle" id="manager-workout-exercise-muscle" type="text" placeholder={t("COPY_E_G_CHEST_QUADRICEPS")} {...register('muscle')} className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${errors.muscle ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-warning'} bg-input text-text-primary`} aria-invalid={errors.muscle ? 'true' : undefined} aria-describedby={errors.muscle ? 'managerworkoutexercisemodal-muscle-error' : undefined} />{errors.muscle && <p id="managerworkoutexercisemodal-muscle-error" data-testid="manager_workout-manager-workout-exercise-modal-status-2" role="alert" className="text-danger-text text-xs mt-1">{String(errors.muscle.message ?? '')}</p>}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_EQUIPMENT")}</label><Controller name="equipment" control={control} render={({ field }) => <ManagerSearchableDropdown ariaLabel={t("COPY_EQUIPMENT")} dataTestId="manager_workout-managerworkoutexercisemodal-managersearchabledropdown-1" value={field.value} onChange={field.onChange} options={EQUIPMENT_OPTIONS.map((value) => ({ label: value, value }))}  data-testid="manager_workout-managerworkoutexercisemodal-searchable-dropdown-1"/>} /></div><div><label className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_DIFFICULTY_2")}</label><Controller name="difficulty" control={control} render={({ field }) => <ManagerSearchableDropdown ariaLabel={t("COPY_DIFFICULTY_2")} dataTestId="manager_workout-managerworkoutexercisemodal-managersearchabledropdown-2" value={field.value} onChange={field.onChange} options={EXERCISE_DIFFICULTY_OPTIONS.map((value) => ({ label: t(MANAGER_WORKOUT_PLANS_DIFFICULTY_LABEL_KEYS[value]), value }))}  data-testid="manager_workout-managerworkoutexercisemodal-searchable-dropdown-2"/>} /></div></div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2"><button data-testid="manager_workout-manager-workout-exercise-modal-close-2" type="button" onClick={handleClose} className="flex-1 min-h-10 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">{t("COPY_CANCEL_2")}</button><button data-testid="manager_workout-manager-workout-exercise-modal-button-submit" type="submit" disabled={isSubmitting} className="min-w-32 flex-1 min-h-10 py-2.5 rounded-xl text-sm font-bold text-on-primary bg-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">{isSubmitting ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true"/> : <Save size={18} strokeWidth={2} aria-hidden="true"/>}<span>{(() => { if (isSubmitting) return t('COPY_SAVING'); return (() => { if (editExId) return t('COPY_UPDATE'); return t('COPY_SAVE'); })(); })()}</span></button></div>
        </form>
      </div>
    </div>
  );
}
