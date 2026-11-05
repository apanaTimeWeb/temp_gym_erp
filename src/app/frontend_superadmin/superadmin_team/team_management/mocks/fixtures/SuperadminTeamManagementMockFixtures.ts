import { SUPERADMIN_TEAM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_team/team_management/constants/superadmin_team_management_status_badge_config.constants';
/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminTeamMockFixtures owned by the superadmin_team feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_team/team_management/constants/superadmin_team_management_status_badge_config.constants
import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns realistic mock API data for this Superadmin module.
export const SUPERADMIN_TEAM_MOCK_FIXTURE = { 'users': [{ 'id': 'sa1',
            'name': 'Aarav Mehta',
            'email': 'aarav@gymsmart360.com',
            'role': 'Platform Owner',
            'status': SUPERADMIN_TEAM_STATUS_CODES.ACTIVE,
            'mfa': 'Required',
            'lastLogin': '2026-09-17T08:35:00Z' },
        { 'id': 'sa2',
            'name': 'Nisha Kapoor',
            'email': 'nisha@gymsmart360.com',
            'role': 'Billing Operator',
            'status': SUPERADMIN_TEAM_STATUS_CODES.ACTIVE,
            'mfa': 'Required',
            'lastLogin': '2026-09-17T06:55:00Z' },
        { 'id': 'sa3',
            'name': 'Kabir Shah',
            'email': 'kabir@gymsmart360.com',
            'role': 'Support Operator',
            'status': SUPERADMIN_TEAM_STATUS_CODES.ACTIVE,
            'mfa': 'Enabled',
            'lastLogin': '2026-09-16T14:10:00Z' },
        { 'id': 'sa4',
            'name': 'Riya Joshi',
            'email': 'riya@gymsmart360.com',
            'role': 'Operations Operator',
            'status': SUPERADMIN_TEAM_STATUS_CODES.DISABLED,
            'mfa': 'Required',
            'lastLogin': null }],
    'roles': [{ 'name': 'Platform Owner', 'scope': 'Full platform control', 'permissions': 14 },
        { 'name': 'Billing Operator', 'scope': 'Billing and revenue', 'permissions': 7 },
        { 'name': 'Support Operator', 'scope': 'Tickets and tenant support', 'permissions': 6 },
        { 'name': 'Operations Operator', 'scope': 'System operations', 'permissions': 8 },
        { 'name': 'Read Only', 'scope': 'View only', 'permissions': 3 }],
    'alerts': [{ 'name': 'Payment recovery failure', 'channel': 'In-app', 'threshold': 'Any failure', 'enabled': true },
        { 'name': 'Backup failure', 'channel': 'Email', 'threshold': 'Any tenant failure', 'enabled': true },
        { 'name': 'Critical platform error',
            'channel': 'In-app + Email',
            'threshold': 'Critical only',
            'enabled': true },
        { 'name': 'Usage limit spike', 'channel': 'In-app', 'threshold': 'Above 90%', 'enabled': false }] };
