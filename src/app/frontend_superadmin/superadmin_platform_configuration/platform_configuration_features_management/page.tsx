// RESPONSIBILITY: Pure Server Component for the features page. Renders the interactive client component.
import { Suspense } from 'react';

import SuperadminPlatformConfigurationFeaturesMain from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/components/features_management_main/SuperadminPlatformConfigurationFeaturesManagementMain';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/components/SuperadminPlatformConfigurationFeaturesManagementPageSuspenseSkeleton';



/**
 * @description Pure Server Component for the features page. Renders the interactive client component.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function Page() {
    return (<Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
      <SuperadminPlatformConfigurationFeaturesMain />
    </Suspense>);
}
