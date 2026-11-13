// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationFeaturesMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import SuperadminPlatformConfigurationFeaturesFlagsPanel from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/components/features_management_flags_panel/SuperadminPlatformConfigurationFeaturesManagementFlagsPanel';
import SuperadminPlatformConfigurationFeaturesHeader from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/components/features_management_header/SuperadminPlatformConfigurationFeaturesManagementHeader';
import SuperadminPlatformConfigurationFeaturesFeatureHistoryModal from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/components/features_management_modals/SuperadminPlatformConfigurationFeaturesManagementFeatureHistoryModal';
import SuperadminPlatformConfigurationFeaturesFeatureMetadataModal from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/components/features_management_modals/SuperadminPlatformConfigurationFeaturesManagementFeatureMetadataModal';
import SuperadminPlatformConfigurationFeaturesFeatureRolloutModal from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/components/features_management_modals/SuperadminPlatformConfigurationFeaturesManagementFeatureRolloutModal';
import SuperadminPlatformConfigurationFeaturesTierMatrix from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/components/SuperadminPlatformConfigurationFeaturesManagementTierMatrix';
import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/config/superadmin_platform_configuration_features_management.url_config';
import { useSuperadminPlatformConfigurationFeaturesManagementMainViewModel } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementMainViewModel';

// RESPONSIBILITY: Orchestrates the Product Management feature tabs and composes child views; it owns no direct API calls or business calculations.


/**
 * @description Composes Product Management child sections and delegates state/mutation ownership to the feature-local view model.
 * @dependencies Uses only feature-local child components and the feature view-model; route providers remain outside this component.
 * @edge-case Loading/error states terminate before interactive children mount; mutation and dialog state are preserved in the feature hooks.
 */
export default function SuperadminPlatformConfigurationFeaturesManagementMain() {
  const {
    data,
    isPending,
    error,
    refetch,
    activeTab,
    setActiveTab,
    rolloutFlag,
    setRolloutFlag,
    historyFlag,
    setHistoryFlag,
    editingFlag,
    setEditingFlag,
    handleSaveMetadata,
    isUpdatingFeatureFlagMetadata,
    searchQuery,
    setSearchQuery,
    filteredFlags,
    handleToggle,
    handleSaveRollout,
    t,
  } = useSuperadminPlatformConfigurationFeaturesManagementMainViewModel();

  const router=useRouter();const legacy=useSearchParams();
  useEffect(()=>{if(legacy.get('tab')?.toUpperCase()==='NOTES')router.replace(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES.DESTINATION_1);},[router,legacy]);
  const flags = data?.flags ?? [];

  if (isPending) {
    return (
      <div className="space-y-4 motion-safe:animate-pulse" data-testid="superadmin_platform_configuration_features-superadmin-features-main-superadmin_platform_configuration_features-main-loading">
        <div className="h-8 w-64 rounded bg-skeleton-base" />
        <div className="h-96 rounded-xl border border-border bg-skeleton-base" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <section className="rounded-xl border border-border bg-danger-bg p-8 text-center" role="alert" data-testid="superadmin_platform_configuration_features-superadmin-features-main-superadmin_platform_configuration_features-main-error">
        <p className="font-medium text-danger">{t('ui.feature_data_could_not_be_loaded_2c1bc05')}</p>
        <p className="mt-2 text-sm text-secondary">{t('ui.please_retry_the_request_to_continue_8770b5f')}</p>
        <button  type="button" onClick={() => void refetch()} className="mt-4 min-h-11 min-w-32 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_platform_configuration_features-superadmin-features-main-superadmin_platform_configuration_features-main-retry">
          {t('ui.try_again_94b8c58')}
        </button>
      </section>
    );
  }

  return (
    <div className="space-y-6" data-testid="superadmin_platform_configuration_features-superadmin-features-main-page-ready">
      <SuperadminPlatformConfigurationFeaturesHeader activeTab={activeTab} onTabChange={(tab)=>{if(tab==='NOTES')router.push(SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES.DESTINATION_1);else setActiveTab(tab);}} />

      {activeTab === 'FLAGS' ? (
        <SuperadminPlatformConfigurationFeaturesFlagsPanel
          flags={filteredFlags}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onManageRollout={setRolloutFlag}
          onViewHistory={setHistoryFlag}
          onEditMetadata={setEditingFlag}
          onCreateFlag={() => setEditingFlag({ id: '', name: '', description: '', isGlobalEnabled: false, enabledTenantIds: [] })}
          onToggle={handleToggle}
        />
      ) : null}


      {activeTab === 'TIERS' ? <SuperadminPlatformConfigurationFeaturesTierMatrix /> : null}

      <SuperadminPlatformConfigurationFeaturesFeatureRolloutModal
        isOpen={Boolean(rolloutFlag)}
        onClose={() => setRolloutFlag(null)}
        flag={rolloutFlag}
        onSaveRollout={handleSaveRollout}
      />

      <SuperadminPlatformConfigurationFeaturesFeatureHistoryModal
        isOpen={Boolean(historyFlag)}
        onClose={() => setHistoryFlag(null)}
        flag={historyFlag}
      />

      <SuperadminPlatformConfigurationFeaturesFeatureMetadataModal
        isOpen={Boolean(editingFlag)}
        flag={editingFlag}
        isSubmitting={Boolean(isUpdatingFeatureFlagMetadata)}
        onClose={() => setEditingFlag(null)}
        onSave={handleSaveMetadata}
      />

    </div>
  );
}
