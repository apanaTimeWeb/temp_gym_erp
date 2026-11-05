'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminPlatformConfigurationFeaturesManagementMainViewModel → consuming feature component.
import { useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useSuperadminPlatformConfigurationFeaturesManagementActions } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementActions';
import { useSuperadminPlatformConfigurationFeaturesManagementData } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementData';
import { useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags';

import type { FeaturesTab } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_ui.types';
import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';


// DATA FLOW: API / URL state / module client state → useRef → superadmin_platform_configuration_features view components.
/**
 * @description Owns Product Management page state, form orchestration, mutation intents, and feature-local feedback.
 * @dependencies Uses the module server-state hook, confirmation infrastructure, and feature-local validation contract.
 * @edge-case Idempotency keys persist across retry attempts for the same user intent and clear only after success.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminPlatformConfigurationFeaturesManagementMainViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin features main view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminPlatformConfigurationFeaturesManagementMainViewModel() {
  const t = useTranslations('superadmin_platform_configuration_features');
  const [activeTab, setActiveTab] = useState<FeaturesTab>('FLAGS');
  const [rolloutFlag, setRolloutFlag] = useState<FeatureFlag | null>(null);
  const [historyFlag, setHistoryFlag] = useState<FeatureFlag | null>(null);
  const [editingFlag, setEditingFlag] = useState<FeatureFlag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const metadataIntentRef = useRef<{ fingerprint: string; key: string } | null>(null);
  const dataState = useSuperadminPlatformConfigurationFeaturesManagementData();
  const filteredFlags = useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags(dataState.data?.flags ?? [], searchQuery);


  const actions = useSuperadminPlatformConfigurationFeaturesManagementActions({
    updateFeatureFlagStatus: dataState.updateFeatureFlagStatus,
    updateFlag: dataState.updateFlag,
    rolloutFlag,
  }, (key, values) => t(key as never, values as never));

  const handleSaveMetadata = async (id: string, name: string, description: string) => {
    const fingerprint = `${id}\u0000${name.trim()}\u0000${description.trim()}`;
    if (metadataIntentRef.current?.fingerprint !== fingerprint) {
      metadataIntentRef.current = { fingerprint, key: crypto.randomUUID() };
    }
    const idempotencyKey = metadataIntentRef.current?.key;
    if (!idempotencyKey) return;
    try {
      const response = await dataState.updateFlag({ id, body: { name: name.trim(), description: description.trim() }, idempotencyKey });
      metadataIntentRef.current = null;
      setEditingFlag(null);
      toast.success(response.message || t('ui.feature_metadata_saved'), { id: `feature-metadata-saved-${id}` });
    } catch (error: unknown) {
      toast.error(t('ui.action_failed_retry'), { id: `feature-metadata-failed-${id}` });
      throw error;
    }
  };


  return {
    t,
    ...dataState,
    activeTab,
    setActiveTab,
    rolloutFlag,
    setRolloutFlag,
    historyFlag,
    setHistoryFlag,
    editingFlag,
    setEditingFlag,
    handleSaveMetadata,
    searchQuery,
    setSearchQuery,
    filteredFlags,
    handleToggle: actions.handleToggle,
    handleSaveRollout: actions.handleSaveRollout,
  };
}
