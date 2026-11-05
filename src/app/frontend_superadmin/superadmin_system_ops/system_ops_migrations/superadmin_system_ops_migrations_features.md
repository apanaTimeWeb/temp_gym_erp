---
feature: "superadmin_system_ops_migrations"
owner_role: "superadmin"
module_version: 18
api_contract_source: "supplied Superadmin web source: migrations API, URL config, Zod schemas/types, MSW fixtures and tests"
documentation_status: "v12-source-static-audited; host-runtime-deferred"
portability_score: "NOT_VERIFIED (target 8/8; see Section 22)"
last_verified_date: "2026-10-28"
last_verified_commit: "host-unavailable"
---

# Superadmin System Ops Migrations — Autonomous Sub-Module Contract

## 1. Scope and Non-Scope (Module Purpose, System Context & Dependencies)

Database-migration history and confirmed migration execution within the migration aggregate. Superadmins use this workspace within the existing server-provided role scope. Components, contracts, API calls, query state, mocks and tests remain owned by this leaf. Backend permission enforcement and host runtime integration are outside this source-only evidence boundary.

## 2. Screen Inventory & Component Responsibility Map

| Screen/view | Evidence | Purpose | Principal UI/actions |
|---|---|---|---|
| Migration list and schema rollout view | `components/SuperadminSystemOpsMigrationsMain.tsx` | Show current migration rows and statuses | Retry list query, enter target version, request a rollout, review confirmation |
| Empty state | `components/SuperadminSystemOpsMigrationsEmptyState.tsx` | Explain that no migration rows are available | Informational state; no deletion of list capability |
| Status badge | `components/SuperadminSystemOpsMigrationsMigrationStatusBadge.tsx` | Map a migration status to semantic styling | Display-only status indicator |
| Deployment mutation workflow | `hooks/useSuperadminSystemOpsMigrationsPage.ts`, `hooks/useSuperadminSystemOpsMigrationsDeploymentMutation.ts`, `hooks/useSuperadminSystemOpsMigrationsMainViewModel.ts` | Coordinate validation, confirmation and request lifecycle | Confirm/cancel; submit; retain input after failure; clear input after reported success |

The canonical route owner now lives under this feature's `frontend_superadmin/` path. Runtime route registration and host redirect integration remain `DEFERRED_TO_HOST_RUNTIME` because the host route tree is not included.


### v18 physical component inventory


| Owned component | Source responsibility |
|---|---|
| components/SuperadminSystemOpsMigrationsEmptyState.tsx | Renders/orchestrates SuperadminSystemOpsMigrationsEmptyState within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsMigrationsErrorBoundary.tsx | Feature-local recoverable render error boundary for system_ops_migrations. |
| components/SuperadminSystemOpsMigrationsMain.tsx | Renders/orchestrates SuperadminSystemOpsMigrationsMain within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsMigrationsMigrationStatusBadge.tsx | Renders/orchestrates SuperadminSystemOpsMigrationsMigrationStatusBadge within its owning Superadmin feature module; no direct backend implementation. |
| components/SuperadminSystemOpsMigrationsPageSuspenseSkeleton.tsx | Feature-local route loading skeleton for system_ops_migrations, with no sibling-module dependencies. |

## 3. Navigation Contract & User Flows

The URL config declares:

- `SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES.MAIN`: `/frontend_superadmin/superadmin_system_ops?view=migrations`
- `SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES.CANONICAL_LEAF`: `/frontend_superadmin/superadmin_system_ops/system_ops_migrations`
- `SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES.LEGACY_PATH`: `/frontend_superadmin/superadmin_system_ops/system_ops_migrations`

These literal values are preserved from `config/superadmin_system_ops_migrations.url_config.ts`; successful host-level navigation and alias handling remain `DEFERRED_TO_HOST_RUNTIME`.

## 4. API Contract & UI Data Requirements

