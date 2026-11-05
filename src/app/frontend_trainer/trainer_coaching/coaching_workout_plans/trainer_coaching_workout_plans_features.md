---
schema_version: '2.11'
role: trainer
domain: trainer_coaching
submodule: coaching_workout_plans
mode: B_AUDIT_REPAIR
baseline: frontend-trainer-v19.zip
status: SOURCE_REPAIRED_V20_RUNTIME_NOT_VERIFIED
contract_source: frontend-trainer-v6-PARTIAL-rbg10.zip
---

# Trainer Coaching — Workout Plans

## 1. Purpose

Workout plan browse, create, update, delete, assignment fields, workout exercises within an authored plan and existing member-facing plan form.

## 2. Owners and Scope

Owner: `trainer_coaching/coaching_workout_plans`. This autonomous leaf owns only its documented business capability. Stage: SOURCE_FIX_STAGED_RBG_16_20.

## 3. User Stories
- As an authenticated trainer, browse workout plans and use the available search/category filters and pagination to locate a plan.
- Create or edit a workout plan using its documented fields (including name, level, days, focus, duration, goal, assignment, dates, notes, and selected exercises); field validation is surfaced in the form.
- Delete a plan through the existing confirmation flow and reconcile the workout-plan list; exercise-library management remains the separately routed Exercise Management capability.

## 4. Routes and Navigation
Canonical UI route: `/frontend_trainer/trainer_coaching/coaching_workout_plans`. This leaf owns the route entry and is listed in `CANONICAL_ROUTE_MANIFEST.json`. No removed legacy `/trainer/...` UI route or compatibility adapter is shipped or claimed by this role archive. Host menus, bookmarks, and authentication callbacks must target the canonical route; any inbound redirect is a separate host-owned decision and is not asserted here. Backend `/trainer/...` API endpoints are independent contracts and remain unchanged.

## 5. Entities and Aggregate

TrainerWorkoutWorkoutSchema, TrainerWorkoutWorkoutExerciseSchema, create/update workout DTO and existing level/day validation.

## 6. Permissions and Tenant Boundary

Only trainer-authorized records may be shown. No tenant or branch context is invented. Server-side permissions, gymId/branchId enforcement, and actual token scopes require host verification.

## 7. API Contracts

Existing GET/POST /trainer/trainer_workout/workouts and PATCH/DELETE /trainer/trainer_workout/workouts/:id. The original combined API module still includes exercise methods used in existing test assertions; splitting those unused methods is an open deduplication gate.

## 8. Types and Response Shapes

Contracts mirror the original source TypeScript/Zod declarations. Expected generic ApiResponse<T> host envelope is described in Architecture V1; actual host requestId and error mapping are NOT_VERIFIED.

## 9. Data Queries and Cache

Own plan query hooks, local Zustand modal/selection state, url filters and mutation invalidations. Workout content does not import sibling exercise module. The role navigation shell links to the two separate canonical leaf routes; no combined legacy router is shipped.

## 10. URL and Filter State

Search, page, selected record and view URL state are retained where implemented. Query param handling must not invent backend enum values.

## 11. UI Composition

Semantic Tailwind v4 design tokens only; dedicated components, hooks, schemas, mocks and local state. Original interaction test IDs and canonical leaf boundaries remain preserved.

## 12. Forms and Validation

Workout modal uses RHF+Zod, date validation, idempotency, unsaved navigation guard and typed error messaging from existing code.

## 13. Actions and Mutations

No functional control may be removed or replaced with console-only feedback. Existing mutation idempotency and query invalidation are preserved where present.

## 14. Loading Empty Error and Not Found

Canonical leaf page + loading + error + not-found files are physically present; complete browser recovery and offline flow NOT_VERIFIED.

## 15. Accessibility and Responsive

WCAG 2.2 AA, keyboard focus, 44px minimum targets, reduced motion and 320px responsiveness are mandatory. Browser-level assertions remain DEFERRED_TO_HOST_RUNTIME.

## 16. Localization and Formatting

Original EN/HI locale values retained or copied module-locally; host next-intl merge and full message-namespace parity require host integration testing.

## 17. Security Privacy and Logging

Never persist member or plan business entities to localStorage, use unverified backend privileges, log private notes or expose client secrets.

## 18. Tests and Regressions

Original Workout API/contract/store/UI tests are retained; canonical route host mounting/authentication remains a host-runtime verification item.

## 19. Dependency Manifest and Boundary

No direct sibling exercise imports within the plan leaf. Exercise Management is a separate canonical route and no combined legacy UI route adapter is shipped.

### Post-v10 isolated primitive ownership (source-verified)
This submodule owns its copied generic UI/hooks/types dependencies under its local `components/`, `hooks/`, `api/`, `schemas/`, `state/`, `types/` and `utils/` folders. These are WET-local copies of the formerly role-wide `trainer_infrastructure` helpers. Other business leaves are not imported. Where local confirmation or realtime hooks are consumed, a route-local `layout.tsx` provides matching contexts; the role shell retains shared contexts for canonical role navigation; no legacy UI route adapter is claimed. This is a source-verified dependency claim, NOT a standalone TypeScript or browser-runtime pass. Backend business operations and URL config are retained from v10. Host package/API/auth/tenant integration remains not verified.

