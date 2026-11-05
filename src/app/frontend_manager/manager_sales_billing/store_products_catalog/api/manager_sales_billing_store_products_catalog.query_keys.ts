// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager store module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_STORE_PRODUCTS_QUERY_KEYS = {
  all: ['manager_store_products_catalog'] as const,
  products: <T extends object>(params: T) => [...MANAGER_STORE_PRODUCTS_QUERY_KEYS.all, 'products', params] as const,
  orders: <T extends object>(params: T) => [...MANAGER_STORE_PRODUCTS_QUERY_KEYS.all, 'orders', params] as const,
  summary: () => [...MANAGER_STORE_PRODUCTS_QUERY_KEYS.all, 'summary'] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerStoreProductsQueryKeys = MANAGER_STORE_PRODUCTS_QUERY_KEYS;
