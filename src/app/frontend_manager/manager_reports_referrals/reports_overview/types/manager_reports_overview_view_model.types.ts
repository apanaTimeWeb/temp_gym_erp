// RESPONSIBILITY: Return type contract for the Manager Reports feature facade.
import type { ReportSummary, ReportTab } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/types/manager_reports_overview.types';

export interface ManagerReportsOverviewViewModel {
  tab: ReportTab;
  setTab: (tab: ReportTab) => void;
  dateRange: string;
  setDateRange: (value: string) => void;
  summary: ReportSummary | null;
  isPending: boolean;
  isError: boolean;
  reload: () => Promise<void>;
}
