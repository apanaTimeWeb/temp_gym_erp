import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_security/security_permissions_management/components/feedback/AdminSecurityPermissionsManagementConfirmProvider';
// RESPONSIBILITY: Server Component entry point for the Permissions page.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_permissions/permissions_management/page.tsx)

import AdminPermissionsMain from '@/app/frontend_admin/admin_security/security_permissions_management/components/main_view/AdminSecurityPermissionsManagementMain';

/**
 * PermissionsPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function PermissionsPage() {
  return (
      <AdminNavigationLayoutConfirmProvider><AdminPermissionsMain /></AdminNavigationLayoutConfirmProvider>
  );
}