| Operation | Method | Endpoint expression | Request | Response contract/schema | Evidence |
|---|---|---|---|---|---|
| `migrationsApi.fetchMigrations` | Method omitted at callsite; `apiFetch` transport default is not verified | `${SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API.BASE}${search}`; base `/superadmin/system-ops/migrations` | Optional `Record<string, string>` serialized through `URLSearchParams` | `MigrationLog[]` validated with `SuperadminMigrationsListDataSchema` | `api/superadmin_system_ops_migrations.api.ts` |
| `migrationsApi.startMigration` | `POST` | `/superadmin/system-ops/migrations/trigger` | JSON `{ targetVersion }` and `Idempotency-Key` header | Data shape validated by `MigrationTriggerResponseSchema`: `{ id: string; version: string; status: string }` inside the host API envelope | Same API file and `schemas/SuperadminSystemOpsMigrationsApiSchema.ts` |

The implementation imports `superadmin_platform_shell_layout_api_fetch.api` from `superadmin_platform_shell_layout/layout_shell`. That cross-leaf dependency violates the strict leaf-isolation rule and is tracked for a later approved repair batch; it is not accepted as a canonical exception. No other endpoint is implied by this contract.


### v18 source-derived transport map

Expressions below reference the leaf URL configuration; no endpoint is inferred from a UI label. Runtime backend compatibility remains unverified.


| API source and line | Method | Endpoint expression | Runtime data schema |
|---|---|---|---|
| api/superadmin_system_ops_migrations.api.ts:21 | GET | `${SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API.BASE}${search}` | Present |
| api/superadmin_system_ops_migrations.api.ts:23 | POST | SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API.TRIGGER | Present |
| api/superadmin_system_ops_migrations_api_fetch.api.ts:11 | GET | url | See API wrapper validation |

Response types: `types/superadmin_system_ops_migrations.types.ts`, `types/superadmin_system_ops_migrations_migration_status_badge.types.ts`, `types/superadmin_system_ops_migrations_next_error_props.types.ts`.

Validation schemas: `schemas/superadmin_system_ops_migrations.schemas.ts`, `schemas/superadmin_system_ops_migrations_api.schemas.ts`.


### Typed UI data-consumer evidence (v18)

The component-to-contract property map is recorded in `validation-evidence/ui-data-map.json` at delivery root. This leaf has 8 typed property reads with source and declaration line numbers. This is source linkage evidence; live API/OpenAPI and browser rendering remain separate checks.

## 5. Query Key Registry & Server State

The canonical key factory is expressed as constants in `constants/SuperadminSystemOpsMigrationsQueryKeys.ts`:

- `all`: `['superadmin_system_ops_migrations', 'system-ops', 'migrations']`
- `list`: `['superadmin_system_ops_migrations', 'system-ops', 'migrations', 'list']`

The list query uses `list`. Preserve the module-specific identity prefix; do not substitute a generic migrations key.

## 6. Mutation Inventory & Lifecycle Operations

| Mutation/action | Trigger and guards | Side effects | Retry/idempotency behavior |
|---|---|---|---|
| Start schema rollout | Non-empty, syntax-valid target version; explicit `useConfirm()` dialog must return confirmed | POST trigger endpoint; localized success/error toast; invalidate migration-list query after success | One `crypto.randomUUID()` key per confirmed target-version intent; the same key is retained when that intent fails and is retried; cleared after success or a relevant cancellation |

No rollback mutation is evidenced in the migration API client. Status values such as `ROLLED_BACK`/`ROLLBACK` describe supported data states and do not prove a rollback action exists in this leaf.

## 7. Permissions and Role Rules

The feature is named and routed as a Superadmin capability. The supplied leaf does not provide a complete backend authorization policy or a verifiable client permission guard for rollout access. **Required host condition:** the authenticated backend must authorize the mutation independently of client visibility. Exact role claims, permission names, tenant scopes, and forbidden-role responses are `NOT_VERIFIED_IN_SCOPE`; do not invent them.

## 8. State Ownership & Architecture Flow

- Server state: TanStack Query v5, read through `useQuery` in `useSuperadminSystemOpsMigrationsPage`.
- Mutation state: `useMutation`; pending UI is surfaced via `deploymentMutation.isPending` as `isDeploying`.
- Local UI state: target-version input and validation message via `useState` in `useSuperadminSystemOpsMigrationsMainViewModel`.
- Intent identity: `useRef` stores the selected target version and idempotency UUID through failed retries.
- Confirmation: host `useConfirm()` dialog service.
- Cache identity/invalidation: module-local query keys; list invalidated by the mutation's `onSuccess` handler.

