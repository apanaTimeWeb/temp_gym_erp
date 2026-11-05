# Forbidden Patterns — `admin/announcements`

## 1. No Announcements Received Here
**FORBIDDEN:** Rendering incoming system alerts or notifications in this module.
**ALLOWED:** This module is outbound-only — creating and publishing announcements to members/staff.

## 2. No Client-Side Publish Scheduling
**FORBIDDEN:** Using `setTimeout` or `setInterval` to trigger publish on the frontend.
**ALLOWED:** Send `scheduledAt: ISO8601` in the POST body; let the backend handle scheduling.

## 3. No Direct `apiFetch` in Components
**FORBIDDEN:** Calling `apiFetch` directly from `.tsx` files.
**ALLOWED:** All API calls go through the module's API client.

## 4. No Hardcoded URLs
**FORBIDDEN:** `'/admin/announcements'` string literals in components.
**ALLOWED:** Import from `module URL config`.

## 5. No Relative Imports
**FORBIDDEN:** `../../` import paths.
**ALLOWED:** Absolute `@/app/frontend_admin/admin_communication/communication_notices_and_announcements/...` paths.

## 6. No Cross-Role Imports
**FORBIDDEN:** Importing from `/manager`, `/trainer`, `/superadmin`.

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
