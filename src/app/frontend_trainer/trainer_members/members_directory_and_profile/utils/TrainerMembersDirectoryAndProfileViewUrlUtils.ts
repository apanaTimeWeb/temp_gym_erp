import type { TrainerMembersRouteView, TrainerMembersResolvedViewState } from '../types/TrainerMembersMembersDirectoryAndProfileAuxiliaryTypes';
// RESPONSIBILITY: Canonical URL-state contract for Members list/profile screens.
// DATA FLOW: location search -> validated view/id state -> canonical query string.
import type { TrainerMembersProfileTab } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileProfileTypes';
import {
  TRAINER_MEMBERS_DEFAULT_PROFILE_VIEW,
  TRAINER_MEMBERS_LIST_VIEW,
  TRAINER_MEMBERS_PROFILE_VIEW_VALUES,
  TRAINER_MEMBERS_QUERY_MEMBER_ID,
  TRAINER_MEMBERS_QUERY_VIEW,
} from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';





const PROFILE_TABS: readonly string[] = TRAINER_MEMBERS_PROFILE_VIEW_VALUES;

function resolveProfileTab(value: string | null): TrainerMembersProfileTab | null {
  return value && PROFILE_TABS.includes(value) ? value as TrainerMembersProfileTab : null;
}

function readSearch(search: string): URLSearchParams {
  return new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
}

/**
 * Resolves and canonicalizes member identity and profile view without changing unrelated query values.
 * An ID without a valid `view` opens the default overview.
 */
export function TrainerMembersResolveViewUrl(search: string): TrainerMembersResolvedViewState {
  const params = readSearch(search);
  params.delete('tab');
  const rawMemberId = params.get(TRAINER_MEMBERS_QUERY_MEMBER_ID);
  const memberId = rawMemberId?.trim() || null;

  if (!memberId) {
    params.delete(TRAINER_MEMBERS_QUERY_MEMBER_ID);
    params.delete(TRAINER_MEMBERS_QUERY_VIEW);
    return {
      view: TRAINER_MEMBERS_LIST_VIEW,
      memberId: null,
      normalizedSearch: params.toString(),
    };
  }

  const view = resolveProfileTab(params.get(TRAINER_MEMBERS_QUERY_VIEW))
    ?? TRAINER_MEMBERS_DEFAULT_PROFILE_VIEW;
  params.set(TRAINER_MEMBERS_QUERY_MEMBER_ID, memberId);
  params.set(TRAINER_MEMBERS_QUERY_VIEW, view);

  return { view, memberId, normalizedSearch: params.toString() };
}

/** Builds a Members URL state while retaining list filters, pagination, sorting and unknown query parameters. */
export function TrainerMembersBuildViewSearch(
  currentSearch: string,
  view: TrainerMembersRouteView,
  memberId: string | null,
): string {
  const params = readSearch(currentSearch);
  params.delete('tab');
  const safeMemberId = memberId?.trim() || null;

  if (view === TRAINER_MEMBERS_LIST_VIEW || !safeMemberId) {
    params.delete(TRAINER_MEMBERS_QUERY_MEMBER_ID);
    params.delete(TRAINER_MEMBERS_QUERY_VIEW);
    return params.toString();
  }

  const safeView = resolveProfileTab(view) ?? TRAINER_MEMBERS_DEFAULT_PROFILE_VIEW;
  params.set(TRAINER_MEMBERS_QUERY_MEMBER_ID, safeMemberId);
  params.set(TRAINER_MEMBERS_QUERY_VIEW, safeView);
  return params.toString();
}


export type { TrainerMembersRouteView, TrainerMembersResolvedViewState } from '../types/TrainerMembersMembersDirectoryAndProfileAuxiliaryTypes';
