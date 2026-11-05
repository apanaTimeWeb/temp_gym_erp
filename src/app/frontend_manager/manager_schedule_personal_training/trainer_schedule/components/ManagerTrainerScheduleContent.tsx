// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';

import { Search, LayoutGrid, Table2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerToast from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleLocalToast';

import ManagerTrainerScheduleEmptyState from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleEmptyState';
import ManagerTrainerScheduleKPIs from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleKPIs';
import ManagerTrainerScheduleShiftModal from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleShiftModal';
import ManagerTrainerScheduleSkeleton from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleSkeleton';
import ManagerTrainerScheduleTrainerCardsView from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleTrainerCardsView';
import ManagerTrainerScheduleWeeklyGrid from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleWeeklyGrid';
import { MANAGER_TRAINER_SCHEDULE_STATUS_VALUES } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule.constants';
import { SHIFT_DAYS } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_shared.constants';
import { useManagerTrainerScheduleLogic } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleLogic';
import type { ShiftDay } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule.types';
import { MANAGER_TRAINER_SCHEDULE_TRAINER_CARDS_VIEW, MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_view.constants';


/** @description Renders the ManagerTrainerScheduleContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (11 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export function ManagerTrainerScheduleContent() {
  const t = useTranslations('MANAGER_TRAINER_SCHEDULE');

  const { trainers, toast, hideToast, selectedDay, setSelectedDay, search, setSearch, status, error, view, setView } = useManagerTrainerScheduleLogic();

  if (status === MANAGER_TRAINER_SCHEDULE_STATUS_VALUES.PENDING) {
    return <ManagerTrainerScheduleSkeleton />;
  }

  if (status === MANAGER_TRAINER_SCHEDULE_STATUS_VALUES.ERROR) {
    return (
      <div className="min-h-full pb-10">
        
        <div className="p-6 mt-10">
          <div className="max-w-md w-full bg-card border border-danger rounded-xl p-8 text-center space-y-4 mx-auto">
            <div data-testid="manager_schedule-manager-schedule-content-status" className="w-12 h-12 bg-danger-bg text-danger-text rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={18} strokeWidth={2}/>
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">{t("TEXT_GENERIC_ERROR")}</h3>
              <p className="text-sm text-text-secondary mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-10">
      

      <div className="p-6 space-y-5">
        <h1 className="text-2xl font-bold text-text-primary">{t('COPY_TRAINER_SCHEDULE_1')}</h1>
        <ManagerTrainerScheduleKPIs />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input data-testid="manager_schedule-manager-schedule-content-input-value"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t("COPY_SEARCH_TRAINER")}
              className="w-full pl-9 pr-3 py-2 text-sm bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:border-primary"
             aria-label={t("COPY_SEARCH_TRAINER")}/>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Day filter */}
            <div role="group" aria-label={t('COPY_DAY')} className="flex items-center gap-1 bg-input border border-border rounded-lg p-1">
              <button data-testid="manager_schedule-manager-schedule-content-button-action"
                aria-label={t("COPY_ALL")}
                onClick={() => setSelectedDay('All')}
                aria-pressed={selectedDay === 'All'}
                className={`min-h-11 min-w-11 px-3 py-2 text-xs font-semibold rounded-md motion-safe:transition-all ${selectedDay === 'All' ? 'bg-primary text-on-primary' : 'text-text-secondary hover:text-primary'} motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`}
               type="button">{t("COPY_ALL")}</button>
              {SHIFT_DAYS.map((day, mapIndex) => (
                <button data-testid={`manager_schedule-schedule-managerschedulecontent-button-all-${day}`}
                  aria-label={day}
                  aria-pressed={selectedDay === day}
                  key={day}
                  onClick={() => setSelectedDay(day as ShiftDay)}
                  className={`min-h-11 min-w-11 px-2 py-2 text-xs font-semibold rounded-md motion-safe:transition-all ${selectedDay === day ? 'bg-primary text-on-primary' : 'text-text-secondary hover:text-primary'} motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`}
                 type="button">
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div role="group" aria-label={t('COPY_TRAINER_SCHEDULE_1')} className="flex items-center gap-1 bg-input border border-border rounded-lg p-1">
              <button data-testid="manager_schedule-manager-schedule-content-button-close-1"
                onClick={() => setView(MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW)}
                aria-label={t("COPY_WEEKLY_GRID_VIEW")}
                aria-pressed={view === MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW}
                className={`min-h-11 min-w-11 p-2 rounded-md motion-safe:transition-all ${view === MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW ? 'bg-primary text-on-primary' : 'text-text-secondary hover:text-primary'} motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`}
               type="button">
                <Table2 size={18} strokeWidth={2}/>
              </button>
              <button data-testid="manager_schedule-manager-schedule-content-button-close-2"
                onClick={() => setView(MANAGER_TRAINER_SCHEDULE_TRAINER_CARDS_VIEW)}
                aria-label={t("COPY_TRAINER_CARDS_VIEW")}
                aria-pressed={view === MANAGER_TRAINER_SCHEDULE_TRAINER_CARDS_VIEW}
                className={`min-h-11 min-w-11 p-2 rounded-md motion-safe:transition-all ${view === MANAGER_TRAINER_SCHEDULE_TRAINER_CARDS_VIEW ? 'bg-primary text-on-primary' : 'text-text-secondary hover:text-primary'} motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`}
               type="button">
                <LayoutGrid size={18} strokeWidth={2}/>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {view === MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW ? (
          <ManagerTrainerScheduleWeeklyGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {trainers.map(trainer => (
              <ManagerTrainerScheduleTrainerCardsView key={trainer.trainerId} trainer={trainer} />
            ))}
            {trainers.length === 0 && <div className="col-span-full"><ManagerTrainerScheduleEmptyState /></div>}
          </div>
        )}
      </div>

      <ManagerTrainerScheduleShiftModal />
      {toast && <ManagerToast data-testid="manager_schedule-managerschedulecontent-managertoast-3" message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
