# Admin Data Export — Feature Map


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Module Purpose
The Admin Data Export module is the designated administrative entry point for requesting a full data export and offboarding workflow. The current supplied frontend intentionally stops at the scope boundary because no authoritative export API contract is included. The module therefore documents the route and preserves a non-invented blocked state rather than fabricating an endpoint or mock response. It must not be treated as complete until the backend export contract is supplied and the asynchronous request, completion feedback, and recovery flow can be implemented from that contract.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/frontend_admin/admin_data_export/data_export_requests` | ``frontend_admin/admin_data_export/page.tsx`` | ``frontend_admin/admin_data_export/data_export_requests/components/main_view/AdminDataExportRequestsMain.tsx`` |

## Dependency Manifest
- Next.js App Router (framework structure detected; exact version NOT_VERIFIED because the host package manifest is absent)
- TypeScript (strict mode policy)
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_data_export/`. This inventory is regenerated from the current physical source tree; each row lists exact direct files, with no inferred backend contracts.

| Folder | Responsibility | Direct Files |
|---|---|---|
| `admin_data_export/` | Feature-owned implementation files. | admin_data_export_features.md, admin_data_export_forbidden.md, admin_data_export_theme_contract.md, page.tsx |
| `admin_data_export/data_export_requests/` | Feature-owned implementation files. | admin_data_export_requests_features.md, admin_data_export_requests_forbidden.md, admin_data_export_requests_theme_contract.md, error.tsx, loading.tsx, not-found.tsx, page.tsx |
| `admin_data_export/data_export_requests/components/` | Feature component root. | AdminDataExportRequestsErrorFallback.tsx |
| `admin_data_export/data_export_requests/components/main_view/` | Main view and route composition. | AdminDataExportRequestsMain.tsx |
| `admin_data_export/data_export_requests/components/shell/` | Shell and not-found components. | AdminDataExportRequestsNotFound.tsx |
| `admin_data_export/data_export_requests/config/` | Route and URL configuration. | admin_data_export_requests.url_config.ts |
| `admin_data_export/data_export_requests/contracts/` | Host contract stubs. | host-stubs.d.ts |
| `admin_data_export/data_export_requests/locales/` | Localized resources. | admin_data_export_requests_en.json, admin_data_export_requests_hi.json |
| `admin_data_export/data_export_requests/mocks/fixtures/` | Mock fixtures. | AdminDataExportRequestsMockFixturesREADME.md |
| `admin_data_export/data_export_requests/mocks/handlers/` | Mock request handlers. | AdminDataExportRequestsMockHandlersREADME.md |
| `admin_data_export/data_export_requests/mocks/scenarios/` | Mock scenarios and scenario tests. | admin_data_export_requests.scenarios.ts |
| `admin_data_export/data_export_requests/tests/` | Regression tests and harnesses. | AdminDataExportRequestsMain.test.tsx |
| `admin_data_export/data_export_requests/tests/harness/` | Feature-owned implementation files. | AdminDataExportRequestsHarness.tsx, bootstrap.ts |
| `admin_data_export/data_export_requests/tests/scenarios/` | Mock scenarios and scenario tests. | AdminDataExportRequestsScenarios.test.ts |
| `admin_data_export/data_export_requests/types/` | Domain, DTO, state, and prop types. | AdminDataExportRequestsErrorFallbackTypes.ts, AdminDataExportRequestsErrorPropsTypes.ts, AdminDataExportRequestsMonitoringTypes.ts, AdminDataExportRequestsShellContractTypes.ts, AdminDataExportRequestsTypes.ts |
| `admin_data_export/data_export_requests/utils/` | Deterministic utilities and API response helpers. | AdminDataExportRequestsMonitoring.ts |
## Feature Lifecycle Contract
- **Create:** BLOCKED_BY_SUPPLIED_SCOPE — no authoritative export API contract is supplied; do not invent the request endpoint.
- **Read:** No API/query flow is implemented in the supplied module. The route renders a scope-blocked state only.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutErrorFallback`
- `@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutNotFound`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminDataExportRequestsMain.tsx` | `Route-level orchestrator for the documented scope-blocked Admin Data Export feature.` |

## User Flows
### Flow 1: Scope-blocked information flow
1. User opens the documented Data Export route.
2. The route renders the scope-blocked state with the missing-contract explanation.
3. No export request is sent and no fabricated success or background job state is shown.
4. After the authoritative API contract is provided, an approved implementation can add the request, progress, completion, failure and retry workflow.

## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** None; the route contains no query hook.
- **Stores:** None.
- **Query-key registry:** None consumed by the current route; historical placeholder keys are not active.
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.

## API Contract Summary
- **BLOCKED BY SUPPLIED SCOPE:** No trustworthy request/response contract or executable mock transport for the export action is present in the supplied role-only archive. The module therefore does not invent an API client or fake a production export path.

- **Mutation contract:** Not applicable yet; no module API client or mutation is implemented while the authoritative export contract is absent.
- **Response contract:** Not applicable yet; no API response schema or transport is implemented. Do not infer one from the empty API folder.

## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminDataExportRequestsMain.tsx` | Route-level orchestrator for the documented scope-blocked Admin Data Export feature. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminDataExportRequestsMain.tsx` | Route-level orchestrator for the documented scope-blocked Admin Data Export feature. | 0 |

## Repair Notes — v19_fix

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
- [ ] API/mock contract: `BLOCKED BY SUPPLIED SCOPE` — no authoritative export request/response contract was supplied.

## Component Tree

`data_export_requests/components/`
- `main_view/AdminDataExportRequestsMain.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_data_export_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.

## v19 Repair Notes

- v19 source boundary: unused empty constants/query-key/schema placeholder files were removed. The endpoint/request/response contract is still `BLOCKED_BY_SUPPLIED_SCOPE`, so the module does not fabricate a request or export result.

## Repair checkpoint note (static review)

This feature map was reviewed during the frontend role repair sequence. Runtime API behavior and host integration remain unverified where the host configuration or authoritative backend contract is not present in the supplied source snapshot.
