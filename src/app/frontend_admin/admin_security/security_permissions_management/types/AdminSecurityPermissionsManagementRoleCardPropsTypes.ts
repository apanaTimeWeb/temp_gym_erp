// RESPONSIBILITY: Defines feature-local TypeScript contracts for permissions_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_permissions/permissions_management/types/AdminSecurityPermissionsManagementRoleCardPropsTypes.ts)

import type { RoleType } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementTypes';
export interface AdminPermissionsRoleCardProps {
  role: RoleType;
}
