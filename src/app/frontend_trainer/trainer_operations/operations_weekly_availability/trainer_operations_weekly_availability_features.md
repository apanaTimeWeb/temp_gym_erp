---
schema_version: "2.11"
role: trainer
domain: trainer_operations
submodule: operations_weekly_availability
mode: B_AUDIT_REPAIR
baseline: frontend-trainer-v19.zip
status: SOURCE_REPAIRED_V20_RUNTIME_NOT_VERIFIED
source: frontend-trainer-v8-PARTIAL-rbg30.zip
---

# Trainer Operations Weekly Availability — Autonomous Feature Contract

## 1. Purpose
Weekly trainer availability. Owns recurring weekly availability only. Leave requests are exclusively owned by the sibling `operations_leave_requests` leaf.

## 2. Owners and Scope
Owner: `src/app/frontend_trainer/trainer_operations/operations_weekly_availability/`. No child feature-submodule. Route entries and code live inside this leaf.

## 3. User Stories
- As an authenticated trainer, open the weekly-availability route and review the recurring weekly schedule editor and its current saved availability.
- Change the documented weekly availability values and submit the schedule update; retain validation and mutation feedback and refresh the schedule query after success.
- Leave requests are owned by the sibling `operations_leave_requests` route; this canonical weekly-availability page does not claim the sibling leave-request workflow.

## 4. Routes and Navigation
Canonical UI route: `/frontend_trainer/trainer_operations/operations_weekly_availability`. This leaf owns the route entry and is listed in `CANONICAL_ROUTE_MANIFEST.json`. No removed legacy `/trainer/...` UI route or compatibility adapter is shipped or claimed by this role archive. Host menus, bookmarks, and authentication callbacks must target the canonical route; any inbound redirect is a separate host-owned decision and is not asserted here. Backend `/trainer/...` API endpoints are independent contracts and remain unchanged.

## 5. Entities and Aggregate
Only source-declared entity/DTO schemas from `schemas/TrainerOperationsWeeklyAvailabilityScheduleDomainSchemas.ts` are authoritative.

## 6. Permissions and Tenant Boundary
Host `TrainerInfrastructureRoleGuard` and backend authorization remain in force. Tenant authority requires host/API confirmation; never fabricate role grants.

## 7. API Contracts
API file evidence: api/TrainerOperationsWeeklyAvailabilityScheduleApi.ts. Owning URL config: `config/trainer_operations_weekly_availability.url_config.ts`. Never create guessed endpoints.

## 8. Types and Response Shapes
TypeScript entity contracts retained from legacy code under `types/`; runtime Zod sources retained under `schemas/` where present.

## 9. Data Queries and Cache
TanStack Query v5 owns server state; client-only UI state remains module-local. Required UI helpers were copied into this leaf; no direct role-wide infrastructure or sibling business imports remain in the canonical leaf.

## 10. URL and Filter State
Canonical route: `/frontend_trainer/trainer_operations/operations_weekly_availability`. Query parameters are limited to those defined in this leaf’s URL config and documented above; host navigation should link to this canonical route. Host redirects are outside the supplied role archive and are not implied by this feature contract.

## 11. UI Composition
Real component sources: TrainerOperationsWeeklyAvailabilityMain.tsx, TrainerOperationsWeeklyAvailabilityScheduleEmptyState.tsx, TrainerOperationsWeeklyAvailabilityScheduleLoadingSkeleton.tsx, TrainerOperationsWeeklyAvailabilityScheduleNotFoundView.tsx, TrainerOperationsWeeklyAvailabilityScheduleWeeklyAvailability.tsx. The dormant combined leave-request screen and its module-local duplicate mutation/UI artifacts are retired; sibling `operations_leave_requests` remains the sole leave-request owner.

## 12. Forms and Validation
Preserve existing RHF/Zod workflows where found; backend 400 mapping requires verified host API behavior. No feature removal.

## 13. Actions and Mutations
The only business mutation owned here is recurring availability update. Leave-request mutations are owned by `operations_leave_requests`; no leave-request endpoint or UI is exposed from this leaf.

