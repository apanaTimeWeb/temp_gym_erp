'use client';

// DATA FLOW: Feature UI intent → confirmation → feature mutation hook → authoritative response → toast/cache-visible result.
// RESPONSIBILITY: Owns release-note publication, feature-flag toggles, and tenant rollout actions for the Superadmin Features module.


import { useRef } from 'react';

import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { createSuperadminPlatformConfigurationFeaturesManagementFormApiError } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/utils/SuperadminPlatformConfigurationFeaturesManagementFormApiErrors';

import type { SuperadminPlatformConfigurationFeaturesActionsConfig } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_actions.types';
import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';

/**
 * @description Coordinates confirmed feature-management mutations for release notes, flags, and tenant rollout updates.
 * @dependencies Consumes the feature-owned mutation functions and confirmation infrastructure passed through the config object.
 * @edge-case Reuses one idempotency key per user intent and preserves the authoritative backend response while exposing translated safe failure feedback.
 */

/**
 * @description Owns user-confirmed feature-management actions so the root view remains presentation-focused.
 * @dependencies Uses the module data/mutation hook contract, approval dialog infrastructure, and existing translations supplied by the caller.
 * @edge-case Reuses the same idempotency key for retries of one intent and clears it only after the corresponding mutation succeeds.
 */
export function useSuperadminPlatformConfigurationFeaturesManagementActions(config: SuperadminPlatformConfigurationFeaturesActionsConfig, translate: (key: string, values?: Record<string, string>) => string) {
  const { confirm } = useConfirm();
  const flagKeysRef = useRef(new Map<string, { fingerprint: string; key: string }>());


  const handleToggle = async (flag: FeatureFlag) => {
    const nextEnabledState = !flag.isGlobalEnabled;
    const confirmed = await confirm({
      title: nextEnabledState ? translate('ui.enable_feature_flag_title') : translate('ui.suspend_feature_flag_title'),
      message: nextEnabledState ? translate('ui.enable_feature_flag_message', { name: flag.name }) : translate('ui.suspend_feature_flag_message', { name: flag.name }),
      type: 'warning',
      confirmText: nextEnabledState ? translate('ui.enable_action') : translate('ui.suspend_action'),
      cancelText: translate('ui.cancel_action'),
    });
    if (!confirmed) return;
    try {
      const fingerprint = JSON.stringify({ id: flag.id, enabled: nextEnabledState });
      const previous = flagKeysRef.current.get(flag.id);
      const intent = previous?.fingerprint === fingerprint ? previous : { fingerprint, key: crypto.randomUUID() };
      flagKeysRef.current.set(flag.id, intent);
      const idempotencyKey = intent.key;
      const response = await config.updateFeatureFlagStatus({ id: flag.id, enabled: nextEnabledState, idempotencyKey });
      if (!response.success) throw createSuperadminPlatformConfigurationFeaturesManagementFormApiError(response);
      flagKeysRef.current.delete(flag.id);
      toast.success(response.message, { id: `feature-flag-status-${flag.id}` });
    } catch (error: unknown) {
      toast.error(translate('ui.action_failed_retry'), { id: `feature-flag-status-error-${flag.id}` });
    }
  };

  const handleSaveRollout = async (tenantIds: string[], idempotencyKey: string) => {
    if (!config.rolloutFlag) return;
    try {
      const response = await config.updateFlag({ id: config.rolloutFlag.id, body: { enabledTenantIds: tenantIds }, idempotencyKey });
      if (!response.success) throw createSuperadminPlatformConfigurationFeaturesManagementFormApiError(response);
      toast.success(response.message, { id: 'canary-rollout-updated-successfully' });
    } catch (error: unknown) {
      toast.error(translate('ui.action_failed_retry'), { id: 'failed-to-update-canary-rollout' });
      throw error;
    }
  };

  return { handleToggle, handleSaveRollout };
}
