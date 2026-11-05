/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationSettingsV1MockFixtures owned by the superadmin_platform_configuration_settings feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GOVERNANCE_MOCK_FIXTURE = {
    'billing': [
        {
            'label': 'Trial period',
            'value': '14 days'
        },
        {
            'label': 'Payment grace period',
            'value': '7 days'
        },
        {
            'label': 'Invoice due reminder',
            'value': '3 days before due'
        },
        {
            'label': 'Automatic suspend',
            'value': '10 days overdue'
        }
    ],
    'security': [
        {
            'label': 'MFA for platform team',
            'value': 'Required'
        },
        {
            'label': 'Session timeout',
            'value': '8 hours'
        },
        {
            'label': 'Failed login lockout',
            'value': '5 attempts / 15 minutes'
        },
        {
            'label': 'Operator access review',
            'value': 'Every 90 days'
        }
    ],
    'data': [
        {
            'label': 'Backup retention',
            'value': '30 days'
        },
        {
            'label': 'Deleted tenant hold',
            'value': '30 days'
        },
        {
            'label': 'Audit retention',
            'value': '2 years'
        },
        {
            'label': 'Export expiry',
            'value': '7 days'
        }
    ],
    'communication': [
        {
            'label': 'Default sender',
            'value': 'Smart Gym 360'
        },
        {
            'label': 'Critical alerts',
            'value': 'In-app + Email'
        },
        {
            'label': 'Payment failure alerts',
            'value': 'In-app + Email'
        },
        {
            'label': 'Maintenance alerts',
            'value': 'In-app'
        }
    ]
} as const;

/** Deterministic settings groups for baseline, pagination/search, and stress harnesses. */
export const createSuperadminSettingsGovernanceScaleFixture = (count: number) => {
    const size = Math.max(0, Math.floor(count));
    const scaleGroup = (group: readonly { readonly label: string; readonly value: string }[]) => Array.from({ length: size }, (_, index) => ({ label: `${group[index % group.length]!.label} ${index + 1}`, value: group[index % group.length]!.value }));
    return {
        billing: scaleGroup(SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GOVERNANCE_MOCK_FIXTURE.billing),
        security: scaleGroup(SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GOVERNANCE_MOCK_FIXTURE.security),
        data: scaleGroup(SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GOVERNANCE_MOCK_FIXTURE.data),
        communication: scaleGroup(SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GOVERNANCE_MOCK_FIXTURE.communication),
    };
};
export const SUPERADMIN_SETTINGS_GOVERNANCE_TIER_1_SMALL = createSuperadminSettingsGovernanceScaleFixture(10);
export const SUPERADMIN_SETTINGS_GOVERNANCE_TIER_2_MEDIUM = createSuperadminSettingsGovernanceScaleFixture(100);
export const SUPERADMIN_SETTINGS_GOVERNANCE_TIER_3_STRESS = createSuperadminSettingsGovernanceScaleFixture(500);

