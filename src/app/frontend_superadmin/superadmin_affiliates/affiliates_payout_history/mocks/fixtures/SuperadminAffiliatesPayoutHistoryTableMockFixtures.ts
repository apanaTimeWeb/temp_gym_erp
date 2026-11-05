/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAffiliatesPayoutHistoryMockFixtures owned by the superadmin_affiliates feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/constants/superadmin_affiliates_payout_history.constants, @/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/types/superadmin_affiliates_payout_history.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns static Superadmin affiliate payout-history records for the module's MSW contract.
import { SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/constants/superadmin_affiliates_payout_history.constants';

import type { AffiliatePayoutRecord } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/types/superadmin_affiliates_payout_history.types';


export const MOCK_SUPERADMIN_AFFILIATE_PAYOUT_HISTORY: AffiliatePayoutRecord[] = [
  { id: 'p1', affiliateId: 'a1', affiliateName: 'John Doe', amount: 500000, currency: 'INR', method: 'BANK_TRANSFER', referenceId: 'REF-A1-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.COMPLETED, paidAt: '2026-08-20T10:00:00.000Z' },
  { id: 'p2', affiliateId: 'a4', affiliateName: 'Coach Riya', amount: 800000, currency: 'INR', method: 'BANK_TRANSFER', referenceId: 'REF-A4-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.PENDING, paidAt: '2026-09-12T10:30:00.000Z' },
  { id: 'p3', affiliateId: 'a5', affiliateName: 'Gym Growth Media', amount: 1200000, currency: 'INR', method: 'PAYPAL', referenceId: 'REF-A5-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.COMPLETED, paidAt: '2026-08-28T14:00:00.000Z' },
  { id: 'p4', affiliateId: 'a8', affiliateName: 'Local Fitness Guide', amount: 250000, currency: 'INR', method: 'BANK_TRANSFER', referenceId: 'REF-A8-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.COMPLETED, paidAt: '2026-08-05T09:00:00.000Z' },
];
