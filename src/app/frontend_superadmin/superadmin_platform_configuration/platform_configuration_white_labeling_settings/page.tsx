// RESPONSIBILITY: Renders/orchestrates page within its owning Superadmin feature module; no direct backend implementation.
import { Suspense } from 'react';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/SuperadminPlatformConfigurationWhiteLabelingSettingsPageSuspenseSkeleton';
// RESPONSIBILITY: Server route entry for Superadmin White-labeling; the interactive feature is isolated in its client component.
import SuperadminPlatformConfigurationWhiteLabelingMain from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/components/white_labeling_settings_main/SuperadminPlatformConfigurationWhiteLabelingSettingsMain';

import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'White-Labeling & Domains | Superadmin',
  description: 'Manage custom domains and branding for tenant gyms',
};

/**
 * @description Server route entry for Superadmin White-labeling; the interactive feature is isolated in its client component.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformConfigurationWhiteLabelingPage() {
  return <Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
        <SuperadminPlatformConfigurationWhiteLabelingMain />
      </Suspense>;
}
