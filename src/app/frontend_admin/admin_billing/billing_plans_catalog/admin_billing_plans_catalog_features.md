---
feature: "plans_catalog"
owner_role: "admin"
module_version: 24
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-27"
last_verified_commit: "NOT_AVAILABLE_NO_GIT_METADATA"
documentation_status: "current"
portability_score: "NOT_VERIFIED"
---

# Plans Catalog — Canonical Feature Contract


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


> Admin v47 clean-break source-level re-audit (2026-10-29): canonical-only routing, route-to-leaf mapping, TypeScript-family syntax, local import resolution, module boundaries, source-level safety patterns, mutation idempotency headers, form validation mapping, and available mock/test paths were statically rechecked. This is not an integrated host typecheck, production build, executed unit test, authenticated browser test, or proof of backend contract compliance. Remaining route/API/runtime exceptions are enumerated in the current audit_evidence/ directory.

## 1. Scope and Non-Scope

The `plans_catalog` autonomous admin feature owns its route-entry UI and the feature-local code listed below.

**Owned artifacts:** local route entry, UI components, hooks, API clients, schemas/types, module state, mocks, tests and EN/HI locales listed in this document.

**Non-scope:** global application wiring, host `globals.css` token mapping, root Next.js rewrites, backend authorization/tenant isolation, and backend data migrations. These cannot be changed or proved from this role ZIP.

## 2. Screen Inventory

| Route / source route | Entry | Main view / evidence |
|---|---|---|
| `/frontend_admin/admin_billing/billing_plans_catalog` | `page.tsx` | canonical route from leaf URL config; main view `admin_billing/billing_plans_catalog/components/main_view/AdminBillingPlansCatalogMain.tsx` |

**Page lifecycle entries:** `page.tsx` present; `loading.tsx` present; `error.tsx` present; `not-found.tsx` present.

## 3. Navigation Contract

- **Canonical leaf:** `frontend_admin/admin_billing/billing_plans_catalog/`
- **URL config:** `config/admin_billing_plans_catalog.url_config.ts`
- **Canonical route from config:** `/frontend_admin/admin_billing/billing_plans_catalog`
- **Main view imported by page.tsx:** `admin_billing/billing_plans_catalog/components/main_view/AdminBillingPlansCatalogMain.tsx`.
- **URL literals in config:** `/frontend_admin/admin_billing/billing_plans_catalog`, `/frontend_admin/admin_dashboard`, `/frontend_admin/admin_billing/billing_plans_catalog`, `/admin/plans/fetchAllPlans`, `/admin/plans/fetchPlanById`, `/admin/plans/createPlan`, `/admin/plans/updatePlan`, `/admin/plans/deletePlan`

## 4. API Contract

**API client files:**
- `api/admin_billing_plans_catalog_api.ts`
- `utils/AdminBillingPlansCatalogApiResponse.ts` — leaf-local ApiResponse envelope validation and HTTP 400 field-error mapping.

**Exported API operations detected:**
- `fetchAllPlans`
- `fetchPlanById`
- `createPlan`
- `updatePlan`
- `deletePlan`

**Endpoint literals in the feature URL config:**
- `/admin/plans/fetchAllPlans`
- `/admin/plans/fetchPlanById`
- `/admin/plans/createPlan`
- `/admin/plans/updatePlan`
- `/admin/plans/deletePlan`

**Request/response authority:** use the API client, Zod schemas, TypeScript DTOs and local MSW handlers together. The host API transport implementation is absent; no response envelope, Blob handling, or auth behavior beyond local source evidence is certified here.

## 5. Query Key Registry

**Query key files:**
- `constants/admin_billing_plans_catalog.query_keys.ts`

**Named keys/properties detected:**
- `ADMIN_PLANS_QUERY_KEYS`
- `all`
- `lists`
- `list`
- `details`
- `detail`
- `key`

## 6. Mutation Inventory

**Mutation hooks:**
- `hooks/useAdminBillingPlansCatalogMutations.ts`
- `hooks/useAdminBillingPlansCatalogUnsavedChangesGuard.ts`

**Mutation operations detected in hook identifiers:**
- `useAdminPlansMutations`
- `createMutation`
- `updateMutation`
- `deleteMutation`

