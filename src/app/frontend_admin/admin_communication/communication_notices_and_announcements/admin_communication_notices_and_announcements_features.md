---
feature: "communication_notices_and_announcements"
owner_role: "admin"
module_version: 24
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-27"
last_verified_commit: "NOT_AVAILABLE_NO_GIT_METADATA"
documentation_status: "current"
portability_score: "NOT_VERIFIED"
---

# Announcements Management — Canonical Feature Contract


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


> Admin v47 clean-break source-level re-audit (2026-10-29): canonical-only routing, route-to-leaf mapping, TypeScript-family syntax, local import resolution, module boundaries, source-level safety patterns, mutation idempotency headers, form validation mapping, and available mock/test paths were statically rechecked. This is not an integrated host typecheck, production build, executed unit test, authenticated browser test, or proof of backend contract compliance. Remaining route/API/runtime exceptions are enumerated in the current audit_evidence/ directory.

### RBG 8 — Announcements Mock Boundary (2026-11-01)

- Source `mocks/handlers/AdminCommunicationNoticesAndAnnouncementsMockHandlers.ts`: `page` and `limit` now reject non-finite, fractional, zero and negative values, with the existing default page=1 and limit=10; page size is bounded to 100. Mock create IDs use `crypto.randomUUID()` rather than a colliding millisecond timestamp.
- Mock creates do not silently default a missing target branch to `g1`; form and mock schema validation remain the source for required branch selection. This does **not** validate an administrator's authorized tenant/branch scope, which requires the missing host/backend contract (`ISSUE-059` / `ISSUE-065`). No imaginary branch API was added.
- Co-located regression test covers normalized pagination and distinct create IDs; test execution needs the host MSW/Vitest dependencies. The consolidated report supplies occurrence indices but not original per-batch ISSUE-065–071 descriptions; individual issue closure remains unverified.

## 1. Scope and Non-Scope

The Admin Announcements module lets authorized gym administrators publish and maintain member-facing announcements from the admin console. Users can review the announcement list and KPIs, create and edit announcements, delete obsolete announcements, and pin important announcements for visibility. The module owns the complete announcement UI state, validation, API contract, mocks, and localized presentation for those workflows. It does not own member records, billing, branch administration, or unrelated notification infrastructure.

**Owned artifacts:** local route entry, UI components, hooks, API clients, schemas/types, module state, mocks, tests and EN/HI locales listed in this document.

**Non-scope:** global application wiring, host `globals.css` token mapping, root Next.js rewrites, backend authorization/tenant isolation, and backend data migrations. These cannot be changed or proved from this role ZIP.

## 2. Screen Inventory

| Route / source route | Entry | Main view / evidence |
|---|---|---|
| `/frontend_admin/admin_communication/communication_notices_and_announcements` | `page.tsx` | canonical route from leaf URL config; main view `admin_communication/communication_notices_and_announcements/components/main_view/AdminCommunicationNoticesAndAnnouncementsMain.tsx` |

**Page lifecycle entries:** `page.tsx` present; `loading.tsx` present; `error.tsx` present; `not-found.tsx` present.

## 3. Navigation Contract

- **Canonical leaf:** `frontend_admin/admin_communication/communication_notices_and_announcements/`
- **URL config:** `config/admin_communication_notices_and_announcements.url_config.ts`
- **Canonical route from config:** `/frontend_admin/admin_communication/communication_notices_and_announcements`
- **Main view imported by page.tsx:** `admin_communication/communication_notices_and_announcements/components/main_view/AdminCommunicationNoticesAndAnnouncementsMain.tsx`.
- **URL literals in config:** `/frontend_admin/admin_communication/communication_notices_and_announcements`, `/admin/announcements`, `/admin/announcements/kpis`

## 4. API Contract

**API client files:**
- `api/admin_communication_notices_and_announcements_api.ts`
- `utils/AdminCommunicationNoticesAndAnnouncementsApiResponse.ts` — leaf-local ApiResponse envelope validation and HTTP 400 field-error mapping.

**Exported API operations detected:**
- `fetchAnnouncements`
- `fetchKPIs`
- `createAnnouncement`
- `updateAnnouncement`
- `deleteAnnouncement`
- `togglePin`

**Endpoint literals in the feature URL config:**
- `/admin/announcements`
- `/admin/announcements/kpis`

