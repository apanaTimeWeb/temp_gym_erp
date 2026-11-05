---
feature: "superadmin_gyms_directory"
owner_role: "superadmin"
module_version: 18
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-30"
last_verified_commit: "host-unavailable"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_VERIFIED"
role: superadmin
domain: superadmin_gyms
submodule: gyms_directory
status: ACTIVE_SOURCE_GROUPING_VERIFIED
version: 18
---

# Superadmin Gyms Directory — Feature Map

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Tenant gym search, filters, onboarding, editing, status changes and confirmed deletion; the tenant resource is the shared lifecycle, and edit/onboard modals are internal views. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map
Source leaf: `frontend_superadmin/superadmin_gyms/gyms_directory/`. Relevant screens and flows are implemented by local components in `components/`. Next.js route entries are separate under `frontend_superadmin/superadmin_gyms/`; category names never enter public URLs.


### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminGymsDirectoryAddGymForm.tsx | Renders/orchestrates SuperadminGymsAddGymForm within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDirectoryCalendar.tsx | Renders/orchestrates SuperadminGymsCalendar within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDirectoryEmptyState.tsx | Renders/orchestrates SuperadminGymsEmptyState within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDirectoryErrorBoundary.tsx | Feature-local recoverable render error boundary for gyms_directory. |
| components/SuperadminGymsDirectoryGymDeleteModal.tsx | Renders/orchestrates SuperadminGymsGymDeleteModal within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDirectoryGymEditModal.tsx | Renders/orchestrates SuperadminGymsGymEditModal within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDirectoryGymWhatsappModal.tsx | Renders/orchestrates SuperadminGymsGymWhatsappModal within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDirectoryMain.tsx | Renders and orchestrates SuperadminGymsMain for the owning Superadmin feature module; presentation stays free of direct API calls. |
| components/SuperadminGymsDirectoryPageSuspenseSkeleton.tsx | Feature-local route loading skeleton for gyms_directory, with no sibling-module dependencies. |
| components/SuperadminGymsDirectoryRouteView.tsx | Keeps the legacy query route, but transfers detail ownership to the canonical [id] route. |
| components/SuperadminGymsDirectoryTable.tsx | Renders/orchestrates SuperadminGymsTable within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDirectoryTableSortIcon.tsx | Renders/orchestrates SuperadminGymsTableSortIcon within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminGymsDirectoryToolbar.tsx | Renders/orchestrates SuperadminGymsToolbar within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows
`Gyms` is one primary domain. Directory and Detail are secondary destinations under `superadmin_gyms/`. Original `/superadmin/gyms` public URLs remain host-owned compatibility contracts; the supplied ZIP does not include the host rewrite configuration. Internal feature navigation now uses the canonical directory/detail pages. No new public route or backend endpoint is inferred from the physical source folder.

