---
feature: "superadmin_analytics_reports_center"
owner_role: "superadmin"
module_version: 18
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-30"
last_verified_commit: "host-unavailable"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_YET_VERIFIED (target 8/8)"
---

# Superadmin Reports Center — Autonomous Sub-Module Contract

This specification was generated from the supplied Superadmin web ZIP and the parent domain contract `superadmin_analytics_features.md`. The inherited master contract remains at the parent domain root; this leaf document records the current autonomous leaf ownership after RBG1 structural migration. Any unknown contract is explicitly marked `NOT_VERIFIED` or `BLOCKED_BY_SUPPLIED_CONTRACT` rather than inferred.


**Parent domain contract:** `superadmin_analytics_features.md` is the inherited domain-level contract; this leaf document is authoritative for the physical leaf implementation and its current inventory.

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Revenue report and export workspace; cancellation/health totals are read-only summary projections, while independently browsable reports live in sibling routes. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map

### Route-entry evidence

| Entry file | Filesystem-derived route | Evidence boundary |
| --- | --- | --- |
| `page.tsx` | /frontend_superadmin/superadmin_analytics/analytics_reports_center | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `loading.tsx` | `/frontend_superadmin/superadmin_analytics/analytics_reports_center` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `error.tsx` | `/frontend_superadmin/superadmin_analytics/analytics_reports_center` | Canonical route entry present in owning feature module; host alias redirects are specified separately |
| `not-found.tsx` | `/frontend_superadmin/superadmin_analytics/analytics_reports_center` | Canonical route entry present in owning feature module; host alias redirects are specified separately |

**Current v12 repair snapshot:** `60` files total in this leaf, including the documentation trio and route entries. Route entries: `error.tsx, loading.tsx, not-found.tsx, page.tsx`. Counts above are recomputed from the supplied v11 baseline plus the approved RBG-01–03 repair changes; browser/runtime routing remains host-dependent.

### Leaf-owned artifact inventory

| Category | File count | Representative source paths (relative to this leaf) |
| --- | ---: | --- |
| `components/` | 8 | `components/reports_center_dashboard_widgets/SuperadminAnalyticsReportsCenterSummaryCards.tsx`, `components/reports_center_forms_and_filters/SuperadminAnalyticsReportsCenterDatePresetDropdown.tsx`, `components/reports_center_forms_and_filters/SuperadminAnalyticsReportsCenterExportButton.tsx` |
| `hooks/` | 5 | `hooks/useSuperadminAnalyticsReportsCenterExportMutation.ts`, `hooks/useSuperadminAnalyticsReportsCenterMain.ts`, `hooks/useSuperadminAnalyticsReportsCenterPage.ts` |
| `api/` | 3 | `api/superadmin_analytics_reports_center.api.ts`, `api/superadmin_analytics_reports_center_export.api.ts` |
| `state/` | 1 | `state/SuperadminAnalyticsReportsCenterGitkeep` |
| `types/` | 5 | `types/superadmin_analytics_reports_center.types.ts`, `types/superadmin_analytics_reports_center_date_preset_dropdown.types.ts`, `types/superadmin_analytics_reports_center_export_button.types.ts` |
| `schemas/` | 3 | `schemas/superadmin_analytics_reports_center_contract.schemas.ts`, `schemas/superadmin_analytics_reports_center_export_response.schemas.ts` |
| `utils/` | 3 | `utils/SuperadminAnalyticsReportsCenterDateRangeUtils.ts`, `utils/SuperadminAnalyticsReportsCenterFormatCurrency.ts` |
| `mocks/` | 3 | `mocks/fixtures/SuperadminAnalyticsReportsCenterMockFixtures.ts`, `mocks/handlers/SuperadminAnalyticsReportsCenterMockHandlers.ts` |
| `tests/` | 16 | `tests/SuperadminAnalyticsReportsCenterBasic.test.tsx`, `tests/components/SuperadminAnalyticsReportsCenterProgressBar.test.tsx`, `tests/constants/SuperadminAnalyticsReportsCenterConstants.test.ts` |
| `config/` | 3 | `config/superadmin_analytics_reports_center.url_config.ts` |
| `contracts/` | 1 | `contracts/host-stubs.d.ts` |
| `locales/` | 2 | `locales/superadmin_analytics_reports_center_en.json`, `locales/superadmin_analytics_reports_center_hi.json` |
| `constants/` | 2 | `constants/superadmin_analytics_reports_center.constants.ts`, `api/superadmin_analytics_reports_center.query_keys.ts` |