## 20. Standalone Run and Mock Harness

Canonical module-owned scenario registry: `mocks/scenarios/trainer_coaching_coaching_workout_plans.scenarios.ts`. It exposes `ACTIVE_RECORDS`, `EMPTY_DATA`, `SERVER_500_ERROR`, `NETWORK_TIMEOUT` (15,000 ms), `UNAUTHORIZED_401`, and `FORBIDDEN_403`; the harness bootstrap re-exports its typed factory. Apply one handler to the module's existing MSW server using the leaf's existing GET URL and a schema-shaped fixture. Runtime execution remains `DEFERRED_TO_HOST_RUNTIME` because this source package intentionally excludes the host dependency manifest and installed runner.


Original mutable MSW Workout data/handlers, IDs, pagination, idempotency results and tests moved under module-local mocks/handlers.

## 21. Portability Guide

Copy this leaf with its local schemas, UI, mocks, tests, URL config and contracts/host-stubs.d.ts into a compatible Next.js App Router host. Provide approved core infrastructure, next-intl and module-local mock runtime; execute local typecheck, Vitest and Playwright. A runnable isolated test harness is NOT_VERIFIED without installed host dependencies.

## 22. Verification and Definition of Done

Status SOURCE_FIX_STAGED_RBG_16_20 (not certified complete). Static import closure is independently checked. Remaining gates: full typecheck, actual Vitest/Playwright, host API/permission confirmation, design/a11y browser inspection, and all 53 RBG closure verification.

### V12 localization ownership verification
Both English and Hindi leaf resources include verbatim `TRAINER_INFRASTRUCTURE` and `TRAINER_SHELL` namespaces from the supplied role locale source. This supports standalone translation resolution; host `next-intl` locale aggregation is still NOT_VERIFIED.

### v15 — Deterministic mutation mock replay

The module-owned MSW mutation handlers replay successful responses scoped by HTTP method, URL and supplied `Idempotency-Key`. Parallel requests with the same key share one in-flight result; failed responses can be retried; requests without a key retain the original mock behavior. The implementation is self-contained in `mocks/utils/TrainerCoachingWorkoutPlansIdempotentMockResponse.ts`, with an exported reset function for isolated tests. Backend API URL contracts and response shapes are unchanged. This is offline mock behavior only, not a claim about backend idempotency enforcement.

## URL Constant Ownership and Alias Map

This leaf participates in the **Workout URL constants** family. The owning leaf is `coaching_workout_plans`; the sibling leaf is `coaching_exercise_management`. The duplicate exported identifiers are module-local URL-config declarations, not a shared cross-leaf runtime API. This map records semantic ownership only; it does not create new exports or change endpoint values.

| Concern | Canonical owner | Sibling leaf | Preserved values |
|---|---|---|---|
| UI routes | `coaching_workout_plans` | `coaching_exercise_management` | `/frontend_trainer/trainer_coaching/coaching_workout_plans; /frontend_trainer/trainer_coaching/coaching_exercise_management` |
| Backend API paths | `coaching_workout_plans` | `coaching_exercise_management` | `/trainer/workout; /trainer/trainer_workout/workouts; /trainer/trainer_workout/exercises` |

All UI navigation targets the canonical `/frontend_trainer/...` routes above. The `/trainer/...` values in the backend row are API contracts, not public UI routes, and remain byte-for-byte unchanged. No route restoration, redirect, endpoint rename, or backend contract change is included in this documentation repair.

## V20 Final Source Repair Addendum — 2026-11-01

- Approved source repair groups RBG 1–18 are complete. The global TSX inventory contains zero `focus-visible:ring-primary` occurrences; the dedicated `focus-visible:ring-focus-ring` token is used for focus indicators.
- This leaf includes its module-owned typed MSW scenario registry, registration test, accessible scenario selector, and isolated QueryClient/MSW harness. The harness accepts host-owned session/theme providers instead of inventing host auth or theme behavior.
- The role-wide static source sweep completed with zero TypeScript/TSX syntax parse diagnostics. This leaf's semantic typecheck, Vitest execution, browser/Playwright, accessibility, responsive, backend authorization, and tenant-isolation checks remain `DEFERRED_TO_HOST_RUNTIME` because those host services/configurations are not part of this feature source archive.
- Open external blockers remain ISSUE-005 (Members route documentation conflict) and ISSUE-033 (Earnings pagination response contract); they do not change this leaf's local route or API contracts.
- This feature folder is a portable source module, not a standalone Next.js host application. See the role-root `INTEGRATION_GUIDE.md` for the precise host contracts and release qualifications.
