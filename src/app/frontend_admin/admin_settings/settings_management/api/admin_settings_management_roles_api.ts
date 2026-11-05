// RESPONSIBILITY: Fetches role permission reference data for Admin Settings without importing the Permissions business module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_settings/settings_management/api/admin_settings_management_roles_api.ts)

import { adminSettingsManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementApiResponse';
import { ADMIN_SETTINGS_API } from '@/app/frontend_admin/admin_settings/settings_management/config/admin_settings_management.url_config';
import { AdminSettingsRolePermissionReferenceSchema } from '@/app/frontend_admin/admin_settings/settings_management/schemas/AdminSettingsManagementSchemas';
import type { AdminSettingsGymPermissionOverride, AdminSettingsRolePermission } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementPermissionTypes';
export const AdminSettingsRolesApi = { fetchRolePermissionReference: () => apiFetch<{ roleDefaults: AdminSettingsRolePermission[]; gymOverrides: AdminSettingsGymPermissionOverride[] }>(`${ADMIN_SETTINGS_API.permissionsReference}?consumer=settings`, { method: 'GET', dataSchema: AdminSettingsRolePermissionReferenceSchema }) };
