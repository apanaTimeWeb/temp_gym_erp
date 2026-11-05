import { SUPERADMIN_AFFILIATE_STATUS_FILTERS } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management_filter.constants';
import { SUPERADMIN_AFFILIATE_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management.constants';

import type { AffiliateStatusFilter } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types';


export interface SuperadminAffiliatesRawUrlState {
  status: string;
  page: string;
  limit: string;
  startDate: string;
  endDate: string;
}

export interface SuperadminAffiliatesNormalizedUrlState {
  statusFilter: AffiliateStatusFilter;
  currentPage: number;
  pageLimit: number;
  startDate: string;
  endDate: string;
}

function parsePositiveInteger(value: string, fallback: number): number {
  if (!/^\d+$/.test(value)) return fallback;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeDateFilter(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return '';
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value ? value : '';
}

/** Validates untrusted query-string values before they affect API requests. */
export function normalizeSuperadminAffiliatesUrlState(
  input: SuperadminAffiliatesRawUrlState,
): SuperadminAffiliatesNormalizedUrlState {
  const statusFilter = (SUPERADMIN_AFFILIATE_STATUS_FILTERS as readonly string[]).includes(input.status)
    ? input.status as AffiliateStatusFilter
    : SUPERADMIN_AFFILIATE_ALL_FILTER;
  const startDate = normalizeDateFilter(input.startDate);
  const endDate = normalizeDateFilter(input.endDate);

  return {
    statusFilter,
    currentPage: parsePositiveInteger(input.page, 1),
    pageLimit: parsePositiveInteger(input.limit, 10),
    startDate,
    // An inverted valid date range is not sent to the server.
    endDate: startDate && endDate && endDate < startDate ? '' : endDate,
  };
}

/** Builds the canonical Affiliates server-query parameters from URL state. */
/**
 * @description Provides affiliates formatting or feature utility behavior for buildSuperadminAffiliatesQueryParams.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function buildSuperadminAffiliatesQueryParams(input: {
  searchQuery: string;
  statusFilter: AffiliateStatusFilter;
  startDate: string;
  endDate: string;
  currentPage: number;
  pageLimit: number;
}): Record<string, string> {
  const params: Record<string, string> = { page: String(input.currentPage), limit: String(input.pageLimit) };
  if (input.searchQuery) params.search = input.searchQuery;
  if (input.statusFilter !== SUPERADMIN_AFFILIATE_ALL_FILTER) params.status = input.statusFilter;
  if (input.startDate) params.startDate = input.startDate;
  if (input.endDate) params.endDate = input.endDate;
  return params;
}
