// RESPONSIBILITY: Defines the AdminAttendanceReportsProgressBarTypes route, lifecycle boundary, or module support artifact for admin_navigation shell components; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/progress_bar/types/AdminAttendanceReportsProgressBarTypes.ts)

export type AdminProgressBarVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface AdminProgressBarProps {
  value: number;
  max?: number;
  variant?: AdminProgressBarVariant;
  label: string;
  className?: string;
}
