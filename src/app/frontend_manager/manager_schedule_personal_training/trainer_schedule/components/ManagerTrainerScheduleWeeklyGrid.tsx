// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerTooltip from '@/components/ui/manager_tooltip/ManagerTooltip';

import ManagerTrainerScheduleEmptyState from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleEmptyState';
import { MANAGER_TRAINER_SCHEDULE_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule.constants';
import { SHIFT_DAYS, SHIFT_STATUS_STYLES } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_shared.constants';
import { useManagerTrainerScheduleLogic } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleLogic';
import { ManagerTrainerScheduleDisplayValue } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/utils/ManagerTrainerScheduleFormatters';
import type { ShiftDay, TrainerShift } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule.types';


/** @description Renders the ManagerTrainerScheduleWeeklyGrid component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (6 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerTrainerScheduleWeeklyGrid() {
  const t = useTranslations('MANAGER_TRAINER_SCHEDULE');

  const { trainers, selectedDay, openAddShift, openEditShift, deleteShift } = useManagerTrainerScheduleLogic();
  const { confirm } = useConfirm();

  const days: ShiftDay[] = selectedDay === 'All' ? [...SHIFT_DAYS] : [selectedDay as ShiftDay];

  const handleDelete = async (shift: TrainerShift) => {
    const ok = await confirm({
      title: t("COPY_REMOVE_SHIFT"),
      message: t("TEXT_REMOVE_SHIFT_MESSAGE", { day: shift.day, value: shift.trainerName }),
      confirmText: t("COPY_REMOVE"),
      type: 'danger' });
    if (ok) await deleteShift(shift.id);
  };

  if (trainers.length === 0) {
    return (
      <ManagerTrainerScheduleEmptyState />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      <table className="w-full text-left border-collapse min-w-224">
        <thead>
          <tr className="border-b border-border bg-primary-subtle">
            <th className="py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider w-44 sticky left-0 bg-primary-subtle z-20">{t("COPY_TRAINER_2")}</th>
            {days.map(day => (
              <th key={day} className="py-3 px-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center">
                {day.slice(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {trainers.map((trainer, mapIndex) => (
            <tr key={trainer.trainerId} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out">
              <td className="py-3 px-4 sticky left-0 bg-card z-20 flex flex-col items-start justify-center gap-0.5">
                <ManagerTooltip content={trainer.trainerName}>
                  <p className="text-sm font-semibold text-text-primary truncate max-w-40">{trainer.trainerName}</p>
                </ManagerTooltip>
                <ManagerTooltip content={trainer.trainerRole}>
                  <p className="text-xs text-text-secondary truncate max-w-40">{trainer.trainerRole}</p>
                </ManagerTooltip>
              </td>
              {days.map(day => {
                const shifts = trainer.shifts.filter((shift) => shift.day === day);
                return (
                  <td key={day} className="py-2 px-2 text-center align-top">
                    {shifts.length > 0 ? (
                      <div className="space-y-2">
                        {shifts.map((shift) => {
                          const styles = SHIFT_STATUS_STYLES[shift.status];
                          return (
                            <div key={shift.id} className={`rounded-lg px-2 py-2 text-xs group relative ${styles!.bg}`}>
                              <p className={`font-semibold ${styles!.text}`}>{shift.status}</p>
                              {shift.status !== MANAGER_TRAINER_SCHEDULE_STATUS_VALUES.OFF && <p className="text-text-secondary mt-0.5">{shift.startTime}–{shift.endTime}</p>}
                              {shift.notes && <div className="mt-0.5"><ManagerTooltip content={shift.notes}><p className="text-text-secondary text-xs truncate max-w-20">{ManagerTrainerScheduleDisplayValue(shift.notes)}</p></ManagerTooltip></div>}
                              <div className="flex justify-end gap-1 mt-1">
                                <button data-testid={`manager_schedule-schedule-managerscheduleweeklygrid-button-edit-shift-${shift.id}`} onClick={(e) => { e.stopPropagation(); openEditShift(shift); }} className="min-h-9 min-w-9 p-1 rounded bg-card text-text-secondary hover:text-primary motion-safe:transition-all focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none" aria-label={t("COPY_EDIT_SHIFT_1")} type="button"><Pencil size={16} strokeWidth={2}/></button>
                                <button data-testid={`manager_schedule-schedule-managerscheduleweeklygrid-button-delete-shift-${shift.id}`} onClick={(e) => { e.stopPropagation(); void handleDelete(shift); }} className="min-h-9 min-w-9 p-1 rounded bg-card text-text-secondary hover:text-danger-text motion-safe:transition-all focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none" aria-label={t("COPY_DELETE_SHIFT")} type="button"><Trash2 size={16} strokeWidth={2}/></button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <button data-testid={`manager_schedule-schedule-managerscheduleweeklygrid-button-add-shift-for-on`}
                        onClick={() => openAddShift(trainer.trainerId)}
                        className="w-full h-10 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary-subtle flex items-center justify-center text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
                        aria-label={t("TEXT_ADD_SHIFT_FOR_TRAINER", { trainer: trainer.trainerName, day })}
                       type="button">
                        <Plus size={18} strokeWidth={2}/>
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
