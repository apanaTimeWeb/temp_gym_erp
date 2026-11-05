/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsInfrastructureV1Schema owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminInfrastructureV1DataSchema = z.object({ summary: z.object({ requestsPerMinute: z.number(), errorsPercent: z.number().min(0).max(100), p50: z.number(), p95: z.number(), p99: z.number() }), endpoints: z.array(z.object({ name: z.string(), p50: z.number(), p95: z.number(), p99: z.number(), errors: z.number() })), incidents: z.array(z.object({ title: z.string(), impact: z.string(), started: z.string(), status: z.string() })) });
