# Admin Dashboard — Feature Map


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Module Purpose
The Admin Dashboard module is the authenticated administrative overview surface for current operational health and performance signals. Users can inspect headline KPIs, revenue and attendance trends, branch performance, expiring-member information, system alerts, and period filters that drive dashboard queries. The module is read-oriented and derives all server-backed values through its query/API flow. It does not own mutation workflows or business data belonging to members, finance, HR, or subscriptions.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/frontend_admin/admin_dashboard/dashboard_overview` | ``frontend_admin/admin_dashboard/page.tsx`` | ``frontend_admin/admin_dashboard/dashboard_overview/components/main_view/AdminDashboardOverviewMain.tsx`` |

## Dependency Manifest
- Next.js App Router (framework structure detected; exact version NOT_VERIFIED because the host package manifest is absent)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- lucide-react
- react-apexcharts 1.x
- next-intl

## Directory Structure

Canonical module root: `admin_dashboard/`. This inventory is regenerated from the current physical source tree; each row lists exact direct files, with no inferred backend contracts.

| Folder | Responsibility | Direct Files |
|---|---|---|
| `admin_dashboard/` | Feature-owned implementation files. | admin_dashboard_features.md, admin_dashboard_forbidden.md, admin_dashboard_theme_contract.md, page.tsx |
| `admin_dashboard/dashboard_overview/` | Feature-owned implementation files. | admin_dashboard_overview_features.md, admin_dashboard_overview_forbidden.md, admin_dashboard_overview_theme_contract.md, error.tsx, loading.tsx, not-found.tsx, page.tsx |
| `admin_dashboard/dashboard_overview/api/` | Leaf-owned API transport boundary. | admin_dashboard_overview_api.ts |
| `admin_dashboard/dashboard_overview/components/` | Feature component root. | AdminDashboardOverviewStatCard.tsx |
| `admin_dashboard/dashboard_overview/components/alerts/` | Feature-owned implementation files. | AdminDashboardOverviewAlerts.tsx |
| `admin_dashboard/dashboard_overview/components/attendance_trend/` | Feature-owned implementation files. | AdminDashboardOverviewAttendanceTrend.tsx |
| `admin_dashboard/dashboard_overview/components/branch_leaderboard/` | Feature-owned implementation files. | AdminDashboardOverviewBranchLeaderboard.tsx, AdminDashboardOverviewBranchLeaderboardSortIcon.tsx |
| `admin_dashboard/dashboard_overview/components/date_filter/` | Feature-owned implementation files. | AdminDashboardOverviewDateFilterDropdown.tsx |
| `admin_dashboard/dashboard_overview/components/empty_state/` | Feature-owned implementation files. | AdminDashboardOverviewEmptyState.tsx |
| `admin_dashboard/dashboard_overview/components/expiring_widget/` | Feature-owned implementation files. | AdminDashboardOverviewExpiringWidget.tsx |
| `admin_dashboard/dashboard_overview/components/feedback/` | Feedback components. | AdminDashboardOverviewBackendMessage.ts |
| `admin_dashboard/dashboard_overview/components/kpis/` | Feature-owned implementation files. | AdminDashboardOverviewKPIs.tsx |
| `admin_dashboard/dashboard_overview/components/main_view/` | Main view and route composition. | AdminDashboardOverviewMain.tsx, AdminDashboardOverviewSkeleton.tsx |
| `admin_dashboard/dashboard_overview/components/revenue_trend/` | Feature-owned implementation files. | AdminDashboardOverviewRevenueTrend.tsx |
| `admin_dashboard/dashboard_overview/components/searchable_dropdown/` | Accessible searchable dropdown components. | AdminDashboardOverviewSearchableDropdown.tsx |
| `admin_dashboard/dashboard_overview/components/shell/` | Shell and not-found components. | AdminDashboardOverviewNotFound.tsx |
| `admin_dashboard/dashboard_overview/config/` | Route and URL configuration. | admin_dashboard_overview.url_config.ts |
| `admin_dashboard/dashboard_overview/constants/` | Constants and query-key registries. | AdminDashboardOverviewConstants.ts, AdminDashboardOverviewQueryKeys.ts |
| `admin_dashboard/dashboard_overview/contracts/` | Host contract stubs. | host-stubs.d.ts |
| `admin_dashboard/dashboard_overview/hooks/` | Feature data-flow and interaction hooks. | useAdminDashboardOverviewDateRangeSuffix.ts, useAdminDashboardOverviewLogic.ts |
| `admin_dashboard/dashboard_overview/locales/` | Localized resources. | admin_dashboard_overview_en.json, admin_dashboard_overview_hi.json |
| `admin_dashboard/dashboard_overview/mocks/fixtures/` | Mock fixtures. | AdminDashboardOverviewMockFixtures.ts |
| `admin_dashboard/dashboard_overview/mocks/handlers/` | Mock request handlers. | AdminDashboardOverviewMockHandlers.ts |
| `admin_dashboard/dashboard_overview/mocks/scenarios/` | Mock scenarios and scenario tests. | admin_dashboard_overview.scenarios.ts |
| `admin_dashboard/dashboard_overview/schemas/` | Runtime validation schemas. | AdminDashboardOverviewSchemas.ts |
| `admin_dashboard/dashboard_overview/tests/harness/` | Feature-owned implementation files. | AdminDashboardOverviewHarness.tsx, bootstrap.ts |
| `admin_dashboard/dashboard_overview/tests/hooks/` | Feature data-flow and interaction hooks. | useAdminDashboardOverviewDateRangeSuffix.test.ts, useAdminDashboardOverviewLogic.test.ts |
| `admin_dashboard/dashboard_overview/tests/mocks/fixtures/` | Mock fixtures. | AdminDashboardOverviewMockFixtures.test.ts |
| `admin_dashboard/dashboard_overview/tests/scenarios/` | Mock scenarios and scenario tests. | AdminDashboardOverviewScenarios.test.ts |
| `admin_dashboard/dashboard_overview/tests/utils/` | Deterministic utilities and API response helpers. | AdminDashboardOverviewApiResponse.test.ts, AdminDashboardOverviewDateRangeUtils.test.ts, AdminDashboardOverviewFormatCurrency.test.ts, AdminDashboardOverviewFormatters.test.ts, AdminDashboardOverviewSortBranchPerformanceRows.test.ts |
| `admin_dashboard/dashboard_overview/types/` | Domain, DTO, state, and prop types. | AdminDashboardOverviewBranchLeaderboardSortIconPropsTypes.ts, AdminDashboardOverviewBranchLeaderboardTypes.ts, AdminDashboardOverviewDateFilterTypes.ts, AdminDashboardOverviewDateRangeTypes.ts, AdminDashboardOverviewEmptyStatePropsTypes.ts, AdminDashboardOverviewErrorPropsTypes.ts, AdminDashboardOverviewMonitoringTypes.ts, AdminDashboardOverviewQueryTypes.ts, AdminDashboardOverviewRangeTypes.ts, AdminDashboardOverviewSearchableDropdownTypes.ts, AdminDashboardOverviewShellContractTypes.ts, AdminDashboardOverviewStatCardTypes.ts, AdminDashboardOverviewTypes.ts |
| `admin_dashboard/dashboard_overview/utils/` | Deterministic utilities and API response helpers. | AdminDashboardOverviewApiResponse.ts, AdminDashboardOverviewChartThemeTokens.ts, AdminDashboardOverviewDateRangeUtils.ts, AdminDashboardOverviewDisplayValue.ts, AdminDashboardOverviewFormatCurrency.ts, AdminDashboardOverviewFormatters.ts, AdminDashboardOverviewMonitoring.ts, AdminDashboardOverviewSortBranchPerformanceRows.ts |
## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutBackendMessage`
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutStatCard`
- `@/app/frontend_admin/admin_navigation/components/searchable_dropdown/AdminNavigationLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutNotFound`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutChartThemeTokens`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutMonitoring`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminDashboardOverviewAlerts.tsx` | `Renders/orchestrates AdminDashboardOverviewAlerts for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.` |
| `AdminDashboardOverviewAttendanceTrend.tsx` | `Renders the cross-branch daily attendance trend chart using ApexCharts.` |
| `AdminDashboardOverviewBranchLeaderboard.tsx` | `Renders the dashboard branch leaderboard with accessible, functional column sorting.` |
| `AdminDashboardOverviewBranchLeaderboardSortIcon.tsx` | `Renders the sortable-direction icon for a dashboard leaderboard header.` |
| `AdminDashboardOverviewDateFilterDropdown.tsx` | `A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales).` |
| `AdminDashboardOverviewEmptyState.tsx` | `Renders the empty state for dashboard leaderboard data.` |
| `AdminDashboardOverviewExpiringWidget.tsx` | `Renders the expiring memberships widget showing members expiring this week and month across all branches.` |
| `AdminDashboardOverviewKPIs.tsx` | `Renders the two rows of KPI metric stat cards on the dashboard using live data from useAdminDashboardOverviewLogic.` |
| `AdminDashboardOverviewMain.tsx` | `Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.` |
| `AdminDashboardOverviewSkeleton.tsx` | `Renders the dashboard route skeleton with KPI and chart-shaped placeholders.` |
| `AdminDashboardOverviewRevenueTrend.tsx` | `Renders the Revenue & Profit Trend area chart using ApexCharts (Recharts is forbidden per Rule 62).` |

## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.

## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminDashboardOverviewDateRangeSuffix.ts`, `useAdminDashboardOverviewLogic.ts`
- **Stores:** No module-scoped Zustand store detected.
- **Query-key registry:** `admin`, `dashboard`, `detail`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.

## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `admin_dashboard_overview_api.ts` | `fetchDashboardStats` | `GET` | `params: AdminDashboardStatsParams` | `ApiResponse<DashboardStats` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.

## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminDashboardOverviewAlerts.tsx` | Renders/orchestrates AdminDashboardOverviewAlerts for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardOverviewBranchLeaderboard.tsx` | Renders the dashboard branch leaderboard with accessible, functional column sorting. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardOverviewDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales). | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardOverviewEmptyState.tsx` | Renders the empty state for dashboard leaderboard data. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardOverviewExpiringWidget.tsx` | Renders the expiring memberships widget showing members expiring this week and month across all branches. | 3 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardOverviewKPIs.tsx` | Renders the two rows of KPI metric stat cards on the dashboard using live data from useAdminDashboardOverviewLogic. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminDashboardOverviewMain.tsx` | Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

Feature-owned mock fixtures remain the source for deterministic frontend demo data; production components do not embed fake business-record arrays.

## Permissions and Security
- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

## Loading, Empty, and Error States
- `loading.tsx`, `error.tsx`, and `not-found.tsx` are present.
- The module must use structural skeletons for complex asynchronous sections and contextual empty/error/retry UI rather than a blank screen or generic full-page spinner.
- Runtime evidence for actual state transitions is `NOT VERIFIED` without host execution.

