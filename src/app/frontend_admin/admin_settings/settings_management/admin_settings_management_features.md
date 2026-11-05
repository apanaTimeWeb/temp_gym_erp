---
feature: "settings_management"
owner_role: "admin"
module_version: 24
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-27"
last_verified_commit: "NOT_AVAILABLE_NO_GIT_METADATA"
documentation_status: "current"
portability_score: "NOT_VERIFIED"
---

# Settings Management — Canonical Feature Contract


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


> Admin v47 clean-break source-level re-audit (2026-10-29): canonical-only routing, route-to-leaf mapping, TypeScript-family syntax, local import resolution, module boundaries, source-level safety patterns, mutation idempotency headers, form validation mapping, and available mock/test paths were statically rechecked. This is not an integrated host typecheck, production build, executed unit test, authenticated browser test, or proof of backend contract compliance. Remaining route/API/runtime exceptions are enumerated in the current audit_evidence/ directory.

## 1. Scope and Non-Scope

The Admin Settings module is the administrative configuration workspace for gym-level profile, GST, payment-gateway, notification, application-integration, and role-related settings exposed by the supplied frontend. Users can navigate settings sections, load current configuration, edit supported settings, manage sensitive secret fields with visibility toggles, and preserve changes across validation or unsaved-change warnings. The module owns the settings schema and mutation flows while relying only on approved shell infrastructure. It does not implement the blocked full-data-export backend workflow without an authoritative contract.

**Owned artifacts:** local route entry, UI components, hooks, API clients, schemas/types, module state, mocks, tests and EN/HI locales listed in this document.

**Non-scope:** global application wiring, host `globals.css` token mapping, root Next.js rewrites, backend authorization/tenant isolation, and backend data migrations. These cannot be changed or proved from this role ZIP.

## 2. Screen Inventory

| Route / source route | Entry | Main view / evidence |
|---|---|---|
| `/frontend_admin/admin_settings/settings_management` | `page.tsx` | canonical route from leaf URL config; main view `admin_settings/settings_management/components/main_view/AdminSettingsManagementMain.tsx` |

**Page lifecycle entries:** `page.tsx` present; `loading.tsx` present; `error.tsx` present; `not-found.tsx` present.

## 3. Navigation Contract

- **Canonical leaf:** `frontend_admin/admin_settings/settings_management/`
- **URL config:** `config/admin_settings_management.url_config.ts`
- **Canonical route from config:** `/frontend_admin/admin_settings/settings_management`
- **Main view imported by page.tsx:** `admin_settings/settings_management/components/main_view/AdminSettingsManagementMain.tsx`.
- **URL literals in config:** `/frontend_admin/admin_settings/settings_management`, `/frontend_admin/admin_dashboard`, `/frontend_admin/admin_settings`, `/admin/settings/fetchSettings`, `/admin/settings/updateSettings`, `/admin/settings/2fa/status`, `/admin/settings/2fa/enable`, `/admin/settings/2fa/disable`, `/admin/settings/2fa/verify`, `/admin/settings/notifications`, `/admin/permissions/fetchPermissions`

## 4. API Contract

**API client files:**
- `api/admin_settings_management_api.ts`
- `api/admin_settings_management_roles_api.ts`
- `utils/AdminSettingsManagementApiResponse.ts` — leaf-local ApiResponse envelope validation and HTTP 400 field-error mapping.

**Exported API operations detected:**
- `fetchSettings`
- `updateSettings`

**Endpoint literals in the feature URL config:**
- `/admin/settings/fetchSettings`
- `/admin/settings/updateSettings`
- `/admin/settings/2fa/status`
- `/admin/settings/2fa/enable`
- `/admin/settings/2fa/disable`
- `/admin/settings/2fa/verify`
- `/admin/settings/notifications`
- `/admin/permissions/fetchPermissions`

**Request/response authority:** use the API client, Zod schemas, TypeScript DTOs and local MSW handlers together. The host API transport implementation is absent; no response envelope, Blob handling, or auth behavior beyond local source evidence is certified here.

## 5. Query Key Registry

**Query key files:**
- `constants/AdminSettingsManagementQueryKeys.ts`

**Named keys/properties detected:**
- `ADMIN_SETTINGS_QUERY_KEYS`
- `all`
- `lists`
- `list`
- `details`
- `detail`
- `key`

## 6. Mutation Inventory

**Mutation hooks:**
- `hooks/useAdminSettingsManagementMutation.ts`
- `hooks/useAdminSettingsManagementUnsavedChangesGuard.ts`

**Mutation operations detected in hook identifiers:**
- `useAdminSettingsMutation`

**Safety note:** state-changing API calls must use the host-approved `Idempotency-Key: UUIDv4` behavior; static presence alone does not prove runtime uniqueness or retry correctness.

## 7. Permissions and Role Rules

- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

