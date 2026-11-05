"use client";
// RESPONSIBILITY: Renders a summary card for one role using the role-default permission response only.
// DATA FLOW: feature data/state and user input → AdminSecurityPermissionsManagementRoleCard → accessible UI/events routed to owning hooks (admin_permissions/permissions_management/components/role_card/AdminSecurityPermissionsManagementRoleCard.tsx)

/**
 * @description AdminSecurityPermissionsManagementRoleCard: Renders a summary card for one role using the role-default permission response only.
 * @dependencies Consumes AdminNavigationLayoutProgressBar, useAdminPermissionsLogic, AdminPermissionsConstants, AdminPermissionsTypes, AdminPermissionsRoleCardPropsTypes.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import AdminNavigationLayoutProgressBar from '@/app/frontend_admin/admin_security/security_permissions_management/components/progress_bar/AdminSecurityPermissionsManagementProgressBar';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic';
import { PERMISSION_FEATURES, ROLE_OPTIONS } from '@/app/frontend_admin/admin_security/security_permissions_management/constants/AdminSecurityPermissionsManagementConstants';
import type { RoleType } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementTypes';
import type { AdminPermissionsRoleCardProps } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementRoleCardPropsTypes';

/** Displays how many documented role-default permissions are enabled for the selected role.
 */
/**
 * @description Renders the / PermissionsRoleCard UI section using feature-owned data and semantic design tokens.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminSecurityPermissionsManagementRoleCard({ role }: AdminPermissionsRoleCardProps) {
  const t = useTranslations();

  const { roleDefaults } = useAdminPermissionsLogic();
  const permissions = roleDefaults.find((item) => item.role === role)?.permissions ?? {};
  const roleOption = ROLE_OPTIONS.find((option) => option.value === role);
  const roleLabel = roleOption ? t(roleOption.labelKey) : role;
  const enabled = PERMISSION_FEATURES.filter((feature) => permissions[feature.key] === true).length;
  const total = PERMISSION_FEATURES.length;
  return <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-primary-subtle flex items-center justify-center flex-shrink-0"><ShieldCheck size={18} strokeWidth={2} className="text-primary" /></div><div className="flex-1 min-w-0"><p className="text-sm font-bold text-primary capitalize">{roleLabel}</p><p className="text-xs text-secondary mt-0.5">{enabled} {t('permissions.admin_permissions_role_card.text_de04fa0e29')}{total} {t('permissions.admin_permissions_role_card.text_4a93eb442a')}</p><div className="mt-2"><AdminNavigationLayoutProgressBar value={total ? (enabled / total) * 100 : 0} label={t('admin_permissions_role_card.auto_permissionsEnabled', { role: roleLabel })} /></div></div><div className="text-right flex-shrink-0"><p className="text-2xl font-black text-primary">{enabled}</p><p className="text-xs text-secondary">{t('permissions.admin_permissions_role_card.text_3ea3f9802a')}</p></div></div>;
}
