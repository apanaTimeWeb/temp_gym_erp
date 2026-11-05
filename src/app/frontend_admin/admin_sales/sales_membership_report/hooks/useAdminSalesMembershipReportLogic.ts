"use client";
// RESPONSIBILITY: Coordinates URL-synchronized date/search filters for the Sales membership-report leaf only.
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DATE_FILTERS } from '@/app/frontend_admin/admin_sales/sales_membership_report/constants/AdminSalesMembershipReportConstants';
import { useAdminSalesDebounce } from '@/app/frontend_admin/admin_sales/sales_membership_report/hooks/useAdminSalesMembershipReportDebounce';
import { useAdminSalesReportingQueries } from '@/app/frontend_admin/admin_sales/sales_membership_report/hooks/useAdminSalesMembershipReportReportingQueries';
import { isValidAdminSalesDateRange } from '@/app/frontend_admin/admin_sales/sales_membership_report/utils/AdminSalesMembershipReportDateRangeUtils';
import type { AdminSalesMembershipReportState } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportTypes';

/** Owns only report filters, report query state, and retry action for this leaf. */
export function useAdminSalesLogic(): AdminSalesMembershipReportState {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const requestedRange = searchParams.get('range') || 'this_month';
  const range = (DATE_FILTERS as readonly string[]).includes(requestedRange) ? requestedRange as (typeof DATE_FILTERS)[number] : 'this_month';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const isCustomRangeBlocked = range === 'custom' && !isValidAdminSalesDateRange(startDate, endDate);
  const dateParams = range === 'custom' && !isCustomRangeBlocked ? { startDate, endDate } : {};
  const search = searchParams.get('search') || '';
  const debouncedSearch = useAdminSalesDebounce(search, 300);

  const updateSearch = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('search', value);
    else params.delete('search');
    params.delete('page');
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const reportingQueries = useAdminSalesReportingQueries({
    selectedBranchId,
    range,
    dateParams,
    search: debouncedSearch,
    enabled: !isCustomRangeBlocked,
  });

  return {
    isCustomRangeBlocked,
    startDate,
    endDate,
    search,
    setSearch: updateSearch,
    membershipReport: reportingQueries.membershipReport,
    membershipTotals: reportingQueries.membershipTotals,
    membershipReportStatus: reportingQueries.membershipReportStatus,
    membershipReportError: reportingQueries.membershipReportError,
    retryMembershipReport: reportingQueries.retryMembershipReport,
  };
}
