# Forbidden Patterns — `admin/usage`

## 1. No Direct Plan Changes
**FORBIDDEN:** Any API call that directly switches the gym's subscription plan.
**REASON:** Plan changes require Superadmin authorization. Admins can only submit a request.
**ALLOWED:** `POST /admin/usage/upgrade-request` — sends a request to the Superadmin.

## 2. No Hardcoded Usage Thresholds
**FORBIDDEN:** `if (percent >= 0.8)` inline in JSX or hooks.
**REASON:** Thresholds must be named constants so they can be changed in one place.
**ALLOWED:** Import `USAGE_WARNING_THRESHOLD` and `USAGE_CRITICAL_THRESHOLD` from `utils/`.

## 3. No Mock Stubs in Production
**FORBIDDEN:** Shipping any legacy mock-only usage API path or bypassing `usage_api/AdminUsageApi.ts`/`apiFetch` in production.
**ALLOWED:** Use `AdminUsageApi.fetchMyUsage()` from `usage_api/AdminUsageApi.ts` which calls `apiFetch`.

## 4. No Cross-Role Imports
**FORBIDDEN:** Importing from `/manager`, `/trainer`, or `/superadmin` modules.

## 5. No Direct `apiFetch` in Components
**FORBIDDEN:** Calling `apiFetch` directly from `.tsx` files.
**ALLOWED:** All API calls go through `usage_api/AdminUsageApi.ts`.

## 6. No Relative Imports
**FORBIDDEN:** Relative paths like `../../types/...`
**ALLOWED:** Absolute paths: `@/app/frontend_admin/admin_billing/billing_usage_analytics/types/...`

## 7. No Barrel Files
**FORBIDDEN:** `index.ts` re-exports.

## Canonical Sub-Module Isolation Invariants (Architecture Rule 40)

These constraints apply to this leaf in addition to the feature-specific prohibitions above. The canonical rule authority remains `WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`, Rule 40; this list makes the local boundary explicit without changing that authority.

1. **Zero cross-sub-module business imports:** do not import sibling leaf components, hooks, stores, types, schemas, utilities, fixtures, or handlers.
2. **Zero parent shared folders:** do not create or consume parent `common/`, `shared/`, or business-aware `components/` folders.
3. **Strict WET isolation:** duplicate business-specific badges, filters, formatters, and UI patterns locally when sharing them would couple leaves.
4. **Zero cross-sub-module in-memory state:** do not share React Context, Zustand stores, or mutable business objects with sibling leaves; use documented URL navigation and typed query parameters where approved.
5. **Local fixture ownership:** keep this leaf's fixtures, MSW handlers, scenarios, and mock tests inside this leaf's `mocks/` and `tests/` directories.
6. **No duplicate global mock handlers:** do not register a second global handler for a leaf-owned endpoint or scenario.
7. **No sibling fixture imports:** do not import sample data or scenario factories owned by another business leaf.
8. **No fake business fallbacks:** do not fabricate records, statuses, IDs, amounts, permissions, or success responses to disguise missing API contracts.
9. **API boundary only:** UI components must not bypass the leaf API client to read fixtures directly or call backend endpoints ad hoc.
10. **No casual global MSW changes:** do not modify the role-wide MSW bootstrap for a leaf-local change unless registration is explicitly required by the existing harness contract.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
