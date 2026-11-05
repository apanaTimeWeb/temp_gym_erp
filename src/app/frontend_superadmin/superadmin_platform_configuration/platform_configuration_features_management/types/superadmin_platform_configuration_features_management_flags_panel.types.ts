import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';

export interface SuperadminPlatformConfigurationFeaturesFlagsPanelProps {
  flags: FeatureFlag[];
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onManageRollout: (flag: FeatureFlag) => void;
  onViewHistory: (flag: FeatureFlag) => void;
  onEditMetadata: (flag: FeatureFlag) => void;
  onToggle: (flag: FeatureFlag) => Promise<void>;
}