## 4. API Contract & UI Data Requirements
Directory-facing API clients are local in `api/superadmin_gyms_directory.api.ts` and `api/superadmin_gyms_directory_business_controls.api.ts`; all endpoint strings and payload contracts are read from those source files and the leaf's URL config. Do not invent undocumented API fields/endpoints. Detail APIs are local to `../gyms_detail/api/` and must not be imported by this leaf.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_gyms_directory.api.ts:20 | GET | `${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}${query}` | Present |
| api/superadmin_gyms_directory.api.ts:22 | GET | SUPERADMIN_GYMS_MANAGEMENT_API.BY_ID(gymId) | Present |
| api/superadmin_gyms_directory.api.ts:23 | GET | SUPERADMIN_GYMS_MANAGEMENT_API.SUBSCRIPTION_PLANS | Present |
| api/superadmin_gyms_directory.api.ts:24 | GET | SUPERADMIN_GYMS_MANAGEMENT_API.STATS | Present |
| api/superadmin_gyms_directory.api.ts:25 | POST | SUPERADMIN_GYMS_MANAGEMENT_API.BASE | Present |
| api/superadmin_gyms_directory.api.ts:28 | PATCH | SUPERADMIN_GYMS_MANAGEMENT_API.BY_ID(gymId) | Present |
| api/superadmin_gyms_directory.api.ts:31 | PATCH | SUPERADMIN_GYMS_MANAGEMENT_API.STATUS(gymId) | Present |
| api/superadmin_gyms_directory.api.ts:34 | POST | SUPERADMIN_GYMS_MANAGEMENT_API.IMPERSONATE_GYM(gymId) | Present |
| api/superadmin_gyms_directory.api.ts:37 | DELETE | SUPERADMIN_GYMS_MANAGEMENT_API.BY_ID(gymId) | Present |
| api/superadmin_gyms_directory.api.ts:40 | POST | SUPERADMIN_GYMS_MANAGEMENT_API.EMAIL_OWNER(gymId) | Present |
| api/superadmin_gyms_directory.api.ts:45 | GET | `${SUPERADMIN_GYMS_MANAGEMENT_API.EXPORT}${query}` | Present |
| api/superadmin_gyms_directory.api.ts:47 | POST | SUPERADMIN_GYMS_MANAGEMENT_API.PROVISION | Present |
| api/superadmin_gyms_directory.api.ts:50 | POST | SUPERADMIN_GYMS_MANAGEMENT_API.GHOST_LOGIN.EXIT_GHOST_LOGIN_PROXY | Present |
| api/superadmin_gyms_directory.api.ts:53 | POST | SUPERADMIN_GYMS_MANAGEMENT_API.GHOST_LOGIN.SET_COOKIE_PROXY | Present |
| api/superadmin_gyms_directory_business_controls.api.ts:12 | GET | `${SUPERADMIN_GYMS_MANAGEMENT_API.BUSINESS_CONTROLS.BACKEND_API.BASE}${query}` | Present |
| api/superadmin_gyms_directory_business_controls.api.ts:20 | POST | SUPERADMIN_GYMS_MANAGEMENT_API.BUSINESS_CONTROLS.BACKEND_API.BASE | Present |

Response types: `types/superadmin_gyms_directory.types.ts`, `types/superadmin_gyms_directory_ghost_login.types.ts`, `types/superadmin_gyms_directory_plan.types.ts`, `types/superadmin_gyms_directory_store.types.ts`, `types/superadmin_gyms_directory_table.types.ts`, `types/superadmin_gyms_directory_table_sort_icon.types.ts`, `types/superadmin_gyms_directory_v1.types.ts`.

