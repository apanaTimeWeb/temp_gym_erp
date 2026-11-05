---
role: manager
domain_root: manager_members
submodule: members_directory
route: /frontend_manager/manager_members/members_directory
compatibility_route: /frontend_manager/manager_members
source_status: migrated-source-host-runtime-not-verified
---

# Manager Members — Autonomous Leaf

## 1. Module Purpose
Manager Members is the central branch member lifecycle workspace. Managers can search, filter, sort and paginate members, inspect a member profile, create/update/delete members, renew memberships, record payments, assign trainers/diet/workouts, and send member communications. The module owns its member API contract, snapshots, fixtures and handlers. It does not import business logic from other role roots.

Module root: `frontend_manager/manager_members/`

## 2. Domain Lifecycle and User Flows
The leaf owns the source-derived members workflow. Existing view state and CRUD/user-flow behavior remain grounded in the original module's resolver, hooks, API client, schemas, and tests. Do not infer additional backend behavior from UI labels alone.

## 3. Route and Navigation Contract
- Autonomous leaf route: `/frontend_manager/manager_members/members_directory`.
- Compatibility route: `/frontend_manager/manager_members` remains live and renders the same leaf-owned main presentation to preserve the prior route destination.
- Canonical views identified in the source route matrix: list, member-profile.
- Existing view/tab aliases and query parameters must be preserved; the current URL resolver and source tests remain the authority.

## 4. API Architecture
The route/API configuration is leaf-owned at `config/manager_members_directory.url_config.ts`. Endpoint literals found in the original module URL config: /api/v1/manager/members; /api/v1/manager/members/diet-plans; /api/v1/manager/members/export; /api/v1/manager/members/plans; /api/v1/manager/members/stats; /api/v1/manager/members/trainers; /api/v1/manager/members/workouts. Existing values are preserved. The authoritative backend specification is not included, so backend runtime enforcement and contract compatibility remain `NOT_VERIFIED`.

## 5. Schema and Types
Source schema artifacts migrated into `schemas/`: manager_members_directory_entity.schemas.ts, manager_members_directory_form.schemas.ts, manager_members_directory_renew_form.schemas.ts, manager_members_directory.schemas.ts. Types are leaf-owned in `types/`. Retain existing public shape and avoid inferring fields not present in code/fixtures.

## 6. Query Key Registry
All existing query-key constants are leaf-owned under `constants/` and are preserved from the source snapshot. Do not rename key values during migration; key values are runtime cache contracts even when constant identifiers are renamed for leaf ownership.

## 7. Mutation Inventory
The prior root feature map and API client provide the current mutation inventory. Existing API verbs and payload mapping are preserved. No new backend CRUD capability is inferred by the migration.

Current mutation contract clarification: renewal is orchestrated by the member hook as a member update followed by payment recording; trainer assignment follows the current member hook/API payload path. Documentation does not promise a dedicated renewal or trainer-assignment endpoint unless it is explicitly present in the route/API registry.

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
Source tests migrated: 27 in the earlier migration inventory. The current physical test tree contains 29 `*.test.ts` / `*.test.tsx` files plus 2 harness support files (31 files total). Current test files include: ManagerMembersDirectoryApiContract.test.ts, ManagerMembersDirectoryBehavior.test.tsx, ManagerMembersDirectoryCalculateMemberExpiryDate.test.ts, ManagerMembersDirectoryCalculatePriceForCycle.test.ts, ManagerMembersDirectoryDataContract.test.ts, ManagerMembersDirectoryDateFormatters.test.ts, ManagerMembersDirectoryExportUtils.test.ts, ManagerMembersDirectoryFormatters.test.ts, ManagerMembersDirectoryFormattersAndDefaults.test.ts, ManagerMembersDirectoryQueryKeys.test.ts, ManagerMembersDirectoryUiConstants.test.ts, MANAGER_MEMBERS_DIRECTORY_ROUTES.test.ts, ManagerMembersDirectoryUrlContract.test.ts, ManagerMembersDirectoryViewConstants.test.ts, useManagerMembersDirectoryCoreMutations.test.ts, useManagerMembersDirectoryDietPlansQuery.test.ts, useManagerMembersDirectoryLogic.test.ts, useManagerMembersDirectoryModalForm.test.ts, useManagerMembersDirectoryMutations.test.ts, useManagerMembersDirectoryPrintLogic.test.ts (list truncated). New source scenario-catalog coverage checks the required mock state catalog. Host Vitest execution is `NOT_VERIFIED`.

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
The leaf includes `contracts/host-stubs.d.ts`, `tests/harness/ManagerMembersDirectoryHarness.tsx`, and `tests/harness/bootstrap.tsx`. The source overlay does not include a host package manifest, lockfile, TypeScript project config, or dependencies. Integrate the leaf into the host project and run its installed Vitest/TypeScript/build/browser commands; no standalone execution claim is made here.

