import type { TrainerProfileScreenView } from '../types/TrainerAccountAccountPersonalProfileAuxiliaryTypes';
// RESPONSIBILITY: Resolve, validate, and normalize Profile screen-view URL state.
import { TRAINER_PROFILE_SCREEN_VIEWS, TRAINER_PROFILE_VIEW_QUERY_PARAM } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';



export function isTrainerProfileScreenView(value: string | null): value is TrainerProfileScreenView {
  return value !== null && (TRAINER_PROFILE_SCREEN_VIEWS as readonly string[]).includes(value);
}

export function resolveTrainerProfileScreenView(params: URLSearchParams): TrainerProfileScreenView {
  const requestedView = params.get(TRAINER_PROFILE_VIEW_QUERY_PARAM);
  if (isTrainerProfileScreenView(requestedView)) return requestedView;

  return 'personal';
}

/** Return normalized query text if invalid screen state needs cleanup; otherwise return null. */
export function canonicalizeTrainerProfileViewParams(params: URLSearchParams): string | null {
  const original = params.toString();
  const normalized = new URLSearchParams(original);
  normalized.delete('tab');
  const rawView = normalized.get(TRAINER_PROFILE_VIEW_QUERY_PARAM);
  const canonicalView = isTrainerProfileScreenView(rawView) ? rawView : null;

  if (rawView !== null && !isTrainerProfileScreenView(rawView)) normalized.delete(TRAINER_PROFILE_VIEW_QUERY_PARAM);
  if (canonicalView && (rawView !== null)) normalized.set(TRAINER_PROFILE_VIEW_QUERY_PARAM, canonicalView);

  const result = normalized.toString();
  return result === original ? null : result;
}

export function buildTrainerProfileViewHref(pathname: string, params: URLSearchParams, view: TrainerProfileScreenView): string {
  const nextParams = new URLSearchParams(params.toString());
  nextParams.delete('tab');
  nextParams.set(TRAINER_PROFILE_VIEW_QUERY_PARAM, view);
  return `${pathname}?${nextParams.toString()}`;
}


export type { TrainerProfileScreenView } from '../types/TrainerAccountAccountPersonalProfileAuxiliaryTypes';