**Safety note:** state-changing API calls must use the host-approved `Idempotency-Key: UUIDv4` behavior; static presence alone does not prove runtime uniqueness or retry correctness.

## 7. Permissions and Role Rules

Permission-related source evidence:
- `components/empty_state/AdminBillingPlansCatalogEmptyState.tsx:13` — `* @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view la`
- `components/grid/AdminBillingPlansCatalogGrid.tsx:18` — `* @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view la`
- `components/main_view/AdminBillingPlansCatalogMain.tsx:13` — `* @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view la`
- `components/modal/AdminBillingPlansCatalogModal.tsx:18` — `* @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view la`
- `hooks/useAdminBillingPlansCatalogModalForm.ts:6` — `* @edge-case Preserves validation, cancel, and failed-submit recovery without leaking business state.`
- `components/toolbar/AdminBillingPlansCatalogToolbar.tsx:16` — `* @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view la`
- `hooks/useAdminBillingPlansCatalogToolbarSearch.ts:7` — `* @edge-case Cancels pending searches and mirrors external search changes without stale local values.`
- `constants/admin_billing_plans_catalog.constants.ts:1` — `// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.`
- `constants/admin_billing_plans_catalog.query_keys.ts:1` — `// RESPONSIBILITY: Canonical TanStack Query key registry for the AdminPlans Admin feature.`
- `hooks/useAdminBillingPlansCatalogLogic.ts:25` — `* @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.`
- `hooks/useAdminBillingPlansCatalogMutations.ts:18` — `* @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.`
- `state/useAdminBillingPlansCatalogStore.ts:8` — `* @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.`

Role and tenant authorization must be enforced by the backend; frontend visibility is not a security boundary. Do not broaden privileges when repairing UI controls.

## 8. State Ownership

**Local state and data-flow hooks:**
- `state/useAdminBillingPlansCatalogStore.ts`
- `hooks/useAdminBillingPlansCatalogLogic.ts`
- `hooks/useAdminBillingPlansCatalogMutations.ts`
- `hooks/useAdminBillingPlansCatalogUnsavedChangesGuard.ts`

**Persistent module store files:**
- `state/useAdminBillingPlansCatalogStore.ts`

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
- `schemas/AdminBillingPlansCatalogSchemas.ts`

## 11. Accessibility Requirements

Static source inventory for this leaf: **18** `aria-*` attributes, **6** visible `<label>` elements and **2** status/alert roles were detected. A source count does not prove WCAG conformance.

- Every control must have an accessible name; error text should be programmatically associated with invalid fields.
- Keyboard focus must remain visible, dialog focus must be managed, Escape should close dismissible overlays, and sorting controls must be actual buttons or links with accessible sort state.
- Preserve semantic table headers and meaningful empty/loading/error announcements.
- Respect reduced-motion preferences for non-essential motion and verify contrast using the canonical host theme tokens.

## 12. Background Tasks

- `hooks/useAdminBillingPlansCatalogToolbarSearch.ts`

Any asynchronous subscription, timer, or animation frame must have lifecycle cleanup. No background scheduler should be added without a documented feature requirement.

## 13. Feature Flags

- No named feature flag or feature-enabled switch was detected in the current leaf source.

Do not introduce a new feature flag or treat environment variables as a permission control without an approved product contract.

## 14. Cache Invalidation

**Invalidation calls detected in hooks:**
- `ADMIN_PLANS_QUERY_KEYS.key('list') `

**Query key files:** `constants/admin_billing_plans_catalog.query_keys.ts`.

Mutations should invalidate only the query families affected by their real API changes. Avoid broad unrelated invalidation and avoid optimistic state changes without rollback handling.

## 15. Migration and Rollback

No database migration or backend schema migration is owned in this frontend leaf. Route changes must preserve the current URL config and be recorded in the role route-preservation matrix. Rollback for frontend-only changes is the versioned source patch plus restoration of the prior module route entry; host rewrites must be rolled back separately in the host repository because they are not included here.

## 16. Test Coverage Map

