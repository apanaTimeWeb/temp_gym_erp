---
feature: "communication_whatsapp_campaigns"
owner_role: "admin"
module_version: 24
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-27"
last_verified_commit: "NOT_AVAILABLE_NO_GIT_METADATA"
documentation_status: "current"
portability_score: "NOT_VERIFIED"
---

# Campaigns Management — Canonical Feature Contract


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


> Admin v47 clean-break source-level re-audit (2026-10-29): canonical-only routing, route-to-leaf mapping, TypeScript-family syntax, local import resolution, module boundaries, source-level safety patterns, mutation idempotency headers, form validation mapping, and available mock/test paths were statically rechecked. This is not an integrated host typecheck, production build, executed unit test, authenticated browser test, or proof of backend contract compliance. Remaining route/API/runtime exceptions are enumerated in the current audit_evidence/ directory.

## 1. Scope and Non-Scope

The Admin Campaigns module provides the admin-side campaign composition workspace for audience, template, recipient, and message-content preparation. Users can load available audiences and templates, inspect recipients for a chosen audience, compose a message, and use the campaign queue UI defined by the current frontend. The supplied API surface is read-only, so the module must not invent a send/create endpoint that is absent from the supplied contract. It does not own the underlying member database or external messaging-provider credentials.

**Owned artifacts:** local route entry, UI components, hooks, API clients, schemas/types, module state, mocks, tests and EN/HI locales listed in this document.

**Non-scope:** global application wiring, host `globals.css` token mapping, root Next.js rewrites, backend authorization/tenant isolation, and backend data migrations. These cannot be changed or proved from this role ZIP.

## 2. Screen Inventory

| Route / source route | Entry | Main view / evidence |
|---|---|---|
| `/frontend_admin/admin_communication/communication_whatsapp_campaigns` | `page.tsx` | canonical route from leaf URL config; main view `admin_communication/communication_whatsapp_campaigns/components/main_view/AdminCommunicationWhatsAppCampaignsManagementMain.tsx` |

**Page lifecycle entries:** `page.tsx` present; `loading.tsx` present; `error.tsx` present; `not-found.tsx` present.

## 3. Navigation Contract

- **Canonical leaf:** `frontend_admin/admin_communication/communication_whatsapp_campaigns/`
- **URL config:** `config/admin_communication_whatsapp_campaigns.url_config.ts`
- **Canonical route from config:** `/frontend_admin/admin_communication/communication_whatsapp_campaigns`
- **Main view imported by page.tsx:** `admin_communication/communication_whatsapp_campaigns/components/main_view/AdminCommunicationWhatsAppCampaignsManagementMain.tsx`.
- **URL literals in config:** `/frontend_admin/admin_communication/communication_whatsapp_campaigns`, `/admin/campaigns/audiences`, `/admin/campaigns/templates`, `/admin/campaigns/recipients`

## 4. API Contract

**API client files:**
- `api/admin_communication_whatsapp_campaigns_api.ts`
- `utils/AdminCommunicationWhatsAppCampaignsManagementApiResponse.ts` — leaf-local ApiResponse envelope validation and HTTP 400 field-error mapping.

**Exported API operations detected:**
- `fetchAudiences`
- `fetchTemplates`
- `fetchRecipients`

**Endpoint literals in the feature URL config:**
- `/admin/campaigns/audiences`
- `/admin/campaigns/templates`
- `/admin/campaigns/recipients`

**Request/response authority:** use the API client, Zod schemas, TypeScript DTOs and local MSW handlers together. The host API transport implementation is absent; no response envelope, Blob handling, or auth behavior beyond local source evidence is certified here.

## 5. Query Key Registry

**Query key files:**
- `constants/AdminCommunicationWhatsAppCampaignsManagementQueryKeys.ts`

**Named keys/properties detected:**
- `ADMIN_CAMPAIGNS_QUERY_KEYS`
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
- No mutation identifier was detected by the static symbol scan; verify source before adding actions.

**Safety note:** state-changing API calls must use the host-approved `Idempotency-Key: UUIDv4` behavior; static presence alone does not prove runtime uniqueness or retry correctness.

## 7. Permissions and Role Rules

- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

Role and tenant authorization must be enforced by the backend; frontend visibility is not a security boundary. Do not broaden privileges when repairing UI controls.

## 8. State Ownership

**Local state and data-flow hooks:**
- `hooks/useAdminCommunicationWhatsAppCampaignsManagementLogic.ts`

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
- `schemas/AdminCommunicationWhatsAppCampaignsManagementSchemas.ts`

## 11. Accessibility Requirements

Static source inventory for this leaf: **22** `aria-*` attributes, **0** visible `<label>` elements and **2** status/alert roles were detected. A source count does not prove WCAG conformance.

- Every control must have an accessible name; error text should be programmatically associated with invalid fields.
- Keyboard focus must remain visible, dialog focus must be managed, Escape should close dismissible overlays, and sorting controls must be actual buttons or links with accessible sort state.
- Preserve semantic table headers and meaningful empty/loading/error announcements.
- Respect reduced-motion preferences for non-essential motion and verify contrast using the canonical host theme tokens.

## 12. Background Tasks

- No explicit timer, visibility-change, or animation-frame task was detected in this leaf.

Any asynchronous subscription, timer, or animation frame must have lifecycle cleanup. No background scheduler should be added without a documented feature requirement.

## 13. Feature Flags

- No named feature flag or feature-enabled switch was detected in the current leaf source.

Do not introduce a new feature flag or treat environment variables as a permission control without an approved product contract.

