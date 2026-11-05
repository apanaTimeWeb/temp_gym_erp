import {
  SUPERADMIN_ANALYTICS_KPI_ICON_BACKGROUND_CLASSES,
  SUPERADMIN_ANALYTICS_KPI_ICON_TEXT_CLASSES,
} from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/constants/superadmin_analytics_dashboard_kpi.constants';

import type { LucideIcon } from 'lucide-react';



export type SuperadminAnalyticsKpiIcon = LucideIcon;
export type SuperadminAnalyticsKpiIconBackgroundClass = (typeof SUPERADMIN_ANALYTICS_KPI_ICON_BACKGROUND_CLASSES)[number];
export type SuperadminAnalyticsKpiIconTextClass = (typeof SUPERADMIN_ANALYTICS_KPI_ICON_TEXT_CLASSES)[number];

export interface SuperadminAnalyticsKpiCardViewModel {
  label: string;
  value: string;
  delta?: string;
  deltaDirection?: 'up' | 'down';
  deltaTone?: 'success' | 'danger' | 'neutral';
  icon: SuperadminAnalyticsKpiIcon;
  iconBgClass: SuperadminAnalyticsKpiIconBackgroundClass;
  iconColorClass: SuperadminAnalyticsKpiIconTextClass;
}