## 22. Module Portability, Host Integration and Version History
The leaf owns code under standard category folders and has a canonical route/API config. Host stubs are declarations for isolated testing only and must not substitute for production host modules. RBG20+ carries out source moves in bounded, separately checkpointed batches. Live runtime verification remains `NOT_VERIFIED_HOST_RUNTIME`.

## Source-Derived Feature Inventory and User Flows

The following inventory and flow descriptions are retained from the source documentation. Legacy directory listings are excluded because the physical ownership structure is now the canonical leaf tree.

---

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchMembers | `/manager/members` | Uses the fetchMembers workflow with typed request/response handling. | `GET /manager/members` | ✅ Implemented |
| fetchMemberById | `/manager/members` | Uses the fetchMemberById workflow with typed request/response handling. | `GET /manager/members/:id` | ✅ Implemented |
| fetchMemberStats | `/manager/members` | Uses the fetchMemberStats workflow with typed request/response handling. | `GET /manager/members/stats` | ✅ Implemented |
| createMember | `/manager/members` | Uses the createMember workflow with typed request/response handling. | `POST /manager/members` | ✅ Implemented |
| updateMember | `/manager/members` | Uses the updateMember workflow with typed request/response handling. | `PATCH /manager/members/:id` | ✅ Implemented |
| deleteMember | `/manager/members` | Uses the deleteMember workflow with typed request/response handling. | `DELETE /manager/members/:id` | ✅ Implemented |
| membership renewal workflow (member update followed by payment recording) | `/manager/members` | Uses the membership renewal workflow (member update followed by payment recording) workflow with typed request/response handling. | `POST /manager/members/:id/renew` | ✅ Implemented |
| exportMembersReport | `/manager/members` | Uses the exportMembersReport workflow with typed request/response handling. | `GET /manager/members/export` | ✅ Implemented |
| fetchMemberTrainers | `/manager/members` | Uses the fetchMemberTrainers workflow with typed request/response handling. | `GET /manager/members/trainers` | ✅ Implemented |
| fetchMemberPlans | `/manager/members` | Uses the fetchMemberPlans workflow with typed request/response handling. | `GET /manager/members/plans` | ✅ Implemented |
| fetchMemberPayments | `/manager/members` | Uses the fetchMemberPayments workflow with typed request/response handling. | `GET /manager/members/:memberId/payments` | ✅ Implemented |
| createMemberPayment | `/manager/members` | Uses the createMemberPayment workflow with typed request/response handling. | `POST /manager/members/:memberId/payments` | ✅ Implemented |
| fetchMemberAttendance | `/manager/members` | Uses the fetchMemberAttendance workflow with typed request/response handling. | `GET /manager/members/:memberId/attendance` | ✅ Implemented |
| fetchMemberDietPlans | `/manager/members` | Uses the fetchMemberDietPlans workflow with typed request/response handling. | `GET /manager/members/diet-plans` | ✅ Implemented |
| assignDietPlan | `/manager/members` | Uses the assignDietPlan workflow with typed request/response handling. | `POST /manager/members/:memberId/diet-plans` | ✅ Implemented |
| fetchMemberWorkouts | `/manager/members` | Uses the fetchMemberWorkouts workflow with typed request/response handling. | `GET /manager/members/workouts` | ✅ Implemented |
| assignWorkout | `/manager/members` | Uses the assignWorkout workflow with typed request/response handling. | `POST /manager/members/:memberId/workouts` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Browse members
1. Search, status, gender, plan, expiry and sort state are represented in URL/UI state.
2. The debounced search and all filters become the server query parameters.
3. MSW applies those parameters to the member fixture and returns page/total.
4. The table renders the response and KPI filters can narrow the view through the same server-backed state.
### Flow 2: Create and manage member
1. Manager opens the RHF + Zod member form.
2. The validated payload is submitted through createMember/updateMember.
3. On success the authoritative Member response updates the member query cache and backend message is displayed.
4. Renewal/payment/assignment actions use their dedicated API operations and confirmation rules.


## Ownership and decomposition note
The current directory remains a large feature boundary. This checkpoint corrects its documented active hook/API flows; splitting the existing submodule into independent operational features requires a separately reviewed ownership and route migration plan and is not performed as a single-file repair.
