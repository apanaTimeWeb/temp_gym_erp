// RESPONSIBILITY: Defines the read-only feature-to-SaaS-tier matrix domain types for the Superadmin Features surface.
import type { SUPERADMIN_FEATURE_TIER_IDS, SUPERADMIN_FEATURE_IDS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/constants/superadmin_platform_configuration_features_management_tier_matrix.constants';

export type SuperadminFeatureTierId = typeof SUPERADMIN_FEATURE_TIER_IDS[number];

export type SuperadminFeatureId = typeof SUPERADMIN_FEATURE_IDS[number];

export type SuperadminFeatureTierMatrixState = Record<SuperadminFeatureId, Record<SuperadminFeatureTierId, boolean>>;
