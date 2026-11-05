"use client";
// RESPONSIBILITY: Renders the member's current month attendance history in a full monthly calendar format.
// Strictly view-only: trainers can monitor member consistency but cannot alter attendance logs.

import { useMemo } from 'react';

import { Calendar as CalendarIcon, CheckCircle2, XCircle, AlertCircle, ShieldCheck } from 'lucide-react';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructureSkeletonBlock';

import { useLocale, useTranslations } from 'next-intl';

import { TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { useTrainerMembersMemberAttendanceQuery } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileProfileQueries';

import { useTrainerMembersSelectedMember } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileSelectedMember';

import { TrainerMembersFormatNumber } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';









/**
 * @description Renders the member's current month attendance history in a full monthly calendar format.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the members feature UI responsibility represented by TrainerMembersProfileAttendance, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersProfileAttendance() {
  const locale = useLocale();
  const t = useTranslations('TRAINER_MEMBERS');
  const { member: selectedMember } = useTrainerMembersSelectedMember();
  const attendanceQuery = useTrainerMembersMemberAttendanceQuery(selectedMember?.id || '');
  const rawAtt = attendanceQuery.data ?? [];

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const todayDate = now.getDate();

  const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(now);

  // Calculate calendar dimensions
  const daysInMonth = useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentYear, currentMonth]);
  const firstDayIndex = useMemo(() => new Date(currentYear, currentMonth, 1).getDay(), [currentYear, currentMonth]); // 0 = Sun, 1 = Mon...

  // Map days to attendance status
  const attLookup = useMemo(() => {
    const map: Record<number, string> = {};
    (rawAtt as Array<{ day: number; status: string }>).forEach((entry) => { map[entry.day] = entry.status; });
    return map;
  }, [rawAtt]);

  const daysArray = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const isPastOrToday = day <= todayDate;
      const status = attLookup[day] ?? (isPastOrToday ? TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.UNRECORDED : TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.UPCOMING);
      return { day, status, isToday: day === todayDate, isPastOrToday };
    });
  }, [daysInMonth, todayDate, attLookup]);

  const presentCount = daysArray.filter(d => d.isPastOrToday && d.status === TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.PRESENT).length;
  const absentCount = daysArray.filter(d => d.isPastOrToday && d.status === TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.ABSENT).length;
  const leaveCount = daysArray.filter(d => d.isPastOrToday && d.status === TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.LEAVE).length;
  const trackedDays = presentCount + absentCount + leaveCount;
  const attendancePct = trackedDays > 0 ? Math.round((presentCount / (presentCount + absentCount)) * 100) || 0 : 0;

  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, index) => new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' }).format(new Date(Date.UTC(2021, 7, 1 + index)))), [locale]);

  if (!selectedMember) return null;
  if (attendanceQuery.isPending) return <div className="space-y-4" aria-busy="true" data-testid="trainer-members-attendance-loading"><TrainerInfrastructureSkeletonBlock className="h-20 rounded-xl" /><TrainerInfrastructureSkeletonBlock className="h-64 rounded-xl" /></div>;
  if (attendanceQuery.isError) return <div role="alert" className="rounded-xl border border-danger-bg bg-danger-bg p-4 text-sm text-danger" data-testid="trainer-members-attendance-error"><p>{t('TEXT_THIS_SECTION_COULD_NOT_BE_LOADED_YOU_CAN_AB1ACB89')}</p><button type="button" onClick={() => void attendanceQuery.refetch()} className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_RETRY')}</button></div>;

  return (
    <div className="space-y-6 motion-safe:transition-opacity motion-safe:duration-slow">
      {/* Month Header & Overview Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <CalendarIcon size={18} strokeWidth={2} className="text-primary" /> {monthName} {currentYear} {t("TEXT_ATTENDANCE")}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-focus flex items-center gap-1">
              <ShieldCheck size={18}  strokeWidth={2}/> {t("TEXT_VIEW_ONLY")}</span>
          </div>
          <p className="text-sm text-secondary mt-0.5">
            {t("TEXT_ATTENDANCE_RECORDS_FOR")}{selectedMember.name} {t("TEXT_RECORDED_AUTOMATICALLY_VIA_BIOMETRIC_SCAN")}</p>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs font-medium text-secondary">{t("TEXT_PRESENT_DAYS")}</p>
          <p className="text-kpi font-bold text-success mt-1 flex items-center gap-2">
            {TrainerMembersFormatNumber(presentCount, locale)} <span className="text-xs text-secondary font-normal">{t("TEXT_DAYS")}</span>
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs font-medium text-secondary">{t("TEXT_ABSENT_DAYS")}</p>
          <p className="text-kpi font-bold text-danger mt-1 flex items-center gap-2">
            {TrainerMembersFormatNumber(absentCount, locale)} <span className="text-xs text-secondary font-normal">{t("TEXT_DAYS")}</span>
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs font-medium text-secondary">{t("TEXT_REST_OFF_DAYS")}</p>
          <p className="text-kpi font-bold text-warning mt-1 flex items-center gap-2">
            {TrainerMembersFormatNumber(leaveCount, locale)} <span className="text-xs text-secondary font-normal">{t("TEXT_DAYS")}</span>
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs font-medium text-secondary">{t("TEXT_ATTENDANCE_RATE")}</p>
          <p className={`text-kpi font-bold mt-1 ${attendancePct >= 75 ? 'text-success' : 'text-danger'}`}>
            {TrainerMembersFormatNumber(attendancePct, locale)}%
          </p>
        </div>
      </div>

      {/* Monthly Calendar View */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-4">
        <div className="grid grid-cols-7 gap-2 text-center pb-2 border-b border-border">
          {weekDays.map(wd => (
            <div key={wd} className="text-xs font-bold text-secondary uppercase tracking-wider py-1">
              {wd}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {/* Empty offset padding for days before the 1st */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-20 rounded-xl bg-input border border-transparent" />
          ))}

          {/* Calendar day cells */}
          {daysArray.map(({ day, status, isToday, isPastOrToday }) => {
            let statusStyle = 'bg-floating text-secondary border-border';
            let badgeStyle = 'text-secondary';
            let label = isPastOrToday ? t('TEXT_NOT_RECORDED') : t('TEXT_FUTURE_DAY');

            if (isPastOrToday) {
              if (status === TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.PRESENT) {
                statusStyle = 'bg-success-bg text-success border-border hover:border-border';
                badgeStyle = 'bg-success text-on-success';
                label = t('TEXT_PRESENT_P');
              } else if (status === TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.ABSENT) {
                statusStyle = 'bg-danger-bg text-danger border-border hover:border-border';
                badgeStyle = 'bg-danger text-on-danger';
                label = t('TEXT_ABSENT_A');
              } else if (status === TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.LEAVE) {
                statusStyle = 'bg-warning-bg text-warning border-border hover:border-border';
                badgeStyle = 'bg-warning text-on-warning';
                label = t('TEXT_REST_LEAVE_L');
              } else if (status === TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.UNRECORDED) {
                statusStyle = 'bg-floating text-secondary border-border';
                badgeStyle = 'bg-input text-secondary';
                label = t('TEXT_NOT_RECORDED');
              }
            }

            return (
              <div
                key={day}
                className={`h-20 rounded-xl p-2.5 border flex flex-col justify-between motion-safe:transition-all relative ${statusStyle} ${
                  isToday ? 'ring-2 ring-primary  ' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${isToday ? 'text-primary' : 'text-primary'}`}>
                    {day}
                  </span>
                  {isToday && (
                    <span className="text-xs font-extrabold uppercase px-1.5 py-0.5 rounded bg-primary text-on-primary tracking-wide">
                      {t("TEXT_TODAY")}</span>
                  )}
                </div>

                <div className="mt-auto">
                  {isPastOrToday ? (
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${badgeStyle}`}>
                      {status === TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.PRESENT && <CheckCircle2 size={18}  strokeWidth={2}/>}
                      {status === TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.ABSENT && <XCircle size={18}  strokeWidth={2}/>}
                      {status === TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.LEAVE && <AlertCircle size={18}  strokeWidth={2}/>}
                      {label}
                    </span>
                  ) : (
                    <span className="text-xs text-disabled">
                      —
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-floating border border-border rounded-xl text-xs text-secondary">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-primary">{t("TEXT_LEGEND")}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-success text-on-success" data-testid={"trainer_members-profile-attendance-state-187"}></span> {t("TEXT_PRESENT_P")}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-danger text-on-danger" data-testid={"trainer_members-profile-attendance-state-189"}></span> {t("TEXT_ABSENT_A")}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-warning text-on-warning" data-testid={"trainer_members-profile-attendance-state-191"}></span> {t("TEXT_REST_LEAVE_L")}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-input"></span> {t("TEXT_FUTURE_PENDING")}</span>
        </div>
        <p className="text-disabled">
          {t("TEXT_SYNCS_WITH_MAIN_BRANCH_BIOMETRICS_IN_REAL_TIME")}</p>
      </div>
    </div>
  );
}

