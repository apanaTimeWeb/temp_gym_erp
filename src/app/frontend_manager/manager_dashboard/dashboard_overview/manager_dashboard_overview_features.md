# Manager Dashboard Overview — Autonomous Leaf (RBG15 checkpoint)

## 1. Module Purpose
Own the Manager Dashboard's read-oriented overview. The leaf now owns the active leaf route, presentation components, query/state hooks, constants, formatters, API client, response schema, domain types, MSW fixture/handler, and focused tests. The UI summarizes KPIs, revenue/member growth, recent members, pending payments and expiring memberships.

## 2. Domain Lifecycle and User Flows
Current source flow: Dashboard Overview leaf route → `ManagerDashboardOverviewMain` → `useDashboardStatsQuery` and `useManagerDashboardOverviewUrlState` → `ManagerDashboardOverviewApi` → `GET /api/v1/manager/dashboard/stats` → `managerDashboardOverviewStatsSchema` / `ManagerDashboardOverviewStats` → dashboard widgets. The leaf does not own member, finance, sales, HR, attendance or store CRUD lifecycles.

## 3. Route and Navigation Contract
Active leaf path: `/frontend_manager/manager_dashboard/dashboard_overview`. Compatibility path: `/frontend_manager/manager_dashboard`, which remains live and renders the leaf-owned implementation. No redirect has been enabled. Query values, duplicate query keys and unrelated parameters remain preserved by the route compatibility helper.

## 4. API Architecture
The leaf-owned API client uses `GET /api/v1/manager/dashboard/stats` from `config/manager_dashboard_overview.url_config.ts`. Do not invent additional endpoints or change transport behavior during route migration.

## 5. Schema and Types
Aggregate response validation is owned by `schemas/manager_dashboard_overview.schemas.ts`; the corresponding domain types are in `types/manager_dashboard_overview.types.ts`. The existing schema includes KPIs, chart series, member/payment summaries and membership status counts.

## 6. Query Key Registry
The leaf-owned key namespace is `['manager_dashboard']`, with stats keys shaped as `['manager_dashboard', 'stats', params]`. Preserve this shape to avoid accidental cache duplication.

## 7. Mutation Inventory
No Dashboard-owned create/update/delete API methods are evidenced in the current module. Dashboard summary widgets may link to other domains, but those workflows remain owned by their respective domains. Do not add mutation behavior without a verified requirement and API contract.

## 8. Permissions and Role Rules
The supplied frontend source identifies this as the Manager dashboard. The source archive does not provide sufficient backend authorization contracts to certify endpoint enforcement. Frontend visibility is UX only and must not be treated as server authorization.

## 9. State Ownership
Server data belongs in TanStack Query. `range`, `startDate` and `endDate` are URL-backed view state managed by `useManagerDashboardOverviewUrlState`. RBG5's route helper preserves arbitrary query values; it does not own dashboard business state.

## 10. Offline and Reconnect Behavior
No authoritative offline/cache-persistence contract is present in the supplied module evidence. Existing TanStack Query behavior must be preserved. Offline guarantees remain `NOT_VERIFIED`; do not claim offline support from mocked tests alone.

## 11. Security and PII Rules
The dashboard displays member names and summary records. Do not add extra PII to logs, URLs, test output or telemetry. Backend access control and tenant isolation require backend verification; the supplied archive cannot prove them.

## 12. Accessibility Requirements
Keep semantic headings, keyboard-operable controls, accessible labels and visible focus. Any chart/table behavior moved into this leaf must retain accessible summaries and empty/error announcements. Automated axe/browser verification is pending host runtime.

## 13. Background Tasks
No Dashboard-owned background job or scheduled task is evidenced. Do not create polling or background refresh behavior without explicit product/API evidence.

## 14. Feature Flags
No dashboard-specific feature-flag contract is verified in the supplied source. Do not invent flag names or silently gate existing KPI content.

## 15. Cache Invalidation
The current overview is read-only and uses the dashboard stats query key. No Dashboard-owned mutation invalidation is evidenced. Keep the existing query key stable; define any future invalidation only from verified mutations and contracts.

