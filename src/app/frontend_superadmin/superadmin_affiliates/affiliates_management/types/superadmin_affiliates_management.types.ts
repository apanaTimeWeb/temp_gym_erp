import { SUPERADMIN_AFFILIATE_STATUS_FILTERS } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management_filter.constants';
import { AffiliateStatusSchema, AffiliateRecordSchema, AffiliateSchema, AffiliatePayoutRecordSchema } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/schemas/superadmin_affiliates_management_types.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines affiliate domain, form, response, and payout-history contracts for the Superadmin module.
export type AffiliateStatus = ZodInfer<typeof AffiliateStatusSchema>;
/** Filter tabs for the Affiliates status dropdown. */

export type AffiliateStatusFilter = typeof SUPERADMIN_AFFILIATE_STATUS_FILTERS[number];
export type Affiliate = ZodInfer<typeof AffiliateRecordSchema>;
export type AffiliateFormData = ZodInfer<typeof AffiliateSchema>;
export type AffiliatePayoutRecord = ZodInfer<typeof AffiliatePayoutRecordSchema>;
