/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsJobsSchema owned by the superadmin_system_ops_jobs feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const BackgroundJobSchema = z.object({
    id: z.string(),
    queueName: z.string(),
    jobName: z.string(),
    status: z.enum(['ACTIVE', 'COMPLETED', 'FAILED', 'DELAYED', 'CANCELLED']),
    attempts: z.number(),
    error: z.string().optional(),
    createdAt: z.string(),
    finishedAt: z.string().optional(),
    durationMs: z.number().nonnegative().optional(),
    payload: z.unknown().optional(),
});

export const JobsMetricsSchema = z.object({
    activeJobs: z.number(),
    completed24h: z.number(),
    failed24h: z.number(),
    delayed: z.number(),
});
