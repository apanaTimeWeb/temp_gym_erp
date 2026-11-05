'use client';
// RESPONSIBILITY: Owns Affiliates page server-query state and derived pagination metadata.
// DATA FLOW: normalized URL filters -> feature API queries -> page hook.
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { affiliatesApi } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/api/superadmin_affiliates_management.api';
import { SUPERADMIN_AFFILIATES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/api/superadmin_affiliates_management.query_keys';
import { createSuperadminAffiliatesFormApiError } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementFormApiErrors';
import { buildSuperadminAffiliatesQueryParams } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementQueryUtils';
import type { Affiliate, AffiliateStatusFilter } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types';

export function useSuperadminAffiliatesManagementPageQueries(input: {
  searchQuery: string; statusFilter: AffiliateStatusFilter; startDate: string; endDate: string; currentPage: number; pageLimit: number;
}) {
  const queryParams = useMemo(() => buildSuperadminAffiliatesQueryParams(input), [input.searchQuery, input.statusFilter, input.startDate, input.endDate, input.currentPage, input.pageLimit]);
  const queryKey = useMemo(() => SUPERADMIN_AFFILIATES_QUERY_KEYS.list(queryParams), [queryParams]);
  const affiliatesQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await affiliatesApi.fetchAffiliates(queryParams);
      if (!response.success) throw createSuperadminAffiliatesFormApiError(response);
      return response;
    },
  });
  const affiliates: Affiliate[] = affiliatesQuery.data?.data ?? [];
  const total = affiliatesQuery.data?.meta?.total ?? affiliates.length;
  return {
    affiliates,
    total,
    totalPages: Math.ceil(total / input.pageLimit) || 1,
    status: affiliatesQuery.status,
    isError: affiliatesQuery.isError,
    retryAffiliates: affiliatesQuery.refetch,
  };
}
