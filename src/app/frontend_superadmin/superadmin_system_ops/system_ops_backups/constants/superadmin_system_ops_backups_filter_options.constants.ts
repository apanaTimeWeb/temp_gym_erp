import { SUPERADMIN_BACKUPS_STATUS_CODES, SUPERADMIN_BACKUPS_FILTER_STATUS_CODES, SUPERADMIN_BACKUPS_TYPE_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/constants/superadmin_system_ops_backups.constants';
/**
 * @description Static Backup filter options owned by the Superadmin Backups feature; they are UI configuration rather than server state.
 */
export const SUPERADMIN_BACKUPS_STATUS_FILTER_OPTIONS = [
  { value: SUPERADMIN_BACKUPS_FILTER_STATUS_CODES.ALL, labelKey: 'ui.filter_all_statuses' },
  { value: SUPERADMIN_BACKUPS_STATUS_CODES.SUCCESS, labelKey: 'ui.filter_success' },
  { value: SUPERADMIN_BACKUPS_STATUS_CODES.FAILED, labelKey: 'ui.filter_failed' },
  { value: SUPERADMIN_BACKUPS_STATUS_CODES.IN_PROGRESS, labelKey: 'ui.filter_in_progress' },
] as const;

export const SUPERADMIN_BACKUPS_TYPE_FILTER_OPTIONS = [
  { value: SUPERADMIN_BACKUPS_TYPE_CODES.ALL, labelKey: 'ui.filter_all_types' },
  { value: SUPERADMIN_BACKUPS_TYPE_CODES.AUTOMATED, labelKey: 'ui.filter_automated' },
  { value: SUPERADMIN_BACKUPS_TYPE_CODES.MANUAL, labelKey: 'ui.filter_manual' },
] as const;
