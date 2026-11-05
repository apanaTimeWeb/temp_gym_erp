// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationIntegrationsMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Orchestrates the Superadmin integrations page and its focused child sections.
import { useTranslations } from 'next-intl';

import SuperadminPlatformConfigurationIntegrationsConnectionHealthPanel from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/components/integrations_management_dashboard_widgets/SuperadminPlatformConfigurationIntegrationsManagementConnectionHealthPanel';
import SuperadminPlatformConfigurationIntegrationsPageHeader from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/components/integrations_management_dashboard_widgets/SuperadminPlatformConfigurationIntegrationsManagementPageHeader';
import SuperadminPlatformConfigurationIntegrationsSummaryCards from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/components/integrations_management_dashboard_widgets/SuperadminPlatformConfigurationIntegrationsManagementSummaryCards';
import SuperadminPlatformConfigurationIntegrationsWebhooksAndDeveloperAccessPanel from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/components/integrations_management_dashboard_widgets/SuperadminPlatformConfigurationIntegrationsManagementWebhooksAndDeveloperAccessPanel';
import { useSuperadminPlatformConfigurationIntegrationsManagementPage } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/hooks/useSuperadminPlatformConfigurationIntegrationsManagementPage';



/**
 * @description Orchestrates the Superadmin integrations page and its focused child sections.
 * @dependencies API → useSuperadminPlatformConfigurationIntegrationsManagementPage → focused child views.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminPlatformConfigurationIntegrationsManagementMain() {
  const t = useTranslations('superadmin_platform_configuration_integrations');
    // DATA FLOW: API → useSuperadminPlatformConfigurationIntegrationsManagementPage → focused child views.
    const { data, isPending, isError, refetch } = useSuperadminPlatformConfigurationIntegrationsManagementPage();
    if (isPending) {
        return (<div className="space-y-4" aria-busy="true" data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-main-page">
        <div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>);
    }
    if (isError || !data) {
        return (<div className="rounded-xl border border-border bg-danger-bg p-5" role="alert" data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-main-integrations-integrations-client-alert">
  <p className="font-semibold text-danger">
    
    {t('ui.integrations_data_could_not_be_loaded_4722b09')}
  </p>
  <button  type="button" onClick={() => refetch()} className="min-h-11 mt-3 rounded-md border border-border px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95" data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-main-integrations-integrations-client-retry">
    
    {t('ui.retry_7edc170')}
  </button>
        </div>);
    }
    return (<div className="space-y-6" data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-main-page-ready">
      <SuperadminPlatformConfigurationIntegrationsPageHeader data={data}/>
      <SuperadminPlatformConfigurationIntegrationsSummaryCards data={data}/>
      <SuperadminPlatformConfigurationIntegrationsConnectionHealthPanel data={data}/>
      <SuperadminPlatformConfigurationIntegrationsWebhooksAndDeveloperAccessPanel data={data}/>
    </div>);
}
