// RESPONSIBILITY: Defines feature-local TypeScript contracts for blacklist_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_blacklist/blacklist_management/types/AdminMembersBlacklistManagementStoreTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { BlacklistActiveTab } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';
import type { BlacklistFormValues } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';
export interface AdminBlacklistStore {
  /** UI-only, synchronous module-wide guard against overlapping blacklist writes. */
  operationPending: boolean;
  tryBeginOperation: () => boolean;
  endOperation: () => void;
  activeTab: BlacklistActiveTab;
  setActiveTab: (t: BlacklistActiveTab) => void;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  form: BlacklistFormValues;
  setForm: (f: BlacklistFormValues) => void;
  search: string;
  setSearch: (s: string) => void;
  scopeFilter: string;
  setScopeFilter: (s: string) => void;
  gymFilter: string;
  setGymFilter: (g: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
}
