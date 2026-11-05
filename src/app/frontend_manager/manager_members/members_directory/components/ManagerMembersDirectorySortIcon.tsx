// RESPONSIBILITY: Renders ManagerMembersDirectorySortIcon's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

import type { ManagerMembersDirectorySortIconProps } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_sort_icon.types';


/** @description Renders the accessible sort-direction icon for a members-table column. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembersDirectorySortIcon({ column, activeColumn, direction }: ManagerMembersDirectorySortIconProps) {
  if (activeColumn !== column) return <ArrowUpDown size={18} strokeWidth={2} className="ml-1 opacity-50 inline" />;
  return direction === 'asc'
    ? <ArrowUp size={18} strokeWidth={2} className="ml-1 inline text-primary" />
    : <ArrowDown size={18} strokeWidth={2} className="ml-1 inline text-primary" />;
}
