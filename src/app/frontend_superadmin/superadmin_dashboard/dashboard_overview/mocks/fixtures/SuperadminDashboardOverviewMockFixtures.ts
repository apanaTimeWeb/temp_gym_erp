/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminDashboardMockFixtures owned by the superadmin_dashboard feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview_date_range.constants, @/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { SUPERADMIN_DASHBOARD_TENANT_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview_date_range.constants';

import type { SuperadminDashboardApiData } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';


export const MOCK_SUPERADMIN_DASHBOARD_DATA: SuperadminDashboardApiData = {
    metrics: {
        currency: 'INR',
        totalGyms: 120,
        activeGyms: 105,
        suspendedGyms: 5,
        trialGyms: 10,
        totalEndUsers: 15400,
        monthlyRecurringRevenue: 25000000,
        overdueInvoicesCount: 12,
        pendingRevenue: 1500000,
        recentOnboards: [
            {
                id: 't1', name: 'Iron Paradise', ownerName: 'John Doe', adminEmail: 'john@iron.com',
                phone: '9876543210', status: SUPERADMIN_DASHBOARD_TENANT_STATUS_CODES.ACTIVE, plan: 'Pro', createdAt: '2026-08-01',
                memberCount: 200, monthlyRevenue: 500000, databaseVersion: 'v1.2', currency: 'INR'
            },
            {
                id: 't2', name: 'Fit Life Studio', ownerName: 'Jane Smith', adminEmail: 'jane@fitlife.com',
                phone: '9876543211', status: SUPERADMIN_DASHBOARD_TENANT_STATUS_CODES.TRIAL, plan: 'Basic', createdAt: '2026-08-15',
                memberCount: 50, monthlyRevenue: 0, databaseVersion: 'v1.2', currency: 'INR'
            }
        ],
        trialsExpiringIn7Days: 3,
        mrrDeltaPercent: 12.5,
        arrDeltaPercent: 24.0,
        arpu: 238000,
        revenueByTier: [
            { plan: 'Basic', amount: 5000000, tenantCount: 50, currency: 'INR' },
            { plan: 'Pro', amount: 15000000, tenantCount: 55, currency: 'INR' },
            { plan: 'Enterprise', amount: 5000000, tenantCount: 15, currency: 'INR' }
        ],
        platformHealthScore: 92,
        revenueByGeography: [
            { region: 'India', revenue: 17500000, currency: 'INR' },
            { region: 'UAE', revenue: 4500000, currency: 'INR' },
            { region: 'Singapore', revenue: 3000000, currency: 'INR' },
        ],
    },
    revenue: [
        { month: 'Jan', mrr: 15000000, currency: 'INR' },
        { month: 'Feb', mrr: 16000000, currency: 'INR' },
        { month: 'Mar', mrr: 18000000, currency: 'INR' },
        { month: 'Apr', mrr: 21000000, currency: 'INR' },
        { month: 'May', mrr: 23000000, currency: 'INR' },
        { month: 'Jun', mrr: 25000000, currency: 'INR' },
    ],
    growth: [
        { month: 'Jan', gyms: 50 },
        { month: 'Feb', gyms: 60 },
        { month: 'Mar', gyms: 75 },
        { month: 'Apr', gyms: 90 },
        { month: 'May', gyms: 105 },
        { month: 'Jun', gyms: 120 },
    ],
};