Role and tenant authorization must be enforced by the backend; frontend visibility is not a security boundary. Do not broaden privileges when repairing UI controls.

## 8. State Ownership

**Local state and data-flow hooks:**
- `hooks/useAdminSettingsManagementData.ts`
- `hooks/useAdminSettingsManagementForms.ts`
- `hooks/useAdminSettingsManagementMutation.ts`
- `hooks/useAdminSettingsManagementRolesData.ts`
- `hooks/useAdminSettingsManagementSectionForm.ts`
- `hooks/useAdminSettingsManagementUnsavedChangesGuard.ts`

**Persistent module store files:**
- No module-owned Zustand store was detected.

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
- `schemas/AdminSettingsManagementSchemas.ts`

## 11. Accessibility Requirements

Static source inventory for this leaf: **39** `aria-*` attributes, **19** visible `<label>` elements and **0** status/alert roles were detected. A source count does not prove WCAG conformance.

- Every control must have an accessible name; error text should be programmatically associated with invalid fields.
- Keyboard focus must remain visible, dialog focus must be managed, Escape should close dismissible overlays, and sorting controls must be actual buttons or links with accessible sort state.
- Preserve semantic table headers and meaningful empty/loading/error announcements.
- Respect reduced-motion preferences for non-essential motion and verify contrast using the canonical host theme tokens.

## 12. Background Tasks

- `components/app_integration/AdminSettingsManagementAppIntegration.tsx`

Any asynchronous subscription, timer, or animation frame must have lifecycle cleanup. No background scheduler should be added without a documented feature requirement.

## 13. Feature Flags

- No named feature flag or feature-enabled switch was detected in the current leaf source.

Do not introduce a new feature flag or treat environment variables as a permission control without an approved product contract.

## 14. Cache Invalidation

**Invalidation calls detected in hooks:**
- `ADMIN_SETTINGS_QUERY_KEYS.key() `

**Query key files:** `constants/AdminSettingsManagementQueryKeys.ts`.

Mutations should invalidate only the query families affected by their real API changes. Avoid broad unrelated invalidation and avoid optimistic state changes without rollback handling.

## 15. Migration and Rollback

No database migration or backend schema migration is owned in this frontend leaf. Route changes must preserve the current URL config and be recorded in the role route-preservation matrix. Rollback for frontend-only changes is the versioned source patch plus restoration of the prior module route entry; host rewrites must be rolled back separately in the host repository because they are not included here.

## 16. Test Coverage Map

Co-located test sources verified in this leaf:
- `tests/hooks/useAdminSettingsManagementData.test.ts`
- `tests/hooks/useAdminSettingsManagementForms.test.ts`
- `tests/hooks/useAdminSettingsManagementForms.test.tsx`
- `tests/hooks/useAdminSettingsManagementMutation.test.tsx`
- `tests/hooks/useAdminSettingsManagementRolesData.test.ts`
- `tests/hooks/useAdminSettingsManagementSectionForm.test.tsx`
- `tests/hooks/useAdminSettingsManagementUnsavedChangesGuard.test.ts`
- `tests/scenarios/AdminSettingsManagementScenarios.test.ts`
- `tests/schemas/AdminSettingsManagementSchemas.test.ts`
- `tests/utils/AdminSettingsManagementApiResponse.test.ts`

Test execution requires the host package manifest, installed test runner/dependencies, and authenticated runtime. Integrated execution is `DEFERRED_TO_HOST_RUNTIME` for this isolated role ZIP.

## 17. Architecture Exceptions

**Gate 3 disposition: `PASS_COHESIVE_WORKFLOW_EXCEPTION` (reviewed 2026-10-28).**

- **Rule ID:** Architecture Rules V1, Critical Frontend Structure Gate — Sub-Module Nesting/Qualification; V2.11 Section 0, 5-Gate Sub-Module Qualification Matrix, Gates 1, 2, 3 and 5.
- **Decision:** Keep `settings_management` as one autonomous configuration-workspace leaf. The seven Settings sections are internal views selected by the current settings navigation/query state, not seven distinct domain-shell route destinations. The supplied contract defines one aggregate settings read/update lifecycle, with section-specific patch payloads validated by one feature schema family and managed by shared dirty-state/save infrastructure. Splitting would require inventing or duplicating route/API lifecycles not established by the supplied host contract.
- **Affected files:** `page.tsx`, `components/nav/AdminSettingsManagementNav.tsx`, `components/main_view/AdminSettingsManagementMain.tsx`, `api/admin_settings_management_api.ts`, `api/admin_settings_management_roles_api.ts`, `schemas/AdminSettingsManagementSchemas.ts`, local hooks/forms, fixtures and tests.
- **Risk:** The leaf has multiple section forms and a high total file count; a future approved contract may separate one section into an independently routed workflow.
- **Compensating controls:** Keep every section component, schema, hook, API and test co-located in the leaf; retain the canonical URL config; do not add sibling imports; enforce per-file ceilings and strict form validation. Generic General Settings is now schema-restricted so it cannot write 2FA state; dedicated 2FA enrollment/verification/recovery remains disabled until its verified contract exists.
- **Review / expiry:** Review by 2026-11-28 or earlier when a verified per-section route/API lifecycle contract is supplied.
- **Approval status:** Canonical cohesive-workflow exception. No route or security lifecycle is invented.
## 18. Known Contract Gaps

