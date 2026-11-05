// RESPONSIBILITY: Renders ManagerMembersDirectoryMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerMembersDirectoryContent } from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryContent';

/** @description Entry point component for the members module that sets up hook-based state facades and layout. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembersDirectoryMain() {
  return <ManagerMembersDirectoryContent />;
}
