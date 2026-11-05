---
schema_version: "2.11"
role: trainer
domain: trainer_earnings
submodule: earnings_overview_and_ledger
mode: B_AUDIT_REPAIR
baseline: frontend-trainer-v19.zip
status: SOURCE_REPAIRED_V20_RUNTIME_NOT_VERIFIED
source: frontend-trainer-v8-PARTIAL-rbg30.zip
---

# Trainer Earnings Overview And Ledger — Autonomous Feature Contract

## 1. Purpose
Trainer earnings overview, pending balances, ledger. Preserves existing implementation from `trainer_earnings/`.

## 2. Owners and Scope
Owner: `src/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/`. No child feature-submodule. Route entries and code live inside this leaf.

## 3. User Stories
- As an authenticated trainer, open the earnings overview and review the available earnings KPIs, pending amounts, and history rows.
- Use the date-filter control to request the supported earnings range and inspect the resulting ledger entries; present optional session, invoice, and payout values with the canonical null-display fallback while preserving currency formatting for present amounts.
- When the request fails or no entries are available, show the feature's error/empty state and allow refresh/retry; this leaf is read-only and does not claim payout mutations.

## 4. Routes and Navigation
Canonical UI route: `/frontend_trainer/trainer_earnings/earnings_overview_and_ledger`. This leaf owns the route entry and is listed in `CANONICAL_ROUTE_MANIFEST.json`. No removed legacy `/trainer/...` UI route or compatibility adapter is shipped or claimed by this role archive. Host menus, bookmarks, and authentication callbacks must target the canonical route; any inbound redirect is a separate host-owned decision and is not asserted here. Backend `/trainer/...` API endpoints are independent contracts and remain unchanged.

## 5. Entities and Aggregate
Only source-declared entity/DTO schemas from `schemas/TrainerEarningsOverviewAndLedgerEarningsDomainSchemas.ts` are authoritative.

## 6. Permissions and Tenant Boundary
Host `TrainerInfrastructureRoleGuard` and backend authorization remain in force. Tenant authority requires host/API confirmation; never fabricate role grants.

## 7. API Contracts
API file evidence: api/TrainerEarningsOverviewAndLedgerEarningsApi.ts. Owning URL config: `config/trainer_earnings_overview_and_ledger.url_config.ts`. Never create guessed endpoints.

## 8. Types and Response Shapes
TypeScript entity contracts retained from legacy code under `types/`; runtime Zod sources retained under `schemas/` where present.

## 9. Data Queries and Cache
TanStack Query v5 owns server state; client-only UI state remains module-local. Required UI helpers were copied into this leaf; no direct role-wide infrastructure or sibling business imports remain in the canonical leaf.

## 10. URL and Filter State
Canonical route: `/frontend_trainer/trainer_earnings/earnings_overview_and_ledger`. Query parameters are limited to those defined in this leaf’s URL config and documented above; host navigation should link to this canonical route. Host redirects are outside the supplied role archive and are not implied by this feature contract.

## 11. UI Composition
Real component sources: TrainerEarningsOverviewAndLedgerEarningsDateFilterDropdown.tsx, TrainerEarningsOverviewAndLedgerEarningsEmptyState.tsx, TrainerEarningsOverviewAndLedgerEarningsHistory.tsx, TrainerEarningsOverviewAndLedgerEarningsKPIs.tsx, TrainerEarningsOverviewAndLedgerEarningsLoadingSkeleton.tsx, TrainerEarningsOverviewAndLedgerEarningsMain.tsx, TrainerEarningsOverviewAndLedgerEarningsNotFoundView.tsx, TrainerEarningsOverviewAndLedgerEarningsPending.tsx.

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
Tests in leaf: tests/TrainerEarningsOverviewAndLedgerEarningsDateRangeValidation.test.ts, tests/TrainerEarningsOverviewAndLedgerEarningsDateRangeConstants.test.ts, tests/TrainerEarningsOverviewAndLedgerEarningsRouteStates.test.tsx, tests/TrainerEarningsOverviewAndLedgerEarningsConstants.test.ts, tests/TrainerEarningsOverviewAndLedgerEarningsDomainSchemas.test.ts, tests/TrainerEarningsOverviewAndLedgerEarningsMainBehavior.test.tsx, tests/TrainerEarningsOverviewAndLedgerEarningsDisplayFormatters.test.ts, tests/TrainerEarningsOverviewAndLedgerEarningsFormatCurrency.test.ts, tests/TrainerEarningsOverviewAndLedgerEarningsResolveTrainerEarningsDateRange.test.ts, tests/useTrainerEarningsOverviewAndLedgerEarningsQuery.test.ts, tests/TrainerEarningsOverviewAndLedgerEarningsApiBehavior.test.ts; new Playwright routing tests included at role ZIP level. Execution not claimed.

