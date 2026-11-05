"use client";
// RESPONSIBILITY: Renders the read-only role permission summary for the Settings Roles tab.
// DATA FLOW: feature data/state and user input → AdminSettingsManagementRoles → accessible UI/events routed to owning hooks (admin_settings/settings_management/components/roles/AdminSettingsManagementRoles.tsx)

import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { useAdminSettingsRolesData } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementRolesData';

/**
 * AdminSettingsManagementRoles renders the admin settings roles UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsManagementRoles: Renders the read-only role permission summary for the Settings Roles tab.
 * @dependencies Consumes useAdminSettingsRolesData.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminSettingsManagementRoles() {
  const t = useTranslations();

  const { roles, status, retry } = useAdminSettingsRolesData();

  if (status === 'pending') {
    return <div role="status" aria-live="polite" aria-busy="true" className="bg-card rounded-xl shadow-card border border-border mt-6 h-64 motion-safe:animate-pulse motion-safe:duration-base" />;
  }

  if (status === 'error') {
    return <div role="alert" className="mt-6 rounded-xl border border-border bg-danger-bg p-6 text-danger"><span>{t('settings.AdminRepair.rolesLoadFailed')}</span><button type="button" onClick={() => void retry()} className="ml-3 min-h-11 rounded-lg border border-border px-4 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('settings.AdminRepair.retry')}</button></div>;
  }
  if (roles.length === 0) {
    return <div className="bg-card rounded-xl shadow-card border border-border mt-6 p-8 text-center text-sm text-secondary">{t('settings.admin_settings_roles.text_72e56c17df')}</div>;
  }

  return (
    <div className="bg-card rounded-xl shadow-card border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-bold text-primary text-lg">{t('settings.admin_settings_roles.text_406b4e0e00')}</h2>
          <p className="text-xs text-secondary">{t('settings.admin_settings_roles.text_81bc7a81b8')}</p>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {roles.map((role , __testIdIndex36) => {
          const granted = Object.values(role.permissions).filter(Boolean).length;
          const total = Object.keys(role.permissions).length;
          return (
            <div key={role.role} className="border border-border rounded-xl p-5 bg-input">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center text-primary"><ShieldCheck size={18}  strokeWidth={2}/></div>
                <div>
                  <h3 className="font-semibold text-primary text-base capitalize">{role.role}</h3>
                  <p className="text-xs text-secondary">{granted} {t('settings.admin_settings_roles.text_de04fa0e29')}{total} {t('settings.admin_settings_roles.text_4a93eb442a')}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(role.permissions).map(([permission, enabled] , __testIdIndex49) => (
                  <span key={permission} className={`px-2 py-1 text-xs font-medium uppercase tracking-wider rounded-full border ${enabled ? 'bg-success-bg text-success-text border-border' : 'bg-input text-secondary border-border'}`} data-testid={`admin_settings-adminsettingsroles-status-1-map36-${__testIdIndex36}-1`}>
                    {permission.replaceAll('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

