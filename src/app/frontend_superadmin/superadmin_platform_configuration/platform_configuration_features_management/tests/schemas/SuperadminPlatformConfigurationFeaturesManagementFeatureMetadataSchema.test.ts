import { describe, expect, it } from 'vitest';
import { createSuperadminPlatformConfigurationFeaturesFeatureMetadataSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/schemas/superadmin_platform_configuration_features_management_feature_metadata.schemas';

describe('Superadmin feature metadata schema', () => {
  const schema = createSuperadminPlatformConfigurationFeaturesFeatureMetadataSchema('Name is required');
  it('trims the required name and preserves the description', () => {
    expect(schema.parse({ name: '  Billing  ', description: ' Manage billing ' })).toEqual({ name: 'Billing', description: ' Manage billing ' });
  });
  it('rejects an empty name', () => {
    expect(schema.safeParse({ name: '   ', description: '' }).success).toBe(false);
  });
});
