import { SUPERADMIN_JOBS_STATUS_CODES, SUPERADMIN_JOBS_FILTER_QUEUE_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs.constants';
/**
 * @description Static Jobs filter options owned by the Superadmin Jobs feature. These values are UI configuration, not server records.
 */
export const SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'ui.filter_all_statuses' },
  { value: SUPERADMIN_JOBS_STATUS_CODES.FAILED, labelKey: 'ui.filter_failed' },
  { value: SUPERADMIN_JOBS_STATUS_CODES.ACTIVE, labelKey: 'ui.filter_active' },
  { value: SUPERADMIN_JOBS_STATUS_CODES.COMPLETED, labelKey: 'ui.filter_completed' },
  { value: SUPERADMIN_JOBS_STATUS_CODES.DELAYED, labelKey: 'ui.filter_delayed' },
  { value: SUPERADMIN_JOBS_STATUS_CODES.CANCELLED, labelKey: 'ui.filter_cancelled' },
] as const;

export const SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'ui.filter_all_queues' },
  { value: SUPERADMIN_JOBS_FILTER_QUEUE_CODES.BILLING, labelKey: 'ui.queue_billing' },
  { value: SUPERADMIN_JOBS_FILTER_QUEUE_CODES.EMAIL, labelKey: 'ui.queue_email' },
  { value: SUPERADMIN_JOBS_FILTER_QUEUE_CODES.WEBHOOK, labelKey: 'ui.queue_webhook' },
  { value: SUPERADMIN_JOBS_FILTER_QUEUE_CODES.DATABASE, labelKey: 'ui.queue_database' },
  { value: SUPERADMIN_JOBS_FILTER_QUEUE_CODES.EXPORT, labelKey: 'ui.queue_export' },
  { value: SUPERADMIN_JOBS_FILTER_QUEUE_CODES.MAINTENANCE, labelKey: 'ui.queue_maintenance' },
] as const;
