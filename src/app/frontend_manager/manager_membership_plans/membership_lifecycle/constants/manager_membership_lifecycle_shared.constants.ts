// RESPONSIBILITY: Centralized constants, Zod schema, and shared data for the Plans module. Single source of truth for tiers, pricing, and form defaults.
/**
 * @description Provides the ManagerMembershipLifecycleSharedConstants implementation for the plans module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const TIERS = ['BASIC', 'GOLD', 'PREMIUM'];


export const MANAGER_MEMBERSHIP_LIFECYCLE_MESSAGES = {
  CHANGE_REQUEST_SUCCESS: 'Change request sent to admin.',
  CHANGE_REQUEST_ERROR: 'Failed to send request. Try again.'
};
