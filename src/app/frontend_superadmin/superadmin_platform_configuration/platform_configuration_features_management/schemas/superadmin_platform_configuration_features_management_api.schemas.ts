/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationFeaturesApiSchema owned by the superadmin_platform_configuration_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/schemas/superadmin_platform_configuration_features_management_types.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

import { FeatureFlagSchema, ReleaseNoteSchema, SuperadminFeatureHistoryEntrySchema, SuperadminPlatformConfigurationFeaturesTenantSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/schemas/superadmin_platform_configuration_features_management_types.schemas';



export const SuperadminPlatformConfigurationFeaturesTenantsDataSchema = z.array(SuperadminPlatformConfigurationFeaturesTenantSchema);
export const SuperadminPlatformConfigurationFeaturesListDataSchema = z.object({
  flags: z.array(FeatureFlagSchema),
  notes: z.array(ReleaseNoteSchema),
});
export const SuperadminPlatformConfigurationFeaturesHistoryDataSchema = z.array(SuperadminFeatureHistoryEntrySchema);
export const SuperadminPlatformConfigurationFeaturesDeleteDataSchema = z.null();