**Request/response authority:** use the API client, Zod schemas, TypeScript DTOs and local MSW handlers together. The host API transport implementation is absent; no response envelope, Blob handling, or auth behavior beyond local source evidence is certified here.

## 5. Query Key Registry

**Query key files:**
- `constants/AdminCommunicationNoticesAndAnnouncementsQueryKeys.ts`

**Named keys/properties detected:**
- `ADMIN_ANNOUNCEMENTS_QUERY_KEYS`
- `all`
- `lists`
- `list`
- `details`
- `detail`
- `key`

## 6. Mutation Inventory

**Mutation hooks:**
- `hooks/useAdminCommunicationNoticesAndAnnouncementsMutations.ts`
- `hooks/useAdminCommunicationNoticesAndAnnouncementsUnsavedChangesGuard.ts`

**Mutation operations detected in hook identifiers:**
- `openCreate`
- `useAdminAnnouncementsMutations`
- `createMutation`
- `updateMutation`
- `deleteMutation`
- `pinMutation`

**Safety note:** state-changing API calls must use the host-approved `Idempotency-Key: UUIDv4` behavior; static presence alone does not prove runtime uniqueness or retry correctness.

## 7. Permissions and Role Rules

- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

Role and tenant authorization must be enforced by the backend; frontend visibility is not a security boundary. Do not broaden privileges when repairing UI controls.

## 8. State Ownership

**Local state and data-flow hooks:**
- `state/useAdminCommunicationNoticesAndAnnouncementsStore.ts`
- `hooks/useAdminCommunicationNoticesAndAnnouncementsDebounce.ts`
- `hooks/useAdminCommunicationNoticesAndAnnouncementsLogic.ts`
- `hooks/useAdminCommunicationNoticesAndAnnouncementsMutations.ts`
- `hooks/useAdminCommunicationNoticesAndAnnouncementsUnsavedChangesGuard.ts`

**Persistent module store files:**
- `state/useAdminCommunicationNoticesAndAnnouncementsStore.ts`

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
- `schemas/AdminCommunicationNoticesAndAnnouncementsSchemas.ts`

## 11. Accessibility Requirements

Static source inventory for this leaf: **30** `aria-*` attributes, **6** visible `<label>` elements and **9** status/alert roles were detected. A source count does not prove WCAG conformance.

- Every control must have an accessible name; error text should be programmatically associated with invalid fields.
- Keyboard focus must remain visible, dialog focus must be managed, Escape should close dismissible overlays, and sorting controls must be actual buttons or links with accessible sort state.
- Preserve semantic table headers and meaningful empty/loading/error announcements.
- Respect reduced-motion preferences for non-essential motion and verify contrast using the canonical host theme tokens.

## 12. Background Tasks

- `hooks/useAdminCommunicationNoticesAndAnnouncementsDebounce.ts`

Any asynchronous subscription, timer, or animation frame must have lifecycle cleanup. No background scheduler should be added without a documented feature requirement.

## 13. Feature Flags

- No named feature flag or feature-enabled switch was detected in the current leaf source.

Do not introduce a new feature flag or treat environment variables as a permission control without an approved product contract.

## 14. Cache Invalidation

**Invalidation calls detected in hooks:**
- `ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key() `
- `ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key('list') `
- `ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key('kpis') `

**Query key files:** `constants/AdminCommunicationNoticesAndAnnouncementsQueryKeys.ts`.

Mutations should invalidate only the query families affected by their real API changes. Avoid broad unrelated invalidation and avoid optimistic state changes without rollback handling.

## 15. Migration and Rollback

No database migration or backend schema migration is owned in this frontend leaf. Route changes must preserve the current URL config and be recorded in the role route-preservation matrix. Rollback for frontend-only changes is the versioned source patch plus restoration of the prior module route entry; host rewrites must be rolled back separately in the host repository because they are not included here.

## 16. Test Coverage Map

