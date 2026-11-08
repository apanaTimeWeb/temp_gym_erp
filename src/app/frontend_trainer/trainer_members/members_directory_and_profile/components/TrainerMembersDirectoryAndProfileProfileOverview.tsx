"use client";
// RESPONSIBILITY: Renders member overview metrics, recent progress, and trainer-safe contact actions using API-backed data.
import { MessageCircle, Mail, Target, Award, AlertTriangle } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructureSkeletonBlock';

import { useTrainerMembersMemberProgressEntriesQuery } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileProfileQueries';

import { useTrainerMembersSelectedMember } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileSelectedMember';

import { TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_LABEL_KEYS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore';

import { TrainerMembersFormatDate, TrainerMembersFormatNumber } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';


// DATA FLOW: selectedMemberId → TanStack Query member/progress data → TrainerMembersProfileOverview.







/**
 * @description Renders member overview metrics, recent progress, and trainer-safe contact actions using API-backed data.
 * @dependencies selectedMemberId → TanStack Query member/progress data → TrainerMembersProfileOverview.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the members feature UI responsibility represented by TrainerMembersProfileOverview, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersProfileOverview() {
  const t = useTranslations('TRAINER_MEMBERS');
  const locale = useLocale();
  const { member: selectedMember } = useTrainerMembersSelectedMember();
  const openMsg = useTrainerMembersStore((state) => state.openMsg);
  const progressQuery = useTrainerMembersMemberProgressEntriesQuery(selectedMember?.id ?? '');
  const progressEntries = progressQuery.data ?? [];
  const isPending = progressQuery.isPending;
  if (!selectedMember) return null;
  const latest = progressEntries.at(-1);
  const previous = progressEntries.at(-2);
  const weightChange = latest && previous ? latest.weightKg - previous.weightKg : null;
  return <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
    <div className="xl:col-span-2 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl"><p className="text-xs text-secondary mb-1">{t("TEXT_FITNESS_GOAL")}</p><p className="text-sm font-semibold text-primary">{displayValue(selectedMember.fitnessGoal)}</p></div>
        <div className="bg-card border border-border p-4 rounded-xl"><p className="text-xs text-secondary mb-1">{t("TEXT_DAYS_SINCE_LAST_CHECK_IN")}</p><p className="text-sm font-semibold text-primary">{displayValue(selectedMember.daysSinceLastCheckIn)}</p></div>
      </div>
      {(selectedMember.isPT || selectedMember.ptPackage) && (
        <div className="bg-card border border-border p-5 rounded-xl space-y-3" data-testid="trainer_members-pt-session-balance-card">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-subtle text-primary flex items-center justify-center">
                <Award size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-secondary font-medium">{selectedMember.plan?.name ?? "Personal Training Plan"}</p>
                <h4 className="text-sm font-bold text-primary">{selectedMember.ptPackage?.packageName ?? "Personal Training 1-on-1"}</h4>
              </div>
            </div>
            {selectedMember.ptPackage && typeof selectedMember.ptPackage.remainingSessions === 'number' && selectedMember.ptPackage.remainingSessions <= 2 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-warning/15 text-warning border border-warning/30" role="alert" data-testid="trainer_members-pt-low-balance-alert">
                <AlertTriangle size={14} strokeWidth={2} />
                Low Balance ({selectedMember.ptPackage.remainingSessions} remaining)
              </span>
            )}
          </div>
          {selectedMember.ptPackage?.totalSessions ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-secondary">
                <span>Completed: {selectedMember.ptPackage.completedSessions ?? 0} / {selectedMember.ptPackage.totalSessions} sessions</span>
                <span>{Math.round(((selectedMember.ptPackage.completedSessions ?? 0) / selectedMember.ptPackage.totalSessions) * 100)}%</span>
              </div>
              <div className="w-full h-2.5 bg-input rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round(((selectedMember.ptPackage.completedSessions ?? 0) / selectedMember.ptPackage.totalSessions) * 100))}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="bg-input/60 rounded-lg p-2">
                  <p className="text-xs text-secondary">Total</p>
                  <p className="text-sm font-bold text-primary">{selectedMember.ptPackage.totalSessions}</p>
                </div>
                <div className="bg-input/60 rounded-lg p-2">
                  <p className="text-xs text-secondary">Completed</p>
                  <p className="text-sm font-bold text-primary">{selectedMember.ptPackage.completedSessions ?? 0}</p>
                </div>
                <div className="bg-input/60 rounded-lg p-2">
                  <p className="text-xs text-secondary">Remaining</p>
                  <p className={`text-sm font-bold ${(selectedMember.ptPackage.remainingSessions ?? 0) <= 2 ? 'text-warning font-extrabold' : 'text-primary'}`}>
                    {selectedMember.ptPackage.remainingSessions ?? (selectedMember.ptPackage.totalSessions - (selectedMember.ptPackage.completedSessions ?? 0))}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-secondary">Active Personal Training Client (Package session tracker pending enrollment details).</p>
          )}
        </div>
      )}
      <div><h3 className="font-semibold text-primary mb-3">{t("TEXT_PHYSICAL_PROGRESS")}</h3><div className="bg-card border border-border p-4 rounded-xl min-h-48">
        {isPending ? <div className="space-y-4" aria-busy="true">{[1,2,3].map((row) => <TrainerInfrastructureSkeletonBlock key={row} className="h-4 rounded" />)}</div> : progressQuery.isError ? <div role="alert" className="space-y-2 text-sm text-danger"><p>{t('TEXT_UNABLE_TO_LOAD_PROGRESS_DATA_RETRY_THE_P_82DE8426')}</p><button type="button" onClick={() => void progressQuery.refetch()} className="min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_REFRESH')}</button></div> : latest ? <div className="space-y-4"><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-sm text-secondary">{t("TEXT_LATEST")}{TrainerMembersFormatDate(latest.date, locale)}</span><span className="text-sm font-semibold text-primary">{latest.weightKg == null ? '—' : TrainerMembersFormatNumber(latest.weightKg, locale)} {t("TEXT_KG")}</span></div><div className="grid grid-cols-2 sm:grid-cols-4 gap-3"><div><p className="text-xs text-secondary">{t("TEXT_BMI")}</p><p className="font-semibold text-primary">{latest.bmi == null ? '—' : TrainerMembersFormatNumber(latest.bmi, locale)}</p></div><div><p className="text-xs text-secondary">{t("TEXT_BODY_FAT_13AEEC")}</p><p className="font-semibold text-primary">{displayValue(latest.bodyFatPercent)}{latest.bodyFatPercent != null ? '%' : ''}</p></div><div><p className="text-xs text-secondary">{t("TEXT_MUSCLE_MASS")}</p><p className="font-semibold text-primary">{displayValue(latest.muscleMassKg)}{latest.muscleMassKg != null ? t("TEXT_KG_77C51F") : ''}</p></div><div><p className="text-xs text-secondary">{t("TEXT_WEIGHT_CHANGE")}</p><p className="font-semibold text-primary">{weightChange == null ? '—' : `${weightChange > 0 ? '+' : ''}${TrainerMembersFormatNumber(weightChange, locale)} ${t('TEXT_KG')}`}</p></div></div></div> : <p className="text-sm text-secondary">{t("TEXT_NO_PROGRESS_MEASUREMENTS_AVAILABLE")}</p>}
      </div></div>
    </div>
    <div><h3 className="font-semibold text-primary mb-3">{t("TEXT_MEMBER_ACTIONS")}</h3><div className="bg-floating rounded-xl p-4 mb-4 border border-border"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-primary-subtle text-primary flex items-center justify-center"><Target size={18}  strokeWidth={2}/></div><div><p className="text-xs text-secondary">{t("TEXT_COACHING_STATUS")}</p><p className="text-sm font-semibold text-primary">{t(TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_LABEL_KEYS[selectedMember.progressStatus ?? ''] ?? 'TEXT_PROGRESS_UNKNOWN')}</p></div></div></div><div className="flex flex-col gap-2"><button type="button" onClick={() => openMsg({ name: selectedMember.name, phone: selectedMember.phone, email: selectedMember.email }, 'whatsapp', '')} className="min-h-11 flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-success rounded-xl justify-center bg-success motion-safe:transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersprofileoverview-button_1"><MessageCircle size={18}  strokeWidth={2}/>{t("TEXT_SEND_WHATSAPP")}</button><button type="button" onClick={() => openMsg({ name: selectedMember.name, phone: selectedMember.phone, email: selectedMember.email }, 'email', '')} className="min-h-11 flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-success rounded-xl justify-center bg-info text-on-info motion-safe:transition-colors hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersprofileoverview-button_2"><Mail size={18}  strokeWidth={2}/>{t("TEXT_SEND_EMAIL")}</button></div></div>
  </div>;
}
