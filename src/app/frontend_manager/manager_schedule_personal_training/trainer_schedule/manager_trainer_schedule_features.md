---
role: manager
domain_root: manager_schedule
submodule: trainer_schedule
route: /frontend_manager/manager_schedule_personal_training/trainer_schedule
compatibility_route: /frontend_manager/manager_schedule_personal_training
source_status: migrated-source-host-runtime-not-verified
---

# Manager Schedule — Autonomous Leaf

## 1. Module Purpose
Manager Schedule is the trainer scheduling workspace. Managers can review trainer schedule summaries and KPIs, search the schedule, select a day, and create/update/delete shifts. Schedule data is server state owned by this module. Shift deletion and other critical scheduling changes require confirmation and authoritative reconciliation.

Module root: `frontend_manager/manager_schedule/`

## 2. Domain Lifecycle and User Flows
The leaf owns the source-derived schedule workflow. Existing view state and CRUD/user-flow behavior remain grounded in the original module's resolver, hooks, API client, schemas, and tests. Do not infer additional backend behavior from UI labels alone.

## 3. Route and Navigation Contract
- Autonomous leaf route: `/frontend_manager/manager_schedule_personal_training/trainer_schedule`.
- Compatibility route: `/frontend_manager/manager_schedule` remains live and renders the same leaf-owned main presentation to preserve the prior route destination.
- Canonical views identified in the source route matrix: weekly-grid, trainer-cards.
- Existing view/tab aliases and query parameters must be preserved; the current URL resolver and source tests remain the authority.

## 4. API Architecture
The route/API configuration is leaf-owned at `config/manager_trainer_schedule.url_config.ts`. Endpoint literals found in the original module URL config: /api/v1/manager/schedule; /api/v1/manager/schedule/shifts. Existing values are preserved. The authoritative backend specification is not included, so backend runtime enforcement and contract compatibility remain `NOT_VERIFIED`.

## 5. Schema and Types
Source schema artifacts migrated into `schemas/`: manager_trainer_schedule.schemas.ts, manager_trainer_schedule_shift_form.schemas.ts. Types are leaf-owned in `types/`. Retain existing public shape and avoid inferring fields not present in code/fixtures.

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
Source tests migrated: 12. Current test files include: ManagerTrainerScheduleBehavior.test.tsx, ManagerTrainerScheduleBuildViewSearchParams.test.ts, ManagerTrainerScheduleFormatters.test.ts, ManagerTrainerScheduleQueryKeys.test.ts, ManagerTrainerScheduleSharedConstants.test.ts, ManagerTrainerScheduleUrlContract.test.ts, ManagerTrainerScheduleViewConstants.test.ts, useManagerTrainerScheduleLogic.test.ts, useManagerTrainerScheduleMutations.test.ts, useManagerTrainerScheduleQueries.test.ts, useManagerTrainerScheduleShiftForm.test.ts, useManagerTrainerScheduleUiStore.test.ts. New source scenario-catalog coverage checks the required mock state catalog. Host Vitest execution is `NOT_VERIFIED`.

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
The leaf includes `contracts/host-stubs.d.ts`, `tests/harness/ManagerTrainerScheduleHarness.tsx`, and `tests/harness/bootstrap.tsx`. The source overlay does not include a host package manifest, lockfile, TypeScript project config, or dependencies. Integrate the leaf into the host project and run its installed Vitest/TypeScript/build/browser commands; no standalone execution claim is made here.

## 22. Module Portability, Host Integration and Version History
The leaf owns code under standard category folders and has a canonical route/API config. Host stubs are declarations for isolated testing only and must not substitute for production host modules. RBG20+ carries out source moves in bounded, separately checkpointed batches. Live runtime verification remains `NOT_VERIFIED_HOST_RUNTIME`.

## Source-Derived Feature Inventory and User Flows

The following inventory and flow descriptions are retained from the source documentation. Legacy directory listings are excluded because the physical ownership structure is now the canonical leaf tree.

---

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchSchedule | `/manager/schedule` | Uses the fetchSchedule workflow with typed request/response handling. | `GET /manager/schedule` | ✅ Implemented |
| createShift | `/manager/schedule` | Uses the createShift workflow with typed request/response handling. | `POST /manager/schedule/shifts` | ✅ Implemented |
| updateShift | `/manager/schedule` | Uses the updateShift workflow with typed request/response handling. | `PATCH /manager/schedule/shifts/:id` | ✅ Implemented |
| deleteShift | `/manager/schedule` | Uses the deleteShift workflow with typed request/response handling. | `DELETE /manager/schedule/shifts/:id` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Browse and edit schedule
1. Manager selects/searches a day or trainer view.
2. fetchSchedule(params) loads the trainer summaries and KPI snapshot.
3. The weekly grid renders trainer shifts from the response.
4. Create/update/delete actions use the schedule API and reconcile Query state.
