/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationWhiteLabelingSchemas owned by the superadmin_platform_configuration_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

const WhiteLabelHostnameSchema = z.string().trim().min(1).max(253).regex(/^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*\.?$/, 'Enter a valid hostname.');

export const WhiteLabelDomainSchema = z.object({
  id: z.string().uuid(),
  gymId: z.string().uuid(),
  gymName: z.string().trim().min(1),
  domain: WhiteLabelHostnameSchema,
  status: z.enum(['pending', 'active', 'failed']),
  sslStatus: z.enum(['pending', 'issued', 'failed']),
  logoUrl: z.string().url().nullable().optional(),
  primaryColor: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
});

export const WhiteLabelDomainsDataSchema = z.array(WhiteLabelDomainSchema);

export const UpdateDomainStatusSchema = z.object({
  status: z.enum(['pending', 'active', 'failed']),
});

export const UpdateDomainStatusDataSchema = WhiteLabelDomainSchema;
