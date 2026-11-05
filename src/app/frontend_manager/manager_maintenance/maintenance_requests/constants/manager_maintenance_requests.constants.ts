/**
 * @description Provides the ManagerMaintenanceRequestsConstants implementation for the maintenance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MAINTENANCE_PRIORITIES = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
] as const;
export const MANAGER_MAINTENANCE_REQUESTS_DEFAULT_PRIORITY = MAINTENANCE_PRIORITIES[1].value;

export const MANAGER_MAINTENANCE_REQUESTS_RESOLVED_STATUS = 'RESOLVED' as const;

export const MANAGER_MAINTENANCE_REQUESTS_STATUS_VALUES = {
  OPEN: 'OPEN',
  RESOLVED: 'RESOLVED',
  IN_PROGRESS: 'IN_PROGRESS',
} as const;

export const MANAGER_MAINTENANCE_REQUESTS_STATUS_OPTION_VALUES = ['OPEN', 'IN_PROGRESS', 'RESOLVED'] as const;

export const MANAGER_MAINTENANCE_REQUESTS_PRIORITY_VALUES = ['LOW', 'MEDIUM', 'HIGH'] as const;
