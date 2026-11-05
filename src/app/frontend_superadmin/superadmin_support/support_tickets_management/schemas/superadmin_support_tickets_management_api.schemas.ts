/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSupportTicketsApiSchema owned by the superadmin_support_tickets feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_types.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

import { SupportTicketSchema } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_types.schemas';



export const SuperadminSupportTicketsListDataSchema = z.array(SupportTicketSchema);