## 9. Offline, Loading, Empty, and Error States

The leaf exposes loading, error, retry/refetch, and mutation error paths. An explicit offline persistence strategy, queued deployment, reconnect retry policy, and background synchronization contract are not present in the supplied module source; those behaviors are `NOT_VERIFIED` and must not be added by assumption.

## 10. Security and PII Rules (Data Masking & Guards)

- Preserve the `Idempotency-Key` requirement for the state-changing POST and reuse its UUID for retries of the same intent.
- Preserve request validation and typed API-envelope handling; do not create alternate endpoints or payload fields.
- Migration records can contain `errorLog` and `errorDetails`; access policy, redaction requirements and backend role filtering are not specified by the supplied web leaf. Treat those external rules as `NOT_VERIFIED_IN_SCOPE`, and do not broaden UI exposure.
- Do not persist migration business records or authorization/tenant data in browser storage.
- Server authorization must remain authoritative; client-side form validation is not an authorization boundary.

## 11. Accessibility Requirements (A11y)

Observed UI evidence includes a programmatically associated label for the version input, `aria-invalid` and conditional `aria-describedby` for validation feedback, a `role="alert"` validation message, column-scoped table headers, semantic buttons, visible pending status, focus-visible styling, and icon accessibility hiding for decorative icons. Preserve these behaviors. Full keyboard/screen-reader and viewport validation has not run in a host browser and remains `DEFERRED_TO_HOST_RUNTIME`.

## 12. Background Tasks & Realtime Events

The web client starts a rollout request and renders the returned state; it does not own a background worker or poll loop in the supplied code. Actual migration execution, job scheduling, rollout completion, and server-side rollback are backend responsibilities whose contracts are outside this archive.

## 13. Feature Flags & Tenant Settings

No feature-flag key or flag provider for this migration leaf was verified in the supplied source. Do not fabricate a rollout flag. Any future flag requirement must be backed by a product contract or code-level definition and recorded before implementation.

## 14. Cache Invalidation & Consistency

On successful deployment, the mutation invalidates `SUPERADMIN_SYSTEM_OPS_MIGRATIONS_QUERY_KEYS.list`. The source does not establish any other affected query key. Keep invalidation scoped to known keys and verify any additional dependent cache through code evidence before adding it.

## 15. Migration, Rollback & Edge Cases (AI Warnings)

This sub-module is the Superadmin UI for schema rollouts; it is not the migration engine. Client-side target-version syntax is accepted by `isValidMigrationTargetVersion` using `/^v?\d+(?:\.\d+){1,2}$/`. Server compatibility, ordering constraints, transactional behavior, rollback eligibility, rollback endpoint/payload, migration checksum, and deploy-window rules are not supplied. The status schema includes `PENDING`, `IN_PROGRESS`, `COMPLETED`, `FAILED`, `ROLLED_BACK`, `SUCCESS`, and `ROLLBACK`; do not infer extra operations from the enum alone.

## 16. Test Coverage Map & Quality Gates

| Test file | Coverage evidenced by name/location |
|---|---|
| `tests/SuperadminSystemOpsMigrationsApi.test.ts` | API facade |
| `tests/SuperadminSystemOpsMigrationsBasic.test.tsx` | Basic view behavior |
| `tests/SuperadminSystemOpsMigrationsConstants.test.ts` | Status/constants |
| `tests/SuperadminSystemOpsMigrationsFormatters.test.ts` | Formatters |
| `tests/SuperadminSystemOpsMigrationsMockHandlers.test.ts` | MSW handlers and mutable mock behavior |
| `tests/SuperadminSystemOpsMigrationsRouteConfig.test.ts` | Route/API URL configuration |
| `tests/useSuperadminSystemOpsMigrationsDeploymentMutation.test.tsx` | Deployment mutation |
| `tests/useSuperadminSystemOpsMigrationsMainViewModel.test.ts` | View-model behavior |
| `tests/useSuperadminSystemOpsMigrationsPage.test.tsx` | Page query/confirmation flow |
| `tests/harness/SuperadminSystemOpsMigrationsHarness.tsx` | Provider harness (not itself a test case) |
| `tests/harness/bootstrap.ts` | MSW and QueryClient bootstrap entrypoint |

