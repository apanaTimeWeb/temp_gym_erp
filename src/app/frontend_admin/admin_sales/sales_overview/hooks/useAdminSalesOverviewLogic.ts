"use client";
// RESPONSIBILITY: Coordinates the URL-backed date/search filters and two overview queries only.
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DATE_FILTERS } from '@/app/frontend_admin/admin_sales/sales_overview/constants/AdminSalesOverviewConstants';
import { useAdminSalesDebounce } from '@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewDebounce';
import { useAdminSalesReportingQueries } from '@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewReportingQueries';
import { isValidAdminSalesOverviewDateRange } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewDateRangeUtils';
import type { AdminSalesOverviewState } from '@/app/frontend_admin/admin_sales/sales_overview/types/AdminSalesOverviewTypes';
export function useAdminSalesLogic(): AdminSalesOverviewState {
  const router = useRouter(); const searchParams = useSearchParams(); const pathname = usePathname();
  const selectedBranchId = searchParams.get('branchId') || 'all'; const requestedRange = searchParams.get('range') || 'this_month';
  const range = (DATE_FILTERS as readonly string[]).includes(requestedRange) ? requestedRange as (typeof DATE_FILTERS)[number] : 'this_month';
  const startDate = searchParams.get('startDate') ?? ''; const endDate = searchParams.get('endDate') ?? '';
  const isCustomRangeBlocked = range === 'custom' && !isValidAdminSalesOverviewDateRange(startDate, endDate);
  const dateParams = range === 'custom' && !isCustomRangeBlocked ? { startDate, endDate } : {};
  const search = searchParams.get('search') || ''; const debouncedSearch = useAdminSalesDebounce(search, 300);
  const setSearch = useCallback((value: string) => { const params = new URLSearchParams(searchParams.toString()); if (value) params.set('search', value); else params.delete('search'); params.delete('page'); const query = params.toString(); router.push(query ? `${pathname}?${query}` : pathname, { scroll: false }); }, [pathname, router, searchParams]);
  const queries = useAdminSalesReportingQueries({ selectedBranchId, range, dateParams, enabled: !isCustomRangeBlocked });
  void debouncedSearch;
  return { isCustomRangeBlocked, startDate, endDate, search, setSearch, ...queries };
}