- `CONTRACT_MISSING`: The dedicated 2FA enrollment/verification/recovery lifecycle is not specified by the supplied frontend contract. Generic General Settings now renders the current 2FA status read-only and removes `twoFactorAuth` from the editable form/update schema; do not invent the missing dedicated flow. Host API envelope and auth/RBAC behavior still require host verification.

Additional host limits applying to all modules: host `package.json`, `tsconfig`, Next.js rewrite config, `globals.css`, API transport, live service and authenticated browser state are absent. Relevant items remain `DEFERRED_TO_HOST_RUNTIME`, `OUTSIDE_SUPPLIED_SCOPE`, or `BLOCKED_BY_SUPPLIED_CONTRACT` rather than PASS.

## 19. Rule Compliance Checklist

| # | Verification item | Status | Evidence / limitation |
|---:|---|---|---|
| 01 | Autonomous feature leaf has a page entry | `PASS` | page.tsx |
| 02 | Feature-local documentation trio exists | `PASS` | `admin_settings_management_features.md`, `admin_settings_management_forbidden.md`, `admin_settings_management_theme_contract.md` present in this leaf; physical existence only, content compliance not implied |
| 03 | Central URL config exists | `PASS` | config directory inventory |
| 04 | API service is feature-local | `PASS` | api directory inventory |
| 05 | Zod schema exists | `PASS` | schemas directory inventory |
| 06 | Type contracts exist | `PASS` | types directory inventory |
| 07 | Module state is feature-local | `NOT_VERIFIED` | state directory inventory |
| 08 | Feature-local mock handlers exist | `PASS` | mocks directory inventory |
| 09 | Feature-local fixture files exist | `PASS` | mocks directory inventory |
| 10 | Co-located test suite exists | `PASS` | tests directory inventory |
| 11 | EN locale exists | `PASS` | locale file inventory |
| 12 | HI locale exists | `PASS` | locale file inventory |
| 13 | Page loading state exists | `PASS` | loading.tsx |
| 14 | Page error boundary exists | `PASS` | error.tsx |
| 15 | Page not-found boundary exists | `PASS` | not-found.tsx |
| 16 | Accessible attributes are present in UI source | `PASS` | 39 aria attributes; 19 labels |
| 17 | Loading/error status announcements are present | `NOT_VERIFIED` | 0 status/alert roles |
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

**Primary route:** the source route listed in Section 2. **Module path:** `frontend_admin/admin_settings/settings_management/`.

**Tests:** in a complete host checkout, run the repository's approved test command scoped to this leaf, for example `npm run test -- frontend_admin/admin_settings/settings_management/tests`. This archive has no root `package.json` or test-runner config, so the command cannot be run here and is not represented as passing.

**Mocks:** fixtures and handlers listed below provide the current source-owned mock boundary:
- `mocks/fixtures/AdminSettingsManagementMockFixtures.ts`
- `mocks/handlers/AdminSettingsManagementMockHandlers.ts`
- `mocks/scenarios/admin_settings_management.scenarios.ts`

**Scenario support source:**
- `mocks/scenarios/admin_settings_management.scenarios.ts`

Active scenarios use the feature-owned handler arrays. The scenario helper can inject `SERVER_500`, a 15-second `TIMEOUT`, or `UNAUTHORIZED` failure envelopes against a caller-supplied verified route. `EMPTY` requires a caller-supplied response payload that matches the endpoint's real schema; the helper never guesses this shape. Contract-blocked modules retain their blocked disposition rather than creating fake endpoints. Scenario test sources are present, but test execution is `DEFERRED_TO_HOST_RUNTIME` because host dependencies and scripts are absent. Test credentials are not embedded in this ZIP; use host-approved non-production test identities only.

## 21. Module Portability & Host Integration Guide

1. **Copy the leaf** `frontend_admin/admin_settings/settings_management/` without sibling business modules.
3. **Provide verified host infrastructure** for `@/lib/api`, logging, auth/session, socket clients, global zero-business UI primitives, theme tokens and localization. Only use dependencies actually imported by this leaf.
4. **Run validation** using host `tsc --noEmit`, lint, module unit tests/MSW, production build and Playwright E2E. None of these host-dependent commands is claimed to pass from this isolated archive.

### Approved External Dependencies

