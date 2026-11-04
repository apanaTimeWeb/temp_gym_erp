---
module_id: auth_password_reset
role: frontend_auth
classification: domain_group
execution_mode: B
campaign: AUTH-GROUP
batch: RBG01
baseline_frozen: true
source_archive: frontend-public-auth-v6.zip
implementation_status: "RESERVED / NOT IMPLEMENTED"
---

# auth_password_reset — Domain Feature Ownership (RBG01)

## Purpose and verified lifecycle
Contract-dependent future password-recovery boundary. Not implemented by supplied ZIP. This is a **domain-level ownership contract**, not a claim of completed code migration. The root remains a documentation-only structural boundary until the approved owner migration batches. Do **not** treat this as a functional or production-compliant feature.

## Proposed autonomous child
`auth_password_reset/password_reset_recovery/` — **planned, not created during RBG01**. When populated, it must contain the verified 22-section local features document, forbidden rules, theme contract, host stubs, mocks, test harness, and local category folders. Creating only a one-file feature folder is forbidden.

## Historical public route contract — frozen
| Method/behavior | URL (unchanged) | Future owner |
|---|---|---|
| N/A | No verified recovery route | CONTRACT_NOT_FOUND_IN_WEB_ZIP |

The legacy URL entrypoints are currently served in `auth/frontend_auth/auth/`; no paths, methods, payloads, cookies, HTTP statuses, or alias behavior are changed in RBG01. The old route boundary is a **temporary compatibility exception** pending route migration and host rewrite verification.

## Source ownership candidates (not yet moved)
- No source files or API contract supplied.

## Source-backed operational classification
- Five gates: route/navigation, independent lifecycle, file count plus anti-bloat, standalone mock/testability, backend-entity alignment.
- Owner: Reserved organizational group only; no implemented password-reset workflow.
- **No artificial submodule by component/URL alias**; distinct handlers may remain grouped when their operational lifecycle is cohesive.

## Migration dependencies and blockers
CONTRACT_NOT_FOUND_IN_WEB_ZIP: No password-reset endpoint, schemas, forms or token lifecycle were verified. Do not create any UI/API/business code pending an authoritative contract.

## Acceptance and test conditions
- No route regressions across the 11 historical entries; aliases and retired 410 responses unchanged.
- Zero imports of business code from sibling domains **after** full owner migration. Existing violations are recorded, not silently declared fixed.
- Verified wire DTOs only; zero invented API fields or endpoints.
- Final release requires complete independent local docs/mock/test harness, WCAG 2.2 AA where UI exists, canonical URL configuration, and source-level freeze gates.
- Final static and dynamic compliance are **NOT_VERIFIED**, live host/browser checks are `DEFERRED_TO_HOST_RUNTIME`.

## Rollback
Restore exactly the source ZIP SHA-256 `968c34ef645f829d414da5aa2e255ffb6d63fc7d693fa3fcff9c0cc6cbcc9045`; RBG01 adds domain documentation and evidence only.


## Continuation evidence
No password-reset URL, token schema, email provider or backend contract exists in the original source ZIP. This reserved root must NOT be represented as a functional submodule. CONTRACT_NOT_FOUND_IN_WEB_ZIP; external product contract needed.
