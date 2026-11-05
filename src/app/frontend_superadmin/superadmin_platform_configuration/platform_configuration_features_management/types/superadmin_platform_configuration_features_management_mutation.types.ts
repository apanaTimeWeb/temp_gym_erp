// RESPONSIBILITY: Named mutation contracts for Superadmin feature flag and release-note writes.
import type { FeatureFlag, ReleaseNote } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';
export interface SuperadminFeatureFlagStatusMutationInput { id: string; enabled: boolean; idempotencyKey: string; }
export interface SuperadminFeatureFlagUpdateMutationInput { id: string; body: Partial<FeatureFlag>; idempotencyKey: string; }
export interface SuperadminReleaseNoteCreateMutationInput { data: Partial<ReleaseNote>; idempotencyKey: string; }

export interface SuperadminFeatureRolloutMutationConfig {
  onSaveRollout: (tenantIds: string[], idempotencyKey: string) => Promise<void>;
  onSuccess: () => void;
}

export interface SuperadminReleaseNoteDeleteMutationInput { id: string; idempotencyKey: string; }