### Direct leaf-root files

- `error.tsx`
- `loading.tsx`
- `not-found.tsx`
- `page.tsx`

This inventory is generated from the current filesystem and is authoritative for file placement only. Component responsibility and supported business behavior must be inferred from the actual source implementation, not from filenames alone.



### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminAnalyticsReportsCenterPageSuspenseSkeleton.tsx | Feature-local route loading skeleton for analytics_reports_center, with no sibling-module dependencies. |
| components/SuperadminAnalyticsReportsCenterSectionError.tsx | Renders the reports section sectionerror state. |
| components/SuperadminAnalyticsReportsCenterSectionLoading.tsx | Renders the reports section sectionloading state. |
| components/reports_center_dashboard_widgets/SuperadminAnalyticsReportsCenterSummaryCards.tsx | Renders/orchestrates SuperadminAnalyticsReportsCenterSummaryCards within its owning Superadmin feature module; no direct backend implementation. |
| components/reports_center_forms_and_filters/SuperadminAnalyticsReportsCenterDatePresetDropdown.tsx | Renders/orchestrates SuperadminAnalyticsReportsCenterDatePresetDropdown within its owning Superadmin feature module; no direct backend implementation. |
| components/reports_center_forms_and_filters/SuperadminAnalyticsReportsCenterExportButton.tsx | Renders/orchestrates SuperadminAnalyticsReportsCenterExportButton within its owning Superadmin feature module; no direct backend implementation. |
| components/reports_center_main/SuperadminAnalyticsReportsCenterMain.tsx | Renders and orchestrates SuperadminAnalyticsReportsMain for the owning Superadmin feature module; presentation stays free of direct API calls. |
| components/reports_center_states_and_feedback/SuperadminAnalyticsReportsCenterProgressBar.tsx | Renders one bounded report-health progress segment in its owning feature module. |
| components/reports_center_tabs/SuperadminAnalyticsReportsCenterCancellationsTab.tsx | Renders/orchestrates SuperadminAnalyticsReportsCenterCancellationsTab within its owning Superadmin feature module; no direct backend implementation. |
| components/reports_center_tabs/SuperadminAnalyticsReportsCenterHealthTab.tsx | Renders/orchestrates SuperadminAnalyticsReportsCenterHealthTab within its owning Superadmin feature module; no direct backend implementation. |
| components/reports_center_tabs/SuperadminAnalyticsReportsCenterRevenueTab.tsx | Renders/orchestrates SuperadminAnalyticsReportsCenterRevenueTab within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows

### Route identity evidence

- Leaf route-entry directory: `/frontend_superadmin/superadmin_analytics/analytics_reports_center/` (filesystem-derived from this ZIP).
- Leaf entry file present: `page.tsx` = `present`.
- Configured parent/compatibility route value: `/frontend_superadmin/superadmin_analytics/analytics_reports_center`.
- Where a parent route shim exists, its redirect and query forwarding are governed by the actual `page.tsx` implementation and the route regression tests; this text does not define a new alias.
- API endpoint paths listed in Section 4 are backend request URLs, not browser page routes.
- Any route alias not evidenced by a route-entry file or the centralized URL config is `NOT_VERIFIED_IN_SCOPE`; retain existing behavior and do not invent routes.

### Navigation behavior source of truth

- Start with the route-entry files and the component tree imported by `page.tsx`.
- Use the feature-owned API operation and mutation inventories in Sections 4 and 6 to identify supported actions.
- Direct detail/add routes outside this leaf are not declared by this leaf contract. Existing Gym legacy route placement and System Ops ownership remain tracked contract exceptions.

### Monetary and calendar-date semantics

Revenue, cancellation MRR, and net revenue values are validated as integer currency minor units. Cancellation dates that are date-only strings are parsed as local calendar dates for display; timestamp values continue to represent instants. The supplied backend DTO does not independently verify those field semantics, so the source contract and host response must be reconciled before production certification.

## 4. API Contract & UI Data Requirements

### API-client callsites observed in source

The table below records `apiFetch` callsites from this leaf’s `api/` directory. A method shown as `OMITTED_AT_CALLSITE` was not explicitly supplied at the callsite; the host transport default is not verified from this role-only ZIP. Endpoint expressions and schema names are preserved from code, not inferred from backend conventions.

