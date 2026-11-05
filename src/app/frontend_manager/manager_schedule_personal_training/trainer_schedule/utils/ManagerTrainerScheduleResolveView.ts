import { MANAGER_TRAINER_SCHEDULE_VIEW_IDS, MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_view.constants';
import type { ManagerTrainerScheduleViewId } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule_view.types';

/** Resolves the validated URL-backed schedule presentation mode. */
export function resolveManagerTrainerScheduleView(requestedView: string | null): ManagerTrainerScheduleViewId {
  return requestedView && (MANAGER_TRAINER_SCHEDULE_VIEW_IDS as readonly string[]).includes(requestedView)
    ? requestedView as ManagerTrainerScheduleViewId
    : MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW;
}