Validation schemas: `schemas/superadmin_gyms_directory.schemas.ts`, `schemas/superadmin_gyms_directory_aliases.schemas.ts`, `schemas/superadmin_gyms_directory_api.schemas.ts`, `schemas/superadmin_gyms_directory_contract.schemas.ts`, `schemas/superadmin_gyms_directory_plan_contract.schemas.ts`, `schemas/superadmin_gyms_directory_v1_contract.schemas.ts`, `schemas/superadmin_gyms_directory_validation.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 122 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State
Directory query keys are declared in `api/superadmin_gyms_directory.query_keys.ts`. Preserve key names/cache identity and invalidation semantics; route and folder restructuring must not silently change them.

## 6. Mutation Inventory & Lifecycle Operations
Existing directory/onboarding mutation handlers remain in local hooks/API clients. Preserve current create/update/status/delete/bulk/export/owner-contact and impersonation workflows as evidenced by source; no business behavior change is intended by physical grouping.

## 7. Permissions and Role Rules
This is a Superadmin tenant-management capability. Keep existing session/role gates and backend authorization as authoritative. The physical folder move does not grant permissions or change any tenant boundary.

## 8. State Ownership & Architecture Flow
Server state uses the existing TanStack Query hooks/query keys owned by this leaf. Ghost Login UI state is transient and stores only the tenant identifier in an in-memory feature store; it does not persist or retain tenant/contact objects. Do not write business entities to browser storage. No host-shell consumer of client-side tenant context is present in this role bundle; any cross-navigation shell presentation contract remains `NOT_VERIFIED`.

## 9. Offline, Loading, Empty, and Error States
Preserve existing loading/error/retry/empty and mutation feedback paths implemented in the leaf. Runtime offline behavior requires the host runtime and is `DEFERRED_TO_HOST_RUNTIME` until exercised there.

## 10. Security and PII Rules (Data Masking & Guards)
Keep owner contact and tenant fields under existing masking, validation, permissions and server authorization rules. The Ghost Login state store retains only a transient tenant identifier; tenant payloads and contact fields are not persisted to `localStorage` or `sessionStorage`, and secrets are not exposed through telemetry.

## 11. Accessibility Requirements (A11y)
Preserve labels, semantic table markup, keyboard row/action navigation, dialog focus handling, visible focus and WCAG 2.2 AA behavior from the existing components. Browser axe/keyboard verification remains `DEFERRED_TO_HOST_RUNTIME`.

## 12. Background Tasks & Realtime Events
No new background task behavior is introduced by physical grouping. Existing export/onboarding request semantics must remain as implemented.

## 13. Feature Flags & Tenant Settings
Do not add or infer feature flags. Retain any existing flags/conditions evidenced in the leaf.

## 14. Cache Invalidation & Consistency
Mutation hooks must preserve the existing query invalidation/reconciliation behavior for directory query keys. No query key values were intentionally changed by the grouping work.

## 15. Migration, Rollback & Edge Cases (AI Warnings)
Directory implementation is now physically owned by this leaf. The old `gyms_management` implementation folder is not an active implementation owner; legacy route names are removed from this module tree and must be handled only through the host redirect matrix; no duplicate page implementation remains. Rollback means restoring source paths/imports from the manifest, not changing API contracts.

## 16. Test Coverage Map & Quality Gates
Local tests and harnesses live under `tests/`; MSW fixtures/handlers and scenarios live under `mocks/`. Static source checks passed, but Vitest execution requires the host's actual package manifest and test environment and remains `DEFERRED_TO_HOST_RUNTIME`.

## 17. Architecture Exceptions (ADRs)
The canonical physical layout places `superadmin_gyms/` directly under `frontend_superadmin/`, with `gyms_directory/` and `gyms_detail/` as peer terminal leaves. No artificial category parent or nested feature-bearing module is permitted.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log
The host's public URL rewrite/middleware configuration and backend-authoritative Gym status vocabulary are not included in this role-only bundle; these remain `NOT_VERIFIED`. Do not infer them from the physical directory layout.

## 19. Rule Compliance Checklist (35+ Verification Items)
- [x] Directory source has local components, hooks, API, state, types, schemas, mocks, tests, URL config, host stubs and documentation trio.
- [x] Directory does not import sibling Detail business code in the static import graph.
- [x] Canonical route entries are physically owned by this module; public and prior internal aliases are documented in the host compatibility redirect matrix.
- [ ] Host semantic typecheck, Vitest and runtime URL execution: `DEFERRED_TO_HOST_RUNTIME`.

## 20. Standalone Run, Mock & Test Harness
The local `tests/` harness bootstraps the leaf's components and mocks. Run via the host's declared Vitest/React Testing Library commands after installing into the host project. Do not report test success without execution.


### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminGymsDirectoryDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide
The source leaf is physically self-contained for business code and includes `contracts/host-stubs.d.ts`. Its imports are statically resolved with zero cross-leaf business imports. Standalone semantic compile/test remains `DEFERRED_TO_HOST_RUNTIME` because host compiler/dependency configuration is not bundled.


### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/SearchableDropdown |
| @/lib/formatters |
| @/components/ui/CopyButton |
| @/components/ui/Pagination |
| @/lib/logger |
| @/components/ui/Feedback/ConfirmProvider |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)
Version 3 removes sessionStorage persistence of the Ghost Login tenant object and the cross-leaf shared storage key. The in-memory store now holds only the tenant identifier; the existing impersonation → cookie → navigation sequence remains unchanged. The host-shell cross-navigation presentation contract remains `NOT_VERIFIED` because no consumer is present in this role bundle. Version 2 records completion of physical source ownership under `gyms_directory/`, the local URL config and docs, and a route owner split preserving existing paths.


### RBG-04 local boundary isolation (v14)
Feature-local route suspense skeletons, error UI boundaries and Next.js error prop contracts are owned in this leaf rather than imported from `platform_shell_layout`. The root role layout remains responsible for global provider composition. New user-facing messages are stored in this leaf’s EN/HI locale files.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

