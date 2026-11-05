import { Activity, Database, HardDrive, Server } from 'lucide-react';

import { SUPERADMIN_SYSTEM_OPS_OVERVIEW_ROUTES as SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES_URL_CONTRACT, SUPERADMIN_SYSTEM_OPS_OVERVIEW_ROUTES as SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES_URL_CONTRACT, SUPERADMIN_SYSTEM_OPS_OVERVIEW_ROUTES as SUPERADMIN_SYSTEM_OPS_ROUTES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/config/superadmin_system_ops_overview.url_config';
import { SuperadminSystemOpsSystemOpsFormatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/utils/SuperadminSystemOpsOverviewFormatDateTime';

import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/types/superadmin_system_ops_overview_status.types';
import type { SuperadminSystemOpsOverviewCardDefinition } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/types/superadmin_system_ops_overview.types';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsDashboardConstants owned by the superadmin_system_ops feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/config/superadmin_system_ops_overview.url_config, @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/utils/SuperadminSystemOpsOverviewFormatDateTime, @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/types/superadmin_system_ops_overview.types, @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/types/SuperadminSystemOpsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


const formatBackupDate = SuperadminSystemOpsSystemOpsFormatDateTime

export const SUPERADMIN_SYSTEM_OPS_OVERVIEW_CARD_DEFINITIONS: readonly SuperadminSystemOpsOverviewCardDefinition[] = [
  {
    key: 'infrastructure',
    titleKey: 'ui.card_infrastructure_title',
    descriptionKey: 'ui.card_infrastructure_description',
    href: SUPERADMIN_SYSTEM_OPS_ROUTES.VIEW('infrastructure'),
    icon: Server,
    labelKey: 'ui.card_status_label',
    getLabelValues: (summary: SuperadminSystemOpsSummary, _locale: string) => ({ status: summary.infrastructureStatus }),
    toneClass: 'bg-info-bg text-info',
  },
  {
    key: 'jobs',
    titleKey: 'ui.card_jobs_title',
    descriptionKey: 'ui.card_jobs_description',
    href: SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES.CANONICAL_LEAF,
    icon: Activity,
    labelKey: 'ui.card_jobs_label',
    getLabelValues: (summary: SuperadminSystemOpsSummary, _locale: string) => ({ count: summary.pendingJobs }),
    toneClass: 'bg-warning-bg text-warning',
  },
  {
    key: 'backups',
    titleKey: 'ui.card_backups_title',
    descriptionKey: 'ui.card_backups_description',
    href: SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES.CANONICAL_LEAF,
    icon: HardDrive,
    labelKey: 'ui.card_backup_label',
    getLabelValues: (summary: SuperadminSystemOpsSummary, locale: string) => ({ status: summary.backupStatus, lastRun: formatBackupDate(summary.lastBackupAt, locale) }),
    toneClass: (summary: SuperadminSystemOpsSummary) => {
      if (summary.backupStatus === 'FAILED') return 'bg-danger-bg text-danger';
      if (summary.backupStatus === 'DEGRADED') return 'bg-warning-bg text-warning';
      return 'bg-success-bg text-success';
    },
  },
  {
    key: 'migrations',
    titleKey: 'ui.card_migrations_title',
    descriptionKey: 'ui.card_migrations_description',
    href: SUPERADMIN_SYSTEM_OPS_ROUTES.CANONICAL_MIGRATIONS,
    icon: Database,
    labelKey: 'ui.card_status_label',
    getLabelValues: (summary: SuperadminSystemOpsSummary, _locale: string) => ({ status: summary.migrationStatus }),
    toneClass: 'bg-primary-subtle text-primary',
  },
] as const;

export const SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_KEYS = ['infrastructure','jobs','backups','migrations'] as const;
export const SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_TITLE_KEYS = ['ui.card_infrastructure_title','ui.card_jobs_title','ui.card_backups_title','ui.card_migrations_title'] as const;
export const SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_DESCRIPTION_KEYS = ['ui.card_infrastructure_description','ui.card_jobs_description','ui.card_backups_description','ui.card_migrations_description'] as const;
export const SUPERADMIN_SYSTEM_OPS_DASHBOARD_CARD_LABEL_KEYS = ['ui.card_status_label','ui.card_jobs_label','ui.card_backup_label'] as const;
