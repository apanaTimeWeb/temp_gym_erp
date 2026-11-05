/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsMigrationsApiSchema owned by the superadmin_system_ops_migrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/schemas/superadmin_system_ops_migrations.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

import { MigrationLogSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/schemas/superadmin_system_ops_migrations.schemas';



export const MigrationTriggerResponseSchema = z.object({
  id: z.string(),
  version: z.string(),
  status: z.string(),
});
export const SuperadminMigrationsListDataSchema = z.array(MigrationLogSchema);
