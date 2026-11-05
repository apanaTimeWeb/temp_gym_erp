"use client";
// RESPONSIBILITY: Renders API-backed member measurements and progress photos; no hardcoded member measurements.
import { Camera, Calculator } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import Image from 'next/image';

import { displayValue } from '@/lib/display_value';
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructureSkeletonBlock';

import { useTrainerMembersMemberProgressEntriesQuery } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileProfileQueries';

import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore';

import { TrainerMembersFormatDate, TrainerMembersFormatNumber } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';


// DATA FLOW: selectedMemberId → TanStack Query progress entries → derived latest/first measurements → UI.







/**
 * @description Renders API-backed member measurements and progress photos; no hardcoded member measurements.
 * @dependencies selectedMemberId → TanStack Query progress entries → derived latest/first measurements → UI.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the members feature UI responsibility represented by TrainerMembersProfileProgress, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersProfileProgress() {
  const locale = useLocale();
  const t = useTranslations('TRAINER_MEMBERS');
  const memberId = useTrainerMembersStore((state) => state.selectedMemberId);
  const progressQuery = useTrainerMembersMemberProgressEntriesQuery(memberId ?? '');
  const { data: entries = [], isPending, isError, refetch } = progressQuery;
  if (!memberId) return null;
  if (isPending) return <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><TrainerInfrastructureSkeletonBlock className="h-56 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-56 rounded-xl" /></div>;
  if (isError) return <div role="alert" className="rounded-xl border border-border bg-danger-bg p-4 text-danger" data-testid={"trainer_members-trainer_members-profile-danger-state-23-1"}><p>{t("TEXT_UNABLE_TO_LOAD_PROGRESS_DATA_RETRY_THE_P_82DE8426")}</p><button type="button" onClick={() => void refetch()} className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t("TEXT_REFRESH")}</button></div>;
  const ordered = [...entries].sort((a,b) => a.date.localeCompare(b.date));
  const latest = ordered.at(-1);
  const first = ordered.at(0);
  const delta = latest && first ? latest.weightKg - first.weightKg : null;
  const metrics = latest ? [
    [t('TEXT_WEIGHT'), `${TrainerMembersFormatNumber(latest.weightKg, locale)} ${t('TEXT_KG')}`, delta === null ? '—' : `${delta >= 0 ? '+' : ''}${TrainerMembersFormatNumber(delta, locale)} ${t('TEXT_KG')}`],
    [t('TEXT_BODY_FAT_13AEEC'), latest.bodyFatPercent == null ? '—' : `${TrainerMembersFormatNumber(latest.bodyFatPercent, locale)}%`, latest.bodyFatPercent == null || first?.bodyFatPercent == null ? '—' : `${TrainerMembersFormatNumber(latest.bodyFatPercent - first.bodyFatPercent, locale)}%`],
    [t('TEXT_CHEST'), latest.chestCm == null ? '—' : `${TrainerMembersFormatNumber(latest.chestCm, locale)} ${t('TEXT_CM')}`, ''],
    [t('TEXT_WAIST'), latest.waistCm == null ? '—' : `${TrainerMembersFormatNumber(latest.waistCm, locale)} ${t('TEXT_CM')}`, ''],
    [t('TEXT_MUSCLE_MASS'), latest.muscleMassKg == null ? '—' : `${TrainerMembersFormatNumber(latest.muscleMassKg, locale)} ${t('TEXT_KG')}`, ''],
  ] : [];
  const bmi = latest?.bmi ?? null;
  return <div className="space-y-6">
    <div className="flex items-center justify-between"><h3 className="font-bold text-primary">{t("TEXT_PROGRESS_MEASUREMENTS")}</h3><span className="text-xs text-secondary">{t("TEXT_SOURCE_TRAINER_PROGRESS_API")}</span></div>
    {latest ? <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">{metrics.map(([label,current,change]) => <div key={label} className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-secondary mb-1">{label}</p><p className="text-lg font-bold text-primary">{current}</p><p className="text-xs text-secondary mt-1">{displayValue(change)}</p></div>)}</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-card border border-border rounded-xl p-5"><h4 className="font-semibold text-primary mb-4">{t("TEXT_MEASUREMENT_HISTORY")}</h4><div className="space-y-3">{ordered.map((entry) => <div key={entry.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3"><span className="text-sm text-secondary">{TrainerMembersFormatDate(entry.date, locale)}</span><span className="text-sm font-semibold">{entry.weightKg == null ? '—' : `${TrainerMembersFormatNumber(entry.weightKg, locale)} ${t('TEXT_KG')}`}</span><span className="text-sm text-secondary">{t("TEXT_BMI")}{entry.bmi == null ? '—' : TrainerMembersFormatNumber(entry.bmi, locale)}</span><span className="text-sm text-secondary">{t("TEXT_BODY_FAT_13AEEC")}{entry.bodyFatPercent == null ? '—' : `${TrainerMembersFormatNumber(entry.bodyFatPercent, locale)}%`}</span></div>)}</div></div>
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col items-center justify-center text-center"><div className="w-12 h-12 rounded-full bg-info-bg text-info flex items-center justify-center mb-3" data-testid={"trainer_members-trainer_members-profile-info-state-42-2"}><Calculator size={18} strokeWidth={2}/></div><h4 className="text-sm font-semibold text-secondary">{t("TEXT_CURRENT_BMI_EDA3C8")}</h4><p className="text-kpi font-bold text-primary">{bmi == null ? '—' : TrainerMembersFormatNumber(bmi, locale)}</p></div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5"><div className="flex items-center gap-2 mb-4"><Camera size={18} className="text-primary" strokeWidth={2}/><h4 className="font-semibold text-primary">{t("TEXT_PROGRESS_PHOTOS")}</h4></div>{latest.progressPhotos?.length ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{latest.progressPhotos.map((src, index) => <div key={src} className="aspect-square rounded-lg overflow-hidden bg-input"><Image src={src} alt={t("TEXT_PROGRESS_PHOTO_ALT", { index: index + 1 })} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" /></div>)}</div> : <p className="text-sm text-secondary">{t("TEXT_NO_PROGRESS_PHOTOS_RECORDED")}</p>}</div>
    </> : <p className="text-sm text-secondary">{t("TEXT_NO_MEASUREMENTS_RECORDED_YET")}</p>}
  </div>;
}
