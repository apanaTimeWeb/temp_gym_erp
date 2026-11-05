---
role: superadmin
domain: superadmin_system_ops
submodule: system_ops_backups
status: ACTIVE_SOURCE_GROUPING_VERIFIED
version: 18
feature: "superadmin_system_ops_backups"
owner_role: "superadmin"
module_version: 18
api_contract_source: "supplied Superadmin web ZIP; host API contract source unavailable"
last_verified_date: "2026-10-28"
last_verified_commit: "host-unavailable"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_VERIFIED (host integration unavailable; target 8/8 pending)"
---

# Superadmin System Ops Backups — Feature Map

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Backup list, schedule updates and confirmed backup operations using the existing backup contract. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map
Canonical route entry: `frontend_superadmin/superadmin_system_ops/system_ops_backups/page.tsx`; feature implementation: `frontend_superadmin/superadmin_system_ops/system_ops_backups/`. The canonical route renders the leaf-owned view directly.


### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminSystemOpsBackupsEmptyState.tsx | Renders/orchestrates SuperadminSystemOpsBackupsEmptyState within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsBackupsErrorBoundary.tsx | Feature-local recoverable render error boundary for system_ops_backups. |
| components/SuperadminSystemOpsBackupsMain.tsx | Renders and orchestrates SuperadminSystemOpsBackupsMain for the owning Superadmin feature module; presentation stays free of direct API calls. |
| components/SuperadminSystemOpsBackupsPageSuspenseSkeleton.tsx | Feature-local route loading skeleton for system_ops_backups, with no sibling-module dependencies. |
| components/SuperadminSystemOpsBackupsRestoreModal.tsx | Renders/orchestrates SuperadminSystemOpsBackupsRestoreModal within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsBackupsScheduleModal.tsx | Renders/orchestrates SuperadminSystemOpsBackupsScheduleModal within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsBackupsTable.tsx | Renders/orchestrates SuperadminSystemOpsBackupsTable within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsBackupsTriggerModal.tsx | Renders/orchestrates SuperadminSystemOpsBackupsTriggerModal within its owning Superadmin feature module; no direct backend implementation. |

## 3. Navigation Contract & User Flows
Overview links use the canonical leaf route. The old `?view=backups` entry and prior physical route remain as compatibility facades that redirect to the canonical leaf.

## 4. API Contract & UI Data Requirements
Observed API contracts are owned in the leaf URL config `config/superadmin_system_ops_backups.url_config.ts`: `/superadmin/system-ops/backups`, `/schedule`, `/trigger`, `/{id}/download`, `/{id}/restore`, and `/health`. This RBG changes no endpoint, payload or response schema.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_system_ops_backups.api.ts:16 | GET | `${SUPERADMIN_SYSTEM_OPS_BACKUPS_API.BASE}${query}` | Present |
| api/superadmin_system_ops_backups.api.ts:26 | POST | SUPERADMIN_SYSTEM_OPS_BACKUPS_API.TRIGGER | Present |
| api/superadmin_system_ops_backups.api.ts:35 | POST | SUPERADMIN_SYSTEM_OPS_BACKUPS_API.RESTORE(id) | Present |
| api/superadmin_system_ops_backups.api.ts:39 | GET | SUPERADMIN_SYSTEM_OPS_BACKUPS_API.DOWNLOAD(id) | Present |
| api/superadmin_system_ops_backups.api.ts:43 | GET | SUPERADMIN_SYSTEM_OPS_BACKUPS_API.SCHEDULE | Present |
| api/superadmin_system_ops_backups.api.ts:49 | PATCH | SUPERADMIN_SYSTEM_OPS_BACKUPS_API.SCHEDULE | Present |
| api/superadmin_system_ops_backups_api_fetch.api.ts:11 | GET | url | See API wrapper validation |
| api/superadmin_system_ops_backups_health.api.ts:13 | GET | SUPERADMIN_SYSTEM_OPS_BACKUPS_HEALTH.BACKEND_API.BASE | Present |

Response types: `types/superadmin_system_ops_backups.types.ts`, `types/superadmin_system_ops_backups_next_error_props.types.ts`, `types/superadmin_system_ops_backups_restore_modal.types.ts`, `types/superadmin_system_ops_backups_schedule.types.ts`, `types/superadmin_system_ops_backups_schedule_modal.types.ts`, `types/superadmin_system_ops_backups_table.types.ts`, `types/superadmin_system_ops_backups_trigger_modal.types.ts`, `types/superadmin_system_ops_backups_v1.types.ts`.

