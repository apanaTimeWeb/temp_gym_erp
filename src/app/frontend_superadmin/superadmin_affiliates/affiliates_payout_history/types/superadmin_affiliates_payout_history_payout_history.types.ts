// RESPONSIBILITY: Defines props for the affiliate payout history view.
import type { AffiliatePayoutRecord } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/types/superadmin_affiliates_payout_history.types';
export interface SuperadminAffiliatesPayoutHistoryProps {
  payouts: AffiliatePayoutRecord[];
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
}
