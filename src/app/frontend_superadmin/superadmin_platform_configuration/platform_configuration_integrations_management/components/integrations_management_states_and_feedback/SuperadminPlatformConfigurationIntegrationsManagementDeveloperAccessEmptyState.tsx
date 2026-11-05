// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationIntegrationsDeveloperAccessEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin developer access list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';



/**
 * @description Renders the dedicated empty state for the Superadmin developer access list.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminPlatformConfigurationIntegrationsManagementDeveloperAccessEmptyState() {
  const t = useTranslations('superadmin_platform_configuration_integrations');
    return <div data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-developer-access-empty-state-access-empty-state-empty"><EmptyState title={t('ui.developer_access_3462a73')} description={t('ui.issue_a_developer_key_only_when_a_tenant_integra_f64a8ae')} data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-developer-access-empty-state-access-empty-state-empty-2"/>
    </div>;
}
