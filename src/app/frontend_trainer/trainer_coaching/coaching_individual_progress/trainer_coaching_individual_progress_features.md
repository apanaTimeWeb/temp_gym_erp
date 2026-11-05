---
schema_version: "2.11"
role: trainer
domain: trainer_coaching
submodule: coaching_individual_progress
mode: B_AUDIT_REPAIR
baseline: frontend-trainer-v19.zip
status: SOURCE_REPAIRED_V20_RUNTIME_NOT_VERIFIED
source: frontend-trainer-v8-PARTIAL-rbg30.zip
---

# Trainer Coaching Individual Progress — Autonomous Feature Contract

## 1. Purpose
Individual progress tracking and entry management. Preserves existing implementation from `trainer_progress_tracking/`.

## 2. Owners and Scope
Owner: `src/app/frontend_trainer/trainer_coaching/coaching_individual_progress/`. No child feature-submodule. Route entries and code live inside this leaf.

## 3. User Stories
- As an authenticated trainer, select a member and review that member's progress summary, chart, comparison widgets, and paginated/sortable progress-entry history.
- Add, edit, or delete a progress entry through the module's entry modal, using the documented measurement/date fields and confirmation safeguards; reconcile the selected member's summary and history after a successful mutation.
- When the member has no entries or a query fails, show the module-owned empty/error state and allow the relevant query to be retried without silently substituting fabricated historical measurements.

## 4. Routes and Navigation
Canonical UI route: `/frontend_trainer/trainer_coaching/coaching_individual_progress`. This leaf owns the route entry and is listed in `CANONICAL_ROUTE_MANIFEST.json`. No removed legacy `/trainer/...` UI route or compatibility adapter is shipped or claimed by this role archive. Host menus, bookmarks, and authentication callbacks must target the canonical route; any inbound redirect is a separate host-owned decision and is not asserted here. Backend `/trainer/...` API endpoints are independent contracts and remain unchanged.

## 5. Entities and Aggregate
Only source-declared entity/DTO schemas from `schemas/TrainerCoachingIndividualProgressProgressTrackingEntriesResponseSchema.ts, schemas/TrainerCoachingIndividualProgressProgressTrackingDomainSchemas.ts` are authoritative.

## 6. Permissions and Tenant Boundary
Host `TrainerInfrastructureRoleGuard` and backend authorization remain in force. Tenant authority requires host/API confirmation; never fabricate role grants.

## 7. API Contracts
API file evidence: api/TrainerCoachingIndividualProgressProgressTrackingApi.ts. Owning URL config: `config/trainer_coaching_individual_progress.url_config.ts`. Never create guessed endpoints.

## 8. Types and Response Shapes
TypeScript entity contracts retained from legacy code under `types/`; runtime Zod sources retained under `schemas/` where present.

## 9. Data Queries and Cache
TanStack Query v5 owns server state; client-only UI state remains module-local. Required UI helpers were copied into this leaf; no direct role-wide infrastructure or sibling business imports remain in the canonical leaf.

## 10. URL and Filter State
Canonical route: `/frontend_trainer/trainer_coaching/coaching_individual_progress`. Query parameters are limited to those defined in this leaf’s URL config and documented above; host navigation should link to this canonical route. Host redirects are outside the supplied role archive and are not implied by this feature contract.

## 11. UI Composition
Real component sources: TrainerCoachingIndividualProgressProgressTrackingChart.tsx, TrainerCoachingIndividualProgressProgressTrackingComparisonChart.tsx, TrainerCoachingIndividualProgressProgressTrackingComparisonDelta.tsx, TrainerCoachingIndividualProgressProgressTrackingComparisonTable.tsx, TrainerCoachingIndividualProgressProgressTrackingComparisonView.tsx, TrainerCoachingIndividualProgressProgressTrackingEmptyState.tsx, TrainerCoachingIndividualProgressProgressTrackingIndividualView.tsx, TrainerCoachingIndividualProgressProgressTrackingLoadingSkeleton.tsx, TrainerCoachingIndividualProgressProgressTrackingMain.tsx, TrainerCoachingIndividualProgressProgressTrackingMemberSelector.tsx, TrainerCoachingIndividualProgressProgressTrackingModal.tsx, TrainerCoachingIndividualProgressProgressTrackingNotFoundView.tsx, TrainerCoachingIndividualProgressProgressTrackingSortDirectionIcon.tsx, TrainerCoachingIndividualProgressProgressTrackingTable.tsx.

