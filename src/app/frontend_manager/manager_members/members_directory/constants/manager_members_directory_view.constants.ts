import type { ManagerMembersDirectoryViewId } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';
// RESPONSIBILITY: Defines canonical list/detail views and URL parameter keys for Manager Members.
export const MANAGER_MEMBERS_DIRECTORY_LIST_VIEW: ManagerMembersDirectoryViewId = 'list';
export const MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW: ManagerMembersDirectoryViewId = 'member-profile';
export const MANAGER_MEMBERS_DIRECTORY_VIEW_QUERY_PARAM = 'view';
export const MANAGER_MEMBERS_DIRECTORY_ID_QUERY_PARAM = 'id';
export const MANAGER_MEMBERS_DIRECTORY_VIEW_IDS = [MANAGER_MEMBERS_DIRECTORY_LIST_VIEW, MANAGER_MEMBERS_DIRECTORY_PROFILE_VIEW] as const satisfies readonly ManagerMembersDirectoryViewId[];
