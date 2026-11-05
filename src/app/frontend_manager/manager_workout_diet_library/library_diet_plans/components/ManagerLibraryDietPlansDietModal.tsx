// RESPONSIBILITY: Renders ManagerLibraryDietPlansDietModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';

import { X, Save, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansLocalDialogFocusTrap';

import { GOALS, MANAGER_LIBRARY_DIET_PLANS_MAX_NUTRIENT_VALUE } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/constants/manager_library_diet_plans_shared.constants';
import { useManagerLibraryDietPlansDietForm } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansDietForm';
import type { ManagerLibraryDietPlansNutrientKey } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans.types';


/**
 * @description Renders/orchestrates the ManagerLibraryDietPlansDietModal user interface for the library module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_workout_diet_library/manager_library_hooks/useManagerLibraryDietPlansDietForm; @/app/frontend_manager/manager_workout_diet_library/manager_library_constants/ManagerLibraryDietPlansSharedConstants; @/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown; @/app/frontend_manager/manager_workout_diet_library/manager_library_types/ManagerLibraryDietPlansTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const NUTRIENT_FIELDS: ReadonlyArray<{ labelKey: string; key: ManagerLibraryDietPlansNutrientKey; placeholder: string }> = [
  { labelKey: 'COPY_CALORIES', key: 'calories', placeholder: '2500' },
  { labelKey: 'COPY_PROTEIN_G', key: 'protein', placeholder: '150' },
  { labelKey: 'COPY_CARBS_G', key: 'carbs', placeholder: '300' },
  { labelKey: 'COPY_FATS_G', key: 'fats', placeholder: '70' },
];

/** @description Renders the ManagerLibraryDietPlansDietModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerLibraryDietPlansDietModal() {
  const t = useTranslations('MANAGER_LIBRARY_DIET_PLANS');

  const { form, showDietModal, editDietId, handleClose, submit } = useManagerLibraryDietPlansDietForm();
  const { register, control, formState: { errors, isSubmitting } } = form;
  const dialogRef = useRef<HTMLDivElement>(null);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: showDietModal, onClose: handleClose });


  if (!showDietModal) return null;

  return (
    <div data-testid="manager_library-managerlibrarydietmodal-presentation" className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4"role="presentation">
      <div data-testid="manager_library-managerlibrarydietmodal-dialog" ref={dialogRef} className="bg-overlay rounded-2xl shadow-dialog w-full max-w-2xl overflow-hidden border border-border max-h-screen flex flex-col"role="dialog" aria-modal="true" aria-labelledby="manager-library-diet-title">
        <div className="sticky top-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 id="manager-library-diet-title" className="text-lg font-bold text-text-primary">{editDietId ? t('COPY_EDIT_DIET_PLAN') : t('COPY_ADD_DIET_PLAN')}</h3>
          <button data-testid="manager_library-manager-library-diet-modal-close-1" type="button" aria-label={t("COPY_CLOSE_DIET_FORM")} onClick={handleClose} className="min-h-11 min-w-11 rounded-lg hover:bg-surface-hover text-text-secondary motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ease-in-out motion-safe:active:scale-95 hover:brightness-110"><X size={18} strokeWidth={2} aria-hidden="true" /></button>
        </div>
        <form data-testid="manager_library-managerlibrarydietmodal-form-1" onSubmit={submit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label htmlFor="manager-library-diet-name" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_PLAN_NAME")}</label><input data-testid="manager_library-manager-library-diet-modal-manager-library-diet-name" id="manager-library-diet-name" type="text" {...register('name')} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 ${errors.name ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-warning'} bg-input text-text-primary`} aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'managerlibrarydietmodal-name-error' : undefined} />{errors.name && <p id="managerlibrarydietmodal-name-error" data-testid="manager_library-manager-library-diet-modal-status-1" role="alert" className="text-danger-text text-xs mt-1">{String(errors.name.message ?? '')}</p>}</div>
            <div><label className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_GOAL")}</label><Controller name="goal" control={control} render={({ field }) => <ManagerSearchableDropdown ariaLabel={t("COPY_GOAL")} ariaInvalid={Boolean(errors.goal)} ariaDescribedBy={errors.goal ? 'managerlibrarydietmodal-goal-error' : undefined} dataTestId="manager_library-managerlibrarydietmodal-managersearchabledropdown-1" value={field.value} onChange={field.onChange} options={GOALS.map((goal) => ({ label: goal, value: goal }))}  data-testid="manager_library-managerlibrarydietmodal-searchable-dropdown-1"/>} />{errors.goal && <p id="managerlibrarydietmodal-goal-error" data-testid="manager_library-manager-library-diet-modal-status-2" role="alert" className="text-danger-text text-xs mt-1">{String(errors.goal.message ?? '')}</p>}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NUTRIENT_FIELDS.map((field, mapIndex) => { const error = errors[field.key]; return <div key={field.key}><label htmlFor={`manager-library-diet-${field.key}`} className="block text-sm font-medium text-text-secondary mb-1">{t(field.labelKey)}</label><input data-testid={`manager_library-library-managerlibrarydietmodal-input-description-${mapIndex}`} id={`manager-library-diet-${field.key}`} type="number" min="0" max={MANAGER_LIBRARY_DIET_PLANS_MAX_NUTRIENT_VALUE} step="1" placeholder={field.placeholder} {...register(field.key, { valueAsNumber: true })} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 ${error ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-warning'} bg-input text-text-primary`} />{error && <p data-testid={`manager_library-library-librarydietmodal-alert-description-${mapIndex}`} role="alert" className="text-danger-text text-xs mt-1">{String(error.message ?? '')}</p>}</div>; })}
          </div>
          <div><label htmlFor="manager-library-diet-description" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_DESCRIPTION_2")}</label><input data-testid="manager_library-manager-library-diet-modal-manager-library-diet-description" id="manager-library-diet-description" type="text" {...register('description')} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 ${errors.description ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-warning'} bg-input text-text-primary`} aria-invalid={errors.description ? 'true' : undefined} aria-describedby={errors.description ? 'managerlibrarydietmodal-description-error' : undefined} /></div>
          <div><label htmlFor="manager-library-diet-meals" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_MEALS_ONE_PER_LINE")}</label><textarea data-testid="manager_library-manager-library-diet-modal-manager-library-diet-meals" id="manager-library-diet-meals" {...register('meals')} className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning bg-input text-text-primary h-32 resize-none" placeholder={t("COPY_MEAL_1_OATS_EGGS_MEAL_2_CHICKEN_RICE")} /></div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button data-testid="manager_library-manager-library-diet-modal-close-2" type="button" onClick={handleClose} className="flex-1 min-h-11 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">{t("COPY_CANCEL_1")}</button>
            <button data-testid="manager_library-manager-library-diet-modal-button-submit" type="submit" disabled={isSubmitting} className="min-w-32 flex-1 min-h-10 py-2.5 rounded-xl text-sm font-bold text-on-primary bg-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">{isSubmitting ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true"/> : <Save size={18} strokeWidth={2} aria-hidden="true"/>}<span>{(() => { if (isSubmitting) return t('COPY_SAVING'); return (() => { if (editDietId) return t('COPY_UPDATE'); return t('COPY_ADD_1'); })(); })()}</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}
