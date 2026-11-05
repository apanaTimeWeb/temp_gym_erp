/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAffiliatesApiSchema owned by the superadmin_affiliates feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/schemas/superadmin_affiliates_payout_history_types.schemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

import { AffiliatePayoutRecordSchema, AffiliateRecordSchema } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/schemas/superadmin_affiliates_payout_history_types.schemas';



export const SuperadminAffiliatesListDataSchema = z.array(AffiliateRecordSchema);
export const SuperadminAffiliatesDeleteDataSchema = z.null();
export const SuperadminAffiliatesPayoutHistoryDataSchema = z.array(AffiliatePayoutRecordSchema);
