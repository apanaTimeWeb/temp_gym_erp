import type { FeaturesTab } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_ui.types';

export interface SuperadminPlatformConfigurationFeaturesHeaderProps {
  activeTab: FeaturesTab;
  onTabChange: (tab: FeaturesTab) => void;
}
