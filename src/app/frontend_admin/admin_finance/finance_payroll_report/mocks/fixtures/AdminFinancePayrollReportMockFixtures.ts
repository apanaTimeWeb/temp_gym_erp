// RESPONSIBILITY: Owns only the payroll report's source-backed mock response and deterministic branch filtering.
import type { ReportDateRange, PayrollReportData } from '@/app/frontend_admin/admin_finance/finance_payroll_report/types/AdminFinancePayrollReportTypes';

export const MOCK_ADMIN_FINANCE_PAYROLL_REPORT: PayrollReportData = {
  payrollSummary: [
    { gymId: 'g1', gymName: 'Downtown Main', totalStaff: 45, totalPayroll: 850000, paid: 850000, pending: 0, advances: 50000 },
    { gymId: 'g2', gymName: 'Westside Gym', totalStaff: 30, totalPayroll: 620000, paid: 600000, pending: 20000, advances: 15000 },
    { gymId: 'g3', gymName: 'Northside Arena', totalStaff: 22, totalPayroll: 410000, paid: 390000, pending: 20000, advances: 8000 },
  ],
};

/** Keeps mock responses inside the owning business workflow; dateRange is accepted for fixture API stability. */
export function getAdminFinancePayrollReportFixture({ gymId = 'all', dateRange = 'this_month' }: { gymId?: string; dateRange?: ReportDateRange }): PayrollReportData {
  void dateRange;
  const payrollSummary = gymId === 'all' ? MOCK_ADMIN_FINANCE_PAYROLL_REPORT.payrollSummary : MOCK_ADMIN_FINANCE_PAYROLL_REPORT.payrollSummary.filter((row) => row.gymId === gymId);
  return { payrollSummary };
}
