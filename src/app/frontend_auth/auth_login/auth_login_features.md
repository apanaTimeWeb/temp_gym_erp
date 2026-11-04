---
module_id: auth_login
role: frontend_auth
classification: domain_group
execution_mode: B
campaign: AUTH-GROUP
batch: RBG01
baseline_frozen: true
source_archive: frontend-public-auth-v6.zip
implementation_status: "SOURCE MIGRATED / OPEN DEVIATIONS"
---

# auth_login — Domain Feature Ownership (RBG01)

## Purpose and verified lifecycle
Credential authentication and explicitly gated demo sign-in. This is a **domain-level ownership contract**, not a claim of completed code migration. The root remains a documentation-only structural boundary until the approved owner migration batches. Do **not** treat this as a functional or production-compliant feature.

## Proposed autonomous child
`auth_login/login_credentials_and_demo_access/` — **planned, not created during RBG01**. When populated, it must contain the verified 22-section local features document, forbidden rules, theme contract, host stubs, mocks, test harness, and local category folders. Creating only a one-file feature folder is forbidden.

## Historical public route contract — frozen
| Method/behavior | URL (unchanged) | Future owner |
|---|---|---|
| GET page | `/frontend_auth/auth/login` | `auth_login` |
| POST | `/frontend_auth/auth/session` | `auth_login` |
| POST | `/frontend_auth/auth/demo_login` | `auth_login` |
| POST legacy alias | `/frontend_auth/auth/demo-login` | `auth_login` |

The legacy URL entrypoints are currently served in `auth/frontend_auth/auth/`; no paths, methods, payloads, cookies, HTTP statuses, or alias behavior are changed in RBG01. The old route boundary is a **temporary compatibility exception** pending route migration and host rewrite verification.

## Source ownership candidates (not yet moved)
- `auth/auth_login/** (85 physical files)`
- `auth/auth_session_management/api/route_handlers/AuthSessionRouteHandler.ts`
- `auth/auth_session_management/api/route_handlers/AuthDemoLoginRouteHandler.ts`

## Source-backed operational classification
- Five gates: route/navigation, independent lifecycle, file count plus anti-bloat, standalone mock/testability, backend-entity alignment.
- Owner: Auth session creation.
- **No artificial submodule by component/URL alias**; distinct handlers may remain grouped when their operational lifecycle is cohesive.

## Migration dependencies and blockers
Current Login UI uses server-only session utilities from auth_session_management. Localize or use a verified host-neutral adapter during RBG02–05.

## Acceptance and test conditions
- No route regressions across the 11 historical entries; aliases and retired 410 responses unchanged.
- Zero imports of business code from sibling domains **after** full owner migration. Existing violations are recorded, not silently declared fixed.
- Verified wire DTOs only; zero invented API fields or endpoints.
- Final release requires complete independent local docs/mock/test harness, WCAG 2.2 AA where UI exists, canonical URL configuration, and source-level freeze gates.
- Final static and dynamic compliance are **NOT_VERIFIED**, live host/browser checks are `DEFERRED_TO_HOST_RUNTIME`.

## Rollback
Restore exactly the source ZIP SHA-256 `968c34ef645f829d414da5aa2e255ffb6d63fc7d693fa3fcff9c0cc6cbcc9045`; RBG01 adds domain documentation and evidence only.


## Post-migration note (this checkpoint)
The physical Tier-4 owner is `login_credentials_and_demo_access/`. Historical `/frontend_auth/auth/*` route adapters remain for method-preserving compatibility. The supplied source-migration evidence is recorded in the root `INTEGRATION_GUIDE.md` and `audit_evidence/` directory; the historical `auth/docs/AUTH_GROUP_RBG03_TO_RBG10_PHYSICAL_MIGRATION.csv` was not supplied and is not claimed to exist. Strict cross-business isolation and runtime verification remain open where documented.
