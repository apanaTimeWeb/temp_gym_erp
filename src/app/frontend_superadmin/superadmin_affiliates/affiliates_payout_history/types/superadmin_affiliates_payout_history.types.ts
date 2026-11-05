import { SUPERADMIN_AFFILIATE_STATUS_FILTERS } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/constants/superadmin_affiliates_payout_history_filter.constants';
import { AffiliateStatusSchema, AffiliateRecordSchema, AffiliateSchema, AffiliatePayoutRecordSchema } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/schemas/superadmin_affiliates_payout_history_types.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines affiliate domain, form, response, and payout-history contracts for the Superadmin module.
export type AffiliateStatus = ZodInfer<typeof AffiliateStatusSchema>;
/** Filter tabs for the Affiliates status dropdown. */

export type AffiliateStatusFilter = typeof SUPERADMIN_AFFILIATE_STATUS_FILTERS[number];
export type Affiliate = ZodInfer<typeof AffiliateRecordSchema>;
export type AffiliateFormData = ZodInfer<typeof AffiliateSchema>;
export type AffiliatePayoutRecord = ZodInfer<typeof AffiliatePayoutRecordSchema>;
