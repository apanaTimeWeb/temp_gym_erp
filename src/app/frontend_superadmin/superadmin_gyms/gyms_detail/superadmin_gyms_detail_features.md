---
feature: "superadmin_gyms_detail"
owner_role: "superadmin"
module_version: 18
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-28"
last_verified_commit: "host-unavailable"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_VERIFIED"
role: superadmin
domain: superadmin_gyms
submodule: gyms_detail
status: ACTIVE_SOURCE_GROUPING_VERIFIED
version: 18
---

# Superadmin Gyms Detail — Feature Map

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Directly refreshable per-gym business overview and authorized impersonation entry/exit actions for that resource. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map
Source leaf: `frontend_superadmin/superadmin_gyms/gyms_detail/`. Detail UI, skeletons, actions, query hooks and tests live under local canonical folders. Next.js route entries are now owned by the canonical `frontend_superadmin/superadmin_gyms/` module and its `gyms_directory/` and `gyms_detail/[id]/` leaves.


### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminGymsDetailBranchesSection.tsx | Renders/orchestrates SuperadminGymsGymDetailBranchesSection within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDetailErrorBoundary.tsx | Feature-local recoverable render error boundary for gyms_detail. |
| components/SuperadminGymsDetailLifecycleSection.tsx | Renders/orchestrates SuperadminGymsGymDetailLifecycleSection within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDetailMain.tsx | Renders and orchestrates SuperadminGymsGymDetailView for the owning Superadmin feature module; presentation stays free of direct API calls. |
| components/SuperadminGymsDetailOverviewSection.tsx | Renders/orchestrates SuperadminGymsGymDetailOverviewSection within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDetailPageSuspenseSkeleton.tsx | Feature-local route loading skeleton for gyms_detail, with no sibling-module dependencies. |
| components/SuperadminGymsDetailRow.tsx | Renders/orchestrates SuperadminGymsGymDetailRow within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDetailSkeleton.tsx | Renders/orchestrates SuperadminGymsGymDetailSkeleton within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDetailWhiteLabelSection.tsx | Renders/orchestrates SuperadminGymsGymDetailWhiteLabelSection within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows
`Gyms` is the single primary domain. Detail is a secondary/deep-linkable destination under the Gym domain, not a separate top-level sidebar domain. The existing `/[id]` route entry and query aliases are preserved as route-only facades; category source paths are not URL paths.

## 4. API Contract & UI Data Requirements
Detail-specific API clients are local in `api/superadmin_gyms_detail.api.ts` and `api/superadmin_gyms_detail_business_overview.api.ts`. Endpoint strings and payload shapes are defined by source/config; do not infer undocumented response fields. Directory/onboarding APIs remain local to `../gyms_directory/api/` and must not be imported into this leaf.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_gyms_detail.api.ts:7 | POST | SUPERADMIN_GYMS_MANAGEMENT_API.IMPERSONATE_GYM(gymId) | Present |
| api/superadmin_gyms_detail.api.ts:11 | POST | SUPERADMIN_GYMS_MANAGEMENT_API.GHOST_LOGIN.SET_COOKIE_PROXY | Present |
| api/superadmin_gyms_detail.api.ts:15 | POST | SUPERADMIN_GYMS_MANAGEMENT_API.GHOST_LOGIN.EXIT_GHOST_LOGIN_PROXY | Present |
| api/superadmin_gyms_detail_business_overview.api.ts:10 | GET | SUPERADMIN_GYMS_MANAGEMENT_API.GYM_DETAIL.BACKEND_API.BY_GYM(gymId) | Present |

Response types: `types/superadmin_gyms_detail.types.ts`, `types/superadmin_gyms_detail_ghost_login.types.ts`, `types/superadmin_gyms_detail_lifecycle_section.types.ts`, `types/superadmin_gyms_detail_main.types.ts`, `types/superadmin_gyms_detail_overview_section.types.ts`, `types/superadmin_gyms_detail_page.types.ts`, `types/superadmin_gyms_detail_row.types.ts`, `types/superadmin_gyms_detail_white_label_section.types.ts`.

