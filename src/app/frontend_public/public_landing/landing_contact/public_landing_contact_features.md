---
module_id: public_landing_contact
owner: "Public Landing Contact"
mode: "B - WEB AUDIT/REPAIR"
baseline_frozen: true
review_scope: "RBG 1-5 source checkpoint; unresolved auth and host contracts disclosed"
source_of_truth: "supplied source ZIP and the three normative MD rulebooks"
---

# Public Landing Contact — Autonomous Submodule Source Contract

Scope is defined by the supplied code, not inferred backend functionality. `28` files currently exist; `3` source tests were inventoried. All endpoint and compliance claims below are source-level unless explicitly qualified.

## 1. Scope and Non-Scope
Public Landing Contact owns fill message, validate Zod, submit with stable UUID intent, retry or start another contact request. It does not own sibling modules, host authorization servers, database implementations, or the host application root.

## 2. Screen Inventory
Primary route/section: `/frontend_public/public_landing#contact anchored section; no separately declared /contact path`. Actual UI entry files: `components/contact/PublicLandingContact.tsx`. Existing source tests preserve its UI surfaces.

## 3. Navigation Contract
/frontend_public/public_landing#contact anchored section; no separately declared /contact path. Public landing composition remains inside the original `public_landing/page.tsx` route entry. Auth route handlers remain on their original user-visible URLs as compatibility route adapters. No additional backend or frontend endpoint invented.

## 4. API Contract

**RBG4 verified source adaptation:** Strict discriminated backend wire schema preserves optional backend `requestId`; the client normalizer produces `client:<uuid>` locally when absent. Never treat this as a backend trace ID; actual host `apiFetch` HTTP error handling remains unverified.
POST /landing/contact (verified API contract path from PublicLandingUrlConfig); fields name/email/message; header Idempotency-Key. Request/response models are the local Zod/TypeScript contracts. An upstream backend response envelope is a separate contract and must not silently acquire new fields. Exact host implementation and redirects are `NOT_VERIFIED` where absent.

## 5. Query Key Registry
Source-owned query key references: No module query key file was present; do not invent query cache keys.

## 6. Mutation Inventory
fill message, validate Zod, submit with stable UUID intent, retry or start another contact request. Only these existing mutations are supported; no speculative CRUD endpoints.

## 7. Permissions and Role Rules
Public form; no authenticated user required. Server authorization/tenant scoping is authoritative; UI conditions are never a substitute.

## 8. State Ownership
TanStack Query owns network mutation/server state where present, RHF+Zod owns form state, React owns ephemeral presentation state. Zustand is used only if an existing module-local store is present: No isolated Zustand store needed for this stateless/cohesive workflow.

## 9. Offline and Reconnect Behavior
Preserve entered values on transient failure; do not fabricate successful server submissions or abandon mutations on offline. Browser connection changes are UX hints, not proof of backend availability.

## 10. Security and PII Rules
PII email/name/message; external phone/social destinations not verified as real business contact. Preserve existing cookie security and same-origin transport; never leak session tokens, tenant secrets, or unsafe debug strings.

## 11. Accessibility Requirements

RBG4: local accessible `alertdialog` confirms dirty-form internal navigation, preserving pathname/query/hash and browser-native beforeunload behavior. HTTP 400/422 `validationErrors` for name/email/message now map into RHF `setError`. Backend field text is displayed verbatim, not translated as a locale key.
WCAG 2.2 AA: semantic landmarks, visible focus, accessible error feedback, minimum touch sizes, keyboard handling, reduced-motion fallback, locale parity, and SSR-safe hydration. Real assistive-tech verification is `DEFERRED_TO_HOST_RUNTIME`.

## 12. Background Tasks
TanStack mutation only, no background work.

## 13. Feature Flags
No independent feature flag found in module.

## 14. Cache Invalidation
Network mutations must invalidate only the owning module's query keys after verified success. Cross-sibling invalidations are not authorized by the supplied contracts.

