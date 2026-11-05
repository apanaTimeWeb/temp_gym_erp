import type { TrainerWorkoutScreenView } from '../types/TrainerCoachingCoachingWorkoutPlansAuxiliaryTypes';
// RESPONSIBILITY: Validates Workout screen-view query state from the current `view` parameter.
import { TRAINER_WORKOUT_SCREEN_VIEW_VALUES, TRAINER_WORKOUT_VIEW_QUERY_PARAM } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/trainer_coaching_workout_plans.url_config';

export const TRAINER_WORKOUT_SCREEN_VIEWS = TRAINER_WORKOUT_SCREEN_VIEW_VALUES;


export function isTrainerWorkoutScreenView(value: string | null): value is TrainerWorkoutScreenView {
  return value !== null && (TRAINER_WORKOUT_SCREEN_VIEWS as readonly string[]).includes(value);
}

export function resolveTrainerWorkoutScreenView(params: URLSearchParams): TrainerWorkoutScreenView {
  const requestedView = params.get(TRAINER_WORKOUT_VIEW_QUERY_PARAM);
  if (isTrainerWorkoutScreenView(requestedView)) return requestedView;
  return 'plans';
}

/** Returns a normalized query string when invalid screen state needs cleanup; otherwise returns null. */
export function canonicalizeTrainerWorkoutViewParams(params: URLSearchParams): string | null {
  const original = params.toString();
  const normalized = new URLSearchParams(original);
  normalized.delete('tab');
  const rawView = normalized.get(TRAINER_WORKOUT_VIEW_QUERY_PARAM);
  const canonicalView = isTrainerWorkoutScreenView(rawView) ? rawView : null;

  if (rawView !== null && !isTrainerWorkoutScreenView(rawView)) normalized.delete(TRAINER_WORKOUT_VIEW_QUERY_PARAM);
  if (canonicalView && (rawView !== null)) normalized.set(TRAINER_WORKOUT_VIEW_QUERY_PARAM, canonicalView);

  const result = normalized.toString();
  return result === original ? null : result;
}


export type { TrainerWorkoutScreenView } from '../types/TrainerCoachingCoachingWorkoutPlansAuxiliaryTypes';
