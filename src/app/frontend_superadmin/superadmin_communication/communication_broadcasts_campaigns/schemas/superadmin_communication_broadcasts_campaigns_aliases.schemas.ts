/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationBroadcastsSchemas owned by the superadmin_communication_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_contract.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Keeps the existing feature validation contract under the canonical schema boundary for module tests.
import { BroadcastSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_contract.schemas';
export const broadcastSchema = BroadcastSchema;
