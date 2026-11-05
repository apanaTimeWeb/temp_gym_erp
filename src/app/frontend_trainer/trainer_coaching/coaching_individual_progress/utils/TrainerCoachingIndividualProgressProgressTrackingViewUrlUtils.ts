import type { TrainerProgressTrackingScreenView } from '../types/TrainerCoachingCoachingIndividualProgressAuxiliaryTypes';
// RESPONSIBILITY: Validates Progress Tracking screen-view query state from the current `view` parameter.
import { TRAINER_PROGRESS_TRACKING_VIEW_QUERY_PARAM, TRAINER_PROGRESS_TRACKING_SCREEN_VIEW_VALUES } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/config/trainer_coaching_individual_progress.url_config';

export const TRAINER_PROGRESS_TRACKING_SCREEN_VIEWS = TRAINER_PROGRESS_TRACKING_SCREEN_VIEW_VALUES;


export function isTrainerProgressTrackingScreenView(value: string | null): value is TrainerProgressTrackingScreenView {
  return value !== null && (TRAINER_PROGRESS_TRACKING_SCREEN_VIEWS as readonly string[]).includes(value);
}

export function resolveTrainerProgressTrackingScreenView(params: URLSearchParams): TrainerProgressTrackingScreenView {
  const requestedView = params.get(TRAINER_PROGRESS_TRACKING_VIEW_QUERY_PARAM);
  if (isTrainerProgressTrackingScreenView(requestedView)) return requestedView;
  return 'individual';
}

/** Returns a normalized query string when invalid screen state needs cleanup; otherwise returns null. */
export function canonicalizeTrainerProgressTrackingViewParams(params: URLSearchParams): string | null {
  const original = params.toString();
  const normalized = new URLSearchParams(original);
  normalized.delete('tab');
  const rawView = normalized.get(TRAINER_PROGRESS_TRACKING_VIEW_QUERY_PARAM);
  const canonicalView = isTrainerProgressTrackingScreenView(rawView) ? rawView : null;

  if (rawView !== null && !isTrainerProgressTrackingScreenView(rawView)) normalized.delete(TRAINER_PROGRESS_TRACKING_VIEW_QUERY_PARAM);
  if (canonicalView && (rawView !== null)) normalized.set(TRAINER_PROGRESS_TRACKING_VIEW_QUERY_PARAM, canonicalView);

  const result = normalized.toString();
  return result === original ? null : result;
}


export type { TrainerProgressTrackingScreenView } from '../types/TrainerCoachingCoachingIndividualProgressAuxiliaryTypes';
