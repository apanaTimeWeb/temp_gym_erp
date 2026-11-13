// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructurePaginationDefaults';

import { MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline.constants';

export interface ManagerInquiriesPipelineQueryState {
  currentPage: number;
  debouncedSearch: string;
  statusFilter: string;
  dateFilter: string;
  startDate?: string;
  endDate?: string;
}

/** Builds the server-side inquiry query parameters from the debounced URL state. */
export function ManagerInquiriesPipelineBuildQueryParams(state: ManagerInquiriesPipelineQueryState): Record<string, string> {
  const params: Record<string, string> = {
    page: String(state.currentPage),
    limit: String(MANAGER_ITEMS_PER_PAGE) };
  if (state.debouncedSearch) params.search = state.debouncedSearch;
  if (state.statusFilter !== MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES.ALL_FILTER) params.status = state.statusFilter;
  if (state.dateFilter !== 'all') params.date = state.dateFilter;
  if (state.startDate) params.startDate = state.startDate;
  if (state.endDate) params.endDate = state.endDate;
  return params;
}
