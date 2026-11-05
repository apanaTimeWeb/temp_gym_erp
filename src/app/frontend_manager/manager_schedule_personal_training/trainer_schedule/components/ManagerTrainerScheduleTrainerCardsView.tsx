// RESPONSIBILITY: Renders ManagerTrainerScheduleTrainerCardsView's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Clock, CalendarDays, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SHIFT_DAYS, SHIFT_STATUS_STYLES } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_shared.constants';
import { ManagerTrainerScheduleDisplayValue } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/utils/ManagerTrainerScheduleFormatters';
import { useManagerTrainerScheduleLogic } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleLogic';
import type { ManagerTrainerScheduleTrainerCardProps } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule_trainer_card.types';




/** @description Renders the ManagerTrainerScheduleTrainerCardsView component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerTrainerScheduleTrainerCardsView({ trainer }: ManagerTrainerScheduleTrainerCardProps) {
  const t = useTranslations('MANAGER_TRAINER_SCHEDULE');

  const { openAddShift } = useManagerTrainerScheduleLogic();

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4 hover:border-primary motion-safe:transition-all motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-text-primary">{trainer.trainerName}</p>
          <p className="text-xs text-text-secondary">{ManagerTrainerScheduleDisplayValue(trainer.trainerRole)}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trainer.isActive ? 'bg-success-bg text-success-text' : 'bg-input text-text-secondary'}`} data-testid="manager_schedule-managerscheduletrainercard-status-badge-1">
          {trainer.isActive ? t('COPY_ACTIVE') : t('COPY_INACTIVE')}
        </span>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-xs text-text-secondary">
        <span className="flex items-center gap-1"><CalendarDays size={18} strokeWidth={2} data-testid="manager_schedule-managerscheduletrainercard-interactive"/>{trainer.totalShiftsPerWeek}{t("COPY_SHIFTS_WK")}</span>
        <span className="flex items-center gap-1"><Clock size={18} strokeWidth={2}/>{trainer.totalHoursPerWeek}{t("COPY_H_WK")}</span>
      </div>

      {/* Day dots */}
      <div className="flex gap-1.5">
        {SHIFT_DAYS.map(day => {
          const shift = trainer.shifts.find(s => s.day === day);
          const styles = shift ? SHIFT_STATUS_STYLES[shift.status] : null;
          return (
            <div
              key={day}
              title={shift ? `${day}: ${shift.startTime}–${shift.endTime} (${shift.status})` : `${day}: No shift`}
              className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold cursor-default ${
                styles ? `${styles.bg} ${styles.text}` : 'bg-input text-text-secondary'
              }`}
            >
              {day[0]}
            </div>
          );
        })}
      </div>

      {/* Add shift CTA */}
      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-text-secondary border border-dashed border-border rounded-lg hover:border-primary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_schedule-manager-schedule-trainer-card-button-add"
        onClick={() => openAddShift(trainer.trainerId)}
        
       type="button">
        <Plus size={18} strokeWidth={2}/>{t("COPY_ADD_SHIFT")}</button>
    </div>
  );
}