Co-located test sources verified in this leaf:
- `tests/hooks/useAdminCommunicationNoticesAndAnnouncementsDebounce.test.ts`
- `tests/hooks/useAdminCommunicationNoticesAndAnnouncementsLogic.test.ts`
- `tests/hooks/useAdminCommunicationNoticesAndAnnouncementsModalForm.test.ts`
- `tests/hooks/useAdminCommunicationNoticesAndAnnouncementsMutations.test.tsx`
- `tests/hooks/useAdminCommunicationNoticesAndAnnouncementsUnsavedChangesGuard.test.ts`
- `tests/scenarios/AdminCommunicationNoticesAndAnnouncementsScenarios.test.ts`
- `tests/store/useAdminCommunicationNoticesAndAnnouncementsStore.test.ts`
- `tests/utils/AdminCommunicationNoticesAndAnnouncementsApiResponse.test.ts`
- `tests/utils/AdminCommunicationNoticesAndAnnouncementsDateTime.test.ts`
- `tests/utils/AdminCommunicationNoticesAndAnnouncementsFormatters.test.ts`

Test execution requires the host package manifest, installed test runner/dependencies, and authenticated runtime. Integrated execution is `DEFERRED_TO_HOST_RUNTIME` for this isolated role ZIP.

## 17. Architecture Exceptions

- No `architecture-exception:` source annotation was detected in this leaf.

Any exception must include rule ID, reason, affected files, risk, compensating control, review/expiry date and approver where required. The absence of an annotation does not establish that no undocumented deviation exists.

## 18. Known Contract Gaps

- `No feature-specific contract blocker was confirmed for this leaf in the supplied source review; host API envelope and auth/RBAC behavior still require host verification.`

Additional host limits applying to all modules: host `package.json`, `tsconfig`, Next.js rewrite config, `globals.css`, API transport, live service and authenticated browser state are absent. Relevant items remain `DEFERRED_TO_HOST_RUNTIME`, `OUTSIDE_SUPPLIED_SCOPE`, or `BLOCKED_BY_SUPPLIED_CONTRACT` rather than PASS.

## 19. Rule Compliance Checklist

| # | Verification item | Status | Evidence / limitation |
|---:|---|---|---|
| 01 | Autonomous feature leaf has a page entry | `PASS` | page.tsx |
| 02 | Feature-local documentation trio exists | `PASS` | `admin_communication_notices_and_announcements_features.md`, `admin_communication_notices_and_announcements_forbidden.md`, `admin_communication_notices_and_announcements_theme_contract.md` present in this leaf; physical existence only, content compliance not implied |
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
| 16 | Accessible attributes are present in UI source | `PASS` | 30 aria attributes; 6 labels |
| 17 | Loading/error status announcements are present | `PASS` | 9 status/alert roles |
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

**Primary route:** the source route listed in Section 2. **Module path:** `frontend_admin/admin_communication/communication_notices_and_announcements/`.

**Tests:** in a complete host checkout, run the repository's approved test command scoped to this leaf, for example `npm run test -- frontend_admin/admin_communication/communication_notices_and_announcements/tests`. This archive has no root `package.json` or test-runner config, so the command cannot be run here and is not represented as passing.

**Mocks:** fixtures and handlers listed below provide the current source-owned mock boundary:
- `mocks/fixtures/AdminCommunicationNoticesAndAnnouncementsMockFixtures.ts`
- `mocks/fixtures/AdminCommunicationNoticesAndAnnouncementsMockState.ts`
- `mocks/handlers/AdminCommunicationNoticesAndAnnouncementsMockHandlers.ts`
- `mocks/scenarios/admin_communication_notices_and_announcements.scenarios.ts`

**Scenario support source:**
- `mocks/scenarios/admin_communication_notices_and_announcements.scenarios.ts`

Active scenarios use the feature-owned handler arrays. The scenario helper can inject `SERVER_500`, a 15-second `TIMEOUT`, or `UNAUTHORIZED` failure envelopes against a caller-supplied verified route. `EMPTY` requires a caller-supplied response payload that matches the endpoint's real schema; the helper never guesses this shape. Contract-blocked modules retain their blocked disposition rather than creating fake endpoints. Scenario test sources are present, but test execution is `DEFERRED_TO_HOST_RUNTIME` because host dependencies and scripts are absent. Test credentials are not embedded in this ZIP; use host-approved non-production test identities only.

## 21. Module Portability & Host Integration Guide

1. **Copy the leaf** `frontend_admin/admin_communication/communication_notices_and_announcements/` without sibling business modules.
3. **Provide verified host infrastructure** for `@/lib/api`, logging, auth/session, socket clients, global zero-business UI primitives, theme tokens and localization. Only use dependencies actually imported by this leaf.
4. **Run validation** using host `tsc --noEmit`, lint, module unit tests/MSW, production build and Playwright E2E. None of these host-dependent commands is claimed to pass from this isolated archive.

