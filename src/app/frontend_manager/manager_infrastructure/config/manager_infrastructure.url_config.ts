/**
 * Infrastructure owns no application routes or business API endpoints.
 * This intentionally empty registry satisfies the module URL-config contract
 * without inventing endpoints owned by the host application.
 */
export const ManagerInfrastructureUrlConfig = {
  PAGES: {},
  API: {},
} as const;
