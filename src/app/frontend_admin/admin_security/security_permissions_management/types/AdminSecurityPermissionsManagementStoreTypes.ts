// RESPONSIBILITY: Defines feature-local TypeScript contracts for permissions_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_permissions/permissions_management/types/AdminSecurityPermissionsManagementStoreTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminPermissionsQueryState, RoleType } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementTypes';
export interface AdminPermissionsStore extends AdminPermissionsQueryState {
  /** UI-only cross-component operation guard; never a backend authorization substitute. */
  pendingStaffOperations: Record<string, true>;
  /** Persist retry identity across independently mounted hooks within this feature. */
  idempotencyKeysByIntent: Record<string, string>;
  getSharedIntentKey: (intentId: string) => string;
  clearSharedIntentKey: (intentId: string) => void;
  tryBeginStaffOperation: (staffId: string) => boolean;
  endStaffOperation: (staffId: string) => void;
  setActiveRole: (role: RoleType | 'all') => void;
  setStaffSearch: (value: string) => void;
  setEditingStaffId: (staffId: string | null) => void;
}
