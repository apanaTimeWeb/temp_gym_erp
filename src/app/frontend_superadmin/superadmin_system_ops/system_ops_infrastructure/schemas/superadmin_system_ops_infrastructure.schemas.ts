/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsInfrastructureSchema owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const NodeStatusSchema = z.enum(['HEALTHY', 'DEGRADED', 'DOWN']);

export const CacheStatusSchema = z.enum(['CONNECTED', 'DISCONNECTED', 'STALE']);

export const InfrastructureNodeSchema = z.object({
    id: z.string(),
    name: z.string(),
    region: z.string(),
    status: NodeStatusSchema,
    cpuPercent: z.number().min(0).max(100).nullable(),
    memoryPercent: z.number().min(0).max(100).nullable(),
    diskPercent: z.number().min(0).max(100).nullable(),
    uptime: z.string(),
    lastChecked: z.string(),
});

export const RedisTelemetrySchema = z.object({
    status: CacheStatusSchema,
    memoryUsagePercent: z.number().min(0).max(100),
    hitRatioPercent: z.number().min(0).max(100),
    totalKeysCached: z.number(),
    uptimeHours: z.number(),
});

export const SuperadminInfrastructureTenantSchema = z.object({
    id: z.string(),
    name: z.string(),
});