## 15. Migration and Rollback
Source folder paths changed; import redirects must follow the recorded source-to-target migration. Preserve `/frontend_auth/auth/login` and original auth mutation URLs; the host `/landing` rewrite is `NOT_VERIFIED`. Rollback is the original immutable `frontend-public-auth.zip`.

## 16. Test Coverage Map

RBG4 tests cover server field 400 mapping and input retention; E2E host execution deferred.
Current source test inventory includes 3 files: `tests/hooks_tests/usePublicLandingContactForm.test.tsx`, `tests/api_tests/PublicLandingContactApi.test.ts`, `tests/contact_tests/PublicLandingContactForm.test.tsx`. Module mock files: 2. TypeScript syntax/import/export verification has been run; Vitest, Playwright and production build execution are `DEFERRED_TO_HOST_RUNTIME`.

## 17. Architecture Exceptions
Route entry adapters and the public route-level slot composition preserve existing URLs without introducing sibling-submodule business imports. Exact Next.js host layout mapping must be integration-tested. **Five-gate decision:** ANCHOR NAV: #contact is a navigation/deep-link target, not distinct Next segment; YES: independent submit/retry/reset lifecycle; cohesive ~25-file unit, no 3 workflows; YES: isolated mutable contact MSW handler; YES: Contact backend entity. Sibling justified by independent contract and multi-workflow split; strict Gate1 interpretation to be reviewed.

## 18. Known Contract Gaps

Host `apiFetch` thrown HTTP errors and backend correlation ID contract must be verified before declaring wire-level compliance.
Root host `package.json`, shared `@/lib/api` type overloads, CSS/theme injection, external backend contracts, deployed rewrites, and browser navigation behavior are outside this module-only ZIP. Do not infer their presence or claim verification.

## 19. Rule Compliance Checklist
- [x] Source inventory and 5-gate classification.
- [x] No static source imports from another autonomous sibling (after migration).
- [x] No nested feature submodule under this autonomous module.
- [x] Canonical source `components/hooks/api/types/schemas/mocks/tests` category layout where applicable.
- [ ] Full host TypeScript strict build, MSW runtime tests, WCAG browser checks (`DEFERRED_TO_HOST_RUNTIME`).
- [ ] Final V2.11 181-item acceptance audit and RBG 4–5 (source work applied; host-dependent verification not complete).

## 20. Standalone Run, Mock & Test Harness
`tests/harness/bootstrap.ts` provides `mockServer`, `installMockServer`, `resetMockServer`, `closeMockServer`. Own MSW contact handler, mutable contact message array and idempotent retry tests. On a host with dependencies installed, call `npm test -- --run` using the project's existing Vitest configuration and run `npx tsc --noEmit` with the submodule included. A dedicated standalone host test project is not supplied; compilation is **not yet runtime verified**.

## 21. Module Portability & Host Integration Guide
Install this folder at its canonical path relative to `src/app/`, provide shared `@/lib/api`, `@/lib/logger`, optional `@/lib/socket`, `@/lib/display_value`, `next-intl`, `Tailwind v4`, React, Zod v3, TanStack Query v5 and existing host UI primitives as referenced. Ambient types are described in `contracts/host-stubs.d.ts`; these are types, not runtime implementations. Keep the server/Client boundary and verified URL constants intact.

## 22. Deliverables & Version History

RBG4+5 source checkpoint; no production completion claim.
Current delivery is a **partial RBG 1-3 checkpoint** based on existing input versions, not an all-RBG final release. RBG 4–5 source changes are present; backend contracts and host-dependent verification remain explicitly unverified. A full independent portability score cannot be certified without a host runtime; do not report 8/8 as verified.


