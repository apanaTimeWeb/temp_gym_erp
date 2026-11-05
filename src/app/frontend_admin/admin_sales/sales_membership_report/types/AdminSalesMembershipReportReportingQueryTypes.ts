// RESPONSIBILITY: Input contract for the Sales membership-report query hook only.
export interface UseAdminSalesReportingQueriesParams {
  selectedBranchId: string;
  range: string;
  dateParams: { startDate?: string; endDate?: string };
  search: string;
  enabled: boolean;
}
