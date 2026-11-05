import type { TrainerAccountSecurityScreenView } from '../types/TrainerAccountAccountSecurityAuxiliaryTypes';
// RESPONSIBILITY: Resolve, validate, and normalize Profile screen-view URL state.
import { TRAINER_ACCOUNT_SECURITY_SCREEN_VIEWS, TRAINER_ACCOUNT_SECURITY_VIEW_QUERY_PARAM } from '@/app/frontend_trainer/trainer_account/account_security/config/trainer_account_security.url_config';



export function isTrainerAccountSecurityScreenView(value: string | null): value is TrainerAccountSecurityScreenView {
  return value !== null && (TRAINER_ACCOUNT_SECURITY_SCREEN_VIEWS as readonly string[]).includes(value);
}

export function resolveTrainerAccountSecurityScreenView(params: URLSearchParams): TrainerAccountSecurityScreenView {
  const requestedView = params.get(TRAINER_ACCOUNT_SECURITY_VIEW_QUERY_PARAM);
  if (isTrainerAccountSecurityScreenView(requestedView)) return requestedView;

  return 'personal';
}

/** Return normalized query text if invalid screen state needs cleanup; otherwise return null. */
export function canonicalizeTrainerAccountSecurityViewParams(params: URLSearchParams): string | null {
  const original = params.toString();
  const normalized = new URLSearchParams(original);
  normalized.delete('tab');
  const rawView = normalized.get(TRAINER_ACCOUNT_SECURITY_VIEW_QUERY_PARAM);
  const canonicalView = isTrainerAccountSecurityScreenView(rawView) ? rawView : null;

  if (rawView !== null && !isTrainerAccountSecurityScreenView(rawView)) normalized.delete(TRAINER_ACCOUNT_SECURITY_VIEW_QUERY_PARAM);
  if (canonicalView && (rawView !== null)) normalized.set(TRAINER_ACCOUNT_SECURITY_VIEW_QUERY_PARAM, canonicalView);

  const result = normalized.toString();
  return result === original ? null : result;
}

export function buildTrainerAccountSecurityViewHref(pathname: string, params: URLSearchParams, view: TrainerAccountSecurityScreenView): string {
  const nextParams = new URLSearchParams(params.toString());
  nextParams.delete('tab');
  nextParams.set(TRAINER_ACCOUNT_SECURITY_VIEW_QUERY_PARAM, view);
  return `${pathname}?${nextParams.toString()}`;
}


export type { TrainerAccountSecurityScreenView } from '../types/TrainerAccountAccountSecurityAuxiliaryTypes';
