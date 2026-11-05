import { redirect } from 'next/navigation';
import { ADMIN_PERMISSIONS_ROUTES } from '@/app/frontend_admin/admin_security/security_permissions_management/config/admin_security_permissions_management.url_config';

/** Security domain entry redirects to its permissions-management autonomous leaf. */
export default function AdminSecurityDomainRedirect() {
  redirect(ADMIN_PERMISSIONS_ROUTES.root);
}
