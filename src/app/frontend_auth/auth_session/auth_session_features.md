---
module_id: auth_session
role: frontend_auth
classification: domain_group
execution_mode: B
campaign: AUTH-GROUP
batch: RBG01
baseline_frozen: true
source_archive: frontend-public-auth-v6.zip
implementation_status: "SOURCE MIGRATED / OPEN DEVIATIONS"
---

# auth_session — Domain Feature Ownership (RBG01)

## Purpose and verified lifecycle
Authenticated session status, refresh, restoration and retired-endpoint compatibility. This is a **domain-level ownership contract**, not a claim of completed code migration. The root remains a documentation-only structural boundary until the approved owner migration batches. Do **not** treat this as a functional or production-compliant feature.

## Proposed autonomous child
`auth_session/session_status_refresh_and_restore/` — **planned, not created during RBG01**. When populated, it must contain the verified 22-section local features document, forbidden rules, theme contract, host stubs, mocks, test harness, and local category folders. Creating only a one-file feature folder is forbidden.

## Historical public route contract — frozen
| Method/behavior | URL (unchanged) | Future owner |
|---|---|---|
| POST | `/frontend_auth/auth/refresh` | `auth_session` |
| GET | `/frontend_auth/auth/token` | `auth_session` |
| POST | `/frontend_auth/auth/exit_ghost_login` | `auth_session` |
| POST legacy alias | `/frontend_auth/auth/exit-ghost-login` | `auth_session` |
| POST retired (410) | `/frontend_auth/auth/set_cookie` | `auth_session` |
| POST retired alias (410) | `/frontend_auth/auth/set-cookie` | `auth_session` |

The legacy URL entrypoints are currently served in `auth/frontend_auth/auth/`; no paths, methods, payloads, cookies, HTTP statuses, or alias behavior are changed in RBG01. The old route boundary is a **temporary compatibility exception** pending route migration and host rewrite verification.

## Source ownership candidates (not yet moved)
- `auth/auth_session_management/api/route_handlers/AuthRefreshRouteHandler.ts`
- `auth/auth_session_management/api/route_handlers/AuthTokenRouteHandler.ts`
- `auth/auth_session_management/api/route_handlers/AuthExitGhostLoginRouteHandler.ts`
- `auth/auth_session_management/api/route_handlers/AuthSetCookieRouteHandler.ts`

## Source-backed operational classification
- Five gates: route/navigation, independent lifecycle, file count plus anti-bloat, standalone mock/testability, backend-entity alignment.
- Owner: Existing session lifecycle (refresh/status/original-session restoration).
- **No artificial submodule by component/URL alias**; distinct handlers may remain grouped when their operational lifecycle is cohesive.

## Migration dependencies and blockers
Session refresh/status use one authoritative mutable development fixture registry; ghost restoration is an independent sibling and localizes its own cookie-validation utilities. Preserve private cookie flags, HttpOnly boundaries and retired HTTP 410 behavior.

## Acceptance and test conditions
- No route regressions across the 11 historical entries; aliases and retired 410 responses unchanged.
- Zero imports of business code from sibling domains **after** full owner migration. Existing violations are recorded, not silently declared fixed.
- Verified wire DTOs only; zero invented API fields or endpoints.
- Final release requires complete independent local docs/mock/test harness, WCAG 2.2 AA where UI exists, canonical URL configuration, and source-level freeze gates.
- Final static and dynamic compliance are **NOT_VERIFIED**, live host/browser checks are `DEFERRED_TO_HOST_RUNTIME`.

## Rollback
Restore exactly the source ZIP SHA-256 `968c34ef645f829d414da5aa2e255ffb6d63fc7d693fa3fcff9c0cc6cbcc9045`; RBG01 adds domain documentation and evidence only.


## Post-migration note (this checkpoint)
The physical Tier-4 owner is `session_status_refresh_and_restore/`. Historical `/frontend_auth/auth/*` route adapters remain for method-preserving compatibility. The supplied source-migration evidence is recorded in the root `INTEGRATION_GUIDE.md` and `audit_evidence/` directory; the historical `auth/docs/AUTH_GROUP_RBG03_TO_RBG10_PHYSICAL_MIGRATION.csv` was not supplied and is not claimed to exist. Strict cross-business isolation and runtime verification remain open where documented.

## Ghost restoration ownership (RBG continuation)

The independent `session_ghost_restoration/` sibling owns the pre-existing exit-ghost route; `session_status_refresh_and_restore/` retains live session status, refresh, and retired 410 compatibility.
