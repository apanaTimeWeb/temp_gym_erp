// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationIntegrationsConnectionsEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin connections list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';



/**
 * @description Renders the dedicated empty state for the Superadmin connections list.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminPlatformConfigurationIntegrationsManagementConnectionsEmptyState() {
  const t = useTranslations('superadmin_platform_configuration_integrations');
    return <div data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-connections-empty-state-connections-empty-state-connect"><EmptyState title={t('ui.connections_83a6ef0')} description={t('ui.connect_a_payment_messaging_email_or_storage_ser_49e57f2')} data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-connections-empty-state-connections-empty-state-empty"/>
    </div>;
}
