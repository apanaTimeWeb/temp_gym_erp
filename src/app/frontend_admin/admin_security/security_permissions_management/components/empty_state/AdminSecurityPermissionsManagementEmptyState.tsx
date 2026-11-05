"use client";
// RESPONSIBILITY: Renders the module-owned empty state for an empty permission matrix.
// DATA FLOW: feature data/state and user input → AdminSecurityPermissionsManagementEmptyState → accessible UI/events routed to owning hooks (admin_permissions/permissions_management/components/empty_state/AdminSecurityPermissionsManagementEmptyState.tsx)

/**
 * @description AdminSecurityPermissionsManagementEmptyState: Empty-state presentation for an unconfigured permission matrix.
 * @dependencies Uses module-local translations and semantic design tokens only.
 * @edge-case Keeps the matrix usable when the backend returns an empty permission collection.
 */
import { ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * AdminSecurityPermissionsManagementEmptyState presents the documented empty permission-matrix state without owning permission data or business logic.
 * @remarks Uses module-owned translations and semantic design tokens only.
 * @dependencies Depends on next-intl translations and the approved Lucide icon set.
 * @edge-case Remains available when the permission collection is empty or unavailable while preserving keyboard and screen-reader semantics.
 
 * @description AdminSecurityPermissionsManagementEmptyState renders the PermissionsManagementEmptyState interface for its owning feature.
 */
export default function AdminSecurityPermissionsManagementEmptyState() {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center" data-testid="admin_permissions-admin_permissions-empty-state">
      <ShieldCheck size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/>
      <p className="text-sm font-semibold text-primary">{t('permissions.admin_permissions_empty_state.title')}</p>
      <p className="max-w-md text-sm text-secondary">{t('permissions.admin_permissions_empty_state.description')}</p>
    </div>
  );
}