## 14. Loading Empty Error and Not Found
Leaf `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` exist; UI-level error/empty handling inherited where implemented.

## 15. Accessibility and Responsive
Semantic Tailwind tokens, keyboard/focus rules, ≥44px touch targets and WCAG 2.2 AA required; full assistive/browser audit pending.

## 16. Localization and Formatting
Existing EN/HI locale resources copied when supplied. Host namespace registration needs confirmation.

## 17. Security Privacy and Logging
Do not persist business data in localStorage or leak auth/tenant/PII; isolated security scan required before release.

## 18. Tests and Regressions
Tests in leaf: tests/TrainerOperationsWeeklyAvailabilityScheduleDomainSchemas.test.ts, tests/TrainerOperationsWeeklyAvailabilityScheduleConstants.test.ts, tests/useTrainerOperationsWeeklyAvailabilityScheduleMutations.test.ts, tests/TrainerOperationsWeeklyAvailabilityScheduleViewUrlUtils.test.ts, tests/TrainerOperationsWeeklyAvailabilityScheduleRouteStates.test.tsx, tests/TrainerOperationsWeeklyAvailabilityScheduleApiBehavior.test.ts, tests/TrainerOperationsWeeklyAvailabilityScheduleRequestLeaveModalBehavior.test.tsx, tests/TrainerOperationsWeeklyAvailabilityScheduleMainBehavior.test.tsx, tests/TrainerOperationsWeeklyAvailabilityScheduleFormatDate.test.ts, tests/useTrainerOperationsWeeklyAvailabilityScheduleQuery.test.ts, tests/useTrainerOperationsWeeklyAvailabilityScheduleStore.test.ts; new Playwright routing tests included at role ZIP level. Execution not claimed.

## 19. Dependency Manifest and Boundary
No sibling-leaf or role-wide infrastructure imports are present in this canonical leaf per v11 static dependency scan. Host API, authorization, locale aggregation and runtime integration still require verification.

### Post-v10 isolated primitive ownership (source-verified)
This submodule owns its copied generic UI/hooks/types dependencies under its local `components/`, `hooks/`, `api/`, `schemas/`, `state/`, `types/` and `utils/` folders. These are WET-local copies of the formerly role-wide `trainer_infrastructure` helpers. Other business leaves are not imported. Where local confirmation or realtime hooks are consumed, a route-local `layout.tsx` provides matching contexts; the role shell retains shared contexts for canonical role navigation; no legacy UI route adapter is claimed. This is a source-verified dependency claim, NOT a standalone TypeScript or browser-runtime pass. Backend business operations and URL config are retained from v10. Host package/API/auth/tenant integration remains not verified.

## 20. Standalone Run and Mock Harness

Canonical module-owned scenario registry: `mocks/scenarios/trainer_operations_operations_weekly_availability.scenarios.ts`. It exposes `ACTIVE_RECORDS`, `EMPTY_DATA`, `SERVER_500_ERROR`, `NETWORK_TIMEOUT` (15,000 ms), `UNAUTHORIZED_401`, and `FORBIDDEN_403`; the harness bootstrap re-exports its typed factory. Apply one handler to the module's existing MSW server using the leaf's existing GET URL and a schema-shaped fixture. Runtime execution remains `DEFERRED_TO_HOST_RUNTIME` because this source package intentionally excludes the host dependency manifest and installed runner.

`tests/harness/bootstrap.ts` and `contracts/host-stubs.d.ts` exist. Standalone compilation is NOT VERIFIED until installing an isolated npm harness and running tests.