## 12. Forms and Validation
Preserve existing RHF/Zod workflows where found; backend 400 mapping requires verified host API behavior. No feature removal.

## 13. Actions and Mutations
Actions from source API/hooks remain; mutation idempotency expected and must be verified with host transport in integration.

## 14. Loading Empty Error and Not Found
Leaf `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` exist; UI-level error/empty handling inherited where implemented.

## 15. Accessibility and Responsive
Semantic Tailwind tokens, keyboard/focus rules, ≥44px touch targets and WCAG 2.2 AA required; full assistive/browser audit pending.

## 16. Localization and Formatting
Existing EN/HI locale resources copied when supplied. Host namespace registration needs confirmation.

## 17. Security Privacy and Logging
Do not persist business data in localStorage or leak auth/tenant/PII; isolated security scan required before release.

## 18. Tests and Regressions
Tests in leaf: tests/useTrainerCoachingIndividualProgressProgressTrackingFilters.test.ts, tests/TrainerCoachingIndividualProgressProgressTrackingRouteStates.test.tsx, tests/TrainerCoachingIndividualProgressProgressTrackingDomainSchemas.test.ts, tests/useTrainerCoachingIndividualProgressProgressTrackingMutations.test.ts, tests/TrainerCoachingIndividualProgressProgressTrackingDisplayFormatters.test.ts, tests/useTrainerCoachingIndividualProgressProgressTrackingQuery.test.ts, tests/TrainerCoachingIndividualProgressProgressTrackingConstants.test.ts, tests/TrainerCoachingIndividualProgressProgressTrackingViewUrlUtils.test.ts, tests/useTrainerCoachingIndividualProgressProgressTrackingStore.test.ts, tests/TrainerCoachingIndividualProgressProgressTrackingApiBehavior.test.ts, tests/TrainerCoachingIndividualProgressProgressTrackingMainBehavior.test.tsx, tests/useTrainerCoachingIndividualProgressProgressTrackingMain.test.ts, tests/useTrainerCoachingIndividualProgressProgressTrackingComparisonQueries.test.ts, tests/TrainerCoachingIndividualProgressProgressTrackingComparisonSnapshotBuilder.test.ts; new Playwright routing tests included at role ZIP level. Execution not claimed.

## 19. Dependency Manifest and Boundary
No sibling-leaf or role-wide infrastructure imports are present in this canonical leaf per v11 static dependency scan. Host API, authorization, locale aggregation and runtime integration still require verification.

### Post-v10 isolated primitive ownership (source-verified)
This submodule owns its copied generic UI/hooks/types dependencies under its local `components/`, `hooks/`, `api/`, `schemas/`, `state/`, `types/` and `utils/` folders. These are WET-local copies of the formerly role-wide `trainer_infrastructure` helpers. Other business leaves are not imported. Where local confirmation or realtime hooks are consumed, a route-local `layout.tsx` provides matching contexts; the role shell retains shared contexts for canonical role navigation; no legacy UI route adapter is claimed. This is a source-verified dependency claim, NOT a standalone TypeScript or browser-runtime pass. Backend business operations and URL config are retained from v10. Host package/API/auth/tenant integration remains not verified.

## 20. Standalone Run and Mock Harness

Canonical module-owned scenario registry: `mocks/scenarios/trainer_coaching_coaching_individual_progress.scenarios.ts`. It exposes `ACTIVE_RECORDS`, `EMPTY_DATA`, `SERVER_500_ERROR`, `NETWORK_TIMEOUT` (15,000 ms), `UNAUTHORIZED_401`, and `FORBIDDEN_403`; the harness bootstrap re-exports its typed factory. Apply one handler to the module's existing MSW server using the leaf's existing GET URL and a schema-shaped fixture. Runtime execution remains `DEFERRED_TO_HOST_RUNTIME` because this source package intentionally excludes the host dependency manifest and installed runner.

