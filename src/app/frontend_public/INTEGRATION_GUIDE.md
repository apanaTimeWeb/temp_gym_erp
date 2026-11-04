# V2.11 No-Host Source Handoff and Integration Guide

## Section 1 — Changelog
- RBG 1–3: role/domain/source isolation with original route adapters preserved. Five-gate check rejects arbitrary >25-file splitting and forbids nested sub-submodules/nano-modules.
- RBG 4–5: RHF/Zod validation and 400/422 field errors, accessible confirmation dialogs, regression tests, per-module contracts, and forensic reports.
- Final source hardening: AUTH-11 now routes raw authenticated upstream responses through one `AuthServerHttpAdapter.ts` boundary with no-store and `redirect: manual`; PUB-08 uses the **actual** `/frontend_public/public_landing` path for all internal navigation; PUB-15 removes all fabricated social, telephone, email, and address details and validates deploy-time settings instead.

## Installation
Merge `frontend_auth/` and `frontend_public/` from this ZIP under your host `src/app/` without renaming route segments. Keep original authentication handlers and frontend role containers. No additional dependencies or host application sources were required for source repairs.

## Actual and optional URLs
- Verified physical Next route: `/frontend_public/public_landing`. All in-scope home/back links now use this route, so **no host rewrite is necessary for internal navigation**.
- Optional public vanity alias `/landing` is not present in the supplied role module and cannot be asserted as working; if externally published, the host may add a rewrite or redirect to the physical route.
- Existing backend API endpoints `/landing/bookings` and `/landing/contact` are **not** public page URLs and have been preserved unchanged.

## Verified public business destinations — optional configuration
Provide only genuine business values at build/deploy time. Invalid/unset values safely render as unavailable instead of misleading dead links or invented details:
```
NEXT_PUBLIC_LANDING_FACEBOOK_URL=https://www.facebook.com/<real-profile>
NEXT_PUBLIC_LANDING_INSTAGRAM_URL=https://www.instagram.com/<real-profile>
NEXT_PUBLIC_LANDING_X_URL=https://x.com/<real-profile>
NEXT_PUBLIC_LANDING_YOUTUBE_URL=https://www.youtube.com/<real-channel>
NEXT_PUBLIC_LANDING_EMAIL=<verified-email>
NEXT_PUBLIC_LANDING_PHONE=+<E164-number>
NEXT_PUBLIC_LANDING_ADDRESS=<verified-address>
```
No variables above were populated with fabricated information. Newsletter handoff works **only** when the actual email is configured; otherwise it shows a localized, accessible explanation.

## Auth-specific transport exception and security requirements
`AuthServerHttpAdapter.ts` owns the sole remaining raw `fetch` for authenticated server-side upstream calls. It preserves required raw `Response.status`, Authorization, no-store, and no-redirect guarantees independently of host behavior. **Architecture exception:** this is not an integration with the required global `@/lib/api` `apiFetch`, because the supplied scope does not establish a compatible raw-response contract. Do not silently substitute a parsed JSON client for a raw-response transport. Resolve this only by verified host integration or an authorized exception (rule, risk and compensating control recorded below).

## Host/runtime verification (non-blocking)
These checks do not block source repair or source packaging. They must not be falsely reported as passing:
```
npx tsc --noEmit
npm run lint
npx vitest run
npm run build
npx playwright test
```
The role ZIPs are not complete host repositories. Runtime status is `DEFERRED_TO_HOST_RUNTIME` until actually executed. Existing host consumers of the former browser-readable identity cookie, if any, should move to `/frontend_auth/auth/token`.

## Source evidence
See `RE_AUDIT_CHECKLIST_RESULT.md`, `docs/V2_11_181_ITEM_RE_AUDIT_LEDGER.csv` (181 individually evaluated items), root `FRONTEND_V2_11_NO_HOST_FORENSIC_REAUDIT.md`, `evidence/smoke_auth.cjs`, and `evidence/smoke_no_host_release.cjs`.

---

## Archived handoff history (superseded, retained for traceability)

# FINAL SOURCE HANDOFF — V2.11 / RBG 1–5 (NOT PRODUCTION-CERTIFIED)

