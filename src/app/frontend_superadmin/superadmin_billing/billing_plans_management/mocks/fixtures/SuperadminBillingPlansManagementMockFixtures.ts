/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingPlansMockFixtures owned by the superadmin_billing_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import type { SubscriptionPlan } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management.types';
export const INITIAL_PLANS: SubscriptionPlan[] = [
    { id: 'plan-starter', name: 'Starter Plan', priceMonthly: 499900, priceAnnual: 4999000, maxMembers: 100, maxStaff: 5, dbLimitGb: 5, binaryLimitGb: 10, features: ['Core App', 'Basic Reports'], activeTenants: 28, isPublic: true, trialDays: 14, setupFee: 0, currency: 'INR', isArchived: false },
    { id: 'plan-basic', name: 'Basic Plan', priceMonthly: 999900, priceAnnual: 9999000, maxMembers: 300, maxStaff: 12, dbLimitGb: 10, binaryLimitGb: 25, features: ['Core App', 'Reports', 'Messaging'], activeTenants: 41, isPublic: true, trialDays: 14, setupFee: 199900, currency: 'INR', isArchived: false },
    { id: 'plan-pro', name: 'Pro Plan', priceMonthly: 1999900, priceAnnual: 19999000, maxMembers: 800, maxStaff: 30, dbLimitGb: 25, binaryLimitGb: 75, features: ['Advanced Reports', 'API Access', 'Automation'], activeTenants: 63, isPublic: true, trialDays: 21, setupFee: 499900, currency: 'INR', isArchived: false },
    { id: 'plan-growth', name: 'Growth Plan', priceMonthly: 2999900, priceAnnual: 29999000, maxMembers: 1500, maxStaff: 60, dbLimitGb: 50, binaryLimitGb: 150, features: ['Analytics', 'Priority Support', 'API Access'], activeTenants: 37, isPublic: true, trialDays: 30, setupFee: 799900, currency: 'INR', isArchived: false },
    { id: 'plan-enterprise', name: 'Enterprise Plan', priceMonthly: 5999900, priceAnnual: 59999000, maxMembers: 5000, maxStaff: 200, dbLimitGb: 100, binaryLimitGb: 500, features: ['Dedicated Support', 'SSO', 'Advanced Analytics'], activeTenants: 19, isPublic: true, trialDays: 30, setupFee: 1499900, currency: 'INR', isArchived: false },
    { id: 'plan-legacy', name: 'Legacy Plan', priceMonthly: 749900, priceAnnual: 7499000, maxMembers: 150, maxStaff: 8, dbLimitGb: 8, binaryLimitGb: 15, features: ['Core App', 'Legacy Reports'], activeTenants: 4, isPublic: false, trialDays: 7, setupFee: 0, currency: 'INR', isArchived: true },
];