| Operation property | Method | Endpoint expression | Generic response data type | Runtime schema option | Idempotency key present | Source file |
| --- | --- | --- | --- | --- | --- | --- |
| `fetchRevenueData` | `OMITTED_AT_CALLSITE` | ``${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/revenue${q}`` | `RevenueRow[]` | dataSchema | no / not evidenced in this call | `superadmin_analytics_reports_center.api.ts` |
| `fetchCancellationsData` | `OMITTED_AT_CALLSITE` | ``${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/cancellations${q}`` | `CancellationsRecord[]` | dataSchema | no / not evidenced in this call | `superadmin_analytics_reports_center.api.ts` |
| `fetchHealthData` | `OMITTED_AT_CALLSITE` | ``${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/health${q}`` | `TenantHealthScore[]` | dataSchema | no / not evidenced in this call | `superadmin_analytics_reports_center.api.ts` |
| `requestExport` | `"POST"` | `SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.EXPORT.BACKEND_API.EXPORT` | `null` | responseSchema | yes | `superadmin_analytics_reports_center_export.api.ts` |

### Canonical URL configuration values observed in source

| Config symbol / property | Declared value |
| --- | --- |
| `SUPERADMIN_ANALYTICS_REPORTS_CENTER_API[BASE]` | `"/superadmin/reports"` |
| `SUPERADMIN_ANALYTICS_REPORTS_CENTER_API[EXPORT.BACKEND_API.EXPORT]` | `"/export-data"` |

### Route config and contract boundaries

- URL config file(s): `superadmin_analytics_reports_center.url_config.ts`.
- Configured `*_ROUTES.MAIN` value: `"/frontend_superadmin/superadmin_analytics/analytics_reports_center"`.
- Response field shapes and mutation payloads are governed by the TypeScript/Zod schemas and function signatures in this leaf; values not declared there must not be invented.
- Public URL aliases/rewrites outside the supplied role tree and live backend behavior are `NOT_VERIFIED_IN_SCOPE`.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_analytics_reports_center.api.ts:22 | GET | `${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/revenue${q}` | Present |
| api/superadmin_analytics_reports_center.api.ts:26 | GET | `${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/cancellations${q}` | Present |
| api/superadmin_analytics_reports_center.api.ts:30 | GET | `${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/health${q}` | Present |
| api/superadmin_analytics_reports_center_api_fetch.api.ts:11 | GET | url | See API wrapper validation |
| api/superadmin_analytics_reports_center_export.api.ts:20 | POST | SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.EXPORT.BACKEND_API.EXPORT | Present |

Response types: `types/superadmin_analytics_reports_center.types.ts`, `types/superadmin_analytics_reports_center_date_preset_dropdown.types.ts`, `types/superadmin_analytics_reports_center_export_button.types.ts`, `types/superadmin_analytics_reports_center_progress_bar.types.ts`, `types/superadmin_analytics_reports_center_section_error.types.ts`, `types/superadmin_analytics_reports_center_tab.types.ts`.

Validation schemas: `schemas/superadmin_analytics_reports_center_api_response.schema.ts`, `schemas/superadmin_analytics_reports_center_contract.schemas.ts`, `schemas/superadmin_analytics_reports_center_export_response.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 41 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State

### `api/superadmin_analytics_reports_center.query_keys.ts`

```typescript
/**
 * @description Canonical query-key registry for Superadmin Reports server state.
 * @invariant Every report query includes its request-shaping parameters in the cache identity.
 */
export const SUPERADMIN_ANALYTICS_REPORTS_QUERY_KEYS = {
  all: ['superadmin_analytics_reports'] as const,
  revenue: (queryParams: Readonly<Record<string, string>>) => ['superadmin_analytics_reports', 'revenue', queryParams] as const,
  cancellations: (queryParams: Readonly<Record<string, string>>) => ['superadmin_analytics_reports', 'cancellations', queryParams] as const,
  health: (queryParams: Readonly<Record<string, string>>) => ['superadmin_analytics_reports', 'health', queryParams] as const,
} as const;
```

### `api/superadmin_analytics_reports_center.query_keys.ts`

```typescript
/**
 * @description Canonical query-key registry for Superadmin Reports server state.
 * @invariant Every report query includes its request-shaping parameters in the cache identity.
 */
export const SUPERADMIN_ANALYTICS_REPORTS_QUERY_KEYS = {
  all: ['superadmin_analytics_reports'] as const,
  revenue: (queryParams: Readonly<Record<string, string>>) => ['superadmin_analytics_reports', 'revenue', queryParams] as const,
  cancellations: (queryParams: Readonly<Record<string, string>>) => ['superadmin_analytics_reports', 'cancellations', queryParams] as const,
  health: (queryParams: Readonly<Record<string, string>>) => ['superadmin_analytics_reports', 'health', queryParams] as const,
} as const;
```

Query-cache invalidation and key consistency are not treated as verified merely because a key file exists. The operation-by-operation audit is assigned to RBG2.

## 6. Mutation Inventory & Lifecycle Operations

| Function | Method evidence | URL expression | Source file |
| --- | --- | --- | --- |
| fetchRevenueData | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE; method still requires exact call-block verification | /frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center.api.ts |
| fetchCancellationsData | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE; method still requires exact call-block verification | /frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center.api.ts |
| fetchHealthData | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE; method still requires exact call-block verification | /frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center.api.ts |
| requestExport | NOT_VERIFIED — inspect this operation call block | Observed expression SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BACKEND_API; method still requires exact call-block verification | /frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center_export.api.ts |

**Mutation safety evidence:** the structural migration did not modify API request payloads, endpoint constant values, or mutation function bodies except updating import specifiers. Idempotency UUID generation, stable retry behavior, and one-time key lifecycle remain `NOT_VERIFIED` until RBG2 traces each mutation and its caller.

## 7. Permissions and Role Rules

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_analytics_reports_forbidden.md`; frontend checks do not replace backend authorization.

Backend authorization is authoritative. Any omitted host session/permission contract is an explicit integration dependency, not permission to infer a role or expose protected fields.

## 8. State Ownership & Architecture Flow

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

- **Actual feature root:** `superadmin_analytics_reports`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `api/superadmin_analytics_reports_center.query_keys.ts`

### Files observed in state ownership

| State file | Observed role |
| --- | --- |
| state/SuperadminAnalyticsReportsCenterGitkeep | Module-local state artifact; semantics must be confirmed from its exports before changes. |

Server data is expected to remain under the existing TanStack Query integration; the structural move does not change state ownership behavior.

## 9. Offline, Loading, Empty, and Error States

_No matching implementation evidence found in the supplied sub-module. This is `NOT_VERIFIED`, not proof that the behavior is absent._

The current source scan does not establish a complete offline/reconnect contract. Do not claim offline support from retry handlers alone. If reconnect reconciliation is a product requirement, record it as `CONTRACT_INCOMPLETE` until a verified backend/client contract is supplied.

## 10. Security and PII Rules (Data Masking & Guards)

### Existing forbidden-pattern contract

# Reports Module — Forbidden Patterns

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

### Implementation evidence scan

| File | Line | Source evidence |
| --- | --- | --- |
| api/superadmin_analytics_reports_center_export.api.ts | 23 | headers: { 'Idempotency-Key': idempotencyKey }, |
| components/reports_center_dashboard_widgets/SuperadminAnalyticsReportsCenterSummaryCards.tsx | 15 | * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling. |
| components/reports_center_forms_and_filters/SuperadminAnalyticsReportsCenterDatePresetDropdown.tsx | 26 | * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling. |
| components/reports_center_forms_and_filters/SuperadminAnalyticsReportsCenterExportButton.tsx | 23 | * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling. |
| components/reports_center_tabs/SuperadminAnalyticsReportsCenterCancellationsTab.tsx | 23 | * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling. |
| components/reports_center_tabs/SuperadminAnalyticsReportsCenterHealthTab.tsx | 28 | * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling. |
| components/reports_center_tabs/SuperadminAnalyticsReportsCenterRevenueTab.tsx | 22 | * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling. |

The RBG1 operation changed file locations and import specifiers, not payload schemas or endpoint literals. A clean security assessment is not claimed until RBG2/RBG3 verify storage, logging, authorization boundaries, mutation keys and user-safe error handling.

## 11. Accessibility Requirements (A11y)


### Canonical theme and responsive contract

The authoritative exact token inventory for this leaf is [`superadmin_analytics_reports_center_theme_contract.md`](superadmin_analytics_reports_center_theme_contract.md). Do not copy or redefine global token mappings here. The global token source (`globals.css` and Tailwind `@theme inline`) is host-owned and not included in this role ZIP, so token definition/mapping existence remains `NOT_VERIFIED_IN_SCOPE`.

Implement focus indicators, keyboard support, semantic labels, sufficient contrast, responsive collapse, and reduced-motion-safe transitions according to `WEB_FRONTEND_UI_UX_DESIGN.md` and the architecture document. Source-level findings are listed in the RBG3 checkpoint; live browser accessibility behavior remains `DEFERRED_TO_HOST_RUNTIME`.

## 12. Background Tasks & Realtime Events

_No matching implementation evidence found in the supplied sub-module. This is `NOT_VERIFIED`, not proof that the behavior is absent._

No background-task contract is inferred from a token match alone. The supplied frontend source may consume real-time host capabilities, but event lifecycle, cleanup, retry and authorization require explicit evidence before behavior changes.

## 13. Feature Flags & Tenant Settings

_No matching implementation evidence found in the supplied sub-module. This is `NOT_VERIFIED`, not proof that the behavior is absent._

If no flag source is found, that means the provided module source did not expose a flag declaration; it does not prove that the product has no host-managed flag system. Flag semantics are `NOT_VERIFIED` unless documented in the master contract or typed configuration.

## 14. Cache Invalidation & Consistency

| File | Line | Source evidence |
| --- | --- | --- |
| hooks/useSuperadminAnalyticsReportsCenterExportMutation.ts | 29 | void queryClient.invalidateQueries({ queryKey: SUPERADMIN_ANALYTICS_REPORTS_QUERY_KEYS.all }); |

RBG2 must verify each mutation’s invalidated key family, optimistic update/rollback behavior, and list/detail consistency against the existing query-key registry. No cache key was invented during RBG1.

## 15. Migration, Rollback & Edge Cases (AI Warnings)

**Frontend route ownership:** the route entry is physically owned by `superadmin_analytics/analytics_reports_center/page.tsx` and resolves to `/frontend_superadmin/superadmin_analytics/analytics_reports_center`. Alias-only page files are not duplicated. Historical compatibility redirects are not specified because the original route-preservation evidence was not included in the supplied archive; compare this physical route with the host route registry before adding a redirect. The current physical route matrix is in `INTEGRATION_GUIDE.md`. Host redirect/API collision checks remain `DEFERRED_TO_HOST_RUNTIME`.

**API/data migration:** no backend API endpoint or request/response contract was intentionally changed in this batch. No database migration evidence is included in the supplied frontend ZIP.

**Source rollback:** restore the pre-RBG1 source snapshot/previous `frontend-superadmin-v4-fix.zip` if the migration must be reverted, including the import graph and directory tree as one unit. Do not roll back only the route shims or only the moved components.

## 16. Test Coverage Map & Quality Gates

**Test files in leaf:** 9

- `tests/SuperadminAnalyticsReportsCenterBasic.test.tsx`
- `tests/components/SuperadminAnalyticsReportsCenterProgressBar.test.tsx`
- `tests/constants/SuperadminAnalyticsReportsCenterConstants.test.ts`
- `tests/hooks/useSuperadminAnalyticsReportsCenterExportMutation.test.ts`
- `tests/hooks/useSuperadminAnalyticsReportsCenterMain.test.ts`
- `tests/hooks/useSuperadminAnalyticsReportsCenterPage.test.tsx`
- `tests/mocks/reports_center_handlers/SuperadminAnalyticsReportsCenterMockHandlers.test.ts`
- `tests/utils/SuperadminAnalyticsReportsCenterDateRangeUtils.test.ts`
- `tests/utils/SuperadminAnalyticsReportsCenterFormatCurrency.test.ts`

Tests are inventoried, not asserted to pass. Vitest/RTL execution and MSW scenario coverage are assigned to RBG3; host runtime and browser E2E remain separately reported as `DEFERRED_TO_HOST_RUNTIME` where unavailable.

## 17. Architecture Exceptions (ADRs)

No `// architecture-exception:` marker was found in this leaf during this static scan. This does not approve cross-feature adapter imports; the role-shell dependency placement is tracked as `BLOCKED_BY_SUPPLIED_CONTRACT` because host infrastructure is outside the ZIP.

The role-level layout/navigation dependencies remain visible in imports because the supplied ZIP does not include the host application tier. Their placement cannot be silently changed or fabricated; the corresponding dependency finding remains `BLOCKED_BY_SUPPLIED_CONTRACT` until the authorized host contract is resolved.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log

| Finding | Severity | Known gap | Closure evidence required |
| --- | --- | --- | --- |
| SA-001 | P0 | Role/domain roots violate canonical quarantine and category-folder names | Every file has one canonical owner, root/category/depth invariant passes, and route/import checks produce zero unexplained violations. |
| SA-005 | P1 | Server-backed text searches are not debounced to the required 300 ms | All server-backed text searches in the role have a verified >=300ms debounce; local-only search remains appropriately local. |

Any endpoint, DTO field, response envelope, permission, flag or mutation behavior not evidenced in the actual URL config, API facade, Zod schema, TypeScript types, feature specification or mock fixtures must remain `NOT_VERIFIED`. The structural migration did not invent such contracts.

## 19. Rule Compliance Checklist (35+ Verification Items)

The following 35 checks describe the status at this RBG1 checkpoint. `NOT_VERIFIED` is intentionally distinct from `PASS`; the checklist must be refreshed after the later RBGs and final Section 43P gate.

| # | Control | Status | Evidence / next verification |
| --- | --- | --- | --- |
| 1 | Domain root quarantine | PASS | Root page is compatibility redirect; master trio retained. |
| 2 | Canonical leaf name | PASS | `reports_center/` is the terminal feature leaf. |
| 3 | Canonical category names | PASS | Mapped to standard category directory names in migration manifest. |
| 4 | Centralized URL config location | PASS | config/superadmin_analytics_reports_center.url_config.ts |
| 5 | Feature documentation trio present | PASS | Generated under this leaf at RBG1. |
| 6 | Ambient host stubs present | PASS | Generated from normative architecture stub contract. |
| 7 | Import paths resolve inside supplied role ZIP | PASS | RBG1 AST rewrite report: 0 unresolved internal role aliases. |
| 8 | Relative import resolution | PASS | RBG1 AST rewrite report: 0 unresolved relative imports. |
| 9 | TypeScript/TSX parser syntax | PASS | RBG1 AST parser report: 0 parser diagnostics before route shim generation; post-swap recheck pending. |
| 10 | Legacy route entry preserved | PASS | Old filesystem route has a redirect shim. |
| 11 | Query-string preservation | PASS | Root shim appends all values from typed searchParams. |
| 12 | API endpoint strings unchanged | PASS | The migration changes import/path names only; endpoint constant content was copied verbatim. |
| 13 | API envelope contract | NOT_VERIFIED | Requires source-to-normative envelope/type verification in RBG2. |
| 14 | Mutation idempotency key lifecycle | NOT_VERIFIED | Requires operation-by-operation lifecycle audit in RBG2. |
| 15 | No guessed API endpoints or fields | PASS | No endpoint or DTO fields were introduced by the structural migration. |
| 16 | Query-key registry | NOT_VERIFIED | See exact registry evidence above; invalidation semantics audited in RBG2. |
| 17 | Mutation cache invalidation | NOT_VERIFIED | Evidence captured above; semantics not yet re-audited. |
| 18 | Mutable mock state | NOT_VERIFIED | Mutable scenario behavior is audited in RBG3. |
| 19 | Unit/component test adequacy | NOT_VERIFIED | Test files inventoried; execution and assertions are deferred to RBG3/host. |
| 20 | Standalone test harness | NOT_VERIFIED | Standalone bootstrap/harness verification remains in RBG3. |
| 21 | WCAG 2.2 AA keyboard behavior | NOT_VERIFIED | Dedicated accessibility audit remains in RBG3. |
| 22 | Semantic theme tokens | NOT_VERIFIED | Token parity/forbidden-value scan remains in RBG3. |
| 23 | Dark/light theme contrast | NOT_VERIFIED | Theme contract exists; runtime contrast verification remains in RBG3/host. |
| 24 | Responsive layout breakpoints | NOT_VERIFIED | Responsive verification remains in RBG3/host. |
| 25 | Loading/empty/error/recovery states | NOT_VERIFIED | Source docs excerpt recorded; control-by-control verification remains in RBG2/RBG3. |
| 26 | Localized EN/HI parity | NOT_VERIFIED | Locale files moved; exact key parity scan is scheduled for RBG4. |
| 27 | Component line ceilings | NOT_VERIFIED | Full file ceiling scan remains in RBG4. |
| 28 | Hook/store/schema/API line ceilings | NOT_VERIFIED | Full file ceiling scan remains in RBG4. |
| 29 | Barrel-file prohibition | NOT_VERIFIED | Full no-index recheck remains in RBG4. |
| 30 | No cross-feature business imports | BLOCKED_BY_SUPPLIED_CONTRACT | Role shell and navigation adapter placement conflicts with module isolation; do not invent host infrastructure. |
| 31 | External dependency budget | NOT_VERIFIED | Dependency-edge classification remains open under SA-003. |
| 32 | Security/PII storage rules | NOT_VERIFIED | Requires RBG2/RBG3 source audit; no security posture is inferred. |
| 33 | Functional closure of interactive controls | NOT_VERIFIED | Action trace in frozen inventory will be repaired/audited in RBG2/RBG3. |
| 34 | Performance/debounce budgets | NOT_VERIFIED | Coupon/Plans/Reports debounce fixes are RBG2. |
| 35 | Feature ZIP portability 8/8 | NOT_VERIFIED | Source leaf now has categories, docs and stubs; runtime/test portability still needs RBG3 and final gate. |

## 20. Standalone Run, Mock & Test Harness

**Canonical leaf path:** `src/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/` (archive-relative path: `frontend_superadmin/superadmin_analytics/analytics_reports_center/`).

### Source-present standalone assets

| Artifact | Evidence / status |
| --- | --- |
| Vitest/RTL test source | `13` TypeScript/TSX test files are present; execution is `NOT_VERIFIED_IN_SCOPE` because the supplied archive has no host root package manifest, installed Vitest, or host TypeScript config. |
| Module-owned MSW handlers | `1` handler file(s) present in this leaf. |
| Module-owned fixtures/data | `1` fixture/data file(s) present in this leaf. |
| Harness wrapper | `tests/harness/SuperadminAnalyticsReportsCenterHarness.tsx` — local `NextIntlClientProvider` and `QueryClientProvider` wrapper. |
| Harness/bootstrap | `tests/harness/SuperadminAnalyticsReportsCenterHarnessBootstrap.ts` — registers the owning leaf's handlers and exposes start/reset/stop plus isolated QueryClient functions. |
| Scenario contract | `mocks/scenarios/superadmin_analytics_reports_center.scenarios.ts` — explicit ACTIVE, EMPTY, SERVER_500, TIMEOUT, UNAUTHORIZED response scenarios; ACTIVE/EMPTY payloads are passed from this leaf's fixtures rather than invented here. |
| Scenario regression tests | `1` focused file(s) under `tests/mocks/scenarios/`; source-authored, runner execution not verified. |
| Host stubs | `contracts/host-stubs.d.ts` is intended for isolated type compatibility only; it is not an implementation of host runtime services. |

### Endpoint and scenario selection

- **Primary configured API endpoint for the scenario harness:** `SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE` in `config/superadmin_analytics_reports_center.url_config.ts`. The API literal remains owned by the config; do not hardcode a parallel copy in production modules.
- **Test scenario query:** append `?__mockScenario=ACTIVE`, `EMPTY`, `SERVER_500`, `TIMEOUT`, or `UNAUTHORIZED` to that configured endpoint when the feature's scenario handler is installed by the test server. The scenario override is a test/mock facility and does not modify the production API URL or assume the host has enabled runtime scenario toggles.
- **Role/auth fixture:** no host credentials or verified session-claim payload was supplied. Use the host's approved Superadmin test identity; do not invent credentials or treat the API-level 401 scenario as proof of all route-guard behavior.

### Host verification commands (not executed in this environment)

```bash
npm run test -- src/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/tests
npx tsc --noEmit
npm run lint
```

These commands require the target host project root, its locked dependencies and its real alias/provider configuration. Source parser/import checks are not substitutes for a semantic host typecheck or test execution.



### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminAnalyticsReportsCenterDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide

1. **Folder transfer:** copy `src/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/` as the autonomous leaf. Keep the role-domain master docs and any compatibility route shim in the containing archive when the documented route-preservation matrix requires them; do not pull sibling feature business code into this leaf.
2. **Core contracts:** provide the verified host API transport, auth/session and permission providers, logger/error-monitoring adapter, socket/display-value adapters where used, zero-business UI primitives, `next-intl` messages/provider, Tailwind semantic token mapping, and TanStack Query provider. `contracts/host-stubs.d.ts` is type-only and must not be mistaken for runtime implementations.
3. **Route and URL configuration:** preserve `config/superadmin_analytics_reports_center.url_config.ts` and the exported `SUPERADMIN_ANALYTICS_REPORTS_CENTER_API` contract exactly. Confirm the host's route prefix and rewrite behavior against the route-preservation matrix; endpoint literals must not be rewritten by inference.
4. **Verification and mocks:** run the leaf tests, the focused mock scenario regression file, `npx tsc --noEmit`, lint and the owning Playwright E2E suite in the actual host. Confirm mutable fixture reset between tests and inspect all five scenario outcomes. Authenticated browser checks remain `DEFERRED_TO_HOST_RUNTIME` until a host base URL, approved storage state and browser runner exist.



### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/SearchableDropdown |
| @/components/ui/ChartConstants |
| @/lib/logger |
| @/hooks/useUrlState |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)

**Current version:** `v12 partial` (combined RBG-01–03 repair checkpoint, 2026-10-30). **Commit:** `not produced in this source-only environment`. Earlier RBG1/RBG4 entries are historical records, not the current version label.

**Portability score:** `NOT_YET_VERIFIED`; target required by the normative architecture is **8/8** before final delivery. The following criteria must be evidenced at the final gate:

| Criterion | Current status |
| --- | --- |
| ZIP self-sufficiency and standalone compilation | `NOT_VERIFIED_IN_SCOPE` — host package manifest, root tsconfig and installed dependencies are not supplied. |
| Zero cross-module business imports | `BLOCKED_BY_SUPPLIED_CONTRACT` where the route/navigation/role-shell adapter boundary remains unresolved; see the dependency and route matrices. |
| Mock parity and scenario completeness | `SOURCE_ADDED; EXECUTION_NOT_VERIFIED` — fixture-backed ACTIVE/EMPTY plus SERVER_500, TIMEOUT and UNAUTHORIZED scenario handlers and tests are present; Vitest is unavailable here. |
| Standalone harness/bootstrap | `SOURCE_ADDED; EXECUTION_NOT_VERIFIED` — provider harness and module-owned MSW lifecycle bootstrap are present. |
| Theme-token integrity | `STATIC_SCAN_CLEAN_FOR_RAW_COLORS_AND_SEMANTIC_OPACITY`; host `globals.css` / `@theme inline` mapping remains `NOT_VERIFIED_IN_SCOPE`. |
| Loading/empty/error states and recovery | `SOURCE_AUDITED; HOST_VISUAL_VERIFICATION_DEFERRED` — verify each state and recovery interaction in host runtime. |
| Mutation idempotency and duplicate-action safety | `67/67` scoped state-changing call sites had `Idempotency-Key`; duplicate-action behavior still requires feature/host execution evidence. |
| Responsive breakpoints and no horizontal overflow | `DEFERRED_TO_HOST_RUNTIME` — static class inspection does not prove no overflow at required viewport widths. |


### Revision history

| Version/Batch | Date | Author | Change | Verification |
|---|---|---|---|---|
| RBG4 | 2026-10-23 | AI repair | Moved feature-owned constants/query-key/filter configuration into canonical leaf `config/`; normalized three debounce hook and test filenames; refreshed source dependency/state comments and version references. | Static path/import parse and source scans are clean; host typecheck, unit tests and browser runtime remain deferred. |
| RBG3 | 2026-10-23 | AI repair | Added module-local harness/bootstrap, fixture-backed five-scenario handlers/tests, accessibility/touch-target fixes and refreshed host-verification guidance. | Source parsing and static checks clean; runtime execution not verified. |
| RBG2 | 2026-10-23 | AI repair | Added server-search debounce, canonical URL config exports/placement, API envelope generic corrections, and localized feature-rollout error feedback. | Static source/import checks clean; host tests/runtime not verified. |
| RBG1 | 2026-10-23 | AI repair | Created autonomous leaf documentation trio, host stubs, preserved route compatibility shims and corrected local mock paths. | Structural/static checks clean for verified scope; Gym/System Ops route/ownership exceptions remain blocked by supplied contract. |

### Retained parent contract sections for detailed business context

The domain-level master documents remain authoritative for long-form user flows, existing API narratives, business edge cases, and module-specific constraints. The exact source excerpts incorporated above are from `superadmin_analytics_reports_features.md`; consult that master file before making changes where this leaf contract identifies a gap.


### RBG-04 local boundary isolation (v14)
Feature-local route suspense skeletons, error UI boundaries and Next.js error prop contracts are owned in this leaf rather than imported from `platform_shell_layout`. The root role layout remains responsible for global provider composition. New user-facing messages are stored in this leaf’s EN/HI locale files.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

