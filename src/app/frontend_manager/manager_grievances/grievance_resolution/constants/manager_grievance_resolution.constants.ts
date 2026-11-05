/**
 * @description Provides the ManagerGrievanceResolutionConstants implementation for the grievance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_GRIEVANCE_RESOLUTION_SEARCH_QUERY_PARAM = 'search' as const;

export const GRIEVANCE_CATEGORIES = [
  { value: 'HYGIENE', label: 'Hygiene / Cleanliness' },
  { value: 'STAFF_BEHAVIOUR', label: 'Staff Behaviour' },
  { value: 'EQUIPMENT', label: 'Equipment Issue' },
  { value: 'OTHER', label: 'Other' },
] as const;


export const MANAGER_GRIEVANCE_RESOLUTION_STATUS_CLOSED = 'CLOSED' as const;

export const MANAGER_GRIEVANCE_RESOLUTION_STATUS_VALUES = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  RESOLVING: 'RESOLVING',
} as const;

export const MANAGER_GRIEVANCE_RESOLUTION_STATUS_RESOLVING = 'RESOLVING' as const;

export const MANAGER_GRIEVANCE_RESOLUTION_STATUS_OPTION_VALUES = ['OPEN', 'RESOLVING', 'CLOSED'] as const;

export const MANAGER_GRIEVANCE_RESOLUTION_CATEGORY_VALUES = ['HYGIENE', 'STAFF_BEHAVIOUR', 'EQUIPMENT', 'OTHER'] as const;
