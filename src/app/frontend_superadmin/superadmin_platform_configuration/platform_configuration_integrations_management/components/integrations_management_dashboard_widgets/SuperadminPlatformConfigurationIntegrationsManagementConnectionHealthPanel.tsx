// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationIntegrationsConnectionHealthPanel within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Superadmin integrations connection health panel section.
import { PlugZap } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';

import SuperadminPlatformConfigurationIntegrationsConnectionsEmptyState from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/components/integrations_management_states_and_feedback/SuperadminPlatformConfigurationIntegrationsManagementConnectionsEmptyState';
import { getSuperadminPlatformConfigurationIntegrationsStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/constants/superadmin_platform_configuration_integrations_management_status_badge_config.constants';
import { getSuperadminIntegrationStatusLabelKey } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/constants/superadmin_platform_configuration_integrations_management.constants';
import { superadminIntegrationsDisplayValue, formatDateTime, formatNumber, formatDecimal } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/utils/SuperadminPlatformConfigurationIntegrationsManagementFormatters';

import type { SuperadminPlatformConfigurationIntegrationsSectionProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management.types';



/**
 * @description Renders the Superadmin integrations connection health panel section.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminPlatformConfigurationIntegrationsManagementConnectionHealthPanel({ data }: SuperadminPlatformConfigurationIntegrationsSectionProps) {
  const t = useTranslations('superadmin_platform_configuration_integrations');
    const locale = useLocale();
    const statusLabel = (status: string) => { const key = getSuperadminIntegrationStatusLabelKey(status); return key ? t(key) : status; };
    return (<Panel title={t('ui.connection_health_aa6e44e')} description={t('ui.payment_messaging_email_and_storage_connections_5329411')}>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {data.integrations.length === 0 ? <SuperadminPlatformConfigurationIntegrationsConnectionsEmptyState /> : data.integrations.map(item => (<div key={item.name} className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <PlugZap size={18} className="text-primary"/>
            <div>
              <p className="font-medium text-primary">
                {item.name}
              </p>
              <p className="text-xs text-secondary">
                {item.type}
              </p>
            </div>
          </div>
          <span data-testid={`superadmin_platform_configuration_integrations-connection-status-${item.name}`} className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminPlatformConfigurationIntegrationsStatusBadgeClasses(item.status)}`}>
            {statusLabel(item.status)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-secondary">

            {t('ui.last_event_43959ef')}
          </span>
          <Tooltip content={superadminIntegrationsDisplayValue(item.lastEvent, '—')}>
            <span className="max-w-52 truncate text-primary">
              {superadminIntegrationsDisplayValue(item.lastEvent ? formatDateTime(item.lastEvent, locale) : null, '—')}
            </span>
          </Tooltip>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-secondary">

            {t('ui.failed_events_fde73e3')}
          </span>
          <span className={item.failedEvents > 5 ? 'text-danger' : 'text-primary'}>
            {formatNumber(item.failedEvents)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-secondary">

            {t('ui.health_3782f68')}
          </span>
          <span className="text-primary">
            {formatDecimal(item.health, 1)}
            {t('ui.text_0bcef9c4')}</span>
        </div>
      </div>))}
  </div>
    </Panel>);
}