## Section 1 — Changelog and status
- Final hardening: ghost restore UUIDv4 requirement, HttpOnly identity cookies on login/refresh/restore, logout ghost-stash cleanup; cookie parser split under file ceiling, regression tests.
- All five RBGs have received source work. Remaining SOURCE_CONFLICT/HOST_PRODUCT findings: AUTH-11, PUB-08, PUB-15.
- Neither this ZIP nor a combined archive is `ALL-RBGS-COMPLETE`: no host TypeScript/build/Vitest/Playwright execution and unresolved external contracts.

## Mandatory host integration instructions
- Deploy only to the role-owned App Router path under `src/app/` and preserve original route handlers.
- Confirm that the real backend matches the supplied Zod response schemas, and confirm auth transport `Authorization`, no-store, cookie handling and status semantics before replacing direct server fetch with global apiFetch.
- IMPORTANT COOKIE MIGRATION: `gymsmart_user` is now HttpOnly. Host UI that reads this cookie via `document.cookie` must instead query `/frontend_auth/auth/token` and use backend-verified roles. The supplied ZIP has no such reader, but host consumers are not supplied.
- Confirm the host rewrite from `/landing` to `/frontend_public/public_landing` and supply real company phone/email/social links. Do not assume or invent any.
- Run: `npx tsc --noEmit`, `npm run lint`, `npx vitest run`, `npm run build`, `npx playwright test` in the actual host, and manually test cookie migration and responsive/WCAG behavior.
- Source evidence: `RE_AUDIT_CHECKLIST_RESULT.md`, `docs/V2_11_181_ITEM_RE_AUDIT_LEDGER.csv` and the standalone FINAL forensic report in the combined delivery.

---

## Historical integration guide (previous checkpoint, preserved)

# FINAL SOURCE HANDOFF — V2.11 / RBG 1–5 (NOT PRODUCTION-CERTIFIED)

## Section 1 — Changelog and status
- Final hardening: ghost restore UUIDv4 requirement, HttpOnly identity cookies on login/refresh/restore, logout ghost-stash cleanup; cookie parser split under file ceiling, regression tests.
- All five RBGs have received source work. Remaining SOURCE_CONFLICT/HOST_PRODUCT findings: AUTH-11, PUB-08, PUB-15.
- Neither this ZIP nor a combined archive is `ALL-RBGS-COMPLETE`: no host TypeScript/build/Vitest/Playwright execution and unresolved external contracts.

## Mandatory host integration instructions
- Deploy only to the role-owned App Router path under `src/app/` and preserve original route handlers.
- Confirm that the real backend matches the supplied Zod response schemas, and confirm auth transport `Authorization`, no-store, cookie handling and status semantics before replacing direct server fetch with global apiFetch.
- IMPORTANT COOKIE MIGRATION: `gymsmart_user` is now HttpOnly. Host UI that reads this cookie via `document.cookie` must instead query `/frontend_auth/auth/token` and use backend-verified roles. The supplied ZIP has no such reader, but host consumers are not supplied.
- Confirm the host rewrite from `/landing` to `/frontend_public/public_landing` and supply real company phone/email/social links. Do not assume or invent any.
- Run: `npx tsc --noEmit`, `npm run lint`, `npx vitest run`, `npm run build`, `npx playwright test` in the actual host, and manually test cookie migration and responsive/WCAG behavior.
- Source evidence: `RE_AUDIT_CHECKLIST_RESULT.md`, `docs/V2_11_181_ITEM_RE_AUDIT_LEDGER.csv` and the standalone FINAL forensic report in the combined delivery.

---

## Historical integration guide (previous checkpoint, preserved)

# Public frontend — V2.11 Integration Guide (RBG 1–5 source checkpoint)

## Section 1 — Changelog
- RBG 1–3: module isolation/route adapters and source-level session fixes from previous approved checkpoint.
- RBG 4: accessible dirty-form confirmation, RHF+Zod newsletter, field-level 400/422 mapping, strict backend envelope discrimination and client normalization, extracted auth online-status hook, focused tests.
- RBG 5: source docs/22 sections reconciled, E2E regression source added, 181-item evidence ledger updated, anti-deception physical cross-check.
- RELEASE STATE: **PARTIAL-rbg5** because unresolved auth backend/security and host contracts remain. No passing runtime claims.

