---
feature: "members_directory"
owner_role: "admin"
module_version: 24
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-27"
last_verified_commit: "NOT_AVAILABLE_NO_GIT_METADATA"
documentation_status: "current"
portability_score: "NOT_VERIFIED"
---

# Members Directory — Canonical Feature Contract


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


> Admin v47 clean-break source-level re-audit (2026-10-29): canonical-only routing, route-to-leaf mapping, TypeScript-family syntax, local import resolution, module boundaries, source-level safety patterns, mutation idempotency headers, form validation mapping, and available mock/test paths were statically rechecked. This is not an integrated host typecheck, production build, executed unit test, authenticated browser test, or proof of backend contract compliance. Remaining route/API/runtime exceptions are enumerated in the current audit_evidence/ directory.

## 1. Scope and Non-Scope

The Admin Members module provides the primary administrative workspace for searching, filtering, paging, exporting, and inspecting gym member records. Users can combine member filters, navigate result pages, open a member profile drawer, and export member data through the supplied API contract. The module owns member-specific types, schemas, formatting, query/store state, and localized UI. It does not own branch, billing, HR, or subscription business logic merely because those domains may appear in a member profile.

**Owned artifacts:** local route entry, UI components, hooks, API clients, schemas/types, module state, mocks, tests and EN/HI locales listed in this document.

**Non-scope:** global application wiring, host `globals.css` token mapping, root Next.js rewrites, backend authorization/tenant isolation, and backend data migrations. These cannot be changed or proved from this role ZIP.

## 2. Screen Inventory

| Route / source route | Entry | Main view / evidence |
|---|---|---|
| `/frontend_admin/admin_members/members_directory` | `page.tsx` | canonical route from leaf URL config; main view `admin_members/members_directory/components/main_view/AdminMembersDirectoryMain.tsx` |

**Page lifecycle entries:** `page.tsx` present; `loading.tsx` present; `error.tsx` present; `not-found.tsx` present.

## 3. Navigation Contract

- **Canonical leaf:** `frontend_admin/admin_members/members_directory/`
- **URL config:** `config/admin_members_directory.url_config.ts`
- **Canonical route from config:** `/frontend_admin/admin_members/members_directory`
- **Main view imported by page.tsx:** `admin_members/members_directory/components/main_view/AdminMembersDirectoryMain.tsx`.
- **URL literals in config:** `/frontend_admin/admin_members/members_directory`, `/admin/branches/fetchBranches`, `/frontend_admin/admin_members`, `/admin/members/summary`, `/admin/members/list`, `/admin/members/export`

## 4. API Contract

**API client files:**
- `api/admin_members_directory_api.ts`
- `api/admin_members_directory_branch_reference_api.ts`
- `utils/AdminMembersDirectoryApiResponse.ts` — leaf-local ApiResponse envelope validation and HTTP 400 field-error mapping.

**Exported API operations detected:**
- `fetchMembers`
- `fetchSummary`
- `fetchMemberById`
- `exportMembers`

**Endpoint literals in the feature URL config:**
- `/admin/branches/fetchBranches`
- `/admin/members/summary`
- `/admin/members/list`
- `/admin/members/export`

**Request/response authority:** use the API client, Zod schemas, TypeScript DTOs and local MSW handlers together. The host API transport implementation is absent; no response envelope, Blob handling, or auth behavior beyond local source evidence is certified here.

## 5. Query Key Registry

**Query key files:**
- `constants/AdminMembersDirectoryQueryKeys.ts`

**Named keys/properties detected:**
- `ADMIN_MEMBERS_QUERY_KEYS`
- `all`
- `lists`
- `list`
- `details`
- `detail`
- `key`

## 6. Mutation Inventory

**Mutation hooks:**
- No mutation-named hook file was detected; operations may reside in the main hook.

**Mutation operations detected in hook identifiers:**
- `useAdminMembersExport`

**Safety note:** state-changing API calls must use the host-approved `Idempotency-Key: UUIDv4` behavior; static presence alone does not prove runtime uniqueness or retry correctness.

## 7. Permissions and Role Rules

- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

Role and tenant authorization must be enforced by the backend; frontend visibility is not a security boundary. Do not broaden privileges when repairing UI controls.

## 8. State Ownership