**Host/application infrastructure imports found in this leaf:**
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutBackendMessage`
- `@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutToastService`
- `@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutNotFound`
- `@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutConfirm`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutGymConfiguration`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutIdempotencyIntentStore`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutMonitoring`
- `@/lib/api`

**Potential business-module imports outside this leaf:**
- No cross-feature business import specifiers were detected by the literal import scan; this does not replace host ESLint boundary execution.

`contracts/host-stubs.d.ts`, `tests/harness/bootstrap.ts`, a provider harness, and a module-owned scenario registry are included where an API contract exists. The host stub is an isolated-zip fallback and MUST be excluded from the full host TypeScript compilation so it cannot shadow or merge with real host contracts. Host runtime and strict semantic compilation remain unverified.

### RBG 24 source repair checkpoint (2026-11-01)

- Settings navigation and main content now resolve `tab` through one local, closed `SETTINGS_TABS` allow-list. Unsupported query values render the existing Profile tab rather than an empty view; URL state is not rewritten or discarded. Tests: `tests/utils/AdminSettingsManagementResolveTab.test.ts`.
- Dirty section forms handle same-tab links, download/new-tab exclusions, browser Back/Forward and beforeunload through the feature's existing confirmation service. Browser/router behavior still requires React and Playwright execution.
- Backend 400 errors map only to exact flat Settings fields present in the section form; speculative nested and bracket paths no longer receive `setError`. Unmapped errors retain the mutation's generic toast path.
- Notification, Payment, Profile, GST, General and Integration error nodes have stable IDs, accessible validation associations and alert semantics. Roles and Settings loading states expose polite status semantics. This is source verification only; screen-reader/browser results remain deferred.
- Unused `AdminSettingsTwoFactorMethod` and `EMPTY_SETTINGS_FORM` declarations removed after confirming zero consumers within the supplied Admin role. The API-returned `twoFactorAuth` status remains read-only; no enrollment flow or backend contract was invented.
- RBG 23 payment save confirmation, HTTPS-only store links, and Roles error Retry are preserved. `ISSUE-238`/`ISSUE-240` remain runtime verification pending; `ISSUE-241` now source-patched.
- `ISSUE-229` canonical Permissions endpoint and `ISSUE-230` server-enforced self-permission guard remain external contract blockers.

## 22. Deliverables & Version History

| Version | Date | Revision | Evidence / status |
|---|---|---|---|
| v34-audit | 2026-10-27 | Replaced unresolved documentation template expressions with source-derived import inventories; completed deeper static rule and repair evidence review. | Source-level review only; portability score **NOT_VERIFIED** until host compile/test/browser checks and all eight portability gates pass. |

**Portability score:** `NOT_VERIFIED` (not 8/8). The eight gates—ZIP self-sufficiency, zero cross-module imports, complete mutable mock scenarios, standalone harness, token integrity, all three async states, mutation safety, and responsive viewport coverage—must each be independently evidenced before an 8/8 claim is valid.

### RBG 21–23 source audit / repair addendum
RBG23: Settings page and isolated harness mount the exact local confirmation context. App-store URLs require HTTPS in schema and at anchor-render boundary. Payment gateway saves and online-payment acceptance changes require confirmation. Roles query failure is distinguishable from an empty response with Retry.

### RBG 28–30 route error safety correction
- Forbidden-page selection now uses the explicit numeric `error.status === 403` signal only. Error-message text containing `403` does not establish authorization status.
- The forbidden destination link has a minimum 44px hit area (`min-h-11`), preserving the existing navigation URL and approved semantic theme tokens. Backend enforcement remains authoritative and requires host verification.

### RBG 52 source correction (2026-11-01)
Six settings forms use the owning Settings validation-marker resolver rather than stripping eight characters from the seven-character `__i18n:` prefix. Literal errors and empty values remain unchanged. Dedicated Vitest regression coverage is authored; host runtime remains NOT_VERIFIED.

### RBG 55 — user-visible error privacy

Settings mutation toast and Settings data error panel no longer display raw backend exception text. Existing Settings form errors and payment confirmation are untouched.

Source verification is bounded to the affected frontend handlers. Backend contracts and host-runtime validation remain pending.

### RBG 93 — app-store link URL credential safety
The same module-local HTTPS validator is used at the editable app-store/play-store schema boundary and the external-link rendering boundary. It rejects embedded username/password, control characters and non-HTTPS URLs; existing empty-link allowance and unrelated webhook URL schema are unchanged. Host Zod/React tests remain pending.


## RBG97–99 source repair evidence
- RBG97: Banner WhatsApp and telephone links fail closed on malformed gym phone configuration. No region/country assumption added; original links preserved for valid dial strings. Invalid links render as disabled text rather than click-through anchors.
- Contact-link validator rejects embedded letters, URI punctuation, overlong/short digits and multiple plus signs.