Co-located test sources verified in this leaf:
- `tests/hooks/useAdminBillingPlansCatalogLogic.test.ts`
- `tests/hooks/useAdminBillingPlansCatalogModalForm.test.ts`
- `tests/hooks/useAdminBillingPlansCatalogMutations.test.tsx`
- `tests/hooks/useAdminBillingPlansCatalogToolbarSearch.test.ts`
- `tests/hooks/useAdminBillingPlansCatalogUnsavedChangesGuard.test.ts`
- `tests/scenarios/AdminBillingPlansCatalogScenarios.test.ts`
- `tests/schemas/AdminBillingPlansCatalogSchemas.test.ts`
- `tests/store/useAdminBillingPlansCatalogStore.test.ts`
- `tests/utils/AdminBillingPlansCatalogApiResponse.test.ts`
- `tests/utils/AdminBillingPlansCatalogCurrencyUnits.test.ts`
- `tests/utils/AdminBillingPlansCatalogFormatCurrency.test.ts`
- `tests/utils/AdminBillingPlansCatalogFormatters.test.ts`
- `tests/utils/AdminBillingPlansCatalogUrlState.test.ts`

Test execution requires the host package manifest, installed test runner/dependencies, and authenticated runtime. Integrated execution is `DEFERRED_TO_HOST_RUNTIME` for this isolated role ZIP.

## 17. Architecture Exceptions

- No `architecture-exception:` source annotation was detected in this leaf.

Any exception must include rule ID, reason, affected files, risk, compensating control, review/expiry date and approver where required. The absence of an annotation does not establish that no undocumented deviation exists.

## 18. Known Contract Gaps

- `The unused GET-with-body plan-detail transport shape is not established by the supplied host API contract.`

Additional host limits applying to all modules: host `package.json`, `tsconfig`, Next.js rewrite config, `globals.css`, API transport, live service and authenticated browser state are absent. Relevant items remain `DEFERRED_TO_HOST_RUNTIME`, `OUTSIDE_SUPPLIED_SCOPE`, or `BLOCKED_BY_SUPPLIED_CONTRACT` rather than PASS.

## 19. Rule Compliance Checklist

| # | Verification item | Status | Evidence / limitation |
|---:|---|---|---|
| 01 | Autonomous feature leaf has a page entry | `PASS` | page.tsx |
| 02 | Feature-local documentation trio exists | `PASS` | `admin_billing_plans_catalog_features.md`, `admin_billing_plans_catalog_forbidden.md`, `admin_billing_plans_catalog_theme_contract.md` present in this leaf; physical existence only, content compliance not implied |
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
| 16 | Accessible attributes are present in UI source | `PASS` | 18 aria attributes; 6 labels |
| 17 | Loading/error status announcements are present | `PASS` | 2 status/alert roles |
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

**Primary route:** the source route listed in Section 2. **Module path:** `frontend_admin/admin_billing/billing_plans_catalog/`.

**Tests:** in a complete host checkout, run the repository's approved test command scoped to this leaf, for example `npm run test -- frontend_admin/admin_billing/billing_plans_catalog/tests`. This archive has no root `package.json` or test-runner config, so the command cannot be run here and is not represented as passing.

**Mocks:** fixtures and handlers listed below provide the current source-owned mock boundary:
- `mocks/fixtures/AdminBillingPlansCatalogMockFixtures.ts`
- `mocks/handlers/AdminBillingPlansCatalogMockHandlers.ts`
- `mocks/scenarios/admin_billing_plans_catalog.scenarios.ts`

**Scenario support source:**
- `mocks/scenarios/admin_billing_plans_catalog.scenarios.ts`

Active scenarios use the feature-owned handler arrays. The scenario helper can inject `SERVER_500`, a 15-second `TIMEOUT`, or `UNAUTHORIZED` failure envelopes against a caller-supplied verified route. `EMPTY` requires a caller-supplied response payload that matches the endpoint's real schema; the helper never guesses this shape. Contract-blocked modules retain their blocked disposition rather than creating fake endpoints. Scenario test sources are present, but test execution is `DEFERRED_TO_HOST_RUNTIME` because host dependencies and scripts are absent. Test credentials are not embedded in this ZIP; use host-approved non-production test identities only.

## 21. Module Portability & Host Integration Guide

1. **Copy the leaf** `frontend_admin/admin_billing/billing_plans_catalog/` without sibling business modules.
3. **Provide verified host infrastructure** for `@/lib/api`, logging, auth/session, socket clients, global zero-business UI primitives, theme tokens and localization. Only use dependencies actually imported by this leaf.
4. **Run validation** using host `tsc --noEmit`, lint, module unit tests/MSW, production build and Playwright E2E. None of these host-dependent commands is claimed to pass from this isolated archive.

