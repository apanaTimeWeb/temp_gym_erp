---
schema_version: "2.11"
role: trainer
domain: trainer_dashboard
submodule: dashboard_overview
mode: B_AUDIT_REPAIR
baseline: frontend-trainer-v19.zip
status: SOURCE_REPAIRED_V20_RUNTIME_NOT_VERIFIED
source: frontend-trainer-v19.zip
---

# Trainer Dashboard Overview — Autonomous Submodule Feature Specification

## 1. Purpose

Read-only trainer operational overview: KPIs, goal trends, membership distribution, upcoming sessions and recent member progress. Not a financial or earnings aggregate.

## 2. Owners and Scope

Owned by `trainer_dashboard/dashboard_overview/`; the canonical UI route is `/frontend_trainer/trainer_dashboard/dashboard_overview` as declared in `CANONICAL_ROUTE_MANIFEST.json`. RBG 8–9 physically migrated Dashboard server-state, mock, schema, type, test and locale artifacts into this autonomous submodule without changing the supplied backend endpoint or query values.

## 3. User Stories

- As an authenticated trainer, open the canonical Dashboard route and review trainer-scoped KPI cards, goal/progress charts, membership distribution, upcoming sessions, and recent-progress items.
- Change the URL-backed date range using `range`, `startDate`, and `endDate`; quick actions navigate to the corresponding canonical feature routes.
- Observe loading, empty, and error states. Unsupported historical aggregate ranges must surface the backend error response; the read-only dashboard must not fabricate historical metrics.

## 4. Routes and Navigation

Canonical UI route: `/frontend_trainer/trainer_dashboard/dashboard_overview`. Filter query parameters: `range`, `startDate`, and `endDate`. No removed `/trainer/dashboard` legacy UI route or adapter is shipped in this role archive. Host navigation targets the canonical route; any inbound redirect is host-owned. Backend `/trainer/trainer_dashboard/stats` remains an unchanged API endpoint.

## 5. Entities and Aggregate

Trainer dashboard *read-only statistics*; source-backed single `stats` endpoint from existing Dashboard URL config. Do not introduce CRUD or financial fields.

## 6. Permissions and Tenant Boundary

Use existing trainer auth/guard plumbing; permission and tenant enforcement must be checked in host integration. Do not add client-secret storage.

## 7. API Contracts

The source-owned API constant is `TRAINER_DASHBOARD_API_STATS = /trainer/trainer_dashboard/stats`; this is a backend endpoint and remains unchanged. Auth/response DTO semantics still require host/backend verification.

## 8. Types and Response Shapes

The Dashboard types and Zod schemas now live under this submodule’s `types/` and `schemas/`, including the corresponding tests.

## 9. Data Queries and Cache

Submodule-local `useTrainerDashboardQuery` owns TanStack Query state and query-key behavior. Do not change cache keys in this RBG.

## 10. URL and Filter State

The URL-backed date range uses `range`, `startDate`, and `endDate`; filter validation preserves the source-defined ISO date semantics. The canonical route is `/frontend_trainer/trainer_dashboard/dashboard_overview`.

## 11. UI Composition

Source dashboard contains KPIs, date filter, charts, quick actions, upcoming sessions and progress widgets. All dashboard widgets remain in this submodule; no removed legacy domain UI route entry is shipped as a compatibility adapter.

## 12. Forms and Validation

Dashboard has a range selector with optional custom date fields. Moved `TrainerDashboardIsValidDateRange` preserves existing ISO-date validation behavior.

## 13. Actions and Mutations

No dashboard write mutation documented. Quick action links navigate to existing role-owned routes; do not invent endpoint mutations.

## 14. Loading Empty Error and Not Found

The canonical `dashboard_overview/` leaf owns its loading/error/not-found route states; host root rewrites remain outside the supplied role archive.

## 15. Accessibility and Responsive

Preserve input labels, keyboard access, semantic status, reduced motion, mobile layout and chart alternatives. Browser test `DEFERRED_TO_HOST_RUNTIME`.

## 16. Localization and Formatting

Existing EN/HI dictionaries are copied into module-local `locales/` without changing translation keys; `TrainerDashboardFormatNumber` retains locale-controlled `Intl.NumberFormat`.

## 17. Security Privacy and Logging

Read-only, trainer scoped. No new persistence, PII exposure, unsafe HTML, raw fetch, or client secret. Live backend auth status is not verified from this source-only archive.

## 18. Tests and Regressions

The supplied original behavior/unit tests have been physically relocated into `tests/` or `hooks/` with their source imports updated. Existing Playwright specs remain test artifacts only; they do not establish a legacy UI route adapter. New invalid-custom-range coverage prevents the disabled-query spinner regression. Test execution is `DEFERRED_TO_HOST_RUNTIME` because the source-only archive has no dependency manifest/test configuration.

