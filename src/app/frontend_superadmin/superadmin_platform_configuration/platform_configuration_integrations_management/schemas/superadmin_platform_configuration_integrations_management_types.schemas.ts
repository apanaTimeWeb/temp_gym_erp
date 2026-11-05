/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationIntegrationsTypesSchemas owned by the superadmin_platform_configuration_integrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminIntegrationTenantSchema = z.object({ id: z.string(), name: z.string() });

export const SuperadminIntegrationKeySchema = z.object({
    id: z.string(),
    tenant: z.string(),
    label: z.string(),
    status: z.string(),
    lastUsed: z.string().nullable(),
    rateLimit: z.string(),
});

export const SuperadminGenerateApiKeyResultSchema = z.object({
    key: SuperadminIntegrationKeySchema,
    secretKey: z.string().min(1),
});

export const SuperadminPlatformConfigurationIntegrationsResponseSchema = z.object({
    tenants: z.array(SuperadminIntegrationTenantSchema),
    integrations: z.array(
        z.object({
            name: z.string(),
            type: z.string(),
            status: z.string(),
            lastEvent: z.string().nullable(),
            failedEvents: z.number(),
            health: z.number(),
        }),
    ),
    webhooks: z.array(
        z.object({
            id: z.string(),
            event: z.string(),
            integration: z.string(),
            status: z.string(),
            attempts: z.number(),
            latency: z.number(),
            time: z.string(),
        }),
    ),
    keys: z.array(SuperadminIntegrationKeySchema),
});