### Approved External Dependencies

**Direct host/application import evidence (RBG4 source inventory):**
- `@/lib/api` is the verified direct host application import.
- The previously listed eleven Admin Navigation helpers/components are **not** direct imports of this leaf in the RBG4 source. They are leaf-local copies with matching host counterparts; the earlier inventory mislabeled them as imported host dependencies.
- Local counterparts include `components/AdminBillingPlansCatalogPagination.tsx`, `components/AdminBillingPlansCatalogTableSkeleton.tsx`, `components/feedback/AdminBillingPlansCatalogBackendMessage.ts`, and the Plans-local confirmation/toast infrastructure. These remain available in the isolated submodule for now.
- **ISSUE-025/ISSUE-027 — OPEN OWNERSHIP DECISION:** Architecture requires zero-business primitives have one authoritative owner, while the module-level no-sibling-import / standalone packaging requirement prohibits moving business-coupled components across submodules. Do not delete or redirect existing local components merely to silence this audit warning; a verified host integration boundary and compatibility tests are required before any consolidation. Record this as `SOURCE_CONFLICT` where those two prescriptions cannot be simultaneously satisfied without a new host primitive contract. No claim of completed consolidation is made.
- The exact direct-import list must be regenerated from the current source during any future host-boundary change; host TypeScript/runtime compilation remains `DEFERRED_TO_HOST_RUNTIME`.

**Potential business-module imports outside this leaf:**
- No cross-feature business import specifiers were detected by the literal import scan; this does not replace host ESLint boundary execution.

`contracts/host-stubs.d.ts`, `tests/harness/bootstrap.ts`, a provider harness, and a module-owned scenario registry are included where an API contract exists. The host stub is an isolated-zip fallback and MUST be excluded from the full host TypeScript compilation so it cannot shadow or merge with real host contracts. Host runtime and strict semantic compilation remain unverified.

## 22. Deliverables & Version History

| Version | Date | Revision | Evidence / status |
|---|---|---|---|
| v34-audit | 2026-10-27 | Replaced unresolved documentation template expressions with source-derived import inventories; completed deeper static rule and repair evidence review. | Source-level review only; portability score **NOT_VERIFIED** until host compile/test/browser checks and all eight portability gates pass. |

**Portability score:** `NOT_VERIFIED` (not 8/8). The eight gates—ZIP self-sufficiency, zero cross-module imports, complete mutable mock scenarios, standalone harness, token integrity, all three async states, mutation safety, and responsive viewport coverage—must each be independently evidenced before an 8/8 claim is valid.


## Admin v51 RBG 1 — Verified Source Repair Delta

- Confirmation-context lifecycle: this leaf's canonical `page.tsx` and isolated `tests/harness/` now mount the leaf-owned `AdminNavigationLayoutConfirmProvider` around their consumers. The existing confirmation modal and FIFO queue are retained. This avoids cross-leaf business imports; host role layout's unrelated context is not assumed to satisfy this one.
- Related billing changes are recorded in `RE_AUDIT_CHECKLIST_RESULT.md` and the RBG 1 evidence ledger. Source-level inspection does not prove production-host render or authenticated flows; execute the supplied harness and Playwright checks in host runtime.
- **Open `ISSUE-038` (currency identity):** API monetary DTOs in this archive do not contain an authenticated ISO-4217 currency code. Keep strict feature-local formatting behavior (`—` for unknown currency); do not infer INR solely from locale, glyphs, mock examples, or comments. Backend contract/product decision required to supply and validate currency identity before the display bug can be fully closed. Other features remain unchanged.
- Plans: lexical two-decimal precision schema validation, complete create/update mock persistence of `priceCustom`, correct Zod i18n marker extraction, locale key `plans.validation.maxTwoDecimals`, and UUID-safe scenario assertions are implemented.


## RBG 5 — Verified local source changes (2026-11-01)