## 19. Dependency Manifest and Boundary
No sibling-leaf or role-wide infrastructure imports are present in this canonical leaf per v11 static dependency scan. Host API, authorization, locale aggregation and runtime integration still require verification.

### Post-v10 isolated primitive ownership (source-verified)
This submodule owns its copied generic UI/hooks/types dependencies under its local `components/`, `hooks/`, `api/`, `schemas/`, `state/`, `types/` and `utils/` folders. These are WET-local copies of the formerly role-wide `trainer_infrastructure` helpers. Other business leaves are not imported. Where local confirmation or realtime hooks are consumed, a route-local `layout.tsx` provides matching contexts; the role shell retains shared contexts for canonical role navigation; no legacy UI route adapter is claimed. This is a source-verified dependency claim, NOT a standalone TypeScript or browser-runtime pass. Backend business operations and URL config are retained from v10. Host package/API/auth/tenant integration remains not verified.

## 20. Standalone Run and Mock Harness

Canonical module-owned scenario registry: `mocks/scenarios/trainer_earnings_earnings_overview_and_ledger.scenarios.ts`. It exposes `ACTIVE_RECORDS`, `EMPTY_DATA`, `SERVER_500_ERROR`, `NETWORK_TIMEOUT` (15,000 ms), `UNAUTHORIZED_401`, and `FORBIDDEN_403`; the harness bootstrap re-exports its typed factory. Apply one handler to the module's existing MSW server using the leaf's existing GET URL and a schema-shaped fixture. Runtime execution remains `DEFERRED_TO_HOST_RUNTIME` because this source package intentionally excludes the host dependency manifest and installed runner.

`tests/harness/bootstrap.ts` and `contracts/host-stubs.d.ts` exist. Standalone compilation is NOT VERIFIED until installing an isolated npm harness and running tests.

## 21. Portability Guide
Copy only this leaf into a compatible Next.js App Router host; map @/* to src/*; wire approved API, auth, i18n, MSW and logger adapters. Run `npm ci`, `tsc --noEmit`, `vitest run`, Playwright and `npm run build`.

## 22. Verification and Definition of Done
RBG 43–45 source migration staged. Static syntax/import/sibling checks run separately and linked in delivery manifest. Full host typecheck, tests, auth and WCAG remain NOT_VERIFIED.

### V12 localization ownership verification
Both English and Hindi leaf resources include verbatim `TRAINER_INFRASTRUCTURE` and `TRAINER_SHELL` namespaces from the supplied role locale source. This supports standalone translation resolution; host `next-intl` locale aggregation is still NOT_VERIFIED.

### Pagination contract qualification — `CONTRACT_INCOMPLETE` (ISSUE-033)
The current Earnings UI sends `page` and `limit`, and its ledger pager consumes `historyTotal`, `historyPage`, and `historyLimit`. The local MSW handler returns those fields, but this frozen feature contract does not state that the backend guarantees them or define an alternative required pagination `meta` envelope. Therefore the frontend does **not** promote these optional DTO fields to required backend guarantees. The ledger now shows its existing recoverable history error/retry state when pagination metadata is absent or does not match the requested page/limit, rather than inferring a single page from the current row count and silently hiding navigation. Backend/API contract confirmation is still required before marking ISSUE-033 fully closed.

## V20 Final Source Repair Addendum — 2026-11-01

- Approved source repair groups RBG 1–18 are complete. The global TSX inventory contains zero `focus-visible:ring-primary` occurrences; the dedicated `focus-visible:ring-focus-ring` token is used for focus indicators.
- This leaf includes its module-owned typed MSW scenario registry, registration test, accessible scenario selector, and isolated QueryClient/MSW harness. The harness accepts host-owned session/theme providers instead of inventing host auth or theme behavior.
- The role-wide static source sweep completed with zero TypeScript/TSX syntax parse diagnostics. This leaf's semantic typecheck, Vitest execution, browser/Playwright, accessibility, responsive, backend authorization, and tenant-isolation checks remain `DEFERRED_TO_HOST_RUNTIME` because those host services/configurations are not part of this feature source archive.
- Open external blockers remain ISSUE-005 (Members route documentation conflict) and ISSUE-033 (Earnings pagination response contract); they do not change this leaf's local route or API contracts.
- This feature folder is a portable source module, not a standalone Next.js host application. See the role-root `INTEGRATION_GUIDE.md` for the precise host contracts and release qualifications.