`tests/harness/bootstrap.ts` and `contracts/host-stubs.d.ts` exist. Standalone compilation is NOT VERIFIED until installing an isolated npm harness and running tests.

## 21. Portability Guide
Copy only this leaf into a compatible Next.js App Router host; map @/* to src/*; wire approved API, auth, i18n, MSW and logger adapters. Run `npm ci`, `tsc --noEmit`, `vitest run`, Playwright and `npm run build`.

## 22. Verification and Definition of Done
RBG 31–34 source migration staged. Static syntax/import/sibling checks run separately and linked in delivery manifest. Full host typecheck, tests, auth and WCAG remain NOT_VERIFIED.

## Post-v9 Source Closure — v10
Individual-only page composes the member selector, progress chart/table and entry modal. Comparison is not rendered. `useTrainerProgressTrackingMain({enableComparison:false})` suppresses comparison queries. The comparison capability is owned by its separate canonical leaf.
Primary dedicated screen: `components/TrainerCoachingIndividualProgressMain.tsx`. The canonical route renders this leaf-owned capability; no legacy multi-tab UI route adapter is shipped. Strict role-infrastructure isolation and host runtime tests remain outstanding; do NOT mark release-complete.

### V12 localization ownership verification
Both English and Hindi leaf resources include verbatim `TRAINER_INFRASTRUCTURE` and `TRAINER_SHELL` namespaces from the supplied role locale source. This supports standalone translation resolution; host `next-intl` locale aggregation is still NOT_VERIFIED.

### v15 — Deterministic mutation mock replay

The module-owned MSW mutation handlers replay successful responses scoped by HTTP method, URL and supplied `Idempotency-Key`. Parallel requests with the same key share one in-flight result; failed responses can be retried; requests without a key retain the original mock behavior. The implementation is self-contained in `mocks/utils/TrainerCoachingIndividualProgressIdempotentMockResponse.ts`, with an exported reset function for isolated tests. Backend API URL contracts and response shapes are unchanged. This is offline mock behavior only, not a claim about backend idempotency enforcement.

## URL Constant Ownership and Alias Map

This leaf participates in the **Progress-tracking URL constants** family. The owning leaf is `coaching_individual_progress`; the sibling leaf is `coaching_progress_comparison`. The duplicate exported identifiers are module-local URL-config declarations, not a shared cross-leaf runtime API. This map records semantic ownership only; it does not create new exports or change endpoint values.

| Concern | Canonical owner | Sibling leaf | Preserved values |
|---|---|---|---|
| UI routes | `coaching_individual_progress` | `coaching_progress_comparison` | `/frontend_trainer/trainer_coaching/coaching_individual_progress; /frontend_trainer/trainer_coaching/coaching_progress_comparison` |
| Backend API paths | `coaching_individual_progress` | `coaching_progress_comparison` | `/trainer/trainer_progress_tracking/*` |

All UI navigation targets the canonical `/frontend_trainer/...` routes above. The `/trainer/...` values in the backend row are API contracts, not public UI routes, and remain byte-for-byte unchanged. No route restoration, redirect, endpoint rename, or backend contract change is included in this documentation repair.

## V20 Final Source Repair Addendum — 2026-11-01

- Approved source repair groups RBG 1–18 are complete. The global TSX inventory contains zero `focus-visible:ring-primary` occurrences; the dedicated `focus-visible:ring-focus-ring` token is used for focus indicators.
- This leaf includes its module-owned typed MSW scenario registry, registration test, accessible scenario selector, and isolated QueryClient/MSW harness. The harness accepts host-owned session/theme providers instead of inventing host auth or theme behavior.
- The role-wide static source sweep completed with zero TypeScript/TSX syntax parse diagnostics. This leaf's semantic typecheck, Vitest execution, browser/Playwright, accessibility, responsive, backend authorization, and tenant-isolation checks remain `DEFERRED_TO_HOST_RUNTIME` because those host services/configurations are not part of this feature source archive.
- Open external blockers remain ISSUE-005 (Members route documentation conflict) and ISSUE-033 (Earnings pagination response contract); they do not change this leaf's local route or API contracts.
- This feature folder is a portable source module, not a standalone Next.js host application. See the role-root `INTEGRATION_GUIDE.md` for the precise host contracts and release qualifications.
