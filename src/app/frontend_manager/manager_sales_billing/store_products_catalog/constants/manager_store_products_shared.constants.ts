// DATA FLOW: API/server state → ManagerStoreProductsSharedConstants → owning feature UI; UI events/mutations → ManagerStoreProductsSharedConstants → module API → TanStack Query cache/UI.
// RESPONSIBILITY: Stores Store-specific display/filter constants only; form schema and defaults live in the Store form/schema contracts.
/**
 * @description Provides the ManagerStoreProductsSharedConstants implementation for the store module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const CATEGORIES = ['Supplements', 'Accessories', 'Equipment', 'Merchandise', 'Others'] as const;
export const PAYMENT_METHODS = ['UPI', 'Cash'] as const;
export const ERR_EMPTY_ORDER = 'Add items to order first';

export const STORE_RETURN_STATUS_VALUES = ['NONE', 'PARTIAL', 'FULL'] as const;

export const STORE_COMPLETED_ORDER_STATUS = 'COMPLETED' as const;
export const STORE_PENDING_ORDER_STATUS = 'PENDING' as const;

export const STORE_RETURN_NONE_STATUS = 'NONE' as const;

export const STORE_CATEGORY_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'COPY_ALL_CATEGORIES' },
  { value: 'Supplements', labelKey: 'COPY_SUPPLEMENTS' },
  { value: 'Merchandise', labelKey: 'COPY_MERCHANDISE' },
  { value: 'Beverages', labelKey: 'COPY_BEVERAGES' },
  { value: 'Equipment', labelKey: 'COPY_EQUIPMENT' },
  { value: 'Others', labelKey: 'COPY_OTHERS' },
  { value: 'Others', labelKey: 'COPY_OTHERS' },
] as const;

export const STORE_STOCK_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'COPY_ALL_STOCK' },
  { value: 'IN_STOCK', labelKey: 'COPY_STOCK_2' },
  { value: 'OUT_OF_STOCK', labelKey: 'COPY_OUT_STOCK' },
] as const;

export const STORE_SORT_ORDER_VALUES = ['ASC', 'DESC'] as const;
