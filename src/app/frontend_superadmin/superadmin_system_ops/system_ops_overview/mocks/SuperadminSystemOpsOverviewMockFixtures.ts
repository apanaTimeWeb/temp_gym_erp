/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsMockFixtures owned by the superadmin_system_ops feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/types/SuperadminSystemOpsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns realistic mock server data for the System Ops summary feature.
import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/types/superadmin_system_ops_overview_status.types';

export const SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE: SuperadminSystemOpsSummary = {
  infrastructureStatus: 'HEALTHY',
  pendingJobs: 3,
  lastBackupAt: '2026-09-20T12:00:00Z',
  backupStatus: 'HEALTHY',
  migrationStatus: 'UP_TO_DATE',
};
