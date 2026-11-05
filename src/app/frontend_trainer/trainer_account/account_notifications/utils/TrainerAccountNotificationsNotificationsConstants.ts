// RESPONSIBILITY: Defines the Trainer Notifications module's static business configuration and primary registry.
// DATA FLOW: Module constants → notification types/query orchestration → notification UI.

/**
 * @description Static notification type identifiers accepted by the Trainer Notifications API contract.
 * @dependencies Used by Trainer Notifications domain types and module-owned mocks.
 * @edge-case Keep server-driven notification records out of this registry; this file contains configuration only.
 */
export const TRAINER_NOTIFICATIONS_TYPE_IDS = [
  'MEMBER',
  'WORKOUT',
  'SYSTEM',
  'ATTENDANCE',
] as const;

/**
 * @description Maximum notification page size used by the feature query.
 * @dependencies Trainer Notifications query orchestration.
 * @edge-case Must remain aligned with the feature API contract and not be duplicated in components.
 */
export const TRAINER_NOTIFICATIONS_PAGE_LIMIT = 20;
