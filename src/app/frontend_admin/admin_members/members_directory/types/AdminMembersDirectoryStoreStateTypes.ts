// RESPONSIBILITY: Defines feature-local TypeScript contracts for members_directory; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_members/members_directory/types/AdminMembersDirectoryStoreStateTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminMembersExpiryFilter } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryUiTypes';
import type { AdminMembersStatusFilter } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryTypes';
export interface AdminMembersStoreState {
  search: string;
  setSearch: (s: string) => void;
  statusFilter: AdminMembersStatusFilter;
  setStatusFilter: (s: AdminMembersStatusFilter) => void;
  branchFilter: string;
  setBranchFilter: (s: string) => void;
  expiryFilter: AdminMembersExpiryFilter;
  setExpiryFilter: (s: AdminMembersExpiryFilter) => void;
  genderFilter: string;
  setGenderFilter: (s: string) => void;
  planFilter: string;
  setPlanFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
}
