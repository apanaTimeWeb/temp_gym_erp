---
role: superadmin
domain: superadmin_system_ops
submodule: system_ops_overview
status: ACTIVE_SOURCE_GROUPING_VERIFIED
version: 18
feature: "superadmin_system_ops_overview"
owner_role: "superadmin"
module_version: 18
api_contract_source: "supplied Superadmin web ZIP; host API contract source unavailable"
last_verified_date: "2026-10-30"
last_verified_commit: "host-unavailable"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_VERIFIED (host integration unavailable; target 8/8 pending)"
---

# Superadmin System Ops Overview — Feature Map

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Read-only system operational health snapshot and links to independent operational workspaces. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map
Canonical route entries live at `frontend_superadmin/superadmin_system_ops/system_ops_overview/page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx`; the default leaf now owns its complete route-segment boundary set. The domain-root route retains only its canonical redirect, layout, documentation trio, and child leaves.


### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminSystemOpsOverview.tsx | Renders/orchestrates SuperadminSystemOpsOverview within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsOverviewErrorBoundary.tsx | Feature-local recoverable render error boundary for system_ops_overview. |
| components/SuperadminSystemOpsOverviewMain.tsx | Preserves legacy ?view= entry points but redirects leaf screens to their autonomous routes. |
| components/SuperadminSystemOpsOverviewPageSuspenseSkeleton.tsx | Feature-local route loading skeleton for system_ops_overview, with no sibling-module dependencies. |
| components/SuperadminSystemOpsOverviewSkeleton.tsx | Renders/orchestrates SuperadminSystemOpsOverviewSkeleton within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows
Overview is the default System Ops screen and links to Infrastructure (now an autonomous sibling submodule with a backward-compatible query redirect), Jobs, Backups and Migrations. Infrastructure is no longer an internal view in this leaf; its historic physical route redirects here rather than introducing a fifth leaf.

## 4. API Contract & UI Data Requirements
Observed summary endpoint: `GET /superadmin/system-ops/summary`. The leaf locally owns `schemas/SuperadminSystemOpsOverviewTypesSchemas.ts`, `types/SuperadminSystemOpsOverviewStatusTypes.ts` and `api/superadmin_system_ops_overview.api.ts`. Endpoint `/superadmin/system-ops/summary` and its response field contract are preserved.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_system_ops_overview.api.ts:21 | GET | SUPERADMIN_SYSTEM_OPS_API.SUMMARY | Present |
| api/superadmin_system_ops_overview_api_fetch.api.ts:11 | GET | url | See API wrapper validation |

Response types: `types/superadmin_system_ops_overview.types.ts`, `types/superadmin_system_ops_overview_next_error_props.types.ts`, `types/superadmin_system_ops_overview_status.types.ts`.

Validation schemas: `schemas/superadmin_system_ops_overview_api_response.schema.ts`, `schemas/superadmin_system_ops_overview_types.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 3 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State
Local key registry: `api/superadmin_system_ops_overview.query_keys.ts`, export `SUPERADMIN_SYSTEM_OPS_OVERVIEW_QUERY_KEYS`. Summary cache identity remains `['superadmin_system_ops', 'system-ops', 'summary']`.

## 6. Mutation Inventory & Lifecycle Operations
No mutations are owned by Overview. Cards navigate to destination routes only.

## 7. Permissions and Role Rules
Superadmin role scope. No new permission checks or backend authorization semantics were introduced. Host/backend enforcement remains authoritative.

## 8. State Ownership & Architecture Flow
The `useSuperadminSystemOpsOverviewSummary` hook owns TanStack Query server state. No Zustand store was added for server data.

## 9. Offline, Loading, Empty, and Error States
Pending summary uses the overview skeleton; query failure renders the existing alert and retry action. Host-level offline integration is not verified in the supplied ZIP.

## 10. Security and PII Rules (Data Masking & Guards)
The overview displays aggregate health/status counts and does not add secrets or direct tenant PII. Do not persist business entities in browser storage.

## 11. Accessibility Requirements (A11y)
Existing links and retry action retain semantic HTML, accessible names, focus rings, and keyboard operation. Final axe/browser verification is host-runtime deferred.

## 12. Background Tasks & Realtime Events
None. Overview reads the summary only; job execution/scheduling belongs to Jobs.

## 13. Feature Flags & Tenant Settings
No new feature flags or entitlement gates were introduced.

## 14. Cache Invalidation & Consistency
Overview is read-only in this slice. Existing cache keys remain unchanged in value; no invalidation behavior was changed.

## 15. Migration, Rollback & Edge Cases (AI Warnings)
The canonical Overview route renders the leaf-owned summary screen directly. The legacy module-root remains a compatibility entry. Route aliases can be rolled back without API/backend changes.

## 16. Test Coverage Map & Quality Gates
Moved tests: `tests/SuperadminSystemOpsOverview.test.tsx` and `tests/useSuperadminSystemOpsOverviewSummary.test.tsx`. They preserve the prior loading/error/retry/success expectations; execution is deferred without the host test runner.

## 17. Architecture Exceptions (ADRs)
The summary type/schema, query keys, API client, mocks, tests and URL config are local to this leaf. The role navigation registry is route-path-only; it is not a shared business contract.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log
The supplied ZIP excludes host app/package configuration; integrated Next route rewrite and runtime behavior remain `NOT_VERIFIED`. Static import graph confirms no sibling-leaf business import.

## 19. Rule Compliance Checklist (35+ Verification Items)
- [x] Overview view, dedicated hook/API/query keys, constants/type, skeleton and direct tests moved into the target leaf.
- [x] Existing summary endpoint, response schema and query-key value preserved.
- [x] Legacy route remains available.
- [x] Leaf-local API, schema/type, query key, mocks, tests, URL config and host-stub boundary verified statically.
- [ ] Host semantic typecheck and live route behavior: `DEFERRED_TO_HOST_RUNTIME`.

## 20. Standalone Run, Mock & Test Harness
Tests are located in the leaf. They require the host Vitest, React Testing Library, TanStack Query and the approved external host declarations.


### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminSystemOpsOverviewDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide
The leaf owns its summary contracts and URL config. Host-specific imports remain governed by `contracts/host-stubs.d.ts`; standalone semantic compilation remains `DEFERRED_TO_HOST_RUNTIME` without the host compiler/dependency manifest.


### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/Tooltip |
| @/lib/logger |
| @/components/ui/Feedback/ConfirmProvider |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)
Historical RBG 4 migration note: the overview presentation/data-loading slice and leaf boundary were moved into this leaf. v12 RBG-01 moved the three domain-root `error.tsx`, `loading.tsx`, and `not-found.tsx` boundaries into this default overview leaf to restore domain-root quarantine; the root redirect and existing boundary behavior are preserved.


### v13 infrastructure split reconciliation
- System Ops Overview now serves summary and legacy navigation redirects only.
- Infrastructure owns its separate API contracts, Redis mutations, local mocks, tests, docs and route.
- Old `?view=infrastructure` is redirected to its canonical sibling route.


### RBG-04 local boundary isolation (v14)
Feature-local route suspense skeletons, error UI boundaries and Next.js error prop contracts are owned in this leaf rather than imported from `platform_shell_layout`. The root role layout remains responsible for global provider composition. New user-facing messages are stored in this leaf’s EN/HI locale files.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