Validation schemas: `schemas/superadmin_gyms_detail_contract.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 37 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State
Detail query keys are declared in `api/superadmin_gyms_detail.query_keys.ts`. Preserve existing cache identity and detail-query invalidation behavior.

## 6. Mutation Inventory & Lifecycle Operations
Existing detail actions, ghost-login/session exit flows and lifecycle controls remain implemented by local hooks/API clients. This physical reorganization does not alter their business semantics, confirmation requirements or server interaction.

## 7. Permissions and Role Rules
Keep Superadmin session/role gates and backend authorization authoritative. The physical move does not broaden access to tenant detail, impersonation, or member data.

## 8. State Ownership & Architecture Flow
Detail server state/query keys are owned by this leaf's query hooks. Ghost Login UI state is transient and stores only the tenant identifier in an in-memory feature store; it does not persist tenant/contact objects to browser storage. Never import or persist business state from the Directory leaf. No host-shell consumer of client-side tenant context is present in this role bundle; any cross-navigation presentation contract remains `NOT_VERIFIED`.

## 9. Offline, Loading, Empty, and Error States
Preserve existing detail skeleton/error/retry/empty states and action feedback. Actual offline/reconnect handling must be verified using the host runtime and remains `DEFERRED_TO_HOST_RUNTIME`.

## 10. Security and PII Rules (Data Masking & Guards)
Keep tenant details, contact data and impersonation tokens behind existing authorization and masking controls. Tenant/contact objects and tokens are not persisted in browser storage or telemetry. The Ghost Login store holds only a transient tenant identifier; backend/API authorization remains authoritative.

## 11. Accessibility Requirements (A11y)
Preserve semantic detail sections, row labels, keyboard operability, focus visibility and modal focus management. Browser accessibility testing is `DEFERRED_TO_HOST_RUNTIME`.

## 12. Background Tasks & Realtime Events
No new background task behavior is introduced by physical grouping. Existing tenant lifecycle requests remain unchanged.

## 13. Feature Flags & Tenant Settings
Do not add or infer flags. Preserve feature gating that already exists in the leaf source.

## 14. Cache Invalidation & Consistency
Detail mutations must use the existing query keys and invalidation/reconciliation behavior in this leaf. No query-key values were intentionally changed.

## 15. Migration, Rollback & Edge Cases (AI Warnings)
Detail implementation is now physically owned by this leaf. The old `gyms_management` implementation folder is not an active implementation owner; legacy `[id]` URLs require the constrained host redirect documented in `INTEGRATION_GUIDE.md`; the route page now lives at `frontend_superadmin/superadmin_gyms/gyms_detail/[id]/page.tsx`. Rollback means restore source/import paths from the manifest without changing backend contracts.

## 16. Test Coverage Map & Quality Gates
Detail API/contract/mock/hook/session tests live under local `tests/`; fixtures/handlers live under `mocks/`. Static checks pass for import resolution and leaf separation; actual Vitest execution is `DEFERRED_TO_HOST_RUNTIME`.

## 17. Architecture Exceptions (ADRs)
The canonical physical layout places `superadmin_gyms/` directly under `frontend_superadmin/`, with `gyms_directory/` and `gyms_detail/` as peer terminal leaves. Artificial category parents and nested feature-bearing modules are forbidden.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log
Host public URL rewrites/middleware and backend-authoritative detail/status contracts are not included. Mark these `NOT_VERIFIED`; do not guess.

## 19. Rule Compliance Checklist (35+ Verification Items)
- [x] Detail implementation, API, hooks, schemas/types, mocks, tests, URL config, host stubs and docs are local.
- [x] Detail has no sibling Directory business imports in the static import graph.
- [x] Route-entry files are physically owned by this module; old aliases are documented in the host compatibility redirect matrix.
- [ ] Host semantic typecheck, Vitest and browser route execution: `DEFERRED_TO_HOST_RUNTIME`.

## 20. Standalone Run, Mock & Test Harness
The local `tests/` folder includes the leaf's harness and tests using leaf-owned mock fixtures/handlers. Use the host's declared runner; no test pass is claimed without execution.


### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminGymsDetailDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide
The leaf includes `contracts/host-stubs.d.ts` and local implementation contracts. A later full dependency-isolation pass is still required; the RBG-1 path resolver tracks cross-leaf imports separately and does not certify them as zero. Semantic standalone compilation and live routing remain `DEFERRED_TO_HOST_RUNTIME` because host configuration is absent.


### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/logger |
| @/lib/api |
| @/lib/display_value |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)
Version 3 removes sessionStorage persistence of the Ghost Login tenant object and the cross-leaf shared storage key. The in-memory store now holds only the tenant identifier; the existing impersonation → cookie → navigation sequence remains unchanged. The host-shell cross-navigation presentation contract remains `NOT_VERIFIED` because no consumer is present in this role bundle. Version 2 records completion of physical source ownership under `gyms_detail/`, with leaf-local API/config/docs. Compatibility aliases are handled only by the host redirect matrix; host integration remains unverified. No API or permission contract was changed.


### RBG-04 local boundary isolation (v14)
Feature-local route suspense skeletons, error UI boundaries and Next.js error prop contracts are owned in this leaf rather than imported from `platform_shell_layout`. The root role layout remains responsible for global provider composition. New user-facing messages are stored in this leaf’s EN/HI locale files.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

