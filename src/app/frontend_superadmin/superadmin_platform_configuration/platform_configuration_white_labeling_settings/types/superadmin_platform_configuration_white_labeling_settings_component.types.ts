// RESPONSIBILITY: Defines prop contracts for White-labeling presentation components.
import type { WhiteLabelDomain } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types';

export interface SuperadminPlatformConfigurationWhiteLabelingTableProps {
  domains: WhiteLabelDomain[];
}

export interface SuperadminPlatformConfigurationWhiteLabelingStatusBadgeProps {
  status: WhiteLabelDomain['status'] | WhiteLabelDomain['sslStatus'];
}

export interface SuperadminPlatformConfigurationWhiteLabelingDrawerProps {
  domains: WhiteLabelDomain[];
}
