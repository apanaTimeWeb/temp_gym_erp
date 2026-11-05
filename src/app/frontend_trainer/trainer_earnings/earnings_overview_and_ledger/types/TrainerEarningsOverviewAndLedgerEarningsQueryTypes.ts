// RESPONSIBILITY: Canonical query-key parameter contracts for Trainer Earnings.
import type { TrainerEarningsEarningsSortDirection, TrainerEarningsEarningsSortField } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsSortTypes';

export interface TrainerEarningsQueryParams {
  startDate: string;
  endDate: string;
  search: string;
  page: number;
  limit: number;
  sortBy: TrainerEarningsEarningsSortField;
  sortDirection: TrainerEarningsEarningsSortDirection;
}
