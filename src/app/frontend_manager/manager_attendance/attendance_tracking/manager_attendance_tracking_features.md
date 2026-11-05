---
role: manager
domain_root: manager_attendance
submodule: attendance_tracking
route: /frontend_manager/manager_attendance/attendance_tracking
compatibility_route: /frontend_manager/manager_attendance
source_status: migrated-source-host-runtime-not-verified
---

# Manager Attendance — Autonomous Leaf

## 1. Module Purpose
Manager Attendance is the branch attendance workspace for recording and reviewing member and staff check-ins. Managers use it to inspect the current-day attendance list, filter the dataset, open attendance history, and record attendance events. The module owns attendance-specific queries, filters, fixtures, and handlers so it can be given to an AI without unrelated business modules. It does not own member billing, payroll, or other role-specific business workflows.

Module root: `frontend_manager/manager_attendance/`

## 2. Domain Lifecycle and User Flows
The leaf owns the source-derived attendance workflow. Existing view state and CRUD/user-flow behavior remain grounded in the original module's resolver, hooks, API client, schemas, and tests. Do not infer additional backend behavior from UI labels alone.

## 3. Route and Navigation Contract
- Autonomous leaf route: `/frontend_manager/manager_attendance/attendance_tracking`.
- Compatibility route: `/frontend_manager/manager_attendance` remains live and renders the same leaf-owned main presentation to preserve the prior route destination.
- Canonical views identified in the source route matrix: attendance, qr-scanner.
- Existing view/tab aliases and query parameters must be preserved; the current URL resolver and source tests remain the authority.

## 4. API Architecture
The route/API configuration is leaf-owned at `config/manager_attendance_tracking.url_config.ts`. Endpoint literals found in the original module URL config: /api/v1/manager/attendance; /api/v1/manager/attendance/history; /api/v1/manager/attendance/members; /api/v1/manager/attendance/staff; /api/v1/manager/attendance/stats. Existing values are preserved. The authoritative backend specification is not included, so backend runtime enforcement and contract compatibility remain `NOT_VERIFIED`.

## 5. Schema and Types
Source schema artifacts migrated into `schemas/`: manager_attendance_tracking_form.schemas.ts, manager_attendance_tracking.schemas.ts, manager_attendance_tracking_snapshot.schemas.ts. Types are leaf-owned in `types/`. Retain existing public shape and avoid inferring fields not present in code/fixtures.

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
Source tests migrated: 11. Current test files include: ManagerAttendanceTrackingBehavior.test.tsx, ManagerAttendanceTrackingFormatters.test.ts, ManagerAttendanceTrackingQueryKeys.test.ts, ManagerAttendanceTrackingUrlContract.test.ts, ManagerAttendanceTrackingViewConstants.test.ts, useManagerAttendanceTrackingForm.test.ts, useManagerAttendanceTrackingLogic.test.ts, useManagerAttendanceTrackingMutations.test.ts, useManagerAttendanceTrackingQrScannerLogic.test.ts, useManagerAttendanceTrackingQueries.test.ts, useManagerAttendanceTrackingUiStore.test.ts. New source scenario-catalog coverage checks the required mock state catalog. Host Vitest execution is `NOT_VERIFIED`.

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
The leaf includes `contracts/host-stubs.d.ts`, `tests/harness/ManagerAttendanceTrackingHarness.tsx`, and `tests/harness/bootstrap.tsx`. The source overlay does not include a host package manifest, lockfile, TypeScript project config, or dependencies. Integrate the leaf into the host project and run its installed Vitest/TypeScript/build/browser commands; no standalone execution claim is made here.

## 22. Module Portability, Host Integration and Version History
The leaf owns code under standard category folders and has a canonical route/API config. Host stubs are declarations for isolated testing only and must not substitute for production host modules. RBG20+ carries out source moves in bounded, separately checkpointed batches. Live runtime verification remains `NOT_VERIFIED_HOST_RUNTIME`.

## Source-Derived Feature Inventory and User Flows

The following inventory and flow descriptions are retained from the source documentation. Legacy directory listings are excluded because the physical ownership structure is now the canonical leaf tree.

---

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| markAttendance | `/manager/attendance` | Uses the markAttendance workflow with typed request/response handling. | `POST /manager/attendance` | ✅ Implemented |
| fetchAttendanceRecords | `/manager/attendance` | Uses the fetchAttendanceRecords workflow with typed request/response handling. | `GET /manager/attendance` | ✅ Implemented |
| fetchAttendanceStats | `/manager/attendance` | Uses the fetchAttendanceStats workflow with typed request/response handling. | `GET /manager/attendance/stats` | ✅ Implemented |
| fetchAttendanceHistory | `/manager/attendance` | Uses the fetchAttendanceHistory workflow with typed request/response handling. | `GET /manager/attendance/history` | ✅ Implemented |
| fetchAttendanceMembers | `/manager/attendance` | Uses the fetchAttendanceMembers workflow with typed request/response handling. | `GET /manager/attendance/members` | ✅ Implemented |
| fetchAttendanceStaff | `/manager/attendance` | Uses the fetchAttendanceStaff workflow with typed request/response handling. | `GET /manager/attendance/staff` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Record attendance
1. Manager opens Attendance and selects a member or staff entry in the attendance modal.
2. The form validates the date, type, member/staff identifier, and optional check-in details.
3. markAttendance() sends the mutation through the Attendance API client.
4. The MSW handler returns the authoritative Attendance response in development/test; TanStack Query reconciles the affected list/stats queries.
### Flow 2: Filter and browse records
1. The manager changes search, date, status, or page controls.
2. The attendance logic builds the complete server query from URL/UI state.
3. fetchAttendanceRecords(params) sends those parameters to the API client.
4. The MSW handler filters and paginates module-owned fixtures and returns the filtered total.
5. The table renders the returned page without client-side dataset slicing.
