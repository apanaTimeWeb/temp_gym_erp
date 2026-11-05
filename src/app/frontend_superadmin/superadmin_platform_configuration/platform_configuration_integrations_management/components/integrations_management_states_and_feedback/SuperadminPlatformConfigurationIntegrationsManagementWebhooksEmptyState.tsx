// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationIntegrationsWebhooksEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin webhook deliveries list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';



/**
 * @description Renders the dedicated empty state for the Superadmin webhook deliveries list.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminPlatformConfigurationIntegrationsManagementWebhooksEmptyState() {
  const t = useTranslations('superadmin_platform_configuration_integrations');
    return <div data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-webhooks-empty-state-webhooks-empty-state-empty"><EmptyState title={t('ui.webhook_deliveries_ce3fcfc')} description={t('ui.successful_and_failed_deliveries_will_appear_her_5964c6c')} data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-webhooks-empty-state-webhooks-empty-state-empty-2"/>
    </div>;
}
