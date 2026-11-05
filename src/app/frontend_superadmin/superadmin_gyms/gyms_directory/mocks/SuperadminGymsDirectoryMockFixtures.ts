/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsMockFixtures owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_plan.types, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';

import type { SuperadminGymsPlanOption } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_plan.types';
import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory.types';



export const MOCK_SUBSCRIPTION_PLANS: SuperadminGymsPlanOption[] = [
    { id: 'plan-1', name: 'Starter', priceMonthly: 2900, currency: 'INR' },
    { id: 'plan-2', name: 'Basic', priceMonthly: 4900, currency: 'INR' },
    { id: 'plan-3', name: 'Pro', priceMonthly: 9900, currency: 'INR' },
    { id: 'plan-4', name: 'Enterprise', priceMonthly: 19900, currency: 'INR' }
];

export const MOCK_GYMS: Tenant[] = [
    {
        id: 't1', name: 'Iron Paradise', ownerName: 'John Doe', adminEmail: 'john@iron.com',
        phone: '9876543210', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE, plan: 'Pro', createdAt: '2026-08-01',
        memberCount: 200, monthlyRevenue: 500000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v1.2', city: 'Mumbai', state: 'MH',
        staffCount: 15,
        lastActiveAt: '2026-09-17T09:15:00Z',
    },
    {
        id: 't2', name: 'Fit Life Studio', ownerName: 'Jane Smith', adminEmail: 'jane@fitlife.com',
        phone: '9876543211', status: SUPERADMIN_GYM_STATUS_CODES.TRIAL, plan: 'Basic', createdAt: '2026-08-15', trialEndsAt: '2026-10-18',
        memberCount: 50, monthlyRevenue: 0, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v1.2', city: 'Pune', state: 'MH',
        staffCount: 3,
        lastActiveAt: '2026-09-16T08:22:00Z',
    },
    {
        id: 't3', name: 'Power Gym', ownerName: 'Bob Builder', adminEmail: 'bob@powergym.com',
        phone: '9876543212', status: SUPERADMIN_GYM_STATUS_CODES.SUSPENDED, plan: 'Enterprise', createdAt: '2022-01-10',
        memberCount: 500, monthlyRevenue: 1500000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v1.1', city: 'Delhi', state: 'DL',
        staffCount: 25,
        lastActiveAt: '2026-09-05T06:10:00Z',
    },
    { id: 't4', name: 'Gym 04', ownerName: 'Owner 04', adminEmail: 'owner04@gymsmart.test', phone: '9876543204', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE, plan: 'Basic', createdAt: '2026-01-15', memberCount: 68, monthlyRevenue: 500000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Bengaluru', state: 'IN', country: 'India', staffCount: 4, lastActiveAt: '2026-09-17T13:28:00Z' },
    { id: 't5', name: 'Gym 05', ownerName: 'Owner 05', adminEmail: 'owner05@gymsmart.test', phone: '9876543205', status: SUPERADMIN_GYM_STATUS_CODES.TRIAL, plan: 'Pro', createdAt: '2026-02-15', trialEndsAt: '2026-10-22', memberCount: 85, monthlyRevenue: 625000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Hyderabad', state: 'IN', country: 'India', staffCount: 5, lastActiveAt: '2026-09-16T14:35:00Z' },
    { id: 't6', name: 'Gym 06', ownerName: 'Owner 06', adminEmail: 'owner06@gymsmart.test', phone: '9876543206', status: SUPERADMIN_GYM_STATUS_CODES.SUSPENDED, plan: 'Enterprise', createdAt: '2026-03-15', memberCount: 102, monthlyRevenue: 750000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Chennai', state: 'IN', country: 'India', staffCount: 6, lastActiveAt: '2026-09-15T15:42:00Z' },
    { id: 't7', name: 'Gym 07', ownerName: 'Owner 07', adminEmail: 'owner07@gymsmart.test', phone: '9876543207', status: SUPERADMIN_GYM_STATUS_CODES.CANCELLED, plan: 'Starter', createdAt: '2026-04-15', memberCount: 119, monthlyRevenue: 875000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Kolkata', state: 'IN', country: 'India', staffCount: 7, lastActiveAt: '2026-09-14T16:49:00Z' },
    { id: 't8', name: 'Gym 08', ownerName: 'Owner 08', adminEmail: 'owner08@gymsmart.test', phone: '9876543208', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE, plan: 'Basic', createdAt: '2026-05-15', memberCount: 136, monthlyRevenue: 1000000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Jaipur', state: 'IN', country: 'India', staffCount: 8, lastActiveAt: '2026-09-13T09:56:00Z' },
    { id: 't9', name: 'Gym 09', ownerName: 'Owner 09', adminEmail: 'owner09@gymsmart.test', phone: '9876543209', status: SUPERADMIN_GYM_STATUS_CODES.TRIAL, plan: 'Pro', createdAt: '2026-06-15', trialEndsAt: '2026-10-24', memberCount: 153, monthlyRevenue: 1125000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Ahmedabad', state: 'IN', country: 'India', staffCount: 9, lastActiveAt: '2026-09-12T10:03:00Z' },
    { id: 't10', name: 'Gym 10', ownerName: 'Owner 10', adminEmail: 'owner10@gymsmart.test', phone: '9876543210', status: SUPERADMIN_GYM_STATUS_CODES.SUSPENDED, plan: 'Enterprise', createdAt: '2026-07-15', memberCount: 170, monthlyRevenue: 1250000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Lucknow', state: 'IN', country: 'India', staffCount: 10, lastActiveAt: '2026-09-11T11:10:00Z' },
    { id: 't11', name: 'Gym 11', ownerName: 'Owner 11', adminEmail: 'owner11@gymsmart.test', phone: '9876543211', status: SUPERADMIN_GYM_STATUS_CODES.CANCELLED, plan: 'Starter', createdAt: '2026-08-15', memberCount: 187, monthlyRevenue: 1375000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Patna', state: 'IN', country: 'India', staffCount: 11, lastActiveAt: '2026-09-10T12:17:00Z' },
    { id: 't12', name: 'Gym 12', ownerName: 'Owner 12', adminEmail: 'owner12@gymsmart.test', phone: '9876543212', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE, plan: 'Basic', createdAt: '2026-09-15', memberCount: 204, monthlyRevenue: 1500000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Bengaluru', state: 'IN', country: 'India', staffCount: 12, lastActiveAt: '2026-09-09T13:24:00Z' },
    { id: 't13', name: 'Gym 13', ownerName: 'Owner 13', adminEmail: 'owner13@gymsmart.test', phone: '9876543213', status: SUPERADMIN_GYM_STATUS_CODES.TRIAL, plan: 'Pro', createdAt: '2026-01-15', trialEndsAt: '2026-10-26', memberCount: 221, monthlyRevenue: 1625000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Hyderabad', state: 'IN', country: 'India', staffCount: 13, lastActiveAt: '2026-09-08T14:31:00Z' },
    { id: 't14', name: 'Gym 14', ownerName: 'Owner 14', adminEmail: 'owner14@gymsmart.test', phone: '9876543214', status: SUPERADMIN_GYM_STATUS_CODES.SUSPENDED, plan: 'Enterprise', createdAt: '2026-02-15', memberCount: 238, monthlyRevenue: 1750000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Chennai', state: 'IN', country: 'India', staffCount: 14, lastActiveAt: '2026-09-07T15:38:00Z' },
    { id: 't15', name: 'Gym 15', ownerName: 'Owner 15', adminEmail: 'owner15@gymsmart.test', phone: '9876543215', status: SUPERADMIN_GYM_STATUS_CODES.CANCELLED, plan: 'Starter', createdAt: '2026-03-15', memberCount: 255, monthlyRevenue: 1875000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Kolkata', state: 'IN', country: 'India', staffCount: 15, lastActiveAt: '2026-09-06T16:45:00Z' },
    { id: 't16', name: 'Gym 16', ownerName: 'Owner 16', adminEmail: 'owner16@gymsmart.test', phone: '9876543216', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE, plan: 'Basic', createdAt: '2026-04-15', memberCount: 272, monthlyRevenue: 2000000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Jaipur', state: 'IN', country: 'India', staffCount: 16, lastActiveAt: '2026-09-17T09:52:00Z' },
    { id: 't17', name: 'Gym 17', ownerName: 'Owner 17', adminEmail: 'owner17@gymsmart.test', phone: '9876543217', status: SUPERADMIN_GYM_STATUS_CODES.TRIAL, plan: 'Pro', createdAt: '2026-05-15', trialEndsAt: '2026-10-28', memberCount: 289, monthlyRevenue: 2125000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Ahmedabad', state: 'IN', country: 'India', staffCount: 17, lastActiveAt: '2026-09-16T10:59:00Z' },
    { id: 't18', name: 'Gym 18', ownerName: 'Owner 18', adminEmail: 'owner18@gymsmart.test', phone: '9876543218', status: SUPERADMIN_GYM_STATUS_CODES.SUSPENDED, plan: 'Enterprise', createdAt: '2026-06-15', memberCount: 306, monthlyRevenue: 2250000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Lucknow', state: 'IN', country: 'India', staffCount: 2, lastActiveAt: '2026-09-15T11:06:00Z' },
    { id: 't19', name: 'Gym 19', ownerName: 'Owner 19', adminEmail: 'owner19@gymsmart.test', phone: '9876543219', status: SUPERADMIN_GYM_STATUS_CODES.CANCELLED, plan: 'Starter', createdAt: '2026-07-15', memberCount: 323, monthlyRevenue: 2375000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Patna', state: 'IN', country: 'India', staffCount: 2, lastActiveAt: '2026-09-14T12:13:00Z' },
    { id: 't20', name: 'Gym 20', ownerName: 'Owner 20', adminEmail: 'owner20@gymsmart.test', phone: '9876543220', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE, plan: 'Basic', createdAt: '2026-08-15', memberCount: 340, monthlyRevenue: 2500000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Bengaluru', state: 'IN', country: 'India', staffCount: 2, lastActiveAt: '2026-09-13T13:20:00Z' },
    { id: 't21', name: 'Gym 21', ownerName: 'Owner 21', adminEmail: 'owner21@gymsmart.test', phone: '9876543221', status: SUPERADMIN_GYM_STATUS_CODES.TRIAL, plan: 'Pro', createdAt: '2026-09-15', trialEndsAt: '2026-10-31', memberCount: 357, monthlyRevenue: 2625000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Hyderabad', state: 'IN', country: 'India', staffCount: 3, lastActiveAt: '2026-09-12T14:27:00Z' },
    { id: 't22', name: 'Gym 22', ownerName: 'Owner 22', adminEmail: 'owner22@gymsmart.test', phone: '9876543222', status: SUPERADMIN_GYM_STATUS_CODES.SUSPENDED, plan: 'Enterprise', createdAt: '2026-01-15', memberCount: 374, monthlyRevenue: 2750000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Chennai', state: 'IN', country: 'India', staffCount: 4, lastActiveAt: '2026-09-11T15:34:00Z' },
    { id: 't23', name: 'Gym 23', ownerName: 'Owner 23', adminEmail: 'owner23@gymsmart.test', phone: '9876543223', status: SUPERADMIN_GYM_STATUS_CODES.CANCELLED, plan: 'Starter', createdAt: '2026-02-15', memberCount: 391, monthlyRevenue: 2875000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Kolkata', state: 'IN', country: 'India', staffCount: 5, lastActiveAt: '2026-09-10T16:41:00Z' },
    { id: 't24', name: 'Gym 24', ownerName: 'Owner 24', adminEmail: 'owner24@gymsmart.test', phone: '9876543224', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE, plan: 'Basic', createdAt: '2026-03-15', memberCount: 408, monthlyRevenue: 3000000, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', city: 'Jaipur', state: 'IN', country: 'India', staffCount: 6, lastActiveAt: '2026-09-09T09:48:00Z' },
];
export const MOCK_GYM_STATS = {
    total: MOCK_GYMS.length,
    active: MOCK_GYMS.filter((gym) => gym.status === SUPERADMIN_GYM_STATUS_CODES.ACTIVE).length,
    trial: MOCK_GYMS.filter((gym) => gym.status === SUPERADMIN_GYM_STATUS_CODES.TRIAL).length,
    suspended: MOCK_GYMS.filter((gym) => gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED).length,
    cancelled: MOCK_GYMS.filter((gym) => gym.status === SUPERADMIN_GYM_STATUS_CODES.CANCELLED).length,
};

/** Deterministic scale tiers for the Gym Directory list/search/pagination harness. */
export const createSuperadminGymsDirectoryScale = (count: number): Tenant[] =>
    Array.from({ length: Math.max(0, Math.floor(count)) }, (_, index) => {
        const ordinal = index + 1;
        const base = MOCK_GYMS[index % MOCK_GYMS.length]!;
        if (!base) throw new Error('Fixture seed must not be empty');
        return { ...base, id: `gym-scale-${ordinal}`, name: `Scale Gym ${ordinal}`, ownerName: `Scale Owner ${ordinal}`, adminEmail: `owner${ordinal}@gymsmart.test`, phone: String(9000000000 + ordinal), memberCount: base.memberCount + ordinal, monthlyRevenue: base.monthlyRevenue + ordinal * 1000 };
    });
export const MOCK_GYMS_TIER_1_SMALL = createSuperadminGymsDirectoryScale(10);
export const MOCK_GYMS_TIER_2_MEDIUM = createSuperadminGymsDirectoryScale(100);
export const MOCK_GYMS_TIER_3_STRESS = createSuperadminGymsDirectoryScale(500);

