import { MANAGER_TRAINER_SCHEDULE_VIEW_QUERY_PARAM } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_view.constants';
import type { ManagerTrainerScheduleViewId } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule_view.types';

/** Updates only the schedule presentation mode and preserves search/day filters. */
export function ManagerTrainerScheduleBuildViewSearchParams(currentSearch: string, nextView: ManagerTrainerScheduleViewId): string {
  const params = new URLSearchParams(currentSearch);
  params.set(MANAGER_TRAINER_SCHEDULE_VIEW_QUERY_PARAM, nextView);
  return params.toString();
}
