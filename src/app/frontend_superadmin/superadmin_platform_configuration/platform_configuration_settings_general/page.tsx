// RESPONSIBILITY: Pure Server Component for the settings page. Renders the interactive client component.
import { Suspense } from 'react';

import SuperadminPlatformConfigurationSettingsMain from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/components/settings_general_main/SuperadminPlatformConfigurationSettingsGeneralMain';
import SuperadminPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/components/SuperadminPlatformConfigurationSettingsGeneralPageSuspenseSkeleton';


/**
 * @description Pure Server Component for the settings page. Renders the interactive client component.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminPlatformConfigurationSettingsMain />
    </Suspense>);
}
