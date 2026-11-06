"use client";
// RESPONSIBILITY: Main orchestrator for the Settings module. Switches between sub-tabs based on URL parameter.
// DATA FLOW: feature data/state and user input → AdminSettingsManagementContent → accessible UI/events routed to owning hooks (admin_settings/settings_management/components/content/AdminSettingsManagementContent.tsx)

import { useTranslations } from 'next-intl';
import { resolveAdminSettingsManagementTab } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementResolveTab';
import { useSearchParams } from 'next/navigation';
import { useAdminSettingsData } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementData';
import AdminSettingsNav from '@/app/frontend_admin/admin_settings/settings_management/components/nav/AdminSettingsManagementNav';
import { AdminSettingsManagementGymProfile as AdminSettingsGymProfile } from '@/app/frontend_admin/admin_settings/settings_management/components/gym_profile/AdminSettingsManagementGymProfile';
import { AdminSettingsManagementNotifications as AdminSettingsNotifications } from '@/app/frontend_admin/admin_settings/settings_management/components/notifications/AdminSettingsManagementNotifications';
import { AdminSettingsManagementRoles as AdminSettingsRoles } from '@/app/frontend_admin/admin_settings/settings_management/components/roles/AdminSettingsManagementRoles';
import { AdminSettingsManagementAppIntegration as AdminSettingsAppIntegration } from '@/app/frontend_admin/admin_settings/settings_management/components/app_integration/AdminSettingsManagementAppIntegration';
import { AdminSettingsManagementGST as AdminSettingsGST } from '@/app/frontend_admin/admin_settings/settings_management/components/gst/AdminSettingsManagementGST';
import { AdminSettingsManagementPaymentGateway as AdminSettingsPaymentGateway } from '@/app/frontend_admin/admin_settings/settings_management/components/payment_gateway/AdminSettingsManagementPaymentGateway';
import { AdminSettingsManagementGeneral as AdminSettingsGeneral } from '@/app/frontend_admin/admin_settings/settings_management/components/general/AdminSettingsManagementGeneral';

/**
 * AdminSettingsManagementContent renders the admin settings content UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsManagementContent: Main orchestrator for the Settings module. Switches between sub-tabs based on URL parameter.
 * @dependencies Consumes AdminNavigationLayoutBackendMessage, useAdminSettingsData, AdminSettingsNav, AdminSettingsGymProfile, AdminSettingsNotifications.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSettingsManagementContent() {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const activeTabId = resolveAdminSettingsManagementTab(searchParams.get('tab'));

  const { data: settingsData, isPending, isError, error } = useAdminSettingsData();

  if (isPending) {
    return (
      <div role="status" aria-live="polite" aria-busy="true" className="w-full space-y-6 motion-safe:animate-pulse motion-safe:duration-base">
        <div className="h-40 bg-card rounded-xl border border-border"></div>
        <div className="h-96 bg-card rounded-xl border border-border"></div>
      </div>
    );
  }

  if (isError || !settingsData?.data) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-danger">{t('settings.admin_settings_content.text_ca650fd593')}{t('settings.AdminRepair.requestFailed')}</p>
      </div>
    );
  }

  return (
    <div className="w-full pb-12">
      <AdminSettingsNav />
      {activeTabId === 'profile' && <AdminSettingsGymProfile initialData={settingsData.data.profile} />}
      {activeTabId === 'notifications' && <AdminSettingsNotifications initialData={settingsData.data.notifications} />}
      {activeTabId === 'roles' && <AdminSettingsRoles />}
      {activeTabId === 'integration' && <AdminSettingsAppIntegration initialData={settingsData.data.integration} />}
      {activeTabId === 'gst' && <AdminSettingsGST initialData={settingsData.data.gst} />}
      {activeTabId === 'payment' && <AdminSettingsPaymentGateway initialData={settingsData.data.payment} />}
      {activeTabId === 'general' && <AdminSettingsGeneral initialData={settingsData.data.general} />}
    </div>
  );
}