## Section 2 — Scope and preserved integration
- Only the supplied `public` frontend role directory and role-owned E2E/doc assets are changed; no host root, sibling business modules or backend code modified.
- Next.js App Router route entries preserved. Public component composition is maintained through existing route-level page adapter.
- Do not import business code across submodule siblings. Each submodule owns its own config, RHF, schema, mocks, types, tests and three documentation files.

## Section 3 — 5-Gate submodule decision
- Evaluate navigation/route, lifecycle, actual workflow/file distribution, isolated mock/test harness, backend entity alignment.
- Multiple distinct operational workflows in a mega-submodule MUST be separated as sibling autonomous submodules. Cohesive workflows MUST NOT be arbitrarily split for >25 files alone.
- No sub-submodule or nano-module created. See `docs/` ledger and role-owned `*_features.md` for five specific boundaries.

## Section 4 — Host integration checks
1. Merge role source into existing `src/app/frontend_public/` App Router tree; retain all legacy route adapters and route segments.
2. Confirm host versions, `@/*` alias to `src/*`, `globals.css` semantic mappings and the exact `apiFetch` response/error contract.
3. Validate actual backend auth cookie/token handling, UUIDv4 mutation idempotency, access-control enforcement, all public POST validations, `client:` request ID meaning, and no false success.
4. Validate `/landing` rewrite if host navigation uses it; the physical route is `/frontend_public/public_landing`.
5. Run `npx tsc --noEmit`, `npm run lint`, `npx vitest run`, `npm run build`, `npx playwright test` in the real host.
6. Test 320px/200% zoom, keyboard navigation, screen-reader dialogs, forms, localization, offline, pending and error states.

## Section 5 — Outstanding evidence
- AUTH-11 / AUTH-15 / AUTH-19, PUB-08 / PUB-15 remain open or external.
- Runtime TypeScript/build/RTL/Vitest/Playwright/WCAG checks are `DEFERRED_TO_HOST_RUNTIME`.
- `apiFetch` rejection handling and upstream envelope are `NOT_VERIFIED` without backend/host contract.
- Full evidence: `RE_AUDIT_CHECKLIST_RESULT.md`, `docs/V2_11_181_ITEM_RE_AUDIT_LEDGER.csv`, source-owned specs and tests.

## Section 6 — Prior integration notes (source-provided, not re-certified)

# Public frontend — V2.11 Integration Guide (RBG 1–5 source checkpoint)

## Section 1 — Changelog
- RBG 1–3: module isolation/route adapters and source-level session fixes from previous approved checkpoint.
- RBG 4: accessible dirty-form confirmation, RHF+Zod newsletter, field-level 400/422 mapping, strict backend envelope discrimination and client normalization, extracted auth online-status hook, focused tests.
- RBG 5: source docs/22 sections reconciled, E2E regression source added, 181-item evidence ledger updated, anti-deception physical cross-check.
- RELEASE STATE: **PARTIAL-rbg5** because unresolved auth backend/security and host contracts remain. No passing runtime claims.

## Section 2 — Scope and preserved integration
- Only the supplied `public` frontend role directory and role-owned E2E/doc assets are changed; no host root, sibling business modules or backend code modified.
- Next.js App Router route entries preserved. Public component composition is maintained through existing route-level page adapter.
- Do not import business code across submodule siblings. Each submodule owns its own config, RHF, schema, mocks, types, tests and three documentation files.

## Section 3 — 5-Gate submodule decision
- Evaluate navigation/route, lifecycle, actual workflow/file distribution, isolated mock/test harness, backend entity alignment.
- Multiple distinct operational workflows in a mega-submodule MUST be separated as sibling autonomous submodules. Cohesive workflows MUST NOT be arbitrarily split for >25 files alone.
- No sub-submodule or nano-module created. See `docs/` ledger and role-owned `*_features.md` for five specific boundaries.

## Section 4 — Host integration checks
1. Merge role source into existing `src/app/frontend_public/` App Router tree; retain all legacy route adapters and route segments.
2. Confirm host versions, `@/*` alias to `src/*`, `globals.css` semantic mappings and the exact `apiFetch` response/error contract.
3. Validate actual backend auth cookie/token handling, UUIDv4 mutation idempotency, access-control enforcement, all public POST validations, `client:` request ID meaning, and no false success.
4. Validate `/landing` rewrite if host navigation uses it; the physical route is `/frontend_public/public_landing`.
5. Run `npx tsc --noEmit`, `npm run lint`, `npx vitest run`, `npm run build`, `npx playwright test` in the real host.
6. Test 320px/200% zoom, keyboard navigation, screen-reader dialogs, forms, localization, offline, pending and error states.

