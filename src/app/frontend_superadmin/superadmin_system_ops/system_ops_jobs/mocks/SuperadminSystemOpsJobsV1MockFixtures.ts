/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsJobsV1MockFixtures owned by the superadmin_system_ops_jobs feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE = {
    'summary': {
        'waiting': 18,
        'running': 6,
        'failed24h': 4,
        'deadLetter': 2,
        'oldestWaitingMinutes': 17
    },
    'queues': [
        {
            'name': 'Invoice emails',
            'waiting': 5,
            'running': 2,
            'failed24h': 1,
            'deadLetter': 0
        },
        {
            'name': 'Reports',
            'waiting': 8,
            'running': 2,
            'failed24h': 2,
            'deadLetter': 1
        },
        {
            'name': 'Notifications',
            'waiting': 5,
            'running': 2,
            'failed24h': 1,
            'deadLetter': 1
        }
    ],
    'recentFailures': [
        {
            'job': 'Report export',
            'tenant': 'Urban Strength',
            'time': '2026-09-17T12:10:00Z',
            'reason': 'Timeout'
        },
        {
            'job': 'Invoice email',
            'tenant': 'Prime Motion',
            'time': '2026-09-17T11:40:00Z',
            'reason': 'Provider unavailable'
        },
        {
            'job': 'Notification batch',
            'tenant': 'FitLab South',
            'time': '2026-09-17T10:55:00Z',
            'reason': 'Payload validation'
        }
    ]
} as const;
