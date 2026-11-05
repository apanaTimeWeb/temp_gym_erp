/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsJobsV1Schema owned by the superadmin_system_ops_jobs feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminSystemOpsJobsV1DataSchema = z.object({ summary: z.object({ waiting: z.number(), running: z.number(), failed24h: z.number(), deadLetter: z.number(), oldestWaitingMinutes: z.number() }), queues: z.array(z.object({ name: z.string(), waiting: z.number(), running: z.number(), failed24h: z.number(), deadLetter: z.number() })), recentFailures: z.array(z.object({ job: z.string(), tenant: z.string(), time: z.string(), reason: z.string() })) });
