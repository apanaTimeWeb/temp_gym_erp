// RESPONSIBILITY: Defines feature-local TypeScript contracts for branches_directory; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_branches/branches_directory/types/AdminGymsBranchesDirectoryStoreTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminBranchesTimeRange } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTimeRangeTypes';
import type { AdminBranchesStatusFilter, DetailView } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryUiTypes';
export interface AdminBranchesStore {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: AdminBranchesStatusFilter;
  setStatusFilter: (value: AdminBranchesStatusFilter) => void;
  timeRange: AdminBranchesTimeRange;
  setTimeRange: (range: AdminBranchesTimeRange) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  selectedBranchId: string | null;
  setSelectedBranchId: (id: string | null) => void;
  detailView: DetailView | null;
  setDetailView: (view: DetailView | null) => void;
}
