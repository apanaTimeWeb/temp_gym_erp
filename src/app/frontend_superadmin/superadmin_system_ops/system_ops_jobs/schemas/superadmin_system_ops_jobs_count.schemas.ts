/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsJobsCountSchema owned by the superadmin_system_ops_jobs feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const CountResponseSchema = z.object({ affectedCount: z.number().nonnegative() });
