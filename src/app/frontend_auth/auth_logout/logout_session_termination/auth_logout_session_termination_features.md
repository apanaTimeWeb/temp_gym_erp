---
module_id: auth_logout_session_termination
role: frontend_auth
source: frontend-auth-v17-PARTIAL-rbg2.zip
status: SOURCE_MIGRATED_WITH_OPEN_P0_DEVIATIONS
baseline_frozen: true
runtime_verified: false
---

# logout_session_termination — Source-based feature contract

## 1. Scope and Non-Scope

Owns Session revocation and guaranteed client-cookie cleanup. Password recovery is not implemented in supplied source.

## 2. Screen Inventory

No UI screen exists for this API-only domain. There is no GET logout action.

## 3. Navigation Contract

The public-facing legacy URLs remain exact; aliases are route-only adapters. Group-specific index GET navigates safely to the existing login page.

## 4. API Contract

Historical frontend contract: POST /frontend_auth/auth/logout. Verified upstream: POST /auth/logout. Backend route shapes are in owner-local schemas/config; no password-reset API is asserted.

## 5. Query Key Registry

Login uses owner-local query key registry; Logout/Session own server operations and do not create new browser query keys.

## 6. Mutation Inventory

Best-effort upstream revocation, unconditional local cookie cleanup, never GET logout. All mutations preserve the pre-migration HTTP methods and idempotency behavior.

## 7. Permissions and Role Rules

Only verified source role union SUPERADMIN, ADMIN, MANAGER, TRAINER; private demo gate disabled in production. No client-supplied tenant selection.

## 8. State Ownership

Access and refresh cookies, token revocation, 6-cookie expiry. Local forms own React Hook Form state; test/demo sessions remain in one server-side registry.

## 9. Offline and Reconnect Behavior

Backend/network failure behavior is retained; no speculative offline auth or persistent browser token storage was added.

## 10. Security and PII Rules

HttpOnly cookie flags, no-store upstream semantics, UUIDv4 mutation keys, error sanitization, no client secret or token body exposure.

## 11. Accessibility Requirements

No new interactive UI. Browser presentation compatibility is verified by existing login route rather than invented UI.

## 12. Background Tasks

No unapproved asynchronous background work is created. Cookie expiry applies according to existing session constants.

## 13. Feature Flags

Private AUTH_DEMO_MODE permits fixture login only outside production. No new feature flags.

## 14. Cache Invalidation

Authentication/session mutations preserve the original route behavior; downstream dashboard cache invalidation remains host-dependent.

## 15. Migration and Rollback

Source-to-target move ledger, route preservation matrix, and rollback guidance are inside auth/docs; restore prior ZIP to roll back.

## 16. Test Coverage Map

Owner-local cookie and idempotency tests remain under `tests/` and their assertions were preserved. `AuthLogoutSessionTerminationHarness.test.ts` covers the new local mutable MSW upstream logout handler. Cross-owner route lifecycle tests are under role-level `auth/route_contract_tests/`; Playwright legacy-route smoke remains separate. Host runtime verification deferred.

## 17. Architecture Exceptions

Depends on single session-owned mutable demo registry; WET copied pure local utilities. Historical route-only compatibility shims under frontend_auth/auth/ are a recorded structural exception pending verified host rewrites.

## 18. Known Contract Gaps

Password reset backend contract not found. Host apiFetch server raw status guarantee not supplied. Runtime/browser and CI are not verified.

## 19. Rule Compliance Checklist

Canonical 84-rule/14-gate/43P source re-audit is tracked in RE_AUDIT_CHECKLIST_RESULT.md; open P0 means NOT compliant.

## 20. Standalone Run, Mock & Test Harness

RBG5's `tests/harness/bootstrap.ts` is an executable MSW v2 Node server for the verified upstream `POST /auth/logout` route with the existing endpoint config and envelope. Exports `mockServer`, lifecycle helpers, `observedLogoutKeys` (mutable in-memory retry-key observations), `makeLogoutRequest`, and `runLogoutScenario`, whose local route handler preserves cookie-clearing semantics. No new backend URL is created. The harness does NOT replace the required host `@/lib/api-raw` or `@/server/auth-demo` contracts; host Next/Vitest/MSW and those adapters are required for real route execution. The harness test exercises HTTP interception and mutable reset, not an unverified full Next build.

## 21. Module Portability & Host Integration Guide

Copy the immediate Tier-4 folder into a compatible host with Next.js App Router, @/* to src/* alias and declared core adapters. Do not copy auth business files into global shared folder. Rewrite old URLs only after successful route-method integration proof.

## 22. Deliverables & Version History

Generated in the RBG03–RBG12 continuation. This document records source migration only and does not certify complete RBG closure or host execution.

