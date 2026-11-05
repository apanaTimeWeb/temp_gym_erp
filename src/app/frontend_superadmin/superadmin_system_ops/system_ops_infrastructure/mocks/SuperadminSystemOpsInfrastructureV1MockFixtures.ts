import { SUPERADMIN_INFRASTRUCTURE_API_HEALTH_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/constants/superadmin_system_ops_infrastructure.constants';
/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsInfrastructureV1MockFixtures owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/constants/superadmin_system_ops_infrastructure.constants
import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE = {
    'summary': {
        'requestsPerMinute': 1840,
        'errorsPercent': 0.7,
        'p50': 120,
        'p95': 410,
        'p99': 860
    },
    'endpoints': [
        {
            'name': 'Tenant list',
            'p50': 105,
            'p95': 320,
            'p99': 610,
            'errors': 0.3
        },
        {
            'name': 'Invoices',
            'p50': 128,
            'p95': 390,
            'p99': 810,
            'errors': 0.8
        },
        {
            'name': 'Reports',
            'p50': 180,
            'p95': 520,
            'p99': 980,
            'errors': 1.4
        },
        {
            'name': 'Messaging',
            'p50': 95,
            'p95': 260,
            'p99': 540,
            'errors': 0.4
        }
    ],
    'incidents': [
        {
            'title': 'Invoice API slowdown',
            'impact': '4.2% slower',
            'started': '2026-09-17T08:20:00Z',
            'status': SUPERADMIN_INFRASTRUCTURE_API_HEALTH_CODES.RESOLVED
        },
        {
            'title': 'Webhook retries elevated',
            'impact': '2.1% failed deliveries',
            'started': '2026-09-16T17:40:00Z',
            'status': SUPERADMIN_INFRASTRUCTURE_API_HEALTH_CODES.MONITORING
        }
    ]
} as const;
