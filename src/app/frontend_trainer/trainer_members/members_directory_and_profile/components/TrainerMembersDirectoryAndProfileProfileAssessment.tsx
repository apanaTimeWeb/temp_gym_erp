"use client";
// RESPONSIBILITY: Renders the TrainerMembersProfileAssessment route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { Activity, Save, Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/TrainerMembersDirectoryAndProfileuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/TrainerMembersDirectoryAndProfileuseTrainerInfrastructureIdempotencyKey';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/TrainerMembersDirectoryAndProfileuseTrainerInfrastructureUnsavedChangesGuard';

import { useTrainerMembersMutations } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileMutations';

import { useTrainerMembersSelectedMember } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileSelectedMember';

import { TrainerMembersTrainerMemberAssessmentSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileDomainSchemas';

import type { TrainerMembersTrainerMemberAssessment } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileTypes';














/**
 * @description Renders the TrainerMembersProfileAssessment route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders and coordinates the members feature form/modal surface for MembersProfileAssessment, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerMembersProfileAssessment() {
  const t = useTranslations('TRAINER_MEMBERS');
  const { member } = useTrainerMembersSelectedMember();
  const { updateAssessment, updateAssessmentPending } = useTrainerMembersMutations();
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const lastPayload = useRef<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<TrainerMembersTrainerMemberAssessment>({
    resolver: zodResolver(TrainerMembersTrainerMemberAssessmentSchema),
    defaultValues: member?.assessment || {
      medicalHistory: '',
      pastInjuries: '',
      vo2Max: undefined,
      flexibility: undefined,
      coreStrength: '',
      fitnessGoals: ''
    },
    mode: 'onTouched',
  });
  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(isDirty && !isSubmitting && !updateAssessmentPending);

// Effect contract: reconcile assessment-form defaults with the current member profile data.
  useEffect(() => {
    if (member?.assessment) {
      reset(member.assessment);
    }
  }, [member?.assessment, reset]);

  if (!member) return null;

  const handleAssessmentSubmit = async (data: TrainerMembersTrainerMemberAssessment) => {
    try {
      const actionId = `assessment-update-${member.id}`;
      const fingerprint = JSON.stringify(data);
      if (lastPayload.current !== null && lastPayload.current !== fingerprint) actionKeys.clear(actionId);
      lastPayload.current = fingerprint;
      const response = await updateAssessment({ id: member.id, assessment: data, idempotencyKey: actionKeys.begin(actionId) });
      showSuccess(response.message, actionId);
      actionKeys.clear(actionId);
      reset(data);
    } catch (err) {
      showError(err, 'assessment-error');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAssessmentSubmit)} className="space-y-6 motion-safe:transition-opacity motion-safe:duration-slow" data-testid="trainer_members-trainermembersprofileassessment-form_1">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border ">
        <div className="flex items-center gap-3 ">
          <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center ">
            <Activity size={18} className="text-primary "  strokeWidth={2}/>
          </div>
          <div>
            <h3 className="text-base font-semibold text-primary ">{t("TEXT_DAY_1_FITNESS_MEDICAL_ASSESSMENT")}</h3>
            <p className="text-sm text-secondary ">{t("TEXT_INITIAL_FITNESS_TEST_SCORES_AND_BASELINE_METRICS")}</p>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={!isDirty || isSubmitting || updateAssessmentPending}
          className="min-h-11 flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-50 motion-safe:transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
         data-testid="trainer_members-trainermembersprofileassessment-button_2">
          {isSubmitting ? <Loader2 size={18} className="motion-safe:animate-spin"  strokeWidth={2}/> : <Save size={18}  strokeWidth={2}/>}
          {t("TEXT_SAVE_ASSESSMENT")}</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="space-y-4 ">
          <div>
            <label htmlFor="trainer-member-medical-history" className="block text-sm font-bold text-primary mb-1 ">{t("TEXT_MEDICAL_HISTORY")}</label>
            <textarea id="trainer-member-medical-history" aria-invalid={Boolean(errors.medicalHistory)} aria-describedby={errors.medicalHistory ? "trainer-member-medical-history-error" : undefined}
              {...register('medicalHistory')} 
              placeholder={t("TEXT_ANY_KNOWN_MEDICAL_CONDITIONS")}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:border-focus resize-none h-24  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid="trainer_members-trainermembersprofileassessment-textarea_3"/>
            {errors.medicalHistory && <p id="trainer-member-medical-history-error" role="alert" className="text-xs text-danger mt-1 " data-testid="trainer_members-medical-history-error">{t("TEXT_TRAINER_MEMBER_MEDICAL_HISTORY_ERROR")}</p>}
          </div>
          <div>
            <label htmlFor="trainer-member-past-injuries" className="block text-sm font-bold text-primary mb-1 ">{t("TEXT_PAST_INJURIES")}</label>
            <textarea id="trainer-member-past-injuries" aria-invalid={Boolean(errors.pastInjuries)} aria-describedby={errors.pastInjuries ? "trainer-member-past-injuries-error" : undefined}
              {...register('pastInjuries')} 
              placeholder={t("TEXT_ANY_PAST_INJURIES")}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:border-focus resize-none h-24  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid="trainer_members-trainermembersprofileassessment-textarea_4"/>
            {errors.pastInjuries && <p id="trainer-member-past-injuries-error" role="alert" className="text-xs text-danger mt-1 " data-testid="trainer_members-past-injuries-error">{t("TEXT_TRAINER_MEMBER_PAST_INJURIES_ERROR")}</p>}
          </div>
          <div>
            <label htmlFor="trainer-member-fitness-goals" className="block text-sm font-bold text-primary mb-1 ">{t("TEXT_FITNESS_GOALS")}</label>
            <textarea id="trainer-member-fitness-goals" aria-invalid={Boolean(errors.fitnessGoals)} aria-describedby={errors.fitnessGoals ? "trainer-member-fitness-goals-error" : undefined}
              {...register('fitnessGoals')} 
              placeholder={t("TEXT_WHAT_DOES_THE_CLIENT_WANT_TO_ACHIEVE")}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:border-focus resize-none h-24  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid="trainer_members-trainermembersprofileassessment-textarea_5"/>
            {errors.fitnessGoals && <p id="trainer-member-fitness-goals-error" role="alert" className="text-xs text-danger mt-1 " data-testid="trainer_members-fitness-goals-error">{t("TEXT_TRAINER_MEMBER_FITNESS_GOALS_ERROR")}</p>}
          </div>
        </div>

        <div className="space-y-4 ">
          <div className="bg-input rounded-xl p-4 border border-border ">
            <label htmlFor="trainer-member-vo2" className="block text-sm font-bold text-secondary mb-1 ">{t("TEXT_VO2_MAX_ML_KG_MIN")}</label>
            <input id="trainer-member-vo2" min="0" aria-label={t("TEXT_VO2_MAX_ML_KG_MIN")} aria-invalid={Boolean(errors.vo2Max)} aria-describedby={errors.vo2Max ? "trainer-member-vo2-error" : undefined}
              type="number"
              step="0.1"
              {...register('vo2Max', { valueAsNumber: true })} 
              placeholder={t("TEXT_E_G_45")}
              className="w-full bg-transparent text-xl font-bold text-primary focus-visible:outline-none  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid="trainer_members-trainermembersprofileassessment-input_6"/>
            {errors.vo2Max && <p id="trainer-member-vo2-error" role="alert" className="text-xs text-danger mt-1 " data-testid="trainer_members-trainermembersprofileassessment-vo2-error">{t("TEXT_TRAINER_MEMBER_VO2_ERROR")}</p>}
          </div>
          <div className="bg-input rounded-xl p-4 border border-border ">
            <label htmlFor="trainer-member-flexibility" className="block text-sm font-bold text-secondary mb-1 ">{t("TEXT_FLEXIBILITY_SIT_REACH_IN_CM")}</label>
            <input id="trainer-member-flexibility" min="0" aria-label={t("TEXT_FLEXIBILITY_SIT_REACH_IN_CM")} aria-invalid={Boolean(errors.flexibility)} aria-describedby={errors.flexibility ? "trainer-member-flexibility-error" : undefined}
              type="number"
              step="0.1"
              {...register('flexibility', { valueAsNumber: true })} 
              placeholder={t("TEXT_E_G_15")}
              className="w-full bg-transparent text-xl font-bold text-primary focus-visible:outline-none  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid="trainer_members-trainermembersprofileassessment-input_7"/>
            {errors.flexibility && <p id="trainer-member-flexibility-error" role="alert" className="text-xs text-danger mt-1 " data-testid="trainer_members-trainermembersprofileassessment-flexibility-error">{t("TEXT_TRAINER_MEMBER_FLEXIBILITY_ERROR")}</p>}
          </div>
          <div className="bg-input rounded-xl p-4 border border-border ">
            <label htmlFor="trainer-member-core-strength" className="block text-sm font-bold text-secondary mb-1 ">{t("TEXT_CORE_STRENGTH")}</label>
            <input id="trainer-member-core-strength"
              type="text"
              aria-invalid={Boolean(errors.coreStrength)}
              {...register('coreStrength')} 
              placeholder={t("TEXT_E_G_2_30_PLANK")}
              className="w-full bg-transparent text-xl font-bold text-primary focus-visible:outline-none  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
             data-testid="trainer_members-trainermembersprofileassessment-input_8"/>
          </div>
        </div>
      </div>
    </form>
  );
}