### V2.11 No-Host Source-Hardening Addendum (2026-10-31)
- No host runtime, backend, or root `package.json` was requested as a prerequisite for source-level work.
- Canonical in-module home route: `/frontend_public/public_landing`; optional `/landing` alias is an integration choice, not assumed to exist.
- Real social URLs/email/phone/address are never invented. Public links use validated build-time `NEXT_PUBLIC_LANDING_*` settings; unconfigured actions clearly explain their state.
- Session transport is isolated in `AuthServerHttpAdapter.ts` to preserve raw status, no-store behavior, bearer credentials, and manual redirects. Using a module-scoped native HTTP adapter instead of the mandated global `apiFetch` remains a documented architecture exception pending an approved compatible global transport contract.
- Structural five-gate result unchanged: autonomous sibling modules only; no nested sub-submodules or one-control nano-modules. File count alone does not force a split of a single cohesive workflow.


### RBG 6 (2026-11-04) — Strict Local Mock Contract and Scenario Closure

- **Scope:** PA-075–077, isolated Contact mock handler/fixture/scenario tests and this module's documentation. Production form components, API client, request DTO, URL config, and upstream response schema are **unchanged**.
- **Idempotency:** MSW rejects absent headers (`400 IDEMPOTENCY_KEY_REQUIRED`) and non-UUIDv4 headers (`400 IDEMPOTENCY_KEY_INVALID`); valid UUIDv4 retries do not append duplicate fixture records. Both are local mock preconditions, not claims about server enforcement.
- **Canonical mock envelope:** Local MSW success emits `success`, `message`, `data: null`, and `requestId: mock:<uuid>`. Local error emits `success: false`, `message`, `data: null`, `requestId`, `errorCode`, and `statusCode` agreeing with HTTP status. **Production backend is not asserted to emit these fields:** `PublicLandingContactApiResponseSchema.ts` intentionally retains the supplied optional-wire fields, and the client normalizer creates `client:<uuid>` if no upstream ID exists.
- **Scenarios (`mocks/scenarios/public_landing_contact.scenarios.ts`):** `ACTIVE` = normal mutable success (default); `EMPTY` = zero records before a valid mutation, then record created; `SERVER_500` = HTTP 500 without mutation; `TIMEOUT` = pending response via MSW `delay('infinite')` (host must abort); `UNAUTHORIZED` = HTTP 401 without mutation. Switching scenarios resets records and consumed keys. `tests/harness/bootstrap.ts` exposes `useMockScenario`, `resetMockServer`; existing fixture reset remains supported.
- **Tests:** `tests/mock_tests/PublicLandingContactMockScenarios.test.ts` covers UUIDv4, replay, 422, errors, EMPTY, and scenario selection on the verified endpoint. These are authored Vitest+MSW v2 tests **not run in this module-only environment**. An independent TypeScript transpile/isolation smoke is recorded in `RBG6_VERIFICATION_EVIDENCE.md`; full host Vitest/Next/browser verification remains `DEFERRED_TO_HOST_RUNTIME`.
- **No deletion:** The historical `landingErrorScenarioHandlers` opt-in export is retained unchanged in name and endpoint; canonical failure-envelope fields are added exclusively to that mock response.
- **Rollback:** restore this submodule's altered fixture-adjacent handler, status constants and harness files from `frontend-public-auth-v21-PARTIAL-rbg5.zip`, and remove newly added `mocks/scenarios/` and `tests/mock_tests/` files.

## Final source verification — Mock replay-integrity guard (2026-11-04)
The module-local mock rejects reuse of a previously accepted UUIDv4 idempotency key with a *different* normalized payload (`409 IDEMPOTENCY_KEY_CONFLICT`). Exact-body retries stay idempotent. This is **mock test behavior only**; it does not assert any unverified upstream backend response contract. The state reset also clears the key-to-payload mapping.

### v24 client mutation-header guard (RBG7 follow-up)

The production public API client now validates caller-provided `Idempotency-Key` as UUIDv4 **before** calling the transport. Missing/malformed keys reject with the existing module-owned local request error code, without exposing a malformed network request. Valid UUIDv4 keys and verified routes/data shapes are unchanged. The mock handlers already enforce UUIDv4 independently. This is source-level enforcement, not a claim that the upstream server validates or deduplicates these headers. Associated API regression tests cover missing, malformed, wrong-version and wrong-variant values. Real Vitest and host integration remain `DEFERRED_TO_HOST_RUNTIME`.
