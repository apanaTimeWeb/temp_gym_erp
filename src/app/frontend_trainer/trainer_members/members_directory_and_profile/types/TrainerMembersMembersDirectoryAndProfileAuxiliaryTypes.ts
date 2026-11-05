/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */
import type { TrainerMembersProfileTab } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileProfileTypes';
import type { TRAINER_MEMBERS_LIST_VIEW } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';

export interface TrainerMembersProfileProps {
  activeView: TrainerMembersProfileTab;
  onBackToList: () => void;
  onSelectView: (view: TrainerMembersProfileTab) => void;
}

export interface TrainerMembersTableProps {
  onOpenMember: (memberId: string) => void;
}

export interface TrainerInfrastructureNavigationGuardStoreState {
  dirtySources: Record<string, true>;
  setSourceDirty: (sourceId: string, isDirty: boolean) => void;
  hasDirtySources: () => boolean;
}

export interface TrainerInfrastructureErrorReport {
  module: string;
  route: string;
  timestamp: string;
  errorDigest?: string;
}

export type TrainerMembersRouteView = typeof TRAINER_MEMBERS_LIST_VIEW | TrainerMembersProfileTab;

export interface TrainerMembersResolvedViewState {
  view: TrainerMembersRouteView;
  memberId: string | null;
  normalizedSearch: string;
}
