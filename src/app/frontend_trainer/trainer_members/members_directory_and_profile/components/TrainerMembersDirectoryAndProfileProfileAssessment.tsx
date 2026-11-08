"use client";
// RESPONSIBILITY: Renders the TrainerMembersProfileAssessment route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { Activity, Save, Loader2, AlertCircle, CheckCircle2, HeartPulse, ShieldAlert } from 'lucide-react';

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
    watch,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<TrainerMembersTrainerMemberAssessment>({
    resolver: zodResolver(TrainerMembersTrainerMemberAssessmentSchema),
    defaultValues: member?.assessment || {
      medicalHistory: '',
      pastInjuries: '',
      vo2Max: undefined,
      flexibility: undefined,
      coreStrength: '',
      fitnessGoals: '',
      parqHeartCondition: false,
      parqChestPainActivity: false,
      parqChestPainRest: false,
      parqDizzinessOrBalance: false,
      parqBoneOrJointIssue: false,
      parqMedicationPrescribed: false,
      parqOtherReason: false,
      parqCleared: true,
      medicalClearanceRequired: false,
    },
    mode: 'onTouched',
  });
  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(isDirty && !isSubmitting && !updateAssessmentPending);

  const q1 = watch('parqHeartCondition');
  const q2 = watch('parqChestPainActivity');
  const q3 = watch('parqChestPainRest');
  const q4 = watch('parqDizzinessOrBalance');
  const q5 = watch('parqBoneOrJointIssue');
  const q6 = watch('parqMedicationPrescribed');
  const q7 = watch('parqOtherReason');
  const hasAnyParqRisk = Boolean(q1 || q2 || q3 || q4 || q5 || q6 || q7);

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
      const payload: TrainerMembersTrainerMemberAssessment = {
        ...data,
        parqCleared: !hasAnyParqRisk,
        medicalClearanceRequired: hasAnyParqRisk,
      };
      const fingerprint = JSON.stringify(payload);
      if (lastPayload.current !== null && lastPayload.current !== fingerprint) actionKeys.clear(actionId);
      lastPayload.current = fingerprint;
      const response = await updateAssessment({ id: member.id, assessment: payload, idempotencyKey: actionKeys.begin(actionId) });
      showSuccess(response.message, actionId);
      actionKeys.clear(actionId);
      reset(payload);
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

      {/* Physical Activity Readiness Questionnaire (PAR-Q) Section */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4" data-testid="trainer_members-parq-section">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-subtle text-primary flex items-center justify-center">
              <HeartPulse size={18} strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-base font-semibold text-primary">Physical Activity Readiness Questionnaire (PAR-Q)</h4>
              <p className="text-xs text-secondary">Pre-exercise screening questionnaire to determine training safety.</p>
            </div>
          </div>
          {hasAnyParqRisk ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-danger/15 text-danger border border-danger/30" role="alert" data-testid="trainer_members-parq-risk-badge">
              <ShieldAlert size={14} strokeWidth={2} />
              Medical Clearance Required
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-success/15 text-success border border-success/30" data-testid="trainer_members-parq-cleared-badge">
              <CheckCircle2 size={14} strokeWidth={2} />
              PAR-Q Cleared (Ready for Training)
            </span>
          )}
        </div>

        {hasAnyParqRisk && (
          <div className="p-3 bg-danger-bg border border-danger/30 rounded-lg text-xs text-danger flex items-start gap-2" role="alert">
            <AlertCircle size={16} className="shrink-0 mt-0.5" strokeWidth={2} />
            <p>
              <strong>Notice:</strong> One or more health risk indicators checked &apos;Yes&apos;. The client must obtain physician medical clearance before participating in vigorous or high-intensity exercise routines.
            </p>
          </div>
        )}

        <div className="divide-y divide-border/60">
          {[
            { key: 'parqHeartCondition' as const, label: '1. Has your doctor ever said that you have a heart condition and should only do medically supervised exercise?' },
            { key: 'parqChestPainActivity' as const, label: '2. Do you feel pain or heaviness in your chest when engaging in physical activity?' },
            { key: 'parqChestPainRest' as const, label: '3. In the past 30 days, have you experienced chest pain when you were not doing physical activity?' },
            { key: 'parqDizzinessOrBalance' as const, label: '4. Do you frequently lose balance because of dizziness or have you ever lost consciousness?' },
            { key: 'parqBoneOrJointIssue' as const, label: '5. Do you have a bone, joint, or spine problem (e.g., lower back, knee, hip) aggravated by exercise?' },
            { key: 'parqMedicationPrescribed' as const, label: '6. Is your physician currently prescribing prescription medications for blood pressure or heart conditions?' },
            { key: 'parqOtherReason' as const, label: '7. Do you know of any other reason or medical concern why you should not follow an exercise program?' },
          ].map((question) => (
            <label key={question.key} className="flex items-start justify-between gap-4 py-3 cursor-pointer hover:bg-input/40 px-2 rounded-lg transition-colors">
              <span className="text-xs text-primary font-medium leading-relaxed">{question.label}</span>
              <input
                type="checkbox"
                {...register(question.key)}
                className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-focus"
                data-testid={`trainer_members-parq-${question.key}`}
              />
            </label>
          ))}
        </div>
      </div>
    </form>
  );
}
