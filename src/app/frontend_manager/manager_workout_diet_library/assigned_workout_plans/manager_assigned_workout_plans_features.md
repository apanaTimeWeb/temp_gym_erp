---
role: manager
domain_root: manager_workout
submodule: assigned_workout_plans
route: /frontend_manager/manager_workout_diet_library/assigned_workout_plans
source_status: structurally-separated-source-host-runtime-not-verified
---

# Assigned Workout Plans — Autonomous Sub-Module

## 1. Module Purpose
Review workout plans assigned to members and their assignment metadata. The module owns its presentation, state, API/query boundary, schemas, types, mock contract, tests and documentation. It does not import from sibling business submodules.

Module root: `frontend_manager/manager_workout/assigned_workout_plans/`.

## 2. Domain Lifecycle and User Flows
Read assigned workout-plan rows with explicit loading, error, and empty behavior. The assignment screen is read-only in the supplied source.

## 3. Route and Navigation Contract
- Autonomous route: `/frontend_manager/manager_workout_diet_library/assigned_workout_plans`.
- The submodule is a direct child of the `manager_workout` domain root.
- Any query-string state within this route remains owned by the local route/config and hooks.

## 4. API Architecture
The module-local `config/` and `api/` source preserve the endpoint literals from the supplied source. Backend behavior, permissions and aggregate contracts are not available in this role overlay and remain `NOT_VERIFIED`.

## 5. Schema and Types
Request/response schemas and TypeScript types are kept in local `schemas/` and `types/`. Changes to API payloads require authoritative contract evidence and regression tests.

## 6. Query Key Registry
Query key definitions are copied into this leaf and remain leaf-local. Cache key string values are treated as compatibility contracts; do not change them without an explicit migration.

## 7. Mutation Inventory
Only mutations present in the source API/hooks are represented. Client-side confirmation or visibility is not treated as server authorization.

## 8. Permissions and Role Rules
This is Manager role source. The ZIP does not contain backend authorization or tenant isolation enforcement, so server-side permission guarantees remain `NOT_VERIFIED`.

## 9. State Ownership
UI state and URL state are owned by this submodule. Query/cache state uses local query hooks. Sibling submodules must not import this module's state, hooks, fixtures or types.

## 10. Offline and Reconnect Behavior
Preserve the existing loading, retry and recovery behavior. Offline/reconnect guarantees have not been verified against a live backend.

## 11. Security and PII Rules
Do not place sensitive member/staff/contact data in URL parameters, logs or telemetry. Preserve input validation and do not infer backend permission guarantees from UI behavior.

## 12. Accessibility Requirements
Keep semantic controls, labelled inputs, keyboard access, focus-visible affordances, and clear loading/error/empty states. axe, keyboard, reduced-motion and 200% zoom checks require the host runtime and remain `NOT_VERIFIED`.

## 13. Background Tasks
No new scheduled/background task is introduced by this structural split. Existing automation behavior is represented only where source provides it.

## 14. Feature Flags
No new feature flags are invented. Existing flags and runtime configuration remain unchanged where present.

## 15. Cache Invalidation
Mutations retain the source invalidation intent and local query keys. Verify real API transaction consistency after host/backend integration.

## 16. Migration and Rollback
The previous multi-workflow leaf was separated into direct-child sibling leaves. This leaf contains its own code and support artifacts; sibling imports are prohibited. Rollback requires restoring the prior source snapshot and routes together.

## 17. Test Coverage Map
Workflow-focused test files are stored in `tests/`, with the leaf harness under `tests/harness/`. Host Vitest execution is `NOT_VERIFIED` because the host package manifest and dependencies were not part of the archive.

## 18. Architecture Exceptions
Dependencies that remain broad in the source copy are duplicated locally rather than imported from a sibling. Follow-up narrowing of any omnibus API/hooks must preserve behavior and cannot introduce cross-leaf imports.

## 19. Known Contract Gaps
Host package/configuration, live backend schema/authorization, browser route behavior and full end-to-end behavior are not included in the source overlay and remain `NOT_VERIFIED`.

## 20. Rule Compliance Checklist
- [x] Direct-child leaf route and route boundaries are present.
- [x] Source files are local to this sibling; no business sibling imports are introduced.
- [x] Canonical category folders are present.
- [x] Documentation trio, host stubs and isolated test bootstrap are present.
- [ ] Host typecheck, test, build, browser and accessibility execution: `NOT_VERIFIED`.

## 21. Standalone Run, Mock and Test Harness
The leaf includes `contracts/host-stubs.d.ts` and `tests/harness/bootstrap.tsx`. Run the host's installed Vitest/TypeScript/build/browser commands after integrating the overlay; no host-runtime pass is claimed.

## 22. Module Portability, Host Integration and Version History
This autonomous leaf is intended to be independently auditable and removable without sibling import breakage. The received ZIP is a role overlay; host integration and backend verification remain outstanding.

## V28 API ownership boundary (RBG-35–RBG-50)

Read-only assignment records plus workout/exercise reference lists. Assignment workflows do not mutate the exercise library or workout catalogue.
