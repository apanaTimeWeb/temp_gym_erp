"use client";
import type { TrainerMembersProfileProps } from '../types/TrainerMembersMembersDirectoryAndProfileAuxiliaryTypes';
// RESPONSIBILITY: Renders a detailed view of a selected member's profile.
/**
 * @description Renders the selected Trainer member profile shell and its feature-owned profile sections/actions.
 * @dependencies Consumes the owning members feature state, member query data, and module-local action handlers.
 * @edge-cases Handles missing selection, nullable member fields, tab changes, communication actions, and return navigation without leaking sibling business state.
 */
import { MessageCircle, Mail } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import TrainerMembersProfileAssessment from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileProfileAssessment';

import TrainerMembersProfileAttendance from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileProfileAttendance';

import TrainerMembersProfileDiet from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileProfileDiet';

import TrainerMembersProfileFitness from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileProfileFitness';

import TrainerMembersProfileNotes from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileProfileNotes';

import TrainerMembersProfileOverview from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileProfileOverview';

import TrainerMembersProfileProgress from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileProfileProgress';

import TrainerMembersProfileWorkout from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileProfileWorkout';

import { TRAINER_MEMBERS_BILLING_CYCLE_LABEL_KEYS, TRAINER_MEMBERS_MEMBER_STATUS_LABEL_KEYS, TRAINER_MEMBERS_MEMBERS_STATUS_COLORS, TRAINER_MEMBERS_PROFILE_TABS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { useTrainerMembersSelectedMember } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileSelectedMember';
import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore';


import { TrainerMembersMaskSensitiveData, TrainerMembersFormatNumber } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';

import type { TrainerMembersProfileTab } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileProfileTypes';

















/**
 * @description Renders a detailed view of a selected member's profile.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the members feature's profile/detail surface and delegates server mutations through module-owned hooks.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */


export default function TrainerMembersProfileView({ activeView, onBackToList, onSelectView }: TrainerMembersProfileProps) {
  const t = useTranslations('TRAINER_MEMBERS');
  const locale = useLocale();
  const { member: selectedMember } = useTrainerMembersSelectedMember();
  const openMsg = useTrainerMembersStore(s => s.openMsg);

  if (!selectedMember) return null;

  const statusStyle = TRAINER_MEMBERS_MEMBERS_STATUS_COLORS[selectedMember.status] || { bg: 'bg-input', text: 'text-secondary' };

  return (
    <div className="min-h-full">
            <div className="p-6 space-y-5">
        <button type="button"
          onClick={onBackToList}
          className="min-h-11 text-sm text-secondary hover:text-primary flex items-center gap-1.5 motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:ease-in-out motion-safe:active:scale-95"
         data-testid="trainer_members-trainermembersprofile-button_1">
          {t("TEXT_BACK_TO_MEMBERS")}</button>

        {/* Profile Card */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-primary bg-primary-subtle">
                {selectedMember.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-section-title font-bold text-primary">{selectedMember.name}</h2>
                <p className="text-secondary text-sm">{selectedMember.email} · {TrainerMembersMaskSensitiveData(selectedMember.phone)}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`} data-testid={"trainer-trainermembersprofile-status-state-63"}>
                    {t(TRAINER_MEMBERS_MEMBER_STATUS_LABEL_KEYS[selectedMember.status] ?? 'TEXT_STATUS_UNKNOWN')}
                  </span>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info-bg text-info" data-testid="trainer_members-members-profile_status_state">
                    {displayValue(selectedMember.plan?.name)}
                  </span>
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-bg text-purple" data-testid="trainer_members-members-profile_billing_cycle">
                    {t(TRAINER_MEMBERS_BILLING_CYCLE_LABEL_KEYS[selectedMember.billingCycle as keyof typeof TRAINER_MEMBERS_BILLING_CYCLE_LABEL_KEYS] ?? 'TEXT_UNKNOWN')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button type="button"
                onClick={() => openMsg({ name: selectedMember.name, email: selectedMember.email, phone: selectedMember.phone }, 'whatsapp', '')}
                className="min-h-11 flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-success text-on-success rounded-xl hover:shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:ease-in-out"
               data-testid="trainer_members-trainermembersprofile-button_2">
                <MessageCircle size={18}  strokeWidth={2}/> {t("TEXT_WHATSAPP")}</button>
              <button type="button"
                onClick={() => openMsg({ name: selectedMember.name, email: selectedMember.email, phone: selectedMember.phone }, 'email', '')}
                className="min-h-11 flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-info text-on-info rounded-xl hover:shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:ease-in-out"
               data-testid="trainer_members-trainermembersprofile-button_3">
                <Mail size={18}  strokeWidth={2}/> {t("TEXT_EMAIL")}</button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: t("TEXT_MEMBER_ID"), value: selectedMember.membershipNumber ?? selectedMember.id },
              { label: t("TEXT_AGE"), value: selectedMember.age == null ? '—' : `${TrainerMembersFormatNumber(selectedMember.age, locale)} ${t('TEXT_YEARS')}` },
              { label: t("TEXT_GENDER"), value: displayValue(selectedMember.gender) },
              { label: t("TEXT_HEIGHT"), value: selectedMember.heightCm == null ? '—' : `${TrainerMembersFormatNumber(selectedMember.heightCm, locale)} ${t('TEXT_CM')}` },
              { label: t("TEXT_WEIGHT"), value: selectedMember.weightKg == null ? '—' : `${TrainerMembersFormatNumber(selectedMember.weightKg, locale)} ${t('TEXT_KG')}` },
              { label: t("TEXT_JOIN_DATE"), value: displayValue(selectedMember.joinDate) },
              { label: t("TEXT_EXPIRY_DATE"), value: displayValue(selectedMember.expiryDate) },
              { label: t("TEXT_FITNESS_GOAL"), value: displayValue(selectedMember.fitnessGoal) },
              { label: t("TEXT_ADDRESS"), value: displayValue(selectedMember.address) },
            ].map((f) => (
              <div key={f.label} className="bg-input rounded-lg p-3">
                <p className="text-xs text-secondary mb-0.5">{f.label}</p>
                <p className="text-sm font-semibold text-primary">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="flex border-b border-border overflow-x-auto custom-scrollbar">
            {TRAINER_MEMBERS_PROFILE_TABS.map(({ id, labelKey }) => (
              <button type="button"
                key={id}
                onClick={() => onSelectView(id as TrainerMembersProfileTab)}
                className={`whitespace-nowrap px-5 py-3.5 text-sm font-medium motion-safe:transition-all motion-safe:duration-base border-b-2 ${
                  activeView === id
                    ? 'text-primary bg-primary-subtle border-focus'
                    : 'border-transparent text-secondary hover:text-primary'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:ease-in-out motion-safe:active:scale-95`}
               data-testid={`trainer_members-members-profile-tab-${id}`}>
                {t(labelKey)}
              </button>
            ))}
          </div>

          <div className="p-5 min-h-64">
            {activeView === 'overview' && <TrainerMembersProfileOverview />}
            {activeView === 'attendance' && <TrainerMembersProfileAttendance />}
            {activeView === 'fitness' && <TrainerMembersProfileFitness />}
            {activeView === 'assessment' && <TrainerMembersProfileAssessment />}
            {activeView === 'progress' && <TrainerMembersProfileProgress />}
            {activeView === 'workout' && <TrainerMembersProfileWorkout />}
            {activeView === 'diet' && <TrainerMembersProfileDiet />}
            {activeView === 'notes' && <TrainerMembersProfileNotes />}
          </div>
        </div>
      </div>
    </div>
  );
}




export type { TrainerMembersProfileProps } from '../types/TrainerMembersMembersDirectoryAndProfileAuxiliaryTypes';
