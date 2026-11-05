"use client";
// RESPONSIBILITY: Composes the documented Permissions toolbar, read-only role matrix, and per-staff override editor.
// DATA FLOW: feature data/state and user input → AdminSecurityPermissionsManagementMain → accessible UI/events routed to owning hooks (admin_permissions/permissions_management/components/main_view/AdminSecurityPermissionsManagementMain.tsx)

import { useTranslations } from 'next-intl';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic';
import AdminPermissionsSkeleton from '@/app/frontend_admin/admin_security/security_permissions_management/components/main_view/AdminSecurityPermissionsManagementSkeleton';
import AdminPermissionsToolbar from '@/app/frontend_admin/admin_security/security_permissions_management/components/toolbar/AdminSecurityPermissionsManagementToolbar';
import AdminPermissionsRoleCard from '@/app/frontend_admin/admin_security/security_permissions_management/components/role_card/AdminSecurityPermissionsManagementRoleCard';
import AdminPermissionsMatrix from '@/app/frontend_admin/admin_security/security_permissions_management/components/matrix/AdminSecurityPermissionsManagementMatrix';
import AdminPermissionsStaffOverrides from '@/app/frontend_admin/admin_security/security_permissions_management/components/staff_overrides/AdminSecurityPermissionsManagementStaffOverrides';

/**
 * @description AdminSecurityPermissionsManagementMain renders the PermissionsManagementMain interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminSecurityPermissionsManagementMain() {
  const t = useTranslations();
  const { status, isError, retry } = useAdminPermissionsLogic();
  if (status === 'pending') return <AdminPermissionsSkeleton />;
  if (isError) return <div role="alert" className="m-6 rounded-xl border border-border bg-card p-6 text-sm text-danger">{t('permissions.PermissionsError.text_06340cfc2a')} <button type="button" onClick={() => void retry()} className="ml-2 inline-flex min-h-11 min-w-11 items-center justify-center underline text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="permissions-management-permissions-management-main-retry">{t('permissions.PermissionsError.text_cef2fe093b')}</button></div>;
  return <div className="min-h-full pb-10"><div className="p-6 space-y-6"><div className="grid grid-cols-1 sm:grid-cols-3 gap-4"><AdminPermissionsRoleCard role="manager" /><AdminPermissionsRoleCard role="trainer" /><AdminPermissionsRoleCard role="receptionist" /></div><AdminPermissionsToolbar /><div className="grid grid-cols-1 xl:grid-cols-3 gap-6"><div className="xl:col-span-2"><AdminPermissionsMatrix /></div><div><AdminPermissionsStaffOverrides /></div></div></div></div>;
}
