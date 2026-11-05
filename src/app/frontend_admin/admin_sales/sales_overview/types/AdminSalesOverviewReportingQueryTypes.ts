// RESPONSIBILITY: Input contract for Sales Overview and referral-source queries.
export interface UseAdminSalesReportingQueriesParams { selectedBranchId: string; range: string; dateParams: { startDate?: string; endDate?: string }; enabled: boolean; }
