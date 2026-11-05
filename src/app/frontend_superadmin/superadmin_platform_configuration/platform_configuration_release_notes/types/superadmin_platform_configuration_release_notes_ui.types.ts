/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationFeaturesUiTypes owned by the superadmin_platform_configuration_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/schemas/superadmin_platform_configuration_release_notes_ui.schemas, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/constants/superadmin_platform_configuration_release_notes_ui.constants, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/types/superadmin_platform_configuration_release_notes.types, zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns UI-only types and schema contracts for Feature Flags and Release Notes.
import type { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_TABS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/constants/superadmin_platform_configuration_release_notes_ui.constants';
import type { releaseNoteSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/schemas/superadmin_platform_configuration_release_notes_ui.schemas';
import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/types/superadmin_platform_configuration_release_notes.types';
import type { infer as ZodInfer } from 'zod';


export type FeaturesTab = (typeof SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_TABS)[number];
export type ReleaseNoteFormValues = ZodInfer<typeof releaseNoteSchema>;
export interface SuperadminPlatformConfigurationFeaturesFeatureRolloutModalProps {
    isOpen: boolean;
    onClose: () => void;
    flag: FeatureFlag | null;
    onSaveRollout: (tenantIds: string[], idempotencyKey: string) => Promise<void>;
}
