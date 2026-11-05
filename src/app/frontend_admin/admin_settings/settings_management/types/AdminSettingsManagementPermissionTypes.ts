// RESPONSIBILITY: Defines the minimal role permission contract consumed by Admin Settings.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_settings/settings_management/types/AdminSettingsManagementPermissionTypes.ts)

export type AdminSettingsRole = 'manager' | 'trainer';
export interface AdminSettingsRolePermission { role: AdminSettingsRole; permissions: Record<string, boolean>; }
export interface AdminSettingsGymPermissionOverride { gymId: string; gymName: string; role: AdminSettingsRole; overrides: Record<string, boolean>; }
