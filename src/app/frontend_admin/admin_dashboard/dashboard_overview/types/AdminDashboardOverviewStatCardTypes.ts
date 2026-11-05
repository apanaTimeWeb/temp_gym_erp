// RESPONSIBILITY: Defines the zero-business KPI card contract. Feature modules provide their own semantic content values/classes.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutStatCardTypes.ts)

import type { LucideIcon } from 'lucide-react';

export type AdminStatCardTrend = 'up' | 'down' | 'neutral';

export interface AdminStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: AdminStatCardTrend;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  testId?: string;
}
