/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsV1MockFixtures owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_v1.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns complete mutable MSW fixture data for Superadmin tenant business controls.
import { SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';

import type { SuperadminGymsV1Data } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_v1.types';



export const SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE: SuperadminGymsV1Data = {
  currency: 'INR',
  segments: [
    { name: 'High income + at risk', count: 18, rule: 'Monthly income above ₹50,000 and health below 70.' },
    { name: 'Trial ending soon', count: 27, rule: 'Trial ends within 5 days.' },
    { name: 'Usage almost full', count: 12, rule: 'Any major limit above 90%.' },
    { name: 'Payment recovery', count: 9, rule: 'Payment failed and recovery is still open.' },
  ],
  filters: [
    { key: 'all', label: 'All tenants' },
    { key: 'active', label: 'Active tenants' },
    { key: 'trial', label: 'Trial tenants' },
    { key: 'suspended', label: 'Suspended tenants' },
    { key: 'high-income', label: 'High income' },
    { key: 'high-usage', label: 'High usage' },
    { key: 'health-risk', label: 'Health risk' },
    { key: 'payment-recovery', label: 'Payment recovery' },
  ],
  bulk: ['Send message', 'Extend trial', 'Export selected', 'Move plan', 'Suspend selected'],
  saved: [
    { key: 'health-risk', label: 'High income + at risk' },
    { key: 'trial', label: 'Trials ending soon' },
    { key: 'payment-recovery', label: 'Payment recovery queue' },
  ],
  rows: [
    { id: 'tenant-bc-1', name: 'Iron Core Fitness', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE, region: 'Delhi', plan: 'Business', income: 14800000, health: 94, usage: 71, trialDays: 0, paymentRecoveryOpen: false, lastAction: null },
    { id: 'tenant-bc-2', name: 'Prime Motion', status: SUPERADMIN_GYM_STATUS_CODES.TRIAL, region: 'Pune', plan: 'Starter', income: 5100000, health: 58, usage: 94, trialDays: 3, paymentRecoveryOpen: false, lastAction: null },
    { id: 'tenant-bc-3', name: 'FitNest Studio', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE, region: 'Mumbai', plan: 'Professional', income: 8900000, health: 88, usage: 67, trialDays: 0, paymentRecoveryOpen: true, lastAction: null },
    { id: 'tenant-bc-4', name: 'Urban Strength', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE, region: 'Bengaluru', plan: 'Professional', income: 7600000, health: 63, usage: 91, trialDays: 0, paymentRecoveryOpen: false, lastAction: null },
  ],
};
