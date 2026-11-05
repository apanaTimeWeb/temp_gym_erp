/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingUsageMetersMockFixtures owned by the superadmin_billing_usage_meters feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/types/superadmin_billing_usage_meters_dashboard.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import type { UsageMeter } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/types/superadmin_billing_usage_meters_dashboard.types';
export const MOCK_SUPERADMIN_BILLING_USAGE_METERS: UsageMeter[] = [
    { id: 'um1', tenantId: 't1', tenantName: 'Iron Paradise', smsSent: 850, smsLimit: 1000, whatsappMessagesSent: 400, whatsappLimit: 500, emailsSent: 5000, emailLimit: 10000, apiCallsCount: 15000, apiCallsLimit: 50000, databaseGb: 1.2, mediaGb: 5.5, storageLimitGb: 10, activeMembers: 200, totalMembers: 250, memberLimit: 500, staffCount: 5, staffLimit: 10, billingCycleEnd: '2026-09-30' },
    { id: 'um2', tenantId: 't2', tenantName: 'Fit Life Studio', smsSent: 150, smsLimit: 500, whatsappMessagesSent: 50, whatsappLimit: 100, emailsSent: 1000, emailLimit: 5000, apiCallsCount: 2000, apiCallsLimit: 10000, databaseGb: 0.5, mediaGb: 1.2, storageLimitGb: 5, activeMembers: 50, totalMembers: 60, memberLimit: 100, staffCount: 2, staffLimit: 5, billingCycleEnd: '2026-09-25' },
    { id: 'um3', tenantId: 't3', tenantName: 'CrossFit Box', smsSent: 920, smsLimit: 1000, whatsappMessagesSent: 470, whatsappLimit: 500, emailsSent: 7800, emailLimit: 12000, apiCallsCount: 42000, apiCallsLimit: 50000, databaseGb: 2.5, mediaGb: 6.8, storageLimitGb: 12, activeMembers: 420, totalMembers: 500, memberLimit: 700, staffCount: 12, staffLimit: 15, billingCycleEnd: '2026-09-29' },
    { id: 'um4', tenantId: 't4', tenantName: 'Powerhouse Gym', smsSent: 310, smsLimit: 1000, whatsappMessagesSent: 220, whatsappLimit: 500, emailsSent: 2600, emailLimit: 10000, apiCallsCount: 9000, apiCallsLimit: 50000, databaseGb: 0.9, mediaGb: 3.7, storageLimitGb: 10, activeMembers: 140, totalMembers: 175, memberLimit: 300, staffCount: 4, staffLimit: 8, billingCycleEnd: '2026-09-27' },
    { id: 'um5', tenantId: 't5', tenantName: 'Pulse Fitness', smsSent: 480, smsLimit: 1000, whatsappMessagesSent: 300, whatsappLimit: 500, emailsSent: 4100, emailLimit: 10000, apiCallsCount: 18000, apiCallsLimit: 50000, databaseGb: 1.4, mediaGb: 4.1, storageLimitGb: 10, activeMembers: 180, totalMembers: 210, memberLimit: 350, staffCount: 6, staffLimit: 10, billingCycleEnd: '2026-10-02' },
    { id: 'um6', tenantId: 't6', tenantName: 'Urban Strength', smsSent: 990, smsLimit: 1200, whatsappMessagesSent: 490, whatsappLimit: 600, emailsSent: 9000, emailLimit: 12000, apiCallsCount: 46000, apiCallsLimit: 60000, databaseGb: 2.9, mediaGb: 8.1, storageLimitGb: 14, activeMembers: 510, totalMembers: 600, memberLimit: 800, staffCount: 15, staffLimit: 20, billingCycleEnd: '2026-09-26' },
];

/** Deterministic module-owned load tiers required by Architecture Rule 10. */
export const createSuperadminBillingUsageMetersScale = (count: number): UsageMeter[] =>
    Array.from({ length: Math.max(0, Math.floor(count)) }, (_, index) => {
        const base = MOCK_SUPERADMIN_BILLING_USAGE_METERS[index % MOCK_SUPERADMIN_BILLING_USAGE_METERS.length]!;
        if (!base) throw new Error('Fixture seed must not be empty');
        const ordinal = index + 1;
        return { ...base, id: `um-scale-${ordinal}`, tenantId: `t-scale-${ordinal}`, tenantName: `Scale Gym ${ordinal}`, activeMembers: base.activeMembers + ordinal, totalMembers: base.totalMembers + ordinal, apiCallsCount: base.apiCallsCount + ordinal * 10 };
    });
export const MOCK_SUPERADMIN_BILLING_USAGE_METERS_TIER_1_SMALL = createSuperadminBillingUsageMetersScale(10);
export const MOCK_SUPERADMIN_BILLING_USAGE_METERS_TIER_2_MEDIUM = createSuperadminBillingUsageMetersScale(100);
export const MOCK_SUPERADMIN_BILLING_USAGE_METERS_TIER_3_STRESS = createSuperadminBillingUsageMetersScale(500);

