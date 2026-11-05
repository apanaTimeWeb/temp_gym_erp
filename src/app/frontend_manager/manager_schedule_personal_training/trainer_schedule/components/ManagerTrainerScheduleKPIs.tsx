// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { Users, UserCheck, UserX, CalendarDays } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerStatCard from '@/components/ui/manager_stat_card/ManagerStatCard';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';

import { MANAGER_TRAINER_SCHEDULE_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule.constants';
import { useManagerTrainerScheduleLogic } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleLogic';


/** @description Renders the ManagerTrainerScheduleKPIs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerTrainerScheduleKPIs() {
  const t = useTranslations('MANAGER_TRAINER_SCHEDULE');
  const { kpis, status } = useManagerTrainerScheduleLogic();
  const dateSuffix = useDateRangeSuffix();

  if (status === MANAGER_TRAINER_SCHEDULE_STATUS_VALUES.PENDING || !kpis) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={`skeleton-${i}`} className="h-28 bg-skeleton-base bg-skeleton-highlight rounded-xl border border-border motion-safe:animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerStatCard
        title={t("TEXT_KPI_TOTAL_TRAINERS") + dateSuffix}
        value={kpis.totalTrainers}
        icon={Users}
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
      />
      <ManagerStatCard
        title={t("TEXT_KPI_ON_DUTY") + dateSuffix}
        value={kpis.trainersOnDutyToday}
        icon={UserCheck}
        iconBg="bg-success-bg"
        iconColor="text-success-text"
      />
      <ManagerStatCard
        title={t("TEXT_KPI_ON_LEAVE") + dateSuffix}
        value={kpis.trainersOnLeaveToday}
        icon={UserX}
        iconBg="bg-warning-bg"
        iconColor="text-warning-text"
      />
      <ManagerStatCard
        title={t("TEXT_KPI_SHIFTS_WEEK") + dateSuffix}
        value={kpis.totalShiftsThisWeek}
        icon={CalendarDays}
        iconBg="bg-info-bg"
        iconColor="text-info-text"
      />
    </div>
  );
}