## 16. Migration and Rollback
RBG6–RBG9 moved the presentation, query/state helpers, constants, API client, schema, types, mocks and focused tests into the leaf in bounded batches. The root page remains a live compatibility alias, not a redirect. If route or source checks fail, restore the prior checkpoint archive and keep the root route operational.

## 17. Test Coverage Map
The leaf `tests/` directory owns behavior, query, URL-state, URL-contract, formatting, constants, and schema regression tests, alongside the isolated provider harness and route compatibility tests. Host execution is `NOT_VERIFIED` until project dependencies/configuration are available.

## 18. Architecture Exceptions
No architecture exception is approved for the leaf implementation. The remaining root-owned routing/configuration and localization compatibility artifacts are explicitly tracked migration work; they are not a claim that the overall Manager frontend is release-complete.

## 19. Known Contract Gaps
The authoritative backend API specification, server-side authorization evidence, tenant-isolation evidence and host runtime configuration are absent from the supplied archive. Record these as `NOT_VERIFIED`; do not infer payload fields beyond the current schema and fixture.

## 20. Rule Compliance Checklist
- [x] Candidate URL config names current and proposed route paths.
- [x] Compatibility helper preserves existing query parameters and repeated keys.
- [x] Test-only query/i18n harness is leaf-local and avoids host business imports.
- [x] Host ambient contract stub file exists for isolated packaging.
- [x] Production implementation moved into the leaf through RBG6–RBG8.
- [x] Leaf route is active; historical root route remains a live compatibility entry.
- [ ] Full host typecheck, unit suite, build and browser E2E verified (host runtime required; currently NOT_VERIFIED).

## 21. Standalone Run, Mock and Test Harness
Harness files: `tests/harness/ManagerDashboardOverviewHarness.tsx` and `tests/harness/bootstrap.tsx`. The harness supplies a fresh TanStack Query client with retries disabled and a `NextIntlClientProvider`. Intended test command in the host project: `npm run test -- frontend_manager/manager_dashboard/dashboard_overview`. No standalone package manifest is supplied; executing this command here is not possible and is `NOT_VERIFIED`.

## 22. Module Portability, Host Integration and Version History
The leaf carries `contracts/host-stubs.d.ts` for isolated host contract declarations. During integration, use actual host modules rather than treating stubs as production implementations. RBG6–RBG8 migrated the implementation into the leaf and preserved the root route and API contract. RBG9 moved the focused Dashboard test suite into the leaf and synchronized imports/docs. Host runtime release checks remain pending.


## RBG9 checkpoint status

- API endpoint preserved: `/api/v1/manager/dashboard/stats`.
- Response schema and `ManagerDashboardOverviewStats` domain types remain the existing contract; the migration changed ownership/import paths, not payload fields.
- Mock fixtures and MSW handler are leaf-owned and the global MSW registry imports the leaf handler.
- Nine Dashboard tests now live under `tests/`; existing leaf harness and route compatibility tests remain co-located.
- The legacy root route remains live as an alias; no redirect or backend change was introduced.
- Syntax checks are source-level only. Full host Vitest, semantic typecheck, production build and browser E2E remain `NOT_VERIFIED`.

## RBG10 localization checkpoint
The existing English and Hindi catalogs were moved without altering their keys or values into `locales/`. Both catalogs have identical key sets. No locale loader import was found in the supplied Manager TS/TSX source; runtime catalog resolution remains NOT_VERIFIED pending host integration. The Dashboard parent route remains live and does not redirect.

## RBG11 — Dashboard date-range and URL-state integrity
- Fixed the preset selector so weekly/monthly/yearly choices perform one `setRange` update and cannot be overwritten by a second custom-range update.
- URL parsing now normalizes unsupported `range` values to the documented `monthly` fallback. URL updates continue to preserve unrelated and repeated query parameters.
- Strengthened the supported-preset contract test, isolated URL-hook mock state between tests, and added focused component regression tests for preset/custom selection.
- Static TypeScript syntax transpilation passed for all five changed TS/TSX files. Vitest and semantic typechecking remain NOT_VERIFIED because the host package/config/dependencies are absent.

