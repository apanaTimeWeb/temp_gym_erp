---
module_id: auth_session_status_refresh_and_restore
role: frontend_auth
source: frontend-auth-v17-PARTIAL-rbg2.zip
status: SOURCE_MIGRATED_WITH_OPEN_P0_DEVIATIONS
baseline_frozen: true
runtime_verified: false
---

# session_status_refresh_and_restore — Source-based feature contract

## 1. Scope and Non-Scope

Owns the cohesive live session refresh/status lifecycle plus retired HTTP 410 cookie endpoints. Ghost-session restoration is now an independent sibling in session_ghost_restoration/. Password recovery is not implemented in supplied source.

## 2. Screen Inventory

No independent status/refresh/restore UI screen; server HTTP route handlers only.

## 3. Navigation Contract

The public-facing legacy URLs remain exact; aliases are route-only adapters. Group-specific index GET navigates safely to the existing login page.

## 4. API Contract

Historical frontend contract: POST /frontend_auth/auth/refresh; GET /frontend_auth/auth/token; POST /frontend_auth/auth/set_cookie; POST /frontend_auth/auth/set-cookie. Verified upstream: POST /auth/refresh; GET /auth/me. Backend route shapes are in owner-local schemas/config; no password-reset API is asserted.

## 5. Query Key Registry

Login uses owner-local query key registry; Logout/Session own server operations and do not create new browser query keys.

## 6. Mutation Inventory

Refresh/rotation, sanitized status, restore original session; deprecated cookie route returns 410. All mutations preserve the pre-migration HTTP methods and idempotency behavior.

## 7. Permissions and Role Rules

Only verified source role union SUPERADMIN, ADMIN, MANAGER, TRAINER; private demo gate disabled in production. No client-supplied tenant selection.

## 8. State Ownership

Authenticated user status, access/refresh cookies, original ghost-session cookies. Local forms own React Hook Form state; test/demo sessions remain in one server-side registry.

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

Unit and mock tests requiring only Session-Refresh ownership remain co-located. Five cross-owner HTTP route integration tests and one mock-handler integration test (original assertions unchanged) moved to `auth/route_contract_tests/` outside all autonomous submodules. Original verified route aliases remain under `frontend_auth/auth/`; cross-module interaction is tested at role level, never imported from this submodule. Browser route tests remain in `playwright_E2E/`.

## 17. Architecture Exceptions

Single mutable demo registry; pure transport remains no-store / redirect-manual. Historical route-only compatibility shims under frontend_auth/auth/ are a recorded structural exception pending verified host rewrites.

## 18. Known Contract Gaps

Password reset backend contract not found. Host apiFetch server raw status guarantee not supplied. Runtime/browser and CI are not verified.

## 19. Rule Compliance Checklist

Canonical 84-rule/14-gate/43P source re-audit is tracked in RE_AUDIT_CHECKLIST_RESULT.md; open P0 means NOT compliant.

## 20. Standalone Run, Mock & Test Harness

Existing functional MSW `tests/harness/bootstrap.ts` is retained unchanged. `setupServer(...AuthMockBackendHandlers)` uses module-owned mock fixtures and offers install/reset/close. RBG5 removes cross-owner integration tests from this isolated module without dropping assertions or changing the harness. Host dependencies and runtime checks are still required.

## 21. Module Portability & Host Integration Guide

Copy the immediate Tier-4 folder into a compatible host with Next.js App Router, @/* to src/* alias and declared core adapters. Do not copy auth business files into global shared folder. Rewrite old URLs only after successful route-method integration proof.

## 22. Deliverables & Version History

Generated in the RBG03–RBG12 continuation. This document records source migration only and does not certify complete RBG closure or host execution.

