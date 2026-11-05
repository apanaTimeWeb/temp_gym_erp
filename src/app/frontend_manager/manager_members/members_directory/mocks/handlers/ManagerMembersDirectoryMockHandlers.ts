import { managerMembersMutationHandlers } from '@/app/frontend_manager/manager_members/members_directory/mocks/handlers/ManagerMembersDirectoryMockMutationHandlers';
import { managerMembersReadHandlers } from '@/app/frontend_manager/manager_members/members_directory/mocks/handlers/ManagerMembersDirectoryMockReadHandlers';

/** @description Aggregates the complete Manager Members MSW contract while keeping read and mutation responsibilities independently repairable. @dependencies Feature-owned read, mutation and resettable mock-state modules. @edge-case preserves one handler registration export for the global MSW bootstrap. */
export const managerMembersHandlers = [
  ...managerMembersReadHandlers,
  ...managerMembersMutationHandlers,
];

export { resetManagerMembersDirectoryMockState } from '@/app/frontend_manager/manager_members/members_directory/mocks/handlers/ManagerMembersDirectoryMockState';