**Local state and data-flow hooks:**
- `state/useAdminMembersDirectoryStore.ts`
- `hooks/useAdminMembersDirectoryBranchReference.ts`
- `hooks/useAdminMembersDirectoryDebounce.ts`
- `hooks/useAdminMembersDirectoryExport.ts`
- `hooks/useAdminMembersDirectoryLogic.ts`

**Persistent module store files:**
- `state/useAdminMembersDirectoryStore.ts`

Server data should remain in the approved TanStack Query layer; transient UI-only state belongs in the feature-local Zustand store or component state according to existing source ownership. Do not persist business entities or sensitive data in `localStorage`.

## 9. Offline and Reconnect Behavior

- No feature-local OfflineBanner/OfflineBlocker or browser online/offline listener was detected. Offline data retention and mutation prevention are NOT_VERIFIED in this leaf.

Do not report offline support as implemented unless the relevant banner/blocker or explicit network recovery logic is present in source and covered by tests.

## 10. Security and PII Rules

- Keep credentials, tokens and sensitive profile values out of browser storage, logs, toast text and mock persistence.
- Validate untrusted request/response data at documented Zod boundaries; do not invent schema constraints absent from source/API evidence.
- Escape/render backend-provided text as text; do not add `dangerouslySetInnerHTML`.
- Use URL-safety helpers for user-controlled download/navigation URLs when those flows exist.
- Do not treat client-side permission checks as backend authorization or tenant isolation.

**Feature-local schemas:**
- `schemas/AdminMembersDirectorySchemas.ts`

## 11. Accessibility Requirements

Static source inventory for this leaf: **22** `aria-*` attributes, **0** visible `<label>` elements and **3** status/alert roles were detected. A source count does not prove WCAG conformance.

- Every control must have an accessible name; error text should be programmatically associated with invalid fields.
- Keyboard focus must remain visible, dialog focus must be managed, Escape should close dismissible overlays, and sorting controls must be actual buttons or links with accessible sort state.
- Preserve semantic table headers and meaningful empty/loading/error announcements.
- Respect reduced-motion preferences for non-essential motion and verify contrast using the canonical host theme tokens.

## 12. Background Tasks

- `hooks/useAdminMembersDirectoryDebounce.ts`

Any asynchronous subscription, timer, or animation frame must have lifecycle cleanup. No background scheduler should be added without a documented feature requirement.

## 13. Feature Flags

- No named feature flag or feature-enabled switch was detected in the current leaf source.

Do not introduce a new feature flag or treat environment variables as a permission control without an approved product contract.

## 14. Cache Invalidation

**Invalidation calls detected in hooks:**
- `ADMIN_MEMBERS_QUERY_KEYS.key('list') `
- `ADMIN_MEMBERS_QUERY_KEYS.key('summary') `

**Query key files:** `constants/AdminMembersDirectoryQueryKeys.ts`.

Mutations should invalidate only the query families affected by their real API changes. Avoid broad unrelated invalidation and avoid optimistic state changes without rollback handling.

## 15. Migration and Rollback

No database migration or backend schema migration is owned in this frontend leaf. Route changes must preserve the current URL config and be recorded in the role route-preservation matrix. Rollback for frontend-only changes is the versioned source patch plus restoration of the prior module route entry; host rewrites must be rolled back separately in the host repository because they are not included here.

## 16. Test Coverage Map

Co-located test sources verified in this leaf:
- `tests/api/AdminMembersDirectoryApi.test.ts`
- `tests/api/AdminMembersDirectoryBranchReferenceApi.test.ts`
- `tests/api/AdminMembersDirectoryUrlConfig.test.ts`
- `tests/components/header_search/AdminMembersDirectoryHeaderSearch.test.tsx`
- `tests/components/profile_drawer/AdminMembersDirectoryProfileDrawer.test.tsx`
- `tests/hooks/useAdminMembersDirectoryBranchReference.test.ts`
- `tests/hooks/useAdminMembersDirectoryDebounce.test.ts`
- `tests/hooks/useAdminMembersDirectoryExport.test.tsx`
- `tests/hooks/useAdminMembersDirectoryHeaderSearch.test.ts`
- `tests/hooks/useAdminMembersDirectoryLogic.test.ts`
- `tests/scenarios/AdminMembersDirectoryScenarios.test.ts`
- `tests/schemas/AdminMembersDirectoryBranchReferenceSchema.test.ts`
- `tests/store/useAdminMembersDirectoryStore.test.ts`
- `tests/utils/AdminMembersDirectoryApiResponse.test.ts`
- `tests/utils/AdminMembersDirectoryCreateExportCsv.test.ts`
- `tests/utils/AdminMembersDirectoryFormatCurrency.test.ts`
- `tests/utils/AdminMembersDirectoryFormatters.test.ts`

