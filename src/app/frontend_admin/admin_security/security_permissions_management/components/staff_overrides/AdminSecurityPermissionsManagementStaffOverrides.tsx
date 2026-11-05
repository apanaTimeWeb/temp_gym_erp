"use client";
// RESPONSIBILITY: Displays per-staff overrides and owns only the override panel interaction surface.
// DATA FLOW: feature data/state and user input → AdminSecurityPermissionsManagementStaffOverrides → accessible UI/events routed to owning hooks (admin_permissions/permissions_management/components/staff_overrides/AdminSecurityPermissionsManagementStaffOverrides.tsx)

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementLogic';
import { PERMISSION_FEATURES, ROLE_OPTIONS } from '@/app/frontend_admin/admin_security/security_permissions_management/constants/AdminSecurityPermissionsManagementConstants';

/**
 * @description AdminSecurityPermissionsManagementStaffOverrides renders the PermissionsManagementStaffOverrides interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminSecurityPermissionsManagementStaffOverrides() {
  const t = useTranslations();
  const { overrides, allOverridesCount, hasActiveFilters, clearFilters, toggleStaffPermission, resetToDefaults, saving } = useAdminPermissionsLogic();
  const featureMap = useMemo(() => new Map(PERMISSION_FEATURES.map((feature) => [feature.key, t(feature.labelKey)])), [t]);
  const roleLabel = (role: string) => {
    const option = ROLE_OPTIONS.find((item) => item.value === role);
    return option ? t(option.labelKey) : role;
  };

  if (overrides.length === 0) {
    const isFilteredEmpty = allOverridesCount > 0 && hasActiveFilters;
    return <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-sm font-semibold text-primary">{t('permissions.admin_permissions_staff_overrides.text_347718c2e3')}</h3>
      <p className="mt-2 text-xs text-secondary">{isFilteredEmpty ? t('permissions.admin_permissions_staff_overrides.noStaffMatch') : t('permissions.admin_permissions_staff_overrides.text_05a1c7e503')}</p>
      {isFilteredEmpty && <button type="button" onClick={clearFilters} className="mt-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-input px-3 text-xs font-semibold text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="permissions-management-permissions-management-staff-overrides-clear-filters">{t('permissions.admin_permissions_staff_overrides.clearFilters')}</button>}
    </div>;
  }

  return <div className="bg-card rounded-xl border border-border overflow-hidden">
    <div className="px-5 py-4 border-b border-border"><h3 className="text-base font-semibold text-primary">{t('permissions.admin_permissions_staff_overrides.text_347718c2e3')}</h3><p className="text-xs text-secondary mt-1">{t('permissions.admin_permissions_staff_overrides.text_fe080f8a0d')}</p></div>
    <div className="divide-y divide-border">
      {overrides.map((item, staffIndex) => <section key={item.staffId} className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0"><p className="text-sm font-semibold text-primary">{item.staffName}</p><p className="text-xs text-secondary">{roleLabel(item.role)} · {item.staffId}</p></div>
          <button type="button" onClick={() => void resetToDefaults(item.staffId, item.staffName, item.role)} disabled={saving} className="min-h-11 min-w-11 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-input px-3 text-xs font-semibold text-secondary hover:text-primary hover:bg-surface-hover disabled:cursor-not-allowed disabled:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base" data-testid={`admin_permissions-admin_permissions-staff-overrides-click-map27-${staffIndex}-1`}><RotateCcw size={18} aria-hidden="true" strokeWidth={2}/>{t('permissions.admin_permissions_staff_overrides.text_299ef4aaf3')}</button>
        </div>
        <div className="mt-4 grid gap-2">
          {Object.entries(item.overrides).map(([key, enabled], permissionIndex) => {
            const label = featureMap.get(key);
            if (!label) return <div key={key} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-input p-3" data-testid={`admin_permissions-unknown-permission-${staffIndex}-${permissionIndex}`}>
              <span className="min-w-0 text-sm font-medium text-secondary">{key}</span><span className="text-xs text-secondary">{t('permissions.admin_permissions_staff_overrides.unsupportedPermission')}</span>
            </div>;
            return <div key={key} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-input p-3">
              <div className="min-w-0"><p className="text-sm font-medium text-primary">{label}</p><p className="text-xs text-secondary">{t('permissions.admin_permissions_staff_overrides.text_c6c69f06e9')}</p></div>
              <button type="button" onClick={() => void toggleStaffPermission(item.staffId, item.staffName, key, !enabled)} disabled={saving} aria-pressed={enabled} aria-label={t('permissions.admin_permissions_staff_overrides.auto_permissionToggle', { action: enabled ? t('permissions.admin_permissions_staff_overrides.auto_32447c7d34') : t('permissions.admin_permissions_staff_overrides.auto_5b6239be97'), feature: label, name: item.staffName })} className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95 min-h-11 min-w-11 rounded-full px-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ${enabled ? 'bg-success text-on-success' : 'bg-surface-zebra text-secondary'}`} data-testid={`admin_permissions-admin_permissions-staff-overrides-toggle-${staffIndex}-${permissionIndex}`}>{enabled ? t('permissions.admin_permissions_staff_overrides.auto_5037b668d6') : t('permissions.admin_permissions_staff_overrides.auto_759b88491c')}</button>
            </div>;
          })}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-warning"><AlertTriangle size={18} aria-hidden="true" strokeWidth={2}/><span>{t('permissions.admin_permissions_staff_overrides.text_59b732d48e')}</span></div>
      </section>)}
    </div>
  </div>;
}
