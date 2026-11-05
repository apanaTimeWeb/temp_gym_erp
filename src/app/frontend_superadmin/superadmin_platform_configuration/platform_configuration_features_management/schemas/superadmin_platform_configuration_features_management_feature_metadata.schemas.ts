import { z } from 'zod';

export function createSuperadminPlatformConfigurationFeaturesFeatureMetadataSchema(nameRequiredMessage: string) {
  return z.object({
    name: z.string().trim().min(1, nameRequiredMessage),
    description: z.string(),
  });
}

export type SuperadminPlatformConfigurationFeaturesFeatureMetadataFormValues = z.infer<ReturnType<typeof createSuperadminPlatformConfigurationFeaturesFeatureMetadataSchema>>;
