---
schema_version: "2.11"
role: trainer
domain: trainer_coaching
submodule: coaching_diet_library_and_assignments
mode: B_AUDIT_REPAIR
baseline: frontend-trainer-v19.zip
status: SOURCE_REPAIRED_V20_RUNTIME_NOT_VERIFIED
source: frontend-trainer-v7-PARTIAL-rbg20.zip
---

# Trainer Coaching — Diet Library and Assignments

## 1. Purpose

Diet Library and Assignments, built by migrating the existing `trainer_library` source while preserving documented trainer workflows.

## 2. Owners and Scope

Owner `src/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/`. This is one cohesive secondary navigation feature (5-gate review): dialog operations remain inside this owning leaf.

## 3. User Stories
- As an authenticated trainer, browse the diet-plan collection, use the available tabs/search and pagination controls, and review the module's loading and empty states.
- Open the read-only diet-plan detail modal, then use its assignment action to choose an available member and assign the selected plan; the assignment mutation carries its idempotency key and refreshes the owning queries.
- If selection, validation, or the server request fails, retain actionable feedback and the existing dialog/confirmation recovery; this leaf does not claim diet-plan CRUD operations that are absent from its API.

## 4. Routes and Navigation
Canonical UI route: `/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments`. This leaf owns the route entry and is listed in `CANONICAL_ROUTE_MANIFEST.json`. No removed legacy `/trainer/...` UI route or compatibility adapter is shipped or claimed by this role archive. Host menus, bookmarks, and authentication callbacks must target the canonical route; any inbound redirect is a separate host-owned decision and is not asserted here. Backend `/trainer/...` API endpoints are independent contracts and remain unchanged.

## 5. Entities and Aggregate

Only entities, DTOs and enums actually declared in module-local `types/`, `schemas/`, and `config/` are recognized; see original source-derived specs.

## 6. Permissions and Tenant Boundary

Trainer authorization, gymId/branchId and server enforcement depend on verified host context. Do not place tenant context in request bodies; do not invent authorization claims.

## 7. API Contracts

Source-defined operations: diet-plans GET, trainer-visible assigned members GET, diet assignment PATCH. Exact URL strings and methods are preserved in `config/coaching_diet_library_and_assignments.url_config.ts` and `api/` files; never derive undocumented endpoints.

## 8. Types and Response Shapes

TypeScript types and runtime Zod parsing are defined under `types/` and `schemas/`; canonical ApiResponse<T> host envelope is subject to host verification.

## 9. Data Queries and Cache

TanStack Query v5 owns server data and cache invalidations. UI-only state remains local or feature-owned; no sibling feature imports permitted.

## 10. URL and Filter State

Preserve existing URL query parameters, selectors and pagination; no new query enum values or backend fields invented.

## 11. UI Composition

Components, hooks, API, schemas, config, mocks and tests are inside this leaf. Semantic Tailwind v4 theme classes and approved zero-business infrastructure are used.

## 12. Forms and Validation

Diet assign-member selection uses RHF v7+Zod. This feature does not own or claim session-scheduling/edit workflows. API 400 error map must be verified against actual backend.

## 13. Actions and Mutations

State-changing requests carry Idempotency-Key from existing hooks. Sessions mutable mock now suppresses repeated identical-key creates; mutation cache invalidation and visible user feedback retained.

## 14. Loading Empty Error and Not Found

Each leaf has an actual page, loading, error and not-found route entry, with no removed legacy UI route adapter shipped in this role archive. Loading/empty/error components preserved in leaf.

## 15. Accessibility and Responsive

WCAG 2.2 AA, semantic labeling, focus management, keyboard controls and min-44px targets are required. Only static analysis is available; screen-reader/browser proof is pending.

## 16. Localization and Formatting

Original EN/HI translation namespaces and JSON files copied unchanged as local resources. Integrated host next-intl registration and translation sync remain host-verification concerns.

## 17. Security Privacy and Logging

No PII in logs, no client-side secrets, no persistence of business entities in localStorage. Role isolation requires future infrastructure decoupling; no sibling leaf imports were introduced.

## 18. Tests and Regressions

Existing API, form, mutable mock and view tests were migrated with revised imports. Additional idempotency/contract checks and Playwright route regression specs created; execution unverified.

## 19. Dependency Manifest and Boundary

