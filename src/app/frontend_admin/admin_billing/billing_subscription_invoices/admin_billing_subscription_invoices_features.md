---
feature: "admin_billing_subscription_invoices"
owner_role: "admin"
module_version: 1
api_contract_source: "web-zip-extraction"
last_verified_date: "2026-10-29"
last_verified_commit: "host-unavailable"
documentation_status: "current"
portability_score: "NOT_VERIFIED"
---

# Admin Invoices — Autonomous Submodule Specification


> **Canonical-only frontend routing:** this module supports only its canonical route(s) in the role map. Retired frontend path aliases, catch-all dispatchers, duplicate route trees, and compatibility redirects are removed. Former frontend paths do not redirect. Domain-root `page.tsx` retains only the architecture-required redirect to its default canonical leaf. Backend API URL literals and verified request/response contracts are unchanged.


> Derived from the supplied Admin role module source and the approved V2.11 decomposition plan. External API/host contracts are not inferred.

## 1. Scope and Non-Scope

**Owning capability:** Invoices within the Admin Billing domain. This leaf is a direct child of `admin_billing/` and is the autonomous route for the `invoices` workflow.

**In scope:** this leaf’s route entry, workflow component(s), locally copied hooks/API/types/schemas, mock scenario and tests described in the source inventory. **Out of scope:** sibling leaf business code, host-global infrastructure, and unverified backend behavior.

## 2. Screen Inventory

- Route: `/frontend_admin/admin_billing/billing_subscription_invoices`.
- Main capability: `Invoices`.
- Primary view source: `components/kpis/AdminBillingSubscriptionInvoicesKPIs.tsx` (derived from the pre-split module source).
- Loading/error/not-found route entries remain co-located.

## 3. Navigation Contract
- **Canonical route:** `/frontend_admin/admin_billing/billing_subscription_invoices`.
- **Owning domain:** `admin_billing/`; this leaf is exposed by its domain's secondary navigation.
- **Routing rule:** this leaf has no compatibility alias or legacy redirect. The parent domain root retains only its architecture-required default redirect to its first canonical leaf.
## 4. API Contract

- `subscription` — source evidence: `// RESPONSIBILITY: Centralizes route and endpoint constants for subscriptions_management; it does not perform navigation or implement transport behavior.`
- `kpis` — source evidence: `export const ADMIN_SUBSCRIPTIONS_KPIS_URL = '/admin/subscriptions/fetchKPIs' as const;`
- `invoices` — source evidence: `// DATA FLOW: page/navigation/API client → this URL contract → canonical route or request endpoint (admin_billing/billing_subscription_invoices/config/admin_subscriptions_management.url_config.ts)`

## 5. Query Key Registry

Query keys remain module-prefixed and are defined in this leaf’s `constants/` category. Only the scoped workflow query is enabled by this leaf-local logic; shared summary/current-context queries are explicitly called out in the implementation. Verify exact keys from the listed `*QueryKeys.ts` file.

## 6. Mutation Inventory

Mutation methods and their payloads are copied from the source module only where imported by this workflow. No endpoint, HTTP method, request parameter, response field, or business invariant is added by this decomposition. State-changing calls must keep the existing UUIDv4 `Idempotency-Key` flow.

## 7. Permissions and Role Rules

Permission and role checks are inherited from the source components/hooks and are not expanded by this move. If the source ZIP does not contain a permission contract for a control, that contract remains `NOT_VERIFIED`; this document does not invent a permission matrix.

## 8. State Ownership

Server data is managed by TanStack Query v5 in leaf-local hooks/API code. URL-backed state remains in Next.js search parameters; transient modal/form state remains in the leaf-local Zustand store and RHF/Zod hooks where present.

## 9. Offline and Reconnect Behavior

The leaf ships local MSW handler/fixture/scenario sources. Runtime offline/reconnect behavior is only claimed where the source hooks define it; network execution is `DEFERRED_TO_HOST_RUNTIME`.

## 10. Security and PII Rules

The decomposition preserves existing masking, nullable-value display, authorization boundaries, tenant identity source, and redaction code by copying those dependency files into the leaf. Do not place business entity records in browser storage or expose client secrets.

## 11. Accessibility Requirements

Interactive controls must retain semantic labels, keyboard operation, focus-visible indicators, live pending/error states, and WCAG 2.2 AA touch-target/contrast requirements. Existing component markup is preserved except for route/workflow ownership and file-path changes.

## 12. Background Tasks

No new background job or scheduler is introduced by this split. Any asynchronous refresh remains owned by the copied query/mutation hook.

## 13. Feature Flags

