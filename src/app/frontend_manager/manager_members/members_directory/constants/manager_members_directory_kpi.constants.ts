import { User, CheckCircle, Clock, XCircle } from 'lucide-react';

import type { ManagerMembersDirectoryKpiKey } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';


/**
 * @description Provides the ManagerMembersDirectoryKpiConstants implementation for the members module.
 * @dependencies @/app/frontend_manager/manager_members/manager_members_types/ManagerMembersDirectoryTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_MEMBERS_DIRECTORY_KPI_CONFIG: ReadonlyArray<{
  labelKey: string; key: ManagerMembersDirectoryKpiKey; color: string; bg: string; icon: typeof User;
}> = [
  { labelKey: 'COPY_TOTAL_MEMBERS', key: 'total', color: 'text-info-text', bg: 'bg-info-bg', icon: User },
  { labelKey: 'COPY_ACTIVE', key: 'active', color: 'text-success-text', bg: 'bg-success-bg', icon: CheckCircle },
  { labelKey: 'COPY_PENDING', key: 'pending', color: 'text-warning-text', bg: 'bg-warning-bg', icon: Clock },
  { labelKey: 'COPY_EXPIRED', key: 'expired', color: 'text-danger-text', bg: 'bg-danger-bg', icon: XCircle },
];
