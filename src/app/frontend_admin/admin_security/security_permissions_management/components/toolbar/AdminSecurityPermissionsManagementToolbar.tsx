"use client";
// RESPONSIBILITY: Owns the Permissions role filter and staff search controls.
// DATA FLOW: feature data/state and user input → AdminSecurityPermissionsManagementToolbar → accessible UI/events routed to owning hooks (admin_permissions/permissions_management/components/toolbar/AdminSecurityPermissionsManagementToolbar.tsx)

/**
 * @description AdminSecurityPermissionsManagementToolbar: Owns the Permissions role filter and staff search controls.
 * @dependencies Consumes useAdminPermissionsStore, AdminPermissionsConstants.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { useAdminPermissionsStore } from '@/app/frontend_admin/admin_security/security_permissions_management/state/useAdminSecurityPermissionsManagementStore';
import { ROLE_OPTIONS } from '@/app/frontend_admin/admin_security/security_permissions_management/constants/AdminSecurityPermissionsManagementConstants';

/** Renders role filtering and per-staff search state without owning server data.
 */
/**
 * @description Renders the / PermissionsToolbar UI section using feature-owned data and semantic design tokens.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminSecurityPermissionsManagementToolbar() {
  const t = useTranslations();

  const { activeRole, setActiveRole, staffSearch, setStaffSearch } = useAdminPermissionsStore();
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('permissions.admin_permissions_toolbar.text_b22d435d78')} data-testid="admin_permissions-admin_permissions-toolbar-control">
        <button type="button" onClick={() => setActiveRole('all')} aria-pressed={activeRole === 'all'} className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95 min-h-11 rounded-lg px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out ${activeRole === 'all' ? 'bg-primary text-on-primary' : 'bg-input text-secondary hover:text-primary hover:bg-surface-hover'}`} data-testid="admin_permissions-admin_permissions-toolbar-click">{t('permissions.admin_permissions_toolbar.text_c9c81e99d9')}</button>
        {ROLE_OPTIONS.map((role , __testIdIndex28) => <button key={role.value} type="button" onClick={() => setActiveRole(role.value)} aria-pressed={activeRole === role.value} className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95 min-h-11 rounded-lg px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out ${activeRole === role.value ? 'bg-primary text-on-primary' : 'bg-input text-secondary hover:text-primary hover:bg-surface-hover'}`} data-testid={`admin_permissions-admin_permissions-toolbar-click-2-map28-${__testIdIndex28}-1`}>{t(role.labelKey)}</button>)}
      </div>
      <div className="relative w-full sm:max-w-xs">
        <Search size={18} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
        <input data-testid="admin_permissions-admin_permissions-toolbar-control-2" value={staffSearch} onChange={(event) => setStaffSearch(event.target.value)} placeholder={t('permissions.admin_permissions_toolbar.text_efceb97cfb')} aria-label={t('permissions.admin_permissions_toolbar.text_efceb97cfb')} className="min-h-11 w-full rounded-lg border border-border bg-input pl-10 pr-3 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out" />
      </div>
    </div>
  );
}
