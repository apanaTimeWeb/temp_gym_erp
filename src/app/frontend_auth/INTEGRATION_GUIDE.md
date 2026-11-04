> **v21 RBG 5 source repair note:** Cross-owner route-contract Vitest tests now live at the role-level `auth/route_contract_tests/` (install under host `tests/auth_route_contracts/`), never inside autonomous submodule `tests/`. Metadata-only Login, Ghost, and Logout harnesses have been replaced with runnable local MSW/route-test setup; Auth production source/legacy routes are unchanged. Host dependencies remain absent; no Vitest/Next/Playwright pass is claimed. The canonical ZIP-root `INTEGRATION_GUIDE.md` and `audit_evidence/RBG5_VERIFICATION_EVIDENCE.md` override stale historic testing instructions below.

> **v21 RBG 1 checkpoint — correction to historical instructions below:** The canonical combined ZIP-root `INTEGRATION_GUIDE.md` governs this checkpoint. The original v20 archive **does not contain `auth/host_integration/`** even though the historical text below says it does. Imports of `@/server/auth-demo/AuthDemoSessionService` and `@/lib/api-raw` therefore require separately verified host implementations; copying the nonexistent paths is NOT an available installation step. The historical guide text is retained for provenance only. Source-only RBG 1 hardens malformed refresh idempotency headers while preserving legacy header-free refresh/logout. Do not mark runtime or production verification as passed.

# Auth four-domain migration — Integration Guide

**Artifact class: SOURCE REPAIR CHECKPOINT — NOT PRODUCTION-CERTIFIED.** User approved the four domain roots and authorized future backend/host integrations to be documented here. No unverified new backend endpoints or password-reset tokens were invented.

## 1. Changelog
1. Four Auth domains: `auth_login`, `auth_logout`, `auth_session`, and reserved `auth_password_reset`.
2. Implemented autonomous submodules: `login_credentials_and_demo_access`, `logout_session_termination`, `session_status_refresh_and_restore`, and separate `session_ghost_restoration` sibling. No nested sub-submodule created.
3. Migrated login/Logout/session/ghost source into canonical owners and preserved exactly 11 historical route entrypoints.
4. Fixed the missing React `useState` import and the zero-argument legacy handler test.
5. Removed **both** direct cross-owner demo registry imports. A single backend-tier development-only fixture now owns mock access/refresh mappings and idempotency state at `host_integration/src/server/auth-demo/AuthDemoSessionService.ts`. A bug where stale login replay could return a rotated access token was fixed; logout revokes replay entries.
6. Moved all feature-owned raw HTTP calls into a neutral host `apiFetchRaw` adapter (still preserving `cache:'no-store'`, `redirect:'manual'`, backend status and raw JSON).
7. Preserved all Public source files; no previously implemented feature or historical URL removed. Added source checker and server-side lifecycle test.

## 2. Frozen legacy routes
The external `/frontend_auth/auth/` route suffixes are `login` (GET page), `session` (POST), `demo_login` (POST), `demo-login` (POST), `logout` (POST), `refresh` (POST), `token` (GET), `exit_ghost_login` (POST), `exit-ghost-login` (POST), `set_cookie` (POST, retired 410), and `set-cookie` (POST, retired 410). All still have unchanged route entrypoint paths; real browser/API parity must be verified on the host.

## 3. Critical host installation steps (required before running migrated Auth)
The artifact contains two pieces of source that belong to the receiving Next.js host; they are deliberately **not** stored in a frontend domain or under global UI components.

