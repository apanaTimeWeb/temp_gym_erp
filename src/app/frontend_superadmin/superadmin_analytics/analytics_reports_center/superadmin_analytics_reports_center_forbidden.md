# superadmin_analytics_reports_center — Forbidden Patterns
## What is EXPLICITLY NOT ALLOWED in this module

1. **No `key={index}`** — All table rows must use stable unique keys (`row.month`, `row.id`). Index keys break React reconciliation.

2. **No direct `.sort()` on imported arrays** — `HEALTH_DATA.sort()` mutates the module-level constant. Always spread first: `[...HEALTH_DATA].sort(...)`.

3. **No Recharts or Chart.js** — The canonical chart library is ApexCharts (`react-apexcharts`). Any other chart library is forbidden (Rule 62, Design §10).

4. **No hardcoded mock data inside the client component** — All static data (`REVENUE_DATA`, `CANCELLATIONS_DATA`, `HEALTH_DATA`, `GRADE_STYLES`, `PAYMENT_HEALTH_STYLES`) must be imported from `superadmin_analytics_reports_constants.ts`.

5. **No inline threshold magic numbers** — `TICKET_DANGER_THRESHOLD` and `TICKET_WARNING_THRESHOLD` are defined in `superadmin_analytics_reports_constants.ts`. Never write `> 10` or `> 5` inline in JSX.

6. **No `any` type** — Strictly forbidden. Use typed interfaces from `superadmin_analytics_reports_types.ts`.

7. **No relative imports** — All imports must use `@/` absolute paths (Rule 10).

8. **No `console.log`** — Forbidden in committed code (Rule 44).

9. **No hardcoded Tailwind colors** — Use design system tokens only. Never `bg-[#111]` or arbitrary hex values.

10. **No ApexCharts without `dynamic()` + `ssr: false`** — ApexCharts uses browser APIs and will crash on SSR. Always import via `next/dynamic` with `ssr: false`.

11. **No unchecked array access** — `REVENUE_DATA[REVENUE_DATA.length - 1]` must be typed safely. With `noUncheckedIndexedAccess`, this returns `RevenueRow | undefined`. Always assert or guard.

## Module-Specific Forbidden Baseline (Rule 40)

- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not create role-wide business components, stores, APIs, schemas, or utilities for this module.
- Do not import sibling feature business logic; only approved global infrastructure is allowed.
- Do not bypass the module URL config, runtime validation, query-key ownership, cache invalidation, or mutation idempotency requirements.
- Do not hardcode feature UI copy, business status labels, currency symbols, raw theme colors, or arbitrary Tailwind values.


---

## Retained in-module documentation archive

**Original path:** `superadmin_analytics_reports/superadmin_analytics_reports_documentation/superadmin_analytics_reports_comparison_forbidden.md`  
**Disposition:** Historical/supporting documentation retained verbatim for traceability. It is not a separate active module contract unless explicitly stated in the active module documentation.

# Retired Reports Comparison Artifact — Constraints

This historical subfeature is not active in the supplied source snapshot. Do not create a parallel route tree, resurrect an orphan API/query key, invent backend contract behavior, or treat this file as an active feature's mandatory contract. The active module's canonical constraints are in `../superadmin_analytics_reports_forbidden.md`.


## Autonomous Leaf Isolation Contract

- Owning terminal leaf: `superadmin_analytics_reports/reports_center/`. Keep business components, hooks, API services, schemas, mocks, tests, formatters, state and feature permissions inside this leaf.
- Do not import business implementation from sibling feature leaves or create parent `common/` / `shared/` folders to share business behavior. Duplicate feature-specific behavior locally when needed.
- Approved zero-business host dependencies must be declared with exact shapes in `superadmin_analytics_reports_center_features.md`. Role-shell imports currently recorded as `BLOCKED_BY_SUPPLIED_CONTRACT` must not be hidden by fabricated global modules.
- Preserve URL config endpoint values, authorization gates, query keys, permission-masked fields, and request/response contracts unless verified source evidence authorizes a correction.