## RBG13 — Loading, empty states and responsive layout
- Added a feature-local chart empty state with a meaningful heading, explanatory message, icon hidden from assistive technology, and a working monthly-range action grounded in the existing date-range state contract.
- Dashboard and compatibility-route skeletons now expose a localized busy status, reserve explicit minimum dimensions, and keep decorative blocks out of the accessibility tree.
- Applied responsive page gutters, shrinkable chart/grid containers, and a labeled keyboard-focusable horizontal table scroller.
- Added focused component coverage for loading announcements, empty-state action behavior, and responsive shrinkability. Browser viewport checks at 320/768/1280px and axe execution remain NOT_VERIFIED until host runtime is available.

## RBG12 — Dashboard UI, accessibility, and localization pass
- Replaced hardcoded search-empty messages and date-range/table labels with English/Hindi catalog keys; verified matching locale keys and interpolation placeholders.
- Added an accessible name for the recent-members table, explicit column header scopes, member-specific reminder button names and pressed state, and an announced dashboard loading state.
- Date and date-time formatting now uses the selected supported date locale; the locale argument is no longer ignored.
- Source-level TypeScript syntax transpilation passed for all 14 changed TS/TSX files. Vitest, semantic typecheck, production build and browser E2E remain NOT_VERIFIED because host project configuration/dependencies/runtime are absent. Automated axe test-source coverage is still open for RBG13; axe execution is also NOT_VERIFIED.


## RBG14 — Accessibility automation source coverage
- Added `vitest-axe` assertions for real dashboard success, empty-collection and API-error states, plus component-level loading and chart-empty states.
- Added Playwright `@axe-core/playwright` WCAG A/AA coverage, a keyboard-only Tab/focus/search workflow, and page-overflow assertions at 320px, 768px and 1280px.
- Required host test dependencies: `vitest-axe`, `axe-core`, and `@axe-core/playwright`. The supplied workspace has no package manifest/lockfile, so dependency presence, test execution, and actual accessibility results are `NOT_VERIFIED`; source coverage is authored but not represented as a passing run.
- Manual keyboard verification and true 200% browser-zoom checks remain release-gate items.


## RBG15 responsive and localization contract
- The Recent Members primary-record table uses a semantic card stack below 768 CSS pixels and a semantic HTML table at 768 CSS pixels and above. Mobile cards retain member identity, status, plan, joined date and amount; no essential field is removed.
- Search adornments and their input padding use logical start/end utilities; long member names, statuses, plans and amounts may wrap instead of forcing viewport overflow.
- English and Hindi catalogs are key- and interpolation-placeholder-parity checked. Dashboard status values `ACTIVE`, `PENDING`, and `EXPIRED` use localized labels; unknown backend status values remain visible as supplied.
- Browser source now covers all seven canonical viewport widths (320, 375, 425, 768, 1024, 1440, 1920), root-font-size doubling, and mobile-card/table breakpoint behavior. This is authored coverage, not a claim of browser execution.
- Global reduced-motion override, actual 200% browser zoom, host token registry and all browser assertions remain host integration/runtime checks; this overlay does not include the canonical global stylesheet or host package configuration.


## RBG16 route and documentation reconciliation
- The active leaf route is `/frontend_manager/manager_dashboard/dashboard_overview`; `dashboard_overview/page.tsx` is its App Router entry.
- `/frontend_manager/manager_dashboard` remains a live compatibility entry that renders the same leaf-owned `ManagerDashboardOverviewMain`; it is not currently a redirect.
- The route matrix has 22 domain-root rows plus one separately inventoried active autonomous leaf route. Do not report the domain-root count as the total number of known pathnames.
- The leaf currently owns 15 `*.test.*` files. Route/query contract coverage is authored; host execution remains `NOT_VERIFIED`.
- RBG16 removes only the inert root `manager_dashboard_store/.gitkeep`; no live route, import, API, schema, mock or compatibility alias was deleted.