Test execution is `DEFERRED_TO_HOST_RUNTIME` unless dependencies and a runner are supplied by the host. File presence is not a claim that the suite passes.

## 17. Architecture Exceptions (ADRs)

**No approved architecture exception is recorded.** The current source includes a cross-leaf import of `superadmin_platform_shell_layout_api_fetch.api` and a cross-leaf import of `useSuperadminPlatformShellLayoutUnsavedChangesGuard`. Both are open isolation defects, not approved exceptions. Their source-level repair must follow the RBG dependency order while preserving behavior and using locally owned code or documented zero-business host contracts. No sibling import is to be labeled compliant solely because it resolves.


### v18 explicit infrastructure exceptions

- Dynamic virtual list position/height styles, when present, are generated from TanStack Virtual measured geometry. Semantic token classes still control colors, spacing and focus. Static inline business styling is not permitted.
- Static loading placeholders may use fixed positional keys because they are not reorderable server entities. Stable backend identifiers remain required for data rows.
- Form-library `register` attribute spreads target primitive HTML inputs; no blind business-component prop forwarding is allowed.
- Next.js active navigation shells may use a client boundary for `usePathname`; ownership and mutable business state remain inside the feature leaf.

## 18. Known Contract Gaps & Bug Log

- `NOT_VERIFIED`: backend authentication/authorization contract for starting migrations.
- `NOT_VERIFIED`: default HTTP method of the list request, because no method is explicit at the callsite and the host transport implementation is not supplied in this leaf.
- `NOT_VERIFIED`: server-side version compatibility, execution status transition, rollback semantics and any tenant-specific rollout scoping.
- `NOT_VERIFIED`: host handling of network timeouts, request cancellation and reconciliation after an ambiguous response.
- `OPEN — RBG-2`: remove cross-leaf dependencies without changing the confirmation, idempotency, or cache behavior.

No missing external contract may be replaced with invented endpoint details or payload fields.

## 19. Rule Compliance Checklist (35+ Verification Items)

- [x] Canonical terminal leaf folder exists at `superadmin_system_ops/system_ops_migrations/`; no child feature submodule under this leaf.
- [x] Local URL config exists and exports route/API values as `as const`.
- [x] API list and trigger response data schemas are declared in Zod.
- [x] Query key identity is module-prefixed.
- [x] Start-migration mutation sends `Idempotency-Key`.
- [x] Query v5 pending state is consumed as `isPending` / `isDeploying`.
- [x] Local mutable MSW handlers and reset function exist.
- [x] Local `contracts/host-stubs.d.ts` declares the five required web host modules and contains no raw `any` type declarations.
- [x] Local `tests/harness/bootstrap.ts` and `[Role][Submodule]Harness.tsx` are present.
- [ ] Zero cross-leaf runtime/business imports — **OPEN: RBG-2** (API transport and unsaved-changes guard still point to `superadmin_platform_shell_layout/layout_shell`).
- [ ] Standalone TypeScript/test execution — `DEFERRED_TO_HOST_RUNTIME`; no app package manifest/dependency installation is included with the isolated role archive.
- [ ] Live authorization/accessibility/browser E2E — `DEFERRED_TO_HOST_RUNTIME`.

## 20. Standalone Run, Mock & Test Harness

