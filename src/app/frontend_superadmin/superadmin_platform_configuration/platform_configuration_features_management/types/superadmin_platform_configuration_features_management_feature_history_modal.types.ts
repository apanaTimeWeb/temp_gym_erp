// RESPONSIBILITY: Defines the prop contract for SuperadminPlatformConfigurationFeaturesFeatureHistoryModal.
import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';
export interface SuperadminPlatformConfigurationFeaturesFeatureHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  flag: FeatureFlag | null;
}
