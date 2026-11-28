"use client";
// RESPONSIBILITY: Renders the trainer's own monthly attendance summary from attendance records.
// DATA FLOW: TrainerAttendanceMain records → summary calculation → translated KPI cards.
import { useMemo } from 'react';

import { CheckCircle2, Coffee, TrendingUp, XCircle } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { getUser } from '@/lib/api';

import { TRAINER_ATTENDANCE_RECORD_TYPE } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceConstants';

import type { TrainerAttendanceSummaryCardProps } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceSummaryCardProps';








/**
 * @description Owns TrainerAttendanceSummaryCard behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Renders a focused card representation for the attendance feature using semantic surfaces and responsive interaction patterns.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerAttendanceSummaryCard({ records }: TrainerAttendanceSummaryCardProps) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const user = getUser();
  const summary = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const todayDate = now.getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const presentDaysSet = new Set<number>();
    for (const record of records) {
      if (!record.date) continue;
      const date = new Date(record.date);
      if (date.getFullYear() === year && date.getMonth() === month && record.type === TRAINER_ATTENDANCE_RECORD_TYPE.STAFF && (!user?.id || String(record.staffId) === String(user.id) || String(record.staff?.id) === String(user.id))) presentDaysSet.add(date.getDate());
    }
    let presentDays = 0;
    let absentDays = 0;
    let weeklyOffDays = 0;
    for (let day = 1; day <= Math.min(todayDate, daysInMonth); day += 1) {
      const isSunday = new Date(year, month, day).getDay() === 0;
      if (isSunday) weeklyOffDays += 1;
      else if (presentDaysSet.has(day)) presentDays += 1;
      else absentDays += 1;
    }
    const totalTracked = presentDays + absentDays;
    const attendancePct = totalTracked > 0 ? Math.round((presentDays / totalTracked) * 100) : 0;
    return { presentDays, absentDays, weeklyOffDays, attendancePct };
  }, [records, user]);

  const stats = [
    { key: 'present', label: t('TEXT_PRESENT_THIS_MONTH'), value: String(summary.presentDays), unit: t('TEXT_DAYS'), icon: CheckCircle2, color: 'text-success', bg: 'bg-success-bg', border: 'border-emerald-500/30', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#122620] dark:via-[#202020] dark:to-[#181818]', glow: 'bg-emerald-500' },
    { key: 'absent', label: t('TEXT_ABSENT_THIS_MONTH'), value: String(summary.absentDays), unit: t('TEXT_DAYS'), icon: XCircle, color: 'text-danger', bg: 'bg-danger-bg', border: 'border-rose-500/30', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#28141a] dark:via-[#202020] dark:to-[#181818]', glow: 'bg-rose-500' },
    { key: 'weekly-off', label: t('TEXT_WEEKLY_OFF_REST'), value: String(summary.weeklyOffDays), unit: t('TEXT_DAYS'), icon: Coffee, color: 'text-warning', bg: 'bg-warning-bg', border: 'border-amber-500/30', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#262012] dark:via-[#202020] dark:to-[#181818]', glow: 'bg-amber-500' },
    { key: 'rate', label: t('TEXT_ATTENDANCE_RATE'), value: `${summary.attendancePct}%`, unit: '', icon: TrendingUp, color: summary.attendancePct >= 85 ? 'text-success' : 'text-danger', bg: summary.attendancePct >= 85 ? 'bg-success-bg' : 'bg-danger-bg', border: summary.attendancePct >= 85 ? 'border-emerald-500/30' : 'border-rose-500/30', surface: summary.attendancePct >= 85 ? 'bg-card dark:bg-gradient-to-br dark:from-[#122620] dark:via-[#202020] dark:to-[#181818]' : 'bg-card dark:bg-gradient-to-br dark:from-[#28141a] dark:via-[#202020] dark:to-[#181818]', glow: summary.attendancePct >= 85 ? 'bg-emerald-500' : 'bg-rose-500' },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ key, label, value, unit, icon: Icon, color, bg, border, surface, glow }) => (
        <article key={key} className={`relative overflow-hidden min-w-0 ${surface} rounded-2xl p-4 shadow-card border ${border} flex items-center gap-3 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:scale-[1.01]`} data-testid={`trainer_attendance-summary-card${key}`}>
          <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full blur-2xl opacity-15 ${glow}`} />
          <div className={`relative w-10 h-10 rounded-xl border ${border} ${bg} flex items-center justify-center shrink-0`}><Icon size={18} strokeWidth={2} className={color} /></div>
          <div className="relative min-w-0"><p className="text-xs text-secondary font-medium leading-tight line-clamp-2">{label}</p><p className={`text-xl font-bold tabular-nums ${color}`}>{value}{unit && <span className="text-xs text-secondary font-normal ms-1">{unit}</span>}</p></div>
        </article>
      ))}
    </div>
  );
}