## Edge Cases and AI Warnings
- **Feature isolation:** Do not import sibling Admin business modules or move business behavior into a global helper merely to reduce duplication.
- **Mutation retry identity:** When this feature has mutations, the existing user-intent idempotency key must be reused across retries; never generate a new key for a retry.
- **Server-state ownership:** Keep API response data in TanStack Query; do not create a parallel Zustand copy.
- **Scope preservation:** Resource IDs, branch/tenant context, and URL/query state must stay aligned from route → query key → request → mock/response → rendered record.
- **Documentation freshness:** Any new component, API endpoint, flow, mock scenario, or theme dependency must be reflected in this feature map in the same change.

## Component Responsibility Map
| Component | Responsibility | Test IDs |
|---|---|---:|
| `AdminDashboardOverviewAlerts.tsx` | Renders/orchestrates AdminDashboardOverviewAlerts for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs. | 2 |
| `AdminDashboardOverviewAttendanceTrend.tsx` | Renders the cross-branch daily attendance trend chart using ApexCharts. | 0 |
| `AdminDashboardOverviewBranchLeaderboard.tsx` | Renders the dashboard branch leaderboard with accessible, functional column sorting. | 2 |
| `AdminDashboardOverviewBranchLeaderboardSortIcon.tsx` | Renders the sortable-direction icon for a dashboard leaderboard header. | 0 |
| `AdminDashboardOverviewDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales). | 1 |
| `AdminDashboardOverviewEmptyState.tsx` | Renders the empty state for dashboard leaderboard data. | 1 |
| `AdminDashboardOverviewExpiringWidget.tsx` | Renders the expiring memberships widget showing members expiring this week and month across all branches. | 3 |
| `AdminDashboardOverviewKPIs.tsx` | Renders the two rows of KPI metric stat cards on the dashboard using live data from useAdminDashboardOverviewLogic. | 0 |
| `AdminDashboardOverviewMain.tsx` | Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context. | 0 |
| `AdminDashboardOverviewSkeleton.tsx` | Renders the dashboard route skeleton with KPI and chart-shaped placeholders. | 0 |
| `AdminDashboardOverviewRevenueTrend.tsx` | Renders the Revenue & Profit Trend area chart using ApexCharts (Recharts is forbidden per Rule 62). | 0 |

## Repair Notes — v17_fix

- Canonicalized the module URL configuration without changing the supplied endpoint path values.
- Updated this feature map with concrete business purpose, dependency manifest, lifecycle ownership, directory ownership, and external-dependency boundaries.
- Preserved module-local business logic and approved application-infrastructure dependencies; no cross-feature business abstraction was introduced.
- Kept any scope-blocked behavior explicitly blocked rather than fabricating API contracts.
- Runtime/browser/host build verification remains outside the role-only supplied archive.
## Rule Compliance Checklist
- [x] Canonical feature module exists and owns business-specific source artifacts.
- [x] Child folders use module-prefixed `snake_case` naming.
- [x] Role/module prefixes are preserved in non-framework file names.
- [x] No production relative imports or barrel/facade files were detected in the supplied source audit.
- [x] Production component and extended file-size ceilings pass the current source scan.
- [x] Module-owned mocks/fixtures/handlers are present unless explicitly scope-blocked.
- [x] No production `any`, TypeScript ignore directives, console logging, direct browser storage, or semantic background opacity modifiers were detected.
- [x] Interactive production elements carry machine-readable `data-testid` attributes under the current source-compliance test contract.
- [x] Password-secret fields in this role now have explicit eye-icon visibility toggles.
- [ ] Host TypeScript/ESLint/Next build/Vitest/RTL/Playwright/browser accessibility/SCA/gitleaks gates are `NOT VERIFIED` because the supplied artifact is role-only and contains no host project configuration/runtime.

## Component Tree

`dashboard_overview/components/`
- `admin_dashboard_alerts/AdminDashboardOverviewAlerts.tsx`
- `admin_dashboard_attendance_trend/AdminDashboardOverviewAttendanceTrend.tsx`
- `admin_dashboard_branch_leaderboard/AdminDashboardOverviewBranchLeaderboard.tsx`
- `admin_dashboard_branch_leaderboard/AdminDashboardOverviewBranchLeaderboardSortIcon.tsx`
- `admin_dashboard_date_filter/AdminDashboardOverviewDateFilterDropdown.tsx`
- `admin_dashboard_empty_state/AdminDashboardOverviewEmptyState.tsx`
- `admin_dashboard_expiring_widget/AdminDashboardOverviewExpiringWidget.tsx`
- `admin_dashboard_kpis/AdminDashboardOverviewKPIs.tsx`
- `main_view/AdminDashboardOverviewMain.tsx`
- `main_view/AdminDashboardOverviewSkeleton.tsx`
- `admin_dashboard_revenue_trend/AdminDashboardOverviewRevenueTrend.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_dashboard_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
