import { MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/constants/manager_membership_lifecycle.constants';
import type { ManagerMembershipLifecycleMembershipOverview } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle_membership.types';

/**
 * @description Provides the ManagerMembershipLifecycleMembershipMockData implementation for the plans module.
 * @dependencies @/app/frontend_manager/manager_membership_plans/manager_plans_types/ManagerMembershipLifecycleMembershipTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_PLANS_MEMBERSHIP_OVERVIEW: ManagerMembershipLifecycleMembershipOverview = {
  memberOptions: [
    { id: 'm-plan-1', name: 'Rahul Kumar', phone: '+919876543210', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Pro Access', planId: 'p1', expiryDate: '2026-11-20T00:00:00Z' },
    { id: 'm-plan-2', name: 'Priya Singh', phone: '+919876543211', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Basic Access', planId: 'p2', expiryDate: '2026-11-18T00:00:00Z' },
    { id: 'm-plan-3', name: 'Neha Verma', phone: '+919876543212', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Elite Training', planId: 'p3', expiryDate: '2026-11-25T00:00:00Z' },
    { id: 'm-plan-4', name: 'Amit Sharma', phone: '+919876543213', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Annual Diamond', planId: 'p1', expiryDate: '2026-11-15T00:00:00Z' },
    { id: 'm-plan-5', name: 'Sneha Patel', phone: '+919876543214', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Pro Access', planId: 'p1', expiryDate: '2026-12-05T00:00:00Z' },
    { id: 'm-plan-6', name: 'Vikram Malhotra', phone: '+919876543215', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Basic Access', planId: 'p2', expiryDate: '2026-11-14T00:00:00Z' },
    { id: 'm-plan-7', name: 'Ananya Roy', phone: '+919876543216', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Elite Training', planId: 'p3', expiryDate: '2026-12-15T00:00:00Z' },
  ],
  renewalCandidates: [
    { id: 'm-plan-6', name: 'Vikram Malhotra', phone: '+919876543215', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Basic Access', planId: 'p2', expiryDate: '2026-11-14T00:00:00Z' },
    { id: 'm-plan-4', name: 'Amit Sharma', phone: '+919876543213', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Annual Diamond', planId: 'p1', expiryDate: '2026-11-15T00:00:00Z' },
    { id: 'm-plan-2', name: 'Priya Singh', phone: '+919876543211', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Basic Access', planId: 'p2', expiryDate: '2026-11-18T00:00:00Z' },
    { id: 'm-plan-1', name: 'Rahul Kumar', phone: '+919876543210', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Pro Access', planId: 'p1', expiryDate: '2026-11-20T00:00:00Z' },
    { id: 'm-plan-3', name: 'Neha Verma', phone: '+919876543212', status: MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES.ACTIVE, planName: 'Elite Training', planId: 'p3', expiryDate: '2026-11-25T00:00:00Z' },
  ] };
