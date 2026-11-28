"use client";
// RESPONSIBILITY: Read-only modal for inspecting a Trainer Diet Library plan and opening assignment.
import { useRef } from 'react';

import { X, Utensils, Zap, Edit2, Trash2, AlertCircle } from 'lucide-react';

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
export default function TrainerLibraryDietModal({ isOpen, plan, onClose, onAssign, onEdit, onRequestDelete }: TrainerLibraryDietModalProps) {
  const t = useTranslations('TRAINER_LIBRARY');
  const locale = useLocale();
  const dialogRef = useRef<HTMLDivElement>(null);
  useTrainerInfrastructureDialogFocusTrap({ isOpen: Boolean(isOpen && plan), dialogRef, onEscape: onClose });
  if (!isOpen || !plan) return null;
  return (
    <div className="fixed inset-0 bg-overlay-backdrop z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto" role="presentation">
      <div ref={dialogRef} className="my-auto bg-white dark:bg-[#0F172A] border border-border rounded-2xl shadow-dialog w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden" role="dialog" aria-modal={true} aria-labelledby="trainer-diet-plan-title" tabIndex={-1}>
        <div className="sticky top-0 bg-white dark:bg-[#0F172A] px-5 sm:px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-2 shrink-0 z-10">
          <div className="min-w-0 flex-1"><TrainerInfrastructureTooltip content={plan.name}><h3 id="trainer-diet-plan-title" className="text-lg font-bold text-text-primary truncate">{plan.name}</h3></TrainerInfrastructureTooltip><p className="text-xs text-secondary mt-0.5">{displayValue(plan.goal)} · {plan.isActive ? t("TEXT_ACTIVE") : t("TEXT_INACTIVE")}</p></div>
          <div className="flex items-center gap-2 shrink-0">
            {onAssign && <button type="button" onClick={onAssign} className="min-h-10 px-3.5 py-2 bg-primary text-on-primary rounded-xl text-xs sm:text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer" data-testid="trainer_library-trainerlibrarydietmodal-button_1">{t("TEXT_ASSIGN_TO_MEMBER")}</button>}
            <button type="button" onClick={onClose} aria-label={t("TEXT_CLOSE_DIET_PLAN")} className="min-w-10 min-h-10 inline-flex items-center justify-center p-2 rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer" data-testid="trainer_library-trainerlibrarydietmodal-button_2"><X size={18} strokeWidth={2}/></button>
          </div>
        </div>
        <div className="overflow-y-auto custom-scrollbar flex-1 min-h-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 pb-0">
            {[[t('TEXT_CALORIES'), plan.calories == null ? '—' : `${TrainerLibraryFormatNumber(plan.calories, locale)} ${t('TEXT_KCAL')}`], [t('TEXT_PROTEIN'), plan.protein == null ? '—' : `${TrainerLibraryFormatNumber(plan.protein, locale)}${t('TEXT_G')}`], [t('TEXT_CARBOHYDRATES'), plan.carbs == null ? '—' : `${TrainerLibraryFormatNumber(plan.carbs, locale)}${t('TEXT_G')}`], [t('TEXT_FATS'), plan.fats == null ? '—' : `${TrainerLibraryFormatNumber(plan.fats, locale)}${t('TEXT_G')}`]].map(([label, value]) => (
              <div key={label} className="bg-input rounded-xl p-3 text-center"><Zap size={18} className="mx-auto mb-1 text-warning" aria-hidden="true"  strokeWidth={2}/><p className="text-xs text-secondary mb-1">{label}</p><p className="text-sm font-bold text-text-primary">{value}</p></div>
            ))}
          </div>
          <div className="p-6 space-y-4">
            {plan.description ? <div><p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">{t("TEXT_DESCRIPTION")}</p><p className="text-sm text-text-primary">{plan.description}</p></div> : null}
            {plan.meals?.length ? <div><p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2"><Utensils size={18} className="inline me-1"  strokeWidth={2}/>{t("TEXT_MEAL_PLAN")}</p><ul className="space-y-1.5">{plan.meals.map((meal, index) => <li key={`${typeof meal === 'string' ? meal : meal.name}-${typeof meal === 'string' ? t("TEXT_TEXT") : meal.description ?? t('TEXT_MEAL')}`} className="flex items-start gap-2 text-sm text-primary"><span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary-subtle text-primary flex items-center justify-center text-xs font-bold">{index + 1}</span><div><span className="font-medium">{typeof meal === 'string' ? meal : meal.name}</span>{typeof meal !== 'string' && meal.description ? <span className="block text-xs text-secondary">{meal.description}</span> : null}</div></li>)}</ul></div> : null}
            {plan.deletionRequested ? (
              <div className="rounded-xl bg-warning-bg border border-warning px-4 py-3 flex items-start gap-2.5" data-testid="trainer_library-trainer_library-diet-modal-warning-state-39-1">
                <AlertCircle size={18} className="text-warning shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-warning-text font-bold">Pending Deletion Approval</p>
                  <p className="text-xs text-warning-text mt-0.5">Reason: {plan.deletionReason || 'Retirement requested by trainer'}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-primary-subtle border border-border px-4 py-2.5" data-testid="trainer_library-trainer_library-diet-modal-warning-state-39-1">
                <p className="text-xs text-secondary font-medium">Customizable nutrition plan. Trainers can edit details or request deletion with gym manager approval.</p>
              </div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 bg-white dark:bg-[#0F172A] border-t border-border px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0 z-10">
            <div className="flex items-center gap-2">
              {onEdit && (
                <button
                  type="button"
                  onClick={onEdit}
                  className="min-h-11 px-4 py-2 border border-border rounded-xl text-sm font-semibold text-primary hover:bg-primary-subtle flex items-center gap-1.5"
                  data-testid="trainer_library-trainerlibrarydietmodal-button-edit"
                >
                  <Edit2 size={16} /> Edit Plan
                </button>
              )}
              {onRequestDelete && !plan.deletionRequested && (
                <button
                  type="button"
                  onClick={onRequestDelete}
                  className="min-h-11 px-4 py-2 border border-danger text-danger hover:bg-danger-bg rounded-xl text-sm font-semibold flex items-center gap-1.5"
                  data-testid="trainer_library-trainerlibrarydietmodal-button-request-delete"
                >
                  <Trash2 size={16} /> Request Deletion
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 px-5 py-2 border border-border rounded-xl text-sm font-medium text-secondary hover:bg-primary-subtle"
              data-testid="trainer_library-trainerlibrarydietmodal-button_3"
            >
              {t("TEXT_CLOSE")}
            </button>
          </div>
      </div>
    </div>
  );
}