## 21. Portability Guide
Copy only this leaf into a compatible Next.js App Router host; map @/* to src/*; wire approved API, auth, i18n, MSW and logger adapters. Run `npm ci`, `tsc --noEmit`, `vitest run`, Playwright and `npm run build`.

## 22. Verification and Definition of Done
RBG 40–42 source migration staged. Static syntax/import/sibling checks run separately and linked in delivery manifest. Full host typecheck, tests, auth and WCAG remain NOT_VERIFIED.

## Post-v9 Source Closure — v10
Canonical Weekly Availability only renders the recurring schedule editor. Leave requests remain in their sibling leaf; the former combined legacy UI route is not part of the canonical route tree.
Primary dedicated screen: `components/TrainerOperationsWeeklyAvailabilityMain.tsx`. The canonical route renders this leaf-owned capability; no legacy multi-tab UI route adapter is shipped. Strict role-infrastructure isolation and host runtime tests remain outstanding; do NOT mark release-complete.

### V12 localization ownership verification
Both English and Hindi leaf resources include verbatim `TRAINER_INFRASTRUCTURE` and `TRAINER_SHELL` namespaces from the supplied role locale source. This supports standalone translation resolution; host `next-intl` locale aggregation is still NOT_VERIFIED.

### v15 — Deterministic mutation mock replay

The module-owned MSW mutation handlers replay successful responses scoped by HTTP method, URL and supplied `Idempotency-Key`. Parallel requests with the same key share one in-flight result; failed responses can be retried; requests without a key retain the original mock behavior. The implementation is self-contained in `mocks/utils/TrainerOperationsWeeklyAvailabilityIdempotentMockResponse.ts`, with an exported reset function for isolated tests. Backend API URL contracts and response shapes are unchanged. This is offline mock behavior only, not a claim about backend idempotency enforcement.

## URL Constant Ownership and Alias Map

This leaf participates in the **Schedule URL constants** family. The owning leaf is `operations_weekly_availability`; the sibling leaf is `operations_leave_requests`. The duplicate exported identifiers are module-local URL-config declarations, not a shared cross-leaf runtime API. This map records semantic ownership only; it does not create new exports or change endpoint values.

| Concern | Canonical owner | Sibling leaf | Preserved values |
|---|---|---|---|
| UI routes | `operations_weekly_availability` | `operations_leave_requests` | `/frontend_trainer/trainer_operations/operations_weekly_availability; /frontend_trainer/trainer_operations/operations_leave_requests` |
| Backend API paths | `operations_weekly_availability` | `operations_leave_requests` | `/trainer/schedule; /trainer/trainer_schedule/availability; /trainer/trainer_schedule/leaves` |

All UI navigation targets the canonical `/frontend_trainer/...` routes above. The `/trainer/...` values in the backend row are API contracts, not public UI routes, and remain byte-for-byte unchanged. No route restoration, redirect, endpoint rename, or backend contract change is included in this documentation repair.


## RBG 10 Ownership Reconciliation

The canonical route is availability-only. Dormant combined-tab and duplicate leave-request UI/test artifacts have been retired after repository-wide reference checks. The sibling `operations_leave_requests` leaf is preserved as the sole leave-request capability. Host runtime verification remains deferred.

## V20 Final Source Repair Addendum — 2026-11-01

- Approved source repair groups RBG 1–18 are complete. The global TSX inventory contains zero `focus-visible:ring-primary` occurrences; the dedicated `focus-visible:ring-focus-ring` token is used for focus indicators.
- This leaf includes its module-owned typed MSW scenario registry, registration test, accessible scenario selector, and isolated QueryClient/MSW harness. The harness accepts host-owned session/theme providers instead of inventing host auth or theme behavior.
- The role-wide static source sweep completed with zero TypeScript/TSX syntax parse diagnostics. This leaf's semantic typecheck, Vitest execution, browser/Playwright, accessibility, responsive, backend authorization, and tenant-isolation checks remain `DEFERRED_TO_HOST_RUNTIME` because those host services/configurations are not part of this feature source archive.
- Open external blockers remain ISSUE-005 (Members route documentation conflict) and ISSUE-033 (Earnings pagination response contract); they do not change this leaf's local route or API contracts.
- This feature folder is a portable source module, not a standalone Next.js host application. See the role-root `INTEGRATION_GUIDE.md` for the precise host contracts and release qualifications.
