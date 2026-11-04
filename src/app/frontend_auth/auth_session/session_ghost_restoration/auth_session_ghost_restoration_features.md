---
module_id: auth_session_ghost_restoration
role: frontend_auth
status: SOURCE_MIGRATED_RUNTIME_NOT_VERIFIED
baseline_frozen: true
---

# Ghost Session Restoration

## 1. Scope and Non-Scope

Owns restoration of a previously stashed original session. Does not issue or authenticate new sessions and does not implement password reset.

## 2. Screen Inventory

Server-side POST endpoint only. No new UI page, menu tab, or modal is invented.

## 3. Navigation and URL Contract

POST /frontend_auth/auth/exit_ghost_login and legacy alias /frontend_auth/auth/exit-ghost-login. Both remain identical public paths.

## 4. API and UI Data Requirements

Request requires a UUIDv4 Idempotency-Key header and stashed original access+refresh HttpOnly cookies. Returns a canonical ApiResponse envelope without token body exposure.

## 5. Query Keys and Server State

No TanStack Query cache. Endpoint mutates only session-cookie state.

## 6. Mutation Inventory

One POST mutation restores original cookies and consumes ghost-original cookie stash.

## 7. Permissions and Roles

Server requires valid stashed original tokens. Never takes role or tenant identifiers from client body.

## 8. State Ownership

Response cookie writes are local; no dependency on Login, Logout, or Session business files.

## 9. Loading Empty and Error States

No UI surface. Returns BAD_REQUEST for invalid idempotency key and UNAUTHORIZED without original session.

## 10. Security and PII

Token cookies remain HttpOnly, Secure in production, SameSite Strict, path /; invalid user cookie is not reinstalled.

## 11. Accessibility

No direct interactive UI component; caller accessibility depends on owning UI outside supplied module.

## 12. Background Tasks and Realtime

No background tasks, SSE, sockets, or schedulers.

## 13. Feature Flags and Tenant Settings

Read-only server runtime NODE_ENV controls Secure cookies; no bypass feature flag.

## 14. Cache Invalidation and Consistency

Route uses no-store success/error responses. Caller must refresh its own session view.

## 15. Migration Rollback and Edge Cases

Moves handler from Session Refresh group into own sibling submodule. Existing route adapters remain at frozen public URLs.

## 16. Test Coverage

The four original legacy-URL and security-route assertions are preserved byte-for-byte in `auth/route_contract_tests/AuthSessionGhostRestorationRoutes.test.ts` at the role integration boundary. The local `tests/AuthSessionGhostRestorationHarness.test.ts` separately exercises the actual ghost-restoration handler: absent original cookie => 401; stashed tokens => restore + clear cookies; absent UUIDv4 => 400. Host dependencies remain unverified.

## 17. Architecture Exceptions

Historical route-only compatibility adapters remain under /frontend_auth/auth for URL preservation. Source-level isolation inside this submodule is verified.

## 18. Known Contract Gaps

The upstream impersonation initiation flow is not provided; this module only restores cookies already present.

## 19. Rule Compliance Checklist

All source files use unique owner prefix, no barrel files, zero sibling imports, typed cookie schema, protected headers and status response.

## 20. Standalone Run Mock and Test Harness

RBG5 replaces the metadata object with an executable `tests/harness/bootstrap.ts` that creates an MSW v2 server with **zero fabricated upstream endpoints** (ghost restoration is cookie-only), exposes lifecycle functions and constructs typed `NextRequest` scenarios using the existing verified route and cookie constants. `runGhostRestoreScenario()` invokes the real owner-local POST route handler. Preserves the legacy alias regression in the role-integration suite; host Next/Vitest runtime tests remain deferred.

## 21. Portability and Host Integration

Copy this self-contained directory with /frontend_auth/auth/exit_ghost_login and /frontend_auth/auth/exit-ghost-login route entrypoint wrappers.

## 22. Deliverables and Revision History

RBG continuation: independently partitioned ghost-session restore and added source-level route regression tests. Dynamic host tests deferred.