No new feature flag is invented. A flag is considered present only if a concrete key and its evaluation are found in the supplied source.

## 14. Cache Invalidation

Cache invalidation/query-key behavior is retained from the source module’s hook and mutation implementations. Any behavior not statically traceable is `NOT_VERIFIED` rather than inferred.

## 15. Migration and Rollback

- **Migration scope:** This is a frontend feature contract. The supplied source does not establish a database/schema migration or a backend deployment migration for this leaf; do not infer or apply one from this document.
- **Forward change procedure:** Keep changes within this leaf's existing route, API-client, schema/type, hook, UI, locale, mock, and test ownership boundaries. Preserve the canonical URL configuration and all verified request/response behavior. Update source-derived inventory and regression coverage together when ownership changes.
- **Rollback procedure:** Revert the coordinated leaf-owned frontend changes as one unit, including related locale and test updates. Do not restore retired route aliases, stale imports, or undocumented backend contracts as part of rollback.
- **Verification gate:** Resolve leaf-local imports and physical inventory references; parse changed locale JSON and syntax-check changed TypeScript/TSX; run the host typecheck, tests, build, and route/browser checks when the host project environment is available. Those host checks are not claimed as run by this documentation repair.
- **Data safety:** No production data mutation or backend migration is authorized by this section. Any such operation requires a separately supplied, authoritative backend change plan.

## 16. Test Coverage Map

Co-located test sources verified in this leaf:
- `tests/api/AdminBillingSubscriptionInvoicesApi.test.ts`
- `tests/api/AdminBillingSubscriptionInvoicesFeatureUrlContract.test.ts`
- `tests/hooks/useAdminBillingSubscriptionInvoicesLogic.test.ts`
- `tests/hooks/useAdminBillingSubscriptionInvoicesQueries.test.ts`
- `tests/store/useAdminBillingSubscriptionInvoicesStore.test.ts`
- `tests/utils/AdminBillingSubscriptionInvoicesFormatCurrency.test.ts`
- `tests/utils/AdminBillingSubscriptionInvoicesFormatters.test.ts`
- `tests/utils/AdminBillingSubscriptionInvoicesPaginateInvoices.test.ts`
- `tests/utils/AdminBillingSubscriptionInvoicesSafeInvoicePdfUrl.test.ts`

Test execution requires the host package manifest, installed test runner/dependencies, and authenticated runtime. Integrated execution is `DEFERRED_TO_HOST_RUNTIME` for this isolated role ZIP.

## 17. Architecture Exceptions

This leaf contains no business imports from sibling leaves. Global dependencies are limited to the approved host infrastructure and zero-business UI primitives. The role navigation shell is owned by `admin_navigation/` and is not a leaf feature dependency. The source module was split by independently navigable tab/workflow and documented endpoint families.

## 18. Known Contract Gaps

Known source conflicts and external contract gaps are recorded in `audit_evidence/ADMIN_V47_API_CONTRACT_PRESERVATION.csv`. The two flagged URL literals remain unchanged pending authoritative contract evidence; Data Export and dedicated 2FA lifecycle behavior are not invented. The host `apiFetch` implementation and public rewrite layer are outside this role ZIP, so integrated envelope and public-route behavior remain `DEFERRED_TO_HOST_RUNTIME` or `NOT_VERIFIED_IN_SCOPE`.

## 19. Rule Compliance Checklist

Evidence classifications are `VERIFIED`, `DERIVED`, `CONTRACT_MISSING`, or `NOT_VERIFIED`. No source/API claim is elevated to `VERIFIED` solely because a folder or documentation file exists.

## 20. Standalone Run, Mock & Test Harness

`contracts/host-stubs.d.ts`, `tests/harness/bootstrap.ts`, a provider harness, mutable module-owned MSW fixtures/handlers, and at least one local API route contract test are included. The host must provide the documented shared infrastructure stubs/dependencies.

## 21. Module Portability & Host Integration Guide

This module is designed for extraction into the canonical role container. Integration requires Next.js App Router, TypeScript path alias `@/*`, approved core API/logger/UI/socket/display helpers, and the package versions recorded in host configuration. Host config files are outside the supplied role ZIP.

## 22. Deliverables & Version History

Updated during Admin v45 domain-grouping and ownership reconciliation. Canonical route and file references are checked against the final physical tree; backend endpoint literals remain source-defined and any unresolved external contract is called out in the release evidence.


## Admin v51 RBG 1 — Verified Source Repair Delta

