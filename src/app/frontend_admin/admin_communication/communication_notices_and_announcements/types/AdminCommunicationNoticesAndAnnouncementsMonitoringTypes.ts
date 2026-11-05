// RESPONSIBILITY: Defines the AdminNavigationLayoutMonitoringTypes route, lifecycle boundary, or module support artifact for admin_navigation shell types; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutMonitoringTypes.ts)

/** Allow-listed, PII-safe metadata passed to the host observability adapter. */
export interface AdminMonitoringEvent {
  readonly errorName: string;
  readonly digest?: string;
  readonly module: string;
  readonly route?: string;
  readonly timestamp: string;
}

/** Host-provided monitoring boundary; no endpoint or credentials are owned by the role module. */
export interface AdminMonitoringAdapter {
  captureException(event: AdminMonitoringEvent): void;
}
