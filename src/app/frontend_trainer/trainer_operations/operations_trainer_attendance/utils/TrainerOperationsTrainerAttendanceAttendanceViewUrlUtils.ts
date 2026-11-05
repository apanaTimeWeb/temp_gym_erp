import type { TrainerAttendanceScreenView } from '../types/TrainerOperationsOperationsTrainerAttendanceAuxiliaryTypes';
// RESPONSIBILITY: Validates Attendance screen-view query state from the current `view` parameter.
import type { TrainerAttendanceTab } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceInteractionTypes';

import { TRAINER_ATTENDANCE_SCREEN_VIEW_VALUES, TRAINER_ATTENDANCE_VIEW_QUERY_PARAM } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/config/trainer_operations_trainer_attendance.url_config';

export const TRAINER_ATTENDANCE_SCREEN_VIEWS = TRAINER_ATTENDANCE_SCREEN_VIEW_VALUES;


const VIEW_TO_TAB: Readonly<Record<TrainerAttendanceScreenView, TrainerAttendanceTab>> = {
  members: 'MEMBERS',
  'my-attendance': 'MY_ATTENDANCE',
};

export function isTrainerAttendanceScreenView(value: string | null): value is TrainerAttendanceScreenView {
  return value !== null && (TRAINER_ATTENDANCE_SCREEN_VIEWS as readonly string[]).includes(value);
}

export function resolveTrainerAttendanceScreenView(params: URLSearchParams): TrainerAttendanceScreenView {
  const requestedView = params.get(TRAINER_ATTENDANCE_VIEW_QUERY_PARAM);
  if (isTrainerAttendanceScreenView(requestedView)) return requestedView;

  return 'members';
}

/** Returns a normalized query string when invalid screen state needs cleanup; otherwise returns null. */
export function canonicalizeTrainerAttendanceViewParams(params: URLSearchParams): string | null {
  const original = params.toString();
  const normalized = new URLSearchParams(original);
  normalized.delete('tab');
  const rawView = normalized.get(TRAINER_ATTENDANCE_VIEW_QUERY_PARAM);
  const canonicalView = isTrainerAttendanceScreenView(rawView) ? rawView : null;

  if (rawView !== null && !isTrainerAttendanceScreenView(rawView)) normalized.delete(TRAINER_ATTENDANCE_VIEW_QUERY_PARAM);
  if (canonicalView && (rawView !== null)) normalized.set(TRAINER_ATTENDANCE_VIEW_QUERY_PARAM, canonicalView);

  const result = normalized.toString();
  return result === original ? null : result;
}

export function trainerAttendanceTabToScreenView(tab: TrainerAttendanceTab): TrainerAttendanceScreenView {
  return tab === 'MY_ATTENDANCE' ? 'my-attendance' : 'members';
}

export function trainerAttendanceScreenViewToTab(view: TrainerAttendanceScreenView): TrainerAttendanceTab {
  return VIEW_TO_TAB[view];
}


export type { TrainerAttendanceScreenView } from '../types/TrainerOperationsOperationsTrainerAttendanceAuxiliaryTypes';