- Confirmation-context lifecycle: this leaf's canonical `page.tsx` and isolated `tests/harness/` now mount the leaf-owned `AdminNavigationLayoutConfirmProvider` around their consumers. The existing confirmation modal and FIFO queue are retained. This avoids cross-leaf business imports; host role layout's unrelated context is not assumed to satisfy this one.
- Related billing changes are recorded in `RE_AUDIT_CHECKLIST_RESULT.md` and the RBG 1 evidence ledger. Source-level inspection does not prove production-host render or authenticated flows; execute the supplied harness and Playwright checks in host runtime.
- **Open `ISSUE-038` (currency identity):** API monetary DTOs in this archive do not contain an authenticated ISO-4217 currency code. Keep strict feature-local formatting behavior (`—` for unknown currency); do not infer INR solely from locale, glyphs, mock examples, or comments. Backend contract/product decision required to supply and validate currency identity before the display bug can be fully closed. Other features remain unchanged.
- Invoices: duplicate PDF URL guard import removed without removing the guarded PDF button or altering safe-URL validation.


## RBG 5 — Verified local source changes (2026-11-01)

- MSW state reset: `mocks/handlers/AdminBillingSubscriptionInvoicesMockHandlers.ts` exports `resetAdminSubscriptionsMockState`; `tests/harness/bootstrap.ts` invokes it during start/reset. Stateful reset regression is co-located in `tests/mocks/`.
- Only `invoices` scope is enabled by `useAdminBillingSubscriptionInvoicesQueries`. Disabled TanStack Query v5 tests now model `data: undefined`, pending/idle state; query wiring and production API contracts are unchanged.
- Invoice pagination validates safe integer page/limit and bounds the mocked page size to `ADMIN_SUBSCRIPTIONS_INVOICES_ITEMS_PER_PAGE`. See `tests/utils/AdminBillingSubscriptionInvoicesPaginateInvoices.test.ts`.
- `ISSUE-043` remains `SOURCE_CONFLICT`: the audit asks to centralize generic helpers under host `src/lib`, while the standalone submodule/WET contract requires a verified host interface. No host implementation was supplied and no unverified core API import was introduced.
- `ISSUE-045` remains `NOT_VERIFIED`: the consolidated report only has a cross-batch ID reference, not a detailed independently reproducible finding.
- React/Vitest, real backend, integrated TypeScript and browser tests are `DEFERRED_TO_HOST_RUNTIME`. These source changes are not claimed to have passed host tests.

### RBG 58 — User-visible request error handling

All four subscription mutation failures use bilingual generic retry feedback, not untrusted backend exception text. Existing endpoint definitions, success feedback, query invalidation and idempotency behavior are unchanged. Typed validation details are not modified.


### RBG70 — direction-specific auto-renew intent
The verified existing `POST /admin/subscriptions/toggleAutoRenew` endpoint and request body are unchanged. A confirmed action now uses `toggle-auto-renew:on` or `toggle-auto-renew:off` based on the last loaded subscription state, keeps the same key when retrying the same direction after an error, clears exactly that intent on success or cancellation, and keeps separate leaf-local registries. Backend deduplication/atomic toggle behavior, stale-state protection and authenticated concurrency remain **NOT_VERIFIED**.

### RBG70 — invoice pagination boundary
Invoice `page` URL reads and UI page writes require full canonical positive decimal integer values and are capped at 100000 in the frontend; malformed input falls back to page 1. This is not a claimed backend pagination limit.

### RBG 74 — Invoice MSW URL parameter parsing
- Pagination query strings are parsed as canonical positive decimal integers before calling the pre-existing invoice paginator. Hex/scientific notation, unsafe, zero and fractional inputs use existing page/limit defaults; mock endpoints and response metadata are unchanged.

### RBG 94 — Invoice PDF URL normalization safety
- Before URL normalization, reject raw/encoded dot segments, embedded path separators, malformed escapes and control bytes. Keep valid same-origin relative invoice paths. Reject external hosts and unsafe schemes. Do not invent external CDN allowlists.
- Regression tests cover both accepted paths and encoded traversal in this leaf. Browser/host integration remains unverified.


## RBG130 source repair additions (host tests pending)
- Confirmation queue must mount a fresh keyed dialog per request and never reuse previous typed authorization; empty destructive phrases fall back to `CONFIRM`.
- Invoice pagination normalizes unsafe page/limit values and bounds obsolete pages within actual total pages.
- Financial actions serialized within this hook instance; confirmation cancellation clears key, mutation rejection preserves retry key, success clears through existing mutation callbacks; server idempotency and RBAC remain external and unverified.
- URL invoice pagination recovers an obsolete deep link when successful API metadata reports an earlier last page; request errors are not masked.
- RBG130 repository-native Vitest/RTL and host Playwright tests are authored but not executed in this archive-only runtime.
