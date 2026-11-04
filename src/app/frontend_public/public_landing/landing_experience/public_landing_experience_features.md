---
module_id: public_landing_experience
owner: "Public Landing Marketing Experience"
mode: "B - WEB AUDIT/REPAIR"
baseline_frozen: true
review_scope: "RBG 1-4 source checkpoint; unresolved auth and host contracts disclosed"
source_of_truth: "supplied source ZIP and the three normative MD rulebooks"
---

# Public Landing Marketing Experience — Autonomous Submodule Source Contract

Scope is defined by the supplied code, not inferred backend functionality. `68` files currently exist; `10` source tests were inventoried. All endpoint and compliance claims below are source-level unless explicitly qualified.

## 1. Scope and Non-Scope
Public Landing Marketing Experience owns show marketing content, navigation anchors, membership plans, services, transformations, BMI calculator and newsletter mailto. It does not own sibling modules, host authorization servers, database implementations, or the host application root.

## 2. Screen Inventory
Primary route/section: `/frontend_public/public_landing (exact supplied Next route); /landing advertised but host rewrite NOT_VERIFIED`. Actual UI entry files: `components/main/PublicLandingMain.tsx`. Existing source tests preserve its UI surfaces.

## 3. Navigation Contract
/frontend_public/public_landing (exact supplied Next route); /landing advertised but host rewrite NOT_VERIFIED. Public landing composition remains inside the original `public_landing/page.tsx` route entry. Auth route handlers remain on their original user-visible URLs as compatibility route adapters. No additional backend or frontend endpoint invented.

## 4. API Contract
No direct backend write operation. Newsletter is a verified mailto handoff, not a subscription endpoint.. Request/response models are the local Zod/TypeScript contracts. An upstream backend response envelope is a separate contract and must not silently acquire new fields. Exact host implementation and redirects are `NOT_VERIFIED` where absent.

## 5. Query Key Registry
Source-owned query key references: `constants/PublicLandingQueryKeys.ts`.

## 6. Mutation Inventory
show marketing content, navigation anchors, membership plans, services, transformations, BMI calculator and newsletter mailto. Only these existing mutations are supported; no speculative CRUD endpoints.

## 7. Permissions and Role Rules
Public; no authenticated user requirement. Server authorization/tenant scoping is authoritative; UI conditions are never a substitute.

## 8. State Ownership

Newsletter input now uses React Hook Form v7 + Zod for email validation, retains the existing mailto handoff, and makes no claim of successful backend registration. Form state is owned by RHF, not ad hoc useState.
TanStack Query owns network mutation/server state where present, RHF+Zod owns form state, React owns ephemeral presentation state. Zustand is used only if an existing module-local store is present: No isolated Zustand store needed for this stateless/cohesive workflow.

## 9. Offline and Reconnect Behavior
Preserve entered values on transient failure; do not fabricate successful server submissions or abandon mutations on offline. Browser connection changes are UX hints, not proof of backend availability.

## 10. Security and PII Rules
Do not fabricate external business contact values or track PII from BMI inputs. Preserve existing cookie security and same-origin transport; never leak session tokens, tenant secrets, or unsafe debug strings.

## 11. Accessibility Requirements

Feature-local unsaved changes guard and accessible confirmation dialog replace raw `window.confirm` in source; marketing experience does not itself mount the dialog because it has no dirty form currently invoking the hook.
WCAG 2.2 AA: semantic landmarks, visible focus, accessible error feedback, minimum touch sizes, keyboard handling, reduced-motion fallback, locale parity, and SSR-safe hydration. Real assistive-tech verification is `DEFERRED_TO_HOST_RUNTIME`.

## 12. Background Tasks
No background mutation; browser online state used for UX only.

## 13. Feature Flags
No independent feature flag found within the supplied module.

## 14. Cache Invalidation
Network mutations must invalidate only the owning module's query keys after verified success. Cross-sibling invalidations are not authorized by the supplied contracts.

## 15. Migration and Rollback
RBG4 migration (approved) renamed 11 locally owned Experience source files to canonical `PublicLandingExperience*` / `usePublicLandingExperience*` filename prefixes without changing their public exports or runtime logic. Corresponding Experience-local import and mock paths were updated. The public page entrypoint, CSS, translations, and sibling Auth, Booking, Contact modules are unchanged; original paths and SHA-256 mapping are recorded in `RBG4_VERIFICATION_EVIDENCE.md`. Any receiving host importing former internal Experience file paths must update those imports.

Source folder paths changed; import redirects must follow the recorded source-to-target migration. Preserve `/frontend_auth/auth/login` and original auth mutation URLs; the host `/landing` rewrite is `NOT_VERIFIED`. Rollback is the original immutable `frontend-public-auth.zip`.

## 16. Test Coverage Map

Updated newsletter, navigation guard and confirmation dialog RTL tests and strict response discriminator test. Host execution not available.
Current source test inventory includes 10 files: `tests/hooks_tests/usePublicLandingUnsavedChangesGuard.test.tsx`, `tests/hooks_tests/usePublicLandingOnlineStatus.test.ts`, `tests/hooks_tests/usePublicLandingNavbar.test.ts`, `tests/hooks_tests/usePublicLandingNewsletter.test.tsx`, `tests/hooks_tests/usePublicLandingBmi.test.ts`, `tests/schema_tests/public_landing_api_response_schema.test.ts`, `tests/locale_tests/public_landing_locale_contract.test.ts`, `tests/utils_tests/PublicLandingDateUtils.test.ts`, `tests/utils_tests/PublicLandingBmiUtils.test.ts`, `tests/utils_tests/PublicLandingFormattingUtils.test.ts`. Module mock files: 0. TypeScript syntax/import/export verification has been run; Vitest, Playwright and production build execution are `DEFERRED_TO_HOST_RUNTIME`.