## Section 5 — Outstanding evidence
- AUTH-11 / AUTH-15 / AUTH-19, PUB-08 / PUB-15 remain open or external.
- Runtime TypeScript/build/RTL/Vitest/Playwright/WCAG checks are `DEFERRED_TO_HOST_RUNTIME`.
- `apiFetch` rejection handling and upstream envelope are `NOT_VERIFIED` without backend/host contract.
- Full evidence: `RE_AUDIT_CHECKLIST_RESULT.md`, `docs/V2_11_181_ITEM_RE_AUDIT_LEDGER.csv`, source-owned specs and tests.

## Section 6 — Prior integration notes (source-provided, not re-certified)

# INTEGRATION GUIDE — V2.11 RBG 1–3 PARTIAL CHECKPOINT (PUBLIC)

## 1. Changelog
- Restructured existing `public` business code into 100%-local autonomous submodule source boundaries; kept all original route entrypoints.
- Added source-backed feature/forbidden/theme documentation trios, standalone test harnesses, ambient contract stubs and locally owned URL configs.
- Separated booking and contact submission workflows from marketing views; preserved original landing section order and public route boundary.
- No deletion of existing features; moved original pre-RBG guides to `docs/` for audit trail.
- Checkpoint: `PARTIAL-rbg3`, not V2.11 full compliance or production ready.

## 2. Existing route preservation
public_landing root page/layout/loading/error/not-found retained; page composes sibling slots.

## 3. Integration steps
- Merge `frontend_public` into the host `src/app/frontend_public` without renaming Next.js URL segments.
- Inspect `package.json`/lockfile and `tsconfig.json` to verify Next.js/TypeScript/Zod/TanStack versions and `@/*` alias.
- Confirm the host implementations of `@/lib/api`, `@/lib/logger`, `@/components/ui/*` and other `contracts/host-stubs.d.ts` imports.
- Execute `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`, and `npx playwright test` in the real host after installing dependencies.
- Check real and demo API flows, accessibility, responsiveness, all original routes and semantics.

## 4. Unresolved
See the included `RE_AUDIT_CHECKLIST_RESULT.md` and root forensic checkpoint. Host runtime verification and RBG 4/5 are pending. /landing host rewrite, form validation mapping, accessible confirm, and public response contract need further work.


## RBG 6 — Public Mock Contract and UI Rule Verification (2026-11-04)

- Booking + Contact own separate MSW v2 scenario registries: `mocks/scenarios/public_landing_booking.scenarios.ts` and `mocks/scenarios/public_landing_contact.scenarios.ts`, each with `ACTIVE`, `EMPTY`, `SERVER_500`, `TIMEOUT`, `UNAUTHORIZED`. Local `tests/harness/bootstrap.ts` exposes scenario selection and reset.
- Mock state is mutable. A valid UUIDv4 is required on mock POSTs; replay does not duplicate; invalid UUIDv4 and missing headers return distinct HTTP 400 codes. Errors supply `requestId` with `mock:` prefix, `errorCode`, `statusCode`. These fields describe *test doubles only*, not the unverified real backend; no backend client shape was altered.
- To test in a fully equipped host: `npx vitest run src/app/frontend_public/public_landing/landing_booking/tests/mock_tests` and `npx vitest run src/app/frontend_public/public_landing/landing_contact/tests/mock_tests` after `npm ci`, followed by `npx tsc --noEmit`, `npm run build`, and `npx playwright test`. Timeout scenarios intentionally never resolve; callers should cancel with AbortController/transport timeout and must not await them indefinitely.
- Experience visual rules were source-scope checked only; host responsive/a11y/theme verification remains deferred. See `public/RE_AUDIT_CHECKLIST_RESULT.md` and root `audit_evidence/RBG6_VERIFICATION_EVIDENCE.md`. No Auth code and no public production UI/API client were modified in RBG6.
- Release label remains `PARTIAL-rbg6` until RBG7 final review, and runtime claims must remain evidence-based.