## 14. Cache Invalidation

**Invalidation calls detected in hooks:**
- No direct `invalidateQueries` call was detected in this hook inventory; inspect mutation behavior and query key ownership before adding invalidation.

**Query key files:** `constants/AdminCommunicationWhatsAppCampaignsManagementQueryKeys.ts`.

Mutations should invalidate only the query families affected by their real API changes. Avoid broad unrelated invalidation and avoid optimistic state changes without rollback handling.

## 15. Migration and Rollback

No database migration or backend schema migration is owned in this frontend leaf. Route changes must preserve the current URL config and be recorded in the role route-preservation matrix. Rollback for frontend-only changes is the versioned source patch plus restoration of the prior module route entry; host rewrites must be rolled back separately in the host repository because they are not included here.

## 16. Test Coverage Map

Co-located test sources verified in this leaf:
- `tests/hooks/useAdminCommunicationWhatsAppCampaignsManagementLogic.test.ts`
- `tests/hooks/useAdminCommunicationWhatsAppCampaignsManagementLogic.test.tsx`
- `tests/scenarios/AdminCommunicationWhatsAppCampaignsManagementScenarios.test.ts`
- `tests/utils/AdminCommunicationWhatsAppCampaignsManagementApiResponse.test.ts`
- `tests/utils/AdminCommunicationWhatsAppCampaignsManagementQueueUtils.test.ts`
- `tests/utils/AdminCommunicationWhatsAppCampaignsManagementWhatsAppUtils.test.ts`

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
| 02 | Feature-local documentation trio exists | `PASS` | `admin_communication_whatsapp_campaigns_features.md`, `admin_communication_whatsapp_campaigns_forbidden.md`, `admin_communication_whatsapp_campaigns_theme_contract.md` present in this leaf; physical existence only, content compliance not implied |
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
| 16 | Accessible attributes are present in UI source | `PASS` | 22 aria attributes; 0 labels |
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

**Primary route:** the source route listed in Section 2. **Module path:** `frontend_admin/admin_communication/communication_whatsapp_campaigns/`.

**Tests:** in a complete host checkout, run the repository's approved test command scoped to this leaf, for example `npm run test -- frontend_admin/admin_communication/communication_whatsapp_campaigns/tests`. This archive has no root `package.json` or test-runner config, so the command cannot be run here and is not represented as passing.

**Mocks:** fixtures and handlers listed below provide the current source-owned mock boundary:
- `mocks/fixtures/AdminCommunicationWhatsAppCampaignsManagementMockFixtures.ts`
- `mocks/handlers/AdminCommunicationWhatsAppCampaignsManagementMockHandlers.ts`
- `mocks/scenarios/admin_communication_whatsapp_campaigns.scenarios.ts`

**Scenario support source:**
- `mocks/scenarios/admin_communication_whatsapp_campaigns.scenarios.ts`

Active scenarios use the feature-owned handler arrays. The scenario helper can inject `SERVER_500`, a 15-second `TIMEOUT`, or `UNAUTHORIZED` failure envelopes against a caller-supplied verified route. `EMPTY` requires a caller-supplied response payload that matches the endpoint's real schema; the helper never guesses this shape. Contract-blocked modules retain their blocked disposition rather than creating fake endpoints. Scenario test sources are present, but test execution is `DEFERRED_TO_HOST_RUNTIME` because host dependencies and scripts are absent. Test credentials are not embedded in this ZIP; use host-approved non-production test identities only.

## 21. Module Portability & Host Integration Guide

1. **Copy the leaf** `frontend_admin/admin_communication/communication_whatsapp_campaigns/` without sibling business modules.
3. **Provide verified host infrastructure** for `@/lib/api`, logging, auth/session, socket clients, global zero-business UI primitives, theme tokens and localization. Only use dependencies actually imported by this leaf.
4. **Run validation** using host `tsc --noEmit`, lint, module unit tests/MSW, production build and Playwright E2E. None of these host-dependent commands is claimed to pass from this isolated archive.

### Approved External Dependencies

**Host/application infrastructure imports found in this leaf:**
- `@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutTableSkeleton`
- `@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutNotFound`
- `@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutMonitoring`
- `@/lib/api`

**Potential business-module imports outside this leaf:**
- No cross-feature business import specifiers were detected by the literal import scan; this does not replace host ESLint boundary execution.

`contracts/host-stubs.d.ts`, `tests/harness/bootstrap.ts`, a provider harness, and a module-owned scenario registry are included where an API contract exists. The host stub is an isolated-zip fallback and MUST be excluded from the full host TypeScript compilation so it cannot shadow or merge with real host contracts. Host runtime and strict semantic compilation remain unverified.

## 22. Deliverables & Version History

| Version | Date | Revision | Evidence / status |
|---|---|---|---|
| v34-audit | 2026-10-27 | Replaced unresolved documentation template expressions with source-derived import inventories; completed deeper static rule and repair evidence review. | Source-level review only; portability score **NOT_VERIFIED** until host compile/test/browser checks and all eight portability gates pass. |

**Portability score:** `NOT_VERIFIED` (not 8/8). The eight gates—ZIP self-sufficiency, zero cross-module imports, complete mutable mock scenarios, standalone harness, token integrity, all three async states, mutation safety, and responsive viewport coverage—must each be independently evidenced before an 8/8 claim is valid.


## RBG97–99 source repair evidence
- RBG98: Browser window.open can throw instead of returning null. Catch popup errors and preserve queue status; unsuccessful recipient opens do not become OPENED. Popup lifecycle still requires real browser integration testing.
