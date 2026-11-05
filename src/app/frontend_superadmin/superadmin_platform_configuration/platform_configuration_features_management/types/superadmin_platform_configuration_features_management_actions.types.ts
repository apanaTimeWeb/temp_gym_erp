/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationFeaturesActionsTypes owned by the superadmin_platform_configuration_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminPlatformConfigurationFeaturesManagementData.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementData, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import type { useSuperadminPlatformConfigurationFeaturesManagementData } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementData';

import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';



export interface SuperadminPlatformConfigurationFeaturesActionsConfig {
  updateFeatureFlagStatus: ReturnType<typeof useSuperadminPlatformConfigurationFeaturesManagementData>['updateFeatureFlagStatus'];
  updateFlag: ReturnType<typeof useSuperadminPlatformConfigurationFeaturesManagementData>['updateFlag'];
  rolloutFlag: FeatureFlag | null;
}