Test execution requires the host package manifest, installed test runner/dependencies, and authenticated runtime. Integrated execution is `DEFERRED_TO_HOST_RUNTIME` for this isolated role ZIP.

## 17. Architecture Exceptions

- No `architecture-exception:` source annotation was detected in this leaf.

Any exception must include rule ID, reason, affected files, risk, compensating control, review/expiry date and approver where required. The absence of an annotation does not establish that no undocumented deviation exists.

## 18. Known Contract Gaps

- `CSV/Blob/file-download transport depends on host `@/lib/api` behavior; the host transport implementation is absent from the supplied role archive.`

Additional host limits applying to all modules: host `package.json`, `tsconfig`, Next.js rewrite config, `globals.css`, API transport, live service and authenticated browser state are absent. Relevant items remain `DEFERRED_TO_HOST_RUNTIME`, `OUTSIDE_SUPPLIED_SCOPE`, or `BLOCKED_BY_SUPPLIED_CONTRACT` rather than PASS.

## 19. Rule Compliance Checklist

| # | Verification item | Status | Evidence / limitation |
|---:|---|---|---|
| 01 | Autonomous feature leaf has a page entry | `PASS` | page.tsx |
| 02 | Feature-local documentation trio exists | `PASS` | `admin_members_directory_features.md`, `admin_members_directory_forbidden.md`, `admin_members_directory_theme_contract.md` present in this leaf; physical existence only, content compliance not implied |
| 03 | Central URL config exists | `PASS` | config directory inventory |
| 04 | API service is feature-local | `PASS` | api directory inventory |
| 05 | Zod schema exists | `PASS` | schemas directory inventory |
| 06 | Type contracts exist | `PASS` | types directory inventory |
| 07 | Module state is feature-local | `PASS` | state directory inventory |
| 08 | Feature-local mock handlers exist | `PASS` | mocks directory inventory |
| 09 | Feature-local fixture files exist | `PASS` | mocks directory inventory |
| 10 | Co-located test suite exists | `PASS` | tests directory inventory |
| 11 | EN locale exists | `PASS` | locale file inventory |
| 12 | HI locale exists | `PASS` | locale file inventory |
| 13 | Page loading state exists | `PASS` | loading.tsx |
| 14 | Page error boundary exists | `PASS` | error.tsx |
| 15 | Page not-found boundary exists | `PASS` | not-found.tsx |
| 16 | Accessible attributes are present in UI source | `PASS` | 22 aria attributes; 0 labels |
| 17 | Loading/error status announcements are present | `PASS` | 3 status/alert roles |
| 18 | Mutation idempotency behavior | `NOT_VERIFIED` | source scan cannot prove UUID format or retry semantics |
| 19 | API envelopes match host runtime | `DEFERRED_TO_HOST_RUNTIME` | host @/lib/api implementation absent |
| 20 | TypeScript semantic typecheck | `DEFERRED_TO_HOST_RUNTIME` | host tsconfig/package manifest absent |
| 21 | ESLint and dependency-boundary rules | `DEFERRED_TO_HOST_RUNTIME` | host lint config and dependency graph absent |
| 22 | Unit/component tests execute | `DEFERRED_TO_HOST_RUNTIME` | host package scripts and test dependencies absent |
| 23 | Playwright browser E2E executes | `DEFERRED_TO_HOST_RUNTIME` | host app/authenticated runtime absent |
| 24 | Keyboard interaction verified in browser | `DEFERRED_TO_HOST_RUNTIME` | source and unit tests exist; live browser unavailable |
| 25 | 320px layout verified in browser | `DEFERRED_TO_HOST_RUNTIME` | no browser runtime in isolated archive |
| 26 | 375px layout verified in browser | `DEFERRED_TO_HOST_RUNTIME` | no browser runtime in isolated archive |
| 27 | 768px layout verified in browser | `DEFERRED_TO_HOST_RUNTIME` | no browser runtime in isolated archive |
| 28 | 1024px layout verified in browser | `DEFERRED_TO_HOST_RUNTIME` | no browser runtime in isolated archive |
| 29 | 1440px layout verified in browser | `DEFERRED_TO_HOST_RUNTIME` | no browser runtime in isolated archive |
| 30 | Host auth/RBAC enforcement verified | `OUTSIDE_SUPPLIED_SCOPE` | backend and host auth source absent |
| 31 | Tenant isolation verified end-to-end | `OUTSIDE_SUPPLIED_SCOPE` | backend and host auth source absent |
| 32 | Theme token mapping in globals.css verified | `OUTSIDE_SUPPLIED_SCOPE` | canonical host globals.css not included |
| 33 | Reduced-motion behavior browser-tested | `DEFERRED_TO_HOST_RUNTIME` | browser media emulation not available |
| 34 | Screen-reader semantics tested | `DEFERRED_TO_HOST_RUNTIME` | assistive-technology runtime unavailable |
| 35 | Host-stub declarations exist for isolated compilation | `PASS` | contracts/host-stubs.d.ts; must be excluded from host compilation |
| 36 | Standalone MSW test bootstrap exists | `PASS` | tests/harness/bootstrap.ts |
| 37 | Canonical mock scenario registry exists | `PASS` | mocks/scenarios inventory |
| 38 | Mock timeout/unauthorized scenario source is present | `PASS` | Scenario helper source exists; runtime execution remains deferred. |

