import type { TrainerScheduleScreenView } from '../types/TrainerOperationsOperationsWeeklyAvailabilityAuxiliaryTypes';
// RESPONSIBILITY: Resolve, validate, and normalize Schedule screen-view URL state.
import { TRAINER_SCHEDULE_SCREEN_VIEWS, TRAINER_SCHEDULE_VIEW_QUERY_PARAM } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/config/trainer_operations_weekly_availability.url_config';



export function isTrainerScheduleScreenView(value: string | null): value is TrainerScheduleScreenView {
  return value !== null && (TRAINER_SCHEDULE_SCREEN_VIEWS as readonly string[]).includes(value);
}

export function resolveTrainerScheduleScreenView(params: URLSearchParams): TrainerScheduleScreenView {
  const requestedView = params.get(TRAINER_SCHEDULE_VIEW_QUERY_PARAM);
  if (isTrainerScheduleScreenView(requestedView)) return requestedView;

  return 'availability';
}

/** Return normalized query text if invalid screen state needs cleanup; otherwise return null. */
export function canonicalizeTrainerScheduleViewParams(params: URLSearchParams): string | null {
  const original = params.toString();
  const normalized = new URLSearchParams(original);
  normalized.delete('tab');
  const rawView = normalized.get(TRAINER_SCHEDULE_VIEW_QUERY_PARAM);
  const canonicalView = isTrainerScheduleScreenView(rawView) ? rawView : null;

  if (rawView !== null && !isTrainerScheduleScreenView(rawView)) normalized.delete(TRAINER_SCHEDULE_VIEW_QUERY_PARAM);
  if (canonicalView && (rawView !== null)) normalized.set(TRAINER_SCHEDULE_VIEW_QUERY_PARAM, canonicalView);

  const result = normalized.toString();
  return result === original ? null : result;
}

export function buildTrainerScheduleViewHref(pathname: string, params: URLSearchParams, view: TrainerScheduleScreenView): string {
  const nextParams = new URLSearchParams(params.toString());
  nextParams.delete('tab');
  nextParams.set(TRAINER_SCHEDULE_VIEW_QUERY_PARAM, view);
  return `${pathname}?${nextParams.toString()}`;
}


export type { TrainerScheduleScreenView } from '../types/TrainerOperationsOperationsWeeklyAvailabilityAuxiliaryTypes';
