"use client";
// RESPONSIBILITY: Renders the member's assigned diet plan and handles diet plan assignment for trainers.
// DATA FLOW: Members selected-member state -> profile view -> feature-local member API contract

import { useState } from 'react';

import { Apple, Plus, Check, Loader2, MessageCircle, RefreshCw, Flame, Utensils } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/TrainerMembersDirectoryAndProfileuseTrainerInfrastructureIdempotencyKey';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructureSearchableDropdown';

import { useTrainerMembersMutations } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileMutations';

import { useTrainerMembersMemberDietPlansQuery } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileProfileQueries';

import { useTrainerMembersSelectedMember } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileSelectedMember';


import { TrainerMembersFormatNumber } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';

import { TrainerMembersBuildWhatsAppUrl } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileBuildWhatsAppUrl';












/**
 * @description Renders the member's assigned diet plan and handles diet plan assignment for trainers.
 * @dependencies Members selected-member state -> profile view -> feature-local member API contract
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the members feature UI responsibility represented by TrainerMembersProfileDiet, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersProfileDiet() {
  const locale = useLocale();
  const t = useTranslations('TRAINER_MEMBERS');
  const { member: selectedMember } = useTrainerMembersSelectedMember();
  const { assignDiet } = useTrainerMembersMutations();
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedDietId, setSelectedDietId] = useState('');
  const [saving, setSaving] = useState(false);
  const [assignError, setAssignError] = useState(false);
  const dietsQuery = useTrainerMembersMemberDietPlansQuery(isAssigning);
  const availableDiets = dietsQuery.data ?? [];

  if (!selectedMember) return null;

  const diet = selectedMember.assignedDiet;
  const hasDietPlan = !!diet;

  const handleAssign = async () => {
    if (!selectedDietId || saving) return;
    const selected = availableDiets.find((d) => String(d.id) === selectedDietId) || null;
    if (!selected) { setAssignError(true); return; }
    setAssignError(false);
    setSaving(true);
    const actionId = `assign-diet-${selectedMember.id}`;
    try {
      await assignDiet({ id: selectedMember.id, diet: selected, idempotencyKey: actionKeys.begin(actionId) });
      setIsAssigning(false);
      setSelectedDietId('');
      actionKeys.clear(actionId);
    } catch {
      // Preserve the selected plan and idempotency key for safe retry.
      setAssignError(true);
    } finally {
      setSaving(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!diet) return;
    const mealsText = Array.isArray(diet.meals) 
      ? diet.meals.map((m: string | { name?: string; time?: string; items?: string; description?: string }, i: number) => typeof m === 'string' ? `• ${m}` : `• *${m.name || `${t('TEXT_MEAL')} ${i + 1}`}* (${m.time || ''}): ${m.items || m.description || ''}`).join('\n')
      : t('TEXT_FOLLOW_BALANCED_NUTRITION');;

    const text = [
      t('TEXT_WHATSAPP_DIET_HEADER', { name: selectedMember.name.toUpperCase() }),
      t('TEXT_WHATSAPP_DIET_PLAN', { plan: diet.name }),
      t('TEXT_WHATSAPP_DIET_GOAL', { goal: String(displayValue(diet.goal)) }),
      t('TEXT_WHATSAPP_DIET_CALORIES', { calories: String(displayValue(diet.calories)) }),
      t('TEXT_WHATSAPP_DIET_MACROS', {
        protein: String(displayValue(diet.protein)),
        carbs: String(displayValue(diet.carbs)),
        fats: String(displayValue(diet.fats)),
      }),
      '',
      t('TEXT_WHATSAPP_MEAL_SCHEDULE'),
      mealsText,
    ].join('\n');
    const handoffUrl = TrainerMembersBuildWhatsAppUrl(selectedMember.phone ?? '', text);
    if (handoffUrl) {
      const popup = window.open(handoffUrl, '_blank', 'noopener,noreferrer');
      if (popup) {
        try {
          popup.opener = null;
        } catch {
          // ignore restricted environments
        }
      }
    }
  };

  return (
    <div className="space-y-6 motion-safe:transition-opacity motion-safe:duration-slow">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-primary">{t("TEXT_DIET_NUTRITION_PLAN")}</h3>
          <p className="text-sm text-secondary">{t('TEXT_MANAGE_AND_CUSTOMIZE_DAILY_MEAL_REQUIREMENTS_FOR', { name: selectedMember.name })}</p>
        </div>
        <div className="flex items-center gap-2">
          {hasDietPlan ? (
            <>
              <button type="button" 
                onClick={handleShareWhatsApp}
                disabled={!TrainerMembersBuildWhatsAppUrl(selectedMember.phone ?? '', '')}
                className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-4 py-2 bg-success text-on-success rounded-xl text-sm font-semibold hover:bg-primary-hover shadow-card motion-safe:transition-all motion-safe:active:scale-95 motion-safe:duration-base motion-safe:ease-in-out" data-testid="trainer_members-trainermembersprofilediet-button_1">
                <MessageCircle size={18}  strokeWidth={2}/> {t("TEXT_SHARE_VIA_WHATSAPP")}</button>
              <button type="button" 
                onClick={() => {
                  setSelectedDietId(diet.id || '');
                  setIsAssigning(true);
                  setAssignError(false);
                }}
                className="min-h-11 flex items-center gap-2 px-4 py-2 bg-input text-primary border border-border rounded-xl text-sm font-semibold hover:bg-primary-subtle motion-safe:transition-all motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base motion-safe:ease-in-out" data-testid="trainer_members-trainermembersprofilediet-button_2">
                <RefreshCw size={18}  strokeWidth={2}/> {t("TEXT_CHANGE_DIET")}</button>
            </>
          ) : !isAssigning ? (
            <button type="button" 
              onClick={() => setIsAssigning(true)}
              className="min-h-11 flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:shadow-card hover:border-focus motion-safe:transition-all motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base motion-safe:ease-in-out" data-testid="trainer_members-trainermembersprofilediet-button_3">
              <Plus size={18}  strokeWidth={2}/> {t("TEXT_ASSIGN_DIET_PLAN")}</button>
          ) : null}
        </div>
      </div>

      {/* Plan Assignment Box */}
      {isAssigning && (
        <div className="bg-card border border-focus p-5 rounded-2xl space-y-4 shadow-card">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-primary flex items-center gap-2">
              <Apple size={18}  strokeWidth={2}/> {t("TEXT_SELECT_DIET_PLAN_FROM_LIBRARY")}</h4>
            <button type="button" 
              onClick={() => setIsAssigning(false)}
              className="min-h-11 text-xs text-secondary hover:text-primary font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersprofilediet-button_4">
              {t("TEXT_CANCEL")}</button>
          </div>

          {dietsQuery.isError ? (
            <div role="alert" className="rounded-lg bg-danger-bg p-3 text-sm text-danger">
              <p>{t('TEXT_GENERIC_REQUEST_ERROR')}</p>
              <button type="button" className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:ring-2 focus-visible:ring-focus-ring" onClick={() => void dietsQuery.refetch()}>{t('TEXT_RETRY')}</button>
            </div>
          ) : dietsQuery.isPending ? (
            <p className="text-sm text-secondary py-3">{t("TEXT_LOADING_AVAILABLE_DIET_PLANS")}</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <TrainerInfrastructureSearchableDropdown
                options={availableDiets.map((diet) => ({ value: diet.id, label: `${diet.name} · ${displayValue(diet.goal)}` }))}
                value={selectedDietId}
                onChange={(value: string | number) => { setSelectedDietId(String(value)); setAssignError(false); actionKeys.clear(`assign-diet-${selectedMember.id}`); }}
                placeholder={t("TEXT_CHOOSE_A_DIET_PLAN")}
                ariaLabel={t("TEXT_CHOOSE_A_DIET_PLAN")}
                className="w-full"
               testId="trainer-members-members-profile-diet-choose-a-diet-plan"/>
              <div className="flex gap-2">
                <button type="button" 
                  onClick={handleAssign}
                  disabled={!selectedDietId || saving}
                  className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-40 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:shadow-card motion-safe:transition-all disabled:opacity-50 flex items-center gap-2 motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersprofilediet-button_6">
                  {saving ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t("TEXT_ASSIGNING_B89E1D")}</> : <><Check size={18} strokeWidth={2} />{t("TEXT_CONFIRM_ASSIGNMENT")}</>}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {assignError && <p role="alert" className="rounded-lg bg-danger-bg p-3 text-sm text-danger">{t('TEXT_GENERIC_REQUEST_ERROR')}</p>}

      {/* Active Diet Display */}
      {hasDietPlan ? (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-bg text-success" data-testid={"trainer_members-trainer_members-profile-success-state-143-1"}>
                  {t("TEXT_ACTIVE_DIET")}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info-bg text-info" data-testid={"trainer_members-trainer_members-profile-info-state-145-2"}>
                  {displayValue(diet.goal)}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-primary">{diet.name}</h3>
              <p className="text-sm text-secondary mt-1">{displayValue(diet.description)}</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-floating border border-border rounded-xl px-4 py-3 text-end">
                <p className="text-xs text-secondary">{t("TEXT_DIET_COMPLIANCE")}</p>
                <div className="flex items-center justify-end gap-2 mt-1">
                  <div className="h-2 w-16 bg-input rounded-full overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 100 1" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true"><rect width={Math.max(0, Math.min(100, diet.complianceScore ?? 0))} height="1" fill="currentColor" className="text-success" /></svg>
                  </div>
                  <p className="text-xl font-black text-primary">{diet.complianceScore == null ? '—' : TrainerMembersFormatNumber(diet.complianceScore, locale)}%</p>
                </div>
              </div>
              <div className="bg-floating border border-border rounded-xl px-4 py-3 text-end">
                <p className="text-xs text-secondary">{t("TEXT_TARGET_DAILY_CALORIES")}</p>
                <p className="text-2xl font-black text-primary flex items-center gap-1 justify-end">
                  <Flame size={18} className="text-danger"  strokeWidth={2}/> {diet.calories == null ? '—' : TrainerMembersFormatNumber(diet.calories, locale)} <span className="text-xs text-secondary font-normal">{t("TEXT_KCAL")}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Macro Breakdown */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-floating border border-border rounded-xl p-4 text-center">
              <p className="text-xs text-secondary font-medium">{t("TEXT_PROTEIN_26ED35")}</p>
              <p className="text-xl font-bold text-info mt-0.5">{diet.protein == null ? '—' : TrainerMembersFormatNumber(diet.protein, locale)}{t("TEXT_G")}</p>
            </div>
            <div className="bg-floating border border-border rounded-xl p-4 text-center">
              <p className="text-xs text-secondary font-medium">{t("TEXT_CARBOHYDRATES")}</p>
              <p className="text-xl font-bold text-warning mt-0.5">{diet.carbs == null ? '—' : TrainerMembersFormatNumber(diet.carbs, locale)}{t("TEXT_G")}</p>
            </div>
            <div className="bg-floating border border-border rounded-xl p-4 text-center">
              <p className="text-xs text-secondary font-medium">{t("TEXT_HEALTHY_FATS")}</p>
              <p className="text-xl font-bold text-purple mt-0.5">{diet.fats == null ? '—' : TrainerMembersFormatNumber(diet.fats, locale)}{t("TEXT_G")}</p>
            </div>
          </div>

          {/* Meals Schedule */}
          <div>
            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
              <Utensils size={18}  strokeWidth={2}/> {t("TEXT_DAILY_MEAL_SCHEDULE")}</h4>
            {diet.meals && diet.meals.length > 0 ? (
              <div className="space-y-2.5">
                {diet.meals.map((meal: string | { name?: string; time?: string; items?: string; description?: string }, idx: number) => (
                  <div key={typeof meal === 'string' ? `${meal}-${idx}` : `${meal.name}-${idx}`} className="bg-floating border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-primary-subtle text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-primary">
                          {typeof meal === 'string' ? `Meal ${idx + 1}` : meal.name || `Meal ${idx + 1}`}
                        </p>
                        <p className="text-xs text-secondary mt-0.5">
                          {typeof meal === 'string' ? meal : meal.items || meal.description || t('TEXT_NUTRITIONAL_ITEMS_AS_PLANNED')}
                        </p>
                      </div>
                    </div>
                    {typeof meal !== 'string' && meal.time && (
                      <span className="text-xs font-medium text-secondary bg-page px-2.5 py-1 rounded-md border border-border w-fit">
                        {meal.time}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-floating border border-dashed border-border rounded-xl p-6 text-center text-secondary text-sm">
                {t("TEXT_NO_INDIVIDUAL_MEAL_ENTRIES_LISTED_FOLLOW_523B8209")}</div>
            )}
          </div>
        </div>
      ) : !isAssigning ? (
        <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-success-bg text-success flex items-center justify-center mx-auto" data-testid={"trainer_members-trainer_members-profile-success-state-224-3"}>
            <Apple size={18}  strokeWidth={2}/>
          </div>
          <h4 className="text-lg font-bold text-primary">{t("TEXT_NO_DIET_PLAN_ASSIGNED")}</h4>
          <p className="text-sm text-secondary max-w-md mx-auto">
            {selectedMember.name} {t("TEXT_DOES_NOT_HAVE_AN_ACTIVE_NUTRITION_PLAN_A_6056E8DF")}</p>
          <button type="button"
            onClick={() => setIsAssigning(true)}
            className="min-h-11 mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:shadow-card motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersprofilediet-button_7">
            <Plus size={18}  strokeWidth={2}/> {t("TEXT_ASSIGN_DIET_PLAN")}</button>
        </div>
      ) : null}
    </div>
  );
}