## 20. Standalone Run, Mock & Test Harness

**Primary route:** the source route listed in Section 2. **Module path:** `frontend_admin/admin_members/members_directory/`.

**Tests:** in a complete host checkout, run the repository's approved test command scoped to this leaf, for example `npm run test -- frontend_admin/admin_members/members_directory/tests`. This archive has no root `package.json` or test-runner config, so the command cannot be run here and is not represented as passing.

**Mocks:** fixtures and handlers listed below provide the current source-owned mock boundary:
- `mocks/fixtures/AdminMembersDirectoryBranchReferenceMockFixtures.ts`
- `mocks/fixtures/AdminMembersDirectoryMockFixtures.ts`
- `mocks/handlers/AdminMembersDirectoryBranchReferenceMockHandlers.ts`
- `mocks/handlers/AdminMembersDirectoryMockHandlers.ts`
- `mocks/scenarios/admin_members_directory.scenarios.ts`

**Scenario support source:**
- `mocks/scenarios/admin_members_directory.scenarios.ts`

Active scenarios use the feature-owned handler arrays. The scenario helper can inject `SERVER_500`, a 15-second `TIMEOUT`, or `UNAUTHORIZED` failure envelopes against a caller-supplied verified route. `EMPTY` requires a caller-supplied response payload that matches the endpoint's real schema; the helper never guesses this shape. Contract-blocked modules retain their blocked disposition rather than creating fake endpoints. Scenario test sources are present, but test execution is `DEFERRED_TO_HOST_RUNTIME` because host dependencies and scripts are absent. Test credentials are not embedded in this ZIP; use host-approved non-production test identities only.

## 21. Module Portability & Host Integration Guide

1. **Copy the leaf** `frontend_admin/admin_members/members_directory/` without sibling business modules.
3. **Provide verified host infrastructure** for `@/lib/api`, logging, auth/session, socket clients, global zero-business UI primitives, theme tokens and localization. Only use dependencies actually imported by this leaf.
4. **Run validation** using host `tsc --noEmit`, lint, module unit tests/MSW, production build and Playwright E2E. None of these host-dependent commands is claimed to pass from this isolated archive.

### Approved External Dependencies

**Host/application infrastructure imports found in this leaf:**
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutErrorFallback`
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutPagination`
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutBackendMessage`
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutToastService`
- `@/app/frontend_admin/admin_navigation/components/searchable_dropdown/AdminNavigationLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutNotFound`
- `@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutUrlQuerySync`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutDisplayValue`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutMaskSensitiveData`
- `@/lib/api`

**Potential business-module imports outside this leaf:**
- No cross-feature business import specifiers were detected by the literal import scan; this does not replace host ESLint boundary execution.

`contracts/host-stubs.d.ts`, `tests/harness/bootstrap.ts`, a provider harness, and a module-owned scenario registry are included where an API contract exists. The host stub is an isolated-zip fallback and MUST be excluded from the full host TypeScript compilation so it cannot shadow or merge with real host contracts. Host runtime and strict semantic compilation remain unverified.

## 22. Deliverables & Version History