Validation schemas: `schemas/superadmin_system_ops_backups.schemas.ts`, `schemas/superadmin_system_ops_backups_api.schemas.ts`, `schemas/superadmin_system_ops_backups_api_response.schema.ts`, `schemas/superadmin_system_ops_backups_schedule.schemas.ts`, `schemas/superadmin_system_ops_backups_v1.schemas.ts`, `schemas/superadmin_system_ops_backups_v1_response.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 32 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State
Backup query keys and view-model behavior are local under `constants/` and `hooks/`. Existing query-key values are preserved.

## 6. Mutation Inventory & Lifecycle Operations
Existing schedule, trigger, restore and download actions remain wired through their original view-model and API clients. This RBG only relocates presentation files.

## 7. Permissions and Role Rules
Existing superadmin session/authorization gates remain unchanged. No permission or role policy is added or weakened by this grouping change.

## 8. State Ownership & Architecture Flow
The leaf-owned backup view-model and TanStack Query hooks remain authoritative for this capability. No server state is duplicated across sibling leaves.

## 9. Offline, Loading, Empty, and Error States
Existing loading, error, retry and empty states remain in the relocated presentation components. Integrated network/offline behavior is not verified in this ZIP-only execution.

## 10. Security and PII Rules (Data Masking & Guards)
Preserve existing authorization, secret handling and tenant data protections. No browser persistence or telemetry changes are part of this RBG.

## 11. Accessibility Requirements (A11y)
The moved components retain their semantic table, labels, focus styles and accessible actions. Runtime axe and keyboard checks remain host-runtime deferred.

## 12. Background Tasks & Realtime Events
No task scheduling implementation is moved in this presentation-only RBG; existing schedule management stays behind the original hook/API contract.

## 13. Feature Flags & Tenant Settings
No feature flag behavior is changed.

## 14. Cache Invalidation & Consistency
Mutation cache behavior remains in the original hooks and is unchanged.

## 15. Migration, Rollback & Edge Cases (AI Warnings)
Component imports now resolve under `system_ops_backups/components/`. The canonical leaf and existing query/legacy routes remain. Rollback restores the moved presentation paths and their import references from the RBG5 manifest.

## 16. Test Coverage Map & Quality Gates

**Test specs in leaf:** 16  
**Total files under `tests/` (specs plus harness/bootstrap/support):** 18

- `tests/SuperadminSystemOpsBackupsBasic.test.tsx`
- `tests/SuperadminSystemOpsBackupsConstants.test.ts`
- `tests/SuperadminSystemOpsBackupsFormatters.test.ts`
- `tests/SuperadminSystemOpsBackupsHealth.test.ts`
- `tests/SuperadminSystemOpsBackupsMockHandlers.test.ts`
- `tests/SuperadminSystemOpsBackupsScheduleConstants.test.ts`
- `tests/SuperadminSystemOpsBackupsScheduleModal.test.tsx`
- `tests/SuperadminSystemOpsBackupsScheduleSchema.test.ts`
- `tests/hooks/useSuperadminSystemOpsBackupsUnsavedChangesGuard.test.tsx`
- `tests/useSuperadminSystemOpsBackupsActions.test.tsx`
- `tests/useSuperadminSystemOpsBackupsData.test.tsx`
- `tests/useSuperadminSystemOpsBackupsMainViewModel.test.ts`
- `tests/useSuperadminSystemOpsBackupsSchedule.test.ts`
- `tests/useSuperadminSystemOpsBackupsScheduleQuery.test.tsx`
- `tests/useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation.test.tsx`
- `tests/utils/SuperadminSystemOpsBackupsFormApiErrors.test.ts`

Tests are inventoried, not asserted to pass. Vitest/RTL execution remains subject to the host runner and dependency configuration.

## 17. Architecture Exceptions (ADRs)
Physical inventory confirms API clients, hooks, schemas/types, mocks, constants, tests and URL config are inside this leaf. Host semantic compilation/runtime remains `DEFERRED_TO_HOST_RUNTIME`.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log
The supplied role ZIP does not include the host package manifest or runtime route integration. No new backend contract was inferred.

## 19. Rule Compliance Checklist (35+ Verification Items)
- [x] Canonical `system_ops_backups/` leaf exists with route boundary and documentation trio.
- [x] Backup presentation components are grouped under the leaf's `components/` folder.
- [x] Existing query route, physical legacy route and API contracts are retained.
- [x] API/hook/schema/type/mock/constants/test/URL ownership local to this leaf; cross-leaf import scan passes.
- [ ] Host Vitest and route execution: `DEFERRED_TO_HOST_RUNTIME`.

## 20. Standalone Run, Mock & Test Harness
Tests are co-located under this leaf’s `tests/` folder and import the local components/API contracts. A complete standalone runner is not supplied in this ZIP; host Vitest execution is deferred.


### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminSystemOpsBackupsDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide
This is a fully grouped source leaf. Its import graph is statically resolved and it has no sibling business imports; semantic standalone compilation still needs the host toolchain.


### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/Pagination |
| @/components/ui/SearchableDropdown |
| @/hooks/useDebouncedValue |
| @/hooks/useUrlState |
| @/components/ui/Feedback/ConfirmProvider |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)
RBG 5 relocated six existing backup presentation components, added the canonical leaf route/config and docs trio/host stubs, and updated route imports/contracts. Business behavior and backend contracts were preserved.


### RBG-04 local boundary isolation (v14)
Feature-local route suspense skeletons, error UI boundaries and Next.js error prop contracts are owned in this leaf rather than imported from `platform_shell_layout`. The root role layout remains responsible for global provider composition. New user-facing messages are stored in this leaf’s EN/HI locale files.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

