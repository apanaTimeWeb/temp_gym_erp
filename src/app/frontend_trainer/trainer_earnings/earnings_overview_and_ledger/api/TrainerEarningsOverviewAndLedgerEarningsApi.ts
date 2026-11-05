// RESPONSIBILITY: Owns the Trainer Earnings HTTP contract and validates every response before UI consumption.
import { apiFetch } from '@/lib/api';

import { TrainerEarningsDataSchema } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/schemas/TrainerEarningsOverviewAndLedgerEarningsDomainSchemas';

import { TRAINER_EARNINGS_URLS } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/config/trainer_earnings_overview_and_ledger.url_config';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/schemas/TrainerEarningsOverviewAndLedgerTrainerInfrastructureApiResponseSchema';

import type { TrainerEarningsEarningsSortDirection, TrainerEarningsEarningsSortField } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsSortTypes';

import type { TrainerEarningsData } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsTypes';

import type { ApiResponse } from '@/lib/api';

;



export const TrainerEarningsApi = {
  fetchEarningsData: async (
    startDate?: string,
    endDate?: string,
    search?: string,
    page = 1,
    limit = 10,
    sortBy: TrainerEarningsEarningsSortField = 'date',
    sortDirection: TrainerEarningsEarningsSortDirection = 'desc',
    range?: string,
  ): Promise<TrainerEarningsData> => {
    const params = new URLSearchParams();
    if (range) params.set('range', range);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (search) params.set('search', search);
    params.set('page', String(page));
    params.set('limit', String(limit));
    params.set('sortBy', sortBy);
    params.set('sortDirection', sortDirection);
    const queryString = params.toString();
    const raw = await apiFetch<ApiResponse<unknown>>(`${TRAINER_EARNINGS_URLS.API.DATA}?${queryString}`);
    const response = TrainerInfrastructureApiResponseSchema(TrainerEarningsDataSchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },
};
