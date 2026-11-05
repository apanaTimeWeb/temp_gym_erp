"use client";
// RESPONSIBILITY: Renders fitness and medical information sourced from the selected Trainer member API record.
// DATA FLOW: member detail Query → TrainerMembersProfileFitness → read-only fitness cards.
import { Activity, HeartPulse, Scale, Target } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import { useTrainerMembersSelectedMember } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileSelectedMember';

import { TrainerMembersFormatNumber } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';






/**
 * @description Renders fitness and medical information sourced from the selected Trainer member API record.
 * @dependencies member detail Query → TrainerMembersProfileFitness → read-only fitness cards.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the members feature UI responsibility represented by TrainerMembersProfileFitness, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersProfileFitness() {
  const t = useTranslations('TRAINER_MEMBERS');
  const locale = useLocale();
  const { member } = useTrainerMembersSelectedMember();
  if (!member) return null;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-input rounded-xl p-4 flex items-start gap-4"><div className="p-3 bg-primary-subtle rounded-lg text-primary"><Target size={18}  strokeWidth={2}/></div><div><h4 className="font-semibold text-primary">{t("TEXT_FITNESS_GOAL")}</h4><p className="text-sm text-secondary mt-1">{displayValue(member.fitnessGoal)}</p></div></div>
        <div className="bg-input rounded-xl p-4 flex items-start gap-4"><div className="p-3 bg-info-bg rounded-lg text-info" data-testid={"trainer_members-trainer_members-profile-info-state-22-1"}><Activity size={18}  strokeWidth={2}/></div><div><h4 className="font-semibold text-primary">{t("TEXT_FITNESS_LEVEL")}</h4><p className="text-sm text-secondary mt-1">{displayValue(member.fitnessLevel)}</p></div></div>
        <div className="bg-input rounded-xl p-4 flex items-start gap-4"><div className="p-3 bg-warning-bg rounded-lg text-warning" data-testid={"trainer_members-trainer_members-profile-warning-state-23-2"}><Scale size={18}  strokeWidth={2}/></div><div><h4 className="font-semibold text-primary">{t("TEXT_BMI_TARGET")}</h4><p className="text-sm text-secondary mt-1">{t("TEXT_CURRENT_BMI")}{member.bmi == null ? '—' : TrainerMembersFormatNumber(member.bmi, locale)}</p><p className="text-sm text-secondary">{t("TEXT_TARGET_WEIGHT")}{member.targetWeightKg == null ? '—' : `${TrainerMembersFormatNumber(member.targetWeightKg, locale)} ${t('TEXT_KG')}`}</p></div></div>
        <div className="bg-input rounded-xl p-4 flex items-start gap-4"><div className="p-3 bg-danger-bg rounded-lg text-danger" data-testid={"trainer_members-trainer_members-profile-danger-state-24-3"}><HeartPulse size={18}  strokeWidth={2}/></div><div><h4 className="font-semibold text-primary">{t("TEXT_MEDICAL_RESTRICTIONS")}</h4><p className="text-sm text-secondary mt-1">{displayValue(member.medicalRestrictions)}</p></div></div>
      </div>
    </div>
  );
}
