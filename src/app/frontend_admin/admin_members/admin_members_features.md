# Admin Members — Feature Map


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


## Module Purpose
The Admin Members module provides the primary administrative workspace for searching, filtering, paging, exporting, and inspecting gym member records. Users can combine member filters, navigate result pages, open a member profile drawer, and export member data through the supplied API contract. The module owns member-specific types, schemas, formatting, query/store state, and localized UI. It does not own branch, billing, HR, or subscription business logic merely because those domains may appear in a member profile.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/frontend_admin/admin_members/members_directory` | ``frontend_admin/admin_members/page.tsx`` | ``frontend_admin/admin_members/members_directory/components/admin_members_main/AdminMembersMain.tsx`` |

## Dependency Manifest
- Next.js App Router (framework structure detected; exact version NOT_VERIFIED because the host package manifest is absent)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical domain root: `frontend_admin/admin_members/`. Source-backed leaf inventory:

| Leaf | Canonical source directories |
|---|---|
| `members_directory/` | `api/`, `components/`, `config/`, `constants/`, `contracts/`, `hooks/`, `locales/`, `mocks/`, `schemas/`, `state/`, `tests/`, `types/`, `utils/` |
| `members_blacklist_management/` | `api/`, `components/`, `config/`, `constants/`, `contracts/`, `hooks/`, `locales/`, `mocks/`, `schemas/`, `state/`, `tests/`, `types/`, `utils/` |

Both leaves own their own `_features.md`, `_forbidden.md`, `_theme_contract.md`, `config/*.url_config.ts`, and `contracts/host-stubs.d.ts`. The canonical Member Directory main/table components live in `members_directory/components/main_view/` and `members_directory/components/table/`, not retired `admin_members_main` folders.

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutBackendMessage`
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutToastService`
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutErrorFallback`
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutPagination`
- `@/app/frontend_admin/admin_navigation/components/searchable_dropdown/AdminNavigationLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutNotFound`
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
| `AdminMembersEmptyState.tsx` | `Renders the empty state for Admin Members when no results match filters.` |
| `AdminMembersHeaderSearch.tsx` | `Renders/orchestrates AdminMembersHeaderSearch for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.` |
| `AdminMembersKPIs.tsx` | `Renders the 4 KPI stat cards for the Admin Members module (total, active, expiring, outstanding).` |
| `AdminMembersDirectoryMain.tsx` | `Main entry point for Admin Members module. Composes KPIs, toolbar, table, and profile drawer.` |
| `AdminMembersProfileDrawer.tsx` | `Renders the slide-in profile drawer for a selected member showing full details.` |
| `AdminMembersDirectoryTable.tsx` | `Renders the paginated members table with clickable rows, status badges, and branch info.` |
| `AdminMembersToolbar.tsx` | `Renders the search, status filter, branch filter, and expiry filter toolbar for Admin Members.` |

## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.

## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminMembersBranchReference.ts`, `useAdminMembersLogic.ts`
- **Stores:** `useAdminMembersStore.ts`
- **Query-key registry:** `admin`, `detail`, `list`, `members`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.

## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `admin_members_directory_api.ts` | `fetchMembers` | `GET` | `params: FetchMembersParams` | `ApiResponse<AdminMember[]` |
| `admin_members_directory_api.ts` | `fetchSummary` | `GET` | `branchId?: string` | `ApiResponse<AdminMembersSummary` |
| `admin_members_directory_api.ts` | `fetchMemberById` | `GET` | `memberId: string` | `ApiResponse<AdminMember` |
| `admin_members_directory_api.ts` | `exportMembers` | `GET` | `params: Omit<FetchMembersParams, 'page' | 'limit'>` | `ApiResponse<string` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

**Route-semantics blocker (ISSUE-017):** the current URL config returns `/admin/members?memberId=...` for the detail builder. This inventory records the literal as source evidence only; it does not certify that path as an approved canonical frontend route. Keep the intended member-detail behavior unresolved until an authoritative route decision and caller/navigation evidence are supplied.

| URL config | Entry |
|---|---|
| `admin_members/members_directory/config/admin_members_directory.url_config.ts` | `detail: (memberId: string) => `/admin/members?memberId=${encodeURIComponent(memberId)}`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.

## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminMembersEmptyState.tsx` | Renders the empty state for Admin Members when no results match filters. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersHeaderSearch.tsx` | Renders/orchestrates AdminMembersHeaderSearch for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersKPIs.tsx` | Renders the 4 KPI stat cards for the Admin Members module (total, active, expiring, outstanding). | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersDirectoryMain.tsx` | Main entry point for Admin Members module. Composes KPIs, toolbar, table, and profile drawer. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersProfileDrawer.tsx` | Renders the slide-in profile drawer for a selected member showing full details. | 3 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersDirectoryTable.tsx` | Renders the paginated members table with clickable rows, status badges, and branch info. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminMembersToolbar.tsx` | Renders the search, status filter, branch filter, and expiry filter toolbar for Admin Members. | 6 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminMembersEmptyState.tsx` | Renders the empty state for Admin Members when no results match filters. | 1 |
| `AdminMembersHeaderSearch.tsx` | Renders/orchestrates AdminMembersHeaderSearch for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs. | 4 |
| `AdminMembersKPIs.tsx` | Renders the 4 KPI stat cards for the Admin Members module (total, active, expiring, outstanding). | 0 |
| `AdminMembersDirectoryMain.tsx` | Main entry point for Admin Members module. Composes KPIs, toolbar, table, and profile drawer. | 0 |
| `AdminMembersProfileDrawer.tsx` | Renders the slide-in profile drawer for a selected member showing full details. | 3 |
| `AdminMembersDirectoryTable.tsx` | Renders the paginated members table with clickable rows, status badges, and branch info. | 1 |
| `AdminMembersToolbar.tsx` | Renders the search, status filter, branch filter, and expiry filter toolbar for Admin Members. | 6 |

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

## Component Tree — refreshed RBG 3 snapshot

`members_directory/components/`
- `admin_members_empty_state/`
  - `admin_members_empty_state/AdminMembersEmptyState.tsx`
- `admin_members_header_search/`
  - `admin_members_header_search/AdminMembersHeaderSearch.tsx`
- `admin_members_kpis/`
  - `admin_members_kpis/AdminMembersKPIs.tsx`
- `admin_members_main/`
  - `admin_members_main/AdminMembersMain.tsx`
- `admin_members_profile_drawer/`
  - `admin_members_profile_drawer/AdminMembersProfileDrawer.tsx`
- `admin_members_table/`
  - `admin_members_table/AdminMembersTable.tsx`
- `admin_members_toolbar/`
  - `admin_members_toolbar/AdminMembersToolbar.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_members_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.

## Final domain ownership
The Members domain owns `members_directory/` and `members_blacklist_management/`. Blacklist management is a sibling leaf under Members, not a top-level primary navigation destination.


## Current canonical leaf inventory (RBG 18 verified)
- `members_directory/` — directory search, member listing, detail drawer; actual UI at `components/main_view/AdminMembersDirectoryMain.tsx` and `components/table/AdminMembersDirectoryTable.tsx`.
- `members_blacklist_management/` — blacklist list, scope, confirmation, add/removal and propagation; see `members_blacklist_management/admin_members_blacklist_management_features.md`.
- Retired references to `components/main_view/`, `AdminMembersDirectoryMain.tsx`, or `AdminMembersDirectoryTable.tsx` in earlier historical tables are **not** valid current file paths. Refer to the physical inventory above.
