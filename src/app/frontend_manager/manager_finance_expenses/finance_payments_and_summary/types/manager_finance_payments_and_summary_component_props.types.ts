// RESPONSIBILITY: Defines typed props for Finance presentation components.
import type { ReactNode } from 'react';

export interface ManagerFinancePaymentsAndSummaryKpiCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  color: string;
}

export interface ManagerFinancePaymentsAndSummaryMethodBreakdownProps {
  data: Record<string, number>;
}

export interface ManagerFinancePaymentsAndSummaryRevenueExpensePoint {
  month: string;
  revenue: number;
  expenses?: number;
}

export interface ManagerFinancePaymentsAndSummaryRevenueExpenseChartProps {
  data: ManagerFinancePaymentsAndSummaryRevenueExpensePoint[];
}