| Version | Date | Revision | Evidence / status |
|---|---|---|---|
| v34-audit | 2026-10-27 | Replaced unresolved documentation template expressions with source-derived import inventories; completed deeper static rule and repair evidence review. | Source-level review only; portability score **NOT_VERIFIED** until host compile/test/browser checks and all eight portability gates pass. |

**Portability score:** `NOT_VERIFIED` (not 8/8). The eight gates—ZIP self-sufficiency, zero cross-module imports, complete mutable mock scenarios, standalone harness, token integrity, all three async states, mutation safety, and responsive viewport coverage—must each be independently evidenced before an 8/8 claim is valid.


### RBG 19 verified repair note (2026-11-01)
- Member rows navigate to the verified canonical leaf detail URL with keyboard/primary-click support; existing member-name links are preserved.
- The profile drawer uses Escape dismissal, initial focus and focus restoration. Directory toast feedback now flows through the role host toast store.
- Branch reference query failures are surfaced with Retry instead of silently mapping missing data to `[]`; mock branch ID/name pairs match the owning member fixtures.
- `this_month` expiring member count/filter excludes dates before today. No server-wide filter/sort behavior is asserted from MSW fixture tests.
- Original generic host primitive ownership issue `ISSUE-197` remains open for separate contract reconciliation.


## RBG39 — URL path-segment safety (source-backed repair)
The existing ADMIN_MEMBERS_DETAIL_URL dynamic URL builder refuses empty, whitespace-only, `.` or `..` identifiers before inserting a dynamic path segment. Other identifiers remain `encodeURIComponent` encoded. The endpoint shape is unchanged. Feature-local regression coverage checks the existing ordinary URL, encoded delimiters, and fail-closed reserved identifiers. External backend authorization and live API reachability remain `DEFERRED_TO_HOST_RUNTIME`; this does not close ISSUE-182 or ISSUE-229/230.

### RBG 57 — user-visible error privacy

Member export and selected-member detail failures show their already-existing translated generic messages, not arbitrary server exception text; query retry handles are preserved.

Source verification is bounded to the affected frontend handlers. Backend contracts and host-runtime validation remain pending.


### RBG 64 — controlled pagination correctness
Mock GET pagination: page and limit reject zero, negative, fractional, exponent, nonfinite, whitespace and unsafe-integer inputs. Each endpoint retains its existing defaults; production API routes/fixtures and response envelopes remain unchanged. New module-owned regression tests authored; full MSW/Vitest and host integration not executed.


### RBG 66 — controlled pagination correctness
Untrusted page changes from the URL synchronization adapter now accept only positive safe integer values. Invalid decimals, exponent strings, Infinity, zero and unsafe integers fall back to page one before updating leaf store; valid integer pages preserve behavior. Hook integration/host tests remain unexecuted.

### RBG 82 — Safe CSV spreadsheet consumers
Members bulk CSV exports retain the approved seven non-PII fields, double-quote escaping, and row ordering. Fields that begin (after leading whitespace/control/BOM characters) with `=`, `+`, `-`, or `@` receive a literal apostrophe before CSV quoting to prevent direct spreadsheet formula interpretation. This applies to the module-owned mock CSV output, not to any unverified backend-generated export format.
### RBG 91 — browser export lifecycle
The leaf-owned CSV download helper mounts a temporary anchor and revokes its object URL and removes the anchor in nested `finally` blocks, including DOM/click failure. The existing export hook only sends success feedback when the helper completes; error toast and pending-lock reset are preserved. This does not validate backend-generated CSV content, streaming or browser compatibility.

### RBG 105 — Mock expiration classification
The date-dependent members filters and summary counts share a pure, module-owned validity/eligibility boundary. Invalid or impossible expiry dates do not become upcoming-this-week or this-month figures. Existing list/export filters and DTOs are unchanged; mock-only safety does not establish production backend rules.

## RBG137 source-scoped repair note

- URL history hydration now restores missing keys to documented defaults and merges pending local replacements without overwriting external navigation.
- Mock member-list page sizes are bounded; obsolete page requests report a reachable page and consistent meta. Production server pagination behavior remains unverified.
- Member search trims whitespace; real list pages recover from obsolete server-reported total counts.
- Pagination controls and searchable dropdown keyboard/disabled behavior are bounded and focus-aware.
- See `tests/` for authored source-native regressions. Official Vitest, Playwright and backend access-control verification remain **NOT EXECUTED**.
