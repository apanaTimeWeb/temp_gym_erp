/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsSchemas owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Keeps the existing feature validation contract under the canonical schema boundary for module tests.
import { gymCreateSchema, gymWhatsappSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory.schemas';
export const addGymSchema = gymCreateSchema;
export const emailOwnerSchema = gymWhatsappSchema;
