# trainer_dashboard — Canonical Domain Map (v20)

## Domain purpose
The Dashboard domain provides the trainer's operational landing page. It surfaces trainer-scoped statistics, goal/progress charts, membership distribution, upcoming sessions, recent progress, and a URL-backed date-range filter. It is read-only and does not own payout, revenue, salary, commission, or TDS workflows.

## Canonical route owner
The sole canonical UI route is `/frontend_trainer/trainer_dashboard/dashboard_overview`, owned by `dashboard_overview/page.tsx` and listed in `CANONICAL_ROUTE_MANIFEST.json`. The dashboard leaf owns its `loading.tsx`, `error.tsx`, and `not-found.tsx` states. No `/trainer/dashboard` legacy UI route or compatibility adapter is shipped by this role archive. Host menus/bookmarks/auth callbacks must target the canonical route; any inbound redirect is host-owned and is not asserted here.

## URL and data contract
- Date-filter query parameters: `range`, `startDate`, and `endDate`.
- The dashboard API path remains `/trainer/trainer_dashboard/stats`; this is a backend API endpoint, not a UI route.
- The dashboard is read-only; no create/update/delete mutation is documented.
- Unsupported historical aggregate ranges must continue to surface the backend's explicit unsupported response. Do not synthesize historical KPI or chart values.

## Feature composition
`dashboard_overview` owns the KPI cards, date filter, goal-trend chart, membership-distribution chart, quick actions, upcoming sessions, recent-progress view, query hooks, schema, mock contract, and route-state components. Quick actions navigate to the canonical leaf routes in `CANONICAL_ROUTE_MANIFEST.json`.

## Integration boundary
The host supplies the authenticated trainer session, role guard, API transport, providers, and route mounting. Public host rewrites, auth callbacks, and external bookmarks are not certified by this isolated role archive. Backend `/trainer/...` API contracts remain unchanged.