Source files import their owning leaf and approved role/global infrastructure. `trainer_infrastructure/*` dependencies are existing debt, not silently certified as boundary compliant.

### Post-v10 isolated primitive ownership (source-verified)
This submodule owns its copied generic UI/hooks/types dependencies under its local `components/`, `hooks/`, `api/`, `schemas/`, `state/`, `types/` and `utils/` folders. These are WET-local copies of the formerly role-wide `trainer_infrastructure` helpers. Other business leaves are not imported. Where local confirmation or realtime hooks are consumed, a route-local `layout.tsx` provides matching contexts; the role shell retains shared contexts for canonical role navigation; no legacy UI route adapter is claimed. This is a source-verified dependency claim, NOT a standalone TypeScript or browser-runtime pass. Backend business operations and URL config are retained from v10. Host package/API/auth/tenant integration remains not verified.

## 20. Standalone Run and Mock Harness

Canonical module-owned scenario registry: `mocks/scenarios/trainer_coaching_coaching_diet_library_and_assignments.scenarios.ts`. It exposes `ACTIVE_RECORDS`, `EMPTY_DATA`, `SERVER_500_ERROR`, `NETWORK_TIMEOUT` (15,000 ms), `UNAUTHORIZED_401`, and `FORBIDDEN_403`; the harness bootstrap re-exports its typed factory. Apply one handler to the module's existing MSW server using the leaf's existing GET URL and a schema-shaped fixture. Runtime execution remains `DEFERRED_TO_HOST_RUNTIME` because this source package intentionally excludes the host dependency manifest and installed runner.


Original mutable MSW fixture and handlers under `mocks/`. `tests/harness/bootstrap.ts` exports fixtures and reset helpers. Host stubs in `contracts/host-stubs.d.ts` are contract placeholders, not runtime implementations.

## 21. Portability Guide

Copy entire `coaching_diet_library_and_assignments/` leaf with `contracts/`, `mocks/`, `tests/`, locales and URL config into a compatible Next.js App Router host. Install audited host dependencies; inject global API/auth/feedback contract and translation namespace; run npm ci, tsc --noEmit, Vitest, Playwright, build.

## 22. Verification and Definition of Done

RBG 21–24 source fixes staged. Static import and TS syntax checks run against ZIP. Full host TypeScript typechecking, Vitest, Playwright, role-based authorization, contrast/responsiveness and final 53-RBG release gate NOT_VERIFIED.

### V12 localization ownership verification
Both English and Hindi leaf resources include verbatim `TRAINER_INFRASTRUCTURE` and `TRAINER_SHELL` namespaces from the supplied role locale source. This supports standalone translation resolution; host `next-intl` locale aggregation is still NOT_VERIFIED.

### v15 — Deterministic mutation mock replay

The module-owned MSW mutation handlers replay successful responses scoped by HTTP method, URL and supplied `Idempotency-Key`. Parallel requests with the same key share one in-flight result; failed responses can be retried; requests without a key retain the original mock behavior. The implementation is self-contained in `mocks/utils/TrainerCoachingDietLibraryAndAssignmentsIdempotentMockResponse.ts`, with an exported reset function for isolated tests. Backend API URL contracts and response shapes are unchanged. This is offline mock behavior only, not a claim about backend idempotency enforcement.

## V20 Final Source Repair Addendum — 2026-11-01

- Approved source repair groups RBG 1–18 are complete. The global TSX inventory contains zero `focus-visible:ring-primary` occurrences; the dedicated `focus-visible:ring-focus-ring` token is used for focus indicators.
- This leaf includes its module-owned typed MSW scenario registry, registration test, accessible scenario selector, and isolated QueryClient/MSW harness. The harness accepts host-owned session/theme providers instead of inventing host auth or theme behavior.
- The role-wide static source sweep completed with zero TypeScript/TSX syntax parse diagnostics. This leaf's semantic typecheck, Vitest execution, browser/Playwright, accessibility, responsive, backend authorization, and tenant-isolation checks remain `DEFERRED_TO_HOST_RUNTIME` because those host services/configurations are not part of this feature source archive.
- Open external blockers remain ISSUE-005 (Members route documentation conflict) and ISSUE-033 (Earnings pagination response contract); they do not change this leaf's local route or API contracts.
- This feature folder is a portable source module, not a standalone Next.js host application. See the role-root `INTEGRATION_GUIDE.md` for the precise host contracts and release qualifications.
