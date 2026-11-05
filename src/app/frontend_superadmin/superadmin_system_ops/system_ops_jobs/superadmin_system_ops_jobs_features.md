---
role: superadmin
domain: superadmin_system_ops
submodule: system_ops_jobs
status: ACTIVE_SOURCE_GROUPING_VERIFIED
version: 18
feature: "superadmin_system_ops_jobs"
owner_role: "superadmin"
module_version: 18
api_contract_source: "supplied Superadmin web ZIP; host API contract source unavailable"
last_verified_date: "2026-10-28"
last_verified_commit: "host-unavailable"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_VERIFIED (host integration unavailable; target 8/8 pending)"
---

# Superadmin System Ops Jobs — Feature Map

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Background-job list, filters, inspection, selection and confirmed retry/cancel/delete/bulk actions for the queue-job lifecycle. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map
Canonical route entry: `frontend_superadmin/superadmin_system_ops/system_ops_jobs/page.tsx`; feature implementation: `frontend_superadmin/superadmin_system_ops/system_ops_jobs/`. The canonical route renders the leaf-owned view directly.


### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminSystemOpsJobsEmptyState.tsx | Renders/orchestrates SuperadminSystemOpsJobsEmptyState within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsJobsErrorBoundary.tsx | Feature-local recoverable render error boundary for system_ops_jobs. |
| components/SuperadminSystemOpsJobsHeader.tsx | Renders/orchestrates SuperadminSystemOpsJobsHeader within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsJobsJobInspectModal.tsx | Renders/orchestrates SuperadminSystemOpsJobsJobInspectModal within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsJobsMain.tsx | Renders/orchestrates SuperadminSystemOpsJobsMain within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsJobsPageSuspenseSkeleton.tsx | Feature-local route loading skeleton for system_ops_jobs, with no sibling-module dependencies. |
| components/SuperadminSystemOpsJobsStatsBar.tsx | Renders/orchestrates SuperadminSystemOpsJobsStatsBar within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsJobsTable.tsx | Renders/orchestrates SuperadminSystemOpsJobsTable within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows
Overview links use the canonical leaf route. The old `?view=jobs` entry and prior physical route remain as compatibility facades redirecting to the canonical leaf.

## 4. API Contract & UI Data Requirements
Observed jobs API base is `/superadmin/system-ops/jobs`. Existing constants include retry-all, lookup-by-id, retry, cancel, clear-completed, bulk-retry, bulk-delete and queue-health routes. This grouping RBG changes none of them.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_system_ops_jobs.api.ts:25 | GET | `${SUPERADMIN_SYSTEM_OPS_JOBS_API.BASE}${query}` | Present |
| api/superadmin_system_ops_jobs.api.ts:29 | POST | SUPERADMIN_SYSTEM_OPS_JOBS_API.RETRY_ALL | Present |
| api/superadmin_system_ops_jobs.api.ts:34 | POST | SUPERADMIN_SYSTEM_OPS_JOBS_API.RETRY_JOB(id) | Present |
| api/superadmin_system_ops_jobs.api.ts:39 | POST | SUPERADMIN_SYSTEM_OPS_JOBS_API.CANCEL_JOB(id) | Present |
| api/superadmin_system_ops_jobs.api.ts:44 | DELETE | SUPERADMIN_SYSTEM_OPS_JOBS_API.JOB_BY_ID(id) | Present |
| api/superadmin_system_ops_jobs.api.ts:49 | POST | SUPERADMIN_SYSTEM_OPS_JOBS_API.CLEAR_COMPLETED | Present |
| api/superadmin_system_ops_jobs.api.ts:54 | POST | SUPERADMIN_SYSTEM_OPS_JOBS_API.BULK_RETRY | Present |
| api/superadmin_system_ops_jobs.api.ts:60 | POST | SUPERADMIN_SYSTEM_OPS_JOBS_API.BULK_DELETE | Present |
| api/superadmin_system_ops_jobs_api_fetch.api.ts:11 | GET | url | See API wrapper validation |
| api/superadmin_system_ops_jobs_queue_health.api.ts:13 | GET | SUPERADMIN_SYSTEM_OPS_JOBS_QUEUE_HEALTH.BACKEND_API.BASE | Present |

Response types: `types/superadmin_system_ops_jobs.types.ts`, `types/superadmin_system_ops_jobs_count.types.ts`, `types/superadmin_system_ops_jobs_empty_state.types.ts`, `types/superadmin_system_ops_jobs_header.types.ts`, `types/superadmin_system_ops_jobs_job_inspect_modal.types.ts`, `types/superadmin_system_ops_jobs_mutation.types.ts`, `types/superadmin_system_ops_jobs_next_error_props.types.ts`, `types/superadmin_system_ops_jobs_page.types.ts`, `types/superadmin_system_ops_jobs_stats_bar.types.ts`, `types/superadmin_system_ops_jobs_table.types.ts`, `types/superadmin_system_ops_jobs_v1.types.ts`.

