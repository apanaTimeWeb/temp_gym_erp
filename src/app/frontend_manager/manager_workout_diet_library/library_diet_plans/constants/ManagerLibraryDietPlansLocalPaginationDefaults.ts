// RESPONSIBILITY: Application-level pagination default shared as zero-business UI infrastructure.
/**
 * @description Provides the ManagerPaginationDefaults implementation for the manager infrastructure module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_ITEMS_PER_PAGE = 10;
