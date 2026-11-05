// RESPONSIBILITY: Defines props for the affiliate payout history view.
import type { AffiliatePayoutRecord } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types';
export interface SuperadminAffiliatesPayoutHistoryProps {
  payouts: AffiliatePayoutRecord[];
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
}