- `ISSUE-028`: forbidden-pattern scope now identifies this canonical Plans Catalog leaf.
- `ISSUE-029`: confirmation modal uses the already-owned `useAdminBillingPlansCatalogDialogAccessibility` for initial focus, Escape, focus trapping, scroll lock and restoration; accessibility regression added in `tests/components/`.
- `ISSUE-030`: dirty-form navigation protection leaves non-`_self` targets, `download` links, and `rel=external` links untouched. Same-tab internal links still require confirmation. Regression coverage updated.
- `ISSUE-031` OPEN: constants files `constants/admin_billing_plans_catalog.constants.ts` and `constants/admin_billing_plans_catalog.query_keys.ts` remain on legacy filenames. Atomic renaming requires additional referenced source files beyond the 18-file RBG ceiling; tracked as OPEN, not falsely marked fixed.
- Integrated React/Vitest/Next.js browser tests require host dependencies and remain `DEFERRED_TO_HOST_RUNTIME`.


### Post-RBG24 source correction (ISSUE-031)

Constants and query-key artifacts use canonical `constants/admin_billing_plans_catalog.constants.ts` and `constants/admin_billing_plans_catalog.query_keys.ts`. All internal imports are updated; original symbol names remain stable.

### RBG 28–30 route error safety correction
- Forbidden-page selection now uses the explicit numeric `error.status === 403` signal only. Error-message text containing `403` does not establish authorization status.
- The forbidden destination link has a minimum 44px hit area (`min-h-11`), preserving the existing navigation URL and approved semantic theme tokens. Backend enforcement remains authoritative and requires host verification.


## RBG37 — URL path-segment safety (source-backed repair)
The existing ADMIN_PLANS_GET_ONE_URL dynamic URL builder refuses empty, whitespace-only, `.` or `..` identifiers before inserting a dynamic path segment. Other identifiers remain `encodeURIComponent` encoded. The endpoint shape is unchanged. Feature-local regression coverage checks the existing ordinary URL, encoded delimiters, and fail-closed reserved identifiers. External backend authorization and live API reachability remain `DEFERRED_TO_HOST_RUNTIME`; this does not close ISSUE-182 or ISSUE-229/230.


## RBG 43 — Payload-specific idempotency (2026-11-01)

Create/update intent keys use the normalized minor-unit Plan payload signature. Repeating the same failed write retains its UUIDv4 idempotency key; changing prices, tier, or features resets that intent key. `clearIntentKey` clears both key and stored signature when the modal is abandoned or mutation succeeds. Delete semantics and API endpoints are unchanged. Runtime React/Vitest/backend tests remain deferred to the host.

### RBG 56 — user-visible error privacy

3 mutation failure callbacks display only localized retry guidance, preserving existing toast identifiers, mutation payloads, success behavior, idempotency and backend API paths.

Source verification is bounded to the affected frontend handlers. Backend contracts and host-runtime validation remain pending.


### RBG 64 — controlled pagination correctness
Mock GET pagination: page and limit reject zero, negative, fractional, exponent, nonfinite, whitespace and unsafe-integer inputs. Each endpoint retains its existing defaults; production API routes/fixtures and response envelopes remain unchanged. New module-owned regression tests authored; full MSW/Vitest and host integration not executed.

#### RBG 69 — URL pagination boundary
The URL page reader and outbound page setter use the same module-owned strict positive-integer guard. Malformed inputs, fractions and nonfinite values fall back to page 1, and page values above 100000 are bounded to avoid unbounded requests. API endpoints, filters, sorting, and returned query envelopes are unchanged.


## RBG133 — Source-only repair checkpoint (PARTIAL)

Plan writes now await TanStack `mutateAsync` settlement through one mounted leaf-local single-flight guard covering both the confirmation gap and network operations. Failed API writes report field errors through the existing form mapper; no success is inferred from request initiation. The confirmation queue uniquely remounts each request, rejects blank phrases and uses accessible scoped IDs. Filter URL updates merge rapid local edits while external browser history resets the pending draft; obsolete successful list pages recover to a valid page. MSW plan pagination caps large limits and normalizes out-of-range metadata. Dropdown Home/End, scrolling, focus return and disabled-state handling and pagination summary bounds were repaired.

Tests: four new feature-local Vitest/RTL regressions plus one host-only authenticated Playwright regression are **AUTHORED NOT EXECUTED**; 63 transpiled-source controlled assertions and role-wide parser/import checks were executed with explicit stand-ins. Back-end RBAC, tenant isolation, multi-tab idempotency, official host build, accessibility assistive technology and live API contracts remain unverified. External historical blockers remain open.