- Copy `auth/frontend_auth/` into the receiving host `src/app/frontend_auth/`.
- Copy `auth/host_integration/src/server/auth-demo/` into `src/server/auth-demo/` **only for development/test environments**; the host app's `@/server/auth-demo/AuthDemoSessionService` import must resolve there. Never use this process-local fixture as a real production session backend.
- Copy `auth/host_integration/src/lib/api-raw.ts` into host `src/lib/api-raw.ts`, or fold its raw-response signature into the verified host `apiFetch` implementation, preserving real `Response.status`, `redirect:'manual'`, `cache:'no-store'` and no credential forwarding to redirects. Do not install both competing implementations.
- Preserve the existing `@/* -> src/*` TypeScript alias and the host's approved `src/lib/api`, `src/lib/logger`, `src/config/env` and UI primitives.
- `public/frontend_public` remains unchanged; deploy as originally provided if part of this host.
- Run the server with `AUTH_DEMO_MODE=true` only in `NODE_ENV=development` or `test`. Default absent/false disables demo. The fixture rejects **all** calls under `NODE_ENV=production` regardless of the demo flag.
- Keep the legacy `frontend_auth/auth/*` route-only wrappers while existing clients use them. A later verified host-level Next.js rewrite strategy may remove the adapters without changing external URLs. Do NOT remove them beforehand.

## 4. Real backend when created (do not invent contracts)
Source expects backend API paths `POST /auth/login`, `GET /auth/me`, `POST /auth/refresh`, `POST /auth/logout`. Verify body, response, auth header, idempotency, cookie and tenant isolation semantics against the actual backend before production. The upstream URL is supplied by existing host environment `NEXT_PUBLIC_API_URL` (do not store secret tokens in `NEXT_PUBLIC_*`).

Real backend MUST implement durable and tenant-isolated session issuance, token status, refresh/rotation, revocation, replay conflict detection, CSRF/rate limiting, and correct `ApiResponse<T>` envelopes. The demo fixture is a **development test backend only**, not a substitute for a production session store.

`auth_password_reset` is an **organizational placeholder, not working password reset**. When the backend is ready, first supply verified forgot-password request/response, reset token generation/expiry/one-time-use, resend/rate limiting, tenant/user lookup privacy behavior and final password-change/revocation contract. Then implement its own autonomous submodule, forms, validation, tests, email templates and route wrappers. No reset URL or email/token behavior is currently fabricated.

## 5. Test/verification commands
After placement in a compatible host with normal `package.json`/Node 20+ and development dependencies:

```bash
npm ci
npx tsc --noEmit
npm run lint
npx vitest run
npx playwright test
npm run build
node auth/host_integration/tests/AuthDemoSessionLifecycle.test.cjs
```

The isolated fixture test requires `typescript` installed as a host dev dependency. Verify in a real browser: all 11 URLs and methods, HTTP status parity and retired 410 handling; invalid and repeated UUIDv4 idempotency keys; credential/demo login, token status, refresh rotation and logout revocation; role and tenant isolation; HttpOnly/Secure/SameSite cookies; CSRF, user-form a11y, WCAG 2.2 AA, 320/375/425/768/1024/1440/1920px layouts, 200% zoom; semantic Tailwind tokens and dark/light themes; reduced motion.

**Executed in isolated tool environment:** TypeScript parser + internal imports/exports, old route physical inventory, low-level host fixture strict TS compile, 16/16 fixture lifecycle assertions, file-line ceilings and JSX forbidden token regex. These do NOT imply successful host Next build, Vitest, Playwright, backend integration, accessibility scan or complete 181-item release gate.

## 6. Scope/exception and future integration
- See `docs/AUTH_APPROVED_EXCEPTION_REGISTER.md` for canonical-route aliases, the raw-response host adapter, and server-only development fixture. User-approved URL freeze takes precedence over deleting legacy route adapters.
- See `docs/AUTH_GROUP_OPEN_FINDINGS.csv` for outstanding host, external-backend and runtime tasks. Source-level cross-module registry defect no longer appears as an open P0.
- See `RE_AUDIT_CHECKLIST_RESULT.md`, `docs/AUTH_GROUP_14_GATE_LEDGER.csv`, `docs/AUTH_GROUP_RBG12_181_ITEM_CURRENT_EVIDENCE.csv` and the physical cross-check tables.

## 7. Rollback
Keep the original `frontend-auth-v19-PARTIAL-rbg8.zip`. Install host service and transport in one atomic integration alongside the updated frontend modules; never deploy the changed frontend before the required host files are installed. If integration verification fails, revert Auth and host service together; do not silently duplicate the session registry or reactivate retired cookie endpoints.