## 19. Dependency Manifest and Boundary

All dashboard business source now resides within `dashboard_overview/` (or is preserved as framework route entry in the parent). Module-local URL config, query key, schemas, hooks, formats and read-only mocks are present. Dashboard references to Trainer infrastructure skeleton/stat/error and the host `apiFetch` remain a known integration/isolation item: it must be resolved through verified zero-business primitives before a full standalone certification. No extra backend field has been invented.

### Post-v10 isolated primitive ownership (source-verified)
This submodule owns its copied generic UI/hooks/types dependencies under its local `components/`, `hooks/`, `api/`, `schemas/`, `state/`, `types/` and `utils/` folders. These are WET-local copies of the formerly role-wide `trainer_infrastructure` helpers. Other business leaves are not imported. Where local confirmation or realtime hooks are consumed, a route-local `layout.tsx` provides matching contexts; the role shell retains shared contexts for canonical role navigation; no legacy UI route adapter is claimed. This is a source-verified dependency claim, NOT a standalone TypeScript or browser-runtime pass. Backend business operations and URL config are retained from v10. Host package/API/auth/tenant integration remains not verified.

## 20. Standalone Run and Mock Harness

Canonical module-owned scenario registry: `mocks/scenarios/trainer_dashboard_dashboard_overview.scenarios.ts`. It exposes `ACTIVE_RECORDS`, `EMPTY_DATA`, `SERVER_500_ERROR`, `NETWORK_TIMEOUT` (15,000 ms), `UNAUTHORIZED_401`, and `FORBIDDEN_403`; the harness bootstrap re-exports its typed factory. Apply one handler to the module's existing MSW server using the leaf's existing GET URL and a schema-shaped fixture. Runtime execution remains `DEFERRED_TO_HOST_RUNTIME` because this source package intentionally excludes the host dependency manifest and installed runner.


`contracts/host-stubs.d.ts`, `mocks/TrainerDashboardOverviewMockHandlers.ts` and `tests/harness/bootstrap.ts` now exist. These are source artifacts, NOT proof of standalone `tsc`, mock E2E, backend authorization or actual host exports. A host runner with the project dependency manifest must exercise `npx tsc --noEmit`, Vitest, Next build and Playwright. Preserve `@/lib/api` and its verified backend envelope; reconcile external host stubs with the installed host.

## 21. Portability Guide

Copy `dashboard_overview/` into the equivalent domain of a Next App Router host, wire the exact module-owned API/URL config and locale merge, retain matching semantic `globals.css` tokens, and mount its MSW handlers only under a dev/test runner. Role shell/permissions remain host-managed, so a ZIP-only compilation is not yet certified.

## 22. Verification and Definition of Done

Status **SOURCE_REPAIRED_V20_RUNTIME_NOT_VERIFIED**: source migration, syntax parse, role import-target checks and route-constant preservation are supported by this execution. Full no-cross-module-import, UI token/contrast, host security, standalone compile, Vitest and E2E compliance remain **NOT_VERIFIED** / `DEFERRED_TO_HOST_RUNTIME`. Never label all RBGs complete until the final checklist and three verification tables pass.

### V12 localization ownership verification
Both English and Hindi leaf resources include verbatim `TRAINER_INFRASTRUCTURE` and `TRAINER_SHELL` namespaces from the supplied role locale source. This supports standalone translation resolution; host `next-intl` locale aggregation is still NOT_VERIFIED.

## V20 Final Source Repair Addendum — 2026-11-01

- Approved source repair groups RBG 1–18 are complete. The global TSX inventory contains zero `focus-visible:ring-primary` occurrences; the dedicated `focus-visible:ring-focus-ring` token is used for focus indicators.
- This leaf includes its module-owned typed MSW scenario registry, registration test, accessible scenario selector, and isolated QueryClient/MSW harness. The harness accepts host-owned session/theme providers instead of inventing host auth or theme behavior.
- The role-wide static source sweep completed with zero TypeScript/TSX syntax parse diagnostics. This leaf's semantic typecheck, Vitest execution, browser/Playwright, accessibility, responsive, backend authorization, and tenant-isolation checks remain `DEFERRED_TO_HOST_RUNTIME` because those host services/configurations are not part of this feature source archive.
- Open external blockers remain ISSUE-005 (Members route documentation conflict) and ISSUE-033 (Earnings pagination response contract); they do not change this leaf's local route or API contracts.
- This feature folder is a portable source module, not a standalone Next.js host application. See the role-root `INTEGRATION_GUIDE.md` for the precise host contracts and release qualifications.
