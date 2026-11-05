---
role: manager
domain_root: manager_grievance
submodule: grievance_resolution
route: /frontend_manager/manager_grievances/grievance_resolution
compatibility_route: /frontend_manager/manager_grievances
source_status: migrated-source-host-runtime-not-verified
---

# Manager Grievance — Autonomous Leaf

## 1. Module Purpose
The Manager Grievance module gives gym managers a focused queue for member complaints and their resolution status. Managers use it to review reported issues, search by member or issue text, record new complaints, and close open or resolving complaints with a resolution note. The module owns its complaint API contract, UI state, query keys, mock data and mutation behavior. The backend must enforce authentication, Manager role authorization, tenant/branch isolation, and record-level access on every endpoint; frontend visibility is not an authorization boundary. Server enforcement remains NOT_VERIFIED without backend source/runtime evidence.

Module root: `frontend_manager/manager_grievances/grievance_resolution/`

## 2. Domain Lifecycle and User Flows
The leaf owns the source-derived grievance workflow. Existing view state and CRUD/user-flow behavior remain grounded in the original module's resolver, hooks, API client, schemas, and tests. Do not infer additional backend behavior from UI labels alone.

## 3. Route and Navigation Contract
- Autonomous leaf route: `/frontend_manager/manager_grievances/grievance_resolution`.
- Compatibility route: `/frontend_manager/manager_grievances` remains live and renders the same leaf-owned main presentation to preserve the prior route destination.
- Canonical views identified in the source route matrix: default (current root screen).
- Existing view/tab aliases and query parameters must be preserved; the current URL resolver and source tests remain the authority.

## 4. API Architecture
The route/API configuration is leaf-owned at `config/manager_grievance_resolution.url_config.ts`. Endpoint literals found in the original module URL config: /manager/grievance. Existing values are preserved. The authoritative backend specification is not included, so backend runtime enforcement and contract compatibility remain `NOT_VERIFIED`. The backend must reject resolve transitions for already-closed tickets and enforce the documented state transition atomically; mock/runtime conformance remains pending.

## 5. Schema and Types
Source schema artifacts migrated into `schemas/`: manager_grievance_resolution.schemas.ts. Types are leaf-owned in `types/`. Retain existing public shape and avoid inferring fields not present in code/fixtures.

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
Source tests migrated: 10. Current test files include: ManagerGrievanceResolutionBehavior.test.tsx, ManagerGrievanceResolutionFormatters.test.ts, ManagerGrievanceResolutionMockHandlers.test.ts, ManagerGrievanceResolutionQueryKeys.test.ts, ManagerGrievanceResolutionUrlContract.test.ts, useManagerGrievanceResolutionLogic.test.ts, useManagerGrievanceResolutionMutations.test.ts, useManagerGrievanceResolutionQueries.test.ts, useManagerGrievanceResolutionResolution.test.ts, useManagerGrievanceResolutionUrlState.test.ts. New source scenario-catalog coverage checks the required mock state catalog. Host Vitest execution is `NOT_VERIFIED`.

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
The leaf includes `contracts/host-stubs.d.ts`, `tests/harness/ManagerGrievanceResolutionHarness.tsx`, and `tests/harness/bootstrap.tsx`. The source overlay does not include a host package manifest, lockfile, TypeScript project config, or dependencies. Integrate the leaf into the host project and run its installed Vitest/TypeScript/build/browser commands; no standalone execution claim is made here.

## 22. Module Portability, Host Integration and Version History
The leaf owns code under standard category folders and has a canonical route/API config. Host stubs are declarations for isolated testing only and must not substitute for production host modules. RBG20+ carries out source moves in bounded, separately checkpointed batches. Live runtime verification remains `NOT_VERIFIED_HOST_RUNTIME`.

## Source-Derived Feature Inventory and User Flows

The following inventory and flow descriptions are retained from the source documentation. Legacy directory listings are excluded because the physical ownership structure is now the canonical leaf tree.

---

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Complaint queue | `/manager/grievance` | Browse complaint records and search by member or issue | `ManagerGrievanceResolutionContent.tsx` | GET `/manager/grievance` | Implemented |
| Log complaint | `/manager/grievance` | Create a new complaint and return to the queue | `ManagerGrievanceResolutionLogComplaintModal.tsx` | POST `/manager/grievance` | Implemented |
| Resolve complaint | `/manager/grievance` | Add a resolution note and close an open/resolving complaint | `ManagerGrievanceResolutionContent.tsx` | POST `/manager/grievance/:id/resolve` | Implemented |

## User Flows & Interactions
### Flow 1: Log a complaint
1. Manager opens `/manager/grievance` and clicks `Log Complaint`.
2. `ManagerGrievanceResolutionLogComplaintModal` opens with RHF + Zod validation.
3. Manager enters member name, category and issue description.
4. Submit calls the feature create mutation.
5. On success the feature invalidates the grievance list query, shows the backend mutation message through Manager toast infrastructure, closes the modal and renders the new record.
6. On validation or API error the form remains available and the user can correct/retry.

### Flow 2: Resolve a complaint
1. Manager clicks `Resolve` on an open/resolving record.
2. Inline resolution UI appears and requires a non-empty note.
3. Submit calls `POST /manager/grievance/:id/resolve`.
4. On success the record becomes `CLOSED`, the resolution note is visible and the next action is available.
5. On failure the original record remains visible and retry remains possible.
