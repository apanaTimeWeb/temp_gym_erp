# Admin Attendance — Feature Map


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Module Purpose
The Admin Attendance module gives authorized administrators a date- and branch-aware view of member attendance activity. Users can search and filter attendance records, inspect attendance KPIs, and review attendance trends for the selected period. The module is read-oriented and keeps server results in TanStack Query while URL/filter state drives the requested dataset. It does not create or edit attendance records or own member, payroll, or billing workflows.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/frontend_admin/admin_attendance/attendance_dashboard` | ``frontend_admin/admin_attendance/page.tsx`` | ``frontend_admin/admin_attendance/attendance_dashboard/components/main_view/AdminAttendanceDashboardMain.tsx`` |

## Dependency Manifest
- Next.js App Router (framework structure detected; exact version NOT_VERIFIED because the host package manifest is absent)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- Zod 3.x
- lucide-react
- react-apexcharts 1.x
- next-intl

## Directory Structure

Canonical module root: `admin_attendance/`. This inventory is regenerated from the current physical source tree; each row lists exact direct files, with no inferred backend contracts.

| Folder | Responsibility | Direct Files |
|---|---|---|
| `admin_attendance/` | Feature-owned implementation files. | admin_attendance_features.md, admin_attendance_forbidden.md, admin_attendance_theme_contract.md, layout.tsx, page.tsx |
| `admin_attendance/attendance_dashboard/` | Feature-owned implementation files. | admin_attendance_dashboard_features.md, admin_attendance_dashboard_forbidden.md, admin_attendance_dashboard_theme_contract.md, error.tsx, loading.tsx, not-found.tsx, page.tsx |
| `admin_attendance/attendance_dashboard/api/` | Leaf-owned API transport boundary. | admin_attendance_dashboard_api.ts, admin_attendance_dashboard_branch_reference_api.ts |
| `admin_attendance/attendance_dashboard/components/` | Feature component root. | AdminAttendanceDashboardErrorFallback.tsx, AdminAttendanceDashboardPagination.tsx, AdminAttendanceDashboardTableSkeleton.tsx |
| `admin_attendance/attendance_dashboard/components/empty_state/` | Feature-owned implementation files. | AdminAttendanceDashboardEmptyState.tsx |
| `admin_attendance/attendance_dashboard/components/feedback/` | Feedback components. | AdminAttendanceDashboardBackendMessage.ts |
| `admin_attendance/attendance_dashboard/components/kpis/` | Feature-owned implementation files. | AdminAttendanceDashboardKPIs.tsx |
| `admin_attendance/attendance_dashboard/components/main_view/` | Main view and route composition. | AdminAttendanceDashboardMain.tsx |
| `admin_attendance/attendance_dashboard/components/searchable_dropdown/` | Accessible searchable dropdown components. | AdminAttendanceDashboardSearchableDropdown.tsx |
| `admin_attendance/attendance_dashboard/components/shell/` | Shell and not-found components. | AdminAttendanceDashboardNotFound.tsx |
| `admin_attendance/attendance_dashboard/components/table/` | Feature-owned implementation files. | AdminAttendanceDashboardTable.tsx |
| `admin_attendance/attendance_dashboard/components/toolbar/` | Feature-owned implementation files. | AdminAttendanceDashboardToolbar.tsx |
| `admin_attendance/attendance_dashboard/components/trend_chart/` | Feature-owned implementation files. | AdminAttendanceDashboardTrendChart.tsx |
| `admin_attendance/attendance_dashboard/config/` | Route and URL configuration. | admin_attendance_dashboard.url_config.ts |
| `admin_attendance/attendance_dashboard/constants/` | Constants and query-key registries. | AdminAttendanceDashboardConstants.ts, AdminAttendanceDashboardQueryKeys.ts |
| `admin_attendance/attendance_dashboard/contracts/` | Host contract stubs. | host-stubs.d.ts |
| `admin_attendance/attendance_dashboard/hooks/` | Feature data-flow and interaction hooks. | useAdminAttendanceDashboardBranchReference.ts, useAdminAttendanceDashboardChartMode.ts, useAdminAttendanceDashboardDebounce.ts, useAdminAttendanceDashboardLogic.ts, useAdminAttendanceDashboardUrlQuerySync.ts |
| `admin_attendance/attendance_dashboard/locales/` | Localized resources. | admin_attendance_dashboard_en.json, admin_attendance_dashboard_hi.json |
| `admin_attendance/attendance_dashboard/mocks/fixtures/` | Mock fixtures. | AdminAttendanceDashboardBranchReferenceMockFixtures.ts, AdminAttendanceDashboardMockFixtures.ts |
| `admin_attendance/attendance_dashboard/mocks/handlers/` | Mock request handlers. | AdminAttendanceDashboardBranchReferenceMockHandlers.ts, AdminAttendanceDashboardMockHandlers.ts |
| `admin_attendance/attendance_dashboard/mocks/scenarios/` | Mock scenarios and scenario tests. | admin_attendance_dashboard.scenarios.ts |
| `admin_attendance/attendance_dashboard/schemas/` | Runtime validation schemas. | AdminAttendanceDashboardSchemas.ts |
| `admin_attendance/attendance_dashboard/state/` | Client state. | useAdminAttendanceDashboardStore.ts |
| `admin_attendance/attendance_dashboard/tests/harness/` | Feature-owned implementation files. | AdminAttendanceDashboardHarness.tsx, bootstrap.ts |
| `admin_attendance/attendance_dashboard/tests/hooks/` | Feature data-flow and interaction hooks. | useAdminAttendanceDashboardBranchReference.test.ts, useAdminAttendanceDashboardDebounce.test.ts, useAdminAttendanceDashboardLogic.test.ts |
| `admin_attendance/attendance_dashboard/tests/scenarios/` | Mock scenarios and scenario tests. | AdminAttendanceDashboardScenarios.test.ts |
| `admin_attendance/attendance_dashboard/tests/schemas/` | Runtime validation schemas. | AdminAttendanceDashboardSchemas.test.ts |
| `admin_attendance/attendance_dashboard/tests/store/` | Client state. | useAdminAttendanceDashboardStore.test.ts |
| `admin_attendance/attendance_dashboard/tests/utils/` | Deterministic utilities and API response helpers. | AdminAttendanceDashboardApiResponse.test.ts, AdminAttendanceDashboardFormatters.test.ts |
| `admin_attendance/attendance_dashboard/types/` | Domain, DTO, state, and prop types. | AdminAttendanceDashboardBranchReferenceTypes.ts, AdminAttendanceDashboardEmptyStatePropsTypes.ts, AdminAttendanceDashboardErrorFallbackTypes.ts, AdminAttendanceDashboardErrorPropsTypes.ts, AdminAttendanceDashboardMockHandlerTypes.ts, AdminAttendanceDashboardMonitoringTypes.ts, AdminAttendanceDashboardPaginationTypes.ts, AdminAttendanceDashboardQueryTypes.ts, AdminAttendanceDashboardSearchableDropdownTypes.ts, AdminAttendanceDashboardShellContractTypes.ts, AdminAttendanceDashboardStoreStateTypes.ts, AdminAttendanceDashboardTableSkeletonTypes.ts, AdminAttendanceDashboardTypes.ts |
| `admin_attendance/attendance_dashboard/utils/` | Deterministic utilities and API response helpers. | AdminAttendanceDashboardApiResponse.ts, AdminAttendanceDashboardChartThemeTokens.ts, AdminAttendanceDashboardFormatters.ts, AdminAttendanceDashboardTrendDirection.ts, AdminAttendanceDashboardMaskSensitiveData.ts, AdminAttendanceDashboardMonitoring.ts |
| `admin_attendance/attendance_reports/` | Feature-owned implementation files. | admin_attendance_reports_features.md, admin_attendance_reports_forbidden.md, admin_attendance_reports_theme_contract.md, error.tsx, loading.tsx, not-found.tsx, page.tsx |
| `admin_attendance/attendance_reports/api/` | Leaf-owned API transport boundary. | admin_attendance_reports_api.ts, admin_attendance_reports_branch_reference_api.ts |
| `admin_attendance/attendance_reports/components/` | Feature component root. | AdminAttendanceReportsErrorFallback.tsx |
| `admin_attendance/attendance_reports/components/attendance/` | Feature-owned implementation files. | AdminAttendanceReportsSortIcon.tsx, AdminAttendanceReportsTable.tsx |
| `admin_attendance/attendance_reports/components/date_filter/` | Feature-owned implementation files. | AdminAttendanceReportsDateFilterDropdown.tsx |
| `admin_attendance/attendance_reports/components/empty_state/` | Feature-owned implementation files. | AdminAttendanceReportsEmptyState.tsx |
| `admin_attendance/attendance_reports/components/feedback/` | Feedback components. | AdminAttendanceReportsToastService.ts |
| `admin_attendance/attendance_reports/components/main_view/` | Main view and route composition. | AdminAttendanceReportsSectionState.tsx |
| `admin_attendance/attendance_reports/components/progress_bar/` | Feature-owned implementation files. | AdminAttendanceReportsProgressBar.tsx |
| `admin_attendance/attendance_reports/components/searchable_dropdown/` | Accessible searchable dropdown components. | AdminAttendanceReportsSearchableDropdown.tsx |
| `admin_attendance/attendance_reports/components/shell/` | Shell and not-found components. | AdminAttendanceReportsNotFound.tsx |
| `admin_attendance/attendance_reports/config/` | Route and URL configuration. | attendance_reports.url_config.ts |
| `admin_attendance/attendance_reports/constants/` | Constants and query-key registries. | AdminAttendanceReportsConstants.ts, AdminAttendanceReportsQueryKeys.ts |
| `admin_attendance/attendance_reports/contracts/` | Host contract stubs. | host-stubs.d.ts |
| `admin_attendance/attendance_reports/hooks/` | Feature data-flow and interaction hooks. | useAdminAttendanceReportsBranchReference.ts, useAdminAttendanceReportsLogic.ts, useAdminAttendanceReportsMutations.ts, useAdminAttendanceReportsTable.ts |
| `admin_attendance/attendance_reports/locales/` | Localized resources. | admin_attendance_reports_en.json, admin_attendance_reports_hi.json |
| `admin_attendance/attendance_reports/mocks/fixtures/` | Mock fixtures. | AdminAttendanceReportsBranchReferenceMockFixtures.ts, AdminAttendanceReportsMockFixtures.ts |
| `admin_attendance/attendance_reports/mocks/handlers/` | Mock request handlers. | AdminAttendanceReportsBranchReferenceMockHandlers.ts, AdminAttendanceReportsMockHandlers.ts |
| `admin_attendance/attendance_reports/mocks/scenarios/` | Mock scenarios and scenario tests. | admin_attendance_reports.scenarios.ts |
| `admin_attendance/attendance_reports/schemas/` | Runtime validation schemas. | AdminAttendanceReportsSchemas.ts |
| `admin_attendance/attendance_reports/state/` | Client state. | useAdminAttendanceReportsStore.ts, useAdminAttendanceReportsToastStore.ts |
| `admin_attendance/attendance_reports/tests/` | Regression tests and harnesses. | AdminAttendanceReportsDateRangeUtils.test.ts, AdminAttendanceReportsMockFixtures.test.ts |
| `admin_attendance/attendance_reports/tests/api/` | Leaf-owned API transport boundary. | AdminAttendanceReportsExportContract.test.ts, AdminAttendanceReportsFeatureUrlContract.test.ts |
| `admin_attendance/attendance_reports/tests/harness/` | Feature-owned implementation files. | AdminAttendanceReportsHarness.tsx, bootstrap.ts |
| `admin_attendance/attendance_reports/tests/hooks/` | Feature data-flow and interaction hooks. | useAdminAttendanceReportsBranchReference.test.ts, useAdminAttendanceReportsLogic.test.ts, useAdminAttendanceReportsTable.test.ts |
| `admin_attendance/attendance_reports/tests/utils/` | Deterministic utilities and API response helpers. | AdminAttendanceReportsApiResponse.test.ts, AdminAttendanceReportsSortAttendanceRows.test.ts |
| `admin_attendance/attendance_reports/types/` | Domain, DTO, state, and prop types. | AdminAttendanceReportsBranchReferenceTypes.ts, AdminAttendanceReportsDateRangeTypes.ts, AdminAttendanceReportsEmptyStatePropsTypes.ts, AdminAttendanceReportsErrorFallbackTypes.ts, AdminAttendanceReportsErrorPropsTypes.ts, AdminAttendanceReportsMonitoringTypes.ts, AdminAttendanceReportsProgressBarTypes.ts, AdminAttendanceReportsSearchableDropdownTypes.ts, AdminAttendanceReportsSectionStatePropsTypes.ts, AdminAttendanceReportsShellContractTypes.ts, AdminAttendanceReportsSortIconPropsTypes.ts, AdminAttendanceReportsStoreTypes.ts, AdminAttendanceReportsTableTypes.ts, AdminAttendanceReportsToastStoreTypes.ts, AdminAttendanceReportsToastTypes.ts, AdminAttendanceReportsTypes.ts |
| `admin_attendance/attendance_reports/utils/` | Deterministic utilities and API response helpers. | AdminAttendanceReportsApiResponse.ts, AdminAttendanceReportsDateRangeUtils.ts, AdminAttendanceReportsFormatters.ts, AdminAttendanceReportsMonitoring.ts, AdminAttendanceReportsSortAttendanceRows.ts |
## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutBackendMessage`
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutErrorFallback`
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutPagination`
- `@/app/frontend_admin/admin_navigation/components/searchable_dropdown/AdminNavigationLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutNotFound`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutChartThemeTokens`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutDisplayValue`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutMaskSensitiveData`
- `@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutUrlQuerySync`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminAttendanceDashboardEmptyState.tsx` | `Empty state shown when attendance table has zero rows matching current filters.` |
| `AdminAttendanceDashboardKPIs.tsx` | `Renders 4 read-only KPI stat cards for Admin Attendance — today's count, present, late, weekly avg.` |
| `AdminAttendanceDashboardMain.tsx` | `Root client orchestrator for Admin Attendance. Composes KPIs, trend chart, toolbar, and table.` |
| `AdminAttendanceDashboardTable.tsx` | `Renders the read-only paginated attendance records table with status badges and duration.` |
| `AdminAttendanceDashboardToolbar.tsx` | `Renders search input, status filter, branch filter, and date range filter for Admin Attendance.` |
| `AdminAttendanceDashboardTrendChart.tsx` | `Renders the 7-day attendance trend bar chart using ApexCharts. Read-only, no mutations.` |

