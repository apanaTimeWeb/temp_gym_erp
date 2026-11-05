import {
  SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_KEYS,
  SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_LABEL_KEYS,
  SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_DESCRIPTION_KEYS,
  SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_TITLE_KEYS,
} from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/constants/superadmin_system_ops_overview.constants';

import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/types/superadmin_system_ops_overview_status.types';
import type { ComponentType } from 'react';



export type SuperadminSystemOpsDashboardIcon = ComponentType<{ size?: number; 'aria-hidden'?: boolean }>;
export type SuperadminSystemOpsOverviewCardDefinition = {
  key: (typeof SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_KEYS)[number];
  titleKey: (typeof SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_TITLE_KEYS)[number];
  descriptionKey: (typeof SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_DESCRIPTION_KEYS)[number];
  href: string;
  icon: SuperadminSystemOpsDashboardIcon;
  labelKey: (typeof SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_LABEL_KEYS)[number];
  getLabelValues: (summary: SuperadminSystemOpsSummary, locale: string) => { status?: string; count?: number; lastRun?: string };
  toneClass: string | ((summary: SuperadminSystemOpsSummary) => string);
};
