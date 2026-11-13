// RESPONSIBILITY: Shared tabs and presentation constants for the Manager Reports module.
import { MANAGER_REPORTS_OVERVIEW_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/constants/manager_reports_overview_date_filter.constants';

/**
 * @description Provides the ManagerReportsOverviewSharedConstants implementation for the reports module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const REPORT_TABS = ['Revenue', 'Attendance', 'Members', 'Expenses', 'Trainers', 'Benchmarking'] as const;

export const REPORT_DATE_RANGE_OPTIONS = MANAGER_REPORTS_OVERVIEW_DATE_RANGE_OPTIONS;

export const EXPENSE_CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  Rent:        { bg: 'bg-danger-bg',   text: 'text-danger-text'   },
  Salaries:    { bg: 'bg-warning-bg',  text: 'text-warning-text'  },
  Equipment:   { bg: 'bg-info-bg',     text: 'text-info-text'     },
  Utilities:   { bg: 'bg-primary-subtle',  text: 'text-primary'  },
  Marketing:   { bg: 'bg-success-bg',  text: 'text-success-text'  },
  Maintenance: { bg: 'bg-purple-bg',  text: 'text-purple-text'   },
  Other:       { bg: 'bg-input',text: 'text-text-secondary'} };