## User Flows
### Flow 1: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.

## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminAttendanceDashboardBranchReference.ts`, `useAdminAttendanceDashboardLogic.ts`
- **Stores:** `attendance_dashboard/state/useAdminAttendanceDashboardStore.ts` (dashboard filter/pagination UI state), `attendance_reports/state/useAdminAttendanceReportsStore.ts` (reports UI state).
- **Query-key registry:** `admin`, `attendance`, `detail`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.

## API Contract Summary
- **Evidenced module API operations:** `fetchAttendanceRecords`, `fetchAttendanceSummary`, and `fetchAttendanceTrend` are implemented in `admin_attendance_dashboard_api.ts` and consumed by `useAdminAttendanceDashboardLogic.ts`. Their real backend implementation remains **BLOCKED BY SUPPLIED SCOPE** because no backend/OpenAPI contract is included.

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.

## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminAttendanceDashboardEmptyState.tsx` | Empty state shown when attendance table has zero rows matching current filters. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAttendanceDashboardKPIs.tsx` | Renders 4 read-only KPI stat cards for Admin Attendance — today's count, present, late, weekly avg. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAttendanceDashboardMain.tsx` | Root client orchestrator for Admin Attendance. Composes KPIs, trend chart, toolbar, and table. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAttendanceDashboardTable.tsx` | Renders the read-only paginated attendance records table with status badges and duration. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAttendanceDashboardToolbar.tsx` | Renders search input, status filter, branch filter, and date range filter for Admin Attendance. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAttendanceDashboardTrendChart.tsx` | Renders the 7-day attendance trend bar chart using ApexCharts. Read-only, no mutations. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminAttendanceDashboardEmptyState.tsx` | Empty state shown when attendance table has zero rows matching current filters. | 1 |
| `AdminAttendanceDashboardKPIs.tsx` | Renders 4 read-only KPI stat cards for Admin Attendance — today's count, present, late, weekly avg. | 0 |
| `AdminAttendanceDashboardMain.tsx` | Root client orchestrator for Admin Attendance. Composes KPIs, trend chart, toolbar, and table. | 1 |
| `AdminAttendanceDashboardTable.tsx` | Renders the read-only paginated attendance records table with status badges and duration. | 1 |
| `AdminAttendanceDashboardToolbar.tsx` | Renders search input, status filter, branch filter, and date range filter for Admin Attendance. | 4 |
| `AdminAttendanceDashboardTrendChart.tsx` | Renders the 7-day attendance trend bar chart using ApexCharts. Read-only, no mutations. | 0 |

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

