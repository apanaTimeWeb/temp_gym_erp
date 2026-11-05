/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingPlansV1MockFixtures owned by the superadmin_billing_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_BILLING_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE = {
    'plans': [
        {
            'name': 'Starter',
            'monthly': 4999,
            'members': 500,
            'storage': 20,
            'branches': 1
        },
        {
            'name': 'Professional',
            'monthly': 9999,
            'members': 2000,
            'storage': 100,
            'branches': 3
        },
        {
            'name': 'Business',
            'monthly': 19999,
            'members': 10000,
            'storage': 500,
            'branches': 10
        },
        {
            'name': 'Enterprise',
            'monthly': 39999,
            'members': -1,
            'storage': 2000,
            'branches': -1
        }
    ],
    'versions': [
        {
            'plan': 'Professional',
            'version': 'v2',
            'effective': '2026-09-01',
            'monthly': 9999,
            'change': 'Members 1,500 → 2,000'
        },
        {
            'plan': 'Business',
            'version': 'v3',
            'effective': '2026-10-15',
            'monthly': 21999,
            'change': 'Adds advanced reports'
        }
    ],
    'addons': [
        {
            'name': 'Extra 1,000 members',
            'price': 2999
        },
        {
            'name': 'Extra 100 GB storage',
            'price': 1499
        },
        {
            'name': 'WhatsApp 10,000 messages',
            'price': 999
        }
    ],
    'migration': {
        'from': 'Professional',
        'to': 'Business',
        'tenants': 37,
        'monthlyChange': 370000,
        'limitConflicts': 4
    }
} as const;
