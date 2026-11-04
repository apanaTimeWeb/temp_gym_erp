---
module_id: auth_login_credentials_and_demo_access
role: frontend_auth
source: frontend-auth-v17-PARTIAL-rbg2.zip
status: SOURCE_MIGRATED_WITH_OPEN_P0_DEVIATIONS
baseline_frozen: true
runtime_verified: false
---

# login_credentials_and_demo_access — Source-based feature contract

## 1. Scope and Non-Scope

Owns Credential login and privately gated demo session issuance. Password recovery is not implemented in supplied source.

## 2. Screen Inventory

Credential sign-in UI with loading, error and not-found boundaries; standalone demo role chooser.

## 3. Navigation Contract

The public-facing legacy URLs remain exact; aliases are route-only adapters. Group-specific index GET navigates safely to the existing login page.

## 4. API Contract

Historical frontend contract: GET /frontend_auth/auth/login; POST /frontend_auth/auth/session; POST /frontend_auth/auth/demo_login; POST /frontend_auth/auth/demo-login. Verified upstream: POST /auth/login. Backend route shapes are in owner-local schemas/config; no password-reset API is asserted.

## 5. Query Key Registry

Login uses owner-local query key registry; Logout/Session own server operations and do not create new browser query keys.

## 6. Mutation Inventory

Login UI, credential/demo request validation, role redirect, dynamic loading/error/not-found components. All mutations preserve the pre-migration HTTP methods and idempotency behavior.

## 7. Permissions and Role Rules

Only verified source role union SUPERADMIN, ADMIN, MANAGER, TRAINER; private demo gate disabled in production. No client-supplied tenant selection.

## 8. State Ownership

Login credentials (email/password), demo role, AuthUser; CSRF-safe HttpOnly cookies. Local forms own React Hook Form state; test/demo sessions remain in one server-side registry.

## 9. Offline and Reconnect Behavior

Backend/network failure behavior is retained; no speculative offline auth or persistent browser token storage was added.

## 10. Security and PII Rules

HttpOnly cookie flags, no-store upstream semantics, UUIDv4 mutation keys, error sanitization, no client secret or token body exposure.

## 11. Accessibility Requirements

Existing login code uses semantic theme utilities, associated form labels and translation keys; browser WCAG 2.2 AA run is deferred, not passed.

## 12. Background Tasks

No unapproved asynchronous background work is created. Cookie expiry applies according to existing session constants.

## 13. Feature Flags

Private AUTH_DEMO_MODE permits fixture login only outside production. No new feature flags.

## 14. Cache Invalidation

Authentication/session mutations preserve the original route behavior; downstream dashboard cache invalidation remains host-dependent.

## 15. Migration and Rollback

Source-to-target move ledger, route preservation matrix, and rollback guidance are inside auth/docs; restore prior ZIP to roll back.

## 16. Test Coverage Map

Login-local React/validation/API tests remain under `tests/`; 5 cross-owner legacy route integration tests, all assertions unchanged, are stored under `auth/route_contract_tests/` at the role-level integration boundary. `tests/AuthLoginCredentialsAndDemoAccessHarness.test.ts` tests the local MSW error scenario. Browser route smoke stays in `auth/playwright_E2E/`. No hosted tests have yet been executed.

## 17. Architecture Exceptions

Domain-local raw server transport; shared mutable demo registry still imported from session. Historical route-only compatibility shims under frontend_auth/auth/ are a recorded structural exception pending verified host rewrites.

## 18. Known Contract Gaps

Password reset backend contract not found. Host apiFetch server raw status guarantee not supplied. Runtime/browser and CI are not verified.

## 19. Rule Compliance Checklist

Canonical 84-rule/14-gate/43P source re-audit is tracked in RE_AUDIT_CHECKLIST_RESULT.md; open P0 means NOT compliant.

## 20. Standalone Run, Mock & Test Harness

RBG5 replaced the metadata-only bootstrap with `tests/harness/bootstrap.ts` exporting the MSW v2 `mockServer`, `installMockServer`, `resetMockServer`, `closeMockServer`, and `useLoginMockHandlers`; the default scenario uses the existing verified Login-owned `unavailableLogin` handler. `tests/harness/AuthLoginCredentialsAndDemoAccessHarness.tsx` mounts the actual Login surface with a test-only TanStack Query client and `NextIntlClientProvider` using the module's English locale. The project host must provide the declared `@/components/ThemeToggle`/core contracts and a compatible Next/Vitest/JSDOM/MSW environment. No production backend or credential success path has been invented; a standalone error scenario is executable once host deps are supplied. See `AuthLoginCredentialsAndDemoAccessHarness.test.ts`. The host build and test run remain NOT_VERIFIED.

## 21. Module Portability & Host Integration Guide

Copy the immediate Tier-4 folder into a compatible host with Next.js App Router, @/* to src/* alias and declared core adapters. Do not copy auth business files into global shared folder. Rewrite old URLs only after successful route-method integration proof.

## 22. Deliverables & Version History

Generated in the RBG03–RBG12 continuation. This document records source migration only and does not certify complete RBG closure or host execution.

