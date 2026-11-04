# Auth Compatibility Route Domain — Current Source Contract (v21 / RBG 1)

> **Canonical source index.** This document supersedes the stale v9 monolithic `auth_components/`, `auth_api/`, `auth_utils/`, and `login/auth_login_*` directory descriptions in the incoming v20 snapshot. The immutable v20 ZIP remains the historical record. Routes in this directory are compatibility entrypoints only; their business implementations belong to the autonomous submodules below. Status is **partial RBG 1**, not production-certified.

## Purpose and boundaries

Preserve all eleven existing public Auth route entrypoints while delegating login, logout, session refresh/status, and ghost restoration to independent owners. Never expose access/refresh tokens in browser JSON, weaken HttpOnly cookies, or treat a convenience identity cookie as the authentication source of truth. This route-only compatibility domain owns no business UI, API client, mock fixture or state store.

## Canonical autonomous submodules (verified in the supplied ZIP)

| Domain | Autonomous owner | Verified responsibilities |
|---|---|---|
| `auth_login` | `login_credentials_and_demo_access/` | Login form, credential/demo login, Zod schemas, immutable intent keys, translated UI, loading/error/not-found states |
| `auth_logout` | `logout_session_termination/` | Logout, backend/demo revocation, unconditional local cookie cleanup |
| `auth_session` | `session_status_refresh_and_restore/` | Status/token lookup, refresh/rotation, retired cookie-write entrypoints |
| `auth_session` | `session_ghost_restoration/` | Exit ghost login and restore original stashed session |
| `auth_password_reset` | Reserved organizational domain only | No verified recovery endpoint, reset token, email, or UI contract; do not fabricate implementation |

Each implemented submodule owns a `*_features.md`, `*_forbidden.md`, `*_theme_contract.md`, `config/`, contracts, mocks and tests where applicable. Its own feature document and URL config are the canonical details for that capability, with the architecture specification higher priority on architectural conflicts.

## Frozen compatibility route and method inventory

| Entry in this directory | Method | Delegate/owner | Safety behavior |
|---|---|---|---|
| `login/page.tsx` | GET page | `auth_login/login_credentials_and_demo_access` | Public Login with RHF/Zod and local loading/error/not-found |
| `session/route.ts` | POST | `auth_login/login_credentials_and_demo_access` | Credential session creation; server-set HttpOnly cookies |
| `demo_login/route.ts` | POST | `auth_login/login_credentials_and_demo_access` | Development-gated demo issuance |
| `demo-login/route.ts` | POST | Same owner | Historical hyphenated alias preserved |
| `logout/route.ts` | POST | `auth_logout/logout_session_termination` | Best-effort upstream revocation, unconditional local cookie clearing |
| `refresh/route.ts` | POST | `auth_session/session_status_refresh_and_restore` | Refresh cookie read, upstream/mock refresh, cookie rotation |
| `token/route.ts` | GET | `auth_session/session_status_refresh_and_restore` | Server-verified sanitized session state |
| `exit_ghost_login/route.ts` | POST | `auth_session/session_ghost_restoration` | Restore stashed original session |
| `exit-ghost-login/route.ts` | POST | Same owner | Historical hyphenated alias preserved |
| `set_cookie/route.ts` | POST | `auth_session/session_status_refresh_and_restore` | Retired, returns HTTP 410 |
| `set-cookie/route.ts` | POST | Same owner | Retired hyphenated alias, returns HTTP 410 |

The hostname and external `/landing` vanity alias are **not verified** by this isolated ZIP.

## Exact API/host contract references

- Login owns `auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config.ts`, API clients, schemas, and intent fingerprint logic.
- Refresh/status owns `auth_session/session_status_refresh_and_restore/config/auth_session_status_refresh_and_restore.url_config.ts` and its owner-local backend transport/schema handlers.
- Logout owns `auth_logout/logout_session_termination/config/auth_logout_session_termination.url_config.ts` and its owner-local backend transport/schema handlers.
- Ghost restore owns `auth_session/session_ghost_restoration/config/auth_session_ghost_restoration.url_config.ts` and session utility contract.
- Existing verified upstream routes are `/auth/login`, `/auth/refresh`, `/auth/logout`, `/auth/me`; upstream response semantics and business authorization require independent host/backend verification.
- The demo registry is a host-provided development/test-only service imported through `@/server/auth-demo/AuthDemoSessionService`. **Its implementation is absent** from the supplied v20 ZIP; keep this as an explicitly unverified host dependency. Never import it into browser UI or enable it in production.
- The host `@/lib/api-raw` raw-response implementation is **not included** in the supplied ZIP; it needs a verified host integration. Do not claim it is compatible with a JSON-only `apiFetch` overload.

## RBG 1 idempotency compatibility and exception decision

Login and demo login already require validated UUIDv4 `Idempotency-Key` keys tied to user intent. The existing *historical refresh/logout URL contract* permits callers to omit this header. Both server proxy handlers produce one UUIDv4 fallback for an omitted key, and forward the validated key unchanged when supplied. **RBG 1 refresh hardening:** a present, blank/non-UUIDv4 header returns an allowlisted `400 AUTH.REQUEST.IDEMPOTENCY_REQUIRED` response instead of silently substituting a different identity. Logout preserves unconditional cookie cleanup, including with malformed/missing headers. This deliberately retains the verified legacy optional-header behavior under precedence tier 3 (approved scope and existing verified API contracts), even though architecture Rule 83 recommends one stable user-intent key on every mutation.

**Unverified retry limitation:** Header-free retries cannot guarantee a reused key across separate HTTP requests. Host callers should generate a UUIDv4 once per user intent and reuse it across retries. Do not claim durable upstream deduplication without a verified backend contract. This exception is limited to existing refresh/logout compatibility route handlers and should be reviewed when the host client contract is available.

## Security and UX invariants

- Never put session tokens in localStorage, response body, debug logs or `NEXT_PUBLIC_*` variables.
- Keep login forms RHF/Zod with field-level validation and safe translated error copy.
- Preserve demo gating, role checks and tenant isolation, compatibility HTTP methods and retired HTTP 410 behavior.
- Preserve Login route skeleton, error boundary and not-found recovery.
- Preserve mutation retry identity when supplied; never alter provided UUIDv4 keys; use no-store and redirect-manual upstream semantics.
- No unrelated business submodule imports; route-only compatibility adapters may delegate to the owning module.

## Verification status and integration

This RBG 1 checkpoint is source-only. File existence and TypeScript parser/import resolution are statically verifiable. Full host typecheck, Vitest, Next.js build, Playwright, session integration, CSRF controls, live backend, accessibility and responsive behavior remain `DEFERRED_TO_HOST_RUNTIME`/`NOT_VERIFIED` where appropriate. RBG 5 owns cross-domain test import/harness corrections, RBG 6 mock contract cases, and RBG 7 the exhaustive Section 43P release sweep.

Host instructions are in `auth/INTEGRATION_GUIDE.md` and the consolidated ZIP-root `INTEGRATION_GUIDE.md`. The original v20 ZIP is the rollback source. See `RBG1_VERIFICATION_EVIDENCE.md` for evidence-backed findings, exceptions and cross-check tables.
