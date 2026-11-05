// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationIntegrationsWebhooksAndDeveloperAccessPanel within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Superadmin integrations webhooks and developer access panel section.
import { useState } from 'react';

import { KeyRound, Webhook } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';

import SuperadminPlatformConfigurationIntegrationsGenerateApiKeyModal from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/components/integrations_management_modals/SuperadminPlatformConfigurationIntegrationsManagementGenerateApiKeyModal';
import SuperadminPlatformConfigurationIntegrationsDeveloperAccessEmptyState from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/components/integrations_management_states_and_feedback/SuperadminPlatformConfigurationIntegrationsManagementDeveloperAccessEmptyState';
import SuperadminPlatformConfigurationIntegrationsWebhooksEmptyState from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/components/integrations_management_states_and_feedback/SuperadminPlatformConfigurationIntegrationsManagementWebhooksEmptyState';
import { getSuperadminPlatformConfigurationIntegrationsStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/constants/superadmin_platform_configuration_integrations_management_status_badge_config.constants';
import { getSuperadminIntegrationStatusLabelKey } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/constants/superadmin_platform_configuration_integrations_management.constants';
import { superadminIntegrationsDisplayValue, formatDate, formatNumber } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/utils/SuperadminPlatformConfigurationIntegrationsManagementFormatters';

import type { SuperadminPlatformConfigurationIntegrationsSectionProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management.types';


/**
 * @description Renders the Superadmin integrations webhooks and developer access panel section.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminPlatformConfigurationIntegrationsManagementWebhooksAndDeveloperAccessPanel({ data }: SuperadminPlatformConfigurationIntegrationsSectionProps) {
  const t = useTranslations('superadmin_platform_configuration_integrations');
    const locale = useLocale();
    const statusLabel = (status: string) => { const key = getSuperadminIntegrationStatusLabelKey(status); return key ? t(key) : status; };
    const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

    return (<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <Panel title={t('ui.webhook_delivery_9dfb331')} description={t('ui.delivery_status_attempts_and_latency_9e58232')}>
    <div className="space-y-3">
      {data.webhooks.length === 0 ? <SuperadminPlatformConfigurationIntegrationsWebhooksEmptyState /> : data.webhooks.map(item => (<div key={item.id} className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <Webhook size={18} className="text-secondary"/>
              <Tooltip content={item.event}>
                <span className="max-w-52 truncate font-medium text-primary">
                  {item.event}
                </span>
              </Tooltip>
            </div>
            <span data-testid={`superadmin_platform_configuration_integrations-connection-status-${item.id}`} className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminPlatformConfigurationIntegrationsStatusBadgeClasses(item.status)}`}>
              {statusLabel(item.status)}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-secondary">
            <span>
              {item.integration}
            </span>
            <span>
              {formatNumber(item.attempts)}

              {t('ui.tries_023ffa8')}
            </span>
            <span>
              {formatNumber(item.latency)}

              {t('ui.ms_2cb23f0')}
            </span>
          </div>
        </div>))}
    </div>
  </Panel>
  <Panel
    title={t('ui.tenant_developer_access_191cfd7')}
    description={t('ui.issue_or_revoke_access_without_showing_secret_va_a90721e')}
    action={
      <button  type="button"
        onClick={() => setIsApiKeyModalOpen(true)}
        className="min-h-11 flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary text-xs font-semibold rounded-md hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_platform_configuration_integrations-button-interactive-1">

        {t('ui.generate_new_key_ff70d9c')}
      </button>
    }
   data-testid="superadmin_platform_configuration_integrations-webhooks-developer-access-panel">
    <div className="space-y-3">
      {data.keys.length === 0 ? <SuperadminPlatformConfigurationIntegrationsDeveloperAccessEmptyState /> : data.keys.map(item => (<div key={item.id} className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <KeyRound size={18} className="text-primary"/>
              <div className="min-w-0">
                <Tooltip content={item.label}>
                  <p className="max-w-40 truncate font-medium text-primary">
                    {item.label}
                  </p>
                </Tooltip>
                <Tooltip content={item.tenant}>
                  <p className="max-w-40 truncate text-xs text-secondary">
                    {item.tenant}
                  </p>
                </Tooltip>
              </div>
            </div>
            <span data-testid={`superadmin_platform_configuration_integrations-developer-access-status-${item.id}`} className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminPlatformConfigurationIntegrationsStatusBadgeClasses(item.status)}`}>
              {statusLabel(item.status)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-secondary">
            <span>
              {item.rateLimit}
            </span>
            <span>
              {superadminIntegrationsDisplayValue(item.lastUsed ? formatDate(item.lastUsed, locale) : null, '—')}
            </span>
          </div>
        </div>))}
      <p className="text-xs text-secondary" data-testid="superadmin_platform_configuration_integrations-key-revocation-contract-note">{t('ui.key_revocation_requires_backend_contract')}</p>
    </div>
  </Panel>

  <SuperadminPlatformConfigurationIntegrationsGenerateApiKeyModal
    isOpen={isApiKeyModalOpen}
    tenants={data.tenants}
    onClose={() => setIsApiKeyModalOpen(false)}
  />
    </div>);
}