### Approved External Dependencies

**Host/application infrastructure imports found in this leaf:**
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutErrorFallback`
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutPagination`
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutStatCard`
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutTableSkeleton`
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutBackendMessage`
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutToastService`
- `@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutNotFound`
- `@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutConfirm`
- `@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutUrlQuerySync`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutIdempotencyIntentStore`
- `@/lib/api`

**Potential business-module imports outside this leaf:**
- No cross-feature business import specifiers were detected by the literal import scan; this does not replace host ESLint boundary execution.

`contracts/host-stubs.d.ts`, `tests/harness/bootstrap.ts`, a provider harness, and a module-owned scenario registry are included where an API contract exists. The host stub is an isolated-zip fallback and MUST be excluded from the full host TypeScript compilation so it cannot shadow or merge with real host contracts. Host runtime and strict semantic compilation remain unverified.

## 22. Deliverables & Version History

| Version | Date | Revision | Evidence / status |
|---|---|---|---|
| v34-audit | 2026-10-27 | Replaced unresolved documentation template expressions with source-derived import inventories; completed deeper static rule and repair evidence review. | Source-level review only; portability score **NOT_VERIFIED** until host compile/test/browser checks and all eight portability gates pass. |

**Portability score:** `NOT_VERIFIED` (not 8/8). The eight gates—ZIP self-sufficiency, zero cross-module imports, complete mutable mock scenarios, standalone harness, token integrity, all three async states, mutation safety, and responsive viewport coverage—must each be independently evidenced before an 8/8 claim is valid.


## RBG 7 — 2026-11-01 verified source repair notes
- The canonical page and isolated harness mount the leaf-owned confirmation provider above consuming hooks. The dialog uses local EN/HI translation keys, keyboard focus containment, Escape dismissal and focus restoration. Browser screen-reader testing is still deferred.
- URL synchronization now resets removed query parameters on history navigation and preserves current store edits until route replacement. Page URLs reject non-safe and fractional integers.
- Mutation idempotency keys are reused only for the identical serialized form payload and are cleared on successful actions or explicit form discard.
- The form rejects the forbidden Managers audience while retaining legacy response-type compatibility.
- **OPEN: ISSUE-059** — Static branch choices (`g1`–`g4`) are still mock-oriented. A verified authenticated list of admin-authorized branch IDs and backend authorization must replace them before production rollout; no guessed tenant API was introduced.
- **OPEN: ISSUE-063** — Table sorting currently operates only on the fetched server page. The supplied API contract has no verified global sorting parameters, so the client must not claim cross-page ordering is fixed.
- Host integration typechecking, React/Vitest, Next.js build, Playwright and API/authorization checks remain DEFERRED_TO_HOST_RUNTIME or NOT_VERIFIED, as appropriate.


## RBG37 — URL path-segment safety (source-backed repair)
The existing ADMIN_ANNOUNCEMENTS_DETAIL_URL dynamic URL builder refuses empty, whitespace-only, `.` or `..` identifiers before inserting a dynamic path segment. Other identifiers remain `encodeURIComponent` encoded. The endpoint shape is unchanged. Feature-local regression coverage checks the existing ordinary URL, encoded delimiters, and fail-closed reserved identifiers. External backend authorization and live API reachability remain `DEFERRED_TO_HOST_RUNTIME`; this does not close ISSUE-182 or ISSUE-229/230.

### RBG 59 — User-visible request error handling

All in-scope mutation failure toasts use bilingual generic retry guidance; backend exception messages are not exposed to users. Success paths, retries, idempotency keys and APIs are unchanged.

### RBG 73 — URL/MSW page safety
- All URL-derived and mock-list pagination page/limit values require canonical positive decimal integers; malformed, scientific/hex, fractional, zero, and unsafe integers use established defaults. Frontend page cap is 100000; mock limit cap is 100. Existing API endpoints and payloads unchanged.


### RBG 79–81 repair evidence
RBG79: Announcements KPI errors now expose only localized retry feedback. Pin and unpin retries have action-specific identities; server toggle concurrency remains unverified.
