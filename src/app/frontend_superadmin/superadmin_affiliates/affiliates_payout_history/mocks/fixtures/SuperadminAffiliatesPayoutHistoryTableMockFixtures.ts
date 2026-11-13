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
  { id: 'p5', affiliateId: 'a2', affiliateName: 'Vikram Singh', amount: 950000, currency: 'INR', method: 'BANK_TRANSFER', referenceId: 'REF-A2-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.COMPLETED, paidAt: '2026-09-01T11:00:00.000Z' },
  { id: 'p6', affiliateId: 'a3', affiliateName: 'Priya Sharma', amount: 650000, currency: 'INR', method: 'PAYPAL', referenceId: 'REF-A3-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.COMPLETED, paidAt: '2026-09-05T15:20:00.000Z' },
  { id: 'p7', affiliateId: 'a6', affiliateName: 'FitTech Influencers', amount: 1750000, currency: 'INR', method: 'BANK_TRANSFER', referenceId: 'REF-A6-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.PENDING, paidAt: '2026-09-14T09:45:00.000Z' },
  { id: 'p8', affiliateId: 'a7', affiliateName: 'Karan Mehra', amount: 420000, currency: 'INR', method: 'BANK_TRANSFER', referenceId: 'REF-A7-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.PENDING, paidAt: '2026-08-18T16:10:00.000Z' },
  { id: 'p9', affiliateId: 'a9', affiliateName: 'Aman Verma', amount: 880000, currency: 'INR', method: 'PAYPAL', referenceId: 'REF-A9-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.COMPLETED, paidAt: '2026-09-10T12:00:00.000Z' },
  { id: 'p10', affiliateId: 'a10', affiliateName: 'Ananya Roy', amount: 310000, currency: 'INR', method: 'BANK_TRANSFER', referenceId: 'REF-A10-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.COMPLETED, paidAt: '2026-07-29T10:15:00.000Z' },
  { id: 'p11', affiliateId: 'a11', affiliateName: 'Sanjay Dutt Fitness', amount: 1450000, currency: 'INR', method: 'BANK_TRANSFER', referenceId: 'REF-A11-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.PENDING, paidAt: '2026-09-15T18:00:00.000Z' },
  { id: 'p12', affiliateId: 'a12', affiliateName: 'Deepak Patel', amount: 550000, currency: 'INR', method: 'PAYPAL', referenceId: 'REF-A12-001', status: SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.COMPLETED, paidAt: '2026-08-30T14:30:00.000Z' },
];
