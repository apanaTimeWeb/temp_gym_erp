'use client';


import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.query_keys';

import type { SuperadminPlatformConfigurationFeaturesFeatureRolloutModalProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_ui.types';
import type { MutableRefObject } from 'react';

/** Owns the feature-local canary rollout mutation so UI components remain view-only. */
/**
 * @description Owns the tenant-scoped canary rollout mutation lifecycle for a selected feature flag.
 * @dependencies Uses the feature rollout API contract, selected tenant IDs, and caller-owned success callback.
 * @edge-case Reuses the same idempotency key for one rollout intent and keeps the draft recoverable after a failed mutation.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin features feature rollout mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutMutation(onSaveRollout: SuperadminPlatformConfigurationFeaturesFeatureRolloutModalProps['onSaveRollout'], selectedTenantIds: string[], idempotencyKeyRef: MutableRefObject<string | null>, onSuccess: () => void) {
  const queryClient = useQueryClient();

  const intentRef = useRef<{ fingerprint: string; key: string } | null>(null);
  return useMutation({
    mutationFn: () => {
      const normalizedIds = [...new Set(selectedTenantIds)].sort();
      const fingerprint = JSON.stringify(normalizedIds);
      if (!intentRef.current || intentRef.current.fingerprint !== fingerprint) intentRef.current = { fingerprint, key: crypto.randomUUID() };
      idempotencyKeyRef.current = intentRef.current.key;
      return onSaveRollout(normalizedIds, intentRef.current.key);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS.all });
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS.tenants });
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS.rolloutInsights });
      intentRef.current = null;
      idempotencyKeyRef.current = null;
      onSuccess();
    },
  });
}

