// RESPONSIBILITY: Validates member list/detail view state and record identity.
import type { ManagerMembersDirectoryViewId } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';
import { MANAGER_MEMBERS_DIRECTORY_LIST_VIEW, MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW, MANAGER_MEMBERS_DIRECTORY_VIEW_IDS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_view.constants';

export function isManagerMembersDirectoryView(value: string | null | undefined): value is ManagerMembersDirectoryViewId {
  return value !== null && value !== undefined && (MANAGER_MEMBERS_DIRECTORY_VIEW_IDS as readonly string[]).includes(value);
}

export function resolveManagerMembersDirectoryView(value: string | null, recordId: string | null): ManagerMembersDirectoryViewId {
  if (value === MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW) return recordId?.trim() ? MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW : MANAGER_MEMBERS_DIRECTORY_LIST_VIEW;
  return MANAGER_MEMBERS_DIRECTORY_LIST_VIEW;
}