Validation schemas: `schemas/superadmin_system_ops_jobs.schemas.ts`, `schemas/superadmin_system_ops_jobs_api.schemas.ts`, `schemas/superadmin_system_ops_jobs_api_response.schema.ts`, `schemas/superadmin_system_ops_jobs_count.schemas.ts`, `schemas/superadmin_system_ops_jobs_v1.schemas.ts`, `schemas/superadmin_system_ops_jobs_v1_response.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 52 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State
Jobs query keys and cache identity are leaf-local under `constants/` and `hooks/`; existing key values are preserved.

## 6. Mutation Inventory & Lifecycle Operations
Existing retry, cancel, delete, clear-completed and bulk actions remain implemented through the existing jobs page hook and API layer. No handler or mutation semantics were changed.

## 7. Permissions and Role Rules
Existing superadmin permission/session gates remain unchanged. This move does not grant or remove any permission.

## 8. State Ownership & Architecture Flow
The leaf-owned jobs hooks and TanStack Query cache are authoritative. No business state is shared with sibling leaves.

## 9. Offline, Loading, Empty, and Error States
Existing pending/error/retry states remain in the relocated view. Integrated offline and runtime behavior is not verified in this ZIP-only execution.

## 10. Security and PII Rules (Data Masking & Guards)
Preserve the existing authorization boundary and do not expose job payloads or secrets beyond the current UI behavior. No localStorage, telemetry or API handling changes are included.

## 11. Accessibility Requirements (A11y)
Existing status filters, table controls, inspect modal and visible focus styles are retained in the moved components. Browser-based keyboard/axe checks remain host-runtime deferred.

## 12. Background Tasks & Realtime Events
The leaf only presents job queue state and existing job actions. It does not implement or reconfigure workers or cron scheduling.

## 13. Feature Flags & Tenant Settings
No feature flag behavior is changed.

## 14. Cache Invalidation & Consistency
The existing jobs hook continues to own query invalidation/reconciliation. No cache behavior is modified here.

## 15. Migration, Rollback & Edge Cases (AI Warnings)
Six presentation components now live under `system_ops_jobs/components/`. The leaf route redirects to the existing `?view=jobs` route. Rollback restores paths/imports using the RBG6 manifest.

## 16. Test Coverage Map & Quality Gates
Existing stats-bar and jobs-table tests now import the canonical component paths. Route-config tests validate the canonical jobs leaf and retained legacy route. Execution is deferred without the host test runner.

## 17. Architecture Exceptions (ADRs)
Physical inventory confirms Jobs APIs, hooks, schemas/types, constants, mocks, tests and URL config are local to this leaf. Host semantic compilation/runtime remains `DEFERRED_TO_HOST_RUNTIME`.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log
The supplied ZIP lacks host `package.json`/Next integration. No new endpoint or host route rewrite was inferred.

## 19. Rule Compliance Checklist (35+ Verification Items)
- [x] Canonical `system_ops_jobs/` leaf exists with route/config, docs trio and host stubs.
- [x] Jobs presentation components are grouped under the leaf `components/` folder.
- [x] Existing query view and physical legacy paths are retained.
- [x] API/hook/schema/type/mock/constants/test/URL ownership local to this leaf; cross-leaf import scan passes.
- [ ] Host Vitest and route execution: `DEFERRED_TO_HOST_RUNTIME`.

## 20. Standalone Run, Mock & Test Harness
The UI consumes locally owned hooks and contracts. Tests are co-located under this leaf’s `tests/` folder. Host Vitest execution is deferred.


### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminSystemOpsJobsDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide
This is a fully grouped source leaf. Its import graph is statically resolved and it has no sibling business imports; semantic standalone compilation still needs the host toolchain.


### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/SearchableDropdown |
| @/components/ui/Pagination |
| @/components/ui/Tooltip |
| @/components/ui/Feedback/ConfirmProvider |
| @/hooks/useUrlState |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)
RBG 6 moved six jobs UI components into the canonical leaf and updated route/test imports plus route identity. API, query, mutation and permission behavior were not intentionally changed.


### RBG-04 local boundary isolation (v14)
Feature-local route suspense skeletons, error UI boundaries and Next.js error prop contracts are owned in this leaf rather than imported from `platform_shell_layout`. The root role layout remains responsible for global provider composition. New user-facing messages are stored in this leaf’s EN/HI locale files.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