`attendance_dashboard/components/`
- `admin_attendance_empty_state/AdminAttendanceDashboardEmptyState.tsx`
- `admin_attendance_kpis/AdminAttendanceDashboardKPIs.tsx`
- `main_view/AdminAttendanceDashboardMain.tsx`
- `admin_attendance_table/AdminAttendanceDashboardTable.tsx`
- `admin_attendance_toolbar/AdminAttendanceDashboardToolbar.tsx`
- `admin_attendance_trend_chart/AdminAttendanceDashboardTrendChart.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_attendance_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.

## Repair Notes — v20_fix

- The attendance API-facing timestamp schema requires ISO datetime strings with an explicit timezone, matching the supplied module fixtures. Display-time-only values are not accepted at the API validation boundary.
- Attendance check-in/check-out display now formats ISO values using `date-fns` and the active `next-intl` locale instead of showing raw ISO strings. Duration calculation safely parses ISO timestamps and the documented legacy display-time formats; missing/invalid/non-positive results show a placeholder.
- Attendance records, summary, and trend queries expose separate status/error/retry paths. Summary or trend failures are visible and retryable even when the record query succeeds.
- Added schema validation tests and expanded formatter/query-hook tests. Test execution remains NOT_VERIFIED because the supplied role archive has no host test toolchain.

### Sorting contract

Attendance column sorting is deliberately page-local. The supplied API contract defines pagination and filters but no server sort field or order parameter. The table announces this boundary to users; do not treat a local sort as a global/all-record ordering.
