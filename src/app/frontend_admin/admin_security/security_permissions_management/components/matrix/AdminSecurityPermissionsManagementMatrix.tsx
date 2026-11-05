"use client";
// RESPONSIBILITY: Displays role-default permission definitions. Per-staff editing is intentionally owned by the override panel because the documented mutation contract requires staffId.
// DATA FLOW: feature data/state and user input → AdminSecurityPermissionsManagementMatrix → accessible UI/events routed to owning hooks (admin_permissions/permissions_management/components/matrix/AdminSecurityPermissionsManagementMatrix.tsx)

/**
 * @description AdminSecurityPermissionsManagementMatrix: Displays role-default permission definitions. Per-staff editing is intentionally owned by the override panel because the documented mutation contract requires staffId.
 * @dependencies Consumes useAdminPermissionsLogic, AdminPermissionsConstants, AdminPermissionsTypes.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic';
import { PERMISSION_FEATURES, PERMISSION_GROUPS } from '@/app/frontend_admin/admin_security/security_permissions_management/constants/AdminSecurityPermissionsManagementConstants';
import type { RoleType } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementTypes';
import AdminPermissionsEmptyState from '@/app/frontend_admin/admin_security/security_permissions_management/components/empty_state/AdminSecurityPermissionsManagementEmptyState';

/** Renders the read-only role permission matrix supplied by GET /admin/permissions.
 */
/**
 * @description Renders the / PermissionsMatrix UI section using feature-owned data and semantic design tokens.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminSecurityPermissionsManagementMatrix() {
  const t = useTranslations();

  const { roleDefaults } = useAdminPermissionsLogic();
  const byRole = new Map(roleDefaults.map((item) => [item.role, item.permissions]));
  if (roleDefaults.length === 0 || PERMISSION_FEATURES.length === 0) return <AdminPermissionsEmptyState />;
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <ShieldCheck size={18} strokeWidth={2} className="text-primary" />
        <div><h2 className="text-base font-semibold text-primary">{t('permissions.admin_permissions_matrix.text_c2bcde8908')}</h2><p className="text-xs text-secondary mt-0.5">{t('permissions.admin_permissions_matrix.text_62d0417cb2')}</p></div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-max w-full" data-admin-responsive-table>
          <thead><tr className="bg-surface-highlight text-xs uppercase tracking-wider text-secondary"><th scope="col" className="text-left px-5 py-3">{t('permissions.admin_permissions_matrix.text_1785713451')}</th><th scope="col" className="px-4 py-3">{t('permissions.admin_permissions_matrix.text_babe3050e2')}</th><th scope="col" className="px-4 py-3">{t('permissions.admin_permissions_matrix.text_63deca910c')}</th><th scope="col" className="px-4 py-3">{t('permissions.admin_permissions_matrix.text_1db62ec5e7')}</th></tr></thead>
          <tbody className="divide-y divide-border">
            {PERMISSION_GROUPS.flatMap((group) => [
              <tr key={`group-${group}`}><th scope="rowgroup" colSpan={4} className="px-5 py-2 bg-input text-xs font-bold uppercase tracking-wider text-secondary">{t(`permissions.AdminPermissionsCatalog.groups.${group.toLowerCase()}`)}</th></tr>,
              ...PERMISSION_FEATURES.filter((feature) => feature.group === group).map((feature, featureIndex) => (
                <tr key={feature.key} className={`${featureIndex % 2 === 0 ? 'bg-card' : 'bg-surface-zebra'} hover:bg-surface-highlight motion-safe:transition-colors`}>
                  <th scope="row" className="px-5 py-3 text-left"><span className="text-sm font-medium text-primary">{t(feature.labelKey)}</span><span className="block text-xs text-secondary mt-0.5">{t(feature.descriptionKey)}</span></th>
                  {(['manager', 'trainer', 'receptionist'] as const).map((role: RoleType , __testIdIndex44) => <td key={role} className="px-4 py-3 text-center"><span className={`inline-flex min-w-16 justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${byRole.get(role)?.[feature.key] ? 'bg-success-bg text-success' : 'bg-surface-zebra text-disabled'}`} data-testid={`admin_permissions-adminpermissionsmatrix-status-${role}-${feature.key.replace('.', '-')}`}>{byRole.get(role)?.[feature.key] ? t('permissions.admin_permissions_matrix.auto_abfb1a2940') : t('permissions.admin_permissions_matrix.auto_620ad07fd6')}</span></td>)}
                </tr>
              )),
            ])}
          </tbody>
        </table>
      </div>
    </div>
  );
}
