// RESPONSIBILITY: Defines the prop contract for the Members sort icon.
import type { MemberSortColumn, SortDirection } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

export interface ManagerMembersDirectorySortIconProps {
  column: MemberSortColumn;
  activeColumn: MemberSortColumn;
  direction: SortDirection;
}
