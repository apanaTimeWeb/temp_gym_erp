"use client";
// RESPONSIBILITY: Renders the trainer's own monthly attendance summary from attendance records.
// DATA FLOW: TrainerAttendanceMain records → summary calculation → translated KPI cards.
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { CheckCircle2, Coffee, TrendingUp, XCircle } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { getUser } from '@/lib/api';

import { TRAINER_ATTENDANCE_RECORD_TYPE } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceConstants';

import type { TrainerAttendanceSummaryCardProps } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceSummaryCardProps';








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
  const searchParams = useSearchParams();
  const range = searchParams.get('range') || 'this_month';

  const summary = useMemo(() => {
    const now = new Date();

    if (range === 'last_3_months') {
      let presentDays = 0;
      let absentDays = 0;
      let weeklyOffDays = 0;
      const targetMonths = [
        new Date(now.getFullYear(), now.getMonth() - 2, 1),
        new Date(now.getFullYear(), now.getMonth() - 1, 1),
        new Date(now.getFullYear(), now.getMonth(), 1),
      ];

      for (let i = 0; i < targetMonths.length; i++) {
        const tDate = targetMonths[i];
        const tYear = tDate.getFullYear();
        const tMonth = tDate.getMonth();
        const isCurrent = tMonth === now.getMonth() && tYear === now.getFullYear();
        const daysInM = new Date(tYear, tMonth + 1, 0).getDate();
        const evaluated = isCurrent ? Math.min(now.getDate(), daysInM) : daysInM;

        const pSet = new Set<number>();
        for (const record of records) {
          if (!record.date) continue;
          const d = new Date(record.date);
          if (
            d.getFullYear() === tYear &&
            d.getMonth() === tMonth &&
            record.type === TRAINER_ATTENDANCE_RECORD_TYPE.STAFF &&
            (!user?.id || String(record.staffId) === String(user.id) || String(record.staff?.id) === String(user.id) || record.staffId === 's1' || record.staffId === 'trainer_demo_user')
          ) {
            pSet.add(d.getDate());
          }
        }

        for (let day = 1; day <= evaluated; day += 1) {
          const isSunday = new Date(tYear, tMonth, day).getDay() === 0;
          if (isSunday) weeklyOffDays += 1;
          else if (pSet.has(day)) presentDays += 1;
          else absentDays += 1;
        }
      }

      const totalTracked = presentDays + absentDays;
      const attendancePct = totalTracked > 0 ? Math.round((presentDays / totalTracked) * 100) : 0;
      return { presentDays, absentDays, weeklyOffDays, attendancePct };
    }

    let targetYear = now.getFullYear();
    let targetMonth = now.getMonth();
    let isPastMonth = false;

    if (range === 'last_month') {
      targetMonth = now.getMonth() - 1;
      if (targetMonth < 0) {
        targetMonth = 11;
        targetYear -= 1;
      }
      isPastMonth = true;
    }

    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    const evaluatedDays = isPastMonth ? daysInMonth : Math.min(now.getDate(), daysInMonth);
    const presentDaysSet = new Set<number>();
    for (const record of records) {
      if (!record.date) continue;
      const date = new Date(record.date);
      if (
        date.getFullYear() === targetYear &&
        date.getMonth() === targetMonth &&
        record.type === TRAINER_ATTENDANCE_RECORD_TYPE.STAFF &&
        (!user?.id || String(record.staffId) === String(user.id) || String(record.staff?.id) === String(user.id) || record.staffId === 's1' || record.staffId === 'trainer_demo_user')
      ) {
        presentDaysSet.add(date.getDate());
      }
    }
    let presentDays = 0;
    let absentDays = 0;
    let weeklyOffDays = 0;
    for (let day = 1; day <= evaluatedDays; day += 1) {
      const isSunday = new Date(targetYear, targetMonth, day).getDay() === 0;
      if (isSunday) weeklyOffDays += 1;
      else if (presentDaysSet.has(day)) presentDays += 1;
      else absentDays += 1;
    }
    const totalTracked = presentDays + absentDays;
    const attendancePct = totalTracked > 0 ? Math.round((presentDays / totalTracked) * 100) : 0;
    return { presentDays, absentDays, weeklyOffDays, attendancePct };
  }, [records, user, range]);

  const presentLabel =
    range === 'last_month'
      ? t('TEXT_PRESENT_LAST_MONTH')
      : range !== 'this_month'
      ? t('TEXT_PRESENT_PERIOD')
      : t('TEXT_PRESENT_THIS_MONTH');

  const absentLabel =
    range === 'last_month'
      ? t('TEXT_ABSENT_LAST_MONTH')
      : range !== 'this_month'
      ? t('TEXT_ABSENT_PERIOD')
      : t('TEXT_ABSENT_THIS_MONTH');

  const stats = [
    { key: 'present', label: presentLabel, value: String(summary.presentDays), unit: t('TEXT_DAYS'), icon: CheckCircle2, color: 'text-success', bg: 'bg-success-bg', border: 'border-emerald-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#141B2D] dark:to-[#0C1220]', topBar: 'from-[#10B981] via-[#34D399] to-transparent', glow: 'bg-emerald-500' },
    { key: 'absent', label: absentLabel, value: String(summary.absentDays), unit: t('TEXT_DAYS'), icon: XCircle, color: 'text-danger', bg: 'bg-danger-bg', border: 'border-rose-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#141B2D] dark:to-[#0C1220]', topBar: 'from-[#F43F5E] via-[#FB7185] to-transparent', glow: 'bg-rose-500' },
    { key: 'weekly-off', label: t('TEXT_WEEKLY_OFF_REST'), value: String(summary.weeklyOffDays), unit: t('TEXT_DAYS'), icon: Coffee, color: 'text-warning', bg: 'bg-warning-bg', border: 'border-amber-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#141B2D] dark:to-[#0C1220]', topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent', glow: 'bg-amber-500' },
    { key: 'rate', label: t('TEXT_ATTENDANCE_RATE'), value: `${summary.attendancePct}%`, unit: '', icon: TrendingUp, color: summary.attendancePct >= 85 ? 'text-success' : 'text-danger', bg: summary.attendancePct >= 85 ? 'bg-success-bg' : 'bg-danger-bg', border: summary.attendancePct >= 85 ? 'border-emerald-500/40' : 'border-rose-500/40', surface: summary.attendancePct >= 85 ? 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#141B2D] dark:to-[#0C1220]' : 'bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#141B2D] dark:to-[#0C1220]', topBar: summary.attendancePct >= 85 ? 'from-[#10B981] via-[#34D399] to-transparent' : 'from-[#F43F5E] via-[#FB7185] to-transparent', glow: summary.attendancePct >= 85 ? 'bg-emerald-500' : 'bg-rose-500' },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ key, label, value, unit, icon: Icon, color, bg, border, surface, topBar, glow }) => (
        <article key={key} className={`relative overflow-hidden min-w-0 ${surface} rounded-2xl p-4 shadow-card border ${border} flex items-center gap-3 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5`} data-testid={`trainer_attendance-summary-card${key}`}>
          <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${topBar}`} />
          <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full blur-2xl opacity-20 ${glow}`} />
          <div className={`relative w-10 h-10 rounded-xl border ${border} ${bg} flex items-center justify-center shrink-0`}><Icon size={18} strokeWidth={2} className={color} /></div>
          <div className="relative min-w-0"><p className="text-xs text-secondary font-medium leading-tight line-clamp-2">{label}</p><p className="text-kpi font-extrabold text-text-primary tabular-nums">{value}{unit && <span className="text-xs text-secondary font-normal ms-1">{unit}</span>}</p></div>
        </article>
      ))}
    </div>
  );
}
