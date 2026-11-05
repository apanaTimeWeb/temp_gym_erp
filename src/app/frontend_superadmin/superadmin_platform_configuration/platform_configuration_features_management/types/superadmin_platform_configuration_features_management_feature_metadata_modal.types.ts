import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';

export interface SuperadminPlatformConfigurationFeaturesFeatureMetadataModalProps {
  isOpen: boolean;
  flag: FeatureFlag | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSave: (id: string, name: string, description: string) => Promise<void>;
}
