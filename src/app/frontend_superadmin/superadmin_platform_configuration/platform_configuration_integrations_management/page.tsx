// RESPONSIBILITY: Renders/orchestrates page within its owning Superadmin feature module; no direct backend implementation.
import { Suspense } from 'react';

import SuperadminPlatformConfigurationIntegrationsMain from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/components/integrations_management_main/SuperadminPlatformConfigurationIntegrationsManagementMain';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/components/SuperadminPlatformConfigurationIntegrationsManagementPageSuspenseSkeleton';


// RESPONSIBILITY: Framework route artifact for integrations.


/**
 * @description Framework route artifact for integrations.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function SuperadminPlatformConfigurationIntegrationsPage() {
    return <Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
        <SuperadminPlatformConfigurationIntegrationsMain />
      </Suspense>;
}
