"use client";
// RESPONSIBILITY: Keeps Members' selected record and profile view synchronized with canonical URL state.
// DATA FLOW: URL `view` + `id` -> validated module view state -> Zustand UI selection -> TanStack Query identity.
import { useCallback, useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore';
import type { TrainerMembersProfileTab } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileProfileTypes';
import {
  TrainerMembersBuildViewSearch,
  TrainerMembersResolveViewUrl,
} from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileViewUrlUtils';
import { TRAINER_MEMBERS_LIST_VIEW } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';

/** Owns URL-driven list/profile navigation without moving server data out of TanStack Query. */
export function useTrainerMembersViewState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawSearch = searchParams.toString();
  const selectedMemberId = useTrainerMembersStore((state) => state.selectedMemberId);
  const profileTab = useTrainerMembersStore((state) => state.profileTab);
  const setSelectedMember = useTrainerMembersStore((state) => state.setSelectedMember);
  const setProfileTab = useTrainerMembersStore((state) => state.setProfileTab);
  const resolved = useMemo(() => TrainerMembersResolveViewUrl(rawSearch), [rawSearch]);

  useEffect(() => {
    if (resolved.normalizedSearch === rawSearch) return;
    const suffix = resolved.normalizedSearch ? `?${resolved.normalizedSearch}` : '';
    router.replace(`${pathname}${suffix}`, { scroll: false });
  }, [pathname, rawSearch, resolved.normalizedSearch, router]);

  useEffect(() => {
    if (selectedMemberId !== resolved.memberId) setSelectedMember(resolved.memberId);
    const nextProfileTab = resolved.view === TRAINER_MEMBERS_LIST_VIEW ? 'overview' : resolved.view;
    if (profileTab !== nextProfileTab) setProfileTab(nextProfileTab as TrainerMembersProfileTab);
  }, [profileTab, resolved.memberId, resolved.view, selectedMemberId, setProfileTab, setSelectedMember]);

  const navigate = useCallback((view: 'list' | TrainerMembersProfileTab, memberId: string | null) => {
    if (view !== TRAINER_MEMBERS_LIST_VIEW && !memberId?.trim()) return;
    const nextSearch = TrainerMembersBuildViewSearch(rawSearch, view, memberId);
    if (nextSearch === rawSearch) return;
    const suffix = nextSearch ? `?${nextSearch}` : '';
    router.push(`${pathname}${suffix}`, { scroll: false });
  }, [pathname, rawSearch, router]);

  const openMember = useCallback((memberId: string) => {
    navigate('overview', memberId);
  }, [navigate]);

  const setProfileView = useCallback((view: TrainerMembersProfileTab) => {
    if (!resolved.memberId) return;
    navigate(view, resolved.memberId);
  }, [navigate, resolved.memberId]);

  const backToList = useCallback(() => {
    navigate(TRAINER_MEMBERS_LIST_VIEW, null);
  }, [navigate]);

  return {
    view: resolved.view,
    memberId: resolved.memberId,
    isProfileView: Boolean(resolved.memberId && resolved.view !== TRAINER_MEMBERS_LIST_VIEW),
    openMember,
    setProfileView,
    backToList,
  };
}
