// RESPONSIBILITY: Defines the permission-domain contracts owned by the Admin Permissions feature.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_permissions/permissions_management/types/AdminSecurityPermissionsManagementTypes.ts)

export type RoleType = 'manager' | 'trainer' | 'receptionist';

export interface PermissionFeature {
  key: string;
  labelKey: string;
  group: string;
  descriptionKey: string;
}

export interface RolePermissions {
  role: RoleType;
  permissions: Record<string, boolean>;
}

export interface StaffOverride {
  staffId: string;
  staffName: string;
  role: RoleType;
  overrides: Record<string, boolean>;
}

export interface AdminPermissionsQueryState {
  activeRole: RoleType | 'all';
  staffSearch: string;
  editingStaffId: string | null;
}

export interface UpdateStaffPermissionPayload {
  permission: string;
  enabled: boolean;
}
