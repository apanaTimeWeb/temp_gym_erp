import { SUPERADMIN_BACKUPS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/constants/superadmin_system_ops_backups.constants';
/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsBackupsV1MockFixtures owned by the superadmin_system_ops_backups feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/constants/superadmin_system_ops_backups.constants
import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE = {
    'summary': {
        'healthy': 838,
        'warning': 4,
        'failed': 3,
        'lastRestoreTest': '2026-09-10',
        'restoreTestStatus': 'PASSED',
        'recoveryPointTarget': '24 hours',
        'recoveryTimeTarget': '4 hours'
    },
    'tenants': [
        {
            'gym': 'Iron Core Fitness',
            'lastBackup': '2026-09-17T02:00:00Z',
            'size': '18 GB',
            'ageHours': 2,
            'status': 'HEALTHY'
        },
        {
            'gym': 'Prime Motion',
            'lastBackup': '2026-09-15T02:00:00Z',
            'size': '11 GB',
            'ageHours': 50,
            'status': 'WARNING'
        },
        {
            'gym': 'Old Town Gym',
            'lastBackup': '2026-09-13T02:00:00Z',
            'size': '9 GB',
            'ageHours': 98,
            'status': SUPERADMIN_BACKUPS_STATUS_CODES.FAILED
        }
    ],
    'restoreHistory': [
        {
            'date': '2026-09-10',
            'scope': '3 sample tenants',
            'durationMinutes': 34,
            'status': 'PASSED'
        },
        {
            'date': '2026-08-25',
            'scope': '1 sample tenant',
            'durationMinutes': 29,
            'status': 'PASSED'
        }
    ]
} as const;
