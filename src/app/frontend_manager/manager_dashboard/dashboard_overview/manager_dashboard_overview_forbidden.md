# Manager Dashboard Overview — Forbidden Patterns

## Ownership and boundaries
- Do not import business APIs, URL registries, stores or components from sibling domains.
- Do not retain implementation in the `manager_dashboard/` domain root after RBG6 migration; the domain root is a pure shell and redirect only.
- Do not create sub-submodules or tiny folders for KPI cards, chart panels, lists, dialogs or internal views. These belong in this leaf's canonical category folders.
- Do not split the cohesive read-only overview solely because the file count exceeds 25.

## Contract and routing
- Do not change `/api/v1/manager/dashboard/stats`, its payload, schema, query-key shape or auth semantics without a verified backend contract and approved scope.
- Do not remove `/frontend_manager/manager_dashboard` compatibility behavior while bookmarks/navigation may depend on it.
- Do not drop, rename or normalize unrelated query parameters or repeated query keys during redirect construction.
- Do not infer or promise preservation of URL fragments on server redirects; fragments are client-side and must be handled only where the host permits.

## State, data and security
- Do not store server response data in a duplicate Zustand/local store.
- Do not log member names or sensitive data.
- Do not treat client-side role visibility as backend authorization.
- Do not fabricate offline support, endpoint response fields, feature flags or mutation behavior.

## Testing and accessibility
- Do not mark host tests, typecheck, build or browser E2E as passing without executing them.
- Do not use host stubs as production implementations or allow permissive stubs to hide contract errors.
- Do not remove loading, error, retry, empty or responsive states while moving components.
- Do not introduce inaccessible clickable non-semantic elements, missing labels or hidden focus states.
