// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationIntegrationsSummaryCards within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Superadmin integrations summary cards section.
import { useTranslations } from 'next-intl';

import MetricCard from '@/components/ui/MetricCard';

import { SUPERADMIN_INTEGRATION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/constants/superadmin_platform_configuration_integrations_management.constants';
import { formatNumber, formatDecimal } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/utils/SuperadminPlatformConfigurationIntegrationsManagementFormatters';

import type { SuperadminPlatformConfigurationIntegrationsSectionProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management.types';



/**
 * @description Renders the Superadmin integrations summary cards section.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminPlatformConfigurationIntegrationsManagementSummaryCards({ data }: SuperadminPlatformConfigurationIntegrationsSectionProps) {
  const t = useTranslations('superadmin_platform_configuration_integrations');
    const connected = data.integrations.filter((item) => item.status === SUPERADMIN_INTEGRATION_STATUS_CODES.CONNECTED).length;
    const failed = data.webhooks.filter((item) => item.status === SUPERADMIN_INTEGRATION_STATUS_CODES.FAILED).length;
    const averageHealth = data.integrations.length > 0 ? data.integrations.reduce((sum, item) => sum + item.health, 0) / data.integrations.length : 0;
    return (<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  <MetricCard label={t('ui.connected_services_13ce835')} value={`${connected}/${data.integrations.length}`} helper={t('ui.kpi_helper_external_services_v3')} tone="success" data-testid="superadmin-integrations-superadmin-integrations-summary-cards-metric-card-1"/>
  <MetricCard label={t('ui.failed_webhooks_7d2abe7')} value={formatNumber(failed)} helper={t('ui.kpi_helper_need_review_v3')} tone="danger" data-testid="superadmin-integrations-superadmin-integrations-summary-cards-metric-card-2"/>
  <MetricCard label={t('ui.active_developer_keys_f312ec1')} value={formatNumber(data.keys.filter((k) => k.status === SUPERADMIN_INTEGRATION_STATUS_CODES.ACTIVE).length)} helper={t('ui.kpi_helper_tenant_developer_access_v3')} tone="info" data-testid="superadmin-integrations-superadmin-integrations-summary-cards-metric-card-3"/>
  <MetricCard label={t('ui.average_health_ef35476')} value={`${formatDecimal(averageHealth, 1)}%`} helper={t('ui.kpi_helper_connection_health_v3')} data-testid="superadmin-integrations-superadmin-integrations-summary-cards-metric-card-4"/>
    </div>);
}
