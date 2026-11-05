// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Earnings server state.
import type { TrainerEarningsQueryParams } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsQueryTypes';
export const TRAINER_EARNINGS_QUERY_KEYS = {
  all: ['trainer_earnings'] as const,
  dataAll: () => [...TRAINER_EARNINGS_QUERY_KEYS.all, 'data'] as const,
  data: (params: TrainerEarningsQueryParams) => [...TRAINER_EARNINGS_QUERY_KEYS.dataAll(), params] as const,
} as const;