- **Module root:** `frontend_superadmin/superadmin_system_ops/system_ops_migrations/`.
- **Test runner command:** `npm run test -- superadmin_system_ops/system_ops_migrations` (requires the host's configured Vitest script/dependencies; command execution is not asserted as passed here).
- **Mock bootstrap:** import the lifecycle exports from `tests/harness/bootstrap.ts`; call `startSuperadminMockServer()` before tests, `resetSuperadminMockState()` between tests, and `stopSuperadminMockServer()` after the suite.
- **Query cache:** use `createIsolatedQueryClient()` per isolated test to disable retries and eliminate cache carry-over.
- **Provider mounting:** wrap rendered feature content with `tests/harness/SuperadminSystemOpsMigrationsHarness.tsx`.
- **Source-defined mock scenarios:** the mock handler returns a migration list, adds an `IN_PROGRESS` record after a valid idempotent trigger, returns validation failure for missing target/key, returns conflict if a key is reused for a different target version, and returns the prior result for a replay of the same key/target pair. Empty/error/network-timeout coverage must be exercised by the test harness or verified handlers before claiming full scenario parity.
- **Live backend credentials/endpoints:** not provided; no real deployment should be triggered during local UI testing.


### v18 isolated validation

The root `isolated-validation` adapter supplies documented host primitives for source tests only. It is not a production session/authentication implementation. Each leaf was also checked independently against its own `contracts/host-stubs.d.ts`; per-leaf results are in `validation-evidence/standalone-typechecks.json`.


Browser scenario entry: `tests/harness/SuperadminSystemOpsMigrationsDevelopmentHarness.tsx`. The host serves mockServiceWorker.js; scenario overrides execute only original module handlers through MSW getResponse. Gyms Detail requires a fixture gymId prop.

## 21. Module Portability & Host Integration Guide

1. Copy this terminal leaf as a single unit, including its documentation trio, `config/`, `contracts/`, tests, mock data/handlers, locales, schemas/types and all canonical category folders.
2. Ensure the host provides the approved web baseline: React/Next.js, TanStack Query v5, `next-intl`, Zod, MSW/Vitest for tests, `sonner`, icon/UI primitives, and the documented `@/lib/api`, logger, socket and display-value contracts as actually imported.
3. The current API transport and unsaved-changes guard cross leaf boundaries. Before claiming portable isolation, repair those imports to module-local implementations or a verified zero-business host contract and update tests/import graph evidence.
4. Connect only the endpoints and response schemas listed in Section 4. Verify server authorization, migration safety, and error semantics with the backend owner before live rollout.
5. Run isolated typecheck/unit tests, then host browser E2E and accessibility checks. Until these execute, label them `DEFERRED_TO_HOST_RUNTIME`.


### v18 external dependency manifest


| Approved host file |
|---|
| @/lib/api |
| @/components/ui/Feedback/ConfirmProvider |

Deleting this leaf requires removing its route registration/navigation entry only; no sibling business source imports it. Framework libraries are pinned by the isolated validation lockfile.

## 22. Deliverables & Version History (8/8 Portability Score)

### Feature self-audit and portability score

The mandatory eight portability categories are recorded below. A complete score is **not** claimed because isolation defects and host-runtime verification remain open.

- [x] 1. ZIP self-sufficiency artifacts: leaf-local docs, URL config, host stubs, mocks, tests and standalone harness files exist.
- [ ] 2. Zero cross-leaf business imports: open as recorded in Sections 17 and 19.
- [ ] 3. All five canonical mock scenarios (`ACTIVE`, `EMPTY`, `SERVER_500`, `TIMEOUT`, `UNAUTHORIZED`) verified: incomplete/not fully verified from the supplied handlers.
- [x] 4. Bootstrap and provider harness are present.
- [ ] 5. Full token integrity sweep: not verified in this documentation-only checkpoint.
- [x] 6. Loading/error/empty and validation states are present in source; live interaction is not verified here.
- [x] 7. Start-migration mutation carries an idempotency key and retains it for same-intent retries.
- [ ] 8. Responsive breakpoints and no-overflow behavior verified in a browser: `DEFERRED_TO_HOST_RUNTIME`.

### Module changelog

| Version | Date | Author / Agent | Changes and rationale |
|---|---|---|---|
| v1.0.1 | 2026-10-27 | Frontend Agent V2.11 | Reconstructed the feature contract to include all 22 canonical sections, preserving known route/API/schema/test evidence and explicitly separating unverified host contracts and open cross-leaf dependencies. |


### RBG-04 local boundary isolation (v14)
Feature-local route suspense skeletons, error UI boundaries and Next.js error prop contracts are owned in this leaf rather than imported from `platform_shell_layout`. The root role layout remains responsible for global provider composition. New user-facing messages are stored in this leaf’s EN/HI locale files.

### v18 source repair record

Canonical schema/type/constant casing and imports, error-message privacy, explicit cache reconciliation, early-return rendering and standalone host contracts were repaired where applicable. Root evidence records executed checks and outstanding release verification; no 8/8 runtime score is claimed.

