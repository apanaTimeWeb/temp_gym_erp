/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsJobsMockData owned by the superadmin_system_ops_jobs feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs.constants, @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import { SUPERADMIN_JOBS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs.constants';

import type { SuperadminSystemOpsJobsBackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs.types';


export const MOCK_BACKGROUND_JOBS: SuperadminSystemOpsJobsBackgroundJob[] = [
    { id: 'job-1', queueName: 'billing', jobName: 'Process Monthly Invoices', status: SUPERADMIN_JOBS_STATUS_CODES.COMPLETED, attempts: 1, createdAt: '2026-09-15T01:00:00Z' },
    { id: 'job-2', queueName: 'export', jobName: 'Export Tenant Data', status: SUPERADMIN_JOBS_STATUS_CODES.FAILED, attempts: 3, error: 'Connection timeout to replica DB', createdAt: '2026-09-15T08:30:00Z' },
    { id: 'job-3', queueName: 'email', jobName: 'Send Campaign Blast', status: SUPERADMIN_JOBS_STATUS_CODES.ACTIVE, attempts: 1, createdAt: '2026-09-15T09:00:00Z' },
    { id: 'job-4', queueName: 'maintenance', jobName: 'Clean Stale Sessions', status: SUPERADMIN_JOBS_STATUS_CODES.DELAYED, attempts: 0, createdAt: '2026-09-15T10:00:00Z' },
    { id: 'job-5', queueName: 'webhook', jobName: 'Deliver Payment Webhooks', status: SUPERADMIN_JOBS_STATUS_CODES.ACTIVE, attempts: 2, createdAt: '2026-09-14T11:15:00Z' },
    { id: 'job-6', queueName: 'database', jobName: 'Rebuild Tenant Index', status: SUPERADMIN_JOBS_STATUS_CODES.COMPLETED, attempts: 1, createdAt: '2026-09-14T12:45:00Z' },
    { id: 'job-7', queueName: 'billing', jobName: 'Retry Failed Invoice', status: SUPERADMIN_JOBS_STATUS_CODES.FAILED, attempts: 5, error: 'Payment provider unavailable', createdAt: '2026-09-13T03:20:00Z' },
    { id: 'job-8', queueName: 'export', jobName: 'Generate Usage CSV', status: SUPERADMIN_JOBS_STATUS_CODES.DELAYED, attempts: 1, createdAt: '2026-09-12T04:50:00Z' },
    { id: 'job-9', queueName: 'email', jobName: 'Send Renewal Reminders', status: SUPERADMIN_JOBS_STATUS_CODES.COMPLETED, attempts: 1, createdAt: '2026-08-30T06:05:00Z' },
    { id: 'job-10', queueName: 'webhook', jobName: 'Sync Affiliate Events', status: SUPERADMIN_JOBS_STATUS_CODES.FAILED, attempts: 4, error: 'Remote endpoint returned an error', createdAt: '2026-08-25T13:40:00Z' },
    { id: 'job-11', queueName: 'database', jobName: 'Vacuum Tenant Tables', status: SUPERADMIN_JOBS_STATUS_CODES.ACTIVE, attempts: 1, createdAt: '2026-08-20T02:10:00Z' },
    { id: 'job-12', queueName: 'maintenance', jobName: 'Refresh Materialized Views', status: SUPERADMIN_JOBS_STATUS_CODES.COMPLETED, attempts: 1, createdAt: '2026-08-18T09:25:00Z' },
];
