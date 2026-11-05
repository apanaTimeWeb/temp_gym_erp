// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { LucideIcon } from 'lucide-react';

export interface ManagerReportsOverviewKpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  sub?: string;
  subColor?: string;
}
