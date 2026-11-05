import { apiFetch } from '@/lib/api';

import { TrainerDashboardStatsSchema } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/schemas/TrainerDashboardOverviewDomainSchemas';

import { TRAINER_DASHBOARD_URLS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/schemas/TrainerDashboardOverviewTrainerInfrastructureApiResponseSchema';

import type { TrainerDashboardStats } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/types/TrainerDashboardOverviewTypes';

import type { ApiResponse } from '@/lib/api';

export const TrainerDashboardApi = {
  fetchDashboardStats: async (range?: string, startDate?: string, endDate?: string): Promise<TrainerDashboardStats> => {
    const params = new URLSearchParams();
    if (range) params.append('range', range);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const q = params.toString() ? `?${params.toString()}` : '';
    const raw = await apiFetch<ApiResponse<unknown>>(`${TRAINER_DASHBOARD_URLS.API.STATS}${q}`);
    const response = TrainerInfrastructureApiResponseSchema(TrainerDashboardStatsSchema).parse(raw);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },
};

