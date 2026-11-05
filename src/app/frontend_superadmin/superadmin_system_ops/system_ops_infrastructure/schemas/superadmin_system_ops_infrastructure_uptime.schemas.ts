/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsInfrastructureUptimeSchema owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminInfrastructureUptimePointSchema = z.object({
  timestamp: z.string(),
  uptimePercent: z.number().min(0).max(100),
});
