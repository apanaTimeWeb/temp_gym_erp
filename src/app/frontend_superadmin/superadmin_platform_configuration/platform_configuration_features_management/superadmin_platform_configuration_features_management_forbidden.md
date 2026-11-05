# superadmin_platform_configuration_features_management — Forbidden Patterns
The following are forbidden inside this module:

- Cross-feature business imports or sibling-module business utilities.
- Raw `fetch`/`axios` from components.
- Direct TanStack mutations from components.
- Hardcoded backend/API URLs in UI or API wrappers outside URL config.
- Inline query-key arrays when the module query-key registry exists.
- Hardcoded business status literals or currency symbols in JSX.
- Secrets/tokens/passwords/payment data in browser storage.
- `any`, `@ts-ignore`, `@ts-nocheck`, `console.log`.
- Placeholder/fake controls that do not complete a real UI → state/API → feedback → UI loop.
- Snapshot-only or serialization-only tests as the sole proof of a user workflow.
- Raw technical error details shown to users.
- New shared business utilities created merely to reduce duplication.

## Repair discipline
When a violation is found, repair the owning module rather than broadening the blast radius. If a rule genuinely requires application infrastructure, document that dependency before changing it.

## Module-Specific Forbidden Baseline (Rule 40)

- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not create role-wide business components, stores, APIs, schemas, or utilities for this module.
- Do not import sibling feature business logic; only approved global infrastructure is allowed.
- Do not bypass the module URL config, runtime validation, query-key ownership, cache invalidation, or mutation idempotency requirements.
- Do not hardcode feature UI copy, business status labels, currency symbols, raw theme colors, or arbitrary Tailwind values.


## RBG 2 enforcement notes
- Do not invent host rewrites for `/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management` vs `/superadmin/features`; public route mapping is `NOT_VERIFIED` without host middleware/config.
- Do not silently reconcile `ApiResponse<void>` with `z.null()` without the canonical `apiFetch` type/runtime contract; report `SOURCE_CONFLICT`.
- Do not treat a failed tenant query as an empty tenant list; expose a retryable error state.
- All metadata and destructive release-note interactions must have real mutation paths, visible feedback, and stable idempotency-key lifecycle.


---

## Retained in-module documentation archive

**Original path:** `superadmin_platform_configuration_features/superadmin_platform_configuration_features_documentation/superadmin_platform_configuration_features_rollout_insights_forbidden.md`  
**Disposition:** Historical/supporting documentation retained verbatim for traceability. It is not a separate active module contract unless explicitly stated in the active module documentation.

# Feature Rollouts & Release History — Forbidden Patterns

- Do not place feature data directly inside components, hooks, or stores.
- Do not import another role or business module.
- Do not bypass the module API client to read fixtures directly from UI code.
- Do not use magic API URLs, inline business status maps, or raw financial formatting.
- Do not introduce Recharts or Chart.js; Superadmin analytics use the approved ApexCharts path.


## Autonomous Leaf Isolation Contract

- Owning terminal leaf: `superadmin_platform_configuration_features/features_management/`. Keep business components, hooks, API services, schemas, mocks, tests, formatters, state and feature permissions inside this leaf.
- Do not import business implementation from sibling feature leaves or create parent `common/` / `shared/` folders to share business behavior. Duplicate feature-specific behavior locally when needed.
- Approved zero-business host dependencies must be declared with exact shapes in `superadmin_platform_configuration_features_management_features.md`. Role-shell imports currently recorded as `BLOCKED_BY_SUPPLIED_CONTRACT` must not be hidden by fabricated global modules.
- Preserve URL config endpoint values, authorization gates, query keys, permission-masked fields, and request/response contracts unless verified source evidence authorizes a correction.
