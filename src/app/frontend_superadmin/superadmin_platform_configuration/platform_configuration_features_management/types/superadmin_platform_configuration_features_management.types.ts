import type { FeatureFlagSchema, ReleaseNoteSchema, SuperadminPlatformConfigurationFeaturesTenantSchema, SuperadminFeatureHistoryEntrySchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/schemas/superadmin_platform_configuration_features_management_types.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Encapsulates functionality for superadmin_platform_configuration_features_types.ts
export type FeatureFlag = ZodInfer<typeof FeatureFlagSchema>;
export type ReleaseNote = ZodInfer<typeof ReleaseNoteSchema>;
export type SuperadminPlatformConfigurationFeaturesTenant = ZodInfer<typeof SuperadminPlatformConfigurationFeaturesTenantSchema>;
export type SuperadminFeatureHistoryEntry = ZodInfer<typeof SuperadminFeatureHistoryEntrySchema>;
