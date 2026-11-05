/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationFeaturesTypesSchemas owned by the superadmin_platform_configuration_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const FeatureFlagSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    isGlobalEnabled: z.boolean(),
    enabledTenantIds: z.array(z.string())
});

export const ReleaseNoteSchema = z.object({
    id: z.string(),
    version: z.string(),
    title: z.string(),
    content: z.string(),
    date: z.string(),
    isPublished: z.boolean()
});

export const SuperadminPlatformConfigurationFeaturesTenantSchema = z.object({
    id: z.string(),
    name: z.string(),
    plan: z.string()
});

export const SuperadminFeatureHistoryEntrySchema = z.object({ id: z.string(), action: z.string(), user: z.string(), timestamp: z.string() });
