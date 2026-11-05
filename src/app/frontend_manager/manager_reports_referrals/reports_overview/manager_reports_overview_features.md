---
role: manager
domain_root: manager_reports
submodule: reports_overview
route: /frontend_manager/manager_reports_referrals/reports_overview
compatibility_route: /frontend_manager/manager_reports_referrals
source_status: migrated-source-host-runtime-not-verified
---

# Manager Reports — Autonomous Leaf

## 1. Module Purpose
Manager Reports is the branch reporting workspace for financial, attendance, member, and expense analytics. Managers can choose a reporting range, inspect KPI/chart/table views, and refresh the current report data. The Manager role does not expose tenant-wide data export/download controls.

Module root: `frontend_manager/manager_reports/`

## 2. Domain Lifecycle and User Flows
The leaf owns the source-derived reports workflow. Existing view state and CRUD/user-flow behavior remain grounded in the original module's resolver, hooks, API client, schemas, and tests. Do not infer additional backend behavior from UI labels alone.

## 3. Route and Navigation Contract
- Autonomous leaf route: `/frontend_manager/manager_reports_referrals/reports_overview`.
- Compatibility route: `/frontend_manager/manager_reports` remains live and renders the same leaf-owned main presentation to preserve the prior route destination.
- Canonical views identified in the source route matrix: default (current root screen).
- Existing view/tab aliases and query parameters must be preserved; the current URL resolver and source tests remain the authority.

## 4. API Architecture
The route/API configuration is leaf-owned at `config/manager_reports_overview.url_config.ts`. Endpoint literals found in the original module URL config: /api/v1/manager/reports; /api/v1/manager/reports/summary. Existing values are preserved. The authoritative backend specification is not included, so backend runtime enforcement and contract compatibility remain `NOT_VERIFIED`.

## 5. Schema and Types
Source schema artifacts migrated into `schemas/`: manager_reports_overview.schemas.ts. Types are leaf-owned in `types/`. Retain existing public shape and avoid inferring fields not present in code/fixtures.

## 6. Query Key Registry
All existing query-key constants are leaf-owned under `constants/` and are preserved from the source snapshot. Do not rename key values during migration; key values are runtime cache contracts even when constant identifiers are renamed for leaf ownership.

## 7. Mutation Inventory
The prior root feature map and API client provide the current mutation inventory. Existing API verbs and payload mapping are preserved. No new backend CRUD capability is inferred by the migration.

## 8. Permissions and Role Rules
This source belongs to the Manager frontend. The archive does not include backend authorization, role policy, tenant isolation, or server enforcement evidence. Frontend visibility must not be treated as authorization.

## 9. State Ownership
Server state remains managed by the original query hooks. Existing client UI state and store ownership are preserved under `state/` or the relevant leaf hook, without introducing entity persistence in browser storage.

## 10. Offline and Reconnect Behavior
No authoritative offline/reconnect contract can be verified from the supplied source. Preserve existing query/retry behavior; offline guarantees are `NOT_VERIFIED`.

## 11. Security and PII Rules
Do not add sensitive values to URLs, logs, telemetry, or fixture output. Keep existing validation and permission behavior; host/backend security needs separate verification.

## 12. Accessibility Requirements
Preserve semantic HTML, keyboard focus, labels, announcements, loading/error/empty/recovery states, reduced-motion safeguards, and responsive layout behavior. Existing accessibility test sources moved with the leaf. Browser/axe execution remains `NOT_VERIFIED` without host runtime.

## 13. Background Tasks
No new background jobs, polling loops or recurring tasks are introduced by this move. Any existing task behavior must remain source-backed and isolated in the owning leaf.

## 14. Feature Flags
No new feature flag names or gate behavior are invented. Existing source flags, if any, remain unchanged.

## 15. Cache Invalidation
Preserve existing query keys and invalidation paths. Any future API mutation requires a verified resource contract and explicit invalidation tests.

## 16. Migration and Rollback
This bounded migration relocates source files into canonical leaf categories and updates imports while preserving the current API URL literals and live domain-root route. Rollback is by restoring the previous physical RBG checkpoint; the root route is kept as a compatibility entry.

## 17. Test Coverage Map
Source tests migrated: 10. Current test files include: ManagerReportsOverviewBehavior.test.tsx, ManagerReportsOverviewDateFilterConstants.test.ts, ManagerReportsOverviewFormatters.test.ts, ManagerReportsOverviewMoneySchema.test.ts, ManagerReportsOverviewQueryKeys.test.ts, ManagerReportsOverviewSharedConstants.test.ts, ManagerReportsOverviewUrlContract.test.ts, useManagerReportsOverviewLogic.test.ts, useManagerReportsOverviewSummaryQuery.test.ts, useManagerReportsOverviewUiStore.test.ts. New source scenario-catalog coverage checks the required mock state catalog. Host Vitest execution is `NOT_VERIFIED`.

## 18. Architecture Exceptions
The root compatibility page remains a thin route adapter because the source route matrix requires the historical root destination to remain operational. Multi-workflow split review is tracked separately for roots with multiple independent entity/API lifecycles; this initial leaf relocation is not a five-gate approval for those cases.

## 19. Known Contract Gaps
Host package/configuration, live backend OpenAPI/authorization contracts, tenant enforcement, and browser runtime are not supplied. These items are `NOT_VERIFIED`, not presumed to pass. Any route, schema or mock discrepancy discovered from the source must be recorded rather than guessed.

## 20. Rule Compliance Checklist
- [x] Direct-child Tier4 leaf route exists.
- [x] Business source, tests, mocks and locales are owned by the leaf.
- [x] Canonical folders are used; module-owned filenames receive the leaf prefix.
- [x] URL/API config is leaf-local and keeps existing URL values.
- [x] Documentation trio, host contract stub and isolated test harness exist.
- [ ] All five qualification gates and workflow splitting are approved only after the post-migration physical audit.
- [ ] Host test/typecheck/build/browser and accessibility execution remain `NOT_VERIFIED`.

## 21. Standalone Run, Mock and Test Harness
The leaf includes `contracts/host-stubs.d.ts`, `tests/harness/ManagerReportsOverviewHarness.tsx`, and `tests/harness/bootstrap.tsx`. The source overlay does not include a host package manifest, lockfile, TypeScript project config, or dependencies. Integrate the leaf into the host project and run its installed Vitest/TypeScript/build/browser commands; no standalone execution claim is made here.

## 22. Module Portability, Host Integration and Version History
The leaf owns code under standard category folders and has a canonical route/API config. Host stubs are declarations for isolated testing only and must not substitute for production host modules. RBG20+ carries out source moves in bounded, separately checkpointed batches. Live runtime verification remains `NOT_VERIFIED_HOST_RUNTIME`.

## Source-Derived Feature Inventory and User Flows

The following inventory and flow descriptions are retained from the source documentation. Legacy directory listings are excluded because the physical ownership structure is now the canonical leaf tree.

---

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Reports summary | `/manager/reports` | Switch report tab, choose date range, refresh, and inspect KPI/chart/table results | `GET /manager/reports/summary` | Implemented |

## User Flows
### Flow 1: Review and refresh report
1. Manager opens `/manager/reports`.
2. The module reads the `range` URL parameter or defaults to the documented current-month range.
3. The summary query loads server data through `ManagerReportsOverviewApi.fetchReportsSummary`.
4. KPI, chart, and table components render from the validated summary response.
5. Manager can switch tabs or date range; the URL state changes and the summary query reconciles to the new range.
6. Manager can refresh; only the Manager Reports query namespace is invalidated.
