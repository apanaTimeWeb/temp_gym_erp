"use client";
// RESPONSIBILITY: Read-only modal for inspecting a Trainer Diet Library plan and opening assignment.
import { useRef } from 'react';

import { X, Utensils, Zap } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsTrainerInfrastructureTooltip';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/TrainerCoachingDietLibraryAndAssignmentsuseTrainerInfrastructureDialogFocusTrap';

import { displayValue } from '@/lib/display_value';

import { TrainerLibraryFormatNumber } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/utils/TrainerCoachingDietLibraryAndAssignmentsFormatNumber';

import type { TrainerLibraryDietModalProps } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsDietModalProps';









/**
 * @description Read-only modal for inspecting a Trainer Diet Library plan and opening assignment.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders and coordinates the library feature form/modal surface for LibraryDietModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerLibraryDietModal({ isOpen, plan, onClose, onAssign }: TrainerLibraryDietModalProps) {
  const t = useTranslations('TRAINER_LIBRARY');
  const locale = useLocale();
  const dialogRef = useRef<HTMLDivElement>(null);
  useTrainerInfrastructureDialogFocusTrap({ isOpen: Boolean(isOpen && plan), dialogRef, onEscape: onClose });
  if (!isOpen || !plan) return null;
  return (
    <div className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4" role="presentation">
      <div ref={dialogRef} className="bg-overlay border border-border rounded-2xl shadow-dialog w-full max-w-lg max-h-screen overflow-y-auto" role="dialog" aria-modal={true} aria-labelledby="trainer-diet-plan-title" tabIndex={-1}>
        <div className="sticky top-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="min-w-0"><TrainerInfrastructureTooltip content={plan.name}><h3 id="trainer-diet-plan-title" className="text-lg font-bold text-primary truncate">{plan.name}</h3></TrainerInfrastructureTooltip><p className="text-xs text-secondary mt-0.5">{displayValue(plan.goal)} · {plan.isActive ? t("TEXT_ACTIVE") : t("TEXT_INACTIVE")}</p></div>
          <div className="flex items-center gap-2">
            {onAssign && <button type="button" onClick={onAssign} className="min-h-11 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_library-trainerlibrarydietmodal-button_1">{t("TEXT_ASSIGN_TO_MEMBER")}</button>}
            <button type="button" onClick={onClose} aria-label={t("TEXT_CLOSE_DIET_PLAN")} className="min-w-11 min-h-11 p-2 rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_library-trainerlibrarydietmodal-button_2"><X size={18}  strokeWidth={2}/></button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 pb-0">
          {[[t('TEXT_CALORIES'), plan.calories == null ? '—' : `${TrainerLibraryFormatNumber(plan.calories, locale)} ${t('TEXT_KCAL')}`], [t('TEXT_PROTEIN'), plan.protein == null ? '—' : `${TrainerLibraryFormatNumber(plan.protein, locale)}${t('TEXT_G')}`], [t('TEXT_CARBOHYDRATES'), plan.carbs == null ? '—' : `${TrainerLibraryFormatNumber(plan.carbs, locale)}${t('TEXT_G')}`], [t('TEXT_FATS'), plan.fats == null ? '—' : `${TrainerLibraryFormatNumber(plan.fats, locale)}${t('TEXT_G')}`]].map(([label, value]) => (
            <div key={label} className="bg-input rounded-xl p-3 text-center"><Zap size={18} className="mx-auto mb-1 text-warning" aria-hidden="true"  strokeWidth={2}/><p className="text-xs text-secondary mb-1">{label}</p><p className="text-sm font-bold text-primary">{value}</p></div>
          ))}
        </div>
        <div className="p-6 space-y-4">
          {plan.description ? <div><p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">{t("TEXT_DESCRIPTION")}</p><p className="text-sm text-primary">{plan.description}</p></div> : null}
          {plan.meals?.length ? <div><p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2"><Utensils size={18} className="inline me-1"  strokeWidth={2}/>{t("TEXT_MEAL_PLAN")}</p><ul className="space-y-1.5">{plan.meals.map((meal, index) => <li key={`${typeof meal === 'string' ? meal : meal.name}-${typeof meal === 'string' ? t("TEXT_TEXT") : meal.description ?? t('TEXT_MEAL')}`} className="flex items-start gap-2 text-sm text-primary"><span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary-subtle text-primary flex items-center justify-center text-xs font-bold">{index + 1}</span><div><span className="font-medium">{typeof meal === 'string' ? meal : meal.name}</span>{typeof meal !== 'string' && meal.description ? <span className="block text-xs text-secondary">{meal.description}</span> : null}</div></li>)}</ul></div> : null}
          <div className="rounded-xl bg-warning-bg border border-border px-4 py-3" data-testid={"trainer_library-trainer_library-diet-modal-warning-state-39-1"}><p className="text-xs text-warning font-medium">{t("TEXT_DIET_PLANS_ARE_MANAGED_BY_YOUR_GYM_MANAG_ABB395EA")}</p></div>
          <button type="button" onClick={onClose} className="min-h-11 w-full py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_library-trainerlibrarydietmodal-button_3">{t("TEXT_CLOSE")}</button>
        </div>
      </div>
    </div>
  );
}