## 17. Architecture Exceptions
Route entry adapters and the public route-level slot composition preserve existing URLs without introducing sibling-submodule business imports. Exact Next.js host layout mapping must be integration-tested. **Five-gate decision:** YES: one public page route; YES: marketing can refresh independently; >25 content files but one cohesive presentation and no 3 distinct backend workflows; YES: standalone static/mocked tests; NO distinct backend aggregate for static sections, so BMI/newsletter stay internal views.

## 18. Known Contract Gaps

Newsletter remains a validated `mailto:` request only when NEXT_PUBLIC_LANDING_EMAIL is configured; otherwise the user receives a localized unavailable response. No subscription API was invented. Internal navigation targets the existing `/frontend_public/public_landing` route; `/landing` is an optional host alias. External social/contact destinations are validated from optional NEXT_PUBLIC_LANDING_* configuration.
Root host `package.json`, shared `@/lib/api` type overloads, CSS/theme injection, external backend contracts, deployed rewrites, and browser navigation behavior are outside this module-only ZIP. Do not infer their presence or claim verification.

## 19. Rule Compliance Checklist
- [x] Source inventory and 5-gate classification.
- [x] No static source imports from another autonomous sibling (after migration).
- [x] No nested feature submodule under this autonomous module.
- [x] Canonical source `components/hooks/api/types/schemas/mocks/tests` category layout where applicable.
- [ ] Full host TypeScript strict build, MSW runtime tests, WCAG browser checks (`DEFERRED_TO_HOST_RUNTIME`).
- [ ] Final V2.11 181-item acceptance audit and RBG 5–7 (pending; host-dependent verification not complete).

## 20. Standalone Run, Mock & Test Harness
`tests/harness/bootstrap.ts` provides `mockServer`, `installMockServer`, `resetMockServer`, `closeMockServer`. Marketing content is static/source-owned; harness deliberately has empty MSW backend handlers. On a host with dependencies installed, call `npm test -- --run` using the project's existing Vitest configuration and run `npx tsc --noEmit` with the submodule included. A dedicated standalone host test project is not supplied; compilation is **not yet runtime verified**.

## 21. Module Portability & Host Integration Guide
Install this folder at its canonical path relative to `src/app/`, provide shared `@/lib/api`, `@/lib/logger`, optional `@/lib/socket`, `@/lib/display_value`, `next-intl`, `Tailwind v4`, React, Zod v3, TanStack Query v5 and existing host UI primitives as referenced. Ambient types are described in `contracts/host-stubs.d.ts`; these are types, not runtime implementations. Keep the server/Client boundary and verified URL constants intact.

## 22. Deliverables & Version History

RBG4 source checkpoint; RBG5–7 and host-dependent E2E/backend verification remain open.
Current delivery is a **partial RBG 1-4 checkpoint** based on existing input versions, not an all-RBG final release. RBG 1–4 source changes are present; RBG 5–7 remain open; backend contracts and host-dependent verification remain explicitly unverified. A full independent portability score cannot be certified without a host runtime; do not report 8/8 as verified.


### V2.11 No-Host Source-Hardening Addendum (2026-10-31)
- No host runtime, backend, or root `package.json` was requested as a prerequisite for source-level work.
- Canonical in-module home route: `/frontend_public/public_landing`; optional `/landing` alias is an integration choice, not assumed to exist.
- Real social URLs/email/phone/address are never invented. Public links use validated build-time `NEXT_PUBLIC_LANDING_*` settings; unconfigured actions clearly explain their state.
- Session transport is isolated in `AuthServerHttpAdapter.ts` to preserve raw status, no-store behavior, bearer credentials, and manual redirects. Using a module-scoped native HTTP adapter instead of the mandated global `apiFetch` remains a documented architecture exception pending an approved compatible global transport contract.
- Structural five-gate result unchanged: autonomous sibling modules only; no nested sub-submodules or one-control nano-modules. File count alone does not force a split of a single cohesive workflow.


### RBG 6 — UI/UX and Design-Rule Scope Verification (PA-078; 2026-11-04)

- **Evidence boundary:** Experience page TSX, CSS, localization, route entrypoints, and UI test files are byte-identical to the RBG5 ZIP in this batch. No CSS or UI logic changes were authorized or necessary to repair the two mock contracts. The existing gold/black semantic tokens and intended WCAG 2.2 AA constraints remain normative in `WEB_FRONTEND_UI_UX_DESIGN.md`.
- **Static checks in scope:** source parsing, preserved imports, unchanged visual source assets, React/Next route consistency and no sibling business imports. See `RBG6_STATIC_VERIFICATION.json` and `RBG6_VERIFICATION_EVIDENCE.md` in the combined ZIP.
- **Out-of-scope verification, not a PASS:** actual browser viewport 320/375/768/1024/1440, light/dark rendering, focus visibility, screen-reader behavior, reduced-motion, contrast measurement, semantic theme mapping from host `globals.css`, CLS and responsive screen snapshots require the receiving host. Record as `DEFERRED_TO_HOST_RUNTIME` / `NOT_VERIFIED`; do not report WCAG success without browser evidence.
- **No behavioral change:** `/frontend_public/public_landing` and existing on-page sections, BMI/newsletter functionality and translations remain unchanged. An optional host `/landing` rewrite is not assumed.
